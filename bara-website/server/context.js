// Shared state and request helpers: store, printers, sessions, limits.
'use strict';
const {Store} = require('./store');
const {createFloor} = require('./floor');
const crypto = require('node:crypto');
const {Readable, Transform} = require('node:stream');
const fs = require('node:fs');
const path = require('node:path');
const A = require('./auth');
const M = require('./maintenance');
const C = require('./costing');
const {HttpError, now} = require('./http');

module.exports = function register(ctx) {
  const {opts} = ctx;
  const root = path.resolve(opts.root || path.join(__dirname, '..'));
  const staticDir = path.resolve(opts.staticDir || root);
  const dataDir = path.resolve(opts.dataDir || path.join(root, 'var'));
  const uploadDir = path.join(dataDir, 'uploads');
  const secret = opts.secret || crypto.randomBytes(32).toString('hex');
  const allowedOrigins = new Set(
    (opts.allowedOrigins || []).map((o) => o.replace(/\/$/, '')),
  );
  const maxUploadMB = opts.maxUploadMB || 100;
  const log = opts.log || console;

  const store = new Store(path.join(dataDir, 'db.json'), {
    seedStock: path.join(root, 'data', 'stock.json'),
  });
  const readJson = (f) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(root, 'data', f), 'utf8'));
    } catch {
      return null;
    }
  };
  const pricing = readJson('pricing.json') || {};
  const densities = Object.fromEntries(
    Object.entries(pricing.materials || {}).map(([k, v]) => [k, v.density]),
  );
  // Actual cost of every finished job (and margin when it came from a paid
  // order), from the same cost model as quotes.
  const onFinish = (db, job, printer) => {
    if (printer && job.status !== 'cancelled') {
      db.tasks = db.tasks || [];
      db.tasks.unshift({
        id: crypto.randomUUID(),
        type: 'clear',
        status: 'open',
        printerId: printer.id,
        code: printer.code,
        jobIds: [job.id],
        title:
          (job.status === 'done'
            ? 'Take ' + job.id + ' off '
            : 'Clear the failed print off ') +
          printer.code +
          ' and check the plate',
        createdAt: now(),
      });
    }
    if (!job.startedAt) return;
    const hours =
      (Date.parse(job.finishedAt) - Date.parse(job.startedAt)) / 3600000;
    const filament = db.filaments.find((f) => f.id === job.spoolId);
    const sale = job.unitPrice != null ? job.unitPrice * (job.qty || 1) : null;
    const c = C.compute(
      {
        grams: job.deductedG || 0,
        hours,
        filament,
        material: job.material,
        printer,
        price: job.status === 'done' ? sale : null,
        markupPct: 0,
      },
      db.costing,
    );
    job.actual = {
      cost: c.cost,
      hours: c.hours,
      lines: c.lines,
      ...(sale != null && job.status === 'done'
        ? {revenue: c.priceExVat, profit: c.profit, marginPct: c.marginPct}
        : {}),
    };
  };
  const floor = createFloor(store, {
    densities,
    pollMs: opts.pollMs,
    staleMs: opts.staleMs,
    log,
    onFinish,
  });
  const sessions = A.createSessions(secret);
  const loginLimit = A.createLimiter(10, 15 * 60 * 1000);
  const formLimit = A.createLimiter(20, 60 * 60 * 1000);
  const orderToken = opts.orderToken || '';

  // Bring older data up to date: maintenance counters/tasks per printer, AMS
  // slots, new collections.
  {
    let dirty = false;
    for (const k of ['orders', 'upkeepLog', 'tasks']) {
      if (!Array.isArray(store.db[k])) {
        store.db[k] = [];
        dirty = true;
      }
    }
    if (!store.db.costing) {
      store.db.costing = C.merge({
        fillFactor: pricing.fillFactor || C.DEFAULTS.fillFactor,
        rushFee: pricing.rushFee || C.DEFAULTS.rushFee,
      });
      dirty = true;
    }
    for (const p of store.db.printers) {
      if (M.ensure(p, {id: () => crypto.randomUUID()})) dirty = true;
      if (!Array.isArray(p.slots)) {
        p.slots = p.spoolId ? [p.spoolId] : [null];
        delete p.spoolId;
        dirty = true;
      }
    }
    if (dirty) store.save();
  }
  const upkeepLog = (db, e) => {
    db.upkeepLog.unshift({id: crypto.randomUUID(), at: now(), ...e});
    if (db.upkeepLog.length > 3000) db.upkeepLog.length = 3000;
  };

  // First boot: create the admin account from env.
  if (!store.db.users.length && opts.adminPassword) {
    store.change('users', (db) =>
      db.users.push({
        username: opts.adminUser || 'admin',
        role: 'admin',
        ...A.hashPassword(opts.adminPassword),
        createdAt: now(),
      }),
    );
    log.log('[bara] created admin user "' + (opts.adminUser || 'admin') + '"');
  }

  // ---- Helpers ----
  const secureCookie = (req) =>
    opts.cookieSecure != null
      ? opts.cookieSecure
      : req.headers['x-forwarded-proto'] === 'https' || !!req.socket.encrypted;
  const userOf = (req) => {
    const s = sessions.read(A.parseCookies(req.headers.cookie)[A.COOKIE]);
    return (s && store.db.users.find((u) => u.username === s.u)) || null;
  };
  const ipOf = (req) =>
    (opts.trustProxy &&
      String(req.headers['x-forwarded-for'] || '')
        .split(',')[0]
        .trim()) ||
    req.socket.remoteAddress;
  const sameOrigin = (req) => {
    const o = req.headers.origin;
    if (!o) return true;
    try {
      return (
        new URL(o).host ===
        (req.headers['x-forwarded-host'] || req.headers.host)
      );
    } catch {
      return false;
    }
  };
  /**
   * Requires a signed-in staff member (and same-origin writes).
   * @param {!http.IncomingMessage} req
   * @param {{admin: (boolean|undefined)}=} options
   * @return {!Object} The user.
   */
  function staff(req, {admin} = {}) {
    const u = userOf(req);
    if (!u) throw new HttpError(401, 'Sign in first');
    if (req.method !== 'GET' && !sameOrigin(req)) {
      throw new HttpError(403, 'Cross-site request blocked');
    }
    if (admin && u.role !== 'admin') throw new HttpError(403, 'Admins only');
    return u;
  }
  /**
   * Reads a JSON body.
   * @param {!http.IncomingMessage} req
   * @param {number=} limit Max bytes.
   * @return {!Promise<!Object>}
   */
  async function body(req, limit = 1048576) {
    let size = 0;
    const chunks = [];
    for await (const c of req) {
      size += c.length;
      if (size > limit) throw new HttpError(413, 'Body too large');
      chunks.push(c);
    }
    if (!size) return {};
    try {
      return JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      throw new HttpError(400, 'Invalid JSON');
    }
  }
  /**
   * Reads a multipart or urlencoded form, enforcing the upload limit.
   * @param {!http.IncomingMessage} req
   * @return {!Promise<?FormData>} Null when the body is not a form.
   */
  async function form(req) {
    const type = req.headers['content-type'] || '';
    if (
      !type.includes('multipart/form-data') &&
      !type.includes('application/x-www-form-urlencoded')
    ) {
      return null;
    }
    const limit = maxUploadMB * 1048576 + 65536;
    let size = 0;
    const counter = new Transform({
      transform(c, _, cb) {
        size += c.length;
        cb(size > limit ? new HttpError(413, 'File too large') : null, c);
      },
    });
    try {
      return await new Request('http://local/', {
        method: 'POST',
        headers: {'content-type': type},
        body: Readable.toWeb(req.pipe(counter)),
        duplex: 'half',
      }).formData();
    } catch (e) {
      throw e instanceof HttpError
        ? e
        : size > limit
          ? new HttpError(413, 'File too large')
          : new HttpError(400, 'Could not read the form');
    }
  }
  const send = (res, status, data, headers = {}) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    });
    res.end(data === undefined ? '' : JSON.stringify(data));
  };
  const find = (list, id, what) => {
    const x = list.find((i) => i.id === id);
    if (!x) throw new HttpError(404, what + ' not found');
    return x;
  };

  return {
    allowedOrigins,
    body,
    dataDir,
    densities,
    find,
    floor,
    form,
    formLimit,
    ipOf,
    log,
    loginLimit,
    maxUploadMB,
    onFinish,
    orderToken,
    pricing,
    readJson,
    root,
    sameOrigin,
    secret,
    secureCookie,
    send,
    sessions,
    staff,
    staticDir,
    store,
    upkeepLog,
    uploadDir,
    userOf,
  };
};

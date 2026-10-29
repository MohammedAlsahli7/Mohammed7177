// HTTP layer: public website API (stock, floor, forms), staff Ops API, live event stream and static hosting.
const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { Readable, Transform } = require('node:stream');
const { Store } = require('./store');
const { createFloor, CONNECTORS, ACTIVE, FINISHED } = require('./floor');
const A = require('./auth');

const MATS = ['pla', 'petg', 'tpu', 'loop'];
const JOB_STATUS = ['queued', 'printing', 'paused', 'done', 'failed', 'cancelled'];
const REQUEST_STATUS = ['new', 'seen', 'converted', 'closed'];
const ITEM_CATEGORIES = ['part', 'consumable', 'packaging', 'product', 'tool', 'other'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.md': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
const HIDDEN = new Set(['server', 'test', 'node_modules', 'scripts', 'var', '.git', '.env', 'package.json', 'package-lock.json', 'Dockerfile', 'docker-compose.yml']);

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }
const bad = (msg) => { throw new HttpError(400, msg); };
const str = (v, max = 200) => (v == null ? '' : String(v).trim().slice(0, max));
const num = (v, { min = -Infinity, max = Infinity } = {}) => { const n = +v; if (v === '' || v == null || !Number.isFinite(n)) return null; return Math.min(max, Math.max(min, n)); };
const slug = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const now = () => new Date().toISOString();

function createApp(opts = {}) {
  const root = path.resolve(opts.root || path.join(__dirname, '..'));
  const staticDir = path.resolve(opts.staticDir || root);
  const dataDir = path.resolve(opts.dataDir || path.join(root, 'var'));
  const uploadDir = path.join(dataDir, 'uploads');
  const secret = opts.secret || crypto.randomBytes(32).toString('hex');
  const allowedOrigins = new Set((opts.allowedOrigins || []).map((o) => o.replace(/\/$/, '')));
  const maxUploadMB = opts.maxUploadMB || 100;
  const log = opts.log || console;

  const store = new Store(path.join(dataDir, 'db.json'), { seedStock: path.join(root, 'data', 'stock.json') });
  const readJson = (f) => { try { return JSON.parse(fs.readFileSync(path.join(root, 'data', f), 'utf8')); } catch { return null; } };
  const pricing = readJson('pricing.json') || {};
  const densities = Object.fromEntries(Object.entries(pricing.materials || {}).map(([k, v]) => [k, v.density]));
  const floor = createFloor(store, { densities, pollMs: opts.pollMs, staleMs: opts.staleMs, log });
  const sessions = A.createSessions(secret);
  const loginLimit = A.createLimiter(10, 15 * 60 * 1000);
  const formLimit = A.createLimiter(20, 60 * 60 * 1000);

  // First boot: create the admin account from env.
  if (!store.db.users.length && opts.adminPassword) {
    store.change('users', (db) => db.users.push({ username: opts.adminUser || 'admin', role: 'admin', ...A.hashPassword(opts.adminPassword), createdAt: now() }));
    log.log('[bara] created admin user "' + (opts.adminUser || 'admin') + '"');
  }

  // ---- Live events (Server-Sent Events) for the Ops dashboard ----
  const clients = new Set();
  let pending = new Set(); let flushT = null;
  store.onChange((topics) => {
    topics.forEach((t) => pending.add(t));
    if (!flushT) flushT = setTimeout(() => {
      flushT = null; const send = [...pending]; pending = new Set();
      for (const c of clients) for (const t of send) c.write('event: ' + t + '\ndata: ' + JSON.stringify(snapshot(t, c.user)) + '\n\n');
    }, 150);
  });
  const ping = setInterval(() => { for (const c of clients) c.write(': ping\n\n'); }, 25000);

  // ---- Views ----
  const isAdmin = (u) => u && u.role === 'admin';
  const stockDoc = () => ({ updatedAt: store.db.stockUpdatedAt || null, thresholds: store.db.thresholds, items: store.db.filaments });
  const jobsView = () => {
    const recent = store.db.jobs.filter((j) => !FINISHED.includes(j.status) || Date.now() - Date.parse(j.finishedAt || j.createdAt) < 7 * 864e5);
    return recent.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  };
  const requestView = (r) => ({ ...r, file: r.file ? { name: r.file.name, size: r.file.size } : null });
  function snapshot(topic, user) {
    switch (topic) {
      case 'printers': return store.db.printers.map((p) => floor.printerView(p, { secrets: isAdmin(user) }));
      case 'jobs': return jobsView();
      case 'inventory': return { thresholds: store.db.thresholds, filaments: store.db.filaments, items: store.db.items };
      case 'requests': return store.db.requests.slice(0, 300).map(requestView);
      case 'users': return isAdmin(user) ? store.db.users.map(({ username, role, createdAt }) => ({ username, role, createdAt })) : [];
      default: return null;
    }
  }
  // Public floor feed for the website: no customer data, only product names for catalogue items.
  function floorFeed() {
    const order = { printing: 0, paused: 0, queued: 1, done: 2, failed: 2 };
    const fresh = (j) => !FINISHED.includes(j.status) || (j.status !== 'cancelled' && Date.now() - Date.parse(j.finishedAt) < 30 * 60 * 1000);
    return store.db.jobs.filter((j) => j.printerId && fresh(j)).sort((a, b) => order[a.status] - order[b.status] || (b.startedAt || b.createdAt).localeCompare(a.startedAt || a.createdAt)).slice(0, 12).map((j) => {
      const p = store.db.printers.find((x) => x.id === j.printerId);
      const spool = store.db.filaments.find((f) => f.id === j.spoolId);
      return { id: j.id, item: j.productId || null, ...(j.productId ? {} : { name: { en: 'Custom print', ar: 'طلب خاص' } }), hex: j.hex || (spool && spool.hex) || '#8C877C', printer: p ? p.code.replace(/^P/i, '') : '?', layer: j.layer || 0, total: j.total || 0, status: j.status === 'paused' ? 'printing' : j.status };
    });
  }

  // ---- Helpers ----
  const secureCookie = (req) => opts.cookieSecure != null ? opts.cookieSecure : req.headers['x-forwarded-proto'] === 'https' || !!req.socket.encrypted;
  const userOf = (req) => { const s = sessions.read(A.parseCookies(req.headers.cookie)[A.COOKIE]); return s && store.db.users.find((u) => u.username === s.u) || null; };
  const ipOf = (req) => (opts.trustProxy && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress;
  const sameOrigin = (req) => { const o = req.headers.origin; if (!o) return true; try { return new URL(o).host === (req.headers['x-forwarded-host'] || req.headers.host); } catch { return false; } };
  function staff(req, { admin } = {}) {
    const u = userOf(req);
    if (!u) throw new HttpError(401, 'Sign in first');
    if (req.method !== 'GET' && !sameOrigin(req)) throw new HttpError(403, 'Cross-site request blocked');
    if (admin && u.role !== 'admin') throw new HttpError(403, 'Admins only');
    return u;
  }
  async function body(req, limit = 1048576) {
    let size = 0; const chunks = [];
    for await (const c of req) { size += c.length; if (size > limit) throw new HttpError(413, 'Body too large'); chunks.push(c); }
    if (!size) return {};
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new HttpError(400, 'Invalid JSON'); }
  }
  async function form(req) {
    const type = req.headers['content-type'] || '';
    if (!type.includes('multipart/form-data') && !type.includes('application/x-www-form-urlencoded')) return null;
    const limit = maxUploadMB * 1048576 + 65536; let size = 0;
    const counter = new Transform({ transform(c, _, cb) { size += c.length; cb(size > limit ? new HttpError(413, 'File too large') : null, c); } });
    try { return await new Request('http://local/', { method: 'POST', headers: { 'content-type': type }, body: Readable.toWeb(req.pipe(counter)), duplex: 'half' }).formData(); }
    catch (e) { throw e instanceof HttpError ? e : size > limit ? new HttpError(413, 'File too large') : new HttpError(400, 'Could not read the form'); }
  }
  const send = (res, status, data, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }); res.end(data === undefined ? '' : JSON.stringify(data)); };
  const find = (list, id, what) => { const x = list.find((i) => i.id === id); if (!x) throw new HttpError(404, what + ' not found'); return x; };

  // ---- Validation ----
  function filamentFrom(b, prev = {}) {
    const f = { ...prev };
    if (b.name !== undefined) f.name = str(b.name, 60) || bad('Name required');
    if (b.ar !== undefined) f.ar = str(b.ar, 60);
    if (b.material !== undefined) { if (!MATS.includes(b.material)) bad('Material must be one of ' + MATS.join(', ')); f.material = b.material; }
    if (b.hex !== undefined) { if (!/^#[0-9a-f]{6}$/i.test(b.hex)) bad('Colour must be #RRGGBB'); f.hex = b.hex.toUpperCase(); }
    if (b.grams !== undefined) { const g = num(b.grams, { min: 0, max: 1e6 }); if (g == null) bad('Grams must be a number'); f.grams = g; }
    for (const k of ['line', 'finish', 'shelf']) if (b[k] !== undefined) f[k] = str(b[k], 60);
    if (b.spoolWeight !== undefined) f.spoolWeight = num(b.spoolWeight, { min: 0, max: 20000 });
    if (!f.name || !f.material || !f.hex) bad('Name, material and colour are required');
    return f;
  }
  function itemFrom(b, prev = {}) {
    const it = { ...prev };
    if (b.name !== undefined) it.name = str(b.name, 100) || bad('Name required');
    if (b.category !== undefined) { if (!ITEM_CATEGORIES.includes(b.category)) bad('Category must be one of ' + ITEM_CATEGORIES.join(', ')); it.category = b.category; }
    if (b.qty !== undefined) { const q = num(b.qty, { min: 0, max: 1e9 }); if (q == null) bad('Quantity must be a number'); it.qty = q; }
    if (b.reorderAt !== undefined) it.reorderAt = num(b.reorderAt, { min: 0, max: 1e9 });
    for (const k of ['sku', 'unit', 'location', 'notes', 'supplier']) if (b[k] !== undefined) it[k] = str(b[k], k === 'notes' ? 500 : 80);
    if (!it.name) bad('Name required');
    it.category = it.category || 'other'; it.unit = it.unit || 'pcs'; it.qty = it.qty || 0;
    return it;
  }
  function printerFrom(b, prev = {}) {
    const p = { ...prev };
    if (b.name !== undefined) p.name = str(b.name, 60) || bad('Name required');
    if (b.code !== undefined) p.code = str(b.code, 8) || bad('Short code required (e.g. P1)');
    if (b.model !== undefined) p.model = str(b.model, 60);
    if (b.connector !== undefined) { if (!CONNECTORS.includes(b.connector)) bad('Connector must be one of ' + CONNECTORS.join(', ')); p.connector = b.connector; }
    if (b.url !== undefined) { const u = str(b.url, 300); if (u && !/^https?:\/\//i.test(u)) bad('Address must start with http:// or https://'); p.url = u; }
    if (b.apiKey !== undefined && b.apiKey !== '') p.apiKey = str(b.apiKey, 200);
    if (b.clearApiKey) delete p.apiKey;
    if (b.spoolId !== undefined) { if (b.spoolId && !store.db.filaments.some((f) => f.id === b.spoolId)) bad('Unknown spool'); p.spoolId = b.spoolId || null; }
    if (b.enabled !== undefined) p.enabled = !!b.enabled;
    if (b.notes !== undefined) p.notes = str(b.notes, 300);
    if (!p.name || !p.code) bad('Name and code are required');
    p.connector = p.connector || 'manual';
    if (['octoprint', 'moonraker'].includes(p.connector) && !p.url) bad('Network printers need an address');
    if (store.db.printers.some((x) => x.id !== p.id && x.code.toLowerCase() === p.code.toLowerCase())) bad('Code ' + p.code + ' is already used');
    return p;
  }
  function jobFrom(b, prev = {}) {
    const j = { ...prev };
    if (b.title !== undefined) j.title = str(b.title, 120);
    if (b.productId !== undefined) j.productId = str(b.productId, 60) || null;
    if (b.orderRef !== undefined) j.orderRef = str(b.orderRef, 60);
    if (b.file !== undefined) j.file = str(b.file, 200);
    if (b.notes !== undefined) j.notes = str(b.notes, 1000);
    if (b.grams !== undefined) j.grams = num(b.grams, { min: 0, max: 100000 });
    if (b.total !== undefined) j.total = num(b.total, { min: 0, max: 100000 });
    if (b.qty !== undefined) j.qty = num(b.qty, { min: 1, max: 10000 }) || 1;
    if (b.material !== undefined) { if (b.material && !MATS.includes(b.material)) bad('Bad material'); j.material = b.material || null; }
    if (b.spoolId !== undefined) {
      const s = b.spoolId ? store.db.filaments.find((f) => f.id === b.spoolId) : null;
      if (b.spoolId && !s) bad('Unknown spool');
      j.spoolId = s ? s.id : null; if (s) { j.hex = s.hex; j.material = s.material; }
    }
    if (b.hex !== undefined && !j.spoolId) { if (b.hex && !/^#[0-9a-f]{6}$/i.test(b.hex)) bad('Colour must be #RRGGBB'); j.hex = b.hex || null; }
    if (b.printerId !== undefined) {
      if (b.printerId && !store.db.printers.some((p) => p.id === b.printerId)) bad('Unknown printer');
      if (ACTIVE.includes(j.status) && b.printerId !== j.printerId) bad('Stop the job before moving it to another printer');
      j.printerId = b.printerId || null;
    }
    if (b.position !== undefined) j.position = num(b.position) || 0;
    if (!j.title && !j.productId) bad('Give the job a title or pick a product');
    if (!j.title) { const p = products().find((x) => x.id === j.productId); j.title = p ? p.name : j.productId; }
    return j;
  }
  const products = () => ((readJson('products.json') || {}).items || []).map((p) => ({ id: p.id, name: (p.name && p.name.en) || p.id, materials: p.materials || [], weight: p.stats && p.stats.weight }));

  // Start/finish a job by hand (manual printers, or overriding what a connector reported).
  function setJobStatus(db, job, status, b, user) {
    if (!JOB_STATUS.includes(status)) bad('Unknown status');
    if (FINISHED.includes(job.status)) { if (status !== 'queued') bad('Job already finished — re-queue it first'); }
    if (status === 'queued') { Object.assign(job, { status, startedAt: null, finishedAt: null, layer: 0, progress: 0, deductedG: null }); return; }
    if (ACTIVE.includes(status)) {
      if (!job.printerId) bad('Assign a printer first');
      const busy = db.jobs.find((x) => x !== job && x.printerId === job.printerId && ACTIVE.includes(x.status));
      if (busy) bad('Printer is busy with ' + busy.id);
      if (!job.startedAt) job.startedAt = now();
      job.status = status;
      if (b.layer != null) job.layer = num(b.layer, { min: 0 }) || 0;
      if (b.total != null) job.total = num(b.total, { min: 0 }) || job.total;
      if (b.progress != null) job.progress = num(b.progress, { min: 0, max: 1 });
      else if (job.total && b.layer != null) job.progress = Math.min(1, job.layer / job.total);
      return;
    }
    floor.finishJob(db, job, status, { usedG: b.usedG, by: user.username });
  }

  // ---- Routes ----
  const routes = [];
  const on = (method, pattern, fn) => routes.push([method, new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), fn]);

  on('GET', '/api/health', () => ({ ok: true, time: now(), printers: store.db.printers.length }));

  // Public website endpoints (see data/README.md contracts)
  on('GET', '/api/stock', () => stockDoc());
  on('GET', '/api/floor', () => floorFeed());
  for (const kind of ['quote', 'sell', 'corner']) on('POST', '/api/' + kind, async (req) => {
    if (!formLimit(kind + ':' + ipOf(req))) throw new HttpError(429, 'Too many submissions — try again later');
    const fd = await form(req);
    const fields = {}; let file = null;
    if (fd) {
      for (const [k, v] of fd.entries()) {
        if (typeof v === 'string') fields[k] = str(v, 4000);
        else if (k === 'file' && v.size) {
          const ext = (v.name.split('.').pop() || '').toLowerCase();
          if (!['stl', '3mf', 'obj', 'step', 'stp', 'zip'].includes(ext)) bad('Unsupported file type');
          file = v;
        }
      }
    } else Object.assign(fields, Object.fromEntries(Object.entries(await body(req)).map(([k, v]) => [k, str(typeof v === 'object' ? JSON.stringify(v) : v, 4000)])));
    if (!fields.email && !fields.phone) bad('Email or phone required');
    const id = crypto.randomUUID();
    let saved = null;
    if (file) {
      const dir = path.join(uploadDir, id); await fsp.mkdir(dir, { recursive: true });
      const name = path.basename(file.name).replace(/[^\w.\- ]+/g, '_').slice(0, 120) || 'model';
      await fsp.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
      saved = { name, size: file.size, path: path.join(id, name) };
    }
    store.change('requests', (db) => db.requests.unshift({ id, kind, at: now(), status: 'new', fields, file: saved }));
    return { ok: true, id };
  });

  // Auth
  on('POST', '/api/auth/login', async (req, res) => {
    if (!loginLimit('login:' + ipOf(req))) throw new HttpError(429, 'Too many attempts — wait 15 minutes');
    if (!sameOrigin(req)) throw new HttpError(403, 'Cross-site request blocked');
    const b = await body(req);
    const u = store.db.users.find((x) => x.username === str(b.username, 60));
    if (!A.checkPassword(u, b.password || '')) throw new HttpError(401, 'Wrong username or password');
    res.setHeader('Set-Cookie', A.sessionCookie(sessions.issue(u.username), { secure: secureCookie(req) }));
    return { username: u.username, role: u.role };
  });
  on('POST', '/api/auth/logout', (req, res) => { res.setHeader('Set-Cookie', A.sessionCookie('', { clear: true, secure: secureCookie(req) })); return { ok: true }; });
  on('GET', '/api/auth/me', (req) => { const u = userOf(req); if (!u) throw new HttpError(401, 'Not signed in'); return { username: u.username, role: u.role }; });
  on('POST', '/api/auth/password', async (req) => {
    const u = staff(req); const b = await body(req);
    if (!A.checkPassword(u, b.current || '')) throw new HttpError(401, 'Current password is wrong');
    if (String(b.next || '').length < 10) bad('New password needs at least 10 characters');
    store.change('users', () => Object.assign(u, A.hashPassword(b.next)));
    return { ok: true };
  });
  on('GET', '/api/users', (req) => { staff(req, { admin: true }); return snapshot('users', { role: 'admin' }); });
  on('POST', '/api/users', async (req) => {
    staff(req, { admin: true }); const b = await body(req);
    const username = str(b.username, 40);
    if (!/^[\w.-]{2,40}$/.test(username)) bad('Username: 2–40 letters, digits, . _ -');
    if (store.db.users.some((u) => u.username === username)) bad('That username exists');
    if (String(b.password || '').length < 10) bad('Password needs at least 10 characters');
    store.change('users', (db) => db.users.push({ username, role: b.role === 'admin' ? 'admin' : 'staff', ...A.hashPassword(b.password), createdAt: now() }));
    return { ok: true };
  });
  on('DELETE', '/api/users/:name', (req, _res, { name }) => {
    const me = staff(req, { admin: true });
    if (name === me.username) bad('You can’t delete yourself');
    store.change('users', (db) => { db.users = db.users.filter((u) => u.username !== name); });
    return { ok: true };
  });

  // Staff: everything the dashboard needs in one call, then live via /api/events
  on('GET', '/api/state', (req) => {
    const u = staff(req);
    return { user: { username: u.username, role: u.role }, printers: snapshot('printers', u), jobs: snapshot('jobs'), inventory: snapshot('inventory'), requests: snapshot('requests'), users: snapshot('users', u), products: products(), connectors: CONNECTORS, categories: ITEM_CATEGORIES };
  });
  on('GET', '/api/events', (req, res) => {
    const u = staff(req);
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 3000\n\n');
    const c = res; c.user = u; clients.add(c);
    req.on('close', () => clients.delete(c));
    return undefined;
  });

  // Inventory: filament
  on('PUT', '/api/stock', async (req) => { // Filament Studio staff save: full list
    const u = staff(req); const b = await body(req, 4 * 1048576);
    const list = Array.isArray(b) ? b : b.items;
    if (!Array.isArray(list)) bad('Expected an array of stock rows');
    const next = list.map((r) => ({ id: slug(r.id) || bad('Every row needs an id'), ...filamentFrom(r) }));
    if (new Set(next.map((r) => r.id)).size !== next.length) bad('Duplicate ids');
    store.change('inventory', (db) => {
      for (const n of next) { const o = db.filaments.find((f) => f.id === n.id); const d = n.grams - (o ? o.grams : 0); if (d) store.log(db, { kind: 'filament', ref: n.id, delta: Math.round(d * 10) / 10, reason: o ? 'Studio stock edit' : 'Added in Studio', by: u.username }); }
      db.filaments = next; db.stockUpdatedAt = now();
    });
    return { ok: true };
  });
  on('POST', '/api/filaments', async (req) => {
    const u = staff(req); const b = await body(req);
    const f = filamentFrom(b);
    let id = slug(b.id) || slug(f.material + '-' + f.name); let n = 2;
    while (store.db.filaments.some((x) => x.id === id)) id = slug(b.id || f.material + '-' + f.name) + '-' + n++;
    store.change('inventory', (db) => { db.filaments.push({ id, ...f }); db.stockUpdatedAt = now(); if (f.grams) store.log(db, { kind: 'filament', ref: id, delta: f.grams, reason: 'New colour', by: u.username }); });
    return { id };
  });
  on('PATCH', '/api/filaments/:id', async (req, _r, { id }) => {
    const u = staff(req); const b = await body(req); const f = find(store.db.filaments, id, 'Filament');
    const next = filamentFrom(b, f);
    store.change('inventory', (db) => { if (next.grams !== f.grams) store.log(db, { kind: 'filament', ref: id, delta: Math.round((next.grams - f.grams) * 10) / 10, reason: str(b.reason, 120) || 'Edited', by: u.username }); Object.assign(f, next); db.stockUpdatedAt = now(); });
    return f;
  });
  on('POST', '/api/filaments/:id/adjust', async (req, _r, { id }) => {
    const u = staff(req); const b = await body(req); const f = find(store.db.filaments, id, 'Filament');
    const delta = num(b.delta, { min: -1e6, max: 1e6 }); if (!delta) bad('Delta must be a non-zero number');
    store.change('inventory', (db) => { const before = f.grams; f.grams = Math.max(0, Math.round((f.grams + delta) * 10) / 10); store.log(db, { kind: 'filament', ref: id, delta: Math.round((f.grams - before) * 10) / 10, reason: str(b.reason, 120) || (delta > 0 ? 'Spool added' : 'Used'), by: u.username }); db.stockUpdatedAt = now(); });
    return f;
  });
  on('DELETE', '/api/filaments/:id', (req, _r, { id }) => {
    staff(req); find(store.db.filaments, id, 'Filament');
    if (store.db.jobs.some((j) => j.spoolId === id && !FINISHED.includes(j.status))) bad('A queued or running job uses this colour');
    store.change(['inventory', 'printers'], (db) => { db.filaments = db.filaments.filter((f) => f.id !== id); db.printers.forEach((p) => { if (p.spoolId === id) p.spoolId = null; }); db.stockUpdatedAt = now(); });
    return { ok: true };
  });
  on('PATCH', '/api/settings/thresholds', async (req) => {
    staff(req, { admin: true }); const b = await body(req);
    const th = { in: num(b.in, { min: 0 }), low: num(b.low, { min: 0 }) };
    if (th.in == null || th.low == null || th.low > th.in) bad('Need low ≤ in');
    store.change('inventory', (db) => { db.thresholds = th; });
    return th;
  });

  // Inventory: everything else (parts, packaging, finished products…)
  on('POST', '/api/items', async (req) => {
    const u = staff(req); const it = itemFrom(await body(req)); const id = crypto.randomUUID();
    store.change('inventory', (db) => { db.items.push({ id, ...it }); if (it.qty) store.log(db, { kind: 'item', ref: id, delta: it.qty, reason: 'New item', by: u.username }); });
    return { id };
  });
  on('PATCH', '/api/items/:id', async (req, _r, { id }) => {
    const u = staff(req); const b = await body(req); const it = find(store.db.items, id, 'Item'); const next = itemFrom(b, it);
    store.change('inventory', (db) => { if (next.qty !== it.qty) store.log(db, { kind: 'item', ref: id, delta: next.qty - it.qty, reason: str(b.reason, 120) || 'Edited', by: u.username }); Object.assign(it, next); });
    return it;
  });
  on('POST', '/api/items/:id/adjust', async (req, _r, { id }) => {
    const u = staff(req); const b = await body(req); const it = find(store.db.items, id, 'Item');
    const delta = num(b.delta, { min: -1e9, max: 1e9 }); if (!delta) bad('Delta must be a non-zero number');
    store.change('inventory', (db) => { const before = it.qty; it.qty = Math.max(0, it.qty + delta); store.log(db, { kind: 'item', ref: id, delta: it.qty - before, reason: str(b.reason, 120) || (delta > 0 ? 'Received' : 'Used'), by: u.username }); });
    return it;
  });
  on('DELETE', '/api/items/:id', (req, _r, { id }) => { staff(req); find(store.db.items, id, 'Item'); store.change('inventory', (db) => { db.items = db.items.filter((i) => i.id !== id); }); return { ok: true }; });
  on('GET', '/api/movements', (req, _r, _p, url) => {
    staff(req); const ref = url.searchParams.get('ref'); const limit = num(url.searchParams.get('limit'), { min: 1, max: 1000 }) || 200;
    return store.db.movements.filter((m) => !ref || m.ref === ref).slice(0, limit);
  });

  // Printers
  on('POST', '/api/printers', async (req) => {
    const u = staff(req, { admin: true }); const p = printerFrom(await body(req));
    const id = crypto.randomUUID(); const token = floor.newToken();
    const printer = { id, ...p, token, enabled: p.enabled !== false, createdAt: now(), createdBy: u.username };
    store.change('printers', (db) => db.printers.push(printer));
    return floor.printerView(printer, { secrets: true });
  });
  on('PATCH', '/api/printers/:id', async (req, _r, { id }) => {
    const b = await body(req); const p = find(store.db.printers, id, 'Printer');
    const onlySpool = Object.keys(b).every((k) => k === 'spoolId');
    staff(req, { admin: !onlySpool }); // any staff can swap the loaded spool; connection settings are admin-only
    const next = printerFrom(b, p);
    store.change('printers', () => { Object.keys(p).forEach((k) => { if (!(k in next)) delete p[k]; }); Object.assign(p, next); });
    if (b.connector || b.url) floor.state.delete(id);
    return floor.printerView(p);
  });
  on('DELETE', '/api/printers/:id', (req, _r, { id }) => {
    staff(req, { admin: true }); find(store.db.printers, id, 'Printer');
    if (store.db.jobs.some((j) => j.printerId === id && ACTIVE.includes(j.status))) bad('Printer has a running job');
    store.change(['printers', 'jobs'], (db) => { db.printers = db.printers.filter((p) => p.id !== id); db.jobs.forEach((j) => { if (j.printerId === id && j.status === 'queued') j.printerId = null; }); });
    floor.state.delete(id);
    return { ok: true };
  });
  on('POST', '/api/printers/:id/token', (req, _r, { id }) => { staff(req, { admin: true }); const p = find(store.db.printers, id, 'Printer'); const token = floor.newToken(); store.change('printers', () => { p.token = token; }); return { token }; });
  on('POST', '/api/printers/:id/test', async (req, _r, { id }) => { staff(req, { admin: true }); return floor.test(find(store.db.printers, id, 'Printer')); });
  on('POST', '/api/printers/test', async (req) => { staff(req, { admin: true }); const b = await body(req); return floor.test({ connector: b.connector, url: str(b.url, 300), apiKey: b.apiKey || undefined }); });
  on('POST', '/api/printers/:id/command', async (req, _r, { id }) => {
    staff(req); const b = await body(req);
    try { await floor.command(id, b.command); } catch (e) { throw new HttpError(e.status || 502, e.message); }
    return { ok: true };
  });
  // Push agents (Bambu/Prusa bridges, Home Assistant, scripts): Authorization: Bearer <printer token>
  on('POST', '/api/printers/:id/telemetry', async (req, _r, { id }) => {
    const p = store.db.printers.find((x) => x.id === id || x.code.toLowerCase() === id.toLowerCase());
    const auth = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!p || !p.token || auth.length !== p.token.length || !crypto.timingSafeEqual(Buffer.from(auth), Buffer.from(p.token))) throw new HttpError(401, 'Bad printer token');
    const b = await body(req);
    const status = ['idle', 'printing', 'paused', 'done', 'failed', 'cancelled', 'offline'].includes(b.status) ? b.status : bad('status must be idle|printing|paused|done|failed|cancelled|offline');
    const t = { status, progress: num(b.progress, { min: 0, max: 1 }), layer: num(b.layer, { min: 0 }), totalLayers: num(b.totalLayers, { min: 0 }), file: b.file ? str(b.file, 200) : undefined, eta: num(b.eta, { min: 0 }), filamentUsedMm: num(b.filamentUsedMm, { min: 0 }), filamentUsedG: num(b.filamentUsedG, { min: 0 }), message: b.message ? str(b.message, 200) : undefined,
      nozzle: b.nozzle != null ? { actual: num(b.nozzle.actual ?? b.nozzle), target: num(b.nozzle.target) } : undefined, bed: b.bed != null ? { actual: num(b.bed.actual ?? b.bed), target: num(b.bed.target) } : undefined };
    for (const k of Object.keys(t)) if (t[k] === null && !['progress'].includes(k)) delete t[k];
    floor.applyTelemetry(p.id, t, { by: p.code });
    const job = store.db.jobs.find((j) => j.printerId === p.id && ACTIVE.includes(j.status));
    return { ok: true, job: job ? { id: job.id, title: job.title, file: job.file } : null };
  });

  // Jobs
  on('POST', '/api/jobs', async (req) => {
    const u = staff(req); const b = await body(req);
    const j = jobFrom(b, { status: 'queued', qty: 1, layer: 0, progress: 0 });
    store.change(b.requestId ? ['jobs', 'requests'] : 'jobs', (db) => { j.id = store.nextJobId(); j.createdAt = now(); j.createdBy = u.username; if (b.requestId) { const r = db.requests.find((x) => x.id === b.requestId); if (r) { r.status = 'converted'; r.jobId = j.id; j.requestId = r.id; } } db.jobs.push(j); });
    return j;
  });
  on('PATCH', '/api/jobs/:id', async (req, _r, { id }) => {
    staff(req); const j = find(store.db.jobs, id, 'Job'); const next = jobFrom(await body(req), j);
    store.change(['jobs', 'printers'], () => Object.assign(j, next));
    return j;
  });
  on('POST', '/api/jobs/:id/status', async (req, _r, { id }) => {
    const u = staff(req); const j = find(store.db.jobs, id, 'Job'); const b = await body(req);
    store.change(['jobs', 'printers', 'inventory'], (db) => setJobStatus(db, j, b.status, b, u));
    return j;
  });
  on('DELETE', '/api/jobs/:id', (req, _r, { id }) => {
    staff(req); const j = find(store.db.jobs, id, 'Job');
    if (ACTIVE.includes(j.status)) bad('Cancel the job first');
    store.change(['jobs', 'printers'], (db) => { db.jobs = db.jobs.filter((x) => x.id !== id); });
    return { ok: true };
  });

  // Website submissions inbox
  on('PATCH', '/api/requests/:id', async (req, _r, { id }) => {
    staff(req); const r = find(store.db.requests, id, 'Request'); const b = await body(req);
    if (!REQUEST_STATUS.includes(b.status)) bad('Unknown status');
    store.change('requests', () => { r.status = b.status; });
    return requestView(r);
  });
  on('DELETE', '/api/requests/:id', async (req, _r, { id }) => {
    staff(req, { admin: true }); const r = find(store.db.requests, id, 'Request');
    if (r.file) await fsp.rm(path.join(uploadDir, id), { recursive: true, force: true });
    store.change('requests', (db) => { db.requests = db.requests.filter((x) => x.id !== id); });
    return { ok: true };
  });
  on('GET', '/api/requests/:id/file', async (req, res, { id }) => {
    staff(req); const r = find(store.db.requests, id, 'Request');
    if (!r.file) throw new HttpError(404, 'No file');
    const f = path.join(uploadDir, r.file.path);
    if (!f.startsWith(uploadDir + path.sep)) throw new HttpError(404, 'No file');
    res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="' + r.file.name.replace(/"/g, '') + '"', 'Cache-Control': 'no-store' });
    fs.createReadStream(f).pipe(res);
    return undefined;
  });

  // ---- Static site ----
  const configPatch = '\n;(function (c) { /* filled in by the Bara\' server: empty endpoints point at this server */\n  var e = c.endpoints = c.endpoints || {}, s = c.sources = c.sources || {};\n  var api = { quote: "/api/quote", sell: "/api/sell", corner: "/api/corner", floor: "/api/floor", stock: "/api/stock" };\n  for (var k in api) if (!e[k]) e[k] = api[k];\n  if (!s.stock) s.stock = "/api/stock";\n})(window.BARA_CONFIG = window.BARA_CONFIG || {});\n';
  async function serveStatic(req, res, url) {
    let rel = decodeURIComponent(url.pathname);
    const parts = rel.split('/').filter(Boolean);
    if (parts.some((p) => p.startsWith('.') || HIDDEN.has(p)) && !(parts[0] === '.well-known')) return notFound(res);
    let file = path.join(staticDir, rel);
    if (!file.startsWith(staticDir)) return notFound(res);
    let st = await fsp.stat(file).catch(() => null);
    if (st && st.isDirectory()) {
      if (!rel.endsWith('/')) { res.writeHead(301, { Location: rel + '/' + url.search }); return res.end(); }
      file = path.join(file, 'index.html'); st = await fsp.stat(file).catch(() => null);
    }
    if (!st || !st.isFile()) return notFound(res);
    const ext = path.extname(file).toLowerCase();
    const cache = rel.startsWith('/vendor/') ? 'public, max-age=31536000, immutable' : rel.startsWith('/data/') ? 'public, max-age=60, must-revalidate' : ext === '.html' || rel === '/site.config.js' ? 'public, max-age=0, must-revalidate' : 'public, max-age=3600';
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cache };
    if (rel.startsWith('/ops/')) headers['X-Robots-Tag'] = 'noindex, nofollow';
    if (rel === '/site.config.js') { res.writeHead(200, headers); return res.end((await fsp.readFile(file, 'utf8')) + configPatch); }
    if (req.method === 'HEAD') { res.writeHead(200, { ...headers, 'Content-Length': st.size }); return res.end(); }
    res.writeHead(200, { ...headers, 'Content-Length': st.size });
    fs.createReadStream(file).pipe(res);
  }
  async function notFound(res) {
    const page = await fsp.readFile(path.join(staticDir, '404.html')).catch(() => null);
    res.writeHead(404, { 'Content-Type': page ? MIME['.html'] : 'text/plain' }); res.end(page || 'Not found');
  }

  // ---- Server ----
  const security = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self)' };
  async function handle(req, res) {
    for (const [k, v] of Object.entries(security)) res.setHeader(k, v);
    if (secureCookie(req)) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    const url = new URL(req.url, 'http://local');
    const origin = req.headers.origin && req.headers.origin.replace(/\/$/, '');
    const isPublicApi = /^\/api\/(stock|floor|quote|sell|corner|health)$/.test(url.pathname);
    if (origin && isPublicApi && allowedOrigins.has(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Access-Control-Allow-Credentials', 'true'); res.setHeader('Vary', 'Origin'); }
    if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept'); res.writeHead(204); return res.end(); }
    try {
      if (url.pathname.startsWith('/api/')) {
        // A public form posted from an allowed external site origin is fine; everything else must be same-origin when it carries an Origin.
        if (req.method !== 'GET' && origin && !sameOrigin(req) && !(isPublicApi && allowedOrigins.has(origin)) && !/\/telemetry$/.test(url.pathname)) throw new HttpError(403, 'Cross-site request blocked');
        for (const [method, re, fn] of routes) {
          const m = url.pathname.match(re);
          if (!m) continue;
          if (method !== req.method) continue;
          const out = await fn(req, res, Object.fromEntries(Object.entries(m.groups || {}).map(([k, v]) => [k, decodeURIComponent(v)])), url);
          if (out !== undefined && !res.headersSent) send(res, 200, out);
          return;
        }
        throw new HttpError(routes.some(([, re]) => re.test(url.pathname)) ? 405 : 404, 'No such endpoint');
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, 'Method not allowed');
      await serveStatic(req, res, url);
    } catch (e) {
      const status = e.status || 500;
      if (status >= 500) log.error('[bara]', req.method, url.pathname, e);
      if (!res.headersSent) send(res, status, { error: status >= 500 ? 'Server error' : e.message });
      else res.end();
    }
  }

  const server = http.createServer(handle);
  server.on('close', () => { clearInterval(ping); floor.stop(); for (const c of clients) c.end(); });
  return { server, store, floor, handle };
}

module.exports = { createApp };

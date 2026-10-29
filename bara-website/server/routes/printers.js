// Printers: connections, slots, commands, push telemetry.
'use strict';
const crypto = require('node:crypto');
const M = require('../maintenance');
const R = require('../router');
const {HttpError, bad, str, num, now} = require('../http');
const {ACTIVE} = require('../floor');

module.exports = function register(ctx) {
  const {body, find, floor, on, printerFrom, staff, store} = ctx;
  on('POST', '/api/printers', async (req) => {
    const u = staff(req, {admin: true});
    const p = printerFrom(await body(req));
    const id = crypto.randomUUID();
    const token = floor.newToken();
    const printer = {
      id,
      ...p,
      slots: p.slots || [null],
      token,
      enabled: p.enabled !== false,
      createdAt: now(),
      createdBy: u.username,
    };
    M.ensure(printer, {id: () => crypto.randomUUID()});
    store.change(['printers', 'jobs'], (db) => {
      db.printers.push(printer);
      R.routePending(db);
    });
    return floor.printerView(printer, {secrets: true});
  });
  on('PATCH', '/api/printers/:id', async (req, _r, {id}) => {
    const b = await body(req);
    const p = find(store.db.printers, id, 'Printer');
    const onlySpool = Object.keys(b).every(
      (k) => k === 'spoolId' || k === 'slots',
    );
    // any staff can swap loaded spools; connection settings are admin-only
    staff(req, {admin: !onlySpool});
    const next = printerFrom(b, p);
    store.change(['printers', 'jobs'], (db) => {
      Object.keys(p).forEach((k) => {
        if (!(k in next)) delete p[k];
      });
      Object.assign(p, next);
      R.routePending(db);
    });
    if (b.connector || b.url) floor.state.delete(id);
    return floor.printerView(p);
  });
  on('DELETE', '/api/printers/:id', (req, _r, {id}) => {
    staff(req, {admin: true});
    find(store.db.printers, id, 'Printer');
    if (
      store.db.jobs.some((j) => j.printerId === id && ACTIVE.includes(j.status))
    ) {
      bad('Printer has a running job');
    }
    store.change(['printers', 'jobs'], (db) => {
      db.printers = db.printers.filter((p) => p.id !== id);
      db.jobs.forEach((j) => {
        if (j.printerId === id && j.status === 'queued') j.printerId = null;
      });
    });
    floor.state.delete(id);
    return {ok: true};
  });
  on('POST', '/api/printers/:id/token', (req, _r, {id}) => {
    staff(req, {admin: true});
    const p = find(store.db.printers, id, 'Printer');
    const token = floor.newToken();
    store.change('printers', () => {
      p.token = token;
    });
    return {token};
  });
  on('POST', '/api/printers/:id/test', async (req, _r, {id}) => {
    staff(req, {admin: true});
    return floor.test(find(store.db.printers, id, 'Printer'));
  });
  on('POST', '/api/printers/test', async (req) => {
    staff(req, {admin: true});
    const b = await body(req);
    return floor.test({
      connector: b.connector,
      url: str(b.url, 300),
      apiKey: b.apiKey || undefined,
    });
  });
  on('POST', '/api/printers/:id/command', async (req, _r, {id}) => {
    staff(req);
    const b = await body(req);
    try {
      await floor.command(id, b.command);
    } catch (e) {
      throw new HttpError(e.status || 502, e.message);
    }
    return {ok: true};
  });
  // Push agents (Bambu/Prusa bridges, Home Assistant, scripts): Authorization:
  // Bearer <printer token>
  on('POST', '/api/printers/:id/telemetry', async (req, _r, {id}) => {
    const p = store.db.printers.find(
      (x) => x.id === id || x.code.toLowerCase() === id.toLowerCase(),
    );
    const auth = String(req.headers.authorization || '').replace(
      /^Bearer\s+/i,
      '',
    );
    if (
      !p ||
      !p.token ||
      auth.length !== p.token.length ||
      !crypto.timingSafeEqual(Buffer.from(auth), Buffer.from(p.token))
    ) {
      throw new HttpError(401, 'Bad printer token');
    }
    const b = await body(req);
    const status = [
      'idle',
      'printing',
      'paused',
      'done',
      'failed',
      'cancelled',
      'offline',
    ].includes(b.status)
      ? b.status
      : bad(
          'status must be idle|printing|paused|done|failed|cancelled|offline',
        );
    const t = {
      status,
      progress: num(b.progress, {min: 0, max: 1}),
      layer: num(b.layer, {min: 0}),
      totalLayers: num(b.totalLayers, {min: 0}),
      file: b.file ? str(b.file, 200) : undefined,
      eta: num(b.eta, {min: 0}),
      filamentUsedMm: num(b.filamentUsedMm, {min: 0}),
      filamentUsedG: num(b.filamentUsedG, {min: 0}),
      message: b.message ? str(b.message, 200) : undefined,
      nozzle:
        b.nozzle != null
          ? {
              actual: num(b.nozzle.actual ?? b.nozzle),
              target: num(b.nozzle.target),
            }
          : undefined,
      bed:
        b.bed != null
          ? {actual: num(b.bed.actual ?? b.bed), target: num(b.bed.target)}
          : undefined,
    };
    for (const k of Object.keys(t)) {
      if (t[k] === null && !['progress'].includes(k)) delete t[k];
    }
    const trays = b.slots || b.ams;
    if (Array.isArray(trays) && trays.length && trays.length <= R.MAX_SLOTS) {
      // AMS / multi-spool report: [{ hex, material }] per slot (null = empty).
      // Matched to shelf colours by nearest colour.
      const next = trays.map((x) =>
        x && x.hex ? (R.matchFilament(store.db, x) || {}).id || null : null,
      );
      const reported = trays.map((x) =>
        x && x.hex
          ? {
              hex:
                '#' + String(x.hex).replace(/^#/, '').slice(0, 6).toUpperCase(),
              material: str(x.material, 20),
            }
          : null,
      );
      if (
        JSON.stringify(next) !== JSON.stringify(p.slots) ||
        JSON.stringify(reported) !== JSON.stringify(p.slotsReported)
      ) {
        store.change(['printers', 'jobs'], (db) => {
          p.slots = next;
          p.slotsReported = reported;
          R.routePending(db);
        });
      }
    }
    floor.applyTelemetry(p.id, t, {by: p.code});
    const job = store.db.jobs.find(
      (j) => j.printerId === p.id && ACTIVE.includes(j.status),
    );
    return {
      ok: true,
      job: job ? {id: job.id, title: job.title, file: job.file} : null,
    };
  });

  // Jobs
};

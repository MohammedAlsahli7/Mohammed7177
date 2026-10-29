// Maintenance tasks, out-of-service and the upkeep log.
'use strict';
const crypto = require('node:crypto');
const M = require('../maintenance');
const R = require('../router');
const {bad, str, num, now} = require('../http');
const {ACTIVE} = require('../floor');

module.exports = function register(ctx) {
  const {body, find, floor, nozzleFrom, on, staff, store, upkeepLog} = ctx;
  // ---- Maintenance & service ----
  const printerById = (id) => find(store.db.printers, id, 'Printer');
  const taskFrom = (b, prev = {}) => {
    const t = {...prev};
    if (b.name !== undefined) t.name = str(b.name, 100) || bad('Name required');
    if (b.kind !== undefined) {
      if (!M.KINDS.includes(b.kind)) {
        bad('Kind must be one of ' + M.KINDS.join(', '));
      }
      t.kind = b.kind;
    }
    if (b.every !== undefined) {
      t.every = M.cleanEvery(b.every);
      if (!Object.keys(t.every).length) {
        bad('Set at least one interval: hours, grams, meters or days');
      }
    }
    if (b.notes !== undefined) t.notes = str(b.notes, 300);
    if (!t.name || !t.every) bad('Name and interval required');
    t.kind = t.kind || 'other';
    return t;
  };
  on('POST', '/api/printers/:id/maintenance', async (req, _r, {id}) => {
    const u = staff(req, {admin: true});
    const p = printerById(id);
    const t = taskFrom(await body(req));
    const task = {
      id: crypto.randomUUID(),
      ...t,
      last: {at: now(), usage: {...p.usage}, by: u.username},
    };
    store.change('printers', () => p.maintenance.push(task));
    return task;
  });
  on(
    'PATCH',
    '/api/printers/:id/maintenance/:task',
    async (req, _r, {id, task}) => {
      staff(req, {admin: true});
      const p = printerById(id);
      const t = find(p.maintenance, task, 'Task');
      const next = taskFrom(await body(req), t);
      store.change('printers', () => Object.assign(t, next));
      return t;
    },
  );
  on('DELETE', '/api/printers/:id/maintenance/:task', (req, _r, {id, task}) => {
    staff(req, {admin: true});
    const p = printerById(id);
    find(p.maintenance, task, 'Task');
    store.change('printers', () => {
      p.maintenance = p.maintenance.filter((x) => x.id !== task);
    });
    return {ok: true};
  });
  // Mark a task done: resets its counters; can use a part from inventory (e.g.
  // a nozzle) and record a new nozzle.
  on(
    'POST',
    '/api/printers/:id/maintenance/:task/done',
    async (req, _r, {id, task}) => {
      const u = staff(req);
      const p = printerById(id);
      const t = find(p.maintenance, task, 'Task');
      const b = await body(req);
      const part = b.itemId ? find(store.db.items, b.itemId, 'Part') : null;
      const qty = num(b.qty, {min: 1, max: 1000}) || 1;
      if (part && part.qty < qty) {
        bad(
          'Only ' +
            part.qty +
            ' ' +
            (part.unit || 'pcs') +
            ' of ' +
            part.name +
            ' in stock',
        );
      }
      const active = store.db.jobs.find(
        (j) => j.printerId === p.id && ACTIVE.includes(j.status),
      );
      const usage = M.usageNow(p, active);
      store.change(['printers', 'inventory'], (db) => {
        t.last = {at: now(), usage, by: u.username, note: str(b.note, 300)};
        if (part) {
          part.qty -= qty;
          store.log(db, {
            kind: 'item',
            ref: part.id,
            delta: -qty,
            reason: t.name + ' on ' + p.code,
            by: u.username,
          });
        }
        if (t.kind === 'nozzle' || b.nozzle) {
          p.nozzle = {
            ...nozzleFrom(b.nozzle || p.nozzle || {}, p),
            usageAtInstall: usage,
          };
        }
        upkeepLog(db, {
          printerId: p.id,
          code: p.code,
          task: t.name,
          kind: t.kind,
          by: u.username,
          note: str(b.note, 300),
          part: part ? {id: part.id, name: part.name, qty} : null,
          usage,
        });
      });
      return floor.printerView(p);
    },
  );
  on('POST', '/api/printers/:id/service', async (req, _r, {id}) => {
    const u = staff(req);
    const p = printerById(id);
    const b = await body(req);
    if (!['in', 'out'].includes(b.status)) bad('status must be in or out');
    if (b.status === 'out' && !str(b.reason, 200)) {
      bad('Say why it’s out of service');
    }
    store.change(['printers', 'jobs'], (db) => {
      const was = p.service || {status: 'in'};
      p.service =
        b.status === 'out'
          ? {
              status: 'out',
              reason: str(b.reason, 200),
              since: now(),
              until: str(b.until, 30) || null,
              by: u.username,
            }
          : {status: 'in', since: now(), by: u.username};
      // Queued work waiting on this printer goes back to the pool and is re-
      // routed.
      if (b.status === 'out') {
        db.jobs.forEach((j) => {
          if (j.printerId === p.id && j.status === 'queued') {
            j.printerId = null;
            j.autoRoute = true;
            j.routeNote = p.code + ' went out of service';
          }
        });
      }
      upkeepLog(db, {
        printerId: p.id,
        code: p.code,
        task:
          b.status === 'out'
            ? 'Out of service: ' + p.service.reason
            : 'Back in service' +
              (was.since
                ? ' (out ' +
                  Math.round((Date.now() - Date.parse(was.since)) / 3600000) +
                  ' h)'
                : ''),
        kind: 'service',
        by: u.username,
      });
      R.routePending(db);
    });
    return floor.printerView(p);
  });
  on('GET', '/api/maintenance/log', (req, _r, _p, url) => {
    staff(req);
    const pid = url.searchParams.get('printerId');
    return store.db.upkeepLog
      .filter((e) => !pid || e.printerId === pid)
      .slice(0, 300);
  });
};

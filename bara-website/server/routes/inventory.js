// Inventory: filament, parts & supplies, movements.
'use strict';
const crypto = require('node:crypto');
const {bad, str, num, slug, now} = require('../http');
const {FINISHED} = require('../floor');

module.exports = function register(ctx) {
  const {body, filamentFrom, find, itemFrom, on, staff, store} = ctx;
  on('PUT', '/api/stock', async (req) => {
    // Filament Studio staff save: full list
    const u = staff(req);
    const b = await body(req, 4 * 1048576);
    const list = Array.isArray(b) ? b : b.items;
    if (!Array.isArray(list)) bad('Expected an array of stock rows');
    const next = list.map((r) => ({
      id: slug(r.id) || bad('Every row needs an id'),
      ...filamentFrom(r),
    }));
    if (new Set(next.map((r) => r.id)).size !== next.length) {
      bad('Duplicate ids');
    }
    store.change('inventory', (db) => {
      for (const n of next) {
        const o = db.filaments.find((f) => f.id === n.id);
        const d = n.grams - (o ? o.grams : 0);
        if (d) {
          store.log(db, {
            kind: 'filament',
            ref: n.id,
            delta: Math.round(d * 10) / 10,
            reason: o ? 'Studio stock edit' : 'Added in Studio',
            by: u.username,
          });
        }
      }
      db.filaments = next;
      db.stockUpdatedAt = now();
    });
    return {ok: true};
  });
  on('POST', '/api/filaments', async (req) => {
    const u = staff(req);
    const b = await body(req);
    const f = filamentFrom(b);
    let id = slug(b.id) || slug(f.material + '-' + f.name);
    let n = 2;
    while (store.db.filaments.some((x) => x.id === id)) {
      id = slug(b.id || f.material + '-' + f.name) + '-' + n++;
    }
    store.change('inventory', (db) => {
      db.filaments.push({id, ...f});
      db.stockUpdatedAt = now();
      if (f.grams) {
        store.log(db, {
          kind: 'filament',
          ref: id,
          delta: f.grams,
          reason: 'New colour',
          by: u.username,
        });
      }
    });
    return {id};
  });
  on('PATCH', '/api/filaments/:id', async (req, _r, {id}) => {
    const u = staff(req);
    const b = await body(req);
    const f = find(store.db.filaments, id, 'Filament');
    const next = filamentFrom(b, f);
    store.change('inventory', (db) => {
      if (next.grams !== f.grams) {
        store.log(db, {
          kind: 'filament',
          ref: id,
          delta: Math.round((next.grams - f.grams) * 10) / 10,
          reason: str(b.reason, 120) || 'Edited',
          by: u.username,
        });
      }
      Object.assign(f, next);
      db.stockUpdatedAt = now();
    });
    return f;
  });
  on('POST', '/api/filaments/:id/adjust', async (req, _r, {id}) => {
    const u = staff(req);
    const b = await body(req);
    const f = find(store.db.filaments, id, 'Filament');
    const delta = num(b.delta, {min: -1e6, max: 1e6});
    if (!delta) bad('Delta must be a non-zero number');
    store.change('inventory', (db) => {
      const before = f.grams;
      f.grams = Math.max(0, Math.round((f.grams + delta) * 10) / 10);
      store.log(db, {
        kind: 'filament',
        ref: id,
        delta: Math.round((f.grams - before) * 10) / 10,
        reason: str(b.reason, 120) || (delta > 0 ? 'Spool added' : 'Used'),
        by: u.username,
      });
      db.stockUpdatedAt = now();
    });
    return f;
  });
  on('DELETE', '/api/filaments/:id', (req, _r, {id}) => {
    staff(req);
    find(store.db.filaments, id, 'Filament');
    if (
      store.db.jobs.some(
        (j) => j.spoolId === id && !FINISHED.includes(j.status),
      )
    ) {
      bad('A queued or running job uses this colour');
    }
    store.change(['inventory', 'printers'], (db) => {
      db.filaments = db.filaments.filter((f) => f.id !== id);
      db.printers.forEach((p) => {
        if (p.spoolId === id) p.spoolId = null;
      });
      db.stockUpdatedAt = now();
    });
    return {ok: true};
  });
  on('PATCH', '/api/settings/thresholds', async (req) => {
    staff(req, {admin: true});
    const b = await body(req);
    const th = {in: num(b.in, {min: 0}), low: num(b.low, {min: 0})};
    if (th.in == null || th.low == null || th.low > th.in) bad('Need low ≤ in');
    store.change('inventory', (db) => {
      db.thresholds = th;
    });
    return th;
  });

  // Inventory: everything else (parts, packaging, finished products…)
  on('POST', '/api/items', async (req) => {
    const u = staff(req);
    const it = itemFrom(await body(req));
    const id = crypto.randomUUID();
    store.change('inventory', (db) => {
      db.items.push({id, ...it});
      if (it.qty) {
        store.log(db, {
          kind: 'item',
          ref: id,
          delta: it.qty,
          reason: 'New item',
          by: u.username,
        });
      }
    });
    return {id};
  });
  on('PATCH', '/api/items/:id', async (req, _r, {id}) => {
    const u = staff(req);
    const b = await body(req);
    const it = find(store.db.items, id, 'Item');
    const next = itemFrom(b, it);
    store.change('inventory', (db) => {
      if (next.qty !== it.qty) {
        store.log(db, {
          kind: 'item',
          ref: id,
          delta: next.qty - it.qty,
          reason: str(b.reason, 120) || 'Edited',
          by: u.username,
        });
      }
      Object.assign(it, next);
    });
    return it;
  });
  on('POST', '/api/items/:id/adjust', async (req, _r, {id}) => {
    const u = staff(req);
    const b = await body(req);
    const it = find(store.db.items, id, 'Item');
    const delta = num(b.delta, {min: -1e9, max: 1e9});
    if (!delta) bad('Delta must be a non-zero number');
    store.change('inventory', (db) => {
      const before = it.qty;
      it.qty = Math.max(0, it.qty + delta);
      store.log(db, {
        kind: 'item',
        ref: id,
        delta: it.qty - before,
        reason: str(b.reason, 120) || (delta > 0 ? 'Received' : 'Used'),
        by: u.username,
      });
    });
    return it;
  });
  on('DELETE', '/api/items/:id', (req, _r, {id}) => {
    staff(req);
    find(store.db.items, id, 'Item');
    store.change('inventory', (db) => {
      db.items = db.items.filter((i) => i.id !== id);
    });
    return {ok: true};
  });
  on('GET', '/api/movements', (req, _r, _p, url) => {
    staff(req);
    const ref = url.searchParams.get('ref');
    const limit =
      num(url.searchParams.get('limit'), {min: 1, max: 1000}) || 200;
    return store.db.movements
      .filter((m) => !ref || m.ref === ref)
      .slice(0, limit);
  });

  // Printers
};

// Cost settings, calculator, product margins and quotes.
'use strict';
const C = require('../costing');
const {bad, num, now, MATS} = require('../http');

module.exports = function register(ctx) {
  const {body, find, on, pricing, readJson, requestView, staff, store} = ctx;
  // ---- Costing: settings, calculator, product margins, quotes ----
  on('GET', '/api/costing', (req) => {
    staff(req);
    return store.db.costing;
  });
  on('PATCH', '/api/costing', async (req) => {
    staff(req, {admin: true});
    const b = await body(req);
    let next;
    try {
      next = C.clean(b, store.db.costing);
    } catch (e) {
      bad(e.message);
    }
    store.change('costing', (db) => {
      db.costing = next;
    });
    return next;
  });
  const calcInput = (b) => {
    const filament = b.spoolId
      ? store.db.filaments.find((f) => f.id === b.spoolId)
      : null;
    const printer = b.printerId
      ? store.db.printers.find((p) => p.id === b.printerId)
      : null;
    const material =
      (filament && filament.material) ||
      (MATS.includes(b.material) ? b.material : 'pla');
    let grams = num(b.grams, {min: 0, max: 1e6});
    if (grams == null && num(b.volume_cm3, {min: 0}) != null) {
      grams =
        +b.volume_cm3 *
        ((pricing.materials || {})[material] || {density: 1.24}).density *
        store.db.costing.fillFactor;
    }
    return {
      ...b,
      grams: grams || 0,
      hours: num(b.hours, {min: 0, max: 10000}),
      material,
      filament,
      printer,
      rush: !!b.rush,
      packaging: b.packaging !== false,
    };
  };
  on('POST', '/api/costing/calc', async (req) => {
    staff(req);
    return C.compute(calcInput(await body(req)), store.db.costing);
  });
  on('GET', '/api/costing/products', (req) => {
    staff(req);
    return ((readJson('products.json') || {}).items || []).map((p) => {
      const grams = C.parseGrams(p.stats && p.stats.weight);
      const hours = C.parseHours(p.stats && p.stats.time);
      const material = (p.materials || [])[0] || 'pla';
      return {
        id: p.id,
        name: (p.name && p.name.en) || p.id,
        price: p.price,
        material,
        grams,
        hours,
        ...(grams
          ? {
              calc: C.compute(
                {grams, hours, material, price: p.price},
                store.db.costing,
              ),
              suggested: C.compute({grams, hours, material}, store.db.costing)
                .price,
            }
          : {}),
      };
    });
  });
  on('POST', '/api/requests/:id/quote', async (req, _r, {id}) => {
    const u = staff(req);
    const r = find(store.db.requests, id, 'Request');
    const b = await body(req);
    const c = C.compute(calcInput(b), store.db.costing);
    store.change('requests', () => {
      r.quote = {
        ...c,
        input: {
          grams: c.grams,
          hours: b.hours || null,
          material: c.material,
          qty: c.qty,
          postMinutes: b.postMinutes || null,
          rush: !!b.rush,
        },
        at: now(),
        by: u.username,
      };
      if (r.status === 'new') r.status = 'seen';
    });
    return requestView(r);
  });
};

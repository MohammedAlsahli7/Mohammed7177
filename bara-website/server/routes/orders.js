// Paid orders → routed print jobs.
'use strict';
const crypto = require('node:crypto');
const R = require('../router');
const C = require('../costing');
const {bad, str, num, now, MATS} = require('../http');

module.exports = function register(ctx) {
  const {body, on, orderToken, readJson, staff, store} = ctx;
  // ---- Paid orders → print jobs, routed to a printer with the colour loaded
  // ----
  // Called by the payment provider's webhook handler / store system (Bearer
  // BARA_ORDER_TOKEN) or by staff. Idempotent on ref.
  on('POST', '/api/orders', async (req) => {
    const auth = String(req.headers.authorization || '').replace(
      /^Bearer\s+/i,
      '',
    );
    const byToken =
      orderToken &&
      auth.length === orderToken.length &&
      crypto.timingSafeEqual(Buffer.from(auth), Buffer.from(orderToken));
    const u = byToken ? {username: 'orders'} : staff(req);
    const b = await body(req);
    const ref = str(b.ref, 60) || bad('Order ref required');
    if (b.paid !== true) bad('Only paid orders are queued (paid: true)');
    const existing = store.db.orders.find((o) => o.ref === ref);
    if (existing) return {...existing, duplicate: true};
    if (!Array.isArray(b.items) || !b.items.length || b.items.length > 100) {
      bad('items: 1–100 lines');
    }
    const catalogue = (readJson('products.json') || {}).items || [];
    const order = {
      id: crypto.randomUUID(),
      ref,
      at: now(),
      by: u.username,
      notes: str(b.notes, 500),
      items: [],
    };
    store.change(['orders', 'jobs', 'printers'], (db) => {
      for (const it of b.items) {
        const prod = catalogue.find((p) => p.id === it.productId);
        const qty = Math.min(
          50,
          Math.max(1, Math.round(num(it.qty, {min: 1}) || 1)),
        );
        const material = MATS.includes(it.material)
          ? it.material
          : prod && prod.materials
            ? prod.materials[0]
            : null;
        const hex = String(it.colour || it.hex || '').toUpperCase();
        const spool =
          (it.spoolId && db.filaments.find((f) => f.id === it.spoolId)) ||
          db.filaments.find(
            (f) =>
              f.hex.toUpperCase() === hex &&
              (!material || f.material === material),
          );
        const extra = (
          Array.isArray(it.colours) ? it.colours.slice(1) : []
        ).map((h) =>
          db.filaments.find(
            (f) =>
              f.hex.toUpperCase() === String(h).toUpperCase() &&
              (!material || f.material === material),
          ),
        );
        const spools = [spool]
          .concat(extra)
          .filter(Boolean)
          .map((f) => f.id);
        const line = {
          productId: it.productId || null,
          spools,
          title: prod ? prod.name.en : str(it.title, 120) || 'Custom item',
          material,
          hex: spool ? spool.hex : hex || null,
          spoolId: spool ? spool.id : null,
          qty,
          unitPrice: num(it.unitPrice, {min: 0}),
          jobs: [],
        };
        for (let k = 1; k <= qty; k++) {
          // one job per unit, so units can print in parallel on different
          // printers
          const j = {
            id: store.nextJobId(),
            title: line.title + (qty > 1 ? ' (' + k + '/' + qty + ')' : ''),
            productId: line.productId,
            orderRef: ref,
            material,
            spoolId: line.spoolId,
            spools: line.spools,
            hex: line.hex,
            qty: 1,
            unitPrice: line.unitPrice,
            grams: prod
              ? C.parseGrams(prod.stats && prod.stats.weight)
              : num(it.grams, {min: 0}),
            status: 'queued',
            layer: 0,
            progress: 0,
            autoRoute: true,
            createdAt: now(),
            createdBy: u.username,
            source: 'order',
            routeNote: line.spoolId
              ? null
              : 'Colour ' + (hex || '?') + ' isn’t on the shelf',
          };
          db.jobs.push(j);
          line.jobs.push(j.id);
        }
        order.items.push(line);
      }
      R.routePending(db);
      db.orders.unshift(order);
    });
    return {
      ...order,
      jobs: order.items
        .flatMap((l) => l.jobs)
        .map((id) => {
          const j = store.db.jobs.find((x) => x.id === id);
          const p = store.db.printers.find((x) => x.id === j.printerId);
          return {id, printer: p ? p.code : null, note: j.routeNote || null};
        }),
    };
  });

  // Website submissions inbox
};

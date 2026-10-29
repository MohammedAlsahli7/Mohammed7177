// Paid order → print jobs (one per unit, colour matched to a shelf spool),
// routed to printers. Shared by POST /api/orders and online checkout.
'use strict';
const crypto = require('node:crypto');
const R = require('./router');
const C = require('./costing');
const {str, num, now, MATS} = require('./http');

/**
 * Finds the shelf spool for a colour (exact hex) of a material.
 * @param {!Object} db
 * @param {string} hex
 * @param {?string} material
 * @return {?Object}
 */
function spoolForColour(db, hex, material) {
  const h = String(hex || '').toUpperCase();
  return (
    db.filaments.find(
      (f) =>
        f.hex.toUpperCase() === h && (!material || f.material === material),
    ) || null
  );
}

/**
 * Builds one order line and its jobs inside a store change.
 * @param {!Store} store
 * @param {!Object} db
 * @param {!Array<!Object>} catalogue products.json items.
 * @param {!Object} it Input line.
 * @param {!Object} ctx {ref, by}
 * @return {!Object} The line.
 */
function addLine(store, db, catalogue, it, {ref, by}) {
  const prod = catalogue.find((p) => p.id === it.productId);
  const qty = Math.min(50, Math.max(1, Math.round(num(it.qty, {min: 1}) || 1)));
  let material = MATS.includes(it.material) ? it.material : null;
  if (!material && prod && prod.materials) material = prod.materials[0];
  const hex = String(it.colour || it.hex || '').toUpperCase();
  const spool =
    (it.spoolId && db.filaments.find((f) => f.id === it.spoolId)) ||
    spoolForColour(db, hex, material);
  const extra = (Array.isArray(it.colours) ? it.colours.slice(1) : []).map(
    (h) => spoolForColour(db, h, material),
  );
  const line = {
    productId: it.productId || null,
    spools: [spool]
      .concat(extra)
      .filter(Boolean)
      .map((f) => f.id),
    title: prod ? prod.name.en : str(it.title, 120) || 'Custom item',
    material,
    hex: spool ? spool.hex : hex || null,
    spoolId: spool ? spool.id : null,
    qty,
    unitPrice: num(it.unitPrice, {min: 0}),
    jobs: [],
  };
  const grams = prod
    ? C.parseGrams(prod.stats && prod.stats.weight)
    : num(it.grams, {min: 0});
  // One job per unit, so units can print in parallel on different printers.
  for (let k = 1; k <= qty; k++) {
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
      grams,
      status: 'queued',
      layer: 0,
      progress: 0,
      autoRoute: true,
      createdAt: now(),
      createdBy: by,
      source: 'order',
      routeNote: line.spoolId
        ? null
        : 'Colour ' + (hex || '?') + ' isn’t on the shelf',
    };
    db.jobs.push(j);
    line.jobs.push(j.id);
  }
  return line;
}

/**
 * Creates a paid order and its routed jobs. Idempotent on ref.
 * @param {!Store} store
 * @param {!Array<!Object>} catalogue products.json items.
 * @param {!Object} input {ref, items, by, notes, customer, payment}
 * @return {!Object} The order (with duplicate: true if it already existed).
 */
function createOrder(store, catalogue, input) {
  const existing = store.db.orders.find((o) => o.ref === input.ref);
  if (existing) return {...existing, duplicate: true};
  const order = {
    id: crypto.randomUUID(),
    ref: input.ref,
    at: now(),
    by: input.by,
    notes: str(input.notes, 500),
    customer: input.customer || null,
    payment: input.payment || null,
    items: [],
  };
  store.change(['orders', 'jobs', 'printers'], (db) => {
    for (const it of input.items) {
      order.items.push(addLine(store, db, catalogue, it, input));
    }
    R.routePending(db);
    db.orders.unshift(order);
  });
  return order;
}

/**
 * Which printer each of the order's jobs went to.
 * @param {!Store} store
 * @param {!Object} order
 * @return {!Array<!Object>}
 */
function jobSummary(store, order) {
  return order.items
    .flatMap((l) => l.jobs)
    .map((id) => {
      const j = store.db.jobs.find((x) => x.id === id);
      const p = j && store.db.printers.find((x) => x.id === j.printerId);
      return {id, printer: p ? p.code : null, note: (j && j.routeNote) || null};
    });
}

module.exports = {createOrder, jobSummary, spoolForColour};

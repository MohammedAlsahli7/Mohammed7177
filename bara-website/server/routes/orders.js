// Paid orders posted by a store system, an adapter or staff → routed jobs.
'use strict';
const crypto = require('node:crypto');
const {createOrder, jobSummary} = require('../orders');
const {bad, str} = require('../http');

module.exports = function register(ctx) {
  const {body, on, orderToken, readJson, staff, store} = ctx;
  // Authorization: Bearer BARA_ORDER_TOKEN (machines) or a staff session.
  // Idempotent on ref, so webhook retries are safe.
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
    if (!Array.isArray(b.items) || !b.items.length || b.items.length > 100) {
      bad('items: 1–100 lines');
    }
    const catalogue = (readJson('products.json') || {}).items || [];
    const order = createOrder(store, catalogue, {
      ref,
      items: b.items,
      by: u.username,
      notes: b.notes,
      customer: b.customer || null,
    });
    return {...order, jobs: jobSummary(store, order)};
  });
};

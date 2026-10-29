// Online checkout: re-price the cart, send the customer to the payment page,
// and queue the order once the provider confirms it was paid.
'use strict';
const crypto = require('node:crypto');
const {createOrder} = require('../orders');
const {spoolForColour} = require('../orders');
const {minor} = require('../payments');
const {HttpError, bad, str, num, now, MATS} = require('../http');

const MAX_LINES = 30;
const MAX_QTY = 20;
const newRef = () =>
  'BR-' +
  new Date().toISOString().slice(2, 10).replace(/-/g, '') +
  '-' +
  crypto.randomBytes(3).toString('hex').toUpperCase();

module.exports = function register(ctx) {
  const {on, store, readJson, opts, formLimit, ipOf, payments, staff} = ctx;
  const stockStatus = (g, th) =>
    g >= th.in ? 'in' : g >= th.low ? 'low' : 'out';

  /**
   * Reads the whole request body as text (signature checks need the raw bytes).
   * @param {!http.IncomingMessage} req
   * @return {!Promise<string>}
   */
  async function raw(req) {
    let size = 0;
    const chunks = [];
    for await (const c of req) {
      size += c.length;
      if (size > 1048576) throw new HttpError(413, 'Body too large');
      chunks.push(c);
    }
    return Buffer.concat(chunks).toString('utf8');
  }

  /**
   * Public base URL for the payment page to send customers back to.
   * @param {!http.IncomingMessage} req
   * @return {string}
   */
  function publicUrl(req) {
    if (opts.publicUrl) return opts.publicUrl.replace(/\/$/, '');
    const proto =
      (opts.trustProxy && req.headers['x-forwarded-proto']) || 'http';
    return (
      proto + '://' + (req.headers['x-forwarded-host'] || req.headers.host)
    );
  }

  /**
   * Prices the cart from the catalogue and the live shelf — never the browser.
   * @param {!Array<!Object>} items
   * @return {!Object} {lines, total}
   */
  function price(items) {
    if (!Array.isArray(items) || !items.length || items.length > MAX_LINES) {
      bad('The cart needs 1–' + MAX_LINES + ' lines');
    }
    const catalogue = (readJson('products.json') || {}).items || [];
    const th = store.db.thresholds;
    const lines = items.map((it) => {
      const p = catalogue.find((x) => x.id === it.id && x.published !== false);
      if (!p) bad('A product in your cart is no longer sold');
      const material = MATS.includes(it.material) ? it.material : null;
      if (!material || !(p.materials || []).includes(material)) {
        bad(p.name.en + ' isn’t made in that material');
      }
      const spool = spoolForColour(store.db, it.colour, material);
      if (!spool || stockStatus(spool.grams, th) === 'out') {
        bad(p.name.en + ': that colour just ran out');
      }
      const qty = Math.round(num(it.qty, {min: 1, max: MAX_QTY}) || 0);
      if (!qty) bad('Quantity must be 1–' + MAX_QTY);
      return {
        productId: p.id,
        title: p.name.en,
        material,
        colour: spool.hex,
        colourName: spool.name,
        qty,
        unitPrice: +p.price,
      };
    });
    const total = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
    return {lines, total: Math.round(total * 100) / 100};
  }

  /**
   * Asks the provider about a checkout; queues the order once when paid.
   * @param {!Object} co The stored checkout.
   * @return {!Promise<!Object>} The checkout.
   */
  async function confirm(co) {
    if (co.status === 'paid') return co;
    const r = await payments.check(co.paymentId);
    if (!r.paid) return co;
    if (
      r.amount !== minor(co.total) ||
      String(r.currency).toUpperCase() !== co.currency
    ) {
      store.change('orders', () => {
        co.status = 'mismatch';
        co.note =
          'Paid ' +
          r.amount +
          ' ' +
          r.currency +
          ', expected ' +
          minor(co.total) +
          ' ' +
          co.currency;
      });
      return co;
    }
    const catalogue = (readJson('products.json') || {}).items || [];
    store.change('orders', () => {
      co.status = 'paid';
      co.paidAt = now();
      co.method = r.method || null;
    });
    createOrder(store, catalogue, {
      ref: co.ref,
      by: 'checkout',
      customer: co.customer,
      payment: {
        provider: payments.name,
        id: co.paymentId,
        method: r.method || null,
        total: co.total,
        currency: co.currency,
      },
      items: co.lines.map((l) => ({...l, colour: l.colour})),
    });
    return co;
  }
  const findCheckout = (pred) => store.db.checkouts.find(pred);

  // Cart → payment page. Body: {items: [{id, material, colour, qty}], lang,
  // customer: {name, phone, email}}
  on('POST', '/api/checkout', async (req) => {
    if (!payments) throw new HttpError(503, 'Online payment isn’t set up');
    if (!formLimit('checkout:' + ipOf(req))) {
      throw new HttpError(429, 'Too many checkouts — try again later');
    }
    const b = await ctx.body(req);
    const c = b.customer || {};
    const customer = {
      name: str(c.name, 80),
      phone: str(c.phone, 30),
      email: str(c.email, 120),
    };
    if (!customer.name) bad('Your name, please');
    if (!customer.phone && !customer.email) bad('A phone or email, please');
    const {lines, total} = price(b.items);
    const co = {
      ref: newRef(),
      status: 'pending',
      provider: payments.name,
      lines,
      total,
      currency: 'SAR',
      customer,
      lang: b.lang === 'ar' ? 'ar' : 'en',
      createdAt: now(),
    };
    const base = publicUrl(req);
    const back = base + '/api/payments/return?ref=' + co.ref;
    const pay = await payments
      .create(co, {
        success: back,
        cancel: back + '&cancelled=1',
        webhook: base + '/api/payments/webhook/' + payments.name,
      })
      .catch((e) => {
        throw new HttpError(502, e.message);
      });
    if (!pay.url) throw new HttpError(502, 'Payment provider gave no page');
    co.paymentId = pay.id;
    store.change('orders', (db) => {
      db.checkouts.unshift(co);
      if (db.checkouts.length > 5000) db.checkouts.length = 5000;
    });
    return {url: pay.url, ref: co.ref};
  });

  // Provider → us. Only a hint: confirm() asks the provider before queuing.
  on('POST', '/api/payments/webhook/:provider', async (req, _r, {provider}) => {
    if (!payments || provider !== payments.name) {
      throw new HttpError(404, 'No such provider');
    }
    const text = await raw(req);
    let b = {};
    try {
      b = JSON.parse(text);
    } catch {
      bad('Expected JSON');
    }
    const ids = payments.webhookIds(b, req.headers, text);
    const co = findCheckout((x) => ids.includes(x.paymentId));
    if (co) await confirm(co);
    return {ok: true};
  });

  // Customer back from the payment page → confirm, then back to the shop.
  on('GET', '/api/payments/return', async (req, res, _p, url) => {
    const ref = url.searchParams.get('ref') || '';
    const co = findCheckout((x) => x.ref === ref);
    let state = 'failed';
    if (co && payments) {
      await confirm(co).catch(() => {});
      state =
        co.status === 'paid'
          ? 'paid'
          : url.searchParams.get('cancelled')
            ? 'cancelled'
            : 'pending';
    }
    res.writeHead(303, {
      'Location':
        '/?order=' + encodeURIComponent(ref) + '&payment=' + state + '#/home',
      'Cache-Control': 'no-store',
    });
    res.end();
    return undefined;
  });

  // Staff: re-check a checkout that's stuck on pending (e.g. a lost webhook).
  on('POST', '/api/checkouts/:ref/check', async (req, _r, {ref}) => {
    staff(req);
    const co = findCheckout((x) => x.ref === ref);
    if (!co) throw new HttpError(404, 'Checkout not found');
    if (!payments) throw new HttpError(503, 'Online payment isn’t set up');
    return confirm(co);
  });
};

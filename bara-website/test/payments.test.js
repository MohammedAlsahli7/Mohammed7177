// Checkout → payment provider → webhook / return → paid order, against a fake
// provider that speaks Moyasar, Tap and Stripe. Run: node --test test/
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {createApp} = require('../server/app');

const root = path.join(__dirname, '..');
const quiet = {log() {}, warn() {}, error() {}};
const fake = {paid: {}, amount: {}, created: []};
let fakeServer;
let fakeBase;

/**
 * Starts a fake payment API.
 * @return {!Promise<void>}
 */
function startFake() {
  fakeServer = http.createServer(async (req, res) => {
    let body = '';
    for await (const c of req) body += c;
    res.setHeader('Content-Type', 'application/json');
    const id = req.url.split('?')[0].split('/').pop();
    const send = (o) => res.end(JSON.stringify(o));
    if (req.method === 'POST') {
      fake.created.push({url: req.url, body, auth: req.headers.authorization});
      const pid = 'pay_' + fake.created.length;
      if (req.url === '/charges') {
        return send({id: pid, transaction: {url: 'https://pay.test/' + pid}});
      }
      return send({id: pid, url: 'https://pay.test/' + pid});
    }
    const amount = fake.amount[id];
    const paid = !!fake.paid[id];
    if (req.url.startsWith('/invoices/')) {
      return send({
        status: paid ? 'paid' : 'initiated',
        amount,
        currency: 'SAR',
      });
    }
    if (req.url.startsWith('/charges/')) {
      return send({
        status: paid ? 'CAPTURED' : 'INITIATED',
        amount: amount / 100,
        currency: 'SAR',
      });
    }
    send({
      payment_status: paid ? 'paid' : 'unpaid',
      amount_total: amount,
      currency: 'sar',
    });
  });
  return new Promise((r) =>
    fakeServer.listen(0, '127.0.0.1', () => {
      fakeBase = 'http://127.0.0.1:' + fakeServer.address().port;
      r();
    }),
  );
}

/**
 * A fresh server with the given payment provider.
 * @param {!Object} pay
 * @return {!Promise<!Object>} {app, base, call}
 */
async function boot(pay) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bara-pay-'));
  const app = createApp({
    root,
    staticDir: root,
    dataDir,
    secret: 's',
    log: quiet,
    pollMs: 1e6,
    publicUrl: 'https://shop.test',
    payApiBase: fakeBase,
    ...pay,
  });
  await new Promise((r) => app.server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + app.server.address().port;
  const call = async (method, url, body, headers = {}) => {
    const res = await fetch(base + url, {
      method,
      redirect: 'manual',
      headers: {'Content-Type': 'application/json', ...headers},
      body: typeof body === 'string' ? body : body && JSON.stringify(body),
    });
    const t = await res.text();
    let json = null;
    try {
      json = JSON.parse(t);
    } catch {
      json = t;
    }
    return {status: res.status, body: json, headers: res.headers};
  };
  return {app, base, call};
}

const cart = {
  lang: 'en',
  customer: {name: 'Noura Al-Harbi', phone: '0551234567', email: 'n@x.sa'},
  // unitPrice from the browser is ignored: the server re-prices.
  items: [
    {id: 'tower', material: 'pla', colour: '#F2B705', qty: 2, unitPrice: 1},
  ],
};
const servers = [];
test.before(startFake);
test.after(() => {
  fakeServer.close();
  servers.forEach((a) => (a.floor.stop(), a.server.close()));
});

test('no provider configured: checkout is off and the site keeps email', async () => {
  const s = await boot({});
  servers.push(s.app);
  assert.equal((await s.call('POST', '/api/checkout', cart)).status, 503);
  const cfg = await s.call('GET', '/site.config.js');
  assert.doesNotMatch(cfg.body, /\/api\/checkout/);
});

test('moyasar: re-priced checkout, verified webhook, one order', async () => {
  const s = await boot({
    payProvider: 'moyasar',
    paySecretKey: 'sk_test_1',
    payWebhookSecret: 'whsec',
  });
  servers.push(s.app);
  assert.match(
    (await s.call('GET', '/site.config.js')).body,
    /\/api\/checkout/,
  );
  const missing = {...cart, customer: {name: '', phone: '', email: ''}};
  assert.equal((await s.call('POST', '/api/checkout', missing)).status, 400);
  const sky = {
    ...cart,
    items: [{id: 'tower', material: 'pla', colour: '#7FB8E6', qty: 1}],
  };
  const out = await s.call('POST', '/api/checkout', sky);
  assert.equal(out.status, 400, 'out-of-stock colour refused');
  const r = await s.call('POST', '/api/checkout', cart);
  assert.equal(r.status, 200);
  assert.match(r.body.url, /^https:\/\/pay\.test\//);
  const sent = JSON.parse(fake.created.at(-1).body);
  assert.equal(sent.amount, 17800, 'SAR 89 × 2, from the catalogue');
  assert.equal(
    sent.success_url,
    'https://shop.test/api/payments/return?ref=' + r.body.ref,
  );
  const co = s.app.store.db.checkouts[0];
  fake.amount[co.paymentId] = 17800;
  const hook = (token) =>
    s.call('POST', '/api/payments/webhook/moyasar', {
      type: 'payment_paid',
      secret_token: token,
      data: {id: 'p_1', invoice_id: co.paymentId},
    });
  await hook('whsec'); // not paid yet at the provider
  assert.equal(s.app.store.db.orders.length, 0);
  fake.paid[co.paymentId] = true;
  await hook('wrong'); // forged webhook is ignored
  assert.equal(s.app.store.db.orders.length, 0);
  await hook('whsec');
  await hook('whsec'); // retries don't duplicate
  const orders = s.app.store.db.orders;
  assert.equal(orders.length, 1);
  assert.equal(orders[0].ref, r.body.ref);
  assert.equal(orders[0].customer.name, 'Noura Al-Harbi');
  assert.equal(
    s.app.store.db.jobs.filter((j) => j.orderRef === r.body.ref).length,
    2,
    'one job per unit',
  );
  const back = await s.call('GET', '/api/payments/return?ref=' + r.body.ref);
  assert.equal(back.status, 303);
  assert.match(back.headers.get('location'), /payment=paid#\/home$/);
});

test('amount mismatch is flagged, not queued', async () => {
  const s = await boot({payProvider: 'moyasar', paySecretKey: 'k'});
  servers.push(s.app);
  const r = await s.call('POST', '/api/checkout', cart);
  const co = s.app.store.db.checkouts[0];
  fake.amount[co.paymentId] = 100;
  fake.paid[co.paymentId] = true;
  await s.call('GET', '/api/payments/return?ref=' + r.body.ref);
  assert.equal(co.status, 'mismatch');
  assert.equal(s.app.store.db.orders.length, 0);
});

test('tap: customer sent, paid on return from the payment page', async () => {
  const s = await boot({payProvider: 'tap', paySecretKey: 'sk_tap'});
  servers.push(s.app);
  const r = await s.call('POST', '/api/checkout', cart);
  const sent = JSON.parse(fake.created.at(-1).body);
  assert.equal(sent.amount, 178);
  assert.deepEqual(sent.customer.phone, {
    country_code: '966',
    number: '551234567',
  });
  assert.equal(fake.created.at(-1).auth, 'Bearer sk_tap');
  const co = s.app.store.db.checkouts[0];
  fake.amount[co.paymentId] = 17800;
  fake.paid[co.paymentId] = true;
  const back = await s.call('GET', '/api/payments/return?ref=' + r.body.ref);
  assert.match(back.headers.get('location'), /payment=paid/);
  assert.equal(s.app.store.db.orders.length, 1);
});

test('stripe: only signed webhooks count', async () => {
  const secret = 'whsec_stripe';
  const s = await boot({
    payProvider: 'stripe',
    paySecretKey: 'sk_s',
    payWebhookSecret: secret,
  });
  servers.push(s.app);
  await s.call('POST', '/api/checkout', cart);
  const co = s.app.store.db.checkouts[0];
  assert.match(fake.created.at(-1).body, /line_items%5B0%5D%5Bquantity%5D=2/);
  fake.amount[co.paymentId] = 17800;
  fake.paid[co.paymentId] = true;
  const event = JSON.stringify({
    type: 'checkout.session.completed',
    data: {object: {id: co.paymentId}},
  });
  const url = '/api/payments/webhook/stripe';
  await s.call('POST', url, event, {'Stripe-Signature': 't=1,v1=00'});
  assert.equal(s.app.store.db.orders.length, 0);
  const t = Math.floor(Date.now() / 1000);
  const v1 = crypto
    .createHmac('sha256', secret)
    .update(t + '.' + event)
    .digest('hex');
  await s.call('POST', url, event, {'Stripe-Signature': `t=${t},v1=${v1}`});
  assert.equal(s.app.store.db.orders.length, 1);
});

test('Apple Pay domain verification file is served when present', async () => {
  const s = await boot({payProvider: 'moyasar', paySecretKey: 'k'});
  servers.push(s.app);
  const url = '/.well-known/apple-developer-merchantid-domain-association';
  assert.equal((await s.call('GET', url)).status, 404);
  const dir = path.dirname(s.app.store.file);
  fs.writeFileSync(
    path.join(dir, 'apple-developer-merchantid-domain-association'),
    'APPLE-VERIFY-123',
  );
  const r = await s.call('GET', url);
  assert.equal(r.status, 200);
  assert.equal(r.body, 'APPLE-VERIFY-123');
});

test('payment method used is recorded on the order', async () => {
  const {methodName} = require('../server/payments');
  assert.equal(methodName('applepay'), 'Apple Pay');
  assert.equal(methodName('APPLE_PAY'), 'Apple Pay');
  assert.equal(methodName('google_pay'), 'Google Pay');
  assert.equal(methodName('samsungpay'), 'Samsung Pay');
  assert.equal(methodName('stcpay'), 'STC Pay');
  assert.equal(methodName('mada'), 'mada');
  assert.equal(methodName('visa'), 'Card');
});

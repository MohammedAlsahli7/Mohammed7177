// Browser test: cart → contact details → payment page → back to the shop →
// paid order queued and visible in Ops. A fake Moyasar plays the provider.
// Run: npm run build && npm run test:site
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {chromium} = require('playwright');
const {createApp} = require('../server/app');

const root = path.join(__dirname, '..');
const quiet = {log() {}, warn() {}, error() {}};
const paid = new Set();
let fake;
let app;
let base;
let browser;

test.before(async () => {
  fake = http.createServer(async (req, res) => {
    for await (const c of req) void c;
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'POST') {
      return res.end(JSON.stringify({id: 'inv_1', url: base + '/fake-pay'}));
    }
    res.end(
      JSON.stringify({
        status: paid.has('inv_1') ? 'paid' : 'initiated',
        amount: 8900,
        currency: 'SAR',
        payments: [{status: 'paid', source: {type: 'applepay'}}],
      }),
    );
  });
  await new Promise((r) => fake.listen(0, '127.0.0.1', r));
  app = createApp({
    root,
    staticDir: path.join(root, 'dist'),
    dataDir: fs.mkdtempSync(path.join(os.tmpdir(), 'bara-co-')),
    secret: 'e2e',
    adminPassword: 'correct horse battery',
    pollMs: 1e6,
    log: quiet,
    payProvider: 'moyasar',
    paySecretKey: 'sk_test',
    payApiBase: 'http://127.0.0.1:' + fake.address().port,
  });
  await new Promise((r) => app.server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + app.server.address().port;
  browser = await chromium.launch();
});
test.after(async () => {
  await browser.close();
  app.floor.stop();
  app.server.close();
  fake.close();
});

test('checkout: contact details, payment page, paid order in Ops', async () => {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  // The "payment page": the customer pays (Apple Pay) and is sent back.
  await page.route('**/fake-pay', (route) => {
    paid.add('inv_1');
    const ref = app.store.db.checkouts[0].ref;
    route.fulfill({
      status: 302,
      headers: {location: base + '/api/payments/return?ref=' + ref},
    });
  });
  await page.goto(base + '/#/product/tower');
  await page
    .getByRole('button', {name: /add to cart/i})
    .first()
    .click();
  await page.getByLabel('Cart').click();
  await page.getByRole('button', {name: 'Checkout'}).click();
  // No contact details yet → asked for them, nothing sent.
  await page.waitForSelector('text=Add your name and a phone or email.');
  assert.equal(app.store.db.checkouts.length, 0);
  await page.getByLabel('Your name').fill('Noura');
  await page.getByLabel('Phone').fill('0551234567');
  await page.getByRole('button', {name: 'Checkout'}).click();
  await page.waitForSelector('text=Paid. It’s in the print queue.');
  const order = app.store.db.orders[0];
  assert.equal(order.customer.name, 'Noura');
  assert.equal(order.payment.method, 'Apple Pay');
  assert.equal(order.payment.total, 89);
  assert.ok(app.store.db.jobs.some((j) => j.orderRef === order.ref));
  const cart = await page.evaluate(() => localStorage.getItem('bara-cart-v1'));
  assert.equal(cart, '[]', 'cart emptied after paying');
  assert.equal(new URL(page.url()).search, '', 'query cleaned from the URL');

  const ops = await browser.newPage();
  await ops.goto(base + '/ops/#/queue');
  await ops.getByLabel('Username').fill('admin');
  await ops.getByLabel('Password').fill('correct horse battery');
  await ops.getByRole('button', {name: 'Sign in'}).click();
  await ops.getByText('Paid orders').click();
  await ops.waitForSelector('text=' + order.ref);
  assert.match(await ops.locator('table').innerText(), /Apple Pay · moyasar/);
  assert.deepEqual(errors, []);
});

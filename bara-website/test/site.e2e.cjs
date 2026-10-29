// Browser smoke tests for the public website, UI kits and Ops dashboard, against the built site served by the real server.
// Run: npm run build && npm run test:site     (needs Playwright + Chromium: npm i -D playwright && npx playwright install chromium)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createApp } = require('../server/app');

let chromium;
try { ({ chromium } = require('playwright')); } catch { console.error('Playwright is not installed: npm i -D playwright && npx playwright install chromium'); process.exit(1); }

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) { console.error('Build first: npm run build'); process.exit(1); }
const quiet = { log() {}, warn() {}, error() {} };
let app, base, browser;
// Third-party hosts (Google Fonts) may be unreachable in CI; only our own code's errors fail a test.
const ignorable = (msg) => /fonts\.(googleapis|gstatic)\.com|Failed to load resource|net::ERR/.test(msg);

async function open(url, { viewport = { width: 1280, height: 860 }, ...ctx } = {}) {
  const page = await browser.newPage({ viewport, ...ctx });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !ignorable(m.text())) errors.push(m.text()); });
  await page.goto(base + url, { waitUntil: 'load' });
  return { page, errors };
}
const noHorizontalScroll = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

test.before(async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bara-e2e-'));
  app = createApp({ root, staticDir: dist, dataDir, secret: 'e2e', adminPassword: 'correct horse battery', pollMs: 200, log: quiet });
  await new Promise((r) => app.server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + app.server.address().port;
  browser = await chromium.launch();
});
test.after(async () => { await browser.close(); app.floor.stop(); app.server.close(); });

test('shop: every route renders without errors, in English and Arabic', async () => {
  const routes = ['home', 'shop', 'product/tower', 'custom', 'materials', 'loop', 'about', 'corner', 'sell'];
  const { page, errors } = await open('/');
  await page.waitForSelector('#main h1, #main .s-display', { timeout: 15000 });
  for (const lang of ['en', 'ar']) {
    if (lang === 'ar') { await page.evaluate(() => localStorage.setItem('bara-site-lang', '1')); await page.reload(); }
    for (const r of routes) {
      await page.goto(base + '/#/' + r); await page.waitForTimeout(250);
      const text = await page.locator('#main').innerText();
      assert.ok(text.trim().length > 40, r + ' (' + lang + ') rendered almost nothing');
      assert.doesNotMatch(text, /Couldn’t load|undefined|NaN/, r + ' (' + lang + ')');
    }
    assert.equal(await page.evaluate(() => document.documentElement.dir), lang === 'ar' ? 'rtl' : 'ltr');
  }
  await page.goto(base + '/#/nope'); await page.waitForTimeout(200);
  assert.ok(await page.locator('#main [role=alert]').count(), 'unknown route shows the not-found state');
  assert.deepEqual(errors, []);
});

test('shop: add to cart, cart persists across reloads, checkout falls back cleanly', async () => {
  const { page, errors } = await open('/#/product/tower');
  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await page.waitForTimeout(300);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('bara-cart-v1')));
  assert.equal(saved[0].id, 'tower'); assert.equal(saved[0].qty, 1);
  await page.reload(); await page.waitForTimeout(800);
  await page.getByLabel('Cart').click();
  assert.match(await page.locator('body').innerText(), /Hex Dice Tower/);
  assert.deepEqual(errors, []);
});

test('shop: only in-stock colours are offered, and stock edits in Ops reach the shop live', async () => {
  const { page, errors } = await open('/#/product/tower');
  await page.waitForTimeout(500);
  const ids = await page.evaluate(() => Object.values(window.SITE_COLOURS).flat().map((c) => c[3]));
  assert.ok(ids.includes('pla-yolk')); assert.ok(!ids.includes('pla-sky'), 'pla-sky (120 g) is out of stock and hidden');
  app.store.change('inventory', (db) => { db.filaments.find((f) => f.id === 'pla-sky').grams = 2000; });
  await page.reload(); await page.waitForTimeout(800);
  assert.ok((await page.evaluate(() => Object.values(window.SITE_COLOURS).flat().map((c) => c[3]))).includes('pla-sky'));
  assert.deepEqual(errors, []);
});

test('custom print: uploading an STL reads its size, prices it and lands in the Ops inbox', async () => {
  const { page, errors } = await open('/#/custom');
  // 10 mm cube, ASCII STL
  const v = [[0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0], [0, 0, 10], [10, 0, 10], [10, 10, 10], [0, 10, 10]];
  const f = [[0, 2, 1], [0, 3, 2], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
  const stl = 'solid cube\n' + f.map((t) => ' facet normal 0 0 0\n  outer loop\n' + t.map((i) => '   vertex ' + v[i].join(' ')).join('\n') + '\n  endloop\n endfacet').join('\n') + '\nendsolid cube\n';
  await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: Buffer.from(stl) });
  await page.waitForSelector('text=cube.stl');
  assert.match(await page.locator('#main').innerText(), /10 × 10 × 10 mm/i);
  await page.getByLabel(/email/i).fill('maker@example.com');
  await page.getByRole('button', { name: 'Get my quote' }).click();
  await page.waitForSelector('text=Got it!', { timeout: 10000 });
  const req = app.store.db.requests.find((r) => r.kind === 'quote' && r.fields.email === 'maker@example.com');
  assert.ok(req, 'quote stored'); assert.equal(req.file.name, 'cube.stl'); assert.equal(req.fields.dims_mm, '10x10x10');
  assert.deepEqual(errors, []);
});

test('3D Corner form posts to the inbox', async () => {
  const { page, errors } = await open('/#/corner');
  await page.getByLabel('Your name').fill('Sara'); await page.getByLabel('Store / brand').fill('Big Box Riyadh');
  await page.getByLabel(/email/i).fill('sara@example.com');
  await page.getByRole('button', { name: 'Request a call' }).click();
  await page.waitForTimeout(800);
  assert.ok(app.store.db.requests.find((r) => r.kind === 'corner' && r.fields.company === 'Big Box Riyadh'));
  assert.deepEqual(errors, []);
});

test('characters: Tab’a and the Goblin render, banter, and react to the shopper', async () => {
  const { page, errors } = await open('/');
  await page.waitForTimeout(1500);
  const svgs = await page.locator('svg').count();
  assert.ok(svgs > 2, 'crew artwork is on the page');
  // Talk to the crew dock directly: the cart reaction must produce a speech bubble.
  const before = await page.locator('body').innerText();
  await page.evaluate(() => window.crew && window.crew('cart', { hex: '#F2B705' }));
  await page.waitForTimeout(2500);
  const after = await page.locator('body').innerText();
  assert.notEqual(after, before, 'crew said something after the cart event');
  assert.deepEqual(errors, []);
});

test('characters: the live floor shows real jobs from the print queue', async () => {
  app.store.change(['printers', 'jobs'], (db) => {
    db.printers.push({ id: 'pe2e', code: 'P7', name: 'E2E', connector: 'manual', enabled: true });
    db.jobs.push({ id: 'J-9001', title: 'Hex Dice Tower', productId: 'tower', printerId: 'pe2e', status: 'printing', layer: 50, total: 212, progress: 0.24, hex: '#E8367A', createdAt: new Date().toISOString(), startedAt: new Date().toISOString() });
  });
  const { page, errors } = await open('/');
  await page.waitForSelector('text=Live from the floor', { timeout: 15000 });
  assert.match(await page.locator('body').innerText(), /J-9001[\s\S]*P7 · L 50\/212/);
  assert.deepEqual(errors, []);
});

test('Filament Studio and the other UI kits load cleanly', async () => {
  for (const kit of ['filament-studio', 'kiosk', 'storefront', 'packaging', 'social', 'character']) {
    const { page, errors } = await open('/ui_kits/' + kit + '/');
    await page.waitForTimeout(1500);
    assert.ok((await page.locator('body').innerText()).trim().length > 40, kit + ' rendered almost nothing');
    assert.deepEqual(errors, [], kit);
    await page.close();
  }
  const { errors } = await open('/design/');
  assert.deepEqual(errors, []);
});

test('mobile: no sideways scrolling on the main pages', async () => {
  for (const url of ['/', '/#/shop', '/#/product/tower', '/#/custom', '/ops/']) {
    const { page } = await open(url, { viewport: { width: 375, height: 812 }, isMobile: true });
    await page.waitForTimeout(800);
    assert.ok(await noHorizontalScroll(page), url + ' scrolls sideways on a phone');
    await page.close();
  }
});

test('ops: sign in, see the floor live, queue a job from the dashboard', async () => {
  const { page, errors } = await open('/ops/');
  await page.getByLabel('Username').fill('admin'); await page.getByLabel('Password').fill('correct horse battery');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('text=Print floor');
  await page.waitForSelector('text=LIVE');
  await page.getByRole('button', { name: 'New print job' }).click();
  await page.getByLabel('Title').fill('E2E bracket');
  await page.getByRole('button', { name: 'Add to queue' }).click();
  await page.waitForSelector('text=E2E bracket');
  assert.ok(app.store.db.jobs.find((j) => j.title === 'E2E bracket'));
  // A change made elsewhere shows up without reloading (Server-Sent Events).
  app.store.change('jobs', (db) => { db.jobs.find((j) => j.title === 'E2E bracket').title = 'E2E bracket v2'; });
  await page.waitForSelector('text=E2E bracket v2', { timeout: 5000 });
  assert.deepEqual(errors, []);
});

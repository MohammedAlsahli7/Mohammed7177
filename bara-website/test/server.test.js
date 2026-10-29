// API tests: node --test   (no dependencies; spins up the real server on a random port with a temp data dir)
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createApp } = require('../server/app');

const root = path.join(__dirname, '..');
let app, base, cookie = '';
const quiet = { log() {}, warn() {}, error() {} };

async function api(method, url, body, { auth = true, headers = {} } = {}) {
  const res = await fetch(base + url, { method, headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(auth && cookie ? { Cookie: cookie } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  return { status: res.status, body: text && res.headers.get('content-type').includes('json') ? JSON.parse(text) : text, headers: res.headers };
}

test.before(async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bara-test-'));
  app = createApp({ root, staticDir: root, dataDir, secret: 'test-secret', adminPassword: 'correct horse battery', pollMs: 50, log: quiet });
  await new Promise((r) => app.server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + app.server.address().port;
});
test.after(() => { app.floor.stop(); app.server.close(); });

test('public stock is seeded from data/stock.json', async () => {
  const r = await api('GET', '/api/stock', null, { auth: false });
  assert.equal(r.status, 200);
  assert.ok(r.body.items.length > 5);
  assert.ok(r.body.items.find((f) => f.id === 'pla-yolk'));
});

test('site.config.js is wired to this server', async () => {
  const r = await api('GET', '/site.config.js', null, { auth: false });
  assert.match(r.body, /floor: "\/api\/floor"/);
});

test('server internals are never served as static files', async () => {
  for (const p of ['/server/app.js', '/var/db.json', '/package.json', '/.env']) assert.equal((await api('GET', p, null, { auth: false })).status, 404, p);
});

test('staff API needs a session', async () => {
  assert.equal((await api('GET', '/api/state', null, { auth: false })).status, 401);
  assert.equal((await api('POST', '/api/auth/login', { username: 'admin', password: 'nope' })).status, 401);
  const r = await api('POST', '/api/auth/login', { username: 'admin', password: 'correct horse battery' });
  assert.equal(r.status, 200);
  cookie = r.headers.get('set-cookie').split(';')[0];
  assert.match(r.headers.get('set-cookie'), /HttpOnly/);
  assert.equal((await api('GET', '/api/state')).status, 200);
});

test('cross-site writes are blocked', async () => {
  const r = await api('POST', '/api/items', { name: 'x' }, { headers: { Origin: 'https://evil.example' } });
  assert.equal(r.status, 403);
});

test('inventory: items and filament adjustments are logged', async () => {
  const it = await api('POST', '/api/items', { name: 'Shipping box S', category: 'packaging', qty: 40, reorderAt: 20, unit: 'pcs' });
  assert.equal(it.status, 200);
  const adj = await api('POST', '/api/items/' + it.body.id + '/adjust', { delta: -25, reason: 'Packed orders' });
  assert.equal(adj.body.qty, 15);
  const f = await api('POST', '/api/filaments/pla-yolk/adjust', { delta: 1000, reason: 'New spool' });
  assert.equal(f.body.grams, 5200);
  const mv = await api('GET', '/api/movements?ref=pla-yolk');
  assert.equal(mv.body[0].delta, 1000);
  assert.equal((await api('POST', '/api/filaments', { name: 'Bad', material: 'wood', hex: '#123456', grams: 1 })).status, 400);
});

test('manual printer: job lifecycle deducts the estimate from the spool', async () => {
  const p = await api('POST', '/api/printers', { name: 'Bench Ender', code: 'P9', connector: 'manual', spoolId: 'pla-bone' });
  assert.equal(p.status, 200);
  const before = (await api('GET', '/api/stock')).body.items.find((x) => x.id === 'pla-bone').grams;
  const j = await api('POST', '/api/jobs', { productId: 'tower', spoolId: 'pla-bone', grams: 84, total: 212, printerId: p.body.id });
  assert.equal(j.body.title, 'Hex Dice Tower');
  assert.equal((await api('POST', '/api/jobs/' + j.body.id + '/status', { status: 'printing', layer: 106 })).body.progress, 0.5);
  const floor = await api('GET', '/api/floor', null, { auth: false });
  assert.deepEqual(floor.body.find((x) => x.id === j.body.id), { id: j.body.id, item: 'tower', hex: '#EEE6D3', printer: '9', layer: 106, total: 212, status: 'printing' });
  const done = await api('POST', '/api/jobs/' + j.body.id + '/status', { status: 'done' });
  assert.equal(done.body.deductedG, 84);
  const after = (await api('GET', '/api/stock')).body.items.find((x) => x.id === 'pla-bone').grams;
  assert.equal(after, before - 84);
});

test('moonraker printer: live telemetry links the queued job and deducts real usage', async () => {
  let ps = { state: 'standby', filename: '', filament_used: 0, info: { current_layer: null, total_layer: null }, print_duration: 0 }; let progress = 0;
  const fake = http.createServer((req, res) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ result: { status: { print_stats: ps, virtual_sdcard: { progress }, extruder: { temperature: 215, target: 215 }, heater_bed: { temperature: 60, target: 60 } } } })); });
  await new Promise((r) => fake.listen(0, '127.0.0.1', r));
  try {
    const p = await api('POST', '/api/printers', { name: 'Qidi Q2', code: 'P2', connector: 'moonraker', url: 'http://127.0.0.1:' + fake.address().port, spoolId: 'petg-lagoon' });
    const j = await api('POST', '/api/jobs', { title: 'Gridfinity bins', spoolId: 'petg-lagoon', grams: 120, printerId: p.body.id, file: 'bins_PETG.gcode' });
    await app.floor.pollOnce();
    assert.equal((await api('GET', '/api/state')).body.jobs.find((x) => x.id === j.body.id).status, 'queued');
    ps = { ...ps, state: 'printing', filename: 'bins_PETG.gcode', info: { current_layer: 40, total_layer: 160 }, filament_used: 5000, print_duration: 600 }; progress = 0.25;
    await app.floor.pollOnce();
    let job = (await api('GET', '/api/state')).body.jobs.find((x) => x.id === j.body.id);
    assert.equal(job.status, 'printing'); assert.equal(job.layer, 40); assert.equal(job.total, 160);
    const printer = (await api('GET', '/api/state')).body.printers.find((x) => x.id === p.body.id);
    assert.equal(printer.live.nozzle.actual, 215); assert.equal(printer.jobId, j.body.id);
    const before = (await api('GET', '/api/stock')).body.items.find((x) => x.id === 'petg-lagoon').grams;
    ps = { ...ps, state: 'complete', filament_used: 20000, info: { current_layer: 160, total_layer: 160 } }; progress = 1;
    await app.floor.pollOnce();
    job = (await api('GET', '/api/state')).body.jobs.find((x) => x.id === j.body.id);
    assert.equal(job.status, 'done');
    // 20 m of 1.75 mm PETG ≈ 48.1 cm³ × 1.27 g/cm³ ≈ 61.1 g — the real number, not the 120 g estimate
    assert.equal(job.deductedG, 61.1);
    assert.equal((await api('GET', '/api/stock')).body.items.find((x) => x.id === 'petg-lagoon').grams, Math.round((before - 61.1) * 10) / 10);
    await app.floor.pollOnce(); // stays "complete": must not deduct twice
    assert.equal((await api('GET', '/api/stock')).body.items.find((x) => x.id === 'petg-lagoon').grams, Math.round((before - 61.1) * 10) / 10);
  } finally { fake.close(); }
});

test('push printer: telemetry needs the printer token', async () => {
  const p = await api('POST', '/api/printers', { name: 'Bambu X1C', code: 'P3', connector: 'push' });
  const url = '/api/printers/P3/telemetry';
  assert.equal((await api('POST', url, { status: 'idle' }, { auth: false, headers: { Authorization: 'Bearer wrong' } })).status, 401);
  const j = await api('POST', '/api/jobs', { title: 'Cable clips', printerId: p.body.id, grams: 10 });
  const ok = await api('POST', url, { status: 'printing', progress: 0.1, layer: 5, totalLayers: 50, nozzle: 220 }, { auth: false, headers: { Authorization: 'Bearer ' + p.body.token } });
  assert.equal(ok.status, 200); assert.equal(ok.body.job.id, j.body.id);
});

test('website quote form lands in the inbox with its file', async () => {
  const fd = new FormData();
  fd.set('email', 'maker@example.com'); fd.set('material', 'petg'); fd.set('notes', 'Make it chunky');
  fd.set('file', new Blob(['solid cube\nendsolid cube\n']), 'cube.stl');
  const r = await fetch(base + '/api/quote', { method: 'POST', body: fd });
  assert.equal(r.status, 200);
  const st = (await api('GET', '/api/state')).body;
  const q = st.requests.find((x) => x.kind === 'quote');
  assert.equal(q.fields.material, 'petg'); assert.equal(q.file.name, 'cube.stl');
  const file = await api('GET', '/api/requests/' + q.id + '/file');
  assert.match(file.body, /solid cube/);
  const job = await api('POST', '/api/jobs', { title: 'Quote: cube', requestId: q.id });
  assert.equal((await api('GET', '/api/state')).body.requests.find((x) => x.id === q.id).status, 'converted');
  assert.equal(job.body.requestId, q.id);
});

test('Filament Studio PUT /api/stock replaces the list', async () => {
  const cur = (await api('GET', '/api/stock')).body.items;
  const next = cur.map((f) => (f.id === 'pla-sky' ? { ...f, grams: 2000 } : f));
  assert.equal((await api('PUT', '/api/stock', next)).status, 200);
  assert.equal((await api('GET', '/api/stock')).body.items.find((f) => f.id === 'pla-sky').grams, 2000);
});

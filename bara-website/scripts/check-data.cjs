// Validates data/*.json against the schema in data/README.md. Run before every
// deploy: npm run check
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const read = async (n) =>
    JSON.parse(
      await fs.readFile(
        path.join(__dirname, '..', 'data', n + '.json'),
        'utf8',
      ),
    );
  const errors = [];
  const err = (m) => errors.push(m);
  const MATS = ['pla', 'petg', 'tpu', 'loop'];
  const products = (await read('products')).items || [];
  const stock = await read('stock');
  const pricing = await read('pricing');
  const models = (await read('models')).items || [];
  const ids = new Set();
  products.forEach((p, i) => {
    const at = 'products[' + i + '] ' + (p.id || '');
    if (!p.id || ids.has(p.id)) err(at + ': missing or duplicate id');
    ids.add(p.id);
    if (!p.name || !p.name.en || !p.name.ar) {
      err(at + ': name.en and name.ar required');
    }
    if (!(p.price > 0)) err(at + ': price must be > 0');
    if (
      !Array.isArray(p.materials) ||
      !p.materials.length ||
      p.materials.some((m) => !MATS.includes(m))
    ) {
      err(at + ': materials must be from ' + MATS.join('/'));
    }
    if (
      p.source &&
      (!p.source.designer || !p.source.url || !p.source.licence)
    ) {
      err(
        at +
          ': community items need source.designer, source.url and source.licence',
      );
    }
  });
  (stock.items || []).forEach((f, i) => {
    if (!/^#[0-9a-f]{6}$/i.test(f.hex)) {
      err('stock[' + i + ']: hex must be #RRGGBB');
    }
    if (!MATS.includes(f.material)) err('stock[' + i + ']: bad material');
    if (!(f.grams >= 0)) err('stock[' + i + ']: grams must be >= 0');
  });
  ['pla', 'petg', 'tpu'].forEach((m) => {
    const r = pricing.materials && pricing.materials[m];
    if (!r || !(r.density > 0) || !(r.perGram > 0)) {
      err('pricing.materials.' + m + ': density and perGram required');
    }
  });
  models.forEach((m, i) => {
    if (!m.id || !Array.isArray(m.parts) || !m.parts.length) {
      err('models[' + i + ']: id and parts required');
    }
  });
  if (errors.length) {
    console.error(
      '✗ ' + errors.length + ' data problem(s):\n  ' + errors.join('\n  '),
    );
    process.exit(1);
  }
  console.log(
    '✓ data OK — ' +
      products.length +
      ' products, ' +
      (stock.items || []).length +
      ' filaments, ' +
      models.length +
      ' studio models',
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

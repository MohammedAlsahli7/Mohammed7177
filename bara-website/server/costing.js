// Cost, price and margin for a print: one model used by the Ops calculator,
// quotes, product margins,
// the actual cost of every finished job, and the website's instant estimate (as
// a derived rate card).
const DEFAULTS = {
  currency: 'SAR',
  materials: {
    pla: {costPerKg: 80},
    petg: {costPerKg: 90},
    tpu: {costPerKg: 140},
    loop: {costPerKg: 40},
  }, // a spool's own costPerKg wins
  wastePct: 5, // purge, brim, supports, test lines
  gramsPerHour: 15, // to estimate print time when the slicer time isn't known
  electricityPerKwh: 0.2, // SAR per kWh
  // a printer's own costs win
  printer: {watts: 150, priceSar: 3500, lifeHours: 5000, upkeepPerHour: 0.3},
  operatorPerHour: 40, // SAR per hour of hands-on time
  setupMinutes: 8, // slicing, plate prep, starting the print
  removalMinutes: 4, // taking it off the bed, quick check
  // support removal, sanding, assembly (per job; override per quote)
  postMinutes: 0,
  packagingSar: 3,
  failurePct: 8, // re-print risk on material + machine + power
  overheadPct: 10, // rent, software, admin — on everything above
  markupPct: 60, // on cost
  minPrice: 35, // ex VAT
  rushFee: 30, // ex VAT
  vatPct: 15,
  roundTo: 1, // round the final price up to this
  // website estimate: share of a model's volume that's actually plastic
  fillFactor: 0.35,
};

const DENSITY = {pla: 1.24, petg: 1.27, tpu: 1.21, loop: 1.24};
const n = (v, d) => (v == null || v === '' || !Number.isFinite(+v) ? d : +v);
const r2 = (v) => Math.round(v * 100) / 100;

/**
 * Saved settings over the defaults.
 * @param {?Object} saved
 * @return {!Object}
 */
function merge(saved) {
  const s = {...DEFAULTS, ...(saved || {})};
  s.materials = {...DEFAULTS.materials, ...((saved && saved.materials) || {})};
  s.printer = {...DEFAULTS.printer, ...((saved && saved.printer) || {})};
  return s;
}

/**
 * Validate an admin's settings edit; unknown keys are dropped.
 * @param {!Object} input
 * @param {?Object} prev
 * @return {!Object}
 */
function clean(input, prev) {
  const s = merge(prev);
  for (const k of Object.keys(DEFAULTS)) {
    if (k === 'materials' || k === 'printer' || k === 'currency') continue;
    if (input[k] !== undefined) {
      const v = n(input[k], null);
      if (v == null || v < 0 || v > 1e6) {
        throw new Error(k + ' must be a positive number');
      }
      s[k] = v;
    }
  }
  if (input.materials) {
    for (const [m, v] of Object.entries(input.materials)) {
      if (DEFAULTS.materials[m]) {
        s.materials[m] = {
          costPerKg: Math.max(0, n(v && v.costPerKg, s.materials[m].costPerKg)),
        };
      }
    }
  }
  if (input.printer) {
    for (const k of Object.keys(DEFAULTS.printer)) {
      if (input.printer[k] !== undefined) {
        s.printer[k] = Math.max(0, n(input.printer[k], s.printer[k]));
      }
    }
  }
  if (s.lifeHours === 0) s.printer.lifeHours = 1;
  return s;
}

/**
 * x: { grams, hours?, material?, filament?, printer?, qty?, setupMinutes?,
 * removalMinutes?, postMinutes?, packaging?, rush?, markupPct?, price? } price
 * (optional, incl. VAT) = an actual selling price, to get the margin it really
 * makes.
 * @param {!Object} x Grams, hours, material, filament, printer, qty, minutes,
 * rush, markupPct, price.
 * @param {?Object} settings
 * @return {!Object}
 */
function compute(x, settings) {
  const s = merge(settings);
  const qty = Math.max(1, Math.round(n(x.qty, 1)));
  const material = (x.filament && x.filament.material) || x.material || 'pla';
  const grams = Math.max(0, n(x.grams, 0)) * qty;
  const hours =
    x.hours != null && x.hours !== ''
      ? Math.max(0, n(x.hours, 0)) * qty
      : grams / (s.gramsPerHour || 15);
  const pc = {...s.printer, ...((x.printer && x.printer.costs) || {})};
  const costPerKg = n(
    x.filament && x.filament.costPerKg,
    s.materials[material] ? s.materials[material].costPerKg : 80,
  );
  const lines = {
    material: ((grams * (1 + s.wastePct / 100)) / 1000) * costPerKg,
    machine:
      hours * (pc.priceSar / Math.max(1, pc.lifeHours) + pc.upkeepPerHour),
    power: ((hours * pc.watts) / 1000) * s.electricityPerKwh,
    labour:
      ((n(x.setupMinutes, s.setupMinutes) +
        n(x.removalMinutes, s.removalMinutes) * qty +
        n(x.postMinutes, s.postMinutes) * qty) /
        60) *
      s.operatorPerHour,
    packaging: x.packaging === false ? 0 : s.packagingSar,
  };
  lines.failure =
    ((lines.material + lines.machine + lines.power) * s.failurePct) / 100;
  const sub = Object.values(lines).reduce((a, b) => a + b, 0);
  lines.overhead = (sub * s.overheadPct) / 100;
  const cost = sub + lines.overhead;
  const markupPct = n(x.markupPct, s.markupPct);
  const rush = x.rush ? s.rushFee : 0;
  let exVat = Math.max(s.minPrice, cost * (1 + markupPct / 100)) + rush;
  let price = exVat * (1 + s.vatPct / 100);
  price = Math.ceil(price / (s.roundTo || 1) - 1e-9) * (s.roundTo || 1);
  if (x.price != null && x.price !== '') price = n(x.price, price);
  exVat = price / (1 + s.vatPct / 100);
  const profit = exVat - cost;
  return {
    currency: s.currency,
    qty,
    material,
    grams: r2(grams),
    hours: r2(hours),
    hoursEstimated: x.hours == null || x.hours === '',
    lines: Object.fromEntries(
      Object.entries(lines).map(([k, v]) => [k, r2(v)]),
    ),
    cost: r2(cost),
    unitCost: r2(cost / qty),
    markupPct,
    price: r2(price),
    unitPrice: r2(price / qty),
    priceExVat: r2(exVat),
    vat: r2(price - exVat),
    profit: r2(profit),
    marginPct: exVat > 0 ? r2((profit / exVat) * 100) : 0,
    perHour: hours > 0 ? r2(profit / hours) : null,
  };
}

/**
 * The website's instant estimate is linear (setup fee + per gram, minimum,
 * rush). Derive that rate card from the cost model so the shop and the
 * calculator agree, without publishing the cost breakdown itself.
 * @param {?Object} settings
 * @param {!Object=} base data/pricing.json (build volume).
 * @return {!Object}
 */
function rateCard(settings, base = {}) {
  const s = merge(settings);
  const k = (1 + s.markupPct / 100) * (1 + s.vatPct / 100);
  const fixed = compute(
    {grams: 0, hours: 0, markupPct: 0, price: null},
    {...s, minPrice: 0, vatPct: 0, roundTo: 0.01},
  ).cost;
  const materials = {};
  for (const m of ['pla', 'petg', 'tpu']) {
    const per =
      compute(
        {
          grams: 1000,
          material: m,
          markupPct: 0,
          packaging: false,
          setupMinutes: 0,
          removalMinutes: 0,
          postMinutes: 0,
        },
        {...s, minPrice: 0, vatPct: 0, roundTo: 0.01},
      ).cost / 1000;
    materials[m] = {
      density: DENSITY[m],
      perGram: r2(per * k * 1000) / 1000,
      min: r2(s.minPrice * (1 + s.vatPct / 100)),
    };
  }
  return {
    currency: s.currency,
    setupFee: r2(fixed * k),
    fillFactor: s.fillFactor,
    rushFee: r2(s.rushFee * (1 + s.vatPct / 100)),
    buildVolume: base.buildVolume || [250, 250, 250],
    materials,
    source: 'cost-model',
  };
}

const parseGrams = (w) => {
  const m = String(w || '').match(/([\d.]+)\s*(kg|g)?/i);
  return m ? +m[1] * (/kg/i.test(m[2] || '') ? 1000 : 1) : null;
};
const parseHours = (t) => {
  if (!t) return null;
  const h = String(t).match(/([\d.]+)\s*h/i);
  const m = String(t).match(/([\d.]+)\s*m(?!m)/i);
  return h || m ? (h ? +h[1] : 0) + (m ? +m[1] / 60 : 0) : null;
};

module.exports = {
  DEFAULTS,
  merge,
  clean,
  compute,
  rateCard,
  parseGrams,
  parseHours,
};

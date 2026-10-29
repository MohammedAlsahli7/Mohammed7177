// Input validation and the job state machine.
'use strict';
const M = require('./maintenance');
const R = require('./router');
const {
  bad,
  str,
  num,
  now,
  MATS,
  JOB_STATUS,
  ITEM_CATEGORIES,
} = require('./http');
const {CONNECTORS, ACTIVE, FINISHED} = require('./floor');

module.exports = function register(ctx) {
  const {floor, readJson, store} = ctx;
  /**
   * ---- Validation ----
   * @param {!Object} b
   * @param {!Object=} prev
   * @return {!Object}
   */
  function filamentFrom(b, prev = {}) {
    const f = {...prev};
    if (b.name !== undefined) f.name = str(b.name, 60) || bad('Name required');
    if (b.ar !== undefined) f.ar = str(b.ar, 60);
    if (b.material !== undefined) {
      if (!MATS.includes(b.material)) {
        bad('Material must be one of ' + MATS.join(', '));
      }
      f.material = b.material;
    }
    if (b.hex !== undefined) {
      if (!/^#[0-9a-f]{6}$/i.test(b.hex)) bad('Colour must be #RRGGBB');
      f.hex = b.hex.toUpperCase();
    }
    if (b.grams !== undefined) {
      const g = num(b.grams, {min: 0, max: 1e6});
      if (g == null) bad('Grams must be a number');
      f.grams = g;
    }
    for (const k of ['line', 'finish', 'shelf']) {
      if (b[k] !== undefined) f[k] = str(b[k], 60);
    }
    if (b.spoolWeight !== undefined) {
      f.spoolWeight = num(b.spoolWeight, {min: 0, max: 20000});
    }
    if (b.costPerKg !== undefined) {
      f.costPerKg = num(b.costPerKg, {min: 0, max: 100000});
    }
    if (!f.name || !f.material || !f.hex) {
      bad('Name, material and colour are required');
    }
    return f;
  }
  /**
   * @param {!Object} b
   * @param {!Object=} prev
   * @return {!Object}
   */
  function itemFrom(b, prev = {}) {
    const it = {...prev};
    if (b.name !== undefined) {
      it.name = str(b.name, 100) || bad('Name required');
    }
    if (b.category !== undefined) {
      if (!ITEM_CATEGORIES.includes(b.category)) {
        bad('Category must be one of ' + ITEM_CATEGORIES.join(', '));
      }
      it.category = b.category;
    }
    if (b.qty !== undefined) {
      const q = num(b.qty, {min: 0, max: 1e9});
      if (q == null) bad('Quantity must be a number');
      it.qty = q;
    }
    if (b.reorderAt !== undefined) {
      it.reorderAt = num(b.reorderAt, {min: 0, max: 1e9});
    }
    for (const k of ['sku', 'unit', 'location', 'notes', 'supplier']) {
      if (b[k] !== undefined) it[k] = str(b[k], k === 'notes' ? 500 : 80);
    }
    if (!it.name) bad('Name required');
    it.category = it.category || 'other';
    it.unit = it.unit || 'pcs';
    it.qty = it.qty || 0;
    return it;
  }
  /**
   * @param {!Object} b
   * @param {!Object=} prev
   * @return {!Object}
   */
  function printerFrom(b, prev = {}) {
    const p = {...prev};
    if (b.name !== undefined) p.name = str(b.name, 60) || bad('Name required');
    if (b.code !== undefined) {
      p.code = str(b.code, 8) || bad('Short code required (e.g. P1)');
    }
    if (b.model !== undefined) p.model = str(b.model, 60);
    if (b.connector !== undefined) {
      if (!CONNECTORS.includes(b.connector)) {
        bad('Connector must be one of ' + CONNECTORS.join(', '));
      }
      p.connector = b.connector;
    }
    if (b.url !== undefined) {
      const u = str(b.url, 300);
      if (u && !/^https?:\/\//i.test(u)) {
        bad('Address must start with http:// or https://');
      }
      p.url = u;
    }
    if (b.apiKey !== undefined && b.apiKey !== '') {
      p.apiKey = str(b.apiKey, 200);
    }
    if (b.clearApiKey) delete p.apiKey;
    if (b.slotCount !== undefined) {
      const n = num(b.slotCount, {min: 1, max: R.MAX_SLOTS});
      if (!n) bad('Slots: 1–' + R.MAX_SLOTS);
      const cur = Array.isArray(p.slots) ? p.slots : [];
      p.slots = Array.from({length: Math.round(n)}, (_, i) => cur[i] || null);
    }
    if (b.spoolId !== undefined) {
      b = {...b, slots: [b.spoolId].concat((p.slots || []).slice(1))};
    } // single-spool shorthand
    if (b.slots !== undefined) {
      if (
        !Array.isArray(b.slots) ||
        !b.slots.length ||
        b.slots.length > R.MAX_SLOTS
      ) {
        bad('Slots: 1–' + R.MAX_SLOTS);
      }
      for (const sid of b.slots) {
        if (sid && !store.db.filaments.some((f) => f.id === sid)) {
          bad('Unknown spool ' + sid);
        }
      }
      p.slots = b.slots.map((sid) => sid || null);
    }
    if (b.usage !== undefined) {
      // odometer for machines that arrive with hours on them
      const u = {...M.zeroUsage(), ...(p.usage || {})};
      const h = num(b.usage.hours, {min: 0, max: 1e6});
      const g = num(b.usage.grams, {min: 0, max: 1e9});
      const m = num(b.usage.meters, {min: 0, max: 1e9});
      if (h != null) u.seconds = Math.round(h * 3600);
      if (g != null) u.grams = g;
      if (m != null) u.mm = Math.round(m * 1000);
      p.usage = u;
    }
    if (b.nozzle !== undefined) p.nozzle = nozzleFrom(b.nozzle, p);
    if (b.costs !== undefined) {
      p.costs = b.costs
        ? Object.fromEntries(
            ['watts', 'priceSar', 'lifeHours', 'upkeepPerHour']
              .map((k) => [k, num(b.costs[k], {min: 0, max: 1e7})])
              .filter(([, v]) => v != null),
          )
        : null;
    }
    if (b.enabled !== undefined) p.enabled = !!b.enabled;
    if (b.notes !== undefined) p.notes = str(b.notes, 300);
    if (!p.name || !p.code) bad('Name and code are required');
    p.connector = p.connector || 'manual';
    if (['octoprint', 'moonraker'].includes(p.connector) && !p.url) {
      bad('Network printers need an address');
    }
    if (
      store.db.printers.some(
        (x) => x.id !== p.id && x.code.toLowerCase() === p.code.toLowerCase(),
      )
    ) {
      bad('Code ' + p.code + ' is already used');
    }
    return p;
  }
  /**
   * @param {?Object} n
   * @param {!Object} p
   * @return {?Object}
   */
  function nozzleFrom(n, p) {
    if (!n) return null;
    const size = num(n.size, {min: 0.1, max: 2});
    return {
      size: size || 0.4,
      type: str(n.type, 40) || 'brass',
      installedAt: n.installedAt || now(),
      usageAtInstall: {...M.zeroUsage(), ...(p.usage || {})},
    };
  }
  /**
   * @param {!Object} b
   * @param {!Object=} prev
   * @return {!Object}
   */
  function jobFrom(b, prev = {}) {
    const j = {...prev};
    if (b.title !== undefined) j.title = str(b.title, 120);
    if (b.productId !== undefined) j.productId = str(b.productId, 60) || null;
    if (b.orderRef !== undefined) j.orderRef = str(b.orderRef, 60);
    if (b.file !== undefined) j.file = str(b.file, 200);
    if (b.notes !== undefined) j.notes = str(b.notes, 1000);
    if (b.grams !== undefined) j.grams = num(b.grams, {min: 0, max: 100000});
    if (b.total !== undefined) j.total = num(b.total, {min: 0, max: 100000});
    if (b.qty !== undefined) j.qty = num(b.qty, {min: 1, max: 10000}) || 1;
    if (b.material !== undefined) {
      if (b.material && !MATS.includes(b.material)) bad('Bad material');
      j.material = b.material || null;
    }
    if (b.spoolId !== undefined) {
      const s = b.spoolId
        ? store.db.filaments.find((f) => f.id === b.spoolId)
        : null;
      if (b.spoolId && !s) bad('Unknown spool');
      j.spoolId = s ? s.id : null;
      if (s) {
        j.hex = s.hex;
        j.material = s.material;
      }
    }
    if (b.spools !== undefined) {
      // multi-colour print: every colour it needs, first = main colour
      if (!Array.isArray(b.spools) || b.spools.length > R.MAX_SLOTS) {
        bad('spools: up to ' + R.MAX_SLOTS + ' colours');
      }
      const list = [...new Set(b.spools.filter(Boolean))].map(
        (sid) =>
          store.db.filaments.find((f) => f.id === sid) ||
          bad('Unknown spool ' + sid),
      );
      j.spools = list.map((f) => f.id);
      if (list[0]) {
        j.spoolId = list[0].id;
        j.hex = list[0].hex;
        j.material = list[0].material;
      } else j.spoolId = null;
    } else if (b.spoolId !== undefined) j.spools = j.spoolId ? [j.spoolId] : [];
    if (b.hex !== undefined && !j.spoolId) {
      if (b.hex && !/^#[0-9a-f]{6}$/i.test(b.hex)) {
        bad('Colour must be #RRGGBB');
      }
      j.hex = b.hex || null;
    }
    if (b.printerId !== undefined) {
      if (b.printerId && !store.db.printers.some((p) => p.id === b.printerId)) {
        bad('Unknown printer');
      }
      if (ACTIVE.includes(j.status) && b.printerId !== j.printerId) {
        bad('Stop the job before moving it to another printer');
      }
      const target = store.db.printers.find((p) => p.id === b.printerId);
      if (target && b.printerId !== j.printerId && !R.available(target)) {
        bad(target.code + ' is out of service');
      }
      j.printerId = b.printerId || null;
    }
    if (b.position !== undefined) j.position = num(b.position) || 0;
    if (!j.title && !j.productId) bad('Give the job a title or pick a product');
    if (!j.title) {
      const p = products().find((x) => x.id === j.productId);
      j.title = p ? p.name : j.productId;
    }
    return j;
  }
  const products = () =>
    ((readJson('products.json') || {}).items || []).map((p) => ({
      id: p.id,
      name: (p.name && p.name.en) || p.id,
      materials: p.materials || [],
      weight: p.stats && p.stats.weight,
    }));

  /**
   * Start/finish a job by hand (manual printers, or overriding what a connector
   * reported).
   * @param {!Object} db
   * @param {!Object} job
   * @param {string} status
   * @param {!Object} b Request body.
   * @param {!Object} user
   */
  function setJobStatus(db, job, status, b, user) {
    if (!JOB_STATUS.includes(status)) bad('Unknown status');
    if (FINISHED.includes(job.status)) {
      if (status !== 'queued') bad('Job already finished — re-queue it first');
    }
    if (status === 'queued') {
      Object.assign(job, {
        status,
        startedAt: null,
        finishedAt: null,
        layer: 0,
        progress: 0,
        deductedG: null,
      });
      return;
    }
    if (ACTIVE.includes(status)) {
      if (!job.printerId) bad('Assign a printer first');
      const pr = db.printers.find((p) => p.id === job.printerId);
      if (job.status === 'queued' && job.waitingFor && job.waitingFor.length) {
        bad(
          'Load ' +
            job.waitingFor.join(', ') +
            ' first — tick its task on the Floor',
        );
      }
      if (pr && !R.available(pr) && !ACTIVE.includes(job.status)) {
        bad(
          pr.code +
            ' is out of service' +
            (pr.service && pr.service.reason ? ': ' + pr.service.reason : ''),
        );
      }
      const busy = db.jobs.find(
        (x) =>
          x !== job &&
          x.printerId === job.printerId &&
          ACTIVE.includes(x.status),
      );
      if (busy) bad('Printer is busy with ' + busy.id);
      if (!job.startedAt) job.startedAt = now();
      (db.tasks || []).forEach((t) => {
        if (
          t.status === 'open' &&
          t.type === 'clear' &&
          t.printerId === job.printerId
        ) {
          t.status = 'done';
          t.closedAt = now();
          t.closedBy = user.username;
        }
      });
      job.status = status;
      if (b.layer != null) job.layer = num(b.layer, {min: 0}) || 0;
      if (b.total != null) job.total = num(b.total, {min: 0}) || job.total;
      if (b.progress != null) job.progress = num(b.progress, {min: 0, max: 1});
      else if (job.total && b.layer != null) {
        job.progress = Math.min(1, job.layer / job.total);
      }
      return;
    }
    floor.finishJob(db, job, status, {usedG: b.usedG, by: user.username});
  }

  return {
    filamentFrom,
    itemFrom,
    jobFrom,
    nozzleFrom,
    printerFrom,
    products,
    setJobStatus,
  };
};

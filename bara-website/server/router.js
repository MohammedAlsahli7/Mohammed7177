// Job routing with minimum spool swaps.
// A job needs one or more colours (job.spools — multi-colour prints need
// several AMS slots). Each queued job goes to the
// in-service printer that needs the fewest spool swaps for it, then the one
// with the least work waiting. When colours are
// missing, the job is still assigned and the operator gets a "load spool" task
// saying which slot, and where the spool is
// (shelf or another printer). Tasks close themselves once the printer reports
// (or staff set) that colour as loaded.
const crypto = require('node:crypto');

const ACTIVE = ['printing', 'paused'];
const MAX_SLOTS = 16;
const slotsOf = (p) =>
  Array.isArray(p.slots) ? p.slots : p.spoolId ? [p.spoolId] : [];
const available = (p) =>
  p.enabled !== false && !(p.service && p.service.status === 'out');
const needOf = (j) => [
  ...new Set(
    (Array.isArray(j.spools) && j.spools.length
      ? j.spools
      : [j.spoolId]
    ).filter(Boolean),
  ),
];
const now = () => new Date().toISOString();

/**
 * Pending work on a printer, in grams (a decent proxy for print time across one
 * studio's machines).
 * @param {!Object} db
 * @param {!Object} p
 * @return {number} Grams of work waiting on the printer.
 */
function load(db, p) {
  return db.jobs
    .filter(
      (j) =>
        j.printerId === p.id &&
        (j.status === 'queued' || ACTIVE.includes(j.status)),
    )
    .reduce(
      (s, j) =>
        s +
        (ACTIVE.includes(j.status)
          ? (j.grams || 50) * (1 - (j.progress || 0))
          : j.grams || 50),
      0,
    );
}

/**
 * Colours already promised to a printer by open load tasks count as loaded for
 * routing, so jobs bunch up behind one swap.
 * @param {!Object} db
 * @param {!Object} p
 * @return {!Array<?string>}
 */
function effectiveSlots(db, p) {
  const s = slotsOf(p).slice();
  for (const t of db.tasks || []) {
    if (
      t.status === 'open' &&
      t.type === 'load' &&
      t.printerId === p.id &&
      t.slot != null
    ) {
      s[t.slot] = t.spoolId;
    }
  }
  return s;
}

/**
 * Printers that could take this job, best first: fewest swaps, then least
 * loaded, then code.
 * @param {!Object} db
 * @param {!Object} job
 * @return {!Array<!Object>} Printers for the job, fewest swaps first.
 */
function candidates(db, job) {
  const need = needOf(job);
  if (!need.length) return [];
  return db.printers
    .filter((p) => available(p) && slotsOf(p).length >= need.length)
    .map((p) => {
      const slots = effectiveSlots(db, p);
      const missing = need.filter((id) => !slots.includes(id));
      return {p, missing, swaps: missing.length, load: load(db, p)};
    })
    .sort(
      (a, b) =>
        a.swaps - b.swaps ||
        a.load - b.load ||
        String(a.p.code).localeCompare(String(b.p.code)),
    );
}

/**
 * Where an operator finds a spool: loaded in another printer (and which slot),
 * or on the shelf.
 * @param {!Object} db
 * @param {string} spoolId
 * @param {string} exceptPrinterId
 * @return {!Object} {label} plus printerId or shelf.
 */
function whereIs(db, spoolId, exceptPrinterId) {
  for (const p of db.printers) {
    if (p.id === exceptPrinterId) continue;
    const i = slotsOf(p).indexOf(spoolId);
    if (i > -1) {
      return {
        printerId: p.id,
        label: p.code + (slotsOf(p).length > 1 ? ' slot ' + (i + 1) : ''),
      };
    }
  }
  const f = db.filaments.find((x) => x.id === spoolId);
  return {
    shelf: f && f.shelf,
    label: f && f.shelf ? 'shelf ' + f.shelf : 'the shelf',
  };
}

/**
 * Which slot to put a missing colour in: an empty one, else the one the
 * printer's other queued jobs need least.
 * @param {!Object} db
 * @param {!Object} p
 * @param {!Array<string>} keep Colours the job needs.
 * @return {number} Slot index.
 */
function pickSlot(db, p, keep) {
  const slots = effectiveSlots(db, p);
  const empty = slots.findIndex((s) => !s);
  if (empty > -1) return empty;
  const queued = db.jobs.filter(
    (j) =>
      j.printerId === p.id &&
      (j.status === 'queued' || ACTIVE.includes(j.status)),
  );
  const demand = (id) => queued.filter((j) => needOf(j).includes(id)).length;
  return slots
    .map((id, i) => ({i, id, d: keep.includes(id) ? Infinity : demand(id)}))
    .sort((a, b) => a.d - b.d || a.i - b.i)[0].i;
}

/**
 * @param {!Object} db
 * @param {!Object} p
 * @param {string} spoolId
 * @param {!Object} job
 * @return {!Object} The (new or existing) task.
 */
function addLoadTask(db, p, spoolId, job) {
  db.tasks = db.tasks || [];
  const open = db.tasks.find(
    (t) =>
      t.status === 'open' &&
      t.type === 'load' &&
      t.printerId === p.id &&
      t.spoolId === spoolId,
  );
  if (open) {
    if (!open.jobIds.includes(job.id)) open.jobIds.push(job.id);
    return open;
  }
  const slot = pickSlot(db, p, needOf(job));
  const replacing = slotsOf(p)[slot] || null;
  const f = db.filaments.find((x) => x.id === spoolId);
  const t = {
    id: crypto.randomUUID(),
    type: 'load',
    status: 'open',
    printerId: p.id,
    code: p.code,
    spoolId,
    slot,
    replacing,
    from: whereIs(db, spoolId, p.id).label,
    title:
      'Load ' +
      (f ? f.material.toUpperCase() + ' ' + f.name : spoolId) +
      ' into ' +
      p.code +
      (slotsOf(p).length > 1 ? ' slot ' + (slot + 1) : ''),
    jobIds: [job.id],
    createdAt: now(),
  };
  db.tasks.unshift(t);
  return t;
}

/**
 * Route one job. Returns the printer it went to (or null, with job.routeNote
 * saying why).
 * @param {!Object} db
 * @param {!Object} job
 * @return {?Object} The printer it went to.
 */
function routeJob(db, job) {
  if (job.status !== 'queued' || job.printerId) return null;
  const need = needOf(job);
  if (!need.length) {
    job.routeNote = 'Pick a colour first';
    return null;
  }
  if (!db.printers.some(available)) {
    job.routeNote = 'No printer in service';
    return null;
  }
  const best = candidates(db, job)[0];
  if (!best) {
    job.routeNote = 'No printer has ' + need.length + ' slots for this print';
    return null;
  }
  job.printerId = best.p.id;
  job.routedAt = now();
  job.routeNote = null;
  job.waitingFor = best.missing;
  best.missing.forEach((id) => addLoadTask(db, best.p, id, job));
  return best.p;
}

/**
 * Route every unassigned job that asked for it (orders, or staff pressing
 * "auto-assign"), oldest first.
 * @param {!Object} db
 * @param {!Object=} options {all}
 * @return {number} Jobs routed.
 */
function routePending(db, {all} = {}) {
  let n = 0;
  db.jobs
    .filter(
      (j) => j.status === 'queued' && !j.printerId && (all || j.autoRoute),
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .forEach((j) => {
      if (routeJob(db, j)) n += 1;
    });
  reconcile(db);
  return n;
}

/**
 * After slots change: close load tasks whose colour is now in the printer, and
 * refresh what each job is waiting for.
 * @param {!Object} db
 */
function reconcile(db) {
  for (const t of db.tasks || []) {
    if (t.status !== 'open' || t.type !== 'load') continue;
    const p = db.printers.find((x) => x.id === t.printerId);
    const stillWanted = t.jobIds.some((id) => {
      const j = db.jobs.find((x) => x.id === id);
      return j && j.status === 'queued' && j.printerId === t.printerId;
    });
    if (!p || !stillWanted) {
      t.status = 'dropped';
      t.closedAt = now();
      continue;
    }
    if (slotsOf(p).includes(t.spoolId)) {
      t.status = 'done';
      t.closedAt = now();
      t.closedBy = t.closedBy || 'printer';
    }
  }
  for (const j of db.jobs) {
    if (j.status !== 'queued' || !j.printerId) {
      if (j.waitingFor) j.waitingFor = [];
      continue;
    }
    const p = db.printers.find((x) => x.id === j.printerId);
    if (p) j.waitingFor = needOf(j).filter((id) => !slotsOf(p).includes(id));
  }
}

/**
 * Operator ticks a load task: the spool is now in that slot (and out of
 * wherever it came from).
 * @param {!Object} db
 * @param {!Object} t
 * @param {string} by
 */
function completeLoad(db, t, by) {
  const p = db.printers.find((x) => x.id === t.printerId);
  if (!p) return;
  p.slots = slotsOf(p).slice();
  for (const other of db.printers) {
    if (other !== p && Array.isArray(other.slots)) {
      other.slots = other.slots.map((s) => (s === t.spoolId ? null : s));
    }
  }
  p.slots[t.slot] = t.spoolId;
  t.status = 'done';
  t.closedAt = now();
  t.closedBy = by;
  reconcile(db);
}

/**
 * Turn a reported AMS/tray colour into the closest shelf colour of the same
 * material (within a tolerance).
 * @param {!Object} db
 * @param {!Object} tray {hex, material}
 * @return {?Object}
 */
function matchFilament(db, {hex, material}) {
  const h = String(hex || '')
    .replace(/^#/, '')
    .slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const rgb = (x) => [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
  const [r, g, b] = rgb(h);
  const mat = String(material || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/^(pla|petg|tpu).*/, '$1');
  let best = null;
  let bestD = 60; // max colour distance accepted
  for (const f of db.filaments) {
    if (mat && f.material !== mat) continue;
    const [fr, fg, fb] = rgb(f.hex.slice(1));
    const d = Math.sqrt((r - fr) ** 2 + (g - fg) ** 2 + (b - fb) ** 2);
    if (d < bestD) {
      bestD = d;
      best = f;
    }
  }
  return best;
}

/**
 * A job assigned by hand: queue load tasks for any colours its printer is
 * missing.
 * @param {!Object} db
 * @param {!Object} job
 */
function planLoads(db, job) {
  const p = job.printerId && db.printers.find((x) => x.id === job.printerId);
  if (!p || job.status !== 'queued') return;
  needOf(job)
    .filter((id) => !effectiveSlots(db, p).includes(id))
    .forEach((id) => addLoadTask(db, p, id, job));
  reconcile(db);
}

module.exports = {
  MAX_SLOTS,
  slotsOf,
  available,
  needOf,
  candidates,
  routeJob,
  routePending,
  reconcile,
  completeLoad,
  planLoads,
  matchFilament,
  load,
  whereIs,
};

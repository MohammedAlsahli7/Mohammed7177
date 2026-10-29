// Printer maintenance: usage counters (print hours, filament grams / metres,
// jobs), recurring tasks that fall due
// on whichever comes first — hours, filament, or days — nozzle tracking and
// out-of-service status.

// Sensible FDM defaults; every printer gets its own copy, editable in Ops.
const DEFAULT_TASKS = [
  {
    key: 'clean',
    name: 'Clean bed, wipe nozzle, clear purge area',
    kind: 'clean',
    every: {hours: 50, days: 14},
  },
  {
    key: 'fans',
    name: 'Clean fans, ducts and filters',
    kind: 'clean',
    every: {hours: 300, days: 90},
  },
  {
    key: 'lube',
    name: 'Lubricate rods / linear rails and lead screws',
    kind: 'lubricate',
    every: {hours: 250, days: 90},
  },
  {
    key: 'extruder',
    name: 'Clean extruder gears, check PTFE / hotend',
    kind: 'clean',
    every: {grams: 10000},
  },
  {
    key: 'belts',
    name: 'Check belt tension, frame screws, wiring',
    kind: 'inspect',
    every: {hours: 500, days: 180},
  },
  {key: 'nozzle', name: 'Replace nozzle', kind: 'nozzle', every: {grams: 5000}},
];
const KINDS = [
  'clean',
  'lubricate',
  'inspect',
  'nozzle',
  'replace',
  'calibrate',
  'other',
];
const SOON = 0.8;

const zeroUsage = () => ({seconds: 0, grams: 0, mm: 0, jobs: 0});
const nowIso = () => new Date().toISOString();

/**
 * Give a printer its counters and default tasks (new printers, and printers
 * created before maintenance existed).
 * @param {!Object} p
 * @param {!Object=} options {id}
 * @return {boolean} Whether anything was added.
 */
function ensure(p, {id = () => Math.random().toString(36).slice(2)} = {}) {
  let changed = false;
  if (!p.usage) {
    p.usage = zeroUsage();
    changed = true;
  }
  if (!Array.isArray(p.maintenance)) {
    const at = nowIso();
    p.maintenance = DEFAULT_TASKS.map((t) => ({
      id: id(),
      key: t.key,
      name: t.name,
      kind: t.kind,
      every: cleanEvery(t.every),
      last: {at, usage: {...p.usage}, by: 'setup'},
    }));
    changed = true;
  }
  if (!p.service) {
    p.service = {status: 'in'};
    changed = true;
  }
  return changed;
}

/**
 * @param {!Object=} e Interval input.
 * @return {!Object} Only positive hours, grams, meters, days.
 */
function cleanEvery(e = {}) {
  const out = {};
  for (const k of ['hours', 'grams', 'meters', 'days']) {
    const v = +e[k];
    if (Number.isFinite(v) && v > 0) out[k] = v;
  }
  return out;
}

/**
 * Usage right now = stored counters + the job currently running on the printer.
 * @param {!Object} p
 * @param {?Object} activeJob
 * @param {number=} now
 * @return {!Object}
 */
function usageNow(p, activeJob, now = Date.now()) {
  const u = {...zeroUsage(), ...(p.usage || {})};
  if (activeJob && activeJob.startedAt) {
    u.seconds += Math.max(0, (now - Date.parse(activeJob.startedAt)) / 1000);
  }
  return u;
}

/**
 * How far a task is towards due (whichever interval is closest).
 * @param {!Object} task
 * @param {!Object} usage
 * @param {number=} now
 * @return {!Object}
 */
function taskStatus(task, usage, now = Date.now()) {
  const last = task.last || {at: null, usage: zeroUsage()};
  const lu = {...zeroUsage(), ...(last.usage || {})};
  const since = {
    hours: (usage.seconds - lu.seconds) / 3600,
    grams: usage.grams - lu.grams,
    meters: (usage.mm - lu.mm) / 1000,
    days: last.at ? (now - Date.parse(last.at)) / 864e5 : Infinity,
  };
  let worst = 0;
  let by = null;
  for (const [k, limit] of Object.entries(task.every || {})) {
    if (!limit) continue;
    const f = since[k] / limit;
    if (f > worst) {
      worst = f;
      by = k;
    }
  }
  return {
    since: Object.fromEntries(
      Object.entries(since).map(([k, v]) => [
        k,
        Number.isFinite(v) ? Math.round(v * 10) / 10 : null,
      ]),
    ),
    fraction: Math.round(worst * 1000) / 1000,
    by,
    status: worst >= 1 ? 'due' : worst >= SOON ? 'soon' : 'ok',
  };
}

/**
 * @param {!Object} p
 * @param {?Object} activeJob
 * @param {number=} now
 * @return {!Object} Usage, tasks with status, due and soon counts.
 */
function view(p, activeJob, now = Date.now()) {
  const usage = usageNow(p, activeJob, now);
  const tasks = (p.maintenance || []).map((t) => ({
    ...t,
    ...taskStatus(t, usage, now),
  }));
  return {
    usage,
    tasks,
    due: tasks.filter((t) => t.status === 'due').length,
    soon: tasks.filter((t) => t.status === 'soon').length,
  };
}

module.exports = {
  DEFAULT_TASKS,
  KINDS,
  ensure,
  cleanEvery,
  usageNow,
  taskStatus,
  view,
  zeroUsage,
};

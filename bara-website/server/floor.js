// The print floor: live printer state, connectors that poll real printers, and
// the job lifecycle
// (queued → printing → done/failed/cancelled) with filament deducted from the
// linked spool on finish.
const crypto = require('node:crypto');
const M = require('./maintenance');

const FILAMENT_DIAMETER_MM = 1.75;
const DEFAULT_DENSITY = {pla: 1.24, petg: 1.27, tpu: 1.21, loop: 1.24};
const ACTIVE = ['printing', 'paused'];
const FINISHED = ['done', 'failed', 'cancelled'];
const CONNECTORS = ['manual', 'push', 'octoprint', 'moonraker'];

// ---- Connectors: each returns normalised telemetry { status, progress, layer,
// totalLayers, file, nozzle, bed, eta, filamentUsedMm } ----
const OCTO_STATE = (s = '') =>
  /printing|starting|resuming|finishing/i.test(s)
    ? 'printing'
    : /paus/i.test(s)
      ? 'paused'
      : /cancel/i.test(s)
        ? 'cancelled'
        : /error/i.test(s)
          ? 'failed'
          : /offline|closed/i.test(s)
            ? 'offline'
            : 'idle';
const MOON_STATE = {
  printing: 'printing',
  paused: 'paused',
  complete: 'done',
  cancelled: 'cancelled',
  error: 'failed',
  standby: 'idle',
};

/**
 * JSON request to a printer with a timeout.
 * @param {string} url
 * @param {!Object=} options
 * @return {!Promise<!Object>}
 */
async function call(
  url,
  {headers = {}, method = 'GET', body, timeout = 5000} = {},
) {
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), timeout);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? {'Content-Type': 'application/json'} : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctl.signal,
    });
    if (!res.ok) {
      throw new Error('HTTP ' + res.status + ' from ' + new URL(url).host);
    }
    const t = await res.text();
    return t ? JSON.parse(t) : {};
  } finally {
    clearTimeout(tm);
  }
}
const base = (p) => String(p.url || '').replace(/\/+$/, '');

const adapters = {
  octoprint: {
    headers: (p) => (p.apiKey ? {'X-Api-Key': p.apiKey} : {}),
    async read(p) {
      const h = this.headers(p);
      const [job, printer] = await Promise.all([
        call(base(p) + '/api/job', {headers: h}),
        call(base(p) + '/api/printer', {headers: h}).catch(() => ({})),
      ]);
      const temp = printer.temperature || {};
      const len =
        job.job &&
        job.job.filament &&
        job.job.filament.tool0 &&
        job.job.filament.tool0.length;
      const progress =
        job.progress && job.progress.completion != null
          ? job.progress.completion / 100
          : null;
      return {
        status: OCTO_STATE(job.state),
        progress,
        file: job.job && job.job.file && job.job.file.name,
        nozzle: temp.tool0 && {
          actual: temp.tool0.actual,
          target: temp.tool0.target,
        },
        bed: temp.bed && {actual: temp.bed.actual, target: temp.bed.target},
        eta: job.progress && job.progress.printTimeLeft,
        filamentUsedMm: len && progress != null ? len * progress : null,
      };
    },
    async command(p, cmd) {
      const body =
        cmd === 'cancel'
          ? {command: 'cancel'}
          : {command: 'pause', action: cmd};
      await call(base(p) + '/api/job', {
        method: 'POST',
        headers: this.headers(p),
        body,
      });
    },
  },
  moonraker: {
    headers: (p) => (p.apiKey ? {'X-Api-Key': p.apiKey} : {}),
    async read(p) {
      const r = await call(
        base(p) +
          '/printer/objects/query?print_stats&virtual_sdcard&extruder&heater_bed&display_status',
        {headers: this.headers(p)},
      );
      const s = (r.result && r.result.status) || {};
      const ps = s.print_stats || {};
      const info = ps.info || {};
      const progress =
        s.virtual_sdcard && s.virtual_sdcard.progress != null
          ? s.virtual_sdcard.progress
          : s.display_status && s.display_status.progress;
      const eta =
        progress > 0 && ps.print_duration
          ? Math.round(ps.print_duration / progress - ps.print_duration)
          : null;
      return {
        status: MOON_STATE[ps.state] || 'idle',
        progress: progress == null ? null : progress,
        file: ps.filename || null,
        layer: info.current_layer == null ? null : info.current_layer,
        totalLayers: info.total_layer == null ? null : info.total_layer,
        nozzle: s.extruder && {
          actual: s.extruder.temperature,
          target: s.extruder.target,
        },
        bed: s.heater_bed && {
          actual: s.heater_bed.temperature,
          target: s.heater_bed.target,
        },
        eta,
        filamentUsedMm: ps.filament_used == null ? null : ps.filament_used,
        message: ps.message || null,
      };
    },
    async command(p, cmd) {
      await call(base(p) + '/printer/print/' + cmd, {
        method: 'POST',
        headers: this.headers(p),
      });
    },
  },
};

const round1 = (n) => Math.round(n * 10) / 10;
const num = (v) => (v == null || v === '' || !Number.isFinite(+v) ? null : +v);

/**
 * Live printer state, connectors and the job lifecycle.
 * @param {!Store} store
 * @param {!Object=} options
 * @return {!Object}
 */
function createFloor(
  store,
  {
    densities = {},
    pollMs = 5000,
    staleMs = 60000,
    log = console,
    onFinish,
  } = {},
) {
  const state = new Map(); // printerId → live telemetry (not persisted)
  const density = (mat) => densities[mat] || DEFAULT_DENSITY[mat] || 1.24;
  const mmToGrams = (mm, mat) =>
    ((mm * Math.PI * (FILAMENT_DIAMETER_MM / 2) ** 2) / 1000) * density(mat);
  const gramsToMm = (g, mat) =>
    ((g / density(mat)) * 1000) / (Math.PI * (FILAMENT_DIAMETER_MM / 2) ** 2);
  const emit = (topics) => {
    for (const l of store.listeners) l(topics);
  };

  const printerView = (p, {secrets} = {}) => {
    const {apiKey, token, ...rest} = p;
    const live = {
      ...(state.get(p.id) || {
        status: p.connector === 'manual' ? 'idle' : 'offline',
      }),
    };
    const job = store.db.jobs.find(
      (j) => j.printerId === p.id && ACTIVE.includes(j.status),
    );
    // manual printers have no telemetry: their job is the truth
    if (p.connector === 'manual') live.status = job ? job.status : 'idle';
    return {
      ...rest,
      hasApiKey: !!apiKey,
      ...(secrets ? {token} : {}),
      live,
      jobId: job ? job.id : null,
      upkeep: M.view(p, job),
    };
  };

  /**
   * @param {!Object} job
   * @param {?Object} printer
   * @return {?Object} The spool the job used.
   */
  function spoolFor(job, printer) {
    // The job's own spool; otherwise the printer's only loaded spool (with an
    // AMS we can't guess which one it used).
    const loaded = printer
      ? (Array.isArray(printer.slots)
          ? printer.slots
          : [printer.spoolId]
        ).filter(Boolean)
      : [];
    const id = job.spoolId || (loaded.length === 1 ? loaded[0] : null);
    return id ? store.db.filaments.find((f) => f.id === id) : null;
  }

  /**
   * Finish a job once: set final status and take the filament it used off the
   * spool.
   * @param {!Object} db
   * @param {!Object} job
   * @param {string} status done, failed or cancelled.
   * @param {!Object=} usage {usedMm, usedG, by}
   */
  function finishJob(db, job, status, {usedMm, usedG, by} = {}) {
    if (FINISHED.includes(job.status)) return;
    const printer = db.printers.find((p) => p.id === job.printerId);
    job.status = status;
    job.finishedAt = new Date().toISOString();
    if (status === 'done') {
      job.progress = 1;
      if (job.total) job.layer = job.total;
    }
    if (job.deductedG == null) {
      const spool = spoolFor(job, printer);
      const mat = (spool && spool.material) || job.material;
      let grams = num(usedG);
      if (grams == null && num(usedMm) != null) grams = mmToGrams(+usedMm, mat);
      if (grams == null && job.grams) {
        grams = status === 'done' ? job.grams : job.grams * (job.progress || 0);
      }
      grams = grams ? round1(grams) : 0;
      job.deductedG = grams;
      if (spool && grams > 0) {
        spool.grams = Math.max(0, round1(spool.grams - grams));
        store.log(db, {
          kind: 'filament',
          ref: spool.id,
          delta: -grams,
          reason: 'Job ' + job.id + ' ' + status,
          jobId: job.id,
          by: by || (printer ? printer.code : 'system'),
        });
      }
      // Wear counters that drive maintenance: print time, filament through the
      // nozzle, jobs.
      if (printer && job.startedAt) {
        M.ensure(printer);
        const u = printer.usage;
        u.seconds = Math.round(
          u.seconds +
            Math.max(
              0,
              (Date.parse(job.finishedAt) - Date.parse(job.startedAt)) / 1000,
            ),
        );
        u.grams = round1(u.grams + grams);
        u.mm = Math.round(
          u.mm + (num(usedMm) != null ? +usedMm : gramsToMm(grams, mat)),
        );
        u.jobs += 1;
      }
      if (onFinish) onFinish(db, job, printer);
    }
  }

  /**
   * Core link between telemetry and jobs. Used by pollers, push agents and
   * tests alike.
   * @param {string} printerId
   * @param {!Object} t Normalised telemetry.
   * @param {!Object=} options {by}
   * @return {?Object} The live state.
   */
  function applyTelemetry(printerId, t, {by} = {}) {
    const printer = store.db.printers.find((p) => p.id === printerId);
    if (!printer) return null;
    const prev = state.get(printerId) || {};
    const live = {
      ...prev,
      ...Object.fromEntries(
        Object.entries(t).filter(([, v]) => v !== undefined),
      ),
      lastSeen: new Date().toISOString(),
      error: null,
    };
    state.set(printerId, live);
    let touched = false;
    ((db) => {
      let job = db.jobs.find(
        (j) => j.printerId === printerId && ACTIVE.includes(j.status),
      );
      if (
        !job &&
        ACTIVE.includes(live.status) &&
        !ACTIVE.includes(prev.status)
      ) {
        const waiting = db.jobs
          .filter((j) => j.printerId === printerId && j.status === 'queued')
          .sort(
            (a, b) =>
              (a.position || 0) - (b.position || 0) ||
              a.createdAt.localeCompare(b.createdAt),
          );
        const base = (f) =>
          String(f || '')
            .split('/')
            .pop()
            .replace(/\.(gcode|bgcode|3mf)$/i, '')
            .toLowerCase();
        job =
          (live.file &&
            waiting.find((j) => j.file && base(j.file) === base(live.file))) ||
          waiting[0];
        if (job) {
          job.status = 'printing';
          job.startedAt = new Date().toISOString();
          touched = true;
          (db.tasks || []).forEach((t) => {
            if (
              t.status === 'open' &&
              t.type === 'clear' &&
              t.printerId === printerId
            ) {
              t.status = 'done';
              t.closedAt = job.startedAt;
              t.closedBy = 'printer';
            }
          });
        }
      }
      if (!job) return;
      if (ACTIVE.includes(live.status)) {
        if (live.totalLayers) job.total = live.totalLayers;
        if (live.progress != null) {
          job.progress = Math.max(0, Math.min(1, live.progress));
        }
        job.layer =
          live.layer != null
            ? live.layer
            : job.total && job.progress != null
              ? Math.round(job.total * job.progress)
              : job.layer;
        if (job.status !== live.status) job.status = live.status;
        touched = true;
      } else if (
        ['done', 'failed', 'cancelled'].includes(live.status) ||
        (live.status === 'idle' && ACTIVE.includes(prev.status))
      ) {
        // An idle printer that was mid-print without reporting "complete" (e.g.
        // OctoPrint) finished if it reached ~100 %.
        const status =
          live.status === 'idle'
            ? (prev.progress || 0) >= 0.99
              ? 'done'
              : 'cancelled'
            : live.status;
        finishJob(db, job, status, {
          usedMm:
            live.filamentUsedMm != null
              ? live.filamentUsedMm
              : prev.filamentUsedMm,
          usedG: t.filamentUsedG,
          by,
        });
        touched = true;
      }
    })(store.db);
    if (touched) store.save();
    emit(touched ? ['printers', 'jobs', 'inventory'] : ['printers']);
    return live;
  }

  /**
   * @param {string} printerId
   * @param {*} err
   */
  function markError(printerId, err) {
    const prev = state.get(printerId) || {};
    const stale =
      !prev.lastSeen || Date.now() - Date.parse(prev.lastSeen) > staleMs;
    state.set(printerId, {
      ...prev,
      status: stale ? 'offline' : prev.status,
      error: String((err && err.message) || err),
    });
    emit(['printers']);
  }

  /**
   * Polls every network printer once.
   * @return {!Promise<void>}
   */
  async function pollOnce() {
    await Promise.all(
      store.db.printers
        .filter((p) => p.enabled !== false && adapters[p.connector] && p.url)
        .map(async (p) => {
          try {
            applyTelemetry(p.id, await adapters[p.connector].read(p), {
              by: p.code,
            });
          } catch (e) {
            markError(p.id, e);
          }
        }),
    );
    // Push printers that stopped reporting go offline.
    for (const p of store.db.printers.filter((x) => x.connector === 'push')) {
      const s = state.get(p.id);
      if (
        s &&
        s.status !== 'offline' &&
        Date.now() - Date.parse(s.lastSeen) > staleMs
      ) {
        state.set(p.id, {...s, status: 'offline'});
        emit(['printers']);
      }
    }
  }

  let timer = null;
  const start = () => {
    const loop = async () => {
      await pollOnce().catch((e) => log.error('[floor] poll failed', e));
      timer = setTimeout(loop, pollMs);
    };
    loop();
  };
  const stop = () => clearTimeout(timer);

  /**
   * Sends pause / resume / cancel to a network printer.
   * @param {string} printerId
   * @param {string} cmd
   * @return {!Promise<void>}
   */
  async function command(printerId, cmd) {
    const p = store.db.printers.find((x) => x.id === printerId);
    if (!p) throw Object.assign(new Error('Printer not found'), {status: 404});
    if (!['pause', 'resume', 'cancel'].includes(cmd)) {
      throw Object.assign(new Error('Unknown command'), {status: 400});
    }
    if (!adapters[p.connector]) {
      throw Object.assign(
        new Error(
          'This printer has no remote control — update the job by hand',
        ),
        {status: 409},
      );
    }
    await adapters[p.connector].command(p, cmd);
  }

  /**
   * Tries a printer connection.
   * @param {!Object} p
   * @return {!Promise<!Object>}
   */
  async function test(p) {
    if (!adapters[p.connector]) {
      return {
        ok: true,
        note: 'No connection to test for ' + p.connector + ' printers.',
      };
    }
    try {
      return {ok: true, telemetry: await adapters[p.connector].read(p)};
    } catch (e) {
      return {ok: false, error: e.message};
    }
  }

  const newToken = () => crypto.randomBytes(24).toString('base64url');

  return {
    state,
    applyTelemetry,
    finishJob,
    pollOnce,
    start,
    stop,
    command,
    test,
    printerView,
    newToken,
    mmToGrams,
  };
}

module.exports = {createFloor, CONNECTORS, ACTIVE, FINISHED};

// Print jobs and operator tasks.
'use strict';
const R = require('../router');
const {bad, now} = require('../http');
const {ACTIVE} = require('../floor');

module.exports = function register(ctx) {
  const {body, find, jobFrom, on, setJobStatus, staff, store} = ctx;
  on('POST', '/api/jobs', async (req) => {
    const u = staff(req);
    const b = await body(req);
    const j = jobFrom(b, {status: 'queued', qty: 1, layer: 0, progress: 0});
    if (b.autoRoute && !j.printerId) j.autoRoute = true;
    store.change(b.requestId ? ['jobs', 'requests'] : 'jobs', (db) => {
      j.id = store.nextJobId();
      j.createdAt = now();
      j.createdBy = u.username;
      if (b.requestId) {
        const r = db.requests.find((x) => x.id === b.requestId);
        if (r) {
          r.status = 'converted';
          r.jobId = j.id;
          j.requestId = r.id;
        }
      }
      db.jobs.push(j);
      if (j.autoRoute) R.routePending(db);
      else R.planLoads(db, j);
    });
    return j;
  });
  on('PATCH', '/api/jobs/:id', async (req, _r, {id}) => {
    staff(req);
    const j = find(store.db.jobs, id, 'Job');
    const next = jobFrom(await body(req), j);
    const moved = next.printerId !== j.printerId;
    store.change(['jobs', 'printers'], (db) => {
      Object.assign(j, next);
      if (moved) {
        j.autoRoute = !j.printerId;
        R.planLoads(db, j);
      }
      R.reconcile(db);
    });
    return j;
  });
  on('POST', '/api/jobs/:id/status', async (req, _r, {id}) => {
    const u = staff(req);
    const j = find(store.db.jobs, id, 'Job');
    const b = await body(req);
    store.change(['jobs', 'printers', 'inventory'], (db) =>
      setJobStatus(db, j, b.status, b, u),
    );
    return j;
  });
  on('POST', '/api/jobs/route', (req) => {
    // "Auto-assign": route every unassigned queued job
    staff(req);
    return {
      routed: store.change(['jobs', 'printers'], (db) => {
        db.jobs.forEach((j) => {
          if (j.status === 'queued' && !j.printerId) j.autoRoute = true;
        });
        return R.routePending(db);
      }),
    };
  });
  on('DELETE', '/api/jobs/:id', (req, _r, {id}) => {
    staff(req);
    const j = find(store.db.jobs, id, 'Job');
    if (ACTIVE.includes(j.status)) bad('Cancel the job first');
    store.change(['jobs', 'printers'], (db) => {
      db.jobs = db.jobs.filter((x) => x.id !== id);
    });
    return {ok: true};
  });

  // ---- Operator tasks (load spool, clear plate) ----
  on('POST', '/api/tasks/:id/done', (req, _r, {id}) => {
    const u = staff(req);
    const t = find(store.db.tasks, id, 'Task');
    if (t.status !== 'open') bad('Task already closed');
    store.change(['jobs', 'printers'], (db) => {
      if (t.type === 'load') R.completeLoad(db, t, u.username);
      else {
        t.status = 'done';
        t.closedAt = now();
        t.closedBy = u.username;
      }
    });
    return t;
  });
  on('POST', '/api/tasks/:id/dismiss', (req, _r, {id}) => {
    const u = staff(req);
    const t = find(store.db.tasks, id, 'Task');
    store.change(['jobs', 'printers'], () => {
      t.status = 'dismissed';
      t.closedAt = now();
      t.closedBy = u.username;
    });
    return t;
  });
};

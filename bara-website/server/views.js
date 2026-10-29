// What the dashboard and website see: snapshots, the public floor feed, live
// events.
'use strict';
const {FINISHED} = require('./floor');

module.exports = function register(ctx) {
  const {floor, store} = ctx;
  // ---- Live events (Server-Sent Events) for the Ops dashboard ----
  const clients = new Set();
  let pending = new Set();
  let flushT = null;
  store.onChange((topics) => {
    topics.forEach((t) => pending.add(t));
    if (topics.includes('orders')) pending.add('checkouts');
    if (topics.includes('jobs') || topics.includes('printers')) {
      pending.add('tasks');
    }
    if (!flushT) {
      flushT = setTimeout(() => {
        flushT = null;
        const send = [...pending];
        pending = new Set();
        for (const c of clients) {
          for (const t of send) {
            c.write(
              'event: ' +
                t +
                '\ndata: ' +
                JSON.stringify(snapshot(t, c.user)) +
                '\n\n',
            );
          }
        }
      }, 150);
    }
  });
  const ping = setInterval(() => {
    for (const c of clients) c.write(': ping\n\n');
  }, 25000);

  // ---- Views ----
  const isAdmin = (u) => u && u.role === 'admin';
  const stockDoc = () => ({
    updatedAt: store.db.stockUpdatedAt || null,
    thresholds: store.db.thresholds,
    items: store.db.filaments,
  });
  const jobsView = () => {
    const recent = store.db.jobs.filter(
      (j) =>
        !FINISHED.includes(j.status) ||
        Date.now() - Date.parse(j.finishedAt || j.createdAt) < 7 * 864e5,
    );
    return recent.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  };
  const requestView = (r) => ({
    ...r,
    file: r.file ? {name: r.file.name, size: r.file.size} : null,
  });
  /**
   * @param {string} topic
   * @param {?Object} user
   * @return {*}
   */
  function snapshot(topic, user) {
    switch (topic) {
      case 'printers':
        return store.db.printers.map((p) =>
          floor.printerView(p, {secrets: isAdmin(user)}),
        );
      case 'jobs':
        return jobsView();
      case 'checkouts':
        // Payments started but not (yet) confirmed: staff can re-check them.
        return store.db.checkouts
          .filter((c) => c.status !== 'paid')
          .slice(0, 50);
      case 'orders':
        return store.db.orders.slice(0, 200);
      case 'tasks':
        return store.db.tasks
          .filter(
            (t) =>
              t.status === 'open' ||
              Date.now() - Date.parse(t.closedAt || t.createdAt) < 864e5,
          )
          .slice(0, 300);
      case 'costing':
        return store.db.costing;
      case 'inventory':
        return {
          thresholds: store.db.thresholds,
          filaments: store.db.filaments,
          items: store.db.items,
        };
      case 'requests':
        return store.db.requests.slice(0, 300).map(requestView);
      case 'users':
        return isAdmin(user)
          ? store.db.users.map(({username, role, createdAt}) => ({
              username,
              role,
              createdAt,
            }))
          : [];
      default:
        return null;
    }
  }
  /**
   * Public floor feed for the website: no customer data, only product names for
   * catalogue items.
   * @return {!Array<!Object>}
   */
  function floorFeed() {
    const order = {printing: 0, paused: 0, queued: 1, done: 2, failed: 2};
    const fresh = (j) =>
      !FINISHED.includes(j.status) ||
      (j.status !== 'cancelled' &&
        Date.now() - Date.parse(j.finishedAt) < 30 * 60 * 1000);
    return store.db.jobs
      .filter((j) => j.printerId && fresh(j))
      .sort(
        (a, b) =>
          order[a.status] - order[b.status] ||
          (b.startedAt || b.createdAt).localeCompare(
            a.startedAt || a.createdAt,
          ),
      )
      .slice(0, 12)
      .map((j) => {
        const p = store.db.printers.find((x) => x.id === j.printerId);
        const spool = store.db.filaments.find((f) => f.id === j.spoolId);
        return {
          id: j.id,
          item: j.productId || null,
          ...(j.productId ? {} : {name: {en: 'Custom print', ar: 'طلب خاص'}}),
          hex: j.hex || (spool && spool.hex) || '#8C877C',
          printer: p ? p.code.replace(/^P/i, '') : '?',
          layer: j.layer || 0,
          total: j.total || 0,
          status: j.status === 'paused' ? 'printing' : j.status,
        };
      });
  }

  return {
    clients,
    floorFeed,
    flushT,
    isAdmin,
    jobsView,
    pending,
    ping,
    requestView,
    snapshot,
    stockDoc,
  };
};

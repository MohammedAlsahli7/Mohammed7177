// Sign-in, accounts, and the dashboard snapshot + live stream.
'use strict';
const A = require('../auth');
const M = require('../maintenance');
const {HttpError, bad, str, now, ITEM_CATEGORIES} = require('../http');
const {CONNECTORS} = require('../floor');

module.exports = function register(ctx) {
  const {
    body,
    clients,
    ipOf,
    loginLimit,
    on,
    orderToken,
    products,
    sameOrigin,
    secureCookie,
    sessions,
    snapshot,
    staff,
    store,
    userOf,
  } = ctx;
  on('POST', '/api/auth/login', async (req, res) => {
    if (!loginLimit('login:' + ipOf(req))) {
      throw new HttpError(429, 'Too many attempts — wait 15 minutes');
    }
    if (!sameOrigin(req)) {
      throw new HttpError(403, 'Cross-site request blocked');
    }
    const b = await body(req);
    const u = store.db.users.find((x) => x.username === str(b.username, 60));
    if (!A.checkPassword(u, b.password || '')) {
      throw new HttpError(401, 'Wrong username or password');
    }
    res.setHeader(
      'Set-Cookie',
      A.sessionCookie(sessions.issue(u.username), {secure: secureCookie(req)}),
    );
    return {username: u.username, role: u.role};
  });
  on('POST', '/api/auth/logout', (req, res) => {
    res.setHeader(
      'Set-Cookie',
      A.sessionCookie('', {clear: true, secure: secureCookie(req)}),
    );
    return {ok: true};
  });
  on('GET', '/api/auth/me', (req) => {
    const u = userOf(req);
    if (!u) throw new HttpError(401, 'Not signed in');
    return {username: u.username, role: u.role};
  });
  on('POST', '/api/auth/password', async (req) => {
    const u = staff(req);
    const b = await body(req);
    if (!A.checkPassword(u, b.current || '')) {
      throw new HttpError(401, 'Current password is wrong');
    }
    if (String(b.next || '').length < 10) {
      bad('New password needs at least 10 characters');
    }
    store.change('users', () => Object.assign(u, A.hashPassword(b.next)));
    return {ok: true};
  });
  on('GET', '/api/users', (req) => {
    staff(req, {admin: true});
    return snapshot('users', {role: 'admin'});
  });
  on('POST', '/api/users', async (req) => {
    staff(req, {admin: true});
    const b = await body(req);
    const username = str(b.username, 40);
    if (!/^[\w.-]{2,40}$/.test(username)) {
      bad('Username: 2–40 letters, digits, . _ -');
    }
    if (store.db.users.some((u) => u.username === username)) {
      bad('That username exists');
    }
    if (String(b.password || '').length < 10) {
      bad('Password needs at least 10 characters');
    }
    store.change('users', (db) =>
      db.users.push({
        username,
        role: b.role === 'admin' ? 'admin' : 'staff',
        ...A.hashPassword(b.password),
        createdAt: now(),
      }),
    );
    return {ok: true};
  });
  on('DELETE', '/api/users/:name', (req, _res, {name}) => {
    const me = staff(req, {admin: true});
    if (name === me.username) bad('You can’t delete yourself');
    store.change('users', (db) => {
      db.users = db.users.filter((u) => u.username !== name);
    });
    return {ok: true};
  });

  // Staff: everything the dashboard needs in one call, then live via
  // /api/events
  on('GET', '/api/state', (req) => {
    const u = staff(req);
    return {
      user: {username: u.username, role: u.role},
      printers: snapshot('printers', u),
      jobs: snapshot('jobs'),
      inventory: snapshot('inventory'),
      requests: snapshot('requests'),
      users: snapshot('users', u),
      orders: snapshot('orders'),
      tasks: snapshot('tasks'),
      costing: store.db.costing,
      kinds: M.KINDS,
      orderIntake: !!orderToken,
      products: products(),
      connectors: CONNECTORS,
      categories: ITEM_CATEGORIES,
    };
  });
  on('GET', '/api/events', (req, res) => {
    const u = staff(req);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    res.write('retry: 3000\n\n');
    const c = res;
    c.user = u;
    clients.add(c);
    req.on('close', () => clients.delete(c));
    return undefined;
  });

  // Inventory: filament
};

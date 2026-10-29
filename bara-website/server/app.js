// Bara' server: website API, staff Ops API, live events and static hosting.
'use strict';
const http = require('node:http');
const {HttpError} = require('./http');
const {createPayments} = require('./payments');

const ROUTES = [
  'public',
  'account',
  'inventory',
  'printers',
  'jobs',
  'upkeep',
  'costing',
  'orders',
  'requests',
  'checkout',
];

/**
 * Builds the server: website API, staff API, live events and static site.
 * @param {!Object=} opts See server/index.js for the options.
 * @return {!Object} {server, store, floor, handle}
 */
function createApp(opts = {}) {
  const routes = [];
  const on = (method, pattern, fn) =>
    routes.push([
      method,
      new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'),
      fn,
    ]);
  const ctx = {opts, on};
  Object.assign(ctx, require('./context')(ctx));
  Object.assign(ctx, require('./views')(ctx));
  Object.assign(ctx, require('./validate')(ctx));
  ctx.payments = createPayments({
    provider: opts.payProvider,
    secretKey: opts.paySecretKey,
    webhookSecret: opts.payWebhookSecret,
    apiBase: opts.payApiBase,
  });
  for (const r of ROUTES) require('./routes/' + r)(ctx);
  const {serveStatic} = require('./static')(ctx);
  const {
    store,
    floor,
    allowedOrigins,
    sameOrigin,
    secureCookie,
    send,
    log,
    clients,
    ping,
  } = ctx;
  const security = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(self)',
  };
  /**
   * Handles one HTTP request: security headers, CORS, API routes, static files.
   * @param {!http.IncomingMessage} req
   * @param {!http.ServerResponse} res
   */
  async function handle(req, res) {
    for (const [k, v] of Object.entries(security)) res.setHeader(k, v);
    if (secureCookie(req)) {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains',
      );
    }
    const url = new URL(req.url, 'http://local');
    const origin = req.headers.origin && req.headers.origin.replace(/\/$/, '');
    const isPublicApi =
      /^\/api\/(stock|floor|pricing|quote|sell|corner|checkout|health)$/.test(
        url.pathname,
      );
    if (origin && isPublicApi && allowedOrigins.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
    }
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
      res.writeHead(204);
      return res.end();
    }
    try {
      if (url.pathname.startsWith('/api/')) {
        // A public form posted from an allowed external site origin is fine;
        // everything else must be same-origin when it carries an Origin.
        if (
          req.method !== 'GET' &&
          origin &&
          !sameOrigin(req) &&
          !(isPublicApi && allowedOrigins.has(origin)) &&
          !/\/telemetry$|^\/api\/payments\/webhook\//.test(url.pathname)
        ) {
          throw new HttpError(403, 'Cross-site request blocked');
        }
        for (const [method, re, fn] of routes) {
          const m = url.pathname.match(re);
          if (!m) continue;
          if (method !== req.method) continue;
          const out = await fn(
            req,
            res,
            Object.fromEntries(
              Object.entries(m.groups || {}).map(([k, v]) => [
                k,
                decodeURIComponent(v),
              ]),
            ),
            url,
          );
          if (out !== undefined && !res.headersSent) send(res, 200, out);
          return;
        }
        throw new HttpError(
          routes.some(([, re]) => re.test(url.pathname)) ? 405 : 404,
          'No such endpoint',
        );
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        throw new HttpError(405, 'Method not allowed');
      }
      await serveStatic(req, res, url);
    } catch (e) {
      const status = e.status || 500;
      if (status >= 500) log.error('[bara]', req.method, url.pathname, e);
      if (!res.headersSent) {
        send(res, status, {error: status >= 500 ? 'Server error' : e.message});
      } else res.end();
    }
  }

  const server = http.createServer(handle);
  server.on('close', () => {
    clearInterval(ping);
    floor.stop();
    for (const c of clients) c.end();
  });
  return {server, store, floor, handle};
}

module.exports = {createApp};

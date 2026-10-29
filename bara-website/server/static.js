// Static hosting of the built site, with site.config.js wired to this server.
'use strict';
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.md': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};
const HIDDEN = new Set([
  'server',
  'test',
  'node_modules',
  'scripts',
  'var',
  '.git',
  '.env',
  'package.json',
  'package-lock.json',
  'Dockerfile',
  'docker-compose.yml',
]);

module.exports = function register(ctx) {
  const {staticDir} = ctx;
  // ---- Static site ----
  const configPatch =
    '\n;(function (c) { /* filled in by the Bara\' server: empty endpoints point at this server */\n  var e = c.endpoints = c.endpoints || {}, s = c.sources = c.sources || {};\n  var api = { quote: "/api/quote", sell: "/api/sell", corner: "/api/corner", floor: "/api/floor", stock: "/api/stock" };\n  for (var k in api) if (!e[k]) e[k] = api[k];\n  if (!s.stock) s.stock = "/api/stock";\n  if (!s.pricing) s.pricing = "/api/pricing";\n})(window.BARA_CONFIG = window.BARA_CONFIG || {});\n';
  /**
   * @param {!http.IncomingMessage} req
   * @param {!http.ServerResponse} res
   * @param {!URL} url
   * @return {!Promise<void>}
   */
  async function serveStatic(req, res, url) {
    const rel = decodeURIComponent(url.pathname);
    const parts = rel.split('/').filter(Boolean);
    if (
      parts.some((p) => p.startsWith('.') || HIDDEN.has(p)) &&
      !(parts[0] === '.well-known')
    ) {
      return notFound(res);
    }
    let file = path.join(staticDir, rel);
    if (!file.startsWith(staticDir)) return notFound(res);
    let st = await fsp.stat(file).catch(() => null);
    if (st && st.isDirectory()) {
      if (!rel.endsWith('/')) {
        res.writeHead(301, {Location: rel + '/' + url.search});
        return res.end();
      }
      file = path.join(file, 'index.html');
      st = await fsp.stat(file).catch(() => null);
    }
    if (!st || !st.isFile()) return notFound(res);
    const ext = path.extname(file).toLowerCase();
    const cache = rel.startsWith('/vendor/')
      ? 'public, max-age=31536000, immutable'
      : rel.startsWith('/data/')
        ? 'public, max-age=60, must-revalidate'
        : ext === '.html' || rel === '/site.config.js'
          ? 'public, max-age=0, must-revalidate'
          : 'public, max-age=3600';
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': cache,
    };
    if (rel.startsWith('/ops/')) headers['X-Robots-Tag'] = 'noindex, nofollow';
    if (rel === '/site.config.js') {
      res.writeHead(200, headers);
      return res.end((await fsp.readFile(file, 'utf8')) + configPatch);
    }
    if (req.method === 'HEAD') {
      res.writeHead(200, {...headers, 'Content-Length': st.size});
      return res.end();
    }
    res.writeHead(200, {...headers, 'Content-Length': st.size});
    fs.createReadStream(file).pipe(res);
  }
  /**
   * @param {!http.ServerResponse} res
   * @return {!Promise<void>}
   */
  async function notFound(res) {
    const page = await fsp
      .readFile(path.join(staticDir, '404.html'))
      .catch(() => null);
    res.writeHead(404, {'Content-Type': page ? MIME['.html'] : 'text/plain'});
    res.end(page || 'Not found');
  }

  return {configPatch, notFound, serveStatic};
};

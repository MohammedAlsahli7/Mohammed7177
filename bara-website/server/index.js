// Entry point: node server/index.js   (configure with environment variables —
// see .env.example)
const fs = require('node:fs');
const path = require('node:path');
const {createApp} = require('./app');

// Minimal .env loader (no dependency): KEY=value lines, existing env wins.
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
}

const env = process.env;
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const staticDir =
  env.BARA_STATIC_DIR ||
  (fs.existsSync(path.join(dist, 'index.html')) ? dist : root);
const production = env.NODE_ENV === 'production';

if (!env.BARA_SECRET) {
  if (production) {
    console.error(
      "✗ BARA_SECRET is required in production (any long random string). Generate one: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    );
    process.exit(1);
  }
  console.warn(
    '! BARA_SECRET not set — using a random one; staff will be signed out on every restart.',
  );
}

const {server, store, floor} = createApp({
  root,
  staticDir,
  dataDir: env.BARA_DATA_DIR || path.join(root, 'var'),
  secret: env.BARA_SECRET,
  adminUser: env.BARA_ADMIN_USER || 'admin',
  adminPassword: env.BARA_ADMIN_PASSWORD,
  allowedOrigins: (env.BARA_ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  cookieSecure: env.BARA_COOKIE_SECURE
    ? env.BARA_COOKIE_SECURE === 'true'
    : undefined,
  trustProxy: env.BARA_TRUST_PROXY === 'true',
  pollMs: +env.BARA_PRINTER_POLL_MS || 5000,
  maxUploadMB: +env.BARA_MAX_UPLOAD_MB || 100,
  orderToken: env.BARA_ORDER_TOKEN || '',
  publicUrl: env.BARA_PUBLIC_URL || '',
  payProvider: env.BARA_PAY_PROVIDER || '',
  paySecretKey: env.BARA_PAY_SECRET_KEY || '',
  payWebhookSecret: env.BARA_PAY_WEBHOOK_SECRET || '',
  payApiBase: env.BARA_PAY_API_BASE || '',
  applePayDomainFile: env.BARA_APPLE_PAY_DOMAIN_FILE || '',
});

if (!store.db.users.length) {
  console.warn(
    '! No staff accounts yet. Set BARA_ADMIN_PASSWORD and restart to create the first admin.',
  );
}

const port = +env.PORT || 8080;
server.listen(port, env.HOST || '0.0.0.0', () => {
  console.log(
    `✓ Bara’ running on http://localhost:${port}  (site: ${path.relative(root, staticDir) || '.'}, ops: /ops/)`,
  );
  floor.start();
});
const shutdown = () => {
  console.log('Shutting down…');
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3000).unref();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

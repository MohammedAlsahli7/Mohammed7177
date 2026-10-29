// Staff accounts (scrypt-hashed) and stateless signed session cookies.
const crypto = require('node:crypto');

const COOKIE = 'bara_session';
const TTL_MS = 12 * 60 * 60 * 1000;

/**
 * Hashes a password with scrypt and a random salt.
 * @param {string} password
 * @param {string=} salt
 * @return {{salt: string, hash: string}}
 */
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return {
    salt,
    hash: crypto.scryptSync(String(password), salt, 64).toString('hex'),
  };
}
/**
 * Checks a password in constant time (also when the user is unknown).
 * @param {?Object} user
 * @param {string} password
 * @return {boolean}
 */
function checkPassword(user, password) {
  if (!user) {
    crypto.scryptSync('x', 'timing-pad', 64);
    return false;
  }
  const {hash} = hashPassword(password, user.salt);
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(user.hash, 'hex'),
  );
}

/**
 * Stateless HMAC-signed session tokens.
 * @param {string} secret
 * @return {{issue: function(string): string, read: function(string): ?Object}}
 */
function createSessions(secret) {
  const sign = (s) =>
    crypto.createHmac('sha256', secret).update(s).digest('base64url');
  return {
    issue(username) {
      const body = Buffer.from(
        JSON.stringify({u: username, exp: Date.now() + TTL_MS}),
      ).toString('base64url');
      return body + '.' + sign(body);
    },
    read(token) {
      if (!token || typeof token !== 'string') return null;
      const [body, mac] = token.split('.');
      if (!body || !mac) return null;
      const want = sign(body);
      if (
        mac.length !== want.length ||
        !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(want))
      ) {
        return null;
      }
      try {
        const s = JSON.parse(Buffer.from(body, 'base64url').toString());
        return s.exp > Date.now() ? s : null;
      } catch {
        return null;
      }
    },
  };
}

/**
 * @param {string|undefined} header Cookie header.
 * @return {!Object<string, string>}
 */
function parseCookies(header) {
  const out = {};
  for (const part of String(header || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) {
      out[part.slice(0, i).trim()] = decodeURIComponent(
        part.slice(i + 1).trim(),
      );
    }
  }
  return out;
}

/**
 * Set-Cookie value for the staff session.
 * @param {string} value
 * @param {{secure: (boolean|undefined), clear: (boolean|undefined)}=} options
 * @return {string}
 */
function sessionCookie(value, {secure, clear} = {}) {
  return [
    COOKIE + '=' + (clear ? '' : value),
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    clear ? 'Max-Age=0' : 'Max-Age=' + TTL_MS / 1000,
    secure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

/**
 * Tiny fixed-window limiter, keyed by IP (+ bucket name).
 * @param {number} max Requests allowed per window.
 * @param {number} windowMs
 * @return {function(string): boolean} True while under the limit.
 */
function createLimiter(max, windowMs) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const h = hits.get(key);
    if (!h || h.reset < now) {
      hits.set(key, {n: 1, reset: now + windowMs});
      if (hits.size > 10000) hits.clear();
      return true;
    }
    h.n += 1;
    return h.n <= max;
  };
}

module.exports = {
  COOKIE,
  hashPassword,
  checkPassword,
  createSessions,
  parseCookies,
  sessionCookie,
  createLimiter,
};

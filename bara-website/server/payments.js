// Payment providers behind one interface. Moyasar, Tap and Stripe are the
// usual choices for SAR. Every provider gets the same three operations:
//   create(order)      → {id, url}       hosted payment page for the customer
//   check(id)          → {paid, amount}  asked of the provider's API (truth)
//   webhookIds(req)    → [payment ids]   which payment a webhook is about
// A webhook is only a hint: we never trust its body, we call check() first.
'use strict';
const crypto = require('node:crypto');

const DEFAULT_BASE = {
  moyasar: 'https://api.moyasar.com/v1',
  tap: 'https://api.tap.company/v2',
  stripe: 'https://api.stripe.com/v1',
};

/**
 * HTTP call to a provider with a timeout.
 * @param {string} url
 * @param {!Object} opts {method, headers, body}
 * @return {!Promise<!Object>}
 */
async function call(url, {method = 'GET', headers = {}, body} = {}) {
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), 15000);
  try {
    const res = await fetch(url, {method, headers, body, signal: ctl.signal});
    const text = await res.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {raw: text.slice(0, 200)};
    }
    if (!res.ok) {
      const msg =
        (data.error && (data.error.message || data.error)) ||
        data.message ||
        (data.errors && JSON.stringify(data.errors)) ||
        'HTTP ' + res.status;
      throw new Error('Payment provider: ' + String(msg).slice(0, 200));
    }
    return data;
  } finally {
    clearTimeout(tm);
  }
}

/**
 * Stripe takes form-encoded nested fields.
 * @param {!Object} obj
 * @param {string=} prefix
 * @param {!URLSearchParams=} out
 * @return {!URLSearchParams}
 */
function form(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '[' + k + ']' : k;
    if (v == null) continue;
    if (typeof v === 'object') form(v, key, out);
    else out.append(key, String(v));
  }
  return out;
}

const minor = (sar) => Math.round(sar * 100); // SAR → halalas

// Provider-specific method names → what staff see on the order.
const METHODS = [
  [/apple/i, 'Apple Pay'],
  [/google/i, 'Google Pay'],
  [/samsung/i, 'Samsung Pay'],
  [/stc/i, 'STC Pay'],
  [/mada/i, 'mada'],
];
/**
 * @param {*} raw Method as the provider reports it.
 * @return {?string} Apple Pay, Google Pay, Samsung Pay, STC Pay, mada or Card.
 */
function methodName(raw) {
  if (!raw) return null;
  const hit = METHODS.find(([re]) => re.test(String(raw)));
  return hit ? hit[1] : 'Card';
}

/**
 * Builds the provider client from settings.
 * @param {!Object} cfg {provider, secretKey, webhookSecret, apiBase}
 * @return {?Object} Null when payments are not configured.
 */
function createPayments(cfg) {
  const name = cfg.provider;
  if (!name || !cfg.secretKey) return null;
  if (!DEFAULT_BASE[name]) throw new Error('Unknown payment provider ' + name);
  const base = (cfg.apiBase || DEFAULT_BASE[name]).replace(/\/$/, '');
  const key = cfg.secretKey;
  const basic = 'Basic ' + Buffer.from(key + ':').toString('base64');
  const bearer = 'Bearer ' + key;
  const json = (auth) => ({
    'Authorization': auth,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const providers = {
    moyasar: {
      async create(o, urls) {
        const r = await call(base + '/invoices', {
          method: 'POST',
          headers: json(basic),
          body: JSON.stringify({
            amount: minor(o.total),
            currency: o.currency,
            description: 'Bara’ order ' + o.ref,
            success_url: urls.success,
            back_url: urls.cancel,
            callback_url: urls.webhook,
            metadata: {ref: o.ref},
          }),
        });
        return {id: r.id, url: r.url};
      },
      async check(id) {
        const r = await call(base + '/invoices/' + encodeURIComponent(id), {
          headers: json(basic),
        });
        const p = (r.payments || []).find((x) => x.status === 'paid') || {};
        const src = p.source || {};
        return {
          paid: r.status === 'paid',
          amount: r.amount,
          currency: r.currency,
          method: methodName(
            src.type === 'creditcard' ? src.company || 'card' : src.type,
          ),
        };
      },
      webhookIds(b) {
        if (cfg.webhookSecret && b.secret_token !== cfg.webhookSecret) {
          return [];
        }
        const d = b.data || b;
        return [d.invoice_id, d.id].filter(Boolean);
      },
    },
    tap: {
      async create(o, urls) {
        const c = o.customer || {};
        const [first, ...rest] = String(c.name || 'Customer').split(' ');
        const phone = String(c.phone || '').replace(/\D/g, '');
        const r = await call(base + '/charges', {
          method: 'POST',
          headers: json(bearer),
          body: JSON.stringify({
            amount: o.total,
            currency: o.currency,
            description: 'Bara’ order ' + o.ref,
            reference: {order: o.ref},
            metadata: {ref: o.ref},
            customer: {
              first_name: first,
              last_name: rest.join(' ') || undefined,
              email: c.email || undefined,
              phone: phone
                ? {
                    country_code: '966',
                    number: phone.replace(/^(00)?966|^0/, ''),
                  }
                : undefined,
            },
            source: {id: 'src_all'},
            redirect: {url: urls.success},
            post: {url: urls.webhook},
          }),
        });
        return {id: r.id, url: r.transaction && r.transaction.url};
      },
      async check(id) {
        const r = await call(base + '/charges/' + encodeURIComponent(id), {
          headers: json(bearer),
        });
        return {
          paid: r.status === 'CAPTURED',
          amount: minor(+r.amount),
          currency: r.currency,
          method: methodName(
            r.source &&
              (r.source.payment_method || r.source.payment_type || r.source.id),
          ),
        };
      },
      webhookIds(b) {
        return [b.id].filter(Boolean);
      },
    },
    stripe: {
      async create(o, urls) {
        const r = await call(base + '/checkout/sessions', {
          method: 'POST',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: form({
            mode: 'payment',
            success_url: urls.success,
            cancel_url: urls.cancel,
            client_reference_id: o.ref,
            customer_email: (o.customer && o.customer.email) || undefined,
            metadata: {ref: o.ref},
            line_items: o.lines.map((l) => ({
              price_data: {
                currency: o.currency.toLowerCase(),
                unit_amount: minor(l.unitPrice),
                product_data: {name: l.title + ' · ' + l.colourName},
              },
              quantity: l.qty,
            })),
          }).toString(),
        });
        return {id: r.id, url: r.url};
      },
      async check(id) {
        const r = await call(
          base +
            '/checkout/sessions/' +
            encodeURIComponent(id) +
            '?expand[]=payment_intent.payment_method',
          {headers: {Authorization: bearer}},
        );
        return {
          paid: r.payment_status === 'paid',
          amount: r.amount_total,
          currency: String(r.currency || '').toUpperCase(),
          method: methodName(stripeWallet(r) || 'card'),
        };
      },
      webhookIds(b, headers, raw) {
        if (
          cfg.webhookSecret &&
          !stripeSigned(raw, headers, cfg.webhookSecret)
        ) {
          return [];
        }
        const s = b.data && b.data.object;
        return s && /^checkout\.session\./.test(b.type || '') ? [s.id] : [];
      },
    },
  };
  return {name, ...providers[name]};
}

/**
 * @param {!Object} session Checkout session with payment_method expanded.
 * @return {?string} apple_pay / google_pay, or null for a plain card.
 */
function stripeWallet(session) {
  const pm = session.payment_intent && session.payment_intent.payment_method;
  return (pm && pm.card && pm.card.wallet && pm.card.wallet.type) || null;
}

/**
 * Verifies a Stripe-Signature header (t=…,v1=…) over the raw body.
 * @param {string} raw
 * @param {!Object} headers
 * @param {string} secret
 * @return {boolean}
 */
function stripeSigned(raw, headers, secret) {
  const sig = String(headers['stripe-signature'] || '');
  const t = (sig.match(/t=(\d+)/) || [])[1];
  const v1 = [...sig.matchAll(/v1=([0-9a-f]+)/g)].map((m) => m[1]);
  if (!t || !v1.length || Math.abs(Date.now() / 1000 - t) > 600) return false;
  const want = crypto
    .createHmac('sha256', secret)
    .update(t + '.' + raw)
    .digest('hex');
  return v1.some(
    (v) =>
      v.length === want.length &&
      crypto.timingSafeEqual(Buffer.from(v), Buffer.from(want)),
  );
}

module.exports = {createPayments, stripeSigned, minor, methodName};

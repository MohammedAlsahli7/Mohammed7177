// Data layer: every product, colour, price and live feed on the site comes
// through here.
// Reads from BARA_CONFIG.sources (or bundled /data/*.json), writes to
// BARA_CONFIG.endpoints.
(function () {
  const here =
    (document.currentScript && document.currentScript.src) || location.href;
  const cfg = window.BARA_CONFIG || {};
  const dataBase = cfg.dataBase || new URL('../../data/', here).href;
  const sources = cfg.sources || {};
  const endpoints = cfg.endpoints || {};
  const timeout = cfg.requestTimeoutMs || 12000;
  const cache = {};

  class ApiError extends Error {
    constructor(code, msg, status) {
      super(msg || code);
      this.code = code;
      this.status = status;
    }
  }

  async function request(url, opts = {}) {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), timeout);
    try {
      const res = await fetch(url, {
        ...opts,
        signal: ctl.signal,
        headers: {Accept: 'application/json', ...(opts.headers || {})},
      });
      if (!res.ok) throw new ApiError('http', res.statusText, res.status);
      const type = res.headers.get('content-type') || '';
      return type.includes('json') ? res.json() : res.text();
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(
        e.name === 'AbortError' ? 'timeout' : 'network',
        e.message,
      );
    } finally {
      clearTimeout(tm);
    }
  }

  const sourceUrl = (name) => sources[name] || dataBase + name + '.json';
  const get = (name, {fresh} = {}) => {
    if (!fresh && cache[name]) return cache[name];
    const p = request(sourceUrl(name), {cache: 'no-cache'});
    cache[name] = p;
    p.catch(() => {
      delete cache[name];
    });
    return p;
  };
  const configured = (name) => !!endpoints[name];

  async function send(name, body, method = 'POST') {
    const url = endpoints[name];
    if (!url) {
      throw new ApiError(
        'not-configured',
        'Endpoint "' + name + '" is not set in site.config.js',
      );
    }
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
    return request(url, {
      method,
      body: isForm ? body : JSON.stringify(body),
      headers: isForm ? {} : {'Content-Type': 'application/json'},
      credentials: 'include',
    });
  }

  function poll(name, ms, cb) {
    if (!endpoints[name]) return () => {};
    let alive = true;
    let t;
    const run = async () => {
      if (!alive) return;
      if (!document.hidden) {
        try {
          cb(
            await request(endpoints[name], {
              cache: 'no-store',
              credentials: 'include',
            }),
          );
        } catch (e) {
          cb(null, e);
        }
      }
      t = setTimeout(run, ms || 10000);
    };
    run();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }
  const fetchLive = (name) =>
    endpoints[name]
      ? request(endpoints[name], {cache: 'no-store', credentials: 'include'})
      : Promise.reject(new ApiError('not-configured'));

  // ---- Normalisers: public JSON schema → internal shape used by the UI ----
  const pair = (v) =>
    v == null
      ? undefined
      : Array.isArray(v)
        ? v
        : typeof v === 'object'
          ? [v.en || '', v.ar || v.en || '']
          : [String(v), String(v)];
  function normProduct(p) {
    const s = p.source || null;
    return {
      id: p.id,
      en: (p.name && p.name.en) || p.id,
      ar: (p.name && (p.name.ar || p.name.en)) || p.id,
      price: +p.price,
      currency: p.currency || 'SAR',
      mats: p.materials || [],
      cat: p.category,
      tone: p.tone || (p.materials || [])[0] || 'paper',
      badge: pair(p.badge),
      spec: p.spec || '',
      d: pair(p.description) || ['', ''],
      stats: p.stats || null,
      images: p.images || [],
      src: s && s.platform,
      by: s && s.designer,
      url: s && s.url,
      lic: s && pair(s.licence),
      likes: s && s.likes,
    };
  }
  const statusOf = (grams, th) =>
    grams >= th.in ? 'in' : grams >= th.low ? 'low' : 'out';

  async function boot() {
    const [prod, stock] = await Promise.all([get('products'), get('stock')]);
    const th = (stock && stock.thresholds) || {in: 1500, low: 300};
    const rows = Array.isArray(stock) ? stock : stock.items || [];
    const products = (Array.isArray(prod) ? prod : prod.items || [])
      .filter((p) => p.published !== false)
      .map(normProduct);
    const colours = {};
    rows.forEach((f) => {
      if (statusOf(f.grams, th) === 'out') return;
      (colours[f.material] = colours[f.material] || []).push([
        f.hex,
        f.name,
        f.ar || f.name,
        f.id,
      ]);
    });
    window.SITE_PRODUCTS = products;
    window.SITE_COLOURS = colours;
    window.BARA_THRESHOLDS = th;
    return {products, colours, stock: rows, thresholds: th};
  }

  // ---- Mesh reader: real dimensions + volume from STL / OBJ (3MF: name + size
  // only) ----
  function bboxVol(tris) {
    const mn = [Infinity, Infinity, Infinity];
    const mx = [-Infinity, -Infinity, -Infinity];
    let vol = 0;
    for (let i = 0; i < tris.length; i += 9) {
      for (let k = 0; k < 9; k += 3) {
        for (let a = 0; a < 3; a++) {
          const v = tris[i + k + a];
          if (v < mn[a]) mn[a] = v;
          if (v > mx[a]) mx[a] = v;
        }
      }
      const [x1, y1, z1, x2, y2, z2, x3, y3, z3] = tris.slice(i, i + 9);
      vol +=
        (x1 * (y2 * z3 - y3 * z2) -
          x2 * (y1 * z3 - y3 * z1) +
          x3 * (y1 * z2 - y2 * z1)) /
        6;
    }
    return {
      dims: mx.map((v, a) => +(v - mn[a]).toFixed(1)),
      volume: Math.abs(vol) / 1000,
    };
  }
  async function readMesh(file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const out = {
      file,
      name: file.name,
      ext,
      bytes: file.size,
      size: (file.size / 1048576).toFixed(1) + ' MB',
      dims: null,
      volume: null,
    };
    try {
      if (ext === 'stl') {
        const buf = await file.arrayBuffer();
        const dv = new DataView(buf);
        const n = buf.byteLength > 84 ? dv.getUint32(80, true) : 0;
        let tris;
        if (84 + n * 50 === buf.byteLength) {
          tris = new Float32Array(n * 9);
          for (let i = 0; i < n; i++) {
            for (let k = 0; k < 9; k++) {
              tris[i * 9 + k] = dv.getFloat32(84 + i * 50 + 12 + k * 4, true);
            }
          }
        } else {
          const txt = new TextDecoder().decode(buf);
          const m =
            txt.match(/vertex\s+[-+\d.eE]+\s+[-+\d.eE]+\s+[-+\d.eE]+/g) || [];
          tris = new Float32Array(m.length * 3);
          m.forEach((s, i) =>
            s
              .trim()
              .split(/\s+/)
              .slice(1)
              .forEach((v, a) => {
                tris[i * 3 + a] = +v;
              }),
          );
        }
        if (tris.length) Object.assign(out, bboxVol(tris));
      } else if (ext === 'obj') {
        const txt = await file.text();
        const v = [];
        const f = [];
        txt.split('\n').forEach((l) => {
          if (l.startsWith('v ')) {
            v.push(l.trim().split(/\s+/).slice(1, 4).map(Number));
          } else if (l.startsWith('f ')) {
            const ix = l
              .trim()
              .split(/\s+/)
              .slice(1)
              .map((s) => parseInt(s, 10))
              .map((x) => (x < 0 ? v.length + x : x - 1));
            for (let k = 1; k < ix.length - 1; k++) {
              f.push(...v[ix[0]], ...v[ix[k]], ...v[ix[k + 1]]);
            }
          }
        });
        if (f.length) Object.assign(out, bboxVol(f));
      }
    } catch (e) {
      /* unreadable mesh: we still accept the file and price it by hand */
    }
    return out;
  }

  // Rough price from real mesh volume and the published rate card
  // (data/pricing.json).
  function estimate(mesh, mat, speed, pricing) {
    if (
      !mesh ||
      !mesh.volume ||
      !pricing ||
      !pricing.materials ||
      !pricing.materials[mat]
    ) {
      return null;
    }
    const m = pricing.materials[mat];
    const grams = mesh.volume * m.density * (pricing.fillFactor || 0.35);
    const base = Math.max(
      m.min || 0,
      (pricing.setupFee || 0) + grams * m.perGram,
    );
    return {
      price: Math.ceil(base + (speed === 'rush' ? pricing.rushFee || 0 : 0)),
      grams: Math.round(grams),
    };
  }
  const fits = (mesh, pricing) =>
    !mesh ||
    !mesh.dims ||
    !pricing ||
    !pricing.buildVolume ||
    mesh.dims
      .slice()
      .sort((a, b) => a - b)
      .every(
        (d, i) => d <= pricing.buildVolume.slice().sort((a, b) => a - b)[i],
      );

  window.baraApi = {
    boot,
    get,
    send,
    poll,
    fetchLive,
    configured,
    readMesh,
    estimate,
    fits,
    statusOf,
    normProduct,
    config: cfg,
    ApiError,
  };
})();

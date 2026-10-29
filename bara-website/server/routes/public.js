// Public website API: stock, floor, pricing, forms.
'use strict';
const crypto = require('node:crypto');
const fsp = require('node:fs/promises');
const path = require('node:path');
const C = require('../costing');
const {HttpError, bad, str, now} = require('../http');

module.exports = function register(ctx) {
  const {
    body,
    floorFeed,
    form,
    formLimit,
    ipOf,
    on,
    pricing,
    stockDoc,
    store,
    uploadDir,
  } = ctx;
  on('GET', '/api/health', () => ({
    ok: true,
    time: now(),
    printers: store.db.printers.length,
  }));

  // Public website endpoints (see data/README.md contracts)
  on('GET', '/api/stock', () => stockDoc());
  on('GET', '/api/floor', () => floorFeed());
  on('GET', '/api/pricing', () => C.rateCard(store.db.costing, pricing));
  for (const kind of ['quote', 'sell', 'corner']) {
    on('POST', '/api/' + kind, async (req) => {
      if (!formLimit(kind + ':' + ipOf(req))) {
        throw new HttpError(429, 'Too many submissions — try again later');
      }
      const fd = await form(req);
      const fields = {};
      let file = null;
      if (fd) {
        for (const [k, v] of fd.entries()) {
          if (typeof v === 'string') fields[k] = str(v, 4000);
          else if (k === 'file' && v.size) {
            const ext = (v.name.split('.').pop() || '').toLowerCase();
            if (!['stl', '3mf', 'obj', 'step', 'stp', 'zip'].includes(ext)) {
              bad('Unsupported file type');
            }
            file = v;
          }
        }
      } else {
        Object.assign(
          fields,
          Object.fromEntries(
            Object.entries(await body(req)).map(([k, v]) => [
              k,
              str(typeof v === 'object' ? JSON.stringify(v) : v, 4000),
            ]),
          ),
        );
      }
      if (!fields.email && !fields.phone) bad('Email or phone required');
      const id = crypto.randomUUID();
      let saved = null;
      if (file) {
        const dir = path.join(uploadDir, id);
        await fsp.mkdir(dir, {recursive: true});
        const name =
          path
            .basename(file.name)
            .replace(/[^\w.\- ]+/g, '_')
            .slice(0, 120) || 'model';
        await fsp.writeFile(
          path.join(dir, name),
          Buffer.from(await file.arrayBuffer()),
        );
        saved = {name, size: file.size, path: path.join(id, name)};
      }
      store.change('requests', (db) =>
        db.requests.unshift({
          id,
          kind,
          at: now(),
          status: 'new',
          fields,
          file: saved,
        }),
      );
      return {ok: true, id};
    });
  }

  // Auth
};

// Website submissions inbox.
'use strict';
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const {HttpError, bad, REQUEST_STATUS} = require('../http');

module.exports = function register(ctx) {
  const {body, find, on, requestView, staff, store, uploadDir} = ctx;
  on('PATCH', '/api/requests/:id', async (req, _r, {id}) => {
    staff(req);
    const r = find(store.db.requests, id, 'Request');
    const b = await body(req);
    if (!REQUEST_STATUS.includes(b.status)) bad('Unknown status');
    store.change('requests', () => {
      r.status = b.status;
    });
    return requestView(r);
  });
  on('DELETE', '/api/requests/:id', async (req, _r, {id}) => {
    staff(req, {admin: true});
    const r = find(store.db.requests, id, 'Request');
    if (r.file) {
      await fsp.rm(path.join(uploadDir, id), {recursive: true, force: true});
    }
    store.change('requests', (db) => {
      db.requests = db.requests.filter((x) => x.id !== id);
    });
    return {ok: true};
  });
  on('GET', '/api/requests/:id/file', async (req, res, {id}) => {
    staff(req);
    const r = find(store.db.requests, id, 'Request');
    if (!r.file) throw new HttpError(404, 'No file');
    const f = path.join(uploadDir, r.file.path);
    if (!f.startsWith(uploadDir + path.sep)) {
      throw new HttpError(404, 'No file');
    }
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition':
        'attachment; filename="' + r.file.name.replace(/"/g, '') + '"',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(f).pipe(res);
    return undefined;
  });
};

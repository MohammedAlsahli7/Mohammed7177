// Bara' Ops — staff dashboard: live print floor, job queue, inventory, website inbox, printers, team.
// Talks to the Bara' server (/api/*). Everything updates live over Server-Sent Events (/api/events).
const OB = window.InfillDesignSystem_d33a9b;

// ---- API ----
async function opsApi(method, url, body) {
  const res = await fetch(url, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || res.statusText || 'Request failed'); e.status = res.status; throw e; }
  return data;
}

// ---- Formatting ----
const MAT_LABEL = { pla: 'PLA', petg: 'PETG', tpu: 'TPU', loop: 'Loop' };
const fmtG = (g) => (g == null ? '—' : g >= 1000 ? (g / 1000).toFixed(g >= 10000 ? 0 : 1) + ' kg' : Math.round(g) + ' g');
const fmtDur = (s) => { if (s == null || !isFinite(s)) return '—'; const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? h + ' h ' + m + ' m' : m + ' m'; };
const fmtAgo = (iso) => { if (!iso) return '—'; const s = (Date.now() - Date.parse(iso)) / 1000; return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + ' min ago' : s < 86400 ? Math.floor(s / 3600) + ' h ago' : new Date(iso).toLocaleDateString(); };
const fmtTemp = (t) => (t && t.actual != null ? Math.round(t.actual) + (t.target ? '/' + Math.round(t.target) : '') + ' °C' : '—');
const stockStatus = (g, th) => (g >= th.in ? 'in' : g >= th.low ? 'low' : 'out');
const STOCK_BADGE = { in: ['success', 'In stock'], low: ['warning', 'Low'], out: ['danger', 'Out'] };
const PRINTER_BADGE = { printing: ['info', 'Printing'], paused: ['warning', 'Paused'], idle: ['success', 'Idle'], done: ['success', 'Finished'], failed: ['danger', 'Error'], cancelled: ['neutral', 'Cancelled'], offline: ['neutral', 'Offline'] };
const JOB_BADGE = { queued: ['neutral', 'Queued'], printing: ['info', 'Printing'], paused: ['warning', 'Paused'], done: ['success', 'Done'], failed: ['danger', 'Failed'], cancelled: ['neutral', 'Cancelled'] };
const REMOTE = ['octoprint', 'moonraker'];
const CONNECTOR_INFO = {
  manual: 'No connection. Staff update the job by hand from the Floor.',
  moonraker: 'Klipper printers (Qidi, Creality K-series, Voron, Sovol…). Address of Moonraker, e.g. http://192.168.1.50:7125',
  octoprint: 'Any printer behind OctoPrint. Address e.g. http://octopi.local, plus the OctoPrint API key.',
  push: 'The printer (or a bridge: Bambu, Prusa Connect, Home Assistant, a script) pushes status to this server with its token.',
};
const ctrl = (on) => (e) => on(e && e.target ? e.target.value : e);

// ---- Shared bits ----
function useToasts() {
  const [list, setList] = React.useState([]);
  const push = React.useCallback((t) => { const id = Math.random(); setList((l) => [...l, { ...t, id }]); setTimeout(() => setList((l) => l.filter((x) => x.id !== id)), t.tone === 'danger' ? 7000 : 3000); }, []);
  const view = <div className="o-toasts" aria-live="polite">{list.map((t) => <OB.Toast key={t.id} {...t} onClose={() => setList((l) => l.filter((x) => x.id !== t.id))} />)}</div>;
  return [push, view];
}
const OpsCtx = React.createContext(null);
const useOps = () => React.useContext(OpsCtx);

// Wraps an API call with a toast on failure (and optional success message).
function useAct() {
  const { toast } = useOps();
  return async (fn, ok) => { try { const r = await fn(); if (ok) toast({ tone: 'success', title: ok }); return r; } catch (e) { toast({ tone: 'danger', title: e.message }); return null; } };
}

function Swatch({ hex, size = 22 }) { return <span className="o-swatch" style={{ background: hex || 'var(--paper-3)', width: size, height: size }} />; }
function Progress({ value, status }) { return <div className={'o-progress' + (status === 'failed' ? ' is-fail' : status === 'done' ? ' is-done' : '')} role="progressbar" aria-valuenow={Math.round((value || 0) * 100)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: Math.round((value || 0) * 100) + '%' }} /></div>; }
function Empty({ title, children, pose = 'sleepy' }) { return <div className="o-empty"><OB.Mascot pose={pose} size={96} /><b style={{ font: '800 20px/1.2 var(--font-display)', color: 'var(--fg-1)' }}>{title}</b>{children}</div>; }
function Textarea({ label, value, onChange, placeholder }) { const id = React.useId(); return <OB.Field label={label} htmlFor={id}><textarea id={id} className="o-textarea" value={value || ''} placeholder={placeholder} onChange={ctrl(onChange)} /></OB.Field>; }

function spoolOptions(filaments, th, { none = 'No spool' } = {}) {
  return [{ value: '', label: none }].concat(filaments.slice().sort((a, b) => a.material.localeCompare(b.material) || a.name.localeCompare(b.name)).map((f) => ({ value: f.id, label: MAT_LABEL[f.material] + ' · ' + f.name + ' (' + fmtG(f.grams) + (stockStatus(f.grams, th) === 'out' ? ', out' : '') + ')' })));
}

// ---- Login ----
function Login({ onIn }) {
  const [u, setU] = React.useState(''); const [p, setP] = React.useState(''); const [err, setErr] = React.useState(''); const [busy, setBusy] = React.useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); setErr(''); try { onIn(await opsApi('POST', '/api/auth/login', { username: u, password: p })); } catch (x) { setErr(x.message); } finally { setBusy(false); } };
  return (
    <div className="o-login">
      <form onSubmit={submit} className="o-card" style={{ width: 'min(400px, 100%)', padding: 28, gap: 18 }}>
        <div className="o-row" style={{ justifyContent: 'space-between' }}><OB.Wordmark size={30} /><span className="o-chip">OPS</span></div>
        <div><h1 className="o-h2">Staff sign in</h1><p style={{ margin: '6px 0 0', color: 'var(--fg-2)' }}>The printers are waiting. They’re always waiting.</p></div>
        <OB.Input label="Username" value={u} onChange={ctrl(setU)} icon="user" />
        <OB.Input label="Password" type="password" value={p} onChange={ctrl(setP)} icon="lock" error={err || undefined} />
        <OB.Button type="submit" fullWidth disabled={busy || !u || !p} icon="log-in">{busy ? 'Signing in…' : 'Sign in'}</OB.Button>
      </form>
    </div>
  );
}

// ---- Floor ----
function PrinterCard({ p }) {
  const { data } = useOps(); const act = useAct();
  const th = data.inventory.thresholds;
  const job = data.jobs.find((j) => j.id === p.jobId);
  const next = data.jobs.filter((j) => j.printerId === p.id && j.status === 'queued');
  const spool = data.inventory.filaments.find((f) => f.id === p.spoolId);
  const live = p.live || {}; const st = PRINTER_BADGE[live.status] || PRINTER_BADGE.offline;
  const remote = REMOTE.includes(p.connector);
  const [layer, setLayer] = React.useState('');
  const setStatus = (j, status, extra) => act(() => opsApi('POST', '/api/jobs/' + j.id + '/status', { status, ...extra }));
  const cmd = (c) => act(() => opsApi('POST', '/api/printers/' + p.id + '/command', { command: c }), c === 'cancel' ? 'Cancel sent' : c === 'pause' ? 'Pause sent' : 'Resume sent');
  return (
    <article className={'o-card' + (live.status === 'offline' || p.enabled === false ? ' is-off' : '')}>
      <div className="o-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <div className="o-row"><span className="o-chip" style={{ background: 'var(--yolk-500)' }}>{p.code}</span><b style={{ font: '800 20px/1.1 var(--font-display)' }}>{p.name}</b></div>
          <span className="o-mono" style={{ color: 'var(--fg-3)' }}>{(p.model || p.connector).toUpperCase()} · {p.connector === 'manual' ? 'MANUAL' : live.lastSeen ? 'SEEN ' + fmtAgo(live.lastSeen).toUpperCase() : 'NOT CONNECTED'}</span>
        </div>
        <OB.Badge tone={st[0]} dot>{st[1]}</OB.Badge>
      </div>
      {live.error && <span className="o-mono" style={{ color: 'var(--danger)' }}>{live.error}</span>}
      {job ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="o-row" style={{ justifyContent: 'space-between' }}><span className="o-row" style={{ minWidth: 0 }}><Swatch hex={job.hex} size={16} /><b style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</b></span><span className="o-mono" style={{ color: 'var(--fg-3)' }}>{job.id}</span></div>
          <Progress value={job.progress} status={job.status} />
          <div className="o-row o-mono" style={{ justifyContent: 'space-between', color: 'var(--fg-2)' }}><span>{Math.round((job.progress || 0) * 100)} %{job.total ? ' · L ' + (job.layer || 0) + '/' + job.total : ''}</span><span>{live.eta ? 'ETA ' + fmtDur(live.eta) : ''}</span></div>
        </div>
      ) : <div className="o-mono" style={{ color: 'var(--fg-3)', padding: '6px 0' }}>{next.length ? 'NEXT UP: ' + next[0].id + ' · ' + next[0].title : 'BED IS EMPTY'}</div>}
      <dl className="o-kv">
        {remote || p.connector === 'push' ? <><dt>Nozzle</dt><dd>{fmtTemp(live.nozzle)}</dd><dt>Bed</dt><dd>{fmtTemp(live.bed)}</dd></> : null}
        {live.file && <><dt>File</dt><dd>{live.file}</dd></>}
        <dt>Queue</dt><dd>{next.length ? next.length + ' waiting' : 'empty'}</dd>
      </dl>
      <OB.Select size="sm" label="Loaded spool" value={p.spoolId || ''} options={spoolOptions(data.inventory.filaments, th, { none: 'Nothing loaded' })} onChange={(e) => act(() => opsApi('PATCH', '/api/printers/' + p.id, { spoolId: e.target.value || null }), 'Spool updated')} />
      {spool && stockStatus(spool.grams, th) !== 'in' && <OB.Badge tone={stockStatus(spool.grams, th) === 'out' ? 'danger' : 'warning'}>{spool.name}: {fmtG(spool.grams)} left on the shelf</OB.Badge>}
      <div className="o-row" style={{ marginTop: 'auto' }}>
        {job && remote && job.status === 'printing' && <OB.Button size="sm" variant="secondary" icon="pause" onClick={() => cmd('pause')}>Pause</OB.Button>}
        {job && remote && job.status === 'paused' && <OB.Button size="sm" variant="secondary" icon="play" onClick={() => cmd('resume')}>Resume</OB.Button>}
        {job && remote && <OB.Button size="sm" variant="danger" icon="square" onClick={() => confirm('Cancel the print on ' + p.code + '?') && cmd('cancel')}>Cancel</OB.Button>}
        {job && !remote && <>
          <OB.Input size="sm" type="number" placeholder={'Layer' + (job.total ? ' / ' + job.total : '')} value={layer} onChange={ctrl(setLayer)} style={{ width: 120 }} />
          <OB.Button size="sm" variant="secondary" disabled={!layer} onClick={() => { setStatus(job, job.status, { layer: +layer }); setLayer(''); }}>Update</OB.Button>
        </>}
        {job && <><OB.Button size="sm" icon="check" onClick={() => setStatus(job, 'done')}>Done</OB.Button><OB.Button size="sm" variant="ghost" icon="x" onClick={() => setStatus(job, 'failed')}>Failed</OB.Button></>}
        {!job && next.length > 0 && <OB.Button size="sm" icon="play" onClick={() => setStatus(next[0], 'printing')}>{remote ? 'Mark started' : 'Start ' + next[0].id}</OB.Button>}
      </div>
    </article>
  );
}

function FloorPage({ go }) {
  const { data } = useOps(); const th = data.inventory.thresholds;
  const printing = data.printers.filter((p) => p.jobId).length;
  const queued = data.jobs.filter((j) => j.status === 'queued');
  const low = data.inventory.filaments.filter((f) => stockStatus(f.grams, th) !== 'in').length + data.inventory.items.filter((i) => i.reorderAt != null && i.qty <= i.reorderAt).length;
  const offline = data.printers.filter((p) => p.connector !== 'manual' && (!p.live || p.live.status === 'offline')).length;
  return <>
    <div className="o-bar"><div><span className="o-over">Live from the floor</span><h1 className="o-h1">Print floor</h1></div><OB.Button icon="plus" onClick={() => go('queue', 'new')}>New print job</OB.Button></div>
    <div className="o-stats">
      <div className="o-stat"><span className="o-over">Printing</span><b>{printing}<small style={{ font: '600 16px var(--font-body)', color: 'var(--fg-3)' }}> / {data.printers.length}</small></b></div>
      <div className="o-stat"><span className="o-over">Queued</span><b>{queued.length}</b>{queued.some((j) => !j.printerId) && <button className="o-btn-link" onClick={() => go('queue')}>{queued.filter((j) => !j.printerId).length} need a printer</button>}</div>
      <div className="o-stat"><span className="o-over">Low stock</span><b style={{ color: low ? 'var(--danger)' : undefined }}>{low}</b>{low > 0 && <button className="o-btn-link" onClick={() => go('inventory')}>Check shelves</button>}</div>
      <div className="o-stat"><span className="o-over">Offline printers</span><b>{offline}</b></div>
    </div>
    {data.printers.length ? <div className="o-grid">{data.printers.map((p) => <PrinterCard key={p.id} p={p} />)}</div>
      : <Empty title="No printers yet">{data.user.role === 'admin' ? <OB.Button icon="plus" onClick={() => go('printers', 'new')}>Add your first printer</OB.Button> : <span>Ask an admin to add the printers.</span>}</Empty>}
  </>;
}

// ---- Queue ----
function JobDialog({ job, preset, onClose }) {
  const { data } = useOps(); const act = useAct(); const th = data.inventory.thresholds;
  const [f, setF] = React.useState(() => job ? { ...job } : { title: '', productId: '', orderRef: '', spoolId: '', grams: '', total: '', file: '', printerId: '', notes: '', qty: 1, ...preset });
  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v && v.target ? v.target.value : v }));
  const pickProduct = (e) => { const id = e.target.value; const p = data.products.find((x) => x.id === id); setF((x) => ({ ...x, productId: id, grams: x.grams || (p && p.weight ? parseFloat(p.weight) : '') })); };
  const save = async () => {
    const body = { title: f.title, productId: f.productId || null, orderRef: f.orderRef, spoolId: f.spoolId || null, grams: f.grams === '' ? null : +f.grams, total: f.total === '' ? null : +f.total, file: f.file, printerId: f.printerId || null, notes: f.notes, qty: +f.qty || 1, requestId: f.requestId };
    const r = await act(() => (job ? opsApi('PATCH', '/api/jobs/' + job.id, body) : opsApi('POST', '/api/jobs', body)), job ? 'Job updated' : 'Job queued');
    if (r) onClose();
  };
  return (
    <OB.Dialog open onClose={onClose} eyebrow={job ? job.id : 'NEW JOB'} title={job ? 'Edit print job' : 'Queue a print'} width={620} footer={<><OB.Button variant="ghost" onClick={onClose}>Cancel</OB.Button><OB.Button icon="check" onClick={save} disabled={!f.title && !f.productId}>{job ? 'Save' : 'Add to queue'}</OB.Button></>}>
      <div className="o-form">
        <OB.Select label="Catalogue product" value={f.productId || ''} onChange={pickProduct} options={[{ value: '', label: 'Custom / not in the shop' }].concat(data.products.map((p) => ({ value: p.id, label: p.name })))} />
        <OB.Input label="Title" hint={f.productId ? 'Optional — defaults to the product name' : 'Shown to staff only'} value={f.title || ''} onChange={set('title')} />
        <OB.Select label="Filament spool" value={f.spoolId || ''} onChange={set('spoolId')} options={spoolOptions(data.inventory.filaments, th)} />
        <OB.Select label="Printer" value={f.printerId || ''} onChange={set('printerId')} options={[{ value: '', label: 'Unassigned' }].concat(data.printers.map((p) => ({ value: p.id, label: p.code + ' · ' + p.name })))} />
        <OB.Input label="Filament estimate" type="number" suffix="g" hint="Taken off the spool if the printer can’t report real usage" value={f.grams == null ? '' : String(f.grams)} onChange={set('grams')} />
        <OB.Input label="Layers" type="number" hint="Optional — Klipper printers report this" value={f.total == null ? '' : String(f.total)} onChange={set('total')} />
        <OB.Input label="G-code file name" hint="Matches the job when the printer starts this file" value={f.file || ''} onChange={set('file')} />
        <OB.Input label="Order ref" value={f.orderRef || ''} onChange={set('orderRef')} />
        <div className="o-full"><Textarea label="Notes" value={f.notes} onChange={set('notes')} placeholder="Brim, supports, which side faces up…" /></div>
      </div>
    </OB.Dialog>
  );
}

function JobRow({ j, onEdit }) {
  const { data } = useOps(); const act = useAct();
  const p = data.printers.find((x) => x.id === j.printerId); const st = JOB_BADGE[j.status];
  const setStatus = (status) => act(() => opsApi('POST', '/api/jobs/' + j.id + '/status', { status }));
  const active = j.status === 'printing' || j.status === 'paused'; const finished = ['done', 'failed', 'cancelled'].includes(j.status);
  return (
    <tr>
      <td className="o-mono">{j.id}</td>
      <td><div className="o-row" style={{ flexWrap: 'nowrap' }}><Swatch hex={j.hex} size={16} /><div style={{ minWidth: 0 }}><b>{j.title}</b>{j.qty > 1 && <span className="o-mono"> ×{j.qty}</span>}<div className="o-mono" style={{ color: 'var(--fg-3)' }}>{[j.orderRef, j.file].filter(Boolean).join(' · ')}</div></div></div></td>
      <td><OB.Badge tone={st[0]} dot>{st[1]}</OB.Badge>{active && <div style={{ marginTop: 6, width: 120 }}><Progress value={j.progress} status={j.status} /></div>}</td>
      <td style={{ minWidth: 150 }}>{active || finished ? (p ? p.code + ' · ' + p.name : '—') : <OB.Select size="sm" value={j.printerId || ''} onChange={(e) => act(() => opsApi('PATCH', '/api/jobs/' + j.id, { printerId: e.target.value || null }))} options={[{ value: '', label: 'Unassigned' }].concat(data.printers.map((x) => ({ value: x.id, label: x.code + ' · ' + x.name })))} />}</td>
      <td className="o-mono">{finished ? fmtG(j.deductedG) + ' used' : fmtG(j.grams)}</td>
      <td className="o-mono" style={{ color: 'var(--fg-3)' }}>{fmtAgo(j.finishedAt || j.startedAt || j.createdAt)}</td>
      <td><div className="o-row" style={{ flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
        {j.status === 'queued' && j.printerId && <OB.IconButton size="sm" icon="play" label="Start" onClick={() => setStatus('printing')} />}
        {active && <OB.IconButton size="sm" icon="check" label="Done" onClick={() => setStatus('done')} />}
        {active && <OB.IconButton size="sm" variant="ghost" icon="x" label="Failed" onClick={() => setStatus('failed')} />}
        {(j.status === 'queued' || active) && <OB.IconButton size="sm" variant="ghost" icon="ban" label="Cancel job" onClick={() => confirm('Cancel ' + j.id + '?') && setStatus('cancelled')} />}
        {finished && <OB.IconButton size="sm" variant="ghost" icon="rotate-ccw" label="Print again" onClick={() => setStatus('queued')} />}
        {!active && <OB.IconButton size="sm" variant="ghost" icon="pencil" label="Edit" onClick={() => onEdit(j)} />}
        {!active && <OB.IconButton size="sm" variant="ghost" icon="trash-2" label="Delete" onClick={() => confirm('Delete ' + j.id + '?') && act(() => opsApi('DELETE', '/api/jobs/' + j.id))} />}
      </div></td>
    </tr>
  );
}

function QueuePage({ sub, go, preset }) {
  const { data } = useOps();
  const [edit, setEdit] = React.useState(sub === 'new' ? {} : null);
  const [tab, setTab] = React.useState('open');
  React.useEffect(() => { if (sub === 'new') setEdit({}); }, [sub]);
  const close = () => { setEdit(null); if (sub) go('queue'); };
  const open = data.jobs.filter((j) => !['done', 'failed', 'cancelled'].includes(j.status)).sort((a, b) => (a.status === 'queued') - (b.status === 'queued') || a.createdAt.localeCompare(b.createdAt));
  const done = data.jobs.filter((j) => ['done', 'failed', 'cancelled'].includes(j.status));
  const list = tab === 'open' ? open : done;
  return <>
    <div className="o-bar"><div><span className="o-over">Queue</span><h1 className="o-h1">Print jobs</h1></div><OB.Button icon="plus" onClick={() => setEdit({})}>New print job</OB.Button></div>
    <OB.Tabs items={[{ id: 'open', label: 'Open', count: open.length }, { id: 'done', label: 'Finished · 7 days', count: done.length }]} value={tab} onChange={setTab} style={{ marginBottom: 16 }} />
    {list.length ? <div className="o-scroll"><table className="o-table">
      <thead><tr><th>Job</th><th>What</th><th>Status</th><th>Printer</th><th>Filament</th><th>When</th><th /></tr></thead>
      <tbody>{list.map((j) => <JobRow key={j.id} j={j} onEdit={setEdit} />)}</tbody>
    </table></div> : <Empty title={tab === 'open' ? 'Nothing in the queue' : 'Nothing finished this week'} pose={tab === 'open' ? 'sleepy' : 'oops'}>{tab === 'open' && <span>The bed is empty. Go print something.</span>}</Empty>}
    {edit && <JobDialog job={edit.id ? edit : null} preset={preset} onClose={close} />}
  </>;
}

// ---- Inventory ----
function AdjustDialog({ target, kind, onClose }) {
  const act = useAct();
  const [delta, setDelta] = React.useState(''); const [dir, setDir] = React.useState(1); const [reason, setReason] = React.useState('');
  const unit = kind === 'filament' ? 'g' : target.unit || 'pcs';
  const save = async () => { const r = await act(() => opsApi('POST', '/api/' + (kind === 'filament' ? 'filaments' : 'items') + '/' + target.id + '/adjust', { delta: dir * +delta, reason }), 'Stock updated'); if (r) onClose(); };
  return (
    <OB.Dialog open onClose={onClose} eyebrow="ADJUST STOCK" title={target.name} width={440} footer={<><OB.Button variant="ghost" onClick={onClose}>Cancel</OB.Button><OB.Button onClick={save} disabled={!(+delta > 0)}>Save</OB.Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span className="o-mono">ON HAND: {kind === 'filament' ? fmtG(target.grams) : target.qty + ' ' + unit}</span>
        <OB.Tabs items={[{ id: '1', label: kind === 'filament' ? 'Add (new spool)' : 'Received' }, { id: '-1', label: 'Remove (used / scrap)' }]} value={String(dir)} onChange={(v) => setDir(+v)} />
        <OB.Input label="Amount" type="number" suffix={unit} value={delta} onChange={ctrl(setDelta)} hint={kind === 'filament' ? 'A full 1 kg spool = 1000' : undefined} />
        <OB.Input label="Reason" value={reason} onChange={ctrl(setReason)} placeholder={dir > 0 ? 'Delivery from supplier' : 'Failed print, test, scrap…'} />
      </div>
    </OB.Dialog>
  );
}

function FilamentDialog({ f, onClose }) {
  const act = useAct();
  const [x, setX] = React.useState(f || { name: '', ar: '', material: 'pla', hex: '#F2B705', line: '', finish: 'matte', shelf: '', grams: 1000 });
  const set = (k) => (v) => setX((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
  const save = async () => { const body = { ...x, grams: +x.grams }; const r = await act(() => (f ? opsApi('PATCH', '/api/filaments/' + f.id, body) : opsApi('POST', '/api/filaments', body)), f ? 'Colour updated' : 'Colour added'); if (r) onClose(); };
  return (
    <OB.Dialog open onClose={onClose} eyebrow={f ? f.id : 'NEW COLOUR'} title={f ? 'Edit filament' : 'Add a filament colour'} width={560} footer={<><OB.Button variant="ghost" onClick={onClose}>Cancel</OB.Button><OB.Button onClick={save} disabled={!x.name || !/^#[0-9a-f]{6}$/i.test(x.hex)}>Save</OB.Button></>}>
      <div className="o-form">
        <OB.Input label="Name (English)" value={x.name} onChange={set('name')} />
        <OB.Input label="Name (Arabic)" value={x.ar || ''} onChange={set('ar')} />
        <OB.Select label="Material" value={x.material} onChange={set('material')} options={Object.entries(MAT_LABEL).map(([value, label]) => ({ value, label }))} />
        <OB.Field label="Colour"><div className="o-row"><input type="color" value={/^#[0-9a-f]{6}$/i.test(x.hex) ? x.hex : '#000000'} onChange={set('hex')} style={{ width: 48, height: 44, border: '2px solid var(--graphite-900)', borderRadius: 12, padding: 2, background: 'var(--paper-0)' }} /><OB.Input value={x.hex} onChange={set('hex')} style={{ flex: 1 }} /></div></OB.Field>
        <OB.Input label="Line" value={x.line || ''} onChange={set('line')} placeholder="House PLA Matte" />
        <OB.Input label="Finish" value={x.finish || ''} onChange={set('finish')} placeholder="matte, silk, gloss…" />
        <OB.Input label="Shelf" value={x.shelf || ''} onChange={set('shelf')} placeholder="A1" />
        <OB.Input label="On hand" type="number" suffix="g" value={String(x.grams)} onChange={set('grams')} />
      </div>
    </OB.Dialog>
  );
}

function ItemDialog({ it, onClose }) {
  const { data } = useOps(); const act = useAct();
  const [x, setX] = React.useState(it || { name: '', sku: '', category: 'consumable', qty: 0, unit: 'pcs', reorderAt: '', location: '', supplier: '', notes: '' });
  const set = (k) => (v) => setX((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
  const save = async () => { const body = { ...x, qty: +x.qty || 0, reorderAt: x.reorderAt === '' || x.reorderAt == null ? null : +x.reorderAt }; const r = await act(() => (it ? opsApi('PATCH', '/api/items/' + it.id, body) : opsApi('POST', '/api/items', body)), it ? 'Item updated' : 'Item added'); if (r) onClose(); };
  return (
    <OB.Dialog open onClose={onClose} eyebrow={it ? 'EDIT' : 'NEW ITEM'} title={it ? it.name : 'Add stock item'} width={560} footer={<><OB.Button variant="ghost" onClick={onClose}>Cancel</OB.Button><OB.Button onClick={save} disabled={!x.name}>Save</OB.Button></>}>
      <div className="o-form">
        <div className="o-full"><OB.Input label="Name" value={x.name} onChange={set('name')} placeholder="Nozzle 0.4 mm hardened, Box S, Dice tower (finished)…" /></div>
        <OB.Select label="Category" value={x.category} onChange={set('category')} options={data.categories} />
        <OB.Input label="SKU" value={x.sku || ''} onChange={set('sku')} />
        <OB.Input label="On hand" type="number" value={String(x.qty)} onChange={set('qty')} />
        <OB.Input label="Unit" value={x.unit || ''} onChange={set('unit')} placeholder="pcs, m, L" />
        <OB.Input label="Reorder at" type="number" hint="Flags the item when it drops to this" value={x.reorderAt == null ? '' : String(x.reorderAt)} onChange={set('reorderAt')} />
        <OB.Input label="Location" value={x.location || ''} onChange={set('location')} />
        <div className="o-full"><OB.Input label="Supplier" value={x.supplier || ''} onChange={set('supplier')} /></div>
        <div className="o-full"><Textarea label="Notes" value={x.notes} onChange={set('notes')} /></div>
      </div>
    </OB.Dialog>
  );
}

function InventoryPage() {
  const { data } = useOps(); const act = useAct(); const th = data.inventory.thresholds;
  const [tab, setTab] = React.useState('filament'); const [q, setQ] = React.useState(''); const [mat, setMat] = React.useState(''); const [lowOnly, setLowOnly] = React.useState(false);
  const [dlg, setDlg] = React.useState(null); const [history, setHistory] = React.useState(null);
  React.useEffect(() => { if (tab === 'history') opsApi('GET', '/api/movements?limit=300').then(setHistory).catch(() => setHistory([])); }, [tab, data.inventory]);
  const match = (s) => !q || s.toLowerCase().includes(q.toLowerCase());
  const fil = data.inventory.filaments.filter((f) => match([f.name, f.ar, f.line, f.shelf, f.id].join(' ')) && (!mat || f.material === mat) && (!lowOnly || stockStatus(f.grams, th) !== 'in'));
  const items = data.inventory.items.filter((i) => match([i.name, i.sku, i.location, i.supplier].join(' ')) && (!lowOnly || (i.reorderAt != null && i.qty <= i.reorderAt)));
  const total = data.inventory.filaments.reduce((s, f) => s + f.grams, 0);
  const nameOf = (m) => { const f = data.inventory.filaments.find((x) => x.id === m.ref); const i = data.inventory.items.find((x) => x.id === m.ref); return f ? MAT_LABEL[f.material] + ' · ' + f.name : i ? i.name : m.ref; };
  return <>
    <div className="o-bar">
      <div><span className="o-over">Shelves</span><h1 className="o-h1">Inventory</h1><span className="o-mono" style={{ color: 'var(--fg-3)' }}>{fmtG(total)} OF FILAMENT · LOW BELOW {fmtG(th.in)} · OUT BELOW {fmtG(th.low)} (HIDDEN FROM THE SHOP)</span></div>
      {tab === 'filament' && <OB.Button icon="plus" onClick={() => setDlg({ type: 'filament' })}>Add colour</OB.Button>}
      {tab === 'items' && <OB.Button icon="plus" onClick={() => setDlg({ type: 'item' })}>Add item</OB.Button>}
    </div>
    <OB.Tabs items={[{ id: 'filament', label: 'Filament', count: data.inventory.filaments.length }, { id: 'items', label: 'Parts & supplies', count: data.inventory.items.length }, { id: 'history', label: 'History' }]} value={tab} onChange={setTab} style={{ marginBottom: 16 }} />
    {tab !== 'history' && <div className="o-row" style={{ marginBottom: 16 }}>
      <OB.Input size="sm" icon="search" placeholder="Search" value={q} onChange={ctrl(setQ)} style={{ width: 240 }} />
      {tab === 'filament' && ['', 'pla', 'petg', 'tpu', 'loop'].map((m) => (m ? <OB.Tag key={m} material={m} selected={mat === m} onClick={() => setMat(mat === m ? '' : m)}>{MAT_LABEL[m]}</OB.Tag> : null))}
      <OB.Switch label="Low only" checked={lowOnly} onChange={setLowOnly} />
    </div>}
    {tab === 'filament' && (fil.length ? <div className="o-scroll"><table className="o-table">
      <thead><tr><th>Colour</th><th>Material</th><th>Shelf</th><th>On hand</th><th>Status</th><th /></tr></thead>
      <tbody>{fil.map((f) => { const s = stockStatus(f.grams, th); const loaded = data.printers.filter((p) => p.spoolId === f.id); return (
        <tr key={f.id} className={s === 'out' ? 'is-out' : s === 'low' ? 'is-low' : ''}>
          <td><div className="o-row" style={{ flexWrap: 'nowrap' }}><Swatch hex={f.hex} /><div><b>{f.name}</b> <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-arabic)' }}>{f.ar}</span><div className="o-mono" style={{ color: 'var(--fg-3)' }}>{f.line}{loaded.length ? ' · ON ' + loaded.map((p) => p.code).join(', ') : ''}</div></div></div></td>
          <td><OB.Tag material={f.material}>{MAT_LABEL[f.material]}</OB.Tag></td>
          <td className="o-mono">{f.shelf || '—'}</td>
          <td className="o-mono" style={{ fontSize: 14 }}>{fmtG(f.grams)}</td>
          <td><OB.Badge tone={STOCK_BADGE[s][0]} dot>{STOCK_BADGE[s][1]}</OB.Badge></td>
          <td><div className="o-row" style={{ flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
            <OB.Button size="sm" variant="secondary" onClick={() => act(() => opsApi('POST', '/api/filaments/' + f.id + '/adjust', { delta: 1000, reason: 'New 1 kg spool' }), '+1 kg ' + f.name)}>+1 kg</OB.Button>
            <OB.IconButton size="sm" variant="ghost" icon="sliders-horizontal" label="Adjust" onClick={() => setDlg({ type: 'adjust', kind: 'filament', target: f })} />
            <OB.IconButton size="sm" variant="ghost" icon="pencil" label="Edit" onClick={() => setDlg({ type: 'filament', f })} />
            <OB.IconButton size="sm" variant="ghost" icon="trash-2" label="Delete" onClick={() => confirm('Delete ' + f.name + '? It disappears from the shop.') && act(() => opsApi('DELETE', '/api/filaments/' + f.id))} />
          </div></td>
        </tr>); })}</tbody>
    </table></div> : <Empty title="No colours match" />)}
    {tab === 'items' && (items.length ? <div className="o-scroll"><table className="o-table">
      <thead><tr><th>Item</th><th>Category</th><th>Location</th><th>On hand</th><th>Reorder at</th><th /></tr></thead>
      <tbody>{items.map((i) => { const low = i.reorderAt != null && i.qty <= i.reorderAt; return (
        <tr key={i.id} className={low ? (i.qty === 0 ? 'is-out' : 'is-low') : ''}>
          <td><b>{i.name}</b><div className="o-mono" style={{ color: 'var(--fg-3)' }}>{[i.sku, i.supplier].filter(Boolean).join(' · ')}</div></td>
          <td>{i.category}</td><td className="o-mono">{i.location || '—'}</td>
          <td className="o-mono" style={{ fontSize: 14 }}>{i.qty} {i.unit}</td>
          <td>{i.reorderAt == null ? '—' : <span className="o-row"><span className="o-mono">{i.reorderAt}</span>{low && <OB.Badge tone="warning">Reorder</OB.Badge>}</span>}</td>
          <td><div className="o-row" style={{ flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
            <OB.IconButton size="sm" variant="secondary" icon="minus" label="Use one" onClick={() => act(() => opsApi('POST', '/api/items/' + i.id + '/adjust', { delta: -1 }))} />
            <OB.IconButton size="sm" variant="secondary" icon="plus" label="Add one" onClick={() => act(() => opsApi('POST', '/api/items/' + i.id + '/adjust', { delta: 1 }))} />
            <OB.IconButton size="sm" variant="ghost" icon="sliders-horizontal" label="Adjust" onClick={() => setDlg({ type: 'adjust', kind: 'item', target: i })} />
            <OB.IconButton size="sm" variant="ghost" icon="pencil" label="Edit" onClick={() => setDlg({ type: 'item', it: i })} />
            <OB.IconButton size="sm" variant="ghost" icon="trash-2" label="Delete" onClick={() => confirm('Delete ' + i.name + '?') && act(() => opsApi('DELETE', '/api/items/' + i.id))} />
          </div></td>
        </tr>); })}</tbody>
    </table></div> : <Empty title={data.inventory.items.length ? 'Nothing matches' : 'No parts or supplies yet'}>{!data.inventory.items.length && <span>Track nozzles, build plates, boxes, finished products — anything with a count.</span>}</Empty>)}
    {tab === 'history' && (!history ? <p>Loading…</p> : history.length ? <div className="o-scroll"><table className="o-table">
      <thead><tr><th>When</th><th>What</th><th>Change</th><th>Why</th><th>Who</th></tr></thead>
      <tbody>{history.map((m) => <tr key={m.id}><td className="o-mono">{new Date(m.at).toLocaleString()}</td><td>{nameOf(m)}</td><td className="o-mono" style={{ color: m.delta < 0 ? 'var(--danger)' : 'var(--success)' }}>{m.delta > 0 ? '+' : ''}{m.kind === 'filament' ? fmtG(Math.abs(m.delta)).replace(/^/, m.delta < 0 ? '−' : '') : m.delta}</td><td>{m.reason}</td><td className="o-mono">{m.by}</td></tr>)}</tbody>
    </table></div> : <Empty title="No stock movements yet" />)}
    {dlg && dlg.type === 'adjust' && <AdjustDialog target={dlg.target} kind={dlg.kind} onClose={() => setDlg(null)} />}
    {dlg && dlg.type === 'filament' && <FilamentDialog f={dlg.f} onClose={() => setDlg(null)} />}
    {dlg && dlg.type === 'item' && <ItemDialog it={dlg.it} onClose={() => setDlg(null)} />}
  </>;
}

// ---- Inbox (website quote / sell / 3D Corner forms) ----
const KIND = { quote: ['brand', 'Print my file'], sell: ['petg', 'Sell with us'], corner: ['info', '3D Corner'] };
function InboxPage({ go }) {
  const { data } = useOps(); const act = useAct();
  const [filter, setFilter] = React.useState('open');
  const list = data.requests.filter((r) => (filter === 'open' ? ['new', 'seen'].includes(r.status) : true));
  return <>
    <div className="o-bar"><div><span className="o-over">From the website</span><h1 className="o-h1">Inbox</h1></div></div>
    <OB.Tabs items={[{ id: 'open', label: 'Open', count: data.requests.filter((r) => ['new', 'seen'].includes(r.status)).length }, { id: 'all', label: 'All' }]} value={filter} onChange={setFilter} style={{ marginBottom: 16 }} />
    {list.length ? <div className="o-grid">{list.map((r) => { const k = KIND[r.kind] || ['neutral', r.kind]; const f = r.fields || {}; return (
      <article key={r.id} className="o-card" style={{ boxShadow: r.status === 'new' ? 'var(--shadow-hard)' : 'none' }}>
        <div className="o-row" style={{ justifyContent: 'space-between' }}><OB.Badge tone={k[0]}>{k[1]}</OB.Badge><span className="o-mono" style={{ color: 'var(--fg-3)' }}>{fmtAgo(r.at)}</span></div>
        <dl className="o-kv">{Object.entries(f).filter(([key, v]) => v && key !== 'lang').map(([key, v]) => <React.Fragment key={key}><dt>{key.replace(/_/g, ' ')}</dt><dd>{key === 'email' ? <a href={'mailto:' + v}>{v}</a> : v}</dd></React.Fragment>)}</dl>
        {r.file && <a className="o-btn-link" href={'/api/requests/' + r.id + '/file'}>Download {r.file.name} ({(r.file.size / 1048576).toFixed(1)} MB)</a>}
        <div className="o-row" style={{ marginTop: 'auto' }}>
          {r.kind === 'quote' && r.status !== 'converted' && <OB.Button size="sm" icon="printer" onClick={() => go('queue', 'new', { title: 'Quote · ' + (r.file ? r.file.name : f.email || ''), notes: [f.notes, f.email, f.material && 'Material: ' + f.material, f.speed && 'Speed: ' + f.speed].filter(Boolean).join('\n'), requestId: r.id })}>Make a job</OB.Button>}
          {r.jobId && <span className="o-chip">{r.jobId}</span>}
          <OB.Select size="sm" value={r.status} onChange={(e) => act(() => opsApi('PATCH', '/api/requests/' + r.id, { status: e.target.value }))} options={['new', 'seen', 'converted', 'closed']} style={{ width: 140 }} />
        </div>
      </article>); })}</div> : <Empty title="Inbox zero" pose="cheer"><span>No new quotes or requests from the website.</span></Empty>}
  </>;
}

// ---- Printers ----
function PrinterDialog({ p, onClose, onCreated }) {
  const { data } = useOps(); const act = useAct();
  const [x, setX] = React.useState(p ? { ...p, apiKey: '' } : { name: '', code: 'P' + (data.printers.length + 1), model: '', connector: 'moonraker', url: '', apiKey: '', enabled: true, notes: '' });
  const [testRes, setTestRes] = React.useState(null);
  const set = (k) => (v) => setX((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
  const body = () => ({ name: x.name, code: x.code, model: x.model, connector: x.connector, url: x.url, apiKey: x.apiKey, enabled: x.enabled, notes: x.notes });
  const test = async () => { setTestRes('…'); setTestRes(await act(() => (p && !x.apiKey && x.url === p.url && x.connector === p.connector ? opsApi('POST', '/api/printers/' + p.id + '/test') : opsApi('POST', '/api/printers/test', body())))); };
  const save = async () => { const r = await act(() => (p ? opsApi('PATCH', '/api/printers/' + p.id, body()) : opsApi('POST', '/api/printers', body())), p ? 'Printer saved' : 'Printer added'); if (r) { onClose(); if (!p && onCreated) onCreated(r); } };
  return (
    <OB.Dialog open onClose={onClose} eyebrow={p ? p.code : 'NEW PRINTER'} title={p ? 'Printer settings' : 'Add a printer'} width={600} footer={<><OB.Button variant="ghost" onClick={onClose}>Cancel</OB.Button>{REMOTE.includes(x.connector) && <OB.Button variant="secondary" icon="plug" onClick={test} disabled={!x.url}>Test connection</OB.Button>}<OB.Button onClick={save} disabled={!x.name || !x.code}>Save</OB.Button></>}>
      <div className="o-form">
        <OB.Input label="Name" value={x.name} onChange={set('name')} placeholder="Qidi Q2 #1" />
        <OB.Input label="Short code" hint="Shown on the website floor, e.g. P1" value={x.code} onChange={set('code')} />
        <OB.Input label="Model" value={x.model || ''} onChange={set('model')} placeholder="Qidi Q2" />
        <OB.Select label="Connection" value={x.connector} onChange={set('connector')} options={data.connectors.map((c) => ({ value: c, label: { manual: 'Manual (no connection)', moonraker: 'Klipper / Moonraker', octoprint: 'OctoPrint', push: 'Push (agent / bridge)' }[c] || c }))} />
        <p className="o-full" style={{ margin: 0, color: 'var(--fg-2)', font: '500 14px/1.45 var(--font-body)' }}>{CONNECTOR_INFO[x.connector]}</p>
        {REMOTE.includes(x.connector) && <>
          <div className="o-full"><OB.Input label="Address" value={x.url || ''} onChange={set('url')} placeholder={x.connector === 'moonraker' ? 'http://192.168.1.50:7125' : 'http://octopi.local'} hint="Must be reachable from the server — same network, VPN or tunnel" /></div>
          <div className="o-full"><OB.Input label="API key" type="password" value={x.apiKey} onChange={set('apiKey')} hint={p && p.hasApiKey ? 'Saved — leave empty to keep it' : x.connector === 'moonraker' ? 'Only if Moonraker has authorization on' : 'OctoPrint → Settings → API'} /></div>
        </>}
        <div className="o-full"><OB.Switch label="Enabled" checked={x.enabled !== false} onChange={set('enabled')} /></div>
        {testRes && testRes !== '…' && <div className="o-full">{testRes.ok ? <OB.Badge tone="success" dot>Connected · {testRes.telemetry ? (PRINTER_BADGE[testRes.telemetry.status] || [0, testRes.telemetry.status])[1] + ' · nozzle ' + fmtTemp(testRes.telemetry.nozzle) : testRes.note}</OB.Badge> : <OB.Badge tone="danger" dot>{testRes.error}</OB.Badge>}</div>}
      </div>
    </OB.Dialog>
  );
}

function PushHelp({ p, token }) {
  const url = location.origin + '/api/printers/' + p.code + '/telemetry';
  return <code className="o-code">{'curl -X POST ' + url + ' \\\n  -H "Authorization: Bearer ' + (token || p.token || '<token>') + '" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"status":"printing","progress":0.42,"layer":88,"totalLayers":210,"nozzle":{"actual":220,"target":220},"file":"tower.gcode"}\''}</code>;
}

function PrintersPage({ sub, go }) {
  const { data } = useOps(); const act = useAct(); const admin = data.user.role === 'admin';
  const [dlg, setDlg] = React.useState(sub === 'new' ? {} : null); const [fresh, setFresh] = React.useState(null);
  React.useEffect(() => { if (sub === 'new') setDlg({}); }, [sub]);
  const close = () => { setDlg(null); if (sub) go('printers'); };
  return <>
    <div className="o-bar"><div><span className="o-over">Connections</span><h1 className="o-h1">Printers</h1></div>{admin && <OB.Button icon="plus" onClick={() => setDlg({})}>Add printer</OB.Button>}</div>
    {fresh && <OB.Card variant="brand" padding={18} style={{ marginBottom: 20 }}><b>Printer added.</b> {fresh.printer.connector === 'push' ? 'Give this token to its bridge — it’s shown again on this page for admins.' : 'It will connect within a few seconds.'}{fresh.printer.connector === 'push' && <div style={{ marginTop: 10 }}><PushHelp p={fresh.printer} token={fresh.token} /></div>}</OB.Card>}
    {data.printers.length ? <div className="o-grid">{data.printers.map((p) => { const live = p.live || {}; const st = PRINTER_BADGE[live.status] || PRINTER_BADGE.offline; return (
      <article key={p.id} className="o-card">
        <div className="o-row" style={{ justifyContent: 'space-between' }}><div className="o-row"><span className="o-chip" style={{ background: 'var(--yolk-500)' }}>{p.code}</span><b style={{ font: '800 20px/1.1 var(--font-display)' }}>{p.name}</b></div><OB.Badge tone={st[0]} dot>{st[1]}</OB.Badge></div>
        <dl className="o-kv"><dt>Model</dt><dd>{p.model || '—'}</dd><dt>Connection</dt><dd>{p.connector}{p.enabled === false ? ' (disabled)' : ''}</dd>{p.url && <><dt>Address</dt><dd>{p.url}</dd></>}<dt>Last seen</dt><dd>{p.connector === 'manual' ? 'n/a' : fmtAgo(live.lastSeen)}</dd>{live.error && <><dt>Error</dt><dd style={{ color: 'var(--danger)' }}>{live.error}</dd></>}</dl>
        {admin && p.connector === 'push' && <details><summary className="o-btn-link">Bridge setup</summary><div style={{ marginTop: 8 }}><PushHelp p={p} /></div></details>}
        {admin && <div className="o-row" style={{ marginTop: 'auto' }}>
          <OB.Button size="sm" variant="secondary" icon="settings" onClick={() => setDlg(p)}>Settings</OB.Button>
          {p.connector === 'push' && <OB.Button size="sm" variant="ghost" icon="key-round" onClick={() => confirm('Issue a new token? The old one stops working.') && act(() => opsApi('POST', '/api/printers/' + p.id + '/token'), 'New token issued')}>New token</OB.Button>}
          <OB.Button size="sm" variant="ghost" icon="trash-2" onClick={() => confirm('Remove ' + p.name + '?') && act(() => opsApi('DELETE', '/api/printers/' + p.id))}>Remove</OB.Button>
        </div>}
      </article>); })}</div> : <Empty title="No printers yet">{admin ? <OB.Button icon="plus" onClick={() => setDlg({})}>Add your first printer</OB.Button> : <span>Ask an admin to add the printers.</span>}</Empty>}
    {dlg && <PrinterDialog p={dlg.id ? dlg : null} onClose={close} onCreated={(r) => setFresh({ token: r.token, printer: r })} />}
  </>;
}

// ---- Team ----
function TeamPage() {
  const { data } = useOps(); const act = useAct(); const admin = data.user.role === 'admin';
  const [nu, setNu] = React.useState({ username: '', password: '', role: 'staff' });
  const [pw, setPw] = React.useState({ current: '', next: '' });
  return <>
    <div className="o-bar"><div><span className="o-over">Accounts</span><h1 className="o-h1">Team</h1></div></div>
    <div className="o-grid">
      {admin && <article className="o-card"><h2 className="o-h2">Staff accounts</h2>
        <table className="o-table"><tbody>{data.users.map((u) => <tr key={u.username}><td><b>{u.username}</b></td><td><OB.Badge tone={u.role === 'admin' ? 'brand' : 'neutral'}>{u.role}</OB.Badge></td><td style={{ textAlign: 'end' }}>{u.username !== data.user.username && <OB.IconButton size="sm" variant="ghost" icon="trash-2" label="Remove" onClick={() => confirm('Remove ' + u.username + '?') && act(() => opsApi('DELETE', '/api/users/' + encodeURIComponent(u.username)), 'Removed')} />}</td></tr>)}</tbody></table>
        <h3 className="o-over" style={{ margin: '8px 0 0' }}>Add someone</h3>
        <OB.Input label="Username" value={nu.username} onChange={(e) => setNu({ ...nu, username: e.target.value })} />
        <OB.Input label="Temporary password" type="password" hint="At least 10 characters" value={nu.password} onChange={(e) => setNu({ ...nu, password: e.target.value })} />
        <OB.Select label="Role" value={nu.role} onChange={(e) => setNu({ ...nu, role: e.target.value })} options={[{ value: 'staff', label: 'Staff — floor, queue, inventory' }, { value: 'admin', label: 'Admin — also printers & team' }]} />
        <OB.Button icon="user-plus" disabled={!nu.username || nu.password.length < 10} onClick={async () => { if (await act(() => opsApi('POST', '/api/users', nu), 'Account created')) setNu({ username: '', password: '', role: 'staff' }); }}>Create account</OB.Button>
      </article>}
      <article className="o-card"><h2 className="o-h2">Your password</h2><span className="o-mono">SIGNED IN AS {data.user.username.toUpperCase()}</span>
        <OB.Input label="Current password" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
        <OB.Input label="New password" type="password" hint="At least 10 characters" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
        <OB.Button disabled={!pw.current || pw.next.length < 10} onClick={async () => { if (await act(() => opsApi('POST', '/api/auth/password', pw), 'Password changed')) setPw({ current: '', next: '' }); }}>Change password</OB.Button>
      </article>
    </div>
  </>;
}

// ---- Shell ----
const OPS_PAGES = [['floor', 'Floor', 'printer'], ['queue', 'Queue', 'list-ordered'], ['inventory', 'Inventory', 'package'], ['inbox', 'Inbox', 'inbox'], ['printers', 'Printers', 'settings-2'], ['team', 'Team', 'users']];
const parseOpsRoute = () => { const [r, sub] = location.hash.replace(/^#\/?/, '').split('/'); return { r: OPS_PAGES.some((p) => p[0] === r) ? r : 'floor', sub }; };

function OpsApp() {
  const [user, setUser] = React.useState(undefined);
  const [data, setData] = React.useState(null);
  const [live, setLive] = React.useState(false);
  const [route, setRoute] = React.useState(parseOpsRoute());
  const [preset, setPreset] = React.useState(null);
  const [toast, toasts] = useToasts();
  React.useEffect(() => { opsApi('GET', '/api/auth/me').then(setUser).catch(() => setUser(null)); }, []);
  React.useEffect(() => { const on = () => setRoute(parseOpsRoute()); window.addEventListener('hashchange', on); return () => window.removeEventListener('hashchange', on); }, []);
  React.useEffect(() => {
    if (!user) return;
    let es; let stopped = false;
    const load = () => opsApi('GET', '/api/state').then(setData).catch((e) => { if (e.status === 401) setUser(null); else toast({ tone: 'danger', title: 'Could not load: ' + e.message }); });
    load();
    const connect = () => {
      es = new EventSource('/api/events');
      es.onopen = () => { setLive(true); load(); };
      es.onerror = () => { setLive(false); if (es.readyState === 2 && !stopped) setTimeout(connect, 4000); };
      ['printers', 'jobs', 'requests', 'users'].forEach((t) => es.addEventListener(t, (e) => { const v = JSON.parse(e.data); setData((d) => (d ? { ...d, [t]: v } : d)); }));
      es.addEventListener('inventory', (e) => { const v = JSON.parse(e.data); setData((d) => (d ? { ...d, inventory: v } : d)); });
    };
    connect();
    return () => { stopped = true; es && es.close(); };
  }, [user]);
  const go = (r, sub, pre) => { setPreset(pre || null); location.hash = '/' + r + (sub ? '/' + sub : ''); };
  const logout = async () => { await opsApi('POST', '/api/auth/logout').catch(() => {}); setUser(null); setData(null); };
  if (user === undefined) return null;
  if (!user) return <><Login onIn={setUser} />{toasts}</>;
  if (!data) return <div className="o-login"><OB.Mascot pose="printing" size={140} /></div>;
  const newReq = data.requests.filter((x) => x.status === 'new').length;
  const pages = OPS_PAGES.filter(([id]) => id !== 'printers' || data.user.role === 'admin' || data.printers.length);
  const { r, sub } = route;
  return (
    <OpsCtx.Provider value={{ data, toast }}>
      <header className="o-head"><div className="o-wrap o-head-row">
        <a href="#/floor" aria-label="Ops home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}><OB.Wordmark size={26} color="var(--paper-0)" /><span className="o-chip" style={{ background: 'var(--yolk-500)', color: 'var(--graphite-900)' }}>OPS</span></a>
        <nav className="o-nav" aria-label="Sections">{pages.map(([id, label, icon]) => <button key={id} aria-current={r === id ? 'page' : undefined} onClick={() => go(id)}><OB.Icon name={icon} size={16} />{label}{id === 'inbox' && newReq > 0 && <span className="o-count">{newReq}</span>}</button>)}</nav>
        <div style={{ flex: 1 }} />
        <span className="o-mono" title={live ? 'Receiving live updates' : 'Reconnecting…'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: live ? 'var(--paper-0)' : 'var(--graphite-400)' }}><span style={{ width: 9, height: 9, borderRadius: 99, background: live ? 'var(--success)' : 'var(--graphite-500)', boxShadow: live ? '0 0 0 4px rgba(31,138,76,.35)' : 'none' }} />{live ? 'LIVE' : 'OFFLINE'}</span>
        <a href="/" className="o-mono" style={{ color: 'var(--yolk-300)' }}>SITE ↗</a>
        <OB.Button size="sm" variant="secondary" icon="log-out" onClick={logout}>{data.user.username}</OB.Button>
      </div></header>
      <main className="o-wrap o-main">
        {r === 'floor' && <FloorPage go={go} />}
        {r === 'queue' && <QueuePage sub={sub} go={go} preset={preset} />}
        {r === 'inventory' && <InventoryPage />}
        {r === 'inbox' && <InboxPage go={go} />}
        {r === 'printers' && <PrintersPage sub={sub} go={go} />}
        {r === 'team' && <TeamPage />}
      </main>
      {toasts}
    </OpsCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OpsApp />);

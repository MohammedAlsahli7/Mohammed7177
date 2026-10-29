// Bara' Ops — shared pieces: API client, formatting, toasts, context and
// small UI parts used by every section.
const OB = window.InfillDesignSystem_d33a9b;

/**
 * Calls the Ops API and throws with the server's message on failure.
 * @param {string} method
 * @param {string} url
 * @param {*=} body
 * @return {!Promise<*>}
 */
async function opsApi(method, url, body) {
  const headers = {Accept: 'application/json'};
  if (body) headers['Content-Type'] = 'application/json';
  const res = await fetch(url, {
    method,
    credentials: 'same-origin',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error(data.error || res.statusText || 'Request failed');
    e.status = res.status;
    throw e;
  }
  return data;
}

const MAT_LABEL = {pla: 'PLA', petg: 'PETG', tpu: 'TPU', loop: 'Loop'};
const fmtG = (g) => {
  if (g == null) return '—';
  if (g >= 1000) return (g / 1000).toFixed(g >= 10000 ? 0 : 1) + ' kg';
  return Math.round(g) + ' g';
};
const fmtM = (mm) => {
  if (mm == null) return '—';
  const m = mm / 1000;
  return m >= 1000 ? (m / 1000).toFixed(1) + ' km' : Math.round(m) + ' m';
};
const fmtDur = (s) => {
  if (s == null || !isFinite(s)) return '—';
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return h ? h + ' h ' + m + ' m' : m + ' m';
};
const fmtAgo = (iso) => {
  if (!iso) return '—';
  const s = (Date.now() - Date.parse(iso)) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + ' min ago';
  if (s < 86400) return Math.floor(s / 3600) + ' h ago';
  return new Date(iso).toLocaleDateString();
};
const fmtTemp = (t) => {
  if (!t || t.actual == null) return '—';
  return (
    Math.round(t.actual) + (t.target ? '/' + Math.round(t.target) : '') + ' °C'
  );
};
const fmtSar = (v) => (v == null ? '—' : 'SAR ' + Number(v).toFixed(2));
const stockStatus = (g, th) =>
  g >= th.in ? 'in' : g >= th.low ? 'low' : 'out';
const STOCK_BADGE = {
  in: ['success', 'In stock'],
  low: ['warning', 'Low'],
  out: ['danger', 'Out'],
};
const PRINTER_BADGE = {
  printing: ['info', 'Printing'],
  paused: ['warning', 'Paused'],
  idle: ['success', 'Idle'],
  done: ['success', 'Finished'],
  failed: ['danger', 'Error'],
  cancelled: ['neutral', 'Cancelled'],
  offline: ['neutral', 'Offline'],
};
const JOB_BADGE = {
  queued: ['neutral', 'Queued'],
  printing: ['info', 'Printing'],
  paused: ['warning', 'Paused'],
  done: ['success', 'Done'],
  failed: ['danger', 'Failed'],
  cancelled: ['neutral', 'Cancelled'],
};
const REMOTE = ['octoprint', 'moonraker'];
const ACTIVE_JOB = ['printing', 'paused'];
const ctrl = (on) => (e) => on(e && e.target ? e.target.value : e);
const spoolById = (data, id) =>
  data.inventory.filaments.find((f) => f.id === id);
const spoolLabel = (f) => (f ? MAT_LABEL[f.material] + ' · ' + f.name : '—');

const OpsCtx = React.createContext(null);
const useOps = () => React.useContext(OpsCtx);

/**
 * Toast stack. Returns [push, element].
 * @return {!Array}
 */
function useToasts() {
  const [list, setList] = React.useState([]);
  const drop = (id) => setList((l) => l.filter((x) => x.id !== id));
  const push = React.useCallback((t) => {
    const id = Math.random();
    setList((l) => [...l, {...t, id}]);
    setTimeout(() => drop(id), t.tone === 'danger' ? 7000 : 3000);
  }, []);
  const view = (
    <div className="o-toasts" aria-live="polite">
      {list.map((t) => (
        <OB.Toast key={t.id} {...t} onClose={() => drop(t.id)} />
      ))}
    </div>
  );
  return [push, view];
}

/**
 * Runs an API call; toasts the error, or the success message if given.
 * @return {function(function(): !Promise<*>, string=): !Promise<*>}
 */
function useAct() {
  const {toast} = useOps();
  return async (fn, ok) => {
    try {
      const r = await fn();
      if (ok) toast({tone: 'success', title: ok});
      return r;
    } catch (e) {
      toast({tone: 'danger', title: e.message});
      return null;
    }
  };
}

/** @return {!Object} Form state helper: [value, setter-for-key, setAll]. */
function useForm(init) {
  const [v, setV] = React.useState(init);
  const set = (k) => (e) =>
    setV((s) => ({...s, [k]: e && e.target ? e.target.value : e}));
  return [v, set, setV];
}

function Swatch({hex, size = 22}) {
  const style = {
    background: hex || 'var(--paper-3)',
    width: size,
    height: size,
  };
  return <span className="o-swatch" style={style} />;
}

function Progress({value, status}) {
  const cls =
    status === 'failed'
      ? ' is-fail'
      : status === 'done'
        ? ' is-done'
        : status === 'due'
          ? ' is-fail'
          : status === 'soon'
            ? ' is-warn'
            : '';
  const pct = Math.round(Math.min(1, value || 0) * 100);
  return (
    <div
      className={'o-progress' + cls}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{width: pct + '%'}} />
    </div>
  );
}

function Empty({title, children, pose = 'sleepy'}) {
  return (
    <div className="o-empty">
      <OB.Mascot pose={pose} size={96} />
      <b className="o-empty-title">{title}</b>
      {children}
    </div>
  );
}

function Textarea({label, value, onChange, placeholder}) {
  const id = React.useId();
  return (
    <OB.Field label={label} htmlFor={id}>
      <textarea
        id={id}
        className="o-textarea"
        value={value || ''}
        placeholder={placeholder}
        onChange={ctrl(onChange)}
      />
    </OB.Field>
  );
}

function PageHead({over, title, children}) {
  return (
    <div className="o-bar">
      <div>
        <span className="o-over">{over}</span>
        <h1 className="o-h1">{title}</h1>
      </div>
      {children && <div className="o-row">{children}</div>}
    </div>
  );
}

function spoolOptions(filaments, th, {none = 'No spool'} = {}) {
  const sorted = filaments
    .slice()
    .sort(
      (a, b) =>
        a.material.localeCompare(b.material) || a.name.localeCompare(b.name),
    );
  return [{value: '', label: none}].concat(
    sorted.map((f) => ({
      value: f.id,
      label:
        spoolLabel(f) +
        ' (' +
        fmtG(f.grams) +
        (stockStatus(f.grams, th) === 'out' ? ', out' : '') +
        ')',
    })),
  );
}

const printerOptions = (printers, none = 'Unassigned') =>
  [{value: '', label: none}].concat(
    printers.map((p) => ({
      value: p.id,
      label:
        p.code +
        ' · ' +
        p.name +
        (p.service && p.service.status === 'out' ? ' (out of service)' : ''),
    })),
  );

function Login({onIn}) {
  const [u, setU] = React.useState('');
  const [p, setP] = React.useState('');
  const [err, setErr] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      onIn(await opsApi('POST', '/api/auth/login', {username: u, password: p}));
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="o-login">
      <form onSubmit={submit} className="o-card o-login-card">
        <div className="o-row o-between">
          <OB.Wordmark size={30} />
          <span className="o-chip">OPS</span>
        </div>
        <div>
          <h1 className="o-h2">Staff sign in</h1>
          <p className="o-sub">
            The printers are waiting. They’re always waiting.
          </p>
        </div>
        <OB.Input
          label="Username"
          value={u}
          onChange={ctrl(setU)}
          icon="user"
        />
        <OB.Input
          label="Password"
          type="password"
          value={p}
          onChange={ctrl(setP)}
          icon="lock"
          error={err || undefined}
        />
        <OB.Button
          type="submit"
          fullWidth
          disabled={busy || !u || !p}
          icon="log-in"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </OB.Button>
      </form>
    </div>
  );
}

Object.assign(window, {
  OB,
  opsApi,
  MAT_LABEL,
  fmtG,
  fmtM,
  fmtDur,
  fmtAgo,
  fmtTemp,
  fmtSar,
  stockStatus,
  STOCK_BADGE,
  PRINTER_BADGE,
  JOB_BADGE,
  REMOTE,
  ACTIVE_JOB,
  ctrl,
  spoolById,
  spoolLabel,
  OpsCtx,
  useOps,
  useToasts,
  useAct,
  useForm,
  Swatch,
  Progress,
  Empty,
  Textarea,
  PageHead,
  spoolOptions,
  printerOptions,
  Login,
});

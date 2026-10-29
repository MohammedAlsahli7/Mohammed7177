// Printers (connections, AMS slots, running costs) and Team (accounts).

const CONNECTOR_INFO = {
  manual: 'No connection. Staff update the job by hand from the Floor.',
  moonraker:
    'Klipper printers (Qidi, Creality K-series, Voron, Sovol…). ' +
    'Moonraker address, e.g. http://192.168.1.50:7125',
  octoprint:
    'Any printer behind OctoPrint. Address e.g. http://octopi.local, ' +
    'plus the OctoPrint API key.',
  push:
    'The printer, or a bridge (Bambu, Prusa Connect, Home Assistant, a ' +
    'script), pushes status and AMS colours here with its token.',
};
const CONNECTOR_LABEL = {
  manual: 'Manual (no connection)',
  moonraker: 'Klipper / Moonraker',
  octoprint: 'OctoPrint',
  push: 'Push (agent / bridge)',
};

function PrinterDialog({p, onClose, onCreated}) {
  const {data} = useOps();
  const act = useAct();
  const c = (p && p.costs) || {};
  const [x, set] = useForm(
    p
      ? {
          ...p,
          apiKey: '',
          slotCount: (p.slots || [null]).length,
          ...c,
          hours: '',
          kg: '',
        }
      : {
          name: '',
          code: 'P' + (data.printers.length + 1),
          model: '',
          connector: 'moonraker',
          url: '',
          apiKey: '',
          enabled: true,
          slotCount: 1,
          watts: '',
          priceSar: '',
          lifeHours: '',
          upkeepPerHour: '',
          hours: '',
          kg: '',
        },
  );
  const [testRes, setTestRes] = React.useState(null);
  const remote = REMOTE.includes(x.connector);
  const costs = () => {
    const o = {};
    ['watts', 'priceSar', 'lifeHours', 'upkeepPerHour'].forEach((k) => {
      if (x[k] !== '' && x[k] != null) o[k] = +x[k];
    });
    return Object.keys(o).length ? o : null;
  };
  const body = () => ({
    name: x.name,
    code: x.code,
    model: x.model,
    connector: x.connector,
    url: x.url,
    apiKey: x.apiKey,
    enabled: x.enabled,
    slotCount: +x.slotCount || 1,
    costs: costs(),
    usage:
      x.hours !== '' || x.kg !== ''
        ? {
            hours: x.hours === '' ? undefined : +x.hours,
            grams: x.kg === '' ? undefined : +x.kg * 1000,
          }
        : undefined,
  });
  const test = async () => {
    setTestRes(null);
    const same =
      p && !x.apiKey && x.url === p.url && x.connector === p.connector;
    setTestRes(
      await act(() =>
        same
          ? opsApi('POST', '/api/printers/' + p.id + '/test')
          : opsApi('POST', '/api/printers/test', body()),
      ),
    );
  };
  const save = async () => {
    const r = await act(
      () =>
        p
          ? opsApi('PATCH', '/api/printers/' + p.id, body())
          : opsApi('POST', '/api/printers', body()),
      p ? 'Printer saved' : 'Printer added',
    );
    if (!r) return;
    onClose();
    if (!p && onCreated) onCreated(r);
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      {remote && (
        <OB.Button
          variant="secondary"
          icon="plug"
          onClick={test}
          disabled={!x.url}
        >
          Test connection
        </OB.Button>
      )}
      <OB.Button onClick={save} disabled={!x.name || !x.code}>
        Save
      </OB.Button>
    </>
  );
  const t = testRes && testRes.telemetry;
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={p ? p.code : 'NEW PRINTER'}
      title={p ? 'Printer settings' : 'Add a printer'}
      width={640}
      footer={footer}
    >
      <div className="o-form">
        <OB.Input
          label="Name"
          value={x.name}
          onChange={set('name')}
          placeholder="Qidi Q2 #1"
        />
        <OB.Input
          label="Short code"
          value={x.code}
          onChange={set('code')}
          hint="Shown on the website floor, e.g. P1"
        />
        <OB.Input
          label="Model"
          value={x.model || ''}
          onChange={set('model')}
          placeholder="Qidi Q2"
        />
        <OB.Input
          label="Filament slots"
          type="number"
          value={String(x.slotCount)}
          onChange={set('slotCount')}
          hint="1 = single spool · 4 per AMS unit"
        />
        <OB.Select
          label="Connection"
          value={x.connector}
          onChange={set('connector')}
          options={data.connectors.map((k) => ({
            value: k,
            label: CONNECTOR_LABEL[k] || k,
          }))}
        />
        <p className="o-full o-sub">{CONNECTOR_INFO[x.connector]}</p>
        {remote && (
          <>
            <div className="o-full">
              <OB.Input
                label="Address"
                value={x.url || ''}
                onChange={set('url')}
                hint="Reachable from the server: same network,
              VPN or tunnel"
                placeholder={
                  x.connector === 'moonraker'
                    ? 'http://192.168.1.50:7125'
                    : 'http://octopi.local'
                }
              />
            </div>
            <div className="o-full">
              <OB.Input
                label="API key"
                type="password"
                value={x.apiKey}
                onChange={set('apiKey')}
                hint={
                  p && p.hasApiKey
                    ? 'Saved — leave empty to keep it'
                    : x.connector === 'moonraker'
                      ? 'Only if Moonraker authorization is on'
                      : 'OctoPrint → Settings → API'
                }
              />
            </div>
          </>
        )}
        <h3 className="o-over o-full">
          Running costs (empty = Pricing defaults)
        </h3>
        <OB.Input
          label="Power draw"
          type="number"
          suffix="W"
          value={String(x.watts)}
          onChange={set('watts')}
        />
        <OB.Input
          label="Price paid"
          type="number"
          suffix="SAR"
          value={String(x.priceSar)}
          onChange={set('priceSar')}
        />
        <OB.Input
          label="Expected life"
          type="number"
          suffix="h"
          value={String(x.lifeHours)}
          onChange={set('lifeHours')}
        />
        <OB.Input
          label="Parts & upkeep"
          type="number"
          suffix="SAR/h"
          value={String(x.upkeepPerHour)}
          onChange={set('upkeepPerHour')}
        />
        <h3 className="o-over o-full">Odometer (a machine with hours on it)</h3>
        <OB.Input
          label="Print hours so far"
          type="number"
          value={x.hours}
          onChange={set('hours')}
          placeholder={
            p
              ? String(
                  Math.round(
                    ((p.upkeep && p.upkeep.usage.seconds) || 0) / 3600,
                  ),
                )
              : '0'
          }
        />
        <OB.Input
          label="Filament printed so far"
          type="number"
          suffix="kg"
          value={x.kg}
          onChange={set('kg')}
        />
        <div className="o-full">
          <OB.Switch
            label="Enabled"
            checked={x.enabled !== false}
            onChange={set('enabled')}
          />
        </div>
        {testRes && (
          <div className="o-full">
            {testRes.ok ? (
              <OB.Badge tone="success" dot>
                Connected
                {t
                  ? ' · ' +
                    (PRINTER_BADGE[t.status] || [0, t.status])[1] +
                    ' · nozzle ' +
                    fmtTemp(t.nozzle)
                  : ' · ' + testRes.note}
              </OB.Badge>
            ) : (
              <OB.Badge tone="danger" dot>
                {testRes.error}
              </OB.Badge>
            )}
          </div>
        )}
      </div>
    </OB.Dialog>
  );
}

function PushHelp({p, token}) {
  const url = location.origin + '/api/printers/' + p.code + '/telemetry';
  const sample =
    '{"status":"printing","progress":0.42,"layer":88,' +
    '"totalLayers":210,"nozzle":{"actual":220,"target":220},' +
    '"file":"tower.gcode","ams":[{"hex":"F2B705","material":"PLA"},null]}';
  return (
    <code className="o-code">
      {'curl -X POST ' +
        url +
        ' \\\n  -H ' +
        '"Authorization: Bearer ' +
        (token || p.token || '<token>') +
        '" \\\n' +
        '  -H "Content-Type: application/json" \\\n  -d \'' +
        sample +
        "'"}
    </code>
  );
}

function PrinterTile({p, admin, onEdit}) {
  const act = useAct();
  const live = p.live || {};
  const st = PRINTER_BADGE[live.status] || PRINTER_BADGE.offline;
  const rotate = () =>
    confirm('Issue a new token? The old one stops working.') &&
    act(() => opsApi('POST', '/api/printers/' + p.id + '/token'), 'New token');
  return (
    <article className="o-card">
      <div className="o-row o-between">
        <div className="o-row">
          <span className="o-chip o-chip-yolk">{p.code}</span>
          <b className="o-title">{p.name}</b>
        </div>
        <OB.Badge tone={st[0]} dot>
          {st[1]}
        </OB.Badge>
      </div>
      <dl className="o-kv">
        <dt>Model</dt>
        <dd>{p.model || '—'}</dd>
        <dt>Connection</dt>
        <dd>
          {p.connector}
          {p.enabled === false ? ' (disabled)' : ''}
        </dd>
        <dt>Slots</dt>
        <dd>{(p.slots || []).length}</dd>
        {p.url && (
          <>
            <dt>Address</dt>
            <dd>{p.url}</dd>
          </>
        )}
        <dt>Last seen</dt>
        <dd>{p.connector === 'manual' ? 'n/a' : fmtAgo(live.lastSeen)}</dd>
        {live.error && (
          <>
            <dt>Error</dt>
            <dd className="o-danger">{live.error}</dd>
          </>
        )}
      </dl>
      {admin && p.connector === 'push' && (
        <details>
          <summary className="o-btn-link">Bridge setup</summary>
          <div className="o-mt8">
            <PushHelp p={p} />
          </div>
        </details>
      )}
      {admin && (
        <div className="o-row o-push">
          <OB.Button
            size="sm"
            variant="secondary"
            icon="settings"
            onClick={() => onEdit(p)}
          >
            Settings
          </OB.Button>
          {p.connector === 'push' && (
            <OB.Button
              size="sm"
              variant="ghost"
              icon="key-round"
              onClick={rotate}
            >
              New token
            </OB.Button>
          )}
          <OB.Button
            size="sm"
            variant="ghost"
            icon="trash-2"
            onClick={() =>
              confirm('Remove ' + p.name + '?') &&
              act(() => opsApi('DELETE', '/api/printers/' + p.id))
            }
          >
            Remove
          </OB.Button>
        </div>
      )}
    </article>
  );
}

function PrintersPage({sub, go}) {
  const {data} = useOps();
  const admin = data.user.role === 'admin';
  const [dlg, setDlg] = React.useState(sub === 'new' ? {} : null);
  const [fresh, setFresh] = React.useState(null);
  React.useEffect(() => {
    if (sub === 'new') setDlg({});
  }, [sub]);
  const close = () => {
    setDlg(null);
    if (sub) go('printers');
  };
  return (
    <>
      <PageHead over="Connections" title="Printers">
        {admin && (
          <OB.Button icon="plus" onClick={() => setDlg({})}>
            Add printer
          </OB.Button>
        )}
      </PageHead>
      {fresh && (
        <OB.Card variant="brand" padding={18} style={{marginBottom: 20}}>
          <b>Printer added.</b>{' '}
          {fresh.connector === 'push'
            ? 'Give this token to its bridge.'
            : 'It connects within a few seconds.'}
          {fresh.connector === 'push' && (
            <div className="o-mt8">
              <PushHelp p={fresh} token={fresh.token} />
            </div>
          )}
        </OB.Card>
      )}
      {data.printers.length ? (
        <div className="o-grid">
          {data.printers.map((p) => (
            <PrinterTile key={p.id} p={p} admin={admin} onEdit={setDlg} />
          ))}
        </div>
      ) : (
        <Empty title="No printers yet">
          {admin ? (
            <OB.Button icon="plus" onClick={() => setDlg({})}>
              Add your first printer
            </OB.Button>
          ) : (
            <span>Ask an admin to add the printers.</span>
          )}
        </Empty>
      )}
      {dlg && (
        <PrinterDialog
          p={dlg.id ? dlg : null}
          onClose={close}
          onCreated={setFresh}
        />
      )}
    </>
  );
}

function TeamPage() {
  const {data} = useOps();
  const act = useAct();
  const admin = data.user.role === 'admin';
  const [nu, setNu, setNuAll] = useForm({
    username: '',
    password: '',
    role: 'staff',
  });
  const [pw, setPw, setPwAll] = useForm({current: '', next: ''});
  const roles = [
    {value: 'staff', label: 'Staff — floor, queue, inventory'},
    {value: 'admin', label: 'Admin — also printers, pricing & team'},
  ];
  const create = async () => {
    if (await act(() => opsApi('POST', '/api/users', nu), 'Account created')) {
      setNuAll({username: '', password: '', role: 'staff'});
    }
  };
  const change = async () => {
    if (
      await act(
        () => opsApi('POST', '/api/auth/password', pw),
        'Password changed',
      )
    ) {
      setPwAll({current: '', next: ''});
    }
  };
  return (
    <>
      <PageHead over="Accounts" title="Team" />
      <div className="o-grid">
        {admin && (
          <article className="o-card">
            <h2 className="o-h2">Staff accounts</h2>
            <table className="o-table">
              <tbody>
                {data.users.map((u) => (
                  <tr key={u.username}>
                    <td>
                      <b>{u.username}</b>
                    </td>
                    <td>
                      <OB.Badge tone={u.role === 'admin' ? 'brand' : 'neutral'}>
                        {u.role}
                      </OB.Badge>
                    </td>
                    <td className="o-end">
                      {u.username !== data.user.username && (
                        <OB.IconButton
                          size="sm"
                          variant="ghost"
                          icon="trash-2"
                          label="Remove"
                          onClick={() =>
                            confirm('Remove ' + u.username + '?') &&
                            act(
                              () =>
                                opsApi(
                                  'DELETE',
                                  '/api/users/' +
                                    encodeURIComponent(u.username),
                                ),
                              'Removed',
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="o-over">Add someone</h3>
            <OB.Input
              label="Username"
              value={nu.username}
              onChange={setNu('username')}
            />
            <OB.Input
              label="Temporary password"
              type="password"
              value={nu.password}
              onChange={setNu('password')}
              hint="At least 10 characters"
            />
            <OB.Select
              label="Role"
              value={nu.role}
              onChange={setNu('role')}
              options={roles}
            />
            <OB.Button
              icon="user-plus"
              onClick={create}
              disabled={!nu.username || nu.password.length < 10}
            >
              Create account
            </OB.Button>
          </article>
        )}
        <article className="o-card">
          <h2 className="o-h2">Your password</h2>
          <span className="o-mono">
            SIGNED IN AS {data.user.username.toUpperCase()}
          </span>
          <OB.Input
            label="Current password"
            type="password"
            value={pw.current}
            onChange={setPw('current')}
          />
          <OB.Input
            label="New password"
            type="password"
            value={pw.next}
            onChange={setPw('next')}
            hint="At least 10 characters"
          />
          <OB.Button
            onClick={change}
            disabled={!pw.current || pw.next.length < 10}
          >
            Change password
          </OB.Button>
        </article>
      </div>
    </>
  );
}

Object.assign(window, {
  PrinterDialog,
  PushHelp,
  PrinterTile,
  PrintersPage,
  TeamPage,
});

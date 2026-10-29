// Maintenance: per-printer wear counters, recurring tasks (by print hours,
// filament through the nozzle, or days), nozzle tracking, out-of-service.

const EVERY_UNITS = {hours: ' h', grams: ' kg', meters: ' m', days: ' days'};
const showEvery = (k, v) => (k === 'grams' ? v / 1000 : v) + EVERY_UNITS[k];
const everyText = (e) =>
  Object.entries(e || {})
    .map(([k, v]) => showEvery(k, v))
    .join(' · ') || '—';
const sinceText = (t) => {
  const k = t.by || Object.keys(t.every || {})[0];
  if (!k || !t.since || t.since[k] == null) return '—';
  const v =
    k === 'grams'
      ? fmtG(t.since.grams)
      : Math.round(t.since[k]) + EVERY_UNITS[k];
  return v + ' of ' + showEvery(k, t.every[k]);
};
const UPKEEP_BADGE = {
  ok: ['success', 'OK'],
  soon: ['warning', 'Soon'],
  due: ['danger', 'Due'],
};

function DoneDialog({p, task, onClose}) {
  const {data} = useOps();
  const act = useAct();
  const nozzle = task.kind === 'nozzle';
  const [x, set] = useForm({
    note: '',
    itemId: '',
    qty: 1,
    size: (p.nozzle && p.nozzle.size) || 0.4,
    type: (p.nozzle && p.nozzle.type) || 'brass',
  });
  const parts = [{value: '', label: 'No part used'}].concat(
    data.inventory.items
      .filter((i) => i.qty > 0)
      .map((i) => ({
        value: i.id,
        label: i.name + ' (' + i.qty + ' ' + i.unit + ')',
      })),
  );
  const save = async () => {
    const body = {
      note: x.note,
      itemId: x.itemId || null,
      qty: +x.qty || 1,
      nozzle: nozzle ? {size: +x.size, type: x.type} : undefined,
    };
    const r = await act(
      () =>
        opsApi(
          'POST',
          '/api/printers/' + p.id + '/maintenance/' + task.id + '/done',
          body,
        ),
      task.name + ' — logged',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button icon="check" onClick={save}>
        Mark done
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={p.code}
      title={task.name}
      width={520}
      footer={footer}
    >
      <div className="o-form">
        <div className="o-full">
          <OB.Select
            label="Part used from inventory"
            value={x.itemId}
            onChange={set('itemId')}
            options={parts}
            hint="Taken off the parts shelf"
          />
        </div>
        {x.itemId && (
          <OB.Input
            label="Quantity"
            type="number"
            value={String(x.qty)}
            onChange={set('qty')}
          />
        )}
        {nozzle && (
          <>
            <OB.Input
              label="New nozzle size"
              type="number"
              suffix="mm"
              value={String(x.size)}
              onChange={set('size')}
            />
            <OB.Select
              label="Nozzle type"
              value={x.type}
              onChange={set('type')}
              options={[
                'brass',
                'hardened steel',
                'stainless',
                'ruby',
                'other',
              ]}
            />
          </>
        )}
        <div className="o-full">
          <Textarea
            label="Note"
            value={x.note}
            onChange={set('note')}
            placeholder="What you found, what you used"
          />
        </div>
      </div>
    </OB.Dialog>
  );
}

function TaskDialog({p, task, onClose}) {
  const {data} = useOps();
  const act = useAct();
  const e = (task && task.every) || {};
  const [x, set] = useForm({
    name: task ? task.name : '',
    kind: task ? task.kind : 'clean',
    hours: e.hours || '',
    kg: e.grams ? e.grams / 1000 : '',
    meters: e.meters || '',
    days: e.days || '',
  });
  const save = async () => {
    const every = {
      hours: +x.hours || 0,
      grams: (+x.kg || 0) * 1000,
      meters: +x.meters || 0,
      days: +x.days || 0,
    };
    const url =
      '/api/printers/' + p.id + '/maintenance' + (task ? '/' + task.id : '');
    const r = await act(
      () =>
        opsApi(task ? 'PATCH' : 'POST', url, {
          name: x.name,
          kind: x.kind,
          every,
        }),
      'Saved',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button
        onClick={save}
        disabled={!x.name || !(+x.hours || +x.kg || +x.meters || +x.days)}
      >
        Save
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={p.code}
      title={task ? 'Edit task' : 'New maintenance task'}
      width={560}
      footer={footer}
    >
      <div className="o-form">
        <div className="o-full">
          <OB.Input
            label="Task"
            value={x.name}
            onChange={set('name')}
            placeholder="Lubricate Z lead screws"
          />
        </div>
        <OB.Select
          label="Kind"
          value={x.kind}
          onChange={set('kind')}
          options={data.kinds}
        />
        <p className="o-full o-sub">
          Due at whichever comes first. Leave the ones you don’t use empty.
        </p>
        <OB.Input
          label="Every"
          type="number"
          suffix="print hours"
          value={String(x.hours)}
          onChange={set('hours')}
        />
        <OB.Input
          label="Every"
          type="number"
          suffix="kg printed"
          value={String(x.kg)}
          onChange={set('kg')}
        />
        <OB.Input
          label="Every"
          type="number"
          suffix="metres of filament"
          value={String(x.meters)}
          onChange={set('meters')}
        />
        <OB.Input
          label="Every"
          type="number"
          suffix="days"
          value={String(x.days)}
          onChange={set('days')}
        />
      </div>
    </OB.Dialog>
  );
}

function ServiceDialog({p, onClose}) {
  const act = useAct();
  const [x, set] = useForm({reason: '', until: ''});
  const save = async () => {
    const r = await act(
      () =>
        opsApi('POST', '/api/printers/' + p.id + '/service', {
          status: 'out',
          ...x,
        }),
      p.code + ' is out of service',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button variant="danger" onClick={save} disabled={!x.reason}>
        Take out of service
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={p.code}
      title="Out of service"
      width={480}
      footer={footer}
    >
      <div className="o-stack o-gap14">
        <p className="o-sub">
          No new jobs go to {p.name}. Its queued jobs move to other printers
          automatically.
        </p>
        <OB.Input
          label="Why"
          value={x.reason}
          onChange={set('reason')}
          placeholder="Hotend clog, waiting for a part…"
        />
        <OB.Input
          label="Expected back"
          type="date"
          value={x.until}
          onChange={set('until')}
        />
      </div>
    </OB.Dialog>
  );
}

function UpkeepCard({p}) {
  const {data} = useOps();
  const act = useAct();
  const [dlg, setDlg] = React.useState(null);
  const admin = data.user.role === 'admin';
  const up = p.upkeep || {usage: {}, tasks: []};
  const u = up.usage;
  const out = p.service && p.service.status === 'out';
  const nz = p.nozzle;
  const nzGrams =
    nz && nz.usageAtInstall ? u.grams - nz.usageAtInstall.grams : null;
  return (
    <article className={'o-card' + (out ? ' is-off' : '')}>
      <div className="o-row o-between">
        <div className="o-row">
          <span className="o-chip o-chip-yolk">{p.code}</span>
          <b className="o-title">{p.name}</b>
        </div>
        {out ? (
          <OB.Button
            size="sm"
            icon="check"
            onClick={() =>
              act(
                () =>
                  opsApi('POST', '/api/printers/' + p.id + '/service', {
                    status: 'in',
                  }),
                p.code + ' back in service',
              )
            }
          >
            Back in service
          </OB.Button>
        ) : (
          <OB.Button
            size="sm"
            variant="secondary"
            icon="octagon-x"
            onClick={() => setDlg({type: 'service'})}
          >
            Out of service
          </OB.Button>
        )}
      </div>
      {out && (
        <div className="o-note o-note-danger">
          Out since
          {' ' + fmtAgo(p.service.since)}: {p.service.reason}
        </div>
      )}
      <dl className="o-kv o-kv-4">
        <dt>Print time</dt>
        <dd>{fmtDur(u.seconds)}</dd>
        <dt>Filament</dt>
        <dd>
          {fmtG(u.grams)} · {fmtM(u.mm)}
        </dd>
        <dt>Jobs</dt>
        <dd>{u.jobs || 0}</dd>
        <dt>Nozzle</dt>
        <dd>
          {nz
            ? nz.size +
              ' mm ' +
              nz.type +
              ' · ' +
              fmtG(nzGrams) +
              ' since ' +
              fmtAgo(nz.installedAt)
            : 'not recorded'}
        </dd>
      </dl>
      <div className="o-scroll">
        <table className="o-table o-table-tight">
          <tbody>
            {up.tasks.map((t) => (
              <tr key={t.id}>
                <td>
                  <b>{t.name}</b>
                  <div className="o-mono o-dim">
                    EVERY
                    {' ' + everyText(t.every).toUpperCase()}
                  </div>
                </td>
                <td className="o-col-bar">
                  <Progress value={t.fraction} status={t.status} />
                  <div className="o-mono o-dim">{sinceText(t)}</div>
                </td>
                <td>
                  <OB.Badge tone={UPKEEP_BADGE[t.status][0]} dot>
                    {UPKEEP_BADGE[t.status][1]}
                  </OB.Badge>
                  <div className="o-mono o-dim">
                    {t.last && t.last.by !== 'setup'
                      ? fmtAgo(t.last.at) + ' · ' + t.last.by
                      : 'never logged'}
                  </div>
                </td>
                <td>
                  <div className="o-row o-nowrap o-end">
                    <OB.Button
                      size="sm"
                      variant={t.status === 'ok' ? 'ghost' : 'primary'}
                      icon="check"
                      onClick={() => setDlg({type: 'done', task: t})}
                    >
                      Done
                    </OB.Button>
                    {admin && (
                      <OB.IconButton
                        size="sm"
                        variant="ghost"
                        icon="pencil"
                        label="Edit"
                        onClick={() => setDlg({type: 'task', task: t})}
                      />
                    )}
                    {admin && (
                      <OB.IconButton
                        size="sm"
                        variant="ghost"
                        icon="trash-2"
                        label="Delete"
                        onClick={() =>
                          confirm('Delete ' + t.name + '?') &&
                          act(() =>
                            opsApi(
                              'DELETE',
                              '/api/printers/' + p.id + '/maintenance/' + t.id,
                            ),
                          )
                        }
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {admin && (
        <button className="o-btn-link" onClick={() => setDlg({type: 'task'})}>
          + Add a maintenance task
        </button>
      )}
      {dlg && dlg.type === 'done' && (
        <DoneDialog p={p} task={dlg.task} onClose={() => setDlg(null)} />
      )}
      {dlg && dlg.type === 'task' && (
        <TaskDialog p={p} task={dlg.task} onClose={() => setDlg(null)} />
      )}
      {dlg && dlg.type === 'service' && (
        <ServiceDialog p={p} onClose={() => setDlg(null)} />
      )}
    </article>
  );
}

function UpkeepLog() {
  const {data} = useOps();
  const [rows, setRows] = React.useState(null);
  React.useEffect(() => {
    opsApi('GET', '/api/maintenance/log')
      .then(setRows)
      .catch(() => setRows([]));
  }, [data.printers]);
  if (!rows || !rows.length) return null;
  return (
    <>
      <h2 className="o-h2 o-mt">History</h2>
      <div className="o-scroll">
        <table className="o-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Printer</th>
              <th>What</th>
              <th>Part</th>
              <th>Note</th>
              <th>Who</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 100).map((e) => (
              <tr key={e.id}>
                <td className="o-mono">{new Date(e.at).toLocaleString()}</td>
                <td className="o-mono">{e.code}</td>
                <td>{e.task}</td>
                <td>{e.part ? e.part.qty + ' × ' + e.part.name : '—'}</td>
                <td>{e.note || '—'}</td>
                <td className="o-mono">{e.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UpkeepPage() {
  const {data} = useOps();
  const rank = (p) =>
    p.upkeep && p.upkeep.due ? 0 : p.upkeep && p.upkeep.soon ? 1 : 2;
  const list = data.printers.slice().sort((a, b) => rank(a) - rank(b));
  return (
    <>
      <PageHead over="Keep them happy" title="Maintenance" />
      {list.length ? (
        <div className="o-grid o-grid-wide">
          {list.map((p) => (
            <UpkeepCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <Empty title="No printers yet" />
      )}
      <UpkeepLog />
    </>
  );
}

Object.assign(window, {
  DoneDialog,
  TaskDialog,
  ServiceDialog,
  UpkeepCard,
  UpkeepLog,
  UpkeepPage,
  everyText,
});

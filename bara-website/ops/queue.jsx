// Queue: print jobs (single or multi-colour), routing, and paid orders.

function ColourList({value, onChange}) {
  const {data} = useOps();
  const th = data.inventory.thresholds;
  const list = value.length ? value : [''];
  const set = (i, id) => onChange(list.map((x, k) => (k === i ? id : x)));
  return (
    <div className="o-stack">
      {list.map((id, i) => (
        <div key={i} className="o-row o-nowrap">
          <Swatch hex={(spoolById(data, id) || {}).hex} size={18} />
          <OB.Select
            size="sm"
            value={id || ''}
            style={{flex: 1}}
            onChange={(e) => set(i, e.target.value)}
            options={spoolOptions(data.inventory.filaments, th, {
              none: i ? 'Pick a colour' : 'No colour yet',
            })}
          />
          {i > 0 && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="x"
              label="Remove colour"
              onClick={() => onChange(list.filter((_, k) => k !== i))}
            />
          )}
        </div>
      ))}
      <button
        type="button"
        className="o-btn-link"
        onClick={() => onChange(list.concat(''))}
      >
        + Add a colour (multi-colour print)
      </button>
    </div>
  );
}

function JobDialog({job, preset, onClose}) {
  const {data} = useOps();
  const act = useAct();
  const blank = {
    title: '',
    productId: '',
    orderRef: '',
    spools: [],
    grams: '',
    total: '',
    file: '',
    printerId: '',
    notes: '',
    qty: 1,
    auto: true,
  };
  const [f, set, setF] = useForm(
    job
      ? {...job, spools: job.spools || (job.spoolId ? [job.spoolId] : [])}
      : {...blank, ...preset},
  );
  const pickProduct = (e) => {
    const id = e.target.value;
    const p = data.products.find((x) => x.id === id);
    setF((x) => ({
      ...x,
      productId: id,
      grams: x.grams || (p && p.weight ? parseFloat(p.weight) : ''),
    }));
  };
  const save = async () => {
    const body = {
      title: f.title,
      productId: f.productId || null,
      orderRef: f.orderRef,
      spools: f.spools.filter(Boolean),
      grams: f.grams === '' ? null : +f.grams,
      total: f.total === '' ? null : +f.total,
      file: f.file,
      printerId: f.printerId || null,
      notes: f.notes,
      qty: +f.qty || 1,
      requestId: f.requestId,
      autoRoute: !job && !f.printerId && f.auto,
    };
    const r = await act(
      () =>
        job
          ? opsApi('PATCH', '/api/jobs/' + job.id, body)
          : opsApi('POST', '/api/jobs', body),
      job ? 'Job updated' : 'Job queued',
    );
    if (r) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button
        icon="check"
        onClick={save}
        disabled={!f.title && !f.productId}
      >
        {job ? 'Save' : 'Add to queue'}
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow={job ? job.id : 'NEW JOB'}
      title={job ? 'Edit print job' : 'Queue a print'}
      width={640}
      footer={footer}
    >
      <div className="o-form">
        <OB.Select
          label="Catalogue product"
          value={f.productId || ''}
          onChange={pickProduct}
          options={[{value: '', label: 'Custom / not in the shop'}].concat(
            data.products.map((p) => ({value: p.id, label: p.name})),
          )}
        />
        <OB.Input
          label="Title"
          value={f.title || ''}
          onChange={set('title')}
          hint={
            f.productId
              ? 'Optional — defaults to the product name'
              : 'Shown to staff only'
          }
        />
        <div className="o-full">
          <OB.Field label="Colours">
            <ColourList value={f.spools} onChange={set('spools')} />
          </OB.Field>
        </div>
        <OB.Select
          label="Printer"
          value={f.printerId || ''}
          onChange={set('printerId')}
          options={printerOptions(
            data.printers,
            job ? 'Unassigned' : 'Pick automatically',
          )}
        />
        <OB.Input
          label="Filament estimate"
          type="number"
          suffix="g"
          value={f.grams == null ? '' : String(f.grams)}
          onChange={set('grams')}
          hint="Used when the printer can’t report real usage"
        />
        <OB.Input
          label="Layers"
          type="number"
          onChange={set('total')}
          value={f.total == null ? '' : String(f.total)}
          hint="Optional"
        />
        <OB.Input
          label="G-code file name"
          value={f.file || ''}
          onChange={set('file')}
          hint="Matches the job when the printer starts"
        />
        <OB.Input
          label="Order ref"
          value={f.orderRef || ''}
          onChange={set('orderRef')}
        />
        <div className="o-full">
          <Textarea
            label="Notes"
            value={f.notes}
            onChange={set('notes')}
            placeholder="Brim, supports, orientation…"
          />
        </div>
      </div>
    </OB.Dialog>
  );
}

function JobRow({j, onEdit}) {
  const {data} = useOps();
  const act = useAct();
  const p = data.printers.find((x) => x.id === j.printerId);
  const st = JOB_BADGE[j.status];
  const active = ACTIVE_JOB.includes(j.status);
  const finished = ['done', 'failed', 'cancelled'].includes(j.status);
  const setStatus = (status) =>
    act(() => opsApi('POST', '/api/jobs/' + j.id + '/status', {status}));
  const colours = (j.spools && j.spools.length ? j.spools : [j.spoolId]).filter(
    Boolean,
  );
  const waiting = (j.waitingFor || []).map((id) =>
    spoolLabel(spoolById(data, id)),
  );
  return (
    <tr>
      <td className="o-mono">{j.id}</td>
      <td>
        <div className="o-row o-nowrap">
          <span className="o-swatches">
            {colours.length ? (
              colours.map((id) => (
                <Swatch
                  key={id}
                  hex={(spoolById(data, id) || {}).hex}
                  size={16}
                />
              ))
            ) : (
              <Swatch size={16} />
            )}
          </span>
          <div className="o-min0">
            <b>{j.title}</b>
            <div className="o-mono o-dim">
              {[j.orderRef, j.file].filter(Boolean).join(' · ')}
            </div>
            {waiting.length > 0 && (
              <div className="o-mono o-warn">
                WAITING FOR {waiting.join(', ').toUpperCase()}
              </div>
            )}
            {!j.printerId && j.routeNote && (
              <div className="o-mono o-warn">{j.routeNote.toUpperCase()}</div>
            )}
          </div>
        </div>
      </td>
      <td>
        <OB.Badge tone={st[0]} dot>
          {st[1]}
        </OB.Badge>
        {active && (
          <div className="o-mini-bar">
            <Progress value={j.progress} status={j.status} />
          </div>
        )}
      </td>
      <td className="o-col-printer">
        {active || finished ? (
          p ? (
            p.code + ' · ' + p.name
          ) : (
            '—'
          )
        ) : (
          <OB.Select
            size="sm"
            value={j.printerId || ''}
            onChange={(e) =>
              act(() =>
                opsApi('PATCH', '/api/jobs/' + j.id, {
                  printerId: e.target.value || null,
                }),
              )
            }
            options={printerOptions(data.printers)}
          />
        )}
      </td>
      <td className="o-mono">
        {finished ? fmtG(j.deductedG) + ' used' : fmtG(j.grams)}
      </td>
      <td className="o-mono">
        {j.actual
          ? fmtSar(j.actual.cost) +
            (j.actual.marginPct != null
              ? ' · ' + j.actual.marginPct + ' %'
              : '')
          : '—'}
      </td>
      <td className="o-mono o-dim">
        {fmtAgo(j.finishedAt || j.startedAt || j.createdAt)}
      </td>
      <td>
        <div className="o-row o-nowrap o-end">
          {j.status === 'queued' && j.printerId && (
            <OB.IconButton
              size="sm"
              icon="play"
              label={waiting.length ? 'Load spools first' : 'Start'}
              disabled={waiting.length > 0}
              onClick={() => setStatus('printing')}
            />
          )}
          {active && (
            <OB.IconButton
              size="sm"
              icon="check"
              label="Done"
              onClick={() => setStatus('done')}
            />
          )}
          {active && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="x"
              label="Failed"
              onClick={() => setStatus('failed')}
            />
          )}
          {(j.status === 'queued' || active) && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="ban"
              label="Cancel job"
              onClick={() =>
                confirm('Cancel ' + j.id + '?') && setStatus('cancelled')
              }
            />
          )}
          {finished && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="rotate-ccw"
              label="Print again"
              onClick={() => setStatus('queued')}
            />
          )}
          {!active && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="pencil"
              label="Edit"
              onClick={() => onEdit(j)}
            />
          )}
          {!active && (
            <OB.IconButton
              size="sm"
              variant="ghost"
              icon="trash-2"
              label="Delete"
              onClick={() =>
                confirm('Delete ' + j.id + '?') &&
                act(() => opsApi('DELETE', '/api/jobs/' + j.id))
              }
            />
          )}
        </div>
      </td>
    </tr>
  );
}

function OrdersTable() {
  const {data} = useOps();
  if (!data.orders.length) {
    return (
      <Empty title="No paid orders yet" pose="hello">
        <span>
          Paid orders from the shop or your payment provider land here and are
          queued automatically.
        </span>
      </Empty>
    );
  }
  return (
    <div className="o-scroll">
      <table className="o-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Items</th>
            <th>Jobs</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((o) => (
            <tr key={o.id}>
              <td className="o-mono">{o.ref}</td>
              <td>
                {o.items.map((l, i) => (
                  <div key={i} className="o-row o-nowrap">
                    <Swatch hex={l.hex} size={14} />
                    {l.qty} × {l.title}
                  </div>
                ))}
              </td>
              <td className="o-mono">
                {o.items
                  .flatMap((l) => l.jobs)
                  .map((id) => {
                    const j = data.jobs.find((x) => x.id === id);
                    return (
                      <div key={id}>
                        {id} · {j ? JOB_BADGE[j.status][1] : 'archived'}
                      </div>
                    );
                  })}
              </td>
              <td className="o-mono o-dim">{fmtAgo(o.at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QueuePage({sub, go, preset}) {
  const {data} = useOps();
  const act = useAct();
  const [edit, setEdit] = React.useState(sub === 'new' ? {} : null);
  const [tab, setTab] = React.useState('open');
  React.useEffect(() => {
    if (sub === 'new') setEdit({});
  }, [sub]);
  const close = () => {
    setEdit(null);
    if (sub) go('queue');
  };
  const isDone = (j) => ['done', 'failed', 'cancelled'].includes(j.status);
  const open = data.jobs
    .filter((j) => !isDone(j))
    .sort(
      (a, b) =>
        (a.status === 'queued') - (b.status === 'queued') ||
        a.createdAt.localeCompare(b.createdAt),
    );
  const done = data.jobs.filter(isDone);
  const list = tab === 'open' ? open : done;
  const unassigned = open.filter((j) => j.status === 'queued' && !j.printerId);
  const tabs = [
    {id: 'open', label: 'Open', count: open.length},
    {id: 'done', label: 'Finished · 7 days', count: done.length},
    {id: 'orders', label: 'Paid orders', count: data.orders.length},
  ];
  return (
    <>
      <PageHead over="Queue" title="Print jobs">
        {unassigned.length > 0 && (
          <OB.Button
            variant="secondary"
            icon="shuffle"
            onClick={() =>
              act(() => opsApi('POST', '/api/jobs/route'), 'Routed to printers')
            }
          >
            Auto-assign {unassigned.length}
          </OB.Button>
        )}
        <OB.Button icon="plus" onClick={() => setEdit({})}>
          New print job
        </OB.Button>
      </PageHead>
      <OB.Tabs
        items={tabs}
        value={tab}
        onChange={setTab}
        style={{marginBottom: 16}}
      />
      {tab === 'orders' ? (
        <OrdersTable />
      ) : list.length ? (
        <div className="o-scroll">
          <table className="o-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>What</th>
                <th>Status</th>
                <th>Printer</th>
                <th>Filament</th>
                <th>Cost · margin</th>
                <th>When</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((j) => (
                <JobRow key={j.id} j={j} onEdit={setEdit} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty
          title={
            tab === 'open'
              ? 'Nothing in the queue'
              : 'Nothing finished this week'
          }
          pose={tab === 'open' ? 'sleepy' : 'oops'}
        >
          {tab === 'open' && <span>The bed is empty. Go print something.</span>}
        </Empty>
      )}
      {edit && (
        <JobDialog
          job={edit.id ? edit : null}
          preset={preset}
          onClose={close}
        />
      )}
    </>
  );
}

Object.assign(window, {ColourList, JobDialog, JobRow, OrdersTable, QueuePage});

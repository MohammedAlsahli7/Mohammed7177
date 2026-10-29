// Floor: one card per printer (live status, job, AMS slots, service and
// upkeep state) and the operator to-do list.

function SlotPicker({p}) {
  const {data} = useOps();
  const act = useAct();
  const th = data.inventory.thresholds;
  const slots = p.slots && p.slots.length ? p.slots : [null];
  const set = (i, id) => {
    const next = slots.slice();
    next[i] = id || null;
    act(
      () => opsApi('PATCH', '/api/printers/' + p.id, {slots: next}),
      'Slots updated',
    );
  };
  const reported = p.slotsReported || [];
  return (
    <div className="o-slots">
      <span className="o-label">
        {slots.length > 1 ? 'AMS slots' : 'Loaded spool'}
      </span>
      {slots.map((id, i) => {
        const f = spoolById(data, id);
        const r = reported[i];
        return (
          <div key={i} className="o-slot">
            {slots.length > 1 && <span className="o-mono">{i + 1}</span>}
            <Swatch hex={f ? f.hex : r && r.hex} size={18} />
            <OB.Select
              size="sm"
              value={id || ''}
              onChange={(e) => set(i, e.target.value)}
              options={spoolOptions(data.inventory.filaments, th, {
                none: r ? 'Unknown ' + r.material + ' ' + r.hex : 'Empty',
              })}
            />
          </div>
        );
      })}
    </div>
  );
}

function JobControls({p, job, next}) {
  const act = useAct();
  const [layer, setLayer] = React.useState('');
  const remote = REMOTE.includes(p.connector);
  const setStatus = (j, status, extra) =>
    act(() =>
      opsApi('POST', '/api/jobs/' + j.id + '/status', {status, ...extra}),
    );
  const cmd = (c) =>
    act(
      () => opsApi('POST', '/api/printers/' + p.id + '/command', {command: c}),
      c[0].toUpperCase() + c.slice(1) + ' sent',
    );
  const out = p.service && p.service.status === 'out';
  if (!job) {
    if (!next || out) return null;
    const waiting = next.waitingFor && next.waitingFor.length;
    return (
      <div className="o-row">
        <OB.Button
          size="sm"
          icon="play"
          disabled={!!waiting}
          onClick={() => setStatus(next, 'printing')}
        >
          {remote ? 'Mark started' : 'Start ' + next.id}
        </OB.Button>
        {waiting ? (
          <span className="o-mono o-warn">LOAD SPOOLS FIRST</span>
        ) : null}
      </div>
    );
  }
  return (
    <div className="o-row">
      {remote && job.status === 'printing' && (
        <OB.Button
          size="sm"
          variant="secondary"
          icon="pause"
          onClick={() => cmd('pause')}
        >
          Pause
        </OB.Button>
      )}
      {remote && job.status === 'paused' && (
        <OB.Button
          size="sm"
          variant="secondary"
          icon="play"
          onClick={() => cmd('resume')}
        >
          Resume
        </OB.Button>
      )}
      {remote && (
        <OB.Button
          size="sm"
          variant="danger"
          icon="square"
          onClick={() =>
            confirm('Cancel the print on ' + p.code + '?') && cmd('cancel')
          }
        >
          Cancel
        </OB.Button>
      )}
      {!remote && (
        <>
          <OB.Input
            size="sm"
            type="number"
            value={layer}
            onChange={ctrl(setLayer)}
            placeholder={'Layer' + (job.total ? ' / ' + job.total : '')}
            style={{width: 120}}
          />
          <OB.Button
            size="sm"
            variant="secondary"
            disabled={!layer}
            onClick={() => {
              setStatus(job, job.status, {layer: +layer});
              setLayer('');
            }}
          >
            Update
          </OB.Button>
        </>
      )}
      <OB.Button size="sm" icon="check" onClick={() => setStatus(job, 'done')}>
        Done
      </OB.Button>
      <OB.Button
        size="sm"
        variant="ghost"
        icon="x"
        onClick={() => setStatus(job, 'failed')}
      >
        Failed
      </OB.Button>
    </div>
  );
}

function PrinterCard({p, go}) {
  const {data} = useOps();
  const job = data.jobs.find((j) => j.id === p.jobId);
  const next = data.jobs.filter(
    (j) => j.printerId === p.id && j.status === 'queued',
  );
  const live = p.live || {};
  const out = p.service && p.service.status === 'out';
  const st = out
    ? ['danger', 'Out of service']
    : PRINTER_BADGE[live.status] || PRINTER_BADGE.offline;
  const up = p.upkeep || {due: 0, soon: 0};
  const seen =
    p.connector === 'manual'
      ? 'MANUAL'
      : live.lastSeen
        ? 'SEEN ' + fmtAgo(live.lastSeen).toUpperCase()
        : 'NOT CONNECTED';
  return (
    <article
      className={
        'o-card' +
        (out || live.status === 'offline' || p.enabled === false
          ? ' is-off'
          : '')
      }
    >
      <div className="o-row o-between o-top">
        <div className="o-min0">
          <div className="o-row">
            <span className="o-chip o-chip-yolk">{p.code}</span>
            <b className="o-title">{p.name}</b>
          </div>
          <span className="o-mono o-dim">
            {(p.model || p.connector).toUpperCase()} · {seen}
          </span>
        </div>
        <OB.Badge tone={st[0]} dot>
          {st[1]}
        </OB.Badge>
      </div>
      {out && (
        <div className="o-note o-note-danger">
          {p.service.reason}
          {p.service.until ? ' · back ' + p.service.until : ''}
        </div>
      )}
      {(up.due > 0 || up.soon > 0) && (
        <button className="o-btn-link" onClick={() => go('upkeep')}>
          {up.due
            ? up.due + ' maintenance task' + (up.due > 1 ? 's' : '') + ' due'
            : up.soon + ' due soon'}
        </button>
      )}
      {live.error && <span className="o-mono o-danger">{live.error}</span>}
      {job ? (
        <div className="o-stack">
          <div className="o-row o-between">
            <span className="o-row o-min0">
              <Swatch hex={job.hex} size={16} />
              <b className="o-ellipsis">{job.title}</b>
            </span>
            <span className="o-mono o-dim">{job.id}</span>
          </div>
          <Progress value={job.progress} status={job.status} />
          <div className="o-row o-between o-mono">
            <span>
              {Math.round((job.progress || 0) * 100)} %
              {job.total ? ' · L ' + (job.layer || 0) + '/' + job.total : ''}
            </span>
            <span>{live.eta ? 'ETA ' + fmtDur(live.eta) : ''}</span>
          </div>
        </div>
      ) : (
        <div className="o-mono o-dim">
          {next.length
            ? 'NEXT UP: ' + next[0].id + ' · ' + next[0].title
            : 'BED IS EMPTY'}
        </div>
      )}
      <dl className="o-kv">
        {p.connector !== 'manual' && (
          <>
            <dt>Nozzle</dt>
            <dd>{fmtTemp(live.nozzle)}</dd>
            <dt>Bed</dt>
            <dd>{fmtTemp(live.bed)}</dd>
          </>
        )}
        {live.file && (
          <>
            <dt>File</dt>
            <dd>{live.file}</dd>
          </>
        )}
        <dt>Queue</dt>
        <dd>{next.length ? next.length + ' waiting' : 'empty'}</dd>
      </dl>
      <SlotPicker p={p} />
      <div className="o-push">
        <JobControls p={p} job={job} next={next[0]} />
      </div>
    </article>
  );
}

// Everything that needs a person right now: load spools, clear plates,
// maintenance due, restock.
function TodoList({go}) {
  const {data} = useOps();
  const act = useAct();
  const th = data.inventory.thresholds;
  const open = data.tasks.filter((t) => t.status === 'open');
  const due = data.printers.flatMap((p) =>
    ((p.upkeep && p.upkeep.tasks) || [])
      .filter((t) => t.status === 'due')
      .map((t) => ({p, t})),
  );
  const low = data.inventory.filaments.filter(
    (f) => stockStatus(f.grams, th) !== 'in',
  ).length;
  if (!open.length && !due.length && !low) return null;
  return (
    <section className="o-card o-todo">
      <h2 className="o-h2">Needs a person</h2>
      {open.map((t) => (
        <div key={t.id} className="o-todo-row">
          <OB.Icon name={t.type === 'load' ? 'disc-3' : 'hand'} size={18} />
          <div className="o-min0 o-grow">
            <b>{t.title}</b>
            <div className="o-mono o-dim">
              {t.type === 'load'
                ? 'FROM ' +
                  String(t.from).toUpperCase() +
                  (t.replacing
                    ? ' · TAKE OUT ' +
                      spoolLabel(spoolById(data, t.replacing)).toUpperCase()
                    : '') +
                  ' · FOR ' +
                  t.jobIds.join(', ')
                : fmtAgo(t.createdAt).toUpperCase()}
            </div>
          </div>
          <OB.Button
            size="sm"
            icon="check"
            onClick={() =>
              act(() => opsApi('POST', '/api/tasks/' + t.id + '/done'))
            }
          >
            Done
          </OB.Button>
          <OB.IconButton
            size="sm"
            variant="ghost"
            icon="x"
            label="Dismiss"
            onClick={() =>
              act(() => opsApi('POST', '/api/tasks/' + t.id + '/dismiss'))
            }
          />
        </div>
      ))}
      {due.map(({p, t}) => (
        <div key={p.id + t.id} className="o-todo-row">
          <OB.Icon name="wrench" size={18} />
          <div className="o-grow">
            <b>
              {p.code}: {t.name}
            </b>
            <div className="o-mono o-danger">MAINTENANCE DUE</div>
          </div>
          <OB.Button size="sm" variant="secondary" onClick={() => go('upkeep')}>
            Open
          </OB.Button>
        </div>
      ))}
      {low > 0 && (
        <div className="o-todo-row">
          <OB.Icon name="package" size={18} />
          <div className="o-grow">
            <b>
              {low} colour{low > 1 ? 's' : ''} low or out
            </b>
          </div>
          <OB.Button
            size="sm"
            variant="secondary"
            onClick={() => go('inventory')}
          >
            Shelves
          </OB.Button>
        </div>
      )}
    </section>
  );
}

function FloorPage({go}) {
  const {data} = useOps();
  const printing = data.printers.filter((p) => p.jobId).length;
  const queued = data.jobs.filter((j) => j.status === 'queued');
  const unassigned = queued.filter((j) => !j.printerId).length;
  const due = data.printers.reduce(
    (s, p) => s + (p.upkeep ? p.upkeep.due : 0),
    0,
  );
  const out = data.printers.filter(
    (p) => p.service && p.service.status === 'out',
  ).length;
  return (
    <>
      <PageHead over="Live from the floor" title="Print floor">
        <OB.Button icon="plus" onClick={() => go('queue', 'new')}>
          New print job
        </OB.Button>
      </PageHead>
      <div className="o-stats">
        <div className="o-stat">
          <span className="o-over">Printing</span>
          <b>
            {printing}
            <small> / {data.printers.length}</small>
          </b>
        </div>
        <div className="o-stat">
          <span className="o-over">Queued</span>
          <b>{queued.length}</b>
          {unassigned > 0 && (
            <button className="o-btn-link" onClick={() => go('queue')}>
              {unassigned} need a printer
            </button>
          )}
        </div>
        <div className="o-stat">
          <span className="o-over">Maintenance due</span>
          <b className={due ? 'o-danger' : ''}>{due}</b>
        </div>
        <div className="o-stat">
          <span className="o-over">Out of service</span>
          <b>{out}</b>
        </div>
      </div>
      <TodoList go={go} />
      {data.printers.length ? (
        <div className="o-grid">
          {data.printers.map((p) => (
            <PrinterCard key={p.id} p={p} go={go} />
          ))}
        </div>
      ) : (
        <Empty title="No printers yet">
          {data.user.role === 'admin' ? (
            <OB.Button icon="plus" onClick={() => go('printers', 'new')}>
              Add your first printer
            </OB.Button>
          ) : (
            <span>Ask an admin to add the printers.</span>
          )}
        </Empty>
      )}
    </>
  );
}

Object.assign(window, {
  SlotPicker,
  JobControls,
  PrinterCard,
  TodoList,
  FloorPage,
});

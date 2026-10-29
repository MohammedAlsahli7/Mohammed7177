// Inventory: filament by colour, parts & supplies, and the change history.

function FilamentTable({rows, setDlg}) {
  const {data} = useOps();
  const act = useAct();
  const th = data.inventory.thresholds;
  if (!rows.length) return <Empty title="No colours match" />;
  const onPrinters = (id) =>
    data.printers
      .filter((p) => (p.slots || []).includes(id))
      .map((p) => p.code);
  return (
    <div className="o-scroll">
      <table className="o-table">
        <thead>
          <tr>
            <th>Colour</th>
            <th>Material</th>
            <th>Shelf</th>
            <th>On hand</th>
            <th>SAR/kg</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => {
            const s = stockStatus(f.grams, th);
            const on = onPrinters(f.id);
            return (
              <tr
                key={f.id}
                className={s === 'out' ? 'is-out' : s === 'low' ? 'is-low' : ''}
              >
                <td>
                  <div className="o-row o-nowrap">
                    <Swatch hex={f.hex} />
                    <div>
                      <b>{f.name}</b> <span className="o-ar">{f.ar}</span>
                      <div className="o-mono o-dim">
                        {f.line}
                        {on.length ? ' · ON ' + on.join(', ') : ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <OB.Tag material={f.material}>{MAT_LABEL[f.material]}</OB.Tag>
                </td>
                <td className="o-mono">{f.shelf || '—'}</td>
                <td className="o-mono o-big">{fmtG(f.grams)}</td>
                <td className="o-mono">
                  {f.costPerKg != null ? f.costPerKg : 'default'}
                </td>
                <td>
                  <OB.Badge tone={STOCK_BADGE[s][0]} dot>
                    {STOCK_BADGE[s][1]}
                  </OB.Badge>
                </td>
                <td>
                  <div className="o-row o-nowrap o-end">
                    <OB.Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        act(
                          () =>
                            opsApi(
                              'POST',
                              '/api/filaments/' + f.id + '/adjust',
                              {delta: 1000, reason: 'New 1 kg spool'},
                            ),
                          '+1 kg ' + f.name,
                        )
                      }
                    >
                      +1 kg
                    </OB.Button>
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="sliders-horizontal"
                      label="Adjust"
                      onClick={() =>
                        setDlg({type: 'adjust', kind: 'filament', target: f})
                      }
                    />
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="pencil"
                      label="Edit"
                      onClick={() => setDlg({type: 'filament', f})}
                    />
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="trash-2"
                      label="Delete"
                      onClick={() =>
                        confirm(
                          'Delete ' + f.name + '? It disappears from the shop.',
                        ) &&
                        act(() => opsApi('DELETE', '/api/filaments/' + f.id))
                      }
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ItemTable({rows, setDlg}) {
  const {data} = useOps();
  const act = useAct();
  if (!rows.length) {
    return (
      <Empty
        title={
          data.inventory.items.length
            ? 'Nothing matches'
            : 'No parts or supplies yet'
        }
      >
        {!data.inventory.items.length && (
          <span>
            Track nozzles, build plates, boxes, finished products — anything
            with a count.
          </span>
        )}
      </Empty>
    );
  }
  const adjust = (i, delta) =>
    act(() => opsApi('POST', '/api/items/' + i.id + '/adjust', {delta}));
  return (
    <div className="o-scroll">
      <table className="o-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Location</th>
            <th>On hand</th>
            <th>Reorder at</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => {
            const low = i.reorderAt != null && i.qty <= i.reorderAt;
            return (
              <tr
                key={i.id}
                className={low ? (i.qty === 0 ? 'is-out' : 'is-low') : ''}
              >
                <td>
                  <b>{i.name}</b>
                  <div className="o-mono o-dim">
                    {[i.sku, i.supplier].filter(Boolean).join(' · ')}
                  </div>
                </td>
                <td>{i.category}</td>
                <td className="o-mono">{i.location || '—'}</td>
                <td className="o-mono o-big">
                  {i.qty} {i.unit}
                </td>
                <td>
                  {i.reorderAt == null ? (
                    '—'
                  ) : (
                    <span className="o-row">
                      <span className="o-mono">{i.reorderAt}</span>
                      {low && <OB.Badge tone="warning">Reorder</OB.Badge>}
                    </span>
                  )}
                </td>
                <td>
                  <div className="o-row o-nowrap o-end">
                    <OB.IconButton
                      size="sm"
                      variant="secondary"
                      icon="minus"
                      label="Use one"
                      onClick={() => adjust(i, -1)}
                    />
                    <OB.IconButton
                      size="sm"
                      variant="secondary"
                      icon="plus"
                      label="Add one"
                      onClick={() => adjust(i, 1)}
                    />
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="sliders-horizontal"
                      label="Adjust"
                      onClick={() =>
                        setDlg({type: 'adjust', kind: 'item', target: i})
                      }
                    />
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="pencil"
                      label="Edit"
                      onClick={() => setDlg({type: 'item', it: i})}
                    />
                    <OB.IconButton
                      size="sm"
                      variant="ghost"
                      icon="trash-2"
                      label="Delete"
                      onClick={() =>
                        confirm('Delete ' + i.name + '?') &&
                        act(() => opsApi('DELETE', '/api/items/' + i.id))
                      }
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StockHistory() {
  const {data} = useOps();
  const [rows, setRows] = React.useState(null);
  React.useEffect(() => {
    opsApi('GET', '/api/movements?limit=300')
      .then(setRows)
      .catch(() => setRows([]));
  }, [data.inventory]);
  if (!rows) return <p>Loading…</p>;
  if (!rows.length) return <Empty title="No stock movements yet" />;
  const nameOf = (m) => {
    const f = spoolById(data, m.ref);
    const i = data.inventory.items.find((x) => x.id === m.ref);
    return f ? spoolLabel(f) : i ? i.name : m.ref;
  };
  const amount = (m) =>
    m.kind === 'filament' ? fmtG(Math.abs(m.delta)) : Math.abs(m.delta);
  return (
    <div className="o-scroll">
      <table className="o-table">
        <thead>
          <tr>
            <th>When</th>
            <th>What</th>
            <th>Change</th>
            <th>Why</th>
            <th>Who</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id}>
              <td className="o-mono">{new Date(m.at).toLocaleString()}</td>
              <td>{nameOf(m)}</td>
              <td className={'o-mono ' + (m.delta < 0 ? 'o-danger' : 'o-ok')}>
                {m.delta < 0 ? '−' : '+'}
                {amount(m)}
              </td>
              <td>{m.reason}</td>
              <td className="o-mono">{m.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InventoryPage() {
  const {data} = useOps();
  const th = data.inventory.thresholds;
  const [tab, setTab] = React.useState('filament');
  const [q, setQ] = React.useState('');
  const [mat, setMat] = React.useState('');
  const [lowOnly, setLowOnly] = React.useState(false);
  const [dlg, setDlg] = React.useState(null);
  const match = (s) => !q || s.toLowerCase().includes(q.toLowerCase());
  const fil = data.inventory.filaments.filter(
    (f) =>
      match([f.name, f.ar, f.line, f.shelf, f.id].join(' ')) &&
      (!mat || f.material === mat) &&
      (!lowOnly || stockStatus(f.grams, th) !== 'in'),
  );
  const items = data.inventory.items.filter(
    (i) =>
      match([i.name, i.sku, i.location, i.supplier].join(' ')) &&
      (!lowOnly || (i.reorderAt != null && i.qty <= i.reorderAt)),
  );
  const total = data.inventory.filaments.reduce((s, f) => s + f.grams, 0);
  const tabs = [
    {id: 'filament', label: 'Filament', count: data.inventory.filaments.length},
    {
      id: 'items',
      label: 'Parts & supplies',
      count: data.inventory.items.length,
    },
    {id: 'history', label: 'History'},
  ];
  return (
    <>
      <PageHead over="Shelves" title="Inventory">
        {tab === 'filament' && (
          <OB.Button icon="plus" onClick={() => setDlg({type: 'filament'})}>
            Add colour
          </OB.Button>
        )}
        {tab === 'items' && (
          <OB.Button icon="plus" onClick={() => setDlg({type: 'item'})}>
            Add item
          </OB.Button>
        )}
      </PageHead>
      <p className="o-mono o-dim o-tight">
        {fmtG(total)} OF FILAMENT · LOW BELOW
        {' ' + fmtG(th.in)} · OUT BELOW {fmtG(th.low)} (HIDDEN FROM THE SHOP)
      </p>
      <OB.Tabs
        items={tabs}
        value={tab}
        onChange={setTab}
        style={{marginBottom: 16}}
      />
      {tab !== 'history' && (
        <div className="o-row o-mb16">
          <OB.Input
            size="sm"
            icon="search"
            placeholder="Search"
            value={q}
            onChange={ctrl(setQ)}
            style={{width: 240}}
          />
          {tab === 'filament' &&
            ['pla', 'petg', 'tpu', 'loop'].map((m) => (
              <OB.Tag
                key={m}
                material={m}
                selected={mat === m}
                onClick={() => setMat(mat === m ? '' : m)}
              >
                {MAT_LABEL[m]}
              </OB.Tag>
            ))}
          <OB.Switch label="Low only" checked={lowOnly} onChange={setLowOnly} />
        </div>
      )}
      {tab === 'filament' && <FilamentTable rows={fil} setDlg={setDlg} />}
      {tab === 'items' && <ItemTable rows={items} setDlg={setDlg} />}
      {tab === 'history' && <StockHistory />}
      {dlg && dlg.type === 'adjust' && (
        <AdjustDialog
          target={dlg.target}
          kind={dlg.kind}
          onClose={() => setDlg(null)}
        />
      )}
      {dlg && dlg.type === 'filament' && (
        <FilamentDialog f={dlg.f} onClose={() => setDlg(null)} />
      )}
      {dlg && dlg.type === 'item' && (
        <ItemDialog it={dlg.it} onClose={() => setDlg(null)} />
      )}
    </>
  );
}

Object.assign(window, {FilamentTable, ItemTable, StockHistory, InventoryPage});

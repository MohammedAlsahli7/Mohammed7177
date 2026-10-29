// Pricing: print cost / price / margin calculator, the cost settings behind
// it, and what every catalogue product really makes.

const COST_LINES = [
  ['material', 'Filament (+ waste)'],
  ['machine', 'Printer wear & upkeep'],
  ['power', 'Electricity'],
  ['labour', 'Operator time'],
  ['packaging', 'Packaging'],
  ['failure', 'Failure buffer'],
  ['overhead', 'Overhead'],
];

/**
 * Live calculator. Calls the server so the numbers match quotes and jobs.
 * @param {{init: !Object, onResult: (function(!Object, !Object)|undefined)}} p
 * @return {!JSX.Element}
 */
function Calculator({init = {}, onResult}) {
  const {data} = useOps();
  const th = data.inventory.thresholds;
  const [x, set] = useForm({
    spoolId: '',
    material: 'pla',
    grams: '',
    hours: '',
    qty: 1,
    printerId: '',
    postMinutes: '',
    rush: false,
    packaging: true,
    markupPct: '',
    price: '',
    ...init,
  });
  const [res, setRes] = React.useState(null);
  React.useEffect(() => {
    const t = setTimeout(() => {
      const body = {
        ...x,
        grams: x.grams === '' ? null : +x.grams,
        hours: x.hours === '' ? null : +x.hours,
        qty: +x.qty || 1,
        postMinutes: x.postMinutes === '' ? undefined : +x.postMinutes,
        markupPct: x.markupPct === '' ? undefined : +x.markupPct,
        price: x.price === '' ? undefined : +x.price,
        spoolId: x.spoolId || undefined,
        printerId: x.printerId || undefined,
      };
      opsApi('POST', '/api/costing/calc', body)
        .then((r) => {
          setRes(r);
          if (onResult) onResult(r, body);
        })
        .catch(() => setRes(null));
    }, 250);
    return () => clearTimeout(t);
  }, [JSON.stringify(x), data.costing]);
  const mats = Object.entries(MAT_LABEL).map(([value, label]) => ({
    value,
    label,
  }));
  return (
    <div className="o-calc">
      <div className="o-form">
        <OB.Select
          label="Colour"
          value={x.spoolId}
          onChange={set('spoolId')}
          options={spoolOptions(data.inventory.filaments, th, {
            none: 'Any colour (material default cost)',
          })}
        />
        {!x.spoolId && (
          <OB.Select
            label="Material"
            value={x.material}
            onChange={set('material')}
            options={mats}
          />
        )}
        <OB.Input
          label="Filament per piece"
          type="number"
          suffix="g"
          value={String(x.grams)}
          onChange={set('grams')}
        />
        <OB.Input
          label="Print time per piece"
          type="number"
          suffix="h"
          value={String(x.hours)}
          onChange={set('hours')}
          hint="From the slicer. Empty = estimated from grams"
        />
        <OB.Input
          label="Quantity"
          type="number"
          value={String(x.qty)}
          onChange={set('qty')}
        />
        <OB.Select
          label="Printer"
          value={x.printerId}
          onChange={set('printerId')}
          options={printerOptions(data.printers, 'Default printer costs')}
        />
        <OB.Input
          label="Post-processing per piece"
          type="number"
          suffix="min"
          value={String(x.postMinutes)}
          onChange={set('postMinutes')}
          hint={'Default ' + data.costing.postMinutes + ' min'}
        />
        <OB.Input
          label="Markup"
          type="number"
          suffix="%"
          value={String(x.markupPct)}
          onChange={set('markupPct')}
          hint={'Default ' + data.costing.markupPct + ' %'}
        />
        <OB.Input
          label="Or test a selling price"
          type="number"
          suffix="SAR"
          value={String(x.price)}
          onChange={set('price')}
          hint="Incl. VAT — shows the margin it makes"
        />
        <div className="o-row o-full">
          <OB.Switch label="Rush" checked={!!x.rush} onChange={set('rush')} />
          <OB.Switch
            label="Packaging"
            checked={x.packaging !== false}
            onChange={set('packaging')}
          />
        </div>
      </div>
      {res && <CostBreakdown r={res} />}
    </div>
  );
}

function CostBreakdown({r}) {
  const good = r.marginPct >= 30;
  return (
    <div className="o-card o-breakdown">
      <span className="o-over">
        {r.qty} × · {fmtG(r.grams)} · {r.hours} h
        {r.hoursEstimated ? ' (est.)' : ''}
      </span>
      <table className="o-table o-table-tight">
        <tbody>
          {COST_LINES.map(([k, label]) => (
            <tr key={k}>
              <td>{label}</td>
              <td className="o-mono o-end">{fmtSar(r.lines[k])}</td>
            </tr>
          ))}
          <tr className="o-total">
            <td>
              <b>Cost</b>
            </td>
            <td className="o-mono o-end">
              <b>{fmtSar(r.cost)}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="o-price">
        <span className="o-over">Price incl. {r.vat ? 'VAT' : 'tax'}</span>
        <b>{fmtSar(r.price)}</b>
        <span className="o-mono">
          {fmtSar(r.unitPrice)} each · ex VAT
          {' ' + fmtSar(r.priceExVat)}
        </span>
      </div>
      <div className="o-row">
        <OB.Badge
          tone={r.profit < 0 ? 'danger' : good ? 'success' : 'warning'}
          dot
        >
          Margin {r.marginPct} %
        </OB.Badge>
        <span className="o-mono">
          PROFIT {fmtSar(r.profit)}
          {r.perHour != null ? ' · ' + fmtSar(r.perHour) + '/PRINTER H' : ''}
        </span>
      </div>
    </div>
  );
}

const SETTING_FIELDS = [
  ['operatorPerHour', 'Operator', 'SAR/h'],
  ['setupMinutes', 'Setup per job', 'min'],
  ['removalMinutes', 'Removal per piece', 'min'],
  ['postMinutes', 'Post-processing per piece', 'min'],
  ['wastePct', 'Filament waste', '%'],
  ['gramsPerHour', 'Throughput (for estimates)', 'g/h'],
  ['electricityPerKwh', 'Electricity', 'SAR/kWh'],
  ['packagingSar', 'Packaging per job', 'SAR'],
  ['failurePct', 'Failure buffer', '%'],
  ['overheadPct', 'Overhead', '%'],
  ['markupPct', 'Markup on cost', '%'],
  ['minPrice', 'Minimum price (ex VAT)', 'SAR'],
  ['rushFee', 'Rush fee (ex VAT)', 'SAR'],
  ['vatPct', 'VAT', '%'],
  ['roundTo', 'Round price up to', 'SAR'],
  ['fillFactor', 'Website estimate: plastic share of volume', '0–1'],
];
const PRINTER_FIELDS = [
  ['watts', 'Power draw', 'W'],
  ['priceSar', 'Printer price', 'SAR'],
  ['lifeHours', 'Expected life', 'h'],
  ['upkeepPerHour', 'Parts & upkeep', 'SAR/h'],
];

function CostSettings() {
  const {data} = useOps();
  const act = useAct();
  const admin = data.user.role === 'admin';
  const [x, setX] = React.useState(data.costing);
  React.useEffect(() => setX(data.costing), [data.costing]);
  const num = (path, v) =>
    setX((s) => {
      const next = JSON.parse(JSON.stringify(s));
      let o = next;
      path.slice(0, -1).forEach((k) => (o = o[k]));
      o[path[path.length - 1]] = v;
      return next;
    });
  const field = (path, label, unit) => {
    let v = x;
    path.forEach((k) => (v = v[k]));
    return (
      <OB.Input
        key={path.join('.')}
        label={label}
        suffix={unit}
        type="number"
        value={String(v)}
        disabled={!admin}
        onChange={(e) => num(path, e.target.value)}
      />
    );
  };
  return (
    <div className="o-stack o-gap14">
      {!admin && <p className="o-sub">Only admins can change these.</p>}
      <h3 className="o-over">
        Filament default cost (a colour’s own cost wins)
      </h3>
      <div className="o-form o-form-4">
        {Object.keys(x.materials).map((m) =>
          field(['materials', m, 'costPerKg'], MAT_LABEL[m], 'SAR/kg'),
        )}
      </div>
      <h3 className="o-over">Default printer (each printer can override)</h3>
      <div className="o-form o-form-4">
        {PRINTER_FIELDS.map(([k, l, u]) => field(['printer', k], l, u))}
      </div>
      <h3 className="o-over">Labour, overheads and price</h3>
      <div className="o-form o-form-4">
        {SETTING_FIELDS.map(([k, l, u]) => field([k], l, u))}
      </div>
      {admin && (
        <div>
          <OB.Button
            icon="save"
            onClick={() =>
              act(
                () => opsApi('PATCH', '/api/costing', x),
                'Pricing saved — the website ' + 'estimate follows',
              )
            }
          >
            Save
          </OB.Button>
        </div>
      )}
    </div>
  );
}

function ProductMargins() {
  const {data} = useOps();
  const [rows, setRows] = React.useState(null);
  React.useEffect(() => {
    opsApi('GET', '/api/costing/products')
      .then(setRows)
      .catch(() => setRows([]));
  }, [data.costing]);
  if (!rows) return <p>Loading…</p>;
  return (
    <div className="o-scroll">
      <table className="o-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Grams · hours</th>
            <th>Cost</th>
            <th>Shop price</th>
            <th>Margin</th>
            <th>Suggested</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <b>{p.name}</b>
                <div className="o-mono o-dim">{MAT_LABEL[p.material]}</div>
              </td>
              <td className="o-mono">
                {p.grams ? fmtG(p.grams) : '—'} ·
                {' ' + (p.hours ? p.hours.toFixed(1) + ' h' : 'est.')}
              </td>
              <td className="o-mono">{p.calc ? fmtSar(p.calc.cost) : '—'}</td>
              <td className="o-mono">{fmtSar(p.price)}</td>
              <td>
                {p.calc ? (
                  <OB.Badge
                    tone={
                      p.calc.marginPct < 0
                        ? 'danger'
                        : p.calc.marginPct < 30
                          ? 'warning'
                          : 'success'
                    }
                    dot
                  >
                    {p.calc.marginPct} %
                  </OB.Badge>
                ) : (
                  <span className="o-dim">Add weight to the product</span>
                )}
              </td>
              <td className="o-mono">
                {p.suggested ? fmtSar(p.suggested) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricingPage() {
  const [tab, setTab] = React.useState('calc');
  const tabs = [
    {id: 'calc', label: 'Calculator'},
    {id: 'products', label: 'Product margins'},
    {id: 'settings', label: 'Cost settings'},
  ];
  return (
    <>
      <PageHead over="Money" title="Pricing" />
      <OB.Tabs
        items={tabs}
        value={tab}
        onChange={setTab}
        style={{marginBottom: 16}}
      />
      {tab === 'calc' && <Calculator />}
      {tab === 'products' && <ProductMargins />}
      {tab === 'settings' && <CostSettings />}
    </>
  );
}

Object.assign(window, {
  Calculator,
  CostBreakdown,
  CostSettings,
  ProductMargins,
  PricingPage,
});

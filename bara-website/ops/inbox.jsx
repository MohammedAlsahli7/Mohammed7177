// Inbox: website submissions (quotes with model files, sell-with-us,
// 3D Corner). Quotes are priced with the calculator and turned into jobs.

const KIND = {
  quote: ['brand', 'Print my file'],
  sell: ['petg', 'Sell with us'],
  corner: ['info', '3D Corner'],
};
const DENSITY = {pla: 1.24, petg: 1.27, tpu: 1.21, loop: 1.24};

function QuoteDialog({r, onClose}) {
  const {data} = useOps();
  const act = useAct();
  const f = r.fields || {};
  const material = DENSITY[f.material] ? f.material : 'pla';
  const vol = parseFloat(f.volume_cm3);
  const grams = vol
    ? Math.round(vol * DENSITY[material] * data.costing.fillFactor)
    : '';
  const last = React.useRef(null);
  const init = r.quote
    ? {...r.quote.input}
    : {material, grams, rush: f.speed === 'rush'};
  const save = async () => {
    const res = await act(
      () => opsApi('POST', '/api/requests/' + r.id + '/quote', last.current),
      'Quote saved',
    );
    if (res) onClose();
  };
  const footer = (
    <>
      <OB.Button variant="ghost" onClick={onClose}>
        Cancel
      </OB.Button>
      <OB.Button icon="save" onClick={save}>
        Save quote
      </OB.Button>
    </>
  );
  return (
    <OB.Dialog
      open
      onClose={onClose}
      eyebrow="PRICE A QUOTE"
      title={r.file ? r.file.name : f.email || 'Quote'}
      width={980}
      footer={footer}
    >
      {f.dims_mm && (
        <p className="o-mono o-dim">
          MODEL {f.dims_mm} MM ·{' ' + f.volume_cm3} CM³ · WEBSITE ESTIMATE{' '}
          {f.estimate ? 'SAR ' + f.estimate : '—'}
        </p>
      )}
      <Calculator
        init={init}
        onResult={(res, body) => {
          last.current = body;
        }}
      />
    </OB.Dialog>
  );
}

function replyLink(r) {
  const f = r.fields || {};
  const q = r.quote;
  if (!f.email || !q) return null;
  const body =
    'Hi!\n\nYour print ' +
    (r.file ? '(' + r.file.name + ') ' : '') +
    'comes to SAR ' +
    q.price.toFixed(2) +
    ' incl. VAT for ' +
    q.qty +
    ' piece' +
    (q.qty > 1 ? 's' : '') +
    ' in ' +
    MAT_LABEL[q.material] +
    '.\nReply to this email to go ahead.\n\n— Bara’';
  return (
    'mailto:' +
    f.email +
    '?subject=' +
    encodeURIComponent('Your Bara’ quote') +
    '&body=' +
    encodeURIComponent(body)
  );
}

function RequestCard({r, go, onPrice}) {
  const act = useAct();
  const k = KIND[r.kind] || ['neutral', r.kind];
  const f = r.fields || {};
  const rows = Object.entries(f).filter(([key, v]) => v && key !== 'lang');
  const reply = replyLink(r);
  const toJob = () =>
    go('queue', 'new', {
      title: 'Quote · ' + (r.file ? r.file.name : f.email || ''),
      notes: [
        f.notes,
        f.email,
        f.material && 'Material: ' + f.material,
        f.speed && 'Speed: ' + f.speed,
      ]
        .filter(Boolean)
        .join('\n'),
      grams: r.quote ? r.quote.grams / r.quote.qty : '',
      requestId: r.id,
    });
  return (
    <article className={'o-card' + (r.status === 'new' ? '' : ' is-flat')}>
      <div className="o-row o-between">
        <OB.Badge tone={k[0]}>{k[1]}</OB.Badge>
        <span className="o-mono o-dim">{fmtAgo(r.at)}</span>
      </div>
      <dl className="o-kv">
        {rows.map(([key, v]) => (
          <React.Fragment key={key}>
            <dt>{key.replace(/_/g, ' ')}</dt>
            <dd>{key === 'email' ? <a href={'mailto:' + v}>{v}</a> : v}</dd>
          </React.Fragment>
        ))}
      </dl>
      {r.file && (
        <a className="o-btn-link" href={'/api/requests/' + r.id + '/file'}>
          Download {r.file.name} ({(r.file.size / 1048576).toFixed(1)} MB)
        </a>
      )}
      {r.quote && (
        <div className="o-note">
          Quoted {fmtSar(r.quote.price)} · margin {r.quote.marginPct} % ·{' '}
          {fmtAgo(r.quote.at)} by {r.quote.by}
        </div>
      )}
      <div className="o-row o-push">
        {r.kind === 'quote' && (
          <OB.Button
            size="sm"
            variant="secondary"
            icon="calculator"
            onClick={() => onPrice(r)}
          >
            {r.quote ? 'Re-price' : 'Price it'}
          </OB.Button>
        )}
        {reply && (
          <a href={reply} className="o-btn-link">
            Email the quote
          </a>
        )}
        {r.kind === 'quote' && r.status !== 'converted' && (
          <OB.Button size="sm" icon="printer" onClick={toJob}>
            Make a job
          </OB.Button>
        )}
        {r.jobId && <span className="o-chip">{r.jobId}</span>}
        <OB.Select
          size="sm"
          value={r.status}
          style={{width: 140}}
          options={['new', 'seen', 'converted', 'closed']}
          onChange={(e) =>
            act(() =>
              opsApi('PATCH', '/api/requests/' + r.id, {
                status: e.target.value,
              }),
            )
          }
        />
      </div>
    </article>
  );
}

function InboxPage({go}) {
  const {data} = useOps();
  const [filter, setFilter] = React.useState('open');
  const [pricing, setPricing] = React.useState(null);
  const isOpen = (r) => ['new', 'seen'].includes(r.status);
  const list = data.requests.filter((r) => filter !== 'open' || isOpen(r));
  const tabs = [
    {id: 'open', label: 'Open', count: data.requests.filter(isOpen).length},
    {id: 'all', label: 'All'},
  ];
  return (
    <>
      <PageHead over="From the website" title="Inbox" />
      <OB.Tabs
        items={tabs}
        value={filter}
        onChange={setFilter}
        style={{marginBottom: 16}}
      />
      {list.length ? (
        <div className="o-grid">
          {list.map((r) => (
            <RequestCard key={r.id} r={r} go={go} onPrice={setPricing} />
          ))}
        </div>
      ) : (
        <Empty title="Inbox zero" pose="cheer">
          <span>No new quotes or requests from the website.</span>
        </Empty>
      )}
      {pricing && <QuoteDialog r={pricing} onClose={() => setPricing(null)} />}
    </>
  );
}

Object.assign(window, {QuoteDialog, RequestCard, InboxPage});

function PageHead({ over, title, sub, children }) {
  const t = useT();
  return (
    <section className="s-wrap" style={{ padding: '48px 24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {over && <span style={{ ...smMono, color: 'var(--fg-3)' }}>{t(over)}</span>}
      <PrintText as="h1" className="s-h1">{t(title)}</PrintText>
      {sub && <Rise delay={300}><p className="s-lead">{t(sub)}</p></Rise>}
      {children}
    </section>
  );
}

function ShopPage({ go, add, id }) {
  const t = useT(); const S = SITE.shop;
  const [cat, setCat] = React.useState(id || 'all'); const [mat, setMat] = React.useState(null);
  const list = SITE_PRODUCTS.filter((p) => (cat === 'all' || p.cat === cat) && (!mat || p.mats.includes(mat)));
  const nCommunity = SITE_PRODUCTS.filter((p) => p.src).length;
  return (
    <div>
      <PageHead title={S.title} sub={S.sub} />
      <div className="s-wrap">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          <B.Tabs value={cat} onChange={setCat} items={[{ id: 'all', label: t(S.all), count: SITE_PRODUCTS.length }, { id: 'games', label: t(S.games) }, { id: 'home', label: t(S.home) }].concat(nCommunity ? [{ id: 'community', label: t(SITE.community.tab), count: nCommunity }] : [])} />
          <div style={{ display: 'flex', gap: 8 }}>{['pla', 'petg', 'tpu'].map((k) => <B.Tag key={k} material={k} selected={mat === k} onClick={() => setMat(mat === k ? null : k)}>{B.MATERIALS[k].name}</B.Tag>)}</div>
        </div>
        <div className="s-g4">{list.map((p, k) => <Rise key={p.id + cat + mat} delay={k * 50}><ProductTile p={p} go={go} add={add} /></Rise>)}</div>
        {!list.length && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 48 }}><B.Mascot pose="oops" color="petg" size={140} /><span style={{ font: '600 17px/1.4 var(--font-body)', color: 'var(--fg-2)', textAlign: 'center' }}>{t(S.empty)}</span></div>}
      </div>
    </div>
  );
}

function ProductPage({ id, go, add }) {
  const t = useT(); const P = SITE.product; const i = useLangIdx();
  const p = SITE_PRODUCTS.find((x) => x.id === id);
  if (!p) return <div className="s-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '72px 24px', textAlign: 'center' }}><B.Mascot pose="oops" size={140} /><b style={{ font: '800 26px/1.1 var(--font-display)' }}>{t(SITE.sys.notFoundProduct)}</b><B.Button iconRight="arrow-right" onClick={() => go('shop')}>{t(SITE.sys.toShop)}</B.Button></div>;
  return <ProductDetail p={p} go={go} add={add} />;
}

function ProductDetail({ p, go, add }) {
  const t = useT(); const P = SITE.product; const i = useLangIdx();
  const [mat, setMat] = React.useState(p.mats[0]); const [ci, setCi] = React.useState(0); const [qty, setQty] = React.useState(1);
  const cols = SITE_COLOURS[mat] || []; const col = cols[ci] || cols[0] || null;
  return (
    <div className="s-wrap" style={{ paddingTop: 28 }}>
      <button onClick={() => go('shop')} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, font: '600 14px/1 var(--font-body)', color: 'var(--fg-2)', marginBottom: 20 }}><B.Icon name={i ? 'arrow-right' : 'arrow-left'} size={16} />{t(P.back)}</button>
      <div className="s-g2" style={{ gap: 40 }}>
        <Rise>
          <div style={{ position: 'relative', border: '2px solid var(--graphite-900)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-hard)' }}>
            <ModelViewer id={p.id} hex={col ? col[0] : '#B9B2A2'} />
            <span style={{ position: 'absolute', insetInlineStart: 12, bottom: 12, ...smMono, fontSize: 10.5, padding: '5px 8px 4px', borderRadius: 6, background: 'var(--paper-0)', border: '2px solid var(--graphite-900)', pointerEvents: 'none' }}>{t(['Drag to spin · stand-in model', 'اسحب للتدوير · موديل تجريبي'])}</span>
          </div>
        </Rise>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{p.badge && <B.Badge tone="brand" outlined>{t(p.badge)}</B.Badge>}<B.Badge tone="success" dot>{t(P.ready)}</B.Badge></div>
          <PrintText as="h1" className="s-h1">{t([p.en, p.ar])}</PrintText>
          {p.src && <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '12px 14px', border: '2px solid var(--graphite-900)', borderRadius: 14, background: 'var(--paper-0)' }}>
            <SourceChip p={p} size="lg" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 160 }}><b style={{ font: '700 15px/1.2 var(--font-body)' }}>{t(SITE.community.by)} {p.by}</b><span style={{ ...smMono, fontSize: 10.5, color: 'var(--fg-2)' }}>{t(SITE.community.lic)}: {t(p.lic)} · ♥ {p.likes}</span><span style={{ font: '500 13px/1.4 var(--font-body)', color: 'var(--fg-2)' }}>{t(SITE.community.creditNote)}</span></div>
            {p.url && <B.Button variant="secondary" size="sm" iconRight="external-link" onClick={() => window.open(p.url, '_blank', 'noopener')}>{t(SITE.community.view)}</B.Button>}
          </div>}
          <Price v={p.price * qty} size={40} />
          <p className="s-lead">{t(p.d)}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <b style={{ font: '700 14px/1 var(--font-body)' }}>{t(P.material)}</b>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{p.mats.map((k) => <B.Tag key={k} material={k} selected={mat === k} onClick={() => { setMat(k); setCi(0); crew(k === 'pla' ? 'colour' : k); }} style={{ height: 36, padding: '0 14px' }}>{B.MATERIALS[k].name}</B.Tag>)}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <b style={{ font: '700 14px/1 var(--font-body)' }}>{t(P.colour)}{col && <> · <span style={{ fontWeight: 500, color: 'var(--fg-2)' }}>{i ? col[2] : col[1]}</span></>}</b>
            {cols.length ? <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>{cols.map((c, k) => <B.MaterialSwatch key={c[3] || c[1]} color={c[0]} label={c[1]} selected={ci === k} size={38} onClick={() => { setCi(k); crew(/pink|bubble/i.test(c[1]) ? 'pink' : /graphite/i.test(c[1]) ? 'graphite' : 'colour'); }} />)}</div> : <span style={{ font: '500 14px/1.4 var(--font-body)', color: 'var(--fg-2)' }}>{t(SITE.sys.outOfStock)}</span>}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <B.QuantityStepper value={qty} onChange={setQty} />
            <B.Button size="lg" icon="shopping-bag" style={{ flex: 1, minWidth: 200 }} disabled={!col} onClick={() => add({ ...p, mat, hex: col[0] }, qty)}>{t(P.add)}</B.Button>
          </div>
          {p.stats && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px,1fr))', border: '2px solid var(--graphite-900)', borderRadius: 14, overflow: 'hidden', background: 'var(--paper-0)' }}>
            {[[P.layers, p.stats.layers], [P.time, p.stats.time], [P.infill, p.stats.infill], [P.weight, p.stats.weight]].filter(([, v]) => v != null).map(([k, v], n) => (
              <div key={n} style={{ padding: '12px 14px', borderInlineStart: n ? '2px solid var(--graphite-900)' : 0 }}><div style={{ ...smMono, fontSize: 10, color: 'var(--fg-3)' }}>{t(k)}</div><div style={{ font: '700 17px/1 var(--font-mono)', marginTop: 6 }}>{v}</div></div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
}

function CustomPage({ toast }) {
  const t = useT(); const C = SITE.custom; const S = SITE.sys; const i = useLangIdx();
  const [file, setFile] = React.useState(null); const [mat, setMat] = React.useState('pla'); const [speed, setSpeed] = React.useState('std');
  const [notes, setNotes] = React.useState(''); const [email, setEmail] = React.useState(''); const [sent, setSent] = React.useState(false);
  const [pricing, setPricing] = React.useState(null);
  React.useEffect(() => { baraApi.get('pricing').then(setPricing).catch(() => setPricing(null)); }, []);
  const [send, busy] = useSend(toast);
  const est = baraApi.estimate(file, mat, speed, pricing);
  const fits = baraApi.fits(file, pricing);
  const ready = file && emailOk(email) && !busy;
  const submit = () => {
    const fd = new FormData(); fd.append('file', file.file); fd.append('material', mat); fd.append('speed', speed); fd.append('notes', notes); fd.append('email', email.trim()); fd.append('lang', i ? 'ar' : 'en');
    if (file.dims) fd.append('dims_mm', file.dims.join('x')); if (file.volume) fd.append('volume_cm3', file.volume.toFixed(2)); if (est) fd.append('estimate', est.price);
    send('quote', fd, () => { setSent(true); crew('quote'); toast({ tone: 'success', title: t(C.sent), message: t(C.sentMsg) }); }, 'Quote request — ' + file.name);
  };
  if (sent) return (
    <div><PageHead over={C.over} title={C.sent} sub={C.sentMsg} />
      <div className="s-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}><B.Mascot pose="cheer" size={150} /><B.Button variant="secondary" icon="plus" onClick={() => { setSent(false); setFile(null); setNotes(''); }}>{t(['Send another file', 'أرسل ملف ثاني'])}</B.Button></div>
    </div>
  );
  return (
    <div>
      <PageHead over={C.over} title={C.title} sub={C.sub} />
      <div className="s-wrap s-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {!file ? (
            <FileDrop toast={toast} onFile={setFile} render={({ busy: reading, over, open }) => (
              <button type="button" onClick={open} disabled={reading} style={{ width: '100%', border: '2px dashed var(--graphite-900)', borderRadius: 24, background: over ? 'var(--yolk-100, var(--paper-1))' : 'var(--paper-0)', backgroundImage: 'var(--tex-bed)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                <B.Mascot pose={reading ? 'printing' : 'hello'} size={130} />
                <span style={{ font: '800 24px/1.15 var(--font-display)', textAlign: 'center' }}>{reading ? t(['Reading the mesh…', 'نقرأ الملف…']) : t(C.drop)}</span>
                <span style={{ ...smMono, color: 'var(--fg-3)', textAlign: 'center' }}>{t(C.limits)}</span>
              </button>
            )} />
          ) : (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', border: '2px solid var(--graphite-900)', borderRadius: 18, padding: 14, background: 'var(--paper-0)', flexWrap: 'wrap' }}>
              <div style={{ width: 96, borderRadius: 12, overflow: 'hidden', border: '2px solid var(--graphite-900)' }}><B.MediaPlaceholder label={file.ext.toUpperCase()} tone="ink" texture="bed" ratio="1 / 1" radius={0} /></div>
              <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <b style={{ font: '700 17px/1.2 var(--font-body)', wordBreak: 'break-all' }}>{file.name}</b>
                <span style={{ ...smMono, fontSize: 11, color: 'var(--fg-3)' }}>{[file.size, meshDims(file), file.volume ? file.volume.toFixed(1) + ' cm³' : null].filter(Boolean).join(' · ')}</span>
                {!fits && <B.Badge tone="warning" dot>{t(S.tooBig)}</B.Badge>}
              </div>
              <B.IconButton icon="trash-2" label="Remove" variant="ghost" onClick={() => setFile(null)} />
            </div>
          )}
          <div style={{ border: '2px solid var(--border-1)', borderRadius: 20, padding: 22, background: 'var(--paper-0)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>{['pla', 'petg', 'tpu'].map((k) => <B.MaterialSwatch key={k} material={k} showLabel selected={mat === k} onClick={() => { setMat(k); crew(k === 'pla' ? 'colour' : k); }} />)}</div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <B.Radio value="std" checked={speed === 'std'} onChange={setSpeed} label={t(C.std)} description={t(C.stdD)} />
              <B.Radio value="rush" checked={speed === 'rush'} onChange={setSpeed} label={t(C.rush)} description={t(C.rushD)} />
            </div>
            <B.Input label={t(C.notes)} placeholder={t(C.notesPh)} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <B.Input label={t(S.email)} type="email" icon="mail" value={email} onChange={(e) => setEmail(e.target.value)} error={email && !emailOk(email) ? t(S.emailBad) : undefined} />
          </div>
        </div>
        <div className="s-sticky">
          <B.Card variant="brand" padding={24}>
            <span style={smMono}>{t(C.estimate)}</span>
            <div style={{ margin: '12px 0 6px' }}>{est ? <Price v={est.price} size={56} /> : <span style={{ font: '800 56px/1 var(--font-display)' }}>—</span>}</div>
            <span style={{ font: '500 14px/1.4 var(--font-body)' }}>{!file ? t(C.needFile) : est ? t(C.estNote) + ' · ≈ ' + est.grams + ' g' : t(S.handPrice)}</span>
            <B.Button variant="ink" size="lg" fullWidth disabled={!ready} style={{ marginTop: 20 }} onClick={submit}>{busy ? t(S.sending) : t(C.send)}</B.Button>
          </B.Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PageHead, ShopPage, ProductPage, ProductDetail, CustomPage });

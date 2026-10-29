function MaterialsPage({ go }) {
  const t = useT(); const M = SITE.mats; const MP = SITE.materialsPage; const i = useLangIdx();
  return (
    <div>
      <PageHead title={MP.title} sub={MP.sub} />
      <div className="s-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {['pla', 'petg', 'tpu'].map((k, n) => { const m = B.MATERIALS[k]; return (
          <Rise key={k}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', border: '2px solid var(--graphite-900)', borderRadius: 24, overflow: 'hidden', background: 'var(--paper-0)', boxShadow: 'var(--shadow-hard)' }}>
              <div style={{ background: m.color, backgroundImage: 'var(--tex-layers-strong)', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, color: '#fff', minHeight: 260 }}>
                <span style={{ font: '800 clamp(64px,9vw,112px)/.8 var(--font-display)', letterSpacing: '-.03em' }}>{m.name}</span>
                <B.Mascot pose={['hello', 'cheer', 'hello'][n]} color={k} swirl="paper" size={130} />
              </div>
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <b style={{ font: '800 28px/1.1 var(--font-display)' }}>{t(M[k][0])}</b>
                <p style={{ margin: 0, font: '500 17px/1.55 var(--font-body)', color: 'var(--fg-2)' }}>{t(M[k][1])}</p>
                <span style={{ ...smMono, color: 'var(--fg-3)' }}>{t(MP.nozzle)} · {m.temp}</span>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 'auto' }}>
                  {(SITE_COLOURS[k] || []).map((c) => <div key={c[3] || c[1]} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><B.MaterialSwatch color={c[0]} size={40} /><span style={{ font: '600 12px/1 var(--font-body)' }}>{i ? c[2] : c[1]}</span></div>)}
                </div>
              </div>
            </div>
          </Rise>
        ); })}
        <B.Button variant="ink" icon="box" style={{ alignSelf: 'flex-start' }} onClick={() => go('custom')}>{t(MP.studio)}</B.Button>
      </div>
    </div>
  );
}

function LoopPage() {
  const t = useT(); const L = SITE.loopPage; const i = useLangIdx();
  const [kg, setKg] = React.useState(1.5);
  return (
    <div>
      <PageHead over={SITE.loop.over} title={SITE.loop.title} sub={SITE.loop.sub} />
      <div className="s-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div className="s-g3">
          {L.steps.map(([h, b], n) => (
            <Rise key={n} delay={n * 100}>
              <div className="s-squish" style={{ height: '100%', border: '2px solid var(--graphite-900)', borderRadius: 20, padding: 24, background: 'var(--paper-0)', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: 'var(--shadow-hard)' }}>
                <B.Mascot pose={['oops', 'hello', 'cheer'][n]} color="loop" size={96} />
                <b style={{ font: '800 24px/1.1 var(--font-display)' }}>{t(h)}</b>
                <p style={{ margin: 0, font: '500 15px/1.5 var(--font-body)', color: 'var(--fg-2)' }}>{t(b)}</p>
              </div>
            </Rise>
          ))}
        </div>
        <Rise>
          <div style={{ border: '2px solid var(--graphite-900)', borderRadius: 24, background: 'var(--graphite-900)', backgroundImage: 'var(--tex-bed-inverse)', color: 'var(--paper-0)', padding: 'clamp(20px,4vw,40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="s-h2" style={{ color: 'var(--paper-0)' }}>{t(L.calc)}</h2>
              <div style={{ font: '800 clamp(56px,8vw,96px)/1 var(--font-mono)', color: 'var(--yolk-500)' }}>{kg.toFixed(1)}<span style={{ fontSize: '.4em', marginInlineStart: 8 }}>kg</span></div>
              <input type="range" min="0.5" max="10" step="0.5" value={kg} onChange={(e) => setKg(+e.target.value)} style={{ width: '100%', accentColor: '#F2B705' }} aria-label="Kilograms" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[[L.credit, (i ? '' : 'SAR ') + Math.round(kg * 20) + (i ? ' ريال' : '')], [L.becomes, (kg * 0.9).toFixed(1) + ' kg']].map(([k, v], n) => (
                <div key={n} style={{ border: '2px solid var(--graphite-700)', borderRadius: 16, padding: 18 }}><div style={{ ...smMono, fontSize: 10.5, color: 'var(--graphite-400)' }}>{t(k)}</div><div style={{ font: '800 30px/1 var(--font-display)', marginTop: 10 }}>{v}</div>{n === 1 && <div style={{ font: '500 13px/1.3 var(--font-body)', color: 'var(--graphite-300)', marginTop: 6 }}>{t(L.spool)}</div>}</div>
              ))}
            </div>
          </div>
        </Rise>
      </div>
    </div>
  );
}

function AboutPage() {
  const t = useT(); const A = SITE.about;
  return (
    <div>
      <PageHead title={A.title} />
      <div className="s-wrap s-split">
        <Rise><p className="s-lead" style={{ fontSize: 'clamp(18px,2vw,22px)', color: 'var(--fg-1)', maxWidth: 640 }}>{t(A.body)}</p></Rise>
        <Rise delay={150} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {['The print wall', 'Filament shelf', 'The team', 'Tab’a & the Goblin’s corner'].map((l, n) => <div key={l} style={{ border: '2px solid var(--graphite-900)', borderRadius: 16, overflow: 'hidden' }}><B.MediaPlaceholder label={l} tone={['ink', 'pla', 'paper', 'yolk'][n]} texture={n === 0 ? 'bed' : 'layers'} ratio="1 / 1" radius={0} /></div>)}
        </Rise>
      </div>
      <section className="s-section s-wrap">
        <Rise>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'center', border: '2px solid var(--graphite-900)', borderRadius: 24, background: 'var(--yolk-500)', padding: 'clamp(20px,4vw,40px)', boxShadow: 'var(--shadow-hard-lg)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 className="s-h2">{t(A.visit)}</h2>
              <p style={{ margin: 0, font: '500 17px/1.5 var(--font-body)' }}>{t(A.visitSub)}</p>
              <span style={{ ...smMono }}>{t(A.hours)}</span>
              {baraApi.config.mapsUrl && <B.Button variant="ink" icon="map-pin" style={{ alignSelf: 'flex-start' }} onClick={() => window.open(baraApi.config.mapsUrl, '_blank', 'noopener')}>{t(A.dir)}</B.Button>}
            </div>
            <div style={{ border: '2px solid var(--graphite-900)', borderRadius: 18, overflow: 'hidden', background: 'var(--paper-0)' }}><B.MediaPlaceholder label="Map — studio location" tone="paper" texture="bed" ratio="16 / 10" radius={0} /></div>
          </div>
        </Rise>
      </section>
    </div>
  );
}

function CornerPage({ toast }) {
  const t = useT(); const C = SITE.corner; const i = useLangIdx(); const S = SITE.sys;
  const cities = i ? ['الرياض', 'جدة', 'الدمام', 'غيرها'] : ['Riyadh', 'Jeddah', 'Dammam', 'Other'];
  const [f, setF] = React.useState({ name: '', company: '', city: 0, size: '6', phone: '', email: '' }); const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const [send, busy] = useSend(toast);
  const ready = f.name.trim() && f.company.trim() && (emailOk(f.email) || f.phone.replace(/\D/g, '').length >= 8) && !busy;
  const submit = () => send('corner', { ...f, city: ['Riyadh', 'Jeddah', 'Dammam', 'Other'][f.city], lang: i ? 'ar' : 'en' }, () => { setSent(true); toast({ tone: 'success', title: t(C.sent) }); }, '3D Corner — ' + f.company);
  return (
    <div>
      <PageHead over={C.over} title={C.title} sub={C.sub} />
      <div className="s-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Rise><div style={{ border: '2px solid var(--graphite-900)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-hard)' }}><B.MediaPlaceholder label="3D Corner render — kiosk, printers, recycling bin" tone="yolk" ratio="21 / 8" radius={0} /></div></Rise>
        <div className="s-g3">
          {C.tiles.map(([h, b], n) => (
            <Rise key={n} delay={n * 90}>
              <div className="s-squish" style={{ height: '100%', border: '2px solid var(--graphite-900)', borderRadius: 20, padding: 24, background: 'var(--paper-0)', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: 'var(--shadow-hard)' }}>
                <span style={{ width: 52, height: 52, borderRadius: 14, border: '2px solid var(--graphite-900)', background: ['var(--mat-pla)', 'var(--yolk-500)', 'var(--mat-loop)'][n], color: n === 1 ? 'var(--graphite-900)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><B.Icon name={['printer', 'package-open', 'recycle'][n]} size={26} /></span>
                <b style={{ font: '800 22px/1.15 var(--font-display)' }}>{t(h)}</b>
                <p style={{ margin: 0, font: '500 15px/1.5 var(--font-body)', color: 'var(--fg-2)' }}>{t(b)}</p>
              </div>
            </Rise>
          ))}
        </div>
        <div className="s-split">
          <Rise>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', border: '2px solid var(--graphite-900)', borderRadius: 20, overflow: 'hidden', background: 'var(--paper-0)' }}>
              {C.specs.map((s, n) => <div key={n} style={{ padding: 20, borderTop: n > 1 ? '2px solid var(--graphite-900)' : 0, borderInlineStart: n % 2 ? '2px solid var(--graphite-900)' : 0 }}><div style={{ ...smMono, fontSize: 10.5, color: 'var(--fg-3)' }}>{i ? s[1] : s[0]}</div><div style={{ font: '800 clamp(26px,3vw,36px)/1 var(--font-display)', marginTop: 8 }}>{i ? s[3] : s[2]}</div></div>)}
            </div>
          </Rise>
          <Rise delay={120}>
            <B.Card variant="raised" padding={24}>
              {sent ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', padding: 12 }}><B.Mascot pose="cheer" size={120} /><b style={{ font: '800 24px/1.15 var(--font-display)' }}>{t(C.sent)}</b></div> : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <b style={{ font: '800 26px/1 var(--font-display)' }}>{t(C.form)}</b>
                <B.Input label={t(C.name)} value={f.name} onChange={set('name')} />
                <B.Input label={t(C.company)} value={f.company} onChange={set('company')} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
                  <B.Select label={t(C.city)} value={String(f.city)} onChange={(e) => setF({ ...f, city: +e.target.value })} options={cities.map((c, n) => ({ value: String(n), label: c }))} />
                  <B.Input label={t(C.size)} suffix="m²" type="number" value={f.size} onChange={set('size')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 12 }}>
                  <B.Input label={t(S.phone)} type="tel" icon="phone" value={f.phone} onChange={set('phone')} />
                  <B.Input label={t(S.email)} type="email" icon="mail" value={f.email} onChange={set('email')} error={f.email && !emailOk(f.email) ? t(S.emailBad) : undefined} />
                </div>
                <B.Button size="lg" iconRight="phone" disabled={!ready} onClick={submit}>{busy ? t(S.sending) : t(C.send)}</B.Button>
              </div>}
            </B.Card>
          </Rise>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MaterialsPage, LoopPage, AboutPage, CornerPage });

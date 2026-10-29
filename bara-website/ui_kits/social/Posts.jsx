const { Wordmark, MediaPlaceholder, Icon } = window.InfillDesignSystem_d33a9b;
const soMono = { font: '700 26px/1.2 var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' };

function PostFrame({ w = 1080, h = 1080, scale = .42, children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ width: w * scale, height: h * scale, borderRadius: 14, overflow: 'hidden', border: '2px solid var(--graphite-900)', boxShadow: 'var(--shadow-hard)' }}>
        <div style={{ width: w, height: h, transform: 'scale(' + scale + ')', transformOrigin: '0 0', position: 'relative', overflow: 'hidden' }}>{children}</div>
      </div>
      <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</span>
    </div>
  );
}

function PostProductDrop() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--yolk-500)', padding: 72, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--tex-layers)' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Wordmark size={64} /><span style={{ ...soMono, background: 'var(--graphite-900)', color: 'var(--yolk-500)', padding: '12px 20px 10px', borderRadius: 14 }}>New drop</span></div>
      <div style={{ position: 'relative', font: '800 132px/.88 var(--font-display)', letterSpacing: '-.03em', marginTop: 48 }}>Hex Dice<br />Tower</div>
      <div style={{ position: 'relative', flex: 1, marginTop: 40, display: 'flex', gap: 32, alignItems: 'stretch' }}>
        <div style={{ flex: 1, border: '4px solid var(--graphite-900)', borderRadius: 32, overflow: 'hidden', background: 'var(--paper-0)' }}><MediaPlaceholder label="Product shot — dice mid-roll" tone="pla" ratio="auto" radius={0} style={{ height: '100%' }} /></div>
        <div style={{ width: 260, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 20 }}>
          <div style={{ ...soMono, fontSize: 22, lineHeight: 1.6 }}>0.20 mm<br />PLA + PETG<br />212 layers</div>
          <div style={{ width: 240, height: 240, borderRadius: 999, background: 'var(--graphite-900)', color: 'var(--paper-0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)', boxShadow: '8px 8px 0 var(--mat-pla)' }}>
            <span style={{ ...soMono, fontSize: 24, color: 'var(--yolk-300)' }}>SAR</span><span style={{ font: '800 104px/.9 var(--font-display)' }}>89</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostMaterial() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--mat-petg)', color: 'var(--paper-0)', padding: 72, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--tex-layers-strong)' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}><span style={soMono}>Material file · 02</span><span style={soMono}>230–250 °C</span></div>
      <div style={{ position: 'relative', marginTop: 'auto', font: '800 340px/.78 var(--font-display)', letterSpacing: '-.04em' }}>PETG</div>
      <div dir="rtl" style={{ position: 'relative', font: '800 72px/1.3 var(--font-arabic)', textAlign: 'right', marginTop: -10 }}>بي إي تي جي</div>
      <div style={{ position: 'relative', font: '700 52px/1.08 var(--font-display)', maxWidth: 820, marginTop: 24 }}>Tough enough for the dishwasher. Probably.</div>
      <div style={{ position: 'relative', display: 'flex', gap: 16, marginTop: 40, alignItems: 'center' }}>
        {['Glossy', 'Heat-proof-ish', 'Water-happy'].map((t) => <span key={t} style={{ ...soMono, fontSize: 22, padding: '14px 22px 12px', border: '3px solid var(--paper-0)', borderRadius: 16 }}>{t}</span>)}
        <span style={{ marginLeft: 'auto' }}><Wordmark size={48} color="var(--paper-0)" lang="en" /></span>
      </div>
    </div>
  );
}

function PostQuote() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--graphite-900)', backgroundImage: 'var(--tex-bed-inverse)', backgroundSize: '40px 40px', color: 'var(--paper-0)', padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
      <span style={{ ...soMono, color: 'var(--yolk-500)' }}>Bara' · برأ</span>
      <div dir="rtl" style={{ font: '800 150px/1.15 var(--font-arabic)', color: 'var(--yolk-500)' }}>طلبك غريب؟<br />نطبعه.</div>
      <div style={{ font: '700 64px/1.05 var(--font-display)', maxWidth: 800 }}>Weirdly specific things, printed. One 0.2 mm layer at a time.</div>
      <div style={{ position: 'absolute', left: 80, right: 80, bottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Wordmark size={52} color="var(--paper-0)" /><span style={{ ...soMono, fontSize: 22, color: 'var(--graphite-400)' }}>@bara.prints</span></div>
    </div>
  );
}

function StoryTimelapse({ progress = 0.64 }) {
  const layers = Math.round(212 * progress);
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--paper-1)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 8, padding: '40px 40px 0' }}>{[1, 1, .64, 0].map((p, i) => <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(22,22,26,.15)' }}><div style={{ width: (i === 2 ? progress : p) * 100 + '%', height: '100%', borderRadius: 4, background: 'var(--graphite-900)' }} /></div>)}</div>
      <div style={{ padding: '40px 64px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Wordmark size={56} /><span style={{ ...soMono, fontSize: 24 }}>Print of the week</span></div>
      <div style={{ margin: '48px 64px 0', flex: 1, border: '4px solid var(--graphite-900)', borderRadius: 40, overflow: 'hidden', position: 'relative' }}>
        <MediaPlaceholder label="Timelapse video — bed cam" tone="ink" texture="bed" ratio="auto" radius={0} style={{ height: '100%' }} />
        <div style={{ position: 'absolute', left: 32, right: 32, bottom: 32, background: 'var(--paper-0)', border: '4px solid var(--graphite-900)', borderRadius: 28, padding: 32, boxShadow: '8px 8px 0 var(--yolk-500)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...soMono, fontSize: 24 }}><span>Layer {layers} / 212</span><span>{Math.round(progress * 100)}%</span></div>
          <div style={{ height: 28, marginTop: 18, borderRadius: 14, border: '3px solid var(--graphite-900)', overflow: 'hidden', background: 'var(--paper-2)' }}><div style={{ width: progress * 100 + '%', height: '100%', background: 'var(--yolk-500)', backgroundImage: 'repeating-linear-gradient(90deg,rgba(22,22,26,.2) 0 3px,transparent 3px 14px)' }} /></div>
        </div>
      </div>
      <div style={{ padding: '48px 64px 80px', font: '800 88px/.95 var(--font-display)' }}>Goblin desk tidy.<div dir="rtl" style={{ font: '700 52px/1.4 var(--font-arabic)', color: 'var(--fg-2)', marginTop: 12 }}>منظم مكتب العفريت</div></div>
    </div>
  );
}

Object.assign(window, { PostFrame, PostProductDrop, PostMaterial, PostQuote, StoryTimelapse });

const B = window.InfillDesignSystem_d33a9b;
const LangCtx = React.createContext(0);
const useT = () => { const i = React.useContext(LangCtx); return (p) => (Array.isArray(p) ? p[i] : p); };
const useLangIdx = () => React.useContext(LangCtx);
const smMono = { font: '600 11.5px/1.2 var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' };

function useInView(opts) {
  const ref = React.useRef(null); const [inView, set] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); io.disconnect(); } }, { threshold: .25, ...opts });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function PrintText({ as = 'h2', className = 's-h2', children, style, delay = 0 }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return <Tag ref={ref} className={className + ' s-print' + (inView ? ' is-in' : '')} style={{ animationDelay: delay + 'ms', ...style }}>{children}</Tag>;
}

function Rise({ children, delay = 0, style, className = '' }) {
  const [ref, inView] = useInView();
  return <div ref={ref} className={'s-rise ' + className + (inView ? ' is-in' : '')} style={{ transitionDelay: delay + 'ms', ...style }}>{children}</div>;
}

const PAGE_LAYERS = 212;
const pageLayer = (p) => Math.max(0, Math.round(p * PAGE_LAYERS));
// Slicer-style layer slider that replaces the page scrollbar (desktop). Bottom = layer 1, top = last layer: scrolling down "prints" the page upward.
function SlicerScroll() {
  const [p, setP] = React.useState(0); const [drag, setDrag] = React.useState(false); const [hover, setHover] = React.useState(false);
  const rail = React.useRef(null);
  React.useEffect(() => {
    const on = () => { const d = document.documentElement; const max = d.scrollHeight - d.clientHeight; setP(max > 0 ? Math.min(1, Math.max(0, d.scrollTop / max)) : 0); };
    on(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    const mo = new ResizeObserver(on); mo.observe(document.body);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); mo.disconnect(); };
  }, []);
  const seek = (y) => { const r = rail.current.getBoundingClientRect(); const q = Math.min(1, Math.max(0, (r.bottom - y) / r.height)); const d = document.documentElement; window.scrollTo(0, q * (d.scrollHeight - d.clientHeight)); };
  const down = (e) => { e.preventDefault(); setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); seek(e.clientY); };
  const move = (e) => { if (drag) seek(e.clientY); };
  const up = () => setDrag(false);
  const layer = Math.max(1, pageLayer(p));
  const pct = (p * 100).toFixed(2) + '%';
  const open = drag || hover;
  const ink = 'var(--graphite-900)';
  return (
    <div className="s-slicer" aria-hidden onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} style={{ position: 'fixed', insetInlineEnd: 8, top: 112, bottom: 20, width: 28, zIndex: 41, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, userSelect: 'none' }}>
      <span style={{ font: '700 10px/1 var(--font-mono)', color: 'var(--fg-3)' }}>{PAGE_LAYERS}</span>
      <div ref={rail} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{ position: 'relative', flex: 1, width: 28, cursor: drag ? 'grabbing' : 'pointer', touchAction: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 8, marginLeft: -4, borderRadius: 4, border: '2px solid ' + ink, background: 'var(--paper-1)', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 5px, rgba(22,22,26,.16) 5px 6px)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: pct, background: 'var(--yolk-500)', backgroundImage: 'repeating-linear-gradient(0deg, var(--yolk-500) 0 3px, var(--mat-pla) 3px 4px, var(--yolk-500) 4px 7px, var(--mat-petg) 7px 8px)', transition: drag ? 'none' : 'height .12s linear' }} />
        </div>
        <div style={{ position: 'absolute', left: '50%', bottom: pct, transform: 'translate(-50%, 50%)', transition: drag ? 'none' : 'bottom .12s linear', pointerEvents: 'none' }}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: ink, border: '3px solid var(--yolk-500)', boxShadow: '0 0 0 2px ' + ink + ', var(--shadow-hard-sm)' }} />
          <div style={{ position: 'absolute', insetInlineEnd: 30, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', direction: 'ltr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, background: ink, color: 'var(--paper-0)', borderRadius: 6, padding: open ? '7px 9px 6px' : '5px 7px 4px', boxShadow: 'var(--shadow-hard-sm)', transition: 'padding .15s', whiteSpace: 'nowrap' }}>
              <span style={{ font: '700 ' + (open ? 13 : 11) + 'px/1 var(--font-mono)', color: 'var(--yolk-500)' }}>{layer}</span>
              {open && <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--paper-2)' }}>{(layer * 0.2).toFixed(2)} mm</span>}
            </div>
          </div>
        </div>
      </div>
      <span style={{ font: '700 10px/1 var(--font-mono)', color: 'var(--fg-3)' }}>1</span>
    </div>
  );
}

function LayerBar() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0); };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const layer = pageLayer(p);
  return (
    <div aria-hidden style={{ position: 'relative', height: 6, background: 'var(--paper-2)', borderTop: '2px solid var(--graphite-900)' }}>
      <div style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: p * 100 + '%', background: 'var(--yolk-500)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(22,22,26,.25) 0 2px, transparent 2px 10px)' }} />
      
    </div>
  );
}

function Marquee({ items }) {
  const row = items.concat(items);
  return (
    <div style={{ overflow: 'hidden', background: 'var(--graphite-900)', color: 'var(--paper-0)', borderBlock: '2px solid var(--graphite-900)' }}>
      <div className="s-marquee">
        {row.concat(row).map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '16px 20px 14px', ...smMono, fontSize: 13, whiteSpace: 'nowrap' }}>
            {t}<span style={{ width: 10, height: 10, borderRadius: 999, background: ['var(--yolk-500)', 'var(--mat-pla)', 'var(--mat-petg)', 'var(--mat-tpu)'][i % 4] }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function useVW() { const [w, set] = React.useState(window.innerWidth); React.useEffect(() => { const on = () => set(window.innerWidth); window.addEventListener('resize', on); return () => window.removeEventListener('resize', on); }, []); return w; }

function HeroBlob() {
  const [pose, setPose] = React.useState('printing');
  const vw = useVW();
  React.useEffect(() => { const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; const t = setTimeout(() => setPose('hello'), reduce ? 0 : 2900); return () => clearTimeout(t); }, []);
  const size = Math.max(220, Math.min(420, vw * 0.62));
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingTop: 24 }}>
      <div onClick={() => setPose(pose === 'cheer' ? 'hello' : 'cheer')} style={{ cursor: 'pointer' }} title="Poke it">
        <B.Mascot pose={pose} size={size} track color="yolk" swirl="pla" />
      </div>
    </div>
  );
}

function Price({ v, size = 22 }) {
  return <span style={{ font: '800 ' + size + 'px/1 var(--font-display)', whiteSpace: 'nowrap' }}><span style={{ font: '700 ' + Math.round(size * .5) + 'px/1 var(--font-mono)', marginInlineEnd: 4, color: 'var(--fg-2)' }}>SAR</span>{v}</span>;
}

Object.assign(window, { SlicerScroll, B, LangCtx, useT, useLangIdx, smMono, useInView, PrintText, Rise, LayerBar, Marquee, HeroBlob, useVW, Price });

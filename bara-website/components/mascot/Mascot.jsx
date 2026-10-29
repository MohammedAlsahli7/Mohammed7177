import React from 'react';

const MASCOT_COLORS = { yolk: 'var(--yolk-500)', pla: 'var(--mat-pla)', petg: 'var(--mat-petg)', tpu: 'var(--mat-tpu)', loop: 'var(--mat-loop)', ink: 'var(--graphite-600)', paper: 'var(--paper-0)' };
const MASCOT_SWIRL = { yolk: 'pla', pla: 'yolk', petg: 'tpu', tpu: 'petg', loop: 'yolk', ink: 'yolk', paper: 'yolk' };
const SQ_CSS = `
@keyframes sq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes sq-wobble{0%,100%{transform:scale(1,1) rotate(0)}33%{transform:scale(1.03,.97) rotate(-1.5deg)}66%{transform:scale(.98,1.02) rotate(1.5deg)}}
@keyframes sq-bounce{0%,100%{transform:translateY(0) scale(1,1)}15%{transform:translateY(0) scale(1.08,.9)}45%{transform:translateY(-16px) scale(.95,1.05)}75%{transform:translateY(0) scale(1.03,.97)}}
@keyframes sq-draw{0%{stroke-dashoffset:1}55%,100%{stroke-dashoffset:0}}
@keyframes sq-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}
@keyframes sq-breathe{0%,100%{transform:scale(1.14,.72)}50%{transform:scale(1.18,.68)}}
@keyframes sq-pop{0%,50%{opacity:0;transform:scale(.3)}62%{opacity:1;transform:scale(1.15)}70%,100%{opacity:1;transform:scale(1)}}
@keyframes sq-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes sq-z{0%{opacity:0;transform:translate(0,0) scale(.7)}30%{opacity:1}100%{opacity:0;transform:translate(14px,-26px) scale(1.1)}}
@keyframes sq-shake{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(-3px,0) rotate(-2deg)}75%{transform:translate(3px,0) rotate(2deg)}}
@keyframes sq-drip{0%{transform:scaleY(0)}40%,100%{transform:scaleY(1)}}
@keyframes gb-tape{from{transform:scale(1.6) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}
@keyframes sq-sway{0%,100%{transform:translateX(-2px) rotate(-2.5deg)}50%{transform:translateX(2px) rotate(2.5deg)}}
@keyframes sq-peer{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@keyframes sq-peerface{0%,100%{transform:translate(-4px,6px) scale(1.18)}50%{transform:translate(4px,8px) scale(1.3)}}
@keyframes sq-walk{0%,50%,100%{transform:translateY(0) scale(1.03,.97) rotate(-3deg)}25%,75%{transform:translateY(-7px) scale(.97,1.03) rotate(3deg)}}
@keyframes sq-step{0%,100%{transform:translate(0,0)}25%{transform:translate(5px,-9px) rotate(-12deg)}50%{transform:translate(9px,0)}}
@keyframes sq-swing{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(20deg)}}
@media (prefers-reduced-motion:reduce){.sq-root *:not(.sq-soft){animation:none!important}}
`;

const SQ_MAIN = [
  { d: 'M24 182 C 60 190, 140 190, 178 181', w: 14 },
  { d: 'M38 172 C 16 140, 34 98, 70 104 C 104 110, 92 150, 66 146 C 44 142, 52 108, 88 92 C 124 76, 160 96, 158 128 C 156 156, 126 160, 120 140 C 114 120, 146 108, 166 128 C 182 146, 176 172, 150 176', w: 16 },
  { d: 'M76 92 C 68 64, 100 50, 117 64 C 132 77, 119 99, 102 93 C 89 88, 94 71, 109 73', w: 14 },
];
const SQ_SWIRL = [
  { d: 'M50 172 C 68 188, 112 188, 130 178 C 148 166, 134 146, 110 150 C 88 154, 92 178, 114 174', w: 13 },
  { d: 'M28 150 C 22 126, 50 114, 62 128', w: 11 },
  { d: 'M148 96 C 166 82, 184 98, 175 116', w: 11 },
];

export function Mascot({ pose = 'hello', color = 'yolk', swirl, size = 160, animate = true, track = false, ignoreReducedMotion = false, taped = false, style }) {
  const uid = 'sq' + React.useId().replace(/[^a-z0-9]/gi, '');
  const c = MASCOT_COLORS[color] || color;
  const k2 = swirl || MASCOT_SWIRL[color] || 'paper';
  const c2 = MASCOT_COLORS[k2] || k2;
  const ink = 'var(--graphite-900)';
  const ref = React.useRef(null);
  const [look, setLook] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!track) return;
    const mv = (e) => {
      const r = ref.current && ref.current.getBoundingClientRect(); if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.55);
      const d = Math.max(1, Math.hypot(dx, dy)); const k = Math.min(1, d / 260);
      setLook({ x: dx / d * k, y: dy / d * k });
    };
    window.addEventListener('pointermove', mv); return () => window.removeEventListener('pointermove', mv);
  }, [track]);

  const A = (a) => (animate ? a : 'none');
  const drawing = pose === 'printing';
  const strand = (s, col, i) => {
    const st = drawing ? { strokeDasharray: 1, animation: A('sq-draw 3.2s ' + (i * 0.18) + 's cubic-bezier(.5,0,.3,1) infinite') } : null;
    return (
      <g key={col + i}>
        <path d={s.d} pathLength="1" fill="none" stroke={ink} strokeWidth={s.w + 6} strokeLinecap="round" strokeLinejoin="round" style={st} />
        <path d={s.d} pathLength="1" fill="none" stroke={col} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" style={st} />
        <path d={s.d} pathLength="1" fill="none" stroke="rgba(0,0,0,.2)" strokeWidth={s.w * 0.5} strokeLinecap="round" transform="translate(1.5,3)" style={st} />
        <path d={s.d} pathLength="1" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={s.w * 0.24} strokeLinecap="round" transform="translate(-2,-3)" style={st} />
      </g>
    );
  };
  const order = [[SQ_MAIN[0], c], [SQ_SWIRL[1], c2], [SQ_MAIN[1], c], [SQ_SWIRL[0], c2], [SQ_SWIRL[2], c2], [SQ_MAIN[2], c]];
  const arm = (d, col, origin, waving, key, anim) => (
    <g key={key} style={{ transformBox: 'view-box', transformOrigin: origin, animation: anim ? A(anim) : waving ? A('sq-wave 1.1s ease-in-out infinite') : 'none' }}>
      <path d={d} fill="none" stroke={ink} strokeWidth="17" strokeLinecap="round" />
      <path d={d} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round" />
      <path d={d} fill="none" stroke="rgba(0,0,0,.2)" strokeWidth="4" strokeLinecap="round" transform="translate(1.5,2.5)" />
      <path d={d} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2.5" strokeLinecap="round" transform="translate(-1.5,-2)" />
    </g>
  );
  const walking = pose === 'walk';

  const groupAnim = {
    hello: { animation: A('sq-wobble 2.6s ease-in-out infinite') },
    cheer: { animation: A('sq-bounce 1s ease-in-out infinite') },
    oops: { transform: 'scale(1.1,.86)' },
    sleepy: { transform: 'scale(1.14,.72)', animation: A('sq-breathe 3.6s ease-in-out infinite') },
    printing: {},
    shout: { animation: A('sq-shake .4s linear infinite') },
    hips: { animation: A('sq-sway 2.4s ease-in-out infinite') },
    peer: { animation: A('sq-peer 3.4s ease-in-out infinite') },
    walk: { animation: A('sq-walk .9s linear infinite') },
  }[pose] || {};
  const soft = ['hello', 'sleepy', 'hips', 'peer'].includes(pose);

  const lx = walking ? 4 : look.x * 4, ly = pose === 'peer' ? 2 : look.y * 4;
  const closed = pose === 'sleepy';
  const pr = pose === 'oops' ? 4 : 5.5;
  const eye = (cx) => closed
    ? <path d={'M' + (cx - 9) + ' 114 Q ' + cx + ' 122 ' + (cx + 9) + ' 114'} fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
    : pose === 'peer' && cx < 100
    ? <path d={'M' + (cx - 10) + ' 112 h20'} stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
    : <g className="sq-soft" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: A('sq-blink 4.6s infinite') }}>
        <circle cx={cx} cy="112" r={pose === 'peer' ? 16 : 13.5} fill={'url(#' + uid + 'e)'} stroke={ink} strokeWidth="3.5" />
        <circle cx={cx + lx} cy={112 + ly + (pose === 'oops' ? 2 : 0)} r={pose === 'peer' ? 7 : pr} fill={ink} />
        <circle cx={cx + lx - 2} cy={110 + ly} r="1.8" fill="#fff" />
      </g>;
  const mouth = {
    hello: <path d="M90 132 Q 100 142 110 132" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />,
    printing: <ellipse cx="100" cy="135" rx="4.5" ry="5.5" fill={ink} />,
    cheer: <path d="M87 129 Q 100 150 113 129 Z" fill={ink} stroke={ink} strokeWidth="3" strokeLinejoin="round" />,
    oops: <path d="M88 137 q 4 -5 8 0 t 8 0 t 8 0" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />,
    sleepy: <path d="M95 136 h10" stroke={ink} strokeWidth="4" strokeLinecap="round" />,
    shout: <g><ellipse cx="100" cy="138" rx="12" ry="14" fill="var(--graphite-800)" stroke={ink} strokeWidth="3.5" /><ellipse cx="100" cy="146" rx="7" ry="4" fill="var(--mat-pla)" /></g>,
    hips: <path d="M89 131 Q 102 140 112 128" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />,
    peer: <ellipse cx="102" cy="136" rx="4" ry="3.5" fill={ink} />,
    walk: <path d="M91 132 Q 101 140 111 132" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />,
  }[pose];
  const faceY = pose === 'sleepy' ? 24 : pose === 'oops' ? 8 : 0;

  return (
    <div ref={ref} className={ignoreReducedMotion ? 'sq-root-full' : 'sq-root'} role="img" aria-label={"Tab'a the squiggle — " + pose} style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}>
      <style>{SQ_CSS}</style>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id={uid + 'e'} cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#fff" /><stop offset=".7" stopColor="#F3EFE6" /><stop offset="1" stopColor="#CFC8B8" /></radialGradient>
          <radialGradient id={uid + 'g'} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#16161a" stopOpacity=".28" /><stop offset="1" stopColor="#16161a" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="100" cy="190" rx="82" ry="10" fill={'url(#' + uid + 'g)'} />
        {walking && [78, 122].map((x, n) => <g key={x} style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: A('sq-step .9s ease-in-out ' + (n ? '-.45s' : '0s') + ' infinite') }}><ellipse cx={x} cy="188" rx="13" ry="7" fill={c2} stroke={ink} strokeWidth="3.5" /><ellipse cx={x - 3} cy="185.5" rx="5" ry="2" fill="#fff" opacity=".5" /></g>)}
        {drawing && <g>
          <rect x="84" y="0" width="32" height="16" rx="4" fill={ink} />
          <path d="M92 16 h16 l-5 10 h-6 z" fill="var(--yolk-600)" stroke={ink} strokeWidth="2" />
          <g style={{ transformBox: 'fill-box', transformOrigin: 'top', animation: A('sq-drip 3.2s ease-out infinite') }}>
            <path d="M100 28 C 100 48, 96 62, 102 76" fill="none" stroke={ink} strokeWidth="11" strokeLinecap="round" />
            <path d="M100 28 C 100 48, 96 62, 102 76" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>}
        <g style={{ transformBox: 'view-box', transformOrigin: '100px 186px', transform: track && !walking ? 'rotate(' + look.x * 3 + 'deg)' : 'none', transition: 'transform 200ms ease-out' }}>
        <g className={soft ? 'sq-soft' : undefined} style={{ transformBox: 'view-box', transformOrigin: '100px 186px', ...groupAnim }}>
          {order.map(([s, col], i) => strand(s, col, i))}
          {(pose === 'hello' || pose === 'cheer' || pose === 'shout') && arm('M162 124 C 178 112, 174 94, 188 84', c2, '162px 124px', pose === 'hello', 'r')}
          {(pose === 'cheer' || pose === 'shout') && arm('M38 124 C 22 112, 26 94, 12 84', c2, '38px 124px', false, 'l')}
          {pose === 'oops' && <>
            {arm('M160 176 C 174 166, 186 184, 198 174', c, '160px 176px', false, 'o1')}
            {arm('M40 176 C 26 168, 14 186, 2 176', c2, '40px 176px', false, 'o2')}
          </>}
          {pose === 'hips' && <>
            {arm('M40 132 C 12 130, 12 160, 40 162', c2, '40px 132px', false, 'h1')}
            {arm('M160 132 C 188 130, 188 160, 160 162', c2, '160px 132px', false, 'h2')}
          </>}
          {pose === 'peer' && arm('M160 150 C 172 136, 150 126, 132 140', c2, '160px 150px', false, 'p1')}
          {walking && <>
            {arm('M40 128 C 30 140, 26 152, 24 164', c2, '40px 128px', false, 'w1', 'sq-swing .9s ease-in-out infinite')}
            {arm('M160 128 C 170 140, 174 152, 176 164', c2, '160px 128px', false, 'w2', 'sq-swing .9s ease-in-out -.45s infinite')}
          </>}
        </g>
        </g>
        <g style={{ transform: 'translate(' + (walking ? 4 : look.x * 6) + 'px,' + (faceY + look.y * 3) + 'px)', transition: 'transform 120ms ease-out' }}>
          <g className="sq-soft" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: drawing ? A('sq-pop 3.2s ease-out infinite') : pose === 'peer' ? A('sq-peerface 3.4s ease-in-out infinite') : walking ? A('sq-walk .9s linear infinite') : A('sq-float 2.8s ease-in-out infinite') }}>
            {eye(84)}{eye(116)}
            {!taped && mouth}
            {taped && <g aria-hidden style={{ animation: A('gb-tape .35s cubic-bezier(.3,1.5,.5,1) both'), transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect x="77" y="128" width="48" height="14" rx="2" fill="#F4E7C3" stroke={ink} strokeWidth="3" transform="rotate(-14 101 135)" />
              <rect x="79" y="129" width="44" height="12" rx="2" fill="#EFDDAE" stroke={ink} strokeWidth="3" transform="rotate(12 101 135)" />
              <path d="M83 133 h36 M85 138 h30" stroke="rgba(22,22,26,.12)" strokeWidth="1.5" transform="rotate(12 101 135)" />
            </g>}
            {(pose === 'hello' || pose === 'cheer') && <><ellipse cx="68" cy="128" rx="7" ry="4" fill="var(--mat-pla)" opacity=".45" /><ellipse cx="132" cy="128" rx="7" ry="4" fill="var(--mat-pla)" opacity=".45" /></>}
            {(pose === 'oops' || pose === 'shout') && <path d="M140 92 q 6 8 0 12 q -6 -4 0 -12 z" fill="var(--mat-tpu-tint)" stroke="var(--mat-tpu)" strokeWidth="2.5" />}
          </g>
        </g>
        {pose === 'sleepy' && ['z', 'z', 'Z'].map((z, i) => (
          <text key={i} x={140 + i * 12} y={110 - i * 16} style={{ font: '800 ' + (16 + i * 5) + 'px var(--font-mono)', fill: 'var(--graphite-700)', animation: A('sq-z 2.4s ' + i * 0.6 + 's ease-out infinite'), opacity: animate ? 0 : 1, transformBox: 'fill-box' }}>{z}</text>
        ))}
      </svg>
    </div>
  );
}

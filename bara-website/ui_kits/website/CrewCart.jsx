// The crew, part 4: the Goblin hauling the cart across the page.

const CART_GRUMBLE = [
  ['MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'],
  ['Fine. I’ll carry it. Again.', 'طيب. أنا اللي بشيل، كالعادة.'],
  ['Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟'],
  ['My back. My poor back.', 'آه يا ظهري… آه.'],
  ['Coming through! MOVE!', 'وخّروا! وخّروا الطريق!'],
];

const CART_TABA = [
  ['Push! PUSH!', 'دزّ! دزّ!'],
  ['I’m helping! Kind of!', 'أنا أساعد! يعني… تقريبًا!'],
  ['Nice pick by the way!', 'ترا اختيارك حلو!'],
  ['Left! No, your OTHER left!', 'يسار! لا لا، يسارك الثاني!'],
];
if (!window.__crewPtrOn) {
  window.__crewPtrOn = 1;
  window.addEventListener(
    'pointerdown',
    (e) => {
      window.__crewPtr = {x: e.clientX, y: e.clientY, t: Date.now()};
    },
    true,
  );
}

function CartRunner() {
  const i = useLangIdx();
  const [run, setRun] = React.useState(null);
  const muted = useCrewMuted();
  const fly = React.useRef(null);
  React.useEffect(() => {
    const on = (e) => {
      const d = e.detail;
      if (
        d.type === 'cart' &&
        (d.scene === 'run' || d.scene === 'runTogether')
      ) {
        setRun({
          k: Date.now(),
          hex: d.hex || '#F2B705',
          from: d.from,
          both: d.scene === 'runTogether',
          mutter: d.scene === 'runTogether' ? chance(0.5) : chance(0.7),
          line: crewPick(CART_GRUMBLE),
          tl: crewPick(CART_TABA),
        });
        clearTimeout(window.__cr);
        window.__cr = setTimeout(() => setRun(null), 4600);
      }
    };
    window.addEventListener('bara-crew', on);
    return () => window.removeEventListener('bara-crew', on);
  }, []);
  React.useEffect(() => {
    const el = fly.current;
    if (!run || !el) return;
    const rtl = document.documentElement.dir === 'rtl';
    const W = window.innerWidth;
    const H = window.innerHeight;
    const off = 52 + (run.both ? 66 : 0);
    const tx = rtl ? W / 2 - off : W / 2 + off;
    const ty = H - 150;
    const fx = run.from ? run.from.x : W / 2;
    const fy = run.from ? run.from.y : H * 0.4;
    const dx = tx - fx;
    const dy = ty - fy;
    const peak = Math.min(0, dy) - 140;
    el.style.left = fx - 20 + 'px';
    el.style.top = fy - 16 + 'px';
    el.animate(
      [
        {transform: 'translate(0,0) scale(.6)', opacity: 0},
        {
          transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)',
          opacity: 1,
          offset: 0.12,
        },
        {
          transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)',
          opacity: 1,
          offset: 0.55,
        },
        {
          transform: `translate(${dx * 0.5}px,${peak}px) scale(1.05) rotate(160deg)`,
          offset: 0.78,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`,
          opacity: 1,
          offset: 0.98,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`,
          opacity: 0,
        },
      ],
      {duration: 2000, easing: 'cubic-bezier(.4,0,.3,1)', fill: 'forwards'},
    );
  }, [run && run.k]);
  if (!run) return null;
  const rm = false;
  const rtl = document.documentElement.dir === 'rtl';
  const flip = rtl ? {transform: 'scaleX(-1)'} : null;
  const pile = [
    ['box', '#EAE3D2', -8, 0, 0],
    ['spool', '#E8367A', 6, 44, 0],
    ['box', '#F2B705', 10, 92, 0],
    ['spool', '#12A5A0', -12, 20, 34],
    ['box', '#2F6BFF', 4, 66, 30],
    ['spool', '#232327', -4, 108, 26],
  ];
  const piece = ([k, col, rot, x, y], n, extra) =>
    k === 'box' ? (
      <span
        key={n}
        style={{
          position: 'absolute',
          left: x,
          bottom: y,
          width: 40,
          height: 32,
          background: col,
          border: '2.5px solid var(--graphite-900)',
          borderRadius: 6,
          transform: 'rotate(' + rot + 'deg)',
          backgroundImage: 'var(--tex-layers)',
          ...extra,
        }}
      />
    ) : (
      <span
        key={n}
        style={{
          position: 'absolute',
          left: x,
          bottom: y,
          width: 36,
          height: 36,
          background: col,
          border: '2.5px solid var(--graphite-900)',
          borderRadius: 99,
          transform: 'rotate(' + rot + 'deg)',
          ...extra,
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: 99,
            background: 'var(--paper-0)',
            border: '2.5px solid var(--graphite-900)',
          }}
        />
      </span>
    );
  return (
    <>
      <span
        key={'f' + run.k}
        ref={fly}
        aria-hidden
        style={{
          position: 'fixed',
          zIndex: 46,
          pointerEvents: 'none',
          width: 40,
          height: 32,
          background: run.hex,
          border: '2.5px solid var(--graphite-900)',
          borderRadius: 6,
          backgroundImage: 'var(--tex-layers)',
          boxShadow: 'var(--shadow-hard-sm)',
          opacity: 0,
        }}
      />
      <div
        key={run.k}
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 6,
          zIndex: 45,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4,
          ...(rm
            ? {
                [rtl ? 'right' : 'left']: 'calc(50vw - 150px)',
                animation: 's-fadepark 3s ease both',
              }
            : {
                animation:
                  (rtl ? 's-cartrun-rtl' : 's-cartrun') +
                  ' 4.4s cubic-bezier(.45,.05,.4,1) forwards',
              }),
        }}
      >
        <div style={{position: 'relative'}}>
          {run.mutter && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                insetInlineStart: 10,
                marginBottom: 4,
                width: 'max-content',
                maxWidth: 240,
              }}
            >
              <B.SpeechBubble
                tone="shout"
                who={i ? 'وحش اللخبطة' : 'Mess Goblin'}
              >
                {muted
                  ? i
                    ? 'ممف ممف!'
                    : 'Mmph mmph!'
                  : i
                    ? run.line[1]
                    : run.line[0]}
              </B.SpeechBubble>
            </div>
          )}
          <B.Goblin
            mood="push"
            ignoreReducedMotion
            size={120}
            style={flip}
            taped={muted}
          />
        </div>
        {run.both && (
          <div style={{position: 'relative', order: -1, marginInlineEnd: -30}}>
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                insetInlineEnd: 20,
                marginBottom: 72,
                width: 'max-content',
                maxWidth: 200,
              }}
            >
              <B.SpeechBubble tone="cheer" who={i ? 'طبعة' : 'Tab’a'}>
                {muted
                  ? i
                    ? 'مم-ممف!'
                    : 'Mm-mmph!'
                  : i
                    ? run.tl[1]
                    : run.tl[0]}
              </B.SpeechBubble>
            </div>
            <B.Mascot
              pose="walk"
              ignoreReducedMotion
              size={96}
              style={flip}
              taped={muted}
            />
          </div>
        )}
        <div
          style={{
            position: 'relative',
            width: 156,
            height: 150,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 4,
              right: 4,
              bottom: 34,
              height: 110,
            }}
          >
            {pile.map((p, n) => piece(p, n))}
            {piece(['box', run.hex, 6, 54, 62], 'new', {
              width: 46,
              height: 38,
              animation: rm
                ? 's-fadein .4s .7s both'
                : 's-land .3s 1.95s cubic-bezier(.3,1.4,.5,1) both',
            })}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 20,
              height: 56,
              background: 'var(--paper-0)',
              border: '3px solid var(--graphite-900)',
              borderRadius: '4px 4px 16px 16px',
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0 22px, var(--graphite-900) 22px 24px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              insetInlineStart: -22,
              bottom: 64,
              width: 30,
              height: 6,
              background: 'var(--graphite-900)',
              borderRadius: 3,
              transform: 'rotate(' + (rtl ? 20 : -20) + 'deg)',
            }}
          />
          {[18, 118].map((x) => (
            <span
              key={x}
              style={{
                position: 'absolute',
                left: x,
                bottom: 0,
                width: 22,
                height: 22,
                borderRadius: 99,
                background: 'var(--graphite-900)',
                boxShadow:
                  'inset 0 0 0 6px var(--graphite-900), inset 0 0 0 10px var(--paper-2)',
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

Object.assign(window, {CartRunner});

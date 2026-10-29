// The crew, part 5: peeking in from the page edges, per page context.

const crewRoute = () =>
  window.__peekCtx ||
  location.hash.replace(/^#\/?/, '').split('/')[0] ||
  'home';

function peekHost(el) {
  let clip = null;
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (getComputedStyle(n).overflow !== 'visible') clip = n;
  }
  return clip ? clip.parentElement || document.body : el;
}

function PeekCrew() {
  const crewT = useCrewThread(true, false, 4, true);
  const muted = useCrewMuted();
  const [peek, setPeek] = React.useState(null);
  const [, force] = React.useState(0);
  const peekRef = React.useRef(null);
  peekRef.current = peek;
  const vw = useVW();
  const sz = vw < 640 ? 64 : 92;
  React.useEffect(() => {
    let t;
    const rtl = () => document.documentElement.dir === 'rtl';
    const schedule = (ms) => {
      clearTimeout(t);
      t = setTimeout(tryPeek, ms);
    };
    const tryPeek = () => {
      if (Date.now() < (window.__crewAway || 0) || document.hidden) {
        return schedule(8000);
      }
      const H = innerHeight;
      const W = innerWidth;
      const els = Array.from(
        document.querySelectorAll(
          window.__peekSel ||
            'main .s-squish, main .s-g4 > *, main [data-peek], main [style*="border: 2px solid var(--graphite-900)"]',
        ),
      )
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 160 &&
            r.height > 110 &&
            r.top > 90 &&
            r.top < H - 120 &&
            r.left > -10 &&
            r.right < W + 10 &&
            !el.closest('.s-dock')
          );
        })
        .filter(
          (el, n, arr) =>
            !arr.some(
              (o) =>
                o !== el &&
                o.contains(el) &&
                o.getBoundingClientRect().height < innerHeight * 0.9,
            ),
        );
      if (!els.length) return schedule(9000);
      const narrow = W < 640;
      const roomTop = 72 + sz * 0.8 + 90; // header + character + bubble room
      const okTop = (el) => el.getBoundingClientRect().top > roomTop;
      const pool = els.filter(okTop);
      if (!pool.length) return schedule(7000);
      const a = crewPick(pool);
      let b = a;
      const ra = a.getBoundingClientRect();
      if (narrow) {
        const other = pool.filter(
          (x) =>
            x !== a &&
            Math.abs(x.getBoundingClientRect().top - ra.top) > ra.height * 0.6,
        );
        if (other.length) b = crewPick(other);
      } else if (pool.length > 1 && chance(0.6)) {
        const far = pool.filter((x) => {
          if (x === a) return false;
          const r = x.getBoundingClientRect();
          return (
            Math.abs(r.top - ra.top) > ra.height * 0.6 ||
            Math.abs(r.left + r.width / 2 - (ra.left + ra.width / 2)) > 300
          );
        });
        if (far.length) b = crewPick(far);
      }
      const first = chance(0.5) ? 'g' : 't';
      const sideFor = (el) => {
        const r = el.getBoundingClientRect();
        const opts = ['top', 'top', 'top'];
        if (r.left > sz + 12) opts.push('left');
        if (W - r.right > sz + 12) opts.push('right');
        return crewPick(opts);
      };
      const same = a === b;
      // narrow + one row only → single peeker (no collision possible)
      const solo = same && (narrow || ra.width < 300 + sz);
      const slotFor = (el) => {
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2 < W / 2 ? 0.3 : 0.7;
      };
      const spots = solo
        ? [{el: a, side: 'top', slot: slotFor(a), half: true}, null]
        : same
          ? [
              {el: a, side: 'top', slot: 0.2, halfTile: true},
              {el: a, side: 'top', slot: 0.8, halfTile: true},
            ]
          : narrow
            ? [
                {el: a, side: 'top', slot: slotFor(a), half: true},
                {el: b, side: 'top', slot: slotFor(b), half: true},
              ]
            : [
                {el: a, side: 'top', slot: 0.3 + Math.random() * 0.4},
                {el: b, side: 'top', slot: 0.3 + Math.random() * 0.4},
              ];
      if (first === 't') spots.reverse();
      spots.forEach((s) => {
        if (s) s.host = peekHost(s.el);
      });
      if (!spots[1]) {
        const s0 = spots[0];
        setPeek({
          k: Date.now(),
          g: first === 'g' ? s0 : null,
          t: first === 't' ? s0 : null,
          out: false,
        });
      } else setPeek({k: Date.now(), g: spots[0], t: spots[1], out: false});
      window.__peekSolo = !spots[1] ? first : null;
      window.__crewAway = Date.now() + 60000;
      window.dispatchEvent(new CustomEvent('bara-away'));
      const route = crewRoute();
      const pv = {};
      if (route === 'product') {
        const id = location.hash.split('/')[2];
        const p = (window.SITE_PRODUCTS || []).find((x) => x.id === id);
        if (p) {
          pv.part = p.en;
          pv['part:ar'] = p.ar;
        }
      }
      const ctxPool = CREW_PEEK_CTX[route];
      const tree =
        ctxPool && chance(0.7) ? crewPick(ctxPool) : crewPick(CREW_PEEK);
      setTimeout(
        () =>
          !spots[1]
            ? crewT.say([[first, ...crewPick(CREW_PEEK_SOLO[first])]], pv)
            : crewT.say(crewWalk(tree, crewVars(pv))),
        650,
      );
    };
    window.__peekNext = () => schedule(0);
    schedule(9000 + Math.random() * 8000);
    const end = () => {
      setPeek((p) => (p ? {...p, out: true} : p));
      setTimeout(() => {
        setPeek(null);
        window.__crewAway = Date.now() + 400;
        window.dispatchEvent(new CustomEvent('bara-away'));
        schedule(28000 + Math.random() * 22000);
      }, 520);
    };
    window.__peekEnd = end;
    const onCart = (e) => {
      if (e.detail.type === 'cart' && peekRef.current && !peekRef.current.out) {
        setPeek((p) => (p ? {...p, out: true} : p));
        setTimeout(() => {
          setPeek(null);
          schedule(30000 + Math.random() * 20000);
        }, 520);
      }
    };
    window.addEventListener('bara-crew', onCart);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-crew', onCart);
    };
  }, []);
  // Anchor: render inside each target tile so they scroll with it natively (no
  // per-frame repositioning).
  React.useEffect(() => {
    if (!peek) return;
    const sp = [peek.g, peek.t].filter(Boolean);
    const els = [...new Set(sp.map((s) => s.host))];
    const saved = els.map((el) => [el.style.position, el.style.zIndex]);
    els.forEach((el) => {
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      if (sp.some((s) => s.host === el && s.el === el)) el.style.zIndex = '30';
    });
    const a = setTimeout(() => force((x) => x + 1), 80);
    const b = setTimeout(() => force((x) => x + 1), 300);
    const sc = (e) => {
      if (e.target !== document && e.target !== document.documentElement) {
        force((x) => x + 1);
      }
    };
    window.addEventListener('scroll', sc, true);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      window.removeEventListener('scroll', sc, true);
      els.forEach((el, n) => {
        el.style.position = saved[n][0];
        el.style.zIndex = saved[n][1];
      });
    };
  }, [peek && peek.k]);
  React.useEffect(() => {
    if (peek && peek.out) force((x) => x + 1);
  }, [peek && peek.out]);
  // finish when the argument is over or the tile scrolls away
  React.useEffect(() => {
    if (!peek || peek.out) return;
    const iv = setInterval(() => {
      const sp = [peek.g, peek.t].filter(Boolean);
      const gone = sp.some((s) => {
        const r = s.el.getBoundingClientRect();
        return r.bottom < 60 || r.top > innerHeight - 20 || !s.el.isConnected;
      });
      const th = crewT.thread;
      const idleDone =
        Date.now() - peek.k > 2500 &&
        !crewT.q.current.length &&
        (!th.length || Date.now() - th[th.length - 1].k > 2600);
      if (gone || idleDone) window.__peekEnd();
    }, 400);
    return () => clearInterval(iv);
  }, [peek, crewT.thread]);
  if (!peek) return null;
  const rtl = document.documentElement.dir === 'rtl';
  const W = innerWidth;
  const lg = crewT.last('g');
  const lt = crewT.last('t');
  const latest = crewT.thread.slice(-2).map((x) => x.k);
  const one = (who, spot, line) => {
    const el = spot.el;
    const host = spot.host || el;
    const r = el.getBoundingClientRect();
    const hr = host.getBoundingClientRect();
    const s = spot.side;
    const Wd = r.width;
    const dx = host === el ? 0 : r.left - hr.left + host.scrollLeft;
    const dy = host === el ? 0 : r.top - hr.top + host.scrollTop;
    const box =
      s === 'top'
        ? {
            left: Wd * spot.slot - sz / 2,
            top: -sz * 0.78,
            width: sz,
            height: sz * 0.78,
          }
        : s === 'left'
          ? {left: -sz * 0.72, top: 40, width: sz * 0.72, height: sz}
          : {left: Wd, top: 40, width: sz * 0.72, height: sz};
    const hide =
      s === 'top'
        ? 'translateY(100%)'
        : s === 'left'
          ? 'translateX(100%)'
          : 'translateX(-100%)';
    const shown = !peek.out && Date.now() - peek.k > (who === 'g' ? 60 : 260);
    const cxRel = box.left + box.width / 2;
    const tailLeft = spot.halfTile ? spot.slot < 0.5 : r.left + cxRel < W / 2;
    const bub = line && latest.includes(line.k) && shown;
    const items = [];
    if (bub) {
      const th = crewT.thread;
      let n = th.length - 1;
      while (n >= 0 && th[n].w !== who) n--;
      let m = n;
      while (m > 0 && th[m - 1].w === who) m--;
      for (let j = m; j <= n; j++) items.push(th[j]);
    }
    const i = document.documentElement.lang === 'ar' ? 1 : 0;
    const bw = spot.half
      ? Math.floor(W / 2 - 16)
      : spot.halfTile
        ? Math.max(150, Math.floor(Wd / 2 + sz * 0.3))
        : 260;
    return ReactDOM.createPortal(
      <React.Fragment>
        <div
          onClick={crewClick}
          title="Tape"
          style={{
            position: 'absolute',
            ...box,
            left: box.left + dx,
            top: box.top + dy,
            overflow: 'hidden',
            zIndex: host === el ? 2 : 60,
            pointerEvents: shown ? 'auto' : 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: sz,
              height: sz,
              transform: shown ? 'none' : hide,
              transition: 'transform .45s cubic-bezier(.3,1.35,.5,1)',
              marginLeft: s === 'right' ? -sz * 0.28 : 0,
            }}
          >
            {who === 'g' ? (
              <B.Goblin
                mood={lg ? gMood(lg.mood) : 'peer'}
                size={sz}
                track
                taped={muted}
              />
            ) : (
              <B.Mascot
                pose={lt ? tPose(lt.mood) : 'peer'}
                size={sz}
                track
                taped={muted}
              />
            )}
          </div>
        </div>
        {items.length > 0 && (
          <div
            style={{
              position: 'absolute',
              zIndex: host === el ? 3 : 61,
              pointerEvents: 'none',
              top: box.top + dy - 6,
              transform: 'translateY(-100%)',
              [tailLeft ? 'left' : 'right']: tailLeft
                ? cxRel + dx - 29
                : (host === el ? Wd : hr.width) - (cxRel + dx) - 29,
              width: 'max-content',
              display: 'flex',
              flexDirection: 'column',
              alignItems: tailLeft ? 'flex-start' : 'flex-end',
              gap: 4,
              maxWidth: bw,
            }}
          >
            {items.map((l, n) => (
              <div
                key={l.k}
                style={{
                  animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards',
                }}
              >
                <B.SpeechBubble
                  tone={crewTone(l)}
                  who={
                    n
                      ? undefined
                      : who === 'g'
                        ? i
                          ? 'وحش اللخبطة'
                          : 'Goblin'
                        : i
                          ? 'طبعة'
                          : 'Tab’a'
                  }
                  tail={
                    n === items.length - 1
                      ? tailLeft !== rtl
                        ? 'bottom-start'
                        : 'bottom-end'
                      : 'none'
                  }
                  style={{maxWidth: bw, animation: 'none'}}
                >
                  {i ? l.ar : l.en}
                </B.SpeechBubble>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>,
      host,
      who,
    );
  };
  return (
    <>
      {peek.g && one('g', peek.g, lg)}
      {peek.t && one('t', peek.t, lt)}
    </>
  );
}

Object.assign(window, {PeekCrew});

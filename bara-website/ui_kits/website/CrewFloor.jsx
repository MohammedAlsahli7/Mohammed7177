// The crew, part 3: the corner dock and the live print floor (real queue, no
// customer data).

const tPose = (m) =>
  ['shout', 'oops', 'cheer', 'hips', 'peer', 'walk'].includes(m) ? m : 'hello';

const gMood = (m) =>
  [
    'shout',
    'busy',
    'approve',
    'judge',
    'hips',
    'peer',
    'walk',
    'push',
  ].includes(m)
    ? m
    : 'judge';

const T_IDLE = ['hello', 'hips', 'peer', 'hello'];

const G_IDLE = ['judge', 'hips', 'peer', 'judge'];

function useIdle(n) {
  const [k, setK] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(
      () => setK((x) => x + 1),
      5200 + Math.random() * 2400,
    );
    return () => clearInterval(t);
  }, []);
  return k % n;
}

function CrewDock() {
  const {thread, last} = useCrewThread(true, true, 4);
  const i = useLangIdx();
  const vw = useVW();
  const quiet = false;
  const muted = useCrewMuted();
  const idle = useIdle(4);
  const [away, setAway] = React.useState(false);
  React.useEffect(() => {
    let t;
    const on = (e) => {
      const d = e.detail;
      if (
        d.type === 'cart' &&
        (d.scene === 'run' || d.scene === 'runTogether')
      ) {
        window.__crewAway = Date.now() + 4800;
        setAway(true);
        clearTimeout(t);
        t = setTimeout(() => setAway(false), 4800);
      }
    };
    window.addEventListener('bara-crew', on);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-crew', on);
    };
  }, []);
  React.useEffect(() => {
    let t;
    const chk = () => {
      const left = (window.__crewAway || 0) - Date.now();
      setAway(left > 0);
      clearTimeout(t);
      if (left > 0) t = setTimeout(chk, Math.min(left, 2000) + 20);
    };
    window.addEventListener('bara-away', chk);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-away', chk);
    };
  }, []);
  const sz = vw < 640 ? 56 : 76;
  const lg = last('g');
  const lt = last('t');
  const speaking = thread.length ? thread[thread.length - 1].w : null;
  return (
    <div
      className="s-dock"
      style={{
        position: 'fixed',
        insetInlineEnd: 12,
        bottom: 12,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        pointerEvents: 'none',
        opacity: away ? 0 : 1,
        transform: away ? 'translateY(24px)' : 'none',
        transition: 'opacity .35s, transform .35s',
        visibility: away ? 'hidden' : 'visible',
      }}
    >
      {!quiet && (
        <CrewThread
          thread={thread}
          maxWidth={vw < 640 ? 210 : 260}
          lay={{
            g: {end: true, off: 12 + sz * 1.3 + 'px'},
            t: {end: true, off: 12 + sz * 0.5 + 'px'},
          }}
        />
      )}
      <button
        onClick={crewClick}
        title={muted ? 'Take the tape off' : 'Tape their mouths'}
        aria-label={muted ? 'Unmute the crew' : 'Mute the crew'}
        aria-pressed={muted}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0,
          border: '2px solid var(--graphite-900)',
          borderRadius: 999,
          background: 'var(--paper-0)',
          padding: '4px 10px 0',
          boxShadow: 'var(--shadow-hard-sm)',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            transform: speaking === 'g' ? 'translateY(-3px)' : 'none',
            transition: 'transform .2s',
          }}
        >
          <B.Goblin
            mood={lg ? gMood(lg.mood) : G_IDLE[idle]}
            size={sz}
            track
            taped={muted}
          />
        </div>
        <div
          style={{
            marginInlineStart: -sz * 0.2,
            transform: speaking === 't' ? 'translateY(-3px)' : 'none',
            transition: 'transform .2s',
          }}
        >
          <B.Mascot
            taped={muted}
            pose={lt ? tPose(lt.mood) : T_IDLE[(idle + 2) % 4]}
            size={sz}
            track
          />
        </div>
      </button>
    </div>
  );
}

const floorRows = (d) =>
  (Array.isArray(d) ? d : (d && (d.orders || d.items)) || []).slice(0, 6);

function CrewFloor() {
  const t = useT();
  const i = useLangIdx();
  const crewT = useCrewThread(true, false, 5);
  const muted = useCrewMuted();
  const [orders, setOrders] = React.useState([]);
  const prev = React.useRef({});
  React.useEffect(() => {
    const say = (seq, id) => {
      if (seq.length) {
        crewT.q.current = [];
        crewQueue(crewT.q.current, crewFill(seq, id ? {id} : {}));
      }
    };
    say(crewWalk(CREW_AMBIENT[0]));
    const stop = baraApi.poll('floor', baraApi.config.floorPollMs, (data) => {
      if (!data) return;
      const rows = floorRows(data);
      let ev = null;
      rows.forEach((o) => {
        const was = prev.current[o.id];
        if (
          !ev &&
          was &&
          was !== o.status &&
          (o.status === 'done' || o.status === 'failed')
        ) {
          ev = [o.status === 'done' ? 'done' : 'fail', o.id];
        }
      });
      prev.current = Object.fromEntries(rows.map((o) => [o.id, o.status]));
      setOrders(rows);
      if (ev) say(crewReaction(ev[0]), ev[1]);
    });
    const talk = setInterval(() => {
      if (!crewT.q.current.length && Math.random() < 0.5) {
        crewQueue(crewT.q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT))));
      }
    }, 5200);
    return () => {
      stop();
      clearInterval(talk);
    };
  }, []);
  const live = orders.length > 0;
  const st = {
    printing: ['info', ['Printing', 'تنطبع']],
    queued: ['neutral', ['Queued', 'بالانتظار']],
    done: ['success', ['Done', 'خلص']],
    failed: ['danger', ['Spaghetti', 'خربت']],
  };
  const stOf = (o) => st[o.status] || st.queued;
  const g = crewT.last('g');
  const tb = crewT.last('t');
  return (
    <section className="s-section s-wrap">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {live ? (
            <span
              style={{
                ...smMono,
                color: 'var(--danger)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  background: 'var(--danger)',
                  boxShadow: '0 0 0 4px var(--danger-tint)',
                }}
              />
              {t(['Live from the floor', 'مباشر من الورشة'])}
            </span>
          ) : (
            <span style={{...smMono, color: 'var(--fg-3)'}}>
              {t(SITE.sys.floorIdle)}
            </span>
          )}
          <PrintText>
            {t([
              'Two workers. Six printers. Zero chill.',
              'اثنين يشتغلون. ست طابعات. ولا لحظة راحة.',
            ])}
          </PrintText>
        </div>
        {live && (
          <span style={{...smMono, fontSize: 10.5, color: 'var(--fg-3)'}}>
            {t(SITE.sys.floorNoInfo)}
          </span>
        )}
      </div>
      <div
        className={live ? 's-split' : undefined}
        style={{alignItems: 'stretch'}}
      >
        <div
          style={{
            position: 'relative',
            border: '2px solid var(--graphite-900)',
            borderRadius: 24,
            background: 'var(--paper-0)',
            backgroundImage: 'var(--tex-bed)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            padding: '230px 16px 20px',
            minHeight: 440,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 16,
              bottom: 206,
              insetInlineStart: 16,
              insetInlineEnd: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              overflow: 'hidden',
            }}
          >
            <CrewThread
              thread={crewT.thread}
              maxWidth={300}
              full
              lay={{g: {end: false, off: '25%'}, t: {end: true, off: '25%'}}}
            />
          </div>
          <div onClick={crewClick} style={{cursor: 'pointer'}} title="Tape">
            <B.Goblin
              mood={g ? gMood(g.mood) : 'busy'}
              size={180}
              taped={muted}
            />
          </div>
          <div onClick={crewClick} style={{cursor: 'pointer'}} title="Tape">
            <B.Mascot
              pose={tb ? tPose(tb.mood) : 'printing'}
              size={180}
              taped={muted}
            />
          </div>
        </div>
        {live && (
          <div
            style={{
              border: '2px solid var(--graphite-900)',
              borderRadius: 24,
              background: 'var(--graphite-900)',
              color: 'var(--paper-0)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minWidth: 0,
            }}
          >
            {orders.map((o) => {
              const p = SITE_PRODUCTS.find((x) => x.id === o.item);
              const name = p
                ? [p.en, p.ar]
                : o.name
                  ? [o.name.en || o.name, o.name.ar || o.name.en || o.name]
                  : [String(o.item || ''), String(o.item || '')];
              const pct = o.total ? Math.round((o.layer / o.total) * 100) : 0;
              return (
                <div
                  key={o.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto minmax(0,1fr) auto',
                    gap: 12,
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: 14,
                    background:
                      o.status === 'failed'
                        ? 'rgba(212,42,42,.18)'
                        : 'var(--graphite-800)',
                  }}
                >
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 99,
                      background: o.hex,
                      border: '2px solid var(--paper-0)',
                    }}
                  />
                  <div
                    style={{
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'baseline',
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          ...smMono,
                          fontSize: 10.5,
                          color: 'var(--yolk-300)',
                        }}
                      >
                        {o.id}
                      </span>
                      <span
                        style={{
                          font: '600 14px/1.2 var(--font-body)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {t(name)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        background: 'var(--graphite-700)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: pct + '%',
                          height: '100%',
                          background:
                            o.status === 'failed'
                              ? 'var(--danger)'
                              : o.status === 'done'
                                ? 'var(--success)'
                                : 'var(--yolk-500)',
                          transition: 'width 1.1s linear',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        ...smMono,
                        fontSize: 9.5,
                        color: 'var(--graphite-400)',
                      }}
                    >
                      P{o.printer} · L {o.layer}/{o.total}
                    </span>
                  </div>
                  <B.Badge tone={stOf(o)[0]} dot>
                    {t(stOf(o)[1])}
                  </B.Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, {CrewDock, CrewFloor});

const SRC_META = {
  makerworld: {
    name: 'MakerWorld',
    bg: 'var(--mat-loop)',
    fg: 'var(--graphite-900)',
  },
  printables: {name: 'Printables', bg: 'var(--mat-pla)', fg: '#fff'},
};
function SourceChip({p, size = 'sm'}) {
  const m = SRC_META[p.src];
  if (!m) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        font: '700 ' + (size === 'lg' ? 12 : 10.5) + 'px/1 var(--font-mono)',
        letterSpacing: '.04em',
        padding: size === 'lg' ? '7px 10px 6px' : '5px 8px 4px',
        borderRadius: 999,
        background: m.bg,
        color: m.fg,
        border: '2px solid var(--graphite-900)',
        whiteSpace: 'nowrap',
      }}
    >
      {m.name}
    </span>
  );
}
function ProductTile({p, go, add}) {
  const t = useT();
  const C = SITE.community;
  const shot = useModelShot(
    p.id,
    p.hex ||
      {
        pla: '#E8367A',
        yolk: '#F2B705',
        tpu: '#2F6BFF',
        petg: '#12A5A0',
        paper: '#F2B705',
      }[p.tone] ||
      ((SITE_COLOURS[p.mats[0]] || [])[0] || ['#F2B705'])[0],
  );
  return (
    <div className="s-squish" style={{position: 'relative'}}>
      {p.src && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            insetInlineStart: 10,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <SourceChip p={p} />
        </div>
      )}
      <B.ProductCard
        title={t([p.en, p.ar])}
        price={p.price}
        materials={p.mats}
        spec={p.spec}
        badge={p.badge && t(p.badge)}
        badgeTone={
          p.mats[0] === 'tpu'
            ? 'tpu'
            : p.mats[0] === 'petg' && p.badge
              ? 'petg'
              : 'brand'
        }
        image={shot || undefined}
        imageTone={p.tone}
        onClick={() => go('product', p.id)}
        onAdd={() => add(p)}
      />
      {p.src && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            marginTop: 8,
            padding: '0 4px',
            ...smMono,
            fontSize: 10.5,
            color: 'var(--fg-2)',
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {t(C.by)} {p.by}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <B.Icon name="heart" size={12} />
            {p.likes}
          </span>
        </div>
      )}
    </div>
  );
}

function MaterialScroll({go}) {
  const t = useT();
  const M = SITE.mats;
  const [active, setActive] = React.useState('pla');
  const refs = {
    pla: React.useRef(null),
    petg: React.useRef(null),
    tpu: React.useRef(null),
  };
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.mat);
        }),
      {rootMargin: '-45% 0px -45% 0px'},
    );
    Object.values(refs).forEach((r) => r.current && io.observe(r.current));
    return () => io.disconnect();
  }, []);
  const vw = useVW();
  return (
    <section className="s-section">
      <div
        className="s-wrap s-split"
        style={{
          gridTemplateColumns:
            vw > 980 ? 'minmax(0,1fr) minmax(0,1fr)' : undefined,
        }}
      >
        <div
          className="s-sticky"
          style={{display: 'flex', flexDirection: 'column', gap: 20}}
        >
          <PrintText>{t(M.title)}</PrintText>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div style={{transition: 'filter .3s'}}>
              <B.Mascot
                pose="hello"
                color={active}
                size={vw > 980 ? 300 : 160}
                track
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: vw > 980 ? 'column' : 'row',
                gap: 10,
              }}
            >
              {['pla', 'petg', 'tpu'].map((k) => (
                <B.Tag
                  key={k}
                  material={k}
                  selected={active === k}
                  onClick={() =>
                    refs[k].current &&
                    window.scrollTo({
                      top:
                        refs[k].current.getBoundingClientRect().top +
                        window.scrollY -
                        200,
                      behavior: 'smooth',
                    })
                  }
                  style={{height: 34, padding: '0 12px'}}
                >
                  {B.MATERIALS[k].name}
                </B.Tag>
              ))}
            </div>
          </div>
        </div>
        <div>
          {['pla', 'petg', 'tpu'].map((k) => {
            const m = B.MATERIALS[k];
            return (
              <div key={k} ref={refs[k]} data-mat={k} className="s-matpanel">
                <div
                  className="s-squish"
                  style={{
                    width: '100%',
                    border: '2px solid var(--graphite-900)',
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: m.tint,
                    boxShadow:
                      active === k
                        ? 'var(--shadow-hard-lg)'
                        : 'var(--shadow-hard)',
                    transition:
                      'box-shadow .3s, transform .38s var(--ease-spring)',
                  }}
                >
                  <div
                    style={{
                      height: 140,
                      background: m.color,
                      backgroundImage: 'var(--tex-layers-strong)',
                      borderBottom: '2px solid var(--graphite-900)',
                      padding: 24,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      color: '#fff',
                    }}
                  >
                    <span
                      style={{
                        font: '800 72px/.8 var(--font-display)',
                        letterSpacing: '-.03em',
                      }}
                    >
                      {m.name}
                    </span>
                    <span
                      style={{
                        ...smMono,
                        background: 'var(--graphite-900)',
                        padding: '6px 8px 5px',
                        borderRadius: 6,
                      }}
                    >
                      {m.temp}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      color: m.ink,
                    }}
                  >
                    <b style={{font: '800 24px/1.1 var(--font-display)'}}>
                      {t(M[k][0])}
                    </b>
                    <p
                      style={{margin: 0, font: '500 17px/1.5 var(--font-body)'}}
                    >
                      {t(M[k][1])}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <B.Button
            variant="secondary"
            iconRight="arrow-right"
            onClick={() => go('materials')}
          >
            {t(M.cta)}
          </B.Button>
        </div>
      </div>
    </section>
  );
}

function HomePage({go, add}) {
  const t = useT();
  const H = SITE.hero;
  const i = useLangIdx();
  const house = SITE_PRODUCTS.filter((p) => !p.src);
  const community = SITE_PRODUCTS.filter((p) => p.src);
  return (
    <div>
      <section
        style={{
          background: 'var(--yolk-500)',
          borderBottom: '2px solid var(--graphite-900)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--tex-layers)',
          }}
        />
        <div
          className="s-wrap s-hero"
          style={{position: 'relative', padding: '56px 24px 48px'}}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
            <span style={{...smMono}}>{t(H.over)}</span>
            <PrintText as="h1" className="s-display">
              {t(H.title)}
            </PrintText>
            <Rise delay={500}>
              <p className="s-lead" style={{color: 'var(--graphite-900)'}}>
                {t(H.sub)}
              </p>
            </Rise>
            <Rise
              delay={700}
              style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}
            >
              <B.Button
                size="lg"
                variant="ink"
                iconRight={i ? 'arrow-left' : 'arrow-right'}
                onClick={() => go('shop')}
              >
                {t(H.shop)}
              </B.Button>
              <B.Button
                size="lg"
                variant="secondary"
                icon="upload"
                onClick={() => go('custom')}
              >
                {t(H.upload)}
              </B.Button>
            </Rise>
          </div>
          <HeroBlob />
        </div>
      </section>
      <Marquee items={i ? SITE.marqueeAr : SITE.marquee} />

      <section className="s-section s-wrap">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <PrintText>{t(SITE.fresh.title)}</PrintText>
          <B.Button
            variant="ghost"
            iconRight={i ? 'arrow-left' : 'arrow-right'}
            onClick={() => go('shop')}
          >
            {t(SITE.fresh.all)}
          </B.Button>
        </div>
        <div className="s-g4">
          {house.slice(0, 4).map((p, k) => (
            <Rise key={p.id} delay={k * 80}>
              <ProductTile p={p} go={go} add={add} />
            </Rise>
          ))}
        </div>
      </section>
      {community.length > 0 && (
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxWidth: 640,
              }}
            >
              <span style={{...smMono, color: 'var(--fg-3)'}}>
                {t(SITE.community.over)}
              </span>
              <PrintText>{t(SITE.community.title)}</PrintText>
              <p
                style={{
                  margin: 0,
                  font: '500 16px/1.5 var(--font-body)',
                  color: 'var(--fg-2)',
                  textWrap: 'pretty',
                }}
              >
                {t(SITE.community.sub)}
              </p>
            </div>
            <B.Button
              variant="ghost"
              iconRight={i ? 'arrow-left' : 'arrow-right'}
              onClick={() => go('shop', 'community')}
            >
              {t(SITE.fresh.all)}
            </B.Button>
          </div>
          <div className="s-g4">
            {community.slice(0, 4).map((p, k) => (
              <Rise key={p.id} delay={k * 80}>
                <ProductTile p={p} go={go} add={add} />
              </Rise>
            ))}
          </div>
        </section>
      )}

      <section className="s-section s-wrap">
        <PrintText style={{marginBottom: 28}}>{t(SITE.how.title)}</PrintText>
        <div className="s-g4">
          {SITE.how.steps.map(([h, b], k) => (
            <Rise key={k} delay={k * 90}>
              <div
                className="s-squish"
                style={{
                  height: '100%',
                  border: '2px solid var(--graphite-900)',
                  borderRadius: 20,
                  background:
                    k === 2 ? 'var(--graphite-900)' : 'var(--paper-0)',
                  color: k === 2 ? 'var(--paper-0)' : 'var(--fg-1)',
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow:
                    k === 2
                      ? '5px 5px 0 var(--yolk-500)'
                      : 'var(--shadow-hard)',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border:
                      '2px solid ' +
                      (k === 2 ? 'var(--paper-0)' : 'var(--graphite-900)'),
                    background: [
                      'var(--yolk-500)',
                      'var(--mat-pla)',
                      'var(--yolk-500)',
                      'var(--mat-petg)',
                    ][k],
                    color: 'var(--graphite-900)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    font: '800 20px/1 var(--font-mono)',
                  }}
                >
                  {k + 1}
                </span>
                <b style={{font: '800 23px/1.1 var(--font-display)'}}>{t(h)}</b>
                <p
                  style={{
                    margin: 0,
                    font: '500 15px/1.5 var(--font-body)',
                    opacity: 0.85,
                  }}
                >
                  {t(b)}
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      <CrewFloor />

      <MaterialScroll go={go} />

      <section className="s-section s-wrap">
        <div className="s-g2" style={{alignItems: 'stretch'}}>
          <Rise style={{height: '100%'}}>
            <div
              className="s-squish"
              style={{
                height: '100%',
                background: 'var(--graphite-900)',
                backgroundImage: 'var(--tex-bed-inverse)',
                color: 'var(--paper-0)',
                border: '2px solid var(--graphite-900)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: '6px 6px 0 var(--mat-loop)',
              }}
            >
              <span style={{...smMono, color: 'var(--mat-loop-tint)'}}>
                {t(SITE.loop.over)}
              </span>
              <h3 className="s-h2" style={{color: 'var(--paper-0)'}}>
                {t(SITE.loop.title)}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: 'var(--graphite-300)',
                  font: '400 16px/1.55 var(--font-body)',
                }}
              >
                {t(SITE.loop.sub)}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 16,
                  marginTop: 'auto',
                  flexWrap: 'wrap',
                }}
              >
                <B.Button icon="recycle" onClick={() => go('loop')}>
                  {t(SITE.loop.cta)}
                </B.Button>
                <B.Mascot pose="oops" color="loop" size={110} />
              </div>
            </div>
          </Rise>
          <Rise delay={120} style={{height: '100%'}}>
            <div
              className="s-squish"
              style={{
                height: '100%',
                background: 'var(--paper-0)',
                border: '2px solid var(--graphite-900)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: 'var(--shadow-hard)',
              }}
            >
              <span style={{...smMono, color: 'var(--fg-3)'}}>
                {t(SITE.corner.over)}
              </span>
              <h3 className="s-h2">{t(SITE.cornerTeaser.title)}</h3>
              <p
                style={{
                  margin: 0,
                  color: 'var(--fg-2)',
                  font: '400 16px/1.55 var(--font-body)',
                }}
              >
                {t(SITE.cornerTeaser.sub)}
              </p>
              <div
                style={{
                  marginTop: 'auto',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '2px solid var(--graphite-900)',
                }}
              >
                <B.MediaPlaceholder
                  label="3D Corner in a mall"
                  tone="yolk"
                  ratio="16 / 7"
                  radius={0}
                />
              </div>
              <B.Button
                variant="ink"
                iconRight={i ? 'arrow-left' : 'arrow-right'}
                onClick={() => go('corner')}
                style={{alignSelf: 'flex-start'}}
              >
                {t(SITE.cornerTeaser.cta)}
              </B.Button>
            </div>
          </Rise>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, {
  SourceChip,
  SRC_META,
  ProductTile,
  MaterialScroll,
  HomePage,
});

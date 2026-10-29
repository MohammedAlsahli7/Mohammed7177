// Sell with us — rules (points, licences), the creator account and the
// creator panel: points, listings, how earning works.

const SELL_PTS = {perSale: 10, curatedOnce: 25};
const SELL_LIC = [
  {
    v: 'commercial',
    ok: true,
    l: ['Commercial use allowed', 'الاستخدام التجاري مسموح'],
  },
  {
    v: 'remix',
    ok: true,
    l: ['Remix + commercial allowed', 'التعديل والتجاري مسموحين'],
  },
  {v: 'ccby', ok: true, l: ['CC BY / CC BY-SA', 'CC BY / CC BY-SA']},
  {
    v: 'nc',
    ok: false,
    l: ['CC BY-NC (non-commercial)', 'CC BY-NC (غير تجاري)'],
  },
  {v: 'nd', ok: false, l: ['No derivatives / no remix', 'ممنوع التعديل']},
  {
    v: 'std',
    ok: false,
    l: ['Standard licence (personal use only)', 'رخصة عادية (استخدام شخصي بس)'],
  },
  {v: 'unsure', ok: false, l: ['Not sure', 'مو متأكد']},
];
// Creator's own listings come from BARA_CONFIG.endpoints.creator → { points,
// listings: [{ name:{en,ar}, kind:'orig'|'cur', sales, points,
// status:'live'|'review' }] }
function useCreator() {
  const [d, setD] = React.useState(null);
  React.useEffect(() => {
    if (!baraApi.configured('creator')) return;
    baraApi
      .fetchLive('creator')
      .then(setD)
      .catch(() => setD(null));
  }, []);
  return d;
}

function SellAside({me, mine, total, box}) {
  const t = useT();
  return (
    <div
      className="s-sticky"
      style={{display: 'flex', flexDirection: 'column', gap: 20}}
    >
      <div
        style={{
          ...box,
          background: 'var(--graphite-900)',
          color: 'var(--paper-0)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 12,
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <span style={{...smMono, fontSize: 11, color: 'var(--yolk-300)'}}>
              {t(['Your points', 'نقاطك'])}
            </span>
            <span
              style={{
                font: '800 56px/.9 var(--font-mono)',
                color: 'var(--yolk-500)',
              }}
            >
              {me ? total : '—'}
            </span>
          </div>
          <B.Goblin mood="approve" size={84} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {!mine.length && (
            <p
              style={{
                margin: 0,
                font: '500 14px/1.45 var(--font-body)',
                color: 'var(--graphite-300)',
              }}
            >
              {t(SITE.sys.creatorEmpty)}
            </p>
          )}
          {mine.map((x, n) => (
            <div
              key={n}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr) auto',
                gap: 10,
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: 12,
                background: 'var(--graphite-800)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  minWidth: 0,
                }}
              >
                <b
                  style={{
                    font: '600 14px/1.2 var(--font-body)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t([x.name && x.name.en, x.name && (x.name.ar || x.name.en)])}
                </b>
                <span
                  style={{
                    ...smMono,
                    fontSize: 10,
                    color: 'var(--graphite-400)',
                  }}
                >
                  {x.kind === 'orig'
                    ? t(['Original', 'أصلي'])
                    : t(['Curated · credited', 'منقول · مع ذكر المصمم'])}{' '}
                  · {x.sales} {t(['sales', 'بيعة'])}
                </span>
              </div>
              {x.status === 'review' ? (
                <B.Badge tone="warning" dot>
                  {t(['In review', 'مراجعة'])}
                </B.Badge>
              ) : (
                <span
                  style={{
                    font: '700 15px/1 var(--font-mono)',
                    color: 'var(--yolk-300)',
                  }}
                >
                  +{x.points || 0}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={box}>
        <b style={{font: '800 20px/1.15 var(--font-display)'}}>
          {t(['How points work', 'كيف تشتغل النقاط'])}
        </b>
        {[
          [
            ['Original designs', 'تصاميمك الأصلية'],
            [
              '+' + SELL_PTS.perSale + ' points for every sale, forever.',
              '+' + SELL_PTS.perSale + ' نقاط مع كل بيعة، على طول.',
            ],
          ],
          [
            ['Public designs', 'التصاميم العامة'],
            [
              '+' +
                SELL_PTS.curatedOnce +
                ' points once, the first time someone other than you buys it. Only if the original licence allows commercial use or remixing.',
              '+' +
                SELL_PTS.curatedOnce +
                ' نقطة مرة وحدة، أول ما يشتريه أحد غيرك. وبس إذا رخصة التصميم تسمح بالبيع أو التعديل.',
            ],
          ],
          [
            ['Your own orders', 'طلباتك أنت'],
            [
              'Buying your own listing never earns points.',
              'لو اشتريت منتجك ما تاخذ نقاط.',
            ],
          ],
          [
            ['Spending points', 'وش أسوي بالنقاط'],
            [
              'Use them on any print in the shop.',
              'استخدمها على أي طبعة بالمتجر.',
            ],
          ],
        ].map(([h, d], n) => (
          <div
            key={n}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              paddingTop: n ? 12 : 0,
              borderTop: n ? '1.5px solid var(--border-1)' : 0,
            }}
          >
            <b style={{font: '700 15px/1.2 var(--font-body)'}}>{t(h)}</b>
            <span
              style={{
                font: '500 14px/1.45 var(--font-body)',
                color: 'var(--fg-2)',
                textWrap: 'pretty',
              }}
            >
              {t(d)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {SellAside});

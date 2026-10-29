const SF_COLORS = {
  pla: [
    ['#F2B705', 'Yolk'],
    ['#E8367A', 'Bubblegum'],
    ['#16161A', 'Graphite'],
    ['#FCFAF4', 'Bone'],
  ],
  petg: [
    ['#12A5A0', 'Lagoon'],
    ['#CFE8F2', 'Clear ice'],
    ['#16161A', 'Graphite'],
  ],
  tpu: [
    ['#2F6BFF', 'Bounce'],
    ['#16161A', 'Graphite'],
    ['#E8367A', 'Bubblegum'],
  ],
};

function SfProduct({id, go, addToCart}) {
  const p = SF_PRODUCTS.find((x) => x.id === id) || SF_PRODUCTS[0];
  const [mat, setMat] = React.useState(p.mats[0]);
  const [color, setColor] = React.useState(0);
  const [layer, setLayer] = React.useState('0.20 mm — standard');
  const [qty, setQty] = React.useState(1);
  const colors = SF_COLORS[mat];
  const extra = layer.startsWith('0.12') ? 15 : 0;
  return (
    <div
      style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '32px 24px 0',
      }}
    >
      <button
        onClick={() => go('catalog')}
        style={{
          border: 0,
          background: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          font: '600 14px/1 var(--font-body)',
          color: 'var(--fg-2)',
          marginBottom: 20,
        }}
      >
        <DS.Icon name="arrow-left" size={16} />
        Back to shop
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 48,
          alignItems: 'start',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <div
            style={{
              border: '2px solid var(--graphite-900)',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-hard)',
            }}
          >
            <DS.MediaPlaceholder
              label={p.title + ' — hero'}
              tone={mat}
              ratio="1 / 1"
              radius={0}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 12,
            }}
          >
            {['Detail', 'In hand', 'Layer close-up', 'Bed cam'].map((l, i) => (
              <div
                key={l}
                style={{
                  border:
                    '2px solid ' +
                    (i === 0 ? 'var(--graphite-900)' : 'var(--border-2)'),
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <DS.MediaPlaceholder
                  label={l}
                  tone={i === 3 ? 'ink' : 'paper'}
                  texture={i === 3 ? 'bed' : 'layers'}
                  ratio="1 / 1"
                  radius={0}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <div style={{display: 'flex', gap: 8}}>
              {p.badge && (
                <DS.Badge tone={p.badgeTone || 'brand'} outlined>
                  {p.badge}
                </DS.Badge>
              )}
              <DS.Badge tone="success" dot>
                Ready in 2 days
              </DS.Badge>
            </div>
            <h1 className="b-h1" style={{margin: 0}}>
              {p.title}
            </h1>
            <div
              dir="rtl"
              style={{
                font: '600 22px/1.4 var(--font-arabic)',
                color: 'var(--fg-3)',
                textAlign: 'left',
              }}
            >
              {p.ar}
            </div>
            <div style={{font: '800 40px/1 var(--font-display)', marginTop: 6}}>
              <span
                style={{
                  font: '700 15px/1 var(--font-mono)',
                  marginRight: 6,
                  color: 'var(--fg-2)',
                }}
              >
                SAR
              </span>
              {(p.price + extra) * qty}
            </div>
          </div>
          <p
            style={{
              margin: 0,
              font: '400 17px/1.55 var(--font-body)',
              color: 'var(--fg-2)',
            }}
          >
            A six-sided tower that tumbles your dice down three internal ramps
            before spitting them into the tray. Fair rolls, satisfying clatter,
            zero dice under the sofa.
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <span style={{font: '700 14px/1 var(--font-body)'}}>Material</span>
            <div style={{display: 'flex', gap: 10}}>
              {p.mats.map((k) => (
                <DS.Tag
                  key={k}
                  material={k}
                  selected={mat === k}
                  onClick={() => {
                    setMat(k);
                    setColor(0);
                  }}
                  style={{height: 36, padding: '0 14px'}}
                >
                  {DS.MATERIALS[k].name}
                </DS.Tag>
              ))}
            </div>
            <span
              style={{
                font: '500 13px/1.4 var(--font-body)',
                color: 'var(--fg-3)',
              }}
            >
              {DS.MATERIALS[mat].blurb}
            </span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <span style={{font: '700 14px/1 var(--font-body)'}}>
              Colour ·{' '}
              <span style={{fontWeight: 500, color: 'var(--fg-2)'}}>
                {colors[color][1]}
              </span>
            </span>
            <div style={{display: 'flex', gap: 14}}>
              {colors.map(([hex, n], i) => (
                <DS.MaterialSwatch
                  key={n}
                  color={hex}
                  label={n}
                  selected={color === i}
                  size={36}
                  onClick={() => setColor(i)}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 16,
              alignItems: 'end',
            }}
          >
            <DS.Select
              label="Layer height"
              value={layer}
              onChange={(e) => setLayer(e.target.value)}
              options={[
                '0.12 mm — fine (+SAR 15)',
                '0.20 mm — standard',
                '0.28 mm — draft',
              ]}
            />
            <DS.QuantityStepper value={qty} onChange={setQty} />
          </div>
          <div style={{display: 'flex', gap: 12}}>
            <DS.Button
              size="lg"
              fullWidth
              icon="shopping-bag"
              onClick={() =>
                addToCart({...p, price: p.price + extra, mat}, qty)
              }
            >
              Add to cart
            </DS.Button>
            <DS.IconButton icon="heart" label="Save" size="lg" />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              border: '2px solid var(--graphite-900)',
              borderRadius: 14,
              overflow: 'hidden',
              background: 'var(--paper-0)',
            }}
          >
            {[
              ['Layers', '212'],
              ['Print time', '6 h 12 m'],
              ['Infill', '15 %'],
              ['Weight', '84 g'],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  padding: '12px 14px',
                  borderLeft: i ? '2px solid var(--graphite-900)' : 0,
                }}
              >
                <div
                  style={{
                    font: '600 10px/1 var(--font-mono)',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-3)',
                  }}
                >
                  {k}
                </div>
                <div
                  style={{font: '700 17px/1 var(--font-mono)', marginTop: 6}}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {SfProduct});

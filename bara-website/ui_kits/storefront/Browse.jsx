function SfHome({go, addToCart, lang}) {
  const ar = lang === 'ar';
  return (
    <div>
      <section
        style={{
          borderBottom: '2px solid var(--graphite-900)',
          background: 'var(--yolk-500)',
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
          style={{
            position: 'relative',
            maxWidth: 'var(--container)',
            margin: '0 auto',
            padding: '64px 24px',
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            <span className="b-overline">
              {ar ? 'استوديو طباعة 3D · الرياض' : '3D print studio · Riyadh'}
            </span>
            <h1
              style={{
                margin: 0,
                font: 'var(--text-display)',
                fontSize: 96,
                letterSpacing: 'var(--tracking-display)',
              }}
            >
              {ar ? (
                <>
                  طلبك غريب؟
                  <br />
                  نطبعه.
                </>
              ) : (
                <>
                  Weirdly specific
                  <br />
                  things, printed.
                </>
              )}
            </h1>
            <p
              style={{
                margin: 0,
                font: '500 20px/1.45 var(--font-body)',
                maxWidth: 460,
              }}
            >
              {ar
                ? 'ألعاب، أغراض مكتب، والقطعة اللي صار لك سنين تدوّرها — نطبعها لك طبقة طبقة.'
                : 'Games, desk goblins and the exact bracket you need — printed layer by layer, in PLA, PETG or squishy TPU.'}
            </p>
            <div style={{display: 'flex', gap: 16}}>
              <DS.Button
                size="lg"
                variant="ink"
                iconRight="arrow-right"
                onClick={() => go('catalog')}
              >
                {ar ? 'تسوّق' : 'Browse the shop'}
              </DS.Button>
              <DS.Button
                size="lg"
                variant="secondary"
                icon="upload"
                onClick={() => go('quote')}
              >
                {ar ? 'أرسل ملفك' : 'Send us your file'}
              </DS.Button>
            </div>
          </div>
          <div
            style={{
              border: '2px solid var(--graphite-900)',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-hard-lg)',
              background: 'var(--paper-0)',
            }}
          >
            <DS.MediaPlaceholder
              label="Hero — dice tower on a game table"
              tone="pla"
              ratio="5 / 4"
              radius={0}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '56px 24px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <h2 className="b-h2" style={{margin: 0}}>
            {ar ? 'طالعة من الطابعة توّها' : 'Fresh off the bed'}
          </h2>
          <DS.Button
            variant="ghost"
            iconRight="arrow-right"
            onClick={() => go('catalog')}
          >
            See all 42
          </DS.Button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
            gap: 24,
          }}
        >
          {SF_PRODUCTS.slice(0, 4).map((p) => (
            <DS.ProductCard
              key={p.id}
              title={p.title}
              titleAr={p.ar}
              price={p.price}
              materials={p.mats}
              spec={p.spec}
              badge={p.badge}
              badgeTone={p.badgeTone}
              imageTone={p.tone}
              onClick={() => go('product', p.id)}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '64px 24px 0',
        }}
      >
        <h2 className="b-h2" style={{margin: '0 0 24px'}}>
          {ar ? 'وش الخامة اللي تبيها؟' : 'Pick your plastic'}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {['pla', 'petg', 'tpu'].map((k) => {
            const m = DS.MATERIALS[k];
            return (
              <DS.Card
                key={k}
                padding={0}
                interactive
                style={{overflow: 'hidden', background: m.tint}}
              >
                <div
                  style={{
                    height: 120,
                    background: m.color,
                    backgroundImage: 'var(--tex-layers-strong)',
                    borderBottom: '2px solid var(--graphite-900)',
                    padding: 20,
                    display: 'flex',
                    alignItems: 'flex-end',
                    color: '#fff',
                    font: '800 56px/.85 var(--font-display)',
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      font: '600 17px/1.35 var(--font-body)',
                      color: m.ink,
                    }}
                  >
                    {m.blurb}
                  </span>
                  <span
                    style={{
                      font: '500 11.5px/1 var(--font-mono)',
                      color: m.ink,
                    }}
                  >
                    NOZZLE {m.temp}
                  </span>
                </div>
              </DS.Card>
            );
          })}
        </div>
      </section>

      <section
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '64px 24px 0',
        }}
      >
        <DS.Card
          variant="inverse"
          texture="bed"
          padding={40}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div>
            <span
              className="b-overline"
              style={{color: 'var(--mat-loop-tint)'}}
            >
              Bara' Loop · {ar ? 'قريبًا' : 'coming soon'}
            </span>
            <h3
              style={{
                margin: '10px 0 8px',
                font: '800 40px/1.05 var(--font-display)',
              }}
            >
              Failed prints deserve a second life.
            </h3>
            <p
              style={{
                margin: 0,
                font: '400 16px/1.5 var(--font-body)',
                color: 'var(--graphite-300)',
                maxWidth: 560,
              }}
            >
              Drop off your spaghetti, rafts and test cubes. We shred them into
              Loop filament and knock SAR 20 off your next order per kilo.
            </p>
          </div>
          <DS.Button variant="primary" size="lg" icon="recycle">
            How recycling works
          </DS.Button>
        </DS.Card>
      </section>
    </div>
  );
}

function SfCatalog({go, addToCart}) {
  const [cat, setCat] = React.useState('all');
  const [mat, setMat] = React.useState(null);
  const list = SF_PRODUCTS.filter(
    (p) => (cat === 'all' || p.cat === cat) && (!mat || p.mats.includes(mat)),
  );
  return (
    <div
      style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '40px 24px 0',
      }}
    >
      <span className="b-overline" style={{color: 'var(--fg-3)'}}>
        Shop
      </span>
      <h1 className="b-h1" style={{margin: '8px 0 24px'}}>
        Everything we print
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 28,
        }}
      >
        <DS.Tabs
          value={cat}
          onChange={setCat}
          items={[
            {id: 'all', label: 'All', count: SF_PRODUCTS.length},
            {id: 'games', label: 'Games', count: 4},
            {id: 'home', label: 'Home & desk', count: 4},
          ]}
        />
        <div style={{display: 'flex', gap: 8}}>
          {['pla', 'petg', 'tpu'].map((k) => (
            <DS.Tag
              key={k}
              material={k}
              selected={mat === k}
              onClick={() => setMat(mat === k ? null : k)}
            >
              {DS.MATERIALS[k].name}
            </DS.Tag>
          ))}
        </div>
        <div style={{flex: 1}} />
        <DS.Select
          size="sm"
          options={['Newest first', 'Price: low → high', 'Shortest print time']}
          style={{width: 220}}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
          gap: 24,
        }}
      >
        {list.map((p) => (
          <DS.ProductCard
            key={p.id}
            title={p.title}
            titleAr={p.ar}
            price={p.price}
            materials={p.mats}
            spec={p.spec}
            badge={p.badge}
            badgeTone={p.badgeTone}
            imageTone={p.tone}
            onClick={() => go('product', p.id)}
            onAdd={() => addToCart(p)}
          />
        ))}
      </div>
      {!list.length && (
        <div
          style={{
            padding: 64,
            textAlign: 'center',
            font: '600 18px/1.4 var(--font-body)',
            color: 'var(--fg-3)',
          }}
        >
          Nothing on the bed for that combo. Try another material.
        </div>
      )}
    </div>
  );
}

Object.assign(window, {SfHome, SfCatalog});

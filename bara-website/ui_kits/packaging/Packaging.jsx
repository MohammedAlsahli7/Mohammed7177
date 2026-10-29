const {Wordmark, MATERIALS, Icon} = window.InfillDesignSystem_d33a9b;

const pkMono = {
  font: '600 11px/1.2 var(--font-mono)',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
};
const pkColors = {
  pla: ['Yolk Yellow', 'أصفر صفار', '#F2B705'],
  petg: ['Lagoon Teal', 'فيروزي', '#12A5A0'],
  tpu: ['Bounce Blue', 'أزرق مرن', '#2F6BFF'],
};
const pkSpecs = {
  pla: [
    ['Ø', '1.75 mm'],
    ['Net', '1 kg'],
    ['Nozzle', '200–220 °C'],
    ['Bed', '50–60 °C'],
  ],
  petg: [
    ['Ø', '1.75 mm'],
    ['Net', '1 kg'],
    ['Nozzle', '230–250 °C'],
    ['Bed', '70–80 °C'],
  ],
  tpu: [
    ['Ø', '1.75 mm'],
    ['Net', '750 g'],
    ['Nozzle', '215–235 °C'],
    ['Shore', '95A'],
  ],
};

function SpecGrid({mat, inverse}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        border:
          '2px solid ' + (inverse ? 'var(--paper-0)' : 'var(--graphite-900)'),
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {pkSpecs[mat].map(([k, v], i) => (
        <div
          key={k}
          style={{
            padding: '8px 10px',
            borderRight:
              i % 2 === 0
                ? '2px solid ' +
                  (inverse ? 'var(--paper-0)' : 'var(--graphite-900)')
                : 0,
            borderTop:
              i > 1
                ? '2px solid ' +
                  (inverse ? 'var(--paper-0)' : 'var(--graphite-900)')
                : 0,
          }}
        >
          <div style={{...pkMono, fontSize: 9.5, opacity: 0.7}}>{k}</div>
          <div style={{font: '700 15px/1.2 var(--font-mono)', marginTop: 3}}>
            {v}
          </div>
        </div>
      ))}
    </div>
  );
}

function SpoolLabel({mat = 'pla'}) {
  const m = MATERIALS[mat];
  const [cn, ca, hex] = pkColors[mat];
  return (
    <div
      style={{
        width: 640,
        height: 300,
        display: 'flex',
        background: 'var(--paper-0)',
        border: '2px solid var(--graphite-900)',
        borderRadius: 18,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 210,
          position: 'relative',
          background: m.color,
          backgroundImage: 'var(--tex-layers-strong)',
          borderRight: '2px solid var(--graphite-900)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#fff',
        }}
      >
        <span
          style={{
            ...pkMono,
            background: 'var(--graphite-900)',
            alignSelf: 'flex-start',
            padding: '5px 8px 4px',
            borderRadius: 6,
          }}
        >
          Filament
        </span>
        <div>
          <div
            style={{
              font: '800 72px/.85 var(--font-display)',
              letterSpacing: '-.03em',
            }}
          >
            {m.name}
          </div>
          <div
            dir="rtl"
            style={{font: '700 22px/1.4 var(--font-arabic)', textAlign: 'left'}}
          >
            {m.ar}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Wordmark size={30} />
          <span style={{...pkMono, color: 'var(--fg-3)'}}>Made in KSA</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: hex,
              border: '2px solid var(--graphite-900)',
              boxShadow: '2px 2px 0 var(--graphite-900)',
            }}
          />
          <div style={{flex: 1}}>
            <div style={{font: '800 22px/1 var(--font-display)'}}>{cn}</div>
            <div style={{...pkMono, color: 'var(--fg-3)', marginTop: 4}}>
              {hex} ·{' '}
              <span
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic)',
                  textTransform: 'none',
                  letterSpacing: 0,
                  fontSize: 13,
                }}
              >
                {ca}
              </span>
            </div>
          </div>
        </div>
        <SpecGrid mat={mat} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 'auto',
          }}
        >
          <span style={{...pkMono, fontSize: 10, color: 'var(--fg-3)'}}>
            Batch 26-10-B07 · Crackling? Dry it first.
          </span>
          <span
            style={{
              width: 96,
              height: 30,
              background:
                'repeating-linear-gradient(90deg,var(--graphite-900) 0 2px,transparent 2px 4px,var(--graphite-900) 4px 5px,transparent 5px 8px)',
            }}
            aria-label="Barcode placeholder"
          />
        </div>
      </div>
    </div>
  );
}

function FilamentBox({mat = 'pla'}) {
  const m = MATERIALS[mat];
  return (
    <div
      style={{
        width: 300,
        height: 360,
        background: 'var(--yolk-500)',
        border: '2px solid var(--graphite-900)',
        borderRadius: 14,
        boxShadow: 'var(--shadow-hard-lg)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
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
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Wordmark size={26} />
        <span style={{...pkMono, fontSize: 10}}>1.75 · 1 kg</span>
      </div>
      <div
        style={{
          position: 'relative',
          flex: 1,
          borderRadius: 999,
          margin: '4px 28px',
          background: m.color,
          border: '2px solid var(--graphite-900)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '38%',
            aspectRatio: '1',
            borderRadius: 999,
            background: 'var(--paper-0)',
            border: '2px solid var(--graphite-900)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...pkMono,
            fontSize: 9,
            textAlign: 'center',
          }}
        >
          window
          <br />
          cut-out
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            font: '800 56px/.85 var(--font-display)',
            letterSpacing: '-.03em',
          }}
        >
          {m.name}
        </div>
        <div dir="rtl" style={{font: '700 18px/1.3 var(--font-arabic)'}}>
          {m.ar}
        </div>
      </div>
      <div
        style={{position: 'relative', font: '600 13px/1.3 var(--font-body)'}}
      >
        {m.blurb}
      </div>
    </div>
  );
}

function OrderSticker() {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: 999,
        background: 'var(--graphite-900)',
        color: 'var(--paper-0)',
        border: '2px solid var(--graphite-900)',
        boxShadow: '6px 6px 0 var(--yolk-500)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        textAlign: 'center',
        backgroundImage: 'var(--tex-bed-inverse)',
      }}
    >
      <span style={{...pkMono, color: 'var(--yolk-300)'}}>Order #B-0412</span>
      <div
        style={{
          font: '800 64px/.85 var(--font-display)',
          color: 'var(--yolk-500)',
        }}
      >
        212
      </div>
      <div style={{font: '700 17px/1.15 var(--font-display)', maxWidth: 190}}>
        layers went into this.
        <br />
        Open gently.
      </div>
      <div
        dir="rtl"
        style={{
          font: '600 14px/1.4 var(--font-arabic)',
          color: 'var(--graphite-300)',
        }}
      >
        ٢١٢ طبقة… على هونك وأنت تفتحها.
      </div>
      <span style={{...pkMono, fontSize: 10, color: 'var(--graphite-400)'}}>
        6 h 12 m · PLA · 0.20 mm
      </span>
    </div>
  );
}

function HangTag() {
  return (
    <div
      style={{
        width: 200,
        height: 330,
        background: 'var(--paper-0)',
        border: '2px solid var(--graphite-900)',
        borderRadius: '18px 18px 18px 18px',
        boxShadow: 'var(--shadow-hard)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          border: '2px solid var(--graphite-900)',
          alignSelf: 'center',
          background: 'var(--paper-1)',
        }}
      />
      <Wordmark size={26} style={{alignSelf: 'center'}} />
      <div
        style={{height: 2, background: 'var(--graphite-900)', margin: '4px 0'}}
      />
      <div style={{font: '800 24px/1 var(--font-display)'}}>Hex Dice Tower</div>
      <div
        dir="rtl"
        style={{font: '600 16px/1.3 var(--font-arabic)', color: 'var(--fg-2)'}}
      >
        برج النرد السداسي
      </div>
      <div
        style={{display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4}}
      >
        {[
          ['Material', 'PLA'],
          ['Layer', '0.20 mm'],
          ['Infill', '15 %'],
          ['Print time', '6 h 12 m'],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...pkMono,
              fontSize: 10.5,
              borderBottom: '1.5px dashed var(--border-2)',
              paddingBottom: 4,
            }}
          >
            <span style={{color: 'var(--fg-3)'}}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <span style={{font: '800 26px/1 var(--font-display)'}}>
          <span style={{...pkMono, marginRight: 4}}>SAR</span>89
        </span>
        <Icon name="dice-5" size={22} />
      </div>
    </div>
  );
}

Object.assign(window, {SpoolLabel, FilamentBox, OrderSticker, HangTag});

const KDS = window.InfillDesignSystem_d33a9b;

function KioskTop({title, onBack, lang, setLang}) {
  return (
    <div
      style={{
        height: 88,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '0 32px',
        borderBottom: '2px solid var(--graphite-900)',
        background: 'var(--paper-1)',
      }}
    >
      {onBack ? (
        <KDS.IconButton
          icon="arrow-left"
          label="Back"
          size="lg"
          onClick={onBack}
        />
      ) : (
        <KDS.Wordmark size={36} />
      )}
      <span style={{font: '800 28px/1 var(--font-display)'}}>{title}</span>
      <div style={{flex: 1}} />
      <span
        style={{
          font: '600 13px/1 var(--font-mono)',
          color: 'var(--fg-3)',
          letterSpacing: '.08em',
        }}
      >
        3D CORNER · RIYADH PARK
      </span>
      <KDS.Button
        variant="secondary"
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        style={{fontFamily: 'var(--font-arabic)'}}
      >
        {lang === 'en' ? 'عربي' : 'English'}
      </KDS.Button>
    </div>
  );
}

function KioskWelcome({go, lang}) {
  const ar = lang === 'ar';
  const tiles = [
    {
      id: 'pickup',
      icon: 'package-open',
      t: ar ? 'استلم طلبك' : 'Pick up an order',
      s: ar ? 'دخّل الرمز اللي وصلك' : 'Enter your 6-digit code',
      bg: 'var(--yolk-500)',
      fg: 'var(--graphite-900)',
    },
    {
      id: 'print',
      icon: 'printer',
      t: ar ? 'اطبع لك شي' : 'Print something',
      s: ar ? 'من عندنا أو من جوالك' : 'From our catalog or your phone',
      bg: 'var(--mat-pla)',
      fg: '#fff',
    },
    {
      id: 'recycle',
      icon: 'recycle',
      t: ar ? 'رجّع طبعاتك' : 'Recycle prints',
      s: ar ? '٢٠ ريال رصيد على كل كيلو' : 'Get SAR 20 credit per kilo',
      bg: 'var(--mat-loop)',
      fg: '#fff',
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div>
        <div
          style={{
            font: '800 72px/.95 var(--font-display)',
            letterSpacing: '-.025em',
          }}
        >
          {ar ? 'هلا! وش نطبع اليوم؟' : 'Hi! What are we making?'}
        </div>
        <div
          style={{
            font: '500 20px/1.4 var(--font-body)',
            color: 'var(--fg-2)',
            marginTop: 10,
          }}
        >
          {ar
            ? 'اختر وحدة ونبدأ.'
            : 'Tap a tile to start. The printers behind you are already warm.'}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 28,
        }}
      >
        {tiles.map((t) => (
          <button
            key={t.id}
            onClick={() => go(t.id)}
            style={{
              border: '2px solid var(--graphite-900)',
              borderRadius: 28,
              background: t.bg,
              color: t.fg,
              boxShadow: 'var(--shadow-hard-lg)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'start',
              cursor: 'pointer',
              backgroundImage: 'var(--tex-layers-strong)',
            }}
          >
            <span
              style={{
                width: 88,
                height: 88,
                borderRadius: 24,
                background: 'var(--paper-0)',
                color: 'var(--graphite-900)',
                border: '2px solid var(--graphite-900)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <KDS.Icon name={t.icon} size={44} />
            </span>
            <span>
              <span
                style={{
                  display: 'block',
                  font: '800 40px/1 var(--font-display)',
                }}
              >
                {t.t}
              </span>
              <span
                style={{
                  display: 'block',
                  font: '600 18px/1.35 var(--font-body)',
                  marginTop: 10,
                }}
              >
                {t.s}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function KioskPickup({go}) {
  const [code, setCode] = React.useState('');
  const done = code.length === 6;
  const press = (k) =>
    setCode((c) => (k === 'del' ? c.slice(0, -1) : c.length < 6 ? c + k : c));
  if (done) {
    return (
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          padding: 40,
          alignItems: 'center',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <KDS.Badge
            tone="success"
            dot
            style={{
              alignSelf: 'flex-start',
              height: 32,
              fontSize: 15,
              padding: '0 14px',
            }}
          >
            Ready for pickup
          </KDS.Badge>
          <div style={{font: '800 64px/.95 var(--font-display)'}}>
            Locker 4 is open.
          </div>
          <div
            style={{
              font: '500 20px/1.45 var(--font-body)',
              color: 'var(--fg-2)',
            }}
          >
            Order #B-0412 · Hex Dice Tower (PLA, Yolk) and 20 meeples. 212 +
            1,840 layers. You're welcome.
          </div>
          <div style={{display: 'flex', gap: 16, marginTop: 8}}>
            <KDS.Button size="lg" onClick={() => go('welcome')}>
              Done
            </KDS.Button>
            <KDS.Button
              size="lg"
              variant="secondary"
              icon="recycle"
              onClick={() => go('recycle')}
            >
              Recycle something too
            </KDS.Button>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 14,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div
              key={n}
              style={{
                aspectRatio: '1',
                borderRadius: 18,
                border: '2px solid var(--graphite-900)',
                background: n === 4 ? 'var(--yolk-500)' : 'var(--paper-0)',
                boxShadow: n === 4 ? 'var(--shadow-hard)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '800 40px/1 var(--font-mono)',
                color: n === 4 ? 'var(--graphite-900)' : 'var(--graphite-300)',
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: 48,
        padding: 40,
        alignItems: 'center',
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
        <div style={{font: '800 56px/1 var(--font-display)'}}>
          Enter your pickup code
        </div>
        <div
          style={{font: '500 19px/1.4 var(--font-body)', color: 'var(--fg-2)'}}
        >
          It's in the SMS we sent when your print came off the bed.
        </div>
        <div style={{display: 'flex', gap: 12}}>
          {Array.from({length: 6}).map((_, i) => (
            <div
              key={i}
              style={{
                width: 76,
                height: 96,
                borderRadius: 18,
                border: '2px solid var(--graphite-900)',
                background: code[i] ? 'var(--yolk-500)' : 'var(--paper-0)',
                boxShadow:
                  i === code.length ? '4px 4px 0 var(--yolk-500)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '800 48px/1 var(--font-mono)',
              }}
            >
              {code[i] || ''}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14}}
      >
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(
          (k, i) =>
            k === '' ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                onClick={() => press(k)}
                style={{
                  height: 96,
                  borderRadius: 20,
                  border: '2px solid var(--graphite-900)',
                  background: k === 'del' ? 'var(--paper-2)' : 'var(--paper-0)',
                  boxShadow: 'var(--shadow-hard-sm)',
                  font: '800 40px/1 var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {k === 'del' ? <KDS.Icon name="delete" size={32} /> : k}
              </button>
            ),
        )}
      </div>
    </div>
  );
}

function KioskRecycle({go}) {
  const [step, setStep] = React.useState(0);
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    if (step !== 1) return;
    const t = setInterval(
      () =>
        setW((x) => {
          if (x >= 1.34) {
            clearInterval(t);
            setStep(2);
            return 1.34;
          }
          return +(x + 0.06).toFixed(2);
        }),
      60,
    );
    return () => clearInterval(t);
  }, [step]);
  const credit = Math.round(w * 20);
  return (
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        padding: 40,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <span className="b-overline" style={{color: 'var(--mat-loop)'}}>
          Bara' Loop
        </span>
        <div style={{font: '800 56px/1 var(--font-display)'}}>
          {step === 0
            ? 'Put your scraps on the scale.'
            : step === 1
              ? 'Weighing your spaghetti…'
              : 'Nice haul.'}
        </div>
        <div
          style={{font: '500 19px/1.45 var(--font-body)', color: 'var(--fg-2)'}}
        >
          PLA and PETG only, please. Failed prints, supports, rafts, test cubes
          — all welcome. No resin, no metal.
        </div>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          {[
            ['pla', 'PLA ✓'],
            ['petg', 'PETG ✓'],
          ].map(([k, l]) => (
            <KDS.Tag key={k} material={k} style={{height: 36, fontSize: 14}}>
              {l}
            </KDS.Tag>
          ))}
          <KDS.Tag style={{height: 36, fontSize: 14, opacity: 0.5}}>
            TPU — not yet
          </KDS.Tag>
        </div>
        <div style={{marginTop: 'auto', display: 'flex', gap: 16}}>
          {step === 0 && (
            <KDS.Button size="lg" icon="scale" onClick={() => setStep(1)}>
              Start weighing
            </KDS.Button>
          )}
          {step === 2 && (
            <>
              <KDS.Button size="lg" icon="check" onClick={() => go('welcome')}>
                Add SAR {credit} credit
              </KDS.Button>
              <KDS.Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  setW(0);
                  setStep(0);
                }}
              >
                Weigh more
              </KDS.Button>
            </>
          )}
        </div>
      </div>
      <KDS.Card
        variant="inverse"
        texture="bed"
        padding={32}
        style={{display: 'flex', flexDirection: 'column'}}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            height: '100%',
          }}
        >
          <span
            style={{
              font: '600 14px/1 var(--font-mono)',
              letterSpacing: '.1em',
              color: 'var(--graphite-400)',
            }}
          >
            SCALE · LIVE
          </span>
          <div
            style={{
              font: '800 140px/.9 var(--font-mono)',
              color: step === 2 ? 'var(--yolk-500)' : 'var(--paper-0)',
            }}
          >
            {w.toFixed(2)}
            <span style={{fontSize: 40, marginLeft: 12}}>kg</span>
          </div>
          <div
            style={{
              height: 24,
              borderRadius: 12,
              border: '2px solid var(--paper-0)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: Math.min(100, (w / 2) * 100) + '%',
                height: '100%',
                background: 'var(--mat-loop)',
                transition: 'width 60ms linear',
              }}
            />
          </div>
          <div
            style={{
              marginTop: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {[
              ['Credit', 'SAR ' + credit],
              ['Becomes', '≈ ' + Math.round(w * 0.9 * 100) / 100 + ' kg Loop'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  border: '2px solid var(--graphite-700)',
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    font: '600 11px/1 var(--font-mono)',
                    letterSpacing: '.1em',
                    color: 'var(--graphite-400)',
                    textTransform: 'uppercase',
                  }}
                >
                  {k}
                </div>
                <div
                  style={{font: '800 26px/1 var(--font-display)', marginTop: 8}}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </KDS.Card>
    </div>
  );
}

function KioskPrint({go}) {
  const items = [
    ['Meeple Pack ×20', 45, 'petg', '1 h 50 m'],
    ['Name Keychain', 15, 'pla', '22 m'],
    ['Phone Stand', 29, 'pla', '1 h 10 m'],
    ['Squish Grip', 35, 'tpu', '48 m'],
  ];
  const [sel, setSel] = React.useState(1);
  return (
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: 32,
        padding: 40,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{font: '800 48px/1 var(--font-display)'}}>
          Print while you shop
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 20,
          }}
        >
          {items.map(([t, p, m, d], i) => (
            <button
              key={t}
              onClick={() => setSel(i)}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: 14,
                borderRadius: 20,
                border: '2px solid var(--graphite-900)',
                background: sel === i ? 'var(--yolk-500)' : 'var(--paper-0)',
                boxShadow: sel === i ? 'var(--shadow-hard)' : 'none',
                cursor: 'pointer',
                textAlign: 'start',
              }}
            >
              <div
                style={{
                  width: 96,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '2px solid var(--graphite-900)',
                }}
              >
                <KDS.MediaPlaceholder
                  label=" "
                  tone={m}
                  ratio="1 / 1"
                  radius={0}
                />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                <span style={{font: '800 22px/1.1 var(--font-display)'}}>
                  {t}
                </span>
                <span style={{font: '600 13px/1 var(--font-mono)'}}>
                  SAR {p} · READY IN {d.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <KDS.Card variant="raised" padding={24}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <span className="b-overline" style={{color: 'var(--fg-3)'}}>
            Queue
          </span>
          {[
            ['Printer 2', 'Your job', 0.0],
            ['Printer 1', 'Busy · 64%', 0.64],
            ['Printer 3', 'Busy · 12%', 0.12],
          ].map(([n, s, p], i) => (
            <div
              key={n}
              style={{display: 'flex', flexDirection: 'column', gap: 6}}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  font: '600 14px/1 var(--font-mono)',
                }}
              >
                <span>{n}</span>
                <span
                  style={{color: i === 0 ? 'var(--success)' : 'var(--fg-3)'}}
                >
                  {s}
                </span>
              </div>
              <div
                style={{
                  height: 12,
                  borderRadius: 6,
                  background: 'var(--paper-2)',
                  border: '1.5px solid var(--graphite-900)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: p * 100 + '%',
                    height: '100%',
                    background: 'var(--graphite-900)',
                  }}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              height: 2,
              background: 'var(--graphite-900)',
              margin: '8px 0',
            }}
          />
          <div style={{font: '800 36px/1 var(--font-display)'}}>
            <span style={{font: '700 14px/1 var(--font-mono)', marginRight: 6}}>
              SAR
            </span>
            {items[sel][1]}
          </div>
          <KDS.Button
            size="lg"
            fullWidth
            icon="printer"
            onClick={() => go('welcome')}
          >
            Start printing
          </KDS.Button>
          <span
            style={{
              font: '500 14px/1.4 var(--font-body)',
              color: 'var(--fg-3)',
            }}
          >
            We'll text you when it's done. Go get a coffee.
          </span>
        </div>
      </KDS.Card>
    </div>
  );
}

Object.assign(window, {
  KioskTop,
  KioskWelcome,
  KioskPickup,
  KioskRecycle,
  KioskPrint,
});

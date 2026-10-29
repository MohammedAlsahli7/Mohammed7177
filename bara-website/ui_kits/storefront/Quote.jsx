// Storefront kit: custom quote flow and the cart drawer.

function SfQuote({addToast}) {
  const [file, setFile] = React.useState(null);
  const [mat, setMat] = React.useState('pla');
  const [infill, setInfill] = React.useState('20%');
  const [speed, setSpeed] = React.useState('std');
  const base = file
    ? {pla: 48, petg: 62, tpu: 71}[mat] +
      (infill === '50%' ? 18 : infill === '100%' ? 40 : 0) +
      (speed === 'rush' ? 30 : 0)
    : 0;
  return (
    <div
      style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '40px 24px 0',
      }}
    >
      <span className="b-overline" style={{color: 'var(--fg-3)'}}>
        Custom print · طباعة مخصصة
      </span>
      <h1 className="b-h1" style={{margin: '8px 0 8px'}}>
        Got a model? We'll make it real.
      </h1>
      <p
        style={{
          margin: '0 0 32px',
          font: '400 18px/1.5 var(--font-body)',
          color: 'var(--fg-2)',
        }}
      >
        Drop an STL, 3MF or OBJ. We slice it, price it, and a human
        double-checks it before anything melts.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 32,
          alignItems: 'start',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          {!file ? (
            <button
              onClick={() =>
                setFile({
                  name: 'goblin_bust_v3.stl',
                  size: '14.2 MB',
                  dims: '82 × 64 × 110 mm',
                })
              }
              style={{
                border: '2px dashed var(--graphite-900)',
                borderRadius: 24,
                background: 'var(--paper-0)',
                backgroundImage: 'var(--tex-bed)',
                padding: '64px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: 'var(--yolk-500)',
                  border: '2px solid var(--graphite-900)',
                  boxShadow: 'var(--shadow-hard-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DS.Icon name="upload" size={28} />
              </span>
              <span style={{font: '800 24px/1.1 var(--font-display)'}}>
                Drop your file on the bed
              </span>
              <span
                style={{
                  font: '500 12px/1 var(--font-mono)',
                  color: 'var(--fg-3)',
                }}
              >
                STL · 3MF · OBJ — MAX 250 × 250 × 250 MM
              </span>
            </button>
          ) : (
            <DS.Card variant="outlined" padding={16} style={{display: 'flex'}}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <div
                  style={{
                    width: 120,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '2px solid var(--graphite-900)',
                  }}
                >
                  <DS.MediaPlaceholder
                    label="Preview"
                    tone="ink"
                    texture="bed"
                    ratio="1 / 1"
                    radius={0}
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <span style={{font: '700 18px/1.2 var(--font-body)'}}>
                    {file.name}
                  </span>
                  <span
                    style={{
                      font: '500 12px/1.3 var(--font-mono)',
                      color: 'var(--fg-3)',
                    }}
                  >
                    {file.size} · {file.dims}
                  </span>
                  <div style={{display: 'flex', gap: 8, marginTop: 4}}>
                    <DS.Badge tone="success" dot>
                      Manifold
                    </DS.Badge>
                    <DS.Badge tone="warning" dot>
                      Needs supports
                    </DS.Badge>
                  </div>
                </div>
                <DS.IconButton
                  icon="trash-2"
                  label="Remove file"
                  variant="ghost"
                  onClick={() => setFile(null)}
                />
              </div>
            </DS.Card>
          )}
          <DS.Card
            variant="flat"
            padding={24}
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                <span style={{font: '700 14px/1 var(--font-body)'}}>
                  Material
                </span>
                <div style={{display: 'flex', gap: 20}}>
                  {['pla', 'petg', 'tpu'].map((k) => (
                    <DS.MaterialSwatch
                      key={k}
                      material={k}
                      showLabel
                      selected={mat === k}
                      onClick={() => setMat(k)}
                    />
                  ))}
                </div>
              </div>
              <DS.Tabs
                value={infill}
                onChange={setInfill}
                items={[
                  {id: '20%', label: '20% infill'},
                  {id: '50%', label: '50%'},
                  {id: '100%', label: 'Solid'},
                ]}
              />
              <div style={{display: 'flex', gap: 32}}>
                <DS.Radio
                  value="std"
                  checked={speed === 'std'}
                  onChange={setSpeed}
                  label="Standard"
                  description="Ready in 3–4 days"
                />
                <DS.Radio
                  value="rush"
                  checked={speed === 'rush'}
                  onChange={setSpeed}
                  label="Rush"
                  description="24 h · +SAR 30"
                />
              </div>
              <DS.Input
                label="Notes for the printer"
                placeholder="e.g. Print the base in graphite, the goblin in yolk"
              />
            </div>
          </DS.Card>
        </div>
        <DS.Card
          variant="brand"
          padding={24}
          style={{position: 'sticky', top: 120}}
        >
          <span className="b-overline">Instant estimate</span>
          <div
            style={{
              font: '800 64px/1 var(--font-display)',
              margin: '12px 0 4px',
            }}
          >
            <span style={{font: '700 18px/1 var(--font-mono)', marginRight: 6}}>
              SAR
            </span>
            {file ? base : '—'}
          </div>
          <span style={{font: '500 13px/1.4 var(--font-body)'}}>
            {file
              ? 'Final price confirmed within an hour.'
              : 'Upload a file to see a price.'}
          </span>
          <div
            style={{
              height: 2,
              background: 'var(--graphite-900)',
              margin: '20px 0',
            }}
          />
          {[
            ['Material', DS.MATERIALS[mat].name],
            ['Infill', infill],
            ['Est. print time', file ? '9 h 40 m' : '—'],
            ['Est. layers', file ? '550' : '—'],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                font: '600 13px/1 var(--font-mono)',
                padding: '7px 0',
                textTransform: 'uppercase',
              }}
            >
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <DS.Button
            variant="ink"
            size="lg"
            fullWidth
            disabled={!file}
            iconRight="arrow-right"
            style={{marginTop: 20}}
            onClick={() =>
              addToast({
                tone: 'success',
                title: 'Quote requested',
                message: "We'll email you within the hour.",
              })
            }
          >
            Request quote
          </DS.Button>
        </DS.Card>
      </div>
    </div>
  );
}

function SfCart({open, items, onClose, setQty}) {
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--scrim)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          height: '100%',
          background: 'var(--paper-1)',
          borderLeft: '2px solid var(--graphite-900)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '2px solid var(--graphite-900)',
          }}
        >
          <span className="b-h4">
            Your cart · {items.reduce((s, i) => s + i.qty, 0)}
          </span>
          <DS.IconButton
            icon="x"
            label="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {!items.length && (
            <div
              style={{
                textAlign: 'center',
                padding: 40,
                font: '600 16px/1.4 var(--font-body)',
                color: 'var(--fg-3)',
              }}
            >
              The bed is empty.
              <br />
              Go print something.
            </div>
          )}
          {items.map((it, i) => (
            <div
              key={i}
              style={{display: 'flex', gap: 14, alignItems: 'center'}}
            >
              <div
                style={{
                  width: 72,
                  border: '2px solid var(--graphite-900)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <DS.MediaPlaceholder
                  label=" "
                  tone={it.tone}
                  ratio="1 / 1"
                  radius={0}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{font: '700 15px/1.2 var(--font-body)'}}>
                  {it.title}
                </span>
                <DS.Tag
                  material={it.mat || it.mats[0]}
                  style={{alignSelf: 'flex-start', height: 22}}
                >
                  {DS.MATERIALS[it.mat || it.mats[0]].name}
                </DS.Tag>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                <span style={{font: '800 17px/1 var(--font-display)'}}>
                  SAR {it.price * it.qty}
                </span>
                <DS.QuantityStepper
                  size="sm"
                  min={0}
                  value={it.qty}
                  onChange={(n) => setQty(i, n)}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: 24,
            borderTop: '2px dashed var(--border-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <DS.Checkbox
            label="Add Loop recycling bag"
            description="Free · send back your failed prints"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{font: '700 16px/1 var(--font-body)'}}>Subtotal</span>
            <span style={{font: '800 28px/1 var(--font-display)'}}>
              <span
                style={{font: '700 13px/1 var(--font-mono)', marginRight: 4}}
              >
                SAR
              </span>
              {total}
            </span>
          </div>
          <DS.Button
            size="lg"
            fullWidth
            iconRight="arrow-right"
            disabled={!items.length}
          >
            Checkout
          </DS.Button>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, {SfQuote, SfCart});

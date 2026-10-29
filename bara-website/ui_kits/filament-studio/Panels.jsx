const S = window.InfillDesignSystem_d33a9b;
const stMono = {
  font: '600 11px/1.2 var(--font-mono)',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
};
const ST_TONE = {
  in: ['success', 'In stock'],
  low: ['warning', 'Low'],
  out: ['danger', 'Out'],
};
const ST_MATS = [
  {id: 'pla', label: 'PLA'},
  {id: 'petg', label: 'PETG'},
  {id: 'tpu', label: 'TPU'},
  {id: 'loop', label: 'Loop'},
];

function StockDot({grams}) {
  const s = baraStockStatus(grams);
  return (
    <span
      title={ST_TONE[s][1]}
      style={{
        position: 'absolute',
        right: -3,
        top: -3,
        width: 12,
        height: 12,
        borderRadius: 999,
        border: '2px solid var(--paper-0)',
        background:
          s === 'in'
            ? 'var(--success)'
            : s === 'low'
              ? 'var(--warning)'
              : 'var(--danger)',
      }}
    />
  );
}

function FilamentGrid({stock, mat, selectedId, onPick, staff}) {
  const list = stock.filter((f) => f.material === mat);
  const lines = [...new Set(list.map((f) => f.line))];
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      {lines.map((ln) => (
        <div
          key={ln}
          style={{display: 'flex', flexDirection: 'column', gap: 10}}
        >
          <span style={{...stMono, color: 'var(--fg-3)'}}>{ln}</span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 10,
            }}
          >
            {list
              .filter((f) => f.line === ln)
              .map((f) => {
                const out = baraStockStatus(f.grams) === 'out';
                const dis = out && !staff;
                const sel = f.id === selectedId;
                return (
                  <button
                    key={f.id}
                    onClick={() => !dis && onPick(f)}
                    title={f.name + (out ? ' — out of stock' : '')}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: 0,
                      border: 0,
                      background: 'none',
                      cursor: dis ? 'not-allowed' : 'pointer',
                      opacity: dis ? 0.4 : 1,
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        background: f.hex,
                        border: '2px solid var(--graphite-900)',
                        boxShadow: sel
                          ? '0 0 0 3px var(--paper-0), 0 0 0 5px var(--graphite-900)'
                          : '2px 2px 0 var(--graphite-900)',
                        backgroundImage:
                          f.finish === 'silk'
                            ? 'linear-gradient(135deg, rgba(255,255,255,.55), transparent 45%, rgba(0,0,0,.18))'
                            : f.finish === 'translucent'
                              ? 'linear-gradient(135deg, rgba(255,255,255,.6), transparent 60%)'
                              : 'none',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          inset: '32%',
                          borderRadius: 999,
                          background: 'var(--paper-0)',
                          border: '2px solid var(--graphite-900)',
                        }}
                      />
                      <StockDot grams={f.grams} />
                      {out && (
                        <span
                          style={{
                            position: 'absolute',
                            left: -2,
                            right: -2,
                            top: '50%',
                            height: 2,
                            background: 'var(--graphite-900)',
                            transform: 'rotate(-35deg)',
                          }}
                        />
                      )}
                    </span>
                    <span
                      style={{
                        font: '600 12px/1.1 var(--font-body)',
                        color: 'var(--fg-1)',
                        textAlign: 'center',
                      }}
                    >
                      {f.name}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
      {!list.length && (
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <S.Mascot pose="sleepy" color="loop" size={64} />
          <span
            style={{
              font: '500 14px/1.4 var(--font-body)',
              color: 'var(--fg-3)',
            }}
          >
            Nothing on this shelf yet.
          </span>
        </div>
      )}
    </div>
  );
}

function FilamentDetail({fil, staff, onAdjust}) {
  if (!fil) return null;
  const s = baraStockStatus(fil.grams);
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        border: '2px solid var(--graphite-900)',
        background: 'var(--paper-0)',
      }}
    >
      <span
        style={{
          width: 52,
          height: 52,
          flexShrink: 0,
          borderRadius: 12,
          background: fil.hex,
          border: '2px solid var(--graphite-900)',
          backgroundImage: 'var(--tex-layers-strong)',
        }}
      />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
          <span style={{font: '800 18px/1.1 var(--font-display)'}}>
            {fil.name}
          </span>
          <span
            dir="rtl"
            style={{
              font: '600 14px/1 var(--font-arabic)',
              color: 'var(--fg-3)',
            }}
          >
            {fil.ar}
          </span>
        </div>
        <span style={{...stMono, fontSize: 10.5, color: 'var(--fg-3)'}}>
          {fil.line} · {fil.finish} · {fil.hex}
        </span>
        {staff && (
          <span style={{...stMono, fontSize: 10.5}}>
            {(fil.grams / 1000).toFixed(2)} kg · shelf {fil.shelf}
          </span>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
        }}
      >
        <S.Badge tone={ST_TONE[s][0]} dot>
          {ST_TONE[s][1]}
        </S.Badge>
        {staff && (
          <div style={{display: 'flex', gap: 4}}>
            <S.IconButton
              icon="minus"
              label="Use 250 g"
              size="sm"
              onClick={() => onAdjust(fil.id, -250)}
            />
            <S.IconButton
              icon="plus"
              label="Add 1 kg spool"
              size="sm"
              variant="primary"
              onClick={() => onAdjust(fil.id, 1000)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StockManager({stock, setStock, toast}) {
  const [draft, setDraft] = React.useState({
    name: '',
    hex: '#F2B705',
    material: 'pla',
    line: 'House PLA Matte',
    finish: 'matte',
    grams: 1000,
    shelf: '',
  });
  const upd = (id, patch) =>
    setStock(stock.map((f) => (f.id === id ? {...f, ...patch} : f)));
  const add = () => {
    if (!draft.name.trim()) return;
    const id =
      draft.material +
      '-' +
      draft.name.toLowerCase().replace(/\W+/g, '-') +
      '-' +
      Date.now().toString(36).slice(-3);
    setStock([...stock, {...draft, id, ar: '', grams: +draft.grams || 0}]);
    setDraft({...draft, name: ''});
    toast({
      tone: 'success',
      title: 'Filament added',
      message: draft.name + ' is now on the shelf.',
    });
  };
  const cell = {
    padding: '10px 12px',
    borderTop: '1.5px solid var(--border-1)',
    font: '500 14px/1.2 var(--font-body)',
    verticalAlign: 'middle',
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 320px',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <div
        style={{
          border: '2px solid var(--graphite-900)',
          borderRadius: 18,
          overflow: 'hidden',
          background: 'var(--paper-0)',
        }}
      >
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: 'var(--paper-2)'}}>
              {['Colour', 'Line', 'Shelf', 'On hand', 'Status', ''].map((h) => (
                <th
                  key={h}
                  style={{
                    ...stMono,
                    fontSize: 10.5,
                    textAlign: 'left',
                    padding: '10px 12px',
                    color: 'var(--fg-2)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stock.map((f) => {
              const s = baraStockStatus(f.grams);
              return (
                <tr key={f.id}>
                  <td style={cell}>
                    <div
                      style={{display: 'flex', alignItems: 'center', gap: 10}}
                    >
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 999,
                          background: f.hex,
                          border: '2px solid var(--graphite-900)',
                        }}
                      />
                      <b>{f.name}</b>
                    </div>
                  </td>
                  <td
                    style={{
                      ...cell,
                      ...stMono,
                      fontSize: 11,
                      color: 'var(--fg-2)',
                    }}
                  >
                    {f.line}
                  </td>
                  <td style={{...cell, ...stMono, fontSize: 11}}>{f.shelf}</td>
                  <td style={cell}>
                    <div
                      style={{display: 'flex', alignItems: 'center', gap: 6}}
                    >
                      <input
                        type="number"
                        step="50"
                        value={f.grams}
                        onChange={(e) =>
                          upd(f.id, {grams: Math.max(0, +e.target.value)})
                        }
                        style={{
                          width: 76,
                          height: 32,
                          border: '2px solid var(--border-2)',
                          borderRadius: 8,
                          padding: '0 8px',
                          font: '600 13px/1 var(--font-mono)',
                          background: 'var(--paper-0)',
                        }}
                      />
                      <span
                        style={{...stMono, fontSize: 10, color: 'var(--fg-3)'}}
                      >
                        g
                      </span>
                    </div>
                  </td>
                  <td style={cell}>
                    <S.Badge tone={ST_TONE[s][0]} dot>
                      {ST_TONE[s][1]}
                    </S.Badge>
                  </td>
                  <td style={{...cell, textAlign: 'right'}}>
                    <div style={{display: 'inline-flex', gap: 4}}>
                      <S.IconButton
                        icon="plus"
                        label="+1 kg spool"
                        size="sm"
                        variant="ghost"
                        onClick={() => upd(f.id, {grams: f.grams + 1000})}
                      />
                      <S.IconButton
                        icon="trash-2"
                        label="Remove"
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setStock(stock.filter((x) => x.id !== f.id))
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <S.Card variant="raised" padding={20}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <span className="b-h4">Add a filament</span>
          <S.Input
            label="Colour name"
            placeholder="e.g. Midnight"
            value={draft.name}
            onChange={(e) => setDraft({...draft, name: e.target.value})}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: 12,
            }}
          >
            <S.Select
              label="Material"
              value={draft.material}
              onChange={(e) => setDraft({...draft, material: e.target.value})}
              options={ST_MATS.map((m) => ({value: m.id, label: m.label}))}
            />
            <S.Select
              label="Finish"
              value={draft.finish}
              onChange={(e) => setDraft({...draft, finish: e.target.value})}
              options={[
                'matte',
                'silk',
                'gloss',
                'satin',
                'translucent',
                'speckle',
              ]}
            />
          </div>
          <S.Input
            label="Line / brand"
            value={draft.line}
            onChange={(e) => setDraft({...draft, line: e.target.value})}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto minmax(0,1fr) minmax(0,1fr)',
              gap: 12,
              alignItems: 'end',
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                font: '700 14px/1.2 var(--font-body)',
              }}
            >
              Hex
              <input
                type="color"
                value={draft.hex}
                onChange={(e) => setDraft({...draft, hex: e.target.value})}
                style={{
                  width: 48,
                  height: 44,
                  border: '2px solid var(--graphite-900)',
                  borderRadius: 12,
                  padding: 2,
                  background: 'var(--paper-0)',
                }}
              />
            </label>
            <S.Input
              label="Grams"
              type="number"
              value={draft.grams}
              suffix="g"
              onChange={(e) => setDraft({...draft, grams: e.target.value})}
            />
            <S.Input
              label="Shelf"
              placeholder="A5"
              value={draft.shelf}
              onChange={(e) => setDraft({...draft, shelf: e.target.value})}
            />
          </div>
          <S.Button icon="plus" onClick={add} disabled={!draft.name.trim()}>
            Add to stock
          </S.Button>
          <S.Button
            variant="ghost"
            size="sm"
            icon="rotate-ccw"
            onClick={() => {
              baraApi
                .get('stock', {fresh: true})
                .then((d) => {
                  setStock(d.items || d);
                  toast({
                    tone: 'info',
                    title: 'Stock reloaded',
                    message: 'Back to the published list.',
                  });
                })
                .catch(() =>
                  toast({tone: 'danger', title: 'Couldn’t reload stock'}),
                );
            }}
          >
            Reset to sample list
          </S.Button>
        </div>
      </S.Card>
    </div>
  );
}

function CatalogTint({models, fil, onOpen}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 24,
      }}
    >
      {models.map((m) => (
        <S.Card
          key={m.id}
          padding={0}
          interactive
          onClick={() => onOpen(m.id)}
          style={{overflow: 'hidden'}}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '1',
              background: 'var(--paper-2)',
              borderBottom: '2px solid var(--graphite-900)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '14% 18%',
                borderRadius:
                  m.id === 'taba'
                    ? '48% 48% 38% 38% / 56% 56% 44% 44%'
                    : m.id === 'planter'
                      ? '6% 6% 30% 30%'
                      : 14,
                background: '#d8d8d8',
                backgroundImage: 'var(--tex-layers-strong)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: fil.hex,
                mixBlendMode: 'multiply',
                opacity: 0.92,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 10,
                bottom: 10,
                ...stMono,
                fontSize: 9.5,
                background: 'rgba(252,250,244,.9)',
                padding: '4px 6px 3px',
                borderRadius: 6,
              }}
            >
              Neutral photo × multiply tint
            </span>
          </div>
          <div
            style={{
              padding: '12px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{font: '700 16px/1.2 var(--font-display)'}}>
              {m.name}
            </span>
            <span style={{font: '800 17px/1 var(--font-display)'}}>
              <span style={{...stMono, fontSize: 10, marginRight: 3}}>SAR</span>
              {m.price}
            </span>
          </div>
        </S.Card>
      ))}
    </div>
  );
}

Object.assign(window, {
  S,
  stMono,
  ST_TONE,
  ST_MATS,
  FilamentGrid,
  FilamentDetail,
  StockManager,
  CatalogTint,
});

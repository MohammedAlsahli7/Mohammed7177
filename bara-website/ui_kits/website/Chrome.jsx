function SiteHeader({route, go, lang, setLang, cartCount, openCart}) {
  const t = useT();
  const N = SITE.nav;
  const [open, setOpen] = React.useState(false);
  const links = [
    'shop',
    'custom',
    'sell',
    'materials',
    'loop',
    'about',
    'corner',
  ];
  const link = (id, block) => (
    <button
      key={id}
      onClick={() => {
        go(id);
        setOpen(false);
      }}
      style={{
        border: 0,
        background: route === id ? 'var(--yolk-500)' : 'transparent',
        borderRadius: 10,
        padding: block ? '14px 14px 12px' : '9px 11px 7px',
        font: '700 ' + (block ? 20 : 15) + 'px/1 var(--font-body)',
        color: 'var(--fg-1)',
        cursor: 'pointer',
        textAlign: 'start',
        whiteSpace: 'nowrap',
        fontFamily: lang ? 'var(--font-arabic)' : 'var(--font-body)',
      }}
    >
      {t(N[id])}
    </button>
  );
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--paper-1)',
      }}
    >
      <div
        style={{
          background: 'var(--graphite-900)',
          color: 'var(--paper-0)',
          textAlign: 'center',
          padding: '8px 16px 7px',
          font: lang
            ? '600 13px/1.4 var(--font-arabic)'
            : '600 12px/1.4 var(--font-mono)',
          letterSpacing: lang ? 0 : '.05em',
        }}
      >
        {t(SITE.announce)}
      </div>
      <div
        className="s-wrap"
        style={{height: 68, display: 'flex', alignItems: 'center', gap: 16}}
      >
        <button
          onClick={() => go('home')}
          style={{border: 0, background: 'none', padding: 0, cursor: 'pointer'}}
          aria-label="Home"
        >
          <B.Wordmark size={28} />
        </button>
        <nav className="s-links" style={{marginInlineStart: 12}}>
          {links.map((l) => link(l))}
        </nav>
        <div style={{flex: 1}} />
        <button
          onClick={() => setLang(lang ? 0 : 1)}
          style={{
            border: '2px solid var(--graphite-900)',
            background: 'var(--paper-0)',
            borderRadius: 10,
            height: 36,
            padding: '0 12px',
            font:
              '700 14px/1 ' +
              (lang ? 'var(--font-body)' : 'var(--font-arabic)'),
            cursor: 'pointer',
          }}
        >
          {lang ? 'EN' : 'عربي'}
        </button>
        <B.IconButton
          icon="shopping-bag"
          label="Cart"
          badge={cartCount || undefined}
          onClick={openCart}
        />
        <span className="s-burger">
          <B.IconButton
            icon={open ? 'x' : 'menu'}
            label="Menu"
            variant="ink"
            onClick={() => setOpen(!open)}
          />
        </span>
      </div>
      {open && (
        <div
          style={{
            borderTop: '2px solid var(--graphite-900)',
            background: 'var(--paper-0)',
            padding: '12px 16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {['home'].concat(links).map((l) => link(l, true))}
        </div>
      )}
      <LayerBar />
    </header>
  );
}

function SiteFooter({go}) {
  const t = useT();
  const N = SITE.nav;
  const col = (h, ids) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <span style={{...smMono, color: 'var(--yolk-500)'}}>{h}</span>
      {ids.map((id) => (
        <button
          key={id}
          onClick={() => go(id)}
          style={{
            border: 0,
            background: 'none',
            padding: 0,
            textAlign: 'start',
            color: 'var(--paper-0)',
            font: '500 16px/1.3 var(--font-body)',
            cursor: 'pointer',
          }}
        >
          {t(N[id])}
        </button>
      ))}
    </div>
  );
  return (
    <footer
      style={{
        marginTop: 112,
        background: 'var(--graphite-900)',
        backgroundImage: 'var(--tex-bed-inverse)',
        color: 'var(--paper-0)',
      }}
    >
      <div
        className="s-wrap"
        style={{
          padding: '56px 24px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            gridColumn: 'span 2',
            minWidth: 0,
          }}
        >
          <B.Wordmark size={40} color="var(--paper-0)" />
          <span
            style={{
              font: '800 26px/1.15 var(--font-display)',
              color: 'var(--yolk-500)',
            }}
          >
            {t(SITE.tagline)}
          </span>
          <p
            style={{
              margin: 0,
              color: 'var(--graphite-300)',
              font: '400 15px/1.55 var(--font-body)',
              maxWidth: 360,
            }}
          >
            {t(SITE.footer.blurb)}
          </p>
          <div style={{marginTop: 4}}>
            <B.Mascot pose="sleepy" size={96} color="yolk" swirl="pla" />
          </div>
        </div>
        {col('Shop', ['shop', 'custom', 'sell', 'materials'])}
        {col('Studio', ['loop', 'about', 'corner'])}
        {(baraApi.config.contactEmail || baraApi.config.whatsapp) && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <span style={{...smMono, color: 'var(--yolk-500)'}}>
              {t(['Contact', 'تواصل'])}
            </span>
            {baraApi.config.contactEmail && (
              <a
                href={'mailto:' + baraApi.config.contactEmail}
                style={{
                  color: 'var(--paper-0)',
                  font: '500 16px/1.3 var(--font-body)',
                  background: 'none',
                }}
              >
                {baraApi.config.contactEmail}
              </a>
            )}
            {baraApi.config.whatsapp && (
              <a
                href={'https://wa.me/' + baraApi.config.whatsapp}
                target="_blank"
                rel="noopener"
                style={{
                  color: 'var(--paper-0)',
                  font: '500 16px/1.3 var(--font-body)',
                  background: 'none',
                }}
              >
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
      <div
        className="s-wrap"
        style={{
          padding: '16px 24px 24px',
          borderTop: '1.5px solid var(--graphite-700)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          ...smMono,
          fontSize: 11,
          color: 'var(--graphite-400)',
        }}
      >
        <span>
          {t(SITE.footer.rights).replace(/2026|٢٠٢٦/, (m) =>
            m === '2026'
              ? String(new Date().getFullYear())
              : String(new Date().getFullYear()).replace(
                  /\d/g,
                  (d) => '٠١٢٣٤٥٦٧٨٩'[d],
                ),
          )}
        </span>
        <span>Printed at 0.20 mm</span>
      </div>
    </footer>
  );
}

function CartDrawer({open, items, onClose, setQty, onCheckout, busy}) {
  const t = useT();
  React.useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
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
        role="dialog"
        aria-modal="true"
        aria-label={t(SITE.cart.title)}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(420px, 100%)',
          height: '100%',
          background: 'var(--paper-1)',
          borderInlineStart: '2px solid var(--graphite-900)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px',
            borderBottom: '2px solid var(--graphite-900)',
          }}
        >
          <span style={{font: '800 22px/1 var(--font-display)'}}>
            {t(SITE.cart.title)} · {items.reduce((s, i) => s + i.qty, 0)}
          </span>
          <B.IconButton
            icon="x"
            label="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>
        <div
          className="thin-scroll"
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {!items.length && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: 32,
                textAlign: 'center',
              }}
            >
              <B.Mascot pose="sleepy" size={120} color="tpu" />
              <span
                style={{
                  font: '600 16px/1.4 var(--font-body)',
                  color: 'var(--fg-2)',
                }}
              >
                {t(SITE.cart.empty)}
              </span>
            </div>
          )}
          {items.map((it, i) => (
            <div
              key={i}
              style={{display: 'flex', gap: 12, alignItems: 'center'}}
            >
              <div
                style={{
                  width: 64,
                  flexShrink: 0,
                  border: '2px solid var(--graphite-900)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <B.MediaPlaceholder
                  label=" "
                  tone={it.tone}
                  ratio="1 / 1"
                  radius={0}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{font: '700 15px/1.2 var(--font-body)'}}>
                  {t([it.en, it.ar])}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    ...smMono,
                    fontSize: 10.5,
                    color: 'var(--fg-3)',
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 99,
                      background: it.hex,
                      border: '1.5px solid var(--graphite-900)',
                    }}
                  />
                  {B.MATERIALS[it.mat].name}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                <Price v={it.price * it.qty} size={16} />
                <B.QuantityStepper
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
            padding: 20,
            borderTop: '2px dashed var(--border-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{font: '700 16px/1 var(--font-body)'}}>
              {t(SITE.cart.sub)}
            </span>
            <Price v={total} size={26} />
          </div>
          <B.Button
            size="lg"
            fullWidth
            iconRight="arrow-right"
            disabled={!items.length || busy}
            onClick={onCheckout}
          >
            {busy ? t(SITE.sys.sending) : t(SITE.cart.checkout)}
          </B.Button>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, {SiteHeader, SiteFooter, CartDrawer});

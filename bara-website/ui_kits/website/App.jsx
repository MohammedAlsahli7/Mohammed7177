// App shell: boots data, routes, cart (persisted), shared form helpers.
const SITE_ROUTES = [
  'home',
  'shop',
  'product',
  'custom',
  'materials',
  'loop',
  'about',
  'corner',
  'sell',
];
const parseRoute = () => {
  const [r, id] = location.hash.replace(/^#\/?/, '').split('/');
  return {r: r || 'home', id: id && decodeURIComponent(id)};
};
const CART_KEY = 'bara-cart-v1';
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
const mailto = (subject, body) => {
  const e = baraApi.config.contactEmail;
  return e
    ? 'mailto:' +
        e +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body || '')
    : null;
};

// Submits to a configured endpoint; on failure tells the customer exactly what
// to do next.
function useSend(toast) {
  const t = useT();
  const [busy, setBusy] = React.useState(false);
  const run = async (name, body, ok, fallbackSubject) => {
    setBusy(true);
    try {
      const res = await baraApi.send(name, body);
      ok && ok(res);
      return res;
    } catch (e) {
      const mail = baraApi.config.contactEmail;
      toast({
        tone: 'danger',
        title: t(SITE.sys.sendFail),
        message:
          e.code === 'not-configured' || !navigator.onLine
            ? mail
              ? t(SITE.sys.sendFailMail) + ' ' + mail
              : t(SITE.sys.sendFailRetry)
            : t(SITE.sys.sendFailRetry),
        action: mail ? 'Email' : undefined,
        onAction: mail
          ? () => {
              location.href = mailto(fallbackSubject || 'Bara’');
            }
          : undefined,
      });
      return null;
    } finally {
      setBusy(false);
    }
  };
  return [run, busy];
}

// Real file picker + drag-and-drop. Reads dimensions/volume locally; the file
// itself is sent with the form.
const MESH_EXT = ['stl', '3mf', 'obj'];
function FileDrop({onFile, render, maxMB = 100, toast}) {
  const t = useT();
  const ref = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const take = async (f) => {
    if (!f) return;
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (!MESH_EXT.includes(ext)) {
      toast && toast({tone: 'danger', title: t(SITE.sys.badFile)});
      return;
    }
    if (f.size > maxMB * 1048576) {
      toast && toast({tone: 'danger', title: t(SITE.sys.fileTooLarge)});
      return;
    }
    setBusy(true);
    const mesh = await baraApi.readMesh(f);
    setBusy(false);
    onFile(mesh);
    crew('file');
  };
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={ref}
        type="file"
        accept=".stl,.3mf,.obj"
        hidden
        onChange={(e) => {
          take(e.target.files[0]);
          e.target.value = '';
        }}
      />
      {render({busy, over, open: () => ref.current && ref.current.click()})}
    </div>
  );
}
const meshDims = (m) =>
  m && m.dims ? m.dims.map((d) => Math.round(d)).join(' × ') + ' mm' : null;

function StateScreen({kind, onRetry, go}) {
  const t = useT();
  const S = SITE.sys;
  const map = {
    loading: ['printing', S.loading],
    error: ['oops', S.loadFail, S.loadFailSub],
    notfound: ['oops', S.notFound, S.notFoundSub],
  };
  const [pose, title, sub] = map[kind];
  return (
    <div
      className="s-wrap"
      role={kind === 'loading' ? 'status' : 'alert'}
      style={{
        minHeight: '56vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        textAlign: 'center',
        padding: '64px 24px',
      }}
    >
      <B.Mascot pose={pose} size={150} />
      <b style={{font: '800 28px/1.1 var(--font-display)'}}>{t(title)}</b>
      {sub && (
        <p
          style={{
            margin: 0,
            font: '500 16px/1.5 var(--font-body)',
            color: 'var(--fg-2)',
          }}
        >
          {t(sub)}
        </p>
      )}
      {kind === 'error' && (
        <B.Button icon="rotate-ccw" onClick={onRetry}>
          {t(S.retry)}
        </B.Button>
      )}
      {kind === 'notfound' && go && (
        <B.Button iconRight="arrow-right" onClick={() => go('shop')}>
          {t(S.toShop)}
        </B.Button>
      )}
    </div>
  );
}

const WHO_KEY = 'bara-who-v1';
const whoOk = (w) =>
  !!(
    w &&
    w.name.trim() &&
    (emailOk(w.email) || /\d{8,}/.test((w.phone || '').replace(/\D/g, '')))
  );
/**
 * Contact details remembered on this device for the next checkout.
 * @return {{name: string, phone: string, email: string}}
 */
function loadWho() {
  try {
    const w = JSON.parse(localStorage.getItem(WHO_KEY));
    if (w && typeof w === 'object') {
      return {name: '', phone: '', email: '', ...w};
    }
  } catch (e) {
    /* Best effort: storage may be unavailable. */
  }
  return {name: '', phone: '', email: ''};
}
function loadCart() {
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(c) ? c : [];
  } catch (e) {
    return [];
  }
}
// Re-validate a saved cart against the live catalogue: drop removed products,
// refresh prices.
const syncCart = (cart) =>
  cart
    .map((it) => {
      const p = SITE_PRODUCTS.find((x) => x.id === it.id);
      return p ? {...p, mat: it.mat, hex: it.hex, qty: it.qty} : null;
    })
    .filter(Boolean);

function App() {
  const [route, setRoute] = React.useState(parseRoute());
  const [lang, setLang] = React.useState(() => {
    const s = localStorage.getItem('bara-site-lang');
    return s != null ? +s : /^ar/i.test(navigator.language || '') ? 1 : 0;
  });
  const [boot, setBoot] = React.useState({status: 'loading'});
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [toast, setToastS] = React.useState(null);
  const [checking, setChecking] = React.useState(false);
  const [who, setWho] = React.useState(loadWho);
  const start = React.useCallback(() => {
    setBoot({status: 'loading'});
    baraApi
      .boot()
      .then((d) => {
        setCart(syncCart(loadCart()));
        setBoot({status: 'ready', ...d});
      })
      .catch((e) => {
        console.error('[bara] data load failed', e);
        setBoot({status: 'error'});
      });
  }, []);
  React.useEffect(start, []);
  React.useEffect(() => {
    const on = () => {
      setRoute(parseRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem(WHO_KEY, JSON.stringify(who));
    } catch (e) {
      /* Best effort: storage may be unavailable. */
    }
  }, [who]);
  // Back from the payment page: /?order=REF&payment=paid|cancelled|pending
  React.useEffect(() => {
    if (boot.status !== 'ready') return;
    const q = new URLSearchParams(location.search);
    const state = q.get('payment');
    if (!state) return;
    const ref = q.get('order') || '';
    history.replaceState(null, '', location.pathname + location.hash);
    if (state === 'paid') {
      setCart([]);
      crew('cart', {});
      toastIt({
        tone: 'success',
        title: SITE.cart.paid[lang],
        message: SITE.cart.paidMsg[lang].replace('{ref}', ref),
      });
    } else if (state === 'cancelled') {
      toastIt({tone: 'warning', title: SITE.cart.payCancelled[lang]});
    } else {
      toastIt({tone: 'info', title: SITE.cart.payPending[lang]});
    }
  }, [boot.status]);
  React.useEffect(() => {
    localStorage.setItem('bara-site-lang', lang);
    document.documentElement.lang = lang ? 'ar' : 'en';
    document.documentElement.dir = lang ? 'rtl' : 'ltr';
  }, [lang]);
  React.useEffect(() => {
    if (boot.status === 'ready') {
      try {
        localStorage.setItem(
          CART_KEY,
          JSON.stringify(
            cart.map(({id, mat, hex, qty}) => ({id, mat, hex, qty})),
          ),
        );
      } catch (e) {
        /* Best effort: storage may be unavailable. */
      }
    }
  }, [cart, boot.status]);
  const go = (r, id) => {
    location.hash = '/' + r + (id ? '/' + encodeURIComponent(id) : '');
  };
  const toastIt = (x) => {
    setToastS(x);
    clearTimeout(window.__st);
    window.__st = setTimeout(
      () => setToastS(null),
      x.tone === 'danger' ? 6000 : 2800,
    );
  };
  const add = (p, q = 1) => {
    const mat = p.mat || p.mats[0];
    const hex = p.hex || ((SITE_COLOURS[mat] || [])[0] || [])[0];
    if (!hex) {
      toastIt({tone: 'warning', title: SITE.sys.outOfStock[lang]});
      return;
    }
    setCart((c) => {
      const k = c.findIndex(
        (x) => x.id === p.id && x.mat === mat && x.hex === hex,
      );
      return k > -1
        ? c.map((x, j) => (j === k ? {...x, qty: x.qty + q} : x))
        : [...c, {...p, mat, hex, qty: q}];
    });
    crew('cart', {hex});
    toastIt({
      tone: 'success',
      title: SITE.cart.added[lang],
      message: (lang ? p.ar : p.en) + ' · ' + B.MATERIALS[mat].name,
      action: lang ? 'السلة' : 'View',
      onAction: () => {
        setCartOpen(true);
        setToastS(null);
      },
    });
  };
  const nItems = cart.reduce((s, i) => s + i.qty, 0);
  const nag = (d = 0) => {
    clearTimeout(window.__nag);
    window.__nag = setTimeout(() => {
      if (Date.now() - (window.__lastNag || 0) < 20000) return;
      window.__lastNag = Date.now();
      crew('hoard', {n: window.__nItems, ar: lang});
    }, d);
  };
  React.useEffect(() => {
    window.__nItems = nItems;
    clearTimeout(window.__idleNag);
    if (nItems > 0 && !cartOpen) {
      window.__idleNag = setTimeout(() => nag(), 40000);
    }
    if (nItems >= 5 && !cartOpen && Math.random() < 0.5) nag(5200);
    return () => clearTimeout(window.__idleNag);
  }, [nItems, cartOpen]);
  const closeCart = () => {
    setCartOpen(false);
    if (nItems >= 3 && Math.random() < 0.6) nag(600);
  };
  const setQty = (i, n) =>
    setCart((c) =>
      n <= 0
        ? c.filter((_, j) => j !== i)
        : c.map((x, j) => (j === i ? {...x, qty: n} : x)),
    );
  const checkout = async () => {
    const items = cart.map(({id, mat, hex, qty, price}) => ({
      id,
      material: mat,
      colour: hex,
      qty,
      unitPrice: price,
    }));
    const summary = cart
      .map(
        (i) =>
          i.qty +
          ' × ' +
          i.en +
          ' (' +
          B.MATERIALS[i.mat].name +
          ', ' +
          i.hex +
          ')',
      )
      .join('\n');
    if (!baraApi.configured('checkout')) {
      const m = mailto('Order', summary);
      toastIt({
        tone: 'warning',
        title: SITE.sys.checkoutOff[lang],
        action: m ? SITE.sys.checkoutMail[lang] : undefined,
        onAction: m
          ? () => {
              location.href = m;
            }
          : undefined,
      });
      return;
    }
    if (!whoOk(who)) {
      toastIt({tone: 'warning', title: SITE.cart.whoNeeded[lang]});
      return;
    }
    setChecking(true);
    try {
      const res = await baraApi.send('checkout', {
        items,
        lang: lang ? 'ar' : 'en',
        customer: who,
      });
      if (res && res.url) location.href = res.url;
      else throw new Error('no url');
    } catch (e) {
      toastIt({
        tone: 'danger',
        title: SITE.sys.sendFail[lang],
        message: SITE.sys.sendFailRetry[lang],
      });
    } finally {
      setChecking(false);
    }
  };
  const {r, id} = route;
  const known = SITE_ROUTES.includes(r);
  React.useEffect(() => {
    const n = SITE.nav[r];
    const p =
      r === 'product' &&
      boot.status === 'ready' &&
      SITE_PRODUCTS.find((x) => x.id === id);
    document.title =
      (p ? (lang ? p.ar : p.en) : n ? n[lang] : SITE.tagline[lang]) +
      ' · ' +
      (lang ? 'برأ' : 'Bara’');
  }, [r, id, lang, boot.status]);
  const page = () => {
    if (boot.status === 'loading') return <StateScreen kind="loading" />;
    if (boot.status === 'error') {
      return <StateScreen kind="error" onRetry={start} />;
    }
    if (!known) return <StateScreen kind="notfound" go={go} />;
    return (
      <>
        {r === 'home' && <HomePage go={go} add={add} />}
        {r === 'shop' && <ShopPage go={go} add={add} id={id} />}
        {r === 'product' && <ProductPage id={id} go={go} add={add} />}
        {r === 'custom' && <CustomPage toast={toastIt} />}
        {r === 'materials' && <MaterialsPage go={go} />}
        {r === 'loop' && <LoopPage />}
        {r === 'about' && <AboutPage />}
        {r === 'corner' && <CornerPage toast={toastIt} />}
        {r === 'sell' && <SellPage toast={toastIt} />}
      </>
    );
  };
  const ready = boot.status === 'ready';
  return (
    <LangCtx.Provider value={lang}>
      <div
        dir={lang ? 'rtl' : 'ltr'}
        style={{fontFamily: lang ? 'var(--font-arabic)' : 'var(--font-body)'}}
      >
        <a href="#main" className="s-skip">
          {lang ? 'تخطَّ للمحتوى' : 'Skip to content'}
        </a>
        <SiteHeader
          route={r}
          go={go}
          lang={lang}
          setLang={setLang}
          cartCount={nItems}
          openCart={() => setCartOpen(true)}
        />
        <main id="main" tabIndex={-1} key={r + (id || '') + lang + boot.status}>
          {page()}
        </main>
        <SiteFooter go={go} />
        {ready && (
          <>
            <CrewDock />
            <CartRunner />
            <PeekCrew />
          </>
        )}
        <SlicerScroll />
        <CartDrawer
          open={cartOpen}
          items={cart}
          onClose={closeCart}
          setQty={setQty}
          onCheckout={checkout}
          busy={checking}
          who={baraApi.configured('checkout') ? who : null}
          setWho={setWho}
        />
        {toast && (
          <div
            aria-live="polite"
            style={{
              position: 'fixed',
              top: 84,
              left: 16,
              right: 16,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 60,
              pointerEvents: 'none',
            }}
          >
            <div style={{pointerEvents: 'auto'}}>
              <B.Toast
                {...toast}
                onAction={toast.onAction}
                onClose={() => setToastS(null)}
              />
            </div>
          </div>
        )}
      </div>
    </LangCtx.Provider>
  );
}

Object.assign(window, {
  App,
  useSend,
  FileDrop,
  meshDims,
  emailOk,
  mailto,
  StateScreen,
});
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

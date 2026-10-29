const DS = window.InfillDesignSystem_d33a9b;

const SF_PRODUCTS = [
  { id: 'tower', title: 'Hex Dice Tower', ar: 'برج النرد', price: 89, mats: ['pla', 'petg'], cat: 'games', tone: 'pla', badge: 'New', spec: '0.20 mm · 15% infill · 6 h' },
  { id: 'insert', title: 'Board Game Insert', ar: 'منظم صندوق اللعبة', price: 120, mats: ['pla'], cat: 'games', tone: 'yolk', spec: '0.24 mm · made to your box' },
  { id: 'grip', title: 'Squish Grip', ar: 'مقبض مرن', price: 35, mats: ['tpu'], cat: 'home', tone: 'tpu', badge: 'Bendy', badgeTone: 'tpu', spec: '0.16 mm · 100% TPU' },
  { id: 'goblin', title: 'Goblin Desk Tidy', ar: 'منظم العفريت', price: 59, mats: ['pla'], cat: 'home', tone: 'paper', spec: '0.20 mm · 20% infill · 4 h' },
  { id: 'meeple', title: 'Meeple Pack ×20', ar: 'قطع ميبل ×٢٠', price: 45, mats: ['pla', 'petg'], cat: 'games', tone: 'petg', spec: '0.12 mm · solid' },
  { id: 'snake', title: 'Cable Snake', ar: 'ثعبان الأسلاك', price: 25, mats: ['tpu'], cat: 'home', tone: 'tpu', spec: '0.20 mm · flexible' },
  { id: 'pot', title: 'Strata Planter', ar: 'أصيص الطبقات', price: 75, mats: ['petg'], cat: 'home', tone: 'petg', badge: 'Watertight', badgeTone: 'petg', spec: '0.28 mm · vase mode' },
  { id: 'cards', title: 'Card Holder Duo', ar: 'حامل البطاقات', price: 39, mats: ['petg', 'pla'], cat: 'games', tone: 'paper', spec: '0.20 mm · 2 pcs' },
];

const SF_T = {
  en: { shop: 'Shop', games: 'Games', home: 'Home & desk', custom: 'Custom print', materials: 'Materials', cart: 'Cart', search: 'Search dice towers, meeples…' },
  ar: { shop: 'المتجر', games: 'ألعاب', home: 'المنزل والمكتب', custom: 'اطبع ملفك', materials: 'الخامات', cart: 'السلة', search: 'دوّر على أبراج نرد، قطع ألعاب…' },
};

function SfHeader({ lang, setLang, go, route, cartCount, openCart }) {
  const t = SF_T[lang];
  const link = (id, label) => (
    <button key={id} onClick={() => go(id)} style={{ border: 0, background: route === id ? 'var(--yolk-500)' : 'transparent', borderRadius: 10, padding: '8px 12px 6px', font: '700 15px/1 var(--font-body)', color: 'var(--fg-1)', cursor: 'pointer' }}>{label}</button>
  );
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--paper-1)', borderBottom: '2px solid var(--graphite-900)' }}>
      <div style={{ background: 'var(--graphite-900)', color: 'var(--paper-0)', font: '600 12px/1 var(--font-mono)', letterSpacing: '.06em', textAlign: 'center', padding: '8px 0 7px' }}>
        {lang === 'en' ? 'FREE PICKUP IN RIYADH · BRING US 1 KG OF FAILED PRINTS, GET SAR 20 OFF' : 'الاستلام ببلاش في الرياض · جيب كيلو من طبعاتك الخربانة وخذ ٢٠ ريال خصم'}
      </div>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', height: 'var(--header-h)', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <button onClick={() => go('home')} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}><DS.Wordmark size={30} /></button>
        <nav style={{ display: 'flex', gap: 4 }}>{link('catalog', t.shop)}{link('quote', t.custom)}</nav>
        <div style={{ flex: 1 }} />
        <DS.Input size="sm" icon="search" placeholder={t.search} style={{ width: 260 }} />
        <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{ border: '2px solid var(--graphite-900)', background: 'var(--paper-0)', borderRadius: 10, height: 34, padding: '0 10px', font: '700 14px/1 var(--font-arabic)', cursor: 'pointer' }}>{lang === 'en' ? 'عربي' : 'EN'}</button>
        <DS.IconButton icon="user" label="Account" variant="ghost" />
        <DS.IconButton icon="shopping-bag" label={t.cart} badge={cartCount || undefined} onClick={openCart} />
      </div>
    </header>
  );
}

function SfFooter({ lang }) {
  return (
    <footer style={{ background: 'var(--graphite-900)', color: 'var(--paper-0)', backgroundImage: 'var(--tex-bed-inverse)', marginTop: 80 }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '56px 24px 40px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <DS.Wordmark size={40} color="var(--paper-0)" tagline="Weirdly specific things, printed." />
          <p style={{ margin: 0, font: '400 15px/1.5 var(--font-body)', color: 'var(--graphite-300)', maxWidth: 320 }}>A small print studio in Riyadh. Six printers, too many filament spools, zero tolerance for stringing.</p>
        </div>
        {[['Shop', ['Games', 'Home & desk', 'Gift cards']], ['Make', ['Custom print', 'Materials guide', 'File checklist']], ['Studio', ['Recycling', 'Visit us', 'Contact']]].map(([h, ls]) => (
          <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="b-overline" style={{ color: 'var(--yolk-500)' }}>{h}</span>
            {ls.map((l) => <span key={l} style={{ font: '500 15px/1.2 var(--font-body)', color: 'var(--paper-0)' }}>{l}</span>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1.5px solid var(--graphite-700)', maxWidth: 'var(--container)', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', font: '500 12px/1 var(--font-mono)', color: 'var(--graphite-400)' }}>
        <span>© 2026 BARA' 3D PRINT STUDIO</span><span>PRINTED AT 0.20 MM</span>
      </div>
    </footer>
  );
}

Object.assign(window, { DS, SF_PRODUCTS, SF_T, SfHeader, SfFooter });

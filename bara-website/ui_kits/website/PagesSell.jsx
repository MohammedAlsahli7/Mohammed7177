// Creator programme: upload an STL to sell. Original designs earn points per
// sale; curated public designs (licence must allow commercial use) earn a one-
// time bonus on the first sale to someone else.
function SellPage({toast}) {
  const t = useT();
  const i = useLangIdx();
  const [file, setFile] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const me = useCreator();
  const mine = (me && me.listings) || [];
  const [send, busy] = useSend(toast);
  const [kind, setKind] = React.useState('orig');
  const [own, setOwn] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [lic, setLic] = React.useState('');
  const [credit, setCredit] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const src = /makerworld\./i.test(link)
    ? 'makerworld'
    : /printables\./i.test(link)
      ? 'printables'
      : null;
  const linkOk = /^https?:\/\/\S+\.\S+/.test(link.trim());
  const licO = SELL_LIC.find((x) => x.v === lic);
  const blocked = kind === 'cur' && licO && !licO.ok;
  const ready =
    file &&
    title.trim() &&
    emailOk(email) &&
    !busy &&
    (kind === 'orig' ? own : linkOk && licO && licO.ok && credit);
  const submit = () => {
    const fd = new FormData();
    fd.append('file', file.file);
    fd.append('title', title.trim());
    fd.append('kind', kind);
    fd.append('email', email.trim());
    fd.append('lang', i ? 'ar' : 'en');
    if (kind === 'cur') {
      fd.append('link', link.trim());
      fd.append('licence', lic);
      fd.append('platform', src || '');
    } else fd.append('ownership_confirmed', 'true');
    send(
      'sell',
      fd,
      () => {
        setSent(true);
        crew('quote');
        toast({
          tone: 'success',
          title: t(['Sent for review', 'انرسل للمراجعة']),
          message: t([
            'We test-print it, then it goes live in the shop.',
            'نجرب نطبعه، وبعدها ينزل بالمتجر.',
          ]),
        });
      },
      'Creator submission — ' + title,
    );
  };
  const reset = () => {
    setSent(false);
    setFile(null);
    setTitle('');
    setOwn(false);
    setLink('');
    setLic('');
    setCredit(false);
  };
  const total =
    me && me.points != null
      ? me.points
      : mine.reduce((s, x) => s + (x.points || 0), 0);
  const box = {
    border: '2px solid var(--graphite-900)',
    borderRadius: 20,
    padding: 22,
    background: 'var(--paper-0)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  };
  const step = (n, label) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 99,
          background: 'var(--graphite-900)',
          color: 'var(--yolk-500)',
          display: 'grid',
          placeItems: 'center',
          font: '700 13px/1 var(--font-mono)',
          flexShrink: 0,
        }}
      >
        {n}
      </span>
      <b style={{font: '800 20px/1.15 var(--font-display)'}}>{t(label)}</b>
    </div>
  );
  const choice = (v, icon, label, desc, earn) => (
    <button
      onClick={() => setKind(v)}
      style={{
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        borderRadius: 16,
        cursor: 'pointer',
        border: '2px solid var(--graphite-900)',
        background: kind === v ? 'var(--yolk-300)' : 'var(--paper-0)',
        boxShadow: kind === v ? 'var(--shadow-hard-sm)' : 'none',
        transition: 'background .2s, box-shadow .2s',
        minWidth: 0,
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          font: '700 16px/1.2 var(--font-body)',
          color: 'var(--graphite-900)',
        }}
      >
        <B.Icon name={icon} size={18} />
        {t(label)}
      </span>
      <span
        style={{
          font: '500 14px/1.45 var(--font-body)',
          color: 'var(--graphite-800)',
        }}
      >
        {t(desc)}
      </span>
      <span
        style={{
          ...smMono,
          fontSize: 11,
          color: 'var(--graphite-900)',
          background: 'var(--paper-0)',
          border: '1.5px solid var(--graphite-900)',
          borderRadius: 6,
          padding: '4px 7px 3px',
          alignSelf: 'flex-start',
        }}
      >
        {t(earn)}
      </span>
    </button>
  );
  return (
    <div>
      <PageHead
        over={['Creators', 'المصممين']}
        title={['Sell your design. Earn points.', 'بيع تصميمك. واجمع نقاط.']}
        sub={[
          'Upload an STL, we print and ship every order. You earn points each time it sells.',
          'ارفع ملف STL، وإحنا نطبع ونوصل كل طلب. وأنت تجمع نقاط مع كل بيعة.',
        ]}
      />
      <div className="s-wrap s-split" style={{alignItems: 'start'}}>
        {sent ? (
          <div
            style={{
              ...box,
              alignItems: 'center',
              textAlign: 'center',
              padding: 40,
            }}
          >
            <B.Mascot pose="cheer" size={150} />
            <b style={{font: '800 28px/1.1 var(--font-display)'}}>
              {t(['In review!', 'قيد المراجعة!'])}
            </b>
            <p
              style={{
                margin: 0,
                font: '500 16px/1.5 var(--font-body)',
                color: 'var(--fg-2)',
                maxWidth: 420,
                textWrap: 'pretty',
              }}
            >
              {kind === 'orig'
                ? t([
                    'We’ll test-print “' +
                      title +
                      '” and check it’s yours. Then it goes live and every sale adds ' +
                      SELL_PTS.perSale +
                      ' points.',
                    'بنجرب نطبع "' +
                      title +
                      '" ونتأكد إنه تصميمك. بعدها ينزل، وكل بيعة تضيف لك ' +
                      SELL_PTS.perSale +
                      ' نقاط.',
                  ])
                : t([
                    'We’ll check the link and licence. The original designer is credited on the listing, and you get ' +
                      SELL_PTS.curatedOnce +
                      ' points once, the first time someone else buys it.',
                    'بنتأكد من الرابط والرخصة. اسم المصمم الأصلي يطلع على المنتج، وأنت تاخذ ' +
                      SELL_PTS.curatedOnce +
                      ' نقطة مرة وحدة، أول ما يشتريه أحد غيرك.',
                  ])}
            </p>
            <B.Button variant="secondary" icon="plus" onClick={reset}>
              {t(['Upload another', 'ارفع واحد ثاني'])}
            </B.Button>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div style={box}>
              {step(1, ['Upload the STL', 'ارفع الملف'])}
              {!file ? (
                <FileDrop
                  toast={toast}
                  onFile={setFile}
                  render={({busy: reading, open}) => (
                    <button
                      type="button"
                      onClick={open}
                      disabled={reading}
                      style={{
                        width: '100%',
                        border: '2px dashed var(--graphite-900)',
                        borderRadius: 18,
                        background: 'var(--paper-1)',
                        backgroundImage: 'var(--tex-bed)',
                        padding: '32px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                      }}
                    >
                      <B.Mascot
                        pose={reading ? 'printing' : 'peer'}
                        size={110}
                      />
                      <span style={{font: '800 20px/1.15 var(--font-display)'}}>
                        {reading
                          ? t(['Checking the mesh…', 'نفحص الملف…'])
                          : t(['Drop your STL here', 'حط ملف STL هنا'])}
                      </span>
                      <span
                        style={{...smMono, fontSize: 11, color: 'var(--fg-3)'}}
                      >
                        STL · 3MF · OBJ · {t(['up to 100 MB', 'لين ١٠٠ ميجا'])}
                      </span>
                    </button>
                  )}
                />
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px minmax(0,1fr) auto',
                    gap: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '2px solid var(--graphite-900)',
                    }}
                  >
                    <B.MediaPlaceholder
                      label={file.ext.toUpperCase()}
                      tone="ink"
                      texture="bed"
                      ratio="1 / 1"
                      radius={0}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      minWidth: 0,
                    }}
                  >
                    <b
                      style={{
                        font: '700 16px/1.2 var(--font-body)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {file.name}
                    </b>
                    <span
                      style={{...smMono, fontSize: 11, color: 'var(--fg-3)'}}
                    >
                      {[file.size, meshDims(file)].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  <B.IconButton
                    icon="trash-2"
                    label="Remove"
                    variant="ghost"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}
              <B.Input
                label={t(['Listing name', 'اسم المنتج'])}
                placeholder={t(['e.g. Cable Comb 12×', 'مثلًا: مشط أسلاك ١٢'])}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <B.Input
                label={t(SITE.sys.email)}
                type="email"
                icon="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={
                  email && !emailOk(email) ? t(SITE.sys.emailBad) : undefined
                }
              />
            </div>

            <div style={box}>
              {step(2, ['Whose design is it?', 'التصميم حق مين؟'])}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 12,
                }}
              >
                {choice(
                  'orig',
                  'pen-tool',
                  ['My original design', 'تصميمي أنا'],
                  [
                    'You made it from scratch and own the rights.',
                    'سويته من الصفر والحقوق لك.',
                  ],
                  [
                    '+' + SELL_PTS.perSale + ' pts every sale',
                    '+' + SELL_PTS.perSale + ' نقاط كل بيعة',
                  ],
                )}
                {choice(
                  'cur',
                  'link',
                  ['A public design I found', 'تصميم عام لقيته'],
                  [
                    'From MakerWorld, Printables or similar. The designer is credited.',
                    'من MakerWorld أو Printables أو غيرها، واسم المصمم يطلع.',
                  ],
                  [
                    '+' +
                      SELL_PTS.curatedOnce +
                      ' pts once, first sale to someone else',
                    '+' +
                      SELL_PTS.curatedOnce +
                      ' نقطة مرة وحدة، أول بيعة لغيرك',
                  ],
                )}
              </div>
              {kind === 'orig' ? (
                <div
                  style={{
                    border: '2px solid var(--graphite-900)',
                    borderRadius: 14,
                    padding: 16,
                    background: 'var(--paper-1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <span style={{...smMono, fontSize: 11, color: 'var(--fg-2)'}}>
                    {t(['Disclaimer', 'إقرار'])}
                  </span>
                  <B.Checkbox
                    checked={own}
                    onChange={setOwn}
                    label={t([
                      'I confirm this is my original design',
                      'أقر إن هذا تصميمي الأصلي',
                    ])}
                    description={t([
                      'I created it, it isn’t copied or remixed from anyone else’s model, and I allow Bara’ to print and sell it. If that turns out to be false, the listing is removed and its points are cancelled.',
                      'أنا اللي صممته، ومو منسوخ ولا معدّل من موديل أحد ثاني، وأسمح لبرأ تطبعه وتبيعه. لو طلع الكلام غلط، ينشال المنتج وتنلغي نقاطه.',
                    ])}
                  />
                </div>
              ) : (
                <div
                  style={{
                    border: '2px solid var(--graphite-900)',
                    borderRadius: 14,
                    padding: 16,
                    background: 'var(--paper-1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-end',
                      flexWrap: 'wrap',
                    }}
                  >
                    <B.Input
                      label={t(['Link to the original', 'رابط التصميم الأصلي'])}
                      icon="link"
                      placeholder="https://makerworld.com/…"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      error={
                        link && !linkOk
                          ? t(['That doesn’t look like a link', 'هذا مو رابط'])
                          : undefined
                      }
                      style={{flex: 1, minWidth: 220}}
                    />
                    {src && (
                      <div style={{paddingBottom: 8}}>
                        <SourceChip p={{src}} size="lg" />
                      </div>
                    )}
                  </div>
                  <B.Select
                    label={t([
                      'Licence on the original page',
                      'الرخصة في صفحة التصميم',
                    ])}
                    value={lic}
                    onChange={(e) => setLic(e.target.value)}
                    options={[
                      {
                        value: '',
                        label: t(['Choose the licence…', 'اختر الرخصة…']),
                      },
                      ...SELL_LIC.map((x) => ({value: x.v, label: t(x.l)})),
                    ]}
                    hint={t([
                      'We only sell designs whose creator allows commercial use or remixing for sale.',
                      'نبيع بس التصاميم اللي صاحبها سمح بالاستخدام التجاري أو التعديل للبيع.',
                    ])}
                  />
                  {blocked && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center',
                        border: '2px solid var(--graphite-900)',
                        borderRadius: 14,
                        padding: 12,
                        background: 'var(--danger-tint)',
                      }}
                    >
                      <B.Goblin mood="judge" size={64} />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                        }}
                      >
                        <b style={{font: '700 15px/1.3 var(--font-body)'}}>
                          {t([
                            'Nope. Can’t sell this one.',
                            'لا. هذا ما ينباع.',
                          ])}
                        </b>
                        <span
                          style={{
                            font: '500 14px/1.45 var(--font-body)',
                            color: 'var(--graphite-800)',
                          }}
                        >
                          {t([
                            'The designer didn’t allow commercial use. You can still order a print for yourself on “Print your file”.',
                            'المصمم ما سمح بالبيع. تقدر تطبعه لنفسك من "اطبع ملفك".',
                          ])}
                        </span>
                      </div>
                    </div>
                  )}
                  {licO && licO.ok && (
                    <B.Checkbox
                      checked={credit}
                      onChange={setCredit}
                      label={t([
                        'The link and licence are correct',
                        'الرابط والرخصة صحيحين',
                      ])}
                      description={t([
                        'The original designer is credited and linked on the listing. Points from buying it yourself don’t count.',
                        'اسم المصمم الأصلي ورابطه يطلعون على المنتج. وشراك أنت ما ينحسب.',
                      ])}
                    />
                  )}
                </div>
              )}
            </div>
            <B.Button
              size="lg"
              variant="ink"
              icon="send"
              disabled={!ready}
              onClick={submit}
            >
              {busy
                ? t(SITE.sys.sending)
                : t(['Send for review', 'أرسل للمراجعة'])}
            </B.Button>
          </div>
        )}

        <SellAside me={me} mine={mine} total={total} box={box} />
      </div>
    </div>
  );
}

Object.assign(window, {SellPage});

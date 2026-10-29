// Print your file: upload a model, see its size and a rough price, send for a
// quote.

function CustomPage({toast}) {
  const t = useT();
  const C = SITE.custom;
  const S = SITE.sys;
  const i = useLangIdx();
  const [file, setFile] = React.useState(null);
  const [mat, setMat] = React.useState('pla');
  const [speed, setSpeed] = React.useState('std');
  const [notes, setNotes] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [pricing, setPricing] = React.useState(null);
  React.useEffect(() => {
    baraApi
      .get('pricing')
      .then(setPricing)
      .catch(() => setPricing(null));
  }, []);
  const [send, busy] = useSend(toast);
  const est = baraApi.estimate(file, mat, speed, pricing);
  const fits = baraApi.fits(file, pricing);
  const ready = file && emailOk(email) && !busy;
  const submit = () => {
    const fd = new FormData();
    fd.append('file', file.file);
    fd.append('material', mat);
    fd.append('speed', speed);
    fd.append('notes', notes);
    fd.append('email', email.trim());
    fd.append('lang', i ? 'ar' : 'en');
    if (file.dims) fd.append('dims_mm', file.dims.join('x'));
    if (file.volume) fd.append('volume_cm3', file.volume.toFixed(2));
    if (est) fd.append('estimate', est.price);
    send(
      'quote',
      fd,
      () => {
        setSent(true);
        crew('quote');
        toast({tone: 'success', title: t(C.sent), message: t(C.sentMsg)});
      },
      'Quote request — ' + file.name,
    );
  };
  if (sent) {
    return (
      <div>
        <PageHead over={C.over} title={C.sent} sub={C.sentMsg} />
        <div
          className="s-wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <B.Mascot pose="cheer" size={150} />
          <B.Button
            variant="secondary"
            icon="plus"
            onClick={() => {
              setSent(false);
              setFile(null);
              setNotes('');
            }}
          >
            {t(['Send another file', 'أرسل ملف ثاني'])}
          </B.Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PageHead over={C.over} title={C.title} sub={C.sub} />
      <div className="s-wrap s-split">
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          {!file ? (
            <FileDrop
              toast={toast}
              onFile={setFile}
              render={({busy: reading, over, open}) => (
                <button
                  type="button"
                  onClick={open}
                  disabled={reading}
                  style={{
                    width: '100%',
                    border: '2px dashed var(--graphite-900)',
                    borderRadius: 24,
                    background: over
                      ? 'var(--yolk-100, var(--paper-1))'
                      : 'var(--paper-0)',
                    backgroundImage: 'var(--tex-bed)',
                    padding: '48px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                  }}
                >
                  <B.Mascot pose={reading ? 'printing' : 'hello'} size={130} />
                  <span
                    style={{
                      font: '800 24px/1.15 var(--font-display)',
                      textAlign: 'center',
                    }}
                  >
                    {reading
                      ? t(['Reading the mesh…', 'نقرأ الملف…'])
                      : t(C.drop)}
                  </span>
                  <span
                    style={{
                      ...smMono,
                      color: 'var(--fg-3)',
                      textAlign: 'center',
                    }}
                  >
                    {t(C.limits)}
                  </span>
                </button>
              )}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                border: '2px solid var(--graphite-900)',
                borderRadius: 18,
                padding: 14,
                background: 'var(--paper-0)',
                flexWrap: 'wrap',
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
                  flex: 1,
                  minWidth: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <b
                  style={{
                    font: '700 17px/1.2 var(--font-body)',
                    wordBreak: 'break-all',
                  }}
                >
                  {file.name}
                </b>
                <span style={{...smMono, fontSize: 11, color: 'var(--fg-3)'}}>
                  {[
                    file.size,
                    meshDims(file),
                    file.volume ? file.volume.toFixed(1) + ' cm³' : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                {!fits && (
                  <B.Badge tone="warning" dot>
                    {t(S.tooBig)}
                  </B.Badge>
                )}
              </div>
              <B.IconButton
                icon="trash-2"
                label="Remove"
                variant="ghost"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <div
            style={{
              border: '2px solid var(--border-1)',
              borderRadius: 20,
              padding: 22,
              background: 'var(--paper-0)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{display: 'flex', gap: 22, flexWrap: 'wrap'}}>
              {['pla', 'petg', 'tpu'].map((k) => (
                <B.MaterialSwatch
                  key={k}
                  material={k}
                  showLabel
                  selected={mat === k}
                  onClick={() => {
                    setMat(k);
                    crew(k === 'pla' ? 'colour' : k);
                  }}
                />
              ))}
            </div>
            <div style={{display: 'flex', gap: 28, flexWrap: 'wrap'}}>
              <B.Radio
                value="std"
                checked={speed === 'std'}
                onChange={setSpeed}
                label={t(C.std)}
                description={t(C.stdD)}
              />
              <B.Radio
                value="rush"
                checked={speed === 'rush'}
                onChange={setSpeed}
                label={t(C.rush)}
                description={t(C.rushD)}
              />
            </div>
            <B.Input
              label={t(C.notes)}
              placeholder={t(C.notesPh)}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <B.Input
              label={t(S.email)}
              type="email"
              icon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email && !emailOk(email) ? t(S.emailBad) : undefined}
            />
          </div>
        </div>
        <div className="s-sticky">
          <B.Card variant="brand" padding={24}>
            <span style={smMono}>{t(C.estimate)}</span>
            <div style={{margin: '12px 0 6px'}}>
              {est ? (
                <Price v={est.price} size={56} />
              ) : (
                <span style={{font: '800 56px/1 var(--font-display)'}}>—</span>
              )}
            </div>
            <span style={{font: '500 14px/1.4 var(--font-body)'}}>
              {!file
                ? t(C.needFile)
                : est
                  ? t(C.estNote) + ' · ≈ ' + est.grams + ' g'
                  : t(S.handPrice)}
            </span>
            <B.Button
              variant="ink"
              size="lg"
              fullWidth
              disabled={!ready}
              style={{marginTop: 20}}
              onClick={submit}
            >
              {busy ? t(S.sending) : t(C.send)}
            </B.Button>
          </B.Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {CustomPage});

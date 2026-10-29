// The crew: Tab'a (cheers, panics) + the Mess Goblin (judges, yells). The floor
// shows the real print queue when endpoints.floor is set — never customer data.

// Conversation trees: N(who, mood, en, ar, ...replies). One reply is picked at
// random per level; '.' ends the chat early.
const N = (w, m, en, ar, ...r) => ({w, m, en, ar, r});
const END = '.';
const If = (fn, node) => Object.assign(node, {if: fn});
const CREW_AMBIENT = [
  N(
    'g',
    'shout',
    'Did the {part} come off yet?!',
    'هاه، {part:ar} طلع ولا للحين؟!',
    N(
      't',
      'shout',
      'NO! Still on layer {layer}!',
      'لا والله!! توه بالطبقة {layer}!',
      N('g', 'judge', 'Of {total}. Wonderful.', 'من {total}؟ يا زين السرعة.'),
      N(
        'g',
        'busy',
        'Then why are you HERE?',
        'أجل وش جابك هنا؟!',
        N('t', 'oops', '…moral support?', '…جيت أشجعك؟'),
      ),
      END,
    ),
    N(
      't',
      'cheer',
      'Yes! And it’s PERFECT!',
      'إيه! وطالع يهبّل!',
      N(
        'g',
        'peer',
        'Let me see. | …There’s a blob on it.',
        'وريني. | …فيه نقطة زايدة.',
        N('t', 'oops', 'That’s a feature.', 'هذي لمسة فنية.'),
        N('t', 'hips', 'That blob is ME, thank you.', 'النقطة ذي أنا ترا!'),
      ),
      N('g', 'approve', 'Huh. Fine. Good.', 'هممم. مو بطال.'),
    ),
    N(
      't',
      'oops',
      'It… came off the bed. Early.',
      'امم… طار من السرير. بدري.',
      N('g', 'shout', 'SPAGHETTI AGAIN?!', 'سباغيتي مرة ثانية؟!'),
      N(
        'g',
        'judge',
        'Give it here. | *crunch* | …needs salt.',
        'جيبيه. | *قرمش* | …ناقصه ملح.',
      ),
    ),
    N(
      't',
      'hello',
      'Which one? There are {orders}.',
      'أي واحد فيهم؟ عندنا {orders}.',
      N('g', 'hips', 'The one I asked about.', 'اللي أسألك عنه! ركّزي معي.'),
      END,
    ),
  ),
  N(
    'g',
    'shout',
    'Who left the {mat} spool out?!',
    'مين اللي خلّى بكرة الـ{mat} برا؟!',
    N(
      't',
      'oops',
      '…not me. Probably.',
      'مو أنا… على ما أظن.',
      N('g', 'peer', 'Your face is ON the spool.', 'وجهك مرسوم عليها يا ذكية.'),
      END,
    ),
    N(
      't',
      'shout',
      'IT WAS YOU! Yesterday!',
      'أنت!! أمس وأنا شايفتك!',
      N('g', 'judge', 'Lies. Slander.', 'كذب وافترا.'),
      N('g', 'oops', '…okay that tracks.', '…طيب، يمكن أنا.'),
    ),
    N(
      't',
      'hello',
      'It wanted fresh air.',
      'كانت تبي تشم هوا.',
      N(
        'g',
        'shout',
        'IT’S HYGROSCOPIC!',
        'تشرب رطوبة يا بنت الحلال!',
        N('t', 'oops', 'Gesundheit?', 'زين، خلها تروى؟'),
      ),
    ),
  ),
  N(
    'g',
    'busy',
    'Printer {printer} is beeping AGAIN.',
    'الطابعة {printer} تصفّر… للمرة المليون!',
    N(
      't',
      'shout',
      'I’m on it! I’m on it!',
      'جاية! جاية!',
      N(
        'g',
        'judge',
        'You’re running the wrong way.',
        'الطابعة من هنا يا بنت!',
      ),
      END,
    ),
    N(
      't',
      'oops',
      'Maybe it’s singing?',
      'يمكن تغنّي؟',
      N(
        'g',
        'hips',
        'It’s singing “out of filament”.',
        'تغني "خلص الفلامنت". أغنيتها المفضلة.',
      ),
    ),
    N(
      't',
      'peer',
      'Beeping or screaming?',
      'تصفّر ولا تصيح؟',
      N('g', 'busy', 'Both. Both is the answer.', 'الثنتين.'),
      N('g', 'judge', 'Does it matter?', 'وتفرق؟'),
    ),
  ),
  N(
    't',
    'cheer',
    'Someone ordered a {part}!',
    'جانا طلب {part:ar}!',
    N(
      'g',
      'judge',
      'Flattering. Still not dusting it.',
      'حلو. بس أنا ما راح أغلّفه.',
    ),
    N(
      'g',
      'peer',
      'In what colour?',
      'وش لونه؟',
      N(
        't',
        'cheer',
        'PINK!',
        'وردي!',
        N('g', 'judge', 'Of course.', 'أكيد، وش غيره.'),
      ),
      N(
        't',
        'oops',
        '…I didn’t check.',
        '…ما انتبهت.',
        N('g', 'hips', 'Go check.', 'روحي شوفي أجل.'),
      ),
    ),
    N('g', 'approve', 'Good. Bills.', 'زين. فاتورة الكهربا تشكرك.'),
    N(
      'g',
      'shout',
      'ANOTHER one?!',
      'بعد؟!',
      N('t', 'cheer', 'Isn’t it great?!', 'مو حلو؟! الشغل ماشي!'),
      END,
    ),
  ),
  N(
    'g',
    'busy',
    'We have {orders} orders. | And {printers} printers. | Do the math.',
    'عندنا {orders} طلب. | و{printers} طابعات بس. | احسبيها.',
    N('t', 'shout', 'Math later, PRINT NOW!', 'الحساب بعدين، اطبع الحين!'),
    N(
      't',
      'peer',
      'Carry the one… that’s a lot.',
      'خلني أحسب… واجد.',
      N('g', 'judge', 'Yes. Yes it is.', 'إيه. واجد.'),
    ),
    N(
      't',
      'hello',
      'Sounds like a party!',
      'شكلها بتصير سهرة!',
      N('g', 'shout', 'It is NOT a party.', 'أي سهرة؟! هذا شغل!'),
      N(
        'g',
        'hips',
        'A party where only I work.',
        'سهرة؟ أنا أشتغل وإنتي تسهرين.',
      ),
    ),
  ),
  N(
    't',
    'oops',
    'The {part} failed. Try number {try}…',
    '{part:ar} خرب… وهذي المحاولة {try}.',
    N(
      'g',
      'judge',
      'I’m starting a tally.',
      'ترا قاعد أعد عليك.',
      N('t', 'oops', 'Please don’t.', 'تكفى لا تعد.'),
      END,
    ),
    N(
      'g',
      'approve',
      'More snacks for me.',
      'أحسن. عشاي زاد.',
      N('t', 'shout', 'Stop EATING my mistakes!', 'لا تاكل غلطاتي!'),
    ),
    N(
      'g',
      'peer',
      'Did you level the bed?',
      'سويتي معايرة للسرير؟',
      N('t', 'oops', '…define “level”.', '…وش يعني معايرة؟'),
      N(
        't',
        'hips',
        'Obviously. | …I’ll go level the bed.',
        'أكيد سويتها. | …بروح أسويها الحين.',
      ),
    ),
  ),
  N(
    'g',
    'peer',
    'Printer {printer}: {hours} h {mins} m left. | Says it. | Lies.',
    'الطابعة {printer} تقول باقي {hours} ساعة و{mins} دقيقة. | هذا كلامها. | وهي كذّابة.',
    N(
      't',
      'hello',
      'Have a little faith!',
      'تفاءل بالخير!',
      N('g', 'judge', 'I had faith once.', 'تفاءلت مرة… وندمت.'),
    ),
    N(
      't',
      'shout',
      'Don’t jinx it!',
      'لا تفاول عليها!',
      N('g', 'oops', '…it just went up by an hour.', '…شوفي، زادت ساعة.'),
    ),
  ),
  [
    If(
      (v) => v.frac < 0.2,
      N(
        't',
        'cheer',
        'Layer {layer} of {total}. We’ve only just started!',
        'الطبقة {layer} من {total}. توّنا نبدأ!',
        N(
          'g',
          'judge',
          '{left} layers to go. Wake me up after.',
          'باقي {left} طبقة. صحيني إذا خلصت.',
        ),
        N(
          'g',
          'busy',
          'Then why are you celebrating?',
          'أجل ليش فرحانة؟',
          N('t', 'hips', 'Layer one is a big deal!', 'أول طبقة نص الشغل!'),
        ),
      ),
    ),
    If(
      (v) => v.frac >= 0.4 && v.frac <= 0.6,
      N(
        't',
        'shout',
        'Layer {layer} of {total}! Halfway!',
        'الطبقة {layer} من {total}! وصلنا النص!',
        N('g', 'approve', 'Progress.', 'زين.'),
        N(
          'g',
          'hips',
          'Halfway is where it fails. Statistically.',
          'ترا أغلب الطبعات تخرب بالنص.',
          N(
            't',
            'oops',
            'Why would you SAY that?',
            'ليه تقول كذا؟! فال الله ولا فالك!',
          ),
        ),
      ),
    ),
    If(
      (v) =>
        (v.frac >= 0.2 && v.frac < 0.4) || (v.frac > 0.6 && v.frac <= 0.85),
      N(
        't',
        'shout',
        'Layer {layer} of {total}! Halfway-ish!',
        'الطبقة {layer} من {total}! يعني تقريبًا النص!',
        N(
          'g',
          'peer',
          'That’s {pct}%. Not halfway.',
          'هذا {pct}٪ يا حبيبتي، مو النص.',
          N('t', 'cheer', 'It’s halfway in SPIRIT.', 'نص بالنية!'),
          N('t', 'oops', 'Numbers are hard.', 'أنا والرياضيات ما نتفاهم.'),
        ),
        N(
          'g',
          'hips',
          '“Ish” is doing a lot of work there.',
          'كلمة "تقريبًا" شايلة الهم كله.',
        ),
      ),
    ),
    If(
      (v) => v.frac > 0.85,
      N(
        't',
        'cheer',
        'Layer {layer} of {total}! Almost done!',
        'الطبقة {layer} من {total}! خلاص قربنا!',
        N(
          'g',
          'shout',
          'Don’t touch it. DON’T TOUCH IT.',
          'لا تقربين منها. لا تقربين!',
        ),
        N(
          'g',
          'peer',
          '{left} layers. Don’t jinx it.',
          'باقي {left} طبقة. لا تفاولين.',
        ),
        N('g', 'approve', 'Finally.', 'أخيرًا.'),
      ),
    ),
  ],
  N(
    'g',
    'busy',
    '{n} kg of failed prints in the bin. | Lunch.',
    '{n} كيلو طبعات خربانة بالسلة. | غداي جاهز.',
    If(
      (v) => v.n >= 5,
      N(
        't',
        'oops',
        'That’s… a lot of lunch.',
        'هذا غدا ولا بوفيه؟',
        N('g', 'approve', 'Growing goblin.', 'أنا في سن النمو.'),
      ),
    ),
    If(
      (v) => v.n < 5,
      N(
        't',
        'peer',
        'Only {n}? Slow day.',
        'بس {n}؟ اليوم رايق.',
        N('g', 'judge', 'Give it an hour.', 'اصبري، اليوم طويل.'),
      ),
    ),
    N(
      't',
      'cheer',
      'Recycling hero!',
      'بطل إعادة التدوير!',
      N('g', 'hips', 'Finally, recognition.', 'أخيرًا أحد قدّرني.'),
    ),
    N(
      't',
      'peer',
      'Wait. | Is my spaghetti in there?',
      'لحظة. | السباغيتي حقي فيها؟',
      N('g', 'judge', 'Most of it.', 'أغلبه، وكان لذيذ.'),
    ),
  ),
  N(
    't',
    'peer',
    'Is printer {printer} making a {part}… | or modern art?',
    'الطابعة {printer} تطبع {part:ar}… | ولا لوحة تجريدية؟',
    N(
      'g',
      'judge',
      'Modern art. Bin it.',
      'تجريدية. ارميها.',
      N('t', 'shout', 'Sell it as art!', 'نبيعها بمعرض!'),
      END,
    ),
    N(
      'g',
      'peer',
      'Give it ten layers.',
      'اصبري عليها عشر طبقات.',
      N('t', 'oops', 'It’s worse now.', 'صارت أخيس.'),
    ),
    N('g', 'approve', 'Both. Charge double.', 'الثنتين. ونضاعف السعر.'),
  ),
];
const crewOk = (n, v) => n === END || !n.if || n.if(v);
// Walks one random path through a tree. Values are generated first so branches
// can react to them (e.g. only say "halfway" near 50%).
function crewWalk(node, v, out) {
  if (!out) {
    out = [];
    v = v && v.__v ? v : crewVars(v);
    out.v = v;
  }
  if (Array.isArray(node)) {
    const ok = node.filter((n) => crewOk(n, v));
    node = ok.length ? crewPick(ok) : null;
  }
  if (!node || node === END || !crewOk(node, v)) return out;
  out.push([node.w, node.m, node.en, node.ar]);
  const kids = (node.r || []).filter((c) => crewOk(c, v));
  if (kids.length && !(out.length >= 2 && chance(0.15))) {
    crewWalk(crewPick(kids), v, out);
  }
  return out;
}
// Generic follow-ups when only one character reacted.
const CREW_BACK = {
  t: [
    ['oops', 'Rude.', 'يا قليل الذوق.'],
    ['cheer', 'Ignore him, it’s great!', 'لا تسمع منه، يجنن!'],
    ['hips', 'He says that about everything.', 'هذا هو، ما يعجبه العجب.'],
    ['peer', '…he’s not wrong though.', '…بس الصراحة معه حق.'],
    ['shout', 'BE NICE!', 'خلك لطيف!'],
  ],
  g: [
    ['judge', 'She says that about everything.', 'هي كذا، كل شي عندها يجنن.'],
    ['hips', 'Calm down.', 'هدي اللعب.'],
    ['approve', '…fine. She’s right.', '…طيب، معها حق. لا تتعودين.'],
    ['peer', 'Is she, though?', 'متأكدة إنتي؟'],
    ['shout', 'STOP ENCOURAGING THEM!', 'لا تشجعينهم تكفين!'],
  ],
};
const CREW_MATS = ['PLA', 'PETG', 'TPU', 'Silk PLA', 'Loop'];
const crewNum = (v, ar) =>
  ar ? String(v).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : String(v);
const crewRand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// Fills {part} {layer} {total} {printer} {try} {orders} {printers} {mat}
// {hours} {mins} {n} {id} with fresh random values, shared across one exchange.
function crewVars(vars = {}) {
  const ps = window.SITE_PRODUCTS || [];
  const p = ps.length ? crewPick(ps) : {en: 'print', ar: 'الطبعة'};
  const total = crewRand(80, 420);
  const layer = crewRand(12, total - 5);
  return {
    '__v': 1,
    'part': p.en.toLowerCase(),
    'part:ar': p.ar,
    layer,
    total,
    'left': total - layer,
    'pct': Math.round((layer / total) * 100),
    'frac': layer / total,
    'printer': crewRand(1, 6),
    'try': crewRand(2, 9),
    'orders': crewRand(7, 31),
    'printers': 6,
    'mat': crewPick(CREW_MATS),
    'hours': crewRand(1, 14),
    'mins': crewRand(2, 59),
    'n': crewRand(2, 9),
    ...vars,
  };
}
// Fills placeholders from the exchange's shared values. " | " splits one line
// into several bubbles from the same speaker.
function crewFill(seq, vars = {}) {
  const v = seq.v ? {...seq.v, ...vars} : crewVars(vars);
  const f = (s, ar) =>
    s.replace(/\{([a-z:]+)\}/g, (_, k) =>
      v[k] == null ? '' : typeof v[k] === 'number' ? crewNum(v[k], ar) : v[k],
    );
  const out = [];
  seq.forEach(([w, mood, en, ar]) => {
    const E = f(en, false).split(' | ');
    const A = f(ar, true).split(' | ');
    const n = Math.max(E.length, A.length);
    for (let k = 0; k < n; k++) {
      out.push([
        w,
        mood,
        E[k] || E[E.length - 1],
        A[k] || A[A.length - 1],
        k > 0,
      ]);
    }
  });
  return out;
}
const crewPick = (a) => a[Math.floor(Math.random() * a.length)];
const chance = (p) => Math.random() < p;
// Per-event line pools. Each speaker draws randomly; either may stay silent;
// order is random.
// Mute: click any character → masking tape over both mouths. They keep trying
// to talk, muffled.
const crewMuted = () => !!window.__crewMuted;
try {
  window.__crewMuted = localStorage.getItem('bara-crew-muted') === '1';
} catch (e) {
  /* Best effort: storage may be unavailable. */
}
function crewMute(v) {
  const next = v == null ? !crewMuted() : !!v;
  window.__crewMuted = next;
  try {
    localStorage.setItem('bara-crew-muted', next ? '1' : '0');
  } catch (e) {
    /* Best effort: storage may be unavailable. */
  }
  window.dispatchEvent(new CustomEvent('bara-mute', {detail: next}));
  crew(next ? 'mute' : 'unmute');
}
function useCrewMuted() {
  const [m, setM] = React.useState(crewMuted());
  React.useEffect(() => {
    const on = (e) => setM(e.detail);
    window.addEventListener('bara-mute', on);
    return () => window.removeEventListener('bara-mute', on);
  }, []);
  return m;
}
const MUFFLE = [
  ['Mmph!', 'ممف!'],
  ['Mmmph mm-mph!', 'مممف مم-ممف!'],
  ['Hmmmf.', 'همممف.'],
  ['MMPH!!', 'ممممف!!'],
  ['Mm-hm. Mmph.', 'مم-هم. ممف.'],
  ['Mmf mmf mmmf?', 'ممف ممف مممف؟'],
  ['…mmph.', '…ممف.'],
];
const crewMuffle = (l) => {
  const m = crewPick(MUFFLE);
  return {...l, en: m[0], ar: m[1], muf: true};
};
const crewClick = (e) => {
  e.stopPropagation();
  crewMute();
};

// One shared conversation thread: lines play in order with natural pacing
// (quick for split bubbles, slower for replies), newest at the bottom.
// Each speaker's bubbles are offset so the tail lands over that character. lay
// = { g|t: { end: bool, off: CSS length from that edge to the tail } }.

Object.assign(window, {crewMute, useCrewMuted});

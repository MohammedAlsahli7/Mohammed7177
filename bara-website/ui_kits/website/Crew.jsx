// The crew: Tab'a (cheers, panics) + the Mess Goblin (judges, yells). The floor shows the real print queue when endpoints.floor is set — never customer data.

// Conversation trees: N(who, mood, en, ar, ...replies). One reply is picked at random per level; '.' ends the chat early.
const N = (w, m, en, ar, ...r) => ({ w, m, en, ar, r });
const END = '.';
const If = (fn, node) => Object.assign(node, { if: fn });
const CREW_AMBIENT = [
  N('g', 'shout', 'Did the {part} come off yet?!', 'هاه، {part:ar} طلع ولا للحين؟!',
    N('t', 'shout', 'NO! Still on layer {layer}!', 'لا والله!! توه بالطبقة {layer}!', N('g', 'judge', 'Of {total}. Wonderful.', 'من {total}؟ يا زين السرعة.'), N('g', 'busy', 'Then why are you HERE?', 'أجل وش جابك هنا؟!', N('t', 'oops', '…moral support?', '…جيت أشجعك؟')), END),
    N('t', 'cheer', 'Yes! And it’s PERFECT!', 'إيه! وطالع يهبّل!', N('g', 'peer', 'Let me see. | …There’s a blob on it.', 'وريني. | …فيه نقطة زايدة.', N('t', 'oops', 'That’s a feature.', 'هذي لمسة فنية.'), N('t', 'hips', 'That blob is ME, thank you.', 'النقطة ذي أنا ترا!')), N('g', 'approve', 'Huh. Fine. Good.', 'هممم. مو بطال.')),
    N('t', 'oops', 'It… came off the bed. Early.', 'امم… طار من السرير. بدري.', N('g', 'shout', 'SPAGHETTI AGAIN?!', 'سباغيتي مرة ثانية؟!'), N('g', 'judge', 'Give it here. | *crunch* | …needs salt.', 'جيبيه. | *قرمش* | …ناقصه ملح.')),
    N('t', 'hello', 'Which one? There are {orders}.', 'أي واحد فيهم؟ عندنا {orders}.', N('g', 'hips', 'The one I asked about.', 'اللي أسألك عنه! ركّزي معي.'), END)),
  N('g', 'shout', 'Who left the {mat} spool out?!', 'مين اللي خلّى بكرة الـ{mat} برا؟!',
    N('t', 'oops', '…not me. Probably.', 'مو أنا… على ما أظن.', N('g', 'peer', 'Your face is ON the spool.', 'وجهك مرسوم عليها يا ذكية.'), END),
    N('t', 'shout', 'IT WAS YOU! Yesterday!', 'أنت!! أمس وأنا شايفتك!', N('g', 'judge', 'Lies. Slander.', 'كذب وافترا.'), N('g', 'oops', '…okay that tracks.', '…طيب، يمكن أنا.')),
    N('t', 'hello', 'It wanted fresh air.', 'كانت تبي تشم هوا.', N('g', 'shout', 'IT’S HYGROSCOPIC!', 'تشرب رطوبة يا بنت الحلال!', N('t', 'oops', 'Gesundheit?', 'زين، خلها تروى؟')))),
  N('g', 'busy', 'Printer {printer} is beeping AGAIN.', 'الطابعة {printer} تصفّر… للمرة المليون!',
    N('t', 'shout', 'I’m on it! I’m on it!', 'جاية! جاية!', N('g', 'judge', 'You’re running the wrong way.', 'الطابعة من هنا يا بنت!'), END),
    N('t', 'oops', 'Maybe it’s singing?', 'يمكن تغنّي؟', N('g', 'hips', 'It’s singing “out of filament”.', 'تغني "خلص الفلامنت". أغنيتها المفضلة.')),
    N('t', 'peer', 'Beeping or screaming?', 'تصفّر ولا تصيح؟', N('g', 'busy', 'Both. Both is the answer.', 'الثنتين.'), N('g', 'judge', 'Does it matter?', 'وتفرق؟'))),
  N('t', 'cheer', 'Someone ordered a {part}!', 'جانا طلب {part:ar}!',
    N('g', 'judge', 'Flattering. Still not dusting it.', 'حلو. بس أنا ما راح أغلّفه.'),
    N('g', 'peer', 'In what colour?', 'وش لونه؟', N('t', 'cheer', 'PINK!', 'وردي!', N('g', 'judge', 'Of course.', 'أكيد، وش غيره.')), N('t', 'oops', '…I didn’t check.', '…ما انتبهت.', N('g', 'hips', 'Go check.', 'روحي شوفي أجل.'))),
    N('g', 'approve', 'Good. Bills.', 'زين. فاتورة الكهربا تشكرك.'),
    N('g', 'shout', 'ANOTHER one?!', 'بعد؟!', N('t', 'cheer', 'Isn’t it great?!', 'مو حلو؟! الشغل ماشي!'), END)),
  N('g', 'busy', 'We have {orders} orders. | And {printers} printers. | Do the math.', 'عندنا {orders} طلب. | و{printers} طابعات بس. | احسبيها.',
    N('t', 'shout', 'Math later, PRINT NOW!', 'الحساب بعدين، اطبع الحين!'),
    N('t', 'peer', 'Carry the one… that’s a lot.', 'خلني أحسب… واجد.', N('g', 'judge', 'Yes. Yes it is.', 'إيه. واجد.')),
    N('t', 'hello', 'Sounds like a party!', 'شكلها بتصير سهرة!', N('g', 'shout', 'It is NOT a party.', 'أي سهرة؟! هذا شغل!'), N('g', 'hips', 'A party where only I work.', 'سهرة؟ أنا أشتغل وإنتي تسهرين.'))),
  N('t', 'oops', 'The {part} failed. Try number {try}…', '{part:ar} خرب… وهذي المحاولة {try}.',
    N('g', 'judge', 'I’m starting a tally.', 'ترا قاعد أعد عليك.', N('t', 'oops', 'Please don’t.', 'تكفى لا تعد.'), END),
    N('g', 'approve', 'More snacks for me.', 'أحسن. عشاي زاد.', N('t', 'shout', 'Stop EATING my mistakes!', 'لا تاكل غلطاتي!')),
    N('g', 'peer', 'Did you level the bed?', 'سويتي معايرة للسرير؟', N('t', 'oops', '…define “level”.', '…وش يعني معايرة؟'), N('t', 'hips', 'Obviously. | …I’ll go level the bed.', 'أكيد سويتها. | …بروح أسويها الحين.'))),
  N('g', 'peer', 'Printer {printer}: {hours} h {mins} m left. | Says it. | Lies.', 'الطابعة {printer} تقول باقي {hours} ساعة و{mins} دقيقة. | هذا كلامها. | وهي كذّابة.',
    N('t', 'hello', 'Have a little faith!', 'تفاءل بالخير!', N('g', 'judge', 'I had faith once.', 'تفاءلت مرة… وندمت.')),
    N('t', 'shout', 'Don’t jinx it!', 'لا تفاول عليها!', N('g', 'oops', '…it just went up by an hour.', '…شوفي، زادت ساعة.'))),
  [
    If((v) => v.frac < .2, N('t', 'cheer', 'Layer {layer} of {total}. We’ve only just started!', 'الطبقة {layer} من {total}. توّنا نبدأ!', N('g', 'judge', '{left} layers to go. Wake me up after.', 'باقي {left} طبقة. صحيني إذا خلصت.'), N('g', 'busy', 'Then why are you celebrating?', 'أجل ليش فرحانة؟', N('t', 'hips', 'Layer one is a big deal!', 'أول طبقة نص الشغل!')))),
    If((v) => v.frac >= .4 && v.frac <= .6, N('t', 'shout', 'Layer {layer} of {total}! Halfway!', 'الطبقة {layer} من {total}! وصلنا النص!', N('g', 'approve', 'Progress.', 'زين.'), N('g', 'hips', 'Halfway is where it fails. Statistically.', 'ترا أغلب الطبعات تخرب بالنص.', N('t', 'oops', 'Why would you SAY that?', 'ليه تقول كذا؟! فال الله ولا فالك!')))),
    If((v) => (v.frac >= .2 && v.frac < .4) || (v.frac > .6 && v.frac <= .85), N('t', 'shout', 'Layer {layer} of {total}! Halfway-ish!', 'الطبقة {layer} من {total}! يعني تقريبًا النص!', N('g', 'peer', 'That’s {pct}%. Not halfway.', 'هذا {pct}٪ يا حبيبتي، مو النص.', N('t', 'cheer', 'It’s halfway in SPIRIT.', 'نص بالنية!'), N('t', 'oops', 'Numbers are hard.', 'أنا والرياضيات ما نتفاهم.')), N('g', 'hips', '“Ish” is doing a lot of work there.', 'كلمة "تقريبًا" شايلة الهم كله.'))),
    If((v) => v.frac > .85, N('t', 'cheer', 'Layer {layer} of {total}! Almost done!', 'الطبقة {layer} من {total}! خلاص قربنا!', N('g', 'shout', 'Don’t touch it. DON’T TOUCH IT.', 'لا تقربين منها. لا تقربين!'), N('g', 'peer', '{left} layers. Don’t jinx it.', 'باقي {left} طبقة. لا تفاولين.'), N('g', 'approve', 'Finally.', 'أخيرًا.'))),
  ],
  N('g', 'busy', '{n} kg of failed prints in the bin. | Lunch.', '{n} كيلو طبعات خربانة بالسلة. | غداي جاهز.',
    If((v) => v.n >= 5, N('t', 'oops', 'That’s… a lot of lunch.', 'هذا غدا ولا بوفيه؟', N('g', 'approve', 'Growing goblin.', 'أنا في سن النمو.'))),
    If((v) => v.n < 5, N('t', 'peer', 'Only {n}? Slow day.', 'بس {n}؟ اليوم رايق.', N('g', 'judge', 'Give it an hour.', 'اصبري، اليوم طويل.'))),
    N('t', 'cheer', 'Recycling hero!', 'بطل إعادة التدوير!', N('g', 'hips', 'Finally, recognition.', 'أخيرًا أحد قدّرني.')),
    N('t', 'peer', 'Wait. | Is my spaghetti in there?', 'لحظة. | السباغيتي حقي فيها؟', N('g', 'judge', 'Most of it.', 'أغلبه، وكان لذيذ.'))),
  N('t', 'peer', 'Is printer {printer} making a {part}… | or modern art?', 'الطابعة {printer} تطبع {part:ar}… | ولا لوحة تجريدية؟',
    N('g', 'judge', 'Modern art. Bin it.', 'تجريدية. ارميها.', N('t', 'shout', 'Sell it as art!', 'نبيعها بمعرض!'), END),
    N('g', 'peer', 'Give it ten layers.', 'اصبري عليها عشر طبقات.', N('t', 'oops', 'It’s worse now.', 'صارت أخيس.')),
    N('g', 'approve', 'Both. Charge double.', 'الثنتين. ونضاعف السعر.')),
];
const crewOk = (n, v) => n === END || !n.if || n.if(v);
// Walks one random path through a tree. Values are generated first so branches can react to them (e.g. only say "halfway" near 50%).
function crewWalk(node, v, out) {
  if (!out) { out = []; v = v && v.__v ? v : crewVars(v); out.v = v; }
  if (Array.isArray(node)) { const ok = node.filter((n) => crewOk(n, v)); node = ok.length ? crewPick(ok) : null; }
  if (!node || node === END || !crewOk(node, v)) return out;
  out.push([node.w, node.m, node.en, node.ar]);
  const kids = (node.r || []).filter((c) => crewOk(c, v));
  if (kids.length && !(out.length >= 2 && chance(0.15))) crewWalk(crewPick(kids), v, out);
  return out;
}
// Generic follow-ups when only one character reacted.
const CREW_BACK = {
  t: [['oops', 'Rude.', 'يا قليل الذوق.'], ['cheer', 'Ignore him, it’s great!', 'لا تسمع منه، يجنن!'], ['hips', 'He says that about everything.', 'هذا هو، ما يعجبه العجب.'], ['peer', '…he’s not wrong though.', '…بس الصراحة معه حق.'], ['shout', 'BE NICE!', 'خلك لطيف!']],
  g: [['judge', 'She says that about everything.', 'هي كذا، كل شي عندها يجنن.'], ['hips', 'Calm down.', 'هدي اللعب.'], ['approve', '…fine. She’s right.', '…طيب، معها حق. لا تتعودين.'], ['peer', 'Is she, though?', 'متأكدة إنتي؟'], ['shout', 'STOP ENCOURAGING THEM!', 'لا تشجعينهم تكفين!']],
};
const CREW_MATS = ['PLA', 'PETG', 'TPU', 'Silk PLA', 'Loop'];
const crewNum = (v, ar) => (ar ? String(v).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : String(v));
const crewRand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// Fills {part} {layer} {total} {printer} {try} {orders} {printers} {mat} {hours} {mins} {n} {id} with fresh random values, shared across one exchange.
function crewVars(vars = {}) {
  const ps = (window.SITE_PRODUCTS || []); const p = ps.length ? crewPick(ps) : { en: 'print', ar: 'الطبعة' };
  const total = crewRand(80, 420); const layer = crewRand(12, total - 5);
  return { __v: 1, part: p.en.toLowerCase(), 'part:ar': p.ar, layer, total, left: total - layer, pct: Math.round(layer / total * 100), frac: layer / total, printer: crewRand(1, 6), try: crewRand(2, 9), orders: crewRand(7, 31), printers: 6, mat: crewPick(CREW_MATS), hours: crewRand(1, 14), mins: crewRand(2, 59), n: crewRand(2, 9), ...vars };
}
// Fills placeholders from the exchange's shared values. " | " splits one line into several bubbles from the same speaker.
function crewFill(seq, vars = {}) {
  const v = seq.v ? { ...seq.v, ...vars } : crewVars(vars);
  const f = (s, ar) => s.replace(/\{([a-z:]+)\}/g, (_, k) => (v[k] == null ? '' : typeof v[k] === 'number' ? crewNum(v[k], ar) : v[k]));
  const out = [];
  seq.forEach(([w, mood, en, ar]) => { const E = f(en, false).split(' | '), A = f(ar, true).split(' | '); const n = Math.max(E.length, A.length); for (let k = 0; k < n; k++) out.push([w, mood, E[k] || E[E.length - 1], A[k] || A[A.length - 1], k > 0]); });
  return out;
}
const crewPick = (a) => a[Math.floor(Math.random() * a.length)];
const chance = (p) => Math.random() < p;
// Per-event line pools. Each speaker draws randomly; either may stay silent; order is random.
// Mute: click any character → masking tape over both mouths. They keep trying to talk, muffled.
const crewMuted = () => !!window.__crewMuted;
try { window.__crewMuted = localStorage.getItem('bara-crew-muted') === '1'; } catch (e) {}
function crewMute(v) {
  const next = v == null ? !crewMuted() : !!v; window.__crewMuted = next;
  try { localStorage.setItem('bara-crew-muted', next ? '1' : '0'); } catch (e) {}
  window.dispatchEvent(new CustomEvent('bara-mute', { detail: next }));
  crew(next ? 'mute' : 'unmute');
}
function useCrewMuted() { const [m, setM] = React.useState(crewMuted()); React.useEffect(() => { const on = (e) => setM(e.detail); window.addEventListener('bara-mute', on); return () => window.removeEventListener('bara-mute', on); }, []); return m; }
const MUFFLE = [['Mmph!', 'ممف!'], ['Mmmph mm-mph!', 'مممف مم-ممف!'], ['Hmmmf.', 'همممف.'], ['MMPH!!', 'ممممف!!'], ['Mm-hm. Mmph.', 'مم-هم. ممف.'], ['Mmf mmf mmmf?', 'ممف ممف مممف؟'], ['…mmph.', '…ممف.']];
const crewMuffle = (l) => { const m = crewPick(MUFFLE); return { ...l, en: m[0], ar: m[1], muf: true }; };
const crewClick = (e) => { e.stopPropagation(); crewMute(); };

const CREW_REACT = {
  mute: { tree: [N('g', 'shout', 'Hey! Don’t you da—', 'لا! لا تسويها—', N('t', 'oops', 'Mmph!', 'ممف!')), N('t', 'shout', 'Wait, I wasn’t finish—', 'لحظة، ما كملت كلا—', N('g', 'judge', 'Mmmph.', 'مممف.')), N('g', 'judge', 'Tape. Really?', 'لزقة؟ من جدك؟')] },
  unmute: { tree: [N('g', 'shout', 'OW. | That pulled my eyebrow.', 'آآي. | شالت نص حاجبي.', N('t', 'cheer', 'We’re BACK!', 'رجعنااا!', N('g', 'judge', 'Unfortunately.', 'للأسف.'))), N('t', 'cheer', 'Freedom!', 'أخيرًا أتنفس!', N('g', 'hips', 'As I was saying before I was SILENCED…', 'المهم، كنت أقول قبل ما يسكتوني…')), N('g', 'judge', 'I’m keeping the tape.', 'اللزقة بخليها عندي.', N('t', 'oops', 'Why?!', 'ليش؟!', N('g', 'peer', 'For you.', 'عشانك.')))] },
  cart: {
    t: [['cheer', 'Great pick! Seriously!', 'والله اختيار يجنن!'], ['cheer', 'You have amazing taste!', 'ذوقك رهيب!'], ['cheer', 'YESSS! Number {orders} in the queue!', 'ياااس! صار رقم {orders} بالدور!'], ['shout', 'Another one?! Printer {printer}, wake up!', 'بعد؟! الطابعة {printer} قومي اشتغلي!'], ['oops', 'Honestly… he’s right, that’s a lot.', 'بصراحة… معه حق، كثّرت.'], ['judge', 'Do you even need that? Kidding. Mostly.', 'تحتاجه أصلًا؟ أمزح… نص ونص.'], ['peer', 'Wait… let me look closer. Yep, cute.', 'لحظة… خلني أقرّب. إيه، يهبّل.'], ['hello', 'Ooh, that one’s my favourite.', 'هذا أحبه مرّه!']],
    g: [['judge', 'Another one. Fine.', 'بعد واحد… ماشي.'], ['shout', 'MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'], ['judge', 'Bold choice. Not judging. Okay, judging.', 'اختيار جريء. ما أحكم عليك… طيب أحكم.'], ['approve', '…Actually, nice.', '…الصراحة، مو بطال.'], ['peer', 'Hmm. Inspecting. Don’t rush me.', 'هممم. خلني أفحصه. لا تستعجل.'], ['hips', 'And who’s carrying all this? Me.', 'ومين بيشيل هذا كله؟ أنا طبعًا.'], ['busy', 'Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟']],
  },
  pink: { t: [['cheer', 'PINK!! Love it!', 'وردي!! يجنن!'], ['oops', 'Pink… again? Okay! Okay.', 'وردي… مرة ثانية؟ أوكي! ماشي.']], g: [['judge', 'Pink. Again. Bold.', 'وردي؟ بعد؟ ما شاء الله.'], ['approve', 'Fine. Pink works.', 'طيب. الوردي لايق.']] },
  graphite: { t: [['cheer', 'Sleek!', 'فخم!'], ['hello', 'So moody. I like it.', 'غامق ورايق. حبيته.']], g: [['approve', 'Finally. Some taste.', 'أخيرًا، أحد ذوقه عدل.'], ['judge', 'Black. How original.', 'أسود؟ يا سلام على الإبداع.']] },
  colour: { t: [['cheer', 'Ooh, that’ll look SO good!', 'واو، بيطلع خطير!'], ['hello', 'Hmm, maybe try one more?', 'همم، جرّب لون ثاني؟'], ['oops', 'I can’t decide for you, I’m a blob.', 'لا تسألني، أنا مجرد خيوط ملخبطة.']], g: [['judge', 'Hm. Brave choice.', 'هممم… جريء.'], ['approve', 'Acceptable.', 'يمشي.'], ['busy', 'Pick faster, {orders} orders waiting!', 'بسرعة الله يرضى عليك، {orders} طلب ينتظر!']] },
  tpu: { t: [['cheer', 'Squishy!!', 'طريّة!! أبي أعصرها!']], g: [['judge', 'Bendy. Hope you like wobbly.', 'مرن؟ إن شاء الله تحب الأشياء اللي تتلوّى.'], ['shout', 'TPU?! That jams printer {printer}!', 'TPU؟! هذا يسد نوزل الطابعة {printer}!']] },
  petg: { t: [['cheer', 'Tough stuff!', 'قوية وما تنكسر!'], ['hello', 'Shiny!', 'تلمع!']], g: [['approve', 'Dishwasher-safe-ish. Respect.', 'يتحمّل غسالة الصحون… تقريبًا. احترمتك.'], ['judge', 'Strings everywhere. Thanks.', 'خيوط بكل مكان. مشكور.']] },
  file: { t: [['shout', 'A NEW FILE! I’m so excited!', 'ملف جديد!! متحمسة مرّه!'], ['oops', 'It’s… a lot of triangles.', 'فيه… مثلثات واجد.']], g: [['judge', 'Let me guess. No supports.', 'خلني أخمّن… بدون دعامات.'], ['shout', 'Who designs overhangs like THAT?!', 'مين يصمم أوفرهانق كذا؟!']] },
  quote: { t: [['cheer', 'On it RIGHT NOW!', 'أبدأ فيها الحين!'], ['shout', 'He’ll grumble, but it’ll be great!', 'بيتحلطم، بس بتطلع حلوة!']], g: [['shout', 'TAB’A! Another quote!', 'طبعة! جانا طلب تسعيرة!'], ['busy', 'Quote number {orders} today. Adding it to the pile.', 'هذا طلب التسعيرة رقم {orders} اليوم. حطيه فوق الكومة.']] },
  done: { t: [['cheer', '{id} is DONE!', '{id} خلص!! يا سلام!'], ['hips', '{id}. Nailed it.', '{id}. ضبطت معنا.']], g: [['approve', 'Finally.', 'أخيرًا.'], ['judge', 'Only {hours} hours late.', 'تأخر {hours} ساعات بس. عادي.'], ['peer', 'Checked all {total} layers… acceptable.', 'فحصت الـ{total} طبقة… يمشي الحال.']] },
  hoard: { tree: [
    N('g', 'judge', '{n} items and no checkout. Going for a world record?', '{n} أغراض وما دفعت؟ ناوي تدخل موسوعة غينيس؟', N('t', 'oops', 'He means it lovingly. Mostly.', 'يمزح… أظن.'), N('t', 'cheer', 'If they are, I’m cheering!', 'لو ناوي، أنا أول وحدة أشجعه!', N('g', 'judge', 'Of course you are.', 'أكيد، وش غيره.')), N('t', 'peer', 'Is that a record? Let me check.', 'جد؟ رقم قياسي؟ بقوقل.', N('g', 'hips', 'It’s a cry for help.', 'هذي صرخة استغاثة.'))),
    N('g', 'hips', 'This cart is not a museum.', 'ترا السلة مو متحف.', N('t', 'cheer', 'Checkout is RIGHT there! I’ll cheer!', 'زر الدفع هناك! يلا أشجعك!'), N('t', 'hello', 'A very nice museum though.', 'بس متحف حلو، الصراحة.', N('g', 'judge', 'Free entry. No sales.', 'الدخول ببلاش، والبيع… ولا شي.'))),
    N('t', 'peer', 'Are we… collecting them?', 'يعني… بس نجمّع؟', N('g', 'judge', 'I’m charging rent on that cart.', 'بحط على السلة إيجار شهري.'), N('g', 'shout', 'Collect them AT HOME!', 'جمّعها في بيتكم!')),
    N('g', 'shout', 'I PUSHED that cart for NOTHING?!', 'يعني دزّيت العربية على الفاضي؟!', N('t', 'hello', 'Shh, they’re thinking. | Right? | …Right?', 'اششش، يفكّر. | صح؟ | …صح؟', N('g', 'peer', 'Thinking for {mins} minutes.', 'صار له {mins} دقيقة يفكّر.')), N('t', 'oops', 'You pushed it for exercise!', 'اعتبرها رياضة!', N('g', 'judge', 'I hate exercise.', 'وأنا أكره الرياضة.'))),
    N('g', 'peer', 'Still deciding? Printer {printer} is getting cold.', 'للحين تفكر؟ الطابعة {printer} بردت.', N('t', 'shout', 'Take them home, they’re lonely!', 'خذها بيتكم، مساكين لحالهم!'), N('t', 'cheer', 'Take your time! | …but not too much.', 'خذ راحتك! | …بس مو مرّه.')),
    N('t', 'judge', 'Okay… | even I think that’s a lot of window shopping.', 'طيب… | حتى أنا أشوف إنك طوّلت وأنت تتفرج.', N('g', 'approve', 'Finally she sees it.', 'أخيرًا فهمت.'), N('g', 'oops', 'Wait, you’re on MY side?', 'لحظة، إنتي معي؟', N('t', 'hips', 'Just this once.', 'هالمرة بس، لا تتعود.'))),
  ] },
  fail: { tree: [
    N('g', 'shout', 'WHAT HAPPENED to {id}?!', 'وش صار لـ{id}؟!', N('t', 'oops', 'Spaghetti from layer {layer}. Try {try}?', 'صار سباغيتي من الطبقة {layer}. نعيده للمرة {try}؟', N('g', 'judge', 'Give it here. | *crunch*', 'هاتها. | *قرمش*'), N('g', 'busy', 'Restarting. Again.', 'نعيد… مرة ثانية.')), N('t', 'shout', 'It was like that when I got here!', 'والله كذا لقيته!', N('g', 'peer', 'You were standing right next to it.', 'وإنتي كنتي واقفة جنبه!'))),
    N('t', 'oops', 'Um. {id} is… abstract now.', 'امم. {id} صار… فن تجريدي.', N('g', 'judge', 'Abstract is a strong word for “ruined”.', '"تجريدي" هذي كلمة حلوة لـ"خربان".'), N('g', 'approve', 'Snack time.', 'الغدا جاهز.')),
  ] },
};

function crewReaction(type, vars = {}) {
  const r = CREW_REACT[type]; if (!r) return [];
  if (r.tree) return crewWalk(r.tree, vars.__v ? vars : crewVars(vars));
  if (vars.scene === 'run' || vars.scene === 'runTogether') return [];
  let tl = chance(0.8) ? crewPick(r.t) : null;
  let gl = chance(0.75) ? crewPick(r.g) : null;
  if (vars.scene === 'runTogether') tl = crewPick([['shout', 'Wait wait, I’ll help push!', 'استنى استنى، بساعدك!'], ['shout', 'Teamwork! Mostly his work!', 'شغل فريق! بس أغلبه عليه هو!']]);
  if (vars.scene === 'run') gl = null;
  if (!tl && !gl) tl = crewPick(r.t);
  const out = [];
  if (tl) out.push(['t', ...tl]);
  if (gl) out.push(['g', ...gl]);
  if (chance(0.5)) out.reverse();
  if (out.length === 1 && chance(0.45)) { const o = out[0][0] === 't' ? 'g' : 't'; out.push([o, ...crewPick(CREW_BACK[o])]); }
  else if (out.length === 2 && chance(0.25)) { const o = out[1][0] === 't' ? 'g' : 't'; out.push([o, ...crewPick(CREW_BACK[o])]); }
  return out;
}

const crew = (type, data = {}) => {
  if (type === 'cart' && !data.scene) data.scene = chance(0.55) ? 'run' : 'runTogether';
  if (type === 'cart' && !data.from) data.from = window.__crewPtr && Date.now() - window.__crewPtr.t < 1500 ? window.__crewPtr : null;
  window.dispatchEvent(new CustomEvent('bara-crew', { detail: { type, ...data } }));
};

// One shared conversation thread: lines play in order with natural pacing (quick for split bubbles, slower for replies), newest at the bottom.
let crewX = 0;
const crewQueue = (q, seq) => { const x = ++crewX; seq.forEach((l, n) => q.push({ w: l[0], mood: l[1], en: l[2], ar: l[3], cont: !!l[4], first: n === 0, x })); };
function useCrewThread(enabled = true, ambient = true, cap = 4, ignoreAway = false) {
  const [thread, setThread] = React.useState([]);
  const q = React.useRef([]);
  React.useEffect(() => {
    if (!enabled) return;
    let alive = true, t, idle = 0;
    const step = () => {
      if (!alive) return;
      if (!ignoreAway && Date.now() < (window.__crewAway || 0)) { t = setTimeout(step, 600); return; }
      let next = q.current.shift();
      if (next && crewMuted() && !next.free) next = crewMuffle(next);
      if (!next) {
        idle++;
        if (idle * 1200 > 6500) setThread([]);
        if (ambient && idle > 3 + Math.random() * 4 && !(crewMuted() && chance(.7))) { idle = 0; crewQueue(q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT)))); }
        t = setTimeout(step, 1200); return;
      }
      idle = 0;
      setThread((th) => (next.first ? [] : th).concat({ ...next, k: Date.now() + Math.random() }).slice(-cap));
      const after = q.current[0];
      const len = (next.en || '').length;
      const d = !after ? 1200 : after.cont ? 650 + len * 18 : 1300 + len * 32 + Math.random() * 500;
      t = setTimeout(step, Math.min(4200, d));
    };
    t = setTimeout(step, 900);
    const on = (e) => { const d = e.detail; const seq = crewReaction(d.type, d); if (seq.length && ambient) { q.current = []; const v = {}; if (d.id) v.id = d.id; if (d.n != null) v.n = d.n; crewQueue(q.current, crewFill(seq, v)); if (d.type === 'mute' && q.current[0]) { q.current[0].free = true; idle = 99; clearTimeout(t); t = setTimeout(step, 50); } if (d.type === 'unmute') { clearTimeout(t); t = setTimeout(step, 300); } } };
    window.addEventListener('bara-crew', on);
    if (ambient) crewQueue(q.current, crewFill(crewWalk(CREW_AMBIENT[0])));
    return () => { alive = false; clearTimeout(t); window.removeEventListener('bara-crew', on); };
  }, [enabled]);
  const say = (seq, vars = {}) => { q.current = []; crewQueue(q.current, crewFill(seq, vars)); };
  const last = (who) => { for (let n = thread.length - 1; n >= 0; n--) if (thread[n].w === who) return thread[n]; return null; };
  return { thread, say, last, q };
}
const crewTone = (l) => (l.w === 'g' ? (l.mood === 'shout' ? 'shout' : 'judge') : l.mood === 'shout' ? 'shout' : l.mood === 'oops' ? 'say' : 'cheer');
// Each speaker's bubbles are offset so the tail lands over that character. lay = { g|t: { end: bool, off: CSS length from that edge to the tail } }.
function CrewThread({ thread, maxWidth = 260, full, lay }) {
  const i = useLangIdx();
  const L = lay || { g: { end: false, off: '0px' }, t: { end: true, off: '0px' } };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: full ? '100%' : 'min(340px, calc(100vw - 32px))' }}>
      {thread.map((l, n) => {
        const prev = thread[n - 1], nxt = thread[n + 1];
        const runStart = !prev || prev.w !== l.w, runEnd = !nxt || nxt.w !== l.w;
        const g = l.w === 'g'; const old = n < thread.length - 2; const s = L[l.w];
        return (
          <div key={l.k} style={{ alignSelf: s.end ? 'flex-end' : 'flex-start', [s.end ? 'marginInlineEnd' : 'marginInlineStart']: 'max(0px, calc(' + s.off + ' - 29px))', marginTop: runStart && n ? 4 : 0, opacity: old ? .55 : 1, transform: old ? 'scale(.96)' : 'none', transformOrigin: (s.end ? 'right' : 'left') + ' bottom', transition: 'opacity .3s, transform .3s', animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards' }}>
            <B.SpeechBubble tone={crewTone(l)} who={runStart ? (g ? (i ? 'وحش اللخبطة' : 'Goblin') : (i ? 'طبعة' : 'Tab’a')) : undefined} tail={runEnd ? (s.end ? 'bottom-end' : 'bottom-start') : 'none'} style={{ maxWidth, animation: 'none' }}>{i ? l.ar : l.en}</B.SpeechBubble>
          </div>
        );
      })}
    </div>
  );
}

const tPose = (m) => (['shout', 'oops', 'cheer', 'hips', 'peer', 'walk'].includes(m) ? m : 'hello');
const gMood = (m) => (['shout', 'busy', 'approve', 'judge', 'hips', 'peer', 'walk', 'push'].includes(m) ? m : 'judge');
const T_IDLE = ['hello', 'hips', 'peer', 'hello'], G_IDLE = ['judge', 'hips', 'peer', 'judge'];
function useIdle(n) { const [k, setK] = React.useState(0); React.useEffect(() => { const t = setInterval(() => setK((x) => x + 1), 5200 + Math.random() * 2400); return () => clearInterval(t); }, []); return k % n; }

function CrewDock() {
  const { thread, last } = useCrewThread(true, true, 4);
  const i = useLangIdx(); const vw = useVW();
  const quiet = false; const muted = useCrewMuted();
  const idle = useIdle(4);
  const [away, setAway] = React.useState(false);
  React.useEffect(() => { let t; const on = (e) => { const d = e.detail; if (d.type === 'cart' && (d.scene === 'run' || d.scene === 'runTogether')) { window.__crewAway = Date.now() + 4800; setAway(true); clearTimeout(t); t = setTimeout(() => setAway(false), 4800); } }; window.addEventListener('bara-crew', on); return () => { clearTimeout(t); window.removeEventListener('bara-crew', on); }; }, []);
  React.useEffect(() => { let t; const chk = () => { const left = (window.__crewAway || 0) - Date.now(); setAway(left > 0); clearTimeout(t); if (left > 0) t = setTimeout(chk, Math.min(left, 2000) + 20); }; window.addEventListener('bara-away', chk); return () => { clearTimeout(t); window.removeEventListener('bara-away', chk); }; }, []);
  const sz = vw < 640 ? 56 : 76;
  const lg = last('g'), lt = last('t');
  const speaking = thread.length ? thread[thread.length - 1].w : null;
  return (
    <div className="s-dock" style={{ position: 'fixed', insetInlineEnd: 12, bottom: 12, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, pointerEvents: 'none', opacity: away ? 0 : 1, transform: away ? 'translateY(24px)' : 'none', transition: 'opacity .35s, transform .35s', visibility: away ? 'hidden' : 'visible' }}>
      {!quiet && <CrewThread thread={thread} maxWidth={vw < 640 ? 210 : 260} lay={{ g: { end: true, off: (12 + sz * 1.3) + 'px' }, t: { end: true, off: (12 + sz * 0.5) + 'px' } }} />}
      <button onClick={crewClick} title={muted ? 'Take the tape off' : 'Tape their mouths'} aria-label={muted ? 'Unmute the crew' : 'Mute the crew'} aria-pressed={muted} style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'flex-end', gap: 0, border: '2px solid var(--graphite-900)', borderRadius: 999, background: 'var(--paper-0)', padding: '4px 10px 0', boxShadow: 'var(--shadow-hard-sm)', cursor: 'pointer' }}>
        <div style={{ transform: speaking === 'g' ? 'translateY(-3px)' : 'none', transition: 'transform .2s' }}><B.Goblin mood={lg ? gMood(lg.mood) : G_IDLE[idle]} size={sz} track taped={muted} /></div>
        <div style={{ marginInlineStart: -sz * 0.2, transform: speaking === 't' ? 'translateY(-3px)' : 'none', transition: 'transform .2s' }}><B.Mascot taped={muted} pose={lt ? tPose(lt.mood) : T_IDLE[(idle + 2) % 4]} size={sz} track /></div>
      </button>
    </div>
  );
}

// Live print queue from BARA_CONFIG.endpoints.floor (polled). No feed → the crew still banters, but no orders are shown.
const floorRows = (d) => (Array.isArray(d) ? d : (d && (d.orders || d.items)) || []).slice(0, 6);
function CrewFloor() {
  const t = useT(); const i = useLangIdx();
  const crewT = useCrewThread(true, false, 5); const muted = useCrewMuted();
  const [orders, setOrders] = React.useState([]);
  const prev = React.useRef({});
  React.useEffect(() => {
    const say = (seq, id) => { if (seq.length) { crewT.q.current = []; crewQueue(crewT.q.current, crewFill(seq, id ? { id } : {})); } };
    say(crewWalk(CREW_AMBIENT[0]));
    const stop = baraApi.poll('floor', baraApi.config.floorPollMs, (data) => {
      if (!data) return;
      const rows = floorRows(data); let ev = null;
      rows.forEach((o) => { const was = prev.current[o.id]; if (!ev && was && was !== o.status && (o.status === 'done' || o.status === 'failed')) ev = [o.status === 'done' ? 'done' : 'fail', o.id]; });
      prev.current = Object.fromEntries(rows.map((o) => [o.id, o.status]));
      setOrders(rows); if (ev) say(crewReaction(ev[0]), ev[1]);
    });
    const talk = setInterval(() => {
      if (!crewT.q.current.length && Math.random() < .5) crewQueue(crewT.q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT))));
    }, 5200);
    return () => { stop(); clearInterval(talk); };
  }, []);
  const live = orders.length > 0;
  const st = { printing: ['info', ['Printing', 'تنطبع']], queued: ['neutral', ['Queued', 'بالانتظار']], done: ['success', ['Done', 'خلص']], failed: ['danger', ['Spaghetti', 'خربت']] }; const stOf = (o) => st[o.status] || st.queued;
  const g = crewT.last('g'), tb = crewT.last('t');
  return (
    <section className="s-section s-wrap">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {live ? <span style={{ ...smMono, color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: 99, background: 'var(--danger)', boxShadow: '0 0 0 4px var(--danger-tint)' }} />{t(['Live from the floor', 'مباشر من الورشة'])}</span> : <span style={{ ...smMono, color: 'var(--fg-3)' }}>{t(SITE.sys.floorIdle)}</span>}
          <PrintText>{t(['Two workers. Six printers. Zero chill.', 'اثنين يشتغلون. ست طابعات. ولا لحظة راحة.'])}</PrintText>
        </div>
        {live && <span style={{ ...smMono, fontSize: 10.5, color: 'var(--fg-3)' }}>{t(SITE.sys.floorNoInfo)}</span>}
      </div>
      <div className={live ? 's-split' : undefined} style={{ alignItems: 'stretch' }}>
        <div style={{ position: 'relative', border: '2px solid var(--graphite-900)', borderRadius: 24, background: 'var(--paper-0)', backgroundImage: 'var(--tex-bed)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '230px 16px 20px', minHeight: 440 }}>
          <div style={{ position: 'absolute', top: 16, bottom: 206, insetInlineStart: 16, insetInlineEnd: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}><CrewThread thread={crewT.thread} maxWidth={300} full lay={{ g: { end: false, off: '25%' }, t: { end: true, off: '25%' } }} /></div>
          <div onClick={crewClick} style={{ cursor: 'pointer' }} title="Tape"><B.Goblin mood={g ? gMood(g.mood) : 'busy'} size={180} taped={muted} /></div>
          <div onClick={crewClick} style={{ cursor: 'pointer' }} title="Tape"><B.Mascot pose={tb ? tPose(tb.mood) : 'printing'} size={180} taped={muted} /></div>
        </div>
        {live && <div style={{ border: '2px solid var(--graphite-900)', borderRadius: 24, background: 'var(--graphite-900)', color: 'var(--paper-0)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          {orders.map((o) => { const p = SITE_PRODUCTS.find((x) => x.id === o.item); const name = p ? [p.en, p.ar] : o.name ? [o.name.en || o.name, o.name.ar || o.name.en || o.name] : [String(o.item || ''), String(o.item || '')]; const pct = o.total ? Math.round(o.layer / o.total * 100) : 0; return (
            <div key={o.id} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 14, background: o.status === 'failed' ? 'rgba(212,42,42,.18)' : 'var(--graphite-800)' }}>
              <span style={{ width: 14, height: 14, borderRadius: 99, background: o.hex, border: '2px solid var(--paper-0)' }} />
              <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', minWidth: 0 }}><span style={{ ...smMono, fontSize: 10.5, color: 'var(--yolk-300)' }}>{o.id}</span><span style={{ font: '600 14px/1.2 var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t(name)}</span></div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--graphite-700)', overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: o.status === 'failed' ? 'var(--danger)' : o.status === 'done' ? 'var(--success)' : 'var(--yolk-500)', transition: 'width 1.1s linear' }} /></div>
                <span style={{ ...smMono, fontSize: 9.5, color: 'var(--graphite-400)' }}>P{o.printer} · L {o.layer}/{o.total}</span>
              </div>
              <B.Badge tone={stOf(o)[0]} dot>{t(stOf(o)[1])}</B.Badge>
            </div>
          ); })}
        </div>}
      </div>
    </section>
  );
}

const CART_GRUMBLE = [['MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'], ['Fine. I’ll carry it. Again.', 'طيب. أنا اللي بشيل، كالعادة.'], ['Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟'], ['My back. My poor back.', 'آه يا ظهري… آه.'], ['Coming through! MOVE!', 'وخّروا! وخّروا الطريق!']];
const CART_TABA = [['Push! PUSH!', 'دزّ! دزّ!'], ['I’m helping! Kind of!', 'أنا أساعد! يعني… تقريبًا!'], ['Nice pick by the way!', 'ترا اختيارك حلو!'], ['Left! No, your OTHER left!', 'يسار! لا لا، يسارك الثاني!']];
if (!window.__crewPtrOn) { window.__crewPtrOn = 1; window.addEventListener('pointerdown', (e) => { window.__crewPtr = { x: e.clientX, y: e.clientY, t: Date.now() }; }, true); }
function CartRunner() {
  const i = useLangIdx();
  const [run, setRun] = React.useState(null); const muted = useCrewMuted();
  const fly = React.useRef(null);
  React.useEffect(() => {
    const on = (e) => { const d = e.detail; if (d.type === 'cart' && (d.scene === 'run' || d.scene === 'runTogether')) { setRun({ k: Date.now(), hex: d.hex || '#F2B705', from: d.from, both: d.scene === 'runTogether', mutter: d.scene === 'runTogether' ? chance(0.5) : chance(0.7), line: crewPick(CART_GRUMBLE), tl: crewPick(CART_TABA) }); clearTimeout(window.__cr); window.__cr = setTimeout(() => setRun(null), 4600); } };
    window.addEventListener('bara-crew', on); return () => window.removeEventListener('bara-crew', on);
  }, []);
  React.useEffect(() => {
    const el = fly.current; if (!run || !el) return;
    const rtl = document.documentElement.dir === 'rtl';
    const W = window.innerWidth, H = window.innerHeight;
    const off = 52 + (run.both ? 66 : 0);
    const tx = rtl ? W / 2 - off : W / 2 + off, ty = H - 150;
    const fx = run.from ? run.from.x : W / 2, fy = run.from ? run.from.y : H * 0.4;
    const dx = tx - fx, dy = ty - fy, peak = Math.min(0, dy) - 140;
    el.style.left = fx - 20 + 'px'; el.style.top = fy - 16 + 'px';
    el.animate([
      { transform: 'translate(0,0) scale(.6)', opacity: 0 },
      { transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)', opacity: 1, offset: .12 },
      { transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)', opacity: 1, offset: .55 },
      { transform: `translate(${dx * .5}px,${peak}px) scale(1.05) rotate(160deg)`, offset: .78 },
      { transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`, opacity: 1, offset: .98 },
      { transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`, opacity: 0 },
    ], { duration: 2000, easing: 'cubic-bezier(.4,0,.3,1)', fill: 'forwards' });
  }, [run && run.k]);
  if (!run) return null;
  const rm = false;
  const rtl = document.documentElement.dir === 'rtl';
  const flip = rtl ? { transform: 'scaleX(-1)' } : null;
  const pile = [['box', '#EAE3D2', -8, 0, 0], ['spool', '#E8367A', 6, 44, 0], ['box', '#F2B705', 10, 92, 0], ['spool', '#12A5A0', -12, 20, 34], ['box', '#2F6BFF', 4, 66, 30], ['spool', '#232327', -4, 108, 26]];
  const piece = ([k, col, rot, x, y], n, extra) => k === 'box'
    ? <span key={n} style={{ position: 'absolute', left: x, bottom: y, width: 40, height: 32, background: col, border: '2.5px solid var(--graphite-900)', borderRadius: 6, transform: 'rotate(' + rot + 'deg)', backgroundImage: 'var(--tex-layers)', ...extra }} />
    : <span key={n} style={{ position: 'absolute', left: x, bottom: y, width: 36, height: 36, background: col, border: '2.5px solid var(--graphite-900)', borderRadius: 99, transform: 'rotate(' + rot + 'deg)', ...extra }}><span style={{ position: 'absolute', inset: 10, borderRadius: 99, background: 'var(--paper-0)', border: '2.5px solid var(--graphite-900)' }} /></span>;
  return (
    <>
    <span key={'f' + run.k} ref={fly} aria-hidden style={{ position: 'fixed', zIndex: 46, pointerEvents: 'none', width: 40, height: 32, background: run.hex, border: '2.5px solid var(--graphite-900)', borderRadius: 6, backgroundImage: 'var(--tex-layers)', boxShadow: 'var(--shadow-hard-sm)', opacity: 0 }} />
    <div key={run.k} aria-hidden style={{ position: 'fixed', bottom: 6, zIndex: 45, pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', gap: 4, ...(rm ? { [rtl ? 'right' : 'left']: 'calc(50vw - 150px)', animation: 's-fadepark 3s ease both' } : { animation: (rtl ? 's-cartrun-rtl' : 's-cartrun') + ' 4.4s cubic-bezier(.45,.05,.4,1) forwards' }) }}>
      <div style={{ position: 'relative' }}>
        {run.mutter && <div style={{ position: 'absolute', bottom: '100%', insetInlineStart: 10, marginBottom: 4, width: 'max-content', maxWidth: 240 }}><B.SpeechBubble tone="shout" who={i ? 'وحش اللخبطة' : 'Mess Goblin'}>{muted ? (i ? 'ممف ممف!' : 'Mmph mmph!') : (i ? run.line[1] : run.line[0])}</B.SpeechBubble></div>}
        <B.Goblin mood="push" ignoreReducedMotion size={120} style={flip} taped={muted} />
      </div>
      {run.both && <div style={{ position: 'relative', order: -1, marginInlineEnd: -30 }}>
        <div style={{ position: 'absolute', bottom: '100%', insetInlineEnd: 20, marginBottom: 72, width: 'max-content', maxWidth: 200 }}><B.SpeechBubble tone="cheer" who={i ? 'طبعة' : 'Tab’a'}>{muted ? (i ? 'مم-ممف!' : 'Mm-mmph!') : (i ? run.tl[1] : run.tl[0])}</B.SpeechBubble></div>
        <B.Mascot pose="walk" ignoreReducedMotion size={96} style={flip} taped={muted} />
      </div>}
      <div style={{ position: 'relative', width: 156, height: 150, marginBottom: 8 }}>
        <div style={{ position: 'absolute', left: 4, right: 4, bottom: 34, height: 110 }}>
          {pile.map((p, n) => piece(p, n))}
          {piece(['box', run.hex, 6, 54, 62], 'new', { width: 46, height: 38, animation: rm ? 's-fadein .4s .7s both' : 's-land .3s 1.95s cubic-bezier(.3,1.4,.5,1) both' })}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 20, height: 56, background: 'var(--paper-0)', border: '3px solid var(--graphite-900)', borderRadius: '4px 4px 16px 16px', backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 22px, var(--graphite-900) 22px 24px)' }} />
        <div style={{ position: 'absolute', insetInlineStart: -22, bottom: 64, width: 30, height: 6, background: 'var(--graphite-900)', borderRadius: 3, transform: 'rotate(' + (rtl ? 20 : -20) + 'deg)' }} />
        {[18, 118].map((x) => <span key={x} style={{ position: 'absolute', left: x, bottom: 0, width: 22, height: 22, borderRadius: 99, background: 'var(--graphite-900)', boxShadow: 'inset 0 0 0 6px var(--graphite-900), inset 0 0 0 10px var(--paper-2)' }} />)}
      </div>
    </div>
    </>
  );
}


// Peek-a-boo: now and then both characters pop out from behind a product tile / card on screen, argue, then duck back.
const CREW_PEEK = [
  N('g', 'peer', 'Psst. | Over here.', 'پسس. | هنا، ورا.', N('t', 'shout', 'What are you doing behind the {part}?!', 'وش مدسّك ورا {part:ar}؟!', N('g', 'judge', 'Hiding from the customers.', 'متخبي من الزباين.', N('t', 'oops', '…they can SEE you.', '…ترا كلهم شايفينك.')), N('g', 'hips', 'Quality control.', 'أراقب الجودة. شغل مهم.'))),
  N('t', 'peer', 'Is this one ours?', 'هذا من شغلنا؟', N('g', 'judge', 'It’s got a {mat} string on it. | Yes.', 'عليه خيط {mat} معلّق. | إيه، حقنا.'), N('g', 'approve', 'Ours. And it’s good.', 'حقنا. وطالع نظيف.', N('t', 'cheer', 'Did you just say something NICE?', 'قلت كلمة حلوة؟! أنت؟!', N('g', 'shout', 'NO.', 'لا. ما قلت.')))),
  N('t', 'oops', 'I think I’m stuck. | Behind the {part}.', 'شكلي علقت. | ورا {part:ar}.', N('g', 'judge', 'Good. Stay.', 'زين. خليك مكانك.'), N('g', 'busy', 'AGAIN?!', 'مرة ثانية؟! وش فيك؟', N('t', 'oops', 'It’s cosy back here.', 'المكان دافي هنا ورايق.'))),
  N('g', 'peer', 'This shelf is dusty. | …I’m not dusting it.', 'هالرف كله غبار. | …ولا راح أنظفه.', N('t', 'cheer', 'I’ll do it!', 'خلاص أنا أنظفه!', N('g', 'judge', 'You’ll print a duster first.', 'أول شي بتطبعين منفضة، صح؟', N('t', 'hips', '…obviously.', '…أكيد، وش تتوقع؟')))),
  N('t', 'shout', 'You said you fixed printer {printer}!', 'مو قلت إنك صلّحت الطابعة {printer}؟!', N('g', 'hips', 'I said I LOOKED at it.', 'قلت شفتها، ما قلت صلّحتها.'), N('g', 'oops', '…define “fixed”.', '…يعتمد وش قصدك بـ"صلّحتها".', N('t', 'shout', 'IT’S ON FIRE?!', 'ليه يطلع منها دخان؟!', N('g', 'judge', 'Warm. It’s warm.', 'حامية شوي بس. عادي.')))),
  N('g', 'shout', 'Who moved the {part}?!', 'مين اللي حرّك {part:ar}؟!', N('t', 'oops', '…it moved itself.', '…مشى لحاله.', N('g', 'peer', 'Things don’t just move.', 'الأغراض ما تمشي لحالها.', N('t', 'peer', 'YOU just moved. | From behind a shelf.', 'وأنت توك طالع… | من ورا رف.'))), N('t', 'cheer', 'Me! It looks better here!', 'أنا! مكانه هنا أحلى!')),
  N('t', 'peer', 'Do you think they can hear us?', 'تتوقع يسمعوننا؟', N('g', 'judge', 'They can read us.', 'يقرون كلامنا ترا.', N('t', 'oops', '…hi.', '…هلا والله.')), N('g', 'shout', 'BUY SOMETHING.', 'اشتر لك شي!')),
];
// Page-aware peeks: lines about what's on screen. Route from the hash (website) or window.__peekCtx (other kits).
const CREW_PEEK_CTX = {
  product: [
    N('g', 'peer', 'So. | You’re looking at the {part}.', 'اها. | عاجبك {part:ar}؟', N('t', 'cheer', 'Spin it! Drag it around!', 'لفّه! اسحبه وطالع من كل جهة!', N('g', 'judge', 'Don’t make it dizzy.', 'لا تدوّخه.')), N('t', 'peer', 'Look at those layers…', 'شوف الطبقات كيف مرتبة…', N('g', 'approve', 'Clean. I sanded nothing.', 'نظيفة. وبدون صنفرة.'))),
    N('t', 'cheer', 'The {part}! | I printed that one!', '{part:ar}! | أنا اللي طبعته!', N('g', 'hips', 'You watched it print.', 'إنتي كنتي بس تطالعين فيه.', N('t', 'oops', '…supervising is work.', '…الإشراف شغل ترا.')), N('g', 'peer', 'Pick a colour already.', 'اختار لون وخلصنا.')),
    N('g', 'judge', 'The {part} in {mat}? | Bold.', '{part:ar} بـ{mat}؟ | جريء.', N('t', 'shout', 'It’s PERFECT in {mat}!', 'بالـ{mat} يجنن!'), N('t', 'hello', 'Try another swatch!', 'جرّب لون ثاني!')),
  ],
  custom: [
    N('t', 'peer', 'Ooh, a mystery file.', 'أوه، ملف غامض.', N('g', 'judge', 'Let me guess. | No supports. | Again.', 'خلني أخمّن. | بدون دعامات. | كالعادة.'), N('g', 'shout', 'Check the wall thickness!', 'شيّك على سماكة الجدار!')),
    N('g', 'busy', 'Fast or Standard? | Choose wisely.', 'سريع ولا عادي؟ | اختار صح.', N('t', 'cheer', 'Fast! Always fast!', 'سريع! دايم سريع!', N('g', 'judge', 'Fast is how spaghetti happens.', 'السريع هو اللي يجيب السباغيتي.'))),
  ],
  sell: [
    N('g', 'peer', 'Your design? | Really yours?', 'تصميمك؟ | من جدك إنه حقك؟', N('t', 'cheer', 'Trust them!', 'صدّقه!'), N('t', 'judge', 'He checks every one. Every. One.', 'يشيّك على كل واحد. كل واحد.')),
    N('t', 'cheer', 'Points! For every sale!', 'نقاط! مع كل بيعة!', N('g', 'hips', 'Not if you buy it yourself.', 'إلا إذا شريته لنفسك.', N('t', 'oops', '…he caught three people already.', '…ترا مسك ثلاثة قبلك.'))),
  ],
  materials: [
    N('t', 'peer', 'Which one’s your favourite?', 'أي واحد تحبه أكثر؟', N('g', 'approve', 'PETG. It doesn’t whine.', 'PETG. ما يتدلع.'), N('g', 'judge', 'Loop. Because it’s ME.', 'Loop. لأنه من صنعي.')),
    N('g', 'shout', 'TPU is NOT a toy!', 'TPU مو لعبة!', N('t', 'cheer', 'It’s squishy though!', 'بس طري!')),
  ],
  loop: [
    N('g', 'hips', 'This page is about me. | Finally.', 'هالصفحة عني. | أخيرًا.', N('t', 'oops', 'It’s about recycling…', 'هي عن التدوير…', N('g', 'judge', 'Same thing.', 'نفس الشي.'))),
    N('t', 'peer', 'Do you really eat all of it?', 'جد تاكلها كلها؟', N('g', 'approve', 'Then it comes out as new spools.', 'وبعدين تطلع بكرات جديدة.', N('t', 'oops', 'I didn’t need to know that.', 'ليتني ما سألت.'))),
  ],
  studio: [
    N('t', 'cheer', 'Paint it! | Every part a different colour!', 'لوّنه! | كل قطعة بلون!', N('g', 'judge', 'And who swaps the spools? Me.', 'ومين يبدّل البكرات؟ أنا.'), N('g', 'peer', 'That combo… | works. Annoyingly.', 'هالتنسيق… | حلو. للأسف.')),
    N('g', 'peer', 'That {mat} is almost out of stock.', 'الـ{mat} قرّب يخلص.', N('t', 'shout', 'Order more!', 'اطلب بعد!'), N('t', 'oops', 'I may have used it for… a hat.', 'يمكن إني طبعت فيه… قبعة.')),
    N('t', 'peer', 'Compare mode! | Side by side!', 'وضع المقارنة! | حطهم جنب بعض!', N('g', 'hips', 'Left one. Obviously.', 'اليسار. أكيد.', N('t', 'shout', 'RIGHT one!', 'اليمين!', N('g', 'judge', 'Wrong.', 'غلط.')))),
  ],
};
const crewRoute = () => window.__peekCtx || (location.hash.replace(/^#\/?/, '').split('/')[0] || 'home');
const CREW_PEEK_SOLO = {
  g: [['peer', 'Psst. | Don’t tell Tab’a I’m here.', 'پسس. | لا تقول لطبعة إني هنا.'], ['judge', 'This {part}? | …I’d buy it. Don’t quote me.', '{part:ar}؟ | …لو مكانك اشتريته. بس لا تقول لأحد.'], ['hips', 'I’m on break. | For {mins} minutes. | Officially.', 'أنا في بريك. | {mins} دقيقة. | رسمي.']],
  t: [['peer', 'Hiii. | Have you seen the Goblin?', 'هلاااا. | ما شفت وحش اللخبطة؟'], ['cheer', 'Ooh, the {part}! | I helped print that!', 'ياي، {part:ar}! | أنا ساعدت فيه!'], ['oops', 'I’m hiding. | He wants me to clean printer {printer}.', 'متخبية. | يبيني أنظف الطابعة {printer}.']],
};
// Where to mount peekers: the tile itself, unless it (or an ancestor) clips — then just outside the outermost clipping ancestor.
function peekHost(el) {
  let clip = null;
  for (let n = el; n && n !== document.body; n = n.parentElement) { if (getComputedStyle(n).overflow !== 'visible') clip = n; }
  return clip ? (clip.parentElement || document.body) : el;
}
function PeekCrew() {
  const crewT = useCrewThread(true, false, 4, true); const muted = useCrewMuted();
  const [peek, setPeek] = React.useState(null);
  const [, force] = React.useState(0);
  const peekRef = React.useRef(null); peekRef.current = peek;
  const vw = useVW();
  const sz = vw < 640 ? 64 : 92;
  React.useEffect(() => {
    let t; const rtl = () => document.documentElement.dir === 'rtl';
    const schedule = (ms) => { clearTimeout(t); t = setTimeout(tryPeek, ms); };
    const tryPeek = () => {
      if (Date.now() < (window.__crewAway || 0) || document.hidden) return schedule(8000);
      const H = innerHeight, W = innerWidth;
      const els = Array.from(document.querySelectorAll(window.__peekSel || 'main .s-squish, main .s-g4 > *, main [data-peek], main [style*="border: 2px solid var(--graphite-900)"]')).filter((el) => { const r = el.getBoundingClientRect(); return r.width > 160 && r.height > 110 && r.top > 90 && r.top < H - 120 && r.left > -10 && r.right < W + 10 && !el.closest('.s-dock'); }).filter((el, n, arr) => !arr.some((o) => o !== el && o.contains(el) && o.getBoundingClientRect().height < innerHeight * .9));
      if (!els.length) return schedule(9000);
      const narrow = W < 640;
      const roomTop = 72 + sz * .8 + 90; // header + character + bubble room
      const okTop = (el) => el.getBoundingClientRect().top > roomTop;
      let pool = els.filter(okTop);
      if (!pool.length) return schedule(7000);
      const a = crewPick(pool); let b = a;
      const ra = a.getBoundingClientRect();
      if (narrow) {
        const other = pool.filter((x) => x !== a && Math.abs(x.getBoundingClientRect().top - ra.top) > ra.height * .6);
        if (other.length) b = crewPick(other);
      } else if (pool.length > 1 && chance(.6)) {
        const far = pool.filter((x) => { if (x === a) return false; const r = x.getBoundingClientRect(); return Math.abs(r.top - ra.top) > ra.height * .6 || Math.abs((r.left + r.width / 2) - (ra.left + ra.width / 2)) > 300; });
        if (far.length) b = crewPick(far);
      }
      const first = chance(.5) ? 'g' : 't';
      const sideFor = (el) => { const r = el.getBoundingClientRect(); const opts = ['top', 'top', 'top']; if (r.left > sz + 12) opts.push('left'); if (W - r.right > sz + 12) opts.push('right'); return crewPick(opts); };
      const same = a === b;
      // narrow + one row only → single peeker (no collision possible)
      const solo = same && (narrow || ra.width < 300 + sz);
      const slotFor = (el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2 < W / 2 ? .3 : .7; };
      const spots = solo
        ? [{ el: a, side: 'top', slot: slotFor(a), half: true }, null]
        : same
          ? [{ el: a, side: 'top', slot: .2, halfTile: true }, { el: a, side: 'top', slot: .8, halfTile: true }]
          : narrow
            ? [{ el: a, side: 'top', slot: slotFor(a), half: true }, { el: b, side: 'top', slot: slotFor(b), half: true }]
            : [{ el: a, side: 'top', slot: .3 + Math.random() * .4 }, { el: b, side: 'top', slot: .3 + Math.random() * .4 }];
      if (first === 't') spots.reverse();
      spots.forEach((s) => { if (s) s.host = peekHost(s.el); });
      if (!spots[1]) { const s0 = spots[0]; setPeek({ k: Date.now(), g: first === 'g' ? s0 : null, t: first === 't' ? s0 : null, out: false }); }
      else setPeek({ k: Date.now(), g: spots[0], t: spots[1], out: false });
      window.__peekSolo = !spots[1] ? first : null;
      window.__crewAway = Date.now() + 60000; window.dispatchEvent(new CustomEvent('bara-away'));
      const route = crewRoute(); const pv = {};
      if (route === 'product') { const id = location.hash.split('/')[2]; const p = (window.SITE_PRODUCTS || []).find((x) => x.id === id); if (p) { pv.part = p.en; pv['part:ar'] = p.ar; } }
      const ctxPool = CREW_PEEK_CTX[route];
      const tree = ctxPool && chance(.7) ? crewPick(ctxPool) : crewPick(CREW_PEEK);
      setTimeout(() => (!spots[1] ? crewT.say([[first, ...crewPick(CREW_PEEK_SOLO[first])]], pv) : crewT.say(crewWalk(tree, crewVars(pv)))), 650);
    };
    window.__peekNext = () => schedule(0);
    schedule(9000 + Math.random() * 8000);
    const end = () => { setPeek((p) => (p ? { ...p, out: true } : p)); setTimeout(() => { setPeek(null); window.__crewAway = Date.now() + 400; window.dispatchEvent(new CustomEvent('bara-away')); schedule(28000 + Math.random() * 22000); }, 520); };
    window.__peekEnd = end;
    const onCart = (e) => { if (e.detail.type === 'cart' && peekRef.current && !peekRef.current.out) { setPeek((p) => (p ? { ...p, out: true } : p)); setTimeout(() => { setPeek(null); schedule(30000 + Math.random() * 20000); }, 520); } };
    window.addEventListener('bara-crew', onCart);
    return () => { clearTimeout(t); window.removeEventListener('bara-crew', onCart); };
  }, []);
  // Anchor: render inside each target tile so they scroll with it natively (no per-frame repositioning).
  React.useEffect(() => {
    if (!peek) return;
    const sp = [peek.g, peek.t].filter(Boolean); const els = [...new Set(sp.map((s) => s.host))]; const saved = els.map((el) => [el.style.position, el.style.zIndex]);
    els.forEach((el) => { if (getComputedStyle(el).position === 'static') el.style.position = 'relative'; if (sp.some((s) => s.host === el && s.el === el)) el.style.zIndex = '30'; });
    const a = setTimeout(() => force((x) => x + 1), 80), b = setTimeout(() => force((x) => x + 1), 300);
    const sc = (e) => { if (e.target !== document && e.target !== document.documentElement) force((x) => x + 1); };
    window.addEventListener('scroll', sc, true);
    return () => { clearTimeout(a); clearTimeout(b); window.removeEventListener('scroll', sc, true); els.forEach((el, n) => { el.style.position = saved[n][0]; el.style.zIndex = saved[n][1]; }); };
  }, [peek && peek.k]);
  React.useEffect(() => { if (peek && peek.out) force((x) => x + 1); }, [peek && peek.out]);
  // finish when the argument is over or the tile scrolls away
  React.useEffect(() => {
    if (!peek || peek.out) return;
    const iv = setInterval(() => {
      const sp = [peek.g, peek.t].filter(Boolean);
      const gone = sp.some((s) => { const r = s.el.getBoundingClientRect(); return r.bottom < 60 || r.top > innerHeight - 20 || !s.el.isConnected; });
      const th = crewT.thread; const idleDone = Date.now() - peek.k > 2500 && !crewT.q.current.length && (!th.length || Date.now() - th[th.length - 1].k > 2600);
      if (gone || idleDone) window.__peekEnd();
    }, 400);
    return () => clearInterval(iv);
  }, [peek, crewT.thread]);
  if (!peek) return null;
  const rtl = document.documentElement.dir === 'rtl'; const W = innerWidth;
  const lg = crewT.last('g'), lt = crewT.last('t');
  const latest = crewT.thread.slice(-2).map((x) => x.k);
  const one = (who, spot, line) => {
    const el = spot.el; const host = spot.host || el; const r = el.getBoundingClientRect(); const hr = host.getBoundingClientRect(); const s = spot.side; const Wd = r.width;
    const dx = host === el ? 0 : r.left - hr.left + host.scrollLeft, dy = host === el ? 0 : r.top - hr.top + host.scrollTop;
    const box = s === 'top' ? { left: Wd * spot.slot - sz / 2, top: -sz * .78, width: sz, height: sz * .78 } : s === 'left' ? { left: -sz * .72, top: 40, width: sz * .72, height: sz } : { left: Wd, top: 40, width: sz * .72, height: sz };
    const hide = s === 'top' ? 'translateY(100%)' : s === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
    const shown = !peek.out && Date.now() - peek.k > (who === 'g' ? 60 : 260);
    const cxRel = box.left + box.width / 2; const tailLeft = spot.halfTile ? spot.slot < .5 : r.left + cxRel < W / 2;
    const bub = line && latest.includes(line.k) && shown;
    const items = []; if (bub) { const th = crewT.thread; let n = th.length - 1; while (n >= 0 && th[n].w !== who) n--; let m = n; while (m > 0 && th[m - 1].w === who) m--; for (let j = m; j <= n; j++) items.push(th[j]); }
    const i = document.documentElement.lang === 'ar' ? 1 : 0;
    const bw = spot.half ? Math.floor(W / 2 - 16) : spot.halfTile ? Math.max(150, Math.floor(Wd / 2 + sz * .3)) : 260;
    return ReactDOM.createPortal(
      <React.Fragment>
        <div onClick={crewClick} title="Tape" style={{ position: 'absolute', ...box, left: box.left + dx, top: box.top + dy, overflow: 'hidden', zIndex: host === el ? 2 : 60, pointerEvents: shown ? 'auto' : 'none', cursor: 'pointer' }}>
          <div style={{ width: sz, height: sz, transform: shown ? 'none' : hide, transition: 'transform .45s cubic-bezier(.3,1.35,.5,1)', marginLeft: s === 'right' ? -sz * .28 : 0 }}>
            {who === 'g' ? <B.Goblin mood={lg ? gMood(lg.mood) : 'peer'} size={sz} track taped={muted} /> : <B.Mascot pose={lt ? tPose(lt.mood) : 'peer'} size={sz} track taped={muted} />}
          </div>
        </div>
        {items.length > 0 && <div style={{ position: 'absolute', zIndex: host === el ? 3 : 61, pointerEvents: 'none', top: box.top + dy - 6, transform: 'translateY(-100%)', [tailLeft ? 'left' : 'right']: tailLeft ? cxRel + dx - 29 : (host === el ? Wd : hr.width) - (cxRel + dx) - 29, width: 'max-content', display: 'flex', flexDirection: 'column', alignItems: tailLeft ? 'flex-start' : 'flex-end', gap: 4, maxWidth: bw }}>
          {items.map((l, n) => <div key={l.k} style={{ animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards' }}><B.SpeechBubble tone={crewTone(l)} who={n ? undefined : (who === 'g' ? (i ? 'وحش اللخبطة' : 'Goblin') : (i ? 'طبعة' : 'Tab’a'))} tail={n === items.length - 1 ? ((tailLeft !== rtl) ? 'bottom-start' : 'bottom-end') : 'none'} style={{ maxWidth: bw, animation: 'none' }}>{i ? l.ar : l.en}</B.SpeechBubble></div>)}
        </div>}
      </React.Fragment>, host, who);
  };
  return <>{peek.g && one('g', peek.g, lg)}{peek.t && one('t', peek.t, lt)}</>;
}

Object.assign(window, { crewMute, useCrewMuted, PeekCrew, CartRunner, crew, CrewDock, CrewFloor, useCrewThread, CrewThread });

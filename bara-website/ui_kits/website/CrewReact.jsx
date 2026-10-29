// The crew, part 2: reactions to what the shopper does, the speech queue and
// thread.

const CREW_REACT = {
  mute: {
    tree: [
      N(
        'g',
        'shout',
        'Hey! Don’t you da—',
        'لا! لا تسويها—',
        N('t', 'oops', 'Mmph!', 'ممف!'),
      ),
      N(
        't',
        'shout',
        'Wait, I wasn’t finish—',
        'لحظة، ما كملت كلا—',
        N('g', 'judge', 'Mmmph.', 'مممف.'),
      ),
      N('g', 'judge', 'Tape. Really?', 'لزقة؟ من جدك؟'),
    ],
  },
  unmute: {
    tree: [
      N(
        'g',
        'shout',
        'OW. | That pulled my eyebrow.',
        'آآي. | شالت نص حاجبي.',
        N(
          't',
          'cheer',
          'We’re BACK!',
          'رجعنااا!',
          N('g', 'judge', 'Unfortunately.', 'للأسف.'),
        ),
      ),
      N(
        't',
        'cheer',
        'Freedom!',
        'أخيرًا أتنفس!',
        N(
          'g',
          'hips',
          'As I was saying before I was SILENCED…',
          'المهم، كنت أقول قبل ما يسكتوني…',
        ),
      ),
      N(
        'g',
        'judge',
        'I’m keeping the tape.',
        'اللزقة بخليها عندي.',
        N('t', 'oops', 'Why?!', 'ليش؟!', N('g', 'peer', 'For you.', 'عشانك.')),
      ),
    ],
  },
  cart: {
    t: [
      ['cheer', 'Great pick! Seriously!', 'والله اختيار يجنن!'],
      ['cheer', 'You have amazing taste!', 'ذوقك رهيب!'],
      [
        'cheer',
        'YESSS! Number {orders} in the queue!',
        'ياااس! صار رقم {orders} بالدور!',
      ],
      [
        'shout',
        'Another one?! Printer {printer}, wake up!',
        'بعد؟! الطابعة {printer} قومي اشتغلي!',
      ],
      ['oops', 'Honestly… he’s right, that’s a lot.', 'بصراحة… معه حق، كثّرت.'],
      [
        'judge',
        'Do you even need that? Kidding. Mostly.',
        'تحتاجه أصلًا؟ أمزح… نص ونص.',
      ],
      [
        'peer',
        'Wait… let me look closer. Yep, cute.',
        'لحظة… خلني أقرّب. إيه، يهبّل.',
      ],
      ['hello', 'Ooh, that one’s my favourite.', 'هذا أحبه مرّه!'],
    ],
    g: [
      ['judge', 'Another one. Fine.', 'بعد واحد… ماشي.'],
      ['shout', 'MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'],
      [
        'judge',
        'Bold choice. Not judging. Okay, judging.',
        'اختيار جريء. ما أحكم عليك… طيب أحكم.',
      ],
      ['approve', '…Actually, nice.', '…الصراحة، مو بطال.'],
      [
        'peer',
        'Hmm. Inspecting. Don’t rush me.',
        'هممم. خلني أفحصه. لا تستعجل.',
      ],
      [
        'hips',
        'And who’s carrying all this? Me.',
        'ومين بيشيل هذا كله؟ أنا طبعًا.',
      ],
      ['busy', 'Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟'],
    ],
  },
  pink: {
    t: [
      ['cheer', 'PINK!! Love it!', 'وردي!! يجنن!'],
      ['oops', 'Pink… again? Okay! Okay.', 'وردي… مرة ثانية؟ أوكي! ماشي.'],
    ],
    g: [
      ['judge', 'Pink. Again. Bold.', 'وردي؟ بعد؟ ما شاء الله.'],
      ['approve', 'Fine. Pink works.', 'طيب. الوردي لايق.'],
    ],
  },
  graphite: {
    t: [
      ['cheer', 'Sleek!', 'فخم!'],
      ['hello', 'So moody. I like it.', 'غامق ورايق. حبيته.'],
    ],
    g: [
      ['approve', 'Finally. Some taste.', 'أخيرًا، أحد ذوقه عدل.'],
      ['judge', 'Black. How original.', 'أسود؟ يا سلام على الإبداع.'],
    ],
  },
  colour: {
    t: [
      ['cheer', 'Ooh, that’ll look SO good!', 'واو، بيطلع خطير!'],
      ['hello', 'Hmm, maybe try one more?', 'همم، جرّب لون ثاني؟'],
      [
        'oops',
        'I can’t decide for you, I’m a blob.',
        'لا تسألني، أنا مجرد خيوط ملخبطة.',
      ],
    ],
    g: [
      ['judge', 'Hm. Brave choice.', 'هممم… جريء.'],
      ['approve', 'Acceptable.', 'يمشي.'],
      [
        'busy',
        'Pick faster, {orders} orders waiting!',
        'بسرعة الله يرضى عليك، {orders} طلب ينتظر!',
      ],
    ],
  },
  tpu: {
    t: [['cheer', 'Squishy!!', 'طريّة!! أبي أعصرها!']],
    g: [
      [
        'judge',
        'Bendy. Hope you like wobbly.',
        'مرن؟ إن شاء الله تحب الأشياء اللي تتلوّى.',
      ],
      [
        'shout',
        'TPU?! That jams printer {printer}!',
        'TPU؟! هذا يسد نوزل الطابعة {printer}!',
      ],
    ],
  },
  petg: {
    t: [
      ['cheer', 'Tough stuff!', 'قوية وما تنكسر!'],
      ['hello', 'Shiny!', 'تلمع!'],
    ],
    g: [
      [
        'approve',
        'Dishwasher-safe-ish. Respect.',
        'يتحمّل غسالة الصحون… تقريبًا. احترمتك.',
      ],
      ['judge', 'Strings everywhere. Thanks.', 'خيوط بكل مكان. مشكور.'],
    ],
  },
  file: {
    t: [
      ['shout', 'A NEW FILE! I’m so excited!', 'ملف جديد!! متحمسة مرّه!'],
      ['oops', 'It’s… a lot of triangles.', 'فيه… مثلثات واجد.'],
    ],
    g: [
      ['judge', 'Let me guess. No supports.', 'خلني أخمّن… بدون دعامات.'],
      ['shout', 'Who designs overhangs like THAT?!', 'مين يصمم أوفرهانق كذا؟!'],
    ],
  },
  quote: {
    t: [
      ['cheer', 'On it RIGHT NOW!', 'أبدأ فيها الحين!'],
      [
        'shout',
        'He’ll grumble, but it’ll be great!',
        'بيتحلطم، بس بتطلع حلوة!',
      ],
    ],
    g: [
      ['shout', 'TAB’A! Another quote!', 'طبعة! جانا طلب تسعيرة!'],
      [
        'busy',
        'Quote number {orders} today. Adding it to the pile.',
        'هذا طلب التسعيرة رقم {orders} اليوم. حطيه فوق الكومة.',
      ],
    ],
  },
  done: {
    t: [
      ['cheer', '{id} is DONE!', '{id} خلص!! يا سلام!'],
      ['hips', '{id}. Nailed it.', '{id}. ضبطت معنا.'],
    ],
    g: [
      ['approve', 'Finally.', 'أخيرًا.'],
      ['judge', 'Only {hours} hours late.', 'تأخر {hours} ساعات بس. عادي.'],
      [
        'peer',
        'Checked all {total} layers… acceptable.',
        'فحصت الـ{total} طبقة… يمشي الحال.',
      ],
    ],
  },
  hoard: {
    tree: [
      N(
        'g',
        'judge',
        '{n} items and no checkout. Going for a world record?',
        '{n} أغراض وما دفعت؟ ناوي تدخل موسوعة غينيس؟',
        N('t', 'oops', 'He means it lovingly. Mostly.', 'يمزح… أظن.'),
        N(
          't',
          'cheer',
          'If they are, I’m cheering!',
          'لو ناوي، أنا أول وحدة أشجعه!',
          N('g', 'judge', 'Of course you are.', 'أكيد، وش غيره.'),
        ),
        N(
          't',
          'peer',
          'Is that a record? Let me check.',
          'جد؟ رقم قياسي؟ بقوقل.',
          N('g', 'hips', 'It’s a cry for help.', 'هذي صرخة استغاثة.'),
        ),
      ),
      N(
        'g',
        'hips',
        'This cart is not a museum.',
        'ترا السلة مو متحف.',
        N(
          't',
          'cheer',
          'Checkout is RIGHT there! I’ll cheer!',
          'زر الدفع هناك! يلا أشجعك!',
        ),
        N(
          't',
          'hello',
          'A very nice museum though.',
          'بس متحف حلو، الصراحة.',
          N(
            'g',
            'judge',
            'Free entry. No sales.',
            'الدخول ببلاش، والبيع… ولا شي.',
          ),
        ),
      ),
      N(
        't',
        'peer',
        'Are we… collecting them?',
        'يعني… بس نجمّع؟',
        N(
          'g',
          'judge',
          'I’m charging rent on that cart.',
          'بحط على السلة إيجار شهري.',
        ),
        N('g', 'shout', 'Collect them AT HOME!', 'جمّعها في بيتكم!'),
      ),
      N(
        'g',
        'shout',
        'I PUSHED that cart for NOTHING?!',
        'يعني دزّيت العربية على الفاضي؟!',
        N(
          't',
          'hello',
          'Shh, they’re thinking. | Right? | …Right?',
          'اششش، يفكّر. | صح؟ | …صح؟',
          N(
            'g',
            'peer',
            'Thinking for {mins} minutes.',
            'صار له {mins} دقيقة يفكّر.',
          ),
        ),
        N(
          't',
          'oops',
          'You pushed it for exercise!',
          'اعتبرها رياضة!',
          N('g', 'judge', 'I hate exercise.', 'وأنا أكره الرياضة.'),
        ),
      ),
      N(
        'g',
        'peer',
        'Still deciding? Printer {printer} is getting cold.',
        'للحين تفكر؟ الطابعة {printer} بردت.',
        N(
          't',
          'shout',
          'Take them home, they’re lonely!',
          'خذها بيتكم، مساكين لحالهم!',
        ),
        N(
          't',
          'cheer',
          'Take your time! | …but not too much.',
          'خذ راحتك! | …بس مو مرّه.',
        ),
      ),
      N(
        't',
        'judge',
        'Okay… | even I think that’s a lot of window shopping.',
        'طيب… | حتى أنا أشوف إنك طوّلت وأنت تتفرج.',
        N('g', 'approve', 'Finally she sees it.', 'أخيرًا فهمت.'),
        N(
          'g',
          'oops',
          'Wait, you’re on MY side?',
          'لحظة، إنتي معي؟',
          N('t', 'hips', 'Just this once.', 'هالمرة بس، لا تتعود.'),
        ),
      ),
    ],
  },
  fail: {
    tree: [
      N(
        'g',
        'shout',
        'WHAT HAPPENED to {id}?!',
        'وش صار لـ{id}؟!',
        N(
          't',
          'oops',
          'Spaghetti from layer {layer}. Try {try}?',
          'صار سباغيتي من الطبقة {layer}. نعيده للمرة {try}؟',
          N('g', 'judge', 'Give it here. | *crunch*', 'هاتها. | *قرمش*'),
          N('g', 'busy', 'Restarting. Again.', 'نعيد… مرة ثانية.'),
        ),
        N(
          't',
          'shout',
          'It was like that when I got here!',
          'والله كذا لقيته!',
          N(
            'g',
            'peer',
            'You were standing right next to it.',
            'وإنتي كنتي واقفة جنبه!',
          ),
        ),
      ),
      N(
        't',
        'oops',
        'Um. {id} is… abstract now.',
        'امم. {id} صار… فن تجريدي.',
        N(
          'g',
          'judge',
          'Abstract is a strong word for “ruined”.',
          '"تجريدي" هذي كلمة حلوة لـ"خربان".',
        ),
        N('g', 'approve', 'Snack time.', 'الغدا جاهز.'),
      ),
    ],
  },
};

function crewReaction(type, vars = {}) {
  const r = CREW_REACT[type];
  if (!r) return [];
  if (r.tree) return crewWalk(r.tree, vars.__v ? vars : crewVars(vars));
  if (vars.scene === 'run' || vars.scene === 'runTogether') return [];
  let tl = chance(0.8) ? crewPick(r.t) : null;
  let gl = chance(0.75) ? crewPick(r.g) : null;
  if (vars.scene === 'runTogether') {
    tl = crewPick([
      ['shout', 'Wait wait, I’ll help push!', 'استنى استنى، بساعدك!'],
      ['shout', 'Teamwork! Mostly his work!', 'شغل فريق! بس أغلبه عليه هو!'],
    ]);
  }
  if (vars.scene === 'run') gl = null;
  if (!tl && !gl) tl = crewPick(r.t);
  const out = [];
  if (tl) out.push(['t', ...tl]);
  if (gl) out.push(['g', ...gl]);
  if (chance(0.5)) out.reverse();
  if (out.length === 1 && chance(0.45)) {
    const o = out[0][0] === 't' ? 'g' : 't';
    out.push([o, ...crewPick(CREW_BACK[o])]);
  } else if (out.length === 2 && chance(0.25)) {
    const o = out[1][0] === 't' ? 'g' : 't';
    out.push([o, ...crewPick(CREW_BACK[o])]);
  }
  return out;
}

const crew = (type, data = {}) => {
  if (type === 'cart' && !data.scene) {
    data.scene = chance(0.55) ? 'run' : 'runTogether';
  }
  if (type === 'cart' && !data.from) {
    data.from =
      window.__crewPtr && Date.now() - window.__crewPtr.t < 1500
        ? window.__crewPtr
        : null;
  }
  window.dispatchEvent(new CustomEvent('bara-crew', {detail: {type, ...data}}));
};

let crewX = 0;

const crewQueue = (q, seq) => {
  const x = ++crewX;
  seq.forEach((l, n) =>
    q.push({
      w: l[0],
      mood: l[1],
      en: l[2],
      ar: l[3],
      cont: !!l[4],
      first: n === 0,
      x,
    }),
  );
};

function useCrewThread(
  enabled = true,
  ambient = true,
  cap = 4,
  ignoreAway = false,
) {
  const [thread, setThread] = React.useState([]);
  const q = React.useRef([]);
  React.useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let t;
    let idle = 0;
    const step = () => {
      if (!alive) return;
      if (!ignoreAway && Date.now() < (window.__crewAway || 0)) {
        t = setTimeout(step, 600);
        return;
      }
      let next = q.current.shift();
      if (next && crewMuted() && !next.free) next = crewMuffle(next);
      if (!next) {
        idle++;
        if (idle * 1200 > 6500) setThread([]);
        if (
          ambient &&
          idle > 3 + Math.random() * 4 &&
          !(crewMuted() && chance(0.7))
        ) {
          idle = 0;
          crewQueue(q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT))));
        }
        t = setTimeout(step, 1200);
        return;
      }
      idle = 0;
      setThread((th) =>
        (next.first ? [] : th)
          .concat({...next, k: Date.now() + Math.random()})
          .slice(-cap),
      );
      const after = q.current[0];
      const len = (next.en || '').length;
      const d = !after
        ? 1200
        : after.cont
          ? 650 + len * 18
          : 1300 + len * 32 + Math.random() * 500;
      t = setTimeout(step, Math.min(4200, d));
    };
    t = setTimeout(step, 900);
    const on = (e) => {
      const d = e.detail;
      const seq = crewReaction(d.type, d);
      if (seq.length && ambient) {
        q.current = [];
        const v = {};
        if (d.id) v.id = d.id;
        if (d.n != null) v.n = d.n;
        crewQueue(q.current, crewFill(seq, v));
        if (d.type === 'mute' && q.current[0]) {
          q.current[0].free = true;
          idle = 99;
          clearTimeout(t);
          t = setTimeout(step, 50);
        }
        if (d.type === 'unmute') {
          clearTimeout(t);
          t = setTimeout(step, 300);
        }
      }
    };
    window.addEventListener('bara-crew', on);
    if (ambient) crewQueue(q.current, crewFill(crewWalk(CREW_AMBIENT[0])));
    return () => {
      alive = false;
      clearTimeout(t);
      window.removeEventListener('bara-crew', on);
    };
  }, [enabled]);
  const say = (seq, vars = {}) => {
    q.current = [];
    crewQueue(q.current, crewFill(seq, vars));
  };
  const last = (who) => {
    for (let n = thread.length - 1; n >= 0; n--) {
      if (thread[n].w === who) return thread[n];
    }
    return null;
  };
  return {thread, say, last, q};
}

const crewTone = (l) =>
  l.w === 'g'
    ? l.mood === 'shout'
      ? 'shout'
      : 'judge'
    : l.mood === 'shout'
      ? 'shout'
      : l.mood === 'oops'
        ? 'say'
        : 'cheer';

function CrewThread({thread, maxWidth = 260, full, lay}) {
  const i = useLangIdx();
  const L = lay || {g: {end: false, off: '0px'}, t: {end: true, off: '0px'}};
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: full ? '100%' : 'min(340px, calc(100vw - 32px))',
      }}
    >
      {thread.map((l, n) => {
        const prev = thread[n - 1];
        const nxt = thread[n + 1];
        const runStart = !prev || prev.w !== l.w;
        const runEnd = !nxt || nxt.w !== l.w;
        const g = l.w === 'g';
        const old = n < thread.length - 2;
        const s = L[l.w];
        return (
          <div
            key={l.k}
            style={{
              alignSelf: s.end ? 'flex-end' : 'flex-start',
              [s.end ? 'marginInlineEnd' : 'marginInlineStart']:
                'max(0px, calc(' + s.off + ' - 29px))',
              marginTop: runStart && n ? 4 : 0,
              opacity: old ? 0.55 : 1,
              transform: old ? 'scale(.96)' : 'none',
              transformOrigin: (s.end ? 'right' : 'left') + ' bottom',
              transition: 'opacity .3s, transform .3s',
              animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards',
            }}
          >
            <B.SpeechBubble
              tone={crewTone(l)}
              who={
                runStart
                  ? g
                    ? i
                      ? 'وحش اللخبطة'
                      : 'Goblin'
                    : i
                      ? 'طبعة'
                      : 'Tab’a'
                  : undefined
              }
              tail={runEnd ? (s.end ? 'bottom-end' : 'bottom-start') : 'none'}
              style={{maxWidth, animation: 'none'}}
            >
              {i ? l.ar : l.en}
            </B.SpeechBubble>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, {crew, useCrewThread, CrewThread});

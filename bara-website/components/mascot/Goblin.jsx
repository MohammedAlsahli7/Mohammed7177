import React from 'react';

import {GB_CSS} from './goblinStyles.js';

export function Goblin({
  mood = 'judge',
  size = 160,
  color = 'var(--mat-loop)',
  animate = true,
  track = false,
  ignoreReducedMotion = false,
  taped = false,
  style,
}) {
  const ink = 'var(--graphite-900)';
  const A = (a) => (animate ? a : 'none');
  const ref = React.useRef(null);
  const uid = 'gb' + React.useId().replace(/[^a-z0-9]/gi, '');
  const [look, setLook] = React.useState({x: 0, y: 0});
  React.useEffect(() => {
    if (!track) return;
    const mv = (e) => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      const k = Math.min(1, d / 260);
      setLook({x: (dx / d) * k, y: (dy / d) * k});
    };
    window.addEventListener('pointermove', mv);
    return () => window.removeEventListener('pointermove', mv);
  }, [track]);

  const walking = mood === 'walk' || mood === 'push';
  const side =
    mood === 'judge'
      ? {x: 5, y: 1}
      : mood === 'push'
        ? {x: 6, y: 0}
        : mood === 'peer'
          ? {x: 0, y: 3}
          : {x: 0, y: 0};
  const px = track && !walking ? look.x * 5 : side.x;
  const py = track && !walking ? look.y * 4 : side.y;
  const sw = 5;
  const wrapAnim = {
    shout: 'gb-shake .45s linear infinite',
    busy: 'gb-run .5s ease-in-out infinite',
    approve: 'gb-nod 1.4s ease-in-out infinite',
    judge: 'gb-breathe 3.2s ease-in-out infinite',
    sleep: 'gb-breathe 3.6s ease-in-out infinite',
    hips: 'gb-sway 2.4s ease-in-out infinite',
    peer: 'gb-peer 3.4s ease-in-out infinite',
    walk: 'gb-walk .9s linear infinite',
    push: 'gb-push .9s linear infinite',
  }[mood];
  const soft = ['judge', 'sleep', 'hips', 'peer', 'approve'].includes(mood);
  const shade = 'url(#' + uid + 's)';

  const eye = (cx, n) => {
    if (mood === 'sleep') {
      return (
        <path
          d={'M' + (cx - 11) + ' 102 Q ' + cx + ' 110 ' + (cx + 11) + ' 102'}
          fill="none"
          stroke={ink}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      );
    }
    const ry =
      mood === 'shout'
        ? 15
        : mood === 'judge'
          ? 10
          : mood === 'peer'
            ? n
              ? 17
              : 6
            : mood === 'hips'
              ? 11
              : 13;
    const rx = mood === 'peer' && n ? 16 : 14;
    return (
      <g
        className="gb-soft"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: A('gb-blink 5s infinite'),
        }}
      >
        <ellipse
          cx={cx}
          cy="100"
          rx={rx}
          ry={ry}
          fill={'url(#' + uid + 'e)'}
          stroke={ink}
          strokeWidth="4"
        />
        {ry > 7 && (
          <>
            <circle
              cx={cx + px}
              cy={100 + py}
              r={mood === 'shout' ? 4.5 : mood === 'peer' ? 7.5 : 6}
              fill={ink}
            />
            <circle cx={cx + px - 2.5} cy={97 + py} r="2" fill="#fff" />
          </>
        )}
      </g>
    );
  };

  const brows = {
    judge: (
      <>
        <g
          style={{
            transformBox: 'fill-box',
            animation: A('gb-brow 3.2s ease-in-out infinite'),
          }}
        >
          <path
            d="M66 80 Q 80 70 94 78"
            fill="none"
            stroke={ink}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M106 88 L 134 84"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    shout: (
      <>
        <path
          d="M66 78 L 94 88"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M134 78 L 106 88"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    busy: (
      <>
        <path
          d="M66 84 L 94 82"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M106 82 L 134 84"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    walk: (
      <>
        <path
          d="M66 84 L 94 82"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M106 82 L 134 84"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    push: (
      <>
        <path
          d="M66 80 L 94 88"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M134 80 L 106 88"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    approve: (
      <>
        <path
          d="M66 82 Q 80 76 94 82"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M106 86 L 134 84"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    hips: (
      <>
        <path
          d="M66 84 Q 80 78 94 84"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M106 84 Q 120 78 134 84"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    peer: (
      <>
        <path
          d="M68 92 L 94 92"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M104 76 Q 120 66 136 76"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </>
    ),
    sleep: null,
  }[mood];

  const mouth = {
    judge: (
      <path
        d="M86 128 Q 104 124 118 132"
        fill="none"
        stroke={ink}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ),
    shout: (
      <g>
        <path
          d="M78 120 Q 100 112 122 120 Q 124 150 100 152 Q 76 150 78 120 Z"
          fill="var(--graphite-800)"
          stroke={ink}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M86 143 Q 100 134 114 143 Q 100 152 86 143 Z"
          fill="var(--mat-pla)"
        />
        <path
          d="M86 121 l5 8 l5 -9"
          fill="#fff"
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    ),
    busy: (
      <g>
        <rect
          x="84"
          y="124"
          width="32"
          height="12"
          rx="5"
          fill="#fff"
          stroke={ink}
          strokeWidth="4"
        />
        <path d="M95 124 v12 M105 124 v12" stroke={ink} strokeWidth="2.5" />
      </g>
    ),
    push: (
      <g>
        <rect
          x="84"
          y="124"
          width="32"
          height="12"
          rx="5"
          fill="#fff"
          stroke={ink}
          strokeWidth="4"
        />
        <path d="M95 124 v12 M105 124 v12" stroke={ink} strokeWidth="2.5" />
      </g>
    ),
    walk: (
      <path
        d="M88 130 Q 100 126 114 130"
        fill="none"
        stroke={ink}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ),
    approve: (
      <g>
        <path
          d="M84 126 Q 102 138 120 124"
          fill="none"
          stroke={ink}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M110 130 l3 7 l4 -8"
          fill="#fff"
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    ),
    hips: (
      <path
        d="M84 128 Q 104 136 120 124"
        fill="none"
        stroke={ink}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ),
    peer: <ellipse cx="100" cy="132" rx="5" ry="4" fill={ink} />,
    sleep: (
      <path
        d="M94 130 q 6 4 12 0"
        fill="none"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
  }[mood];

  const limb = (d, key, anim, origin) => (
    <g
      key={key}
      style={
        anim
          ? {
              transformBox: 'view-box',
              transformOrigin: origin,
              animation: A(anim),
            }
          : null
      }
    >
      <path
        d={d}
        fill="none"
        stroke={ink}
        strokeWidth="19"
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke="rgba(0,0,0,.18)"
        strokeWidth="4"
        strokeLinecap="round"
        transform="translate(1.5,3)"
      />
    </g>
  );
  const arms = {
    judge: [
      limb('M58 140 C 80 150, 110 150, 132 136', 'a'),
      limb('M142 140 C 120 152, 90 152, 70 138', 'b'),
    ],
    shout: [
      limb('M54 128 C 36 112, 34 92, 26 76', 'a'),
      limb('M146 128 C 164 112, 166 92, 174 76', 'b'),
    ],
    busy: [
      limb('M54 132 C 40 140, 34 150, 30 158', 'a'),
      limb('M146 128 C 160 120, 166 112, 168 102', 'b'),
    ],
    approve: [
      limb('M54 134 C 42 144, 40 152, 40 160', 'a'),
      limb('M146 130 C 162 122, 170 112, 172 100', 'b'),
    ],
    sleep: [
      limb('M60 142 C 72 154, 90 158, 100 156', 'a'),
      limb('M140 142 C 128 154, 110 158, 100 156', 'b'),
    ],
    hips: [
      limb('M54 120 C 26 120, 26 148, 52 150', 'a'),
      limb('M146 120 C 174 120, 174 148, 148 150', 'b'),
    ],
    peer: [
      limb('M54 132 C 42 144, 42 154, 46 162', 'a'),
      limb('M148 138 C 150 152, 130 156, 116 142', 'b'),
    ],
    walk: [
      limb(
        'M54 128 C 46 140, 44 152, 46 162',
        'a',
        'gb-swing .9s ease-in-out infinite',
        '54px 128px',
      ),
      limb(
        'M146 128 C 154 140, 156 152, 154 162',
        'b',
        'gb-swing .9s ease-in-out -.45s infinite',
        '146px 128px',
      ),
    ],
    push: [
      limb('M142 124 C 160 124, 176 120, 194 116', 'a'),
      limb('M58 132 C 90 150, 150 140, 194 128', 'b'),
    ],
  }[mood];
  const armsFront = ['judge', 'sleep', 'peer', 'push'].includes(mood);

  const foot = (cx, n) => (
    <g
      key={cx}
      style={
        walking
          ? {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: A(
                'gb-step .9s ease-in-out ' + (n ? '-.45s' : '0s') + ' infinite',
              ),
            }
          : null
      }
    >
      <ellipse
        cx={cx}
        cy="182"
        rx="16"
        ry="9"
        fill={color}
        stroke={ink}
        strokeWidth={sw}
      />
      <ellipse cx={cx} cy="182" rx="16" ry="9" fill={shade} />
    </g>
  );

  return (
    <div
      ref={ref}
      className={ignoreReducedMotion ? 'gb-root-full' : 'gb-root'}
      role="img"
      aria-label={'Mess Goblin — ' + mood}
      style={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
    >
      <style>{GB_CSS}</style>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{display: 'block', overflow: 'visible'}}
      >
        <defs>
          <radialGradient id={uid + 's'} cx="36%" cy="28%" r="78%">
            <stop offset="0" stopColor="#fff" stopOpacity=".42" />
            <stop offset=".38" stopColor="#fff" stopOpacity="0" />
            <stop offset=".72" stopColor="#000" stopOpacity=".08" />
            <stop offset="1" stopColor="#000" stopOpacity=".34" />
          </radialGradient>
          <radialGradient id={uid + 'e'} cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#fff" />
            <stop offset=".7" stopColor="#F3EFE6" />
            <stop offset="1" stopColor="#CFC8B8" />
          </radialGradient>
          <linearGradient id={uid + 'a'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".3" />
            <stop offset=".5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".25" />
          </linearGradient>
          <radialGradient id={uid + 'g'} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#16161a" stopOpacity=".28" />
            <stop offset="1" stopColor="#16161a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="190" rx="70" ry="9" fill={'url(#' + uid + 'g)'} />
        <g
          style={{
            transformBox: 'view-box',
            transformOrigin: '100px 190px',
            transform:
              track && !walking ? 'rotate(' + look.x * 3 + 'deg)' : 'none',
            transition: 'transform 200ms ease-out',
          }}
        >
          <g
            className={soft ? 'gb-soft' : undefined}
            style={{
              transformBox: 'view-box',
              transformOrigin: '100px 190px',
              animation: A(wrapAnim),
            }}
          >
            {foot(78, 0)}
            {foot(122, 1)}
            <path
              d="M60 94 L 10 62 L 54 122 Z"
              fill={color}
              stroke={ink}
              strokeWidth={sw}
              strokeLinejoin="round"
            />
            <path
              d="M140 94 L 190 62 L 146 122 Z"
              fill={color}
              stroke={ink}
              strokeWidth={sw}
              strokeLinejoin="round"
            />
            <path d="M60 94 L 10 62 L 54 122 Z" fill={shade} />
            <path d="M140 94 L 190 62 L 146 122 Z" fill={shade} />
            <path
              d="M52 96 L 26 76 L 50 110 Z"
              fill="var(--mat-pla)"
              opacity=".55"
            />
            <path
              d="M148 96 L 174 76 L 150 110 Z"
              fill="var(--mat-pla)"
              opacity=".55"
            />
            {!armsFront && arms}
            <path
              d="M48 140 C 40 96, 62 58, 100 56 C 138 58, 160 96, 152 140 C 148 176, 52 176, 48 140 Z"
              fill={color}
              stroke={ink}
              strokeWidth={sw}
            />
            <path
              d="M48 140 C 40 96, 62 58, 100 56 C 138 58, 160 96, 152 140 C 148 176, 52 176, 48 140 Z"
              fill={shade}
            />
            <ellipse
              cx="74"
              cy="76"
              rx="14"
              ry="8"
              fill="#fff"
              opacity=".35"
              transform="rotate(-28 74 76)"
            />
            <path
              d="M100 56 C 98 44, 108 38, 114 44"
              fill="none"
              stroke={ink}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M70 142 h60 v14 q -30 18 -60 0 z"
              fill="var(--yolk-500)"
              stroke={ink}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M70 142 h60 v14 q -30 18 -60 0 z"
              fill={'url(#' + uid + 'a)'}
            />
            <circle
              cx="100"
              cy="152"
              r="5"
              fill="var(--paper-0)"
              stroke={ink}
              strokeWidth="2.5"
            />
            {eye(80, 0)}
            {eye(120, 1)}
            {brows}
            {!taped && mouth}
            {taped && (
              <g
                aria-hidden
                style={{
                  animation: A('gb-tape .35s cubic-bezier(.3,1.5,.5,1) both'),
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              >
                <rect
                  x="78"
                  y="123"
                  width="48"
                  height="14"
                  rx="2"
                  fill="#F4E7C3"
                  stroke={ink}
                  strokeWidth="3"
                  transform="rotate(-14 102 130)"
                />
                <rect
                  x="80"
                  y="124"
                  width="44"
                  height="12"
                  rx="2"
                  fill="#EFDDAE"
                  stroke={ink}
                  strokeWidth="3"
                  transform="rotate(12 102 130)"
                />
                <path
                  d="M84 128 h36 M86 133 h30"
                  stroke="rgba(22,22,26,.12)"
                  strokeWidth="1.5"
                  transform="rotate(12 102 130)"
                />
              </g>
            )}
            {!taped &&
              !['shout', 'sleep', 'peer', 'busy', 'push'].includes(mood) && (
                <path
                  d="M90 126 l4 7 l4 -7"
                  fill="#fff"
                  stroke={ink}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              )}
            {armsFront && arms}
            {mood === 'busy' && (
              <g>
                <circle
                  cx="168"
                  cy="96"
                  r="16"
                  fill="var(--mat-pla)"
                  stroke={ink}
                  strokeWidth="4"
                />
                <circle cx="168" cy="96" r="16" fill={shade} />
                <circle
                  cx="168"
                  cy="96"
                  r="6"
                  fill="var(--paper-0)"
                  stroke={ink}
                  strokeWidth="3"
                />
              </g>
            )}
            {mood === 'approve' && (
              <g>
                <circle
                  cx="172"
                  cy="96"
                  r="9"
                  fill={color}
                  stroke={ink}
                  strokeWidth="4"
                />
                <path
                  d="M172 87 v-10"
                  stroke={ink}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M172 87 v-10"
                  stroke={color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            )}
            {['shout', 'busy', 'push'].includes(mood) &&
              [0, 1].map((n) => (
                <path
                  key={n}
                  d={
                    n
                      ? 'M150 70 q 6 8 0 12 q -6 -4 0 -12 z'
                      : 'M44 74 q 5 7 0 10 q -5 -3 0 -10 z'
                  }
                  fill="var(--mat-tpu-tint)"
                  stroke="var(--mat-tpu)"
                  strokeWidth="2.5"
                  style={{
                    animation: A(
                      'gb-drop 1s ' + n * 0.5 + 's ease-in infinite',
                    ),
                  }}
                />
              ))}
          </g>
        </g>
        {mood === 'sleep' && (
          <text
            x="150"
            y="60"
            style={{
              font: '800 22px var(--font-mono)',
              fill: 'var(--graphite-700)',
            }}
          >
            z
          </text>
        )}
      </svg>
    </div>
  );
}

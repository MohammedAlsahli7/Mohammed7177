import React from 'react';
export function Wordmark({
  lang = 'both',
  size = 40,
  color = 'var(--graphite-900)',
  tagline,
  style,
}) {
  const en = (
    <span
      style={{
        font: '800 ' + size + 'px/0.9 var(--font-display)',
        letterSpacing: '-.03em',
      }}
    >
      Bara'
    </span>
  );
  const ar = (
    <span
      lang="ar"
      dir="rtl"
      style={{font: '800 ' + size * 0.92 + 'px/1 var(--font-arabic)'}}
    >
      برأ
    </span>
  );
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: size * 0.12,
        color,
        ...style,
      }}
    >
      <span
        style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.3}}
      >
        {lang !== 'ar' && en}
        {lang === 'both' && (
          <span
            aria-hidden
            style={{
              width: Math.max(2, size * 0.06),
              height: size * 0.8,
              background: 'var(--yolk-500)',
              borderRadius: 2,
            }}
          />
        )}
        {lang !== 'en' && ar}
      </span>
      {tagline && (
        <span
          style={{
            font: '600 ' + Math.max(10, size * 0.22) + 'px/1 var(--font-mono)',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            opacity: 0.75,
          }}
        >
          {tagline}
        </span>
      )}
    </span>
  );
}

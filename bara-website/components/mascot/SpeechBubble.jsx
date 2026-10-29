import React from 'react';

const SB_TONES = {
  say: { bg: 'var(--paper-0)', fg: 'var(--graphite-900)', font: '700 15px/1.3 var(--font-body)' },
  shout: { bg: 'var(--yolk-500)', fg: 'var(--graphite-900)', font: '800 17px/1.2 var(--font-display)' },
  cheer: { bg: 'var(--mat-pla)', fg: '#fff', font: '800 16px/1.25 var(--font-display)' },
  judge: { bg: 'var(--graphite-900)', fg: 'var(--paper-0)', font: '600 15px/1.35 var(--font-body)' },
};

export function SpeechBubble({ tone = 'say', tail = 'bottom-start', who, children, style }) {
  const t = SB_TONES[tone] || SB_TONES.say;
  const [v, h] = tail.split('-');
  const tailPos = { [v === 'top' ? 'bottom' : 'top']: '100%', [h === 'end' ? 'insetInlineEnd' : 'insetInlineStart']: 22 };
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: 3, maxWidth: 300, padding: '10px 14px 9px', borderRadius: 16, background: t.bg, color: t.fg, border: '2px solid var(--graphite-900)', boxShadow: tone === 'shout' ? '3px 3px 0 var(--graphite-900)' : 'none', transform: tone === 'shout' ? 'rotate(-1.5deg)' : 'none', ...style }}>
      {who && <span style={{ font: '700 10px/1 var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase', opacity: .7 }}>{who}</span>}
      <span style={{ font: t.font }}>{children}</span>
      {tail !== 'none' && <span aria-hidden style={{ position: 'absolute', ...tailPos, width: 14, height: 12, background: t.bg, borderInline: '2px solid var(--graphite-900)', [v === 'top' ? 'borderTop' : 'borderBottom']: '2px solid var(--graphite-900)', clipPath: v === 'top' ? 'polygon(0 100%,100% 100%,30% 0)' : 'polygon(0 0,100% 0,30% 100%)', marginTop: v === 'top' ? 0 : -2, marginBottom: v === 'top' ? -2 : 0 }} />}
    </div>
  );
}

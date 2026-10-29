import React from 'react';
const TONES = {
  neutral: ['var(--paper-2)', 'var(--graphite-800)'], brand: ['var(--yolk-500)', 'var(--graphite-900)'], ink: ['var(--graphite-900)', 'var(--paper-0)'],
  success: ['var(--success-tint)', 'var(--mat-loop-ink)'], warning: ['var(--warning-tint)', 'var(--yolk-800)'], danger: ['var(--danger-tint)', '#9B1C1C'],
  info: ['var(--info-tint)', 'var(--mat-tpu-ink)'], pla: ['var(--mat-pla)', '#FFFFFF'], petg: ['var(--mat-petg)', '#FFFFFF'], tpu: ['var(--mat-tpu)', '#FFFFFF'],
};
export function Badge({ tone = 'neutral', dot, outlined, children, style, ...rest }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '1px 10px 0', borderRadius: 999, background: bg, color: fg,
      border: outlined ? '1.5px solid var(--graphite-900)' : '1.5px solid transparent', font: '700 12.5px/1 var(--font-body)', whiteSpace: 'nowrap', ...style }} {...rest}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: 'currentColor', marginTop: -1 }} />}
      {children}
    </span>
  );
}

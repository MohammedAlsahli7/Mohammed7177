import React from 'react';
const TONES = { paper: ['var(--paper-2)', 'var(--graphite-700)'], yolk: ['var(--yolk-300)', 'var(--graphite-900)'], pla: ['var(--mat-pla-tint)', 'var(--mat-pla-ink)'], petg: ['var(--mat-petg-tint)', 'var(--mat-petg-ink)'], tpu: ['var(--mat-tpu-tint)', 'var(--mat-tpu-ink)'], ink: ['var(--graphite-800)', 'var(--graphite-300)'] };
export function MediaPlaceholder({ label = 'Product photo', ratio = '4 / 3', tone = 'paper', texture = 'layers', src, radius = 14, style }) {
  const [bg, fg] = TONES[tone] || TONES.paper;
  if (src) return <img src={src} alt={label} style={{ display: 'block', width: '100%', aspectRatio: ratio, objectFit: 'cover', borderRadius: radius, background: bg, ...style }} />;
  const tex = texture === 'bed' ? (tone === 'ink' ? 'var(--tex-bed-inverse)' : 'var(--tex-bed)') : 'var(--tex-layers-strong)';
  return (
    <div role="img" aria-label={label} style={{ position: 'relative', width: '100%', aspectRatio: ratio, borderRadius: radius, background: bg, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', ...style }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: tex, opacity: .7 }} />
      <span style={{ position: 'relative', margin: 10, padding: '4px 7px 3px', borderRadius: 6, background: 'rgba(252,250,244,.85)', color: fg === 'var(--graphite-300)' ? 'var(--graphite-800)' : fg, font: '600 10.5px/1.2 var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

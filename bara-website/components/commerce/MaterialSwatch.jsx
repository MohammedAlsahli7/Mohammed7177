import React from 'react';
export const MATERIALS = {
  pla: { key: 'pla', name: 'PLA', ar: 'بي إل إيه', color: 'var(--mat-pla)', tint: 'var(--mat-pla-tint)', ink: 'var(--mat-pla-ink)', blurb: 'Rigid, matte, plant-based. Our default.', temp: '210 °C' },
  petg: { key: 'petg', name: 'PETG', ar: 'بي إي تي جي', color: 'var(--mat-petg)', tint: 'var(--mat-petg-tint)', ink: 'var(--mat-petg-ink)', blurb: 'Tough, glossy, shrugs off heat & water.', temp: '240 °C' },
  tpu: { key: 'tpu', name: 'TPU', ar: 'تي بي يو', color: 'var(--mat-tpu)', tint: 'var(--mat-tpu-tint)', ink: 'var(--mat-tpu-ink)', blurb: 'Flexible & squishy. Bends, bounces back.', temp: '225 °C' },
  loop: { key: 'loop', name: 'Loop', ar: 'لوب', color: 'var(--mat-loop)', tint: 'var(--mat-loop-tint)', ink: 'var(--mat-loop-ink)', blurb: 'Recycled PLA from your failed prints.', temp: '210 °C' },
};
export function MaterialSwatch({ material = 'pla', color, label, selected, size = 40, showLabel, onClick, style }) {
  const m = MATERIALS[material] || {};
  const c = color || m.color;
  return (
    <button type="button" onClick={onClick} aria-pressed={!!selected} aria-label={label || m.name}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: 0, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <span style={{ position: 'relative', width: size, height: size, borderRadius: 999, background: c, border: '2px solid var(--graphite-900)',
        boxShadow: selected ? '0 0 0 3px var(--paper-0), 0 0 0 5px var(--graphite-900)' : '2px 2px 0 var(--graphite-900)', transition: 'box-shadow var(--dur-fast)' }}>
        <span style={{ position: 'absolute', inset: '30%', borderRadius: 999, background: 'var(--paper-0)', border: '2px solid var(--graphite-900)' }} />
      </span>
      {showLabel && <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--fg-1)' }}>{label || m.name}</span>}
    </button>
  );
}

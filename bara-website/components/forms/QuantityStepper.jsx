import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function QuantityStepper({ value, defaultValue = 1, min = 1, max = 99, onChange, size = 'md', style }) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value != null ? value : inner;
  const set = (n) => { n = Math.max(min, Math.min(max, n)); if (value == null) setInner(n); onChange && onChange(n); };
  const d = size === 'sm' ? 32 : 42;
  const btn = (dis) => ({ width: d, height: '100%', border: 0, background: 'transparent', cursor: dis ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: dis ? 'var(--fg-disabled)' : 'var(--graphite-900)' });
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: d + 4, border: '2px solid var(--graphite-900)', borderRadius: 12, background: 'var(--paper-0)', overflow: 'hidden', ...style }}>
      <button type="button" aria-label="Decrease" disabled={v <= min} onClick={() => set(v - 1)} style={btn(v <= min)}><Icon name="minus" size={16} /></button>
      <span style={{ minWidth: 34, textAlign: 'center', font: '700 15px/1 var(--font-mono)', borderLeft: '1.5px solid var(--border-2)', borderRight: '1.5px solid var(--border-2)', height: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{v}</span>
      <button type="button" aria-label="Increase" disabled={v >= max} onClick={() => set(v + 1)} style={btn(v >= max)}><Icon name="plus" size={16} /></button>
    </div>
  );
}

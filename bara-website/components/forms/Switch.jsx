import React from 'react';
export function Switch({ checked, defaultChecked, onChange, label, disabled, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : inner;
  const toggle = () => { if (disabled) return; if (checked == null) setInner(!on); onChange && onChange(!on); };
  return (
    <label onClick={(e) => { e.preventDefault(); toggle(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, ...style }}>
      <span role="switch" aria-checked={on} tabIndex={0} style={{ position: 'relative', width: 46, height: 28, flexShrink: 0, borderRadius: 999, border: '2px solid var(--graphite-900)',
        background: on ? 'var(--yolk-500)' : 'var(--paper-2)', transition: 'background var(--dur-base) var(--ease-out)' }}>
        <span style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: 999, background: on ? 'var(--graphite-900)' : 'var(--paper-0)',
          border: '2px solid var(--graphite-900)', transition: 'left var(--dur-base) var(--ease-spring)' }} />
      </span>
      {label && <span style={{ font: '600 15px/1.3 var(--font-body)', color: 'var(--fg-1)', whiteSpace: 'nowrap' }}>{label}</span>}
    </label>
  );
}

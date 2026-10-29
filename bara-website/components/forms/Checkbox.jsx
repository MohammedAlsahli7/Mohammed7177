import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ checked, defaultChecked, onChange, label, description, disabled, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : inner;
  const toggle = () => { if (disabled) return; if (checked == null) setInner(!on); onChange && onChange(!on); };
  return (
    <label onClick={(e) => { e.preventDefault(); toggle(); }} style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, ...style }}>
      <span role="checkbox" aria-checked={on} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggle(); } }}
        style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 7, border: '2px solid var(--graphite-900)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: on ? 'var(--yolk-500)' : 'var(--paper-0)', boxShadow: on ? '2px 2px 0 var(--graphite-900)' : 'none', transition: 'background var(--dur-fast), box-shadow var(--dur-fast)' }}>
        {on && <Icon name="check" size={15} color="var(--graphite-900)" />}
      </span>
      {(label || description) && <span style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 1 }}>
        {label && <span style={{ font: '600 15px/1.3 var(--font-body)', color: 'var(--fg-1)' }}>{label}</span>}
        {description && <span style={{ font: '400 13px/1.35 var(--font-body)', color: 'var(--fg-3)' }}>{description}</span>}
      </span>}
    </label>
  );
}

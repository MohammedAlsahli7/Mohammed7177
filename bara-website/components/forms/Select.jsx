import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Field } from './Field.jsx';
export function Select({ label, hint, error, options = [], size = 'md', disabled, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const fid = id || (label ? 'sel-' + String(label).replace(/\W+/g, '-').toLowerCase() : undefined);
  return (
    <Field label={label} hint={hint} error={error} htmlFor={fid} style={style}>
      <div style={{ position: 'relative' }}>
        <select id={fid} disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', height: h, padding: '2px 40px 0 14px', borderRadius: 12, cursor: 'pointer',
            background: disabled ? 'var(--paper-2)' : 'var(--paper-0)', color: 'var(--fg-1)', font: '500 16px/1 var(--font-body)', outline: 0,
            border: '2px solid ' + (error ? 'var(--danger)' : focus ? 'var(--graphite-900)' : 'var(--border-2)'),
            boxShadow: focus && !error ? '3px 3px 0 var(--yolk-500)' : 'none' }} {...rest}>
          {options.map((o) => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="chevron-down" size={18} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    </Field>
  );
}

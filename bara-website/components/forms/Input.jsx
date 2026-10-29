import React from 'react';
import {Icon} from '../core/Icon.jsx';
import {Field} from './Field.jsx';
export function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  size = 'md',
  disabled,
  id,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const fid =
    id ||
    (label
      ? 'in-' + String(label).replace(/\W+/g, '-').toLowerCase()
      : undefined);
  return (
    <Field label={label} hint={hint} error={error} htmlFor={fid} style={style}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: h,
          padding: '0 14px',
          borderRadius: 12,
          background: disabled ? 'var(--paper-2)' : 'var(--paper-0)',
          border:
            '2px solid ' +
            (error
              ? 'var(--danger)'
              : focus
                ? 'var(--graphite-900)'
                : 'var(--border-2)'),
          boxShadow: focus && !error ? '3px 3px 0 var(--yolk-500)' : 'none',
          transition:
            'box-shadow var(--dur-fast), border-color var(--dur-fast)',
        }}
      >
        {icon && <Icon name={icon} size={18} color="var(--fg-3)" />}
        <input
          id={fid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            width: '100%',
            border: 0,
            outline: 0,
            background: 'transparent',
            font:
              '500 ' + (size === 'lg' ? 18 : 16) + 'px/1.2 var(--font-body)',
            color: disabled ? 'var(--fg-disabled)' : 'var(--fg-1)',
            paddingTop: 2,
            ...inputStyle,
          }}
          {...rest}
        />
        {suffix && (
          <span
            style={{
              font: '500 12px/1 var(--font-mono)',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </Field>
  );
}

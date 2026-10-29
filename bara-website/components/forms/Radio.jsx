import React from 'react';
export function Radio({
  checked,
  onChange,
  label,
  description,
  disabled,
  name,
  value,
  style,
}) {
  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        if (!disabled && onChange) onChange(value);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span
        role="radio"
        aria-checked={!!checked}
        tabIndex={0}
        data-name={name}
        style={{
          width: 22,
          height: 22,
          flexShrink: 0,
          borderRadius: 999,
          border: '2px solid var(--graphite-900)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: checked ? 'var(--yolk-500)' : 'var(--paper-0)',
          transition: 'background var(--dur-fast)',
        }}
      >
        {checked && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'var(--graphite-900)',
            }}
          />
        )}
      </span>
      {(label || description) && (
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            paddingTop: 1,
          }}
        >
          {label && (
            <span
              style={{
                font: '600 15px/1.3 var(--font-body)',
                color: 'var(--fg-1)',
              }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              style={{
                font: '400 13px/1.35 var(--font-body)',
                color: 'var(--fg-3)',
              }}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

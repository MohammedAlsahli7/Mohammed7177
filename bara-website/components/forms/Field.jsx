import React from 'react';
export function Field({label, hint, error, htmlFor, children, style}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 0,
        ...style,
      }}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          style={{font: '700 14px/1.2 var(--font-body)', color: 'var(--fg-1)'}}
        >
          {label}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span
          style={{
            font: (error ? '600 ' : '400 ') + '13px/1.35 var(--font-body)',
            color: error ? 'var(--danger)' : 'var(--fg-3)',
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}

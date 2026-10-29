import React from 'react';
import {Icon} from './Icon.jsx';
const MAT = {
  pla: ['var(--mat-pla)', 'var(--mat-pla-tint)'],
  petg: ['var(--mat-petg)', 'var(--mat-petg-tint)'],
  tpu: ['var(--mat-tpu)', 'var(--mat-tpu-tint)'],
  loop: ['var(--mat-loop)', 'var(--mat-loop-tint)'],
};
export function Tag({
  material,
  selected,
  onRemove,
  onClick,
  children,
  style,
  ...rest
}) {
  const m = material && MAT[material];
  const bg = selected ? 'var(--graphite-900)' : m ? m[1] : 'var(--paper-0)';
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 28,
        padding: '0 10px',
        borderRadius: 8,
        background: bg,
        color: selected ? 'var(--paper-0)' : 'var(--graphite-900)',
        border: '1.5px solid var(--graphite-900)',
        font: '600 12px/1 var(--font-mono)',
        letterSpacing: '.02em',
        textTransform: 'uppercase',
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {m && (
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: m[0],
            border:
              '1.5px solid ' +
              (selected ? 'var(--paper-0)' : 'var(--graphite-900)'),
          }}
        />
      )}
      {children}
      {onRemove && (
        <span
          role="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            display: 'inline-flex',
            cursor: 'pointer',
            marginRight: -4,
            opacity: 0.7,
          }}
        >
          <Icon name="x" size={14} />
        </span>
      )}
    </span>
  );
}

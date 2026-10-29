import React from 'react';
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'pill',
  style,
}) {
  const [inner, setInner] = React.useState(
    defaultValue != null ? defaultValue : items[0] && items[0].id,
  );
  const cur = value != null ? value : inner;
  const pick = (id) => {
    if (value == null) setInner(id);
    onChange && onChange(id);
  };
  const count = (it, active) =>
    it.count != null && (
      <span
        style={{
          font: '700 11px/1 var(--font-mono)',
          padding: '3px 6px',
          borderRadius: 6,
          background: active ? 'var(--graphite-900)' : 'var(--paper-2)',
          color: active ? 'var(--paper-0)' : 'var(--fg-2)',
        }}
      >
        {it.count}
      </span>
    );
  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 24,
          borderBottom: '2px solid var(--border-1)',
          ...style,
        }}
      >
        {items.map((it) => {
          const a = it.id === cur;
          return (
            <button
              key={it.id}
              role="tab"
              aria-selected={a}
              onClick={() => pick(it.id)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 0 12px',
                marginBottom: -2,
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                font: '700 16px/1 var(--font-body)',
                whiteSpace: 'nowrap',
                color: a ? 'var(--fg-1)' : 'var(--fg-3)',
                borderBottom:
                  '4px solid ' + (a ? 'var(--yolk-500)' : 'transparent'),
              }}
            >
              {it.label}
              {count(it, a)}
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        borderRadius: 14,
        border: '2px solid var(--graphite-900)',
        background: 'var(--paper-0)',
        ...style,
      }}
    >
      {items.map((it) => {
        const a = it.id === cur;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={a}
            onClick={() => pick(it.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 36,
              padding: '2px 16px 0',
              borderRadius: 10,
              cursor: 'pointer',
              font: '700 15px/1 var(--font-body)',
              whiteSpace: 'nowrap',
              border:
                '2px solid ' + (a ? 'var(--graphite-900)' : 'transparent'),
              background: a ? 'var(--yolk-500)' : 'transparent',
              color: a ? 'var(--graphite-900)' : 'var(--fg-2)',
              transition: 'background var(--dur-fast)',
            }}
          >
            {it.label}
            {count(it, a)}
          </button>
        );
      })}
    </div>
  );
}

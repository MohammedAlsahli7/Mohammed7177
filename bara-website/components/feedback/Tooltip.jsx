import React from 'react';
export function Tooltip({ label, placement = 'top', open, children, style }) {
  const [hover, setHover] = React.useState(false);
  const show = open != null ? open : hover;
  const top = placement === 'top';
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {children}
      <span role="tooltip" style={{ position: 'absolute', left: '50%', [top ? 'bottom' : 'top']: 'calc(100% + 10px)', transform: 'translateX(-50%) translateY(' + (show ? 0 : top ? 4 : -4) + 'px)',
        opacity: show ? 1 : 0, pointerEvents: 'none', transition: 'opacity var(--dur-fast), transform var(--dur-base) var(--ease-spring)', zIndex: 50,
        background: 'var(--graphite-900)', color: 'var(--paper-0)', padding: '7px 10px 6px', borderRadius: 8, font: '600 13px/1.2 var(--font-body)', whiteSpace: 'nowrap' }}>
        {label}
        <span style={{ position: 'absolute', left: '50%', [top ? 'top' : 'bottom']: '100%', marginLeft: -6, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', [top ? 'borderTop' : 'borderBottom']: '6px solid var(--graphite-900)' }} />
      </span>
    </span>
  );
}

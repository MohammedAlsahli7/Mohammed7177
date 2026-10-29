import React from 'react';
const V = {
  flat: { bg: 'var(--paper-0)', border: '2px solid var(--border-1)', sh: null },
  outlined: { bg: 'var(--paper-0)', border: '2px solid var(--graphite-900)', sh: null },
  raised: { bg: 'var(--paper-0)', border: '2px solid var(--graphite-900)', sh: 'var(--graphite-900)' },
  brand: { bg: 'var(--yolk-500)', border: '2px solid var(--graphite-900)', sh: 'var(--graphite-900)' },
  inverse: { bg: 'var(--graphite-900)', border: '2px solid var(--graphite-900)', sh: 'var(--yolk-500)', fg: 'var(--paper-0)' },
};
export function Card({ variant = 'raised', padding = 20, interactive, texture, onClick, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const v = V[variant] || V.raised;
  const lift = interactive && hover;
  const off = v.sh ? (lift ? 8 : 5) : 0;
  const tex = texture === 'layers' ? 'var(--tex-layers)' : texture === 'bed' ? (variant === 'inverse' ? 'var(--tex-bed-inverse)' : 'var(--tex-bed)') : null;
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', background: v.bg, color: v.fg || 'var(--fg-1)', border: v.border, borderRadius: 18, padding,
        boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none', transform: lift ? 'translate(-3px,-3px)' : 'none', cursor: interactive || onClick ? 'pointer' : undefined,
        transition: 'transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring)', ...style }} {...rest}>
      {tex && <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 16, background: tex, pointerEvents: 'none' }} />}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

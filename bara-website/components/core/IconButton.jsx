import React from 'react';
import { Icon } from './Icon.jsx';
const SIZES = { sm: { d: 34, ic: 16, r: 10 }, md: { d: 44, ic: 20, r: 12 }, lg: { d: 56, ic: 24, r: 14 } };
const VARIANTS = {
  primary: { bg: 'var(--yolk-500)', hover: 'var(--yolk-300)', fg: 'var(--graphite-900)', border: 'var(--graphite-900)', sh: 'var(--graphite-900)' },
  secondary: { bg: 'var(--paper-0)', hover: '#FFFFFF', fg: 'var(--graphite-900)', border: 'var(--graphite-900)', sh: 'var(--graphite-900)' },
  ink: { bg: 'var(--graphite-900)', hover: 'var(--graphite-800)', fg: 'var(--paper-0)', border: 'var(--graphite-900)', sh: 'var(--yolk-500)' },
  ghost: { bg: 'transparent', hover: 'rgba(22,22,26,.07)', fg: 'var(--graphite-900)', border: 'transparent', sh: null },
};
export function IconButton({ icon, label, variant = 'secondary', size = 'md', round, disabled, badge, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md; const v = VARIANTS[variant] || VARIANTS.secondary;
  const off = v.sh && !disabled ? (press ? 0 : hover ? 3 : 2) : 0;
  const shift = v.sh && !disabled ? (press ? 2 : hover ? -1 : 0) : 0;
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: s.d, height: s.d, padding: 0,
        borderRadius: round ? 999 : s.r, cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? 'var(--paper-2)' : hover ? v.hover : v.bg, color: disabled ? 'var(--fg-disabled)' : v.fg,
        border: '2px solid ' + (disabled ? 'var(--graphite-300)' : v.border),
        boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none', transform: 'translate(' + shift + 'px,' + shift + 'px)',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)', ...style,
      }} {...rest}>
      <Icon name={icon} size={s.ic} />
      {badge != null && <span style={{ position: 'absolute', top: -8, right: -8, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 999, background: 'var(--mat-pla)', color: '#fff', border: '2px solid var(--graphite-900)', font: '700 11px/16px var(--font-mono)', textAlign: 'center' }}>{badge}</span>}
    </button>
  );
}

import React from 'react';
import { Icon } from './Icon.jsx';
const SIZES = { sm: { h: 34, px: 14, fs: 14, ic: 16, r: 10 }, md: { h: 44, px: 20, fs: 16, ic: 18, r: 12 }, lg: { h: 56, px: 28, fs: 19, ic: 22, r: 14 } };
const VARIANTS = {
  primary: { bg: 'var(--yolk-500)', hover: 'var(--yolk-300)', fg: 'var(--graphite-900)', border: 'var(--graphite-900)', sh: 'var(--graphite-900)' },
  secondary: { bg: 'var(--paper-0)', hover: '#FFFFFF', fg: 'var(--graphite-900)', border: 'var(--graphite-900)', sh: 'var(--graphite-900)' },
  ink: { bg: 'var(--graphite-900)', hover: 'var(--graphite-800)', fg: 'var(--paper-0)', border: 'var(--graphite-900)', sh: 'var(--yolk-500)' },
  danger: { bg: 'var(--danger)', hover: '#E04040', fg: '#FFFFFF', border: 'var(--graphite-900)', sh: 'var(--graphite-900)' },
  ghost: { bg: 'transparent', hover: 'rgba(22,22,26,.07)', fg: 'var(--graphite-900)', border: 'transparent', sh: null },
};
export function Button({ variant = 'primary', size = 'md', icon, iconRight, fullWidth, disabled, children, style, type = 'button', ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md; const v = VARIANTS[variant] || VARIANTS.primary;
  const off = v.sh && !disabled ? (press ? 0 : hover ? 4 : 3) : 0;
  const shift = v.sh && !disabled ? (press ? 3 : hover ? -1 : 0) : 0;
  return (
    <button type={type} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined, alignItems: 'center', justifyContent: 'center', gap: 8,
        height: s.h, padding: '0 ' + s.px + 'px', paddingTop: 2, borderRadius: s.r,
        font: '700 ' + s.fs + 'px/1 var(--font-body)', whiteSpace: 'nowrap', cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? 'var(--paper-2)' : hover ? v.hover : v.bg, color: disabled ? 'var(--fg-disabled)' : v.fg,
        border: '2px solid ' + (disabled ? 'var(--graphite-300)' : v.border),
        boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none', transform: 'translate(' + shift + 'px,' + shift + 'px)',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
        ...style,
      }} {...rest}>
      {icon && <Icon name={icon} size={s.ic} style={{ marginTop: -2 }} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.ic} style={{ marginTop: -2 }} />}
    </button>
  );
}

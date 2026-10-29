import React from 'react';
import { Icon } from '../core/Icon.jsx';
const TONES = { neutral: ['var(--paper-0)', 'bell'], success: ['var(--mat-loop)', 'check'], warning: ['var(--yolk-500)', 'triangle-alert'], danger: ['var(--danger)', 'octagon-x'], info: ['var(--mat-tpu)', 'info'] };
export function Toast({ tone = 'neutral', title, message, icon, action, onAction, onClose, style }) {
  const [bg, ic] = TONES[tone] || TONES.neutral;
  const light = tone === 'neutral' || tone === 'warning';
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: 380, maxWidth: '100%', padding: 12, borderRadius: 14, background: 'var(--graphite-900)', color: 'var(--paper-0)', boxShadow: 'var(--shadow-float)', ...style }}>
      <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 10, background: bg, color: light ? 'var(--graphite-900)' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon || ic} size={18} /></span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
        {title && <span style={{ font: '700 15px/1.25 var(--font-body)' }}>{title}</span>}
        {message && <span style={{ font: '400 13.5px/1.4 var(--font-body)', color: 'var(--fg-on-inverse-2)' }}>{message}</span>}
      </div>
      {action && <button type="button" onClick={onAction} style={{ alignSelf: 'center', border: 0, background: 'transparent', color: 'var(--yolk-300)', font: '700 14px/1 var(--font-body)', cursor: 'pointer', padding: '8px 4px' }}>{action}</button>}
      {onClose && <button type="button" aria-label="Dismiss" onClick={onClose} style={{ border: 0, background: 'transparent', color: 'var(--fg-on-inverse-2)', cursor: 'pointer', padding: 4, display: 'inline-flex' }}><Icon name="x" size={16} /></button>}
    </div>
  );
}

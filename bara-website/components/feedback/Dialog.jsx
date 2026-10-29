import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function Dialog({ open = true, onClose, title, eyebrow, children, footer, width = 480, inline, style }) {
  if (!open) return null;
  const panel = (
    <div role="dialog" aria-modal={!inline} onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: width, background: 'var(--paper-0)', border: '2px solid var(--graphite-900)', borderRadius: 18, boxShadow: 'var(--shadow-hard-lg)', overflow: 'hidden', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '20px 20px 0 24px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
          {eyebrow && <span style={{ font: '700 11px/1 var(--font-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{eyebrow}</span>}
          {title && <h3 style={{ margin: 0, font: '800 24px/1.1 var(--font-display)', color: 'var(--fg-1)' }}>{title}</h3>}
        </div>
        {onClose && <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} />}
      </div>
      <div style={{ padding: '12px 24px 24px', font: '400 15px/1.5 var(--font-body)', color: 'var(--fg-2)' }}>{children}</div>
      {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 24px', borderTop: '2px dashed var(--border-2)', background: 'var(--paper-1)' }}>{footer}</div>}
    </div>
  );
  if (inline) return panel;
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>{panel}</div>;
}

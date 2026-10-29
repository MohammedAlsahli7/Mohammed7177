import React from 'react';
import { MediaPlaceholder } from '../surfaces/MediaPlaceholder.jsx';
import { MaterialSwatch, MATERIALS } from './MaterialSwatch.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Badge } from '../core/Badge.jsx';
export function ProductCard({ title, titleAr, price, currency = 'SAR', image, imageTone = 'paper', materials = ['pla'], badge, badgeTone = 'brand', spec, onAdd, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--paper-0)', border: '2px solid var(--graphite-900)', borderRadius: 18, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default',
        boxShadow: (hover ? 8 : 5) + 'px ' + (hover ? 8 : 5) + 'px 0 var(--graphite-900)', transform: hover ? 'translate(-3px,-3px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring)', ...style }}>
      <div style={{ position: 'relative', borderBottom: '2px solid var(--graphite-900)' }}>
        <MediaPlaceholder src={image} label={title} tone={imageTone} ratio="1 / 1" radius={0} />
        {badge && <Badge tone={badgeTone} outlined style={{ position: 'absolute', top: 12, left: 12 }}>{badge}</Badge>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ font: '700 18px/1.15 var(--font-display)', color: 'var(--fg-1)' }}>{title}</span>
          {titleAr && <span dir="rtl" style={{ font: '600 14px/1.2 var(--font-arabic)', color: 'var(--fg-3)' }}>{titleAr}</span>}
        </div>
        {spec && <span style={{ font: '500 11.5px/1.2 var(--font-mono)', color: 'var(--fg-3)', letterSpacing: '.02em' }}>{spec}</span>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ font: '800 22px/1 var(--font-display)', color: 'var(--fg-1)' }}><span style={{ font: '700 12px/1 var(--font-mono)', marginRight: 4, color: 'var(--fg-2)' }}>{currency}</span>{price}</span>
            <span style={{ display: 'inline-flex', gap: 3 }}>{materials.map((k) => <span key={k} title={(MATERIALS[k] || {}).name} style={{ width: 12, height: 12, borderRadius: 999, background: (MATERIALS[k] || {}).color, border: '1.5px solid var(--graphite-900)' }} />)}</span>
          </div>
          {onAdd && <IconButton icon="plus" label="Add to cart" variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onAdd(); }} />}
        </div>
      </div>
    </div>
  );
}

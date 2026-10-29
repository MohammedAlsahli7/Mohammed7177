import React from 'react';
export function Icon({ name, size = 20, color = 'currentColor', label, style, ...rest }) {
  return <i className={'icon-' + name} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}
    style={{ fontSize: size, width: size, height: size, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, fontStyle: 'normal', flexShrink: 0, ...style }} {...rest} />;
}

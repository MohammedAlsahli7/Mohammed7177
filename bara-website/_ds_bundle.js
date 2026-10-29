/* @ds-bundle: {"format":4,"namespace":"InfillDesignSystem_d33a9b","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"MATERIALS","sourcePath":"components/commerce/MaterialSwatch.jsx"},{"name":"MaterialSwatch","sourcePath":"components/commerce/MaterialSwatch.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Goblin","sourcePath":"components/mascot/Goblin.jsx"},{"name":"Mascot","sourcePath":"components/mascot/Mascot.jsx"},{"name":"SpeechBubble","sourcePath":"components/mascot/SpeechBubble.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"MediaPlaceholder","sourcePath":"components/surfaces/MediaPlaceholder.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"ba4086e7ba1b","components/commerce/MaterialSwatch.jsx":"5dbcdaf5eb45","components/commerce/ProductCard.jsx":"e636e6433622","components/core/Badge.jsx":"1e33827cbc20","components/core/Button.jsx":"02bc3e2eda96","components/core/Icon.jsx":"e43f5ddcfaf2","components/core/IconButton.jsx":"34d55ea52ea9","components/core/Tag.jsx":"1c38e7bdfe55","components/feedback/Dialog.jsx":"3dab0a40fb9e","components/feedback/Toast.jsx":"f6a5c74670e8","components/feedback/Tooltip.jsx":"ee273ba675c0","components/forms/Checkbox.jsx":"66d4235d5a6e","components/forms/Field.jsx":"f331ef4afaf2","components/forms/Input.jsx":"b8bc3007912e","components/forms/QuantityStepper.jsx":"f91f38a420e4","components/forms/Radio.jsx":"1804f9b340d9","components/forms/Select.jsx":"c1a758e9d915","components/forms/Switch.jsx":"27829dffd5ae","components/mascot/Goblin.jsx":"8fc3d2c4ff43","components/mascot/Mascot.jsx":"2323e0302ea3","components/mascot/SpeechBubble.jsx":"ff3e893080b2","components/navigation/Tabs.jsx":"79419c8bb659","components/surfaces/Card.jsx":"ffcc463fcdb5","components/surfaces/MediaPlaceholder.jsx":"e2b0804b0a5b","scripts/build.cjs":"73afb1c57e17","scripts/check-data.cjs":"7910b3fcf5ec","site.config.js":"e7ffe1317136","ui_kits/filament-studio/Panels.jsx":"073358e83278","ui_kits/filament-studio/Viewer3D.jsx":"0b655a18a5f5","ui_kits/filament-studio/stock.js":"3350d553992d","ui_kits/kiosk/Kiosk.jsx":"4a1265451f26","ui_kits/packaging/Packaging.jsx":"d91b27ed4282","ui_kits/social/Posts.jsx":"74ac2963b4be","ui_kits/storefront/Browse.jsx":"e7acd4f0e400","ui_kits/storefront/Detail.jsx":"5178a748ecf8","ui_kits/storefront/Shell.jsx":"8aa294cf66d6","ui_kits/website/App.jsx":"88fcb27a01e6","ui_kits/website/Chrome.jsx":"aff9508f011a","ui_kits/website/Crew.jsx":"7630b0d78fdd","ui_kits/website/Home.jsx":"2b693200f049","ui_kits/website/Models3D.jsx":"13538f541631","ui_kits/website/Motion.jsx":"a2ba967a2ced","ui_kits/website/PagesSell.jsx":"7d8eb5be5b57","ui_kits/website/PagesShop.jsx":"bd1f117b3163","ui_kits/website/PagesStudio.jsx":"ca06b0eb90e1","ui_kits/website/copy.js":"8eebcb248bdc","ui_kits/website/data.js":"d23ff5cb8424"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.InfillDesignSystem_d33a9b = window.InfillDesignSystem_d33a9b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function Wordmark({
  lang = 'both',
  size = 40,
  color = 'var(--graphite-900)',
  tagline,
  style
}) {
  const en = /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 ' + size + 'px/0.9 var(--font-display)',
      letterSpacing: '-.03em'
    }
  }, "Bara'");
  const ar = /*#__PURE__*/React.createElement("span", {
    lang: "ar",
    dir: "rtl",
    style: {
      font: '800 ' + size * 0.92 + 'px/1 var(--font-arabic)'
    }
  }, "\u0628\u0631\u0623");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: size * 0.12,
      color,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.3
    }
  }, lang !== 'ar' && en, lang === 'both' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: Math.max(2, size * 0.06),
      height: size * 0.8,
      background: 'var(--yolk-500)',
      borderRadius: 2
    }
  }), lang !== 'en' && ar), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 ' + Math.max(10, size * 0.22) + 'px/1 var(--font-mono)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      opacity: .75
    }
  }, tagline));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/commerce/MaterialSwatch.jsx
try { (() => {
const MATERIALS = {
  pla: {
    key: 'pla',
    name: 'PLA',
    ar: 'بي إل إيه',
    color: 'var(--mat-pla)',
    tint: 'var(--mat-pla-tint)',
    ink: 'var(--mat-pla-ink)',
    blurb: 'Rigid, matte, plant-based. Our default.',
    temp: '210 °C'
  },
  petg: {
    key: 'petg',
    name: 'PETG',
    ar: 'بي إي تي جي',
    color: 'var(--mat-petg)',
    tint: 'var(--mat-petg-tint)',
    ink: 'var(--mat-petg-ink)',
    blurb: 'Tough, glossy, shrugs off heat & water.',
    temp: '240 °C'
  },
  tpu: {
    key: 'tpu',
    name: 'TPU',
    ar: 'تي بي يو',
    color: 'var(--mat-tpu)',
    tint: 'var(--mat-tpu-tint)',
    ink: 'var(--mat-tpu-ink)',
    blurb: 'Flexible & squishy. Bends, bounces back.',
    temp: '225 °C'
  },
  loop: {
    key: 'loop',
    name: 'Loop',
    ar: 'لوب',
    color: 'var(--mat-loop)',
    tint: 'var(--mat-loop-tint)',
    ink: 'var(--mat-loop-ink)',
    blurb: 'Recycled PLA from your failed prints.',
    temp: '210 °C'
  }
};
function MaterialSwatch({
  material = 'pla',
  color,
  label,
  selected,
  size = 40,
  showLabel,
  onClick,
  style
}) {
  const m = MATERIALS[material] || {};
  const c = color || m.color;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": !!selected,
    "aria-label": label || m.name,
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      border: 0,
      background: 'transparent',
      padding: 0,
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      borderRadius: 999,
      background: c,
      border: '2px solid var(--graphite-900)',
      boxShadow: selected ? '0 0 0 3px var(--paper-0), 0 0 0 5px var(--graphite-900)' : '2px 2px 0 var(--graphite-900)',
      transition: 'box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: '30%',
      borderRadius: 999,
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)'
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px/1 var(--font-mono)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: 'var(--fg-1)'
    }
  }, label || m.name));
}
Object.assign(__ds_scope, { MATERIALS, MaterialSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/MaterialSwatch.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: ['var(--paper-2)', 'var(--graphite-800)'],
  brand: ['var(--yolk-500)', 'var(--graphite-900)'],
  ink: ['var(--graphite-900)', 'var(--paper-0)'],
  success: ['var(--success-tint)', 'var(--mat-loop-ink)'],
  warning: ['var(--warning-tint)', 'var(--yolk-800)'],
  danger: ['var(--danger-tint)', '#9B1C1C'],
  info: ['var(--info-tint)', 'var(--mat-tpu-ink)'],
  pla: ['var(--mat-pla)', '#FFFFFF'],
  petg: ['var(--mat-petg)', '#FFFFFF'],
  tpu: ['var(--mat-tpu)', '#FFFFFF']
};
function Badge({
  tone = 'neutral',
  dot,
  outlined,
  children,
  style,
  ...rest
}) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '1px 10px 0',
      borderRadius: 999,
      background: bg,
      color: fg,
      border: outlined ? '1.5px solid var(--graphite-900)' : '1.5px solid transparent',
      font: '700 12.5px/1 var(--font-body)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'currentColor',
      marginTop: -1
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  label,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    className: 'icon-' + name,
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      fontSize: size,
      width: size,
      height: size,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color,
      fontStyle: 'normal',
      flexShrink: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: 34,
    px: 14,
    fs: 14,
    ic: 16,
    r: 10
  },
  md: {
    h: 44,
    px: 20,
    fs: 16,
    ic: 18,
    r: 12
  },
  lg: {
    h: 56,
    px: 28,
    fs: 19,
    ic: 22,
    r: 14
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--yolk-500)',
    hover: 'var(--yolk-300)',
    fg: 'var(--graphite-900)',
    border: 'var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  secondary: {
    bg: 'var(--paper-0)',
    hover: '#FFFFFF',
    fg: 'var(--graphite-900)',
    border: 'var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  ink: {
    bg: 'var(--graphite-900)',
    hover: 'var(--graphite-800)',
    fg: 'var(--paper-0)',
    border: 'var(--graphite-900)',
    sh: 'var(--yolk-500)'
  },
  danger: {
    bg: 'var(--danger)',
    hover: '#E04040',
    fg: '#FFFFFF',
    border: 'var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  ghost: {
    bg: 'transparent',
    hover: 'rgba(22,22,26,.07)',
    fg: 'var(--graphite-900)',
    border: 'transparent',
    sh: null
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  disabled,
  children,
  style,
  type = 'button',
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const off = v.sh && !disabled ? press ? 0 : hover ? 4 : 3 : 0;
  const shift = v.sh && !disabled ? press ? 3 : hover ? -1 : 0 : 0;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      paddingTop: 2,
      borderRadius: s.r,
      font: '700 ' + s.fs + 'px/1 var(--font-body)',
      whiteSpace: 'nowrap',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? 'var(--paper-2)' : hover ? v.hover : v.bg,
      color: disabled ? 'var(--fg-disabled)' : v.fg,
      border: '2px solid ' + (disabled ? 'var(--graphite-300)' : v.border),
      boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none',
      transform: 'translate(' + shift + 'px,' + shift + 'px)',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic,
    style: {
      marginTop: -2
    }
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic,
    style: {
      marginTop: -2
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    d: 34,
    ic: 16,
    r: 10
  },
  md: {
    d: 44,
    ic: 20,
    r: 12
  },
  lg: {
    d: 56,
    ic: 24,
    r: 14
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--yolk-500)',
    hover: 'var(--yolk-300)',
    fg: 'var(--graphite-900)',
    border: 'var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  secondary: {
    bg: 'var(--paper-0)',
    hover: '#FFFFFF',
    fg: 'var(--graphite-900)',
    border: 'var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  ink: {
    bg: 'var(--graphite-900)',
    hover: 'var(--graphite-800)',
    fg: 'var(--paper-0)',
    border: 'var(--graphite-900)',
    sh: 'var(--yolk-500)'
  },
  ghost: {
    bg: 'transparent',
    hover: 'rgba(22,22,26,.07)',
    fg: 'var(--graphite-900)',
    border: 'transparent',
    sh: null
  }
};
function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 'md',
  round,
  disabled,
  badge,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.secondary;
  const off = v.sh && !disabled ? press ? 0 : hover ? 3 : 2 : 0;
  const shift = v.sh && !disabled ? press ? 2 : hover ? -1 : 0 : 0;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.d,
      height: s.d,
      padding: 0,
      borderRadius: round ? 999 : s.r,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? 'var(--paper-2)' : hover ? v.hover : v.bg,
      color: disabled ? 'var(--fg-disabled)' : v.fg,
      border: '2px solid ' + (disabled ? 'var(--graphite-300)' : v.border),
      boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none',
      transform: 'translate(' + shift + 'px,' + shift + 'px)',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic
  }), badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -8,
      right: -8,
      minWidth: 20,
      height: 20,
      padding: '0 5px',
      borderRadius: 999,
      background: 'var(--mat-pla)',
      color: '#fff',
      border: '2px solid var(--graphite-900)',
      font: '700 11px/16px var(--font-mono)',
      textAlign: 'center'
    }
  }, badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MAT = {
  pla: ['var(--mat-pla)', 'var(--mat-pla-tint)'],
  petg: ['var(--mat-petg)', 'var(--mat-petg-tint)'],
  tpu: ['var(--mat-tpu)', 'var(--mat-tpu-tint)'],
  loop: ['var(--mat-loop)', 'var(--mat-loop-tint)']
};
function Tag({
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
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
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
      ...style
    }
  }, rest), m && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: m[0],
      border: '1.5px solid ' + (selected ? 'var(--paper-0)' : 'var(--graphite-900)')
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      cursor: 'pointer',
      marginRight: -4,
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  width = 480,
  inline,
  style
}) {
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": !inline,
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      boxShadow: 'var(--shadow-hard-lg)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '20px 20px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingTop: 4
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px/1 var(--font-mono)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 24px/1.1 var(--font-display)',
      color: 'var(--fg-1)'
    }
  }, title)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 24px 24px',
      font: '400 15px/1.5 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '16px 24px',
      borderTop: '2px dashed var(--border-2)',
      background: 'var(--paper-1)'
    }
  }, footer));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  neutral: ['var(--paper-0)', 'bell'],
  success: ['var(--mat-loop)', 'check'],
  warning: ['var(--yolk-500)', 'triangle-alert'],
  danger: ['var(--danger)', 'octagon-x'],
  info: ['var(--mat-tpu)', 'info']
};
function Toast({
  tone = 'neutral',
  title,
  message,
  icon,
  action,
  onAction,
  onClose,
  style
}) {
  const [bg, ic] = TONES[tone] || TONES.neutral;
  const light = tone === 'neutral' || tone === 'warning';
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 380,
      maxWidth: '100%',
      padding: 12,
      borderRadius: 14,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      boxShadow: 'var(--shadow-float)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      flexShrink: 0,
      borderRadius: 10,
      background: bg,
      color: light ? 'var(--graphite-900)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || ic,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1.25 var(--font-body)'
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13.5px/1.4 var(--font-body)',
      color: 'var(--fg-on-inverse-2)'
    }
  }, message)), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      alignSelf: 'center',
      border: 0,
      background: 'transparent',
      color: 'var(--yolk-300)',
      font: '700 14px/1 var(--font-body)',
      cursor: 'pointer',
      padding: '8px 4px'
    }
  }, action), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--fg-on-inverse-2)',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = 'top',
  open,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const show = open != null ? open : hover;
  const top = placement === 'top';
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      [top ? 'bottom' : 'top']: 'calc(100% + 10px)',
      transform: 'translateX(-50%) translateY(' + (show ? 0 : top ? 4 : -4) + 'px)',
      opacity: show ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity var(--dur-fast), transform var(--dur-base) var(--ease-spring)',
      zIndex: 50,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      padding: '7px 10px 6px',
      borderRadius: 8,
      font: '600 13px/1.2 var(--font-body)',
      whiteSpace: 'nowrap'
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      [top ? 'top' : 'bottom']: '100%',
      marginLeft: -6,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      [top ? 'borderTop' : 'borderBottom']: '6px solid var(--graphite-900)'
    }
  })));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked == null) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      borderRadius: 7,
      border: '2px solid var(--graphite-900)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: on ? 'var(--yolk-500)' : 'var(--paper-0)',
      boxShadow: on ? '2px 2px 0 var(--graphite-900)' : 'none',
      transition: 'background var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15,
    color: "var(--graphite-900)"
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: 1
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 15px/1.3 var(--font-body)',
      color: 'var(--fg-1)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px/1.35 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: '700 14px/1.2 var(--font-body)',
      color: 'var(--fg-1)'
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: (error ? '600 ' : '400 ') + '13px/1.35 var(--font-body)',
      color: error ? 'var(--danger)' : 'var(--fg-3)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  size = 'md',
  disabled,
  id,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const fid = id || (label ? 'in-' + String(label).replace(/\W+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    htmlFor: fid,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      padding: '0 14px',
      borderRadius: 12,
      background: disabled ? 'var(--paper-2)' : 'var(--paper-0)',
      border: '2px solid ' + (error ? 'var(--danger)' : focus ? 'var(--graphite-900)' : 'var(--border-2)'),
      boxShadow: focus && !error ? '3px 3px 0 var(--yolk-500)' : 'none',
      transition: 'box-shadow var(--dur-fast), border-color var(--dur-fast)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--fg-3)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      width: '100%',
      border: 0,
      outline: 0,
      background: 'transparent',
      font: '500 ' + (size === 'lg' ? 18 : 16) + 'px/1.2 var(--font-body)',
      color: disabled ? 'var(--fg-disabled)' : 'var(--fg-1)',
      paddingTop: 2,
      ...inputStyle
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      color: 'var(--fg-3)',
      textTransform: 'uppercase'
    }
  }, suffix)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  style
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value != null ? value : inner;
  const set = n => {
    n = Math.max(min, Math.min(max, n));
    if (value == null) setInner(n);
    onChange && onChange(n);
  };
  const d = size === 'sm' ? 32 : 42;
  const btn = dis => ({
    width: d,
    height: '100%',
    border: 0,
    background: 'transparent',
    cursor: dis ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: dis ? 'var(--fg-disabled)' : 'var(--graphite-900)'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: d + 4,
      border: '2px solid var(--graphite-900)',
      borderRadius: 12,
      background: 'var(--paper-0)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    disabled: v <= min,
    onClick: () => set(v - 1),
    style: btn(v <= min)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 34,
      textAlign: 'center',
      font: '700 15px/1 var(--font-mono)',
      borderLeft: '1.5px solid var(--border-2)',
      borderRight: '1.5px solid var(--border-2)',
      height: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, v), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    disabled: v >= max,
    onClick: () => set(v + 1),
    style: btn(v >= max)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 16
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked,
  onChange,
  label,
  description,
  disabled,
  name,
  value,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      if (!disabled && onChange) onChange(value);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "radio",
    "aria-checked": !!checked,
    tabIndex: 0,
    "data-name": name,
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      borderRadius: 999,
      border: '2px solid var(--graphite-900)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--yolk-500)' : 'var(--paper-0)',
      transition: 'background var(--dur-fast)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--graphite-900)'
    }
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: 1
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 15px/1.3 var(--font-body)',
      color: 'var(--fg-1)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px/1.35 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  options = [],
  size = 'md',
  disabled,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const fid = id || (label ? 'sel-' + String(label).replace(/\W+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    htmlFor: fid,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: h,
      padding: '2px 40px 0 14px',
      borderRadius: 12,
      cursor: 'pointer',
      background: disabled ? 'var(--paper-2)' : 'var(--paper-0)',
      color: 'var(--fg-1)',
      font: '500 16px/1 var(--font-body)',
      outline: 0,
      border: '2px solid ' + (error ? 'var(--danger)' : focus ? 'var(--graphite-900)' : 'var(--border-2)'),
      boxShadow: focus && !error ? '3px 3px 0 var(--yolk-500)' : 'none'
    }
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked == null) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    tabIndex: 0,
    style: {
      position: 'relative',
      width: 46,
      height: 28,
      flexShrink: 0,
      borderRadius: 999,
      border: '2px solid var(--graphite-900)',
      background: on ? 'var(--yolk-500)' : 'var(--paper-2)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 20 : 2,
      width: 20,
      height: 20,
      borderRadius: 999,
      background: on ? 'var(--graphite-900)' : 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 15px/1.3 var(--font-body)',
      color: 'var(--fg-1)',
      whiteSpace: 'nowrap'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/mascot/Goblin.jsx
try { (() => {
const GB_CSS = `
@keyframes gb-shake{0%,100%{transform:translate(0,0) rotate(0)}20%{transform:translate(-3px,1px) rotate(-2deg)}40%{transform:translate(3px,-1px) rotate(2deg)}60%{transform:translate(-2px,0) rotate(-1deg)}80%{transform:translate(2px,1px) rotate(1deg)}}
@keyframes gb-run{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
@keyframes gb-walk{0%,50%,100%{transform:translateY(0) rotate(-2deg)}25%,75%{transform:translateY(-6px) rotate(2deg)}}
@keyframes gb-push{0%,50%,100%{transform:translateY(0) rotate(8deg)}25%,75%{transform:translateY(-4px) rotate(10deg)}}
@keyframes gb-step{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(6px,-12px) rotate(-14deg)}50%{transform:translate(10px,0) rotate(0)}75%{transform:translate(4px,0)}}
@keyframes gb-swing{0%,100%{transform:rotate(-18deg)}50%{transform:rotate(18deg)}}
@keyframes gb-sway{0%,100%{transform:translateX(-2px) rotate(-2.5deg)}50%{transform:translateX(2px) rotate(2.5deg)}}
@keyframes gb-peer{0%,100%{transform:translate(-3px,4px) rotate(-5deg) scale(1.04)}50%{transform:translate(3px,6px) rotate(4deg) scale(1.1)}}
@keyframes gb-brow{0%,70%,100%{transform:translateY(0)}80%,90%{transform:translateY(-7px)}}
@keyframes gb-nod{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}
@keyframes gb-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}
@keyframes gb-drop{0%{opacity:0;transform:translateY(-4px)}30%{opacity:1}100%{opacity:0;transform:translateY(14px)}}
@keyframes gb-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
@keyframes gb-tape{from{transform:scale(1.6) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.gb-root *:not(.gb-soft){animation:none!important}}
`;
function Goblin({
  mood = 'judge',
  size = 160,
  color = 'var(--mat-loop)',
  animate = true,
  track = false,
  ignoreReducedMotion = false,
  taped = false,
  style
}) {
  const ink = 'var(--graphite-900)';
  const A = a => animate ? a : 'none';
  const ref = React.useRef(null);
  const uid = 'gb' + React.useId().replace(/[^a-z0-9]/gi, '');
  const [look, setLook] = React.useState({
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    if (!track) return;
    const mv = e => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2),
        dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      const k = Math.min(1, d / 260);
      setLook({
        x: dx / d * k,
        y: dy / d * k
      });
    };
    window.addEventListener('pointermove', mv);
    return () => window.removeEventListener('pointermove', mv);
  }, [track]);
  const walking = mood === 'walk' || mood === 'push';
  const side = mood === 'judge' ? {
    x: 5,
    y: 1
  } : mood === 'push' ? {
    x: 6,
    y: 0
  } : mood === 'peer' ? {
    x: 0,
    y: 3
  } : {
    x: 0,
    y: 0
  };
  const px = track && !walking ? look.x * 5 : side.x,
    py = track && !walking ? look.y * 4 : side.y;
  const sw = 5;
  const wrapAnim = {
    shout: 'gb-shake .45s linear infinite',
    busy: 'gb-run .5s ease-in-out infinite',
    approve: 'gb-nod 1.4s ease-in-out infinite',
    judge: 'gb-breathe 3.2s ease-in-out infinite',
    sleep: 'gb-breathe 3.6s ease-in-out infinite',
    hips: 'gb-sway 2.4s ease-in-out infinite',
    peer: 'gb-peer 3.4s ease-in-out infinite',
    walk: 'gb-walk .9s linear infinite',
    push: 'gb-push .9s linear infinite'
  }[mood];
  const soft = ['judge', 'sleep', 'hips', 'peer', 'approve'].includes(mood);
  const shade = 'url(#' + uid + 's)';
  const eye = (cx, n) => {
    if (mood === 'sleep') return /*#__PURE__*/React.createElement("path", {
      d: 'M' + (cx - 11) + ' 102 Q ' + cx + ' 110 ' + (cx + 11) + ' 102',
      fill: "none",
      stroke: ink,
      strokeWidth: "4.5",
      strokeLinecap: "round"
    });
    const ry = mood === 'shout' ? 15 : mood === 'judge' ? 10 : mood === 'peer' ? n ? 17 : 6 : mood === 'hips' ? 11 : 13;
    const rx = mood === 'peer' && n ? 16 : 14;
    return /*#__PURE__*/React.createElement("g", {
      className: "gb-soft",
      style: {
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation: A('gb-blink 5s infinite')
      }
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: cx,
      cy: "100",
      rx: rx,
      ry: ry,
      fill: 'url(#' + uid + 'e)',
      stroke: ink,
      strokeWidth: "4"
    }), ry > 7 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: cx + px,
      cy: 100 + py,
      r: mood === 'shout' ? 4.5 : mood === 'peer' ? 7.5 : 6,
      fill: ink
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx + px - 2.5,
      cy: 97 + py,
      r: "2",
      fill: "#fff"
    })));
  };
  const brows = {
    judge: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
      style: {
        transformBox: 'fill-box',
        animation: A('gb-brow 3.2s ease-in-out infinite')
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M66 80 Q 80 70 94 78",
      fill: "none",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })), /*#__PURE__*/React.createElement("path", {
      d: "M106 88 L 134 84",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    shout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 78 L 94 88",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M134 78 L 106 88",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    busy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 84 L 94 82",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M106 82 L 134 84",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    walk: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 84 L 94 82",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M106 82 L 134 84",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    push: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 80 L 94 88",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M134 80 L 106 88",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    approve: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 82 Q 80 76 94 82",
      fill: "none",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M106 86 L 134 84",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    hips: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M66 84 Q 80 78 94 84",
      fill: "none",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M106 84 Q 120 78 134 84",
      fill: "none",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    peer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M68 92 L 94 92",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M104 76 Q 120 66 136 76",
      fill: "none",
      stroke: ink,
      strokeWidth: "6",
      strokeLinecap: "round"
    })),
    sleep: null
  }[mood];
  const mouth = {
    judge: /*#__PURE__*/React.createElement("path", {
      d: "M86 128 Q 104 124 118 132",
      fill: "none",
      stroke: ink,
      strokeWidth: "4.5",
      strokeLinecap: "round"
    }),
    shout: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M78 120 Q 100 112 122 120 Q 124 150 100 152 Q 76 150 78 120 Z",
      fill: "var(--graphite-800)",
      stroke: ink,
      strokeWidth: "4",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M86 143 Q 100 134 114 143 Q 100 152 86 143 Z",
      fill: "var(--mat-pla)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M86 121 l5 8 l5 -9",
      fill: "#fff",
      stroke: ink,
      strokeWidth: "2",
      strokeLinejoin: "round"
    })),
    busy: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "84",
      y: "124",
      width: "32",
      height: "12",
      rx: "5",
      fill: "#fff",
      stroke: ink,
      strokeWidth: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M95 124 v12 M105 124 v12",
      stroke: ink,
      strokeWidth: "2.5"
    })),
    push: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "84",
      y: "124",
      width: "32",
      height: "12",
      rx: "5",
      fill: "#fff",
      stroke: ink,
      strokeWidth: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M95 124 v12 M105 124 v12",
      stroke: ink,
      strokeWidth: "2.5"
    })),
    walk: /*#__PURE__*/React.createElement("path", {
      d: "M88 130 Q 100 126 114 130",
      fill: "none",
      stroke: ink,
      strokeWidth: "4.5",
      strokeLinecap: "round"
    }),
    approve: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M84 126 Q 102 138 120 124",
      fill: "none",
      stroke: ink,
      strokeWidth: "4.5",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M110 130 l3 7 l4 -8",
      fill: "#fff",
      stroke: ink,
      strokeWidth: "2",
      strokeLinejoin: "round"
    })),
    hips: /*#__PURE__*/React.createElement("path", {
      d: "M84 128 Q 104 136 120 124",
      fill: "none",
      stroke: ink,
      strokeWidth: "4.5",
      strokeLinecap: "round"
    }),
    peer: /*#__PURE__*/React.createElement("ellipse", {
      cx: "100",
      cy: "132",
      rx: "5",
      ry: "4",
      fill: ink
    }),
    sleep: /*#__PURE__*/React.createElement("path", {
      d: "M94 130 q 6 4 12 0",
      fill: "none",
      stroke: ink,
      strokeWidth: "4",
      strokeLinecap: "round"
    })
  }[mood];
  const limb = (d, key, anim, origin) => /*#__PURE__*/React.createElement("g", {
    key: key,
    style: anim ? {
      transformBox: 'view-box',
      transformOrigin: origin,
      animation: A(anim)
    } : null
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: ink,
    strokeWidth: "19",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "11",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "rgba(0,0,0,.18)",
    strokeWidth: "4",
    strokeLinecap: "round",
    transform: "translate(1.5,3)"
  }));
  const arms = {
    judge: [limb('M58 140 C 80 150, 110 150, 132 136', 'a'), limb('M142 140 C 120 152, 90 152, 70 138', 'b')],
    shout: [limb('M54 128 C 36 112, 34 92, 26 76', 'a'), limb('M146 128 C 164 112, 166 92, 174 76', 'b')],
    busy: [limb('M54 132 C 40 140, 34 150, 30 158', 'a'), limb('M146 128 C 160 120, 166 112, 168 102', 'b')],
    approve: [limb('M54 134 C 42 144, 40 152, 40 160', 'a'), limb('M146 130 C 162 122, 170 112, 172 100', 'b')],
    sleep: [limb('M60 142 C 72 154, 90 158, 100 156', 'a'), limb('M140 142 C 128 154, 110 158, 100 156', 'b')],
    hips: [limb('M54 120 C 26 120, 26 148, 52 150', 'a'), limb('M146 120 C 174 120, 174 148, 148 150', 'b')],
    peer: [limb('M54 132 C 42 144, 42 154, 46 162', 'a'), limb('M148 138 C 150 152, 130 156, 116 142', 'b')],
    walk: [limb('M54 128 C 46 140, 44 152, 46 162', 'a', 'gb-swing .9s ease-in-out infinite', '54px 128px'), limb('M146 128 C 154 140, 156 152, 154 162', 'b', 'gb-swing .9s ease-in-out -.45s infinite', '146px 128px')],
    push: [limb('M142 124 C 160 124, 176 120, 194 116', 'a'), limb('M58 132 C 90 150, 150 140, 194 128', 'b')]
  }[mood];
  const armsFront = ['judge', 'sleep', 'peer', 'push'].includes(mood);
  const foot = (cx, n) => /*#__PURE__*/React.createElement("g", {
    key: cx,
    style: walking ? {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: A('gb-step .9s ease-in-out ' + (n ? '-.45s' : '0s') + ' infinite')
    } : null
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: "182",
    rx: "16",
    ry: "9",
    fill: color,
    stroke: ink,
    strokeWidth: sw
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: cx,
    cy: "182",
    rx: "16",
    ry: "9",
    fill: shade
  }));
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: ignoreReducedMotion ? 'gb-root-full' : 'gb-root',
    role: "img",
    "aria-label": 'Mess Goblin — ' + mood,
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, GB_CSS), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: uid + 's',
    cx: "36%",
    cy: "28%",
    r: "78%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#fff",
    stopOpacity: ".42"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".38",
    stopColor: "#fff",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".72",
    stopColor: "#000",
    stopOpacity: ".08"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#000",
    stopOpacity: ".34"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: uid + 'e',
    cx: "38%",
    cy: "32%",
    r: "75%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#fff"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".7",
    stopColor: "#F3EFE6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#CFC8B8"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: uid + 'a',
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#fff",
    stopOpacity: ".3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".5",
    stopColor: "#fff",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#000",
    stopOpacity: ".25"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: uid + 'g',
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#16161a",
    stopOpacity: ".28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#16161a",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("ellipse", {
    cx: "100",
    cy: "190",
    rx: "70",
    ry: "9",
    fill: 'url(#' + uid + 'g)'
  }), /*#__PURE__*/React.createElement("g", {
    style: {
      transformBox: 'view-box',
      transformOrigin: '100px 190px',
      transform: track && !walking ? 'rotate(' + look.x * 3 + 'deg)' : 'none',
      transition: 'transform 200ms ease-out'
    }
  }, /*#__PURE__*/React.createElement("g", {
    className: soft ? 'gb-soft' : undefined,
    style: {
      transformBox: 'view-box',
      transformOrigin: '100px 190px',
      animation: A(wrapAnim)
    }
  }, foot(78, 0), foot(122, 1), /*#__PURE__*/React.createElement("path", {
    d: "M60 94 L 10 62 L 54 122 Z",
    fill: color,
    stroke: ink,
    strokeWidth: sw,
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140 94 L 190 62 L 146 122 Z",
    fill: color,
    stroke: ink,
    strokeWidth: sw,
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 94 L 10 62 L 54 122 Z",
    fill: shade
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140 94 L 190 62 L 146 122 Z",
    fill: shade
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52 96 L 26 76 L 50 110 Z",
    fill: "var(--mat-pla)",
    opacity: ".55"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M148 96 L 174 76 L 150 110 Z",
    fill: "var(--mat-pla)",
    opacity: ".55"
  }), !armsFront && arms, /*#__PURE__*/React.createElement("path", {
    d: "M48 140 C 40 96, 62 58, 100 56 C 138 58, 160 96, 152 140 C 148 176, 52 176, 48 140 Z",
    fill: color,
    stroke: ink,
    strokeWidth: sw
  }), /*#__PURE__*/React.createElement("path", {
    d: "M48 140 C 40 96, 62 58, 100 56 C 138 58, 160 96, 152 140 C 148 176, 52 176, 48 140 Z",
    fill: shade
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "74",
    cy: "76",
    rx: "14",
    ry: "8",
    fill: "#fff",
    opacity: ".35",
    transform: "rotate(-28 74 76)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M100 56 C 98 44, 108 38, 114 44",
    fill: "none",
    stroke: ink,
    strokeWidth: "4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 142 h60 v14 q -30 18 -60 0 z",
    fill: "var(--yolk-500)",
    stroke: ink,
    strokeWidth: "4",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 142 h60 v14 q -30 18 -60 0 z",
    fill: 'url(#' + uid + 'a)'
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "152",
    r: "5",
    fill: "var(--paper-0)",
    stroke: ink,
    strokeWidth: "2.5"
  }), eye(80, 0), eye(120, 1), brows, !taped && mouth, taped && /*#__PURE__*/React.createElement("g", {
    "aria-hidden": true,
    style: {
      animation: A('gb-tape .35s cubic-bezier(.3,1.5,.5,1) both'),
      transformBox: 'fill-box',
      transformOrigin: 'center'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "78",
    y: "123",
    width: "48",
    height: "14",
    rx: "2",
    fill: "#F4E7C3",
    stroke: ink,
    strokeWidth: "3",
    transform: "rotate(-14 102 130)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "124",
    width: "44",
    height: "12",
    rx: "2",
    fill: "#EFDDAE",
    stroke: ink,
    strokeWidth: "3",
    transform: "rotate(12 102 130)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M84 128 h36 M86 133 h30",
    stroke: "rgba(22,22,26,.12)",
    strokeWidth: "1.5",
    transform: "rotate(12 102 130)"
  })), !taped && !['shout', 'sleep', 'peer', 'busy', 'push'].includes(mood) && /*#__PURE__*/React.createElement("path", {
    d: "M90 126 l4 7 l4 -7",
    fill: "#fff",
    stroke: ink,
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), armsFront && arms, mood === 'busy' && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "96",
    r: "16",
    fill: "var(--mat-pla)",
    stroke: ink,
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "96",
    r: "16",
    fill: shade
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "96",
    r: "6",
    fill: "var(--paper-0)",
    stroke: ink,
    strokeWidth: "3"
  })), mood === 'approve' && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: "172",
    cy: "96",
    r: "9",
    fill: color,
    stroke: ink,
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M172 87 v-10",
    stroke: ink,
    strokeWidth: "9",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M172 87 v-10",
    stroke: color,
    strokeWidth: "3.5",
    strokeLinecap: "round"
  })), ['shout', 'busy', 'push'].includes(mood) && [0, 1].map(n => /*#__PURE__*/React.createElement("path", {
    key: n,
    d: n ? 'M150 70 q 6 8 0 12 q -6 -4 0 -12 z' : 'M44 74 q 5 7 0 10 q -5 -3 0 -10 z',
    fill: "var(--mat-tpu-tint)",
    stroke: "var(--mat-tpu)",
    strokeWidth: "2.5",
    style: {
      animation: A('gb-drop 1s ' + n * .5 + 's ease-in infinite')
    }
  })))), mood === 'sleep' && /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "60",
    style: {
      font: '800 22px var(--font-mono)',
      fill: 'var(--graphite-700)'
    }
  }, "z")));
}
Object.assign(__ds_scope, { Goblin });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mascot/Goblin.jsx", error: String((e && e.message) || e) }); }

// components/mascot/Mascot.jsx
try { (() => {
const MASCOT_COLORS = {
  yolk: 'var(--yolk-500)',
  pla: 'var(--mat-pla)',
  petg: 'var(--mat-petg)',
  tpu: 'var(--mat-tpu)',
  loop: 'var(--mat-loop)',
  ink: 'var(--graphite-600)',
  paper: 'var(--paper-0)'
};
const MASCOT_SWIRL = {
  yolk: 'pla',
  pla: 'yolk',
  petg: 'tpu',
  tpu: 'petg',
  loop: 'yolk',
  ink: 'yolk',
  paper: 'yolk'
};
const SQ_CSS = `
@keyframes sq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes sq-wobble{0%,100%{transform:scale(1,1) rotate(0)}33%{transform:scale(1.03,.97) rotate(-1.5deg)}66%{transform:scale(.98,1.02) rotate(1.5deg)}}
@keyframes sq-bounce{0%,100%{transform:translateY(0) scale(1,1)}15%{transform:translateY(0) scale(1.08,.9)}45%{transform:translateY(-16px) scale(.95,1.05)}75%{transform:translateY(0) scale(1.03,.97)}}
@keyframes sq-draw{0%{stroke-dashoffset:1}55%,100%{stroke-dashoffset:0}}
@keyframes sq-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}
@keyframes sq-breathe{0%,100%{transform:scale(1.14,.72)}50%{transform:scale(1.18,.68)}}
@keyframes sq-pop{0%,50%{opacity:0;transform:scale(.3)}62%{opacity:1;transform:scale(1.15)}70%,100%{opacity:1;transform:scale(1)}}
@keyframes sq-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes sq-z{0%{opacity:0;transform:translate(0,0) scale(.7)}30%{opacity:1}100%{opacity:0;transform:translate(14px,-26px) scale(1.1)}}
@keyframes sq-shake{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(-3px,0) rotate(-2deg)}75%{transform:translate(3px,0) rotate(2deg)}}
@keyframes sq-drip{0%{transform:scaleY(0)}40%,100%{transform:scaleY(1)}}
@keyframes gb-tape{from{transform:scale(1.6) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}
@keyframes sq-sway{0%,100%{transform:translateX(-2px) rotate(-2.5deg)}50%{transform:translateX(2px) rotate(2.5deg)}}
@keyframes sq-peer{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@keyframes sq-peerface{0%,100%{transform:translate(-4px,6px) scale(1.18)}50%{transform:translate(4px,8px) scale(1.3)}}
@keyframes sq-walk{0%,50%,100%{transform:translateY(0) scale(1.03,.97) rotate(-3deg)}25%,75%{transform:translateY(-7px) scale(.97,1.03) rotate(3deg)}}
@keyframes sq-step{0%,100%{transform:translate(0,0)}25%{transform:translate(5px,-9px) rotate(-12deg)}50%{transform:translate(9px,0)}}
@keyframes sq-swing{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(20deg)}}
@media (prefers-reduced-motion:reduce){.sq-root *:not(.sq-soft){animation:none!important}}
`;
const SQ_MAIN = [{
  d: 'M24 182 C 60 190, 140 190, 178 181',
  w: 14
}, {
  d: 'M38 172 C 16 140, 34 98, 70 104 C 104 110, 92 150, 66 146 C 44 142, 52 108, 88 92 C 124 76, 160 96, 158 128 C 156 156, 126 160, 120 140 C 114 120, 146 108, 166 128 C 182 146, 176 172, 150 176',
  w: 16
}, {
  d: 'M76 92 C 68 64, 100 50, 117 64 C 132 77, 119 99, 102 93 C 89 88, 94 71, 109 73',
  w: 14
}];
const SQ_SWIRL = [{
  d: 'M50 172 C 68 188, 112 188, 130 178 C 148 166, 134 146, 110 150 C 88 154, 92 178, 114 174',
  w: 13
}, {
  d: 'M28 150 C 22 126, 50 114, 62 128',
  w: 11
}, {
  d: 'M148 96 C 166 82, 184 98, 175 116',
  w: 11
}];
function Mascot({
  pose = 'hello',
  color = 'yolk',
  swirl,
  size = 160,
  animate = true,
  track = false,
  ignoreReducedMotion = false,
  taped = false,
  style
}) {
  const uid = 'sq' + React.useId().replace(/[^a-z0-9]/gi, '');
  const c = MASCOT_COLORS[color] || color;
  const k2 = swirl || MASCOT_SWIRL[color] || 'paper';
  const c2 = MASCOT_COLORS[k2] || k2;
  const ink = 'var(--graphite-900)';
  const ref = React.useRef(null);
  const [look, setLook] = React.useState({
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    if (!track) return;
    const mv = e => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2),
        dy = e.clientY - (r.top + r.height * 0.55);
      const d = Math.max(1, Math.hypot(dx, dy));
      const k = Math.min(1, d / 260);
      setLook({
        x: dx / d * k,
        y: dy / d * k
      });
    };
    window.addEventListener('pointermove', mv);
    return () => window.removeEventListener('pointermove', mv);
  }, [track]);
  const A = a => animate ? a : 'none';
  const drawing = pose === 'printing';
  const strand = (s, col, i) => {
    const st = drawing ? {
      strokeDasharray: 1,
      animation: A('sq-draw 3.2s ' + i * 0.18 + 's cubic-bezier(.5,0,.3,1) infinite')
    } : null;
    return /*#__PURE__*/React.createElement("g", {
      key: col + i
    }, /*#__PURE__*/React.createElement("path", {
      d: s.d,
      pathLength: "1",
      fill: "none",
      stroke: ink,
      strokeWidth: s.w + 6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: st
    }), /*#__PURE__*/React.createElement("path", {
      d: s.d,
      pathLength: "1",
      fill: "none",
      stroke: col,
      strokeWidth: s.w,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: st
    }), /*#__PURE__*/React.createElement("path", {
      d: s.d,
      pathLength: "1",
      fill: "none",
      stroke: "rgba(0,0,0,.2)",
      strokeWidth: s.w * 0.5,
      strokeLinecap: "round",
      transform: "translate(1.5,3)",
      style: st
    }), /*#__PURE__*/React.createElement("path", {
      d: s.d,
      pathLength: "1",
      fill: "none",
      stroke: "rgba(255,255,255,.5)",
      strokeWidth: s.w * 0.24,
      strokeLinecap: "round",
      transform: "translate(-2,-3)",
      style: st
    }));
  };
  const order = [[SQ_MAIN[0], c], [SQ_SWIRL[1], c2], [SQ_MAIN[1], c], [SQ_SWIRL[0], c2], [SQ_SWIRL[2], c2], [SQ_MAIN[2], c]];
  const arm = (d, col, origin, waving, key, anim) => /*#__PURE__*/React.createElement("g", {
    key: key,
    style: {
      transformBox: 'view-box',
      transformOrigin: origin,
      animation: anim ? A(anim) : waving ? A('sq-wave 1.1s ease-in-out infinite') : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: ink,
    strokeWidth: "17",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: col,
    strokeWidth: "11",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "rgba(0,0,0,.2)",
    strokeWidth: "4",
    strokeLinecap: "round",
    transform: "translate(1.5,2.5)"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: "rgba(255,255,255,.5)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    transform: "translate(-1.5,-2)"
  }));
  const walking = pose === 'walk';
  const groupAnim = {
    hello: {
      animation: A('sq-wobble 2.6s ease-in-out infinite')
    },
    cheer: {
      animation: A('sq-bounce 1s ease-in-out infinite')
    },
    oops: {
      transform: 'scale(1.1,.86)'
    },
    sleepy: {
      transform: 'scale(1.14,.72)',
      animation: A('sq-breathe 3.6s ease-in-out infinite')
    },
    printing: {},
    shout: {
      animation: A('sq-shake .4s linear infinite')
    },
    hips: {
      animation: A('sq-sway 2.4s ease-in-out infinite')
    },
    peer: {
      animation: A('sq-peer 3.4s ease-in-out infinite')
    },
    walk: {
      animation: A('sq-walk .9s linear infinite')
    }
  }[pose] || {};
  const soft = ['hello', 'sleepy', 'hips', 'peer'].includes(pose);
  const lx = walking ? 4 : look.x * 4,
    ly = pose === 'peer' ? 2 : look.y * 4;
  const closed = pose === 'sleepy';
  const pr = pose === 'oops' ? 4 : 5.5;
  const eye = cx => closed ? /*#__PURE__*/React.createElement("path", {
    d: 'M' + (cx - 9) + ' 114 Q ' + cx + ' 122 ' + (cx + 9) + ' 114',
    fill: "none",
    stroke: ink,
    strokeWidth: "4",
    strokeLinecap: "round"
  }) : pose === 'peer' && cx < 100 ? /*#__PURE__*/React.createElement("path", {
    d: 'M' + (cx - 10) + ' 112 h20',
    stroke: ink,
    strokeWidth: "4.5",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement("g", {
    className: "sq-soft",
    style: {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: A('sq-blink 4.6s infinite')
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: "112",
    r: pose === 'peer' ? 16 : 13.5,
    fill: 'url(#' + uid + 'e)',
    stroke: ink,
    strokeWidth: "3.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx + lx,
    cy: 112 + ly + (pose === 'oops' ? 2 : 0),
    r: pose === 'peer' ? 7 : pr,
    fill: ink
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx + lx - 2,
    cy: 110 + ly,
    r: "1.8",
    fill: "#fff"
  }));
  const mouth = {
    hello: /*#__PURE__*/React.createElement("path", {
      d: "M90 132 Q 100 142 110 132",
      fill: "none",
      stroke: ink,
      strokeWidth: "4",
      strokeLinecap: "round"
    }),
    printing: /*#__PURE__*/React.createElement("ellipse", {
      cx: "100",
      cy: "135",
      rx: "4.5",
      ry: "5.5",
      fill: ink
    }),
    cheer: /*#__PURE__*/React.createElement("path", {
      d: "M87 129 Q 100 150 113 129 Z",
      fill: ink,
      stroke: ink,
      strokeWidth: "3",
      strokeLinejoin: "round"
    }),
    oops: /*#__PURE__*/React.createElement("path", {
      d: "M88 137 q 4 -5 8 0 t 8 0 t 8 0",
      fill: "none",
      stroke: ink,
      strokeWidth: "3.5",
      strokeLinecap: "round"
    }),
    sleepy: /*#__PURE__*/React.createElement("path", {
      d: "M95 136 h10",
      stroke: ink,
      strokeWidth: "4",
      strokeLinecap: "round"
    }),
    shout: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "100",
      cy: "138",
      rx: "12",
      ry: "14",
      fill: "var(--graphite-800)",
      stroke: ink,
      strokeWidth: "3.5"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "100",
      cy: "146",
      rx: "7",
      ry: "4",
      fill: "var(--mat-pla)"
    })),
    hips: /*#__PURE__*/React.createElement("path", {
      d: "M89 131 Q 102 140 112 128",
      fill: "none",
      stroke: ink,
      strokeWidth: "4",
      strokeLinecap: "round"
    }),
    peer: /*#__PURE__*/React.createElement("ellipse", {
      cx: "102",
      cy: "136",
      rx: "4",
      ry: "3.5",
      fill: ink
    }),
    walk: /*#__PURE__*/React.createElement("path", {
      d: "M91 132 Q 101 140 111 132",
      fill: "none",
      stroke: ink,
      strokeWidth: "4",
      strokeLinecap: "round"
    })
  }[pose];
  const faceY = pose === 'sleepy' ? 24 : pose === 'oops' ? 8 : 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: ignoreReducedMotion ? 'sq-root-full' : 'sq-root',
    role: "img",
    "aria-label": "Tab'a the squiggle — " + pose,
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, SQ_CSS), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: uid + 'e',
    cx: "38%",
    cy: "32%",
    r: "75%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#fff"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".7",
    stopColor: "#F3EFE6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#CFC8B8"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: uid + 'g',
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#16161a",
    stopOpacity: ".28"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#16161a",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("ellipse", {
    cx: "100",
    cy: "190",
    rx: "82",
    ry: "10",
    fill: 'url(#' + uid + 'g)'
  }), walking && [78, 122].map((x, n) => /*#__PURE__*/React.createElement("g", {
    key: x,
    style: {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: A('sq-step .9s ease-in-out ' + (n ? '-.45s' : '0s') + ' infinite')
    }
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: x,
    cy: "188",
    rx: "13",
    ry: "7",
    fill: c2,
    stroke: ink,
    strokeWidth: "3.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: x - 3,
    cy: "185.5",
    rx: "5",
    ry: "2",
    fill: "#fff",
    opacity: ".5"
  }))), drawing && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "84",
    y: "0",
    width: "32",
    height: "16",
    rx: "4",
    fill: ink
  }), /*#__PURE__*/React.createElement("path", {
    d: "M92 16 h16 l-5 10 h-6 z",
    fill: "var(--yolk-600)",
    stroke: ink,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("g", {
    style: {
      transformBox: 'fill-box',
      transformOrigin: 'top',
      animation: A('sq-drip 3.2s ease-out infinite')
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M100 28 C 100 48, 96 62, 102 76",
    fill: "none",
    stroke: ink,
    strokeWidth: "11",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M100 28 C 100 48, 96 62, 102 76",
    fill: "none",
    stroke: c,
    strokeWidth: "6",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("g", {
    style: {
      transformBox: 'view-box',
      transformOrigin: '100px 186px',
      transform: track && !walking ? 'rotate(' + look.x * 3 + 'deg)' : 'none',
      transition: 'transform 200ms ease-out'
    }
  }, /*#__PURE__*/React.createElement("g", {
    className: soft ? 'sq-soft' : undefined,
    style: {
      transformBox: 'view-box',
      transformOrigin: '100px 186px',
      ...groupAnim
    }
  }, order.map(([s, col], i) => strand(s, col, i)), (pose === 'hello' || pose === 'cheer' || pose === 'shout') && arm('M162 124 C 178 112, 174 94, 188 84', c2, '162px 124px', pose === 'hello', 'r'), (pose === 'cheer' || pose === 'shout') && arm('M38 124 C 22 112, 26 94, 12 84', c2, '38px 124px', false, 'l'), pose === 'oops' && /*#__PURE__*/React.createElement(React.Fragment, null, arm('M160 176 C 174 166, 186 184, 198 174', c, '160px 176px', false, 'o1'), arm('M40 176 C 26 168, 14 186, 2 176', c2, '40px 176px', false, 'o2')), pose === 'hips' && /*#__PURE__*/React.createElement(React.Fragment, null, arm('M40 132 C 12 130, 12 160, 40 162', c2, '40px 132px', false, 'h1'), arm('M160 132 C 188 130, 188 160, 160 162', c2, '160px 132px', false, 'h2')), pose === 'peer' && arm('M160 150 C 172 136, 150 126, 132 140', c2, '160px 150px', false, 'p1'), walking && /*#__PURE__*/React.createElement(React.Fragment, null, arm('M40 128 C 30 140, 26 152, 24 164', c2, '40px 128px', false, 'w1', 'sq-swing .9s ease-in-out infinite'), arm('M160 128 C 170 140, 174 152, 176 164', c2, '160px 128px', false, 'w2', 'sq-swing .9s ease-in-out -.45s infinite')))), /*#__PURE__*/React.createElement("g", {
    style: {
      transform: 'translate(' + (walking ? 4 : look.x * 6) + 'px,' + (faceY + look.y * 3) + 'px)',
      transition: 'transform 120ms ease-out'
    }
  }, /*#__PURE__*/React.createElement("g", {
    className: "sq-soft",
    style: {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: drawing ? A('sq-pop 3.2s ease-out infinite') : pose === 'peer' ? A('sq-peerface 3.4s ease-in-out infinite') : walking ? A('sq-walk .9s linear infinite') : A('sq-float 2.8s ease-in-out infinite')
    }
  }, eye(84), eye(116), !taped && mouth, taped && /*#__PURE__*/React.createElement("g", {
    "aria-hidden": true,
    style: {
      animation: A('gb-tape .35s cubic-bezier(.3,1.5,.5,1) both'),
      transformBox: 'fill-box',
      transformOrigin: 'center'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "77",
    y: "128",
    width: "48",
    height: "14",
    rx: "2",
    fill: "#F4E7C3",
    stroke: ink,
    strokeWidth: "3",
    transform: "rotate(-14 101 135)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "79",
    y: "129",
    width: "44",
    height: "12",
    rx: "2",
    fill: "#EFDDAE",
    stroke: ink,
    strokeWidth: "3",
    transform: "rotate(12 101 135)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M83 133 h36 M85 138 h30",
    stroke: "rgba(22,22,26,.12)",
    strokeWidth: "1.5",
    transform: "rotate(12 101 135)"
  })), (pose === 'hello' || pose === 'cheer') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ellipse", {
    cx: "68",
    cy: "128",
    rx: "7",
    ry: "4",
    fill: "var(--mat-pla)",
    opacity: ".45"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "132",
    cy: "128",
    rx: "7",
    ry: "4",
    fill: "var(--mat-pla)",
    opacity: ".45"
  })), (pose === 'oops' || pose === 'shout') && /*#__PURE__*/React.createElement("path", {
    d: "M140 92 q 6 8 0 12 q -6 -4 0 -12 z",
    fill: "var(--mat-tpu-tint)",
    stroke: "var(--mat-tpu)",
    strokeWidth: "2.5"
  }))), pose === 'sleepy' && ['z', 'z', 'Z'].map((z, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: 140 + i * 12,
    y: 110 - i * 16,
    style: {
      font: '800 ' + (16 + i * 5) + 'px var(--font-mono)',
      fill: 'var(--graphite-700)',
      animation: A('sq-z 2.4s ' + i * 0.6 + 's ease-out infinite'),
      opacity: animate ? 0 : 1,
      transformBox: 'fill-box'
    }
  }, z))));
}
Object.assign(__ds_scope, { Mascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mascot/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/mascot/SpeechBubble.jsx
try { (() => {
const SB_TONES = {
  say: {
    bg: 'var(--paper-0)',
    fg: 'var(--graphite-900)',
    font: '700 15px/1.3 var(--font-body)'
  },
  shout: {
    bg: 'var(--yolk-500)',
    fg: 'var(--graphite-900)',
    font: '800 17px/1.2 var(--font-display)'
  },
  cheer: {
    bg: 'var(--mat-pla)',
    fg: '#fff',
    font: '800 16px/1.25 var(--font-display)'
  },
  judge: {
    bg: 'var(--graphite-900)',
    fg: 'var(--paper-0)',
    font: '600 15px/1.35 var(--font-body)'
  }
};
function SpeechBubble({
  tone = 'say',
  tail = 'bottom-start',
  who,
  children,
  style
}) {
  const t = SB_TONES[tone] || SB_TONES.say;
  const [v, h] = tail.split('-');
  const tailPos = {
    [v === 'top' ? 'bottom' : 'top']: '100%',
    [h === 'end' ? 'insetInlineEnd' : 'insetInlineStart']: 22
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 3,
      maxWidth: 300,
      padding: '10px 14px 9px',
      borderRadius: 16,
      background: t.bg,
      color: t.fg,
      border: '2px solid var(--graphite-900)',
      boxShadow: tone === 'shout' ? '3px 3px 0 var(--graphite-900)' : 'none',
      transform: tone === 'shout' ? 'rotate(-1.5deg)' : 'none',
      ...style
    }
  }, who && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 10px/1 var(--font-mono)',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      opacity: .7
    }
  }, who), /*#__PURE__*/React.createElement("span", {
    style: {
      font: t.font
    }
  }, children), tail !== 'none' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      ...tailPos,
      width: 14,
      height: 12,
      background: t.bg,
      borderInline: '2px solid var(--graphite-900)',
      [v === 'top' ? 'borderTop' : 'borderBottom']: '2px solid var(--graphite-900)',
      clipPath: v === 'top' ? 'polygon(0 100%,100% 100%,30% 0)' : 'polygon(0 0,100% 0,30% 100%)',
      marginTop: v === 'top' ? 0 : -2,
      marginBottom: v === 'top' ? -2 : 0
    }
  }));
}
Object.assign(__ds_scope, { SpeechBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/mascot/SpeechBubble.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'pill',
  style
}) {
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : items[0] && items[0].id);
  const cur = value != null ? value : inner;
  const pick = id => {
    if (value == null) setInner(id);
    onChange && onChange(id);
  };
  const count = (it, active) => it.count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px/1 var(--font-mono)',
      padding: '3px 6px',
      borderRadius: 6,
      background: active ? 'var(--graphite-900)' : 'var(--paper-2)',
      color: active ? 'var(--paper-0)' : 'var(--fg-2)'
    }
  }, it.count);
  if (variant === 'underline') return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 24,
      borderBottom: '2px solid var(--border-1)',
      ...style
    }
  }, items.map(it => {
    const a = it.id === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": a,
      onClick: () => pick(it.id),
      style: {
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
        borderBottom: '4px solid ' + (a ? 'var(--yolk-500)' : 'transparent')
      }
    }, it.label, count(it, a));
  }));
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      borderRadius: 14,
      border: '2px solid var(--graphite-900)',
      background: 'var(--paper-0)',
      ...style
    }
  }, items.map(it => {
    const a = it.id === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": a,
      onClick: () => pick(it.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 36,
        padding: '2px 16px 0',
        borderRadius: 10,
        cursor: 'pointer',
        font: '700 15px/1 var(--font-body)',
        whiteSpace: 'nowrap',
        border: '2px solid ' + (a ? 'var(--graphite-900)' : 'transparent'),
        background: a ? 'var(--yolk-500)' : 'transparent',
        color: a ? 'var(--graphite-900)' : 'var(--fg-2)',
        transition: 'background var(--dur-fast)'
      }
    }, it.label, count(it, a));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  flat: {
    bg: 'var(--paper-0)',
    border: '2px solid var(--border-1)',
    sh: null
  },
  outlined: {
    bg: 'var(--paper-0)',
    border: '2px solid var(--graphite-900)',
    sh: null
  },
  raised: {
    bg: 'var(--paper-0)',
    border: '2px solid var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  brand: {
    bg: 'var(--yolk-500)',
    border: '2px solid var(--graphite-900)',
    sh: 'var(--graphite-900)'
  },
  inverse: {
    bg: 'var(--graphite-900)',
    border: '2px solid var(--graphite-900)',
    sh: 'var(--yolk-500)',
    fg: 'var(--paper-0)'
  }
};
function Card({
  variant = 'raised',
  padding = 20,
  interactive,
  texture,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = V[variant] || V.raised;
  const lift = interactive && hover;
  const off = v.sh ? lift ? 8 : 5 : 0;
  const tex = texture === 'layers' ? 'var(--tex-layers)' : texture === 'bed' ? variant === 'inverse' ? 'var(--tex-bed-inverse)' : 'var(--tex-bed)' : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: v.bg,
      color: v.fg || 'var(--fg-1)',
      border: v.border,
      borderRadius: 18,
      padding,
      boxShadow: off ? off + 'px ' + off + 'px 0 ' + v.sh : 'none',
      transform: lift ? 'translate(-3px,-3px)' : 'none',
      cursor: interactive || onClick ? 'pointer' : undefined,
      transition: 'transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring)',
      ...style
    }
  }, rest), tex && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 16,
      background: tex,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/MediaPlaceholder.jsx
try { (() => {
const TONES = {
  paper: ['var(--paper-2)', 'var(--graphite-700)'],
  yolk: ['var(--yolk-300)', 'var(--graphite-900)'],
  pla: ['var(--mat-pla-tint)', 'var(--mat-pla-ink)'],
  petg: ['var(--mat-petg-tint)', 'var(--mat-petg-ink)'],
  tpu: ['var(--mat-tpu-tint)', 'var(--mat-tpu-ink)'],
  ink: ['var(--graphite-800)', 'var(--graphite-300)']
};
function MediaPlaceholder({
  label = 'Product photo',
  ratio = '4 / 3',
  tone = 'paper',
  texture = 'layers',
  src,
  radius = 14,
  style
}) {
  const [bg, fg] = TONES[tone] || TONES.paper;
  if (src) return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label,
    style: {
      display: 'block',
      width: '100%',
      aspectRatio: ratio,
      objectFit: 'cover',
      borderRadius: radius,
      background: bg,
      ...style
    }
  });
  const tex = texture === 'bed' ? tone === 'ink' ? 'var(--tex-bed-inverse)' : 'var(--tex-bed)' : 'var(--tex-layers-strong)';
  return /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": label,
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      borderRadius: radius,
      background: bg,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: tex,
      opacity: .7
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      margin: 10,
      padding: '4px 7px 3px',
      borderRadius: 6,
      background: 'rgba(252,250,244,.85)',
      color: fg === 'var(--graphite-300)' ? 'var(--graphite-800)' : fg,
      font: '600 10.5px/1.2 var(--font-mono)',
      letterSpacing: '.06em',
      textTransform: 'uppercase'
    }
  }, label));
}
Object.assign(__ds_scope, { MediaPlaceholder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/MediaPlaceholder.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  title,
  titleAr,
  price,
  currency = 'SAR',
  image,
  imageTone = 'paper',
  materials = ['pla'],
  badge,
  badgeTone = 'brand',
  spec,
  onAdd,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      boxShadow: (hover ? 8 : 5) + 'px ' + (hover ? 8 : 5) + 'px 0 var(--graphite-900)',
      transform: hover ? 'translate(-3px,-3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderBottom: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaPlaceholder, {
    src: image,
    label: title,
    tone: imageTone,
    ratio: "1 / 1",
    radius: 0
  }), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badgeTone,
    outlined: true,
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '14px 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 18px/1.15 var(--font-display)',
      color: 'var(--fg-1)'
    }
  }, title), titleAr && /*#__PURE__*/React.createElement("span", {
    dir: "rtl",
    style: {
      font: '600 14px/1.2 var(--font-arabic)',
      color: 'var(--fg-3)'
    }
  }, titleAr)), spec && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11.5px/1.2 var(--font-mono)',
      color: 'var(--fg-3)',
      letterSpacing: '.02em'
    }
  }, spec), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 22px/1 var(--font-display)',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 12px/1 var(--font-mono)',
      marginRight: 4,
      color: 'var(--fg-2)'
    }
  }, currency), price), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 3
    }
  }, materials.map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    title: (__ds_scope.MATERIALS[k] || {}).name,
    style: {
      width: 12,
      height: 12,
      borderRadius: 999,
      background: (__ds_scope.MATERIALS[k] || {}).color,
      border: '1.5px solid var(--graphite-900)'
    }
  })))), onAdd && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "plus",
    label: "Add to cart",
    variant: "primary",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      onAdd();
    }
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// scripts/build.cjs
try { (() => {
// Production build → dist/. Precompiles JSX (no in-browser Babel), self-hosts React/three production builds,
// stamps SEO URLs and writes sitemap/robots. Usage: SITE_URL=https://your-domain.sa npm run build
const {
  transform
} = require('esbuild');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const ROOT = path.resolve(__dirname, '..');
  const OUT = path.join(ROOT, 'dist');
  const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '');
  const SKIP = new Set(['node_modules', 'dist', 'scripts', 'screenshots', '.git', 'design_handoff_bara_website', 'package.json', 'package-lock.json', '_adherence.oxlintrc.json', '_ds_manifest.json', 'SKILL.md', 'thumbnail.html']);
  const VENDOR = [['react/umd/react.production.min.js', 'react.production.min.js'], ['react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'], ['three/build/three.min.js', 'three.min.js']];
  const ES = {
    loader: 'jsx',
    jsx: 'transform',
    target: 'es2019',
    minifyWhitespace: true,
    minifySyntax: true,
    legalComments: 'none'
  };
  async function walk(dir, fn) {
    for (const e of await fs.readdir(dir, {
      withFileTypes: true
    })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p, fn);else await fn(p);
    }
  }
  async function copyTree(src, dst) {
    for (const e of await fs.readdir(src, {
      withFileTypes: true
    })) {
      if (SKIP.has(e.name) || e.name.endsWith('.prompt.md')) continue;
      const s = path.join(src, e.name),
        d = path.join(dst, e.name);
      if (e.isDirectory()) {
        await fs.mkdir(d, {
          recursive: true
        });
        await copyTree(s, d);
      } else await fs.copyFile(s, d);
    }
  }
  await fs.rm(OUT, {
    recursive: true,
    force: true
  });
  await fs.mkdir(path.join(OUT, 'vendor'), {
    recursive: true
  });
  await copyTree(ROOT, OUT);
  for (const [from, to] of VENDOR) await fs.copyFile(path.join(ROOT, 'node_modules', from), path.join(OUT, 'vendor', to));

  // 1. JSX → JS
  let nJsx = 0;
  await walk(OUT, async f => {
    if (!f.endsWith('.jsx')) return;
    const {
      code
    } = await transform(await fs.readFile(f, 'utf8'), {
      ...ES,
      sourcefile: path.relative(OUT, f)
    });
    await fs.writeFile(f.replace(/\.jsx$/, '.js'), code);
    await fs.rm(f);
    nJsx++;
  });

  // 2. HTML: swap CDN dev builds for self-hosted prod builds, drop Babel, point at compiled JS, compile inline JSX.
  let nHtml = 0;
  await walk(OUT, async f => {
    if (!f.endsWith('.html')) return;
    let h = await fs.readFile(f, 'utf8');
    const orig = h;
    const rel = path.relative(path.dirname(f), OUT).split(path.sep).join('/') || '.';
    h = h.replace(/<script[^>]+unpkg\.com\/react@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/react.production.min.js"></script>`).replace(/<script[^>]+unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/react-dom.production.min.js"></script>`).replace(/<script[^>]+unpkg\.com\/three@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/three.min.js"></script>`).replace(/<script[^>]+@babel\/standalone[^"]+"[^>]*><\/script>\n?/g, '').replace(/<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g, '<script src="$1.js"></script>');
    const inline = [...h.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];
    for (const m of inline) {
      const {
        code
      } = await transform(m[1], {
        ...ES,
        sourcefile: path.relative(OUT, f) + ':inline'
      });
      h = h.replace(m[0], () => '<script>' + code + '</script>');
    }
    if (SITE_URL && path.relative(OUT, f) === 'index.html') {
      const og = await fs.access(path.join(OUT, 'og-image.png')).then(() => `<meta property="og:image" content="${SITE_URL}/og-image.png">`, () => '');
      h = h.replace('</head>', `<link rel="canonical" href="${SITE_URL}/"><meta property="og:url" content="${SITE_URL}/">${og}\n</head>`);
    }
    if (h !== orig) {
      await fs.writeFile(f, h);
      nHtml++;
    }
  });

  // 3. SEO files
  if (SITE_URL) {
    await fs.appendFile(path.join(OUT, 'robots.txt'), `Sitemap: ${SITE_URL}/sitemap.xml\n`);
    const today = new Date().toISOString().slice(0, 10);
    await fs.writeFile(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>\n  <url><loc>${SITE_URL}/design/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
  } else console.warn('! SITE_URL not set — canonical, og:url and sitemap.xml were skipped.');
  console.log(`✓ dist/ ready — ${nJsx} JSX files compiled, ${nHtml} HTML files rewritten.`);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "scripts/build.cjs", error: String((e && e.message) || e) }); }

// scripts/check-data.cjs
try { (() => {
// Validates data/*.json against the schema in data/README.md. Run before every deploy: npm run check
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const read = async n => JSON.parse(await fs.readFile(path.join(__dirname, '..', 'data', n + '.json'), 'utf8'));
  const errors = [];
  const err = m => errors.push(m);
  const MATS = ['pla', 'petg', 'tpu', 'loop'];
  const products = (await read('products')).items || [];
  const stock = await read('stock');
  const pricing = await read('pricing');
  const models = (await read('models')).items || [];
  const ids = new Set();
  products.forEach((p, i) => {
    const at = 'products[' + i + '] ' + (p.id || '');
    if (!p.id || ids.has(p.id)) err(at + ': missing or duplicate id');
    ids.add(p.id);
    if (!p.name || !p.name.en || !p.name.ar) err(at + ': name.en and name.ar required');
    if (!(p.price > 0)) err(at + ': price must be > 0');
    if (!Array.isArray(p.materials) || !p.materials.length || p.materials.some(m => !MATS.includes(m))) err(at + ': materials must be from ' + MATS.join('/'));
    if (p.source && (!p.source.designer || !p.source.url || !p.source.licence)) err(at + ': community items need source.designer, source.url and source.licence');
  });
  (stock.items || []).forEach((f, i) => {
    if (!/^#[0-9a-f]{6}$/i.test(f.hex)) err('stock[' + i + ']: hex must be #RRGGBB');
    if (!MATS.includes(f.material)) err('stock[' + i + ']: bad material');
    if (!(f.grams >= 0)) err('stock[' + i + ']: grams must be >= 0');
  });
  ['pla', 'petg', 'tpu'].forEach(m => {
    const r = pricing.materials && pricing.materials[m];
    if (!r || !(r.density > 0) || !(r.perGram > 0)) err('pricing.materials.' + m + ': density and perGram required');
  });
  models.forEach((m, i) => {
    if (!m.id || !Array.isArray(m.parts) || !m.parts.length) err('models[' + i + ']: id and parts required');
  });
  if (errors.length) {
    console.error('✗ ' + errors.length + ' data problem(s):\n  ' + errors.join('\n  '));
    process.exit(1);
  }
  console.log('✓ data OK — ' + products.length + ' products, ' + (stock.items || []).length + ' filaments, ' + models.length + ' studio models');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "scripts/check-data.cjs", error: String((e && e.message) || e) }); }

// site.config.js
try { (() => {
// Runtime config for the Bara' website. The only file you edit per environment.
// Every source/endpoint is optional: unset sources fall back to /data/*.json, unset endpoints
// make the matching feature degrade gracefully (hidden or "email us" fallback) — never fake data.
window.BARA_CONFIG = {
  contactEmail: '',
  // e.g. 'hello@yourdomain.sa' — used as fallback when an endpoint is not set
  whatsapp: '',
  // international format without +, e.g. '9665XXXXXXXX'
  mapsUrl: '',
  // Google/Apple Maps link to the studio

  // Read sources (GET → JSON). null = bundled file in /data. Point at your CMS/API when ready.
  sources: {
    products: null,
    // → data/products.json
    stock: null,
    // → data/stock.json
    models: null,
    // → data/models.json
    pricing: null // → data/pricing.json
  },
  // Write / live endpoints. Empty string = feature not connected.
  endpoints: {
    quote: '',
    // POST multipart: file, material, speed, notes, email, lang
    sell: '',
    // POST multipart: file, title, kind, link, licence, email, lang
    corner: '',
    // POST JSON: name, company, city, size, phone, email, lang
    checkout: '',
    // POST JSON {items, lang} → { url } (payment-provider redirect)
    floor: '',
    // GET → [{ id, item, hex, printer, layer, total, status }] live print queue
    creator: '',
    // GET (credentials) → { points, listings: [...] }
    stock: '' // PUT JSON [stock rows] — staff saves from Filament Studio
  },
  floorPollMs: 10000,
  requestTimeoutMs: 12000
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "site.config.js", error: String((e && e.message) || e) }); }

// ui_kits/filament-studio/Panels.jsx
try { (() => {
const S = window.InfillDesignSystem_d33a9b;
const stMono = {
  font: '600 11px/1.2 var(--font-mono)',
  letterSpacing: '.08em',
  textTransform: 'uppercase'
};
const ST_TONE = {
  in: ['success', 'In stock'],
  low: ['warning', 'Low'],
  out: ['danger', 'Out']
};
const ST_MATS = [{
  id: 'pla',
  label: 'PLA'
}, {
  id: 'petg',
  label: 'PETG'
}, {
  id: 'tpu',
  label: 'TPU'
}, {
  id: 'loop',
  label: 'Loop'
}];
function StockDot({
  grams
}) {
  const s = baraStockStatus(grams);
  return /*#__PURE__*/React.createElement("span", {
    title: ST_TONE[s][1],
    style: {
      position: 'absolute',
      right: -3,
      top: -3,
      width: 12,
      height: 12,
      borderRadius: 999,
      border: '2px solid var(--paper-0)',
      background: s === 'in' ? 'var(--success)' : s === 'low' ? 'var(--warning)' : 'var(--danger)'
    }
  });
}
function FilamentGrid({
  stock,
  mat,
  selectedId,
  onPick,
  staff
}) {
  const list = stock.filter(f => f.material === mat);
  const lines = [...new Set(list.map(f => f.line))];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, lines.map(ln => /*#__PURE__*/React.createElement("div", {
    key: ln,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...stMono,
      color: 'var(--fg-3)'
    }
  }, ln), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 10
    }
  }, list.filter(f => f.line === ln).map(f => {
    const out = baraStockStatus(f.grams) === 'out';
    const dis = out && !staff;
    const sel = f.id === selectedId;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => !dis && onPick(f),
      title: f.name + (out ? ' — out of stock' : ''),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: 0,
        border: 0,
        background: 'none',
        cursor: dis ? 'not-allowed' : 'pointer',
        opacity: dis ? .4 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        width: 44,
        height: 44,
        borderRadius: 999,
        background: f.hex,
        border: '2px solid var(--graphite-900)',
        boxShadow: sel ? '0 0 0 3px var(--paper-0), 0 0 0 5px var(--graphite-900)' : '2px 2px 0 var(--graphite-900)',
        backgroundImage: f.finish === 'silk' ? 'linear-gradient(135deg, rgba(255,255,255,.55), transparent 45%, rgba(0,0,0,.18))' : f.finish === 'translucent' ? 'linear-gradient(135deg, rgba(255,255,255,.6), transparent 60%)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: '32%',
        borderRadius: 999,
        background: 'var(--paper-0)',
        border: '2px solid var(--graphite-900)'
      }
    }), /*#__PURE__*/React.createElement(StockDot, {
      grams: f.grams
    }), out && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -2,
        right: -2,
        top: '50%',
        height: 2,
        background: 'var(--graphite-900)',
        transform: 'rotate(-35deg)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 12px/1.1 var(--font-body)',
        color: 'var(--fg-1)',
        textAlign: 'center'
      }
    }, f.name));
  })))), !list.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(S.Mascot, {
    pose: "sleepy",
    color: "loop",
    size: 64
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.4 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, "Nothing on this shelf yet.")));
}
function FilamentDetail({
  fil,
  staff,
  onAdjust
}) {
  if (!fil) return null;
  const s = baraStockStatus(fil.grams);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      padding: 14,
      borderRadius: 14,
      border: '2px solid var(--graphite-900)',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      flexShrink: 0,
      borderRadius: 12,
      background: fil.hex,
      border: '2px solid var(--graphite-900)',
      backgroundImage: 'var(--tex-layers-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 18px/1.1 var(--font-display)'
    }
  }, fil.name), /*#__PURE__*/React.createElement("span", {
    dir: "rtl",
    style: {
      font: '600 14px/1 var(--font-arabic)',
      color: 'var(--fg-3)'
    }
  }, fil.ar)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...stMono,
      fontSize: 10.5,
      color: 'var(--fg-3)'
    }
  }, fil.line, " \xB7 ", fil.finish, " \xB7 ", fil.hex), staff && /*#__PURE__*/React.createElement("span", {
    style: {
      ...stMono,
      fontSize: 10.5
    }
  }, (fil.grams / 1000).toFixed(2), " kg \xB7 shelf ", fil.shelf)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(S.Badge, {
    tone: ST_TONE[s][0],
    dot: true
  }, ST_TONE[s][1]), staff && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(S.IconButton, {
    icon: "minus",
    label: "Use 250 g",
    size: "sm",
    onClick: () => onAdjust(fil.id, -250)
  }), /*#__PURE__*/React.createElement(S.IconButton, {
    icon: "plus",
    label: "Add 1 kg spool",
    size: "sm",
    variant: "primary",
    onClick: () => onAdjust(fil.id, 1000)
  }))));
}
function StockManager({
  stock,
  setStock,
  toast
}) {
  const [draft, setDraft] = React.useState({
    name: '',
    hex: '#F2B705',
    material: 'pla',
    line: 'House PLA Matte',
    finish: 'matte',
    grams: 1000,
    shelf: ''
  });
  const upd = (id, patch) => setStock(stock.map(f => f.id === id ? {
    ...f,
    ...patch
  } : f));
  const add = () => {
    if (!draft.name.trim()) return;
    const id = draft.material + '-' + draft.name.toLowerCase().replace(/\W+/g, '-') + '-' + Date.now().toString(36).slice(-3);
    setStock([...stock, {
      ...draft,
      id,
      ar: '',
      grams: +draft.grams || 0
    }]);
    setDraft({
      ...draft,
      name: ''
    });
    toast({
      tone: 'success',
      title: 'Filament added',
      message: draft.name + ' is now on the shelf.'
    });
  };
  const cell = {
    padding: '10px 12px',
    borderTop: '1.5px solid var(--border-1)',
    font: '500 14px/1.2 var(--font-body)',
    verticalAlign: 'middle'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--paper-2)'
    }
  }, ['Colour', 'Line', 'Shelf', 'On hand', 'Status', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      ...stMono,
      fontSize: 10.5,
      textAlign: 'left',
      padding: '10px 12px',
      color: 'var(--fg-2)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, stock.map(f => {
    const s = baraStockStatus(f.grams);
    return /*#__PURE__*/React.createElement("tr", {
      key: f.id
    }, /*#__PURE__*/React.createElement("td", {
      style: cell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 999,
        background: f.hex,
        border: '2px solid var(--graphite-900)'
      }
    }), /*#__PURE__*/React.createElement("b", null, f.name))), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        ...stMono,
        fontSize: 11,
        color: 'var(--fg-2)'
      }
    }, f.line), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        ...stMono,
        fontSize: 11
      }
    }, f.shelf), /*#__PURE__*/React.createElement("td", {
      style: cell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "50",
      value: f.grams,
      onChange: e => upd(f.id, {
        grams: Math.max(0, +e.target.value)
      }),
      style: {
        width: 76,
        height: 32,
        border: '2px solid var(--border-2)',
        borderRadius: 8,
        padding: '0 8px',
        font: '600 13px/1 var(--font-mono)',
        background: 'var(--paper-0)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...stMono,
        fontSize: 10,
        color: 'var(--fg-3)'
      }
    }, "g"))), /*#__PURE__*/React.createElement("td", {
      style: cell
    }, /*#__PURE__*/React.createElement(S.Badge, {
      tone: ST_TONE[s][0],
      dot: true
    }, ST_TONE[s][1])), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(S.IconButton, {
      icon: "plus",
      label: "+1 kg spool",
      size: "sm",
      variant: "ghost",
      onClick: () => upd(f.id, {
        grams: f.grams + 1000
      })
    }), /*#__PURE__*/React.createElement(S.IconButton, {
      icon: "trash-2",
      label: "Remove",
      size: "sm",
      variant: "ghost",
      onClick: () => setStock(stock.filter(x => x.id !== f.id))
    }))));
  })))), /*#__PURE__*/React.createElement(S.Card, {
    variant: "raised",
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-h4"
  }, "Add a filament"), /*#__PURE__*/React.createElement(S.Input, {
    label: "Colour name",
    placeholder: "e.g. Midnight",
    value: draft.name,
    onChange: e => setDraft({
      ...draft,
      name: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(S.Select, {
    label: "Material",
    value: draft.material,
    onChange: e => setDraft({
      ...draft,
      material: e.target.value
    }),
    options: ST_MATS.map(m => ({
      value: m.id,
      label: m.label
    }))
  }), /*#__PURE__*/React.createElement(S.Select, {
    label: "Finish",
    value: draft.finish,
    onChange: e => setDraft({
      ...draft,
      finish: e.target.value
    }),
    options: ['matte', 'silk', 'gloss', 'satin', 'translucent', 'speckle']
  })), /*#__PURE__*/React.createElement(S.Input, {
    label: "Line / brand",
    value: draft.line,
    onChange: e => setDraft({
      ...draft,
      line: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0,1fr) minmax(0,1fr)',
      gap: 12,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      font: '700 14px/1.2 var(--font-body)'
    }
  }, "Hex", /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: draft.hex,
    onChange: e => setDraft({
      ...draft,
      hex: e.target.value
    }),
    style: {
      width: 48,
      height: 44,
      border: '2px solid var(--graphite-900)',
      borderRadius: 12,
      padding: 2,
      background: 'var(--paper-0)'
    }
  })), /*#__PURE__*/React.createElement(S.Input, {
    label: "Grams",
    type: "number",
    value: draft.grams,
    suffix: "g",
    onChange: e => setDraft({
      ...draft,
      grams: e.target.value
    })
  }), /*#__PURE__*/React.createElement(S.Input, {
    label: "Shelf",
    placeholder: "A5",
    value: draft.shelf,
    onChange: e => setDraft({
      ...draft,
      shelf: e.target.value
    })
  })), /*#__PURE__*/React.createElement(S.Button, {
    icon: "plus",
    onClick: add,
    disabled: !draft.name.trim()
  }, "Add to stock"), /*#__PURE__*/React.createElement(S.Button, {
    variant: "ghost",
    size: "sm",
    icon: "rotate-ccw",
    onClick: () => {
      baraApi.get('stock', {
        fresh: true
      }).then(d => {
        setStock(d.items || d);
        toast({
          tone: 'info',
          title: 'Stock reloaded',
          message: 'Back to the published list.'
        });
      }).catch(() => toast({
        tone: 'danger',
        title: 'Couldn’t reload stock'
      }));
    }
  }, "Reset to sample list"))));
}
function CatalogTint({
  models,
  fil,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 24
    }
  }, models.map(m => /*#__PURE__*/React.createElement(S.Card, {
    key: m.id,
    padding: 0,
    interactive: true,
    onClick: () => onOpen(m.id),
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1',
      background: 'var(--paper-2)',
      borderBottom: '2px solid var(--graphite-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '14% 18%',
      borderRadius: m.id === 'taba' ? '48% 48% 38% 38% / 56% 56% 44% 44%' : m.id === 'planter' ? '6% 6% 30% 30%' : 14,
      background: '#d8d8d8',
      backgroundImage: 'var(--tex-layers-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: fil.hex,
      mixBlendMode: 'multiply',
      opacity: .92
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 10,
      ...stMono,
      fontSize: 9.5,
      background: 'rgba(252,250,244,.9)',
      padding: '4px 6px 3px',
      borderRadius: 6
    }
  }, "Neutral photo \xD7 multiply tint")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 16px/1.2 var(--font-display)'
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 17px/1 var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...stMono,
      fontSize: 10,
      marginRight: 3
    }
  }, "SAR"), m.price)))));
}
Object.assign(window, {
  S,
  stMono,
  ST_TONE,
  ST_MATS,
  FilamentGrid,
  FilamentDetail,
  StockManager,
  CatalogTint
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-studio/Panels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-studio/Viewer3D.jsx
try { (() => {
// Three.js r149 UMD (window.THREE). Simple on-brand stand-in models until real STLs are loaded.
const vwInk = 0x16161a;
function vwMakeMaterial(fil, layerU) {
  const hex = new THREE.Color(fil ? fil.hex : '#F2B705').convertSRGBToLinear();
  const f = fil ? fil.finish : 'matte';
  const opts = {
    color: hex,
    roughness: .85,
    metalness: 0
  };
  if (f === 'silk') Object.assign(opts, {
    roughness: .28,
    metalness: .45,
    clearcoat: .6
  });
  if (f === 'gloss') Object.assign(opts, {
    roughness: .32,
    clearcoat: .35
  });
  if (f === 'satin') Object.assign(opts, {
    roughness: .55
  });
  if (f === 'translucent') Object.assign(opts, {
    roughness: .18,
    transmission: .55,
    thickness: .6,
    transparent: true,
    opacity: .92
  });
  const m = new THREE.MeshPhysicalMaterial(opts);
  m.onBeforeCompile = sh => {
    sh.uniforms.uLayer = layerU;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vWY;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed,1.0)).y;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vWY;\nuniform float uLayer;').replace('#include <color_fragment>', '#include <color_fragment>\nfloat ly = fract(vWY * 42.0);\nfloat ln = smoothstep(0.0,0.22,ly)*smoothstep(1.0,0.78,ly);\ndiffuseColor.rgb *= mix(1.0, mix(0.8,1.0,ln), uLayer);');
  };
  return m;
}
function vwMesh(geo, part) {
  const m = new THREE.Mesh(geo);
  m.userData.part = part;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
function vwFixed(geo, color) {
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).convertSRGBToLinear(),
    roughness: .5
  }));
  m.castShadow = true;
  return m;
}
function vwBuild(id) {
  const g = new THREE.Group();
  if (id === 'tower') {
    const tray = vwMesh(new THREE.CylinderGeometry(1.05, 1.05, .22, 6), 'base');
    tray.position.y = .11;
    g.add(tray);
    const lip = vwMesh(new THREE.TorusGeometry(.98, .06, 8, 6), 'base');
    lip.rotation.x = Math.PI / 2;
    lip.rotation.z = Math.PI / 6;
    lip.position.y = .24;
    g.add(lip);
    const tower = vwMesh(new THREE.CylinderGeometry(.5, .56, 1.9, 6), 'body');
    tower.position.set(-.3, 1.17, -.3);
    g.add(tower);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const c = vwMesh(new THREE.BoxGeometry(.2, .22, .2), 'body');
      c.position.set(-.3 + Math.cos(a) * .42, 2.22, -.3 + Math.sin(a) * .42);
      c.rotation.y = -a;
      g.add(c);
    }
    const chute = vwMesh(new THREE.BoxGeometry(.5, .14, .7), 'body');
    chute.position.set(-.05, .4, .25);
    chute.rotation.x = .35;
    chute.rotation.y = -.7;
    g.add(chute);
    const hole = vwFixed(new THREE.BoxGeometry(.32, .36, .1), vwInk);
    hole.position.set(-.05, .48, .17);
    hole.rotation.y = -.7;
    g.add(hole);
  } else if (id === 'taba') {
    const tube = (pts, r, part) => {
      const cv = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
      g.add(vwMesh(new THREE.TubeGeometry(cv, 220, r, 14, false), part));
    };
    const coil = (cx, cy, cz, R, turns, rise, phase) => Array.from({
      length: turns * 12 + 1
    }, (_, i) => {
      const t = i / 12 * Math.PI * 2 + phase;
      const rr = R * (1 - i / (turns * 12 + 1) * .35);
      return [cx + Math.cos(t) * rr, cy + i * rise, cz + Math.sin(t) * rr];
    });
    tube(coil(0, .14, 0, .78, 3, .022, 0), .13, 'body');
    tube(coil(-.1, .34, .05, .5, 2, .03, 1.4), .12, 'hat');
    tube(coil(.05, .72, -.05, .32, 2, .028, 2.6), .11, 'body');
    tube([[.7, .2, .3], [.95, .45, .1], [1.05, .75, .2], [.92, .98, .05]], .09, 'hat');
    tube([[-.75, .15, -.2], [-1.0, .3, .2], [-.9, .55, .4]], .09, 'body');
    const face = new THREE.Group();
    face.position.set(0, .82, .62);
    g.add(face);
    g.userData.face = face;
    [-1, 1].forEach(s => {
      const eye = vwFixed(new THREE.SphereGeometry(.15, 24, 16), 0xffffff);
      eye.position.set(s * .2, .05, 0);
      eye.scale.z = .5;
      face.add(eye);
      const pup = vwFixed(new THREE.SphereGeometry(.07, 16, 12), vwInk);
      pup.position.set(s * .2, .04, .07);
      face.add(pup);
    });
    const mouth = vwFixed(new THREE.TorusGeometry(.09, .022, 8, 24, Math.PI), vwInk);
    mouth.position.set(0, -.17, .04);
    mouth.rotation.z = Math.PI;
    face.add(mouth);
  } else if (id === 'planter') {
    const p = [[0, .14], [.5, .14], [.62, .5], [.72, 1.0], [.78, 1.32], [.82, 1.4], [.74, 1.4], [.68, 1.28], [.6, .9], [.48, .24], [0, .24]].map(([x, y]) => new THREE.Vector2(x, y));
    const pot = vwMesh(new THREE.LatheGeometry(p, 10), 'body');
    g.add(pot);
    const soil = vwFixed(new THREE.CircleGeometry(.66, 10), 0x3b2b1e);
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 1.22;
    g.add(soil);
    const saucer = vwMesh(new THREE.CylinderGeometry(.82, .74, .14, 10), 'base');
    saucer.position.y = .07;
    g.add(saucer);
  } else {
    const s = new THREE.Shape();
    s.moveTo(-.55, 0);
    s.lineTo(-.14, 0);
    s.lineTo(0, .38);
    s.lineTo(.14, 0);
    s.lineTo(.55, 0);
    s.quadraticCurveTo(.48, .5, .26, .72);
    s.lineTo(.72, .86);
    s.quadraticCurveTo(.84, 1.06, .6, 1.12);
    s.lineTo(.24, 1.08);
    s.absarc(0, 1.34, .3, -.9, Math.PI + .9, false);
    s.lineTo(-.24, 1.08);
    s.lineTo(-.6, 1.12);
    s.quadraticCurveTo(-.84, 1.06, -.72, .86);
    s.lineTo(-.26, .72);
    s.quadraticCurveTo(-.48, .5, -.55, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: .38,
      bevelEnabled: true,
      bevelThickness: .04,
      bevelSize: .04,
      bevelSegments: 3,
      curveSegments: 24
    });
    geo.translate(0, .12, -.19);
    const m = vwMesh(geo, 'body');
    m.scale.setScalar(1.25);
    m.position.y = -.03;
    g.add(m);
    const stand = vwMesh(new THREE.CylinderGeometry(.8, .84, .14, 40), 'base');
    stand.position.y = .07;
    g.add(stand);
  }
  return g;
}
const VW_LIGHTS = {
  daylight: {
    bg: '#F5F0E4',
    build: L => {
      L.add(new THREE.HemisphereLight(0xfff7e8, 0xcfc4ad, .85));
      const d = new THREE.DirectionalLight(0xfff0d6, 1.5);
      d.position.set(4, 6, 3);
      L.add(d);
      return d;
    }
  },
  studio: {
    bg: '#24242A',
    build: L => {
      L.add(new THREE.AmbientLight(0xffffff, .25));
      const k = new THREE.DirectionalLight(0xffffff, 1.4);
      k.position.set(-3, 5, 4);
      L.add(k);
      const r = new THREE.DirectionalLight(0xbcd2ff, 1.1);
      r.position.set(3, 3, -4);
      L.add(r);
      const f = new THREE.DirectionalLight(0xffffff, .35);
      f.position.set(4, 1, 3);
      L.add(f);
      return k;
    }
  },
  shelf: {
    bg: '#D9D0BA',
    build: L => {
      L.add(new THREE.AmbientLight(0xffe6c4, .3));
      const s = new THREE.SpotLight(0xffd9a0, 2.2, 20, .5, .6);
      s.position.set(.5, 6, 2);
      L.add(s);
      L.add(s.target);
      return s;
    }
  }
};
function Viewer3D({
  modelId = 'tower',
  colors = {},
  lighting = 'daylight',
  layers = true,
  autoRotate = true,
  height = 480,
  radius = 18,
  label
}) {
  const host = React.useRef(null);
  const st = React.useRef(null);
  React.useEffect(() => {
    const el = host.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NoToneMapping;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({
      opacity: .2
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    const lights = new THREE.Group();
    scene.add(lights);
    const pivot = new THREE.Group();
    scene.add(pivot);
    const s = {
      renderer,
      scene,
      camera,
      lights,
      pivot,
      theta: .35,
      phi: 1.15,
      r: 8.2,
      drag: null,
      auto: autoRotate,
      layerU: {
        value: layers ? 1 : 0
      },
      model: null
    };
    st.current = s;
    const place = () => {
      const t = new THREE.Vector3(0, .95, 0);
      camera.position.set(t.x + s.r * Math.sin(s.phi) * Math.sin(s.theta), t.y + s.r * Math.cos(s.phi), t.z + s.r * Math.sin(s.phi) * Math.cos(s.theta));
      camera.lookAt(t);
    };
    const size = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(el);
    size();
    let raf;
    const loop = () => {
      if (s.auto && !s.drag) s.theta += .004;
      if (s.model && s.model.userData.face) {
        const f = s.model.userData.face;
        f.position.y = .82 + Math.sin(performance.now() / 450) * .04;
        f.lookAt(camera.position.x, f.position.y, camera.position.z);
      }
      place();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    const down = e => {
      s.drag = {
        x: e.clientX,
        y: e.clientY,
        t: s.theta,
        p: s.phi
      };
      el.setPointerCapture(e.pointerId);
    };
    const move = e => {
      if (!s.drag) return;
      s.theta = s.drag.t - (e.clientX - s.drag.x) * .01;
      s.phi = Math.max(.35, Math.min(1.5, s.drag.p - (e.clientY - s.drag.y) * .008));
    };
    const up = () => {
      s.drag = null;
    };
    const wheel = e => {
      e.preventDefault();
      s.r = Math.max(4, Math.min(12, s.r + e.deltaY * .005));
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('wheel', wheel, {
      passive: false
    });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      el.innerHTML = '';
    };
  }, []);
  React.useEffect(() => {
    const s = st.current;
    if (!s) return;
    if (s.model) s.pivot.remove(s.model);
    s.model = vwBuild(modelId);
    s.pivot.add(s.model);
    s.applied = null;
  }, [modelId]);
  React.useEffect(() => {
    const s = st.current;
    if (!s || !s.model) return;
    const mats = {};
    s.model.traverse(o => {
      if (o.userData.part) {
        const p = o.userData.part;
        mats[p] = mats[p] || vwMakeMaterial(colors[p] || colors.body, s.layerU);
        if (o.material && o.material.dispose) o.material.dispose();
        o.material = mats[p];
      }
    });
  }, [modelId, colors.body && colors.body.id, colors.base && colors.base.id, colors.hat && colors.hat.id, colors.body && colors.body.hex]);
  React.useEffect(() => {
    const s = st.current;
    if (s) s.layerU.value = layers ? 1 : 0;
  }, [layers]);
  React.useEffect(() => {
    const s = st.current;
    if (s) s.auto = autoRotate;
  }, [autoRotate]);
  React.useEffect(() => {
    const s = st.current;
    if (!s) return;
    s.lights.clear();
    const p = VW_LIGHTS[lighting] || VW_LIGHTS.daylight;
    const key = p.build(s.lights);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -.0005;
    if (key.shadow.camera.isOrthographicCamera) Object.assign(key.shadow.camera, {
      left: -3,
      right: 3,
      top: 3,
      bottom: -3
    });
    s.scene.background = new THREE.Color(p.bg).convertSRGBToLinear();
  }, [lighting]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      borderRadius: radius,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)',
      cursor: 'grab',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: host,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 10,
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(window, {
  Viewer3D
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-studio/Viewer3D.jsx", error: String((e && e.message) || e) }); }

// ui_kits/filament-studio/stock.js
try { (() => {
// Filament stock helpers. Data lives in data/stock.json + data/models.json (or BARA_CONFIG.sources) — loaded through baraApi.
// Status: grams >= thresholds.in → in, >= thresholds.low → low, else out.
window.baraStockStatus = g => {
  const th = window.BARA_THRESHOLDS || {
    in: 1500,
    low: 300
  };
  return g >= th.in ? 'in' : g >= th.low ? 'low' : 'out';
};
window.baraLoadStudio = async () => {
  const [stock, models] = await Promise.all([baraApi.get('stock'), baraApi.get('models')]);
  window.BARA_THRESHOLDS = stock.thresholds || window.BARA_THRESHOLDS;
  window.BARA_MODELS = models.items || models;
  return {
    stock: stock.items || stock,
    models: window.BARA_MODELS
  };
};
// Staff saves go to BARA_CONFIG.endpoints.stock. Without it, edits stay as a local draft on this device only.
window.baraSaveStock = async list => {
  if (baraApi.configured('stock')) {
    await baraApi.send('stock', list, 'PUT');
    return 'saved';
  }
  try {
    localStorage.setItem('bara-stock-draft', JSON.stringify(list));
  } catch (e) {}
  return 'draft';
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/filament-studio/stock.js", error: String((e && e.message) || e) }); }

// ui_kits/kiosk/Kiosk.jsx
try { (() => {
const KDS = window.InfillDesignSystem_d33a9b;
function KioskTop({
  title,
  onBack,
  lang,
  setLang
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 88,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '0 32px',
      borderBottom: '2px solid var(--graphite-900)',
      background: 'var(--paper-1)'
    }
  }, onBack ? /*#__PURE__*/React.createElement(KDS.IconButton, {
    icon: "arrow-left",
    label: "Back",
    size: "lg",
    onClick: onBack
  }) : /*#__PURE__*/React.createElement(KDS.Wordmark, {
    size: 36
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 28px/1 var(--font-display)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1 var(--font-mono)',
      color: 'var(--fg-3)',
      letterSpacing: '.08em'
    }
  }, "3D CORNER \xB7 RIYADH PARK"), /*#__PURE__*/React.createElement(KDS.Button, {
    variant: "secondary",
    onClick: () => setLang(lang === 'en' ? 'ar' : 'en'),
    style: {
      fontFamily: 'var(--font-arabic)'
    }
  }, lang === 'en' ? 'عربي' : 'English'));
}
function KioskWelcome({
  go,
  lang
}) {
  const ar = lang === 'ar';
  const tiles = [{
    id: 'pickup',
    icon: 'package-open',
    t: ar ? 'استلم طلبك' : 'Pick up an order',
    s: ar ? 'دخّل الرمز اللي وصلك' : 'Enter your 6-digit code',
    bg: 'var(--yolk-500)',
    fg: 'var(--graphite-900)'
  }, {
    id: 'print',
    icon: 'printer',
    t: ar ? 'اطبع لك شي' : 'Print something',
    s: ar ? 'من عندنا أو من جوالك' : 'From our catalog or your phone',
    bg: 'var(--mat-pla)',
    fg: '#fff'
  }, {
    id: 'recycle',
    icon: 'recycle',
    t: ar ? 'رجّع طبعاتك' : 'Recycle prints',
    s: ar ? '٢٠ ريال رصيد على كل كيلو' : 'Get SAR 20 credit per kilo',
    bg: 'var(--mat-loop)',
    fg: '#fff'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 72px/.95 var(--font-display)',
      letterSpacing: '-.025em'
    }
  }, ar ? 'هلا! وش نطبع اليوم؟' : "Hi! What are we making?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 20px/1.4 var(--font-body)',
      color: 'var(--fg-2)',
      marginTop: 10
    }
  }, ar ? 'اختر وحدة ونبدأ.' : 'Tap a tile to start. The printers behind you are already warm.')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 28
    }
  }, tiles.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => go(t.id),
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 28,
      background: t.bg,
      color: t.fg,
      boxShadow: 'var(--shadow-hard-lg)',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'start',
      cursor: 'pointer',
      backgroundImage: 'var(--tex-layers-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 24,
      background: 'var(--paper-0)',
      color: 'var(--graphite-900)',
      border: '2px solid var(--graphite-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(KDS.Icon, {
    name: t.icon,
    size: 44
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: '800 40px/1 var(--font-display)'
    }
  }, t.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: '600 18px/1.35 var(--font-body)',
      marginTop: 10
    }
  }, t.s))))));
}
function KioskPickup({
  go
}) {
  const [code, setCode] = React.useState('');
  const done = code.length === 6;
  const press = k => setCode(c => k === 'del' ? c.slice(0, -1) : c.length < 6 ? c + k : c);
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      padding: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(KDS.Badge, {
    tone: "success",
    dot: true,
    style: {
      alignSelf: 'flex-start',
      height: 32,
      fontSize: 15,
      padding: '0 14px'
    }
  }, "Ready for pickup"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 64px/.95 var(--font-display)'
    }
  }, "Locker 4 is open."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 20px/1.45 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, "Order #B-0412 \xB7 Hex Dice Tower (PLA, Yolk) and 20 meeples. 212 + 1,840 layers. You're welcome."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    onClick: () => go('welcome')
  }, "Done"), /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    variant: "secondary",
    icon: "recycle",
    onClick: () => go('recycle')
  }, "Recycle something too"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 14
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      aspectRatio: '1',
      borderRadius: 18,
      border: '2px solid var(--graphite-900)',
      background: n === 4 ? 'var(--yolk-500)' : 'var(--paper-0)',
      boxShadow: n === 4 ? 'var(--shadow-hard)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '800 40px/1 var(--font-mono)',
      color: n === 4 ? 'var(--graphite-900)' : 'var(--graphite-300)'
    }
  }, n))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 420px',
      gap: 48,
      padding: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 56px/1 var(--font-display)'
    }
  }, "Enter your pickup code"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 19px/1.4 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, "It's in the SMS we sent when your print came off the bed."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 76,
      height: 96,
      borderRadius: 18,
      border: '2px solid var(--graphite-900)',
      background: code[i] ? 'var(--yolk-500)' : 'var(--paper-0)',
      boxShadow: i === code.length ? '4px 4px 0 var(--yolk-500)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '800 48px/1 var(--font-mono)'
    }
  }, code[i] || '')))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 14
    }
  }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k, i) => k === '' ? /*#__PURE__*/React.createElement("span", {
    key: i
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => press(k),
    style: {
      height: 96,
      borderRadius: 20,
      border: '2px solid var(--graphite-900)',
      background: k === 'del' ? 'var(--paper-2)' : 'var(--paper-0)',
      boxShadow: 'var(--shadow-hard-sm)',
      font: '800 40px/1 var(--font-mono)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, k === 'del' ? /*#__PURE__*/React.createElement(KDS.Icon, {
    name: "delete",
    size: 32
  }) : k))));
}
function KioskRecycle({
  go
}) {
  const [step, setStep] = React.useState(0);
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    if (step !== 1) return;
    const t = setInterval(() => setW(x => {
      if (x >= 1.34) {
        clearInterval(t);
        setStep(2);
        return 1.34;
      }
      return +(x + .06).toFixed(2);
    }), 60);
    return () => clearInterval(t);
  }, [step]);
  const credit = Math.round(w * 20);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--mat-loop)'
    }
  }, "Bara' Loop"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 56px/1 var(--font-display)'
    }
  }, step === 0 ? 'Put your scraps on the scale.' : step === 1 ? 'Weighing your spaghetti…' : 'Nice haul.'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 19px/1.45 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, "PLA and PETG only, please. Failed prints, supports, rafts, test cubes \u2014 all welcome. No resin, no metal."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [['pla', 'PLA ✓'], ['petg', 'PETG ✓']].map(([k, l]) => /*#__PURE__*/React.createElement(KDS.Tag, {
    key: k,
    material: k,
    style: {
      height: 36,
      fontSize: 14
    }
  }, l)), /*#__PURE__*/React.createElement(KDS.Tag, {
    style: {
      height: 36,
      fontSize: 14,
      opacity: .5
    }
  }, "TPU \u2014 not yet")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      gap: 16
    }
  }, step === 0 && /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    icon: "scale",
    onClick: () => setStep(1)
  }, "Start weighing"), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    icon: "check",
    onClick: () => go('welcome')
  }, "Add SAR ", credit, " credit"), /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => {
      setW(0);
      setStep(0);
    }
  }, "Weigh more")))), /*#__PURE__*/React.createElement(KDS.Card, {
    variant: "inverse",
    texture: "bed",
    padding: 32,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 14px/1 var(--font-mono)',
      letterSpacing: '.1em',
      color: 'var(--graphite-400)'
    }
  }, "SCALE \xB7 LIVE"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 140px/.9 var(--font-mono)',
      color: step === 2 ? 'var(--yolk-500)' : 'var(--paper-0)'
    }
  }, w.toFixed(2), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40,
      marginLeft: 12
    }
  }, "kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      borderRadius: 12,
      border: '2px solid var(--paper-0)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.min(100, w / 2 * 100) + '%',
      height: '100%',
      background: 'var(--mat-loop)',
      transition: 'width 60ms linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, [['Credit', 'SAR ' + credit], ['Becomes', '≈ ' + Math.round(w * 0.9 * 100) / 100 + ' kg Loop']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      border: '2px solid var(--graphite-700)',
      borderRadius: 14,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 11px/1 var(--font-mono)',
      letterSpacing: '.1em',
      color: 'var(--graphite-400)',
      textTransform: 'uppercase'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 26px/1 var(--font-display)',
      marginTop: 8
    }
  }, v)))))));
}
function KioskPrint({
  go
}) {
  const items = [['Meeple Pack ×20', 45, 'petg', '1 h 50 m'], ['Name Keychain', 15, 'pla', '22 m'], ['Phone Stand', 29, 'pla', '1 h 10 m'], ['Squish Grip', 35, 'tpu', '48 m']];
  const [sel, setSel] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 32,
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 48px/1 var(--font-display)'
    }
  }, "Print while you shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 20
    }
  }, items.map(([t, p, m, d], i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setSel(i),
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      padding: 14,
      borderRadius: 20,
      border: '2px solid var(--graphite-900)',
      background: sel === i ? 'var(--yolk-500)' : 'var(--paper-0)',
      boxShadow: sel === i ? 'var(--shadow-hard)' : 'none',
      cursor: 'pointer',
      textAlign: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      borderRadius: 12,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(KDS.MediaPlaceholder, {
    label: " ",
    tone: m,
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 22px/1.1 var(--font-display)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1 var(--font-mono)'
    }
  }, "SAR ", p, " \xB7 READY IN ", d.toUpperCase())))))), /*#__PURE__*/React.createElement(KDS.Card, {
    variant: "raised",
    padding: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--fg-3)'
    }
  }, "Queue"), [['Printer 2', 'Your job', .0], ['Printer 1', 'Busy · 64%', .64], ['Printer 3', 'Busy · 12%', .12]].map(([n, s, p], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: '600 14px/1 var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === 0 ? 'var(--success)' : 'var(--fg-3)'
    }
  }, s)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12,
      borderRadius: 6,
      background: 'var(--paper-2)',
      border: '1.5px solid var(--graphite-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: p * 100 + '%',
      height: '100%',
      background: 'var(--graphite-900)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: 'var(--graphite-900)',
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 36px/1 var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1 var(--font-mono)',
      marginRight: 6
    }
  }, "SAR"), items[sel][1]), /*#__PURE__*/React.createElement(KDS.Button, {
    size: "lg",
    fullWidth: true,
    icon: "printer",
    onClick: () => go('welcome')
  }, "Start printing"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.4 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, "We'll text you when it's done. Go get a coffee."))));
}
Object.assign(window, {
  KioskTop,
  KioskWelcome,
  KioskPickup,
  KioskRecycle,
  KioskPrint
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kiosk/Kiosk.jsx", error: String((e && e.message) || e) }); }

// ui_kits/packaging/Packaging.jsx
try { (() => {
const {
  Wordmark,
  MATERIALS,
  Icon
} = window.InfillDesignSystem_d33a9b;
const pkMono = {
  font: '600 11px/1.2 var(--font-mono)',
  letterSpacing: '.08em',
  textTransform: 'uppercase'
};
const pkColors = {
  pla: ['Yolk Yellow', 'أصفر صفار', '#F2B705'],
  petg: ['Lagoon Teal', 'فيروزي', '#12A5A0'],
  tpu: ['Bounce Blue', 'أزرق مرن', '#2F6BFF']
};
const pkSpecs = {
  pla: [['Ø', '1.75 mm'], ['Net', '1 kg'], ['Nozzle', '200–220 °C'], ['Bed', '50–60 °C']],
  petg: [['Ø', '1.75 mm'], ['Net', '1 kg'], ['Nozzle', '230–250 °C'], ['Bed', '70–80 °C']],
  tpu: [['Ø', '1.75 mm'], ['Net', '750 g'], ['Nozzle', '215–235 °C'], ['Shore', '95A']]
};
function SpecGrid({
  mat,
  inverse
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      border: '2px solid ' + (inverse ? 'var(--paper-0)' : 'var(--graphite-900)'),
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, pkSpecs[mat].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: '8px 10px',
      borderRight: i % 2 === 0 ? '2px solid ' + (inverse ? 'var(--paper-0)' : 'var(--graphite-900)') : 0,
      borderTop: i > 1 ? '2px solid ' + (inverse ? 'var(--paper-0)' : 'var(--graphite-900)') : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pkMono,
      fontSize: 9.5,
      opacity: .7
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 15px/1.2 var(--font-mono)',
      marginTop: 3
    }
  }, v))));
}
function SpoolLabel({
  mat = 'pla'
}) {
  const m = MATERIALS[mat];
  const [cn, ca, hex] = pkColors[mat];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 640,
      height: 300,
      display: 'flex',
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      position: 'relative',
      background: m.color,
      backgroundImage: 'var(--tex-layers-strong)',
      borderRight: '2px solid var(--graphite-900)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      background: 'var(--graphite-900)',
      alignSelf: 'flex-start',
      padding: '5px 8px 4px',
      borderRadius: 6
    }
  }, "Filament"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 72px/.85 var(--font-display)',
      letterSpacing: '-.03em'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '700 22px/1.4 var(--font-arabic)',
      textAlign: 'left'
    }
  }, m.ar))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      color: 'var(--fg-3)'
    }
  }, "Made in KSA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      background: hex,
      border: '2px solid var(--graphite-900)',
      boxShadow: '2px 2px 0 var(--graphite-900)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1 var(--font-display)'
    }
  }, cn), /*#__PURE__*/React.createElement("div", {
    style: {
      ...pkMono,
      color: 'var(--fg-3)',
      marginTop: 4
    }
  }, hex, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    dir: "rtl",
    style: {
      fontFamily: 'var(--font-arabic)',
      textTransform: 'none',
      letterSpacing: 0,
      fontSize: 13
    }
  }, ca)))), /*#__PURE__*/React.createElement(SpecGrid, {
    mat: mat
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      fontSize: 10,
      color: 'var(--fg-3)'
    }
  }, "Batch 26-10-B07 \xB7 Crackling? Dry it first."), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      height: 30,
      background: 'repeating-linear-gradient(90deg,var(--graphite-900) 0 2px,transparent 2px 4px,var(--graphite-900) 4px 5px,transparent 5px 8px)'
    },
    "aria-label": "Barcode placeholder"
  }))));
}
function FilamentBox({
  mat = 'pla'
}) {
  const m = MATERIALS[mat];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      height: 360,
      background: 'var(--yolk-500)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      boxShadow: 'var(--shadow-hard-lg)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--tex-layers)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      fontSize: 10
    }
  }, "1.75 \xB7 1 kg")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      borderRadius: 999,
      margin: '4px 28px',
      background: m.color,
      border: '2px solid var(--graphite-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '38%',
      aspectRatio: '1',
      borderRadius: 999,
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...pkMono,
      fontSize: 9,
      textAlign: 'center'
    }
  }, "window", /*#__PURE__*/React.createElement("br", null), "cut-out")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 56px/.85 var(--font-display)',
      letterSpacing: '-.03em'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '700 18px/1.3 var(--font-arabic)'
    }
  }, m.ar)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      font: '600 13px/1.3 var(--font-body)'
    }
  }, m.blurb));
}
function OrderSticker() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      height: 300,
      borderRadius: 999,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      boxShadow: '6px 6px 0 var(--yolk-500)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      textAlign: 'center',
      backgroundImage: 'var(--tex-bed-inverse)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      color: 'var(--yolk-300)'
    }
  }, "Order #B-0412"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 64px/.85 var(--font-display)',
      color: 'var(--yolk-500)'
    }
  }, "212"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 17px/1.15 var(--font-display)',
      maxWidth: 190
    }
  }, "layers went into this.", /*#__PURE__*/React.createElement("br", null), "Open gently."), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '600 14px/1.4 var(--font-arabic)',
      color: 'var(--graphite-300)'
    }
  }, "\u0662\u0661\u0662 \u0637\u0628\u0642\u0629\u2026 \u0639\u0644\u0649 \u0647\u0648\u0646\u0643 \u0648\u0623\u0646\u062A \u062A\u0641\u062A\u062D\u0647\u0627."), /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      fontSize: 10,
      color: 'var(--graphite-400)'
    }
  }, "6 h 12 m \xB7 PLA \xB7 0.20 mm"));
}
function HangTag() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      height: 330,
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: '18px 18px 18px 18px',
      boxShadow: 'var(--shadow-hard)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 999,
      border: '2px solid var(--graphite-900)',
      alignSelf: 'center',
      background: 'var(--paper-1)'
    }
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: 26,
    style: {
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: 'var(--graphite-900)',
      margin: '4px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 24px/1 var(--font-display)'
    }
  }, "Hex Dice Tower"), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '600 16px/1.3 var(--font-arabic)',
      color: 'var(--fg-2)'
    }
  }, "\u0628\u0631\u062C \u0627\u0644\u0646\u0631\u062F \u0627\u0644\u0633\u062F\u0627\u0633\u064A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      marginTop: 4
    }
  }, [['Material', 'PLA'], ['Layer', '0.20 mm'], ['Infill', '15 %'], ['Print time', '6 h 12 m']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      ...pkMono,
      fontSize: 10.5,
      borderBottom: '1.5px dashed var(--border-2)',
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)'
    }
  }, k), /*#__PURE__*/React.createElement("span", null, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 26px/1 var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...pkMono,
      marginRight: 4
    }
  }, "SAR"), "89"), /*#__PURE__*/React.createElement(Icon, {
    name: "dice-5",
    size: 22
  })));
}
Object.assign(window, {
  SpoolLabel,
  FilamentBox,
  OrderSticker,
  HangTag
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/packaging/Packaging.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/Posts.jsx
try { (() => {
const {
  Wordmark,
  MediaPlaceholder,
  Icon
} = window.InfillDesignSystem_d33a9b;
const soMono = {
  font: '700 26px/1.2 var(--font-mono)',
  letterSpacing: '.1em',
  textTransform: 'uppercase'
};
function PostFrame({
  w = 1080,
  h = 1080,
  scale = .42,
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: w * scale,
      height: h * scale,
      borderRadius: 14,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      transform: 'scale(' + scale + ')',
      transformOrigin: '0 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, children)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px/1 var(--font-mono)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, label));
}
function PostProductDrop() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--yolk-500)',
      padding: 72,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--tex-layers)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 64
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...soMono,
      background: 'var(--graphite-900)',
      color: 'var(--yolk-500)',
      padding: '12px 20px 10px',
      borderRadius: 14
    }
  }, "New drop")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      font: '800 132px/.88 var(--font-display)',
      letterSpacing: '-.03em',
      marginTop: 48
    }
  }, "Hex Dice", /*#__PURE__*/React.createElement("br", null), "Tower"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      marginTop: 40,
      display: 'flex',
      gap: 32,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      border: '4px solid var(--graphite-900)',
      borderRadius: 32,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement(MediaPlaceholder, {
    label: "Product shot \u2014 dice mid-roll",
    tone: "pla",
    ratio: "auto",
    radius: 0,
    style: {
      height: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...soMono,
      fontSize: 22,
      lineHeight: 1.6
    }
  }, "0.20 mm", /*#__PURE__*/React.createElement("br", null), "PLA + PETG", /*#__PURE__*/React.createElement("br", null), "212 layers"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      height: 240,
      borderRadius: 999,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotate(-8deg)',
      boxShadow: '8px 8px 0 var(--mat-pla)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...soMono,
      fontSize: 24,
      color: 'var(--yolk-300)'
    }
  }, "SAR"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 104px/.9 var(--font-display)'
    }
  }, "89")))));
}
function PostMaterial() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--mat-petg)',
      color: 'var(--paper-0)',
      padding: 72,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--tex-layers-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: soMono
  }, "Material file \xB7 02"), /*#__PURE__*/React.createElement("span", {
    style: soMono
  }, "230\u2013250 \xB0C")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 'auto',
      font: '800 340px/.78 var(--font-display)',
      letterSpacing: '-.04em'
    }
  }, "PETG"), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      position: 'relative',
      font: '800 72px/1.3 var(--font-arabic)',
      textAlign: 'right',
      marginTop: -10
    }
  }, "\u0628\u064A \u0625\u064A \u062A\u064A \u062C\u064A"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      font: '700 52px/1.08 var(--font-display)',
      maxWidth: 820,
      marginTop: 24
    }
  }, "Tough enough for the dishwasher. Probably."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 16,
      marginTop: 40,
      alignItems: 'center'
    }
  }, ['Glossy', 'Heat-proof-ish', 'Water-happy'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      ...soMono,
      fontSize: 22,
      padding: '14px 22px 12px',
      border: '3px solid var(--paper-0)',
      borderRadius: 16
    }
  }, t)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 48,
    color: "var(--paper-0)",
    lang: "en"
  }))));
}
function PostQuote() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--graphite-900)',
      backgroundImage: 'var(--tex-bed-inverse)',
      backgroundSize: '40px 40px',
      color: 'var(--paper-0)',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...soMono,
      color: 'var(--yolk-500)'
    }
  }, "Bara' \xB7 \u0628\u0631\u0623"), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '800 150px/1.15 var(--font-arabic)',
      color: 'var(--yolk-500)'
    }
  }, "\u0637\u0644\u0628\u0643 \u063A\u0631\u064A\u0628\u061F", /*#__PURE__*/React.createElement("br", null), "\u0646\u0637\u0628\u0639\u0647."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 64px/1.05 var(--font-display)',
      maxWidth: 800
    }
  }, "Weirdly specific things, printed. One 0.2 mm layer at a time."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 80,
      right: 80,
      bottom: 72,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 52,
    color: "var(--paper-0)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...soMono,
      fontSize: 22,
      color: 'var(--graphite-400)'
    }
  }, "@bara.prints")));
}
function StoryTimelapse({
  progress = 0.64
}) {
  const layers = Math.round(212 * progress);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--paper-1)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '40px 40px 0'
    }
  }, [1, 1, .64, 0].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      background: 'rgba(22,22,26,.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: (i === 2 ? progress : p) * 100 + '%',
      height: '100%',
      borderRadius: 4,
      background: 'var(--graphite-900)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 64px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 56
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...soMono,
      fontSize: 24
    }
  }, "Print of the week")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '48px 64px 0',
      flex: 1,
      border: '4px solid var(--graphite-900)',
      borderRadius: 40,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(MediaPlaceholder, {
    label: "Timelapse video \u2014 bed cam",
    tone: "ink",
    texture: "bed",
    ratio: "auto",
    radius: 0,
    style: {
      height: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 32,
      right: 32,
      bottom: 32,
      background: 'var(--paper-0)',
      border: '4px solid var(--graphite-900)',
      borderRadius: 28,
      padding: 32,
      boxShadow: '8px 8px 0 var(--yolk-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      ...soMono,
      fontSize: 24
    }
  }, /*#__PURE__*/React.createElement("span", null, "Layer ", layers, " / 212"), /*#__PURE__*/React.createElement("span", null, Math.round(progress * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      marginTop: 18,
      borderRadius: 14,
      border: '3px solid var(--graphite-900)',
      overflow: 'hidden',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: progress * 100 + '%',
      height: '100%',
      background: 'var(--yolk-500)',
      backgroundImage: 'repeating-linear-gradient(90deg,rgba(22,22,26,.2) 0 3px,transparent 3px 14px)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 64px 80px',
      font: '800 88px/.95 var(--font-display)'
    }
  }, "Goblin desk tidy.", /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '700 52px/1.4 var(--font-arabic)',
      color: 'var(--fg-2)',
      marginTop: 12
    }
  }, "\u0645\u0646\u0638\u0645 \u0645\u0643\u062A\u0628 \u0627\u0644\u0639\u0641\u0631\u064A\u062A")));
}
Object.assign(window, {
  PostFrame,
  PostProductDrop,
  PostMaterial,
  PostQuote,
  StoryTimelapse
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/Posts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Browse.jsx
try { (() => {
function SfHome({
  go,
  addToCart,
  lang
}) {
  const ar = lang === 'ar';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: '2px solid var(--graphite-900)',
      background: 'var(--yolk-500)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--tex-layers)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '64px 24px',
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline"
  }, ar ? 'استوديو طباعة 3D · الرياض' : '3D print studio · Riyadh'), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--text-display)',
      fontSize: 96,
      letterSpacing: 'var(--tracking-display)'
    }
  }, ar ? /*#__PURE__*/React.createElement(React.Fragment, null, "\u0637\u0644\u0628\u0643 \u063A\u0631\u064A\u0628\u061F", /*#__PURE__*/React.createElement("br", null), "\u0646\u0637\u0628\u0639\u0647.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Weirdly specific", /*#__PURE__*/React.createElement("br", null), "things, printed.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 20px/1.45 var(--font-body)',
      maxWidth: 460
    }
  }, ar ? 'ألعاب، أغراض مكتب، والقطعة اللي صار لك سنين تدوّرها — نطبعها لك طبقة طبقة.' : 'Games, desk goblins and the exact bracket you need — printed layer by layer, in PLA, PETG or squishy TPU.'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    size: "lg",
    variant: "ink",
    iconRight: "arrow-right",
    onClick: () => go('catalog')
  }, ar ? 'تسوّق' : 'Browse the shop'), /*#__PURE__*/React.createElement(DS.Button, {
    size: "lg",
    variant: "secondary",
    icon: "upload",
    onClick: () => go('quote')
  }, ar ? 'أرسل ملفك' : 'Send us your file'))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 28,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-hard-lg)',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement(DS.MediaPlaceholder, {
    label: "Hero \u2014 dice tower on a game table",
    tone: "pla",
    ratio: "5 / 4",
    radius: 0
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '56px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "b-h2",
    style: {
      margin: 0
    }
  }, ar ? 'طالعة من الطابعة توّها' : 'Fresh off the bed'), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    onClick: () => go('catalog')
  }, "See all 42")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 24
    }
  }, SF_PRODUCTS.slice(0, 4).map(p => /*#__PURE__*/React.createElement(DS.ProductCard, {
    key: p.id,
    title: p.title,
    titleAr: p.ar,
    price: p.price,
    materials: p.mats,
    spec: p.spec,
    badge: p.badge,
    badgeTone: p.badgeTone,
    imageTone: p.tone,
    onClick: () => go('product', p.id),
    onAdd: () => addToCart(p)
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '64px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "b-h2",
    style: {
      margin: '0 0 24px'
    }
  }, ar ? 'وش الخامة اللي تبيها؟' : 'Pick your plastic'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, ['pla', 'petg', 'tpu'].map(k => {
    const m = DS.MATERIALS[k];
    return /*#__PURE__*/React.createElement(DS.Card, {
      key: k,
      padding: 0,
      interactive: true,
      style: {
        overflow: 'hidden',
        background: m.tint
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 120,
        background: m.color,
        backgroundImage: 'var(--tex-layers-strong)',
        borderBottom: '2px solid var(--graphite-900)',
        padding: 20,
        display: 'flex',
        alignItems: 'flex-end',
        color: '#fff',
        font: '800 56px/.85 var(--font-display)'
      }
    }, m.name), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 17px/1.35 var(--font-body)',
        color: m.ink
      }
    }, m.blurb), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 11.5px/1 var(--font-mono)',
        color: m.ink
      }
    }, "NOZZLE ", m.temp)));
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '64px 24px 0'
    }
  }, /*#__PURE__*/React.createElement(DS.Card, {
    variant: "inverse",
    texture: "bed",
    padding: 40,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--mat-loop-tint)'
    }
  }, "Bara' Loop \xB7 ", ar ? 'قريبًا' : 'coming soon'), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '10px 0 8px',
      font: '800 40px/1.05 var(--font-display)'
    }
  }, "Failed prints deserve a second life."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 16px/1.5 var(--font-body)',
      color: 'var(--graphite-300)',
      maxWidth: 560
    }
  }, "Drop off your spaghetti, rafts and test cubes. We shred them into Loop filament and knock SAR 20 off your next order per kilo.")), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "lg",
    icon: "recycle"
  }, "How recycling works"))));
}
function SfCatalog({
  go,
  addToCart
}) {
  const [cat, setCat] = React.useState('all');
  const [mat, setMat] = React.useState(null);
  const list = SF_PRODUCTS.filter(p => (cat === 'all' || p.cat === cat) && (!mat || p.mats.includes(mat)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '40px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--fg-3)'
    }
  }, "Shop"), /*#__PURE__*/React.createElement("h1", {
    className: "b-h1",
    style: {
      margin: '8px 0 24px'
    }
  }, "Everything we print"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(DS.Tabs, {
    value: cat,
    onChange: setCat,
    items: [{
      id: 'all',
      label: 'All',
      count: SF_PRODUCTS.length
    }, {
      id: 'games',
      label: 'Games',
      count: 4
    }, {
      id: 'home',
      label: 'Home & desk',
      count: 4
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['pla', 'petg', 'tpu'].map(k => /*#__PURE__*/React.createElement(DS.Tag, {
    key: k,
    material: k,
    selected: mat === k,
    onClick: () => setMat(mat === k ? null : k)
  }, DS.MATERIALS[k].name))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(DS.Select, {
    size: "sm",
    options: ['Newest first', 'Price: low → high', 'Shortest print time'],
    style: {
      width: 220
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 24
    }
  }, list.map(p => /*#__PURE__*/React.createElement(DS.ProductCard, {
    key: p.id,
    title: p.title,
    titleAr: p.ar,
    price: p.price,
    materials: p.mats,
    spec: p.spec,
    badge: p.badge,
    badgeTone: p.badgeTone,
    imageTone: p.tone,
    onClick: () => go('product', p.id),
    onAdd: () => addToCart(p)
  }))), !list.length && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 64,
      textAlign: 'center',
      font: '600 18px/1.4 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, "Nothing on the bed for that combo. Try another material."));
}
Object.assign(window, {
  SfHome,
  SfCatalog
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Browse.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Detail.jsx
try { (() => {
const SF_COLORS = {
  pla: [['#F2B705', 'Yolk'], ['#E8367A', 'Bubblegum'], ['#16161A', 'Graphite'], ['#FCFAF4', 'Bone']],
  petg: [['#12A5A0', 'Lagoon'], ['#CFE8F2', 'Clear ice'], ['#16161A', 'Graphite']],
  tpu: [['#2F6BFF', 'Bounce'], ['#16161A', 'Graphite'], ['#E8367A', 'Bubblegum']]
};
function SfProduct({
  id,
  go,
  addToCart
}) {
  const p = SF_PRODUCTS.find(x => x.id === id) || SF_PRODUCTS[0];
  const [mat, setMat] = React.useState(p.mats[0]);
  const [color, setColor] = React.useState(0);
  const [layer, setLayer] = React.useState('0.20 mm — standard');
  const [qty, setQty] = React.useState(1);
  const colors = SF_COLORS[mat];
  const extra = layer.startsWith('0.12') ? 15 : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '32px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('catalog'),
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '600 14px/1 var(--font-body)',
      color: 'var(--fg-2)',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "arrow-left",
    size: 16
  }), "Back to shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(DS.MediaPlaceholder, {
    label: p.title + ' — hero',
    tone: mat,
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 12
    }
  }, ['Detail', 'In hand', 'Layer close-up', 'Bed cam'].map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      border: '2px solid ' + (i === 0 ? 'var(--graphite-900)' : 'var(--border-2)'),
      borderRadius: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(DS.MediaPlaceholder, {
    label: l,
    tone: i === 3 ? 'ink' : 'paper',
    texture: i === 3 ? 'bed' : 'layers',
    ratio: "1 / 1",
    radius: 0
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, p.badge && /*#__PURE__*/React.createElement(DS.Badge, {
    tone: p.badgeTone || 'brand',
    outlined: true
  }, p.badge), /*#__PURE__*/React.createElement(DS.Badge, {
    tone: "success",
    dot: true
  }, "Ready in 2 days")), /*#__PURE__*/React.createElement("h1", {
    className: "b-h1",
    style: {
      margin: 0
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    dir: "rtl",
    style: {
      font: '600 22px/1.4 var(--font-arabic)',
      color: 'var(--fg-3)',
      textAlign: 'left'
    }
  }, p.ar), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 40px/1 var(--font-display)',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1 var(--font-mono)',
      marginRight: 6,
      color: 'var(--fg-2)'
    }
  }, "SAR"), (p.price + extra) * qty)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 17px/1.55 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, "A six-sided tower that tumbles your dice down three internal ramps before spitting them into the tray. Fair rolls, satisfying clatter, zero dice under the sofa."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1 var(--font-body)'
    }
  }, "Material"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, p.mats.map(k => /*#__PURE__*/React.createElement(DS.Tag, {
    key: k,
    material: k,
    selected: mat === k,
    onClick: () => {
      setMat(k);
      setColor(0);
    },
    style: {
      height: 36,
      padding: '0 14px'
    }
  }, DS.MATERIALS[k].name))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.4 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, DS.MATERIALS[mat].blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1 var(--font-body)'
    }
  }, "Colour \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--fg-2)'
    }
  }, colors[color][1])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, colors.map(([hex, n], i) => /*#__PURE__*/React.createElement(DS.MaterialSwatch, {
    key: n,
    color: hex,
    label: n,
    selected: color === i,
    size: 36,
    onClick: () => setColor(i)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 16,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(DS.Select, {
    label: "Layer height",
    value: layer,
    onChange: e => setLayer(e.target.value),
    options: ['0.12 mm — fine (+SAR 15)', '0.20 mm — standard', '0.28 mm — draft']
  }), /*#__PURE__*/React.createElement(DS.QuantityStepper, {
    value: qty,
    onChange: setQty
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    size: "lg",
    fullWidth: true,
    icon: "shopping-bag",
    onClick: () => addToCart({
      ...p,
      price: p.price + extra,
      mat
    }, qty)
  }, "Add to cart"), /*#__PURE__*/React.createElement(DS.IconButton, {
    icon: "heart",
    label: "Save",
    size: "lg"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, [['Layers', '212'], ['Print time', '6 h 12 m'], ['Infill', '15 %'], ['Weight', '84 g']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: '12px 14px',
      borderLeft: i ? '2px solid var(--graphite-900)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 10px/1 var(--font-mono)',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 17px/1 var(--font-mono)',
      marginTop: 6
    }
  }, v)))))));
}
function SfQuote({
  addToast
}) {
  const [file, setFile] = React.useState(null);
  const [mat, setMat] = React.useState('pla');
  const [infill, setInfill] = React.useState('20%');
  const [speed, setSpeed] = React.useState('std');
  const base = file ? {
    pla: 48,
    petg: 62,
    tpu: 71
  }[mat] + (infill === '50%' ? 18 : infill === '100%' ? 40 : 0) + (speed === 'rush' ? 30 : 0) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '40px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--fg-3)'
    }
  }, "Custom print \xB7 \u0637\u0628\u0627\u0639\u0629 \u0645\u062E\u0635\u0635\u0629"), /*#__PURE__*/React.createElement("h1", {
    className: "b-h1",
    style: {
      margin: '8px 0 8px'
    }
  }, "Got a model? We'll make it real."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 32px',
      font: '400 18px/1.5 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, "Drop an STL, 3MF or OBJ. We slice it, price it, and a human double-checks it before anything melts."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, !file ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setFile({
      name: 'goblin_bust_v3.stl',
      size: '14.2 MB',
      dims: '82 × 64 × 110 mm'
    }),
    style: {
      border: '2px dashed var(--graphite-900)',
      borderRadius: 24,
      background: 'var(--paper-0)',
      backgroundImage: 'var(--tex-bed)',
      padding: '64px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 18,
      background: 'var(--yolk-500)',
      border: '2px solid var(--graphite-900)',
      boxShadow: 'var(--shadow-hard-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "upload",
    size: 28
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 24px/1.1 var(--font-display)'
    }
  }, "Drop your file on the bed"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1 var(--font-mono)',
      color: 'var(--fg-3)'
    }
  }, "STL \xB7 3MF \xB7 OBJ \u2014 MAX 250 \xD7 250 \xD7 250 MM")) : /*#__PURE__*/React.createElement(DS.Card, {
    variant: "outlined",
    padding: 16,
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      borderRadius: 12,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(DS.MediaPlaceholder, {
    label: "Preview",
    tone: "ink",
    texture: "bed",
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 18px/1.2 var(--font-body)'
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px/1.3 var(--font-mono)',
      color: 'var(--fg-3)'
    }
  }, file.size, " \xB7 ", file.dims), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(DS.Badge, {
    tone: "success",
    dot: true
  }, "Manifold"), /*#__PURE__*/React.createElement(DS.Badge, {
    tone: "warning",
    dot: true
  }, "Needs supports"))), /*#__PURE__*/React.createElement(DS.IconButton, {
    icon: "trash-2",
    label: "Remove file",
    variant: "ghost",
    onClick: () => setFile(null)
  }))), /*#__PURE__*/React.createElement(DS.Card, {
    variant: "flat",
    padding: 24,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1 var(--font-body)'
    }
  }, "Material"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, ['pla', 'petg', 'tpu'].map(k => /*#__PURE__*/React.createElement(DS.MaterialSwatch, {
    key: k,
    material: k,
    showLabel: true,
    selected: mat === k,
    onClick: () => setMat(k)
  })))), /*#__PURE__*/React.createElement(DS.Tabs, {
    value: infill,
    onChange: setInfill,
    items: [{
      id: '20%',
      label: '20% infill'
    }, {
      id: '50%',
      label: '50%'
    }, {
      id: '100%',
      label: 'Solid'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(DS.Radio, {
    value: "std",
    checked: speed === 'std',
    onChange: setSpeed,
    label: "Standard",
    description: "Ready in 3\u20134 days"
  }), /*#__PURE__*/React.createElement(DS.Radio, {
    value: "rush",
    checked: speed === 'rush',
    onChange: setSpeed,
    label: "Rush",
    description: "24 h \xB7 +SAR 30"
  })), /*#__PURE__*/React.createElement(DS.Input, {
    label: "Notes for the printer",
    placeholder: "e.g. Print the base in graphite, the goblin in yolk"
  })))), /*#__PURE__*/React.createElement(DS.Card, {
    variant: "brand",
    padding: 24,
    style: {
      position: 'sticky',
      top: 120
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline"
  }, "Instant estimate"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 64px/1 var(--font-display)',
      margin: '12px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 18px/1 var(--font-mono)',
      marginRight: 6
    }
  }, "SAR"), file ? base : '—'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.4 var(--font-body)'
    }
  }, file ? 'Final price confirmed within an hour.' : 'Upload a file to see a price.'), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: 'var(--graphite-900)',
      margin: '20px 0'
    }
  }), [['Material', DS.MATERIALS[mat].name], ['Infill', infill], ['Est. print time', file ? '9 h 40 m' : '—'], ['Est. layers', file ? '550' : '—']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: '600 13px/1 var(--font-mono)',
      padding: '7px 0',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", null, v))), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "ink",
    size: "lg",
    fullWidth: true,
    disabled: !file,
    iconRight: "arrow-right",
    style: {
      marginTop: 20
    },
    onClick: () => addToast({
      tone: 'success',
      title: 'Quote requested',
      message: "We'll email you within the hour."
    })
  }, "Request quote"))));
}
function SfCart({
  open,
  items,
  onClose,
  setQty
}) {
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--scrim)',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 420,
      height: '100%',
      background: 'var(--paper-1)',
      borderLeft: '2px solid var(--graphite-900)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 24px',
      borderBottom: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-h4"
  }, "Your cart \xB7 ", items.reduce((s, i) => s + i.qty, 0)), /*#__PURE__*/React.createElement(DS.IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, !items.length && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 40,
      font: '600 16px/1.4 var(--font-body)',
      color: 'var(--fg-3)'
    }
  }, "The bed is empty.", /*#__PURE__*/React.createElement("br", null), "Go print something."), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      border: '2px solid var(--graphite-900)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(DS.MediaPlaceholder, {
    label: " ",
    tone: it.tone,
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1.2 var(--font-body)'
    }
  }, it.title), /*#__PURE__*/React.createElement(DS.Tag, {
    material: it.mat || it.mats[0],
    style: {
      alignSelf: 'flex-start',
      height: 22
    }
  }, DS.MATERIALS[it.mat || it.mats[0]].name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 17px/1 var(--font-display)'
    }
  }, "SAR ", it.price * it.qty), /*#__PURE__*/React.createElement(DS.QuantityStepper, {
    size: "sm",
    min: 0,
    value: it.qty,
    onChange: n => setQty(i, n)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      borderTop: '2px dashed var(--border-2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(DS.Checkbox, {
    label: "Add Loop recycling bag",
    description: "Free \xB7 send back your failed prints"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 16px/1 var(--font-body)'
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 28px/1 var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 13px/1 var(--font-mono)',
      marginRight: 4
    }
  }, "SAR"), total)), /*#__PURE__*/React.createElement(DS.Button, {
    size: "lg",
    fullWidth: true,
    iconRight: "arrow-right",
    disabled: !items.length
  }, "Checkout"))));
}
Object.assign(window, {
  SfProduct,
  SfQuote,
  SfCart
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Shell.jsx
try { (() => {
const DS = window.InfillDesignSystem_d33a9b;
const SF_PRODUCTS = [{
  id: 'tower',
  title: 'Hex Dice Tower',
  ar: 'برج النرد',
  price: 89,
  mats: ['pla', 'petg'],
  cat: 'games',
  tone: 'pla',
  badge: 'New',
  spec: '0.20 mm · 15% infill · 6 h'
}, {
  id: 'insert',
  title: 'Board Game Insert',
  ar: 'منظم صندوق اللعبة',
  price: 120,
  mats: ['pla'],
  cat: 'games',
  tone: 'yolk',
  spec: '0.24 mm · made to your box'
}, {
  id: 'grip',
  title: 'Squish Grip',
  ar: 'مقبض مرن',
  price: 35,
  mats: ['tpu'],
  cat: 'home',
  tone: 'tpu',
  badge: 'Bendy',
  badgeTone: 'tpu',
  spec: '0.16 mm · 100% TPU'
}, {
  id: 'goblin',
  title: 'Goblin Desk Tidy',
  ar: 'منظم العفريت',
  price: 59,
  mats: ['pla'],
  cat: 'home',
  tone: 'paper',
  spec: '0.20 mm · 20% infill · 4 h'
}, {
  id: 'meeple',
  title: 'Meeple Pack ×20',
  ar: 'قطع ميبل ×٢٠',
  price: 45,
  mats: ['pla', 'petg'],
  cat: 'games',
  tone: 'petg',
  spec: '0.12 mm · solid'
}, {
  id: 'snake',
  title: 'Cable Snake',
  ar: 'ثعبان الأسلاك',
  price: 25,
  mats: ['tpu'],
  cat: 'home',
  tone: 'tpu',
  spec: '0.20 mm · flexible'
}, {
  id: 'pot',
  title: 'Strata Planter',
  ar: 'أصيص الطبقات',
  price: 75,
  mats: ['petg'],
  cat: 'home',
  tone: 'petg',
  badge: 'Watertight',
  badgeTone: 'petg',
  spec: '0.28 mm · vase mode'
}, {
  id: 'cards',
  title: 'Card Holder Duo',
  ar: 'حامل البطاقات',
  price: 39,
  mats: ['petg', 'pla'],
  cat: 'games',
  tone: 'paper',
  spec: '0.20 mm · 2 pcs'
}];
const SF_T = {
  en: {
    shop: 'Shop',
    games: 'Games',
    home: 'Home & desk',
    custom: 'Custom print',
    materials: 'Materials',
    cart: 'Cart',
    search: 'Search dice towers, meeples…'
  },
  ar: {
    shop: 'المتجر',
    games: 'ألعاب',
    home: 'المنزل والمكتب',
    custom: 'اطبع ملفك',
    materials: 'الخامات',
    cart: 'السلة',
    search: 'دوّر على أبراج نرد، قطع ألعاب…'
  }
};
function SfHeader({
  lang,
  setLang,
  go,
  route,
  cartCount,
  openCart
}) {
  const t = SF_T[lang];
  const link = (id, label) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id),
    style: {
      border: 0,
      background: route === id ? 'var(--yolk-500)' : 'transparent',
      borderRadius: 10,
      padding: '8px 12px 6px',
      font: '700 15px/1 var(--font-body)',
      color: 'var(--fg-1)',
      cursor: 'pointer'
    }
  }, label);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--paper-1)',
      borderBottom: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      font: '600 12px/1 var(--font-mono)',
      letterSpacing: '.06em',
      textAlign: 'center',
      padding: '8px 0 7px'
    }
  }, lang === 'en' ? 'FREE PICKUP IN RIYADH · BRING US 1 KG OF FAILED PRINTS, GET SAR 20 OFF' : 'الاستلام ببلاش في الرياض · جيب كيلو من طبعاتك الخربانة وخذ ٢٠ ريال خصم'), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      height: 'var(--header-h)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(DS.Wordmark, {
    size: 30
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, link('catalog', t.shop), link('quote', t.custom)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(DS.Input, {
    size: "sm",
    icon: "search",
    placeholder: t.search,
    style: {
      width: 260
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang(lang === 'en' ? 'ar' : 'en'),
    style: {
      border: '2px solid var(--graphite-900)',
      background: 'var(--paper-0)',
      borderRadius: 10,
      height: 34,
      padding: '0 10px',
      font: '700 14px/1 var(--font-arabic)',
      cursor: 'pointer'
    }
  }, lang === 'en' ? 'عربي' : 'EN'), /*#__PURE__*/React.createElement(DS.IconButton, {
    icon: "user",
    label: "Account",
    variant: "ghost"
  }), /*#__PURE__*/React.createElement(DS.IconButton, {
    icon: "shopping-bag",
    label: t.cart,
    badge: cartCount || undefined,
    onClick: openCart
  })));
}
function SfFooter({
  lang
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      backgroundImage: 'var(--tex-bed-inverse)',
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '56px 24px 40px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(DS.Wordmark, {
    size: 40,
    color: "var(--paper-0)",
    tagline: "Weirdly specific things, printed."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.5 var(--font-body)',
      color: 'var(--graphite-300)',
      maxWidth: 320
    }
  }, "A small print studio in Riyadh. Six printers, too many filament spools, zero tolerance for stringing.")), [['Shop', ['Games', 'Home & desk', 'Gift cards']], ['Make', ['Custom print', 'Materials guide', 'File checklist']], ['Studio', ['Recycling', 'Visit us', 'Contact']]].map(([h, ls]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "b-overline",
    style: {
      color: 'var(--yolk-500)'
    }
  }, h), ls.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      font: '500 15px/1.2 var(--font-body)',
      color: 'var(--paper-0)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1.5px solid var(--graphite-700)',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      font: '500 12px/1 var(--font-mono)',
      color: 'var(--graphite-400)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 BARA' 3D PRINT STUDIO"), /*#__PURE__*/React.createElement("span", null, "PRINTED AT 0.20 MM")));
}
Object.assign(window, {
  DS,
  SF_PRODUCTS,
  SF_T,
  SfHeader,
  SfFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// App shell: boots data, routes, cart (persisted), shared form helpers.
const SITE_ROUTES = ['home', 'shop', 'product', 'custom', 'materials', 'loop', 'about', 'corner', 'sell'];
const parseRoute = () => {
  const [r, id] = location.hash.replace(/^#\/?/, '').split('/');
  return {
    r: r || 'home',
    id: id && decodeURIComponent(id)
  };
};
const CART_KEY = 'bara-cart-v1';
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
const mailto = (subject, body) => {
  const e = baraApi.config.contactEmail;
  return e ? 'mailto:' + e + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body || '') : null;
};

// Submits to a configured endpoint; on failure tells the customer exactly what to do next.
function useSend(toast) {
  const t = useT();
  const [busy, setBusy] = React.useState(false);
  const run = async (name, body, ok, fallbackSubject) => {
    setBusy(true);
    try {
      const res = await baraApi.send(name, body);
      ok && ok(res);
      return res;
    } catch (e) {
      const mail = baraApi.config.contactEmail;
      toast({
        tone: 'danger',
        title: t(SITE.sys.sendFail),
        message: e.code === 'not-configured' || !navigator.onLine ? mail ? t(SITE.sys.sendFailMail) + ' ' + mail : t(SITE.sys.sendFailRetry) : t(SITE.sys.sendFailRetry),
        action: mail ? 'Email' : undefined,
        onAction: mail ? () => {
          location.href = mailto(fallbackSubject || 'Bara’');
        } : undefined
      });
      return null;
    } finally {
      setBusy(false);
    }
  };
  return [run, busy];
}

// Real file picker + drag-and-drop. Reads dimensions/volume locally; the file itself is sent with the form.
const MESH_EXT = ['stl', '3mf', 'obj'];
function FileDrop({
  onFile,
  render,
  maxMB = 100,
  toast
}) {
  const t = useT();
  const ref = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const take = async f => {
    if (!f) return;
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (!MESH_EXT.includes(ext)) {
      toast && toast({
        tone: 'danger',
        title: t(SITE.sys.badFile)
      });
      return;
    }
    if (f.size > maxMB * 1048576) {
      toast && toast({
        tone: 'danger',
        title: t(SITE.sys.fileTooLarge)
      });
      return;
    }
    setBusy(true);
    const mesh = await baraApi.readMesh(f);
    setBusy(false);
    onFile(mesh);
    crew('file');
  };
  return /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
      take(e.dataTransfer.files[0]);
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: ".stl,.3mf,.obj",
    hidden: true,
    onChange: e => {
      take(e.target.files[0]);
      e.target.value = '';
    }
  }), render({
    busy,
    over,
    open: () => ref.current && ref.current.click()
  }));
}
const meshDims = m => m && m.dims ? m.dims.map(d => Math.round(d)).join(' × ') + ' mm' : null;
function StateScreen({
  kind,
  onRetry,
  go
}) {
  const t = useT();
  const S = SITE.sys;
  const map = {
    loading: ['printing', S.loading],
    error: ['oops', S.loadFail, S.loadFailSub],
    notfound: ['oops', S.notFound, S.notFoundSub]
  };
  const [pose, title, sub] = map[kind];
  return /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    role: kind === 'loading' ? 'status' : 'alert',
    style: {
      minHeight: '56vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      textAlign: 'center',
      padding: '64px 24px'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: pose,
    size: 150
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 28px/1.1 var(--font-display)'
    }
  }, t(title)), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.5 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(sub)), kind === 'error' && /*#__PURE__*/React.createElement(B.Button, {
    icon: "rotate-ccw",
    onClick: onRetry
  }, t(S.retry)), kind === 'notfound' && go && /*#__PURE__*/React.createElement(B.Button, {
    iconRight: "arrow-right",
    onClick: () => go('shop')
  }, t(S.toShop)));
}
function loadCart() {
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(c) ? c : [];
  } catch (e) {
    return [];
  }
}
// Re-validate a saved cart against the live catalogue: drop removed products, refresh prices.
const syncCart = cart => cart.map(it => {
  const p = SITE_PRODUCTS.find(x => x.id === it.id);
  return p ? {
    ...p,
    mat: it.mat,
    hex: it.hex,
    qty: it.qty
  } : null;
}).filter(Boolean);
function App() {
  const [route, setRoute] = React.useState(parseRoute());
  const [lang, setLang] = React.useState(() => {
    const s = localStorage.getItem('bara-site-lang');
    return s != null ? +s : /^ar/i.test(navigator.language || '') ? 1 : 0;
  });
  const [boot, setBoot] = React.useState({
    status: 'loading'
  });
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [toast, setToastS] = React.useState(null);
  const [checking, setChecking] = React.useState(false);
  const start = React.useCallback(() => {
    setBoot({
      status: 'loading'
    });
    baraApi.boot().then(d => {
      setCart(syncCart(loadCart()));
      setBoot({
        status: 'ready',
        ...d
      });
    }).catch(e => {
      console.error('[bara] data load failed', e);
      setBoot({
        status: 'error'
      });
    });
  }, []);
  React.useEffect(start, []);
  React.useEffect(() => {
    const on = () => {
      setRoute(parseRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  React.useEffect(() => {
    localStorage.setItem('bara-site-lang', lang);
    document.documentElement.lang = lang ? 'ar' : 'en';
    document.documentElement.dir = lang ? 'rtl' : 'ltr';
  }, [lang]);
  React.useEffect(() => {
    if (boot.status === 'ready') try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart.map(({
        id,
        mat,
        hex,
        qty
      }) => ({
        id,
        mat,
        hex,
        qty
      }))));
    } catch (e) {}
  }, [cart, boot.status]);
  const go = (r, id) => {
    location.hash = '/' + r + (id ? '/' + encodeURIComponent(id) : '');
  };
  const toastIt = x => {
    setToastS(x);
    clearTimeout(window.__st);
    window.__st = setTimeout(() => setToastS(null), x.tone === 'danger' ? 6000 : 2800);
  };
  const add = (p, q = 1) => {
    const mat = p.mat || p.mats[0];
    const hex = p.hex || ((SITE_COLOURS[mat] || [])[0] || [])[0];
    if (!hex) {
      toastIt({
        tone: 'warning',
        title: SITE.sys.outOfStock[lang]
      });
      return;
    }
    setCart(c => {
      const k = c.findIndex(x => x.id === p.id && x.mat === mat && x.hex === hex);
      return k > -1 ? c.map((x, j) => j === k ? {
        ...x,
        qty: x.qty + q
      } : x) : [...c, {
        ...p,
        mat,
        hex,
        qty: q
      }];
    });
    crew('cart', {
      hex
    });
    toastIt({
      tone: 'success',
      title: SITE.cart.added[lang],
      message: (lang ? p.ar : p.en) + ' · ' + B.MATERIALS[mat].name,
      action: lang ? 'السلة' : 'View',
      onAction: () => {
        setCartOpen(true);
        setToastS(null);
      }
    });
  };
  const nItems = cart.reduce((s, i) => s + i.qty, 0);
  const nag = (d = 0) => {
    clearTimeout(window.__nag);
    window.__nag = setTimeout(() => {
      if (Date.now() - (window.__lastNag || 0) < 20000) return;
      window.__lastNag = Date.now();
      crew('hoard', {
        n: window.__nItems,
        ar: lang
      });
    }, d);
  };
  React.useEffect(() => {
    window.__nItems = nItems;
    clearTimeout(window.__idleNag);
    if (nItems > 0 && !cartOpen) window.__idleNag = setTimeout(() => nag(), 40000);
    if (nItems >= 5 && !cartOpen && Math.random() < .5) nag(5200);
    return () => clearTimeout(window.__idleNag);
  }, [nItems, cartOpen]);
  const closeCart = () => {
    setCartOpen(false);
    if (nItems >= 3 && Math.random() < .6) nag(600);
  };
  const setQty = (i, n) => setCart(c => n <= 0 ? c.filter((_, j) => j !== i) : c.map((x, j) => j === i ? {
    ...x,
    qty: n
  } : x));
  const checkout = async () => {
    const items = cart.map(({
      id,
      mat,
      hex,
      qty,
      price
    }) => ({
      id,
      material: mat,
      colour: hex,
      qty,
      unitPrice: price
    }));
    const summary = cart.map(i => i.qty + ' × ' + i.en + ' (' + B.MATERIALS[i.mat].name + ', ' + i.hex + ')').join('\n');
    if (!baraApi.configured('checkout')) {
      const m = mailto('Order', summary);
      toastIt({
        tone: 'warning',
        title: SITE.sys.checkoutOff[lang],
        action: m ? SITE.sys.checkoutMail[lang] : undefined,
        onAction: m ? () => {
          location.href = m;
        } : undefined
      });
      return;
    }
    setChecking(true);
    try {
      const res = await baraApi.send('checkout', {
        items,
        lang: lang ? 'ar' : 'en'
      });
      if (res && res.url) location.href = res.url;else throw new Error('no url');
    } catch (e) {
      toastIt({
        tone: 'danger',
        title: SITE.sys.sendFail[lang],
        message: SITE.sys.sendFailRetry[lang]
      });
    } finally {
      setChecking(false);
    }
  };
  const {
    r,
    id
  } = route;
  const known = SITE_ROUTES.includes(r);
  React.useEffect(() => {
    const n = SITE.nav[r];
    const p = r === 'product' && boot.status === 'ready' && SITE_PRODUCTS.find(x => x.id === id);
    document.title = (p ? lang ? p.ar : p.en : n ? n[lang] : SITE.tagline[lang]) + ' · ' + (lang ? 'برأ' : 'Bara’');
  }, [r, id, lang, boot.status]);
  const page = () => {
    if (boot.status === 'loading') return /*#__PURE__*/React.createElement(StateScreen, {
      kind: "loading"
    });
    if (boot.status === 'error') return /*#__PURE__*/React.createElement(StateScreen, {
      kind: "error",
      onRetry: start
    });
    if (!known) return /*#__PURE__*/React.createElement(StateScreen, {
      kind: "notfound",
      go: go
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, r === 'home' && /*#__PURE__*/React.createElement(HomePage, {
      go: go,
      add: add
    }), r === 'shop' && /*#__PURE__*/React.createElement(ShopPage, {
      go: go,
      add: add,
      id: id
    }), r === 'product' && /*#__PURE__*/React.createElement(ProductPage, {
      id: id,
      go: go,
      add: add
    }), r === 'custom' && /*#__PURE__*/React.createElement(CustomPage, {
      toast: toastIt
    }), r === 'materials' && /*#__PURE__*/React.createElement(MaterialsPage, {
      go: go
    }), r === 'loop' && /*#__PURE__*/React.createElement(LoopPage, null), r === 'about' && /*#__PURE__*/React.createElement(AboutPage, null), r === 'corner' && /*#__PURE__*/React.createElement(CornerPage, {
      toast: toastIt
    }), r === 'sell' && /*#__PURE__*/React.createElement(SellPage, {
      toast: toastIt
    }));
  };
  const ready = boot.status === 'ready';
  return /*#__PURE__*/React.createElement(LangCtx.Provider, {
    value: lang
  }, /*#__PURE__*/React.createElement("div", {
    dir: lang ? 'rtl' : 'ltr',
    style: {
      fontFamily: lang ? 'var(--font-arabic)' : 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#main",
    className: "s-skip"
  }, lang ? 'تخطَّ للمحتوى' : 'Skip to content'), /*#__PURE__*/React.createElement(SiteHeader, {
    route: r,
    go: go,
    lang: lang,
    setLang: setLang,
    cartCount: nItems,
    openCart: () => setCartOpen(true)
  }), /*#__PURE__*/React.createElement("main", {
    id: "main",
    tabIndex: -1,
    key: r + (id || '') + lang + boot.status
  }, page()), /*#__PURE__*/React.createElement(SiteFooter, {
    go: go
  }), ready && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CrewDock, null), /*#__PURE__*/React.createElement(CartRunner, null), /*#__PURE__*/React.createElement(PeekCrew, null)), /*#__PURE__*/React.createElement(SlicerScroll, null), /*#__PURE__*/React.createElement(CartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: closeCart,
    setQty: setQty,
    onCheckout: checkout,
    busy: checking
  }), toast && /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      position: 'fixed',
      top: 84,
      left: 16,
      right: 16,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 60,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(B.Toast, _extends({}, toast, {
    onAction: toast.onAction,
    onClose: () => setToastS(null)
  }))))));
}
Object.assign(window, {
  App,
  useSend,
  FileDrop,
  meshDims,
  emailOk,
  mailto,
  StateScreen
});
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
function SiteHeader({
  route,
  go,
  lang,
  setLang,
  cartCount,
  openCart
}) {
  const t = useT();
  const N = SITE.nav;
  const [open, setOpen] = React.useState(false);
  const links = ['shop', 'custom', 'sell', 'materials', 'loop', 'about', 'corner'];
  const link = (id, block) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => {
      go(id);
      setOpen(false);
    },
    style: {
      border: 0,
      background: route === id ? 'var(--yolk-500)' : 'transparent',
      borderRadius: 10,
      padding: block ? '14px 14px 12px' : '9px 11px 7px',
      font: '700 ' + (block ? 20 : 15) + 'px/1 var(--font-body)',
      color: 'var(--fg-1)',
      cursor: 'pointer',
      textAlign: 'start',
      whiteSpace: 'nowrap',
      fontFamily: lang ? 'var(--font-arabic)' : 'var(--font-body)'
    }
  }, t(N[id]));
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--paper-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      textAlign: 'center',
      padding: '8px 16px 7px',
      font: lang ? '600 13px/1.4 var(--font-arabic)' : '600 12px/1.4 var(--font-mono)',
      letterSpacing: lang ? 0 : '.05em'
    }
  }, t(SITE.announce)), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      height: 68,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('home'),
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      cursor: 'pointer'
    },
    "aria-label": "Home"
  }, /*#__PURE__*/React.createElement(B.Wordmark, {
    size: 28
  })), /*#__PURE__*/React.createElement("nav", {
    className: "s-links",
    style: {
      marginInlineStart: 12
    }
  }, links.map(l => link(l))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang(lang ? 0 : 1),
    style: {
      border: '2px solid var(--graphite-900)',
      background: 'var(--paper-0)',
      borderRadius: 10,
      height: 36,
      padding: '0 12px',
      font: '700 14px/1 ' + (lang ? 'var(--font-body)' : 'var(--font-arabic)'),
      cursor: 'pointer'
    }
  }, lang ? 'EN' : 'عربي'), /*#__PURE__*/React.createElement(B.IconButton, {
    icon: "shopping-bag",
    label: "Cart",
    badge: cartCount || undefined,
    onClick: openCart
  }), /*#__PURE__*/React.createElement("span", {
    className: "s-burger"
  }, /*#__PURE__*/React.createElement(B.IconButton, {
    icon: open ? 'x' : 'menu',
    label: "Menu",
    variant: "ink",
    onClick: () => setOpen(!open)
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--graphite-900)',
      background: 'var(--paper-0)',
      padding: '12px 16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, ['home'].concat(links).map(l => link(l, true))), /*#__PURE__*/React.createElement(LayerBar, null));
}
function SiteFooter({
  go
}) {
  const t = useT();
  const N = SITE.nav;
  const col = (h, ids) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--yolk-500)'
    }
  }, h), ids.map(id => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => go(id),
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      textAlign: 'start',
      color: 'var(--paper-0)',
      font: '500 16px/1.3 var(--font-body)',
      cursor: 'pointer'
    }
  }, t(N[id]))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 112,
      background: 'var(--graphite-900)',
      backgroundImage: 'var(--tex-bed-inverse)',
      color: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      padding: '56px 24px 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      gridColumn: 'span 2',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(B.Wordmark, {
    size: 40,
    color: "var(--paper-0)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 26px/1.15 var(--font-display)',
      color: 'var(--yolk-500)'
    }
  }, t(SITE.tagline)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--graphite-300)',
      font: '400 15px/1.55 var(--font-body)',
      maxWidth: 360
    }
  }, t(SITE.footer.blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "sleepy",
    size: 96,
    color: "yolk",
    swirl: "pla"
  }))), col('Shop', ['shop', 'custom', 'sell', 'materials']), col('Studio', ['loop', 'about', 'corner']), (baraApi.config.contactEmail || baraApi.config.whatsapp) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--yolk-500)'
    }
  }, t(['Contact', 'تواصل'])), baraApi.config.contactEmail && /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + baraApi.config.contactEmail,
    style: {
      color: 'var(--paper-0)',
      font: '500 16px/1.3 var(--font-body)',
      background: 'none'
    }
  }, baraApi.config.contactEmail), baraApi.config.whatsapp && /*#__PURE__*/React.createElement("a", {
    href: 'https://wa.me/' + baraApi.config.whatsapp,
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'var(--paper-0)',
      font: '500 16px/1.3 var(--font-body)',
      background: 'none'
    }
  }, "WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      padding: '16px 24px 24px',
      borderTop: '1.5px solid var(--graphite-700)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'space-between',
      ...smMono,
      fontSize: 11,
      color: 'var(--graphite-400)'
    }
  }, /*#__PURE__*/React.createElement("span", null, t(SITE.footer.rights).replace(/2026|٢٠٢٦/, m => m === '2026' ? String(new Date().getFullYear()) : String(new Date().getFullYear()).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]))), /*#__PURE__*/React.createElement("span", null, "Printed at 0.20 mm")));
}
function CartDrawer({
  open,
  items,
  onClose,
  setQty,
  onCheckout,
  busy
}) {
  const t = useT();
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--scrim)',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t(SITE.cart.title),
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(420px, 100%)',
      height: '100%',
      background: 'var(--paper-1)',
      borderInlineStart: '2px solid var(--graphite-900)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 20px',
      borderBottom: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 22px/1 var(--font-display)'
    }
  }, t(SITE.cart.title), " \xB7 ", items.reduce((s, i) => s + i.qty, 0)), /*#__PURE__*/React.createElement(B.IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "thin-scroll",
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, !items.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: 32,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "sleepy",
    size: 120,
    color: "tpu"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 16px/1.4 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(SITE.cart.empty))), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      flexShrink: 0,
      border: '2px solid var(--graphite-900)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: " ",
    tone: it.tone,
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1.2 var(--font-body)'
    }
  }, t([it.en, it.ar])), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      ...smMono,
      fontSize: 10.5,
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: it.hex,
      border: '1.5px solid var(--graphite-900)'
    }
  }), B.MATERIALS[it.mat].name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Price, {
    v: it.price * it.qty,
    size: 16
  }), /*#__PURE__*/React.createElement(B.QuantityStepper, {
    size: "sm",
    min: 0,
    value: it.qty,
    onChange: n => setQty(i, n)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      borderTop: '2px dashed var(--border-2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 16px/1 var(--font-body)'
    }
  }, t(SITE.cart.sub)), /*#__PURE__*/React.createElement(Price, {
    v: total,
    size: 26
  })), /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    fullWidth: true,
    iconRight: "arrow-right",
    disabled: !items.length || busy,
    onClick: onCheckout
  }, busy ? t(SITE.sys.sending) : t(SITE.cart.checkout)))));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  CartDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Crew.jsx
try { (() => {
// The crew: Tab'a (cheers, panics) + the Mess Goblin (judges, yells). The floor shows the real print queue when endpoints.floor is set — never customer data.

// Conversation trees: N(who, mood, en, ar, ...replies). One reply is picked at random per level; '.' ends the chat early.
const N = (w, m, en, ar, ...r) => ({
  w,
  m,
  en,
  ar,
  r
});
const END = '.';
const If = (fn, node) => Object.assign(node, {
  if: fn
});
const CREW_AMBIENT = [N('g', 'shout', 'Did the {part} come off yet?!', 'هاه، {part:ar} طلع ولا للحين؟!', N('t', 'shout', 'NO! Still on layer {layer}!', 'لا والله!! توه بالطبقة {layer}!', N('g', 'judge', 'Of {total}. Wonderful.', 'من {total}؟ يا زين السرعة.'), N('g', 'busy', 'Then why are you HERE?', 'أجل وش جابك هنا؟!', N('t', 'oops', '…moral support?', '…جيت أشجعك؟')), END), N('t', 'cheer', 'Yes! And it’s PERFECT!', 'إيه! وطالع يهبّل!', N('g', 'peer', 'Let me see. | …There’s a blob on it.', 'وريني. | …فيه نقطة زايدة.', N('t', 'oops', 'That’s a feature.', 'هذي لمسة فنية.'), N('t', 'hips', 'That blob is ME, thank you.', 'النقطة ذي أنا ترا!')), N('g', 'approve', 'Huh. Fine. Good.', 'هممم. مو بطال.')), N('t', 'oops', 'It… came off the bed. Early.', 'امم… طار من السرير. بدري.', N('g', 'shout', 'SPAGHETTI AGAIN?!', 'سباغيتي مرة ثانية؟!'), N('g', 'judge', 'Give it here. | *crunch* | …needs salt.', 'جيبيه. | *قرمش* | …ناقصه ملح.')), N('t', 'hello', 'Which one? There are {orders}.', 'أي واحد فيهم؟ عندنا {orders}.', N('g', 'hips', 'The one I asked about.', 'اللي أسألك عنه! ركّزي معي.'), END)), N('g', 'shout', 'Who left the {mat} spool out?!', 'مين اللي خلّى بكرة الـ{mat} برا؟!', N('t', 'oops', '…not me. Probably.', 'مو أنا… على ما أظن.', N('g', 'peer', 'Your face is ON the spool.', 'وجهك مرسوم عليها يا ذكية.'), END), N('t', 'shout', 'IT WAS YOU! Yesterday!', 'أنت!! أمس وأنا شايفتك!', N('g', 'judge', 'Lies. Slander.', 'كذب وافترا.'), N('g', 'oops', '…okay that tracks.', '…طيب، يمكن أنا.')), N('t', 'hello', 'It wanted fresh air.', 'كانت تبي تشم هوا.', N('g', 'shout', 'IT’S HYGROSCOPIC!', 'تشرب رطوبة يا بنت الحلال!', N('t', 'oops', 'Gesundheit?', 'زين، خلها تروى؟')))), N('g', 'busy', 'Printer {printer} is beeping AGAIN.', 'الطابعة {printer} تصفّر… للمرة المليون!', N('t', 'shout', 'I’m on it! I’m on it!', 'جاية! جاية!', N('g', 'judge', 'You’re running the wrong way.', 'الطابعة من هنا يا بنت!'), END), N('t', 'oops', 'Maybe it’s singing?', 'يمكن تغنّي؟', N('g', 'hips', 'It’s singing “out of filament”.', 'تغني "خلص الفلامنت". أغنيتها المفضلة.')), N('t', 'peer', 'Beeping or screaming?', 'تصفّر ولا تصيح؟', N('g', 'busy', 'Both. Both is the answer.', 'الثنتين.'), N('g', 'judge', 'Does it matter?', 'وتفرق؟'))), N('t', 'cheer', 'Someone ordered a {part}!', 'جانا طلب {part:ar}!', N('g', 'judge', 'Flattering. Still not dusting it.', 'حلو. بس أنا ما راح أغلّفه.'), N('g', 'peer', 'In what colour?', 'وش لونه؟', N('t', 'cheer', 'PINK!', 'وردي!', N('g', 'judge', 'Of course.', 'أكيد، وش غيره.')), N('t', 'oops', '…I didn’t check.', '…ما انتبهت.', N('g', 'hips', 'Go check.', 'روحي شوفي أجل.'))), N('g', 'approve', 'Good. Bills.', 'زين. فاتورة الكهربا تشكرك.'), N('g', 'shout', 'ANOTHER one?!', 'بعد؟!', N('t', 'cheer', 'Isn’t it great?!', 'مو حلو؟! الشغل ماشي!'), END)), N('g', 'busy', 'We have {orders} orders. | And {printers} printers. | Do the math.', 'عندنا {orders} طلب. | و{printers} طابعات بس. | احسبيها.', N('t', 'shout', 'Math later, PRINT NOW!', 'الحساب بعدين، اطبع الحين!'), N('t', 'peer', 'Carry the one… that’s a lot.', 'خلني أحسب… واجد.', N('g', 'judge', 'Yes. Yes it is.', 'إيه. واجد.')), N('t', 'hello', 'Sounds like a party!', 'شكلها بتصير سهرة!', N('g', 'shout', 'It is NOT a party.', 'أي سهرة؟! هذا شغل!'), N('g', 'hips', 'A party where only I work.', 'سهرة؟ أنا أشتغل وإنتي تسهرين.'))), N('t', 'oops', 'The {part} failed. Try number {try}…', '{part:ar} خرب… وهذي المحاولة {try}.', N('g', 'judge', 'I’m starting a tally.', 'ترا قاعد أعد عليك.', N('t', 'oops', 'Please don’t.', 'تكفى لا تعد.'), END), N('g', 'approve', 'More snacks for me.', 'أحسن. عشاي زاد.', N('t', 'shout', 'Stop EATING my mistakes!', 'لا تاكل غلطاتي!')), N('g', 'peer', 'Did you level the bed?', 'سويتي معايرة للسرير؟', N('t', 'oops', '…define “level”.', '…وش يعني معايرة؟'), N('t', 'hips', 'Obviously. | …I’ll go level the bed.', 'أكيد سويتها. | …بروح أسويها الحين.'))), N('g', 'peer', 'Printer {printer}: {hours} h {mins} m left. | Says it. | Lies.', 'الطابعة {printer} تقول باقي {hours} ساعة و{mins} دقيقة. | هذا كلامها. | وهي كذّابة.', N('t', 'hello', 'Have a little faith!', 'تفاءل بالخير!', N('g', 'judge', 'I had faith once.', 'تفاءلت مرة… وندمت.')), N('t', 'shout', 'Don’t jinx it!', 'لا تفاول عليها!', N('g', 'oops', '…it just went up by an hour.', '…شوفي، زادت ساعة.'))), [If(v => v.frac < .2, N('t', 'cheer', 'Layer {layer} of {total}. We’ve only just started!', 'الطبقة {layer} من {total}. توّنا نبدأ!', N('g', 'judge', '{left} layers to go. Wake me up after.', 'باقي {left} طبقة. صحيني إذا خلصت.'), N('g', 'busy', 'Then why are you celebrating?', 'أجل ليش فرحانة؟', N('t', 'hips', 'Layer one is a big deal!', 'أول طبقة نص الشغل!')))), If(v => v.frac >= .4 && v.frac <= .6, N('t', 'shout', 'Layer {layer} of {total}! Halfway!', 'الطبقة {layer} من {total}! وصلنا النص!', N('g', 'approve', 'Progress.', 'زين.'), N('g', 'hips', 'Halfway is where it fails. Statistically.', 'ترا أغلب الطبعات تخرب بالنص.', N('t', 'oops', 'Why would you SAY that?', 'ليه تقول كذا؟! فال الله ولا فالك!')))), If(v => v.frac >= .2 && v.frac < .4 || v.frac > .6 && v.frac <= .85, N('t', 'shout', 'Layer {layer} of {total}! Halfway-ish!', 'الطبقة {layer} من {total}! يعني تقريبًا النص!', N('g', 'peer', 'That’s {pct}%. Not halfway.', 'هذا {pct}٪ يا حبيبتي، مو النص.', N('t', 'cheer', 'It’s halfway in SPIRIT.', 'نص بالنية!'), N('t', 'oops', 'Numbers are hard.', 'أنا والرياضيات ما نتفاهم.')), N('g', 'hips', '“Ish” is doing a lot of work there.', 'كلمة "تقريبًا" شايلة الهم كله.'))), If(v => v.frac > .85, N('t', 'cheer', 'Layer {layer} of {total}! Almost done!', 'الطبقة {layer} من {total}! خلاص قربنا!', N('g', 'shout', 'Don’t touch it. DON’T TOUCH IT.', 'لا تقربين منها. لا تقربين!'), N('g', 'peer', '{left} layers. Don’t jinx it.', 'باقي {left} طبقة. لا تفاولين.'), N('g', 'approve', 'Finally.', 'أخيرًا.')))], N('g', 'busy', '{n} kg of failed prints in the bin. | Lunch.', '{n} كيلو طبعات خربانة بالسلة. | غداي جاهز.', If(v => v.n >= 5, N('t', 'oops', 'That’s… a lot of lunch.', 'هذا غدا ولا بوفيه؟', N('g', 'approve', 'Growing goblin.', 'أنا في سن النمو.'))), If(v => v.n < 5, N('t', 'peer', 'Only {n}? Slow day.', 'بس {n}؟ اليوم رايق.', N('g', 'judge', 'Give it an hour.', 'اصبري، اليوم طويل.'))), N('t', 'cheer', 'Recycling hero!', 'بطل إعادة التدوير!', N('g', 'hips', 'Finally, recognition.', 'أخيرًا أحد قدّرني.')), N('t', 'peer', 'Wait. | Is my spaghetti in there?', 'لحظة. | السباغيتي حقي فيها؟', N('g', 'judge', 'Most of it.', 'أغلبه، وكان لذيذ.'))), N('t', 'peer', 'Is printer {printer} making a {part}… | or modern art?', 'الطابعة {printer} تطبع {part:ar}… | ولا لوحة تجريدية؟', N('g', 'judge', 'Modern art. Bin it.', 'تجريدية. ارميها.', N('t', 'shout', 'Sell it as art!', 'نبيعها بمعرض!'), END), N('g', 'peer', 'Give it ten layers.', 'اصبري عليها عشر طبقات.', N('t', 'oops', 'It’s worse now.', 'صارت أخيس.')), N('g', 'approve', 'Both. Charge double.', 'الثنتين. ونضاعف السعر.'))];
const crewOk = (n, v) => n === END || !n.if || n.if(v);
// Walks one random path through a tree. Values are generated first so branches can react to them (e.g. only say "halfway" near 50%).
function crewWalk(node, v, out) {
  if (!out) {
    out = [];
    v = v && v.__v ? v : crewVars(v);
    out.v = v;
  }
  if (Array.isArray(node)) {
    const ok = node.filter(n => crewOk(n, v));
    node = ok.length ? crewPick(ok) : null;
  }
  if (!node || node === END || !crewOk(node, v)) return out;
  out.push([node.w, node.m, node.en, node.ar]);
  const kids = (node.r || []).filter(c => crewOk(c, v));
  if (kids.length && !(out.length >= 2 && chance(0.15))) crewWalk(crewPick(kids), v, out);
  return out;
}
// Generic follow-ups when only one character reacted.
const CREW_BACK = {
  t: [['oops', 'Rude.', 'يا قليل الذوق.'], ['cheer', 'Ignore him, it’s great!', 'لا تسمع منه، يجنن!'], ['hips', 'He says that about everything.', 'هذا هو، ما يعجبه العجب.'], ['peer', '…he’s not wrong though.', '…بس الصراحة معه حق.'], ['shout', 'BE NICE!', 'خلك لطيف!']],
  g: [['judge', 'She says that about everything.', 'هي كذا، كل شي عندها يجنن.'], ['hips', 'Calm down.', 'هدي اللعب.'], ['approve', '…fine. She’s right.', '…طيب، معها حق. لا تتعودين.'], ['peer', 'Is she, though?', 'متأكدة إنتي؟'], ['shout', 'STOP ENCOURAGING THEM!', 'لا تشجعينهم تكفين!']]
};
const CREW_MATS = ['PLA', 'PETG', 'TPU', 'Silk PLA', 'Loop'];
const crewNum = (v, ar) => ar ? String(v).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : String(v);
const crewRand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// Fills {part} {layer} {total} {printer} {try} {orders} {printers} {mat} {hours} {mins} {n} {id} with fresh random values, shared across one exchange.
function crewVars(vars = {}) {
  const ps = window.SITE_PRODUCTS || [];
  const p = ps.length ? crewPick(ps) : {
    en: 'print',
    ar: 'الطبعة'
  };
  const total = crewRand(80, 420);
  const layer = crewRand(12, total - 5);
  return {
    __v: 1,
    part: p.en.toLowerCase(),
    'part:ar': p.ar,
    layer,
    total,
    left: total - layer,
    pct: Math.round(layer / total * 100),
    frac: layer / total,
    printer: crewRand(1, 6),
    try: crewRand(2, 9),
    orders: crewRand(7, 31),
    printers: 6,
    mat: crewPick(CREW_MATS),
    hours: crewRand(1, 14),
    mins: crewRand(2, 59),
    n: crewRand(2, 9),
    ...vars
  };
}
// Fills placeholders from the exchange's shared values. " | " splits one line into several bubbles from the same speaker.
function crewFill(seq, vars = {}) {
  const v = seq.v ? {
    ...seq.v,
    ...vars
  } : crewVars(vars);
  const f = (s, ar) => s.replace(/\{([a-z:]+)\}/g, (_, k) => v[k] == null ? '' : typeof v[k] === 'number' ? crewNum(v[k], ar) : v[k]);
  const out = [];
  seq.forEach(([w, mood, en, ar]) => {
    const E = f(en, false).split(' | '),
      A = f(ar, true).split(' | ');
    const n = Math.max(E.length, A.length);
    for (let k = 0; k < n; k++) out.push([w, mood, E[k] || E[E.length - 1], A[k] || A[A.length - 1], k > 0]);
  });
  return out;
}
const crewPick = a => a[Math.floor(Math.random() * a.length)];
const chance = p => Math.random() < p;
// Per-event line pools. Each speaker draws randomly; either may stay silent; order is random.
// Mute: click any character → masking tape over both mouths. They keep trying to talk, muffled.
const crewMuted = () => !!window.__crewMuted;
try {
  window.__crewMuted = localStorage.getItem('bara-crew-muted') === '1';
} catch (e) {}
function crewMute(v) {
  const next = v == null ? !crewMuted() : !!v;
  window.__crewMuted = next;
  try {
    localStorage.setItem('bara-crew-muted', next ? '1' : '0');
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('bara-mute', {
    detail: next
  }));
  crew(next ? 'mute' : 'unmute');
}
function useCrewMuted() {
  const [m, setM] = React.useState(crewMuted());
  React.useEffect(() => {
    const on = e => setM(e.detail);
    window.addEventListener('bara-mute', on);
    return () => window.removeEventListener('bara-mute', on);
  }, []);
  return m;
}
const MUFFLE = [['Mmph!', 'ممف!'], ['Mmmph mm-mph!', 'مممف مم-ممف!'], ['Hmmmf.', 'همممف.'], ['MMPH!!', 'ممممف!!'], ['Mm-hm. Mmph.', 'مم-هم. ممف.'], ['Mmf mmf mmmf?', 'ممف ممف مممف؟'], ['…mmph.', '…ممف.']];
const crewMuffle = l => {
  const m = crewPick(MUFFLE);
  return {
    ...l,
    en: m[0],
    ar: m[1],
    muf: true
  };
};
const crewClick = e => {
  e.stopPropagation();
  crewMute();
};
const CREW_REACT = {
  mute: {
    tree: [N('g', 'shout', 'Hey! Don’t you da—', 'لا! لا تسويها—', N('t', 'oops', 'Mmph!', 'ممف!')), N('t', 'shout', 'Wait, I wasn’t finish—', 'لحظة، ما كملت كلا—', N('g', 'judge', 'Mmmph.', 'مممف.')), N('g', 'judge', 'Tape. Really?', 'لزقة؟ من جدك؟')]
  },
  unmute: {
    tree: [N('g', 'shout', 'OW. | That pulled my eyebrow.', 'آآي. | شالت نص حاجبي.', N('t', 'cheer', 'We’re BACK!', 'رجعنااا!', N('g', 'judge', 'Unfortunately.', 'للأسف.'))), N('t', 'cheer', 'Freedom!', 'أخيرًا أتنفس!', N('g', 'hips', 'As I was saying before I was SILENCED…', 'المهم، كنت أقول قبل ما يسكتوني…')), N('g', 'judge', 'I’m keeping the tape.', 'اللزقة بخليها عندي.', N('t', 'oops', 'Why?!', 'ليش؟!', N('g', 'peer', 'For you.', 'عشانك.')))]
  },
  cart: {
    t: [['cheer', 'Great pick! Seriously!', 'والله اختيار يجنن!'], ['cheer', 'You have amazing taste!', 'ذوقك رهيب!'], ['cheer', 'YESSS! Number {orders} in the queue!', 'ياااس! صار رقم {orders} بالدور!'], ['shout', 'Another one?! Printer {printer}, wake up!', 'بعد؟! الطابعة {printer} قومي اشتغلي!'], ['oops', 'Honestly… he’s right, that’s a lot.', 'بصراحة… معه حق، كثّرت.'], ['judge', 'Do you even need that? Kidding. Mostly.', 'تحتاجه أصلًا؟ أمزح… نص ونص.'], ['peer', 'Wait… let me look closer. Yep, cute.', 'لحظة… خلني أقرّب. إيه، يهبّل.'], ['hello', 'Ooh, that one’s my favourite.', 'هذا أحبه مرّه!']],
    g: [['judge', 'Another one. Fine.', 'بعد واحد… ماشي.'], ['shout', 'MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'], ['judge', 'Bold choice. Not judging. Okay, judging.', 'اختيار جريء. ما أحكم عليك… طيب أحكم.'], ['approve', '…Actually, nice.', '…الصراحة، مو بطال.'], ['peer', 'Hmm. Inspecting. Don’t rush me.', 'هممم. خلني أفحصه. لا تستعجل.'], ['hips', 'And who’s carrying all this? Me.', 'ومين بيشيل هذا كله؟ أنا طبعًا.'], ['busy', 'Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟']]
  },
  pink: {
    t: [['cheer', 'PINK!! Love it!', 'وردي!! يجنن!'], ['oops', 'Pink… again? Okay! Okay.', 'وردي… مرة ثانية؟ أوكي! ماشي.']],
    g: [['judge', 'Pink. Again. Bold.', 'وردي؟ بعد؟ ما شاء الله.'], ['approve', 'Fine. Pink works.', 'طيب. الوردي لايق.']]
  },
  graphite: {
    t: [['cheer', 'Sleek!', 'فخم!'], ['hello', 'So moody. I like it.', 'غامق ورايق. حبيته.']],
    g: [['approve', 'Finally. Some taste.', 'أخيرًا، أحد ذوقه عدل.'], ['judge', 'Black. How original.', 'أسود؟ يا سلام على الإبداع.']]
  },
  colour: {
    t: [['cheer', 'Ooh, that’ll look SO good!', 'واو، بيطلع خطير!'], ['hello', 'Hmm, maybe try one more?', 'همم، جرّب لون ثاني؟'], ['oops', 'I can’t decide for you, I’m a blob.', 'لا تسألني، أنا مجرد خيوط ملخبطة.']],
    g: [['judge', 'Hm. Brave choice.', 'هممم… جريء.'], ['approve', 'Acceptable.', 'يمشي.'], ['busy', 'Pick faster, {orders} orders waiting!', 'بسرعة الله يرضى عليك، {orders} طلب ينتظر!']]
  },
  tpu: {
    t: [['cheer', 'Squishy!!', 'طريّة!! أبي أعصرها!']],
    g: [['judge', 'Bendy. Hope you like wobbly.', 'مرن؟ إن شاء الله تحب الأشياء اللي تتلوّى.'], ['shout', 'TPU?! That jams printer {printer}!', 'TPU؟! هذا يسد نوزل الطابعة {printer}!']]
  },
  petg: {
    t: [['cheer', 'Tough stuff!', 'قوية وما تنكسر!'], ['hello', 'Shiny!', 'تلمع!']],
    g: [['approve', 'Dishwasher-safe-ish. Respect.', 'يتحمّل غسالة الصحون… تقريبًا. احترمتك.'], ['judge', 'Strings everywhere. Thanks.', 'خيوط بكل مكان. مشكور.']]
  },
  file: {
    t: [['shout', 'A NEW FILE! I’m so excited!', 'ملف جديد!! متحمسة مرّه!'], ['oops', 'It’s… a lot of triangles.', 'فيه… مثلثات واجد.']],
    g: [['judge', 'Let me guess. No supports.', 'خلني أخمّن… بدون دعامات.'], ['shout', 'Who designs overhangs like THAT?!', 'مين يصمم أوفرهانق كذا؟!']]
  },
  quote: {
    t: [['cheer', 'On it RIGHT NOW!', 'أبدأ فيها الحين!'], ['shout', 'He’ll grumble, but it’ll be great!', 'بيتحلطم، بس بتطلع حلوة!']],
    g: [['shout', 'TAB’A! Another quote!', 'طبعة! جانا طلب تسعيرة!'], ['busy', 'Quote number {orders} today. Adding it to the pile.', 'هذا طلب التسعيرة رقم {orders} اليوم. حطيه فوق الكومة.']]
  },
  done: {
    t: [['cheer', '{id} is DONE!', '{id} خلص!! يا سلام!'], ['hips', '{id}. Nailed it.', '{id}. ضبطت معنا.']],
    g: [['approve', 'Finally.', 'أخيرًا.'], ['judge', 'Only {hours} hours late.', 'تأخر {hours} ساعات بس. عادي.'], ['peer', 'Checked all {total} layers… acceptable.', 'فحصت الـ{total} طبقة… يمشي الحال.']]
  },
  hoard: {
    tree: [N('g', 'judge', '{n} items and no checkout. Going for a world record?', '{n} أغراض وما دفعت؟ ناوي تدخل موسوعة غينيس؟', N('t', 'oops', 'He means it lovingly. Mostly.', 'يمزح… أظن.'), N('t', 'cheer', 'If they are, I’m cheering!', 'لو ناوي، أنا أول وحدة أشجعه!', N('g', 'judge', 'Of course you are.', 'أكيد، وش غيره.')), N('t', 'peer', 'Is that a record? Let me check.', 'جد؟ رقم قياسي؟ بقوقل.', N('g', 'hips', 'It’s a cry for help.', 'هذي صرخة استغاثة.'))), N('g', 'hips', 'This cart is not a museum.', 'ترا السلة مو متحف.', N('t', 'cheer', 'Checkout is RIGHT there! I’ll cheer!', 'زر الدفع هناك! يلا أشجعك!'), N('t', 'hello', 'A very nice museum though.', 'بس متحف حلو، الصراحة.', N('g', 'judge', 'Free entry. No sales.', 'الدخول ببلاش، والبيع… ولا شي.'))), N('t', 'peer', 'Are we… collecting them?', 'يعني… بس نجمّع؟', N('g', 'judge', 'I’m charging rent on that cart.', 'بحط على السلة إيجار شهري.'), N('g', 'shout', 'Collect them AT HOME!', 'جمّعها في بيتكم!')), N('g', 'shout', 'I PUSHED that cart for NOTHING?!', 'يعني دزّيت العربية على الفاضي؟!', N('t', 'hello', 'Shh, they’re thinking. | Right? | …Right?', 'اششش، يفكّر. | صح؟ | …صح؟', N('g', 'peer', 'Thinking for {mins} minutes.', 'صار له {mins} دقيقة يفكّر.')), N('t', 'oops', 'You pushed it for exercise!', 'اعتبرها رياضة!', N('g', 'judge', 'I hate exercise.', 'وأنا أكره الرياضة.'))), N('g', 'peer', 'Still deciding? Printer {printer} is getting cold.', 'للحين تفكر؟ الطابعة {printer} بردت.', N('t', 'shout', 'Take them home, they’re lonely!', 'خذها بيتكم، مساكين لحالهم!'), N('t', 'cheer', 'Take your time! | …but not too much.', 'خذ راحتك! | …بس مو مرّه.')), N('t', 'judge', 'Okay… | even I think that’s a lot of window shopping.', 'طيب… | حتى أنا أشوف إنك طوّلت وأنت تتفرج.', N('g', 'approve', 'Finally she sees it.', 'أخيرًا فهمت.'), N('g', 'oops', 'Wait, you’re on MY side?', 'لحظة، إنتي معي؟', N('t', 'hips', 'Just this once.', 'هالمرة بس، لا تتعود.')))]
  },
  fail: {
    tree: [N('g', 'shout', 'WHAT HAPPENED to {id}?!', 'وش صار لـ{id}؟!', N('t', 'oops', 'Spaghetti from layer {layer}. Try {try}?', 'صار سباغيتي من الطبقة {layer}. نعيده للمرة {try}؟', N('g', 'judge', 'Give it here. | *crunch*', 'هاتها. | *قرمش*'), N('g', 'busy', 'Restarting. Again.', 'نعيد… مرة ثانية.')), N('t', 'shout', 'It was like that when I got here!', 'والله كذا لقيته!', N('g', 'peer', 'You were standing right next to it.', 'وإنتي كنتي واقفة جنبه!'))), N('t', 'oops', 'Um. {id} is… abstract now.', 'امم. {id} صار… فن تجريدي.', N('g', 'judge', 'Abstract is a strong word for “ruined”.', '"تجريدي" هذي كلمة حلوة لـ"خربان".'), N('g', 'approve', 'Snack time.', 'الغدا جاهز.'))]
  }
};
function crewReaction(type, vars = {}) {
  const r = CREW_REACT[type];
  if (!r) return [];
  if (r.tree) return crewWalk(r.tree, vars.__v ? vars : crewVars(vars));
  if (vars.scene === 'run' || vars.scene === 'runTogether') return [];
  let tl = chance(0.8) ? crewPick(r.t) : null;
  let gl = chance(0.75) ? crewPick(r.g) : null;
  if (vars.scene === 'runTogether') tl = crewPick([['shout', 'Wait wait, I’ll help push!', 'استنى استنى، بساعدك!'], ['shout', 'Teamwork! Mostly his work!', 'شغل فريق! بس أغلبه عليه هو!']]);
  if (vars.scene === 'run') gl = null;
  if (!tl && !gl) tl = crewPick(r.t);
  const out = [];
  if (tl) out.push(['t', ...tl]);
  if (gl) out.push(['g', ...gl]);
  if (chance(0.5)) out.reverse();
  if (out.length === 1 && chance(0.45)) {
    const o = out[0][0] === 't' ? 'g' : 't';
    out.push([o, ...crewPick(CREW_BACK[o])]);
  } else if (out.length === 2 && chance(0.25)) {
    const o = out[1][0] === 't' ? 'g' : 't';
    out.push([o, ...crewPick(CREW_BACK[o])]);
  }
  return out;
}
const crew = (type, data = {}) => {
  if (type === 'cart' && !data.scene) data.scene = chance(0.55) ? 'run' : 'runTogether';
  if (type === 'cart' && !data.from) data.from = window.__crewPtr && Date.now() - window.__crewPtr.t < 1500 ? window.__crewPtr : null;
  window.dispatchEvent(new CustomEvent('bara-crew', {
    detail: {
      type,
      ...data
    }
  }));
};

// One shared conversation thread: lines play in order with natural pacing (quick for split bubbles, slower for replies), newest at the bottom.
let crewX = 0;
const crewQueue = (q, seq) => {
  const x = ++crewX;
  seq.forEach((l, n) => q.push({
    w: l[0],
    mood: l[1],
    en: l[2],
    ar: l[3],
    cont: !!l[4],
    first: n === 0,
    x
  }));
};
function useCrewThread(enabled = true, ambient = true, cap = 4, ignoreAway = false) {
  const [thread, setThread] = React.useState([]);
  const q = React.useRef([]);
  React.useEffect(() => {
    if (!enabled) return;
    let alive = true,
      t,
      idle = 0;
    const step = () => {
      if (!alive) return;
      if (!ignoreAway && Date.now() < (window.__crewAway || 0)) {
        t = setTimeout(step, 600);
        return;
      }
      let next = q.current.shift();
      if (next && crewMuted() && !next.free) next = crewMuffle(next);
      if (!next) {
        idle++;
        if (idle * 1200 > 6500) setThread([]);
        if (ambient && idle > 3 + Math.random() * 4 && !(crewMuted() && chance(.7))) {
          idle = 0;
          crewQueue(q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT))));
        }
        t = setTimeout(step, 1200);
        return;
      }
      idle = 0;
      setThread(th => (next.first ? [] : th).concat({
        ...next,
        k: Date.now() + Math.random()
      }).slice(-cap));
      const after = q.current[0];
      const len = (next.en || '').length;
      const d = !after ? 1200 : after.cont ? 650 + len * 18 : 1300 + len * 32 + Math.random() * 500;
      t = setTimeout(step, Math.min(4200, d));
    };
    t = setTimeout(step, 900);
    const on = e => {
      const d = e.detail;
      const seq = crewReaction(d.type, d);
      if (seq.length && ambient) {
        q.current = [];
        const v = {};
        if (d.id) v.id = d.id;
        if (d.n != null) v.n = d.n;
        crewQueue(q.current, crewFill(seq, v));
        if (d.type === 'mute' && q.current[0]) {
          q.current[0].free = true;
          idle = 99;
          clearTimeout(t);
          t = setTimeout(step, 50);
        }
        if (d.type === 'unmute') {
          clearTimeout(t);
          t = setTimeout(step, 300);
        }
      }
    };
    window.addEventListener('bara-crew', on);
    if (ambient) crewQueue(q.current, crewFill(crewWalk(CREW_AMBIENT[0])));
    return () => {
      alive = false;
      clearTimeout(t);
      window.removeEventListener('bara-crew', on);
    };
  }, [enabled]);
  const say = (seq, vars = {}) => {
    q.current = [];
    crewQueue(q.current, crewFill(seq, vars));
  };
  const last = who => {
    for (let n = thread.length - 1; n >= 0; n--) if (thread[n].w === who) return thread[n];
    return null;
  };
  return {
    thread,
    say,
    last,
    q
  };
}
const crewTone = l => l.w === 'g' ? l.mood === 'shout' ? 'shout' : 'judge' : l.mood === 'shout' ? 'shout' : l.mood === 'oops' ? 'say' : 'cheer';
// Each speaker's bubbles are offset so the tail lands over that character. lay = { g|t: { end: bool, off: CSS length from that edge to the tail } }.
function CrewThread({
  thread,
  maxWidth = 260,
  full,
  lay
}) {
  const i = useLangIdx();
  const L = lay || {
    g: {
      end: false,
      off: '0px'
    },
    t: {
      end: true,
      off: '0px'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: full ? '100%' : 'min(340px, calc(100vw - 32px))'
    }
  }, thread.map((l, n) => {
    const prev = thread[n - 1],
      nxt = thread[n + 1];
    const runStart = !prev || prev.w !== l.w,
      runEnd = !nxt || nxt.w !== l.w;
    const g = l.w === 'g';
    const old = n < thread.length - 2;
    const s = L[l.w];
    return /*#__PURE__*/React.createElement("div", {
      key: l.k,
      style: {
        alignSelf: s.end ? 'flex-end' : 'flex-start',
        [s.end ? 'marginInlineEnd' : 'marginInlineStart']: 'max(0px, calc(' + s.off + ' - 29px))',
        marginTop: runStart && n ? 4 : 0,
        opacity: old ? .55 : 1,
        transform: old ? 'scale(.96)' : 'none',
        transformOrigin: (s.end ? 'right' : 'left') + ' bottom',
        transition: 'opacity .3s, transform .3s',
        animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards'
      }
    }, /*#__PURE__*/React.createElement(B.SpeechBubble, {
      tone: crewTone(l),
      who: runStart ? g ? i ? 'وحش اللخبطة' : 'Goblin' : i ? 'طبعة' : 'Tab’a' : undefined,
      tail: runEnd ? s.end ? 'bottom-end' : 'bottom-start' : 'none',
      style: {
        maxWidth,
        animation: 'none'
      }
    }, i ? l.ar : l.en));
  }));
}
const tPose = m => ['shout', 'oops', 'cheer', 'hips', 'peer', 'walk'].includes(m) ? m : 'hello';
const gMood = m => ['shout', 'busy', 'approve', 'judge', 'hips', 'peer', 'walk', 'push'].includes(m) ? m : 'judge';
const T_IDLE = ['hello', 'hips', 'peer', 'hello'],
  G_IDLE = ['judge', 'hips', 'peer', 'judge'];
function useIdle(n) {
  const [k, setK] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setK(x => x + 1), 5200 + Math.random() * 2400);
    return () => clearInterval(t);
  }, []);
  return k % n;
}
function CrewDock() {
  const {
    thread,
    last
  } = useCrewThread(true, true, 4);
  const i = useLangIdx();
  const vw = useVW();
  const quiet = false;
  const muted = useCrewMuted();
  const idle = useIdle(4);
  const [away, setAway] = React.useState(false);
  React.useEffect(() => {
    let t;
    const on = e => {
      const d = e.detail;
      if (d.type === 'cart' && (d.scene === 'run' || d.scene === 'runTogether')) {
        window.__crewAway = Date.now() + 4800;
        setAway(true);
        clearTimeout(t);
        t = setTimeout(() => setAway(false), 4800);
      }
    };
    window.addEventListener('bara-crew', on);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-crew', on);
    };
  }, []);
  React.useEffect(() => {
    let t;
    const chk = () => {
      const left = (window.__crewAway || 0) - Date.now();
      setAway(left > 0);
      clearTimeout(t);
      if (left > 0) t = setTimeout(chk, Math.min(left, 2000) + 20);
    };
    window.addEventListener('bara-away', chk);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-away', chk);
    };
  }, []);
  const sz = vw < 640 ? 56 : 76;
  const lg = last('g'),
    lt = last('t');
  const speaking = thread.length ? thread[thread.length - 1].w : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "s-dock",
    style: {
      position: 'fixed',
      insetInlineEnd: 12,
      bottom: 12,
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8,
      pointerEvents: 'none',
      opacity: away ? 0 : 1,
      transform: away ? 'translateY(24px)' : 'none',
      transition: 'opacity .35s, transform .35s',
      visibility: away ? 'hidden' : 'visible'
    }
  }, !quiet && /*#__PURE__*/React.createElement(CrewThread, {
    thread: thread,
    maxWidth: vw < 640 ? 210 : 260,
    lay: {
      g: {
        end: true,
        off: 12 + sz * 1.3 + 'px'
      },
      t: {
        end: true,
        off: 12 + sz * 0.5 + 'px'
      }
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: crewClick,
    title: muted ? 'Take the tape off' : 'Tape their mouths',
    "aria-label": muted ? 'Unmute the crew' : 'Mute the crew',
    "aria-pressed": muted,
    style: {
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 0,
      border: '2px solid var(--graphite-900)',
      borderRadius: 999,
      background: 'var(--paper-0)',
      padding: '4px 10px 0',
      boxShadow: 'var(--shadow-hard-sm)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: speaking === 'g' ? 'translateY(-3px)' : 'none',
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement(B.Goblin, {
    mood: lg ? gMood(lg.mood) : G_IDLE[idle],
    size: sz,
    track: true,
    taped: muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginInlineStart: -sz * 0.2,
      transform: speaking === 't' ? 'translateY(-3px)' : 'none',
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    taped: muted,
    pose: lt ? tPose(lt.mood) : T_IDLE[(idle + 2) % 4],
    size: sz,
    track: true
  }))));
}

// Live print queue from BARA_CONFIG.endpoints.floor (polled). No feed → the crew still banters, but no orders are shown.
const floorRows = d => (Array.isArray(d) ? d : d && (d.orders || d.items) || []).slice(0, 6);
function CrewFloor() {
  const t = useT();
  const i = useLangIdx();
  const crewT = useCrewThread(true, false, 5);
  const muted = useCrewMuted();
  const [orders, setOrders] = React.useState([]);
  const prev = React.useRef({});
  React.useEffect(() => {
    const say = (seq, id) => {
      if (seq.length) {
        crewT.q.current = [];
        crewQueue(crewT.q.current, crewFill(seq, id ? {
          id
        } : {}));
      }
    };
    say(crewWalk(CREW_AMBIENT[0]));
    const stop = baraApi.poll('floor', baraApi.config.floorPollMs, data => {
      if (!data) return;
      const rows = floorRows(data);
      let ev = null;
      rows.forEach(o => {
        const was = prev.current[o.id];
        if (!ev && was && was !== o.status && (o.status === 'done' || o.status === 'failed')) ev = [o.status === 'done' ? 'done' : 'fail', o.id];
      });
      prev.current = Object.fromEntries(rows.map(o => [o.id, o.status]));
      setOrders(rows);
      if (ev) say(crewReaction(ev[0]), ev[1]);
    });
    const talk = setInterval(() => {
      if (!crewT.q.current.length && Math.random() < .5) crewQueue(crewT.q.current, crewFill(crewWalk(crewPick(CREW_AMBIENT))));
    }, 5200);
    return () => {
      stop();
      clearInterval(talk);
    };
  }, []);
  const live = orders.length > 0;
  const st = {
    printing: ['info', ['Printing', 'تنطبع']],
    queued: ['neutral', ['Queued', 'بالانتظار']],
    done: ['success', ['Done', 'خلص']],
    failed: ['danger', ['Spaghetti', 'خربت']]
  };
  const stOf = o => st[o.status] || st.queued;
  const g = crewT.last('g'),
    tb = crewT.last('t');
  return /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, live ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--danger)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: 'var(--danger)',
      boxShadow: '0 0 0 4px var(--danger-tint)'
    }
  }), t(['Live from the floor', 'مباشر من الورشة'])) : /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--fg-3)'
    }
  }, t(SITE.sys.floorIdle)), /*#__PURE__*/React.createElement(PrintText, null, t(['Two workers. Six printers. Zero chill.', 'اثنين يشتغلون. ست طابعات. ولا لحظة راحة.']))), live && /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 10.5,
      color: 'var(--fg-3)'
    }
  }, t(SITE.sys.floorNoInfo))), /*#__PURE__*/React.createElement("div", {
    className: live ? 's-split' : undefined,
    style: {
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      background: 'var(--paper-0)',
      backgroundImage: 'var(--tex-bed)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      padding: '230px 16px 20px',
      minHeight: 440
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      bottom: 206,
      insetInlineStart: 16,
      insetInlineEnd: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(CrewThread, {
    thread: crewT.thread,
    maxWidth: 300,
    full: true,
    lay: {
      g: {
        end: false,
        off: '25%'
      },
      t: {
        end: true,
        off: '25%'
      }
    }
  })), /*#__PURE__*/React.createElement("div", {
    onClick: crewClick,
    style: {
      cursor: 'pointer'
    },
    title: "Tape"
  }, /*#__PURE__*/React.createElement(B.Goblin, {
    mood: g ? gMood(g.mood) : 'busy',
    size: 180,
    taped: muted
  })), /*#__PURE__*/React.createElement("div", {
    onClick: crewClick,
    style: {
      cursor: 'pointer'
    },
    title: "Tape"
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: tb ? tPose(tb.mood) : 'printing',
    size: 180,
    taped: muted
  }))), live && /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, orders.map(o => {
    const p = SITE_PRODUCTS.find(x => x.id === o.item);
    const name = p ? [p.en, p.ar] : o.name ? [o.name.en || o.name, o.name.ar || o.name.en || o.name] : [String(o.item || ''), String(o.item || '')];
    const pct = o.total ? Math.round(o.layer / o.total * 100) : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0,1fr) auto',
        gap: 12,
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: 14,
        background: o.status === 'failed' ? 'rgba(212,42,42,.18)' : 'var(--graphite-800)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 99,
        background: o.hex,
        border: '2px solid var(--paper-0)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'baseline',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        fontSize: 10.5,
        color: 'var(--yolk-300)'
      }
    }, o.id), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 14px/1.2 var(--font-body)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, t(name))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: 'var(--graphite-700)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + '%',
        height: '100%',
        background: o.status === 'failed' ? 'var(--danger)' : o.status === 'done' ? 'var(--success)' : 'var(--yolk-500)',
        transition: 'width 1.1s linear'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        fontSize: 9.5,
        color: 'var(--graphite-400)'
      }
    }, "P", o.printer, " \xB7 L ", o.layer, "/", o.total)), /*#__PURE__*/React.createElement(B.Badge, {
      tone: stOf(o)[0],
      dot: true
    }, t(stOf(o)[1])));
  }))));
}
const CART_GRUMBLE = [['MORE?! The cart’s already full!', 'بعد؟! العربية انترست!'], ['Fine. I’ll carry it. Again.', 'طيب. أنا اللي بشيل، كالعادة.'], ['Who orders THIS many things?!', 'وش ذا كله؟! فاتح محل؟'], ['My back. My poor back.', 'آه يا ظهري… آه.'], ['Coming through! MOVE!', 'وخّروا! وخّروا الطريق!']];
const CART_TABA = [['Push! PUSH!', 'دزّ! دزّ!'], ['I’m helping! Kind of!', 'أنا أساعد! يعني… تقريبًا!'], ['Nice pick by the way!', 'ترا اختيارك حلو!'], ['Left! No, your OTHER left!', 'يسار! لا لا، يسارك الثاني!']];
if (!window.__crewPtrOn) {
  window.__crewPtrOn = 1;
  window.addEventListener('pointerdown', e => {
    window.__crewPtr = {
      x: e.clientX,
      y: e.clientY,
      t: Date.now()
    };
  }, true);
}
function CartRunner() {
  const i = useLangIdx();
  const [run, setRun] = React.useState(null);
  const muted = useCrewMuted();
  const fly = React.useRef(null);
  React.useEffect(() => {
    const on = e => {
      const d = e.detail;
      if (d.type === 'cart' && (d.scene === 'run' || d.scene === 'runTogether')) {
        setRun({
          k: Date.now(),
          hex: d.hex || '#F2B705',
          from: d.from,
          both: d.scene === 'runTogether',
          mutter: d.scene === 'runTogether' ? chance(0.5) : chance(0.7),
          line: crewPick(CART_GRUMBLE),
          tl: crewPick(CART_TABA)
        });
        clearTimeout(window.__cr);
        window.__cr = setTimeout(() => setRun(null), 4600);
      }
    };
    window.addEventListener('bara-crew', on);
    return () => window.removeEventListener('bara-crew', on);
  }, []);
  React.useEffect(() => {
    const el = fly.current;
    if (!run || !el) return;
    const rtl = document.documentElement.dir === 'rtl';
    const W = window.innerWidth,
      H = window.innerHeight;
    const off = 52 + (run.both ? 66 : 0);
    const tx = rtl ? W / 2 - off : W / 2 + off,
      ty = H - 150;
    const fx = run.from ? run.from.x : W / 2,
      fy = run.from ? run.from.y : H * 0.4;
    const dx = tx - fx,
      dy = ty - fy,
      peak = Math.min(0, dy) - 140;
    el.style.left = fx - 20 + 'px';
    el.style.top = fy - 16 + 'px';
    el.animate([{
      transform: 'translate(0,0) scale(.6)',
      opacity: 0
    }, {
      transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)',
      opacity: 1,
      offset: .12
    }, {
      transform: 'translate(0,-30px) scale(1.15) rotate(-12deg)',
      opacity: 1,
      offset: .55
    }, {
      transform: `translate(${dx * .5}px,${peak}px) scale(1.05) rotate(160deg)`,
      offset: .78
    }, {
      transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`,
      opacity: 1,
      offset: .98
    }, {
      transform: `translate(${dx}px,${dy}px) scale(1) rotate(366deg)`,
      opacity: 0
    }], {
      duration: 2000,
      easing: 'cubic-bezier(.4,0,.3,1)',
      fill: 'forwards'
    });
  }, [run && run.k]);
  if (!run) return null;
  const rm = false;
  const rtl = document.documentElement.dir === 'rtl';
  const flip = rtl ? {
    transform: 'scaleX(-1)'
  } : null;
  const pile = [['box', '#EAE3D2', -8, 0, 0], ['spool', '#E8367A', 6, 44, 0], ['box', '#F2B705', 10, 92, 0], ['spool', '#12A5A0', -12, 20, 34], ['box', '#2F6BFF', 4, 66, 30], ['spool', '#232327', -4, 108, 26]];
  const piece = ([k, col, rot, x, y], n, extra) => k === 'box' ? /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      position: 'absolute',
      left: x,
      bottom: y,
      width: 40,
      height: 32,
      background: col,
      border: '2.5px solid var(--graphite-900)',
      borderRadius: 6,
      transform: 'rotate(' + rot + 'deg)',
      backgroundImage: 'var(--tex-layers)',
      ...extra
    }
  }) : /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      position: 'absolute',
      left: x,
      bottom: y,
      width: 36,
      height: 36,
      background: col,
      border: '2.5px solid var(--graphite-900)',
      borderRadius: 99,
      transform: 'rotate(' + rot + 'deg)',
      ...extra
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 10,
      borderRadius: 99,
      background: 'var(--paper-0)',
      border: '2.5px solid var(--graphite-900)'
    }
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    key: 'f' + run.k,
    ref: fly,
    "aria-hidden": true,
    style: {
      position: 'fixed',
      zIndex: 46,
      pointerEvents: 'none',
      width: 40,
      height: 32,
      background: run.hex,
      border: '2.5px solid var(--graphite-900)',
      borderRadius: 6,
      backgroundImage: 'var(--tex-layers)',
      boxShadow: 'var(--shadow-hard-sm)',
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    key: run.k,
    "aria-hidden": true,
    style: {
      position: 'fixed',
      bottom: 6,
      zIndex: 45,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4,
      ...(rm ? {
        [rtl ? 'right' : 'left']: 'calc(50vw - 150px)',
        animation: 's-fadepark 3s ease both'
      } : {
        animation: (rtl ? 's-cartrun-rtl' : 's-cartrun') + ' 4.4s cubic-bezier(.45,.05,.4,1) forwards'
      })
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, run.mutter && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      insetInlineStart: 10,
      marginBottom: 4,
      width: 'max-content',
      maxWidth: 240
    }
  }, /*#__PURE__*/React.createElement(B.SpeechBubble, {
    tone: "shout",
    who: i ? 'وحش اللخبطة' : 'Mess Goblin'
  }, muted ? i ? 'ممف ممف!' : 'Mmph mmph!' : i ? run.line[1] : run.line[0])), /*#__PURE__*/React.createElement(B.Goblin, {
    mood: "push",
    ignoreReducedMotion: true,
    size: 120,
    style: flip,
    taped: muted
  })), run.both && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      order: -1,
      marginInlineEnd: -30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '100%',
      insetInlineEnd: 20,
      marginBottom: 72,
      width: 'max-content',
      maxWidth: 200
    }
  }, /*#__PURE__*/React.createElement(B.SpeechBubble, {
    tone: "cheer",
    who: i ? 'طبعة' : 'Tab’a'
  }, muted ? i ? 'مم-ممف!' : 'Mm-mmph!' : i ? run.tl[1] : run.tl[0])), /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "walk",
    ignoreReducedMotion: true,
    size: 96,
    style: flip,
    taped: muted
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 156,
      height: 150,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 4,
      right: 4,
      bottom: 34,
      height: 110
    }
  }, pile.map((p, n) => piece(p, n)), piece(['box', run.hex, 6, 54, 62], 'new', {
    width: 46,
    height: 38,
    animation: rm ? 's-fadein .4s .7s both' : 's-land .3s 1.95s cubic-bezier(.3,1.4,.5,1) both'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 20,
      height: 56,
      background: 'var(--paper-0)',
      border: '3px solid var(--graphite-900)',
      borderRadius: '4px 4px 16px 16px',
      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 22px, var(--graphite-900) 22px 24px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      insetInlineStart: -22,
      bottom: 64,
      width: 30,
      height: 6,
      background: 'var(--graphite-900)',
      borderRadius: 3,
      transform: 'rotate(' + (rtl ? 20 : -20) + 'deg)'
    }
  }), [18, 118].map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    style: {
      position: 'absolute',
      left: x,
      bottom: 0,
      width: 22,
      height: 22,
      borderRadius: 99,
      background: 'var(--graphite-900)',
      boxShadow: 'inset 0 0 0 6px var(--graphite-900), inset 0 0 0 10px var(--paper-2)'
    }
  })))));
}

// Peek-a-boo: now and then both characters pop out from behind a product tile / card on screen, argue, then duck back.
const CREW_PEEK = [N('g', 'peer', 'Psst. | Over here.', 'پسس. | هنا، ورا.', N('t', 'shout', 'What are you doing behind the {part}?!', 'وش مدسّك ورا {part:ar}؟!', N('g', 'judge', 'Hiding from the customers.', 'متخبي من الزباين.', N('t', 'oops', '…they can SEE you.', '…ترا كلهم شايفينك.')), N('g', 'hips', 'Quality control.', 'أراقب الجودة. شغل مهم.'))), N('t', 'peer', 'Is this one ours?', 'هذا من شغلنا؟', N('g', 'judge', 'It’s got a {mat} string on it. | Yes.', 'عليه خيط {mat} معلّق. | إيه، حقنا.'), N('g', 'approve', 'Ours. And it’s good.', 'حقنا. وطالع نظيف.', N('t', 'cheer', 'Did you just say something NICE?', 'قلت كلمة حلوة؟! أنت؟!', N('g', 'shout', 'NO.', 'لا. ما قلت.')))), N('t', 'oops', 'I think I’m stuck. | Behind the {part}.', 'شكلي علقت. | ورا {part:ar}.', N('g', 'judge', 'Good. Stay.', 'زين. خليك مكانك.'), N('g', 'busy', 'AGAIN?!', 'مرة ثانية؟! وش فيك؟', N('t', 'oops', 'It’s cosy back here.', 'المكان دافي هنا ورايق.'))), N('g', 'peer', 'This shelf is dusty. | …I’m not dusting it.', 'هالرف كله غبار. | …ولا راح أنظفه.', N('t', 'cheer', 'I’ll do it!', 'خلاص أنا أنظفه!', N('g', 'judge', 'You’ll print a duster first.', 'أول شي بتطبعين منفضة، صح؟', N('t', 'hips', '…obviously.', '…أكيد، وش تتوقع؟')))), N('t', 'shout', 'You said you fixed printer {printer}!', 'مو قلت إنك صلّحت الطابعة {printer}؟!', N('g', 'hips', 'I said I LOOKED at it.', 'قلت شفتها، ما قلت صلّحتها.'), N('g', 'oops', '…define “fixed”.', '…يعتمد وش قصدك بـ"صلّحتها".', N('t', 'shout', 'IT’S ON FIRE?!', 'ليه يطلع منها دخان؟!', N('g', 'judge', 'Warm. It’s warm.', 'حامية شوي بس. عادي.')))), N('g', 'shout', 'Who moved the {part}?!', 'مين اللي حرّك {part:ar}؟!', N('t', 'oops', '…it moved itself.', '…مشى لحاله.', N('g', 'peer', 'Things don’t just move.', 'الأغراض ما تمشي لحالها.', N('t', 'peer', 'YOU just moved. | From behind a shelf.', 'وأنت توك طالع… | من ورا رف.'))), N('t', 'cheer', 'Me! It looks better here!', 'أنا! مكانه هنا أحلى!')), N('t', 'peer', 'Do you think they can hear us?', 'تتوقع يسمعوننا؟', N('g', 'judge', 'They can read us.', 'يقرون كلامنا ترا.', N('t', 'oops', '…hi.', '…هلا والله.')), N('g', 'shout', 'BUY SOMETHING.', 'اشتر لك شي!'))];
// Page-aware peeks: lines about what's on screen. Route from the hash (website) or window.__peekCtx (other kits).
const CREW_PEEK_CTX = {
  product: [N('g', 'peer', 'So. | You’re looking at the {part}.', 'اها. | عاجبك {part:ar}؟', N('t', 'cheer', 'Spin it! Drag it around!', 'لفّه! اسحبه وطالع من كل جهة!', N('g', 'judge', 'Don’t make it dizzy.', 'لا تدوّخه.')), N('t', 'peer', 'Look at those layers…', 'شوف الطبقات كيف مرتبة…', N('g', 'approve', 'Clean. I sanded nothing.', 'نظيفة. وبدون صنفرة.'))), N('t', 'cheer', 'The {part}! | I printed that one!', '{part:ar}! | أنا اللي طبعته!', N('g', 'hips', 'You watched it print.', 'إنتي كنتي بس تطالعين فيه.', N('t', 'oops', '…supervising is work.', '…الإشراف شغل ترا.')), N('g', 'peer', 'Pick a colour already.', 'اختار لون وخلصنا.')), N('g', 'judge', 'The {part} in {mat}? | Bold.', '{part:ar} بـ{mat}؟ | جريء.', N('t', 'shout', 'It’s PERFECT in {mat}!', 'بالـ{mat} يجنن!'), N('t', 'hello', 'Try another swatch!', 'جرّب لون ثاني!'))],
  custom: [N('t', 'peer', 'Ooh, a mystery file.', 'أوه، ملف غامض.', N('g', 'judge', 'Let me guess. | No supports. | Again.', 'خلني أخمّن. | بدون دعامات. | كالعادة.'), N('g', 'shout', 'Check the wall thickness!', 'شيّك على سماكة الجدار!')), N('g', 'busy', 'Fast or Standard? | Choose wisely.', 'سريع ولا عادي؟ | اختار صح.', N('t', 'cheer', 'Fast! Always fast!', 'سريع! دايم سريع!', N('g', 'judge', 'Fast is how spaghetti happens.', 'السريع هو اللي يجيب السباغيتي.')))],
  sell: [N('g', 'peer', 'Your design? | Really yours?', 'تصميمك؟ | من جدك إنه حقك؟', N('t', 'cheer', 'Trust them!', 'صدّقه!'), N('t', 'judge', 'He checks every one. Every. One.', 'يشيّك على كل واحد. كل واحد.')), N('t', 'cheer', 'Points! For every sale!', 'نقاط! مع كل بيعة!', N('g', 'hips', 'Not if you buy it yourself.', 'إلا إذا شريته لنفسك.', N('t', 'oops', '…he caught three people already.', '…ترا مسك ثلاثة قبلك.')))],
  materials: [N('t', 'peer', 'Which one’s your favourite?', 'أي واحد تحبه أكثر؟', N('g', 'approve', 'PETG. It doesn’t whine.', 'PETG. ما يتدلع.'), N('g', 'judge', 'Loop. Because it’s ME.', 'Loop. لأنه من صنعي.')), N('g', 'shout', 'TPU is NOT a toy!', 'TPU مو لعبة!', N('t', 'cheer', 'It’s squishy though!', 'بس طري!'))],
  loop: [N('g', 'hips', 'This page is about me. | Finally.', 'هالصفحة عني. | أخيرًا.', N('t', 'oops', 'It’s about recycling…', 'هي عن التدوير…', N('g', 'judge', 'Same thing.', 'نفس الشي.'))), N('t', 'peer', 'Do you really eat all of it?', 'جد تاكلها كلها؟', N('g', 'approve', 'Then it comes out as new spools.', 'وبعدين تطلع بكرات جديدة.', N('t', 'oops', 'I didn’t need to know that.', 'ليتني ما سألت.')))],
  studio: [N('t', 'cheer', 'Paint it! | Every part a different colour!', 'لوّنه! | كل قطعة بلون!', N('g', 'judge', 'And who swaps the spools? Me.', 'ومين يبدّل البكرات؟ أنا.'), N('g', 'peer', 'That combo… | works. Annoyingly.', 'هالتنسيق… | حلو. للأسف.')), N('g', 'peer', 'That {mat} is almost out of stock.', 'الـ{mat} قرّب يخلص.', N('t', 'shout', 'Order more!', 'اطلب بعد!'), N('t', 'oops', 'I may have used it for… a hat.', 'يمكن إني طبعت فيه… قبعة.')), N('t', 'peer', 'Compare mode! | Side by side!', 'وضع المقارنة! | حطهم جنب بعض!', N('g', 'hips', 'Left one. Obviously.', 'اليسار. أكيد.', N('t', 'shout', 'RIGHT one!', 'اليمين!', N('g', 'judge', 'Wrong.', 'غلط.'))))]
};
const crewRoute = () => window.__peekCtx || location.hash.replace(/^#\/?/, '').split('/')[0] || 'home';
const CREW_PEEK_SOLO = {
  g: [['peer', 'Psst. | Don’t tell Tab’a I’m here.', 'پسس. | لا تقول لطبعة إني هنا.'], ['judge', 'This {part}? | …I’d buy it. Don’t quote me.', '{part:ar}؟ | …لو مكانك اشتريته. بس لا تقول لأحد.'], ['hips', 'I’m on break. | For {mins} minutes. | Officially.', 'أنا في بريك. | {mins} دقيقة. | رسمي.']],
  t: [['peer', 'Hiii. | Have you seen the Goblin?', 'هلاااا. | ما شفت وحش اللخبطة؟'], ['cheer', 'Ooh, the {part}! | I helped print that!', 'ياي، {part:ar}! | أنا ساعدت فيه!'], ['oops', 'I’m hiding. | He wants me to clean printer {printer}.', 'متخبية. | يبيني أنظف الطابعة {printer}.']]
};
// Where to mount peekers: the tile itself, unless it (or an ancestor) clips — then just outside the outermost clipping ancestor.
function peekHost(el) {
  let clip = null;
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (getComputedStyle(n).overflow !== 'visible') clip = n;
  }
  return clip ? clip.parentElement || document.body : el;
}
function PeekCrew() {
  const crewT = useCrewThread(true, false, 4, true);
  const muted = useCrewMuted();
  const [peek, setPeek] = React.useState(null);
  const [, force] = React.useState(0);
  const peekRef = React.useRef(null);
  peekRef.current = peek;
  const vw = useVW();
  const sz = vw < 640 ? 64 : 92;
  React.useEffect(() => {
    let t;
    const rtl = () => document.documentElement.dir === 'rtl';
    const schedule = ms => {
      clearTimeout(t);
      t = setTimeout(tryPeek, ms);
    };
    const tryPeek = () => {
      if (Date.now() < (window.__crewAway || 0) || document.hidden) return schedule(8000);
      const H = innerHeight,
        W = innerWidth;
      const els = Array.from(document.querySelectorAll(window.__peekSel || 'main .s-squish, main .s-g4 > *, main [data-peek], main [style*="border: 2px solid var(--graphite-900)"]')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 160 && r.height > 110 && r.top > 90 && r.top < H - 120 && r.left > -10 && r.right < W + 10 && !el.closest('.s-dock');
      }).filter((el, n, arr) => !arr.some(o => o !== el && o.contains(el) && o.getBoundingClientRect().height < innerHeight * .9));
      if (!els.length) return schedule(9000);
      const narrow = W < 640;
      const roomTop = 72 + sz * .8 + 90; // header + character + bubble room
      const okTop = el => el.getBoundingClientRect().top > roomTop;
      let pool = els.filter(okTop);
      if (!pool.length) return schedule(7000);
      const a = crewPick(pool);
      let b = a;
      const ra = a.getBoundingClientRect();
      if (narrow) {
        const other = pool.filter(x => x !== a && Math.abs(x.getBoundingClientRect().top - ra.top) > ra.height * .6);
        if (other.length) b = crewPick(other);
      } else if (pool.length > 1 && chance(.6)) {
        const far = pool.filter(x => {
          if (x === a) return false;
          const r = x.getBoundingClientRect();
          return Math.abs(r.top - ra.top) > ra.height * .6 || Math.abs(r.left + r.width / 2 - (ra.left + ra.width / 2)) > 300;
        });
        if (far.length) b = crewPick(far);
      }
      const first = chance(.5) ? 'g' : 't';
      const sideFor = el => {
        const r = el.getBoundingClientRect();
        const opts = ['top', 'top', 'top'];
        if (r.left > sz + 12) opts.push('left');
        if (W - r.right > sz + 12) opts.push('right');
        return crewPick(opts);
      };
      const same = a === b;
      // narrow + one row only → single peeker (no collision possible)
      const solo = same && (narrow || ra.width < 300 + sz);
      const slotFor = el => {
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2 < W / 2 ? .3 : .7;
      };
      const spots = solo ? [{
        el: a,
        side: 'top',
        slot: slotFor(a),
        half: true
      }, null] : same ? [{
        el: a,
        side: 'top',
        slot: .2,
        halfTile: true
      }, {
        el: a,
        side: 'top',
        slot: .8,
        halfTile: true
      }] : narrow ? [{
        el: a,
        side: 'top',
        slot: slotFor(a),
        half: true
      }, {
        el: b,
        side: 'top',
        slot: slotFor(b),
        half: true
      }] : [{
        el: a,
        side: 'top',
        slot: .3 + Math.random() * .4
      }, {
        el: b,
        side: 'top',
        slot: .3 + Math.random() * .4
      }];
      if (first === 't') spots.reverse();
      spots.forEach(s => {
        if (s) s.host = peekHost(s.el);
      });
      if (!spots[1]) {
        const s0 = spots[0];
        setPeek({
          k: Date.now(),
          g: first === 'g' ? s0 : null,
          t: first === 't' ? s0 : null,
          out: false
        });
      } else setPeek({
        k: Date.now(),
        g: spots[0],
        t: spots[1],
        out: false
      });
      window.__peekSolo = !spots[1] ? first : null;
      window.__crewAway = Date.now() + 60000;
      window.dispatchEvent(new CustomEvent('bara-away'));
      const route = crewRoute();
      const pv = {};
      if (route === 'product') {
        const id = location.hash.split('/')[2];
        const p = (window.SITE_PRODUCTS || []).find(x => x.id === id);
        if (p) {
          pv.part = p.en;
          pv['part:ar'] = p.ar;
        }
      }
      const ctxPool = CREW_PEEK_CTX[route];
      const tree = ctxPool && chance(.7) ? crewPick(ctxPool) : crewPick(CREW_PEEK);
      setTimeout(() => !spots[1] ? crewT.say([[first, ...crewPick(CREW_PEEK_SOLO[first])]], pv) : crewT.say(crewWalk(tree, crewVars(pv))), 650);
    };
    window.__peekNext = () => schedule(0);
    schedule(9000 + Math.random() * 8000);
    const end = () => {
      setPeek(p => p ? {
        ...p,
        out: true
      } : p);
      setTimeout(() => {
        setPeek(null);
        window.__crewAway = Date.now() + 400;
        window.dispatchEvent(new CustomEvent('bara-away'));
        schedule(28000 + Math.random() * 22000);
      }, 520);
    };
    window.__peekEnd = end;
    const onCart = e => {
      if (e.detail.type === 'cart' && peekRef.current && !peekRef.current.out) {
        setPeek(p => p ? {
          ...p,
          out: true
        } : p);
        setTimeout(() => {
          setPeek(null);
          schedule(30000 + Math.random() * 20000);
        }, 520);
      }
    };
    window.addEventListener('bara-crew', onCart);
    return () => {
      clearTimeout(t);
      window.removeEventListener('bara-crew', onCart);
    };
  }, []);
  // Anchor: render inside each target tile so they scroll with it natively (no per-frame repositioning).
  React.useEffect(() => {
    if (!peek) return;
    const sp = [peek.g, peek.t].filter(Boolean);
    const els = [...new Set(sp.map(s => s.host))];
    const saved = els.map(el => [el.style.position, el.style.zIndex]);
    els.forEach(el => {
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      if (sp.some(s => s.host === el && s.el === el)) el.style.zIndex = '30';
    });
    const a = setTimeout(() => force(x => x + 1), 80),
      b = setTimeout(() => force(x => x + 1), 300);
    const sc = e => {
      if (e.target !== document && e.target !== document.documentElement) force(x => x + 1);
    };
    window.addEventListener('scroll', sc, true);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      window.removeEventListener('scroll', sc, true);
      els.forEach((el, n) => {
        el.style.position = saved[n][0];
        el.style.zIndex = saved[n][1];
      });
    };
  }, [peek && peek.k]);
  React.useEffect(() => {
    if (peek && peek.out) force(x => x + 1);
  }, [peek && peek.out]);
  // finish when the argument is over or the tile scrolls away
  React.useEffect(() => {
    if (!peek || peek.out) return;
    const iv = setInterval(() => {
      const sp = [peek.g, peek.t].filter(Boolean);
      const gone = sp.some(s => {
        const r = s.el.getBoundingClientRect();
        return r.bottom < 60 || r.top > innerHeight - 20 || !s.el.isConnected;
      });
      const th = crewT.thread;
      const idleDone = Date.now() - peek.k > 2500 && !crewT.q.current.length && (!th.length || Date.now() - th[th.length - 1].k > 2600);
      if (gone || idleDone) window.__peekEnd();
    }, 400);
    return () => clearInterval(iv);
  }, [peek, crewT.thread]);
  if (!peek) return null;
  const rtl = document.documentElement.dir === 'rtl';
  const W = innerWidth;
  const lg = crewT.last('g'),
    lt = crewT.last('t');
  const latest = crewT.thread.slice(-2).map(x => x.k);
  const one = (who, spot, line) => {
    const el = spot.el;
    const host = spot.host || el;
    const r = el.getBoundingClientRect();
    const hr = host.getBoundingClientRect();
    const s = spot.side;
    const Wd = r.width;
    const dx = host === el ? 0 : r.left - hr.left + host.scrollLeft,
      dy = host === el ? 0 : r.top - hr.top + host.scrollTop;
    const box = s === 'top' ? {
      left: Wd * spot.slot - sz / 2,
      top: -sz * .78,
      width: sz,
      height: sz * .78
    } : s === 'left' ? {
      left: -sz * .72,
      top: 40,
      width: sz * .72,
      height: sz
    } : {
      left: Wd,
      top: 40,
      width: sz * .72,
      height: sz
    };
    const hide = s === 'top' ? 'translateY(100%)' : s === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
    const shown = !peek.out && Date.now() - peek.k > (who === 'g' ? 60 : 260);
    const cxRel = box.left + box.width / 2;
    const tailLeft = spot.halfTile ? spot.slot < .5 : r.left + cxRel < W / 2;
    const bub = line && latest.includes(line.k) && shown;
    const items = [];
    if (bub) {
      const th = crewT.thread;
      let n = th.length - 1;
      while (n >= 0 && th[n].w !== who) n--;
      let m = n;
      while (m > 0 && th[m - 1].w === who) m--;
      for (let j = m; j <= n; j++) items.push(th[j]);
    }
    const i = document.documentElement.lang === 'ar' ? 1 : 0;
    const bw = spot.half ? Math.floor(W / 2 - 16) : spot.halfTile ? Math.max(150, Math.floor(Wd / 2 + sz * .3)) : 260;
    return ReactDOM.createPortal(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      onClick: crewClick,
      title: "Tape",
      style: {
        position: 'absolute',
        ...box,
        left: box.left + dx,
        top: box.top + dy,
        overflow: 'hidden',
        zIndex: host === el ? 2 : 60,
        pointerEvents: shown ? 'auto' : 'none',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: sz,
        height: sz,
        transform: shown ? 'none' : hide,
        transition: 'transform .45s cubic-bezier(.3,1.35,.5,1)',
        marginLeft: s === 'right' ? -sz * .28 : 0
      }
    }, who === 'g' ? /*#__PURE__*/React.createElement(B.Goblin, {
      mood: lg ? gMood(lg.mood) : 'peer',
      size: sz,
      track: true,
      taped: muted
    }) : /*#__PURE__*/React.createElement(B.Mascot, {
      pose: lt ? tPose(lt.mood) : 'peer',
      size: sz,
      track: true,
      taped: muted
    }))), items.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        zIndex: host === el ? 3 : 61,
        pointerEvents: 'none',
        top: box.top + dy - 6,
        transform: 'translateY(-100%)',
        [tailLeft ? 'left' : 'right']: tailLeft ? cxRel + dx - 29 : (host === el ? Wd : hr.width) - (cxRel + dx) - 29,
        width: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: tailLeft ? 'flex-start' : 'flex-end',
        gap: 4,
        maxWidth: bw
      }
    }, items.map((l, n) => /*#__PURE__*/React.createElement("div", {
      key: l.k,
      style: {
        animation: 's-bub .28s cubic-bezier(.3,1.4,.5,1) backwards'
      }
    }, /*#__PURE__*/React.createElement(B.SpeechBubble, {
      tone: crewTone(l),
      who: n ? undefined : who === 'g' ? i ? 'وحش اللخبطة' : 'Goblin' : i ? 'طبعة' : 'Tab’a',
      tail: n === items.length - 1 ? tailLeft !== rtl ? 'bottom-start' : 'bottom-end' : 'none',
      style: {
        maxWidth: bw,
        animation: 'none'
      }
    }, i ? l.ar : l.en))))), host, who);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, peek.g && one('g', peek.g, lg), peek.t && one('t', peek.t, lt));
}
Object.assign(window, {
  crewMute,
  useCrewMuted,
  PeekCrew,
  CartRunner,
  crew,
  CrewDock,
  CrewFloor,
  useCrewThread,
  CrewThread
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Crew.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const SRC_META = {
  makerworld: {
    name: 'MakerWorld',
    bg: 'var(--mat-loop)',
    fg: 'var(--graphite-900)'
  },
  printables: {
    name: 'Printables',
    bg: 'var(--mat-pla)',
    fg: '#fff'
  }
};
function SourceChip({
  p,
  size = 'sm'
}) {
  const m = SRC_META[p.src];
  if (!m) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '700 ' + (size === 'lg' ? 12 : 10.5) + 'px/1 var(--font-mono)',
      letterSpacing: '.04em',
      padding: size === 'lg' ? '7px 10px 6px' : '5px 8px 4px',
      borderRadius: 999,
      background: m.bg,
      color: m.fg,
      border: '2px solid var(--graphite-900)',
      whiteSpace: 'nowrap'
    }
  }, m.name);
}
function ProductTile({
  p,
  go,
  add
}) {
  const t = useT();
  const C = SITE.community;
  const shot = useModelShot(p.id, p.hex || {
    pla: '#E8367A',
    yolk: '#F2B705',
    tpu: '#2F6BFF',
    petg: '#12A5A0',
    paper: '#F2B705'
  }[p.tone] || ((SITE_COLOURS[p.mats[0]] || [])[0] || ['#F2B705'])[0]);
  return /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      position: 'relative'
    }
  }, p.src && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      insetInlineStart: 10,
      zIndex: 2,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(SourceChip, {
    p: p
  })), /*#__PURE__*/React.createElement(B.ProductCard, {
    title: t([p.en, p.ar]),
    price: p.price,
    materials: p.mats,
    spec: p.spec,
    badge: p.badge && t(p.badge),
    badgeTone: p.mats[0] === 'tpu' ? 'tpu' : p.mats[0] === 'petg' && p.badge ? 'petg' : 'brand',
    image: shot || undefined,
    imageTone: p.tone,
    onClick: () => go('product', p.id),
    onAdd: () => add(p)
  }), p.src && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 8,
      padding: '0 4px',
      ...smMono,
      fontSize: 10.5,
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, t(C.by), " ", p.by), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(B.Icon, {
    name: "heart",
    size: 12
  }), p.likes)));
}
function MaterialScroll({
  go
}) {
  const t = useT();
  const M = SITE.mats;
  const [active, setActive] = React.useState('pla');
  const refs = {
    pla: React.useRef(null),
    petg: React.useRef(null),
    tpu: React.useRef(null)
  };
  React.useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(e.target.dataset.mat);
    }), {
      rootMargin: '-45% 0px -45% 0px'
    });
    Object.values(refs).forEach(r => r.current && io.observe(r.current));
    return () => io.disconnect();
  }, []);
  const vw = useVW();
  return /*#__PURE__*/React.createElement("section", {
    className: "s-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-wrap s-split",
    style: {
      gridTemplateColumns: vw > 980 ? 'minmax(0,1fr) minmax(0,1fr)' : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-sticky",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(PrintText, null, t(M.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transition: 'filter .3s'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "hello",
    color: active,
    size: vw > 980 ? 300 : 160,
    track: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: vw > 980 ? 'column' : 'row',
      gap: 10
    }
  }, ['pla', 'petg', 'tpu'].map(k => /*#__PURE__*/React.createElement(B.Tag, {
    key: k,
    material: k,
    selected: active === k,
    onClick: () => refs[k].current && window.scrollTo({
      top: refs[k].current.getBoundingClientRect().top + window.scrollY - 200,
      behavior: 'smooth'
    }),
    style: {
      height: 34,
      padding: '0 12px'
    }
  }, B.MATERIALS[k].name))))), /*#__PURE__*/React.createElement("div", null, ['pla', 'petg', 'tpu'].map(k => {
    const m = B.MATERIALS[k];
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      ref: refs[k],
      "data-mat": k,
      className: "s-matpanel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "s-squish",
      style: {
        width: '100%',
        border: '2px solid var(--graphite-900)',
        borderRadius: 24,
        overflow: 'hidden',
        background: m.tint,
        boxShadow: active === k ? 'var(--shadow-hard-lg)' : 'var(--shadow-hard)',
        transition: 'box-shadow .3s, transform .38s var(--ease-spring)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 140,
        background: m.color,
        backgroundImage: 'var(--tex-layers-strong)',
        borderBottom: '2px solid var(--graphite-900)',
        padding: 24,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 72px/.8 var(--font-display)',
        letterSpacing: '-.03em'
      }
    }, m.name), /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        background: 'var(--graphite-900)',
        padding: '6px 8px 5px',
        borderRadius: 6
      }
    }, m.temp)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: m.ink
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        font: '800 24px/1.1 var(--font-display)'
      }
    }, t(M[k][0])), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: '500 17px/1.5 var(--font-body)'
      }
    }, t(M[k][1])))));
  }), /*#__PURE__*/React.createElement(B.Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => go('materials')
  }, t(M.cta)))));
}
function HomePage({
  go,
  add
}) {
  const t = useT();
  const H = SITE.hero;
  const i = useLangIdx();
  const house = SITE_PRODUCTS.filter(p => !p.src);
  const community = SITE_PRODUCTS.filter(p => p.src);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--yolk-500)',
      borderBottom: '2px solid var(--graphite-900)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--tex-layers)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap s-hero",
    style: {
      position: 'relative',
      padding: '56px 24px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono
    }
  }, t(H.over)), /*#__PURE__*/React.createElement(PrintText, {
    as: "h1",
    className: "s-display"
  }, t(H.title)), /*#__PURE__*/React.createElement(Rise, {
    delay: 500
  }, /*#__PURE__*/React.createElement("p", {
    className: "s-lead",
    style: {
      color: 'var(--graphite-900)'
    }
  }, t(H.sub))), /*#__PURE__*/React.createElement(Rise, {
    delay: 700,
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    variant: "ink",
    iconRight: i ? 'arrow-left' : 'arrow-right',
    onClick: () => go('shop')
  }, t(H.shop)), /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    variant: "secondary",
    icon: "upload",
    onClick: () => go('custom')
  }, t(H.upload)))), /*#__PURE__*/React.createElement(HeroBlob, null))), /*#__PURE__*/React.createElement(Marquee, {
    items: i ? SITE.marqueeAr : SITE.marquee
  }), /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(PrintText, null, t(SITE.fresh.title)), /*#__PURE__*/React.createElement(B.Button, {
    variant: "ghost",
    iconRight: i ? 'arrow-left' : 'arrow-right',
    onClick: () => go('shop')
  }, t(SITE.fresh.all))), /*#__PURE__*/React.createElement("div", {
    className: "s-g4"
  }, house.slice(0, 4).map((p, k) => /*#__PURE__*/React.createElement(Rise, {
    key: p.id,
    delay: k * 80
  }, /*#__PURE__*/React.createElement(ProductTile, {
    p: p,
    go: go,
    add: add
  }))))), community.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--fg-3)'
    }
  }, t(SITE.community.over)), /*#__PURE__*/React.createElement(PrintText, null, t(SITE.community.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.5 var(--font-body)',
      color: 'var(--fg-2)',
      textWrap: 'pretty'
    }
  }, t(SITE.community.sub))), /*#__PURE__*/React.createElement(B.Button, {
    variant: "ghost",
    iconRight: i ? 'arrow-left' : 'arrow-right',
    onClick: () => go('shop', 'community')
  }, t(SITE.fresh.all))), /*#__PURE__*/React.createElement("div", {
    className: "s-g4"
  }, community.slice(0, 4).map((p, k) => /*#__PURE__*/React.createElement(Rise, {
    key: p.id,
    delay: k * 80
  }, /*#__PURE__*/React.createElement(ProductTile, {
    p: p,
    go: go,
    add: add
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement(PrintText, {
    style: {
      marginBottom: 28
    }
  }, t(SITE.how.title)), /*#__PURE__*/React.createElement("div", {
    className: "s-g4"
  }, SITE.how.steps.map(([h, b], k) => /*#__PURE__*/React.createElement(Rise, {
    key: k,
    delay: k * 90
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      height: '100%',
      border: '2px solid var(--graphite-900)',
      borderRadius: 20,
      background: k === 2 ? 'var(--graphite-900)' : 'var(--paper-0)',
      color: k === 2 ? 'var(--paper-0)' : 'var(--fg-1)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: k === 2 ? '5px 5px 0 var(--yolk-500)' : 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      border: '2px solid ' + (k === 2 ? 'var(--paper-0)' : 'var(--graphite-900)'),
      background: ['var(--yolk-500)', 'var(--mat-pla)', 'var(--yolk-500)', 'var(--mat-petg)'][k],
      color: 'var(--graphite-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '800 20px/1 var(--font-mono)'
    }
  }, k + 1), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 23px/1.1 var(--font-display)'
    }
  }, t(h)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 15px/1.5 var(--font-body)',
      opacity: .85
    }
  }, t(b))))))), /*#__PURE__*/React.createElement(CrewFloor, null), /*#__PURE__*/React.createElement(MaterialScroll, {
    go: go
  }), /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-g2",
    style: {
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(Rise, {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      height: '100%',
      background: 'var(--graphite-900)',
      backgroundImage: 'var(--tex-bed-inverse)',
      color: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: '6px 6px 0 var(--mat-loop)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--mat-loop-tint)'
    }
  }, t(SITE.loop.over)), /*#__PURE__*/React.createElement("h3", {
    className: "s-h2",
    style: {
      color: 'var(--paper-0)'
    }
  }, t(SITE.loop.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--graphite-300)',
      font: '400 16px/1.55 var(--font-body)'
    }
  }, t(SITE.loop.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 'auto',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(B.Button, {
    icon: "recycle",
    onClick: () => go('loop')
  }, t(SITE.loop.cta)), /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "oops",
    color: "loop",
    size: 110
  })))), /*#__PURE__*/React.createElement(Rise, {
    delay: 120,
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      height: '100%',
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--fg-3)'
    }
  }, t(SITE.corner.over)), /*#__PURE__*/React.createElement("h3", {
    className: "s-h2"
  }, t(SITE.cornerTeaser.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--fg-2)',
      font: '400 16px/1.55 var(--font-body)'
    }
  }, t(SITE.cornerTeaser.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      borderRadius: 16,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: "3D Corner in a mall",
    tone: "yolk",
    ratio: "16 / 7",
    radius: 0
  })), /*#__PURE__*/React.createElement(B.Button, {
    variant: "ink",
    iconRight: i ? 'arrow-left' : 'arrow-right',
    onClick: () => go('corner'),
    style: {
      alignSelf: 'flex-start'
    }
  }, t(SITE.cornerTeaser.cta)))))));
}
Object.assign(window, {
  SourceChip,
  SRC_META,
  ProductTile,
  MaterialScroll,
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Models3D.jsx
try { (() => {
// Procedural stand-in 3D models for every shop item (three.js r149 UMD). Swap for real STLs later.
const M3_INK = 0x16161a;
function m3Mat(hex, rough = .62) {
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex).convertSRGBToLinear(),
    roughness: rough,
    metalness: 0
  });
  m.onBeforeCompile = sh => {
    sh.vertexShader = 'varying float vY;\n' + sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\nvY = (modelMatrix * vec4(transformed,1.0)).y;');
    sh.fragmentShader = 'varying float vY;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= 0.9 + 0.1 * smoothstep(0.25, 0.75, abs(fract(vY * 26.0) - 0.5) * 2.0);');
  };
  return m;
}
function m3Build(id, hex) {
  const g = new THREE.Group();
  const body = m3Mat(hex);
  const ink = new THREE.MeshStandardMaterial({
    color: M3_INK,
    roughness: .4
  });
  const white = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: .3
  });
  const add = (geo, mat = body, p = [0, 0, 0], r = [0, 0, 0], s) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...p);
    m.rotation.set(...r);
    if (s) m.scale.set(...s);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const eyes = (y, z, sp = .2, r = .13) => [-1, 1].forEach(s => {
    add(new THREE.SphereGeometry(r, 24, 16), white, [s * sp, y, z], [0, 0, 0], [1, 1, .6]);
    add(new THREE.SphereGeometry(r * .5, 16, 12), ink, [s * sp, y, z + r * .5]);
  });
  const tube = (pts, r, mat = body) => add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 120, r, 12, false), mat);
  if (id === 'tower') {
    add(new THREE.CylinderGeometry(1.05, 1.05, .22, 6), body, [0, .11, 0]);
    add(new THREE.CylinderGeometry(.5, .56, 1.9, 6), body, [-.3, 1.17, -.3]);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      add(new THREE.BoxGeometry(.2, .22, .2), body, [-.3 + Math.cos(a) * .42, 2.22, -.3 + Math.sin(a) * .42]);
    }
    add(new THREE.BoxGeometry(.5, .14, .7), body, [-.05, .4, .25], [.35, -.7, 0]);
    add(new THREE.BoxGeometry(.3, .3, .3), white, [.55, .38, .45], [.4, .6, .2]);
  } else if (id === 'insert' || id === 'bins') {
    const cols = id === 'bins' ? 3 : 4,
      rows = id === 'bins' ? 2 : 3,
      w = id === 'bins' ? .62 : .5,
      h = id === 'bins' ? .55 : .32;
    if (id === 'insert') add(new THREE.BoxGeometry(cols * w + .12, .1, rows * w + .12), body, [0, .05, 0]);
    for (let x = 0; x < cols; x++) for (let z = 0; z < rows; z++) {
      const cx = (x - (cols - 1) / 2) * (w + (id === 'bins' ? .06 : 0)),
        cz = (z - (rows - 1) / 2) * (w + (id === 'bins' ? .06 : 0)),
        hh = id === 'bins' ? h * (1 + (x + z) % 2 * .4) : h;
      const sh = new THREE.Shape();
      const q = w / 2 - .02,
        rr = .06;
      sh.moveTo(-q + rr, -q);
      sh.lineTo(q - rr, -q);
      sh.quadraticCurveTo(q, -q, q, -q + rr);
      sh.lineTo(q, q - rr);
      sh.quadraticCurveTo(q, q, q - rr, q);
      sh.lineTo(-q + rr, q);
      sh.quadraticCurveTo(-q, q, -q, q - rr);
      sh.lineTo(-q, -q + rr);
      sh.quadraticCurveTo(-q, -q, -q + rr, -q);
      const hole = new THREE.Path();
      const iq = q - .05;
      hole.moveTo(-iq, -iq);
      hole.lineTo(iq, -iq);
      hole.lineTo(iq, iq);
      hole.lineTo(-iq, iq);
      hole.lineTo(-iq, -iq);
      sh.holes.push(hole);
      const wall = new THREE.ExtrudeGeometry(sh, {
        depth: hh,
        bevelEnabled: false
      });
      wall.rotateX(-Math.PI / 2);
      add(wall, body, [cx, .1, cz]);
      add(new THREE.BoxGeometry(w - .04, .04, w - .04), body, [cx, .12, cz]);
    }
  } else if (id === 'grip') {
    add(new THREE.CylinderGeometry(.9, .9, .12, 48), body, [0, .06, 0]);
    add(new THREE.CylinderGeometry(.4, .55, .5, 32), body, [0, .37, 0]);
    add(new THREE.TorusGeometry(.75, .16, 20, 48), body, [0, .74, 0], [Math.PI / 2, 0, 0]);
    add(new THREE.CylinderGeometry(.7, .7, .1, 48), body, [0, .74, 0]);
  } else if (id === 'goblin') {
    add(new THREE.CylinderGeometry(.55, .62, 1.0, 32, 1, true), body, [0, .5, 0]);
    add(new THREE.CylinderGeometry(.62, .62, .06, 32), body, [0, .03, 0]);
    add(new THREE.SphereGeometry(.62, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), body, [0, .98, 0]);
    [-1, 1].forEach(s => add(new THREE.ConeGeometry(.16, .7, 16), body, [s * .68, 1.2, 0], [0, 0, -s * 1.1]));
    eyes(1.22, .5, .22, .14);
    [.3, -.1, -.3].forEach((x, n) => add(new THREE.CylinderGeometry(.06, .06, 1.2, 12), n === 1 ? white : ink, [x, 1.1 + n * .1, -.1], [.1 * (n - 1), 0, .15 * (n - 1)]));
  } else if (id === 'meeple') {
    const s = new THREE.Shape();
    s.moveTo(-.5, 0);
    s.lineTo(-.14, 0);
    s.lineTo(0, .3);
    s.lineTo(.14, 0);
    s.lineTo(.5, 0);
    s.quadraticCurveTo(.44, .4, .24, .62);
    s.lineTo(.62, .74);
    s.quadraticCurveTo(.72, .92, .52, .96);
    s.lineTo(.22, .94);
    s.absarc(0, 1.16, .26, -.9, Math.PI + .9, false);
    s.lineTo(-.22, .94);
    s.lineTo(-.52, .96);
    s.quadraticCurveTo(-.72, .92, -.62, .74);
    s.lineTo(-.24, .62);
    s.quadraticCurveTo(-.44, .4, -.5, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: .32,
      bevelEnabled: true,
      bevelThickness: .04,
      bevelSize: .04,
      bevelSegments: 3,
      curveSegments: 20
    });
    geo.translate(0, 0, -.16);
    [[-.7, 0, .3, .3], [.0, 0, -.2, -.2], [.75, 0, .35, -.5]].forEach(([x, y, z, ry]) => add(geo, body, [x, y + .04, z], [0, ry, 0]));
  } else if (id === 'snake') {
    const pts = Array.from({
      length: 40
    }, (_, i) => {
      const t = i / 39 * Math.PI * 5;
      const r = .7 - i / 39 * .1;
      return [Math.cos(t) * r, .2 + i / 39 * 1.4, Math.sin(t) * r];
    });
    tube(pts, .14);
    const h = pts[pts.length - 1];
    add(new THREE.SphereGeometry(.24, 24, 16), body, [h[0], h[1] + .05, h[2]], [0, 0, 0], [1.3, .9, 1]);
    add(new THREE.CylinderGeometry(.25, .25, 1.8, 16), new THREE.MeshStandardMaterial({
      color: 0x2a2a30,
      roughness: .5
    }), [0, .95, 0]);
    eyes(h[1] + .16, h[2] + .18, .1, .07);
  } else if (id === 'pot' || id === 'planter2') {
    const self = id === 'planter2';
    const p = (self ? [[0, 0], [.6, 0], [.72, .4], [.8, 1.1], [.84, 1.3], [.76, 1.3], [.7, 1.1], [.62, .42], [0, .4]] : [[0, 0], [.5, 0], [.64, .5], [.74, 1.0], [.8, 1.32], [.72, 1.32], [.66, 1.0], [.56, .5], [0, .12]]).map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(p, self ? 48 : 10), body);
    add(new THREE.CircleGeometry(self ? .72 : .68, self ? 48 : 10), new THREE.MeshStandardMaterial({
      color: 0x3b2b1e,
      roughness: 1
    }), [0, 1.18, 0], [-Math.PI / 2, 0, 0]);
    const leaf = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5BA84A').convertSRGBToLinear(),
      roughness: .6
    });
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2;
      add(new THREE.SphereGeometry(.22, 16, 12), leaf, [Math.cos(a) * .3, 1.45 + i % 3 * .12, Math.sin(a) * .3], [0, -a, .6], [1.4, .35, .7]);
    }
    if (self) add(new THREE.CylinderGeometry(.06, .06, .8, 12), white, [0, .8, 0]);
  } else if (id === 'cards') {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(1.0, 0);
    s.lineTo(1.0, .14);
    s.lineTo(.28, .14);
    s.lineTo(.12, .7);
    s.lineTo(0, .7);
    s.lineTo(0, 0);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.4,
      bevelEnabled: true,
      bevelThickness: .02,
      bevelSize: .02,
      bevelSegments: 2
    });
    geo.translate(-.5, 0, -.7);
    add(geo, body, [-.6, 0, 0], [0, .2, 0]);
    add(geo, body, [.6, 0, .2], [0, -.15, 0]);
    [0, 1, 2].forEach(n => add(new THREE.BoxGeometry(.6, .9, .02), white, [-.62 + n * .04, .55, -.35 + n * .2], [-.25, .2, 0]));
  } else if (id === 'dragon') {
    const pts = Array.from({
      length: 16
    }, (_, i) => {
      const t = i / 15;
      return [-1.4 + t * 2.6, .3 + Math.sin(t * Math.PI) * .25, Math.sin(t * Math.PI * 2.2) * .45];
    });
    pts.forEach((p, i) => {
      const s = .32 - i * .014;
      add(new THREE.OctahedronGeometry(s, 0), body, p, [0, i * .4, Math.PI / 4], [1.1, .8, 1]);
    });
    const h = pts[pts.length - 1];
    add(new THREE.ConeGeometry(.26, .7, 6), body, [h[0] + .35, h[1] + .1, h[2]], [0, 0, -Math.PI / 2]);
    [-1, 1].forEach(s => add(new THREE.ConeGeometry(.08, .35, 6), body, [h[0] + .1, h[1] + .38, h[2] + s * .12], [s * .3, 0, -.4]));
    const wing = new THREE.Shape();
    wing.moveTo(0, 0);
    wing.lineTo(.9, .2);
    wing.lineTo(.7, .5);
    wing.lineTo(.5, .32);
    wing.lineTo(.3, .55);
    wing.lineTo(0, 0);
    const wg = new THREE.ExtrudeGeometry(wing, {
      depth: .04,
      bevelEnabled: false
    });
    [-1, 1].forEach(s => add(wg, body, [.1, .55, s * .15], [s * -1.1, s * -.2, 0]));
  } else if (id === 'octo') {
    add(new THREE.SphereGeometry(.62, 32, 24), body, [0, 1.0, 0], [0, 0, 0], [1, 1.12, 1]);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2,
        c = Math.cos(a),
        s = Math.sin(a);
      tube([[c * .35, .7, s * .35], [c * .7, .25, s * .7], [c * 1.05, .12, s * 1.05], [c * 1.2, .3, s * 1.2], [c * 1.05, .42, s * 1.05]], .1 - i % 2 * .015);
    }
    eyes(1.08, .52, .22, .15);
  } else if (id === 'stand') {
    const s = new THREE.Shape();
    for (let i = 0; i <= 12; i++) {
      const a = i / 12 * Math.PI * 2,
        r = i % 2 ? .22 : .34;
      i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 2.0,
      steps: 60,
      bevelEnabled: false
    });
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i),
        x = pos.getX(i),
        z = pos.getZ(i),
        t = y * 1.4;
      pos.setXYZ(i, x * Math.cos(t) - z * Math.sin(t), y, x * Math.sin(t) + z * Math.cos(t));
    }
    geo.computeVertexNormals();
    add(geo, body, [0, .14, 0]);
    add(new THREE.CylinderGeometry(.8, .86, .14, 48), body, [0, .07, 0]);
    add(new THREE.TorusGeometry(.5, .1, 16, 40, Math.PI), body, [0, 2.05, 0], [0, 0, 0], [1.2, .5, 1]);
  } else if (id === 'clip') {
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * .8;
      add(new THREE.BoxGeometry(.6, .12, .5), body, [x, .06, 0]);
      add(new THREE.TorusGeometry(.2, .07, 12, 32, Math.PI * 1.5), body, [x, .32, 0], [0, 0, -Math.PI * .25]);
    }
    tube([[-1.8, .32, .2], [-.8, .32, 0], [0, .32, -.05], [.8, .32, 0], [1.8, .3, .25]], .07, new THREE.MeshStandardMaterial({
      color: 0xf5f0e4,
      roughness: .5
    }));
  }
  return g;
}
const M3 = {
  cache: {},
  queue: [],
  busy: false,
  r: null
};
function m3Stage() {
  if (M3.r) return M3.r;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(1);
  renderer.setSize(520, 520);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xfff7e8, 0xbfb49c, .9));
  const key = new THREE.DirectionalLight(0xfff0d6, 1.5);
  key.position.set(3, 6, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -4,
    right: 4,
    top: 4,
    bottom: -4
  });
  key.shadow.bias = -.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe8ff, .5);
  rim.position.set(-4, 3, -3);
  scene.add(rim);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({
    opacity: .22
  }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
  M3.r = {
    renderer,
    scene,
    camera
  };
  return M3.r;
}
function m3Frame(camera, obj, theta = .6, phi = 1.1, pad = 1.12) {
  const box = new THREE.Box3().setFromObject(obj);
  const c = box.getCenter(new THREE.Vector3());
  const r = box.getBoundingSphere(new THREE.Sphere()).radius;
  const d = r / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * pad;
  camera.position.set(c.x + d * Math.sin(phi) * Math.sin(theta), c.y + d * Math.cos(phi), c.z + d * Math.sin(phi) * Math.cos(theta));
  camera.lookAt(c);
}
function m3Pump() {
  if (M3.busy || !M3.queue.length) return;
  M3.busy = true;
  setTimeout(() => {
    const {
      key,
      id,
      hex,
      cbs
    } = M3.queue.shift();
    try {
      const {
        renderer,
        scene,
        camera
      } = m3Stage();
      const obj = m3Build(id, hex);
      scene.add(obj);
      m3Frame(camera, obj);
      renderer.render(scene, camera);
      M3.cache[key] = renderer.domElement.toDataURL('image/png');
      scene.remove(obj);
      obj.traverse(o => {
        if (o.geometry) o.geometry.dispose();
      });
    } catch (e) {
      M3.cache[key] = null;
    }
    cbs.forEach(f => f(M3.cache[key]));
    M3.busy = false;
    m3Pump();
  }, 16);
}
function useModelShot(id, hex) {
  const key = id + hex;
  const [src, setSrc] = React.useState(M3.cache[key]);
  React.useEffect(() => {
    if (!window.THREE) return;
    if (key in M3.cache) {
      setSrc(M3.cache[key]);
      return;
    }
    const q = M3.queue.find(x => x.key === key);
    if (q) q.cbs.push(setSrc);else M3.queue.push({
      key,
      id,
      hex,
      cbs: [setSrc]
    });
    m3Pump();
  }, [key]);
  return src;
}
function ModelViewer({
  id,
  hex,
  bg = 'var(--paper-1)'
}) {
  const host = React.useRef(null);
  const st = React.useRef(null);
  React.useEffect(() => {
    const el = host.current;
    if (!window.THREE) return;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfff7e8, 0xbfb49c, .9));
    const key = new THREE.DirectionalLight(0xfff0d6, 1.5);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, {
      left: -4,
      right: 4,
      top: 4,
      bottom: -4
    });
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xdfe8ff, .5);
    rim.position.set(-4, 3, -3);
    scene.add(rim);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({
      opacity: .22
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    const pivot = new THREE.Group();
    scene.add(pivot);
    const s = {
      renderer,
      scene,
      camera,
      pivot,
      theta: .6,
      phi: 1.1,
      drag: null,
      obj: null,
      last: performance.now()
    };
    st.current = s;
    const size = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(el);
    size();
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const loop = () => {
      if (!s.drag && !rm) s.theta += .005;
      if (s.obj) m3Frame(camera, s.obj, s.theta, s.phi, 1.2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    const down = e => {
      s.drag = {
        x: e.clientX,
        y: e.clientY,
        t: s.theta,
        p: s.phi
      };
      el.setPointerCapture(e.pointerId);
    };
    const move = e => {
      if (!s.drag) return;
      s.theta = s.drag.t - (e.clientX - s.drag.x) * .01;
      s.phi = Math.max(.4, Math.min(1.45, s.drag.p - (e.clientY - s.drag.y) * .008));
    };
    const up = () => {
      s.drag = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      el.innerHTML = '';
    };
  }, []);
  React.useEffect(() => {
    const s = st.current;
    if (!s) return;
    if (s.obj) s.pivot.remove(s.obj);
    s.obj = m3Build(id, hex);
    s.pivot.add(s.obj);
  }, [id, hex]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      background: bg,
      backgroundImage: 'var(--tex-bed)',
      cursor: 'grab',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: host,
    style: {
      position: 'absolute',
      inset: 0
    }
  }));
}
Object.assign(window, {
  m3Build,
  useModelShot,
  ModelViewer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Models3D.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Motion.jsx
try { (() => {
const B = window.InfillDesignSystem_d33a9b;
const LangCtx = React.createContext(0);
const useT = () => {
  const i = React.useContext(LangCtx);
  return p => Array.isArray(p) ? p[i] : p;
};
const useLangIdx = () => React.useContext(LangCtx);
const smMono = {
  font: '600 11.5px/1.2 var(--font-mono)',
  letterSpacing: '.1em',
  textTransform: 'uppercase'
};
function useInView(opts) {
  const ref = React.useRef(null);
  const [inView, set] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        set(true);
        io.disconnect();
      }
    }, {
      threshold: .25,
      ...opts
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}
function PrintText({
  as = 'h2',
  className = 's-h2',
  children,
  style,
  delay = 0
}) {
  const [ref, inView] = useInView();
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: className + ' s-print' + (inView ? ' is-in' : ''),
    style: {
      animationDelay: delay + 'ms',
      ...style
    }
  }, children);
}
function Rise({
  children,
  delay = 0,
  style,
  className = ''
}) {
  const [ref, inView] = useInView();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: 's-rise ' + className + (inView ? ' is-in' : ''),
    style: {
      transitionDelay: delay + 'ms',
      ...style
    }
  }, children);
}
const PAGE_LAYERS = 212;
const pageLayer = p => Math.max(0, Math.round(p * PAGE_LAYERS));
// Slicer-style layer slider that replaces the page scrollbar (desktop). Bottom = layer 1, top = last layer: scrolling down "prints" the page upward.
function SlicerScroll() {
  const [p, setP] = React.useState(0);
  const [drag, setDrag] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const rail = React.useRef(null);
  React.useEffect(() => {
    const on = () => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, d.scrollTop / max)) : 0);
    };
    on();
    addEventListener('scroll', on, {
      passive: true
    });
    addEventListener('resize', on);
    const mo = new ResizeObserver(on);
    mo.observe(document.body);
    return () => {
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
      mo.disconnect();
    };
  }, []);
  const seek = y => {
    const r = rail.current.getBoundingClientRect();
    const q = Math.min(1, Math.max(0, (r.bottom - y) / r.height));
    const d = document.documentElement;
    window.scrollTo(0, q * (d.scrollHeight - d.clientHeight));
  };
  const down = e => {
    e.preventDefault();
    setDrag(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(e.clientY);
  };
  const move = e => {
    if (drag) seek(e.clientY);
  };
  const up = () => setDrag(false);
  const layer = Math.max(1, pageLayer(p));
  const pct = (p * 100).toFixed(2) + '%';
  const open = drag || hover;
  const ink = 'var(--graphite-900)';
  return /*#__PURE__*/React.createElement("div", {
    className: "s-slicer",
    "aria-hidden": true,
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    style: {
      position: 'fixed',
      insetInlineEnd: 8,
      top: 112,
      bottom: 20,
      width: 28,
      zIndex: 41,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 10px/1 var(--font-mono)',
      color: 'var(--fg-3)'
    }
  }, PAGE_LAYERS), /*#__PURE__*/React.createElement("div", {
    ref: rail,
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up,
    style: {
      position: 'relative',
      flex: 1,
      width: 28,
      cursor: drag ? 'grabbing' : 'pointer',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      width: 8,
      marginLeft: -4,
      borderRadius: 4,
      border: '2px solid ' + ink,
      background: 'var(--paper-1)',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 5px, rgba(22,22,26,.16) 5px 6px)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: pct,
      background: 'var(--yolk-500)',
      backgroundImage: 'repeating-linear-gradient(0deg, var(--yolk-500) 0 3px, var(--mat-pla) 3px 4px, var(--yolk-500) 4px 7px, var(--mat-petg) 7px 8px)',
      transition: drag ? 'none' : 'height .12s linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: pct,
      transform: 'translate(-50%, 50%)',
      transition: drag ? 'none' : 'bottom .12s linear',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 99,
      background: ink,
      border: '3px solid var(--yolk-500)',
      boxShadow: '0 0 0 2px ' + ink + ', var(--shadow-hard-sm)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      insetInlineEnd: 30,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      direction: 'ltr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 3,
      background: ink,
      color: 'var(--paper-0)',
      borderRadius: 6,
      padding: open ? '7px 9px 6px' : '5px 7px 4px',
      boxShadow: 'var(--shadow-hard-sm)',
      transition: 'padding .15s',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 ' + (open ? 13 : 11) + 'px/1 var(--font-mono)',
      color: 'var(--yolk-500)'
    }
  }, layer), open && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px/1 var(--font-mono)',
      color: 'var(--paper-2)'
    }
  }, (layer * 0.2).toFixed(2), " mm"))))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 10px/1 var(--font-mono)',
      color: 'var(--fg-3)'
    }
  }, "1"));
}
function LayerBar() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  const layer = pageLayer(p);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'relative',
      height: 6,
      background: 'var(--paper-2)',
      borderTop: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      insetInlineStart: 0,
      top: 0,
      bottom: 0,
      width: p * 100 + '%',
      background: 'var(--yolk-500)',
      backgroundImage: 'repeating-linear-gradient(90deg, rgba(22,22,26,.25) 0 2px, transparent 2px 10px)'
    }
  }));
}
function Marquee({
  items
}) {
  const row = items.concat(items);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)',
      borderBlock: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-marquee"
  }, row.concat(row).map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 20,
      padding: '16px 20px 14px',
      ...smMono,
      fontSize: 13,
      whiteSpace: 'nowrap'
    }
  }, t, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: ['var(--yolk-500)', 'var(--mat-pla)', 'var(--mat-petg)', 'var(--mat-tpu)'][i % 4]
    }
  })))));
}
function useVW() {
  const [w, set] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const on = () => set(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}
function HeroBlob() {
  const [pose, setPose] = React.useState('printing');
  const vw = useVW();
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setPose('hello'), reduce ? 0 : 2900);
    return () => clearTimeout(t);
  }, []);
  const size = Math.max(220, Math.min(420, vw * 0.62));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setPose(pose === 'cheer' ? 'hello' : 'cheer'),
    style: {
      cursor: 'pointer'
    },
    title: "Poke it"
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: pose,
    size: size,
    track: true,
    color: "yolk",
    swirl: "pla"
  })));
}
function Price({
  v,
  size = 22
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 ' + size + 'px/1 var(--font-display)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 ' + Math.round(size * .5) + 'px/1 var(--font-mono)',
      marginInlineEnd: 4,
      color: 'var(--fg-2)'
    }
  }, "SAR"), v);
}
Object.assign(window, {
  SlicerScroll,
  B,
  LangCtx,
  useT,
  useLangIdx,
  smMono,
  useInView,
  PrintText,
  Rise,
  LayerBar,
  Marquee,
  HeroBlob,
  useVW,
  Price
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Motion.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PagesSell.jsx
try { (() => {
// Creator programme: upload an STL to sell. Original designs earn points per sale; curated public designs (licence must allow commercial use) earn a one-time bonus on the first sale to someone else.
const SELL_PTS = {
  perSale: 10,
  curatedOnce: 25
};
const SELL_LIC = [{
  v: 'commercial',
  ok: true,
  l: ['Commercial use allowed', 'الاستخدام التجاري مسموح']
}, {
  v: 'remix',
  ok: true,
  l: ['Remix + commercial allowed', 'التعديل والتجاري مسموحين']
}, {
  v: 'ccby',
  ok: true,
  l: ['CC BY / CC BY-SA', 'CC BY / CC BY-SA']
}, {
  v: 'nc',
  ok: false,
  l: ['CC BY-NC (non-commercial)', 'CC BY-NC (غير تجاري)']
}, {
  v: 'nd',
  ok: false,
  l: ['No derivatives / no remix', 'ممنوع التعديل']
}, {
  v: 'std',
  ok: false,
  l: ['Standard licence (personal use only)', 'رخصة عادية (استخدام شخصي بس)']
}, {
  v: 'unsure',
  ok: false,
  l: ['Not sure', 'مو متأكد']
}];
// Creator's own listings come from BARA_CONFIG.endpoints.creator → { points, listings: [{ name:{en,ar}, kind:'orig'|'cur', sales, points, status:'live'|'review' }] }
function useCreator() {
  const [d, setD] = React.useState(null);
  React.useEffect(() => {
    if (!baraApi.configured('creator')) return;
    baraApi.fetchLive('creator').then(setD).catch(() => setD(null));
  }, []);
  return d;
}
function SellPage({
  toast
}) {
  const t = useT();
  const i = useLangIdx();
  const [file, setFile] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const me = useCreator();
  const mine = me && me.listings || [];
  const [send, busy] = useSend(toast);
  const [kind, setKind] = React.useState('orig');
  const [own, setOwn] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [lic, setLic] = React.useState('');
  const [credit, setCredit] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const src = /makerworld\./i.test(link) ? 'makerworld' : /printables\./i.test(link) ? 'printables' : null;
  const linkOk = /^https?:\/\/\S+\.\S+/.test(link.trim());
  const licO = SELL_LIC.find(x => x.v === lic);
  const blocked = kind === 'cur' && licO && !licO.ok;
  const ready = file && title.trim() && emailOk(email) && !busy && (kind === 'orig' ? own : linkOk && licO && licO.ok && credit);
  const submit = () => {
    const fd = new FormData();
    fd.append('file', file.file);
    fd.append('title', title.trim());
    fd.append('kind', kind);
    fd.append('email', email.trim());
    fd.append('lang', i ? 'ar' : 'en');
    if (kind === 'cur') {
      fd.append('link', link.trim());
      fd.append('licence', lic);
      fd.append('platform', src || '');
    } else fd.append('ownership_confirmed', 'true');
    send('sell', fd, () => {
      setSent(true);
      crew('quote');
      toast({
        tone: 'success',
        title: t(['Sent for review', 'انرسل للمراجعة']),
        message: t(['We test-print it, then it goes live in the shop.', 'نجرب نطبعه، وبعدها ينزل بالمتجر.'])
      });
    }, 'Creator submission — ' + title);
  };
  const reset = () => {
    setSent(false);
    setFile(null);
    setTitle('');
    setOwn(false);
    setLink('');
    setLic('');
    setCredit(false);
  };
  const total = me && me.points != null ? me.points : mine.reduce((s, x) => s + (x.points || 0), 0);
  const box = {
    border: '2px solid var(--graphite-900)',
    borderRadius: 20,
    padding: 22,
    background: 'var(--paper-0)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  };
  const step = (n, label) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 99,
      background: 'var(--graphite-900)',
      color: 'var(--yolk-500)',
      display: 'grid',
      placeItems: 'center',
      font: '700 13px/1 var(--font-mono)',
      flexShrink: 0
    }
  }, n), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 20px/1.15 var(--font-display)'
    }
  }, t(label)));
  const choice = (v, icon, label, desc, earn) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setKind(v),
    style: {
      textAlign: 'start',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 16,
      borderRadius: 16,
      cursor: 'pointer',
      border: '2px solid var(--graphite-900)',
      background: kind === v ? 'var(--yolk-300)' : 'var(--paper-0)',
      boxShadow: kind === v ? 'var(--shadow-hard-sm)' : 'none',
      transition: 'background .2s, box-shadow .2s',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: '700 16px/1.2 var(--font-body)',
      color: 'var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(B.Icon, {
    name: icon,
    size: 18
  }), t(label)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.45 var(--font-body)',
      color: 'var(--graphite-800)'
    }
  }, t(desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 11,
      color: 'var(--graphite-900)',
      background: 'var(--paper-0)',
      border: '1.5px solid var(--graphite-900)',
      borderRadius: 6,
      padding: '4px 7px 3px',
      alignSelf: 'flex-start'
    }
  }, t(earn)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    over: ['Creators', 'المصممين'],
    title: ['Sell your design. Earn points.', 'بيع تصميمك. واجمع نقاط.'],
    sub: ['Upload an STL, we print and ship every order. You earn points each time it sells.', 'ارفع ملف STL، وإحنا نطبع ونوصل كل طلب. وأنت تجمع نقاط مع كل بيعة.']
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap s-split",
    style: {
      alignItems: 'start'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...box,
      alignItems: 'center',
      textAlign: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "cheer",
    size: 150
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 28px/1.1 var(--font-display)'
    }
  }, t(['In review!', 'قيد المراجعة!'])), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.5 var(--font-body)',
      color: 'var(--fg-2)',
      maxWidth: 420,
      textWrap: 'pretty'
    }
  }, kind === 'orig' ? t(['We’ll test-print “' + title + '” and check it’s yours. Then it goes live and every sale adds ' + SELL_PTS.perSale + ' points.', 'بنجرب نطبع "' + title + '" ونتأكد إنه تصميمك. بعدها ينزل، وكل بيعة تضيف لك ' + SELL_PTS.perSale + ' نقاط.']) : t(['We’ll check the link and licence. The original designer is credited on the listing, and you get ' + SELL_PTS.curatedOnce + ' points once, the first time someone else buys it.', 'بنتأكد من الرابط والرخصة. اسم المصمم الأصلي يطلع على المنتج، وأنت تاخذ ' + SELL_PTS.curatedOnce + ' نقطة مرة وحدة، أول ما يشتريه أحد غيرك.'])), /*#__PURE__*/React.createElement(B.Button, {
    variant: "secondary",
    icon: "plus",
    onClick: reset
  }, t(['Upload another', 'ارفع واحد ثاني']))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: box
  }, step(1, ['Upload the STL', 'ارفع الملف']), !file ? /*#__PURE__*/React.createElement(FileDrop, {
    toast: toast,
    onFile: setFile,
    render: ({
      busy: reading,
      open
    }) => /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: open,
      disabled: reading,
      style: {
        width: '100%',
        border: '2px dashed var(--graphite-900)',
        borderRadius: 18,
        background: 'var(--paper-1)',
        backgroundImage: 'var(--tex-bed)',
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(B.Mascot, {
      pose: reading ? 'printing' : 'peer',
      size: 110
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 20px/1.15 var(--font-display)'
      }
    }, reading ? t(['Checking the mesh…', 'نفحص الملف…']) : t(['Drop your STL here', 'حط ملف STL هنا'])), /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        fontSize: 11,
        color: 'var(--fg-3)'
      }
    }, "STL \xB7 3MF \xB7 OBJ \xB7 ", t(['up to 100 MB', 'لين ١٠٠ ميجا'])))
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px minmax(0,1fr) auto',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: file.ext.toUpperCase(),
    tone: "ink",
    texture: "bed",
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 16px/1.2 var(--font-body)',
      wordBreak: 'break-all'
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, [file.size, meshDims(file)].filter(Boolean).join(' · '))), /*#__PURE__*/React.createElement(B.IconButton, {
    icon: "trash-2",
    label: "Remove",
    variant: "ghost",
    onClick: () => setFile(null)
  })), /*#__PURE__*/React.createElement(B.Input, {
    label: t(['Listing name', 'اسم المنتج']),
    placeholder: t(['e.g. Cable Comb 12×', 'مثلًا: مشط أسلاك ١٢']),
    value: title,
    onChange: e => setTitle(e.target.value)
  }), /*#__PURE__*/React.createElement(B.Input, {
    label: t(SITE.sys.email),
    type: "email",
    icon: "mail",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: email && !emailOk(email) ? t(SITE.sys.emailBad) : undefined
  })), /*#__PURE__*/React.createElement("div", {
    style: box
  }, step(2, ['Whose design is it?', 'التصميم حق مين؟']), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 12
    }
  }, choice('orig', 'pen-tool', ['My original design', 'تصميمي أنا'], ['You made it from scratch and own the rights.', 'سويته من الصفر والحقوق لك.'], ['+' + SELL_PTS.perSale + ' pts every sale', '+' + SELL_PTS.perSale + ' نقاط كل بيعة']), choice('cur', 'link', ['A public design I found', 'تصميم عام لقيته'], ['From MakerWorld, Printables or similar. The designer is credited.', 'من MakerWorld أو Printables أو غيرها، واسم المصمم يطلع.'], ['+' + SELL_PTS.curatedOnce + ' pts once, first sale to someone else', '+' + SELL_PTS.curatedOnce + ' نقطة مرة وحدة، أول بيعة لغيرك'])), kind === 'orig' ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      padding: 16,
      background: 'var(--paper-1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 11,
      color: 'var(--fg-2)'
    }
  }, t(['Disclaimer', 'إقرار'])), /*#__PURE__*/React.createElement(B.Checkbox, {
    checked: own,
    onChange: setOwn,
    label: t(['I confirm this is my original design', 'أقر إن هذا تصميمي الأصلي']),
    description: t(['I created it, it isn’t copied or remixed from anyone else’s model, and I allow Bara’ to print and sell it. If that turns out to be false, the listing is removed and its points are cancelled.', 'أنا اللي صممته، ومو منسوخ ولا معدّل من موديل أحد ثاني، وأسمح لبرأ تطبعه وتبيعه. لو طلع الكلام غلط، ينشال المنتج وتنلغي نقاطه.'])
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      padding: 16,
      background: 'var(--paper-1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(B.Input, {
    label: t(['Link to the original', 'رابط التصميم الأصلي']),
    icon: "link",
    placeholder: "https://makerworld.com/\u2026",
    value: link,
    onChange: e => setLink(e.target.value),
    error: link && !linkOk ? t(['That doesn’t look like a link', 'هذا مو رابط']) : undefined,
    style: {
      flex: 1,
      minWidth: 220
    }
  }), src && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SourceChip, {
    p: {
      src
    },
    size: "lg"
  }))), /*#__PURE__*/React.createElement(B.Select, {
    label: t(['Licence on the original page', 'الرخصة في صفحة التصميم']),
    value: lic,
    onChange: e => setLic(e.target.value),
    options: [{
      value: '',
      label: t(['Choose the licence…', 'اختر الرخصة…'])
    }, ...SELL_LIC.map(x => ({
      value: x.v,
      label: t(x.l)
    }))],
    hint: t(['We only sell designs whose creator allows commercial use or remixing for sale.', 'نبيع بس التصاميم اللي صاحبها سمح بالاستخدام التجاري أو التعديل للبيع.'])
  }), blocked && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      padding: 12,
      background: 'var(--danger-tint)'
    }
  }, /*#__PURE__*/React.createElement(B.Goblin, {
    mood: "judge",
    size: 64
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 15px/1.3 var(--font-body)'
    }
  }, t(['Nope. Can’t sell this one.', 'لا. هذا ما ينباع.'])), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.45 var(--font-body)',
      color: 'var(--graphite-800)'
    }
  }, t(['The designer didn’t allow commercial use. You can still order a print for yourself on “Print your file”.', 'المصمم ما سمح بالبيع. تقدر تطبعه لنفسك من "اطبع ملفك".'])))), licO && licO.ok && /*#__PURE__*/React.createElement(B.Checkbox, {
    checked: credit,
    onChange: setCredit,
    label: t(['The link and licence are correct', 'الرابط والرخصة صحيحين']),
    description: t(['The original designer is credited and linked on the listing. Points from buying it yourself don’t count.', 'اسم المصمم الأصلي ورابطه يطلعون على المنتج. وشراك أنت ما ينحسب.'])
  }))), /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    variant: "ink",
    icon: "send",
    disabled: !ready,
    onClick: submit
  }, busy ? t(SITE.sys.sending) : t(['Send for review', 'أرسل للمراجعة']))), /*#__PURE__*/React.createElement("div", {
    className: "s-sticky",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...box,
      background: 'var(--graphite-900)',
      color: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 11,
      color: 'var(--yolk-300)'
    }
  }, t(['Your points', 'نقاطك'])), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 56px/.9 var(--font-mono)',
      color: 'var(--yolk-500)'
    }
  }, me ? total : '—')), /*#__PURE__*/React.createElement(B.Goblin, {
    mood: "approve",
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, !mine.length && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 14px/1.45 var(--font-body)',
      color: 'var(--graphite-300)'
    }
  }, t(SITE.sys.creatorEmpty)), mine.map((x, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) auto',
      gap: 10,
      alignItems: 'center',
      padding: '10px 12px',
      borderRadius: 12,
      background: 'var(--graphite-800)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '600 14px/1.2 var(--font-body)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t([x.name && x.name.en, x.name && (x.name.ar || x.name.en)])), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 10,
      color: 'var(--graphite-400)'
    }
  }, x.kind === 'orig' ? t(['Original', 'أصلي']) : t(['Curated · credited', 'منقول · مع ذكر المصمم']), " \xB7 ", x.sales, " ", t(['sales', 'بيعة']))), x.status === 'review' ? /*#__PURE__*/React.createElement(B.Badge, {
    tone: "warning",
    dot: true
  }, t(['In review', 'مراجعة'])) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px/1 var(--font-mono)',
      color: 'var(--yolk-300)'
    }
  }, "+", x.points || 0))))), /*#__PURE__*/React.createElement("div", {
    style: box
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 20px/1.15 var(--font-display)'
    }
  }, t(['How points work', 'كيف تشتغل النقاط'])), [[['Original designs', 'تصاميمك الأصلية'], ['+' + SELL_PTS.perSale + ' points for every sale, forever.', '+' + SELL_PTS.perSale + ' نقاط مع كل بيعة، على طول.']], [['Public designs', 'التصاميم العامة'], ['+' + SELL_PTS.curatedOnce + ' points once, the first time someone other than you buys it. Only if the original licence allows commercial use or remixing.', '+' + SELL_PTS.curatedOnce + ' نقطة مرة وحدة، أول ما يشتريه أحد غيرك. وبس إذا رخصة التصميم تسمح بالبيع أو التعديل.']], [['Your own orders', 'طلباتك أنت'], ['Buying your own listing never earns points.', 'لو اشتريت منتجك ما تاخذ نقاط.']], [['Spending points', 'وش أسوي بالنقاط'], ['Use them on any print in the shop.', 'استخدمها على أي طبعة بالمتجر.']]].map(([h, d], n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingTop: n ? 12 : 0,
      borderTop: n ? '1.5px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 15px/1.2 var(--font-body)'
    }
  }, t(h)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.45 var(--font-body)',
      color: 'var(--fg-2)',
      textWrap: 'pretty'
    }
  }, t(d))))))));
}
Object.assign(window, {
  SellPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PagesSell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PagesShop.jsx
try { (() => {
function PageHead({
  over,
  title,
  sub,
  children
}) {
  const t = useT();
  return /*#__PURE__*/React.createElement("section", {
    className: "s-wrap",
    style: {
      padding: '48px 24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, over && /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      color: 'var(--fg-3)'
    }
  }, t(over)), /*#__PURE__*/React.createElement(PrintText, {
    as: "h1",
    className: "s-h1"
  }, t(title)), sub && /*#__PURE__*/React.createElement(Rise, {
    delay: 300
  }, /*#__PURE__*/React.createElement("p", {
    className: "s-lead"
  }, t(sub))), children);
}
function ShopPage({
  go,
  add,
  id
}) {
  const t = useT();
  const S = SITE.shop;
  const [cat, setCat] = React.useState(id || 'all');
  const [mat, setMat] = React.useState(null);
  const list = SITE_PRODUCTS.filter(p => (cat === 'all' || p.cat === cat) && (!mat || p.mats.includes(mat)));
  const nCommunity = SITE_PRODUCTS.filter(p => p.src).length;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: S.title,
    sub: S.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(B.Tabs, {
    value: cat,
    onChange: setCat,
    items: [{
      id: 'all',
      label: t(S.all),
      count: SITE_PRODUCTS.length
    }, {
      id: 'games',
      label: t(S.games)
    }, {
      id: 'home',
      label: t(S.home)
    }].concat(nCommunity ? [{
      id: 'community',
      label: t(SITE.community.tab),
      count: nCommunity
    }] : [])
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['pla', 'petg', 'tpu'].map(k => /*#__PURE__*/React.createElement(B.Tag, {
    key: k,
    material: k,
    selected: mat === k,
    onClick: () => setMat(mat === k ? null : k)
  }, B.MATERIALS[k].name)))), /*#__PURE__*/React.createElement("div", {
    className: "s-g4"
  }, list.map((p, k) => /*#__PURE__*/React.createElement(Rise, {
    key: p.id + cat + mat,
    delay: k * 50
  }, /*#__PURE__*/React.createElement(ProductTile, {
    p: p,
    go: go,
    add: add
  })))), !list.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: 48
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "oops",
    color: "petg",
    size: 140
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 17px/1.4 var(--font-body)',
      color: 'var(--fg-2)',
      textAlign: 'center'
    }
  }, t(S.empty)))));
}
function ProductPage({
  id,
  go,
  add
}) {
  const t = useT();
  const P = SITE.product;
  const i = useLangIdx();
  const p = SITE_PRODUCTS.find(x => x.id === id);
  if (!p) return /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '72px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "oops",
    size: 140
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 26px/1.1 var(--font-display)'
    }
  }, t(SITE.sys.notFoundProduct)), /*#__PURE__*/React.createElement(B.Button, {
    iconRight: "arrow-right",
    onClick: () => go('shop')
  }, t(SITE.sys.toShop)));
  return /*#__PURE__*/React.createElement(ProductDetail, {
    p: p,
    go: go,
    add: add
  });
}
function ProductDetail({
  p,
  go,
  add
}) {
  const t = useT();
  const P = SITE.product;
  const i = useLangIdx();
  const [mat, setMat] = React.useState(p.mats[0]);
  const [ci, setCi] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const cols = SITE_COLOURS[mat] || [];
  const col = cols[ci] || cols[0] || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('shop'),
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '600 14px/1 var(--font-body)',
      color: 'var(--fg-2)',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(B.Icon, {
    name: i ? 'arrow-right' : 'arrow-left',
    size: 16
  }), t(P.back)), /*#__PURE__*/React.createElement("div", {
    className: "s-g2",
    style: {
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(ModelViewer, {
    id: p.id,
    hex: col ? col[0] : '#B9B2A2'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      insetInlineStart: 12,
      bottom: 12,
      ...smMono,
      fontSize: 10.5,
      padding: '5px 8px 4px',
      borderRadius: 6,
      background: 'var(--paper-0)',
      border: '2px solid var(--graphite-900)',
      pointerEvents: 'none'
    }
  }, t(['Drag to spin · stand-in model', 'اسحب للتدوير · موديل تجريبي'])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, p.badge && /*#__PURE__*/React.createElement(B.Badge, {
    tone: "brand",
    outlined: true
  }, t(p.badge)), /*#__PURE__*/React.createElement(B.Badge, {
    tone: "success",
    dot: true
  }, t(P.ready))), /*#__PURE__*/React.createElement(PrintText, {
    as: "h1",
    className: "s-h1"
  }, t([p.en, p.ar])), p.src && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
      padding: '12px 14px',
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement(SourceChip, {
    p: p,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: 1,
      minWidth: 160
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 15px/1.2 var(--font-body)'
    }
  }, t(SITE.community.by), " ", p.by), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 10.5,
      color: 'var(--fg-2)'
    }
  }, t(SITE.community.lic), ": ", t(p.lic), " \xB7 \u2665 ", p.likes), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1.4 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(SITE.community.creditNote))), p.url && /*#__PURE__*/React.createElement(B.Button, {
    variant: "secondary",
    size: "sm",
    iconRight: "external-link",
    onClick: () => window.open(p.url, '_blank', 'noopener')
  }, t(SITE.community.view))), /*#__PURE__*/React.createElement(Price, {
    v: p.price * qty,
    size: 40
  }), /*#__PURE__*/React.createElement("p", {
    className: "s-lead"
  }, t(p.d)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 14px/1 var(--font-body)'
    }
  }, t(P.material)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, p.mats.map(k => /*#__PURE__*/React.createElement(B.Tag, {
    key: k,
    material: k,
    selected: mat === k,
    onClick: () => {
      setMat(k);
      setCi(0);
      crew(k === 'pla' ? 'colour' : k);
    },
    style: {
      height: 36,
      padding: '0 14px'
    }
  }, B.MATERIALS[k].name)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 14px/1 var(--font-body)'
    }
  }, t(P.colour), col && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--fg-2)'
    }
  }, i ? col[2] : col[1]))), cols.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, cols.map((c, k) => /*#__PURE__*/React.createElement(B.MaterialSwatch, {
    key: c[3] || c[1],
    color: c[0],
    label: c[1],
    selected: ci === k,
    size: 38,
    onClick: () => {
      setCi(k);
      crew(/pink|bubble/i.test(c[1]) ? 'pink' : /graphite/i.test(c[1]) ? 'graphite' : 'colour');
    }
  }))) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.4 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(SITE.sys.outOfStock))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(B.QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    icon: "shopping-bag",
    style: {
      flex: 1,
      minWidth: 200
    },
    disabled: !col,
    onClick: () => add({
      ...p,
      mat,
      hex: col[0]
    }, qty)
  }, t(P.add))), p.stats && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(110px,1fr))',
      border: '2px solid var(--graphite-900)',
      borderRadius: 14,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, [[P.layers, p.stats.layers], [P.time, p.stats.time], [P.infill, p.stats.infill], [P.weight, p.stats.weight]].filter(([, v]) => v != null).map(([k, v], n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      padding: '12px 14px',
      borderInlineStart: n ? '2px solid var(--graphite-900)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...smMono,
      fontSize: 10,
      color: 'var(--fg-3)'
    }
  }, t(k)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 17px/1 var(--font-mono)',
      marginTop: 6
    }
  }, v)))))));
}
function CustomPage({
  toast
}) {
  const t = useT();
  const C = SITE.custom;
  const S = SITE.sys;
  const i = useLangIdx();
  const [file, setFile] = React.useState(null);
  const [mat, setMat] = React.useState('pla');
  const [speed, setSpeed] = React.useState('std');
  const [notes, setNotes] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [pricing, setPricing] = React.useState(null);
  React.useEffect(() => {
    baraApi.get('pricing').then(setPricing).catch(() => setPricing(null));
  }, []);
  const [send, busy] = useSend(toast);
  const est = baraApi.estimate(file, mat, speed, pricing);
  const fits = baraApi.fits(file, pricing);
  const ready = file && emailOk(email) && !busy;
  const submit = () => {
    const fd = new FormData();
    fd.append('file', file.file);
    fd.append('material', mat);
    fd.append('speed', speed);
    fd.append('notes', notes);
    fd.append('email', email.trim());
    fd.append('lang', i ? 'ar' : 'en');
    if (file.dims) fd.append('dims_mm', file.dims.join('x'));
    if (file.volume) fd.append('volume_cm3', file.volume.toFixed(2));
    if (est) fd.append('estimate', est.price);
    send('quote', fd, () => {
      setSent(true);
      crew('quote');
      toast({
        tone: 'success',
        title: t(C.sent),
        message: t(C.sentMsg)
      });
    }, 'Quote request — ' + file.name);
  };
  if (sent) return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    over: C.over,
    title: C.sent,
    sub: C.sentMsg
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "cheer",
    size: 150
  }), /*#__PURE__*/React.createElement(B.Button, {
    variant: "secondary",
    icon: "plus",
    onClick: () => {
      setSent(false);
      setFile(null);
      setNotes('');
    }
  }, t(['Send another file', 'أرسل ملف ثاني']))));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    over: C.over,
    title: C.title,
    sub: C.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap s-split"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, !file ? /*#__PURE__*/React.createElement(FileDrop, {
    toast: toast,
    onFile: setFile,
    render: ({
      busy: reading,
      over,
      open
    }) => /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: open,
      disabled: reading,
      style: {
        width: '100%',
        border: '2px dashed var(--graphite-900)',
        borderRadius: 24,
        background: over ? 'var(--yolk-100, var(--paper-1))' : 'var(--paper-0)',
        backgroundImage: 'var(--tex-bed)',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(B.Mascot, {
      pose: reading ? 'printing' : 'hello',
      size: 130
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 24px/1.15 var(--font-display)',
        textAlign: 'center'
      }
    }, reading ? t(['Reading the mesh…', 'نقرأ الملف…']) : t(C.drop)), /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        color: 'var(--fg-3)',
        textAlign: 'center'
      }
    }, t(C.limits)))
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      padding: 14,
      background: 'var(--paper-0)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      borderRadius: 12,
      overflow: 'hidden',
      border: '2px solid var(--graphite-900)'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: file.ext.toUpperCase(),
    tone: "ink",
    texture: "bed",
    ratio: "1 / 1",
    radius: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 180,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '700 17px/1.2 var(--font-body)',
      wordBreak: 'break-all'
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono,
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, [file.size, meshDims(file), file.volume ? file.volume.toFixed(1) + ' cm³' : null].filter(Boolean).join(' · ')), !fits && /*#__PURE__*/React.createElement(B.Badge, {
    tone: "warning",
    dot: true
  }, t(S.tooBig))), /*#__PURE__*/React.createElement(B.IconButton, {
    icon: "trash-2",
    label: "Remove",
    variant: "ghost",
    onClick: () => setFile(null)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--border-1)',
      borderRadius: 20,
      padding: 22,
      background: 'var(--paper-0)',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      flexWrap: 'wrap'
    }
  }, ['pla', 'petg', 'tpu'].map(k => /*#__PURE__*/React.createElement(B.MaterialSwatch, {
    key: k,
    material: k,
    showLabel: true,
    selected: mat === k,
    onClick: () => {
      setMat(k);
      crew(k === 'pla' ? 'colour' : k);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(B.Radio, {
    value: "std",
    checked: speed === 'std',
    onChange: setSpeed,
    label: t(C.std),
    description: t(C.stdD)
  }), /*#__PURE__*/React.createElement(B.Radio, {
    value: "rush",
    checked: speed === 'rush',
    onChange: setSpeed,
    label: t(C.rush),
    description: t(C.rushD)
  })), /*#__PURE__*/React.createElement(B.Input, {
    label: t(C.notes),
    placeholder: t(C.notesPh),
    value: notes,
    onChange: e => setNotes(e.target.value)
  }), /*#__PURE__*/React.createElement(B.Input, {
    label: t(S.email),
    type: "email",
    icon: "mail",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: email && !emailOk(email) ? t(S.emailBad) : undefined
  }))), /*#__PURE__*/React.createElement("div", {
    className: "s-sticky"
  }, /*#__PURE__*/React.createElement(B.Card, {
    variant: "brand",
    padding: 24
  }, /*#__PURE__*/React.createElement("span", {
    style: smMono
  }, t(C.estimate)), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '12px 0 6px'
    }
  }, est ? /*#__PURE__*/React.createElement(Price, {
    v: est.price,
    size: 56
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 56px/1 var(--font-display)'
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1.4 var(--font-body)'
    }
  }, !file ? t(C.needFile) : est ? t(C.estNote) + ' · ≈ ' + est.grams + ' g' : t(S.handPrice)), /*#__PURE__*/React.createElement(B.Button, {
    variant: "ink",
    size: "lg",
    fullWidth: true,
    disabled: !ready,
    style: {
      marginTop: 20
    },
    onClick: submit
  }, busy ? t(S.sending) : t(C.send))))));
}
Object.assign(window, {
  PageHead,
  ShopPage,
  ProductPage,
  ProductDetail,
  CustomPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PagesShop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PagesStudio.jsx
try { (() => {
function MaterialsPage({
  go
}) {
  const t = useT();
  const M = SITE.mats;
  const MP = SITE.materialsPage;
  const i = useLangIdx();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: MP.title,
    sub: MP.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, ['pla', 'petg', 'tpu'].map((k, n) => {
    const m = B.MATERIALS[k];
    return /*#__PURE__*/React.createElement(Rise, {
      key: k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        border: '2px solid var(--graphite-900)',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'var(--paper-0)',
        boxShadow: 'var(--shadow-hard)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: m.color,
        backgroundImage: 'var(--tex-layers-strong)',
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20,
        color: '#fff',
        minHeight: 260
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '800 clamp(64px,9vw,112px)/.8 var(--font-display)',
        letterSpacing: '-.03em'
      }
    }, m.name), /*#__PURE__*/React.createElement(B.Mascot, {
      pose: ['hello', 'cheer', 'hello'][n],
      color: k,
      swirl: "paper",
      size: 130
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        font: '800 28px/1.1 var(--font-display)'
      }
    }, t(M[k][0])), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: '500 17px/1.55 var(--font-body)',
        color: 'var(--fg-2)'
      }
    }, t(M[k][1])), /*#__PURE__*/React.createElement("span", {
      style: {
        ...smMono,
        color: 'var(--fg-3)'
      }
    }, t(MP.nozzle), " \xB7 ", m.temp), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap',
        marginTop: 'auto'
      }
    }, (SITE_COLOURS[k] || []).map(c => /*#__PURE__*/React.createElement("div", {
      key: c[3] || c[1],
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(B.MaterialSwatch, {
      color: c[0],
      size: 40
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 12px/1 var(--font-body)'
      }
    }, i ? c[2] : c[1])))))));
  }), /*#__PURE__*/React.createElement(B.Button, {
    variant: "ink",
    icon: "box",
    style: {
      alignSelf: 'flex-start'
    },
    onClick: () => go('custom')
  }, t(MP.studio))));
}
function LoopPage() {
  const t = useT();
  const L = SITE.loopPage;
  const i = useLangIdx();
  const [kg, setKg] = React.useState(1.5);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    over: SITE.loop.over,
    title: SITE.loop.title,
    sub: SITE.loop.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-g3"
  }, L.steps.map(([h, b], n) => /*#__PURE__*/React.createElement(Rise, {
    key: n,
    delay: n * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      height: '100%',
      border: '2px solid var(--graphite-900)',
      borderRadius: 20,
      padding: 24,
      background: 'var(--paper-0)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: ['oops', 'hello', 'cheer'][n],
    color: "loop",
    size: 96
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 24px/1.1 var(--font-display)'
    }
  }, t(h)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 15px/1.5 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(b)))))), /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      background: 'var(--graphite-900)',
      backgroundImage: 'var(--tex-bed-inverse)',
      color: 'var(--paper-0)',
      padding: 'clamp(20px,4vw,40px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "s-h2",
    style: {
      color: 'var(--paper-0)'
    }
  }, t(L.calc)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 clamp(56px,8vw,96px)/1 var(--font-mono)',
      color: 'var(--yolk-500)'
    }
  }, kg.toFixed(1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.4em',
      marginInlineStart: 8
    }
  }, "kg")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0.5",
    max: "10",
    step: "0.5",
    value: kg,
    onChange: e => setKg(+e.target.value),
    style: {
      width: '100%',
      accentColor: '#F2B705'
    },
    "aria-label": "Kilograms"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, [[L.credit, (i ? '' : 'SAR ') + Math.round(kg * 20) + (i ? ' ريال' : '')], [L.becomes, (kg * 0.9).toFixed(1) + ' kg']].map(([k, v], n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      border: '2px solid var(--graphite-700)',
      borderRadius: 16,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...smMono,
      fontSize: 10.5,
      color: 'var(--graphite-400)'
    }
  }, t(k)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 30px/1 var(--font-display)',
      marginTop: 10
    }
  }, v), n === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px/1.3 var(--font-body)',
      color: 'var(--graphite-300)',
      marginTop: 6
    }
  }, t(L.spool)))))))));
}
function AboutPage() {
  const t = useT();
  const A = SITE.about;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: A.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap s-split"
  }, /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("p", {
    className: "s-lead",
    style: {
      fontSize: 'clamp(18px,2vw,22px)',
      color: 'var(--fg-1)',
      maxWidth: 640
    }
  }, t(A.body))), /*#__PURE__*/React.createElement(Rise, {
    delay: 150,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, ['The print wall', 'Filament shelf', 'The team', 'Tab’a & the Goblin’s corner'].map((l, n) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: l,
    tone: ['ink', 'pla', 'paper', 'yolk'][n],
    texture: n === 0 ? 'bed' : 'layers',
    ratio: "1 / 1",
    radius: 0
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "s-section s-wrap"
  }, /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 28,
      alignItems: 'center',
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      background: 'var(--yolk-500)',
      padding: 'clamp(20px,4vw,40px)',
      boxShadow: 'var(--shadow-hard-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "s-h2"
  }, t(A.visit)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 17px/1.5 var(--font-body)'
    }
  }, t(A.visitSub)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...smMono
    }
  }, t(A.hours)), baraApi.config.mapsUrl && /*#__PURE__*/React.createElement(B.Button, {
    variant: "ink",
    icon: "map-pin",
    style: {
      alignSelf: 'flex-start'
    },
    onClick: () => window.open(baraApi.config.mapsUrl, '_blank', 'noopener')
  }, t(A.dir))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 18,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: "Map \u2014 studio location",
    tone: "paper",
    texture: "bed",
    ratio: "16 / 10",
    radius: 0
  }))))));
}
function CornerPage({
  toast
}) {
  const t = useT();
  const C = SITE.corner;
  const i = useLangIdx();
  const S = SITE.sys;
  const cities = i ? ['الرياض', 'جدة', 'الدمام', 'غيرها'] : ['Riyadh', 'Jeddah', 'Dammam', 'Other'];
  const [f, setF] = React.useState({
    name: '',
    company: '',
    city: 0,
    size: '6',
    phone: '',
    email: ''
  });
  const [sent, setSent] = React.useState(false);
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  const [send, busy] = useSend(toast);
  const ready = f.name.trim() && f.company.trim() && (emailOk(f.email) || f.phone.replace(/\D/g, '').length >= 8) && !busy;
  const submit = () => send('corner', {
    ...f,
    city: ['Riyadh', 'Jeddah', 'Dammam', 'Other'][f.city],
    lang: i ? 'ar' : 'en'
  }, () => {
    setSent(true);
    toast({
      tone: 'success',
      title: t(C.sent)
    });
  }, '3D Corner — ' + f.company);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    over: C.over,
    title: C.title,
    sub: C.sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-wrap",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--graphite-900)',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement(B.MediaPlaceholder, {
    label: "3D Corner render \u2014 kiosk, printers, recycling bin",
    tone: "yolk",
    ratio: "21 / 8",
    radius: 0
  }))), /*#__PURE__*/React.createElement("div", {
    className: "s-g3"
  }, C.tiles.map(([h, b], n) => /*#__PURE__*/React.createElement(Rise, {
    key: n,
    delay: n * 90
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-squish",
    style: {
      height: '100%',
      border: '2px solid var(--graphite-900)',
      borderRadius: 20,
      padding: 24,
      background: 'var(--paper-0)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: 'var(--shadow-hard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      border: '2px solid var(--graphite-900)',
      background: ['var(--mat-pla)', 'var(--yolk-500)', 'var(--mat-loop)'][n],
      color: n === 1 ? 'var(--graphite-900)' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(B.Icon, {
    name: ['printer', 'package-open', 'recycle'][n],
    size: 26
  })), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 22px/1.15 var(--font-display)'
    }
  }, t(h)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 15px/1.5 var(--font-body)',
      color: 'var(--fg-2)'
    }
  }, t(b)))))), /*#__PURE__*/React.createElement("div", {
    className: "s-split"
  }, /*#__PURE__*/React.createElement(Rise, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
      border: '2px solid var(--graphite-900)',
      borderRadius: 20,
      overflow: 'hidden',
      background: 'var(--paper-0)'
    }
  }, C.specs.map((s, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      padding: 20,
      borderTop: n > 1 ? '2px solid var(--graphite-900)' : 0,
      borderInlineStart: n % 2 ? '2px solid var(--graphite-900)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...smMono,
      fontSize: 10.5,
      color: 'var(--fg-3)'
    }
  }, i ? s[1] : s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 clamp(26px,3vw,36px)/1 var(--font-display)',
      marginTop: 8
    }
  }, i ? s[3] : s[2]))))), /*#__PURE__*/React.createElement(Rise, {
    delay: 120
  }, /*#__PURE__*/React.createElement(B.Card, {
    variant: "raised",
    padding: 24
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      textAlign: 'center',
      padding: 12
    }
  }, /*#__PURE__*/React.createElement(B.Mascot, {
    pose: "cheer",
    size: 120
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 24px/1.15 var(--font-display)'
    }
  }, t(C.sent))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: '800 26px/1 var(--font-display)'
    }
  }, t(C.form)), /*#__PURE__*/React.createElement(B.Input, {
    label: t(C.name),
    value: f.name,
    onChange: set('name')
  }), /*#__PURE__*/React.createElement(B.Input, {
    label: t(C.company),
    value: f.company,
    onChange: set('company')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(B.Select, {
    label: t(C.city),
    value: String(f.city),
    onChange: e => setF({
      ...f,
      city: +e.target.value
    }),
    options: cities.map((c, n) => ({
      value: String(n),
      label: c
    }))
  }), /*#__PURE__*/React.createElement(B.Input, {
    label: t(C.size),
    suffix: "m\xB2",
    type: "number",
    value: f.size,
    onChange: set('size')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(B.Input, {
    label: t(S.phone),
    type: "tel",
    icon: "phone",
    value: f.phone,
    onChange: set('phone')
  }), /*#__PURE__*/React.createElement(B.Input, {
    label: t(S.email),
    type: "email",
    icon: "mail",
    value: f.email,
    onChange: set('email'),
    error: f.email && !emailOk(f.email) ? t(S.emailBad) : undefined
  })), /*#__PURE__*/React.createElement(B.Button, {
    size: "lg",
    iconRight: "phone",
    disabled: !ready,
    onClick: submit
  }, busy ? t(S.sending) : t(C.send))))))));
}
Object.assign(window, {
  MaterialsPage,
  LoopPage,
  AboutPage,
  CornerPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PagesStudio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/copy.js
try { (() => {
// Every string is [English, Arabic]. Arabic is written natively in light Saudi casual — not translated.
window.SITE = {
  nav: {
    home: ['Home', 'الرئيسية'],
    shop: ['Shop', 'المتجر'],
    custom: ['Print your file', 'اطبع ملفك'],
    sell: ['Sell your design', 'بيع تصميمك'],
    materials: ['Materials', 'الخامات'],
    loop: ['Recycling', 'التدوير'],
    about: ['The studio', 'عنّا'],
    corner: ['For stores', 'للمتاجر']
  },
  announce: ['Free pickup in Riyadh · Bring us 1 kg of failed prints, get SAR 20 off', 'الاستلام من الرياض ببلاش · جيب لنا كيلو من طبعاتك الخربانة وخذ خصم ٢٠ ريال'],
  tagline: ['Weirdly specific things, printed.', 'فكرتك غريبة؟ أحسن.'],
  hero: {
    over: ['3D print studio · Riyadh', 'استوديو طباعة ثلاثية الأبعاد · الرياض'],
    title: ['Weirdly specific things, printed.', 'فكرتك غريبة؟ أحسن. نطبعها لك.'],
    sub: ['Dice towers, board-game inserts, that one bracket nobody sells. Grab something from the shop or send us your file — we print it here and it’s ready in days.', 'أبراج نرد، منظمات ألعاب، والقطعة اللي دورت عليها بكل مكان وما لقيتها. اختر من المتجر أو أرسل ملفك، نطبعها هنا وتجهز خلال أيام.'],
    shop: ['Browse the shop', 'تصفّح المتجر'],
    upload: ['Send us your file', 'أرسل ملفك']
  },
  marquee: ['0.20 mm layers', 'PLA · PETG · TPU', '250 mm build plate', '6 printers, usually busy', 'Made in Riyadh', 'Failed prints recycled'],
  marqueeAr: ['طبقات ٠٫٢ مم', 'PLA · PETG · TPU', 'سطح طباعة ٢٥٠ مم', '٦ طابعات شغالة', 'من الرياض', 'نعيد تدوير الطبعات الخربانة'],
  fresh: {
    title: ['Fresh off the printer', 'طالعة من الطابعة توّها'],
    all: ['See everything', 'شوف الكل']
  },
  how: {
    title: ['How it works', 'كيف تمشي الأمور'],
    steps: [[['Send it', 'أرسل الملف'], ['STL, 3MF or OBJ. No file? Describe the idea and we’ll sort it out.', 'STL أو 3MF أو OBJ. ما عندك ملف؟ قل لنا الفكرة ونتصرف.']], [['Pick the plastic', 'اختر الخامة واللون'], ['Stiff, tough or bendy — in a colour that’s actually on our shelf.', 'قوية، متينة، أو مرنة — وبلون موجود عندنا فعلًا.']], [['We print it', 'نطبعها'], ['Layer by layer. Yes, we stand there and watch.', 'طبقة ورا طبقة… وإيه، نوقف نتفرج عليها.']], [['Grab it', 'استلمها'], ['Pick it up at the studio or we’ll deliver it.', 'مرّ خذها من الاستوديو أو نوصلها لك.']]]
  },
  mats: {
    title: ['What should we print it in?', 'وش الخامة اللي تبيها؟'],
    pla: [['The everyday one', 'خامة كل يوم'], ['Stiff, matte and made from plants. Perfect for games, figures and desk stuff.', 'قوية ومطفية ومصنوعة من النشا. مثالية للألعاب والمجسمات وأغراض المكتب.']],
    petg: [['The tough one', 'الخامة المتينة'], ['Handles heat, water and the dishwasher (mostly). Great for planters and kitchen bits.', 'تتحمل الحرارة والموية… وغالبًا غسالة الصحون. ممتازة للأصايص وأغراض المطبخ.']],
    tpu: [['The bendy one', 'الخامة المرنة'], ['Squish it and it bounces back. Phone grips, bumpers, cable tidies.', 'اعصرها وترجع زي ما كانت. ماسكات جوال، حمايات، ومنظمات أسلاك.']],
    cta: ['All materials & colours', 'كل الخامات والألوان']
  },
  loop: {
    over: ['Bara’ Loop', 'برأ لوب'],
    title: ['Failed prints get a second shot.', 'الطبعات الخربانة لها فرصة ثانية.'],
    sub: ['Bring us your spaghetti, supports and test cubes. We grind them into new filament and give you SAR 20 off for every kilo.', 'جيب لنا الخرابيط والدعامات ومكعبات التجربة، نطحنها ونرجعها خيوط جديدة، ولك خصم ٢٠ ريال على كل كيلو.'],
    cta: ['How recycling works', 'كيف نعيد التدوير']
  },
  cornerTeaser: {
    title: ['Got a store? Put a 3D Corner in it.', 'عندك متجر؟ حط فيه ركن طباعة.'],
    sub: ['Printing, pickup and recycling in about 6 m². We run it, your customers hang around longer.', 'طباعة واستلام وتدوير في حوالي ٦ م². إحنا نشغّله، وعملاءك يطوّلون عندك.'],
    cta: ['Tell me more', 'أبي أعرف أكثر']
  },
  community: {
    over: ['From the community', 'من المجتمع'],
    title: ['Found it online? We’ll print it.', 'لقيته أونلاين؟ نطبعه لك.'],
    sub: ['Popular models from MakerWorld and Printables, printed only where the designer’s licence allows selling prints. The designer is always credited.', 'موديلات مشهورة من MakerWorld وPrintables، نطبع بس اللي رخصتها تسمح بالبيع، ودايم نذكر المصمم.'],
    tab: ['Community', 'المجتمع'],
    by: ['by', 'تصميم'],
    lic: ['Licence', 'الرخصة'],
    credit: ['Designer credit', 'حق المصمم'],
    creditNote: ['Part of every sale goes back to the designer.', 'جزء من كل بيعة يرجع للمصمم.'],
    view: ['View original', 'شوف الأصل']
  },
  shop: {
    title: ['The shop', 'المتجر'],
    sub: ['Stuff we’ve already figured out how to print well.', 'أشياء جربناها وضبطت معنا.'],
    all: ['All', 'الكل'],
    games: ['Games', 'ألعاب'],
    home: ['Home & desk', 'البيت والمكتب'],
    empty: ['Nothing on the printer for that combo. Try another material.', 'ما فيه شي بهالخيارات. جرّب خامة ثانية.']
  },
  product: {
    back: ['Back to the shop', 'رجوع للمتجر'],
    material: ['Material', 'الخامة'],
    colour: ['Colour', 'اللون'],
    add: ['Add to cart', 'أضف للسلة'],
    ready: ['Ready in 2 days', 'تجهز خلال يومين'],
    layers: ['Layers', 'الطبقات'],
    time: ['Print time', 'وقت الطباعة'],
    infill: ['Infill', 'التعبئة'],
    weight: ['Weight', 'الوزن']
  },
  custom: {
    over: ['Print your file', 'اطبع ملفك'],
    title: ['Got a file? Drop it here.', 'عندك ملف؟ ارمه هنا.'],
    sub: ['We check it, price it and get back to you within the hour. A real person looks at it before anything melts.', 'نشيك عليه ونسعّره ونرد عليك خلال ساعة. وفيه شخص حقيقي يشوفه قبل لا نذوّب أي شي.'],
    drop: ['Drop your file on the bed', 'ارمِ ملفك هنا'],
    limits: ['STL · 3MF · OBJ — up to 250 × 250 × 250 mm', 'STL · 3MF · OBJ — لين ٢٥٠ × ٢٥٠ × ٢٥٠ مم'],
    estimate: ['Rough price', 'السعر التقريبي'],
    estNote: ['Final price confirmed within the hour.', 'نأكد لك السعر النهائي خلال ساعة.'],
    needFile: ['Add a file to see a price.', 'أضف ملف عشان يطلع لك السعر.'],
    std: ['Standard', 'عادي'],
    stdD: ['Ready in 3–4 days', 'يجهز خلال ٣–٤ أيام'],
    rush: ['Rush', 'مستعجل'],
    rushD: ['24 h · +SAR 30', '٢٤ ساعة · +٣٠ ريال'],
    notes: ['Anything we should know?', 'فيه شي لازم نعرفه؟'],
    notesPh: ['e.g. Base in graphite, the rest in yellow', 'مثلًا: القاعدة جرافيت والباقي أصفر'],
    send: ['Get my quote', 'أرسل لي السعر'],
    sent: ['Got it!', 'وصلنا!'],
    sentMsg: ['We’ll email your quote within the hour.', 'بنرسل لك السعر على الإيميل خلال ساعة.']
  },
  materialsPage: {
    title: ['Materials & colours', 'الخامات والألوان'],
    sub: ['Three plastics, a shelf full of colours. Every swatch here is actually in stock.', 'ثلاث خامات ورف مليان ألوان. كل لون هنا موجود عندنا فعلًا.'],
    nozzle: ['Nozzle', 'حرارة الفوهة'],
    good: ['Good for', 'تنفع لـ'],
    studio: ['Try colours in 3D', 'جرّب الألوان ثلاثي الأبعاد']
  },
  loopPage: {
    steps: [[['Collect', 'اجمعها'], ['Failed prints, rafts, supports, test cubes. PLA and PETG only.', 'الطبعات الخربانة والدعامات ومكعبات التجربة. PLA و PETG بس.']], [['Drop off', 'جيبها'], ['At the studio or any 3D Corner. We weigh it on the spot.', 'للاستوديو أو أي ركن طباعة. نوزنها قدامك.']], [['Get credit', 'خذ رصيدك'], ['SAR 20 per kilo, straight onto your account.', '٢٠ ريال على كل كيلو، ينزل في حسابك على طول.']]],
    calc: ['How much have you got?', 'كم عندك؟'],
    credit: ['Your credit', 'رصيدك'],
    becomes: ['Becomes about', 'تصير تقريبًا'],
    spool: ['of Loop filament', 'خيوط لوب جديدة']
  },
  about: {
    title: ['A small studio with too many spools.', 'استوديو صغير وبكرات خيوط أكثر من اللازم.'],
    body: ['Bara’ started on a desk with one printer and a lot of failed dice towers. Now it’s six printers, a wall of filament and a team that gets far too excited about layer lines. The name comes from the Arabic برأ — to make something, carefully.', 'بدأت برأ على مكتب فيه طابعة وحدة وأبراج نرد كثير خربت. الحين صارت ست طابعات وجدار خيوط وفريق يتحمس زيادة عن اللزوم للطبقات. والاسم من «برأ» — يعني تصنع الشي بدقة.'],
    visit: ['Come say hi', 'مرّ علينا'],
    visitSub: ['The printers are usually running. Bring your idea, or just come watch.', 'الطابعات غالبًا شغالة. جيب فكرتك، أو تعال تفرّج بس.'],
    hours: ['Sun–Thu 10:00–22:00 · Fri–Sat 16:00–23:00', 'الأحد–الخميس ١٠ص–١٠م · الجمعة–السبت ٤م–١١م'],
    dir: ['Get directions', 'الموقع على الخريطة']
  },
  corner: {
    over: ['For retailers', 'للمتاجر'],
    title: ['Put a 3D Corner in your store.', 'حط ركن طباعة ثلاثية الأبعاد في متجرك.'],
    sub: ['A compact spot where shoppers print, pick up and recycle. We bring the printers, the kiosk and the staff training. You get foot traffic and a reason to come back.', 'ركن صغير يطبع فيه العميل ويستلم ويدوّر. إحنا نجيب الطابعات والشاشة وندرّب الموظفين. وأنت تكسب زوار أكثر وسبب يخليهم يرجعون.'],
    tiles: [[['Print while you shop', 'اطبع وأنت تتسوق'], ['Small items ready in under 2 hours.', 'القطع الصغيرة تجهز بأقل من ساعتين.']], [['Pickup lockers', 'خزائن استلام'], ['Online orders collected in-store.', 'الطلبات الأونلاين تُستلم من متجرك.']], [['Recycling drop-off', 'نقطة تدوير'], ['A scale, a bin and store credit.', 'ميزان وصندوق ورصيد للعميل.']]],
    specs: [['Footprint', 'المساحة', '≈ 6 m²', '≈ ٦ م²'], ['Printers', 'الطابعات', '3–4', '٣–٤'], ['Power', 'الكهرباء', '2 × 16 A', '2 × 16 A'], ['Setup', 'التركيب', '1 week', 'أسبوع']],
    form: ['Let’s talk', 'خلنا نتكلم'],
    name: ['Your name', 'اسمك'],
    company: ['Store / brand', 'المتجر أو البراند'],
    city: ['City', 'المدينة'],
    size: ['Space available', 'المساحة المتاحة'],
    send: ['Request a call', 'اطلب اتصال'],
    sent: ['Thanks! We’ll call you this week.', 'شكرًا! بنتصل عليك هالأسبوع.']
  },
  cart: {
    title: ['Your cart', 'سلتك'],
    empty: ['Nothing here yet. Go print something.', 'السلة فاضية. روح اطبع لك شي.'],
    sub: ['Subtotal', 'المجموع'],
    checkout: ['Checkout', 'إتمام الطلب'],
    added: ['Added to cart', 'انضاف للسلة']
  },
  footer: {
    blurb: ['Six printers, a wall of filament and two very stressed workers: Tab’a and the Mess Goblin.', 'ست طابعات، جدار خيوط، واثنين مضغوطين على الآخر: طبعة ووحش اللخبطة.'],
    rights: ['© 2026 Bara’ 3D print studio', '© ٢٠٢٦ برأ للطباعة ثلاثية الأبعاد']
  },
  sys: {
    loading: ['Warming up the nozzle…', 'نسخّن الفوهة…'],
    loadFail: ['The shop didn’t load.', 'المتجر ما فتح.'],
    loadFailSub: ['Probably the Wi-Fi. Possibly the Goblin.', 'غالبًا النت. وممكن الوحش.'],
    retry: ['Try again', 'جرّب مرة ثانية'],
    notFound: ['That page fell off the bed.', 'هالصفحة طاحت من الطابعة.'],
    notFoundSub: ['It might have moved, or it never printed.', 'يمكن انتقلت، أو أصلًا ما انطبعت.'],
    toShop: ['Go to the shop', 'روح للمتجر'],
    sendFail: ['Didn’t go through.', 'ما وصل.'],
    sendFailMail: ['Email us instead:', 'راسلنا على الإيميل:'],
    sendFailRetry: ['Check your connection and try again.', 'شيك على النت وجرّب مرة ثانية.'],
    email: ['Email', 'الإيميل'],
    emailBad: ['That email looks off', 'الإيميل فيه شي غلط'],
    phone: ['Phone', 'الجوال'],
    outOfStock: ['Out of stock in this material right now.', 'هالخامة خلصت عندنا حاليًا.'],
    tooBig: ['Bigger than our 250 mm bed. We can split it — mention it in the notes.', 'أكبر من سطح الطابعة ٢٥٠ مم. نقدر نقسمها — اكتبها بالملاحظات.'],
    handPrice: ['We’ll price this one by hand.', 'هذا بنسعّره يدوي.'],
    badFile: ['STL, 3MF or OBJ only.', 'STL أو 3MF أو OBJ بس.'],
    fileTooLarge: ['That file is over 100 MB.', 'الملف أكبر من ١٠٠ ميجا.'],
    checkoutOff: ['Online checkout isn’t switched on yet.', 'الدفع أونلاين مو شغال للحين.'],
    checkoutMail: ['Order by email', 'اطلب بالإيميل'],
    sending: ['Sending…', 'نرسل…'],
    floorIdle: ['On the floor', 'في الورشة'],
    floorNoInfo: ['Live queue · no customer info', 'الطابور مباشر · بدون بيانات عملاء'],
    creatorEmpty: ['Your listings and points show up here once your first design is approved.', 'منتجاتك ونقاطك بتطلع هنا أول ما ينقبل أول تصميم لك.'],
    notFoundProduct: ['We don’t print that one (anymore).', 'هذا ما نطبعه (أو وقفناه).']
  }
};
// Catalogue, colours and prices are NOT here — they load from data/*.json (or your API) via data.js.
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/copy.js", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Data layer: every product, colour, price and live feed on the site comes through here.
// Reads from BARA_CONFIG.sources (or bundled /data/*.json), writes to BARA_CONFIG.endpoints.
(function () {
  const here = document.currentScript && document.currentScript.src || location.href;
  const cfg = window.BARA_CONFIG || {};
  const dataBase = cfg.dataBase || new URL('../../data/', here).href;
  const sources = cfg.sources || {};
  const endpoints = cfg.endpoints || {};
  const timeout = cfg.requestTimeoutMs || 12000;
  const cache = {};
  class ApiError extends Error {
    constructor(code, msg, status) {
      super(msg || code);
      this.code = code;
      this.status = status;
    }
  }
  async function request(url, opts = {}) {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), timeout);
    try {
      const res = await fetch(url, {
        ...opts,
        signal: ctl.signal,
        headers: {
          Accept: 'application/json',
          ...(opts.headers || {})
        }
      });
      if (!res.ok) throw new ApiError('http', res.statusText, res.status);
      const type = res.headers.get('content-type') || '';
      return type.includes('json') ? res.json() : res.text();
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(e.name === 'AbortError' ? 'timeout' : 'network', e.message);
    } finally {
      clearTimeout(tm);
    }
  }
  const sourceUrl = name => sources[name] || dataBase + name + '.json';
  const get = (name, {
    fresh
  } = {}) => {
    if (!fresh && cache[name]) return cache[name];
    const p = request(sourceUrl(name), {
      cache: 'no-cache'
    });
    cache[name] = p;
    p.catch(() => {
      delete cache[name];
    });
    return p;
  };
  const configured = name => !!endpoints[name];
  async function send(name, body, method = 'POST') {
    const url = endpoints[name];
    if (!url) throw new ApiError('not-configured', 'Endpoint "' + name + '" is not set in site.config.js');
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
    return request(url, {
      method,
      body: isForm ? body : JSON.stringify(body),
      headers: isForm ? {} : {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  }
  function poll(name, ms, cb) {
    if (!endpoints[name]) return () => {};
    let alive = true,
      t;
    const run = async () => {
      if (!alive) return;
      if (!document.hidden) {
        try {
          cb(await request(endpoints[name], {
            cache: 'no-store',
            credentials: 'include'
          }));
        } catch (e) {
          cb(null, e);
        }
      }
      t = setTimeout(run, ms || 10000);
    };
    run();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }
  const fetchLive = name => endpoints[name] ? request(endpoints[name], {
    cache: 'no-store',
    credentials: 'include'
  }) : Promise.reject(new ApiError('not-configured'));

  // ---- Normalisers: public JSON schema → internal shape used by the UI ----
  const pair = v => v == null ? undefined : Array.isArray(v) ? v : typeof v === 'object' ? [v.en || '', v.ar || v.en || ''] : [String(v), String(v)];
  function normProduct(p) {
    const s = p.source || null;
    return {
      id: p.id,
      en: p.name && p.name.en || p.id,
      ar: p.name && (p.name.ar || p.name.en) || p.id,
      price: +p.price,
      currency: p.currency || 'SAR',
      mats: p.materials || [],
      cat: p.category,
      tone: p.tone || (p.materials || [])[0] || 'paper',
      badge: pair(p.badge),
      spec: p.spec || '',
      d: pair(p.description) || ['', ''],
      stats: p.stats || null,
      images: p.images || [],
      src: s && s.platform,
      by: s && s.designer,
      url: s && s.url,
      lic: s && pair(s.licence),
      likes: s && s.likes
    };
  }
  const statusOf = (grams, th) => grams >= th.in ? 'in' : grams >= th.low ? 'low' : 'out';
  async function boot() {
    const [prod, stock] = await Promise.all([get('products'), get('stock')]);
    const th = stock && stock.thresholds || {
      in: 1500,
      low: 300
    };
    const rows = Array.isArray(stock) ? stock : stock.items || [];
    const products = (Array.isArray(prod) ? prod : prod.items || []).filter(p => p.published !== false).map(normProduct);
    const colours = {};
    rows.forEach(f => {
      if (statusOf(f.grams, th) === 'out') return;
      (colours[f.material] = colours[f.material] || []).push([f.hex, f.name, f.ar || f.name, f.id]);
    });
    window.SITE_PRODUCTS = products;
    window.SITE_COLOURS = colours;
    window.BARA_THRESHOLDS = th;
    return {
      products,
      colours,
      stock: rows,
      thresholds: th
    };
  }

  // ---- Mesh reader: real dimensions + volume from STL / OBJ (3MF: name + size only) ----
  function bboxVol(tris) {
    let mn = [Infinity, Infinity, Infinity],
      mx = [-Infinity, -Infinity, -Infinity],
      vol = 0;
    for (let i = 0; i < tris.length; i += 9) {
      for (let k = 0; k < 9; k += 3) for (let a = 0; a < 3; a++) {
        const v = tris[i + k + a];
        if (v < mn[a]) mn[a] = v;
        if (v > mx[a]) mx[a] = v;
      }
      const [x1, y1, z1, x2, y2, z2, x3, y3, z3] = tris.slice(i, i + 9);
      vol += (x1 * (y2 * z3 - y3 * z2) - x2 * (y1 * z3 - y3 * z1) + x3 * (y1 * z2 - y2 * z1)) / 6;
    }
    return {
      dims: mx.map((v, a) => +(v - mn[a]).toFixed(1)),
      volume: Math.abs(vol) / 1000
    };
  }
  async function readMesh(file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const out = {
      file,
      name: file.name,
      ext,
      bytes: file.size,
      size: (file.size / 1048576).toFixed(1) + ' MB',
      dims: null,
      volume: null
    };
    try {
      if (ext === 'stl') {
        const buf = await file.arrayBuffer();
        const dv = new DataView(buf);
        const n = buf.byteLength > 84 ? dv.getUint32(80, true) : 0;
        let tris;
        if (84 + n * 50 === buf.byteLength) {
          tris = new Float32Array(n * 9);
          for (let i = 0; i < n; i++) for (let k = 0; k < 9; k++) tris[i * 9 + k] = dv.getFloat32(84 + i * 50 + 12 + k * 4, true);
        } else {
          const txt = new TextDecoder().decode(buf);
          const m = txt.match(/vertex\s+[-+\d.eE]+\s+[-+\d.eE]+\s+[-+\d.eE]+/g) || [];
          tris = new Float32Array(m.length * 3);
          m.forEach((s, i) => s.trim().split(/\s+/).slice(1).forEach((v, a) => {
            tris[i * 3 + a] = +v;
          }));
        }
        if (tris.length) Object.assign(out, bboxVol(tris));
      } else if (ext === 'obj') {
        const txt = await file.text();
        const v = [];
        const f = [];
        txt.split('\n').forEach(l => {
          if (l.startsWith('v ')) v.push(l.trim().split(/\s+/).slice(1, 4).map(Number));else if (l.startsWith('f ')) {
            const ix = l.trim().split(/\s+/).slice(1).map(s => parseInt(s, 10)).map(x => x < 0 ? v.length + x : x - 1);
            for (let k = 1; k < ix.length - 1; k++) f.push(...v[ix[0]], ...v[ix[k]], ...v[ix[k + 1]]);
          }
        });
        if (f.length) Object.assign(out, bboxVol(f));
      }
    } catch (e) {/* unreadable mesh: we still accept the file and price it by hand */}
    return out;
  }

  // Rough price from real mesh volume and the published rate card (data/pricing.json).
  function estimate(mesh, mat, speed, pricing) {
    if (!mesh || !mesh.volume || !pricing || !pricing.materials || !pricing.materials[mat]) return null;
    const m = pricing.materials[mat];
    const grams = mesh.volume * m.density * (pricing.fillFactor || 0.35);
    const base = Math.max(m.min || 0, (pricing.setupFee || 0) + grams * m.perGram);
    return {
      price: Math.ceil(base + (speed === 'rush' ? pricing.rushFee || 0 : 0)),
      grams: Math.round(grams)
    };
  }
  const fits = (mesh, pricing) => !mesh || !mesh.dims || !pricing || !pricing.buildVolume || mesh.dims.slice().sort((a, b) => a - b).every((d, i) => d <= pricing.buildVolume.slice().sort((a, b) => a - b)[i]);
  window.baraApi = {
    boot,
    get,
    send,
    poll,
    fetchLive,
    configured,
    readMesh,
    estimate,
    fits,
    statusOf,
    normProduct,
    config: cfg,
    ApiError
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.MATERIALS = __ds_scope.MATERIALS;

__ds_ns.MaterialSwatch = __ds_scope.MaterialSwatch;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Goblin = __ds_scope.Goblin;

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.SpeechBubble = __ds_scope.SpeechBubble;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.MediaPlaceholder = __ds_scope.MediaPlaceholder;

})();

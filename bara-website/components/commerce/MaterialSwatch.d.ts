/** Spool-style material colour picker. Exports MATERIALS data too. */
export interface MaterialSwatchProps { material?: 'pla'|'petg'|'tpu'|'loop'; color?: string; label?: string; selected?: boolean; size?: number; showLabel?: boolean; onClick?: () => void; style?: React.CSSProperties; }

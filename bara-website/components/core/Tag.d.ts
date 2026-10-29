/** Mono uppercase spec/material tag; filter chips when `onClick`/`selected`. */
export interface TagProps { material?: 'pla'|'petg'|'tpu'|'loop'; selected?: boolean; onClick?: () => void; onRemove?: () => void; children?: React.ReactNode; style?: React.CSSProperties; }

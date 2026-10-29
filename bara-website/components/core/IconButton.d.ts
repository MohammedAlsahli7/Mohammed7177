/** Square (or round) icon-only button. Always pass `label` for a11y. */
export interface IconButtonProps { icon: string; label: string; variant?: 'primary'|'secondary'|'ink'|'ghost'; size?: 'sm'|'md'|'lg'; round?: boolean; disabled?: boolean; badge?: number|string; onClick?: (e: any) => void; style?: React.CSSProperties; }

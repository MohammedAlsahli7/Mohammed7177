/** Native select styled to match Input. */
export interface SelectProps { label?: string; hint?: string; error?: string; options: (string|{ value: string; label: string })[]; size?: 'sm'|'md'|'lg'; value?: string; defaultValue?: string; disabled?: boolean; id?: string; onChange?: (e: any) => void; style?: React.CSSProperties; }

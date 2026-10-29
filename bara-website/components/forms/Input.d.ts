/** Text field; focus = ink border + yolk offset shadow. */
export interface InputProps { label?: string; hint?: string; error?: string; icon?: string; suffix?: string; size?: 'sm'|'md'|'lg'; value?: string; defaultValue?: string; placeholder?: string; disabled?: boolean; type?: string; id?: string; onChange?: (e: any) => void; style?: React.CSSProperties; inputStyle?: React.CSSProperties; }

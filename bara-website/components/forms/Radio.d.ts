/** Single radio; group by sharing state in the parent. */
export interface RadioProps { checked?: boolean; onChange?: (value: string) => void; value?: string; name?: string; label?: string; description?: string; disabled?: boolean; style?: React.CSSProperties; }

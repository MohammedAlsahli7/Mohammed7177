/** Yolk-filled checkbox with optional description. */
export interface CheckboxProps { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; label?: string; description?: string; disabled?: boolean; style?: React.CSSProperties; }

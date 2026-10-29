/**
 * Chunky ink-outlined button with hard offset shadow that presses flat.
 * @startingPoint section="Core" subtitle="Primary, secondary, ink, ghost buttons" viewport="700x300"
 */
export interface ButtonProps { variant?: 'primary'|'secondary'|'ink'|'danger'|'ghost'; size?: 'sm'|'md'|'lg'; icon?: string; iconRight?: string; fullWidth?: boolean; disabled?: boolean; type?: 'button'|'submit'; onClick?: (e: any) => void; children?: React.ReactNode; style?: React.CSSProperties; }

/** − value + stepper for cart quantities. */
export interface QuantityStepperProps { value?: number; defaultValue?: number; min?: number; max?: number; onChange?: (n: number) => void; size?: 'sm'|'md'; style?: React.CSSProperties; }

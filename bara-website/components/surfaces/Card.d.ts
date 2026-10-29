/** Container surface. raised = ink outline + hard shadow (default). */
export interface CardProps { variant?: 'flat'|'outlined'|'raised'|'brand'|'inverse'; padding?: number|string; interactive?: boolean; texture?: 'layers'|'bed'; onClick?: () => void; children?: React.ReactNode; style?: React.CSSProperties; }

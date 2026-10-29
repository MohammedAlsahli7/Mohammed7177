/**
 * Modal dialog: ink outline, hard-lg shadow, dashed footer rule. `inline` renders without the scrim.
 * @startingPoint section="Feedback" subtitle="Modal with title, body, actions" viewport="700x380"
 */
export interface DialogProps { open?: boolean; onClose?: () => void; title?: string; eyebrow?: string; children?: React.ReactNode; footer?: React.ReactNode; width?: number; inline?: boolean; style?: React.CSSProperties; }

/** Ink notification with tone-coloured icon tile. */
export interface ToastProps { tone?: 'neutral'|'success'|'warning'|'danger'|'info'; title?: string; message?: string; icon?: string; action?: string; onAction?: () => void; onClose?: () => void; style?: React.CSSProperties; }

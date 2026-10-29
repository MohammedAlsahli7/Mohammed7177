/** Segmented pill tabs or underline tabs. */
export interface TabItem { id: string; label: string; count?: number; }
export interface TabsProps { items: TabItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; variant?: 'pill'|'underline'; style?: React.CSSProperties; }

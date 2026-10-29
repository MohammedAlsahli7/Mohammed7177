/**
 * Shop tile: square media, bilingual title, mono spec line, SAR price, material dots, quick-add.
 * @startingPoint section="Commerce" subtitle="Product grid tile" viewport="700x420"
 */
export interface ProductCardProps { title: string; titleAr?: string; price: number|string; currency?: string; image?: string; imageTone?: 'paper'|'yolk'|'pla'|'petg'|'tpu'|'ink'; materials?: ('pla'|'petg'|'tpu'|'loop')[]; badge?: string; badgeTone?: string; spec?: string; onAdd?: () => void; onClick?: () => void; style?: React.CSSProperties; }

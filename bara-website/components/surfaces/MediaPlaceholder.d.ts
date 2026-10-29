/** Layer-line textured stand-in for product photography; pass `src` once real images exist. */
export interface MediaPlaceholderProps { label?: string; ratio?: string; tone?: 'paper'|'yolk'|'pla'|'petg'|'tpu'|'ink'; texture?: 'layers'|'bed'; src?: string; radius?: number; style?: React.CSSProperties; }

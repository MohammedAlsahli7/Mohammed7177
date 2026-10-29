/**
 * Tab'a (طبعة, "a print") — a tangle of purge filament with a face floating on it. The cheerful, frantic half of the shop crew (with the Goblin).
 * @startingPoint section="Brand" subtitle="Tab'a + the Mess Goblin" viewport="700x260"
 */
export interface MascotProps { pose?: 'hello'|'printing'|'cheer'|'oops'|'sleepy'|'shout'|'hips'|'peer'|'walk'; color?: 'yolk'|'pla'|'petg'|'tpu'|'loop'|'ink'|'paper'|string; swirl?: 'yolk'|'pla'|'petg'|'tpu'|'loop'|'ink'|'paper'|string; size?: number; animate?: boolean; track?: boolean; /** Masking tape over the mouth (muted). */ taped?: boolean; /** Keep full motion under OS reduced-motion (short user-triggered gags only). */ ignoreReducedMotion?: boolean; style?: React.CSSProperties; }

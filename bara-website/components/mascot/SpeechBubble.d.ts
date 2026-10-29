/** Comic speech bubble for Tab'a and the Goblin. tone: say · shout (yolk, tilted) · cheer (pink, Tab'a) · judge (ink, Goblin). */
export interface SpeechBubbleProps { tone?: 'say'|'shout'|'cheer'|'judge'; tail?: 'bottom-start'|'bottom-end'|'top-start'|'top-end'|'none'; who?: string; children?: React.ReactNode; style?: React.CSSProperties; }

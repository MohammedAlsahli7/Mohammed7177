// Goblin animations (keyframes), injected once by Goblin.jsx.

export const GB_CSS = `
@keyframes gb-shake{0%,100%{transform:translate(0,0) rotate(0)}20%{transform:translate(-3px,1px) rotate(-2deg)}40%{transform:translate(3px,-1px) rotate(2deg)}60%{transform:translate(-2px,0) rotate(-1deg)}80%{transform:translate(2px,1px) rotate(1deg)}}
@keyframes gb-run{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
@keyframes gb-walk{0%,50%,100%{transform:translateY(0) rotate(-2deg)}25%,75%{transform:translateY(-6px) rotate(2deg)}}
@keyframes gb-push{0%,50%,100%{transform:translateY(0) rotate(8deg)}25%,75%{transform:translateY(-4px) rotate(10deg)}}
@keyframes gb-step{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(6px,-12px) rotate(-14deg)}50%{transform:translate(10px,0) rotate(0)}75%{transform:translate(4px,0)}}
@keyframes gb-swing{0%,100%{transform:rotate(-18deg)}50%{transform:rotate(18deg)}}
@keyframes gb-sway{0%,100%{transform:translateX(-2px) rotate(-2.5deg)}50%{transform:translateX(2px) rotate(2.5deg)}}
@keyframes gb-peer{0%,100%{transform:translate(-3px,4px) rotate(-5deg) scale(1.04)}50%{transform:translate(3px,6px) rotate(4deg) scale(1.1)}}
@keyframes gb-brow{0%,70%,100%{transform:translateY(0)}80%,90%{transform:translateY(-7px)}}
@keyframes gb-nod{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}
@keyframes gb-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}
@keyframes gb-drop{0%{opacity:0;transform:translateY(-4px)}30%{opacity:1}100%{opacity:0;transform:translateY(14px)}}
@keyframes gb-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
@keyframes gb-tape{from{transform:scale(1.6) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.gb-root *:not(.gb-soft){animation:none!important}}
`;

# Handoff: Bara' brand website + design system

## Overview
Bara' (برأ) is a 3D print studio in Riyadh. This repo is its **brand website** (shop, custom-print quotes, creator programme, materials, recycling, retail "3D Corner", about) plus the **design system** it is built on, and a staff/customer **Filament Studio** colour previewer. Bilingual EN/AR (full RTL), currency SAR.

## About the files
This bundle is **already a working, deployable static site** — not just a mock. It is written as browser-loaded React 18 (UMD globals + JSX files that are precompiled by `scripts/build.cjs`). Two valid paths for Claude Code:

1. **Ship as-is** (fastest): fill in `site.config.js` + `data/`, run `npm run build`, deploy `dist/` (see `DEPLOY.md`).
2. **Port to a framework** (recommended long-term — e.g. Next.js/Astro + TypeScript): treat the HTML/JSX as the high-fidelity reference and recreate it with real modules, path routing and SSR/SSG. Keep the data contracts in `data/README.md` and the tokens in `tokens/*.css` unchanged.

## Fidelity
**High-fidelity.** Final colours, type, spacing, motion, copy (EN + native Saudi-casual AR) and interactions. Recreate pixel-perfectly. Image areas are intentional `MediaPlaceholder` slots awaiting photography.

## Architecture (current)
```
index.html               production entry (SEO meta, noscript, loads everything below)
site.config.js           per-environment config: sources, endpoints, contact
data/*.json              ALL catalogue / stock / pricing data  (schema: data/README.md)
styles.css → tokens/     design tokens (colours, type, spacing, effects, fonts)
_ds_bundle.js            generated from components/** by scripts/build-ds.cjs (npm run ds) → window.InfillDesignSystem_*  (aliased as B / S)
components/**            component source (.jsx) + contracts (.d.ts) + usage notes (.prompt.md)
ui_kits/website/
  data.js                data layer (baraApi): fetch, normalise, POST, poll, STL/OBJ reader, price estimate
  copy.js                UI strings only — every string is [en, ar]
  App.jsx                shell: boot/loading/error, hash router, persisted cart, checkout, toasts, useSend, FileDrop
  Chrome.jsx             header, footer, cart drawer
  Home.jsx  PagesShop.jsx  PagesStudio.jsx  PagesSell.jsx   pages
  Crew.jsx               mascot dialogue system + live print-floor
  Motion.jsx Models3D.jsx  motion primitives, procedural three.js product models
ui_kits/filament-studio/ colour previewer + staff stock manager (?staff)
design/index.html        public design-system docs hub
scripts/build-ds.cjs     components/** → _ds_bundle.js (esbuild; React from page globals; .css imports injected)
scripts/build.cjs        JSX precompile, vendor prod React/three, SEO stamping → dist/
scripts/check-data.cjs   data validation (npm run check)
```
Scripts share one global scope (classic scripts; each file ends with `Object.assign(window, {...})`). Load order is fixed in `index.html`.

## Screens (hash routes)
| Route | Purpose | Data |
|---|---|---|
| `#/` home | Hero, marquee, 4 newest house products, community picks (hidden if none), how-it-works, crew floor, material scroll, Loop + 3D Corner teasers | products, stock, `floor` |
| `#/shop[/cat]` | Grid + tabs (all/games/home/community) + material filter tags | products |
| `#/product/:id` | 3D stand-in model, material tags, in-stock colour swatches, qty, add to cart, optional stats grid, community credit box | products, stock |
| `#/custom` | Upload STL/3MF/OBJ (real file, dims+volume parsed client-side), material, std/rush, notes, email → rough price → quote | pricing, `quote` |
| `#/sell` | Creator upload: original (ownership checkbox) or curated (link + licence gate); points panel | `sell`, `creator` |
| `#/materials` | PLA/PETG/TPU panels with live colour swatches | stock |
| `#/loop` | Recycling steps + kg→credit calculator (SAR 20/kg) | — |
| `#/about` | Story, photo slots, visit card + directions | config.mapsUrl |
| `#/corner` | Retail pitch, specs, lead form | `corner` |
| unknown | 404 state | — |

Layout: 1240px container, 24px gutter; `s-split` = 2-col (content / sticky aside) collapsing < 980px; `s-g4`/`s-g3`/`s-g2` responsive grids (see `site.css`). Sticky header 68px + ink announcement bar.

## Interactions & behaviour
- **Boot:** `baraApi.boot()` loads products + stock → loading mascot ("Warming up the nozzle…") → page, or error state with retry.
- **Cart:** persisted in `localStorage['bara-cart-v1']` as `{id,mat,hex,qty}`, re-priced from live catalogue on load; same item+colour merges qty. Drawer: Esc / scrim closes. Checkout → `endpoints.checkout` → redirect to returned `url`; if unset → "Order by email" fallback.
- **Colours:** only filaments with status in/low appear; out-of-stock material → swatch area says so and Add is disabled.
- **Forms:** `useSend` → POST; success → mascot confirmation; failure → danger toast with email fallback (`contactEmail`). Email validated `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`. Corner form needs name + company + (email or ≥8-digit phone).
- **Files:** STL/3MF/OBJ ≤ 100 MB; dims vs 250 mm build volume warning; 3MF priced by hand.
- **Language:** EN/AR toggle, defaults from `navigator.language`, persisted `bara-site-lang`; sets `<html lang dir>`.
- **Crew:** Tab'a (cheer) + Mess Goblin (judge) react to events via `crew(type, data)` (`cart`, `file`, `quote`, `colour`, `pink`…); clicking either tapes their mouths (mute, persisted). Floor polls `endpoints.floor` (pauses when tab hidden), reacts when an order flips to done/failed.
- **Motion:** 110/180/320 ms; `--ease-out` default, `--ease-spring` for lifts. Buttons lift 1px & shadow grows; press translates into shadow. Cards lift 3px, shadow 5→8px. `prefers-reduced-motion` disables animation.
- **Focus:** 2px paper gap + TPU-blue ring (`--shadow-focus`). Skip-to-content link.

## Design tokens (source of truth: `tokens/*.css`)
- **Paper** 0 `#FCFAF4` · 1 `#F5F0E4` (page) · 2 `#EAE3D2` · 3 `#D9D0BA` · 4 `#BFB49A`
- **Graphite** 950 `#0D0D0F` · 900 `#16161A` (ink: text, borders, shadows) · 800 `#24242A` · 700 `#3A3A42` · 600 `#55555E` · 500 `#74747C` · 400 `#9A9AA0` · 300 `#C2C2C6`
- **Yolk** 50 `#FFF8DD` · 100 `#FFEDA8` · 200 `#FFDF66` · 300 `#FBCB2A` (hover) · 500 `#F2B705` (brand, fills only) · 600 `#D69E00` · 700 `#A87A00` · 800 `#6E5000`
- **Materials** (strict code) PLA `#E8367A` · PETG `#12A5A0` · TPU `#2F6BFF` · Loop `#1F8A4C` (+ `-tint`, `-ink`)
- **Semantic** success `#1F8A4C` · warning `#D69E00` · danger `#D42A2A` · info `#2F6BFF`
- **Type** Baloo 2 / Baloo Bhaijaan 2 (AR) / JetBrains Mono. Display 104/80 · H1 56 · H2 40 · H3 30 · H4 23 · body 19/16/14 · caption 12.5 · mono 13/11. Display weight 800, lh .92, tracking −.025em; body lh 1.5; Arabic lh 1.6; overline mono 700 12px +.14em uppercase.
- **Spacing** 4px base: 4 8 12 16 20 24 32 40 48 64 80 96 128
- **Radii** 4 · 8 (chips) · 12 (controls) · 18 (cards) · 28 (hero media) · 999 (pills)
- **Borders** 2px ink (interactive/containers) · 1.5 · 1px hairline `rgba(22,22,26,.12/.22)`
- **Shadows** hard ink offsets 2/3/5/8px, no blur; on ink surfaces shadow flips to yolk. Float (toasts only) `0 2px 4px rgba(22,22,26,.08), 0 12px 32px rgba(22,22,26,.16)`. Scrim `rgba(13,13,15,.55)`.
- **Textures** layer lines `repeating-linear-gradient(0deg, rgba(22,22,26,.07) 0 1px, transparent 1px 5px)`; print-bed dots `radial-gradient(circle, rgba(22,22,26,.18) 1.2px, transparent 1.6px) 0 0/20px 20px`.

## Assets
- Fonts: Google Fonts (Baloo 2, Baloo Bhaijaan 2, JetBrains Mono). Icons: Lucide static font 0.454.0 (CDN). Both imported in `tokens/fonts.css`.
- No logo exists — the name is set in type via `Wordmark`. Do not draw one.
- Mascots are code (`components/mascot`), not images.
- Photography: none yet — `MediaPlaceholder` slots. `favicon.svg` is an interim mark.

## Screenshots
Reference captures (1280px wide, viewport only) in `screenshots/`: `01-home.jpg` · `02-shop.jpg` · `03-product-tower.jpg` · `04-custom-quote.jpg` · `05-sell.jpg` · `06-materials.jpg` · `07-loop.jpg` · `08-about.jpg` · `09-corner.jpg` · `10-home-arabic-rtl.jpg` · `11-404.jpg`. The running site is the source of truth.

## Design-detail references
Every token / foundation / component referenced above, captured from its specimen card, in `design-details/`:
- **Colour:** `01-colors-brand.jpg` · `02-colors-yolk.jpg` · `03-colors-graphite.jpg` · `04-colors-paper.jpg` · `05-colors-materials.jpg` · `06-colors-semantic.jpg` · `07-colors-surfaces.jpg`
- **Type, spacing, radii:** `08-type-display.jpg` · `09-type-headings.jpg` · `10-type-body.jpg` · `11-type-mono.jpg` · `12-type-arabic.jpg` · `13-spacing-scale.jpg` · `14-radii.jpg`
- **Shadows, motion, textures:** `15-shadows.jpg` · `16-motion.jpg` · `17-texture-layers.jpg` · `18-texture-bed.jpg`
- **Icons & voice:** `19-iconography.jpg` · `20-voice.jpg`
- **Components:** `21-components-core.jpg` · `22-components-forms.jpg` · `23-components-feedback.jpg` · `24-components-tabs.jpg` · `25-components-surfaces.jpg` · `26-components-commerce.jpg` · `27-components-wordmark.jpg` · `28-components-mascot.jpg`

Live sources: `guidelines/*.html` and `components/**/*.card.html` (or `design/index.html`). Exact values are in `tokens/*.css` — images are for visual reference only.

## Open items for the developer
See `DEPLOY.md → Known limitations`: path routing/SSR for SEO, server-side checkout re-pricing, auth on the staff `stock` endpoint, CSP, real photography and `og-image.png`.

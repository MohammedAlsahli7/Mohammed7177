# Bara' (برأ) — Design System

**Bara'** is a 3D printing studio that sells printed products (board-game accessories, dice towers, desk goods), custom prints from customer files, and — planned — its own filament line and in-store "3D Corners" inside large retailers offering printing, pickup and recycling.

The name is the Arabic verb **برأ** — *to create, to bring into existence with precision*. Tagline: **Weirdly specific things, printed. / طلبك غريب؟ نطبعه.** — written separately per language, never translated word-for-word.

> Working name chosen by the client. **No logo exists yet** — everywhere a mark would go we set the name in type via the `Wordmark` component. Do not draw a logo.

## Sources
No codebase, Figma or brand files were provided. This system was built from scratch from a client brief + a Q&A form:
- Vibe: industrial-playful (workshop tools × board games) + bold, toy-like
- Primary accent #F2B705 (yellow), warm paper base, graphite ink; pink & teal demoted to material colours
- Rounded type; bilingual EN + AR, English-first with Arabic toggle; currency SAR
- Materials: PLA, PETG, TPU (+ future recycled "Loop")
- Priority surfaces: packaging & social first, then storefront, quote flow, kiosk

## Products / surfaces
1. **Packaging** — filament spool labels, filament boxes, order stickers, product hang tags (`ui_kits/packaging`)
2. **Social** — 1:1 feed posts and 9:16 stories (`ui_kits/social`)
3. **Storefront** — e-commerce site: home, catalog, product, custom-quote upload, cart (`ui_kits/storefront`)
4. **3D Corner kiosk** — in-store touchscreen: pickup, print-while-you-shop, recycle (`ui_kits/kiosk`)

---

## CONTENT FUNDAMENTALS
**Voice: nerdy & witty.** A maker who loves the machine and jokes about it. Precise numbers, light self-deprecation, never corporate.
- **Person:** "we" (the studio) and "you" (the customer). Never "the user", never "our valued customers".
- **Casing:** Sentence case for headings and buttons ("Upload a model", "Add to cart"). UPPERCASE only in mono overlines/spec labels ("NOZZLE 210 °C").
- **Numbers are a feature.** Quote real print data: "212 layers", "6 h 12 m", "0.20 mm". Units always spaced: `0.20 mm`, `210 °C`, `15 %`. Prices: `SAR 89` (code before number, mono "SAR").
- **Humour:** dry, about printing culture — stringing, spaghetti, failed prints, "the nozzle's already warm". One joke per surface, max. Errors stay helpful: "That STL isn't manifold." then the fix.
- **Bilingual:** Arabic is written natively in light Saudi casual (وش، تبي، جيب، توّها، بشويش), never translated word-for-word. The two languages can say different jokes. Arabic headlines may lead on brand posts (PostQuote). Use Arabic-Indic numerals (٢١٢) inside Arabic copy; Western numerals in specs/prices.
- **Emoji:** no. Unicode only for units/arrows (°, ×, →, ·).
- **Examples:** "Weirdly specific things, printed." · "Fresh off the bed" · "Drop your file on the bed" · "The bed is empty. Go print something." · "212 layers went into this. Open gently." · "Tough enough for the dishwasher. Probably." · "Failed prints deserve a second life."
- **Avoid:** "revolutionary", "cutting-edge", "solutions", exclamation-mark stacks, rocket emoji.

## VISUAL FOUNDATIONS
- **Colour:** Warm unbleached **paper** (#F5F0E4) is the page; **graphite** (#16161A) is the ink for all text, outlines and shadows; **yolk** (#F2B705) is the one brand colour — fills only (buttons, hero bands, active tabs, highlights), never text on paper. **Material colours** are a strict code: PLA = pink #E8367A, PETG = teal #12A5A0, TPU = blue #2F6BFF, Loop (recycled) = green #1F8A4C. Never use a material colour decoratively for something unrelated to that material.
- **Type:** Baloo 2 (Latin) + Baloo Bhaijaan 2 (Arabic) — same design family, so bilingual lockups match. ExtraBold 800 for display, tight leading (0.92) and negative tracking. Body Regular 16/1.5. **JetBrains Mono** for everything measurable: specs, prices' currency code, order numbers, overlines.
- **Outlines:** 2px graphite borders on interactive and container elements — like a slicer preview. Hairline `--border-1/2` only for quiet dividers and inputs at rest.
- **Shadows:** hard, unblurred ink offsets (2/3/5/8px) — the tactile toy-box signature. On ink surfaces the shadow flips to yellow. One soft `--shadow-float` exists for toasts/overlays only.
- **Corner radii:** rounded like the type — 8px chips, 12px controls, 18px cards, 28px hero media, pill for badges/swatches. Nothing sharp.
- **Backgrounds & texture:** flat colour + two motifs: **layer lines** (fine repeating horizontal stripes = FDM layers) on brand bands, material blocks and image placeholders; **print-bed dot grid** on ink panels, upload zones and canvases. No gradients, no photos-as-wallpaper, no blur.
- **Imagery:** none supplied yet. Use `MediaPlaceholder` (tinted, layer-lined, mono caption). Target photography: warm daylight, paper/wood tabletops, real hands and game tables, macro layer-line detail; saturated colour, no heavy grading.
- **Hover:** buttons lighten (yolk-300) and lift 1px with a bigger shadow; cards lift 3px and shadow grows 5→8px (spring ease). Links get a yolk highlight.
- **Press:** element translates into its shadow (3px) and shadow drops to 0 — it physically presses down.
- **Focus:** 2px paper gap + 2px TPU-blue ring; inputs show ink border + yellow offset shadow.
- **Motion:** quick (110–320ms). `--ease-out` default, `--ease-spring` for lifts/toggles. No fades for decoration; progress bars and counters (layer N / 212) are the hero animations.
- **Transparency/blur:** only the modal scrim (`--scrim`). No glassmorphism.
- **Layout:** 1240px container, 24px gutter, 4px spacing base. Sticky header with ink announcement bar. Generous whitespace; dense spec grids in mono with ink rules.
- **Cards:** paper-0 fill, 2px ink border, 18px radius, 5px hard shadow (raised). Variants: flat, outlined, brand (yolk), inverse (ink + yellow shadow).
- **RTL:** set `dir="rtl"` on the root; Arabic text uses `--font-arabic` at line-height 1.6.

## CHARACTERS — the crew
Two overworked shop workers, always busy, shouting across the studio to get orders out. One **cheers** the customer, one **judges** them.
- **Tab'a (طبعة, "a print")** — `Mascot`. A tangle of two-colour purge filament with a face floating on it. Cheerful, frantic, hypes every choice. Poses: hello, printing (loading), cheer, oops, sleepy, shout. Feminine voice in Arabic.
- **The Mess Goblin (وحش اللخبطة)** — `Goblin`. Loop-green goblin in a yolk apron. Grumpy, side-eyes your colour picks, yells about late orders, eats failed prints (he *is* the recycling program). Moods: judge, shout, busy, approve (rare), sleep. Masculine voice in Arabic.
- **SpeechBubble** — their dialogue: cheer (pink, Tab'a), judge (ink, Goblin), shout (yolk, tilted), say.
- **Live floor:** the website shows them arguing next to the real print queue from `endpoints.floor` (no customer data). Without a feed, they just banter. A corner dock reacts to what the user does (add to cart, pick a colour, upload a file).
- **Dialogue tone:** short, shouty, specific to printing. Goblin: "Pink. Again. Bold." / «وردي؟ مرة ثانية؟ جريء.» Tab'a: "YESSS! Into the queue it goes!" / «يااااس! دخل الطابور!»

## FILAMENT STUDIO
Customers and staff preview models in colours that are actually on the shelf. Stock is **maintained by staff** in the Studio's Stock tab (Staff view switch): adjust grams, add spools, add new colours (name, hex, material, finish, line, shelf). Status: In ≥ 1.5 kg · Low ≥ 300 g · Out below (thresholds in `data/stock.json`). Out-of-stock colours are visible in the Studio but hidden from the shop. Stock loads from `data/stock.json` (or `sources.stock`); staff view needs `?staff` in the URL and saves to `endpoints.stock` (local draft only until that's connected).

## ICONOGRAPHY
- **Lucide** (lucide-static icon font, v0.454.0, CDN) — 2px rounded stroke matches Baloo's rounded terminals. Use `<Icon name="printer"/>` or `<i class="icon-printer"></i>`. Imported in `tokens/fonts.css`.
- **Substitution flag:** no brand icon set was provided; Lucide is our choice, not a copy.
- Icons sit in ink; in emphasis they go in a rounded 2px-outlined tile (yellow or paper). Typical: printer, layers, box, package, recycle, scale, upload, dice-5, puzzle, ruler, thermometer, timer.
- No emoji. No PNG icons. Unicode only for units/arrows.

## Fonts
Loaded from Google Fonts (no local binaries): Baloo 2, Baloo Bhaijaan 2, JetBrains Mono. **Swap in licensed/self-hosted files if you want offline use.**

---

## Index
- `server/` — **the Bara’ server**: hosts the site, the API the site expects, and **Ops** (`ops/`, staff: live print floor, job queue, inventory, inbox). See `OPS.md` and `DEPLOY.md`.
- `index.html` — **the brand website** (production entry). `site.config.js` = per-environment config. `data/` = every product, colour and price (schema + API contracts in `data/README.md`). `DEPLOY.md` = launch checklist + build.
- `design/index.html` — public design-system documentation hub
- `styles.css` — entry; imports `tokens/{fonts,colors,typography,spacing,effects,base}.css`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (each with .d.ts + .prompt.md + a card)
- `ui_kits/packaging`, `ui_kits/social`, `ui_kits/storefront`, `ui_kits/kiosk`
- `ui_kits/character` — Tab'a character sheet
- `ui_kits/website` — the site's source: `App.jsx` (shell/routing/cart), `data.js` (all data access), `copy.js` (EN/AR UI strings), page modules
- `ui_kits/filament-studio` — preview prints in real stock colours (3D custom, compare, 2D catalog tint, staff stock manager)
- `thumbnail.html`, `SKILL.md`

### Components
- **core/** — Button, IconButton, Icon, Badge, Tag
- **forms/** — Field, Input, Select, Checkbox, Radio, Switch, QuantityStepper
- **feedback/** — Dialog, Toast, Tooltip
- **navigation/** — Tabs
- **surfaces/** — Card, MediaPlaceholder
- **commerce/** — ProductCard, MaterialSwatch (+ `MATERIALS` data)
- **brand/** — Wordmark
- **mascot/** — Mascot (Tab'a), Goblin (Mess Goblin), SpeechBubble

### Intentional additions (beyond the standard set)
- **Icon** — wrapper for the Lucide font.
- **MediaPlaceholder** — no photography exists yet.
- **MaterialSwatch / ProductCard / QuantityStepper** — core to a print shop.
- **Wordmark** — typeset name until a real logo exists.
- **Mascot / Goblin / SpeechBubble** — the brand characters and their dialogue, requested by the client.

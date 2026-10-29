# CLAUDE.md — Bara' website (copy this file to the repo root)

## Commands
- `npm install` · `npm run ds` (rebuild `_ds_bundle.js` from components) · `npm run dev` (source, in-browser Babel) · `npm run check` (validate data) · `SITE_URL=… npm run build` → `dist/` · `npm run preview`

## Rules
- **No mock data in UI code.** Products, colours, prices, orders, creator listings come from `data/*.json` or endpoints in `site.config.js`, via `ui_kits/website/data.js` (`baraApi`). Add new data as a source/endpoint + document it in `data/README.md` + validate in `scripts/check-data.cjs`.
- Every feature must degrade when its endpoint is unset (hide, empty state, or email fallback) — never fabricate content.
- **Strings:** all UI copy lives in `ui_kits/website/copy.js` as `[en, ar]`. Arabic is written natively (light Saudi casual), never machine-translated. Use Arabic-Indic digits inside Arabic prose; Western digits in specs/prices.
- **Styling:** use tokens (`var(--…)` from `tokens/*.css`); never raw hex outside tokens/data. Yolk is a fill, never text on paper. Material colours only for their material. 2px ink borders, hard unblurred shadows, no gradients/blur/emoji.
- Use design-system components from `_ds_bundle.js` (`B.Button`, `B.Input`, …). Component source is `components/**/X.jsx` with contract `X.d.ts`.
- **Components → bundle:** `_ds_bundle.js` is generated from `components/**` (`X.jsx` + `X.d.ts` pairs). After editing a component run `npm run ds` to rebuild it locally; `npm run build` always rebuilds it into `dist/`, so a deploy never ships a stale bundle. Never hand-edit the bundle.
- Script files share one global scope; export with `Object.assign(window, {...})` at the end; keep top-level names unique across files. Load order is set in `index.html`.
- Logical CSS properties (`insetInlineStart`, `borderInlineStart`, `textAlign: 'start'`) so RTL works. Test both languages.
- Voice: nerdy, witty, "we"/"you", sentence case, one joke per surface max, units spaced (`0.20 mm`, `210 °C`), prices `SAR 89`.

## Where things are
See `design_handoff_bara_website/README.md` (architecture, screens, behaviour, tokens) and `DEPLOY.md` (launch checklist).

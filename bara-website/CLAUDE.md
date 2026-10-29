# CLAUDE.md — Bara’ website + Ops

## Commands
- `npm test` (API) · `npm run build && npm run test:site` (browser) · `npm start` (server: site + API + /ops/)
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

## Server & Ops
- `server/` is plain Node (no runtime deps). `app.js` = glue; `context.js` shared state + request helpers; `views.js` snapshots, public floor, live events; `validate.js` input validation + job state machine; `routes/*.js` one file per area; `floor.js` printer connectors + job lifecycle; `router.js` job routing with fewest spool swaps + operator load tasks; `maintenance.js` wear counters + due tasks; `costing.js` cost / price / margin model; `store.js` JSON store; `auth.js` sessions.
- `ops/*.jsx` is the staff dashboard (English only, internal), one file per section, sharing globals via `Object.assign(window, …)`; load order in `ops/index.html`.
- Website endpoints left empty in `site.config.js` are filled in by the server at `/site.config.js`. Keep that contract (`data/README.md`) when changing the API.
- Every change to the API gets a test in `test/server.test.js`. UI flows get one in `test/site.e2e.cjs`.

## Code style (enforced by `npm run check`)
- Google JavaScript Style Guide via ESLint `eslint-config-google`, plus Prettier (80 columns, single quotes, trailing commas, no spaces inside braces). `npm run format` fixes most things.
- JSDoc on every server function and class (`require-jsdoc`, `valid-jsdoc`). Components are documented by their file header and `.d.ts`.
- **Max 20,000 characters per source file** (`scripts/check-size.cjs`). Split along top-level declarations into a new file and add it to the page's script list in load order.

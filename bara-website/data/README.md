# Data sources

The website renders **only** what comes from these sources — there is no catalogue, stock or order data hard-coded in the UI.
Each file can be replaced by an API/CMS URL in `site.config.js → sources` (same JSON shape). Run `npm run check` after editing.

| File | Drives | Replace with |
|---|---|---|
| `products.json` | Home "Fresh off the printer", Shop, Product pages, cart prices | CMS / commerce API |
| `stock.json` | Every colour swatch (only `in`/`low` colours are orderable), Filament Studio | Inventory API |
| `models.json` | Filament Studio 3D models | — (tied to procedural models in `Viewer3D.jsx`) |
| `pricing.json` | "Print your file" rough estimate (build volume, densities) | With the server: `/api/pricing`, derived from Ops → Pricing cost settings |

## products.json
```jsonc
{ "items": [{
  "id": "tower",                       // unique, URL-safe → #/product/tower
  "published": true,                   // false hides it everywhere
  "name": { "en": "Hex Dice Tower", "ar": "برج النرد" },
  "description": { "en": "…", "ar": "…" },
  "price": 89, "currency": "SAR",
  "materials": ["pla", "petg"],        // pla | petg | tpu | loop — first is the default
  "category": "games",                 // games | home | community
  "tone": "pla",                       // placeholder tint: pla | petg | tpu | yolk | paper | ink
  "badge": { "en": "New", "ar": "جديد" },            // optional
  "spec": "0.20 mm · 15% · 6 h",                     // mono spec line on the card
  "stats": { "layers": "212", "time": "6 h 12 m", "infill": "15 %", "weight": "84 g" }, // optional, product page grid
  "images": [],                                      // optional, future photography
  "source": {                                        // ONLY for community items — required licence + credit
    "platform": "makerworld",                        // makerworld | printables
    "designer": "@handle", "url": "https://…", "likes": "1.2k",
    "licence": { "en": "Commercial OK", "ar": "تجاري مسموح" }
  }
}]}
```
Community items appear (home section + shop tab) only when at least one exists. **Only list designs whose licence allows selling prints.**

## stock.json
`{ thresholds: { in, low }, items: [{ id, material, line, name, ar, hex, finish, grams, shelf }] }` — status = `grams ≥ in` → In, `≥ low` → Low, else Out (hidden from the shop).

## pricing.json
`estimate = max(min, setupFee + volume_cm³ × density × fillFactor × perGram) + (rush ? rushFee : 0)`. Volume and dimensions are read from the customer's STL/OBJ in the browser. 3MF and unreadable meshes show "We'll price this one by hand".

## Endpoint contracts (`site.config.js → endpoints`)
| Key | Method | Body | Response |
|---|---|---|---|
| `quote` | POST multipart | `file, material, speed(std|rush), notes, email, lang, dims_mm?, volume_cm3?, estimate?` | 2xx |
| `sell` | POST multipart | `file, title, kind(orig|cur), email, lang, link?, licence?, platform?, ownership_confirmed?` | 2xx |
| `corner` | POST JSON | `{ name, company, city, size, phone, email, lang }` | 2xx |
| `checkout` | POST JSON | `{ items: [{ id, material, colour, qty, unitPrice }], lang }` — **re-price server-side** | `{ url }` → redirect to payment |
| `floor` | GET (polled) | — | `[{ id, item, name?, hex, printer, layer, total, status: printing|queued|done|failed }]` — no customer data |
| `creator` | GET (cookies) | — | `{ points, listings: [{ name:{en,ar}, kind, sales, points, status: live|review }] }` |
| `orders` *(server)* | POST JSON, `Authorization: Bearer BARA_ORDER_TOKEN` | `{ ref, paid: true, items: [{ productId?, title?, material?, colour?, colours?, qty, unitPrice?, grams? }] }` — idempotent on `ref` | `{ ref, jobs: [{ id, printer, note }] }` |
| `stock` | PUT JSON | full stock `items` array (staff only — protect with auth) | 2xx |

All requests send `Accept: application/json` and `credentials: include`; enable CORS for your site origin if the API is on another domain.
Unset endpoint → the feature degrades: forms offer email (`contactEmail`), checkout offers "Order by email", the floor shows the crew without a queue, creator panel shows an empty state.

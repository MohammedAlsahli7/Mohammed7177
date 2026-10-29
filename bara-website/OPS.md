# Bara’ Ops: the print floor, stock, maintenance and money

Staff dashboard at **`/ops/`**. Everything updates live, so you can keep it open on the shop-floor screen and on your phone at the same time.

| Section | What it's for |
|---|---|
| **Floor** | One card per printer: status, current job, progress / layer, ETA, temperatures, the spools in its slots (AMS). Above the cards: **Needs a person**, everything waiting on a human right now. |
| **Queue** | Every print job, single or multi-colour. Create, assign (or auto-assign), start, finish, re-queue. The **Paid orders** tab shows orders that arrived already paid. |
| **Inventory** | Filament by colour (grams, shelf, SAR/kg, status), parts & supplies with reorder levels, and the full change history. |
| **Maintenance** | Per printer: print hours, filament through it (kg and metres), jobs, nozzle. Recurring tasks fall due on hours, filament or days. Out-of-service switch. |
| **Pricing** | Cost / price / margin calculator, margins of every catalogue product, and the cost settings behind them. |
| **Inbox** | Website submissions. Price a quote with the calculator, email it, and turn it into a job. |
| **Printers** *(admin)* | Connections, slot count, running costs, odometer. |
| **Team** *(admin)* | Staff accounts. Everyone can change their own password. |

Roles: **staff** run the floor, queue, inventory, maintenance and inbox. **Admins** also manage printers, cost settings and accounts.

## What needs an operator, and what doesn't

| Automatic | Needs a person (shows in **Needs a person**) |
|---|---|
| A paid order becomes print jobs: one per unit, colour matched to a spool. | **Loading a spool**: "Load PLA Bubblegum into P2 slot 3, from P3 slot 1 / shelf A1". |
| Each job is routed to the printer that needs the fewest spool swaps, then the shortest queue. | **Clearing the plate** after a print finishes or fails, and checking it. |
| Network printers report start, layer, progress and finish. The job follows them. | **Starting the print** on the printer (slicing, sending the file, pressing start). The server doesn't upload G-code. |
| Filament used comes off the spool's stock when a job finishes (the printer's real figure if it reports one, otherwise the estimate). | **Maintenance due** (cleaning, lubrication, nozzle swap, belts). Logging it resets the counter, and can take the part off the parts shelf. |
| Wear counters (hours, grams, metres, jobs) and maintenance due dates update themselves. | **Out of service**: a person marks it, with a reason. Its queued jobs move to other printers automatically. |
| Out-of-stock colours disappear from the shop. The website's price estimate follows the cost settings. | **Restocking** low colours and parts, and **packing / handing over** finished orders. |
| Load and clear-plate tasks close themselves when a printer reports the colour loaded (Bambu bridge) or starts its next print. | **Pricing custom quotes**: the calculator does the maths, a person checks the model and sends the price. |

Manual printers (no connection) also need a person to press **Start**, enter layers now and then if you like, and press **Done / Failed**.

## Spools, AMS and routing with the fewest swaps
- Each printer has **slots**: 1 for a single spool, 4 per AMS unit, up to 16. Set what's loaded on its Floor card. Bambu bridges can report the AMS colours themselves (see Push below).
- A job lists every colour it needs. Multi-colour prints need several slots.
- **Routing** sends a queued job to the in-service printer that already has the most of its colours loaded, so the fewest swaps. Ties go to the printer with the least work waiting.
- If colours are missing, the job is still assigned, and the operator gets a **load task**. It names the slot (an empty one, or one the printer's other queued jobs don't need) and where the spool is: on another printer, or its shelf. Until it's done, the job shows "waiting for…" and can't be started.
- Jobs that came from paid orders route themselves. Jobs you create can too: leave the printer empty and keep "Pick automatically". **Auto-assign** in the Queue routes everything still unassigned.

## Maintenance
- Every printer starts with sensible tasks: clean bed / nozzle (50 h or 14 days), fans (300 h or 90 days), lubrication (250 h or 90 days), extruder gears (10 kg), belts and screws (500 h or 180 days), nozzle (5 kg). Edit them per printer. Intervals can be **print hours, kg printed, metres of filament, or days**, and a task is due at whichever comes first.
- Status: **OK**, then **Soon** at 80 %, then **Due**. Due tasks show on the Floor and in Needs a person.
- **Done** resets that task's counters. It can take a part from inventory (e.g. a 0.4 mm brass nozzle), and for nozzle tasks it records the new nozzle (size and type). From then on the nozzle's grams are tracked.
- **Odometer**: a used printer can be given its existing hours / kg in Printers → Settings.
- **Out of service**: give a reason and an expected return date. No new jobs go to it, queued jobs move elsewhere, and it shows red on the Floor. **Back in service** routes waiting work to it again. Every swap, service and fix is in the Maintenance history.

## Pricing: cost, price and margin
The same model prices quotes, shows product margins, costs every finished job, and drives the website's instant estimate:

```
filament   = grams × (1 + waste %) × SAR/kg            (the colour's own SAR/kg, else the material default)
machine    = hours × (printer price ÷ life hours + upkeep SAR/h)
power      = hours × watts ÷ 1000 × SAR/kWh
labour     = (setup + removal × qty + post-processing × qty) min ÷ 60 × operator SAR/h
packaging  = per job
failure    = (filament + machine + power) × failure %
overhead   = everything above × overhead %
cost       = sum
price      = max(minimum, cost × (1 + markup %)) + rush fee, + VAT, rounded up
margin     = (price ex VAT − cost) ÷ price ex VAT
```

- **Calculator**: grams and hours from the slicer (hours empty means estimated from grams/hour), quantity, printer, post-processing minutes, markup, rush, packaging. Or type a selling price to see the margin it really makes, and the profit per printer-hour.
- **Product margins**: every shop product's cost, margin at its current price, and the suggested price. Needs `stats.weight` (and ideally `stats.time`) in `data/products.json`.
- **Finished jobs** get their actual cost from real grams and real print time. Jobs from paid orders also get revenue, profit and margin.
- **Website estimate**: `/api/pricing` publishes a rate card derived from these settings, so the shop's rough price follows your costs without exposing them.

## Online payment and paid orders
Set `BARA_PAY_PROVIDER` (**moyasar**, **tap** or **stripe**), `BARA_PAY_SECRET_KEY` and `BARA_PUBLIC_URL` in `.env`. The cart then asks for name and phone or email, and **Checkout** sends the customer to the provider's payment page.

1. `POST /api/checkout` re-prices the cart from `products.json` and the live shelf (browser prices are ignored, out-of-stock colours refused), creates the payment and returns its page.
2. After paying, the customer comes back through `GET /api/payments/return?ref=…`. The provider also calls **`POST /api/payments/webhook/<provider>`**. Set that URL in the provider dashboard: `https://your-domain.sa/api/payments/webhook/moyasar` (or `/tap`, `/stripe`).
3. Neither is trusted on its own. The server asks the provider's API whether that payment is paid, for the right amount in SAR, then creates the order **once** (one job per unit, routed). Forged or repeated webhooks do nothing.
4. Ops → Queue → **Paid orders** shows the customer, total and how they paid (Apple Pay, mada, card…). **Payments not confirmed yet** lists checkouts still waiting, with **Re-check** in case a confirmation was lost. An amount mismatch is flagged and never queued.

### Apple Pay, Google Pay, Samsung Pay, mada, STC Pay
These aren't separate endpoints: they are **payment methods on the provider's payment page**. Switch them on in the provider's dashboard and they appear for customers whose phone supports them. The order records which one was used.

| | Apple Pay | Google Pay | Samsung Pay | mada | STC Pay |
|---|---|---|---|---|---|
| **Moyasar** | ✓ | ask | ✓ | ✓ | ✓ |
| **Tap** | ✓ | ✓ | ✓ | ✓ | ask |
| **Stripe** | ✓ | ✓ | — | — | — |

*Availability depends on your account; "ask" means confirm with the provider. Stripe, as far as we know, doesn't open accounts for Saudi-registered businesses and has no mada. For a Saudi shop, Moyasar or Tap is the practical choice.*

- **Apple Pay** needs your domain verified with Apple when the button runs on your own domain. Download the `apple-developer-merchantid-domain-association` file from the provider's dashboard and put it in the data folder (or set `BARA_APPLE_PAY_DOMAIN_FILE`). The server serves it at `/.well-known/apple-developer-merchantid-domain-association`.
- Google Pay and Samsung Pay need nothing on our side; the provider handles them on its page.

### Orders from other systems
A store system or your own adapter can post paid orders directly:

```
POST /api/orders
Authorization: Bearer <BARA_ORDER_TOKEN>
Content-Type: application/json

{ "ref": "WEB-2041", "paid": true, "customer": {"name": "…", "phone": "…"},
  "items": [ { "productId": "tower", "material": "pla", "colour": "#F2B705", "qty": 2, "unitPrice": 89 },
             { "title": "Meeple set", "colours": ["#F2B705", "#232327", "#E8367A"], "grams": 45 } ] }
```
`BARA_ORDER_TOKEN` is a password **you invent** (a long random string). Only systems that know it can add orders this way. The same `ref` twice is ignored.

## Connecting printers
- **Klipper / Moonraker** (Qidi, Creality K-series, Voron, Sovol, Elegoo…): address `http://<printer-ip>:7125`, then **Test connection**. API key only if Moonraker authorization is on. Reports layers and the real filament used.
- **OctoPrint**: address and API key. Progress is a percentage; layers are estimated if the job has a layer count.
- **Push** (Bambu, Prusa, anything else): the Printers page shows the token and a `curl` example. Send status every 5–30 s:

```
POST /api/printers/<code or id>/telemetry          Authorization: Bearer <printer token>
{ "status": "printing",                 // idle | printing | paused | done | failed | cancelled | offline
  "progress": 0.42, "layer": 88, "totalLayers": 210, "file": "tower.gcode", "eta": 3600,
  "nozzle": {"actual": 220, "target": 220}, "bed": {"actual": 60, "target": 60},
  "filamentUsedG": 41.5,                // or filamentUsedMm, with "done", for exact stock
  "ams": [{"hex": "F2B705FF", "material": "PLA"}, null, null, null] }   // slot colours, matched to the shelf
```

## API
Everything Ops does goes through `/api/*` (staff session cookie). `GET /api/state` returns the snapshot, and `GET /api/events` streams live changes (`printers`, `jobs`, `tasks`, `inventory`, `orders`, `requests`, `costing`). Routes live in `server/routes/`, one file per area, with validation in `server/validate.js`.

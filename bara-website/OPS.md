# Bara’ Ops: inventory and the print floor

Staff dashboard at **`/ops/`**. Everything updates live: open it on the shop-floor screen and on your phone at the same time.

| Section | What it's for |
|---|---|
| **Floor** | One card per printer: status, current job, progress / layer, ETA, nozzle and bed temps, loaded spool. Pause, resume and cancel (network printers); Done / Failed / layer updates (manual printers). |
| **Queue** | Every print job. Create one (catalogue product or custom), pick the spool, assign a printer, start, finish, re-queue. |
| **Inventory** | Filament by colour (grams, shelf, status), plus parts & supplies (nozzles, plates, boxes, finished goods…) with reorder levels. **History** logs every change and who made it. |
| **Inbox** | Submissions from the website: *Print my file* quotes (with the model file), *Sell with us*, *3D Corner*. One click turns a quote into a print job. |
| **Printers** *(admin)* | Add printers and how they connect. |
| **Team** *(admin)* | Staff accounts. Everyone can change their own password. |

Roles: **staff** run the floor, queue, inventory and inbox, and can swap a printer's loaded spool. **Admins** also manage printers, accounts and stock thresholds.

## How stock and the shop stay in sync
- The shop only offers colours that are **In** or **Low** (≥ 300 g by default). **Out** colours disappear from the shop instantly. They stay visible in Ops and in Filament Studio.
- Filament comes off the shelf **automatically when a job finishes**:
  1. the real amount the printer reports (Klipper reports millimetres used; push agents can send grams), otherwise
  2. the job's **filament estimate**, or a share of it for a failed or cancelled print.
  It's taken from the job's spool, or from the spool loaded in that printer.
- Received a delivery? **+1 kg** on the colour, or **Adjust** for any amount with a reason.
- Filament Studio's staff mode (`/ui_kits/filament-studio/?staff`) saves into the same inventory. You must be signed in to Ops.

## Linking prints to printers
A job is **queued** until it's on a printer, **printing/paused** while running, then **done / failed / cancelled**.

- **Network printers** (Klipper/Moonraker, OctoPrint) are polled every few seconds. When a printer **starts printing**, the server links it to the queued job assigned to that printer. A job whose *G-code file name* matches the file wins; otherwise the oldest one does. From then on, layer, progress and finish come from the printer. You only queue and assign; the printer does the rest.
- **Manual printers**: press **Start** on the card or in the queue, type the layer now and then if you like, then **Done** or **Failed**.
- The website's live floor (home page) shows printing, queued and recently finished jobs: job number, product name (or "Custom print"), colour, printer number and layer. **No customer details are ever shown.**

## Connecting printers

### Klipper / Moonraker: Qidi Q2 / Q1 / X-series, Creality K1/K2, Voron, Sovol SV08, Elegoo…
- Connection: **Klipper / Moonraker**. Address: `http://<printer-ip>:7125`. Moonraker's port is usually 7125. If Fluidd or Mainsail opens on port 80, `http://<printer-ip>` often works too.
- Use **Test connection**. API key only if you turned on Moonraker authorization (`[authorization]` with API keys).
- Give printers a fixed IP (a DHCP reservation in the router) so the address doesn't change.

### OctoPrint
- Connection: **OctoPrint**. Address: `http://octopi.local` or its IP. API key: OctoPrint → Settings → Application Keys / API.
- OctoPrint doesn't report layers by default. Progress is shown as a percentage, and layers are estimated if you enter the job's layer count.

### Push: Bambu Lab, Prusa, anything else
Pick **Push** when adding the printer. The Printers page then shows a token and a ready-made `curl` command. Anything that can make an HTTP request can report status: a Home Assistant automation (the Bambu Lab and PrusaLink integrations expose these values), Node-RED, or a short script on the studio PC.

```
POST /api/printers/<code or id>/telemetry
Authorization: Bearer <printer token>
Content-Type: application/json

{ "status": "printing",            // idle | printing | paused | done | failed | cancelled | offline   (required)
  "progress": 0.42,                // 0–1
  "layer": 88, "totalLayers": 210,
  "file": "tower.gcode",           // used to match the queued job
  "eta": 3600,                     // seconds left
  "nozzle": { "actual": 220, "target": 220 }, "bed": { "actual": 60, "target": 60 },
  "filamentUsedG": 41.5            // or filamentUsedMm; sent with "done" for exact stock deduction
}
```
Send it every 5–30 seconds. A push printer that's silent for 60 s shows as offline. The response tells the agent which job it's on.

## API (staff)
Everything Ops does goes through a JSON API at `/api/*`, protected by the staff session cookie. The main routes are `GET /api/state` (snapshot) and `GET /api/events` (Server-Sent Events: `printers`, `jobs`, `inventory`, `requests`). Then `/api/jobs`, `/api/filaments`, `/api/items`, `/api/printers`, `/api/requests`, `/api/movements`, `/api/users`. See `server/app.js`: each route is one line with its validation right below. To connect another system (an order system, accounting), add a route there, or read `db.json` from a backup.

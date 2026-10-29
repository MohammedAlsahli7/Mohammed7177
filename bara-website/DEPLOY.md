# Deploying Bara’

One small Node server (no runtime dependencies) runs everything:
- **the website** (`/`): shop, custom quotes, Filament Studio, the crew
- **Ops** (`/ops/`): staff sign-in, live print floor, job queue, inventory, website inbox, printers, team
- **the API** (`/api/*`): the endpoints the website already expects (`stock`, `floor`, `quote`, `sell`, `corner`), plus the staff API

Data lives in one folder (`BARA_DATA_DIR`): `db.json` (inventory, jobs, printers, accounts, inbox) and `uploads/` (customer model files). **Back that folder up.**

## 1. Fill in before launch
- [ ] `.env` from `.env.example`: `BARA_SECRET`, `BARA_ADMIN_PASSWORD` (first admin), `NODE_ENV=production`
- [ ] `site.config.js`: `contactEmail`, `whatsapp`, `mapsUrl`. Leave `endpoints` empty: the server fills in its own. Set `checkout` only when you have a payment backend.
- [ ] `data/products.json`: every product, price and description is real
- [ ] `data/stock.json`: the starting filament shelf. It's imported **once**, on first start. After that, stock lives in Ops.
- [ ] `data/pricing.json`: your real rates (density, SAR/g, minimums, rush fee, build volume)
- [ ] `ui_kits/website/copy.js`: announcement bar, opening hours, studio facts
- [ ] Photography: every `MediaPlaceholder` is an image slot
- [ ] `og-image.png` (1200×630) at the root for link previews
- [ ] After first sign-in: **Printers → Add printer** for each machine, **Team** for each staff member

## 2. Run it

### Docker (recommended)
```bash
cp .env.example .env    # fill it in
docker compose up -d    # → http://localhost:8080  and  /ops/
```
The image runs `npm run check` and `npm run build`, then serves `dist/`. The data folder is the `bara-data` volume.

### Plain Node (≥ 18; 22 recommended)
```bash
npm ci
npm run check && SITE_URL=https://your-domain.sa npm run build
npm start               # reads .env; serves dist/ on $PORT (8080)
```
Keep it running with systemd, pm2 or your host's process manager.

`npm run dev` serves the source tree directly with the API (in-browser Babel, slower; for editing only).

## 3. HTTPS and the printers' network
- Put the server behind HTTPS: Caddy (`reverse_proxy localhost:8080`), nginx, or a Cloudflare Tunnel. Set `BARA_TRUST_PROXY=true` behind a proxy. Session cookies switch to `Secure` automatically when the proxy sends `X-Forwarded-Proto: https`.
- **Network printers (Klipper/Moonraker, OctoPrint) are polled by the server**, so the server must reach them. Simplest setup: run the server on a small machine inside the studio (mini-PC, Raspberry Pi 4/5, NAS) and expose it with a Cloudflare Tunnel or Tailscale Funnel. If it runs in the cloud instead, use **push** printers (a bridge in the studio sends status out), or a VPN back to the studio.
- Proxies must not buffer `/api/events` (live updates). nginx: `proxy_buffering off;` for that path. Caddy and Cloudflare are fine as they are.

## 4. Tests
```bash
npm test                              # API: auth, inventory, jobs, printer connectors, uploads (no deps)
npm run build && npm run test:site    # browser: every shop page EN/AR, cart, quote upload, 3D Corner form,
                                      # characters + live floor, all UI kits, mobile layout, Ops dashboard
                                      # (needs: npm i -D playwright && npx playwright install chromium)
```

## Static-only hosting (no server)
`dist/` still works on Netlify, Cloudflare Pages or S3 as a brochure site. Forms fall back to email, the floor shows the crew without a queue, and stock comes from `data/stock.json`. To keep the static site there but use this server for data, set the full URLs in `site.config.js → endpoints/sources` and list the site's origin in `BARA_ALLOWED_ORIGINS`.

## Known limitations / next steps
- **Checkout** still needs a payment provider. The endpoint must re-price items server-side and return `{ url }`.
- Routes are hash-based (`/#/shop`), so search engines index only the home page. For per-product SEO, move to path routing or prerender product pages.
- Customer-facing files are downloaded from Ops as-is. Scan uploads if your threat model needs it.
- The JSON store suits one studio well: hundreds of spools, thousands of jobs, a handful of staff. Running several server instances at once needs a real database behind `server/store.js`.
- CSP: the built site needs only `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'` (icons and React are self-hosted by the build).

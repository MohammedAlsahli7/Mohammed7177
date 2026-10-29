// Runtime config for the Bara' website. The only file you edit per environment.
// Every source/endpoint is optional: unset sources fall back to /data/*.json,
// unset endpoints
// make the matching feature degrade gracefully (hidden or "email us" fallback)
// — never fake data.
window.BARA_CONFIG = {
  // e.g. 'hello@yourdomain.sa' — used as fallback when an endpoint is not set
  contactEmail: '',
  whatsapp: '', // international format without +, e.g. '9665XXXXXXXX'
  mapsUrl: '', // Google/Apple Maps link to the studio

  // Read sources (GET → JSON). null = bundled file in /data. Point at your
  // CMS/API when ready.
  sources: {
    products: null, // → data/products.json
    stock: null, // → data/stock.json
    models: null, // → data/models.json
    pricing: null, // → data/pricing.json
  },

  // Write / live endpoints. Empty string = feature not connected.
  endpoints: {
    quote: '', // POST multipart: file, material, speed, notes, email, lang
    sell: '', // POST multipart: file, title, kind, link, licence, email, lang
    corner: '', // POST JSON: name, company, city, size, phone, email, lang
    // POST JSON {items, lang} → { url } (payment-provider redirect)
    checkout: '',
    // GET → [{ id, item, hex, printer, layer, total, status }] live print queue
    floor: '',
    creator: '', // GET (credentials) → { points, listings: [...] }
    stock: '', // PUT JSON [stock rows] — staff saves from Filament Studio
  },
  floorPollMs: 10000,
  requestTimeoutMs: 12000,
};

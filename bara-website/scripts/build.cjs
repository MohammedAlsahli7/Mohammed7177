// Production build → dist/. Precompiles JSX (no in-browser Babel), self-hosts React/three production builds,
// stamps SEO URLs and writes sitemap/robots. Usage: SITE_URL=https://your-domain.sa npm run build
const { transform } = require('esbuild');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'dist');
const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '');
const SKIP = new Set(['node_modules', 'dist', 'scripts', 'screenshots', '.git', 'design_handoff_bara_website', 'package.json', 'package-lock.json', '_adherence.oxlintrc.json', '_ds_manifest.json', 'SKILL.md', 'thumbnail.html', 'server', 'test', 'var', '.env', '.env.example', 'Dockerfile', 'docker-compose.yml', '.dockerignore', 'deploy']);
const VENDOR = [['react/umd/react.production.min.js', 'react.production.min.js'], ['react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'], ['three/build/three.min.js', 'three.min.js']];
const ES = { loader: 'jsx', jsx: 'transform', target: 'es2019', minifyWhitespace: true, minifySyntax: true, legalComments: 'none' };

async function walk(dir, fn) { for (const e of await fs.readdir(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) await walk(p, fn); else await fn(p); } }
async function copyTree(src, dst) {
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    if (SKIP.has(e.name) || e.name.endsWith('.prompt.md')) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { await fs.mkdir(d, { recursive: true }); await copyTree(s, d); } else await fs.copyFile(s, d);
  }
}

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(path.join(OUT, 'vendor'), { recursive: true });
await copyTree(ROOT, OUT);
for (const [from, to] of VENDOR) await fs.copyFile(path.join(ROOT, 'node_modules', from), path.join(OUT, 'vendor', to));
// Self-host the Lucide icon font (was unpkg) so icons work offline and under a strict CSP.
await fs.mkdir(path.join(OUT, 'vendor', 'lucide'), { recursive: true });
for (const f of ['lucide.css', 'lucide.woff2', 'lucide.woff', 'lucide.ttf']) await fs.copyFile(path.join(ROOT, 'node_modules', 'lucide-static', 'font', f), path.join(OUT, 'vendor', 'lucide', f));
const fontsCss = path.join(OUT, 'tokens', 'fonts.css');
await fs.writeFile(fontsCss, (await fs.readFile(fontsCss, 'utf8')).replace(/@import url\("https:\/\/unpkg\.com\/lucide-static@[^"]+"\);/, '@import url("../vendor/lucide/lucide.css");'));

// 1. JSX → JS
let nJsx = 0;
await walk(OUT, async (f) => {
  if (!f.endsWith('.jsx')) return;
  const { code } = await transform(await fs.readFile(f, 'utf8'), { ...ES, sourcefile: path.relative(OUT, f) });
  await fs.writeFile(f.replace(/\.jsx$/, '.js'), code); await fs.rm(f); nJsx++;
});

// 2. HTML: swap CDN dev builds for self-hosted prod builds, drop Babel, point at compiled JS, compile inline JSX.
let nHtml = 0;
await walk(OUT, async (f) => {
  if (!f.endsWith('.html')) return;
  let h = await fs.readFile(f, 'utf8'); const orig = h;
  const rel = path.relative(path.dirname(f), OUT).split(path.sep).join('/') || '.';
  h = h.replace(/<script[^>]+unpkg\.com\/react@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/react.production.min.js"></script>`)
       .replace(/<script[^>]+unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/react-dom.production.min.js"></script>`)
       .replace(/<script[^>]+unpkg\.com\/three@[^"]+"[^>]*><\/script>/g, `<script src="${rel}/vendor/three.min.js"></script>`)
       .replace(/<script[^>]+@babel\/standalone[^"]+"[^>]*><\/script>\n?/g, '')
       .replace(/<script type="text\/babel" src="([^"]+)\.jsx"><\/script>/g, '<script src="$1.js"></script>');
  const inline = [...h.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];
  for (const m of inline) { const { code } = await transform(m[1], { ...ES, sourcefile: path.relative(OUT, f) + ':inline' }); h = h.replace(m[0], () => '<script>' + code + '</script>'); }
  if (SITE_URL && path.relative(OUT, f) === 'index.html') {
    const og = await fs.access(path.join(OUT, 'og-image.png')).then(() => `<meta property="og:image" content="${SITE_URL}/og-image.png">`, () => '');
    h = h.replace('</head>', `<link rel="canonical" href="${SITE_URL}/"><meta property="og:url" content="${SITE_URL}/">${og}\n</head>`);
  }
  if (h !== orig) { await fs.writeFile(f, h); nHtml++; }
});

// 3. SEO files
if (SITE_URL) {
  await fs.appendFile(path.join(OUT, 'robots.txt'), `Sitemap: ${SITE_URL}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  await fs.writeFile(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod></url>\n  <url><loc>${SITE_URL}/design/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
} else console.warn('! SITE_URL not set — canonical, og:url and sitemap.xml were skipped.');

console.log(`✓ dist/ ready — ${nJsx} JSX files compiled, ${nHtml} HTML files rewritten.`);
})().catch((e) => { console.error(e); process.exit(1); });

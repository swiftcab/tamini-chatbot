/* eslint-disable no-console */
// ─────────────────────────────────────────────────────────────
// Pré-rendu statique (SSG) — exécuté après `react-scripts build`.
// 1. Compile src/ssg/entry.jsx pour Node avec esbuild.
// 2. Rend chaque page en HTML complet (contenu + <head> SEO) et
//    l'écrit dans build/<route>.html (servi par Vercel en cleanUrls).
// 3. Écrit build/404.html (vraie erreur 404) et build/sitemap.xml.
// Résultat : Google, Bing, WhatsApp, Facebook et LinkedIn lisent le
// contenu de chaque page sans exécuter de JavaScript.
// ─────────────────────────────────────────────────────────────
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const OUT = path.join(ROOT, "node_modules", ".cache", "ssg");
const SITE = (process.env.REACT_APP_SITE_URL || "https://tamini-website.vercel.app").replace(/\/$/, "");

async function main() {
  if (!fs.existsSync(path.join(BUILD, "index.html"))) throw new Error("build/index.html introuvable : lancez react-scripts build d'abord.");
  fs.mkdirSync(OUT, { recursive: true });
  const define = { "process.env.NODE_ENV": '"production"' };
  for (const k of Object.keys(process.env)) if (k.startsWith("REACT_APP_")) define[`process.env.${k}`] = JSON.stringify(process.env[k]);
  await esbuild.build({
    entryPoints: [path.join(ROOT, "src", "ssg", "entry.jsx")],
    bundle: true, platform: "node", format: "cjs", target: "node18",
    outfile: path.join(OUT, "entry.cjs"),
    loader: { ".js": "jsx", ".css": "empty" },
    jsx: "automatic", define, logLevel: "warning",
  });
  const { render, routes } = require(path.join(OUT, "entry.cjs"));

  const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8")
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "");

  const page = (url) => {
    const { html, helmet } = render(url);
    const head = helmet ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((h) => h.toString()).join("") : "";
    const htmlAttrs = helmet ? helmet.htmlAttributes.toString() : 'lang="fr"';
    return template
      .replace(/<html[^>]*>/, `<html ${htmlAttrs || 'lang="fr"'}>`)
      .replace("</head>", `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  };

  const list = routes();
  let n = 0;
  for (const r of list) {
    const file = r.p === "/" ? path.join(BUILD, "index.html") : path.join(BUILD, `${r.p.slice(1)}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page(r.p));
    n++;
  }
  fs.writeFileSync(path.join(BUILD, "404.html"), page("/__page-introuvable__"));

  // Sitemap : une entrée par langue pour les pages trilingues, une seule pour les articles.
  const today = new Date().toISOString().slice(0, 10);
  const esc = (s) => s.replace(/&/g, "&amp;");
  const u = (p, l) => `${SITE}${p}${l && l !== "fr" ? `?lang=${l}` : ""}`;
  const urls = list.filter((r) => r.index).flatMap((r) => {
    if (r.onlyLang) return [`  <url><loc>${esc(u(r.p))}</loc><lastmod>${r.lastmod || today}</lastmod><changefreq>${r.cf}</changefreq><priority>${r.pr}</priority></url>`];
    const alts = ["fr", "en", "ar"].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(u(r.p, l))}"/>`).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(u(r.p))}"/>`;
    return ["fr", "en", "ar"].map((l) => `  <url><loc>${esc(u(r.p, l))}</loc><lastmod>${today}</lastmod><changefreq>${r.cf}</changefreq><priority>${l === "fr" ? r.pr : (Number(r.pr) - 0.1).toFixed(1)}</priority>${alts}</url>`);
  });
  fs.writeFileSync(path.join(BUILD, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
  console.log(`SSG : ${n} pages pré-rendues + 404.html, sitemap ${urls.length} URL → ${SITE}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

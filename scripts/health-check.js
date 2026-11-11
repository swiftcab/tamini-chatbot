/* eslint-disable no-console */
// ─────────────────────────────────────────────────────────────
// Bilan de santé du site Tamini — exécuté chaque lundi par
// GitHub Actions (.github/workflows/health-check.yml) ou à la main :
//   node scripts/health-check.js
//   SITE_URL=https://www.tamini-insurance.com node scripts/health-check.js
//
// Contrôles : disponibilité et temps de réponse de chaque URL du
// sitemap, balises SEO, en-têtes de sécurité, robots/sitemap,
// conformité éditoriale (termes interdits dans le code publié),
// lignes WhatsApp, domaine historique. Code de sortie 1 si une
// anomalie critique est détectée → GitHub envoie un e-mail.
// ─────────────────────────────────────────────────────────────
const fs = require("fs");

const SITE = (process.env.SITE_URL || "https://tamini-website.vercel.app").replace(/\/$/, "");
const LEGACY = process.env.LEGACY_URL || "https://www.tamini-insurance.com";
const SLOW_MS = 2500;

// Formulations interdites (règles internes de communication).
const FORBIDDEN = [
  [/Baraka/i, "« Baraka » interdit en communication externe (utiliser « Excédent »)"],
  [/3\s?[×x] plus (vite|rapide)|3\s?[×x] faster|أسرع 3 مرات/i, "Promesse de rapidité non vérifiée"],
  [/r[ée]ponse imm[ée]diate|immediate response|رد فوري/i, "Promesse de réponse immédiate"],
  [/Option incluse|assistance (routi[èe]re )?(est )?incluse|included roadside/i, "Assistance routière présentée comme incluse (doit rester « en option »)"],
  [/notre équipe est en route|our team is on the way/i, "Promesse d'intervention garantie"],
  [/moins de 5 minutes|within 5 minutes/i, "Délai de réponse non garanti"],
];

const results = [];
const add = (level, area, msg) => results.push({ level, area, msg });

async function get(url, opts = {}) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "User-Agent": "TaminiHealthCheck/1.0" }, ...opts });
    const body = opts.method === "HEAD" ? "" : await res.text();
    return { ok: res.ok, status: res.status, ms: Date.now() - t0, headers: res.headers, body };
  } catch (e) {
    return { ok: false, status: 0, ms: Date.now() - t0, headers: new Headers(), body: "", error: e.message };
  }
}

(async () => {
  console.log(`Bilan de santé — ${SITE} — ${new Date().toISOString()}`);

  // 1. Accueil + en-têtes de sécurité
  const home = await get(`${SITE}/`);
  if (!home.ok) add("CRITIQUE", "Disponibilité", `Accueil inaccessible (HTTP ${home.status} ${home.error || ""})`);
  else {
    add("OK", "Disponibilité", `Accueil HTTP ${home.status} en ${home.ms} ms`);
    for (const h of ["content-security-policy", "strict-transport-security", "x-content-type-options", "x-frame-options"]) {
      if (!home.headers.get(h)) add("ALERTE", "Sécurité", `En-tête manquant : ${h}`);
    }
  }

  // 1b. Une URL inexistante doit répondre 404 (pas de « soft 404 »)
  const ghost = await get(`${SITE}/page-inexistante-${Date.now()}`);
  if (ghost.status === 200) add("ALERTE", "SEO", "Une URL inexistante répond 200 (soft 404) : vérifier vercel.json (pas de rewrite global)");
  else add("OK", "SEO", `URL inexistante → HTTP ${ghost.status}`);

  // 1c. Contenu pré-rendu : le HTML brut doit contenir un <h1>
  if (home.ok && !/<h1[\s>]/.test(home.body)) add("CRITIQUE", "SEO", "Accueil sans <h1> dans le HTML brut : le pré-rendu (scripts/ssg.js) n'a pas tourné");

  // 2. robots.txt + sitemap
  const robots = await get(`${SITE}/robots.txt`);
  if (!robots.ok) add("ALERTE", "SEO", `robots.txt HTTP ${robots.status}`);
  else if (/Disallow:\s*\/\s*$/m.test(robots.body)) add("CRITIQUE", "SEO", "robots.txt bloque tout le site (Disallow: /)");
  const sm = await get(`${SITE}/sitemap.xml`);
  let urls = [];
  if (!sm.ok) add("CRITIQUE", "SEO", `sitemap.xml HTTP ${sm.status}`);
  else {
    urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&")).filter((u) => !u.includes("?lang="));
    add("OK", "SEO", `sitemap.xml : ${urls.length} pages (FR)`);
  }

  // 3. Chaque page : statut, temps, balises
  const slow = [], broken = [], noTitle = [], noDesc = [], noindexed = [];
  for (const u of urls) {
    const target = u.replace(/^https?:\/\/[^/]+/, SITE);
    const r = await get(target);
    if (!r.ok) { broken.push(`${target} (HTTP ${r.status})`); continue; }
    if (r.ms > SLOW_MS) slow.push(`${target} (${r.ms} ms)`);
    if (!/<title[^>]*>[^<]{10,}<\/title>/.test(r.body)) noTitle.push(target);
    if (!/name="description"/.test(r.body)) noDesc.push(target);
    if (!/<h1[\s>]/.test(r.body)) noTitle.push(`${target} (h1)`);
    if (/content="noindex/.test(r.body)) noindexed.push(target);
  }
  if (broken.length) add("CRITIQUE", "Pages", `Pages en erreur : ${broken.join(", ")}`);
  if (slow.length) add("ALERTE", "Performance", `Pages lentes (> ${SLOW_MS} ms) : ${slow.join(", ")}`);
  if (noTitle.length) add("ALERTE", "SEO", `Titre statique absent : ${noTitle.join(", ")}`);
  if (noDesc.length) add("ALERTE", "SEO", `Meta description statique absente : ${noDesc.join(", ")}`);
  if (noindexed.length) add("CRITIQUE", "SEO", `Pages du sitemap en noindex : ${noindexed.join(", ")}`);
  if (urls.length && !broken.length) add("OK", "Pages", `${urls.length - broken.length}/${urls.length} pages répondent`);

  // 4. Conformité éditoriale : on scanne le JavaScript publié
  const scripts = [...(home.body || "").matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]);
  let bundle = "";
  for (const s of scripts) { const r = await get(s.startsWith("http") ? s : `${SITE}${s}`); bundle += r.body; }
  if (!bundle) add("ALERTE", "Conformité", "Bundle JS introuvable — scan de conformité impossible");
  else {
    let hits = 0;
    for (const [re, label] of FORBIDDEN) { if (re.test(bundle)) { hits++; add("CRITIQUE", "Conformité", label); } }
    if (!hits) add("OK", "Conformité", "Aucune formulation interdite dans le code publié");
    for (const n of ["25377094141", "25377239292"]) {
      if (!bundle.includes(n)) add("CRITIQUE", "Conversion", `Ligne WhatsApp ${n} absente du site`);
    }
  }

  // 5. Domaine historique
  const legacy = await get(LEGACY);
  if (!legacy.ok) add("ALERTE", "Domaine", `${LEGACY} répond HTTP ${legacy.status || "—"} : rediriger vers le nouveau site ou réparer`);
  else add("OK", "Domaine", `${LEGACY} HTTP ${legacy.status}`);

  // Rapport
  const order = { CRITIQUE: 0, ALERTE: 1, OK: 2 };
  results.sort((a, b) => order[a.level] - order[b.level]);
  const icon = { CRITIQUE: "🔴", ALERTE: "🟠", OK: "🟢" };
  const crit = results.filter((r) => r.level === "CRITIQUE").length;
  const warn = results.filter((r) => r.level === "ALERTE").length;
  const md = [
    `# Bilan de santé — ${SITE}`,
    `_${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Djibouti" })} (heure de Djibouti)_`,
    "",
    `**${crit} critique(s) · ${warn} alerte(s)**`,
    "",
    "| Niveau | Domaine | Constat |",
    "|---|---|---|",
    ...results.map((r) => `| ${icon[r.level]} ${r.level} | ${r.area} | ${r.msg.replace(/\|/g, "/")} |`),
    "",
  ].join("\n");
  console.log(md);
  fs.writeFileSync("health-report.md", md);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  process.exit(crit ? 1 : 0);
})();

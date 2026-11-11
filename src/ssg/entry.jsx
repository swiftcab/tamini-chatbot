// Point d'entrée du pré-rendu (exécuté par Node à la compilation, jamais
// dans le navigateur). Rend une URL en HTML + balises <head> Helmet.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";
import { PRODUCTS } from "../i18n/products";
import { FUNNELS } from "../funnel/questions";
import { ARTICLES } from "../content/articles";
import { SHARIA_ARTICLES, SHARIA_TAWAKKUL } from "../config/compliance";

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}

// Inventaire des pages. `index: false` = pré-rendue mais hors sitemap (noindex).
export function routes() {
  const r = [
    { p: "/", pr: "1.0", cf: "weekly" },
    { p: "/particuliers", pr: "0.9", cf: "monthly" },
    { p: "/entreprises", pr: "0.9", cf: "monthly" },
    { p: "/entreprises/solutions", pr: "0.9", cf: "monthly" },
    ...Object.values(PRODUCTS).map((x) => ({ p: `/${x.segment}/${x.slug}`, pr: "0.9", cf: "monthly" })),
    { p: "/devis", pr: "0.8", cf: "monthly" },
    ...Object.keys(FUNNELS).map((s) => ({ p: `/devis/${s}`, pr: "0.7", cf: "monthly" })),
    { p: "/takaful", pr: "0.9", cf: "monthly" },
    { p: "/sinistres", pr: "0.8", cf: "monthly" },
    { p: "/contact", pr: "0.8", cf: "monthly" },
    { p: "/agences", pr: "0.8", cf: "monthly" },
    { p: "/a-propos", pr: "0.7", cf: "monthly" },
    { p: "/partenaires", pr: "0.6", cf: "monthly" },
    { p: "/faq", pr: "0.8", cf: "monthly" },
    { p: "/blog", pr: "0.8", cf: "weekly" },
    ...ARTICLES.map((a) => ({ p: `/blog/${a.slug}`, pr: "0.8", cf: "monthly", onlyLang: a.lang, lastmod: a.updated || a.date, index: !(a.review === "charia" && !SHARIA_ARTICLES.validated) })),
    { p: "/confidentialite", pr: "0.3", cf: "yearly" },
    { p: "/takaful-et-tawakkul", pr: "0.6", cf: "monthly", index: SHARIA_TAWAKKUL.validated },
  ];
  return r.map((x) => ({ index: true, ...x }));
}

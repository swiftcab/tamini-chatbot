import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { ARTICLES } from "../content/articles";
import { SHARIA_ARTICLES } from "../config/compliance";
import Seo, { breadcrumbSchema } from "../seo/Seo";
import { PAGE_META } from "../seo/meta";

const UI = {
  fr: { eye: "Guides & articles", h1: "Comprendre l'assurance à Djibouti", sub: "Des guides pratiques, sourcés sur les textes officiels, pour choisir et utiliser votre assurance en connaissance de cause.", all: "Tous", min: "min", home: "Accueil", lang: { fr: "FR", en: "EN" } },
  en: { eye: "Guides & articles", h1: "Understanding insurance in Djibouti", sub: "Practical guides, based on official texts, to choose and use your insurance with confidence.", all: "All", min: "min", home: "Home", lang: { fr: "FR", en: "EN" } },
  ar: { eye: "أدلة ومقالات", h1: "فهم التأمين في جيبوتي", sub: "أدلة عملية مستندة إلى النصوص الرسمية لاختيار تأمينكم واستخدامه عن دراية.", all: "الكل", min: "دقائق", home: "الرئيسية", lang: { fr: "FR", en: "EN" } },
};

export default function Blog() {
  const { lang } = useLang();
  const ui = UI[lang] || UI.fr;
  const meta = PAGE_META.blog[lang] || PAGE_META.blog.fr;
  const visible = ARTICLES.filter((a) => !(a.review === "charia" && !SHARIA_ARTICLES.validated));
  const cats = [...new Set(visible.map((a) => a.category))];
  const [cat, setCat] = useState(null);
  const list = cat ? visible.filter((a) => a.category === cat) : visible;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/blog" schema={breadcrumbSchema([{ name: ui.home, path: "/" }, { name: ui.eye, path: "/blog" }])} />
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{ui.eye}</span>
          <h1>{ui.h1}</h1>
          <p className="lead">{ui.sub}</p>
          <div className="btn-row" role="group" aria-label="Catégories" style={{ marginTop: 20 }}>
            <button type="button" className={`btn btn-sm ${cat ? "btn-ghost" : "btn-navy"}`} onClick={() => setCat(null)}>{ui.all}</button>
            {cats.map((c) => <button key={c} type="button" className={`btn btn-sm ${cat === c ? "btn-navy" : "btn-ghost"}`} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container grid g3">
          {list.map((a) => (
            <Link key={a.slug} to={`/blog/${a.slug}`} className="card card-link" lang={a.lang}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span className="pill">{a.category}</span><span style={{ fontSize: 12, color: "var(--muted)" }}>{ui.lang[a.lang]} · {a.readMin} {ui.min}</span></div>
              <h2 style={{ fontSize: 19, marginTop: 12, fontFamily: "var(--sans)" }}>{a.title}</h2>
              <p>{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

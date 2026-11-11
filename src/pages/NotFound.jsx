import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo from "../seo/Seo";

const T = {
  fr: { t: "Page introuvable", p: "Cette page n'existe pas ou a été déplacée. Voici les pages les plus utiles :", links: [["Accueil", "/"], ["Demander un devis", "/devis"], ["Déclarer un sinistre", "/sinistres#declarer"], ["Assurances particuliers", "/particuliers"], ["Assurances entreprises", "/entreprises"], ["Nous contacter", "/contact"]] },
  en: { t: "Page not found", p: "This page does not exist or has moved. Here are the most useful pages:", links: [["Home", "/"], ["Get a quote", "/devis"], ["Report a claim", "/sinistres#declarer"], ["Personal insurance", "/particuliers"], ["Business insurance", "/entreprises"], ["Contact us", "/contact"]] },
  ar: { t: "الصفحة غير موجودة", p: "هذه الصفحة غير موجودة أو نُقلت. إليكم أهم الصفحات:", links: [["الرئيسية", "/"], ["اطلب عرض سعر", "/devis"], ["صرّح بمطالبة", "/sinistres#declarer"], ["تأمينات الأفراد", "/particuliers"], ["تأمينات الشركات", "/entreprises"], ["اتصل بنا", "/contact"]] },
};

export default function NotFound() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  return (
    <section className="page-hero" style={{ minHeight: "55vh" }}>
      <Seo title={`${t.t} | Tamini Insurance`} description={t.p} path="/404" noindex />
      <div className="container narrow">
        <span className="eyebrow">404</span>
        <h1>{t.t}</h1>
        <p className="lead">{t.p}</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          {t.links.map(([l, to], i) => <Link key={to} to={to} className={`btn ${i === 1 ? "btn-lime" : "btn-ghost"} btn-sm`}>{l}</Link>)}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";
import { useLang } from "../i18n/LanguageContext";
import { PRODUCTS } from "../i18n/products";
import { FUNNELS } from "../funnel/questions";
import QuoteFunnel from "../funnel/QuoteFunnel";
import Seo, { breadcrumbSchema } from "../seo/Seo";
import { CLAIMS_RATE } from "../config/compliance";

// ─────────────────────────────────────────────────────────────
// Landing page de devis — destination des campagnes payantes
// (Google, Meta, LinkedIn) et des requêtes « devis assurance X
// Djibouti ». Une seule action possible : remplir le formulaire.
// URL type : /devis/auto?utm_source=facebook&utm_medium=paid&utm_campaign=auto_oct26
// ─────────────────────────────────────────────────────────────

const N = "#0B1F4D", G = "#6EC026";

const T = {
  fr: {
    h1: (b) => (b ? `Votre devis ${b}` : "Votre devis Takaful"), h1b: "en 60 secondes.",
    sub: "Répondez à quelques questions simples. Un conseiller Tamini vous envoie une proposition adaptée sur WhatsApp — sans engagement.",
    bullets: ["1er assureur Takaful agréé à Djibouti (ARSD)", "Conforme à la Charia : zéro Riba, zéro Gharar", "Excédent du fonds partagé avec les membres éligibles", CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini} % des dossiers sinistres réglés (~${CLAIMS_RATE.market} % marché)` : "Un interlocuteur unique pour votre dossier"],
    seoT: (b) => (b ? `Devis ${b} Djibouti en 60 s — gratuit | Tamini Takaful` : "Devis assurance Djibouti en 60 s — gratuit | Tamini Takaful"),
    seoD: (b) => `Obtenez votre devis ${b || "d'assurance Takaful"} à Djibouti : quelques questions, une proposition personnalisée sur WhatsApp. Gratuit, sans engagement, conforme Charia.`,
    home: "Accueil", crumb: "Devis", see: "Voir le détail des garanties",
  },
  en: {
    h1: (b) => (b ? `Your ${b} quote` : "Your Takaful quote"), h1b: "in 60 seconds.",
    sub: "Answer a few simple questions. A Tamini advisor sends you a tailored proposal on WhatsApp — no commitment.",
    bullets: ["Djibouti's first licensed Takaful insurer (ARSD)", "Sharia-compliant: zero Riba, zero Gharar", "Fund surplus shared with eligible members", CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini}% of claims files settled (~${CLAIMS_RATE.market}% market)` : "One point of contact for your file"],
    seoT: (b) => (b ? `${b} quote Djibouti in 60 s — free | Tamini Takaful` : "Insurance quote Djibouti in 60 s — free | Tamini Takaful"),
    seoD: (b) => `Get your ${b || "Takaful insurance"} quote in Djibouti: a few questions, a personalised proposal on WhatsApp. Free, no commitment, Sharia-compliant.`,
    home: "Home", crumb: "Quote", see: "See full coverage details",
  },
  ar: {
    h1: (b) => (b ? `عرض سعر ${b}` : "عرض سعر التكافل"), h1b: "في 60 ثانية.",
    sub: "أجيبوا على بعض الأسئلة البسيطة. يرسل لكم مستشار تأميني عرضاً مناسباً على واتساب — دون أي التزام.",
    bullets: ["أول شركة تكافل مرخصة في جيبوتي (ARSD)", "متوافق مع الشريعة: لا ربا ولا غرر", "فائض الصندوق يُشارك مع الأعضاء المؤهلين", CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini}% من ملفات المطالبات مسوّاة (~${CLAIMS_RATE.market}% في السوق)` : "محاور واحد لملفكم"],
    seoT: (b) => (b ? `عرض سعر ${b} جيبوتي في 60 ثانية | تأميني تكافل` : "عرض سعر تأمين جيبوتي في 60 ثانية | تأميني تكافل"),
    seoD: (b) => `احصلوا على عرض سعر ${b || "التأمين التكافلي"} في جيبوتي: بضعة أسئلة وعرض مخصص على واتساب. مجاناً ومتوافق مع الشريعة.`,
    home: "الرئيسية", crumb: "عرض سعر", see: "عرض تفاصيل التغطيات",
  },
};

export default function Devis() {
  const { slug } = useParams();
  const { lang, rtl } = useLang();
  if (slug && !FUNNELS[slug]) return <NotFound />;
  const t = T[lang] || T.fr;
  const product = slug ? PRODUCTS[slug] : null;
  const badge = product ? product[lang].badge : "";
  const path = slug ? `/devis/${slug}` : "/devis";
  const font = rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif";

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: font, background: `linear-gradient(160deg,#071028 0%,${N} 55%,#0d2a5e 100%)`, minHeight: "85vh" }}>
      <Seo title={t.seoT(badge)} description={t.seoD(badge)} path={path} image={product ? `/images/${product.hero}.webp` : undefined}
        schema={{ "@context": "https://schema.org", ...breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.crumb, path }]) }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 64px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 36, alignItems: "start" }}>
        <div style={{ color: "#fff", paddingTop: 8 }}>
          <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(30px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px" }}>
            {t.h1(badge)}<br /><span style={{ color: G }}>{t.h1b}</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.82)", margin: "0 0 22px", maxWidth: 480 }}>{t.sub}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            {t.bullets.map((b) => (
              <li key={b} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#fff" }}><span style={{ color: G, fontWeight: 900 }}>✓</span>{b}</li>
            ))}
          </ul>
          {product && <Link to={`/${product.segment}/${slug}`} style={{ color: "rgba(255,255,255,.75)", fontSize: 13, textDecoration: "underline" }}>{t.see}</Link>}
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "22px 20px 26px", boxShadow: "0 24px 70px rgba(7,16,40,.3)" }}>
          <QuoteFunnel key={slug || "picker"} slug={slug || null} source={slug ? `landing_devis_${slug}` : "landing_devis"} />
        </div>
      </div>
    </div>
  );
}

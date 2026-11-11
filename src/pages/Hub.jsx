import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, PARTICULIERS, ENTREPRISES } from "../i18n/products";
import { useLang } from "../i18n/LanguageContext";
import Seo, { breadcrumbSchema } from "../seo/Seo";
import { useFunnel } from "../funnel/FunnelContext";
import { PAGE_META } from "../seo/meta";

const N = "#0B1F4D", G = "#6EC026";

const UI = {
  fr: {
    particuliers: { title: "Assurances Particuliers", sub: "Protégez ce qui compte : votre famille, votre maison, vos déplacements." },
    entreprises: { title: "Assurances Entreprises", sub: "Des solutions Takaful complètes pour sécuriser votre activité et vos actifs." },
    discover: "Découvrir →",
    banner: { b2c: ["Vous hésitez entre plusieurs assurances ?", "Répondez à quelques questions : on vous oriente vers la bonne protection.", "Trouver ma protection (60 s)"], b2b: ["Vous cherchez une protection par secteur ?", "Industrie, chantier, import-export, flotte : audit de risques et proposition consolidée.", "Voir les solutions par secteur"] },
  },
  en: {
    particuliers: { title: "Personal Insurance", sub: "Protect what matters: your family, your home, your travels." },
    entreprises: { title: "Business Insurance", sub: "Complete Takaful solutions to secure your activity and assets." },
    discover: "Discover →",
    banner: { b2c: ["Not sure which cover you need?", "Answer a few questions and we'll point you to the right protection.", "Find my cover (60 s)"], b2b: ["Looking for protection by sector?", "Industry, construction, import-export, fleet: risk audit and consolidated proposal.", "See solutions by sector"] },
  },
  ar: {
    particuliers: { title: "تأمينات الأفراد", sub: "احمِ ما يهم: عائلتك، منزلك، تنقلاتك." },
    entreprises: { title: "تأمينات الشركات", sub: "حلول تكافلية شاملة لتأمين نشاطك وأصولك." },
    discover: "اكتشف ←",
    banner: { b2c: ["مترددون بين عدة تأمينات؟", "أجيبوا على بعض الأسئلة ونرشدكم إلى الحماية المناسبة.", "اعثر على حمايتي (60 ثانية)"], b2b: ["تبحثون عن حماية حسب القطاع؟", "الصناعة، المقاولات، الاستيراد والتصدير، الأساطيل: تدقيق المخاطر وعرض موحّد.", "عرض الحلول حسب القطاع"] },
  },
};

export default function Hub({ segment }) {
  const { lang, rtl } = useLang();
  const ui = UI[lang];
  const { openFunnel } = useFunnel();
  const meta = ui[segment];
  const slugs = segment === "particuliers" ? PARTICULIERS : ENTREPRISES;
  const seoMeta = PAGE_META[segment][lang];

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B", background: "#fff", minHeight: "80vh" }}>
      <Seo
        title={seoMeta.title}
        description={seoMeta.description}
        path={`/${segment}`}
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: meta.title, path: `/${segment}` },
        ])}
      />

      {/* Header band */}
      <div style={{ background: `linear-gradient(135deg,${N},#0d2a5e)`, padding: "64px 24px 56px", textAlign: "center" }}>
        <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>{meta.title}</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{meta.sub}</p>
      </div>

      {/* Product cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 72px" }}>
        {(() => { const b = ui.banner[segment === "particuliers" ? "b2c" : "b2b"]; return (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 22px", marginBottom: 30, borderRadius: 16, background: "rgba(110,192,38,.08)", border: "1px solid rgba(110,192,38,.3)" }}>
            <div style={{ flex: "1 1 320px" }}>
              <div style={{ fontWeight: 800, color: N, fontSize: 16, marginBottom: 4 }}>{b[0]}</div>
              <div style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6 }}>{b[1]}</div>
            </div>
            {segment === "particuliers"
              ? <button type="button" onClick={() => openFunnel(null, "hub_banner")} style={{ padding: "13px 22px", background: G, color: N, border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{b[2]}</button>
              : <Link to="/entreprises/solutions" style={{ padding: "13px 22px", background: N, color: "#fff", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>{b[2]}</Link>}
          </div>
        ); })()}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 22 }}>
          {slugs.map((slug) => {
            const p = PRODUCTS[slug];
            const t = p[lang];
            const to = `/${segment}/${slug}`;
            return (
              <Link key={slug} to={to} style={{ textDecoration: "none", borderRadius: 18, overflow: "hidden", border: "1px solid #e8ecf0", background: "#fff", display: "block", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(11,31,77,.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ height: 170, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(/images/${p.card}.webp)`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,31,77,.15) 30%, rgba(7,16,40,.82))" }} />
                  <div style={{ position: "absolute", bottom: 14, insetInlineStart: 18, insetInlineEnd: 18 }}>
                    <h3 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{t.badge}</h3>
                  </div>
                </div>
                <div style={{ padding: "16px 20px 20px" }}>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, marginBottom: 14, fontStyle: rtl ? "normal" : "italic" }}>« {t.hook} »</p>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: G }}>{ui.discover}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

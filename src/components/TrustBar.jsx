import React from "react";
import { useLang } from "../i18n/LanguageContext";
import { SURPLUS } from "../config/compliance";

// ─────────────────────────────────────────────────────────────
// Barre de confiance permanente — visible sur TOUTES les pages.
// Applique le principe CRO : les signaux de confiance doivent
// être visibles tôt et près des points de décision, pas
// enterrés dans le pied de page.
// ─────────────────────────────────────────────────────────────

const T = {
  fr: [
    { icon: "🏛️", strong: "Agréée ARSD", label: "Opérateur Takaful agréé" },
    { icon: "📅", strong: "Depuis 2020", label: "5 ans d'expérience" },
    { icon: "⚡", strong: "65% de sinistres réglés", label: "contre ~18% du marché" },
    SURPLUS.validated ? { icon: "💰", strong: "38M FDJ redistribués", label: "à nos assurés en 2025" } : { icon: "💚", strong: "Excédent partagé", label: "avec les membres éligibles" },
  ],
  en: [
    { icon: "🏛️", strong: "ARSD licensed", label: "Licensed Takaful operator" },
    { icon: "📅", strong: "Since 2020", label: "5 years of experience" },
    { icon: "⚡", strong: "65% of claims settled", label: "vs ~18% market average" },
    SURPLUS.validated ? { icon: "💰", strong: "38M DJF redistributed", label: "to members in 2025" } : { icon: "💚", strong: "Surplus shared", label: "with eligible members" },
  ],
  ar: [
    { icon: "🏛️", strong: "مرخصة من ARSD", label: "مشغل تكافل مرخص" },
    { icon: "📅", strong: "منذ 2020", label: "5 سنوات من الخبرة" },
    { icon: "⚡", strong: "65% من المطالبات مسوّاة", label: "مقابل ~18% في السوق" },
    SURPLUS.validated ? { icon: "💰", strong: "38 مليون فرنك أعيد توزيعها", label: "على أعضائنا في 2025" } : { icon: "💚", strong: "فائض يُشارك", label: "مع الأعضاء المؤهلين" },
  ],
};

export default function TrustBar() {
  const { lang, rtl } = useLang();
  const items = T[lang] || T.fr;

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      style={{
        background: "#F8FAFF",
        borderBottom: "1px solid #e8ecf0",
        padding: "10px 20px",
        fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          minWidth: "max-content",
        }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 15 }} aria-hidden="true">{it.icon}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0B1F4D" }}>{it.strong}</span>
            <span style={{ fontSize: 11.5, color: "#64748b" }}>· {it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

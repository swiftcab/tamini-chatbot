import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { TRACKING_CONFIGURED, getConsent, setConsent, initTracking, pageview } from "./analytics";

// Bannière de consentement : deux boutons de même poids (Accepter / Refuser),
// aucun cookie de mesure avant un choix explicite. Affichée uniquement si au
// moins un outil de mesure est configuré.
const T = {
  fr: { txt: "Nous utilisons des cookies de mesure d'audience pour améliorer le site et nos campagnes. Aucun cookie n'est déposé sans votre accord.", ok: "Accepter", no: "Refuser", more: "En savoir plus" },
  en: { txt: "We use audience-measurement cookies to improve the site and our campaigns. No cookie is set without your consent.", ok: "Accept", no: "Decline", more: "Learn more" },
  ar: { txt: "نستخدم ملفات تعريف الارتباط لقياس الجمهور وتحسين الموقع وحملاتنا. لا يتم وضع أي ملف دون موافقتكم.", ok: "موافق", no: "رفض", more: "اعرف المزيد" },
};

export function RouteTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => { initTracking(); }, []);
  useEffect(() => {
    const id = setTimeout(() => pageview(pathname + search, document.title), 50); // laisse Helmet mettre à jour le titre
    return () => clearTimeout(id);
  }, [pathname, search]);
  return null;
}

export default function ConsentBanner() {
  const { lang, rtl } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => { if (TRACKING_CONFIGURED && !getConsent()) setShow(true); }, []);
  if (!show) return null;
  const t = T[lang] || T.fr;
  const choose = (v) => { setConsent(v); setShow(false); };
  const btn = { flex: 1, minWidth: 120, padding: "11px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "2px solid #0B1F4D" };
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies" dir={rtl ? "rtl" : "ltr"} style={{ position: "fixed", insetInline: 12, bottom: 12, zIndex: 1200, maxWidth: 560, marginInline: "auto", background: "#fff", borderRadius: 16, boxShadow: "0 12px 48px rgba(11,31,77,.25)", padding: "18px 18px 16px", fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif" }}>
      <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6, margin: "0 0 12px" }}>
        {t.txt} <Link to="/confidentialite" style={{ color: "#0B1F4D", fontWeight: 700 }}>{t.more}</Link>
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="button" onClick={() => choose("denied")} style={{ ...btn, background: "#fff", color: "#0B1F4D" }}>{t.no}</button>
        <button type="button" onClick={() => choose("granted")} style={{ ...btn, background: "#0B1F4D", color: "#fff" }}>{t.ok}</button>
      </div>
    </div>
  );
}

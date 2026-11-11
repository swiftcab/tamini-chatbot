import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLang } from "../i18n/LanguageContext";
import ConsentBanner, { RouteTracker } from "../tracking/ConsentBanner";
import { WA_B2C, wa } from "../config/site";

const WA_MSG = {
  fr: "Bonjour Tamini, je souhaite un renseignement.",
  en: "Hello Tamini, I would like some information.",
  ar: "مرحباً تأميني، أريد معلومات.",
};

export default function Layout({ children }) {
  const { lang, rtl } = useLang();
  const { pathname, hash } = useLocation();
  // Retour en haut à chaque page ; défilement vers l'ancre si #… dans l'URL.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  // Pages produit et devis : barre CTA mobile dédiée, on masque la bulle.
  const hasStickyBar = /^\/(particuliers|entreprises)\/(?!solutions)[^/]+$/.test(pathname) || pathname.startsWith("/devis");

  return (
    <div dir={rtl ? "rtl" : "ltr"} lang={lang}>
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <RouteTracker />
      <ConsentBanner />
      <a href={wa(WA_B2C.number, WA_MSG[lang])} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-cta="floating_whatsapp" className={`float-wa${hasStickyBar ? " hide-mobile" : ""}`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35zM12 0a12 12 0 0 0-9.72 19.03L.79 23.5a.5.5 0 0 0 .61.62l4.54-1.48A12 12 0 1 0 12 0zm0 22a9.96 9.96 0 0 1-5.99-1.96l-.42-.31-2.79.9.93-2.72-.34-.44A9.96 9.96 0 1 1 12 22z"/></svg>
      </a>
    </div>
  );
}

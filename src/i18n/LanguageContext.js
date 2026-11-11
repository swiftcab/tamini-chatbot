import React, { createContext, useContext, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// Contexte de langue global — s'applique à TOUTES les pages.
// Toute nouvelle page n'a qu'à appeler useLang() pour être
// automatiquement multilingue et cohérente (FR / EN / AR + RTL).
// ─────────────────────────────────────────────────────────────

const LanguageContext = createContext();

export const LANGS = { fr: "FR", en: "EN", ar: "ع" };
export const RTL_LANGS = ["ar"];

export function LanguageProvider({ children }) {
  // Priorité : ?lang= dans l'URL (liens partagés, hreflang, campagnes)
  // > choix mémorisé > français par défaut.
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "fr";
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && LANGS[fromUrl]) return fromUrl;
    try { const saved = localStorage.getItem("tamini_lang"); if (saved && LANGS[saved]) return saved; } catch (e) { /* stockage indisponible */ }
    return "fr";
  });

  const setLang = (l) => {
    if (!LANGS[l]) return;
    setLangState(l);
    if (typeof window === "undefined") return;
    try { localStorage.setItem("tamini_lang", l); } catch (e) { /* stockage indisponible */ }
    // URL partageable dans la langue affichée (fr = URL sans paramètre)
    const url = new URL(window.location.href);
    if (l === "fr") url.searchParams.delete("lang"); else url.searchParams.set("lang", l);
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  };

  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
    }
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, rtl: dir === "rtl" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback si un composant est utilisé hors Provider (sécurité)
    return { lang: "fr", setLang: () => {}, dir: "ltr", rtl: false };
  }
  return ctx;
}

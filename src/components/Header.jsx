import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useFunnel } from "../funnel/FunnelContext";
import { useLang, LANGS } from "../i18n/LanguageContext";
import { PHONE } from "../config/site";

const NAV = {
  fr: {
    tag: "Première assurance Takaful agréée à Djibouti",
    call: "Appeler", claim: "Déclarer un sinistre", agencies: "Nos agences",
    particuliers: "Particuliers", entreprises: "Entreprises", takaful: "Le Takaful", claims: "Sinistres",
    contact: "Contact", about: "À propos", resources: "Ressources",
    advisor: "Parler à un conseiller", quote: "Demander un devis", quoteShort: "Devis", menu: "Menu",
    subP: [["Assurance automobile", "/particuliers/auto"], ["Assurance habitation", "/particuliers/habitation"], ["Assurance voyage", "/particuliers/voyage"], ["Takaful Éducation", "/particuliers/education"], ["Accidents personnels", "/particuliers/accidents"]],
    subE: [["Solutions par secteur", "/entreprises/solutions"], ["Multirisque entreprise", "/entreprises/multirisque"], ["Responsabilité civile", "/entreprises/rc"], ["Maritime & marchandises", "/entreprises/maritime"], ["Flotte automobile", "/entreprises/flotte"], ["Assurance chantier", "/entreprises/chantier"], ["Garantie de bonne exécution", "/entreprises/bond"]],
    subR: [["À propos de Tamini", "/a-propos"], ["Nos agences", "/agences"], ["Guides & articles", "/blog"], ["Questions fréquentes", "/faq"], ["Partenaires & courtiers", "/partenaires"]],
    allP: "Toutes les assurances particuliers", allE: "Toutes les assurances entreprises",
  },
  en: {
    tag: "Djibouti's first licensed Takaful insurer",
    call: "Call", claim: "Report a claim", agencies: "Our branches",
    particuliers: "Individuals", entreprises: "Business", takaful: "Takaful", claims: "Claims",
    contact: "Contact", about: "About us", resources: "Resources",
    advisor: "Talk to an advisor", quote: "Get a quote", quoteShort: "Quote", menu: "Menu",
    subP: [["Motor insurance", "/particuliers/auto"], ["Home insurance", "/particuliers/habitation"], ["Travel insurance", "/particuliers/voyage"], ["Education Takaful", "/particuliers/education"], ["Personal accident", "/particuliers/accidents"]],
    subE: [["Solutions by sector", "/entreprises/solutions"], ["Business multi-risk", "/entreprises/multirisque"], ["General liability", "/entreprises/rc"], ["Marine & cargo", "/entreprises/maritime"], ["Motor fleet", "/entreprises/flotte"], ["Construction insurance", "/entreprises/chantier"], ["Performance bond", "/entreprises/bond"]],
    subR: [["About Tamini", "/a-propos"], ["Our branches", "/agences"], ["Guides & articles", "/blog"], ["FAQ", "/faq"], ["Partners & brokers", "/partenaires"]],
    allP: "All personal insurance", allE: "All business insurance",
  },
  ar: {
    tag: "أول شركة تأمين تكافلي مرخصة في جيبوتي",
    call: "اتصل", claim: "التصريح بمطالبة", agencies: "وكالاتنا",
    particuliers: "الأفراد", entreprises: "الشركات", takaful: "التكافل", claims: "المطالبات",
    contact: "اتصل بنا", about: "من نحن", resources: "موارد",
    advisor: "تحدث إلى مستشار", quote: "اطلب عرض سعر", quoteShort: "عرض سعر", menu: "القائمة",
    subP: [["تأمين السيارات", "/particuliers/auto"], ["تأمين المسكن", "/particuliers/habitation"], ["تأمين السفر", "/particuliers/voyage"], ["تكافل التعليم", "/particuliers/education"], ["الحوادث الشخصية", "/particuliers/accidents"]],
    subE: [["حلول حسب القطاع", "/entreprises/solutions"], ["متعدد المخاطر للشركات", "/entreprises/multirisque"], ["المسؤولية المدنية", "/entreprises/rc"], ["البحري والبضائع", "/entreprises/maritime"], ["أسطول المركبات", "/entreprises/flotte"], ["تأمين المقاولات", "/entreprises/chantier"], ["ضمان حسن التنفيذ", "/entreprises/bond"]],
    subR: [["عن تأميني", "/a-propos"], ["وكالاتنا", "/agences"], ["أدلة ومقالات", "/blog"], ["الأسئلة الشائعة", "/faq"], ["الشركاء والوسطاء", "/partenaires"]],
    allP: "كل تأمينات الأفراد", allE: "كل تأمينات الشركات",
  },
};

const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const I = {
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  alert: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  pin: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M18 6 6 18M6 6l12 12",
};

function Dropdown({ label, items, footer }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className={`dropdown${open ? " open" : ""}`} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{label} ▾</button>
      <div className="dropdown-panel">
        {items.map(([l, to]) => <Link key={to} to={to}>{l}</Link>)}
        {footer && <Link to={footer[1]} style={{ fontWeight: 700, color: "var(--lime-ink)" }}>{footer[0]} →</Link>}
      </div>
    </div>
  );
}

export default function Header() {
  const { lang, setLang } = useLang();
  const t = NAV[lang] || NAV.fr;
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { openFunnel } = useFunnel();
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">{lang === "en" ? "Skip to content" : lang === "ar" ? "انتقل إلى المحتوى" : "Aller au contenu"}</a>
      <div className="topbar">
        <div className="container">
          <span className="hide-sm" style={{ opacity: .85 }}>{t.tag}</span>
          <nav className="topbar-links" aria-label="Accès rapide">
            <a href={`tel:${PHONE.intl}`} data-cta="topbar_phone"><Icon d={I.phone} /><span className="txt">{PHONE.display}</span></a>
            <Link to="/sinistres#declarer"><Icon d={I.alert} /><span className="txt">{t.claim}</span></Link>
            <Link to="/agences" className="hide-md"><Icon d={I.pin} /><span className="txt">{t.agencies}</span></Link>
            <div className="langs" role="group" aria-label="Langue">
              {Object.entries(LANGS).map(([k, v]) => (
                <button key={k} type="button" aria-pressed={lang === k} onClick={() => setLang(k)} lang={k}>{v}</button>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand" aria-label="Tamini Insurance — accueil">
            <img src="/images/logo.png" alt="" width="42" height="42" />
            <span><b>TAMINI</b><small>INSURANCE SA</small></span>
          </Link>
          <nav className="nav" aria-label="Navigation principale">
            <Dropdown label={t.particuliers} items={t.subP} footer={[t.allP, "/particuliers"]} />
            <Dropdown label={t.entreprises} items={t.subE} footer={[t.allE, "/entreprises"]} />
            <NavLink to="/takaful">{t.takaful}</NavLink>
            <NavLink to="/sinistres">{t.claims}</NavLink>
            <NavLink to="/contact">{t.contact}</NavLink>
            <Dropdown label={t.resources} items={t.subR} />
          </nav>
          <div className="header-cta">
            <Link to="/contact" className="btn btn-ghost btn-sm">{t.advisor}</Link>
            <button type="button" className="btn btn-lime btn-sm" onClick={() => openFunnel(null, "header")}>
              <span className="only-desktop">{t.quote}</span><span className="only-mobile">{t.quoteShort}</span>
            </button>
            <button type="button" className="burger" aria-expanded={menu} aria-controls="mobile-menu" aria-label={t.menu} onClick={() => setMenu((m) => !m)}>
              <Icon d={menu ? I.close : I.menu} size={24} />
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={`mobile-menu${menu ? " open" : ""}`}>
          <div className="mm-head">{t.particuliers}</div>
          {t.subP.map(([l, to]) => <Link key={to} to={to}>{l}</Link>)}
          <div className="mm-head">{t.entreprises}</div>
          {t.subE.map(([l, to]) => <Link key={to} to={to}>{l}</Link>)}
          <div className="mm-head">Tamini</div>
          <Link to="/takaful">{t.takaful}</Link>
          <Link to="/sinistres">{t.claims}</Link>
          <Link to="/contact">{t.contact}</Link>
          {t.subR.map(([l, to]) => <Link key={to} to={to}>{l}</Link>)}
          <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
            <button type="button" className="btn btn-lime" onClick={() => { setMenu(false); openFunnel(null, "menu_mobile"); }}>{t.quote}</button>
            <a className="btn btn-ghost" href={`tel:${PHONE.intl}`} data-cta="menu_phone">{t.call} {PHONE.display}</a>
          </div>
        </div>
      </header>
    </>
  );
}

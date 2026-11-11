import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { AGENCIES, EMAIL, PHONE, SOCIAL, WA_B2B, WA_B2C, wa } from "../config/site";

const F = {
  fr: {
    tagline: "Solidarité aujourd'hui, sérénité demain.",
    about: "Tamini Insurance SA est la première compagnie d'assurance Takaful agréée en République de Djibouti, membre du groupe Salaam. Activité régulée par l'ARSD.",
    colP: "Particuliers", colE: "Entreprises", colT: "Tamini", colC: "Contact & agences",
    p: [["Automobile", "/particuliers/auto"], ["Habitation", "/particuliers/habitation"], ["Voyage", "/particuliers/voyage"], ["Éducation", "/particuliers/education"], ["Accidents personnels", "/particuliers/accidents"]],
    e: [["Solutions par secteur", "/entreprises/solutions"], ["Multirisque", "/entreprises/multirisque"], ["Responsabilité civile", "/entreprises/rc"], ["Maritime & marchandises", "/entreprises/maritime"], ["Flotte automobile", "/entreprises/flotte"], ["Chantier", "/entreprises/chantier"], ["Bonne exécution", "/entreprises/bond"]],
    t: [["À propos", "/a-propos"], ["Le Takaful expliqué", "/takaful"], ["Sinistres", "/sinistres"], ["Partenaires & courtiers", "/partenaires"], ["Guides & articles", "/blog"], ["Questions fréquentes", "/faq"]],
    phone: "Standard", waB2C: "WhatsApp particuliers", waB2B: "WhatsApp entreprises",
    legal: "Tamini Insurance SA · Djibouti", privacy: "Confidentialité", complaints: "Réclamations", follow: "Suivez-nous",
  },
  en: {
    tagline: "Solidarity today, serenity tomorrow.",
    about: "Tamini Insurance SA is the first licensed Takaful insurance company in the Republic of Djibouti and a member of Salaam Group. Regulated by ARSD, Djibouti's insurance regulator.",
    colP: "Individuals", colE: "Business", colT: "Tamini", colC: "Contact & branches",
    p: [["Motor", "/particuliers/auto"], ["Home", "/particuliers/habitation"], ["Travel", "/particuliers/voyage"], ["Education", "/particuliers/education"], ["Personal accident", "/particuliers/accidents"]],
    e: [["Solutions by sector", "/entreprises/solutions"], ["Multi-risk", "/entreprises/multirisque"], ["General liability", "/entreprises/rc"], ["Marine & cargo", "/entreprises/maritime"], ["Motor fleet", "/entreprises/flotte"], ["Construction", "/entreprises/chantier"], ["Performance bond", "/entreprises/bond"]],
    t: [["About us", "/a-propos"], ["Takaful explained", "/takaful"], ["Claims", "/sinistres"], ["Partners & brokers", "/partenaires"], ["Guides & articles", "/blog"], ["FAQ", "/faq"]],
    phone: "Switchboard", waB2C: "WhatsApp individuals", waB2B: "WhatsApp business",
    legal: "Tamini Insurance SA · Djibouti", privacy: "Privacy", complaints: "Complaints", follow: "Follow us",
  },
  ar: {
    tagline: "تضامن اليوم، طمأنينة الغد.",
    about: "تأميني (Tamini Insurance SA) هي أول شركة تأمين تكافلي مرخصة في جمهورية جيبوتي، وعضو في مجموعة سلام. نشاطها خاضع لرقابة ARSD.",
    colP: "الأفراد", colE: "الشركات", colT: "تأميني", colC: "الاتصال والوكالات",
    p: [["السيارات", "/particuliers/auto"], ["المسكن", "/particuliers/habitation"], ["السفر", "/particuliers/voyage"], ["التعليم", "/particuliers/education"], ["الحوادث الشخصية", "/particuliers/accidents"]],
    e: [["حلول حسب القطاع", "/entreprises/solutions"], ["متعدد المخاطر", "/entreprises/multirisque"], ["المسؤولية المدنية", "/entreprises/rc"], ["البحري والبضائع", "/entreprises/maritime"], ["الأسطول", "/entreprises/flotte"], ["المقاولات", "/entreprises/chantier"], ["حسن التنفيذ", "/entreprises/bond"]],
    t: [["من نحن", "/a-propos"], ["شرح التكافل", "/takaful"], ["المطالبات", "/sinistres"], ["الشركاء والوسطاء", "/partenaires"], ["أدلة ومقالات", "/blog"], ["الأسئلة الشائعة", "/faq"]],
    phone: "الهاتف", waB2C: "واتساب الأفراد", waB2B: "واتساب الشركات",
    legal: "Tamini Insurance SA · جيبوتي", privacy: "الخصوصية", complaints: "الشكاوى", follow: "تابعونا",
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = F[lang] || F.fr;
  const year = 2026;
  const Col = ({ title, items }) => (
    <div>
      <h2>{title}</h2>
      <ul>{items.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand" style={{ marginBottom: 14 }}>
              <img src="/images/logo.png" alt="" width="42" height="42" loading="lazy" />
              <span><b style={{ color: "#fff" }}>TAMINI</b><small style={{ color: "var(--lime)" }}>INSURANCE SA</small></span>
            </Link>
            <p style={{ fontStyle: "italic", color: "#fff", margin: "12px 0" }}>{t.tagline}</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>{t.about}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }} aria-label={t.follow}>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn btn-sm btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>Facebook</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-sm btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>LinkedIn</a>
            </div>
          </div>
          <Col title={t.colP} items={t.p} />
          <Col title={t.colE} items={t.e} />
          <Col title={t.colT} items={t.t} />
          <div>
            <h2>{t.colC}</h2>
            <ul>
              <li>{t.phone} : <a href={`tel:${PHONE.intl}`} data-cta="footer_phone">{PHONE.label}</a></li>
              <li>{t.waB2C} : <a href={wa(WA_B2C.number)} target="_blank" rel="noopener noreferrer" data-cta="footer_wa_b2c">{WA_B2C.display}</a></li>
              <li>{t.waB2B} : <a href={wa(WA_B2B.number)} target="_blank" rel="noopener noreferrer" data-cta="footer_wa_b2b">{WA_B2B.display}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              {AGENCIES.map((a) => <li key={a.id}><Link to="/agences">{a.name[lang] || a.name.fr}</Link></li>)}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 40, paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", fontSize: 13 }}>
          <span>© {year} {t.legal}</span>
          <span style={{ display: "flex", gap: 16 }}>
            <Link to="/confidentialite">{t.privacy}</Link>
            <Link to="/contact#reclamations">{t.complaints}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

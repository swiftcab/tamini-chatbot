import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo, { breadcrumbSchema, SITE_URL } from "../seo/Seo";
import { AGENCIES, PHONE, WA_B2C, wa } from "../config/site";

const T = {
  fr: { seoT: "Agences Tamini Insurance à Djibouti : adresses et itinéraires", seoD: "Trouvez une agence Tamini Insurance à Djibouti : siège Place du 27 Juin, agence Salaam Bank Bawadi Mall, agence Salaam Elite Gabode 5. Itinéraires, téléphone, WhatsApp.", eye: "Nos agences", h1: "Trouver une agence Tamini à Djibouti", sub: "Souscrire un contrat, déposer un dossier sinistre, poser une question : nos conseillers vous accueillent dans trois agences.", dir: "Ouvrir l'itinéraire", call: "Appeler", wa: "Écrire sur WhatsApp", before: "Avant de vous déplacer", tips: ["Pour un devis, envoyez d'abord vos informations par le formulaire en ligne : votre conseiller aura préparé votre dossier.", "Pour un sinistre, munissez-vous de votre numéro de contrat et des photos des dommages.", "Les horaires d'ouverture vous sont confirmés par téléphone au " + PHONE.display + "."], home: "Accueil", services: "Services" },
  en: { seoT: "Tamini Insurance branches in Djibouti: addresses and directions", seoD: "Find a Tamini Insurance branch in Djibouti: head office Place du 27 Juin, Salaam Bank Bawadi Mall branch, Salaam Elite Gabode 5 branch. Directions, phone, WhatsApp.", eye: "Our branches", h1: "Find a Tamini branch in Djibouti", sub: "Buy a policy, file a claim, ask a question: our advisors welcome you in three branches.", dir: "Open directions", call: "Call", wa: "WhatsApp us", before: "Before you visit", tips: ["For a quote, first send your details through the online form: your advisor will have your file ready.", "For a claim, bring your policy number and photos of the damage.", "Opening hours are confirmed by phone on " + PHONE.display + "."], home: "Home", services: "Services" },
  ar: { seoT: "وكالات تأميني في جيبوتي: العناوين والاتجاهات", seoD: "اعثروا على وكالة تأميني في جيبوتي: المقر في ساحة 27 يونيو، وكالة بنك سلام في بوادي مول، وكالة سلام إيليت في غابود 5.", eye: "وكالاتنا", h1: "ابحثوا عن وكالة تأميني في جيبوتي", sub: "اكتتاب عقد، إيداع ملف مطالبة، طرح سؤال: يستقبلكم مستشارونا في ثلاث وكالات.", dir: "فتح الاتجاهات", call: "اتصل", wa: "راسلنا على واتساب", before: "قبل الزيارة", tips: ["لعرض سعر، أرسلوا معلوماتكم أولاً عبر النموذج الإلكتروني ليجهّز مستشاركم ملفكم.", "للمطالبة، أحضروا رقم العقد وصور الأضرار.", "تُؤكد أوقات العمل عبر الهاتف على " + PHONE.display + "."], home: "الرئيسية", services: "الخدمات" },
};

export default function Agences() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...AGENCIES.map((a) => ({ "@type": "InsuranceAgency", "@id": `${SITE_URL}/agences#${a.id}`, name: `Tamini Insurance — ${a.name.fr}`, address: { "@type": "PostalAddress", streetAddress: a.place.fr, addressLocality: "Djibouti", addressCountry: "DJ" }, telephone: PHONE.intl, url: `${SITE_URL}/agences`, hasMap: a.maps, parentOrganization: { "@type": "Organization", name: "Tamini Insurance SA" } })),
      { ...breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.eye, path: "/agences" }]), "@context": undefined },
    ],
  };
  return (
    <>
      <Seo title={t.seoT} description={t.seoD} path="/agences" schema={schema} image="/images/facade.webp" />
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs"><Link to="/">{t.home}</Link> / {t.eye}</nav>
          <span className="eyebrow">{t.eye}</span>
          <h1>{t.h1}</h1>
          <p className="lead">{t.sub}</p>
        </div>
      </section>
      <section className="section-sm">
        <div className="container grid g3">
          {AGENCIES.map((a, i) => (
            <article key={a.id} id={a.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
              {i === 0 && <img src="/images/facade.webp" alt={lang === "fr" ? "Façade du siège de Tamini Insurance, Place du 27 Juin" : "Tamini Insurance head office"} width="1400" height="933" loading="lazy" style={{ aspectRatio: "16/9", objectFit: "cover", width: "100%" }} />}
              <div style={{ padding: 22 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 20 }}>{a.name[lang] || a.name.fr}</h2>
                <p style={{ color: "var(--ink)", fontWeight: 600 }}>{a.place[lang] || a.place.fr}</p>
                <p>{t.services} : {a.note[lang] || a.note.fr}</p>
                {a.hours && <p>{a.hours[lang] || a.hours.fr}</p>}
                <div className="btn-row" style={{ marginTop: 14 }}>
                  <a className="btn btn-navy btn-sm" href={a.maps} target="_blank" rel="noopener noreferrer">{t.dir}</a>
                  <a className="btn btn-ghost btn-sm" href={`tel:${PHONE.intl}`} data-cta={`agence_${a.id}_phone`}>{t.call}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-sm bg-cream">
        <div className="container narrow">
          <h2 className="h-md">{t.before}</h2>
          <ul className="prose" style={{ fontSize: 16 }}>{t.tips.map((x) => <li key={x}>{x}</li>)}</ul>
          <a className="btn btn-wa" href={wa(WA_B2C.number, lang === "fr" ? "Bonjour Tamini, je souhaite passer en agence." : "Hello Tamini, I'd like to visit a branch.")} target="_blank" rel="noopener noreferrer" data-cta="agences_wa">{t.wa} · {WA_B2C.display}</a>
        </div>
      </section>
    </>
  );
}

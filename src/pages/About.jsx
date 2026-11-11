import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo, { breadcrumbSchema, organizationSchema } from "../seo/Seo";
import { REGIONS } from "../config/site";
import { CLAIMS_RATE } from "../config/compliance";

const T = {
  fr: {
    seoT: "À propos de Tamini Insurance : 1re assurance Takaful de Djibouti", seoD: "Tamini Insurance SA, première compagnie d'assurance Takaful agréée à Djibouti depuis 2020, membre du groupe Salaam : mission, gouvernance Charia, présence régionale.",
    eye: "À propos", h1: "Tamini, l'assurance solidaire de Djibouti", sub: "Créée en 2020, Tamini Insurance SA est la première compagnie d'assurance Takaful agréée en République de Djibouti. Notre mission : protéger les familles et les entreprises avec une assurance éthique, transparente et proche de vous.",
    facts: [["2020", "Création et agrément"], ["1re", "Assurance Takaful agréée à Djibouti"], ["11", "Solutions particuliers et entreprises"], ["4", "Pays où le groupe est présent"]],
    missionH: "Ce qui nous guide", values: [["Éthique", "Une assurance conforme à la Charia, sans intérêt ni spéculation, contrôlée par un comité Charia."], ["Protection", "Des garanties claires, adaptées aux réalités de Djibouti : le port, le corridor, les chantiers, les familles."], ["Proximité", "Des conseillers joignables en agence, par téléphone et sur WhatsApp, en français, en arabe et en anglais."]],
    govH: "Gouvernance et conformité", gov: ["**Agrément** : Tamini exerce sous le contrôle de l'ARSD, l'autorité de régulation des assurances à Djibouti.", "**Comité Charia** : il valide la conformité des produits, des placements et du partage de l'excédent. Les produits Tamini sont certifiés conformes à la Charia (Al-Azhar).", "**Modèle hybride Wakala / Mudaraba** : Tamini gère le fonds des participants pour leur compte, contre une rémunération définie à l'avance, et partage le rendement des placements.", "**Réassurance** : les risques importants sont réassurés auprès de partenaires de réassurance internationaux."],
    grpH: "Le groupe Salaam en Afrique de l'Est", grpP: "Tamini est membre du groupe Salaam, présent dans la Corne de l'Afrique et en Afrique de l'Est.",
    ctaH: "Travailler avec Tamini", cta1: "Assurances entreprises", cta2: "Devenir partenaire", home: "Accueil",
  },
  en: {
    seoT: "About Tamini Insurance: Djibouti's first Takaful insurer", seoD: "Tamini Insurance SA, Djibouti's first licensed Takaful insurance company since 2020 and a member of Salaam Group: mission, Sharia governance, regional presence.",
    eye: "About us", h1: "Tamini, Djibouti's solidarity insurer", sub: "Founded in 2020, Tamini Insurance SA is the first licensed Takaful insurance company in the Republic of Djibouti. Our mission: protect families and businesses with ethical, transparent insurance close to you.",
    facts: [["2020", "Founded and licensed"], ["1st", "Licensed Takaful insurer in Djibouti"], ["11", "Personal and business solutions"], ["4", "Countries where the group operates"]],
    missionH: "What guides us", values: [["Ethics", "Sharia-compliant insurance, with no interest or speculation, overseen by a Sharia committee."], ["Protection", "Clear cover suited to Djibouti's realities: the port, the corridor, construction sites, families."], ["Proximity", "Advisors available in branch, by phone and on WhatsApp, in French, Arabic and English."]],
    govH: "Governance and compliance", gov: ["**Licence**: Tamini operates under the supervision of ARSD, Djibouti's insurance regulator.", "**Sharia committee**: it validates products, investments and surplus sharing. Tamini's products are certified Sharia-compliant (Al-Azhar).", "**Hybrid Wakala / Mudaraba model**: Tamini manages the participants' fund on their behalf for a fee set in advance, and shares investment returns.", "**Reinsurance**: large risks are reinsured with international reinsurance partners."],
    grpH: "Salaam Group in East Africa", grpP: "Tamini is a member of Salaam Group, present in the Horn of Africa and East Africa.",
    ctaH: "Work with Tamini", cta1: "Business insurance", cta2: "Become a partner", home: "Home",
  },
  ar: {
    seoT: "عن تأميني: أول شركة تأمين تكافلي في جيبوتي", seoD: "تأميني (Tamini Insurance SA)، أول شركة تأمين تكافلي مرخصة في جيبوتي منذ 2020، عضو في مجموعة سلام: الرسالة، الحوكمة الشرعية، الحضور الإقليمي.",
    eye: "من نحن", h1: "تأميني، التأمين التضامني في جيبوتي", sub: "تأسست تأميني عام 2020 وهي أول شركة تأمين تكافلي مرخصة في جمهورية جيبوتي. رسالتنا: حماية العائلات والشركات بتأمين أخلاقي وشفاف وقريب منكم.",
    facts: [["2020", "التأسيس والترخيص"], ["الأولى", "شركة تكافل مرخصة في جيبوتي"], ["11", "حلاً للأفراد والشركات"], ["4", "دول تنشط فيها المجموعة"]],
    missionH: "ما يوجّهنا", values: [["الأخلاق", "تأمين متوافق مع الشريعة، بلا فائدة ولا مضاربة، تحت إشراف هيئة شرعية."], ["الحماية", "تغطيات واضحة تناسب واقع جيبوتي: الميناء، الممر، الورش، العائلات."], ["القرب", "مستشارون متاحون في الوكالة وبالهاتف وعلى واتساب، بالفرنسية والعربية والإنجليزية."]],
    govH: "الحوكمة والامتثال", gov: ["**الترخيص**: تعمل تأميني تحت رقابة ARSD، هيئة تنظيم التأمين في جيبوتي.", "**الهيئة الشرعية**: تعتمد المنتجات والاستثمارات وتوزيع الفائض. منتجات تأميني معتمدة شرعياً (الأزهر).", "**نموذج هجين وكالة/مضاربة**: تدير تأميني صندوق المشتركين لحسابهم مقابل أجر محدد مسبقاً، وتتقاسم عوائد الاستثمار.", "**إعادة التأمين**: يُعاد تأمين المخاطر الكبيرة لدى شركاء دوليين في إعادة التأمين."],
    grpH: "مجموعة سلام في شرق أفريقيا", grpP: "تأميني عضو في مجموعة سلام الحاضرة في القرن الأفريقي وشرق أفريقيا.",
    ctaH: "العمل مع تأميني", cta1: "تأمينات الشركات", cta2: "كن شريكاً", home: "الرئيسية",
  },
};

const md = (s) => s.split(/\*\*(.+?)\*\*/).map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p));

export default function About() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const schema = { "@context": "https://schema.org", "@graph": [{ ...organizationSchema, "@context": undefined }, { ...breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.eye, path: "/a-propos" }]), "@context": undefined }] };
  return (
    <>
      <Seo title={t.seoT} description={t.seoD} path="/a-propos" schema={schema} image="/images/facade.webp" />
      <section className="page-hero">
        <div className="container grid g2" style={{ alignItems: "center", gap: 40 }}>
          <div>
            <nav className="crumbs"><Link to="/">{t.home}</Link> / {t.eye}</nav>
            <span className="eyebrow">{t.eye}</span>
            <h1>{t.h1}</h1>
            <p className="lead">{t.sub}</p>
          </div>
          <img src="/images/facade.webp" alt={lang === "fr" ? "Siège de Tamini Insurance à Djibouti" : "Tamini Insurance head office in Djibouti"} width="1400" height="933" style={{ borderRadius: "var(--radius-xl)", aspectRatio: "4/3", objectFit: "cover" }} />
        </div>
      </section>
      <section className="section-sm">
        <div className="container stats" style={{ borderTop: 0, marginTop: 0 }}>
          {t.facts.map(([v, l]) => <div className="stat" key={l}><b>{v}</b><span>{l}</span></div>)}
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <h2 className="h-lg">{t.missionH}</h2>
          <div className="grid g3" style={{ marginTop: 20 }}>{t.values.map(([h, p]) => <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container narrow">
          <h2 className="h-lg">{t.govH}</h2>
          <ul className="prose" style={{ fontSize: 16 }}>{t.gov.map((g) => <li key={g}>{md(g)}</li>)}</ul>
          {CLAIMS_RATE.show && <p className="callout">{lang === "fr" ? `Sinistres : ${CLAIMS_RATE.tamini} % des dossiers réglés, contre environ ${CLAIMS_RATE.market} % en moyenne sur le marché.` : lang === "en" ? `Claims: ${CLAIMS_RATE.tamini}% of files settled, versus about ${CLAIMS_RATE.market}% market average.` : `المطالبات: ${CLAIMS_RATE.tamini}% من الملفات مسوّاة مقابل حوالي ${CLAIMS_RATE.market}% في السوق.`}</p>}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="h-lg">{t.grpH}</h2>
          <p className="lead">{t.grpP}</p>
          <div className="grid g4" style={{ marginTop: 20 }}>{REGIONS.map((r) => <div className="card" key={r.code}><h3>{r.name[lang] || r.name.fr}</h3><p>{r.entity[lang] || r.entity.fr}</p></div>)}</div>
        </div>
      </section>
      <section className="section-sm bg-navy">
        <div className="container center">
          <h2 className="h-lg">{t.ctaH}</h2>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 16 }}>
            <Link to="/entreprises/solutions" className="btn btn-lime">{t.cta1}</Link>
            <Link to="/partenaires" className="btn btn-ghost">{t.cta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

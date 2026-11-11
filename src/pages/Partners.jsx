import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo, { breadcrumbSchema } from "../seo/Seo";
import { EMAIL, WA_B2B, wa } from "../config/site";

const T = {
  fr: {
    seoT: "Partenaires, courtiers et apporteurs d'affaires | Tamini Insurance Djibouti", seoD: "Courtiers, agents, banques, entreprises et partenaires institutionnels : travaillez avec Tamini, première assurance Takaful agréée à Djibouti. Contact dédié.",
    eye: "Partenaires", h1: "Travaillons ensemble", sub: "Courtiers, banques, entreprises, institutions : Tamini développe le Takaful à Djibouti et dans la région avec des partenaires de confiance.",
    seg: [["Courtiers et agents", "Accès à toute la gamme particuliers et entreprises, accompagnement technique sur les risques complexes (maritime, chantier, garanties de marchés)."], ["Banques et bancassurance", "Des solutions Takaful pour vos clients particuliers et entreprises, déjà proposées dans les agences Salaam Bank."], ["Entreprises et associations", "Contrats groupe pour vos équipes et vos flottes, avec un interlocuteur unique."], ["Réassureurs et investisseurs", "Informations institutionnelles et techniques sur demande, via la direction du développement."]],
    whyH: "Pourquoi Tamini", why: ["Première compagnie d'assurance Takaful agréée à Djibouti.", "Membre du groupe Salaam, présent à Djibouti, au Somaliland, au Kenya et en Ouganda.", "Expertise des risques de la Corne de l'Afrique : port, corridor, zones franches, grands chantiers."],
    ctaH: "Parlons de votre projet", ctaP: "Présentez votre activité et votre besoin ; un responsable vous recontacte.", wa: "Écrire au conseiller entreprises", mail: "Écrire par e-mail", msg: "Bonjour Tamini, je souhaite discuter d'un partenariat.", home: "Accueil",
  },
  en: {
    seoT: "Partners, brokers and introducers | Tamini Insurance Djibouti", seoD: "Brokers, agents, banks, companies and institutional partners: work with Tamini, Djibouti's first licensed Takaful insurer. Dedicated contact.",
    eye: "Partners", h1: "Let's work together", sub: "Brokers, banks, companies, institutions: Tamini is growing Takaful in Djibouti and the region with trusted partners.",
    seg: [["Brokers and agents", "Access to the full personal and business range, technical support on complex risks (marine, construction, bonds)."], ["Banks and bancassurance", "Takaful solutions for your retail and business clients, already offered in Salaam Bank branches."], ["Companies and associations", "Group policies for your teams and fleets, with a single contact."], ["Reinsurers and investors", "Institutional and technical information on request, through the business development department."]],
    whyH: "Why Tamini", why: ["Djibouti's first licensed Takaful insurer.", "Member of Salaam Group, present in Djibouti, Somaliland, Kenya and Uganda.", "Expertise in Horn of Africa risks: port, corridor, free zones, major projects."],
    ctaH: "Let's discuss your project", ctaP: "Tell us about your business and needs; a manager will get back to you.", wa: "Message the business advisor", mail: "Send an email", msg: "Hello Tamini, I'd like to discuss a partnership.", home: "Home",
  },
  ar: {
    seoT: "الشركاء والوسطاء | تأميني جيبوتي", seoD: "وسطاء، وكلاء، بنوك، شركات وشركاء مؤسسيون: اعملوا مع تأميني، أول شركة تكافل مرخصة في جيبوتي.",
    eye: "الشركاء", h1: "لنعمل معاً", sub: "وسطاء، بنوك، شركات، مؤسسات: تطوّر تأميني التكافل في جيبوتي والمنطقة مع شركاء موثوقين.",
    seg: [["الوسطاء والوكلاء", "الوصول إلى كامل منتجات الأفراد والشركات، ودعم فني للمخاطر المعقدة."], ["البنوك والتأمين المصرفي", "حلول تكافلية لعملائكم، متوفرة في وكالات بنك سلام."], ["الشركات والجمعيات", "عقود جماعية لفرقكم وأساطيلكم مع محاور واحد."], ["معيدو التأمين والمستثمرون", "معلومات مؤسسية وفنية عند الطلب عبر إدارة التطوير."]],
    whyH: "لماذا تأميني", why: ["أول شركة تأمين تكافلي مرخصة في جيبوتي.", "عضو في مجموعة سلام الحاضرة في جيبوتي وصوماليلاند وكينيا وأوغندا.", "خبرة في مخاطر القرن الأفريقي: الميناء، الممر، المناطق الحرة، المشاريع الكبرى."],
    ctaH: "لنتحدث عن مشروعكم", ctaP: "عرّفونا بنشاطكم وحاجتكم وسيتواصل معكم مسؤول.", wa: "راسل مستشار الشركات", mail: "أرسل بريداً", msg: "مرحباً تأميني، أود مناقشة شراكة.", home: "الرئيسية",
  },
};

export default function Partners() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  return (
    <>
      <Seo title={t.seoT} description={t.seoD} path="/partenaires" schema={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.eye, path: "/partenaires" }])} image="/images/photo-handshake.webp" />
      <section className="page-hero">
        <div className="container grid g2" style={{ alignItems: "center", gap: 40 }}>
          <div>
            <nav className="crumbs"><Link to="/">{t.home}</Link> / {t.eye}</nav>
            <span className="eyebrow">{t.eye}</span>
            <h1>{t.h1}</h1>
            <p className="lead">{t.sub}</p>
          </div>
          <img src="/images/photo-handshake.webp" alt="" width="1400" height="935" style={{ borderRadius: "var(--radius-xl)", aspectRatio: "4/3", objectFit: "cover" }} />
        </div>
      </section>
      <section className="section-sm">
        <div className="container grid g2">{t.seg.map(([h, p]) => <div className="card" key={h}><h2 style={{ fontFamily: "var(--sans)", fontSize: 19 }}>{h}</h2><p>{p}</p></div>)}</div>
      </section>
      <section className="section-sm bg-cream">
        <div className="container narrow">
          <h2 className="h-lg">{t.whyH}</h2>
          <ul className="prose" style={{ fontSize: 16 }}>{t.why.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      </section>
      <section className="section-sm bg-navy">
        <div className="container center">
          <h2 className="h-lg">{t.ctaH}</h2>
          <p className="lead">{t.ctaP}</p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 16 }}>
            <a className="btn btn-lime" href={wa(WA_B2B.number, t.msg)} target="_blank" rel="noopener noreferrer" data-cta="partners_wa">{t.wa} · {WA_B2B.display}</a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}?subject=Partenariat`}>{t.mail}</a>
          </div>
        </div>
      </section>
    </>
  );
}

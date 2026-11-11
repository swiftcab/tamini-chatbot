import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { useFunnel } from "../funnel/FunnelContext";
import Seo, { breadcrumbSchema, faqSchema } from "../seo/Seo";

const T = {
  fr: {
    seoT: "Takaful à Djibouti : l'assurance islamique expliquée | Tamini", seoD: "Comment fonctionne l'assurance Takaful à Djibouti : fonds des participants, Wakala et Mudaraba, excédent partagé, comité Charia. Tamini, première assurance Takaful agréée.",
    eye: "Le Takaful", h1: "Le Takaful, l'assurance islamique expliquée simplement", sub: "Une assurance fondée sur l'entraide : les participants alimentent un fonds commun, Tamini le gère pour leur compte, et l'excédent éventuel est partagé.",
    howH: "Comment ça fonctionne", how: [["Vous contribuez", "Votre contribution rejoint le fonds des participants, séparé des fonds de l'opérateur."], ["Tamini gère le fonds", "Contre une rémunération définie à l'avance (Wakala), et en partageant le rendement des placements (Mudaraba)."], ["Le fonds indemnise", "Les participants touchés par un sinistre sont indemnisés selon leur contrat."], ["L'excédent est partagé", "S'il reste un excédent en fin d'exercice, une partie revient aux participants éligibles."]],
    cmpH: "Takaful ou assurance classique ?", cmp: [["Relation", "Achat d'une protection", "Participation à un fonds solidaire"], ["Propriété du fonds", "La compagnie", "Les participants"], ["Résultat positif", "Profit de la compagnie", "Excédent partageable"], ["Placements", "Y compris à intérêt", "Conformes à la Charia"], ["Contrôle éthique", "Non", "Comité Charia"]], cmpCols: ["", "Assurance classique", "Takaful"],
    prH: "Trois principes respectés", pr: [["Pas de Riba", "Aucun intérêt dans les placements du fonds."], ["Pas de Gharar excessif", "Règles du fonds, frais et partage fixés à l'avance."], ["Pas de Maysir", "La contribution est un acte de solidarité, pas un pari."]],
    faqH: "Questions fréquentes", faq: [["Le Takaful est-il réservé aux musulmans ?", "Non. Il est ouvert à toute personne et à toute entreprise."], ["Le Takaful est-il plus cher que l'assurance classique ?", "Non par principe : le prix dépend du risque assuré. La différence porte sur la structure du contrat et le partage de l'excédent."], ["Qui contrôle la conformité ?", "Un comité Charia valide les produits, les placements et le partage de l'excédent ; l'ARSD contrôle l'activité d'assurance."], ["Quels produits sont proposés en Takaful ?", "Automobile, habitation, voyage, éducation, accidents ; et pour les entreprises multirisque, responsabilité civile, maritime, flotte, chantier et garanties de marchés."]],
    readH: "Pour aller plus loin", read: [["Takaful : définition et fonctionnement", "/blog/takaful-definition-fonctionnement"]],
    cta: "Demander un devis Takaful", home: "Accueil",
  },
  en: {
    seoT: "Takaful in Djibouti: Islamic insurance explained | Tamini", seoD: "How Takaful insurance works in Djibouti: participants' fund, Wakala and Mudaraba, shared surplus, Sharia committee. Tamini, the first licensed Takaful insurer.",
    eye: "Takaful", h1: "Takaful, Islamic insurance explained simply", sub: "Insurance built on mutual help: participants feed a common fund, Tamini manages it on their behalf, and any surplus is shared.",
    howH: "How it works", how: [["You contribute", "Your contribution joins the participants' fund, kept apart from the operator's funds."], ["Tamini manages the fund", "For a fee set in advance (Wakala), sharing investment returns (Mudaraba)."], ["The fund compensates", "Participants affected by a loss are compensated under their policy."], ["The surplus is shared", "If a surplus remains at year end, part of it returns to eligible participants."]],
    cmpH: "Takaful or conventional insurance?", cmp: [["Relationship", "Buying protection", "Joining a solidarity fund"], ["Fund ownership", "The company", "The participants"], ["Positive result", "Company profit", "Shareable surplus"], ["Investments", "Including interest-bearing", "Sharia-compliant"], ["Ethical oversight", "No", "Sharia committee"]], cmpCols: ["", "Conventional", "Takaful"],
    prH: "Three principles", pr: [["No Riba", "No interest in the fund's investments."], ["No excessive Gharar", "Fund rules, fees and sharing set in advance."], ["No Maysir", "Contributing is an act of solidarity, not a bet."]],
    faqH: "FAQ", faq: [["Is Takaful only for Muslims?", "No. It is open to everyone, individuals and businesses."], ["Is Takaful more expensive?", "Not by principle: price depends on the risk. The difference lies in the contract structure and surplus sharing."], ["Who checks compliance?", "A Sharia committee validates products, investments and surplus sharing; ARSD supervises the insurance business."], ["Which covers are available?", "Motor, home, travel, education, accident; and for businesses multi-risk, liability, marine, fleet, construction and performance bonds."]],
    readH: "Read more", read: [["Takaful: definition and how it works (FR)", "/blog/takaful-definition-fonctionnement"]],
    cta: "Get a Takaful quote", home: "Home",
  },
  ar: {
    seoT: "التكافل في جيبوتي: شرح التأمين الإسلامي | تأميني", seoD: "كيف يعمل التأمين التكافلي في جيبوتي: صندوق المشتركين، الوكالة والمضاربة، الفائض المُشارك، الهيئة الشرعية. تأميني، أول شركة تكافل مرخصة.",
    eye: "التكافل", h1: "التكافل: التأمين الإسلامي بشرح بسيط", sub: "تأمين قائم على التعاون: يغذي المشتركون صندوقاً مشتركاً، وتديره تأميني لحسابهم، ويُشارك الفائض إن وُجد.",
    howH: "كيف يعمل", how: [["تساهمون", "تنضم مساهمتكم إلى صندوق المشتركين المنفصل عن أموال المشغّل."], ["تأميني تدير الصندوق", "مقابل أجر محدد مسبقاً (وكالة) مع تقاسم عوائد الاستثمار (مضاربة)."], ["الصندوق يعوّض", "يُعوَّض المشتركون المتضررون وفق عقودهم."], ["يُشارك الفائض", "إذا تبقى فائض في نهاية السنة يعود جزء منه للمشتركين المؤهلين."]],
    cmpH: "التكافل أم التأمين التقليدي؟", cmp: [["العلاقة", "شراء حماية", "المشاركة في صندوق تضامني"], ["ملكية الصندوق", "الشركة", "المشتركون"], ["النتيجة الإيجابية", "ربح الشركة", "فائض قابل للتوزيع"], ["الاستثمارات", "بما فيها الربوية", "متوافقة مع الشريعة"], ["الرقابة الأخلاقية", "لا", "هيئة شرعية"]], cmpCols: ["", "التقليدي", "التكافل"],
    prH: "ثلاثة مبادئ", pr: [["لا ربا", "لا فائدة في استثمارات الصندوق."], ["لا غرر فاحش", "قواعد الصندوق والأجور والتوزيع محددة مسبقاً."], ["لا ميسر", "المساهمة عمل تضامني وليست رهاناً."]],
    faqH: "أسئلة شائعة", faq: [["هل التكافل خاص بالمسلمين؟", "لا، هو مفتوح للجميع أفراداً وشركات."], ["هل التكافل أغلى؟", "ليس من حيث المبدأ: السعر يعتمد على الخطر. الفرق في بنية العقد وتوزيع الفائض."], ["من يراقب الامتثال؟", "هيئة شرعية تعتمد المنتجات والاستثمارات وتوزيع الفائض، وتراقب ARSD نشاط التأمين."], ["ما المنتجات المتاحة؟", "السيارات، المسكن، السفر، التعليم، الحوادث، وللشركات متعدد المخاطر والمسؤولية والبحري والأسطول والمقاولات وضمانات الصفقات."]],
    readH: "للمزيد", read: [["التكافل: التعريف وطريقة العمل (بالفرنسية)", "/blog/takaful-definition-fonctionnement"]],
    cta: "اطلب عرض سعر تكافلي", home: "الرئيسية",
  },
};

export default function TakafulPage() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const { openFunnel } = useFunnel();
  const faqItems = t.faq.map(([q, a]) => ({ q, a }));
  const schema = { "@context": "https://schema.org", "@graph": [{ ...faqSchema(faqItems), "@context": undefined }, { ...breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.eye, path: "/takaful" }]), "@context": undefined }] };
  return (
    <>
      <Seo title={t.seoT} description={t.seoD} path="/takaful" schema={schema} />
      <section className="page-hero">
        <div className="container narrow">
          <nav className="crumbs"><Link to="/">{t.home}</Link> / {t.eye}</nav>
          <span className="eyebrow">{t.eye}</span>
          <h1>{t.h1}</h1>
          <p className="lead">{t.sub}</p>
          <button type="button" className="btn btn-navy" style={{ marginTop: 12 }} onClick={() => openFunnel(null, "takaful_hero")}>{t.cta}</button>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <h2 className="h-lg">{t.howH}</h2>
          <div className="grid g4" style={{ marginTop: 20 }}>
            {t.how.map(([h, p], i) => <div className="card" key={h}><span className="step-n" style={{ color: "var(--navy)", marginBottom: 10 }}>{i + 1}</span><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section-sm bg-cream">
        <div className="container narrow">
          <h2 className="h-lg">{t.cmpH}</h2>
          <div className="prose" style={{ overflowX: "auto" }}>
            <table>
              <thead><tr>{t.cmpCols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
              <tbody>{t.cmp.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td><strong>{r[2]}</strong></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <h2 className="h-lg">{t.prH}</h2>
          <div className="grid g3" style={{ marginTop: 20 }}>{t.pr.map(([h, p]) => <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>
      <section className="section-sm bg-cream">
        <div className="container narrow">
          <h2 className="h-lg">{t.faqH}</h2>
          {faqItems.map((f) => <details key={f.q} className="faq"><summary>{f.q}</summary><div>{f.a}</div></details>)}
          <h2 className="h-md" style={{ marginTop: 30 }}>{t.readH}</h2>
          <ul>{t.read.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
        </div>
      </section>
    </>
  );
}

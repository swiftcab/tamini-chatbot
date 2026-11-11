import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { PRODUCTS, PARTICULIERS, ENTREPRISES } from "../i18n/products";
import { useFunnel } from "../funnel/FunnelContext";
import { SURPLUS, CLAIMS_RATE } from "../config/compliance";
import { AGENCIES, REGIONS, PHONE, WA_B2C, wa } from "../config/site";
import Seo, { organizationSchema } from "../seo/Seo";
import { PAGE_META } from "../seo/meta";
import { ARTICLES } from "../content/articles";

// Libellés courts des produits (repris du flyer Tamini, nov. 2026).
const SHORT = {
  fr: { auto: "Tous risques ou responsabilité civile", habitation: "Votre logement et vos biens protégés", voyage: "Assistance médicale à l'étranger", education: "La scolarité de vos enfants garantie", accidents: "Pour vous ou votre groupe", multirisque: "Vos locaux, équipements et stocks", rc: "Les dommages causés à un tiers", maritime: "Marchandises par mer, air et route", flotte: "Tous vos véhicules, un seul contrat", chantier: "Travaux et engins de chantier", bond: "La garantie de vos marchés" },
  en: { auto: "Comprehensive or third-party liability", habitation: "Your home and belongings protected", voyage: "Medical assistance abroad", education: "Your children's schooling secured", accidents: "For you or your team", multirisque: "Premises, equipment and stock", rc: "Damage caused to third parties", maritime: "Goods by sea, air and road", flotte: "All your vehicles, one policy", chantier: "Works and site machinery", bond: "Guarantees for your contracts" },
  ar: { auto: "شامل أو مسؤولية مدنية", habitation: "مسكنك وممتلكاتك محمية", voyage: "مساعدة طبية في الخارج", education: "تعليم أطفالك مضمون", accidents: "لك أو لمجموعتك", multirisque: "مقراتك ومعداتك ومخزونك", rc: "الأضرار التي تلحق بالغير", maritime: "البضائع بحراً وجواً وبراً", flotte: "كل مركباتك بعقد واحد", chantier: "الأشغال وآليات الورش", bond: "ضمان صفقاتك" },
};

const T = {
  fr: {
    eyebrow: "Première assurance Takaful agréée à Djibouti",
    h1a: "Votre famille, vos biens, votre avenir.", h1b: "Protégés ensemble.",
    sub: "Une assurance solidaire et conforme à la Charia : vos cotisations alimentent un fonds commun qui indemnise les membres, et l'excédent du fonds est partagé avec les participants éligibles.",
    cta1: "Demander un devis", cta2: "Parler à un conseiller", ctaNote: "Gratuit, sans engagement. Réponse par WhatsApp ou par téléphone.",
    badgeT: "Agréée par l'ARSD", badgeS: "Autorité de régulation des assurances de Djibouti",
    stats: [["2020", "Année de création"], ["4 pays", "Djibouti, Somaliland, Kenya, Ouganda"], ["11", "Assurances particuliers et entreprises"], [CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini} %` : "3", CLAIMS_RATE.show ? "Des dossiers sinistres réglés" : "Agences à Djibouti"]],
    quick: [["Obtenir un devis", "quote"], ["Déclarer un sinistre", "/sinistres#declarer"], ["Trouver une agence", "/agences"], ["Nous contacter", "/contact"]],
    pillars: [["Éthique", "Conforme à la Charia : sans intérêt, sans spéculation, sous la supervision d'un comité Charia."], ["Protection", "Des garanties adaptées à votre situation, expliquées clairement avant la signature."], ["Proximité", "Des conseillers à Djibouti, en agence, par téléphone et sur WhatsApp."]],
    solEye: "Nos solutions", solH: "Une assurance pour chaque besoin", forYou: "Pour vous et votre famille", forBiz: "Pour votre entreprise", seeAll: "Voir tout", sectors: "Solutions par secteur",
    takEye: "Le modèle Takaful", takH: "Le surplus vous revient", takSub: "Le Takaful n'est pas seulement une indemnisation : c'est un fonds solidaire géré pour le compte des participants.",
    takSteps: [["Vous cotisez dans un fonds solidaire", "Vos contributions sont mises en commun avec celles des autres participants."], ["Le fonds paie les sinistres", "Les membres touchés sont indemnisés selon leur contrat."], ["L'excédent est partagé", "S'il reste un excédent, une partie revient aux participants éligibles."]],
    surplusT: "Excédent redistribué (millions FDJ)", takMore: "Comprendre le Takaful",
    clEye: "Sinistres", clH: "Un sinistre ? Trois étapes, un interlocuteur.", clSteps: [["Déclarez", "Par WhatsApp, par téléphone ou en agence, avec les premiers éléments."], ["Constituez le dossier", "Nous vous indiquons la liste exacte des documents à fournir."], ["Suivez le règlement", "Un conseiller suit votre dossier jusqu'à l'indemnisation."]], clCta: "Déclarer un sinistre", clMore: "Comment nous réglons les sinistres",
    asEye: "Option", asH: "Assistance routière 24h/24, 7j/7", asP: "Panne ou accident : un numéro unique, de jour comme de nuit. L'assistance routière est une option à ajouter à votre assurance automobile ; elle n'est pas incluse par défaut.", asCta: "Ajouter l'option à mon devis", optLabel: "EN OPTION",
    regEye: "Présence régionale", regH: "Un groupe ancré dans la Corne de l'Afrique et en Afrique de l'Est",
    agEye: "Nos agences", agH: "Venez nous voir à Djibouti", agMap: "Itinéraire", agAll: "Toutes les agences et le contact",
    blogEye: "Guides pratiques", blogH: "Comprendre avant de choisir", blogAll: "Tous les guides",
    finalH: "Une question ? Un conseiller vous répond.", finalP: "Devis gratuit, explications claires, sans engagement.", finalCall: "Appeler le",
  },
  en: {
    eyebrow: "Djibouti's first licensed Takaful insurer",
    h1a: "Your family, your assets, your future.", h1b: "Protected together.",
    sub: "Solidarity-based, Sharia-compliant insurance: your contributions feed a common fund that compensates members, and the fund's surplus is shared with eligible participants.",
    cta1: "Get a quote", cta2: "Talk to an advisor", ctaNote: "Free, no commitment. Answer by WhatsApp or phone.",
    badgeT: "Licensed by ARSD", badgeS: "Djibouti's insurance regulatory authority",
    stats: [["2020", "Founded"], ["4 countries", "Djibouti, Somaliland, Kenya, Uganda"], ["11", "Personal and business covers"], [CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini}%` : "3", CLAIMS_RATE.show ? "Of claims files settled" : "Branches in Djibouti"]],
    quick: [["Get a quote", "quote"], ["Report a claim", "/sinistres#declarer"], ["Find a branch", "/agences"], ["Contact us", "/contact"]],
    pillars: [["Ethics", "Sharia-compliant: no interest, no speculation, overseen by a Sharia committee."], ["Protection", "Cover suited to your situation, explained clearly before you sign."], ["Proximity", "Advisors in Djibouti, in branch, by phone and on WhatsApp."]],
    solEye: "Our solutions", solH: "Cover for every need", forYou: "For you and your family", forBiz: "For your business", seeAll: "See all", sectors: "Solutions by sector",
    takEye: "The Takaful model", takH: "The surplus comes back to you", takSub: "Takaful is more than compensation: it is a solidarity fund managed on behalf of participants.",
    takSteps: [["You contribute to a solidarity fund", "Your contributions are pooled with those of other participants."], ["The fund pays claims", "Affected members are compensated under their policy."], ["The surplus is shared", "If a surplus remains, part of it returns to eligible participants."]],
    surplusT: "Surplus redistributed (million DJF)", takMore: "Understand Takaful",
    clEye: "Claims", clH: "A claim? Three steps, one contact.", clSteps: [["Report it", "By WhatsApp, phone or in branch, with the first details."], ["Build the file", "We tell you exactly which documents are needed."], ["Follow the settlement", "An advisor follows your file until payment."]], clCta: "Report a claim", clMore: "How we settle claims",
    asEye: "Option", asH: "24/7 roadside assistance", asP: "Breakdown or accident: one number, day or night. Roadside assistance is an option added to your motor insurance; it is not included by default.", asCta: "Add the option to my quote", optLabel: "OPTIONAL",
    regEye: "Regional presence", regH: "A group rooted in the Horn of Africa and East Africa",
    agEye: "Our branches", agH: "Visit us in Djibouti", agMap: "Directions", agAll: "All branches and contact",
    blogEye: "Practical guides", blogH: "Understand before you choose", blogAll: "All guides",
    finalH: "A question? An advisor will answer.", finalP: "Free quote, clear explanations, no commitment.", finalCall: "Call",
  },
  ar: {
    eyebrow: "أول شركة تأمين تكافلي مرخصة في جيبوتي",
    h1a: "عائلتك، ممتلكاتك، مستقبلك.", h1b: "محميّة معاً.",
    sub: "تأمين تضامني متوافق مع الشريعة: اشتراكاتكم تغذي صندوقاً مشتركاً يعوّض الأعضاء، ويُشارك فائض الصندوق مع المشتركين المؤهلين.",
    cta1: "اطلب عرض سعر", cta2: "تحدث إلى مستشار", ctaNote: "مجاناً وبدون التزام. الرد عبر واتساب أو الهاتف.",
    badgeT: "مرخصة من ARSD", badgeS: "هيئة تنظيم قطاع التأمين في جيبوتي",
    stats: [["2020", "سنة التأسيس"], ["4 دول", "جيبوتي، صوماليلاند، كينيا، أوغندا"], ["11", "تأمين للأفراد والشركات"], [CLAIMS_RATE.show ? `${CLAIMS_RATE.tamini}%` : "3", CLAIMS_RATE.show ? "من ملفات المطالبات مسوّاة" : "وكالات في جيبوتي"]],
    quick: [["اطلب عرض سعر", "quote"], ["صرّح بمطالبة", "/sinistres#declarer"], ["ابحث عن وكالة", "/agences"], ["اتصل بنا", "/contact"]],
    pillars: [["الأخلاق", "متوافق مع الشريعة: بلا فائدة ولا مضاربة، تحت إشراف هيئة شرعية."], ["الحماية", "تغطيات مناسبة لوضعكم، مشروحة بوضوح قبل التوقيع."], ["القرب", "مستشارون في جيبوتي، في الوكالة وبالهاتف وعلى واتساب."]],
    solEye: "حلولنا", solH: "تأمين لكل حاجة", forYou: "لك ولعائلتك", forBiz: "لشركتك", seeAll: "عرض الكل", sectors: "حلول حسب القطاع",
    takEye: "نموذج التكافل", takH: "الفائض يعود إليكم", takSub: "التكافل ليس مجرد تعويض: إنه صندوق تضامني يُدار لحساب المشتركين.",
    takSteps: [["تشتركون في صندوق تضامني", "تُجمع اشتراكاتكم مع اشتراكات المشتركين الآخرين."], ["الصندوق يدفع المطالبات", "يُعوَّض الأعضاء المتضررون وفق عقودهم."], ["يُشارك الفائض", "إذا تبقّى فائض، يعود جزء منه للمشتركين المؤهلين."]],
    surplusT: "الفائض الموزع (مليون فرنك)", takMore: "فهم التكافل",
    clEye: "المطالبات", clH: "مطالبة؟ ثلاث خطوات ومحاور واحد.", clSteps: [["صرّحوا", "عبر واتساب أو الهاتف أو في الوكالة مع المعلومات الأولى."], ["كوّنوا الملف", "نحدد لكم بدقة الوثائق المطلوبة."], ["تابعوا التسوية", "يتابع مستشار ملفكم حتى التعويض."]], clCta: "صرّح بمطالبة", clMore: "كيف نسوّي المطالبات",
    asEye: "خيار", asH: "مساعدة على الطريق 24/7", asP: "عطل أو حادث: رقم واحد ليلاً ونهاراً. مساعدة الطريق خيار يُضاف إلى تأمين السيارة وليست مشمولة تلقائياً.", asCta: "أضف الخيار إلى عرضي", optLabel: "خيار",
    regEye: "حضور إقليمي", regH: "مجموعة راسخة في القرن الأفريقي وشرق أفريقيا",
    agEye: "وكالاتنا", agH: "زورونا في جيبوتي", agMap: "الاتجاهات", agAll: "كل الوكالات ووسائل الاتصال",
    blogEye: "أدلة عملية", blogH: "افهم قبل أن تختار", blogAll: "كل الأدلة",
    finalH: "سؤال؟ مستشار يجيبكم.", finalP: "عرض سعر مجاني، شرح واضح، دون التزام.", finalCall: "اتصل على",
  },
};

const QI = [
  "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
];
const Svg = ({ d, s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;

export default function Home() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const sh = SHORT[lang] || SHORT.fr;
  const { openFunnel } = useFunnel();
  const meta = PAGE_META.home[lang] || PAGE_META.home.fr;
  const max = Math.max(...SURPLUS.series.map((d) => d.v));
  const articles = ARTICLES.slice(0, 3);

  const ProductList = ({ list }) => (
    <div className="grid" style={{ gap: 10 }}>
      {list.map((s) => (
        <Link key={s} to={`/${PRODUCTS[s].segment}/${s}`} className="card card-link" style={{ display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
          <img src={`/images/${PRODUCTS[s].card}.webp`} alt="" width="64" height="64" loading="lazy" style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover" }} />
          <span style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{PRODUCTS[s][lang].badge}</h3>
            <p>{sh[s]}{s === "auto" ? <> · <span className="tag-option">{t.optLabel}</span> {lang === "fr" ? "assistance 24/7" : lang === "en" ? "24/7 assistance" : "مساعدة 24/7"}</> : null}</p>
          </span>
          <span aria-hidden="true" style={{ color: "var(--lime-ink)", fontWeight: 800 }}>→</span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" image="/images/hero-auto.webp" schema={organizationSchema} />

      {/* 1. HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{t.eyebrow}</span>
              <h1>{t.h1a} <em>{t.h1b}</em></h1>
              <p className="lead">{t.sub}</p>
              <div className="btn-row" style={{ marginTop: 24 }}>
                <button type="button" className="btn btn-navy" onClick={() => openFunnel(null, "home_hero")}>{t.cta1} →</button>
                <a className="btn btn-ghost" href={wa(WA_B2C.number, lang === "fr" ? "Bonjour Tamini, je souhaite parler à un conseiller." : lang === "en" ? "Hello Tamini, I'd like to talk to an advisor." : "مرحباً تأميني، أريد التحدث إلى مستشار.")} target="_blank" rel="noopener noreferrer" data-cta="home_hero_advisor">{t.cta2}</a>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>{t.ctaNote}</p>
              <div className="stats">
                {t.stats.map(([v, l]) => <div className="stat" key={l}><b>{v}</b><span>{l}</span></div>)}
              </div>
            </div>
            <div className="hero-media">
              <img src="/images/hero-auto.webp" alt={lang === "fr" ? "Véhicule sur une route de Djibouti, assuré par Tamini" : "Vehicle on a road, insured by Tamini"} width="1024" height="1024" fetchpriority="high" />
              <div className="hero-badge">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--lime-ink)" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                <div><strong>{t.badgeT}</strong><span>{t.badgeS}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACTIONS RAPIDES */}
      <section className="bg-cream" style={{ paddingBottom: 48 }}>
        <div className="container">
          <nav className="quick" aria-label={lang === "fr" ? "Actions rapides" : "Quick actions"}>
            {t.quick.map(([l, to], i) => to === "quote"
              ? <button key={l} type="button" onClick={() => openFunnel(null, "home_quick")}><span className="ico"><Svg d={QI[i]} /></span>{l}</button>
              : <Link key={l} to={to}><span className="ico"><Svg d={QI[i]} /></span>{l}</Link>)}
          </nav>
        </div>
      </section>

      {/* 3. PILIERS */}
      <section className="section-sm">
        <div className="container grid g3">
          {t.pillars.map(([h, p], i) => (
            <div key={h} className="card" style={{ borderTop: `4px solid ${i === 1 ? "var(--lime)" : "var(--navy)"}` }}>
              <h3>{h}</h3><p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOLUTIONS */}
      <section className="section bg-cream">
        <div className="container">
          <span className="eyebrow">{t.solEye}</span>
          <h2 className="h-lg">{t.solH}</h2>
          <div className="grid g2" style={{ marginTop: 28, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <h3 className="h-md" style={{ margin: 0 }}>{t.forYou}</h3>
                <Link to="/particuliers" style={{ fontWeight: 700, color: "var(--lime-ink)" }}>{t.seeAll} →</Link>
              </div>
              <ProductList list={PARTICULIERS} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <h3 className="h-md" style={{ margin: 0 }}>{t.forBiz}</h3>
                <Link to="/entreprises/solutions" style={{ fontWeight: 700, color: "var(--lime-ink)" }}>{t.sectors} →</Link>
              </div>
              <ProductList list={ENTREPRISES} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TAKAFUL / SURPLUS */}
      <section className="section">
        <div className="container grid g2" style={{ alignItems: "center", gap: 48 }}>
          <div>
            <span className="eyebrow">{t.takEye}</span>
            <h2 className="h-lg">{t.takH}</h2>
            <p className="lead">{t.takSub}</p>
            <div className="steps" style={{ marginTop: 24, color: "var(--navy)" }}>
              {t.takSteps.map(([h, p], i) => (
                <div className="step" key={h}><span className="step-n">{i + 1}</span><div><h3>{h}</h3><p style={{ color: "var(--muted)" }}>{p}</p></div></div>
              ))}
            </div>
            <Link to="/takaful" className="btn btn-ghost" style={{ marginTop: 24 }}>{t.takMore} →</Link>
          </div>
          <div className="card" style={{ background: "var(--lime-soft)", border: 0, padding: 32 }}>
            {SURPLUS.validated ? (
              <figure style={{ margin: 0 }}>
                <figcaption style={{ fontWeight: 800, color: "var(--navy)", marginBottom: 20 }}>{t.surplusT}</figcaption>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 220 }}>
                  {SURPLUS.series.map((d) => (
                    <div key={d.y} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontWeight: 800, color: "var(--navy)" }}>{d.v} M</div>
                      <div style={{ height: (d.v / max) * 170, background: d.y === SURPLUS.series[SURPLUS.series.length - 1].y ? "var(--navy)" : "var(--lime)", borderRadius: "10px 10px 0 0" }} />
                      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{d.y}</div>
                    </div>
                  ))}
                </div>
              </figure>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 800, color: "var(--navy)", lineHeight: 1.1 }}>{lang === "fr" ? "2 fonds séparés" : lang === "en" ? "2 separate funds" : "صندوقان منفصلان"}</div>
                <p style={{ color: "var(--navy)", fontWeight: 700, margin: "10px 0 4px" }}>{lang === "fr" ? "Le fonds des participants est tenu à part de celui de l'opérateur." : lang === "en" ? "The participants' fund is kept apart from the operator's fund." : "يُحفظ صندوق المشتركين منفصلاً عن صندوق المشغّل."}</p>
                <p style={{ fontSize: 14 }}>{lang === "fr" ? "Le montant de l'excédent est communiqué chaque année aux participants éligibles." : lang === "en" ? "The surplus amount is communicated each year to eligible participants." : "يُبلَّغ مبلغ الفائض سنوياً للمشتركين المؤهلين."}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. SINISTRES */}
      <section className="section bg-navy">
        <div className="container grid g2" style={{ alignItems: "center", gap: 48 }}>
          <div>
            <span className="eyebrow">{t.clEye}</span>
            <h2 className="h-lg">{t.clH}</h2>
            <div className="btn-row" style={{ marginTop: 20 }}>
              <Link to="/sinistres#declarer" className="btn btn-lime">{t.clCta}</Link>
              <Link to="/sinistres" className="btn btn-ghost">{t.clMore}</Link>
            </div>
          </div>
          <div className="steps">
            {t.clSteps.map(([h, p], i) => (
              <div className="step" key={h} style={{ background: "rgba(255,255,255,.06)", borderRadius: 16, padding: 18 }}>
                <span className="step-n" style={{ color: "var(--lime)" }}>{`0${i + 1}`}</span>
                <div><h3>{h}</h3><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ASSISTANCE (OPTION) */}
      <section className="section-sm bg-cream">
        <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="tag-option">{t.optLabel}</span>
            <h2 className="h-md" style={{ marginTop: 10 }}>{t.asH}</h2>
            <p style={{ color: "var(--muted)", margin: 0 }}>{t.asP}</p>
          </div>
          <button type="button" className="btn btn-navy" onClick={() => openFunnel("auto", "home_assistance")}>{t.asCta}</button>
        </div>
      </section>

      {/* 8. PRÉSENCE RÉGIONALE */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">{t.regEye}</span>
          <h2 className="h-lg" style={{ maxWidth: 760 }}>{t.regH}</h2>
          <div className="grid g4" style={{ marginTop: 24 }}>
            {REGIONS.map((r) => (
              <div key={r.code} className="card"><h3>{r.name[lang] || r.name.fr}</h3><p>{r.entity[lang] || r.entity.fr}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AGENCES */}
      <section className="section bg-cream">
        <div className="container">
          <span className="eyebrow">{t.agEye}</span>
          <h2 className="h-lg">{t.agH}</h2>
          <div className="grid g3" style={{ marginTop: 24 }}>
            {AGENCIES.map((a) => (
              <div key={a.id} className="card">
                <h3>{a.name[lang] || a.name.fr}</h3>
                <p>{a.place[lang] || a.place.fr}</p>
                <a href={a.maps} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontWeight: 700, color: "var(--lime-ink)" }}>{t.agMap} →</a>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn btn-ghost" style={{ marginTop: 20 }}>{t.agAll}</Link>
        </div>
      </section>

      {/* 10. GUIDES */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 12 }}>
            <div><span className="eyebrow">{t.blogEye}</span><h2 className="h-lg" style={{ margin: 0 }}>{t.blogH}</h2></div>
            <Link to="/blog" style={{ fontWeight: 700, color: "var(--lime-ink)" }}>{t.blogAll} →</Link>
          </div>
          <div className="grid g3" style={{ marginTop: 24 }}>
            {articles.map((a) => (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="card card-link">
                <span className="pill">{a.category}</span>
                <h3 style={{ marginTop: 12 }}>{a.title}</h3>
                <p>{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <section className="section-sm bg-navy">
        <div className="container center">
          <h2 className="h-lg">{t.finalH}</h2>
          <p className="lead">{t.finalP}</p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 20 }}>
            <button type="button" className="btn btn-lime" onClick={() => openFunnel(null, "home_final")}>{t.cta1}</button>
            <a className="btn btn-ghost" href={`tel:${PHONE.intl}`} data-cta="home_final_phone">{t.finalCall} {PHONE.display}</a>
          </div>
        </div>
      </section>
    </>
  );
}

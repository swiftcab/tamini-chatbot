import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { PRODUCTS } from "../i18n/products";
import { useFunnel } from "../funnel/FunnelContext";
import Seo, { breadcrumbSchema } from "../seo/Seo";

// ─────────────────────────────────────────────────────────────
// Offres B2B packagées par secteur (Hormozi « Grand Slam Offer ») :
// on ne vend pas des polices, on vend un résultat — « votre
// activité ne s'arrête pas » — avec un premier pas sans risque :
// l'audit de risques offert. Positionnement : expertise
// risque-économie (pas d'argument religieux en B2B).
// ─────────────────────────────────────────────────────────────

const N = "#0B1F4D", G = "#6EC026";

const PACKS = [
  { id: "industrie", icon: "🏭", main: "multirisque", products: ["multirisque", "rc"] },
  { id: "chantier", icon: "🏗️", main: "chantier", products: ["chantier", "bond", "rc"] },
  { id: "flux", icon: "🚢", main: "maritime", products: ["maritime", "flotte"] },
  { id: "equipes", icon: "👷", main: "flotte", products: ["flotte", "accidents", "voyage"] },
];

const T = {
  fr: {
    eye: "Solutions Entreprises", h1: "Une seule question compte :", h1b: "votre activité peut-elle s'arrêter ?",
    sub: "Incendie d'entrepôt, cargaison avariée, chantier à l'arrêt, accident d'un chauffeur : le coût réel n'est pas le sinistre, c'est l'interruption. Nous construisons une protection par secteur, avec un seul interlocuteur.",
    packs: {
      industrie: { name: "Industrie & Entrepôt", who: "Usines, entrepôts, zones franches, distributeurs", pain: "Un incendie ou un dégât des eaux bloque vos stocks et vos livraisons pendant des semaines.", outcome: "Bâtiments, équipements et stocks protégés, frais fixes couverts pendant l'arrêt, responsabilité vis-à-vis des tiers." },
      chantier: { name: "Chantier & Projet", who: "Entreprises de BTP, promoteurs, maîtres d'ouvrage", pain: "Sans garantie de bonne exécution ni assurance chantier, l'appel d'offres vous échappe — ou un sinistre emporte votre marge.", outcome: "Ouvrage protégé de l'ouverture à la réception, garanties exigées par le donneur d'ordre, RC vis-à-vis des riverains." },
      flux: { name: "Flux & Marchandises", who: "Importateurs, exportateurs, transitaires, transporteurs du corridor", pain: "Une cargaison perdue ou avariée entre le port et Addis peut effacer la marge d'une année.", outcome: "Marchandises couvertes en mer et sur route, police d'abonnement pour les flux réguliers, flotte de transport assurée." },
      equipes: { name: "Équipes & Mobilité", who: "Entreprises avec chauffeurs, commerciaux, équipes terrain ou missions à l'étranger", pain: "Un accident de collaborateur, c'est un drame humain, une désorganisation et parfois un litige.", outcome: "Flotte assurée sous un contrat unique, collaborateurs couverts en cas d'accident, missions à l'étranger sécurisées." },
    },
    includes: "Inclus dans la démarche", stack: [
      ["Audit de vos risques", "Un expert analyse vos sites, flux et contrats existants."],
      ["Cartographie écrite", "Vos expositions classées par gravité, à garder même sans souscrire."],
      ["Proposition consolidée", "Une seule offre, un seul interlocuteur pour tous vos contrats."],
      ["Revue annuelle des capitaux", "Pour ne jamais être sous-assuré quand votre activité grandit."],
    ],
    reversal: "Sans engagement : si l'audit ne fait apparaître aucune amélioration possible de votre couverture, vous gardez le rapport et nous vous le disons franchement.",
    cta: "Demander mon audit de risques", covered: "Contrats mobilisés", why: "Pourquoi les entreprises choisissent Tamini",
    whys: [["Agréée ARSD depuis 2020", "Opérateur Takaful régulé, adossé à un réassureur international."], ["Ancrage régional", "Djibouti, Somaliland, Kenya, Ouganda : vos flux suivent la Corne de l'Afrique."], ["Un interlocuteur dédié", "Ligne entreprises directe : 77 23 92 92."]],
    seoT: "Assurance entreprise Djibouti par secteur — audit de risques | Tamini", seoD: "Industrie, chantier, import-export, flotte : des protections Takaful par secteur à Djibouti avec audit de risques et proposition consolidée. Un seul interlocuteur.",
    home: "Accueil", biz: "Entreprises",
  },
  en: {
    eye: "Business Solutions", h1: "Only one question matters:", h1b: "can your business afford to stop?",
    sub: "Warehouse fire, damaged cargo, halted site, driver accident: the real cost isn't the loss, it's the interruption. We build protection by sector, with a single point of contact.",
    packs: {
      industrie: { name: "Industry & Warehouse", who: "Plants, warehouses, free zones, distributors", pain: "A fire or water damage freezes your stock and deliveries for weeks.", outcome: "Buildings, equipment and stock protected, fixed costs covered during downtime, third-party liability." },
      chantier: { name: "Construction & Projects", who: "Contractors, developers, project owners", pain: "Without a performance bond or contractors' all-risk cover, the tender slips away — or one loss wipes out your margin.", outcome: "Works protected from start to handover, guarantees required by the employer, liability towards neighbours." },
      flux: { name: "Trade & Cargo", who: "Importers, exporters, forwarders, corridor hauliers", pain: "One lost or damaged shipment between the port and Addis can erase a year's margin.", outcome: "Goods covered at sea and on the road, open cover for regular flows, transport fleet insured." },
      equipes: { name: "People & Mobility", who: "Companies with drivers, sales staff, field teams or overseas assignments", pain: "An employee accident means human hardship, disruption and sometimes a dispute.", outcome: "Fleet insured under one contract, staff covered for accidents, overseas assignments secured." },
    },
    includes: "Included in the process", stack: [
      ["Risk audit", "An expert reviews your sites, flows and existing policies."],
      ["Written risk map", "Your exposures ranked by severity — yours to keep even if you don't buy."],
      ["Consolidated proposal", "One offer, one point of contact for all your policies."],
      ["Annual sums-insured review", "So you're never under-insured as you grow."],
    ],
    reversal: "No commitment: if the audit shows no possible improvement to your cover, you keep the report and we tell you so plainly.",
    cta: "Request my risk audit", covered: "Policies involved", why: "Why businesses choose Tamini",
    whys: [["ARSD licensed since 2020", "Regulated Takaful operator backed by an international reinsurer."], ["Regional footprint", "Djibouti, Somaliland, Kenya, Uganda: your flows follow the Horn of Africa."], ["A dedicated contact", "Direct business line: 77 23 92 92."]],
    seoT: "Business insurance Djibouti by sector — risk audit | Tamini", seoD: "Industry, construction, import-export, fleet: Takaful protection by sector in Djibouti with a risk audit and consolidated proposal. One point of contact.",
    home: "Home", biz: "Business",
  },
  ar: {
    eye: "حلول الشركات", h1: "سؤال واحد فقط يهم:", h1b: "هل يمكن لنشاطكم أن يتوقف؟",
    sub: "حريق مستودع، شحنة تالفة، ورشة متوقفة، حادث سائق: التكلفة الحقيقية ليست الحادث بل التوقف. نبني حماية حسب القطاع مع محاور واحد.",
    packs: {
      industrie: { name: "الصناعة والمستودعات", who: "مصانع، مستودعات، مناطق حرة، موزعون", pain: "حريق أو تسرب مياه يجمّد مخزونكم وتسليماتكم لأسابيع.", outcome: "حماية المباني والمعدات والمخزون، تغطية التكاليف الثابتة أثناء التوقف، والمسؤولية تجاه الغير." },
      chantier: { name: "المقاولات والمشاريع", who: "شركات البناء، المطورون، أصحاب المشاريع", pain: "بدون ضمان حسن التنفيذ وتأمين الورشة تضيع المناقصة — أو يمحو حادث واحد هامشكم.", outcome: "حماية المنشأة من البداية حتى التسليم، الضمانات المطلوبة من صاحب العمل، والمسؤولية تجاه الجوار." },
      flux: { name: "التجارة والبضائع", who: "مستوردون، مصدّرون، وكلاء عبور، ناقلو الممر", pain: "شحنة مفقودة أو تالفة بين الميناء وأديس أبابا قد تمحو هامش سنة كاملة.", outcome: "تغطية البضائع بحراً وبراً، وثيقة اشتراك للتدفقات المنتظمة، وتأمين أسطول النقل." },
      equipes: { name: "الفرق والتنقل", who: "شركات لديها سائقون أو فرق ميدانية أو مهمات في الخارج", pain: "حادث موظف يعني معاناة إنسانية وارتباكاً وأحياناً نزاعاً.", outcome: "أسطول مؤمَّن بعقد واحد، موظفون مغطَّون ضد الحوادث، ومهمات خارجية آمنة." },
    },
    includes: "ما تتضمنه العملية", stack: [
      ["تدقيق المخاطر", "خبير يحلل مواقعكم وتدفقاتكم وعقودكم الحالية."],
      ["خريطة مخاطر مكتوبة", "مخاطركم مرتبة حسب الخطورة، تحتفظون بها حتى دون اكتتاب."],
      ["عرض موحّد", "عرض واحد ومحاور واحد لجميع عقودكم."],
      ["مراجعة سنوية للمبالغ المؤمنة", "حتى لا تكونوا أبداً أقل تأميناً مع نمو نشاطكم."],
    ],
    reversal: "دون التزام: إذا لم يُظهر التدقيق أي تحسين ممكن لتغطيتكم، تحتفظون بالتقرير ونخبركم بذلك بصراحة.",
    cta: "اطلب تدقيق المخاطر", covered: "العقود المعنية", why: "لماذا تختار الشركات تأميني",
    whys: [["مرخصة من ARSD منذ 2020", "مشغل تكافل منظَّم مدعوم بمعيد تأمين دولي."], ["حضور إقليمي", "جيبوتي، صوماليلاند، كينيا، أوغندا: تدفقاتكم تتبع القرن الأفريقي."], ["محاور مخصص", "خط الشركات المباشر: 77 23 92 92."]],
    seoT: "تأمين الشركات في جيبوتي حسب القطاع — تدقيق المخاطر | تأميني", seoD: "الصناعة، المقاولات، الاستيراد والتصدير، الأساطيل: حماية تكافلية حسب القطاع في جيبوتي مع تدقيق للمخاطر وعرض موحّد.",
    home: "الرئيسية", biz: "الشركات",
  },
};

export default function Solutions() {
  const { lang, rtl } = useLang();
  const { openFunnel } = useFunnel();
  const t = T[lang] || T.fr;
  const serif = rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif";

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B" }}>
      <Seo title={t.seoT} description={t.seoD} path="/entreprises/solutions" image="/images/hero-maritime.webp"
        schema={breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.biz, path: "/entreprises" }, { name: t.eye, path: "/entreprises/solutions" }])} />

      <section style={{ background: `linear-gradient(150deg,#071028,${N})`, padding: "72px 20px 64px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: G, textTransform: "uppercase", letterSpacing: 2 }}>{t.eye}</span>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(28px,4.6vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "12px 0 16px" }}>{t.h1}<br /><span style={{ color: G }}>{t.h1b}</span></h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.75, maxWidth: 680, margin: "0 auto" }}>{t.sub}</p>
        </div>
      </section>

      <section style={{ background: "#F8FAFF", padding: "56px 20px" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          {PACKS.map((p) => {
            const pk = t.packs[p.id];
            return (
              <article key={p.id} data-section={`solutions_${p.id}`} style={{ background: "#fff", borderRadius: 18, border: "1px solid #e8ecf0", padding: "24px 22px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
                <h2 style={{ fontFamily: serif, fontSize: 21, fontWeight: 800, color: N, margin: "0 0 6px" }}>{pk.name}</h2>
                <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 14 }}>{pk.who}</div>
                <p style={{ fontSize: 14, color: "#b45309", background: "#fff7ed", borderRadius: 10, padding: "10px 12px", lineHeight: 1.55, margin: "0 0 12px" }}>⚠ {pk.pain}</p>
                <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.65, margin: "0 0 14px" }}><strong style={{ color: G }}>✓</strong> {pk.outcome}</p>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.covered}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {p.products.map((s) => (
                    <Link key={s} to={`/${PRODUCTS[s].segment}/${s}`} style={{ fontSize: 12, fontWeight: 700, color: N, background: "#eef2ff", padding: "5px 10px", borderRadius: 50, textDecoration: "none" }}>{PRODUCTS[s][lang].badge}</Link>
                  ))}
                </div>
                <button type="button" onClick={() => openFunnel(p.main, `solutions_${p.id}`)} style={{ marginTop: "auto", padding: "13px 16px", background: G, color: N, border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14.5, cursor: "pointer", fontFamily: "inherit" }}>{t.cta}</button>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "60px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, color: N, textAlign: "center", marginBottom: 26 }}>{t.includes}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
            {t.stack.map(([h, d], i) => (
              <div key={i} style={{ border: "1px solid #e8ecf0", borderRadius: 14, padding: "18px 16px", background: "#fafffe" }}>
                <div style={{ fontWeight: 800, color: N, marginBottom: 6 }}>{i + 1}. {h}</div>
                <div style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 22, padding: "16px 18px", background: "rgba(110,192,38,.08)", border: "1px solid rgba(110,192,38,.25)", borderRadius: 12, fontSize: 14, color: "#334155", lineHeight: 1.65 }}>🛡️ {t.reversal}</p>
        </div>
      </section>

      <section style={{ background: "#F8FAFF", padding: "56px 20px 72px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, color: N, marginBottom: 24 }}>{t.why}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginBottom: 30 }}>
            {t.whys.map(([h, d]) => (
              <div key={h} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8ecf0", padding: "18px 16px" }}>
                <div style={{ fontWeight: 800, color: N, marginBottom: 6 }}>{h}</div>
                <div style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => openFunnel("multirisque", "solutions_final")} style={{ padding: "16px 34px", background: N, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15.5, cursor: "pointer", fontFamily: "inherit" }}>{t.cta} {rtl ? "←" : "→"}</button>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo, { breadcrumbSchema } from "../seo/Seo";
import QuickForm from "../components/QuickForm";
import { WA_B2C, PHONE } from "../config/site";

const DECL = {
  fr: { h: "Déclarer un sinistre", p: "Remplissez ces quelques champs : votre déclaration s'ouvre dans WhatsApp, prête à être envoyée à notre service sinistres. Un conseiller vous indique ensuite les pièces à fournir.", urgent: "Blessé ou danger immédiat ? Appelez d'abord les secours.", types: ["Automobile", "Habitation", "Voyage / assistance", "Accident corporel", "Entreprise / marchandises", "Autre"], f: { type: "Type de sinistre", date: "Date du sinistre", police: "N° de contrat (si vous l'avez)", lieu: "Lieu", desc: "Que s'est-il passé ?", nom: "Nom et prénom", tel: "Téléphone" }, submit: "Envoyer ma déclaration sur WhatsApp", intro: "Bonjour Tamini, je déclare un sinistre :", call: "Préférez le téléphone ?" },
  en: { h: "Report a claim", p: "Fill in these few fields: your report opens in WhatsApp, ready to send to our claims team. An advisor then tells you which documents are needed.", urgent: "Injured or in immediate danger? Call emergency services first.", types: ["Motor", "Home", "Travel / assistance", "Bodily injury", "Business / cargo", "Other"], f: { type: "Type of claim", date: "Date of loss", police: "Policy number (if you have it)", lieu: "Place", desc: "What happened?", nom: "Full name", tel: "Phone" }, submit: "Send my claim on WhatsApp", intro: "Hello Tamini, I am reporting a claim:", call: "Prefer the phone?" },
  ar: { h: "التصريح بمطالبة", p: "املؤوا هذه الحقول: يُفتح تصريحكم في واتساب جاهزاً للإرسال إلى قسم المطالبات، ثم يحدد لكم مستشار الوثائق المطلوبة.", urgent: "مصاب أو خطر فوري؟ اتصلوا بالإسعاف أولاً.", types: ["سيارة", "مسكن", "سفر / مساعدة", "إصابة جسدية", "شركة / بضائع", "أخرى"], f: { type: "نوع المطالبة", date: "تاريخ الحادث", police: "رقم العقد (إن وُجد)", lieu: "المكان", desc: "ماذا حدث؟", nom: "الاسم الكامل", tel: "الهاتف" }, submit: "أرسل تصريحي عبر واتساب", intro: "مرحباً تأميني، أصرّح بمطالبة:", call: "تفضلون الهاتف؟" },
};

const N = "#0B1F4D", G = "#6EC026";
const WA_BOT = "25377094141";

const T = {
  fr: {
    seoTitle: "Comment Nous Réglons Vos Sinistres | Tamini Insurance",
    seoDesc:
      "Délais, étapes, documents, motifs de refus : découvrez en toute transparence comment Tamini traite et règle vos sinistres à Djibouti. 65% de cadence de règlement.",
    badge: "Transparence totale",
    h1: "La vraie question n'est pas",
    h2: "« combien ça coûte ». C'est « vont-ils payer ? »",
    intro:
      "C'est la peur la plus répandue chez les assurés, partout dans le monde. Retards, refus, interlocuteurs injoignables. Nous avons choisi d'y répondre par la transparence plutôt que par des promesses.",
    statTitle: "Notre cadence de règlement",
    statBig: "65%",
    statVs: "contre environ 18% pour la moyenne du marché djiboutien",
    statNote:
      "La cadence de règlement mesure la proportion de sinistres effectivement réglés sur une période donnée. C'est l'indicateur le plus honnête de la capacité réelle d'un assureur à tenir sa promesse.",
    stepsTitle: "Les 3 étapes, sans zone d'ombre",
    steps: [
      {
        n: "1",
        t: "Vous déclarez",
        d: "Par WhatsApp (77 09 41 41), en agence ou par téléphone. Des photos et une description des faits suffisent pour ouvrir le dossier. Vous recevez une confirmation d'ouverture.",
      },
      {
        n: "2",
        t: "Nous expertisons",
        d: "Un expert évalue les dommages. Pour les dossiers simples, cette étape prend généralement quelques jours. Vous pouvez demander l'état d'avancement à tout moment sur WhatsApp.",
      },
      {
        n: "3",
        t: "Nous réglons",
        d: "L'indemnisation est versée selon les garanties de votre contrat. La majorité des dossiers simples sont réglés en 2 à 3 semaines à compter de la réception du dossier complet.",
      },
    ],
    docsTitle: "Les documents à préparer",
    docsIntro:
      "Un dossier complet dès le départ est le premier facteur d'accélération. Voici ce qu'il faut réunir selon le type de sinistre :",
    docs: [
      { t: "Sinistre automobile", d: "Carte grise, permis de conduire, constat amiable ou rapport de police si applicable, photos des dommages." },
      { t: "Sinistre habitation", d: "Pièce d'identité, contrat d'assurance, photos des dégâts, factures des biens endommagés si disponibles." },
      { t: "Sinistre maritime / cargo", d: "Connaissement, facture commerciale, liste de colisage, constat d'avarie, photos." },
      { t: "Sinistre voyage", d: "Attestation d'assurance, justificatifs médicaux, factures acquittées, billet de transport." },
    ],
    refusTitle: "Dans quels cas un sinistre peut-il être refusé ?",
    refusIntro:
      "Peu d'assureurs publient cette information. Nous préférons que vous la connaissiez avant de souscrire plutôt qu'au moment du sinistre. Les motifs de refus les plus courants dans le secteur sont :",
    refus: [
      "Le sinistre n'entre pas dans les garanties souscrites (par exemple : dommages à votre propre véhicule avec une formule Responsabilité Civile seule).",
      "La déclaration intervient hors des délais contractuels prévus.",
      "Les informations fournies lors de la souscription se révèlent inexactes sur des éléments déterminants du risque.",
      "Le sinistre résulte d'une faute intentionnelle ou d'une exclusion expressément mentionnée au contrat.",
      "Les cotisations n'étaient pas à jour au moment du sinistre.",
    ],
    refusNote:
      "Notre rôle de conseil consiste précisément à vous orienter, avant la souscription, vers la formule qui couvre réellement les risques auxquels vous êtes exposé — afin qu'aucune de ces situations ne se présente.",
    commitTitle: "Nos engagements",
    commits: [
      "Un accusé de réception de votre déclaration, systématiquement.",
      "Un interlocuteur identifiable joignable sur WhatsApp pendant toute la durée du dossier.",
      "Une explication écrite et motivée en cas de refus — jamais un simple rejet sans justification.",
      "Aucune pression pour accepter une offre d'indemnisation : vous disposez du temps de la comprendre.",
    ],
    ctaTitle: "Un sinistre à déclarer ?",
    ctaSub: "Notre assistant vous guide étape par étape, 24h/24.",
    ctaBtn: "Déclarer sur WhatsApp",
    ctaMsg: "Bonjour, je souhaite déclarer un sinistre",
    secondary: "Voir nos assurances",
  },
  en: {
    seoTitle: "How We Settle Your Claims | Tamini Insurance",
    seoDesc:
      "Timelines, steps, documents, refusal grounds: full transparency on how Tamini handles and settles claims in Djibouti. 65% claims settlement rate.",
    badge: "Full transparency",
    h1: "The real question isn't",
    h2: "\"how much\". It's \"will they pay?\"",
    intro:
      "It's the most widespread fear among policyholders worldwide. Delays, denials, unreachable contacts. We chose to answer it with transparency rather than promises.",
    statTitle: "Our claims settlement rate",
    statBig: "65%",
    statVs: "versus approximately 18% for the Djibouti market average",
    statNote:
      "The settlement rate measures the proportion of claims actually settled over a given period. It is the most honest indicator of an insurer's real ability to keep its promise.",
    stepsTitle: "Three steps, no grey areas",
    steps: [
      { n: "1", t: "You declare", d: "By WhatsApp (77 09 41 41), in-agency or by phone. Photos and a description of events are enough to open the file. You receive an opening confirmation." },
      { n: "2", t: "We assess", d: "An expert evaluates the damage. For straightforward files, this usually takes a few days. You can request a status update at any time on WhatsApp." },
      { n: "3", t: "We settle", d: "Compensation is paid according to your policy's coverage. Most straightforward files are settled within 2 to 3 weeks from receipt of the complete file." },
    ],
    docsTitle: "Documents to prepare",
    docsIntro: "A complete file from the start is the single biggest accelerator. Here's what to gather by claim type:",
    docs: [
      { t: "Motor claim", d: "Vehicle registration, driving licence, accident report or police report if applicable, photos of damage." },
      { t: "Home claim", d: "ID document, insurance policy, photos of damage, invoices for damaged goods if available." },
      { t: "Marine / cargo claim", d: "Bill of lading, commercial invoice, packing list, damage report, photos." },
      { t: "Travel claim", d: "Insurance certificate, medical documentation, paid invoices, travel ticket." },
    ],
    refusTitle: "When can a claim be refused?",
    refusIntro:
      "Few insurers publish this information. We would rather you know it before subscribing than at the time of a claim. The most common grounds for refusal in the industry are:",
    refus: [
      "The claim falls outside the coverage subscribed (for example: damage to your own vehicle under a third-party-only policy).",
      "The declaration is made outside the contractual time limits.",
      "Information provided at subscription proves inaccurate on elements material to the risk.",
      "The claim results from an intentional act or an exclusion expressly stated in the contract.",
      "Contributions were not up to date at the time of the claim.",
    ],
    refusNote:
      "Our advisory role is precisely to guide you, before subscription, toward the plan that genuinely covers the risks you face — so that none of these situations arises.",
    commitTitle: "Our commitments",
    commits: [
      "An acknowledgement of your declaration, systematically.",
      "An identifiable contact reachable on WhatsApp throughout the file.",
      "A written, reasoned explanation in case of refusal — never a bare rejection.",
      "No pressure to accept a settlement offer: you have the time to understand it.",
    ],
    ctaTitle: "A claim to declare?",
    ctaSub: "Our assistant guides you step by step, 24/7.",
    ctaBtn: "Declare on WhatsApp",
    ctaMsg: "Hello, I would like to declare a claim",
    secondary: "See our insurance products",
  },
  ar: {
    seoTitle: "كيف نسوّي مطالباتكم | تأميني للتأمين",
    seoDesc:
      "المهل، الخطوات، الوثائق، أسباب الرفض: شفافية كاملة حول كيفية معالجة تأميني وتسوية مطالباتكم في جيبوتي. معدل تسوية 65%.",
    badge: "شفافية كاملة",
    h1: "السؤال الحقيقي ليس",
    h2: "«كم التكلفة». بل «هل سيدفعون؟»",
    intro:
      "إنه الخوف الأكثر انتشاراً بين المؤمَّن عليهم في العالم. تأخيرات، رفض، ومسؤولون لا يمكن الوصول إليهم. اخترنا الإجابة عليه بالشفافية بدلاً من الوعود.",
    statTitle: "معدل تسوية المطالبات لدينا",
    statBig: "65%",
    statVs: "مقابل حوالي 18% لمتوسط السوق الجيبوتي",
    statNote:
      "يقيس معدل التسوية نسبة المطالبات المسوّاة فعلياً خلال فترة معينة. وهو المؤشر الأكثر صدقاً على قدرة شركة التأمين الحقيقية على الوفاء بوعدها.",
    stepsTitle: "ثلاث خطوات، بلا مناطق رمادية",
    steps: [
      { n: "١", t: "أنتم تصرّحون", d: "عبر واتساب (77 09 41 41)، في الوكالة أو هاتفياً. الصور ووصف الوقائع كافيان لفتح الملف. تتلقون تأكيداً بالفتح." },
      { n: "٢", t: "نحن نقيّم", d: "يقيّم خبير الأضرار. للملفات البسيطة، تستغرق هذه المرحلة عادة بضعة أيام. يمكنكم طلب حالة التقدم في أي وقت عبر واتساب." },
      { n: "٣", t: "نحن نسوّي", d: "يُدفع التعويض وفق تغطيات عقدكم. تُسوّى معظم الملفات البسيطة خلال 2 إلى 3 أسابيع من استلام الملف الكامل." },
    ],
    docsTitle: "الوثائق الواجب تحضيرها",
    docsIntro: "الملف الكامل منذ البداية هو العامل الأول للتسريع. إليكم ما يجب جمعه حسب نوع المطالبة:",
    docs: [
      { t: "مطالبة سيارة", d: "بطاقة الترخيص، رخصة القيادة، محضر ودي أو تقرير شرطة إن وُجد، صور الأضرار." },
      { t: "مطالبة مسكن", d: "وثيقة هوية، عقد التأمين، صور الأضرار، فواتير الممتلكات المتضررة إن توفرت." },
      { t: "مطالبة بحرية / شحن", d: "سند الشحن، الفاتورة التجارية، قائمة التعبئة، محضر التلف، صور." },
      { t: "مطالبة سفر", d: "شهادة التأمين، مستندات طبية، فواتير مدفوعة، تذكرة السفر." },
    ],
    refusTitle: "في أي الحالات يمكن رفض مطالبة؟",
    refusIntro:
      "قليل من شركات التأمين تنشر هذه المعلومة. نفضّل أن تعرفوها قبل الاشتراك بدلاً من وقت الحادث. أكثر أسباب الرفض شيوعاً في القطاع هي:",
    refus: [
      "المطالبة خارج التغطيات المشترَك بها (مثال: أضرار سيارتكم بصيغة المسؤولية المدنية فقط).",
      "التصريح خارج المهل التعاقدية المنصوص عليها.",
      "المعلومات المقدّمة عند الاشتراك تبيّن أنها غير دقيقة في عناصر جوهرية للخطر.",
      "المطالبة ناتجة عن فعل متعمّد أو استثناء منصوص عليه صراحة في العقد.",
      "الاشتراكات لم تكن مسدّدة وقت وقوع الحادث.",
    ],
    refusNote:
      "دورنا الاستشاري يتمثل تحديداً في توجيهكم، قبل الاشتراك، نحو الصيغة التي تغطي فعلاً المخاطر التي تتعرضون لها — حتى لا تحدث أي من هذه الحالات.",
    commitTitle: "التزاماتنا",
    commits: [
      "إشعار باستلام تصريحكم، بشكل منهجي.",
      "مسؤول محدّد يمكن الوصول إليه عبر واتساب طوال مدة الملف.",
      "تفسير مكتوب ومعلّل في حال الرفض — لا رفض مجرّد دون تبرير أبداً.",
      "لا ضغط لقبول عرض التعويض: لديكم الوقت لفهمه.",
    ],
    ctaTitle: "لديكم مطالبة للتصريح بها؟",
    ctaSub: "مساعدنا يرشدكم خطوة بخطوة، 24/7.",
    ctaBtn: "صرّح عبر واتساب",
    ctaMsg: "مرحباً، أريد التصريح بمطالبة",
    secondary: "اطّلع على تأميناتنا",
  },
};

export default function Claims() {
  const { lang, rtl } = useLang();
  const t = T[lang] || T.fr;

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B", background: "#fff" }}>
      <Seo title={t.seoTitle} description={t.seoDesc} path="/sinistres" schema={breadcrumbSchema([{ name: "Tamini", path: "/" }, { name: t.h1, path: "/sinistres" }])} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,${N},#0d2a5e)`, padding: "72px 24px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(110,192,38,.15)", border: "1px solid rgba(110,192,38,.35)", borderRadius: 50, fontSize: 12, fontWeight: 700, color: G, marginBottom: 22 }}>
            {t.badge}
          </span>
          <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>
            {t.h1}<br /><span style={{ color: G }}>{t.h2}</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>{t.intro}</p>
        </div>
      </section>

      {/* DÉCLARATION EN LIGNE */}
      {(() => { const d = DECL[lang] || DECL.fr; return (
        <section id="declarer" className="section-sm" style={{ scrollMarginTop: 120 }}>
          <div className="container grid g2" style={{ alignItems: "start", gap: 40 }}>
            <div>
              <h2 className="h-lg">{d.h}</h2>
              <p className="lead">{d.p}</p>
              <p className="callout" style={{ borderColor: "#F5C2C0", background: "#FFF5F4" }}><strong>{d.urgent}</strong></p>
              <p style={{ marginTop: 16 }}>{d.call} <a href={`tel:${PHONE.intl}`} data-cta="claims_phone" style={{ fontWeight: 800 }}>{PHONE.label}</a></p>
            </div>
            <QuickForm id="claim-form" formName="claim" lang={lang} prefix="TM-SIN" intro={d.intro} submitLabel={d.submit} waNumber={WA_B2C.number}
              fields={[
                { id: "type", label: d.f.type, type: "select", options: { fr: DECL.fr.types, en: DECL.en.types, ar: DECL.ar.types }, required: true },
                { id: "date", label: d.f.date, type: "date", required: true },
                { id: "police", label: d.f.police },
                { id: "lieu", label: d.f.lieu },
                { id: "desc", label: d.f.desc, type: "textarea", required: true },
                { id: "nom", label: d.f.nom, required: true, autoComplete: "name" },
                { id: "tel", label: d.f.tel, type: "tel", required: true },
              ]} />
          </div>
        </section>
      ); })()}

      {/* STAT */}
      <section style={{ background: "#F8FAFF", padding: "56px 24px", borderBottom: "1px solid #e8ecf0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>{t.statTitle}</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(56px,10vw,88px)", fontWeight: 900, color: N, lineHeight: 1 }}>{t.statBig}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#334155", marginTop: 10 }}>{t.statVs}</div>
          <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginTop: 18, maxWidth: 560, marginInline: "auto" }}>{t.statNote}</p>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 800, color: N, textAlign: "center", marginBottom: 36 }}>{t.stepsTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
            {t.steps.map((s, i) => (
              <div key={i} style={{ background: "#F8FAFF", borderRadius: 18, padding: "30px 24px", border: "1px solid #e8ecf0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: i === 2 ? G : N, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 900, color: "#fff", marginBottom: 16, fontFamily: "'Playfair Display',serif" }}>{s.n}</div>
                <h3 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: N, marginBottom: 10 }}>{s.t}</h3>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section style={{ padding: "64px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 800, color: N, textAlign: "center", marginBottom: 14 }}>{t.docsTitle}</h2>
          <p style={{ fontSize: 14.5, color: "#64748b", textAlign: "center", lineHeight: 1.7, marginBottom: 32 }}>{t.docsIntro}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {t.docs.map((d, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: "1px solid #e8ecf0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: N, marginBottom: 8 }}>📄 {d.t}</div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFUSAL TRANSPARENCY */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 800, color: N, marginBottom: 14 }}>{t.refusTitle}</h2>
          <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>{t.refusIntro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {t.refus.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", background: "#FDF6F5", borderRadius: 12, border: "1px solid #F5D5D0" }}>
                <span style={{ color: "#C0392B", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>✕</span>
                <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}>{r}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "18px 22px", background: "rgba(110,192,38,.08)", borderRadius: 12, borderInlineStart: `4px solid ${G}` }}>
            <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.75 }}>{t.refusNote}</p>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section style={{ padding: "64px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(22px,3.2vw,30px)", fontWeight: 800, color: N, textAlign: "center", marginBottom: 30 }}>{t.commitTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.commits.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 20px", background: "#fff", borderRadius: 12, border: "1px solid #e8ecf0" }}>
                <span style={{ color: G, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>✓</span>
                <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px", background: `linear-gradient(135deg,${N},#0d2a5e)`, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(22px,3.4vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 26 }}>{t.ctaSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href={`https://wa.me/${WA_BOT}?text=${encodeURIComponent(t.ctaMsg)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "15px 32px", background: G, color: N, borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 28px rgba(110,192,38,.3)" }}>
              {t.ctaBtn}
            </a>
            <Link to="/particuliers" style={{ padding: "15px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

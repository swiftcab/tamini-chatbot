import React from "react";
import { SHARIA_TAWAKKUL as VALIDATION } from "../config/compliance";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import Seo, { faqSchema } from "../seo/Seo";

const N = "#0B1F4D", G = "#6EC026";
const WA_BOT = "25377094141";

// ─────────────────────────────────────────────────────────────
// ⚠️ IMPORTANT — VALIDATION RELIGIEUSE REQUISE AVANT PUBLICATION
// Cette page traite d'une question de jurisprudence islamique.
// Elle doit être relue, corrigée si nécessaire et validée par un
// membre du comité Charia de Tamini avant mise en ligne.
// Renseignez ensuite son nom et sa fonction dans la constante
// VALIDATION ci-dessous pour afficher la mention d'autorité.
// ─────────────────────────────────────────────────────────────

// (verrou : voir src/config/compliance.js)

const T = {
  fr: {
    seoTitle: "S'assurer, est-ce manquer de confiance en Allah ? | Tamini",
    seoDesc:
      "Le Takaful contredit-il le tawakkul ? Réponse argumentée sur la place de l'assurance en Islam : prendre les moyens puis s'en remettre à Allah.",
    badge: "Question de fond",
    h1: "« Si tout vient d'Allah,",
    h2: "pourquoi m'assurer ? »",
    intro:
      "C'est une question sincère, posée par des croyants sincères. Elle mérite mieux qu'un argument commercial. Voici comment la tradition islamique y répond.",

    s1Title: "La question telle qu'elle se pose vraiment",
    s1: [
      "Beaucoup de musulmans hésitent à souscrire une assurance, non pas par manque de moyens ou d'information, mais par conviction : la maladie, l'accident, la perte et la mort relèvent du décret d'Allah. Chercher à s'en prémunir ne reviendrait-il pas à douter de Sa sagesse, voire à vouloir échapper à Sa volonté ?",
      "Cette hésitation est documentée : plusieurs travaux universitaires portant sur l'adoption du Takaful constatent qu'un niveau élevé d'engagement religieux s'accompagne parfois d'une réticence plus forte à s'assurer — précisément pour cette raison.",
      "La question n'est donc ni marginale ni naïve. Elle touche à la compréhension même du tawakkul, la confiance en Allah.",
    ],

    s2Title: "Ce que le tawakkul signifie réellement",
    s2Intro:
      "Le tawakkul n'est pas l'abandon des moyens. C'est la confiance placée en Allah après avoir pris les moyens qu'Il a Lui-même rendus disponibles. La tradition prophétique l'illustre par un épisode devenu la référence sur cette question :",
    hadithText:
      "Un homme demanda au Prophète ﷺ : « Dois-je attacher ma chamelle et m'en remettre à Allah, ou la laisser libre et m'en remettre à Allah ? » Il répondit : « Attache-la, puis remets-t'en à Allah. »",
    hadithSource: "Rapporté par At-Tirmidhi",
    s2After: [
      "L'enseignement est direct : prendre une précaution raisonnable ne contredit pas la confiance en Allah — elle en fait partie. Celui qui attache sa monture ne doute pas du décret divin ; il agit avec responsabilité, puis s'en remet à Lui pour ce qui échappe à son contrôle.",
      "Le même raisonnement s'applique à d'autres domaines admis sans difficulté : on se soigne quand on est malade, on met une serrure à sa porte, on épargne pour ses enfants. Aucune de ces actions n'est comprise comme une défiance envers Allah.",
    ],

    s3Title: "Où se situe alors la difficulté avec l'assurance ?",
    s3: [
      "La réserve exprimée par de nombreux savants à l'égard de l'assurance conventionnelle ne porte pas sur le fait de se prémunir d'un risque. Elle porte sur la structure du contrat : la présence d'intérêt (Riba) dans le placement des primes, l'incertitude excessive sur l'objet de l'échange (Gharar), et une mécanique que certains rapprochent du pari (Maysir).",
      "Autrement dit : ce n'est pas la protection qui pose question, c'est la manière dont elle est organisée financièrement.",
    ],

    s4Title: "Ce que le Takaful change",
    s4Intro: "Le Takaful a précisément été conçu pour répondre à ces trois réserves :",
    s4Points: [
      { t: "Une contribution, pas un pari", d: "Vos cotisations rejoignent un fonds de solidarité (Tabarru') destiné à secourir les participants touchés par un sinistre. L'intention est l'entraide, non le gain sur le malheur d'autrui." },
      { t: "Aucun intérêt (Riba)", d: "Les fonds sont placés selon des instruments conformes à la Charia, sous supervision d'un comité indépendant." },
      { t: "Le surplus vous revient", d: "Si le fonds est excédentaire après paiement des sinistres, une partie est redistribuée aux participants — vous n'enrichissez pas une compagnie, vous participez à une mutualisation." },
      { t: "Une transparence structurelle", d: "La séparation entre les frais de gestion de l'opérateur (Wakala) et le fonds des participants est inscrite dans le modèle, pas laissée à la bonne volonté." },
    ],

    s5Title: "En résumé",
    s5: "Le Takaful ne remplace pas le tawakkul et ne prétend pas se substituer au décret d'Allah. Il en est l'application pratique dans le domaine de la protection des biens et des familles : on attache sa monture — c'est-à-dire on prend une précaution licite et organisée — puis on s'en remet pleinement à Allah pour ce qui n'appartient qu'à Lui.",

    honesty:
      "Par honnêteté intellectuelle : comme pour beaucoup de questions de finance islamique contemporaine, des nuances d'appréciation existent entre écoles et savants sur certains aspects d'application. Ce qui fait consensus, en revanche, c'est que le Takaful correctement structuré répond directement aux trois réserves majeures formulées contre l'assurance conventionnelle. Nous vous encourageons à consulter un savant de confiance si un point précis vous préoccupe.",

    validatedLabel: "Contenu relu et validé par",
    pendingLabel: "Ce contenu est en cours de validation par notre comité Charia.",

    faqTitle: "Questions liées",
    faq: [
      { q: "Le Takaful est-il réservé aux musulmans ?", a: "Non. Le Takaful repose sur des principes de solidarité et d'éthique financière ouverts à tous. Toute personne, quelle que soit sa confession, peut souscrire une assurance Takaful chez Tamini." },
      { q: "Le Takaful coûte-t-il plus cher qu'une assurance classique ?", a: "Non, les cotisations sont établies sur les mêmes bases techniques d'évaluation du risque. La différence tient à la destination du surplus : en Takaful, l'excédent éventuel du fonds est partagé avec les participants au lieu d'être conservé intégralement par la compagnie." },
      { q: "Qui vérifie la conformité religieuse des produits Tamini ?", a: "Un comité Charia supervise la structuration des produits, la politique de placement des fonds et les modalités de redistribution du surplus, selon des standards alignés sur les références internationales du secteur." },
    ],

    ctaTitle: "Une question sur la conformité d'un produit ?",
    ctaSub: "Posez-la directement à notre équipe, sans engagement.",
    ctaBtn: "Poser ma question sur WhatsApp",
    ctaMsg: "Bonjour, j'ai une question sur la conformité religieuse de vos produits Takaful",
    secondary: "Comprendre le Takaful",
  },

  en: {
    seoTitle: "Is Taking Insurance a Lack of Trust in Allah? | Tamini",
    seoDesc:
      "Does Takaful contradict tawakkul? A reasoned answer on the place of insurance in Islam: take the means, then rely on Allah.",
    badge: "A fundamental question",
    h1: "\"If everything comes from Allah,",
    h2: "why insure myself?\"",
    intro:
      "It is a sincere question, asked by sincere believers. It deserves better than a sales argument. Here is how Islamic tradition answers it.",

    s1Title: "The question as it is really asked",
    s1: [
      "Many Muslims hesitate to take out insurance, not for lack of means or information, but out of conviction: illness, accident, loss and death fall under Allah's decree. Would seeking to guard against them not amount to doubting His wisdom, or even trying to escape His will?",
      "This hesitation is documented: several academic studies on Takaful adoption find that a high level of religious commitment is sometimes accompanied by greater reluctance to insure — precisely for this reason.",
      "The question is therefore neither marginal nor naive. It touches on the very understanding of tawakkul, trust in Allah.",
    ],

    s2Title: "What tawakkul actually means",
    s2Intro:
      "Tawakkul is not the abandonment of means. It is trust placed in Allah after taking the means He Himself has made available. Prophetic tradition illustrates this with an episode that has become the reference on this question:",
    hadithText:
      "A man asked the Prophet ﷺ: \"Should I tie my camel and rely on Allah, or leave it untied and rely on Allah?\" He replied: \"Tie it, then rely on Allah.\"",
    hadithSource: "Narrated by At-Tirmidhi",
    s2After: [
      "The lesson is direct: taking a reasonable precaution does not contradict trust in Allah — it is part of it. The one who ties his mount does not doubt the divine decree; he acts responsibly, then relies on Him for what lies beyond his control.",
      "The same reasoning applies to areas accepted without difficulty: we seek treatment when ill, we lock our doors, we save for our children. None of these actions is understood as distrust towards Allah.",
    ],

    s3Title: "Where then does the difficulty with insurance lie?",
    s3: [
      "The reservation expressed by many scholars regarding conventional insurance does not concern guarding against risk. It concerns the structure of the contract: the presence of interest (Riba) in the investment of premiums, excessive uncertainty about the object of exchange (Gharar), and a mechanism some liken to gambling (Maysir).",
      "In other words: it is not protection that raises the question, but the way it is financially organised.",
    ],

    s4Title: "What Takaful changes",
    s4Intro: "Takaful was designed precisely to address these three reservations:",
    s4Points: [
      { t: "A contribution, not a wager", d: "Your contributions join a solidarity fund (Tabarru') intended to assist participants affected by a loss. The intention is mutual aid, not gain from another's misfortune." },
      { t: "No interest (Riba)", d: "Funds are invested in Sharia-compliant instruments, under the supervision of an independent committee." },
      { t: "The surplus returns to you", d: "If the fund is in surplus after claims are paid, part is redistributed to participants — you are not enriching a company, you are taking part in a mutual pool." },
      { t: "Structural transparency", d: "The separation between the operator's management fee (Wakala) and the participants' fund is built into the model, not left to goodwill." },
    ],

    s5Title: "In summary",
    s5: "Takaful does not replace tawakkul and does not claim to substitute itself for Allah's decree. It is its practical application in the field of protecting property and families: you tie your mount — that is, you take a lawful and organised precaution — then you rely fully on Allah for what belongs to Him alone.",

    honesty:
      "In intellectual honesty: as with many questions of contemporary Islamic finance, nuances of appreciation exist between schools and scholars on certain aspects of application. What is consensual, however, is that properly structured Takaful directly addresses the three major reservations raised against conventional insurance. We encourage you to consult a trusted scholar if a specific point concerns you.",

    validatedLabel: "Content reviewed and validated by",
    pendingLabel: "This content is currently being reviewed by our Sharia committee.",

    faqTitle: "Related questions",
    faq: [
      { q: "Is Takaful reserved for Muslims?", a: "No. Takaful rests on principles of solidarity and financial ethics open to all. Anyone, regardless of faith, can take out Takaful insurance with Tamini." },
      { q: "Does Takaful cost more than conventional insurance?", a: "No, contributions are set on the same technical risk-assessment basis. The difference lies in the destination of the surplus: in Takaful, any excess in the fund is shared with participants rather than retained entirely by the company." },
      { q: "Who verifies the religious compliance of Tamini's products?", a: "A Sharia committee supervises product structuring, the fund investment policy and surplus redistribution arrangements, according to standards aligned with international sector references." },
    ],

    ctaTitle: "A question about a product's compliance?",
    ctaSub: "Ask our team directly, no commitment.",
    ctaBtn: "Ask on WhatsApp",
    ctaMsg: "Hello, I have a question about the religious compliance of your Takaful products",
    secondary: "Understand Takaful",
  },

  ar: {
    seoTitle: "هل التأمين نقص في التوكل على الله؟ | تأميني",
    seoDesc:
      "هل يتعارض التكافل مع التوكل؟ إجابة مؤصّلة حول مكانة التأمين في الإسلام: اعقلها وتوكل.",
    badge: "مسألة جوهرية",
    h1: "«إذا كان كل شيء من الله،",
    h2: "فلماذا أؤمّن؟»",
    intro:
      "سؤال صادق يطرحه مؤمنون صادقون. ويستحق أكثر من حجة تجارية. إليكم كيف تجيب عليه التقاليد الإسلامية.",

    s1Title: "السؤال كما يُطرح حقيقةً",
    s1: [
      "يتردد كثير من المسلمين في الاشتراك بتأمين، لا لنقص في الإمكانات أو المعلومات، بل عن قناعة: فالمرض والحادث والفقد والموت من قدر الله. أفلا يكون السعي للاحتراز منها شكاً في حكمته، بل محاولة للفرار من إرادته؟",
      "هذا التردد موثّق: تلاحظ عدة دراسات جامعية حول تبنّي التكافل أن ارتفاع مستوى الالتزام الديني يصاحبه أحياناً تحفظ أكبر تجاه التأمين — لهذا السبب بالتحديد.",
      "فالسؤال إذن ليس هامشياً ولا ساذجاً. إنه يمسّ فهم التوكل ذاته.",
    ],

    s2Title: "ما معنى التوكل حقيقةً",
    s2Intro:
      "التوكل ليس ترك الأسباب. بل هو الثقة بالله بعد الأخذ بالأسباب التي جعلها متاحة. وقد صوّرت السنة النبوية ذلك بحادثة أصبحت المرجع في هذه المسألة:",
    hadithText:
      "سأل رجل النبي ﷺ: «أأعقلها وأتوكل، أو أطلقها وأتوكل؟» فقال: «اعقلها وتوكل.»",
    hadithSource: "رواه الترمذي",
    s2After: [
      "الدرس مباشر: الأخذ باحتياط معقول لا يناقض التوكل على الله — بل هو جزء منه. فمن عقل ناقته لم يشك في القدر؛ بل تصرّف بمسؤولية، ثم فوّض إليه سبحانه ما خرج عن قدرته.",
      "وينطبق المنطق نفسه على مجالات مقبولة بلا إشكال: نتداوى عند المرض، ونضع قفلاً على الباب، وندّخر لأبنائنا. ولا يُفهم أي من ذلك على أنه سوء ظن بالله.",
    ],

    s3Title: "أين تكمن الإشكالية إذن مع التأمين؟",
    s3: [
      "التحفظ الذي عبّر عنه كثير من العلماء تجاه التأمين التقليدي لا يتعلق بالاحتراز من الخطر، بل ببنية العقد: وجود الربا في استثمار الأقساط، والغرر المفرط في محل التعاقد، وآلية يقاربها بعضهم بالميسر.",
      "بعبارة أخرى: ليست الحماية هي محل الإشكال، بل طريقة تنظيمها مالياً.",
    ],

    s4Title: "ما الذي يغيّره التكافل",
    s4Intro: "صُمّم التكافل تحديداً للإجابة على هذه التحفظات الثلاثة:",
    s4Points: [
      { t: "تبرّع لا مراهنة", d: "تنضم اشتراكاتكم إلى صندوق تضامني (تبرّع) مخصص لإغاثة المشاركين المتضررين. النية هي التعاون، لا الكسب من مصيبة الغير." },
      { t: "لا ربا", d: "تُستثمر الأموال في أدوات متوافقة مع الشريعة، تحت إشراف هيئة مستقلة." },
      { t: "الفائض يعود إليكم", d: "إذا حقق الصندوق فائضاً بعد سداد المطالبات، يُعاد جزء منه للمشاركين — فأنتم لا تُثرون شركة، بل تشاركون في تكافل." },
      { t: "شفافية بنيوية", d: "الفصل بين رسوم إدارة المشغّل (الوكالة) وصندوق المشاركين مكرّس في النموذج، لا متروك لحسن النية." },
    ],

    s5Title: "خلاصة",
    s5: "التكافل لا يحل محل التوكل ولا يدّعي أن يكون بديلاً عن قدر الله. بل هو تطبيقه العملي في مجال حماية الأموال والأسر: تعقل ناقتك — أي تأخذ احتياطاً مشروعاً منظّماً — ثم تتوكل على الله توكلاً تاماً فيما لا يملكه إلا هو.",

    honesty:
      "من باب الأمانة العلمية: كما هو الحال في كثير من مسائل التمويل الإسلامي المعاصر، توجد فروق في التقدير بين المذاهب والعلماء في بعض جوانب التطبيق. لكن ما عليه الاتفاق أن التكافل المُهيكل بشكل صحيح يجيب مباشرة على التحفظات الثلاثة الكبرى المثارة ضد التأمين التقليدي. وندعوكم لاستشارة عالم ثقة إن كانت لديكم مسألة بعينها.",

    validatedLabel: "محتوى روجع واعتُمد من",
    pendingLabel: "هذا المحتوى قيد المراجعة من قبل هيئتنا الشرعية.",

    faqTitle: "أسئلة ذات صلة",
    faq: [
      { q: "هل التكافل حكر على المسلمين؟", a: "لا. يقوم التكافل على مبادئ التضامن والأخلاق المالية المفتوحة للجميع. ويمكن لأي شخص، مهما كانت ديانته، الاشتراك في تأمين تكافلي لدى تأميني." },
      { q: "هل التكافل أغلى من التأمين التقليدي؟", a: "لا، تُحدد الاشتراكات على الأسس الفنية نفسها لتقييم الخطر. والفرق في مآل الفائض: ففي التكافل يُقتسم فائض الصندوق مع المشاركين بدل أن تحتفظ به الشركة كاملاً." },
      { q: "من يتحقق من المطابقة الشرعية لمنتجات تأميني؟", a: "تشرف هيئة شرعية على هيكلة المنتجات وسياسة استثمار الأموال وآليات إعادة توزيع الفائض، وفق معايير متوائمة مع المراجع الدولية للقطاع." },
    ],

    ctaTitle: "سؤال حول مطابقة منتج؟",
    ctaSub: "اطرحه مباشرة على فريقنا، دون التزام.",
    ctaBtn: "اطرح سؤالك عبر واتساب",
    ctaMsg: "مرحباً، لدي سؤال حول المطابقة الشرعية لمنتجاتكم التكافلية",
    secondary: "افهم التكافل",
  },
};

export default function Tawakkul() {
  const { lang, rtl } = useLang();
  const t = T[lang] || T.fr;

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B", background: "#fff" }}>
      <Seo title={t.seoTitle} description={t.seoDesc} path="/takaful-et-tawakkul" schema={faqSchema(t.faq)} noindex={!VALIDATION.validated} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,#071028,${N})`, padding: "76px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(110,192,38,.15)", border: "1px solid rgba(110,192,38,.35)", borderRadius: 50, fontSize: 12, fontWeight: 700, color: G, marginBottom: 22 }}>
            {t.badge}
          </span>
          <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(26px,4.2vw,42px)", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 20 }}>
            {t.h1}<br /><span style={{ color: G }}>{t.h2}</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto" }}>{t.intro}</p>
        </div>
      </section>

      {/* SECTION 1 */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3vw,28px)", fontWeight: 800, color: N, marginBottom: 18 }}>{t.s1Title}</h2>
          {t.s1.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* SECTION 2 — HADITH */}
      <section style={{ padding: "60px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3vw,28px)", fontWeight: 800, color: N, marginBottom: 18 }}>{t.s2Title}</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 26 }}>{t.s2Intro}</p>

          <blockquote style={{ margin: 0, padding: "28px 30px", background: "#fff", borderRadius: 16, borderInlineStart: `5px solid ${G}`, boxShadow: "0 4px 20px rgba(11,31,77,.06)", marginBottom: 26 }}>
            <p style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(16px,2.2vw,19px)", color: N, lineHeight: 1.8, fontStyle: rtl ? "normal" : "italic", marginBottom: 12 }}>
              {t.hadithText}
            </p>
            <cite style={{ fontSize: 12.5, color: G, fontWeight: 700, fontStyle: "normal" }}>— {t.hadithSource}</cite>
          </blockquote>

          {t.s2After.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* SECTION 3 */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3vw,28px)", fontWeight: 800, color: N, marginBottom: 18 }}>{t.s3Title}</h2>
          {t.s3.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* SECTION 4 */}
      <section style={{ padding: "60px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3vw,28px)", fontWeight: 800, color: N, marginBottom: 14 }}>{t.s4Title}</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 26 }}>{t.s4Intro}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {t.s4Points.map((p, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", border: "1px solid #e8ecf0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: G, fontWeight: 800, fontSize: 16 }}>✓</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: N }}>{p.t}</h3>
                </div>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — SUMMARY */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3vw,28px)", fontWeight: 800, color: N, marginBottom: 18 }}>{t.s5Title}</h2>
          <p style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(16px,2.3vw,20px)", color: "#334155", lineHeight: 1.85 }}>{t.s5}</p>
        </div>
      </section>

      {/* HONESTY NOTE */}
      <section style={{ padding: "0 24px 56px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ padding: "20px 24px", background: "#F8FAFF", borderRadius: 14, border: "1px solid #e8ecf0" }}>
            <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.8 }}>{t.honesty}</p>
          </div>

          {/* Mention de validation religieuse */}
          <div style={{ marginTop: 16, padding: "16px 22px", background: VALIDATION.validated ? "rgba(110,192,38,.08)" : "#FDF6F5", borderRadius: 12, borderInlineStart: `4px solid ${VALIDATION.validated ? G : "#E67E22"}` }}>
            {VALIDATION.validated ? (
              <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
                <strong>{t.validatedLabel} :</strong> {VALIDATION.name}
                {VALIDATION.role ? ` — ${VALIDATION.role}` : ""}
              </p>
            ) : (
              <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7 }}>{t.pendingLabel}</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "56px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(20px,2.8vw,26px)", fontWeight: 800, color: N, marginBottom: 24, textAlign: "center" }}>{t.faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.faq.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #e8ecf0" }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: N, marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 24px", background: `linear-gradient(135deg,${N},#0d2a5e)`, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(21px,3.2vw,30px)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 26 }}>{t.ctaSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href={`https://wa.me/${WA_BOT}?text=${encodeURIComponent(t.ctaMsg)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "15px 32px", background: G, color: N, borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 28px rgba(110,192,38,.3)" }}>
              {t.ctaBtn}
            </a>
            <Link to="/faq" style={{ padding: "15px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

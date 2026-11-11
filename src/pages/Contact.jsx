import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import QuickForm from "../components/QuickForm";
import Seo, { breadcrumbSchema, organizationSchema } from "../seo/Seo";
import { AGENCIES, EMAIL, PHONE, WA_B2B, WA_B2C, wa, hoursLines } from "../config/site";

const T = {
  fr: {
    seoT: "Contact Tamini Insurance Djibouti : téléphone, WhatsApp, agences", seoD: "Contactez Tamini Insurance à Djibouti : 21 35 04 03, WhatsApp 77 09 41 41 (particuliers) et 77 23 92 92 (entreprises), e-mail et adresses des agences.",
    eye: "Nous contacter", h1: "Un conseiller Tamini vous répond", sub: "Choisissez le canal le plus simple pour vous. Pour un devis, le formulaire en ligne est le plus rapide : il transmet directement vos informations au bon conseiller.",
    ch: [["Téléphone", PHONE.label, `tel:${PHONE.intl}`, "Standard et sinistres"], ["WhatsApp particuliers", WA_B2C.display, wa(WA_B2C.number, "Bonjour Tamini, j'ai une question."), "Assistant et conseillers, devis particuliers"], ["WhatsApp entreprises", WA_B2B.display, wa(WA_B2B.number, "Bonjour Tamini, je vous contacte pour mon entreprise."), "Conseiller dédié aux entreprises"], ["E-mail", EMAIL, `mailto:${EMAIL}`, "Documents, partenariats, réclamations"]],
    formH: "Écrivez-nous", formP: "Trois champs suffisent. Votre message s'ouvre dans WhatsApp, prêt à être envoyé.",
    f: { nom: "Nom et prénom", tel: "Téléphone", sujet: "Sujet", msg: "Votre message" },
    subjects: ["Demande de devis", "Question sur mon contrat", "Sinistre", "Entreprise / partenariat", "Réclamation", "Autre"],
    submit: "Envoyer sur WhatsApp", intro: "Bonjour Tamini 👋 Message envoyé depuis le site :",
    agH: "Nos agences à Djibouti", dir: "Itinéraire", allAg: "Détail des agences",
    recH: "Réclamations", recP: ["Une insatisfaction ? Écrivez-nous en précisant votre nom, votre numéro de contrat ou de sinistre et l'objet de votre réclamation, à " + EMAIL + " ou en agence.", "Nous accusons réception de votre réclamation et vous indiquons la personne qui la suit.", "Si la réponse ne vous satisfait pas, vous pouvez demander un réexamen par la direction de la compagnie."],
    home: "Accueil", quote: "Faire une demande de devis", quoteP: "Pour un prix précis, répondez aux questions du formulaire de devis (environ 60 secondes).",
  },
  en: {
    seoT: "Contact Tamini Insurance Djibouti: phone, WhatsApp, branches", seoD: "Contact Tamini Insurance in Djibouti: 21 35 04 03, WhatsApp 77 09 41 41 (individuals) and 77 23 92 92 (business), email and branch addresses.",
    eye: "Contact us", h1: "A Tamini advisor will answer you", sub: "Pick the easiest channel for you. For a quote, the online form is fastest: it sends your details straight to the right advisor.",
    ch: [["Phone", PHONE.label, `tel:${PHONE.intl}`, "Switchboard and claims"], ["WhatsApp individuals", WA_B2C.display, wa(WA_B2C.number, "Hello Tamini, I have a question."), "Assistant and advisors, personal quotes"], ["WhatsApp business", WA_B2B.display, wa(WA_B2B.number, "Hello Tamini, I'm contacting you for my company."), "Dedicated business advisor"], ["Email", EMAIL, `mailto:${EMAIL}`, "Documents, partnerships, complaints"]],
    formH: "Write to us", formP: "Three fields are enough. Your message opens in WhatsApp, ready to send.",
    f: { nom: "Full name", tel: "Phone", sujet: "Subject", msg: "Your message" },
    subjects: ["Quote request", "Question about my policy", "Claim", "Business / partnership", "Complaint", "Other"],
    submit: "Send on WhatsApp", intro: "Hello Tamini 👋 Message sent from the website:",
    agH: "Our branches in Djibouti", dir: "Directions", allAg: "Branch details",
    recH: "Complaints", recP: ["Not satisfied? Write to us with your name, policy or claim number and the subject of your complaint, at " + EMAIL + " or in branch.", "We acknowledge your complaint and tell you who is handling it.", "If the answer does not satisfy you, you can ask for a review by the company's management."],
    home: "Home", quote: "Request a quote", quoteP: "For an exact price, answer the quote form questions (about 60 seconds).",
  },
  ar: {
    seoT: "اتصل بتأميني جيبوتي: الهاتف، واتساب، الوكالات", seoD: "تواصلوا مع تأميني في جيبوتي: 21 35 04 03، واتساب 77 09 41 41 (الأفراد) و77 23 92 92 (الشركات)، البريد الإلكتروني وعناوين الوكالات.",
    eye: "اتصل بنا", h1: "مستشار تأميني يجيبكم", sub: "اختاروا القناة الأسهل لكم. لطلب عرض سعر، النموذج الإلكتروني هو الأسرع: ينقل معلوماتكم مباشرة إلى المستشار المناسب.",
    ch: [["الهاتف", PHONE.label, `tel:${PHONE.intl}`, "الاستقبال والمطالبات"], ["واتساب الأفراد", WA_B2C.display, wa(WA_B2C.number, "مرحباً تأميني، لدي سؤال."), "المساعد والمستشارون، عروض الأفراد"], ["واتساب الشركات", WA_B2B.display, wa(WA_B2B.number, "مرحباً تأميني، أتواصل بخصوص شركتي."), "مستشار مخصص للشركات"], ["البريد الإلكتروني", EMAIL, `mailto:${EMAIL}`, "الوثائق، الشراكات، الشكاوى"]],
    formH: "راسلونا", formP: "ثلاثة حقول تكفي. تُفتح رسالتكم في واتساب جاهزة للإرسال.",
    f: { nom: "الاسم الكامل", tel: "الهاتف", sujet: "الموضوع", msg: "رسالتكم" },
    subjects: ["طلب عرض سعر", "سؤال عن عقدي", "مطالبة", "شركة / شراكة", "شكوى", "أخرى"],
    submit: "إرسال عبر واتساب", intro: "مرحباً تأميني 👋 رسالة من الموقع:",
    agH: "وكالاتنا في جيبوتي", dir: "الاتجاهات", allAg: "تفاصيل الوكالات",
    recH: "الشكاوى", recP: ["غير راضٍ؟ راسلونا مع ذكر اسمكم ورقم العقد أو المطالبة وموضوع الشكوى على " + EMAIL + " أو في الوكالة.", "نؤكد استلام شكواكم ونحدد لكم الشخص المسؤول عن متابعتها.", "إذا لم يرضكم الرد، يمكنكم طلب مراجعة من إدارة الشركة."],
    home: "الرئيسية", quote: "اطلب عرض سعر", quoteP: "للحصول على سعر دقيق، أجيبوا على أسئلة نموذج عرض السعر (حوالي 60 ثانية).",
  },
};

export default function Contact() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const subj = { fr: T.fr.subjects, en: T.en.subjects, ar: T.ar.subjects };
  const schema = { "@context": "https://schema.org", "@graph": [{ ...organizationSchema, "@context": undefined }, breadcrumbSchema([{ name: t.home, path: "/" }, { name: t.eye, path: "/contact" }])].map(({ "@context": c, ...r }) => r) };
  return (
    <>
      <Seo title={t.seoT} description={t.seoD} path="/contact" schema={schema} image="/images/facade.webp" />
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs"><Link to="/">{t.home}</Link> / {t.eye}</nav>
          <span className="eyebrow">{t.eye}</span>
          <h1>{t.h1}</h1>
          <p className="lead">{t.sub}</p>
        </div>
      </section>
      <section className="section-sm">
        <div className="container grid g4">
          {t.ch.map(([h, v, href, d]) => (
            <a key={h} href={href} className="card card-link" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-cta={`contact_${h}`}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>{h}</span>
              <h2 style={{ fontFamily: "var(--sans)", fontSize: 20, margin: "6px 0" }}>{v}</h2>
              <p>{d}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="section-sm">
        <div className="container grid g2" style={{ alignItems: "start", gap: 40 }}>
          <div>
            <h2 className="h-md">{t.formH}</h2>
            <p style={{ color: "var(--muted)" }}>{t.formP}</p>
            <QuickForm id="contact-form" formName="contact" lang={lang} prefix="TM-CT" intro={t.intro} submitLabel={t.submit}
              waNumberFor={(v) => ([T.fr.subjects[3], T.en.subjects[3], T.ar.subjects[3]].includes(v.sujet) ? WA_B2B.number : WA_B2C.number)}
              fields={[
                { id: "nom", label: t.f.nom, required: true, autoComplete: "name" },
                { id: "tel", label: t.f.tel, type: "tel", required: true },
                { id: "sujet", label: t.f.sujet, type: "select", options: subj, required: true },
                { id: "msg", label: t.f.msg, type: "textarea" },
              ]} />
            <div className="callout" style={{ marginTop: 16 }}><strong>{t.quote}</strong><p style={{ margin: "4px 0 0" }}>{t.quoteP} <Link to="/devis">→</Link></p></div>
          </div>
          <div>
            <h2 className="h-md">{t.agH}</h2>
            <div className="grid" style={{ gap: 12 }}>
              {AGENCIES.map((a) => (
                <div className="card" key={a.id}>
                  <h3>{a.name[lang] || a.name.fr}</h3>
                  <p>{a.place[lang] || a.place.fr} · {a.note[lang] || a.note.fr}</p>
                  {a.hours && <p style={{ fontSize: 14 }}>{hoursLines(a, lang).join(" · ")}</p>}
                  <a href={a.maps} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "var(--lime-ink)" }}>{t.dir} →</a>
                </div>
              ))}
            </div>
            <Link to="/agences" className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}>{t.allAg}</Link>
          </div>
        </div>
      </section>
      <section className="section-sm bg-cream" id="reclamations">
        <div className="container narrow">
          <h2 className="h-md">{t.recH}</h2>
          <ol className="prose" style={{ fontSize: 16 }}>{t.recP.map((p) => <li key={p}>{p}</li>)}</ol>
        </div>
      </section>
    </>
  );
}

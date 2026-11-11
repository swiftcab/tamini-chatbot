import React from "react";
import { useLang } from "../i18n/LanguageContext";
import Seo from "../seo/Seo";
import { PAGE_META } from "../seo/meta";

const N = "#0B1F4D";

const P = {
  fr: {
    title: "Politique de Confidentialité",
    sub: "Tamini Insurance SA s'engage à protéger vos données personnelles avec la même rigueur que votre patrimoine.",
    updated: "Dernière mise à jour : Juillet 2026",
    sections: [
      { h: "Cadre juridique applicable", b: ["Cette politique est régie par la Loi n°019/AN/23/9ème L du 6 juillet 2025 relative au Code du Numérique, notamment son Livre Premier sur la protection des données personnelles, ainsi que par les textes d'application de la Commission Nationale de Protection des Données Personnelles.", "Compte tenu de l'activité d'assurance de Tamini à Djibouti, cette politique s'inscrit également dans le cadre de la Loi n°40/AN/99/4ème L du 8 juin 1999 réglementant les compagnies d'assurance, ainsi que des règles prudentielles, comptables et sectorielles applicables."] },
      { h: "1. Introduction", b: ["Tamini Insurance SA (« Tamini », « nous ») est une compagnie d'assurance basée à Djibouti, proposant des solutions Takaful pour particuliers, professionnels et entreprises.", "Cette politique explique comment Tamini collecte, utilise, conserve, partage et protège vos données personnelles lors de vos interactions avec nos canaux digitaux."] },
      { h: "2. Qui sommes-nous", b: ["Tamini Insurance SA est le responsable de traitement de vos données personnelles.", "Adresse : Place du 27 Juin, Djibouti, République de Djibouti", "Téléphone : +253 21 35 04 03 · WhatsApp : +253 77 23 92 92 (commercial) · +253 77 09 41 41 (assistant)", "Email : info@tamini-insurance.com"] },
      { h: "3. Données que nous collectons", b: ["Données fournies : identité, coordonnées, informations de contrat et de devis, données de sinistres, informations financières et de paiement.", "Données collectées automatiquement : adresse IP, navigateur, appareil, données d'utilisation du site, cookies et données analytiques.", "Données de tiers : intermédiaires, courtiers, garages, experts, prestataires d'assistance, partenaires de paiement."] },
      { h: "4. Pourquoi nous utilisons vos données", b: ["Fournir nos services d'assurance : devis, contrats, avenants, renouvellements.", "Traiter les sinistres, organiser l'assistance et le règlement des indemnisations.", "Exploiter, sécuriser et améliorer notre site et nos services digitaux.", "Prévenir la fraude et assurer la gestion des risques."] },
      { h: "5. Bases légales", b: ["Exécution du contrat d'assurance.", "Respect de nos obligations légales et réglementaires.", "Intérêt légitime de Tamini (prévention de la fraude, sécurité).", "Votre consentement, notamment pour la prospection ou les cookies non essentiels."] },
      { h: "6. Données sensibles", b: ["Tamini traite des données sensibles uniquement lorsque cela est nécessaire et proportionné : données de santé, données de sinistres corporels, ou données requises pour l'administration de produits Takaful."] },
      { h: "7. Cookies et technologies de suivi", b: ["Tamini utilise des cookies pour faire fonctionner le site, améliorer la performance et mesurer l'audience. Votre consentement est recueilli pour les cookies non essentiels."] },
      { h: "8. Partage des données", b: ["Tamini partage vos données uniquement lorsque nécessaire : prestataires techniques, partenaires d'assurance et de réassurance, garages et experts. Tamini ne vend jamais vos données personnelles."] },
      { h: "9. Durée de conservation", b: ["Données de contrat : durée du contrat + 10 ans. Données de sinistres : 10 ans. Données comptables : 10 ans. Données de prospection : 3 ans après le dernier contact."] },
      { h: "10. Vos droits", b: ["Droit d'accès, de rectification, à l'effacement, d'opposition, de retrait du consentement et à la portabilité de vos données.", "Pour exercer ces droits gratuitement, contactez-nous à l'adresse indiquée en section 2."] },
      { h: "11. Contact", b: ["Tamini Insurance SA — Place du 27 Juin, Djibouti, République de Djibouti", "Email : info@tamini-insurance.com · Téléphone : +253 21 35 04 03"] },
    ],
  },
  en: {
    title: "Privacy Policy",
    sub: "Tamini Insurance SA is committed to protecting your personal data with the same rigor as your assets.",
    updated: "Last updated: July 2026",
    sections: [
      { h: "Applicable Legal Framework", b: ["This Policy is governed by Law No. 019/AN/23/9th L of 6 July 2025 on the Digital Code, particularly Book One on personal data protection, and the implementing texts of the National Commission for the Protection of Personal Data.", "Given Tamini's insurance activity in Djibouti, this Policy is also read alongside Law No. 40/AN/99/4th L of 8 June 1999 regulating insurance companies."] },
      { h: "1. Introduction", b: ["Tamini Insurance SA (\"Tamini\", \"we\") is an insurance company based in Djibouti, offering Takaful solutions for individuals, professionals and businesses.", "This Policy explains how Tamini collects, uses, retains, shares and protects your personal data through our digital channels."] },
      { h: "2. Who We Are", b: ["Tamini Insurance SA is the data controller for your personal data.", "Address: Place du 27 Juin, Djibouti, Republic of Djibouti", "Phone: +253 21 35 04 03 · WhatsApp: +253 77 23 92 92 (sales) · +253 77 09 41 41 (assistant)", "Email: info@tamini-insurance.com"] },
      { h: "3. Data We Collect", b: ["Data you provide: identity, contact details, policy and quote information, claims data, financial information.", "Data collected automatically: IP address, browser, device, website usage data, cookies and analytics.", "Data from third parties: intermediaries, brokers, garages, experts, assistance providers, payment partners."] },
      { h: "4. Why We Use Your Data", b: ["Providing insurance services: quotes, contracts, endorsements, renewals.", "Handling claims, organizing assistance and compensation.", "Operating, securing and improving our website and digital services.", "Preventing fraud and managing risk."] },
      { h: "5. Legal Bases", b: ["Performance of the insurance contract.", "Compliance with legal and regulatory obligations.", "Tamini's legitimate interests (fraud prevention, security).", "Your consent, notably for marketing or non-essential cookies."] },
      { h: "6. Sensitive Personal Data", b: ["Tamini processes sensitive data only where necessary and proportionate: health data, bodily injury claims data, or data required for Takaful product administration."] },
      { h: "7. Cookies and Tracking", b: ["Tamini uses cookies to operate the website, improve performance and measure audience. Consent is obtained for non-essential cookies."] },
      { h: "8. Data Sharing", b: ["Tamini shares data only where necessary: technical providers, insurance and reinsurance partners, garages and experts. Tamini never sells your personal data."] },
      { h: "9. Data Retention", b: ["Contract data: duration of contract + 10 years. Claims data: 10 years. Accounting data: 10 years. Prospecting data: 3 years after last contact."] },
      { h: "10. Your Rights", b: ["Right of access, rectification, erasure, objection, withdrawal of consent and data portability.", "To exercise these rights free of charge, contact us at the address in Section 2."] },
      { h: "11. Contact", b: ["Tamini Insurance SA — Place du 27 Juin, Djibouti, Republic of Djibouti", "Email: info@tamini-insurance.com · Phone: +253 21 35 04 03"] },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    sub: "تلتزم شركة تأميني للتأمين بحماية بياناتكم الشخصية بنفس الصرامة التي نحمي بها ممتلكاتكم.",
    updated: "آخر تحديث: يوليو 2026",
    sections: [
      { h: "الإطار القانوني المعمول به", b: ["تخضع هذه السياسة للقانون رقم 019/AN/23/9ème L الصادر في 6 يوليو 2025 المتعلق بقانون الرقمنة، ولا سيما الكتاب الأول المتعلق بحماية البيانات الشخصية.", "نظراً لنشاط تأميني في مجال التأمين بجيبوتي، تُقرأ هذه السياسة أيضاً في ضوء القانون رقم 40/AN/99/4ème L الصادر في 8 يونيو 1999 المنظم لشركات التأمين."] },
      { h: "1. مقدمة", b: ["شركة Tamini Insurance SA (\u00ABتأميني\u00BB، \u00ABنحن\u00BB) هي شركة تأمين مقرها جيبوتي، تقدم حلول تكافل للأفراد والمهنيين والشركات.", "توضح هذه السياسة كيفية جمع تأميني لبياناتكم الشخصية واستخدامها والاحتفاظ بها ومشاركتها وحمايتها عبر قنواتنا الرقمية."] },
      { h: "2. من نحن", b: ["شركة Tamini Insurance SA هي المسؤولة عن معالجة بياناتكم الشخصية.", "العنوان: ساحة 27 يونيو، جيبوتي، جمهورية جيبوتي", "الهاتف: 253+ 21 35 04 03 · واتساب: 253+ 77 23 92 92 (تجاري) · 253+ 77 09 41 41 (المساعد)", "البريد الإلكتروني: info@tamini-insurance.com"] },
      { h: "3. البيانات التي نجمعها", b: ["البيانات المقدمة منكم: الهوية، معلومات الاتصال، معلومات العقد والعرض، بيانات المطالبات، المعلومات المالية.", "البيانات المجمعة تلقائياً: عنوان IP، المتصفح، الجهاز، بيانات استخدام الموقع، ملفات تعريف الارتباط.", "بيانات من أطراف ثالثة: الوسطاء، السماسرة، الكراجات، الخبراء، مقدمو المساعدة، شركاء الدفع."] },
      { h: "4. لماذا نستخدم بياناتكم", b: ["تقديم خدمات التأمين: عروض الأسعار، العقود، الملاحق، التجديدات.", "معالجة المطالبات، تنظيم المساعدة والتعويض.", "تشغيل وتأمين وتحسين موقعنا وخدماتنا الرقمية.", "منع الاحتيال وإدارة المخاطر."] },
      { h: "5. الأسس القانونية", b: ["تنفيذ عقد التأمين.", "الامتثال للالتزامات القانونية والتنظيمية.", "المصلحة المشروعة لتأميني (منع الاحتيال، الأمن).", "موافقتكم، لا سيما للتسويق أو ملفات تعريف الارتباط غير الأساسية."] },
      { h: "6. البيانات الحساسة", b: ["تعالج تأميني البيانات الحساسة فقط عند الضرورة والتناسب: البيانات الصحية، بيانات مطالبات الإصابات الجسدية، أو البيانات المطلوبة لإدارة منتجات التكافل."] },
      { h: "7. ملفات تعريف الارتباط", b: ["تستخدم تأميني ملفات تعريف الارتباط لتشغيل الموقع وتحسين الأداء وقياس الجمهور. تُجمع موافقتكم لملفات تعريف الارتباط غير الأساسية."] },
      { h: "8. مشاركة البيانات", b: ["تشارك تأميني البيانات فقط عند الضرورة: مقدمو الخدمات التقنية، شركاء التأمين وإعادة التأمين، الكراجات والخبراء. لا تبيع تأميني بياناتكم الشخصية أبداً."] },
      { h: "9. مدة الاحتفاظ بالبيانات", b: ["بيانات العقد: مدة العقد + 10 سنوات. بيانات المطالبات: 10 سنوات. البيانات المحاسبية: 10 سنوات. بيانات التنقيب: 3 سنوات بعد آخر اتصال."] },
      { h: "10. حقوقكم", b: ["الحق في الوصول والتصحيح والمحو والاعتراض وسحب الموافقة ونقل البيانات.", "لممارسة هذه الحقوق مجاناً، تواصلوا معنا على العنوان المذكور في القسم 2."] },
      { h: "11. الاتصال", b: ["Tamini Insurance SA — ساحة 27 يونيو، جيبوتي، جمهورية جيبوتي", "البريد الإلكتروني: info@tamini-insurance.com · الهاتف: 253+ 21 35 04 03"] },
    ],
  },
};

export default function Privacy() {
  const { lang, rtl } = useLang();
  const t = P[lang];
  const seoMeta = PAGE_META.privacy[lang];

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B", background: "#fff", minHeight: "80vh" }}>
      <Seo title={seoMeta.title} description={seoMeta.description} path="/confidentialite" />

      <div style={{ background: `linear-gradient(135deg,${N},#0d2a5e)`, padding: "64px 24px 56px", textAlign: "center" }}>
        <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>{t.title}</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{t.sub}</p>
        <p style={{ fontSize: 12, color: "#6EC026", marginTop: 16, fontWeight: 600 }}>{t.updated}</p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        {t.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 36, paddingBottom: i < t.sections.length - 1 ? 32 : 0, borderBottom: i < t.sections.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <h2 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: N, marginBottom: 14 }}>{s.h}</h2>
            {s.b.map((p, pi) => (
              <p key={pi} style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, marginBottom: 10 }}>{p}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

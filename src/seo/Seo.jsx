import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n/LanguageContext";
import { AGENCIES, PHONE, EMAIL, WA_B2C, WA_B2B, openingHoursSpec } from "../config/site";

// ─────────────────────────────────────────────────────────────
// Composant SEO réutilisable.
// Chaque page l'appelle avec son titre + sa description.
// Il génère automatiquement : title, meta description, canonical,
// hreflang (FR/EN/AR), Open Graph, Twitter Card et JSON-LD.
// ─────────────────────────────────────────────────────────────

export const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://tamini-website.vercel.app").replace(/\/$/, "");
// ⚠️ À remplacer par https://tamini-insurance.com lors de la mise en ligne
// sur le domaine définitif — une seule ligne à changer.

const OG_LOCALE = { fr: "fr_DJ", en: "en_DJ", ar: "ar_DJ" };

export default function Seo({
  title,
  description,
  path = "/",
  image = "/images/facade.webp",
  type = "website",
  schema = null,
  noindex = false,
  onlyLang = null, // contenu disponible dans une seule langue (ex. articles)
}) {
  const { lang } = useLang();
  const base = `${SITE_URL}${path}`;
  const langUrl = (l) => (l === "fr" ? base : `${base}?lang=${l}`);
  const url = onlyLang ? base : langUrl(lang);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Base */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Hreflang — une URL par langue (?lang=en / ?lang=ar), fr = URL nue */}
      {onlyLang ? <link rel="alternate" hrefLang={onlyLang} href={base} /> : null}
      {!onlyLang && <link rel="alternate" hrefLang="fr" href={langUrl("fr")} />}
      {!onlyLang && <link rel="alternate" hrefLang="en" href={langUrl("en")} />}
      {!onlyLang && <link rel="alternate" hrefLang="ar" href={langUrl("ar")} />}
      {!onlyLang && <link rel="alternate" hrefLang="x-default" href={langUrl("fr")} />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Tamini Insurance SA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={OG_LOCALE[onlyLang || lang] || "fr_DJ"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Données structurées spécifiques à la page */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

// ── Schémas réutilisables ────────────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Tamini Insurance SA",
  alternateName: "Tamini Takaful",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/facade.webp`,
  description:
    "Première compagnie d'assurance Takaful agréée en République de Djibouti. Solutions d'assurance conformes à la Charia pour particuliers et entreprises depuis 2020.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Place du 27 Juin",
    addressLocality: "Djibouti",
    addressCountry: "DJ",
  },
  telephone: "+253-21-35-04-03",
  email: EMAIL,
  openingHoursSpecification: openingHoursSpec(AGENCIES[0]),
  sameAs: [
    "https://www.facebook.com/Tamini.insurance",
    "https://www.linkedin.com/company/70424040/",
  ],
  areaServed: [
    { "@type": "Country", name: "Djibouti" },
    { "@type": "Country", name: "Somaliland" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Uganda" },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: PHONE.intl, contactType: "customer service", areaServed: "DJ", availableLanguage: ["French", "English", "Arabic"] },
    { "@type": "ContactPoint", telephone: `+${WA_B2C.number}`, contactType: "sales", name: "WhatsApp particuliers" },
    { "@type": "ContactPoint", telephone: `+${WA_B2B.number}`, contactType: "sales", name: "WhatsApp entreprises" },
    { "@type": "ContactPoint", telephone: PHONE.intl, contactType: "claims" },
  ],
  department: AGENCIES.filter((a) => a.id !== "siege").map((a) => ({
    "@type": "InsuranceAgency",
    name: `Tamini Insurance — ${a.name.fr}`,
    address: { "@type": "PostalAddress", streetAddress: a.place.fr, addressLocality: "Djibouti", addressCountry: "DJ" },
    telephone: PHONE.intl,
    openingHoursSpecification: openingHoursSpec(a),
  })),
  knowsAbout: [
    "Takaful",
    "Assurance islamique",
    "Assurance automobile",
    "Assurance maritime",
    "Finance islamique",
  ],
};

export function serviceSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "InsuranceAgency",
      name: "Tamini Insurance SA",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Djibouti" },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema(a, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: a.lang,
    datePublished: a.date,
    dateModified: a.updated || a.date,
    mainEntityOfPage: `${SITE_URL}${path}`,
    image: `${SITE_URL}/images/${a.image || "facade"}.webp`,
    author: { "@type": "Organization", name: "Tamini Insurance SA", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Tamini Insurance SA", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
  };
}

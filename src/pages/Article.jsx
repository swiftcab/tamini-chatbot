import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { ARTICLES, articleBySlug } from "../content/articles";
import { renderMarkdown } from "../lib/markdown";
import { PRODUCTS } from "../i18n/products";
import { useFunnel } from "../funnel/FunnelContext";
import { SHARIA_ARTICLES } from "../config/compliance";
import Seo, { articleSchema, breadcrumbSchema, faqSchema } from "../seo/Seo";
import NotFound from "./NotFound";

const UI = {
  fr: { home: "Accueil", blog: "Guides", toc: "Sommaire", min: "min de lecture", faq: "Questions fréquentes", related: "À lire aussi", cta: "Obtenir mon devis", ctaH: "Passer à l'action", ctaP: "Quelques questions, puis un conseiller vous envoie une proposition personnalisée.", product: "Voir l'assurance", onlyFr: "Cet article est disponible en français.", updated: "Mis à jour le" },
  en: { home: "Home", blog: "Guides", toc: "Contents", min: "min read", faq: "Frequently asked questions", related: "Read next", cta: "Get my quote", ctaH: "Take the next step", ctaP: "A few questions, then an advisor sends you a personalised proposal.", product: "See the cover", onlyFr: "This article is available in French.", updated: "Updated" },
  ar: { home: "الرئيسية", blog: "الأدلة", toc: "المحتويات", min: "دقائق قراءة", faq: "أسئلة شائعة", related: "اقرأ أيضاً", cta: "احصل على عرضي", ctaH: "الخطوة التالية", ctaP: "بضعة أسئلة، ثم يرسل لكم مستشار عرضاً مخصصاً.", product: "عرض التأمين", onlyFr: "هذا المقال متوفر باللغة الفرنسية.", updated: "تاريخ التحديث" },
};

const fmt = (d, lang) => new Date(d + "T12:00:00Z").toLocaleDateString(lang === "ar" ? "ar-DJ" : lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function Article() {
  const { slug } = useParams();
  const { lang } = useLang();
  const { openFunnel } = useFunnel();
  const a = articleBySlug(slug);
  if (!a) return <NotFound />;
  const ui = UI[lang] || UI.fr;
  const path = `/blog/${a.slug}`;
  const locked = a.review === "charia" && !SHARIA_ARTICLES.validated;
  const { html, toc } = renderMarkdown(a.body);
  const related = ARTICLES.filter((x) => x.slug !== a.slug && !(x.review === "charia" && !SHARIA_ARTICLES.validated) && (x.category === a.category || x.product === a.product)).slice(0, 3);
  const product = a.product ? PRODUCTS[a.product] : null;
  const faqItems = (a.faq || []).map(([q, ans]) => ({ q, a: ans }));
  const schema = { "@context": "https://schema.org", "@graph": [articleSchema(a, path), breadcrumbSchema([{ name: ui.home, path: "/" }, { name: ui.blog, path: "/blog" }, { name: a.title, path }]), ...(faqItems.length ? [faqSchema(faqItems)] : [])].map(({ "@context": c, ...rest }) => rest) };

  return (
    <article lang={a.lang} dir={a.lang === "ar" ? "rtl" : "ltr"}>
      <Seo title={a.seoTitle || a.title} description={a.description} path={path} type="article" schema={schema} noindex={locked} onlyLang={a.lang} image={product ? `/images/${product.hero}.webp` : "/images/facade.webp"} />
      <header className="page-hero">
        <div className="container"><div style={{ maxWidth: 860 }}>
          <nav className="crumbs" aria-label="Fil d'Ariane"><Link to="/">{ui.home}</Link> / <Link to="/blog">{ui.blog}</Link></nav>
          <span className="pill">{a.category}</span>
          <h1 style={{ marginTop: 14 }}>{a.title}</h1>
          <p className="lead">{a.description}</p>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Tamini Insurance · {ui.updated} <time dateTime={a.updated || a.date}>{fmt(a.updated || a.date, a.lang)}</time> · {a.readMin} {ui.min}</p>
          {lang !== a.lang && <p className="callout" style={{ marginTop: 16 }}>{ui.onlyFr}</p>}
        </div></div>
      </header>
      <div className="container section-sm">
        <div className="article-grid">
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <aside>
            <div className="toc">
              {toc.length > 2 && (
                <nav className="card" aria-label={ui.toc} style={{ marginBottom: 16 }}>
                  <strong style={{ color: "var(--navy)" }}>{ui.toc}</strong>
                  <ol style={{ paddingInlineStart: 18, margin: "10px 0 0", fontSize: 14 }}>
                    {toc.map((h) => <li key={h.id} style={{ marginBottom: 6 }}><a href={`#${h.id}`}>{h.text}</a></li>)}
                  </ol>
                </nav>
              )}
              <div className="card bg-navy" style={{ border: 0 }}>
                <h2 className="h-md" style={{ color: "#fff", fontSize: 20 }}>{ui.ctaH}</h2>
                <p style={{ color: "rgba(255,255,255,.8)", fontSize: 14 }}>{ui.ctaP}</p>
                <button type="button" className="btn btn-lime" style={{ width: "100%" }} onClick={() => openFunnel(a.product || null, `article_${a.slug}`)}>{ui.cta}</button>
                {product && <Link to={`/${product.segment}/${a.product}`} style={{ display: "block", marginTop: 12, color: "#fff", fontSize: 14 }}>{ui.product} : {product[lang === a.lang ? lang : a.lang]?.badge || product.fr.badge} →</Link>}
              </div>
            </div>
          </aside>
        </div>

        {faqItems.length > 0 && (
          <section className="narrow" style={{ marginTop: 48 }}>
            <h2 className="h-md">{ui.faq}</h2>
            {faqItems.map((f) => <details key={f.q} className="faq"><summary>{f.q}</summary><div>{f.a}</div></details>)}
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2 className="h-md">{ui.related}</h2>
            <div className="grid g3">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="card card-link"><span className="pill">{r.category}</span><h3 style={{ marginTop: 10 }}>{r.title}</h3><p>{r.excerpt}</p></Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

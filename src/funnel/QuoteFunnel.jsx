import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { PRODUCTS, PARTICULIERS, ENTREPRISES } from "../i18n/products";
import { FUNNELS, CONTACT, PICKER } from "./questions";
import { track, sendLead, sourceLabel } from "../tracking/analytics";

// ─────────────────────────────────────────────────────────────
// Formulaire de devis multi-étapes (1 question / écran).
// Fin du parcours : message WhatsApp pré-rempli et structuré,
// routé vers la bonne ligne (B2C 77 09 41 41 / B2B 77 23 92 92).
// ─────────────────────────────────────────────────────────────

const N = "#0B1F4D", G = "#6EC026";
const WA_B2C = "25377094141", WA_B2B = "25377239292";
const PHONE = "+25321350403";

const UI = {
  fr: { pill: "Devis gratuit · 60 secondes", back: "Retour", close: "Fermer", next: "Continuer", skip: "Passer", step: "Question", of: "sur", ready: "Votre demande est prête", readySub: "Un conseiller Tamini reçoit directement vos réponses : vous n'aurez rien à répéter.", edit: "Modifier", consent: "J'accepte que Tamini Insurance me recontacte au sujet de cette demande.", privacy: "Confidentialité", send: "Recevoir ma proposition sur WhatsApp", sendB2B: "Envoyer au service Entreprises", reassure: "🔒 Aucune pièce d'identité ni donnée bancaire demandée", thanks: "Merci", thanksSub: "WhatsApp s'est ouvert avec votre demande déjà rédigée. Il ne vous reste qu'à appuyer sur « Envoyer ».", noWa: "WhatsApp ne s'ouvre pas ? Appelez-nous :", again: "Faire une autre demande", hello: "Bonjour Tamini 👋 Je souhaite une proposition pour :", ref: "Réf.", name: "Nom", src: "Source : site web", consentErr: "Merci de cocher la case pour continuer." },
  en: { pill: "Free quote · 60 seconds", back: "Back", close: "Close", next: "Continue", skip: "Skip", step: "Question", of: "of", ready: "Your request is ready", readySub: "A Tamini advisor receives your answers directly: you won't have to repeat anything.", edit: "Edit", consent: "I agree that Tamini Insurance may contact me about this request.", privacy: "Privacy", send: "Get my proposal on WhatsApp", sendB2B: "Send to the Business team", reassure: "🔒 No ID document or bank details requested", thanks: "Thank you", thanksSub: "WhatsApp opened with your request already written. Just tap “Send”.", noWa: "WhatsApp didn't open? Call us:", again: "Make another request", hello: "Hello Tamini 👋 I'd like a proposal for:", ref: "Ref.", name: "Name", src: "Source: website", consentErr: "Please tick the box to continue." },
  ar: { pill: "عرض سعر مجاني · 60 ثانية", back: "رجوع", close: "إغلاق", next: "متابعة", skip: "تخطي", step: "السؤال", of: "من", ready: "طلبكم جاهز", readySub: "يستلم مستشار تأميني إجاباتكم مباشرة: لن تحتاجوا إلى تكرار أي شيء.", edit: "تعديل", consent: "أوافق على أن تتواصل معي تأميني بخصوص هذا الطلب.", privacy: "الخصوصية", send: "استلم عرضي على واتساب", sendB2B: "إرسال إلى قسم الشركات", reassure: "🔒 لا نطلب أي وثيقة هوية أو بيانات بنكية", thanks: "شكراً", thanksSub: "فُتح واتساب ومعه طلبكم مكتوباً. اضغطوا فقط على « إرسال ».", noWa: "لم يُفتح واتساب؟ اتصلوا بنا:", again: "تقديم طلب آخر", hello: "مرحباً تأميني 👋 أرغب في عرض لـ:", ref: "المرجع", name: "الاسم", src: "المصدر: الموقع", consentErr: "يرجى وضع علامة في المربع للمتابعة." },
};

const makeRef = (prefix) => `TM-${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}`;

export default function QuoteFunnel({ slug: initialSlug = null, source = "page", modal = false, onClose }) {
  const { lang, rtl } = useLang();
  const ui = UI[lang] || UI.fr;
  const [slug, setSlug] = useState(initialSlug && FUNNELS[initialSlug] ? initialSlug : null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentErr, setConsentErr] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const rootRef = useRef(null);
  const startedRef = useRef(false);

  const product = slug ? PRODUCTS[slug] : null;
  const segment = product && product.b2b ? "b2b" : "b2c";
  const steps = useMemo(() => (slug ? [...FUNNELS[slug].questions, ...CONTACT[segment]] : []), [slug, segment]);
  const isSummary = slug && step >= steps.length;
  const q = slug && !isSummary ? steps[step] : null;

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("quote_form_opened", { product: slug || "picker", segment: slug ? segment : "", cta_location: source });
    }
  }, [slug, segment, source]);

  // focus sur le premier élément interactif à chaque écran (accessibilité clavier)
  useEffect(() => {
    const el = rootRef.current && rootRef.current.querySelector("[data-autofocus]");
    if (el) el.focus({ preventScroll: true });
  }, [step, slug, done]);

  const goBack = () => {
    if (step > 0) setStep(step - 1);
    else if (!initialSlug) { setSlug(null); }
  };

  const answer = (id, value) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    track("quote_step_completed", { product: slug, segment, step_index: step + 1, step_total: steps.length, field: id });
    // Après une modification depuis le récapitulatif, on y retourne directement.
    let target = steps.length;
    for (let i = step + 1; i < steps.length; i++) { if (!(steps[i].id in next)) { target = i; break; } }
    setTimeout(() => {
      setStep(target);
      if (target >= steps.length && !ref) setRef(makeRef(FUNNELS[slug].prefix));
    }, 140);
  };

  const pickProduct = (s) => {
    setSlug(s); setStep(0); setAnswers({});
    track("quote_product_selected", { product: s, segment: PRODUCTS[s].b2b ? "b2b" : "b2c", cta_location: source });
  };

  // ── Libellé lisible d'une réponse (dans la langue courante) ──
  const display = (qq) => {
    const v = answers[qq.id];
    if (v === undefined || v === "") return "";
    if (qq.options) return qq.options[v] ? qq.options[v][lang] : "";
    return String(v);
  };

  const message = useMemo(() => {
    if (!isSummary) return "";
    const lines = [`${ui.hello} *${product[lang].badge}*`, `${ui.ref} ${ref}`, ""];
    FUNNELS[slug].questions.forEach((qq) => { const d = display(qq); if (d) lines.push(`• ${qq.label[lang].replace(/\s*\?$/, "")} : ${d}`); });
    lines.push("");
    CONTACT[segment].forEach((qq) => { const d = display(qq); if (d) lines.push(`• ${qq.label[lang].replace(/\s*\?$/, "")} : ${d}`); });
    lines.push("", `(${ui.src} · ${sourceLabel()})`);
    return lines.join("\n");
  }, [isSummary, answers, lang, ref, slug, segment]);

  const waNumber = segment === "b2b" ? WA_B2B : WA_B2C;
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  const onSend = (e) => {
    if (!consent) { e.preventDefault(); setConsentErr(true); return; }
    track("quote_form_submitted", { product: slug, segment, cta_location: source, lead_ref: ref, value: 1, currency: "DJF" });
    const data = {};
    [...FUNNELS[slug].questions, ...CONTACT[segment]].forEach((qq) => { data[qq.id] = display(qq); });
    sendLead({ ref, product: slug, segment, lang, answers: data, cta_location: source, page: window.location.pathname });
    setTimeout(() => setDone(true), 400);
  };

  const restart = () => { setDone(false); setStep(0); setAnswers({}); setConsent(false); if (!initialSlug) setSlug(null); };

  // ── Styles ─────────────────────────────────────────────
  const font = rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif";
  const title = { fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(20px,3.2vw,26px)", fontWeight: 800, color: N, lineHeight: 1.25, margin: "0 0 18px" };
  const opt = { width: "100%", textAlign: rtl ? "right" : "left", padding: "15px 18px", borderRadius: 12, border: "2px solid #e2e8f0", background: "#fff", fontSize: 15, fontWeight: 600, color: "#1E293B", cursor: "pointer", fontFamily: font, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, minHeight: 52 };
  const primary = { width: "100%", boxSizing: "border-box", padding: "16px 22px", borderRadius: 12, border: "none", background: G, color: N, fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: font, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 28px rgba(110,192,38,.3)" };
  const progress = slug ? Math.min(100, Math.round((step / steps.length) * 100)) : 0;

  const body = (
    <div ref={rootRef} dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: font, color: "#1E293B" }}>
      <style>{`.tm-opt:hover,.tm-opt:focus-visible{border-color:${G}!important;background:#f6fbf1!important;outline:none}.tm-opt.sel{border-color:${G}!important;background:#f6fbf1!important}`}</style>

      {/* En-tête : pastille + progression + navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
        {(slug && (step > 0 || !initialSlug)) && !done ? (
          <button type="button" onClick={goBack} style={{ background: "none", border: "none", color: "#64748b", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "6px 0", fontFamily: font }}>{rtl ? "→" : "←"} {ui.back}</button>
        ) : (
          <span style={{ fontSize: 12, fontWeight: 800, color: G, background: "rgba(110,192,38,.1)", padding: "5px 12px", borderRadius: 50 }}>{ui.pill}</span>
        )}
        {modal && <button type="button" onClick={onClose} aria-label={ui.close} style={{ background: "#f1f5f9", border: "none", width: 36, height: 36, borderRadius: "50%", fontSize: 18, cursor: "pointer", color: N }}>×</button>}
      </div>
      {slug && !done && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
            <span style={{ fontWeight: 700, color: N }}>{product[lang].badge}</span>
            {!isSummary && <span>{ui.step} {step + 1} {ui.of} {steps.length}</span>}
          </div>
          <div style={{ height: 6, background: "#eef2f7", borderRadius: 6, overflow: "hidden" }} role="progressbar" aria-valuenow={isSummary ? 100 : progress} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ height: "100%", width: `${isSummary ? 100 : Math.max(progress, 6)}%`, background: `linear-gradient(90deg,${N},${G})`, transition: "width .35s ease" }} />
          </div>
        </div>
      )}

      {/* 0. Choix du produit */}
      {!slug && (
        <div>
          <h2 style={title}>{PICKER.label[lang]}</h2>
          {[["b2c", PARTICULIERS], ["b2b", ENTREPRISES]].map(([seg, list]) => (
            <div key={seg} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>{PICKER[seg][lang]}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
                {list.filter((s) => FUNNELS[s]).map((s, i) => (
                  <button key={s} type="button" className="tm-opt" data-autofocus={seg === "b2c" && i === 0 ? true : undefined} onClick={() => pickProduct(s)} style={{ ...opt, fontSize: 14, padding: "13px 14px" }}>
                    {PRODUCTS[s][lang].badge}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1..n. Questions */}
      {q && !done && (
        <div key={`${slug}-${step}`} style={{ animation: "tmIn .25s ease both" }}>
          <style>{`@keyframes tmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}`}</style>
          <h2 style={title}>{q.label[lang]}</h2>
          {q.hint && <p style={{ fontSize: 13, color: "#64748b", margin: "-8px 0 16px", lineHeight: 1.6 }}>{q.hint[lang]}</p>}
          {q.options ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {q.options.map((o, i) => (
                <button key={i} type="button" className={`tm-opt${answers[q.id] === i ? " sel" : ""}`} data-autofocus={i === 0 ? true : undefined} onClick={() => answer(q.id, i)} style={opt}>
                  <span>{o[lang]}</span><span aria-hidden="true" style={{ color: G, fontWeight: 800 }}>{rtl ? "‹" : "›"}</span>
                </button>
              ))}
            </div>
          ) : (
            <TextStep q={q} lang={lang} ui={ui} value={answers[q.id] || ""} font={font} primary={primary}
              onSubmit={(v) => answer(q.id, v)} />
          )}
        </div>
      )}

      {/* Récapitulatif + envoi */}
      {isSummary && !done && (
        <div style={{ animation: "tmIn .25s ease both" }}>
          <h2 style={{ ...title, marginBottom: 6 }}>✅ {ui.ready}</h2>
          <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>{ui.readySub}</p>
          <div style={{ background: "#F8FAFF", border: "1px solid #e8ecf0", borderRadius: 14, padding: "12px 16px", marginBottom: 16, maxHeight: 220, overflowY: "auto" }}>
            {steps.map((qq, i) => display(qq) ? (
              <div key={qq.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: "1px solid #eef2f7", fontSize: 13 }}>
                <span style={{ color: "#64748b" }}>{qq.label[lang].replace(/\s*\?$/, "")}</span>
                <button type="button" onClick={() => setStep(i)} title={ui.edit} style={{ background: "none", border: "none", padding: 0, fontWeight: 700, color: N, cursor: "pointer", textAlign: rtl ? "left" : "right", fontFamily: font, fontSize: 13 }}>{display(qq)}</button>
              </div>
            ) : null)}
          </div>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#334155", lineHeight: 1.5, marginBottom: 6, cursor: "pointer" }}>
            <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentErr(false); }} style={{ width: 18, height: 18, marginTop: 2, accentColor: G, flexShrink: 0 }} />
            <span>{ui.consent} <Link to="/confidentialite" target="_blank" style={{ color: N, fontWeight: 700 }}>{ui.privacy}</Link></span>
          </label>
          {consentErr && <div role="alert" style={{ fontSize: 12.5, color: "#b91c1c", marginBottom: 6 }}>{ui.consentErr}</div>}
          <a href={waHref} target="_blank" rel="noopener noreferrer" data-track="lead" data-autofocus onClick={onSend} style={{ ...primary, marginTop: 10, opacity: consent ? 1 : .85 }}>
            <WaIcon />{segment === "b2b" ? ui.sendB2B : ui.send}
          </a>
          <div style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 10 }}>{ui.reassure}</div>
        </div>
      )}

      {/* Merci */}
      {done && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ fontSize: 46, marginBottom: 8 }}>🤝</div>
          <h2 style={title}>{ui.thanks}{answers.prenom || answers.nom ? ` ${String(answers.prenom || answers.nom).split(" ")[0]}` : ""} !</h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 14 }}>{ui.thanksSub}</p>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>{ui.noWa} <a href={`tel:${PHONE}`} data-cta="funnel_thanks" style={{ color: N, fontWeight: 800 }}>21 35 04 03</a></p>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>{ui.ref} {ref}</div>
          <button type="button" data-autofocus onClick={restart} style={{ background: "none", border: `2px solid ${N}`, color: N, borderRadius: 12, padding: "11px 22px", fontWeight: 700, cursor: "pointer", fontFamily: font }}>{ui.again}</button>
        </div>
      )}
    </div>
  );

  if (!modal) return body;
  return <Modal onClose={onClose} label={ui.pill}>{body}</Modal>;
}

function TextStep({ q, lang, ui, value, onSubmit, font, primary }) {
  const [v, setV] = useState(value);
  const valid = q.optional || v.trim().length >= 2;
  const submit = (e) => { e.preventDefault(); if (valid) onSubmit(v.trim()); };
  return (
    <form onSubmit={submit}>
      <input data-autofocus value={v} onChange={(e) => setV(e.target.value.slice(0, 80))} placeholder={q.placeholder ? q.placeholder[lang] : ""} autoComplete={q.autoComplete || "off"} aria-label={q.label[lang]}
        style={{ width: "100%", boxSizing: "border-box", padding: "15px 16px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 16, fontFamily: font, marginBottom: 12, outline: "none" }} />
      <button type="submit" disabled={!valid} style={{ ...primary, opacity: valid ? 1 : .45, cursor: valid ? "pointer" : "not-allowed", boxShadow: "none" }}>
        {q.optional && !v.trim() ? ui.skip : ui.next}
      </button>
    </form>
  );
}

function Modal({ children, onClose, label }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={label} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1500, background: "rgba(7,16,40,.6)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`@media(min-width:640px){.tm-sheet{align-self:center;border-radius:20px!important}}`}</style>
      <div className="tm-sheet" style={{ width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: "20px 20px 0 0", padding: "20px 20px 26px", boxShadow: "0 -10px 60px rgba(0,0,0,.25)" }}>
        {children}
      </div>
    </div>
  );
}

function WaIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.616l4.54-1.472A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.312-.726-5.994-1.957l-.42-.31-2.791.905.928-2.723-.34-.44A9.963 9.963 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>);
}

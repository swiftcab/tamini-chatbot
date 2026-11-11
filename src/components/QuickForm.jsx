import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { track, sendLead, sourceLabel } from "../tracking/analytics";
import { wa } from "../config/site";

// ─────────────────────────────────────────────────────────────
// Formulaire court générique (contact, déclaration de sinistre).
// Validation en temps réel, téléphone au format Djibouti (+253),
// consentement explicite, envoi : message WhatsApp pré-rempli
// (+ webhook CRM si configuré). Aucun envoi sans consentement.
// ─────────────────────────────────────────────────────────────

const UI = {
  fr: { required: "Champ obligatoire", phone: "Numéro à 8 chiffres (ex. 77 12 34 56)", consent: "J'accepte que Tamini Insurance utilise ces informations pour traiter ma demande.", privacy: "Confidentialité", consentErr: "Merci de cocher la case pour envoyer.", sent: "Votre message est prêt dans WhatsApp : appuyez sur « Envoyer » pour le transmettre.", noWa: "WhatsApp ne s'ouvre pas ? Appelez le 21 35 04 03.", ref: "Réf." },
  en: { required: "Required field", phone: "8-digit number (e.g. 77 12 34 56)", consent: "I agree that Tamini Insurance may use this information to handle my request.", privacy: "Privacy", consentErr: "Please tick the box to send.", sent: "Your message is ready in WhatsApp: tap “Send” to submit it.", noWa: "WhatsApp didn't open? Call 21 35 04 03.", ref: "Ref." },
  ar: { required: "حقل إلزامي", phone: "رقم من 8 أرقام (مثال 77 12 34 56)", consent: "أوافق على أن تستخدم تأميني هذه المعلومات لمعالجة طلبي.", privacy: "الخصوصية", consentErr: "يرجى وضع علامة في المربع للإرسال.", sent: "رسالتكم جاهزة في واتساب: اضغطوا « إرسال ».", noWa: "لم يُفتح واتساب؟ اتصلوا على 21 35 04 03.", ref: "المرجع" },
};

const djPhone = (v) => v.replace(/\D/g, "").replace(/^253/, "");
const validPhone = (v) => /^(77|21|27|26|25)\d{6}$/.test(djPhone(v)); // mobiles 77, fixes 21/27/26/25

export default function QuickForm({ id, lang, fields, intro, submitLabel, waNumber, waNumberFor, prefix = "TM", formName }) {
  const ui = UI[lang] || UI.fr;
  const [values, setValues] = useState({});
  const [touched, setTouched] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentErr, setConsentErr] = useState(false);
  const [sent, setSent] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useMemo(() => `${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}`, [prefix]);

  const errorOf = (f) => {
    const v = (values[f.id] || "").trim();
    if (f.required && !v) return ui.required;
    if (f.type === "tel" && v && !validPhone(v)) return ui.phone;
    return "";
  };
  const errors = fields.map(errorOf);
  const valid = errors.every((e) => !e);

  const set = (fid, v) => {
    if (!started) { setStarted(true); track("contact_form_started", { form: formName }); }
    setValues((s) => ({ ...s, [fid]: v }));
  };

  const number = waNumberFor ? waNumberFor(values) : waNumber;
  const label = (f) => (typeof f.label === "string" ? f.label : f.label[lang] || f.label.fr);
  const message = [intro, `${ui.ref} ${ref}`, "", ...fields.filter((f) => values[f.id]).map((f) => `• ${label(f)} : ${f.type === "tel" ? "+253 " + djPhone(values[f.id]) : values[f.id]}`), "", `(Site web · ${sourceLabel()})`].join("\n");

  const onSubmit = (e) => {
    setTouched(Object.fromEntries(fields.map((f) => [f.id, true])));
    if (!valid || !consent) { e.preventDefault(); if (!consent) setConsentErr(true); return; }
    track("contact_form_submitted", { form: formName, lead_ref: ref });
    sendLead({ ref, form: formName, lang, answers: values, page: typeof window !== "undefined" ? window.location.pathname : "" });
    setSent(true);
  };

  return (
    <form id={id} noValidate onSubmit={(e) => e.preventDefault()} className="card" style={{ padding: 24 }}>
      {fields.map((f, i) => {
        const err = touched[f.id] && errors[i];
        const common = { id: `${id}-${f.id}`, name: f.id, value: values[f.id] || "", onChange: (e) => set(f.id, e.target.value), onBlur: () => setTouched((t) => ({ ...t, [f.id]: true })), "aria-invalid": !!err, "aria-describedby": err ? `${id}-${f.id}-err` : undefined, required: f.required };
        return (
          <div className="field" key={f.id}>
            <label htmlFor={common.id}>{label(f)}{f.required ? " *" : ""}</label>
            {f.type === "select" ? (
              <select {...common}><option value="">—</option>{(f.options[lang] || f.options.fr).map((o) => <option key={o} value={o}>{o}</option>)}</select>
            ) : f.type === "textarea" ? (
              <textarea rows={4} maxLength={600} {...common} />
            ) : f.type === "tel" ? (
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", padding: "0 12px", border: "2px solid var(--line)", borderRadius: 12, fontWeight: 700, color: "var(--navy)" }} aria-hidden="true">+253</span>
                <input type="tel" inputMode="tel" autoComplete="tel-national" placeholder="77 12 34 56" {...common} />
              </div>
            ) : (
              <input type={f.type || "text"} autoComplete={f.autoComplete} maxLength={120} {...common} />
            )}
            {err && <span className="err" id={`${id}-${f.id}-err`} role="alert">{err}</span>}
          </div>
        );
      })}
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, margin: "6px 0 12px", cursor: "pointer" }}>
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentErr(false); }} style={{ width: 20, height: 20, marginTop: 2, accentColor: "var(--navy)" }} />
        <span>{ui.consent} <Link to="/confidentialite">{ui.privacy}</Link></span>
      </label>
      {consentErr && <p className="err" role="alert" style={{ color: "#B42318", fontSize: 13 }}>{ui.consentErr}</p>}
      <a href={wa(number, message)} target="_blank" rel="noopener noreferrer" data-track="lead" onClick={onSubmit} className="btn btn-navy" style={{ width: "100%" }} aria-disabled={!valid || !consent}>{submitLabel}</a>
      {sent && <p role="status" style={{ marginTop: 12, fontSize: 14, color: "var(--lime-ink)", fontWeight: 700 }}>{ui.sent} <span style={{ display: "block", fontWeight: 400, color: "var(--muted)" }}>{ui.noWa}</span></p>}
    </form>
  );
}

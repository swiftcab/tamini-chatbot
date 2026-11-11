// ─────────────────────────────────────────────────────────────
// COUCHE DE TRACKING — Tamini Insurance
//
// • Aucun script tiers n'est chargé tant que l'identifiant n'est
//   pas configuré (variables Vercel) ET que le visiteur n'a pas
//   accepté les cookies de mesure.
// • Tous les événements passent par track() → dataLayer + GA4 +
//   Meta + LinkedIn. Nommage objet_action (snake_case).
// • Aucune donnée personnelle (nom, téléphone) n'est envoyée aux
//   outils d'analyse. Seul le webhook « lead » (votre CRM) reçoit
//   les coordonnées, après consentement explicite dans le formulaire.
//
// Variables d'environnement Vercel (Settings → Environment Variables) :
//   REACT_APP_GA4_ID                    ex. G-XXXXXXXXXX
//   REACT_APP_META_PIXEL_ID             ex. 123456789012345
//   REACT_APP_LINKEDIN_PARTNER_ID       ex. 1234567
//   REACT_APP_LINKEDIN_LEAD_CONVERSION_ID (facultatif)
//   REACT_APP_LEAD_WEBHOOK_URL          ex. https://hook.eu2.make.com/xxxx
// ─────────────────────────────────────────────────────────────

const GA4 = process.env.REACT_APP_GA4_ID || "";
const META = process.env.REACT_APP_META_PIXEL_ID || "";
const LI = process.env.REACT_APP_LINKEDIN_PARTNER_ID || "";
const LI_CONV = process.env.REACT_APP_LINKEDIN_LEAD_CONVERSION_ID || "";
const WEBHOOK = process.env.REACT_APP_LEAD_WEBHOOK_URL || "";

export const TRACKING_CONFIGURED = Boolean(GA4 || META || LI);

const CONSENT_KEY = "tamini_consent";
const FIRST_TOUCH_KEY = "tamini_first_touch";
const LAST_TOUCH_KEY = "tamini_last_touch";
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "li_fat_id"];

let loaded = false;

const safe = (fn, fallback) => { try { return fn(); } catch (e) { return fallback; } };
const store = {
  get: (s, k) => safe(() => JSON.parse(s.getItem(k)), null),
  set: (s, k, v) => safe(() => s.setItem(k, JSON.stringify(v))),
};

// ── Consentement ────────────────────────────────────────────
export function getConsent() {
  return safe(() => localStorage.getItem(CONSENT_KEY), null); // "granted" | "denied" | null
}
export function setConsent(value) {
  safe(() => localStorage.setItem(CONSENT_KEY, value));
  if (value === "granted") loadScripts();
}

// ── Attribution (UTM, gclid, fbclid, référent) ─────────────
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const touch = {};
  ATTR_PARAMS.forEach((p) => { const v = params.get(p); if (v) touch[p] = v.slice(0, 120); });
  const ref = document.referrer && !document.referrer.includes(window.location.hostname) ? safe(() => new URL(document.referrer).hostname, "") : "";
  if (ref) touch.referrer = ref;
  if (Object.keys(touch).length) {
    touch.landing = window.location.pathname;
    touch.ts = new Date().toISOString();
    store.set(sessionStorage, LAST_TOUCH_KEY, touch);
    if (!store.get(localStorage, FIRST_TOUCH_KEY)) store.set(localStorage, FIRST_TOUCH_KEY, touch);
  }
}
export function getAttribution() {
  const last = (typeof window !== "undefined" && store.get(sessionStorage, LAST_TOUCH_KEY)) || {};
  const first = (typeof window !== "undefined" && store.get(localStorage, FIRST_TOUCH_KEY)) || {};
  return { last, first };
}
// Libellé court lisible par un conseiller : « google / cpc / auto_oct26 »
export function sourceLabel() {
  const { last } = getAttribution();
  if (last.utm_source) return [last.utm_source, last.utm_medium, last.utm_campaign].filter(Boolean).join(" / ");
  if (last.gclid) return "google / cpc";
  if (last.fbclid) return "facebook / social";
  if (last.referrer) return `${last.referrer} / referral`;
  return "direct";
}

// ── Chargement des scripts tiers (après consentement) ──────
function inject(src) {
  const s = document.createElement("script");
  s.async = true; s.src = src;
  document.head.appendChild(s);
}
export function loadScripts() {
  if (loaded || typeof window === "undefined" || !TRACKING_CONFIGURED) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  if (GA4) {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4, { send_page_view: false, anonymize_ip: true });
    inject(`https://www.googletagmanager.com/gtag/js?id=${GA4}`);
  }
  if (META) {
    if (!window.fbq) {
      const n = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      window.fbq = n; window._fbq = n;
    }
    window.fbq("init", META);
    inject("https://connect.facebook.net/en_US/fbevents.js");
  }
  if (LI) {
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(LI);
    if (!window.lintrk) { window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); }; window.lintrk.q = []; }
    inject("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
  pageview(window.location.pathname + window.location.search, document.title);
}

// ── Événements ─────────────────────────────────────────────
// Correspondance avec les événements standards des régies.
const META_MAP = { quote_form_submitted: ["track", "Lead"], whatsapp_clicked: ["track", "Contact"], phone_clicked: ["track", "Contact"], quote_form_opened: ["trackCustom", "QuoteStart"] };

export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_path: window.location.pathname, lang: document.documentElement.lang || "fr" };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, payload); // eslint-disable-line no-console
  if (getConsent() !== "granted") return;
  if (GA4 && window.gtag) window.gtag("event", event, payload);
  if (META && window.fbq && META_MAP[event]) window.fbq(META_MAP[event][0], META_MAP[event][1], { content_name: params.product || "", content_category: params.segment || "" });
  if (LI && LI_CONV && window.lintrk && event === "quote_form_submitted") window.lintrk("track", { conversion_id: Number(LI_CONV) });
}

export function pageview(path, title) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  if (GA4 && window.gtag) window.gtag("event", "page_view", { page_path: path, page_title: title, page_location: window.location.href });
  if (META && window.fbq) window.fbq("track", "PageView");
}

// ── Envoi du lead vers votre CRM (Make / Zapier / HubSpot) ──
export function sendLead(payload) {
  if (!WEBHOOK || typeof window === "undefined") return false;
  const body = JSON.stringify({ ...payload, attribution: getAttribution(), sent_at: new Date().toISOString() });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(WEBHOOK, new Blob([body], { type: "text/plain" }))) return true;
  } catch (e) { /* fallback ci-dessous */ }
  try { fetch(WEBHOOK, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain" }, body }); return true; } catch (e) { return false; }
}

// ── Écoute globale : tout lien WhatsApp / téléphone du site ──
let listening = false;
export function initTracking() {
  if (typeof window === "undefined") return;
  captureAttribution();
  if (getConsent() === "granted") loadScripts();
  if (listening) return;
  listening = true;
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.dataset.track === "lead") return; // le lead est tracké par le formulaire
    const href = a.getAttribute("href") || "";
    const location = a.dataset.cta || (a.closest("[data-section]") && a.closest("[data-section]").dataset.section) || "page";
    if (href.includes("wa.me/")) {
      const num = (href.match(/wa\.me\/(\d+)/) || [])[1] || "";
      track("whatsapp_clicked", { cta_location: location, wa_line: num.endsWith("239292") ? "b2b" : "b2c" });
    } else if (href.startsWith("tel:")) {
      track("phone_clicked", { cta_location: location });
    }
  }, { capture: true });
}

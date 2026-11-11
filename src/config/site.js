// ─────────────────────────────────────────────────────────────
// Coordonnées et informations institutionnelles — source unique.
// Toute modification ici se répercute sur l'en-tête, le pied de
// page, les pages Contact / Agences et les données structurées.
// ─────────────────────────────────────────────────────────────

export const PHONE = { display: "21 35 04 03", intl: "+25321350403", label: "+253 21 35 04 03" };
export const WA_B2C = { number: "25377094141", display: "77 09 41 41" }; // chatbot particuliers
export const WA_B2B = { number: "25377239292", display: "77 23 92 92" }; // conseiller entreprises
export const EMAIL = "info@tamini-insurance.com";

export const SOCIAL = {
  facebook: "https://www.facebook.com/Tamini.insurance",
  linkedin: "https://www.linkedin.com/company/70424040/",
};

export const hoursLines = (a, lang) => (a.hours ? a.hours.lines[lang] || a.hours.lines.fr : []);
export const openingHoursSpec = (a) => (a.hours ? a.hours.spec.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })) : undefined);

export const wa = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// Agences (source : flyer Tamini, novembre 2026 ; horaires confirmés le 11/11/2026).
// `hours.lines` = affichage ; `hours.spec` = données structurées schema.org.
const SAT_THU = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const SUN_THU = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const ALL_DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const AGENCIES = [
  {
    id: "siege",
    name: { fr: "Siège social", en: "Head office", ar: "المقر الرئيسي" },
    place: { fr: "Place du 27 Juin, Djibouti", en: "Place du 27 Juin, Djibouti", ar: "ساحة 27 يونيو، جيبوتي" },
    note: { fr: "Particuliers, entreprises, sinistres", en: "Individuals, business, claims", ar: "الأفراد، الشركات، المطالبات" },
    maps: "https://www.google.com/maps/search/?api=1&query=Tamini+Insurance+Place+du+27+Juin+Djibouti",
    hours: {
      lines: {
        fr: ["Samedi au jeudi : 8 h – 13 h", "Dimanche au jeudi : 16 h – 19 h"],
        en: ["Saturday to Thursday: 8 am – 1 pm", "Sunday to Thursday: 4 pm – 7 pm"],
        ar: ["من السبت إلى الخميس: 8:00 – 13:00", "من الأحد إلى الخميس: 16:00 – 19:00"],
      },
      spec: [{ days: SAT_THU, opens: "08:00", closes: "13:00" }, { days: SUN_THU, opens: "16:00", closes: "19:00" }],
    },
  },
  {
    id: "bawadi",
    name: { fr: "Agence Salaam Bank – Bawadi Mall", en: "Salaam Bank branch – Bawadi Mall", ar: "وكالة بنك سلام – بوادي مول" },
    place: { fr: "Bawadi Mall, Djibouti", en: "Bawadi Mall, Djibouti", ar: "بوادي مول، جيبوتي" },
    note: { fr: "Souscription et renseignements", en: "Sales and information", ar: "الاكتتاب والاستعلامات" },
    maps: "https://www.google.com/maps/search/?api=1&query=Bawadi+Mall+Djibouti",
    hours: {
      lines: {
        fr: ["Tous les jours : 10 h – 22 h"],
        en: ["Every day: 10 am – 10 pm"],
        ar: ["كل يوم: 10:00 – 22:00"],
      },
      spec: [{ days: ALL_DAYS, opens: "10:00", closes: "22:00" }],
    },
  },
  {
    id: "gabode",
    name: { fr: "Agence Salaam Elite – Gabode 5", en: "Salaam Elite branch – Gabode 5", ar: "وكالة سلام إيليت – غابود 5" },
    place: { fr: "Waafi Residence, Gabode 5, Djibouti", en: "Waafi Residence, Gabode 5, Djibouti", ar: "إقامة وافي، غابود 5، جيبوتي" },
    note: { fr: "Souscription et renseignements", en: "Sales and information", ar: "الاكتتاب والاستعلامات" },
    maps: "https://www.google.com/maps/search/?api=1&query=Waafi+Residence+Gabode+5+Djibouti",
    hours: {
      lines: {
        fr: ["Samedi au jeudi : 7 h – 12 h et 16 h – 19 h"],
        en: ["Saturday to Thursday: 7 am – 12 pm and 4 pm – 7 pm"],
        ar: ["من السبت إلى الخميس: 7:00 – 12:00 و16:00 – 19:00"],
      },
      spec: [{ days: SAT_THU, opens: "07:00", closes: "12:00" }, { days: SAT_THU, opens: "16:00", closes: "19:00" }],
    },
  },
];

// Présence régionale (groupe Salaam).
export const REGIONS = [
  { code: "DJ", name: { fr: "Djibouti", en: "Djibouti", ar: "جيبوتي" }, entity: { fr: "Tamini Insurance SA — siège", en: "Tamini Insurance SA — head office", ar: "Tamini Insurance SA — المقر" } },
  { code: "SO", name: { fr: "Somaliland", en: "Somaliland", ar: "صوماليلاند" }, entity: { fr: "Activité Takaful du groupe", en: "Group Takaful operations", ar: "عمليات التكافل للمجموعة" } },
  { code: "KE", name: { fr: "Kenya", en: "Kenya", ar: "كينيا" }, entity: { fr: "Takaful Insurance of Africa (TIA)", en: "Takaful Insurance of Africa (TIA)", ar: "Takaful Insurance of Africa (TIA)" } },
  { code: "UG", name: { fr: "Ouganda", en: "Uganda", ar: "أوغندا" }, entity: { fr: "Tamini General Insurance", en: "Tamini General Insurance", ar: "Tamini General Insurance" } },
];

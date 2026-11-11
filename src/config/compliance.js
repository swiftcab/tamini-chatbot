// ─────────────────────────────────────────────────────────────
// Verrous de conformité — UN SEUL ENDROIT à modifier.
// Règle interne : tout chiffre d'excédent (surplus) publié doit
// être validé par la Direction Technique. Tant que `validated`
// est false, le site affiche une version qualitative sans montant.
// Pour publier : passer validated à true + renseigner validatedBy.
// ─────────────────────────────────────────────────────────────
export const SURPLUS = {
  validated: false,
  validatedBy: "", // ex. "Direction Technique — 12/10/2026"
  series: [{ y: "2022", v: 13 }, { y: "2023", v: 22 }, { y: "2024", v: 27 }, { y: "2025", v: 38 }], // M FDJ — provisoire
};

// Taux de règlement affiché (65 % vs ~18 % marché). À reconfirmer
// chaque année par la Direction Technique avant mise à jour.
export const CLAIMS_RATE = { show: true, tamini: 65, market: 18, year: 2025 };

// Page « Takaful & Tawakkul » : question de jurisprudence islamique.
// Tant que validated = false : page non indexée (noindex), retirée du
// sitemap, du menu et du pied de page. Accessible par lien direct
// uniquement, pour relecture interne par le Comité Charia.
export const SHARIA_TAWAKKUL = {
  validated: false,
  name: "", // ex. "Cheikh [Nom]"
  role: "", // ex. "Membre du Comité Charia de Tamini Insurance SA"
};

// Articles de fond religieux (ex. « L'assurance est-elle halal ou haram ? »),
// marqués `review: "charia"` dans src/content/articles.js : même verrou que
// la page Tawakkul. Passer à true après validation du Comité Charia.
export const SHARIA_ARTICLES = { validated: false, validatedBy: "" };

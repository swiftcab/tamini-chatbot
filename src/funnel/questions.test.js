import { FUNNELS, CONTACT, PICKER } from "./questions";
import { PRODUCTS } from "../i18n/products";

const LANGS = ["fr", "en", "ar"];
const isTranslated = (o) => LANGS.every((l) => typeof o[l] === "string" && o[l].trim().length > 0);

describe("Questionnaires de devis", () => {
  test("chaque produit du site a un questionnaire", () => {
    Object.keys(PRODUCTS).forEach((slug) => expect(FUNNELS[slug]).toBeDefined());
  });

  test("toutes les questions et réponses sont traduites FR / EN / AR", () => {
    const all = [...Object.values(FUNNELS).flatMap((f) => f.questions), ...CONTACT.b2c, ...CONTACT.b2b];
    all.forEach((q) => {
      expect(isTranslated(q.label)).toBe(true);
      if (q.hint) expect(isTranslated(q.hint)).toBe(true);
      if (q.placeholder) expect(isTranslated(q.placeholder)).toBe(true);
      (q.options || []).forEach((o) => expect(isTranslated(o)).toBe(true));
    });
    expect(isTranslated(PICKER.label)).toBe(true);
  });

  test("identifiants uniques et parcours court (≤ 8 questions)", () => {
    Object.entries(FUNNELS).forEach(([slug, f]) => {
      const ids = f.questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(f.questions.length).toBeLessThanOrEqual(8);
      expect(f.prefix).toMatch(/^[A-Z]{2,4}$/);
    });
  });

  test("l'assistance routière est toujours proposée comme option", () => {
    ["auto", "flotte"].forEach((slug) => {
      const q = FUNNELS[slug].questions.find((x) => x.id === "assistance");
      expect(q).toBeDefined();
      expect(q.label.fr.toLowerCase()).toContain("option");
    });
  });

  test("aucune donnée sensible demandée", () => {
    const text = JSON.stringify({ FUNNELS, CONTACT }).toLowerCase();
    ["passeport", "carte d'identité", "iban", "numéro de compte", "maladie", "salaire"].forEach((w) => expect(text).not.toContain(w));
  });
});

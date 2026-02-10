const logger = require('../utils/logger');

class PricingService {
  /**
   * Calculate auto insurance pricing based on vehicle data.
   * Returns three formula options: tiers, tiersPlus, tousRisques.
   */
  async calculateAuto(devisData) {
    const { type, annee, valeur, usage, sinistre } = devisData;

    logger.info('Calculating auto pricing', { type, annee, valeur, usage, sinistre });

    // Base premium: 3% of vehicle value
    let basePremium = valeur * 0.03;

    // Vehicle age adjustments
    const age = new Date().getFullYear() - annee;
    if (age > 10) basePremium *= 0.85;  // -15% old vehicles
    if (age < 3) basePremium *= 1.15;   // +15% recent vehicles

    // Usage adjustments
    if (usage === 'Commercial') basePremium *= 1.30;
    if (usage === 'Taxi') basePremium *= 1.50;

    // Claims history
    if (sinistre) basePremium *= 1.25;

    // Three formulas
    const tiers = Math.round(basePremium * 0.40);
    const tiersPlus = Math.round(basePremium * 0.65);
    const tousRisques = Math.round(basePremium);

    const result = {
      tiers: {
        mensuel: Math.round(tiers / 12),
        annuel: tiers,
        garanties: ['Responsabilité Civile']
      },
      tiersPlus: {
        mensuel: Math.round(tiersPlus / 12),
        annuel: tiersPlus,
        garanties: ['RC', 'Vol', 'Incendie', 'Bris de glace']
      },
      tousRisques: {
        mensuel: Math.round(tousRisques / 12),
        annuel: tousRisques,
        garanties: ['RC', 'Vol', 'Incendie', 'Collision', 'Vandalisme', 'Catastrophes naturelles']
      }
    };

    logger.info('Pricing calculated', { tiers: result.tiers.annuel, tiersPlus: result.tiersPlus.annuel, tousRisques: result.tousRisques.annuel });
    return result;
  }

  /**
   * Get smart recommendation based on vehicle profile.
   */
  getRecommendation(devisData, tarifs, lang = 'FR') {
    const { annee, valeur } = devisData;
    const age = new Date().getFullYear() - annee;
    const { formatFDJ } = require('../utils/formatters');

    if (lang === 'AR') {
      if (age > 10) {
        return `💡 نصيحة: سيارتك عمرها ${age} سنة. صيغة الطرف الثالث (${formatFDJ(tarifs.tiers.mensuel)}/شهر) مثالية للتوفير.`;
      }
      return `إليك 3 صيغ. صيغة الطرف الثالث+ (${formatFDJ(tarifs.tiersPlus.mensuel)}/شهر) تقدم أفضل قيمة لملفك.`;
    }

    if (age > 10) {
      return `💡 Conseil : Votre véhicule a ${age} ans. La formule Tiers (${formatFDJ(tarifs.tiers.mensuel)}/mois) est idéale pour économiser tout en restant légal.`;
    } else if (age < 3 && valeur > 5000000) {
      return `💡 Conseil : Véhicule récent de grande valeur. La formule Tous Risques (${formatFDJ(tarifs.tousRisques.mensuel)}/mois) protège votre investissement de ${formatFDJ(valeur)}.`;
    }
    return `Voici vos 3 formules. La formule Tiers+ (${formatFDJ(tarifs.tiersPlus.mensuel)}/mois) offre le meilleur rapport qualité/prix pour votre profil.`;
  }
}

module.exports = new PricingService();

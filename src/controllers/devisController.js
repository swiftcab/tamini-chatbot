const { sendMessage, sendInteractiveButtons } = require('../services/whatsappService');
const pricingService = require('../services/pricingService');
const pdfService = require('../services/pdfService');
const { getMessage } = require('../templates/messages');
const { parseValeur } = require('../utils/validators');
const { formatFDJ } = require('../utils/formatters');
const { getPool } = require('../config/database');
const logger = require('../utils/logger');

const VEHICLE_TYPES = ['Voiture', '4x4', 'Utilitaire', 'Moto'];
const TOP_BRANDS = ['Toyota', 'Nissan', 'Hyundai', 'Mitsubishi', 'Honda', 'Suzuki', 'Kia', 'Mazda', 'Ford', 'Chevrolet', 'Autre'];
const USAGES = ['Personnel', 'Commercial', 'Taxi'];

/**
 * Start the auto insurance quote flow.
 */
async function startDevis(fromNumber, convState) {
  const { saveConversationState } = require('./messageRouter');

  convState.state = 'DEVIS_TYPE';
  convState.data.devis = {};
  await saveConversationState(fromNumber, convState);

  await sendInteractiveButtons(fromNumber, getMessage('devis_type', convState.lang),
    VEHICLE_TYPES.map(t => ({ title: t }))
  );
}

/**
 * Handle each step of the devis flow.
 */
async function handleDevisStep(fromNumber, text, convState) {
  const { saveConversationState, STATES } = require('./messageRouter');
  const state = convState.state;
  const normalized = text.trim();

  switch (state) {
    case 'DEVIS_TYPE': {
      const idx = parseInt(normalized) - 1;
      const type = VEHICLE_TYPES[idx] || normalized;
      if (!VEHICLE_TYPES.includes(type) && idx < 0) {
        await sendMessage(fromNumber, getMessage('devis_type', convState.lang));
        return;
      }
      convState.data.devis.type = VEHICLE_TYPES[idx] || type;
      convState.state = 'DEVIS_MARQUE';
      await saveConversationState(fromNumber, convState);

      await sendInteractiveButtons(fromNumber, getMessage('devis_marque', convState.lang),
        TOP_BRANDS.map(b => ({ title: b }))
      );
      break;
    }

    case 'DEVIS_MARQUE': {
      const idx = parseInt(normalized) - 1;
      convState.data.devis.marque = TOP_BRANDS[idx] || normalized;
      convState.state = 'DEVIS_ANNEE';
      await saveConversationState(fromNumber, convState);

      const currentYear = new Date().getFullYear();
      await sendMessage(fromNumber, getMessage('devis_annee', convState.lang) + `\n(${currentYear - 25} - ${currentYear})`);
      break;
    }

    case 'DEVIS_ANNEE': {
      const year = parseInt(normalized);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < currentYear - 25 || year > currentYear) {
        await sendMessage(fromNumber, `Année invalide. Entrez une année entre ${currentYear - 25} et ${currentYear}.`);
        return;
      }
      convState.data.devis.annee = year;
      convState.state = 'DEVIS_VALEUR';
      await saveConversationState(fromNumber, convState);

      await sendMessage(fromNumber, getMessage('devis_valeur', convState.lang));
      break;
    }

    case 'DEVIS_VALEUR': {
      const valeur = parseValeur(normalized);
      if (!valeur) {
        await sendMessage(fromNumber, 'Montant invalide. Exemple: 3500000');
        return;
      }
      convState.data.devis.valeur = valeur;
      convState.state = 'DEVIS_USAGE';
      await saveConversationState(fromNumber, convState);

      await sendInteractiveButtons(fromNumber, getMessage('devis_usage', convState.lang),
        USAGES.map(u => ({ title: u }))
      );
      break;
    }

    case 'DEVIS_USAGE': {
      const idx = parseInt(normalized) - 1;
      convState.data.devis.usage = USAGES[idx] || normalized;
      convState.state = 'DEVIS_SINISTRE';
      await saveConversationState(fromNumber, convState);

      await sendInteractiveButtons(fromNumber, getMessage('devis_sinistre', convState.lang),
        [{ title: 'Oui' }, { title: 'Non' }]
      );
      break;
    }

    case 'DEVIS_SINISTRE': {
      const isYes = ['1', 'oui', 'yes', 'نعم'].includes(normalized.toLowerCase());
      convState.data.devis.sinistre = isYes;

      await sendMessage(fromNumber, getMessage('devis_processing', convState.lang));

      // Calculate pricing
      const tarifs = await pricingService.calculateAuto(convState.data.devis);
      convState.data.devis.tarifs = tarifs;

      // Generate PDF
      try {
        const pdfBuffer = await pdfService.generateDevisAuto({
          ...convState.data.devis,
          tarifs,
          timestamp: new Date()
        });

        // Save devis to DB
        const pool = getPool();
        if (pool) {
          const result = await pool.query(
            'INSERT INTO devis (user_phone, type, data, tarifs) VALUES ($1, $2, $3, $4) RETURNING id',
            [fromNumber, 'AUTO', JSON.stringify(convState.data.devis), JSON.stringify(tarifs)]
          );
          convState.data.devisId = result.rows[0].id;
        }

        // Build comparison message
        const comparison = [
          `📋 VOTRE DEVIS ASSURANCE AUTO\n`,
          `🚗 ${convState.data.devis.marque} ${convState.data.devis.type} (${convState.data.devis.annee})`,
          `💰 Valeur: ${formatFDJ(convState.data.devis.valeur)}\n`,
          `━━━━━━━━━━━━━━━━━━━━━`,
          `1️⃣ TIERS: ${formatFDJ(tarifs.tiers.mensuel)}/mois (${formatFDJ(tarifs.tiers.annuel)}/an)`,
          `   → ${tarifs.tiers.garanties.join(', ')}\n`,
          `2️⃣ TIERS+ ★: ${formatFDJ(tarifs.tiersPlus.mensuel)}/mois (${formatFDJ(tarifs.tiersPlus.annuel)}/an)`,
          `   → ${tarifs.tiersPlus.garanties.join(', ')}\n`,
          `3️⃣ TOUS RISQUES: ${formatFDJ(tarifs.tousRisques.mensuel)}/mois (${formatFDJ(tarifs.tousRisques.annuel)}/an)`,
          `   → ${tarifs.tousRisques.garanties.join(', ')}`
        ].join('\n');

        await sendMessage(fromNumber, comparison);

        // Smart recommendation
        const recommendation = pricingService.getRecommendation(convState.data.devis, tarifs, convState.lang);
        await sendMessage(fromNumber, recommendation);

        // CTA buttons
        await sendInteractiveButtons(fromNumber, getMessage('devis_cta', convState.lang), [
          { title: getMessage('devis_cta_subscribe', convState.lang) },
          { title: getMessage('devis_cta_questions', convState.lang) },
          { title: getMessage('devis_cta_modify', convState.lang) }
        ]);

        convState.state = STATES.DEVIS_RESULT;
        await saveConversationState(fromNumber, convState);

      } catch (error) {
        logger.error('Devis generation failed', { error: error.message });
        await sendMessage(fromNumber, 'Une erreur est survenue. Veuillez réessayer.');
        convState.state = STATES.IDLE;
        await saveConversationState(fromNumber, convState);
      }
      break;
    }
  }
}

module.exports = { startDevis, handleDevisStep };

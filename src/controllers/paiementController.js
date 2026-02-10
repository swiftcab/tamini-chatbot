const orangeMoneyService = require('../services/orangeMoneyService');
const pdfService = require('../services/pdfService');
const { sendMessage } = require('../services/whatsappService');
const { getMessage } = require('../templates/messages');
const { formatFDJ, formatDate, generatePolicyNumber } = require('../utils/formatters');
const { getPool } = require('../config/database');
const logger = require('../utils/logger');

/**
 * Initiate payment flow after documents are verified.
 */
async function initiatePayment(fromNumber, convState) {
  const devisData = convState.data.devis;
  const tarifs = devisData.tarifs;

  // Default to tiersPlus (recommended)
  const formule = 'Tiers+';
  const montant = tarifs.tiersPlus.annuel;

  // Show recap
  await sendMessage(fromNumber, getMessage('payment_recap', convState.lang, {
    formule,
    montant: formatFDJ(montant)
  }));

  // Create Orange Money payment
  try {
    const payment = await orangeMoneyService.createPayment({
      amount: montant,
      currency: 'DJF',
      orderId: `TAMINI-${convState.data.devisId || Date.now()}`,
      description: `Assurance Auto ${devisData.marque} ${devisData.annee}`,
      customerPhone: fromNumber,
      returnUrl: `${process.env.BASE_URL}/payment/callback`
    });

    convState.data.transactionId = payment.transactionId;
    convState.data.paymentAmount = montant;
    convState.data.formule = formule;

    const { saveConversationState } = require('./messageRouter');
    await saveConversationState(fromNumber, convState);

    await sendMessage(fromNumber,
      getMessage('payment_cta', convState.lang, { amount: formatFDJ(montant) }) +
      `\n${payment.paymentUrl}\n\n📱 Vous serez redirigé vers Orange Money pour valider le paiement.`
    );

  } catch (error) {
    logger.error('Payment initiation failed', { error: error.message });
    await sendMessage(fromNumber, getMessage('payment_failed', convState.lang));
  }
}

/**
 * Handle successful payment callback.
 */
async function handlePaymentSuccess(fromNumber, transactionId) {
  const { getConversationState, saveConversationState, STATES } = require('./messageRouter');
  const convState = await getConversationState(fromNumber);

  const pool = getPool();
  const numeroPolice = generatePolicyNumber();
  const dateDebut = new Date();
  const dateFin = new Date(dateDebut);
  dateFin.setFullYear(dateFin.getFullYear() + 1);

  // Save contract to DB
  if (pool) {
    await pool.query(
      `INSERT INTO contrats (devis_id, user_phone, statut, transaction_id, numero_police, date_debut, date_fin)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [convState.data.devisId, fromNumber, 'ACTIF', transactionId, numeroPolice, dateDebut, dateFin]
    );
  }

  // Confirmation message
  await sendMessage(fromNumber, getMessage('payment_success', convState.lang));

  // Generate attestation PDF
  try {
    await pdfService.generateAttestation({
      numero_police: numeroPolice,
      user_phone: fromNumber,
      transaction_id: transactionId,
      date_debut: dateDebut,
      date_fin: dateFin
    });
    logger.info('Attestation PDF generated', { police: numeroPolice });
  } catch (error) {
    logger.error('Attestation generation failed', { error: error.message });
  }

  // Final confirmation
  await sendMessage(fromNumber, getMessage('payment_confirmation', convState.lang, {
    police: numeroPolice,
    debut: formatDate(dateDebut),
    fin: formatDate(dateFin)
  }));

  // Reset conversation state
  convState.state = STATES.IDLE;
  convState.data = {};
  await saveConversationState(fromNumber, convState);

  logger.info('Subscription complete', { phone: fromNumber, police: numeroPolice });
}

/**
 * Handle payment step messages during PAYMENT state.
 */
async function handlePaymentStep(fromNumber, text, convState) {
  const normalized = text.toLowerCase().trim();

  if (normalized.includes('payer') || normalized.includes('confirmer')) {
    // Re-initiate payment
    await initiatePayment(fromNumber, convState);
  } else {
    await sendMessage(fromNumber, 'En attente de votre paiement. Cliquez sur le lien ci-dessus pour payer via Orange Money.');
  }
}

module.exports = { initiatePayment, handlePaymentSuccess, handlePaymentStep };

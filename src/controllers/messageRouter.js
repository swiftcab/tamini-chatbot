const { getPool, getRedis } = require('../config/database');
const { detectLanguage } = require('../utils/validators');
const dialogflowService = require('../services/dialogflowService');
const { sendMessage } = require('../services/whatsappService');
const { getMessage } = require('../templates/messages');
const devisController = require('./devisController');
const documentController = require('./documentController');
const paiementController = require('./paiementController');
const logger = require('../utils/logger');

/**
 * State machine states for conversation flow.
 */
const STATES = {
  IDLE: 'IDLE',
  ONBOARDING: 'ONBOARDING',
  DEVIS_TYPE: 'DEVIS_TYPE',
  DEVIS_MARQUE: 'DEVIS_MARQUE',
  DEVIS_ANNEE: 'DEVIS_ANNEE',
  DEVIS_VALEUR: 'DEVIS_VALEUR',
  DEVIS_USAGE: 'DEVIS_USAGE',
  DEVIS_SINISTRE: 'DEVIS_SINISTRE',
  DEVIS_RESULT: 'DEVIS_RESULT',
  DOCS_UPLOAD: 'DOCS_UPLOAD',
  PAYMENT: 'PAYMENT',
  AGENT_TAKEOVER: 'AGENT_TAKEOVER'
};

/**
 * Get or create conversation state for a user.
 */
async function getConversationState(phone) {
  const redis = getRedis();
  if (!redis) return { state: STATES.IDLE, data: {}, lang: 'FR' };

  const raw = await redis.get(`conv:${phone}`);
  if (raw) return JSON.parse(raw);

  return { state: STATES.IDLE, data: {}, lang: 'FR' };
}

/**
 * Save conversation state.
 */
async function saveConversationState(phone, convState) {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(`conv:${phone}`, JSON.stringify(convState), { EX: 3600 });
}

/**
 * Route an incoming message to the appropriate handler.
 */
async function routeMessage(fromNumber, messageBody, mediaUrl = null) {
  logger.info('Routing message', { from: fromNumber, bodyLength: messageBody?.length, hasMedia: !!mediaUrl });

  // Check agent takeover
  const redis = getRedis();
  if (redis) {
    const takeover = await redis.get(`agent-takeover:${fromNumber}`);
    if (takeover) {
      logger.info('Message during agent takeover - forwarding to CRM', { from: fromNumber });
      return;
    }
  }

  // Get conversation state
  const convState = await getConversationState(fromNumber);

  // Handle media (document upload)
  if (mediaUrl) {
    return documentController.handleDocumentUpload(fromNumber, mediaUrl, convState);
  }

  const text = (messageBody || '').trim();
  if (!text) return;

  // First message - detect language and onboard
  if (convState.state === STATES.IDLE) {
    const lang = detectLanguage(text);
    convState.lang = lang;

    // Save user preference
    const pool = getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO users (phone, language) VALUES ($1, $2)
         ON CONFLICT (phone) DO UPDATE SET language = $2, updated_at = NOW()`,
        [fromNumber, lang]
      );
    }

    // Check for direct intent
    const intent = await dialogflowService.detectIntent(`user-${fromNumber}`, text, lang === 'AR' ? 'ar' : 'fr');

    if (intent.intent === 'intent.devis' && intent.confidence > 0.7) {
      return devisController.startDevis(fromNumber, convState);
    }

    if (intent.intent === 'intent.aide' && intent.confidence > 0.7) {
      const { escalateToHuman } = require('./webhookController');
      return escalateToHuman(fromNumber, convState);
    }

    if (intent.confidence > 0.7 && intent.fulfillmentText) {
      await sendMessage(fromNumber, intent.fulfillmentText);
      return;
    }

    // Default: show onboarding menu
    await sendMessage(fromNumber, getMessage('welcome', lang));
    await sendMessage(fromNumber, getMessage('menu', lang));
    convState.state = STATES.ONBOARDING;
    await saveConversationState(fromNumber, convState);
    return;
  }

  // Handle onboarding menu response
  if (convState.state === STATES.ONBOARDING) {
    return handleOnboardingChoice(fromNumber, text, convState);
  }

  // Handle devis flow steps
  if (convState.state.startsWith('DEVIS_')) {
    return devisController.handleDevisStep(fromNumber, text, convState);
  }

  // Handle devis result actions
  if (convState.state === STATES.DEVIS_RESULT) {
    return handleDevisResultChoice(fromNumber, text, convState);
  }

  // Handle payment state
  if (convState.state === STATES.PAYMENT) {
    return paiementController.handlePaymentStep(fromNumber, text, convState);
  }

  // Default: try NLP intent detection
  const intent = await dialogflowService.detectIntent(
    `user-${fromNumber}`, text, convState.lang === 'AR' ? 'ar' : 'fr'
  );

  if (intent.confidence > 0.7 && intent.fulfillmentText) {
    await sendMessage(fromNumber, intent.fulfillmentText);
  } else if (intent.confidence < 0.5) {
    await sendMessage(fromNumber, getMessage('not_understood', convState.lang));
  } else {
    await sendMessage(fromNumber, getMessage('not_understood', convState.lang));
  }
}

async function handleOnboardingChoice(fromNumber, text, convState) {
  const normalized = text.toLowerCase().trim();

  // Match by number or keyword
  if (normalized === '1' || normalized.includes('auto') || normalized.includes('voiture') || normalized.includes('سيارة')) {
    return devisController.startDevis(fromNumber, convState);
  }

  if (normalized === '2' || normalized.includes('habitation') || normalized.includes('maison') || normalized.includes('منزل')) {
    await sendMessage(fromNumber, 'L\'assurance habitation sera bientôt disponible! En attendant, découvrez notre assurance auto. 🚗');
    convState.state = STATES.IDLE;
    await saveConversationState(fromNumber, convState);
    return;
  }

  if (normalized === '3' || normalized.includes('takaful') || normalized.includes('تكافل')) {
    await sendMessage(fromNumber, getMessage('takaful_definition', convState.lang));
    convState.state = STATES.IDLE;
    await saveConversationState(fromNumber, convState);
    return;
  }

  // Not recognized
  await sendMessage(fromNumber, getMessage('menu', convState.lang));
}

async function handleDevisResultChoice(fromNumber, text, convState) {
  const normalized = text.toLowerCase().trim();

  if (normalized === '1' || normalized.includes('souscri')) {
    await sendMessage(fromNumber, getMessage('documents_required', convState.lang));
    convState.state = STATES.DOCS_UPLOAD;
    convState.data.requiredDocs = ['CARTE_GRISE', 'PERMIS'];
    convState.data.uploadedDocs = [];
    await saveConversationState(fromNumber, convState);
    return;
  }

  if (normalized === '2' || normalized.includes('question')) {
    const { escalateToHuman } = require('./webhookController');
    return escalateToHuman(fromNumber, convState);
  }

  if (normalized === '3' || normalized.includes('modif')) {
    return devisController.startDevis(fromNumber, convState);
  }

  await sendMessage(fromNumber, getMessage('devis_cta', convState.lang));
}

module.exports = { routeMessage, getConversationState, saveConversationState, STATES };

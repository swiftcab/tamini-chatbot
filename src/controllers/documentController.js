const ocrService = require('../services/ocrService');
const { sendMessage } = require('../services/whatsappService');
const { getMessage } = require('../templates/messages');
const { getPool } = require('../config/database');
const axios = require('axios');
const logger = require('../utils/logger');

/**
 * Handle document upload (image sent via WhatsApp).
 */
async function handleDocumentUpload(fromNumber, mediaUrl, convState) {
  const { saveConversationState, STATES } = require('./messageRouter');

  logger.info('Processing document upload', { from: fromNumber, mediaUrl });

  try {
    // Download image from Twilio
    const imageBuffer = await downloadMedia(mediaUrl);

    // OCR extraction
    await sendMessage(fromNumber, 'Analyse du document... ⏳');
    const ocrResult = await ocrService.extractText(imageBuffer);

    // Detect document type
    const docType = ocrService.detectDocumentType(ocrResult.text);

    if (docType === 'UNKNOWN') {
      await sendMessage(fromNumber, getMessage('upload_unknown', convState.lang));
      return;
    }

    // Parse based on type
    let parsedData;
    if (docType === 'CARTE_GRISE') {
      parsedData = ocrService.parseCarteGrise(ocrResult);
      const msg = parsedData.marque
        ? `${getMessage('upload_carte_grise', convState.lang)}\nVéhicule: ${parsedData.marque}\nImmatriculation: ${parsedData.immatriculation || 'N/A'}`
        : getMessage('upload_carte_grise', convState.lang);
      await sendMessage(fromNumber, msg);
    } else if (docType === 'PERMIS') {
      parsedData = ocrService.parsePermis(ocrResult);
      const msg = parsedData.nom
        ? `${getMessage('upload_permis', convState.lang)}\nTitulaire: ${parsedData.nom}\nValidité: ${parsedData.validite || 'N/A'}`
        : getMessage('upload_permis', convState.lang);
      await sendMessage(fromNumber, msg);
    }

    // Save document to DB
    const pool = getPool();
    if (pool) {
      await pool.query(
        'INSERT INTO documents (user_phone, type, ocr_data, verified) VALUES ($1, $2, $3, $4)',
        [fromNumber, docType, JSON.stringify(parsedData), (ocrResult.confidence || 0) > 0.85]
      );
    }

    // Track uploaded docs
    if (!convState.data.uploadedDocs) convState.data.uploadedDocs = [];
    if (!convState.data.uploadedDocs.includes(docType)) {
      convState.data.uploadedDocs.push(docType);
    }

    // Check remaining docs
    const required = convState.data.requiredDocs || ['CARTE_GRISE', 'PERMIS'];
    const missing = required.filter(d => !convState.data.uploadedDocs.includes(d));

    if (missing.length > 0) {
      const docNames = missing.map(d => d === 'CARTE_GRISE' ? 'Carte grise' : 'Permis de conduire');
      await sendMessage(fromNumber, getMessage('upload_remaining', convState.lang, { docs: docNames.join(', ') }));
    } else {
      await sendMessage(fromNumber, getMessage('upload_complete', convState.lang));
      convState.state = STATES.PAYMENT;
      await saveConversationState(fromNumber, convState);

      // Start payment flow
      const paiementController = require('./paiementController');
      await paiementController.initiatePayment(fromNumber, convState);
    }

    await saveConversationState(fromNumber, convState);

  } catch (error) {
    logger.error('Document upload failed', { error: error.message, from: fromNumber });
    await sendMessage(fromNumber, getMessage('upload_failed', convState.lang));
    await sendMessage(fromNumber, getMessage('upload_tutorial', convState.lang));
  }
}

/**
 * Download media from Twilio URL.
 */
async function downloadMedia(mediaUrl) {
  if (!mediaUrl || mediaUrl.startsWith('mock://')) {
    // Return mock buffer for testing
    return Buffer.from('mock-image-data');
  }

  const response = await axios.get(mediaUrl, {
    responseType: 'arraybuffer',
    auth: {
      username: process.env.TWILIO_ACCOUNT_SID,
      password: process.env.TWILIO_AUTH_TOKEN
    }
  });

  return Buffer.from(response.data);
}

module.exports = { handleDocumentUpload, downloadMedia };

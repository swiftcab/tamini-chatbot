const { getTwilioClient } = require('../config/twilio');
const { getPool } = require('../config/database');
const logger = require('../utils/logger');

const FROM_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

/**
 * Send a text message via WhatsApp.
 */
async function sendMessage(to, body) {
  logger.info('Sending WhatsApp message', { to, bodyLength: body.length });

  // Log outbound message
  const pool = getPool();
  if (pool) {
    await pool.query(
      'INSERT INTO messages (user_phone, direction, content, message_type) VALUES ($1, $2, $3, $4)',
      [to, 'outbound', body, 'text']
    );
  }

  const client = getTwilioClient();
  if (!client) {
    logger.debug('Mock mode - message not sent via Twilio', { to, body });
    return { sid: 'mock-' + Date.now(), body };
  }

  const message = await client.messages.create({
    from: FROM_NUMBER,
    to,
    body
  });

  return message;
}

/**
 * Send interactive buttons via WhatsApp.
 */
async function sendInteractiveButtons(to, body, buttons) {
  logger.info('Sending interactive buttons', { to, buttonCount: buttons.length });

  // WhatsApp interactive buttons use the content_sid approach via Twilio
  // For simplicity, format as numbered list
  const buttonText = buttons.map((b, i) => `${i + 1}. ${b.title}`).join('\n');
  const fullMessage = `${body}\n\n${buttonText}\n\nRépondez avec le numéro de votre choix.`;

  return sendMessage(to, fullMessage);
}

/**
 * Send a document (PDF) via WhatsApp.
 */
async function sendDocument(to, mediaUrl, filename) {
  logger.info('Sending document', { to, filename });

  const pool = getPool();
  if (pool) {
    await pool.query(
      'INSERT INTO messages (user_phone, direction, content, message_type) VALUES ($1, $2, $3, $4)',
      [to, 'outbound', `[Document: ${filename}]`, 'document']
    );
  }

  const client = getTwilioClient();
  if (!client) {
    logger.debug('Mock mode - document not sent', { to, filename });
    return { sid: 'mock-' + Date.now() };
  }

  const message = await client.messages.create({
    from: FROM_NUMBER,
    to,
    body: filename,
    mediaUrl: [mediaUrl]
  });

  return message;
}

module.exports = { sendMessage, sendInteractiveButtons, sendDocument };

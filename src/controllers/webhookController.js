const { validateTwilioSignature } = require('../config/twilio');
const { getPool, getRedis } = require('../config/database');
const { sanitizeInput } = require('../utils/validators');
const { routeMessage } = require('./messageRouter');
const { sendMessage } = require('../services/whatsappService');
const { getMessage } = require('../templates/messages');
const orangeMoneyService = require('../services/orangeMoneyService');
const paiementController = require('./paiementController');
const logger = require('../utils/logger');

/**
 * Handle incoming Twilio WhatsApp webhook.
 */
async function handleTwilioWebhook(req, res) {
  // Validate signature in production
  if (process.env.NODE_ENV === 'production' && !validateTwilioSignature(req)) {
    logger.warn('Invalid Twilio signature', { ip: req.ip });
    return res.status(401).send('Invalid signature');
  }

  const { From: from, Body: body, NumMedia: numMedia, MediaUrl0: mediaUrl } = req.body;

  if (!from) {
    return res.status(400).send('Missing From field');
  }

  logger.info('Incoming WhatsApp message', {
    from,
    bodyLength: body?.length,
    hasMedia: parseInt(numMedia) > 0
  });

  // Log inbound message
  const pool = getPool();
  if (pool) {
    try {
      await pool.query(
        'INSERT INTO messages (user_phone, direction, content, message_type) VALUES ($1, $2, $3, $4)',
        [from, 'inbound', sanitizeInput(body || '[media]'), parseInt(numMedia) > 0 ? 'media' : 'text']
      );
    } catch (err) {
      logger.error('Failed to log inbound message', { error: err.message });
    }
  }

  // Respond immediately to Twilio (avoid timeout)
  res.status(200).type('text/xml').send('<Response></Response>');

  // Process message asynchronously
  try {
    const sanitizedBody = sanitizeInput(body || '');
    const media = parseInt(numMedia) > 0 ? mediaUrl : null;
    await routeMessage(from, sanitizedBody, media);
  } catch (error) {
    logger.error('Error processing message', { error: error.message, from });
  }
}

/**
 * Handle Orange Money payment webhook.
 */
async function handleOrangeMoneyWebhook(req, res) {
  const { transaction_id, status, order_id } = req.body;

  // Validate signature
  if (!orangeMoneyService.validateSignature(req)) {
    logger.warn('Invalid Orange Money signature');
    return res.status(401).send('Invalid signature');
  }

  logger.info('Orange Money webhook received', { transaction_id, status, order_id });

  res.status(200).send('OK');

  // Process payment status
  try {
    if (status === 'SUCCESS') {
      // Find user phone from order_id (format: TAMINI-{devisId})
      const pool = getPool();
      if (pool) {
        const result = await pool.query(
          'SELECT user_phone FROM devis WHERE id = $1',
          [order_id.replace('TAMINI-', '')]
        );
        if (result.rows[0]) {
          await paiementController.handlePaymentSuccess(result.rows[0].user_phone, transaction_id);
        }
      }
    }
  } catch (error) {
    logger.error('Error processing payment webhook', { error: error.message });
  }
}

/**
 * Escalate conversation to a human agent.
 */
async function escalateToHuman(fromNumber, convState) {
  const { saveConversationState, STATES } = require('./messageRouter');

  logger.info('Escalating to human agent', { from: fromNumber });

  const lang = convState.lang || 'FR';

  await sendMessage(fromNumber, getMessage('agent_escalate', lang));
  await sendMessage(fromNumber, getMessage('agent_hours', lang));

  // Mark conversation as agent takeover
  const redis = getRedis();
  if (redis) {
    await redis.set(`agent-takeover:${fromNumber}`, 'pending', { EX: 3600 });
  }

  // Log escalation
  const pool = getPool();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO messages (user_phone, direction, content, message_type)
         VALUES ($1, $2, $3, $4)`,
        [fromNumber, 'outbound', '[ESCALATION: Agent humain demandé]', 'system']
      );
    } catch (err) {
      logger.error('Failed to log escalation', { error: err.message });
    }
  }

  convState.state = STATES.AGENT_TAKEOVER;
  await saveConversationState(fromNumber, convState);
}

module.exports = { handleTwilioWebhook, handleOrangeMoneyWebhook, escalateToHuman };

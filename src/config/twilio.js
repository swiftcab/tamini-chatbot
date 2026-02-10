const twilio = require('twilio');
const logger = require('../utils/logger');

let client = null;

function initTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    logger.warn('Twilio credentials not configured - running in mock mode');
    return null;
  }

  client = twilio(accountSid, authToken);
  logger.info('Twilio client initialized');
  return client;
}

function getTwilioClient() {
  return client;
}

/**
 * Validate incoming Twilio webhook signature.
 */
function validateTwilioSignature(req) {
  const signature = req.headers['x-twilio-signature'];
  const url = `${process.env.BASE_URL}${req.originalUrl}`;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!authToken || !signature) return false;

  return twilio.validateRequest(authToken, signature, url, req.body);
}

module.exports = { initTwilio, getTwilioClient, validateTwilioSignature };

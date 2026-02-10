require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const { initTwilio } = require('./config/twilio');
const { handleTwilioWebhook, handleOrangeMoneyWebhook } = require('./controllers/webhookController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Request logging
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', service: 'tamini-chatbot' });
});

// Twilio WhatsApp webhook
app.post('/webhooks/twilio', handleTwilioWebhook);

// Orange Money payment webhook
app.post('/webhooks/orange-money', handleOrangeMoneyWebhook);

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

/**
 * Start the server with optional database/redis initialization.
 */
async function startServer() {
  // Initialize Twilio
  initTwilio();

  // Initialize database & redis (optional - graceful degradation)
  try {
    const { initDatabase, initRedis } = require('./config/database');
    await initDatabase();
    await initRedis();
  } catch (error) {
    logger.warn('Database/Redis init failed - running in standalone mode', { error: error.message });
  }

  app.listen(PORT, () => {
    logger.info(`Tamini Chatbot server running on port ${PORT}`);
    logger.info(`Webhook URL: ${process.env.BASE_URL || 'http://localhost:' + PORT}/webhooks/twilio`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Start if run directly
if (require.main === module) {
  startServer().catch(err => {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  });
}

module.exports = { app, startServer };

// External API configurations

const orangeMoneyConfig = {
  apiUrl: process.env.ORANGE_MONEY_API_URL || 'https://api.orange.dj/omoney/v1',
  merchantId: process.env.ORANGE_MONEY_MERCHANT_ID || '',
  apiKey: process.env.ORANGE_MONEY_API_KEY || '',
  webhookSecret: process.env.ORANGE_MONEY_WEBHOOK_SECRET || ''
};

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || 'eu-west-1',
  bucket: process.env.AWS_S3_BUCKET || 'tamini-chatbot-docs'
};

const hubspotConfig = {
  apiKey: process.env.HUBSPOT_API_KEY || ''
};

module.exports = { orangeMoneyConfig, s3Config, hubspotConfig };

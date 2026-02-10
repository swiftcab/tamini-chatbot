const axios = require('axios');
const crypto = require('crypto');
const { orangeMoneyConfig } = require('../config/apis');
const logger = require('../utils/logger');

class OrangeMoneyService {
  constructor() {
    this.apiUrl = orangeMoneyConfig.apiUrl;
    this.merchantId = orangeMoneyConfig.merchantId;
    this.apiKey = orangeMoneyConfig.apiKey;
    this.mockMode = !this.apiKey;
  }

  /**
   * Create a payment request.
   */
  async createPayment({ amount, currency = 'DJF', orderId, description, customerPhone, returnUrl }) {
    logger.info('Creating Orange Money payment', { amount, orderId, customerPhone });

    if (this.mockMode) {
      logger.warn('Orange Money running in MOCK mode');
      return this._mockPayment({ amount, orderId });
    }

    const response = await axios.post(`${this.apiUrl}/payments`, {
      merchant_id: this.merchantId,
      amount,
      currency,
      order_id: orderId,
      description,
      customer_phone: customerPhone,
      return_url: returnUrl,
      notify_url: `${process.env.BASE_URL}/webhooks/orange-money`
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      transactionId: response.data.transaction_id,
      paymentUrl: response.data.payment_url,
      expiresAt: response.data.expires_at
    };
  }

  /**
   * Verify a payment status.
   */
  async verifyPayment(transactionId) {
    if (this.mockMode) {
      return { status: 'SUCCESS', amount: 0, paidAt: new Date().toISOString() };
    }

    const response = await axios.get(
      `${this.apiUrl}/payments/${transactionId}`,
      { headers: { 'Authorization': `Bearer ${this.apiKey}` } }
    );

    return {
      status: response.data.status,
      amount: response.data.amount,
      paidAt: response.data.paid_at
    };
  }

  /**
   * Validate Orange Money webhook signature.
   */
  validateSignature(req) {
    const signature = req.headers['x-orange-signature'];
    const secret = orangeMoneyConfig.webhookSecret;
    if (!signature || !secret) return false;

    const computed = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
  }

  _mockPayment({ amount, orderId }) {
    const txId = 'MOCK-' + crypto.randomBytes(8).toString('hex');
    return {
      transactionId: txId,
      paymentUrl: `https://mock.orange.dj/pay/${txId}`,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    };
  }
}

module.exports = new OrangeMoneyService();

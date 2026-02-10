const request = require('supertest');

// We need supertest for integration tests
let app;

beforeAll(() => {
  // Set env vars for testing
  process.env.NODE_ENV = 'test';
  process.env.PORT = '0';
  ({ app } = require('../../src/index'));
});

describe('Webhook Integration', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('tamini-chatbot');
    });
  });

  describe('POST /webhooks/twilio', () => {
    it('should accept a valid WhatsApp message', async () => {
      const res = await request(app)
        .post('/webhooks/twilio')
        .type('form')
        .send({
          From: 'whatsapp:+25377123456',
          Body: 'Bonjour',
          NumMedia: '0'
        });

      expect(res.status).toBe(200);
      expect(res.text).toContain('Response');
    });

    it('should return 400 for missing From field', async () => {
      const res = await request(app)
        .post('/webhooks/twilio')
        .type('form')
        .send({ Body: 'test' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /webhooks/orange-money', () => {
    it('should reject requests with invalid signature', async () => {
      const res = await request(app)
        .post('/webhooks/orange-money')
        .send({
          transaction_id: 'TX123',
          status: 'SUCCESS',
          order_id: 'TAMINI-1'
        });

      expect(res.status).toBe(401);
    });
  });
});

const dialogflowService = require('../../src/services/dialogflowService');

describe('DialogflowService (local fallback)', () => {
  it('should detect takaful intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'c\'est quoi le takaful?');
    expect(result.intent).toBe('faq.takaful.definition');
    expect(result.confidence).toBeGreaterThan(0.7);
    expect(result.fulfillmentText).toContain('Takaful');
  });

  it('should detect payment intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'comment payer mon assurance?');
    expect(result.intent).toBe('faq.paiement.methodes');
    expect(result.fulfillmentText).toContain('Orange Money');
  });

  it('should detect document intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'quels documents fournir?');
    expect(result.intent).toBe('faq.documents.requis');
    expect(result.fulfillmentText).toContain('Carte grise');
  });

  it('should detect price concern intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'c\'est trop cher');
    expect(result.intent).toBe('faq.tarifs.pourquoi_cher');
  });

  it('should detect devis intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'je veux un devis');
    expect(result.intent).toBe('intent.devis');
    expect(result.fulfillmentText).toBeNull();
  });

  it('should detect aide/escalation intent', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'je veux un conseiller');
    expect(result.intent).toBe('intent.aide');
  });

  it('should return fallback for unrecognized text', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'xyzzy lorem ipsum');
    expect(result.intent).toBe('fallback');
    expect(result.confidence).toBeLessThan(0.5);
  });

  it('should return Arabic response for Arabic language code', async () => {
    const result = await dialogflowService.detectIntent('test-session', 'takaful', 'ar');
    expect(result.intent).toBe('faq.takaful.definition');
    expect(result.fulfillmentText).toContain('التكافل');
  });
});

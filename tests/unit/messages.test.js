const { getMessage, MESSAGES } = require('../../src/templates/messages');

describe('Message Templates', () => {
  it('should return FR message by default', () => {
    const msg = getMessage('welcome');
    expect(msg).toContain('Tamini');
    expect(msg).toContain('Takaful');
  });

  it('should return AR message when specified', () => {
    const msg = getMessage('welcome', 'AR');
    expect(msg).toContain('تأميني');
  });

  it('should fall back to FR when AR message is missing', () => {
    const msg = getMessage('upload_tutorial', 'AR');
    expect(msg).toContain('Astuce');
  });

  it('should replace template variables', () => {
    const msg = getMessage('payment_cta', 'FR', { amount: '50 000 FDJ' });
    expect(msg).toContain('50 000 FDJ');
  });

  it('should return key as fallback for unknown messages', () => {
    const msg = getMessage('nonexistent_key');
    expect(msg).toBe('nonexistent_key');
  });
});

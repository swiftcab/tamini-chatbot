const { sanitizeInput, isValidPhone, parseValeur, detectLanguage } = require('../../src/utils/validators');

describe('Validators', () => {
  describe('sanitizeInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should truncate long strings to 4000 chars', () => {
      const long = 'a'.repeat(5000);
      expect(sanitizeInput(long).length).toBe(4000);
    });

    it('should return empty string for non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('isValidPhone', () => {
    it('should accept Djibouti numbers', () => {
      expect(isValidPhone('+25377123456')).toBe(true);
      expect(isValidPhone('25377123456')).toBe(true);
    });

    it('should accept WhatsApp format', () => {
      expect(isValidPhone('whatsapp:+25377123456')).toBe(true);
    });

    it('should reject invalid numbers', () => {
      expect(isValidPhone('12345')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('parseValeur', () => {
    it('should parse plain numbers', () => {
      expect(parseValeur('3500000')).toBe(3500000);
    });

    it('should parse numbers with spaces', () => {
      expect(parseValeur('3 500 000')).toBe(3500000);
    });

    it('should parse numbers with commas', () => {
      expect(parseValeur('3,500,000')).toBe(3500000);
    });

    it('should parse numbers with FDJ suffix', () => {
      expect(parseValeur('3500000 FDJ')).toBe(3500000);
    });

    it('should return null for invalid input', () => {
      expect(parseValeur('')).toBe(null);
      expect(parseValeur(null)).toBe(null);
      expect(parseValeur('abc')).toBe(null);
    });

    it('should return null for zero values', () => {
      expect(parseValeur('0')).toBe(null);
    });

    it('should return null for values exceeding 100M', () => {
      expect(parseValeur('200000000')).toBe(null);
    });
  });

  describe('detectLanguage', () => {
    it('should detect French by default', () => {
      expect(detectLanguage('Bonjour')).toBe('FR');
      expect(detectLanguage('hello')).toBe('FR');
    });

    it('should detect Arabic from Arabic script', () => {
      expect(detectLanguage('مرحبا')).toBe('AR');
      expect(detectLanguage('سلام عليكم')).toBe('AR');
    });

    it('should detect Arabic from keywords', () => {
      expect(detectLanguage('سلام')).toBe('AR');
    });

    it('should return FR for empty input', () => {
      expect(detectLanguage('')).toBe('FR');
      expect(detectLanguage(null)).toBe('FR');
    });
  });
});

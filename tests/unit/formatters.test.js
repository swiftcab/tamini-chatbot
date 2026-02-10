const { formatFDJ, formatDate, generatePolicyNumber } = require('../../src/utils/formatters');

describe('Formatters', () => {
  describe('formatFDJ', () => {
    it('should format number with thousand separators and FDJ suffix', () => {
      const result = formatFDJ(3500000);
      // Intl.NumberFormat('fr-FR') uses non-breaking spaces
      expect(result).toContain('3');
      expect(result).toContain('500');
      expect(result).toContain('000');
      expect(result).toContain('FDJ');
    });
  });

  describe('formatDate', () => {
    it('should format date in French format', () => {
      const result = formatDate('2026-01-15');
      expect(result).toBe('15/01/2026');
    });
  });

  describe('generatePolicyNumber', () => {
    it('should generate a policy number starting with TAM', () => {
      const policy = generatePolicyNumber();
      expect(policy).toMatch(/^TAM-\d{2}-\d{5}$/);
    });

    it('should generate unique numbers', () => {
      const a = generatePolicyNumber();
      const b = generatePolicyNumber();
      expect(a).not.toBe(b);
    });
  });
});

const ocrService = require('../../src/services/ocrService');

describe('OCRService', () => {
  describe('detectDocumentType', () => {
    it('should detect carte grise', () => {
      expect(ocrService.detectDocumentType('CARTE GRISE REPUBLIQUE DE DJIBOUTI')).toBe('CARTE_GRISE');
    });

    it('should detect carte grise from immatriculation keyword', () => {
      expect(ocrService.detectDocumentType('CERTIFICAT IMMATRICULATION 1234 DJ')).toBe('CARTE_GRISE');
    });

    it('should detect permis de conduire', () => {
      expect(ocrService.detectDocumentType('PERMIS DE CONDUIRE')).toBe('PERMIS');
    });

    it('should detect CIN', () => {
      expect(ocrService.detectDocumentType('CARTE D\'IDENTITE NATIONALE')).toBe('CIN');
    });

    it('should return UNKNOWN for unrecognized text', () => {
      expect(ocrService.detectDocumentType('some random text')).toBe('UNKNOWN');
    });
  });

  describe('parseCarteGrise', () => {
    it('should parse immatriculation', () => {
      const ocrResult = {
        text: 'CARTE GRISE\nIMATRICULATION: 1234 DJ 01\nMARQUE: TOYOTA\nGENRE: VP',
        confidence: 0.9
      };
      const result = ocrService.parseCarteGrise(ocrResult);
      expect(result.immatriculation).toBe('1234 DJ 01');
      expect(result.marque).toBe('TOYOTA');
    });
  });

  describe('parsePermis', () => {
    it('should parse name and validity', () => {
      const ocrResult = {
        text: 'PERMIS DE CONDUIRE\nNOM: AHMED\nPRENOM: MOHAMED\nVALIDITE: 01/01/2028',
        confidence: 0.88
      };
      const result = ocrService.parsePermis(ocrResult);
      expect(result.nom).toBe('AHMED');
      expect(result.prenom).toBe('MOHAMED');
      expect(result.validite).toBe('01/01/2028');
    });
  });

  describe('extractText (mock mode)', () => {
    it('should return mock data when no API key', async () => {
      const result = await ocrService.extractText(Buffer.from('test'));
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('confidence');
      expect(result.text).toContain('CARTE GRISE');
    });
  });
});

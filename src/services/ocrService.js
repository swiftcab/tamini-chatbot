const axios = require('axios');
const logger = require('../utils/logger');

class OCRService {
  constructor() {
    this.keyPath = process.env.GOOGLE_VISION_KEY_PATH;
    this.mockMode = !this.keyPath;
  }

  /**
   * Extract text from an image using Google Vision API.
   * Falls back to mock mode if no API key is configured.
   */
  async extractText(imageBuffer) {
    if (this.mockMode) {
      logger.warn('OCR running in mock mode - no Google Vision key configured');
      return this._mockExtract();
    }

    try {
      // Google Vision API call via REST
      const credentials = require(this.keyPath);
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${credentials.api_key || ''}`,
        {
          requests: [{
            image: { content: imageBuffer.toString('base64') },
            features: [{ type: 'TEXT_DETECTION' }]
          }]
        }
      );

      const result = response.data.responses[0];
      const fullText = result.fullTextAnnotation?.text || '';
      const blocks = result.textAnnotations || [];

      return {
        text: fullText,
        blocks,
        confidence: this._calculateConfidence(blocks)
      };
    } catch (error) {
      logger.error('OCR extraction failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Detect document type from OCR text.
   */
  detectDocumentType(text) {
    const upperText = text.toUpperCase();

    if (upperText.includes('CARTE GRISE') || upperText.includes('IMMATRICULATION') || upperText.includes('CERTIFICAT')) {
      return 'CARTE_GRISE';
    }
    if (upperText.includes('PERMIS') || upperText.includes('CONDUIRE') || upperText.includes('DRIVING')) {
      return 'PERMIS';
    }
    if (upperText.includes('CARTE') && upperText.includes('IDENTIT')) {
      return 'CIN';
    }
    return 'UNKNOWN';
  }

  /**
   * Parse carte grise (vehicle registration) data from OCR text.
   */
  parseCarteGrise(ocrResult) {
    const text = ocrResult.text;

    const immatPattern = /\b\d{1,4}\s?[A-Z]{2}\s?\d{1,2}\b/;
    const marquePattern = /MARQUE[:\s]+([A-Z]+)/i;
    const genrePattern = /GENRE[:\s]+([A-Z\s]+)/i;

    return {
      immatriculation: text.match(immatPattern)?.[0] || null,
      marque: text.match(marquePattern)?.[1] || null,
      genre: text.match(genrePattern)?.[1] || null,
      confidence: ocrResult.confidence
    };
  }

  /**
   * Parse permis de conduire (driving license) data from OCR text.
   */
  parsePermis(ocrResult) {
    const text = ocrResult.text;

    const nomPattern = /NOM[:\s]+([A-ZÀ-Ü ]+)/i;
    const prenomPattern = /PRENOM[:\s]+([A-ZÀ-Ü ]+)/i;
    const validitePattern = /VALID[ITEÉ]+[:\s]+(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i;

    return {
      nom: text.match(nomPattern)?.[1]?.trim() || null,
      prenom: text.match(prenomPattern)?.[1]?.trim() || null,
      validite: text.match(validitePattern)?.[1] || null,
      confidence: ocrResult.confidence
    };
  }

  _calculateConfidence(blocks) {
    if (!blocks || blocks.length === 0) return 0;
    const avgConfidence = blocks.reduce((sum, b) => sum + (b.confidence || 0.8), 0) / blocks.length;
    return avgConfidence;
  }

  _mockExtract() {
    return {
      text: 'CARTE GRISE\nRÉPUBLIQUE DE DJIBOUTI\nIMATRICULATION: 1234 DJ 01\nMARQUE: TOYOTA\nGENRE: VP\nANNEE: 2020',
      blocks: [],
      confidence: 0.92
    };
  }
}

module.exports = new OCRService();

/**
 * Sanitize user input to prevent injection attacks.
 */
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, 4000);
}

/**
 * Validate phone number format (Djibouti: +253XXXXXXXX).
 */
function isValidPhone(phone) {
  return /^\+?253\d{8}$/.test(phone) || /^whatsapp:\+\d{10,15}$/.test(phone);
}

/**
 * Parse a currency value from user input (FDJ).
 * Accepts: "3500000", "3 500 000", "3,500,000", "3500000 FDJ"
 */
function parseValeur(input) {
  if (!input) return null;
  const cleaned = input.replace(/[^0-9]/g, '');
  const value = parseInt(cleaned, 10);
  if (isNaN(value) || value <= 0 || value > 100000000) return null;
  return value;
}

/**
 * Detect language from first message (FR or AR).
 */
function detectLanguage(text) {
  if (!text) return 'FR';
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const arabicKeywords = ['سلام', 'مرحبا', 'اهلا', 'شكرا'];
  if (arabicPattern.test(text) || arabicKeywords.some(kw => text.includes(kw))) {
    return 'AR';
  }
  return 'FR';
}

module.exports = { sanitizeInput, isValidPhone, parseValeur, detectLanguage };

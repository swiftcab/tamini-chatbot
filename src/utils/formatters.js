/**
 * Format a number as FDJ currency.
 */
function formatFDJ(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FDJ';
}

/**
 * Format a date for display.
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Generate a unique policy number.
 */
function generatePolicyNumber() {
  const date = new Date();
  const prefix = 'TAM';
  const year = date.getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}-${year}-${random}`;
}

module.exports = { formatFDJ, formatDate, generatePolicyNumber };

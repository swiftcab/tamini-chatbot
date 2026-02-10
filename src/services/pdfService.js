const PDFDocument = require('pdfkit');
const { formatFDJ, formatDate } = require('../utils/formatters');
const logger = require('../utils/logger');

class PDFService {
  /**
   * Generate auto insurance quote PDF.
   * Returns a Buffer.
   */
  async generateDevisAuto(data) {
    logger.info('Generating devis PDF', { marque: data.marque, type: data.type });

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(10).fillColor('#2c5aa0').text('TAMINI INSURANCE', 50, 50);
      doc.fontSize(8).fillColor('#666').text('Assurance Takaful - Certifié Charia ✓', 50, 65);
      doc.fontSize(8).text('Place Menelik, Djibouti | +253 21 35 04 03', 50, 78);

      // Separator
      doc.moveTo(50, 95).lineTo(545, 95).stroke('#2c5aa0');

      // Title
      doc.fontSize(18).fillColor('#2c5aa0').text('DEVIS ASSURANCE AUTOMOBILE', 50, 115);

      // Vehicle info
      doc.fontSize(12).fillColor('#333').text('Informations Véhicule', 50, 155);
      doc.moveTo(50, 170).lineTo(300, 170).stroke('#ddd');

      doc.fontSize(10).fillColor('#000')
        .text(`Type: ${data.type}`, 50, 180)
        .text(`Marque: ${data.marque}`, 50, 198)
        .text(`Année: ${data.annee}`, 50, 216)
        .text(`Valeur: ${formatFDJ(data.valeur)}`, 50, 234)
        .text(`Usage: ${data.usage}`, 50, 252);

      // Quote comparison table
      const tableTop = 290;
      doc.fontSize(12).fillColor('#333').text('Comparatif des formules', 50, tableTop);
      doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).stroke('#ddd');

      // Table headers
      const headerY = tableTop + 25;
      doc.fontSize(9).fillColor('#2c5aa0')
        .text('Formule', 50, headerY)
        .text('Prix/mois', 180, headerY)
        .text('Prix/an', 280, headerY)
        .text('Garanties incluses', 370, headerY);

      doc.moveTo(50, headerY + 15).lineTo(545, headerY + 15).stroke('#eee');

      // Table rows
      const formules = [
        { nom: 'TIERS', data: data.tarifs.tiers },
        { nom: 'TIERS+', data: data.tarifs.tiersPlus },
        { nom: 'TOUS RISQUES', data: data.tarifs.tousRisques }
      ];

      formules.forEach((formule, i) => {
        const y = headerY + 30 + (i * 45);
        const bgColor = i === 1 ? '#f0f7ff' : '#fff';

        if (i === 1) {
          doc.rect(45, y - 5, 505, 40).fill(bgColor);
        }

        doc.fontSize(10).fillColor('#000').text(formule.nom, 50, y);
        doc.fontSize(12).fillColor('#2c5aa0').text(formatFDJ(formule.data.mensuel), 180, y);
        doc.fontSize(10).fillColor('#666').text(formatFDJ(formule.data.annuel), 280, y);
        doc.fontSize(7).fillColor('#666').text(formule.data.garanties.join(', '), 370, y, { width: 175 });
      });

      // Recommendation badge for Tiers+
      const badgeY = headerY + 30 + 45 - 5;
      doc.fontSize(7).fillColor('#2c5aa0').text('★ RECOMMANDÉ', 50, badgeY + 20);

      // Validity
      const footerY = headerY + 30 + (3 * 45) + 30;
      doc.fontSize(9).fillColor('#666')
        .text(`Devis valable 30 jours`, 50, footerY)
        .text(`Généré le ${formatDate(data.timestamp || new Date())}`, 50, footerY + 15);

      // Footer
      doc.fontSize(7).fillColor('#999')
        .text('Tamini Insurance SARL - RC N° 12345 - Agrément Ministère des Finances', 50, 750)
        .text('www.tamini-insurance.dj | contact@tamini-insurance.dj', 50, 762);

      doc.end();
    });
  }

  /**
   * Generate insurance attestation PDF.
   */
  async generateAttestation(contrat) {
    logger.info('Generating attestation PDF', { police: contrat.numero_police });

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(10).fillColor('#2c5aa0').text('TAMINI INSURANCE', 50, 50);
      doc.fontSize(8).fillColor('#666').text('Assurance Takaful - Certifié Charia ✓', 50, 65);

      doc.moveTo(50, 85).lineTo(545, 85).stroke('#2c5aa0');

      // Title
      doc.fontSize(20).fillColor('#2c5aa0').text('ATTESTATION D\'ASSURANCE', 50, 105, { align: 'center' });
      doc.fontSize(12).fillColor('#333').text('AUTOMOBILE', 50, 130, { align: 'center' });

      // Policy details
      const detailsY = 170;
      doc.fontSize(10).fillColor('#000')
        .text(`Police N°: ${contrat.numero_police}`, 50, detailsY)
        .text(`Statut: ACTIF`, 50, detailsY + 20)
        .text(`Date début: ${formatDate(contrat.date_debut)}`, 50, detailsY + 40)
        .text(`Date fin: ${formatDate(contrat.date_fin)}`, 50, detailsY + 60)
        .text(`Assuré: ${contrat.user_phone}`, 50, detailsY + 80);

      // Stamp
      doc.fontSize(8).fillColor('#999')
        .text('Ce document est généré automatiquement et fait foi.', 50, 700)
        .text(`Transaction: ${contrat.transaction_id}`, 50, 712);

      doc.end();
    });
  }
}

module.exports = new PDFService();

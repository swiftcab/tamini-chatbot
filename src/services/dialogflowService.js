const logger = require('../utils/logger');

// Dialogflow intents for FAQ - used as local fallback when Dialogflow API is not configured
const LOCAL_INTENTS = [
  {
    name: 'faq.takaful.definition',
    patterns: ['takaful', 'تكافل', 'assurance islamique', 'halal', 'charia', 'c\'est quoi takaful'],
    response_FR: 'Le Takaful est une assurance coopérative conforme à la Charia (loi islamique). Contrairement à l\'assurance classique où la compagnie garde les profits, dans le Takaful, les membres partagent mutuellement les risques et les surplus sont redistribués. C\'est 100% halal ✓',
    response_AR: 'التكافل هو تأمين تعاوني يتوافق مع الشريعة الإسلامية. على عكس التأمين التقليدي، يتقاسم الأعضاء المخاطر بشكل متبادل ويعاد توزيع الفوائض. إنه حلال 100% ✓'
  },
  {
    name: 'faq.tarifs.pourquoi_cher',
    patterns: ['cher', 'prix', 'coûte', 'tarif', 'trop cher', 'غالي'],
    response_FR: 'Je comprends votre préoccupation. Nos tarifs sont calculés selon:\n• Valeur du véhicule\n• Âge et usage\n• Historique sinistres\n\nConseil: Un véhicule ancien peut prendre la formule Tiers (moins chère) au lieu de Tous Risques. Voulez-vous refaire un devis optimisé?',
    response_AR: 'أفهم قلقك. يتم حساب أسعارنا بناءً على:\n• قيمة السيارة\n• العمر والاستخدام\n• سجل الحوادث\n\nنصيحة: يمكن للسيارة القديمة اختيار صيغة الطرف الثالث (أقل تكلفة).'
  },
  {
    name: 'faq.paiement.methodes',
    patterns: ['payer', 'paiement', 'orange money', 'comment payer', 'moyen de paiement', 'دفع'],
    response_FR: 'Vous pouvez payer par:\n✅ Orange Money (recommandé)\n✅ Evatis\n✅ D-Money\n✅ En agence (espèces/chèque)\n\nLe paiement mobile est instantané et vous recevez votre attestation en 2 min!',
    response_AR: 'يمكنك الدفع عبر:\n✅ Orange Money (موصى به)\n✅ Evatis\n✅ D-Money\n✅ في الوكالة (نقدًا/شيك)\n\nالدفع عبر الهاتف فوري!'
  },
  {
    name: 'faq.documents.requis',
    patterns: ['document', 'papier', 'fournir', 'besoin de quoi', 'وثائق', 'أوراق'],
    response_FR: 'Pour souscrire, envoyez-moi simplement des photos de:\n📄 Carte grise du véhicule\n📄 Permis de conduire\n📄 Carte d\'identité nationale\n\nJe vérifie automatiquement et vous dis si c\'est bon!',
    response_AR: 'للاشتراك، أرسل لي صور:\n📄 بطاقة التسجيل\n📄 رخصة القيادة\n📄 بطاقة الهوية\n\nسأتحقق تلقائيًا!'
  },
  {
    name: 'faq.sinistre.declarer',
    patterns: ['sinistre', 'accident', 'déclarer', 'collision', 'حادث'],
    response_FR: 'En cas de sinistre:\n1. Mettez-vous en sécurité\n2. Prenez des photos\n3. Notez les coordonnées de l\'autre partie\n4. Envoyez-moi "sinistre" et je vous guide\n\nOu appelez le +253 21 35 04 03',
    response_AR: 'في حالة حادث:\n1. احرص على سلامتك\n2. التقط صورًا\n3. سجل بيانات الطرف الآخر\n4. أرسل لي "حادث" وسأرشدك'
  },
  {
    name: 'intent.devis',
    patterns: ['devis', 'estimation', 'prix assurance', 'combien', 'عرض', 'تقدير'],
    response_FR: null, // Handled by devis controller
    response_AR: null
  },
  {
    name: 'intent.aide',
    patterns: ['aide', 'agent', 'conseiller', 'humain', 'مساعدة', 'مستشار'],
    response_FR: null, // Handled by escalation
    response_AR: null
  }
];

class DialogflowService {
  constructor() {
    this.projectId = process.env.DIALOGFLOW_PROJECT_ID;
    this.mockMode = !this.projectId;
  }

  /**
   * Detect intent from user text.
   * Uses local pattern matching as fallback when Dialogflow is not configured.
   */
  async detectIntent(sessionId, text, languageCode = 'fr') {
    if (this.mockMode) {
      return this._localDetect(text, languageCode);
    }

    try {
      // Dialogflow API would be called here
      // For now, use local detection as primary
      return this._localDetect(text, languageCode);
    } catch (error) {
      logger.error('Dialogflow detection failed, falling back to local', { error: error.message });
      return this._localDetect(text, languageCode);
    }
  }

  _localDetect(text, languageCode) {
    const normalizedText = text.toLowerCase().trim();

    for (const intent of LOCAL_INTENTS) {
      const matched = intent.patterns.some(pattern =>
        normalizedText.includes(pattern.toLowerCase())
      );

      if (matched) {
        const lang = languageCode === 'ar' ? 'AR' : 'FR';
        const responseKey = `response_${lang}`;

        return {
          intent: intent.name,
          confidence: 0.85,
          fulfillmentText: intent[responseKey],
          parameters: {}
        };
      }
    }

    // No match - fallback
    return {
      intent: 'fallback',
      confidence: 0.2,
      fulfillmentText: null,
      parameters: {}
    };
  }
}

module.exports = new DialogflowService();

const MESSAGES = {
  FR: {
    welcome: 'Bienvenue chez Tamini! 👋\nPremière assurance Takaful (islamique) à Djibouti.',
    menu: 'Que souhaitez-vous?\n🚗 Assurance Auto\n🏠 Assurance Habitation\n📚 Comprendre le Takaful',
    social_proof: 'Rejoignez 12 347 Djiboutiens qui nous font confiance 🇩🇯',

    devis_type: 'Quel type de véhicule? 🚗',
    devis_marque: 'Marque du véhicule?',
    devis_annee: 'Année du véhicule?',
    devis_valeur: 'Valeur estimée de votre véhicule?\nExemple: 3500000 FDJ',
    devis_usage: 'Usage du véhicule?',
    devis_sinistre: 'Sinistre dans les 3 dernières années?',
    devis_processing: '⏳ Je calcule votre devis... (5-10 sec)',

    upload_success: '✅ Document vérifié!',
    upload_failed: '⚠️ Photo floue. Réessayez avec plus de lumière 💡',
    upload_tutorial: 'Astuce: Posez le document à plat, éclairage naturel, appareil à 30cm 📸',
    upload_carte_grise: '✅ Carte grise vérifiée!',
    upload_permis: '✅ Permis de conduire vérifié!',
    upload_unknown: '❌ Type de document non reconnu. Réessayez avec carte grise ou permis.',
    upload_remaining: 'Super! Il me manque encore: {docs}',
    upload_complete: '🎉 Tous vos documents sont complets! Passons au paiement.',

    payment_recap: 'Récapitulatif:\n• Formule: {formule}\n• Montant: {montant}\n\nPaiement sécurisé via Orange Money 🔒',
    payment_cta: 'Cliquez pour payer {amount} via Orange Money 📱💳',
    payment_success: '✅ Paiement reçu!\n\nVotre attestation arrive dans 2 minutes... 📄',
    payment_failed: '❌ Paiement non abouti. Vérifiez votre solde ou réessayez.',
    payment_timeout: '⏱️ Délai expiré. Relancez quand vous êtes prêt.',
    payment_confirmation: '🎉 Félicitations! Vous êtes assuré(e).\n\nPolice N°: {police}\nValidité: {debut} → {fin}\n\nBesoin d\'aide? Tapez "aide" à tout moment.',

    agent_escalate: '🤝 Je vous mets en contact avec un expert humain.\nRéponse sous 5 min (heures bureau).',
    agent_hours: 'Horaires:\n• Lun-Ven: 8h-18h\n• Samedi: 8h-14h\n\nSi hors horaires, vous serez contacté dès demain matin.',

    not_understood: 'Je n\'ai pas bien compris. Pouvez-vous reformuler?\n\nOu tapez:\n• "devis" pour une estimation\n• "aide" pour parler à un conseiller\n• "takaful" pour comprendre l\'assurance islamique',

    takaful_definition: 'Le Takaful est une assurance coopérative conforme à la Charia (loi islamique). Contrairement à l\'assurance classique où la compagnie garde les profits, dans le Takaful, les membres partagent mutuellement les risques et les surplus sont redistribués. C\'est 100% halal ✓',

    devis_cta: 'Que souhaitez-vous faire?',
    devis_cta_subscribe: '✅ Je souscris',
    devis_cta_questions: '❓ J\'ai des questions',
    devis_cta_modify: '✏️ Modifier le devis',

    documents_required: 'Pour souscrire, envoyez-moi simplement des photos de:\n📄 Carte grise du véhicule\n📄 Permis de conduire\n📄 Carte d\'identité nationale\n\nJe vérifie automatiquement et vous dis si c\'est bon!'
  },

  AR: {
    welcome: 'مرحباً بك في تأميني! 👋\nأول تأمين تكافل إسلامي في جيبوتي',
    menu: 'ماذا تريد؟\n🚗 تأمين السيارات\n🏠 تأمين المنزل\n📚 فهم التكافل',
    social_proof: 'انضم إلى 12,347 جيبوتي يثقون بنا 🇩🇯',

    devis_type: 'ما نوع السيارة؟ 🚗',
    devis_marque: 'ماركة السيارة؟',
    devis_annee: 'سنة السيارة؟',
    devis_valeur: 'القيمة التقديرية لسيارتك؟\nمثال: 3500000 FDJ',
    devis_usage: 'استخدام السيارة؟',
    devis_sinistre: 'حادث في السنوات الثلاث الماضية؟',
    devis_processing: '⏳ جاري حساب عرض الأسعار... (5-10 ثوان)',

    not_understood: 'عذراً، لم أفهم. هل يمكنك إعادة الصياغة؟\n\nأو اكتب:\n• "عرض" للحصول على تقدير\n• "مساعدة" للتحدث مع مستشار\n• "تكافل" لفهم التأمين الإسلامي',

    agent_escalate: '🤝 سأوصلك بخبير تأميني.\nالرد خلال 5 دقائق (ساعات العمل).'
  }
};

/**
 * Get a message by key and language, with optional variable replacement.
 */
function getMessage(key, lang = 'FR', vars = {}) {
  const message = MESSAGES[lang]?.[key] || MESSAGES.FR[key] || key;
  return Object.entries(vars).reduce(
    (msg, [k, v]) => msg.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
    message
  );
}

module.exports = { MESSAGES, getMessage };

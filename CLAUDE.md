# 🚀 PROMPT CLAUDE CODE - CHATBOT WHATSAPP TAMINI INSURANCE

**Version:** 1.0  
**Date:** Février 2026  
**Cible:** Claude Code (Sonnet 4.5)  
**Projet:** Chatbot WhatsApp pour acquisition clients - Assurance Takaful Djibouti

---

## 📋 CONTEXTE PROJET

Tu vas développer un chatbot WhatsApp intelligent pour Tamini Insurance, première compagnie d'assurance Takaful (islamique) à Djibouti. L'objectif est de transformer l'acquisition client en digitalisant 100% du parcours : éducation → devis → souscription → paiement.

**Problème à résoudre :** 87% des Djiboutiens n'ont jamais souscrit d'assurance (méfiance + processus complexe + distribution physique uniquement).

**Solution :** Chatbot conversationnel sur WhatsApp (78% pénétration Djibouti) qui génère des leads, éduque sur le Takaful, produit devis instantanés, et permet souscription end-to-end avec paiement Orange Money.

**Impact business attendu :**
- Mois 6 : 700 conversations/mois → 79 contrats → 23 700$ CA additionnel
- Mois 12 : 1500 conversations/mois → 169 contrats → 50 700$ CA additionnel
- ROI : 434% an 1

---

## 🎯 OBJECTIFS DE DÉVELOPPEMENT

### Phase 1 - MVP (Priorité P0)
Créer un chatbot fonctionnel pour **assurance automobile uniquement** avec :

1. **Onboarding interactif** : Accueil bilingue FR/AR + menu principal + module éducatif Takaful
2. **Moteur de devis auto** : Questions séquentielles → Génération PDF devis sous 2 min
3. **Upload documents** : Carte grise + permis avec OCR Google Vision
4. **Paiement Orange Money** : Intégration API + webhook confirmation
5. **Génération attestation** : PDF envoyé automatiquement après paiement
6. **FAQ intelligente** : 50 Q&R avec détection intention NLP
7. **Escalade humaine** : Transfert agent avec contexte complet si chatbot bloqué

### Success Criteria
- ✅ Temps génération devis < 15 secondes (95th percentile)
- ✅ Taux complétion flux onboarding → devis : 70%+
- ✅ Précision OCR documents : 85%+
- ✅ Uptime : 99%+ sur 1 semaine stress testing
- ✅ 10 souscriptions beta complètes sans bug bloquant

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack Obligatoire
```
Backend: Node.js + Express
Database: PostgreSQL (données structurées) + Redis (sessions cache)
WhatsApp: Twilio API for WhatsApp Business
NLP: Dialogflow ES (Google) - Support FR + AR natif
OCR: Google Vision API
Paiement: Orange Money API Djibouti
PDF: PDFKit (génération devis + attestations)
Hosting: AWS (EC2 + RDS + ElastiCache)
Monitoring: Sentry (errors) + Datadog (APM)
```

### Structure Projet
```
tamini-whatsapp-chatbot/
├── src/
│   ├── index.js                 # Entry point Express server
│   ├── config/
│   │   ├── twilio.js           # Twilio WhatsApp config
│   │   ├── dialogflow.js       # Dialogflow client setup
│   │   ├── database.js         # PostgreSQL + Redis connections
│   │   └── apis.js             # Orange Money, Vision API configs
│   ├── controllers/
│   │   ├── webhookController.js    # Twilio webhook handler
│   │   ├── messageRouter.js        # Intent routing logic
│   │   ├── devisController.js      # Génération devis auto
│   │   ├── paiementController.js   # Orange Money integration
│   │   └── documentController.js   # OCR + validation
│   ├── services/
│   │   ├── dialogflowService.js    # NLP intent detection
│   │   ├── pricingService.js       # Calcul pricing assurance
│   │   ├── pdfService.js           # Génération PDF devis/attestation
│   │   ├── ocrService.js           # Google Vision text extraction
│   │   ├── orangeMoneyService.js   # Paiement mobile
│   │   └── whatsappService.js      # Send messages Twilio
│   ├── models/
│   │   ├── User.js                 # PostgreSQL schema utilisateurs
│   │   ├── Devis.js                # Schema devis générés
│   │   ├── Contrat.js              # Schema contrats signés
│   │   └── Conversation.js         # Historique conversations
│   ├── utils/
│   │   ├── validators.js           # Input validation
│   │   ├── formatters.js           # Format messages FR/AR
│   │   └── logger.js               # Winston logging
│   ├── templates/
│   │   ├── devis_auto.html         # Template PDF devis
│   │   ├── attestation.html        # Template PDF attestation
│   │   └── messages/               # Messages WhatsApp FR/AR
│   └── dialogflow/
│       └── intents.json            # Export Dialogflow intents
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   ├── API.md                      # Documentation APIs
│   └── FLOWS.md                    # Flux conversationnels
├── .env.example
├── package.json
└── README.md
```

---

## 💡 SPÉCIFICATIONS FONCTIONNELLES DÉTAILLÉES

### F1 - Onboarding Interactif

**Trigger :** Premier message utilisateur "Bonjour" ou "Salam"

**Workflow :**
```javascript
// Pseudocode flux onboarding
async function handleOnboarding(fromNumber) {
  // 1. Détection langue
  const language = detectLanguage(firstMessage); // FR ou AR
  await saveUserPreference(fromNumber, { language });
  
  // 2. Message bienvenue
  const welcomeMsg = language === 'AR' 
    ? 'مرحباً بك في تأميني! 👋\nأول تأمين تكافل في جيبوتي'
    : 'Bienvenue chez Tamini! 👋\n1ère assurance Takaful à Djibouti';
  await sendWhatsAppMessage(fromNumber, welcomeMsg);
  
  // 3. Menu principal avec boutons interactifs
  const menuOptions = [
    { id: 'auto', title: '🚗 Assurance Auto', description: 'Devis en 2 min' },
    { id: 'habitation', title: '🏠 Assurance Habitation', description: 'Protégez votre logement' },
    { id: 'takaful', title: '📚 Comprendre le Takaful', description: 'C\'est quoi? C\'est halal?' }
  ];
  
  await sendInteractiveButtons(fromNumber, 'Que souhaitez-vous?', menuOptions);
  
  // 4. Router selon choix
  const userChoice = await waitForUserResponse(fromNumber, timeout=60);
  
  if (userChoice === 'takaful') {
    await startTakafulEducation(fromNumber);
  } else if (userChoice === 'auto') {
    await startDevisAuto(fromNumber);
  } else {
    // Autres produits
  }
}
```

**Messages clés (FR) :**
- Bienvenue : "Bienvenue chez Tamini! 👋 Première assurance Takaful (islamique) à Djibouti. Que puis-je faire pour vous aujourd'hui?"
- Menu : Utiliser boutons rapides WhatsApp (max 3 options)
- Badge social proof : "Rejoignez 12 347 Djiboutiens qui nous font confiance 🇩🇯"

**Temps réponse :** < 2 secondes

---

### F2 - Moteur de Devis Auto (PRIORITÉ ABSOLUE)

**Questions séquentielles (UNE à la fois) :**

```javascript
async function generateDevisAuto(fromNumber) {
  const devisData = {};
  
  // Q1 - Type véhicule
  const vehicleTypes = ['Voiture', '4x4', 'Utilitaire', 'Moto'];
  devisData.type = await askButtonQuestion(
    fromNumber, 
    'Quel type de véhicule? 🚗', 
    vehicleTypes
  );
  
  // Q2 - Marque
  const topBrands = [
    'Toyota', 'Nissan', 'Hyundai', 'Mitsubishi', 'Honda', 
    'Suzuki', 'Kia', 'Mazda', 'Ford', 'Chevrolet', 'Autre'
  ];
  devisData.marque = await askButtonQuestion(
    fromNumber,
    'Marque du véhicule?',
    topBrands
  );
  
  // Q3 - Année
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 26}, (_, i) => currentYear - i);
  devisData.annee = await askListQuestion(
    fromNumber,
    'Année du véhicule?',
    years
  );
  
  // Q4 - Valeur estimée
  await sendMessage(fromNumber, 'Valeur estimée de votre véhicule?\nExemple: 3500000 FDJ');
  const valeurInput = await waitForTextResponse(fromNumber);
  devisData.valeur = parseValeur(valeurInput); // Validation format
  
  // Q5 - Usage
  const usages = ['Personnel', 'Commercial', 'Taxi'];
  devisData.usage = await askButtonQuestion(fromNumber, 'Usage?', usages);
  
  // Q6 - Historique sinistre
  const hasSinistre = await askYesNo(
    fromNumber, 
    'Sinistre dans les 3 dernières années?'
  );
  devisData.sinistre = hasSinistre;
  
  // Calcul pricing
  await sendMessage(fromNumber, '⏳ Je calcule votre devis... (5-10 sec)');
  
  const tarifs = await pricingService.calculateAuto(devisData);
  
  // Génération PDF
  const pdfBuffer = await pdfService.generateDevisAuto({
    ...devisData,
    tarifs,
    timestamp: new Date(),
    validiteJours: 30
  });
  
  // Sauvegarde en DB
  await Devis.create({
    userPhone: fromNumber,
    type: 'AUTO',
    data: devisData,
    tarifs,
    pdfUrl: await uploadToS3(pdfBuffer)
  });
  
  // Envoi PDF via WhatsApp
  await sendDocument(fromNumber, pdfBuffer, 'Devis_Tamini_Auto.pdf');
  
  // Message follow-up avec recommandation
  const recommendation = getRecommendation(devisData, tarifs);
  await sendMessage(fromNumber, recommendation);
  
  // CTA
  const ctaOptions = [
    { id: 'souscrire', title: '✅ Je souscris', description: 'Finaliser la souscription' },
    { id: 'questions', title: '❓ J\'ai des questions', description: 'Parler à un conseiller' },
    { id: 'modifier', title: '✏️ Modifier le devis', description: 'Changer les infos' }
  ];
  
  await sendInteractiveButtons(fromNumber, 'Que souhaitez-vous faire?', ctaOptions);
}

// Smart recommendation logic
function getRecommendation(devisData, tarifs) {
  const { annee, valeur } = devisData;
  const age = new Date().getFullYear() - annee;
  
  if (age > 10) {
    return `💡 Conseil : Votre véhicule a ${age} ans. La formule Tiers (${tarifs.tiers} FDJ/mois) est idéale pour économiser tout en restant légal.`;
  } else if (age < 3 && valeur > 5000000) {
    return `💡 Conseil : Véhicule récent de grande valeur. La formule Tous Risques (${tarifs.tousRisques} FDJ/mois) protège votre investissement de ${valeur.toLocaleString()} FDJ.`;
  } else {
    return `Voici vos 3 formules. La formule Tiers+ (${tarifs.tiersPlus} FDJ/mois) offre le meilleur rapport qualité/prix pour votre profil.`;
  }
}
```

**Calcul Pricing (API ou fichier config) :**

```javascript
// services/pricingService.js
class PricingService {
  async calculateAuto(devisData) {
    const { type, annee, valeur, usage, sinistre, marque } = devisData;
    
    // Base premium calculation
    let basePremium = valeur * 0.03; // 3% de la valeur
    
    // Adjustments
    const age = new Date().getFullYear() - annee;
    if (age > 10) basePremium *= 0.85; // -15% véhicules anciens
    if (age < 3) basePremium *= 1.15; // +15% véhicules récents
    
    if (usage === 'Commercial') basePremium *= 1.30;
    if (usage === 'Taxi') basePremium *= 1.50;
    
    if (sinistre) basePremium *= 1.25; // Malus sinistre
    
    // Formules
    const tiers = Math.round(basePremium * 0.40); // RC uniquement
    const tiersPlus = Math.round(basePremium * 0.65); // RC + Vol + Incendie
    const tousRisques = Math.round(basePremium); // Couverture complète
    
    return {
      tiers: { 
        mensuel: Math.round(tiers / 12),
        annuel: tiers,
        garanties: ['Responsabilité Civile']
      },
      tiersPlus: { 
        mensuel: Math.round(tiersPlus / 12),
        annuel: tiersPlus,
        garanties: ['RC', 'Vol', 'Incendie', 'Bris de glace']
      },
      tousRisques: { 
        mensuel: Math.round(tousRisques / 12),
        annuel: tousRisques,
        garanties: ['RC', 'Vol', 'Incendie', 'Collision', 'Vandalisme', 'Catastrophes naturelles']
      }
    };
  }
}
```

**Génération PDF Devis :**

```javascript
// services/pdfService.js
const PDFDocument = require('pdfkit');

class PDFService {
  async generateDevisAuto(data) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];
    
    doc.on('data', chunk => chunks.push(chunk));
    
    // Header avec logo Tamini
    doc.image('assets/logo_tamini.png', 50, 50, { width: 120 });
    doc.fontSize(10).text('Certifié Takaful ✓', 450, 60, { align: 'right' });
    
    // Titre
    doc.fontSize(18).fillColor('#2c5aa0').text('DEVIS ASSURANCE AUTOMOBILE', 50, 120);
    
    // Infos véhicule
    doc.fontSize(12).fillColor('#000').text('Informations Véhicule', 50, 160);
    doc.fontSize(10)
       .text(`Type: ${data.type}`, 50, 180)
       .text(`Marque: ${data.marque}`, 50, 195)
       .text(`Année: ${data.annee}`, 50, 210)
       .text(`Valeur: ${data.valeur.toLocaleString()} FDJ`, 50, 225);
    
    // Tableau comparatif formules
    const tableTop = 270;
    const formules = [
      { nom: 'TIERS', prix: data.tarifs.tiers.mensuel, garanties: data.tarifs.tiers.garanties },
      { nom: 'TIERS+', prix: data.tarifs.tiersPlus.mensuel, garanties: data.tarifs.tiersPlus.garanties },
      { nom: 'TOUS RISQUES', prix: data.tarifs.tousRisques.mensuel, garanties: data.tarifs.tousRisques.garanties }
    ];
    
    // Headers tableau
    doc.fontSize(10).fillColor('#2c5aa0').text('Formule', 50, tableTop);
    doc.text('Prix/mois', 200, tableTop);
    doc.text('Garanties incluses', 320, tableTop);
    
    // Lignes tableau
    formules.forEach((formule, i) => {
      const y = tableTop + 30 + (i * 50);
      doc.fontSize(11).fillColor('#000').text(formule.nom, 50, y);
      doc.fontSize(14).fillColor('#2c5aa0').text(`${formule.prix.toLocaleString()} FDJ`, 200, y);
      doc.fontSize(8).fillColor('#666').text(formule.garanties.join(', '), 320, y, { width: 200 });
    });
    
    // Footer
    doc.fontSize(8).fillColor('#999')
       .text(`Devis valable 30 jours - Généré le ${new Date().toLocaleDateString('fr-FR')}`, 50, 700)
       .text('Tamini Insurance - Place Menelik, Djibouti - +253 21 35 04 03', 50, 715);
    
    doc.end();
    
    return new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
```

---

### F3 - Upload Documents + OCR

**Workflow :**

```javascript
async function handleDocumentUpload(fromNumber, mediaUrl, mediaType) {
  // 1. Download image from Twilio
  const imageBuffer = await downloadMediaFromTwilio(mediaUrl);
  
  // 2. Validate image quality (résolution, format)
  const validation = await validateImageQuality(imageBuffer);
  if (!validation.valid) {
    await sendMessage(fromNumber, 
      `⚠️ ${validation.error}\n\nAstuce: Photo en pleine lumière, document à plat 📸`
    );
    await sendImage(fromNumber, 'assets/tutorial_photo.jpg'); // Exemple bon/mauvais
    return;
  }
  
  // 3. OCR avec Google Vision
  await sendMessage(fromNumber, 'Analyse du document... ⏳');
  
  const ocrResult = await ocrService.extractText(imageBuffer);
  
  // 4. Parse données selon type document
  let parsedData;
  const docType = detectDocumentType(ocrResult.text); // Carte grise vs Permis vs CIN
  
  if (docType === 'CARTE_GRISE') {
    parsedData = parseCarteGrise(ocrResult);
    await sendMessage(fromNumber, 
      `✅ Carte grise vérifiée!\nVéhicule: ${parsedData.marque} ${parsedData.modele}\nImmatriculation: ${parsedData.immat}`
    );
  } else if (docType === 'PERMIS') {
    parsedData = parsePermis(ocrResult);
    await sendMessage(fromNumber, 
      `✅ Permis de conduire vérifié!\nTitulaire: ${parsedData.nom}\nValidité: ${parsedData.validite}`
    );
  } else {
    await sendMessage(fromNumber, '❌ Type de document non reconnu. Réessayez avec carte grise ou permis.');
    return;
  }
  
  // 5. Sauvegarde en base
  await Document.create({
    userPhone: fromNumber,
    type: docType,
    ocrData: parsedData,
    imageUrl: await uploadToS3(imageBuffer),
    verified: parsedData.confidence > 0.85
  });
  
  // 6. Next step
  const missingDocs = await getMissingDocuments(fromNumber);
  if (missingDocs.length > 0) {
    await sendMessage(fromNumber, `Super! Il me manque encore: ${missingDocs.join(', ')}`);
  } else {
    await sendMessage(fromNumber, '🎉 Tous vos documents sont complets! Passons au paiement.');
    await initiatePayment(fromNumber);
  }
}

// services/ocrService.js
const vision = require('@google-cloud/vision');

class OCRService {
  constructor() {
    this.client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_VISION_KEY_PATH
    });
  }
  
  async extractText(imageBuffer) {
    const [result] = await this.client.textDetection({
      image: { content: imageBuffer }
    });
    
    const fullText = result.fullTextAnnotation?.text || '';
    const blocks = result.textAnnotations || [];
    
    return {
      text: fullText,
      blocks,
      confidence: this.calculateConfidence(blocks)
    };
  }
  
  calculateConfidence(blocks) {
    if (blocks.length === 0) return 0;
    const avgConfidence = blocks.reduce((sum, b) => sum + (b.confidence || 0), 0) / blocks.length;
    return avgConfidence;
  }
}

// Parsing carte grise (République de Djibouti)
function parseCarteGrise(ocrResult) {
  const text = ocrResult.text;
  
  // Regex patterns pour Djibouti
  const immatPattern = /\b\d{1,4}\s?[A-Z]{2}\s?\d{1,2}\b/; // Ex: 1234 DJ 01
  const marquePattern = /MARQUE[:\s]+([A-Z]+)/i;
  const genrePattern = /GENRE[:\s]+([A-Z\s]+)/i;
  
  const immat = text.match(immatPattern)?.[0];
  const marque = text.match(marquePattern)?.[1];
  const genre = text.match(genrePattern)?.[1];
  
  return {
    immatriculation: immat,
    marque,
    genre,
    confidence: ocrResult.confidence
  };
}
```

---

### F4 - Paiement Orange Money

**Workflow Complet :**

```javascript
async function initiatePayment(fromNumber, montant, devisId) {
  // 1. Récupérer infos devis
  const devis = await Devis.findById(devisId);
  
  // 2. Message confirmation
  await sendMessage(fromNumber, 
    `Récapitulatif:\n` +
    `• Formule: ${devis.formule}\n` +
    `• Montant: ${montant.toLocaleString()} FDJ\n\n` +
    `Paiement sécurisé via Orange Money 🔒`
  );
  
  // 3. Génération lien paiement Orange Money
  const paymentRequest = await orangeMoneyService.createPayment({
    amount: montant,
    currency: 'DJF',
    orderId: `TAMINI-${devisId}`,
    description: `Assurance Auto ${devis.data.marque} ${devis.data.annee}`,
    customerPhone: fromNumber,
    returnUrl: `${process.env.BASE_URL}/payment/callback`
  });
  
  // 4. Envoi lien paiement
  await sendMessage(fromNumber,
    `Cliquez pour payer ${montant.toLocaleString()} FDJ:\n` +
    `${paymentRequest.paymentUrl}\n\n` +
    `📱 Vous serez redirigé vers Orange Money pour valider le paiement.`
  );
  
  // 5. Attente webhook confirmation (timeout 5 min)
  const paymentStatus = await waitForPaymentCallback(paymentRequest.transactionId, timeout=300);
  
  if (paymentStatus === 'SUCCESS') {
    await handlePaymentSuccess(fromNumber, devisId, paymentRequest.transactionId);
  } else if (paymentStatus === 'FAILED') {
    await handlePaymentFailed(fromNumber, montant);
  } else {
    // Timeout
    await sendMessage(fromNumber, 
      '⏱️ Délai expiré. Relancez quand vous êtes prêt avec:\n' +
      `"Payer ${montant} FDJ"`
    );
  }
}

async function handlePaymentSuccess(fromNumber, devisId, transactionId) {
  // 1. Update DB
  const contrat = await Contrat.create({
    devisId,
    userPhone: fromNumber,
    statut: 'ACTIF',
    transactionId,
    dateDebut: new Date(),
    dateFin: addYears(new Date(), 1),
    numeroPolice: generatePolicyNumber()
  });
  
  // 2. Message confirmation immédiate
  await sendMessage(fromNumber, 
    `✅ Paiement reçu!\n\n` +
    `Votre attestation arrive dans 2 minutes... 📄`
  );
  
  // 3. Génération attestation PDF
  const attestationPDF = await pdfService.generateAttestation(contrat);
  
  // 4. Envoi WhatsApp + SMS backup
  await sendDocument(fromNumber, attestationPDF, `Attestation_${contrat.numeroPolice}.pdf`);
  await sendSMS(fromNumber, 
    `Tamini Insurance: Votre police ${contrat.numeroPolice} est active. Attestation envoyée par WhatsApp.`
  );
  
  // 5. Message final
  await sendMessage(fromNumber,
    `🎉 Félicitations! Vous êtes assuré(e).\n\n` +
    `Police N°: ${contrat.numeroPolice}\n` +
    `Validité: ${formatDate(contrat.dateDebut)} → ${formatDate(contrat.dateFin)}\n\n` +
    `Besoin d'aide? Tapez "aide" à tout moment.`
  );
}

// services/orangeMoneyService.js
class OrangeMoneyService {
  constructor() {
    this.apiUrl = process.env.ORANGE_MONEY_API_URL;
    this.merchantId = process.env.ORANGE_MONEY_MERCHANT_ID;
    this.apiKey = process.env.ORANGE_MONEY_API_KEY;
  }
  
  async createPayment(params) {
    const { amount, currency, orderId, description, customerPhone, returnUrl } = params;
    
    // Orange Money API call (structure réelle peut varier)
    const response = await axios.post(`${this.apiUrl}/payments`, {
      merchant_id: this.merchantId,
      amount,
      currency,
      order_id: orderId,
      description,
      customer_phone: customerPhone,
      return_url: returnUrl,
      notify_url: `${process.env.BASE_URL}/webhooks/orange-money`
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      transactionId: response.data.transaction_id,
      paymentUrl: response.data.payment_url,
      expiresAt: response.data.expires_at
    };
  }
  
  async verifyPayment(transactionId) {
    const response = await axios.get(
      `${this.apiUrl}/payments/${transactionId}`,
      { headers: { 'Authorization': `Bearer ${this.apiKey}` } }
    );
    
    return {
      status: response.data.status, // SUCCESS, FAILED, PENDING
      amount: response.data.amount,
      paidAt: response.data.paid_at
    };
  }
}

// Webhook handler
router.post('/webhooks/orange-money', async (req, res) => {
  const { transaction_id, status, order_id } = req.body;
  
  // Validation signature (sécurité)
  if (!validateOrangeMoneySignature(req)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Emit event pour résoudre promise dans initiatePayment
  paymentEventEmitter.emit(`payment:${transaction_id}`, status);
  
  res.status(200).send('OK');
});
```

---

### F5 - FAQ Intelligente avec NLP

**Setup Dialogflow :**

```javascript
// Dialogflow intents principaux à créer
const CORE_INTENTS = [
  {
    displayName: 'welcome',
    trainingPhrases: [
      'bonjour', 'salut', 'hello', 'salam', 'hey',
      'je veux une assurance', 'assurer mon véhicule'
    ],
    messages: [{
      text: {
        text: ['Bienvenue chez Tamini! 👋 Comment puis-je vous aider?']
      }
    }]
  },
  {
    displayName: 'faq.takaful.definition',
    trainingPhrases: [
      'c\'est quoi le takaful', 'qu\'est-ce que takaful', 'takaful définition',
      'différence takaful assurance classique', 'assurance islamique c\'est quoi'
    ],
    messages: [{
      text: {
        text: [
          'Le Takaful est une assurance coopérative conforme à la Charia (loi islamique). ' +
          'Contrairement à l\'assurance classique où la compagnie garde les profits, ' +
          'dans le Takaful, les membres partagent mutuellement les risques et les surplus ' +
          'sont redistribués. C\'est 100% halal ✓'
        ]
      }
    }]
  },
  {
    displayName: 'faq.tarifs.pourquoi_cher',
    trainingPhrases: [
      'pourquoi c\'est cher', 'c\'est trop cher', 'prix élevé',
      'je trouve ça cher', 'vous êtes chers'
    ],
    messages: [{
      text: {
        text: [
          'Je comprends votre préoccupation. Nos tarifs sont calculés selon:\n' +
          '• Valeur du véhicule\n• Âge et usage\n• Historique sinistres\n\n' +
          'Conseil: Un véhicule ancien peut prendre la formule Tiers (moins chère) ' +
          'au lieu de Tous Risques. Voulez-vous refaire un devis optimisé?'
        ]
      }
    }]
  },
  {
    displayName: 'faq.paiement.methodes',
    trainingPhrases: [
      'comment payer', 'moyen de paiement', 'paiement par carte',
      'je peux payer comment', 'orange money'
    ],
    messages: [{
      text: {
        text: [
          'Vous pouvez payer par:\n' +
          '✅ Orange Money (recommandé)\n' +
          '✅ Evatis\n' +
          '✅ D-Money\n' +
          '✅ En agence (espèces/chèque)\n\n' +
          'Le paiement mobile est instantané et vous recevez votre attestation en 2 min!'
        ]
      }
    }]
  },
  {
    displayName: 'faq.documents.requis',
    trainingPhrases: [
      'quels documents', 'documents nécessaires', 'papiers à fournir',
      'que faut-il comme papier', 'j\'ai besoin de quoi'
    ],
    messages: [{
      text: {
        text: [
          'Pour souscrire, envoyez-moi simplement des photos de:\n' +
          '📄 Carte grise du véhicule\n' +
          '📄 Permis de conduire\n' +
          '📄 Carte d\'identité nationale\n\n' +
          'Je vérifie automatiquement et vous dis si c\'est bon!'
        ]
      }
    }]
  },
  {
    displayName: 'fallback',
    isFallback: true,
    messages: [{
      text: {
        text: [
          'Désolé, je n\'ai pas bien compris. Pouvez-vous reformuler?\n\n' +
          'Ou tapez:\n' +
          '• "devis" pour une estimation\n' +
          '• "aide" pour parler à un conseiller\n' +
          '• "takaful" pour comprendre l\'assurance islamique'
        ]
      }
    }]
  }
];
```

**Intégration dans le chatbot :**

```javascript
// services/dialogflowService.js
const dialogflow = require('@google-cloud/dialogflow');

class DialogflowService {
  constructor() {
    this.sessionClient = new dialogflow.SessionsClient({
      keyFilename: process.env.DIALOGFLOW_KEY_PATH
    });
    this.projectId = process.env.DIALOGFLOW_PROJECT_ID;
  }
  
  async detectIntent(sessionId, text, languageCode = 'fr') {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectId,
      sessionId
    );
    
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode
        }
      }
    };
    
    const [response] = await this.sessionClient.detectIntent(request);
    const result = response.queryResult;
    
    return {
      intent: result.intent?.displayName,
      confidence: result.intentDetectionConfidence,
      fulfillmentText: result.fulfillmentText,
      parameters: result.parameters?.fields || {}
    };
  }
}

// Dans le webhook controller
async function handleIncomingMessage(fromNumber, messageBody) {
  // 1. Détection intention avec Dialogflow
  const sessionId = `user-${fromNumber}`;
  const intent = await dialogflowService.detectIntent(sessionId, messageBody);
  
  // 2. Router selon intention
  if (intent.confidence > 0.7) {
    // Haute confiance → Réponse automatique
    
    if (intent.intent === 'faq.takaful.definition') {
      await sendMessage(fromNumber, intent.fulfillmentText);
      
      // Upsell: proposer quiz
      await sendInteractiveButtons(fromNumber, 
        'Voulez-vous tester vos connaissances Takaful?',
        [
          { id: 'quiz', title: '✅ Oui, quiz de 3 questions' },
          { id: 'devis', title: '🚗 Non, je veux un devis' }
        ]
      );
      
    } else if (intent.intent === 'faq.paiement.methodes') {
      await sendMessage(fromNumber, intent.fulfillmentText);
      
    } else {
      // Réponse générique Dialogflow
      await sendMessage(fromNumber, intent.fulfillmentText);
    }
    
  } else {
    // Basse confiance → Escalade humaine
    await sendMessage(fromNumber, 
      'Je transfère votre question à un conseiller humain 🤝\n' +
      'Vous serez contacté sous 5 minutes (horaires bureau).'
    );
    
    await createSupportTicket({
      userPhone: fromNumber,
      message: messageBody,
      intent: intent.intent,
      confidence: intent.confidence
    });
  }
}
```

---

### F6 - Escalade Agent Humain

**Triggers d'escalade :**
- Confiance NLP < 70%
- Utilisateur tape "agent", "conseiller", "humain"
- Après 3 échecs de compréhension consécutifs
- Questions complexes hors scope FAQ

**Workflow :**

```javascript
async function escalateToHuman(fromNumber, context) {
  // 1. Notification agent sur Slack ou CRM
  await notifyAvailableAgent({
    userPhone: fromNumber,
    lastMessage: context.lastMessage,
    conversationHistory: context.history,
    devisInProgress: context.devisId,
    urgency: calculateUrgency(context)
  });
  
  // 2. Message utilisateur
  await sendMessage(fromNumber,
    '🤝 Je vous mets en relation avec un expert Tamini.\n\n' +
    'Horaires:\n' +
    '• Lun-Ven: 8h-18h\n' +
    '• Samedi: 8h-14h\n\n' +
    'Si hors horaires, vous serez contacté dès demain matin.'
  );
  
  // 3. Création ticket dans CRM (HubSpot)
  const ticket = await hubspotService.createTicket({
    subject: `WhatsApp: ${fromNumber.slice(-4)} - Escalade chatbot`,
    description: `Conversation:\n${formatConversationForAgent(context.history)}`,
    pipeline: 'support',
    priority: context.urgency,
    contactPhone: fromNumber,
    source: 'WhatsApp Chatbot'
  });
  
  // 4. Mise en pause chatbot pour cet utilisateur
  await redis.set(`agent-takeover:${fromNumber}`, ticket.id, 'EX', 3600);
  
  return ticket;
}

// Quand agent répond depuis CRM
async function handleAgentReply(ticketId, agentMessage) {
  const fromNumber = await getPhoneFromTicket(ticketId);
  
  // Forward message agent → WhatsApp
  await sendMessage(fromNumber, 
    `👤 ${agentMessage.agentName}:\n\n${agentMessage.text}`
  );
}

// Quand utilisateur répond pendant takeover
async function handleUserReplyDuringTakeover(fromNumber, messageBody) {
  const ticketId = await redis.get(`agent-takeover:${fromNumber}`);
  
  // Forward message utilisateur → CRM
  await hubspotService.addNoteToTicket(ticketId, {
    text: messageBody,
    source: 'WhatsApp User'
  });
}
```

---

## 🔧 VARIABLES D'ENVIRONNEMENT

Créer `.env` avec :

```bash
# Server
NODE_ENV=development
PORT=3000
BASE_URL=https://chatbot.tamini-insurance.dj

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/tamini_chatbot
REDIS_URL=redis://localhost:6379

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_WEBHOOK_SECRET=xxxxxxxxx

# Dialogflow
DIALOGFLOW_PROJECT_ID=tamini-chatbot-xxxxx
DIALOGFLOW_KEY_PATH=./config/dialogflow-key.json

# Google Vision OCR
GOOGLE_VISION_KEY_PATH=./config/vision-key.json

# Orange Money
ORANGE_MONEY_API_URL=https://api.orange.dj/omoney/v1
ORANGE_MONEY_MERCHANT_ID=TAMINI_DJ_001
ORANGE_MONEY_API_KEY=xxxxxxxxxxxxxxxxx
ORANGE_MONEY_WEBHOOK_SECRET=xxxxxxxxx

# AWS S3
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=eu-west-1
AWS_S3_BUCKET=tamini-chatbot-docs

# HubSpot CRM
HUBSPOT_API_KEY=xxxxxxxxxxxxxxxxx

# Monitoring
SENTRY_DSN=https://xxxxxx@sentry.io/xxxxxx
DATADOG_API_KEY=xxxxxxxxxxxxxxxxx
```

---

## 📝 INSTRUCTIONS SPÉCIFIQUES CLAUDE CODE

### Approche de Développement

**PRIORITÉ ABSOLUE : SIMPLICITÉ**
- Ne créer QUE ce qui est demandé dans les specs ci-dessus
- Pas de sur-engineering, pas de features "bonus"
- Code production-ready mais minimal (pas de helper inutile)

**SÉQUENCE DE DÉVELOPPEMENT :**

1. **Setup projet (Jour 1)**
   ```bash
   npm init -y
   npm install express body-parser dotenv
   npm install @twilio/sdk @google-cloud/dialogflow @google-cloud/vision
   npm install pg redis axios pdfkit
   npm install --save-dev nodemon jest
   ```
   
   Créer structure dossiers comme indiqué
   Setup `.env.example` avec toutes les variables

2. **Webhook Twilio + Routing basique (Jour 1-2)**
   - Endpoint POST `/webhooks/twilio`
   - Validation signature Twilio
   - Routing vers messageRouter selon intent
   - Logger Winston pour debug

3. **Onboarding + Menu principal (Jour 2)**
   - Détection langue FR/AR
   - Boutons interactifs WhatsApp
   - Sauvegarde préférence user en Redis

4. **Moteur devis auto COMPLET (Jour 3-5)**
   - Questions séquentielles avec state machine
   - Calcul pricing (fichier config JSON au début, API après)
   - Génération PDF avec PDFKit
   - Tests unitaires pricing

5. **Upload docs + OCR (Jour 6-7)**
   - Download media Twilio
   - Google Vision API integration
   - Parsing carte grise + permis
   - Validation qualité image

6. **Paiement Orange Money (Jour 8-9)**
   - API Orange Money (MOCK si pas accès prod)
   - Webhook handler
   - Génération attestation PDF
   - Tests e2e paiement

7. **Dialogflow + FAQ (Jour 10)**
   - Setup intents Dialogflow
   - Integration NLP
   - Fallback vers agent

8. **Escalade humaine (Jour 11)**
   - HubSpot API tickets
   - Agent takeover logic
   - Message forwarding

9. **Tests + Bug fixes (Jour 12-14)**
   - Tests integration complets
   - Load testing (Artillery)
   - Corrections

**TESTING :**
- Tests unitaires : Services pricing, OCR parsing, PDF generation
- Tests integration : Flux complet onboarding → devis → paiement
- Pas de tests UI (pas d'interface)

**LOGS & MONITORING :**
- Winston pour logs structurés
- Sentry pour error tracking
- Log TOUTES les interactions WhatsApp (compliance)

**SÉCURITÉ :**
- Valider TOUTES les entrées utilisateur
- Sanitize avant queries SQL
- Validation signature webhooks Twilio + Orange Money
- Encrypt data sensibles en DB (numéro permis, CIN)

---

## 🎨 TON & MESSAGES

**Principes de rédaction :**
- Langue 6ème année primaire maximum
- Phrases < 12 mots
- Utiliser émojis stratégiquement (signalétique, pas décoration)
- Jamais blâmer utilisateur pour erreur
- Toujours donner exemple concret

**Messages types :**

```javascript
const MESSAGES = {
  FR: {
    welcome: 'Bienvenue chez Tamini! 👋\nPremière assurance Takaful (islamique) à Djibouti.',
    
    menu: 'Que souhaitez-vous?\n🚗 Assurance Auto\n🏠 Assurance Habitation\n📚 Comprendre le Takaful',
    
    devis_processing: '⏳ Je calcule votre devis... (5-10 sec)',
    
    upload_success: '✅ Document vérifié!',
    upload_failed: '⚠️ Photo floue. Réessayez avec plus de lumière 💡',
    upload_tutorial: 'Astuce: Posez le document à plat, éclairage naturel, appareil à 30cm 📸',
    
    payment_cta: 'Cliquez pour payer {amount} FDJ via Orange Money 📱💳',
    payment_success: '✅ Paiement reçu! Votre attestation arrive dans 2 min...',
    payment_failed: '❌ Paiement non abouti. Vérifiez votre solde ou réessayez.',
    
    agent_escalate: '🤝 Je vous mets en contact avec un expert humain.\nRéponse sous 5 min (heures bureau).',
    
    not_understood: 'Je n\'ai pas bien compris. Pouvez-vous reformuler?\n\nOu tapez:\n• "devis"\n• "aide"\n• "takaful"'
  },
  
  AR: {
    welcome: 'مرحباً بك في تأميني! 👋\nأول تأمين تكافل إسلامي في جيبوتي',
    menu: 'ماذا تريد؟\n🚗 تأمين السيارات\n🏠 تأمين المنزل\n📚 فهم التكافل',
    // ... traduire tous les messages
  }
};
```

---

## ✅ DEFINITION OF DONE

Un feature est "Done" quand :

1. ✅ Code suit structure projet ci-dessus
2. ✅ Variables sensibles dans `.env` (pas hardcodées)
3. ✅ Tests unitaires passent (coverage > 70%)
4. ✅ Logs Winston implémentés
5. ✅ Error handling avec try/catch + Sentry
6. ✅ Validé manuellement end-to-end sur numéro test
7. ✅ Pas de console.log (uniquement logger.info/error)
8. ✅ README.md à jour avec instructions run

---

## 🚨 CONTRAINTES & RED FLAGS

**À ÉVITER ABSOLUMENT :**

❌ **Pas de dépendances non-listées** : Stick to stack défini
❌ **Pas de base NoSQL** : PostgreSQL uniquement (sauf Redis cache)
❌ **Pas de framework frontend** : Pur backend API
❌ **Pas de TypeScript** : JavaScript pur (simplicity)
❌ **Pas de GraphQL** : REST uniquement
❌ **Pas de microservices** : Monolithe pour MVP
❌ **Pas de Docker** : Direct Node.js (Docker phase 2)

**QUESTIONS À POSER SI BLOQUÉ :**
- "Les credentials Orange Money API sont-ils dispos? Sinon je MOCK."
- "Le pricing est dans un fichier Excel ou via API Tamini?"
- "Validation: Dialogflow en français ET arabe, ou juste français pour MVP?"

---

## 📊 SUCCESS METRICS

Tu sauras que le chatbot est réussi quand :

1. ✅ Conversation complète onboarding → devis → paiement en < 3 minutes
2. ✅ Génération PDF devis en < 10 secondes
3. ✅ OCR réussit 85%+ des documents bien photographiés
4. ✅ Aucun crash sur 100 conversations simulées
5. ✅ Logs exploitables dans Datadog pour debug
6. ✅ 10 beta users complètent souscription sans aide humaine

---

## 🎯 COMMANDE INITIALE POUR TOI (CLAUDE CODE)

Commence par :

```
/init

Puis créer la structure projet complète avec tous les dossiers.

Ensuite implémenter dans cet ordre strict :
1. Setup Express + webhook Twilio basique (juste logger message reçu)
2. Service WhatsApp (envoi message simple)
3. Onboarding avec détection langue
4. Questions devis auto séquentielles
5. Calcul pricing + PDF
6. OCR upload
7. Paiement (MOCK Orange Money pour l'instant)
8. Dialogflow FAQ
9. Escalade agent

Pose-moi des questions si credentials manquants. GO!
```

---

## 📚 RESSOURCES & DOCS

**APIs à consulter :**
- Twilio WhatsApp: https://www.twilio.com/docs/whatsapp
- Dialogflow ES: https://cloud.google.com/dialogflow/es/docs
- Google Vision: https://cloud.google.com/vision/docs
- PDFKit: https://pdfkit.org/docs/getting_started.html

**Exemples code :**
- Twilio webhook signature validation: https://www.twilio.com/docs/usage/webhooks/webhooks-security
- Interactive buttons WhatsApp: https://www.twilio.com/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates

---

**READY TO BUILD? LET'S GO! 🚀**

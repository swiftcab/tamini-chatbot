import React, { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import Seo, { faqSchema } from "../seo/Seo";
import { PAGE_META } from "../seo/meta";

const N = "#0B1F4D", G = "#6EC026";

const F = {
  fr: {
    title: "Questions fréquentes",
    sub: "Toutes les réponses sur l'assurance Takaful, nos produits, les sinistres et notre modèle. Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp.",
    searchPh: "Rechercher une question...",
    cats: [
      { id: "takaful", label: "Le Takaful", icon: "🕌" },
      { id: "produits", label: "Nos produits", icon: "🛡️" },
      { id: "sinistres", label: "Sinistres", icon: "⚡" },
      { id: "paiement", label: "Paiement & Devis", icon: "💳" },
      { id: "compte", label: "Compte & Digital", icon: "📱" },
      { id: "groupe", label: "Tamini Group", icon: "🌍" },
      { id: "marche", label: "Marché & Djibouti", icon: "🔎" },
    ],
    items: {
      takaful: [
        { q: "C'est quoi le Takaful ?", a: "Le Takaful est une assurance islamique fondée sur la solidarité mutuelle. Vos cotisations alimentent un fonds commun destiné à protéger tous les participants. Contrairement à l'assurance classique, ce modèle exclut l'intérêt (Riba), la spéculation (Maysir) et l'incertitude excessive (Gharar)." },
        { q: "L'assurance est-elle halal ou haram ?", a: "L'assurance conventionnelle pose question pour de nombreux savants en raison du Riba et du Gharar qu'elle comporte. Le Takaful résout ce problème en mutualisant les cotisations dans un fonds solidaire, sans intérêt, sous supervision d'un comité Charia — c'est pourquoi Tamini est certifié par le comité Al-Azhar." },
        { q: "Quelle différence entre Takaful et assurance classique ?", a: "Dans l'assurance classique, l'excédent du fonds devient le profit de la compagnie. Dans le Takaful, cet excédent est redistribué entre les participants et l'opérateur selon le modèle Mudaraba. Vous êtes copropriétaire du fonds, pas seulement client." },
        { q: "Comment fonctionne la redistribution du surplus ?", a: "Chaque année, si le fonds Takaful dégage un excédent après paiement de tous les sinistres, une partie est reversée aux participants éligibles." },
        { q: "Qui certifie la conformité Charia de Tamini ?", a: "Tamini opère sous la supervision d'un comité Charia et applique une certification alignée sur les standards internationaux, incluant une validation Al-Azhar pour la structuration Wakala/Mudaraba de nos produits." },
        { q: "Que signifient Riba, Gharar et Maysir ?", a: "Ce sont les trois interdits fondamentaux de la finance islamique : le Riba est l'intérêt ou l'usure, le Gharar est l'incertitude excessive sur l'objet du contrat, et le Maysir est la spéculation ou le hasard. Le modèle Takaful est structuré pour éliminer ces trois éléments à chaque étape." },
        { q: "Comment fonctionne le modèle Wakala/Mudaraba en pratique ?", a: "Wakala désigne le mandat de gestion : Tamini gère le fonds des participants contre des frais fixes et transparents (des frais connus à l'avance). Mudaraba désigne le partage du profit : le surplus généré par les placements et l'excédent technique du fonds sont partagés selon une clé définie." },
      ],
      produits: [
        { q: "Quels produits d'assurance proposez-vous ?", a: "Plus de 10 produits : Automobile, Habitation, Voyage, Éducation, Personnel & Groupe pour les particuliers ; Multirisque Pro, Maritime, RC Générale, Flotte, Chantier et Garantie de Bonne Exécution pour les entreprises." },
        { q: "L'assistance routière est-elle incluse dans l'assurance auto ?", a: "L'assistance routière 24h/24 et 7j/7 est disponible en option sur nos formules auto — dépannage et remorquage partout à Djibouti." },
        { q: "Une attestation de voyage pour visa, en combien de temps ?", a: "Généralement sous 24 heures ouvrées après validation de votre dossier. Contactez-nous sur WhatsApp pour une demande urgente." },
        { q: "Proposez-vous une assurance pour les PME ?", a: "Oui — la Multirisque Professionnelle couvre locaux, stocks et équipements, avec des formules adaptées de la petite boutique à la grande entreprise." },
        { q: "Qu'est-ce que la Garantie de Bonne Exécution (Performance Bond) ?", a: "C'est une garantie Takaful qui certifie à un donneur d'ordre (public ou privé) que vous exécuterez votre marché dans les conditions prévues — essentielle pour répondre aux appels d'offres." },
        { q: "Assurez-vous les motos à Djibouti ?", a: "L'assurance automobile Tamini couvre tout véhicule terrestre à moteur, y compris les motocyclettes. Contactez-nous sur WhatsApp pour un devis adapté à votre deux-roues." },
        { q: "Quelle assurance pour un chantier de construction ou BTP ?", a: "L'assurance Chantier (CAR/CPM) de Tamini couvre les travaux en cours, les engins et matériels, avec option de responsabilité civile de chantier — pensée pour les entreprises de BTP, promoteurs et sous-traitants à Djibouti." },
        { q: "Comment assurer plusieurs véhicules d'entreprise en une fois ?", a: "L'assurance Flotte Automobile regroupe tous vos véhicules professionnels sous un seul contrat, avec gestion centralisée et assistance routière disponible en option pour l'ensemble du parc." },
      ],
      sinistres: [
        { q: "Comment déclarer un sinistre ?", a: "Trois options : via notre assistant WhatsApp (77 09 41 41), en agence, ou par téléphone (21 35 04 03). Photos et description des faits suffisent pour démarrer le dossier." },
        { q: "Quels documents fournir pour un sinistre auto ?", a: "Carte grise, permis de conduire, constat ou rapport de police si applicable, et photos des dommages. Notre équipe vous guide selon votre situation." },
        { q: "Quel est le délai moyen de règlement ?", a: "Notre cadence de règlement atteint 65%, contre ~18% pour le marché. La majorité des dossiers simples sont traités en 2 à 3 semaines." },
        { q: "Puis-je suivre l'état de mon dossier de sinistre ?", a: "Oui, via WhatsApp ou en contactant votre agence. Un espace de suivi en ligne est en cours de déploiement." },
        { q: "Que faire immédiatement après un accident de voiture ?", a: "Sécurisez les lieux, prenez des photos des dégâts et des plaques d'immatriculation, échangez vos coordonnées avec l'autre conducteur, et contactez immédiatement notre assistant WhatsApp (77 09 41 41) pour être guidé étape par étape." },
        { q: "Comment obtenir une attestation d'assurance en ligne ?", a: "Actuellement, l'attestation est délivrée en agence ou envoyée par WhatsApp après validation de votre dossier. Un service de génération d'attestation 100% en ligne est en préparation." },
      ],
      paiement: [
        { q: "Combien coûte une assurance auto à Djibouti ?", a: "Le tarif dépend du véhicule, de la formule choisie (RC seule ou tous risques) et du profil du conducteur. Contactez-nous sur WhatsApp pour un devis personnalisé et gratuit en quelques minutes." },
        { q: "Comment obtenir un devis ?", a: "Le plus rapide : WhatsApp au 77 09 41 41 (particuliers) ou 77 23 92 92 (entreprises). Le plus précis : notre formulaire de devis en 60 secondes, qui transmet directement vos informations au bon conseiller." },
        { q: "Quels sont vos moyens de paiement ?", a: "Espèces en agence, virement bancaire, et mobile money (WAAFI). Le paiement en ligne est en cours de déploiement." },
        { q: "Puis-je payer en plusieurs fois ?", a: "Des formules de paiement échelonné existent pour certains produits — demandez à votre conseiller lors du devis." },
      ],
      compte: [
        { q: "Ai-je besoin d'un compte pour souscrire ?", a: "Non, la souscription se fait directement avec un conseiller, en agence ou via WhatsApp. Un espace client digital est en développement pour l'auto-service (attestations, suivi de sinistres)." },
        { q: "Comment obtenir une attestation d'assurance ?", a: "Contactez votre agence ou notre WhatsApp commercial. Une génération d'attestation en libre-service arrive prochainement." },
        { q: "Le site est-il disponible en arabe ?", a: "Oui, le site est disponible en français, anglais et arabe — cliquez sur le sélecteur de langue en haut de la page." },
      ],
      groupe: [
        { q: "Tamini est-elle présente hors de Djibouti ?", a: "Oui — le groupe Tamini est présent à Djibouti (siège), en Somaliland (Hargeisa), au Kenya (65% de Takaful Insurance of Africa) et en Ouganda (première licence Takaful du pays, mars 2026)." },
        { q: "Puis-je souscrire une assurance dans un autre pays du groupe ?", a: "Chaque filiale opère selon la réglementation locale. Contactez le siège à Djibouti qui vous orientera vers la bonne entité." },
        { q: "Qu'est-ce que Takaful Insurance of Africa au Kenya ?", a: "C'est une compagnie d'assurance kenyane dont Tamini détient 65% des parts depuis 2025 — une étape clé de l'expansion du groupe Takaful de la Corne de l'Afrique vers l'Afrique de l'Est." },
        { q: "Quand Tamini a-t-elle été créée ?", a: "Tamini Insurance SA a été fondée en 2020 et est devenue le premier opérateur d'assurance Takaful agréé en République de Djibouti." },
      ],
      marche: [
        { q: "Comment choisir son assurance à Djibouti en 2026 ?", a: "Comparez la nature de la couverture (Takaful ou conventionnelle), les garanties incluses, la cadence de règlement des sinistres et la présence digitale de l'assureur. Tamini se distingue par un taux de règlement de 65%, contre ~18% pour la moyenne du marché." },
        { q: "Quelle est la différence entre Tamini et les autres assureurs de Djibouti ?", a: "Tamini est le premier et seul opérateur agréé exclusivement Takaful à Djibouti, avec redistribution du surplus aux assurés et présence régionale en Somaliland, au Kenya et en Ouganda. Les compagnies conventionnelles ne proposent pas ce modèle de solidarité ni ce partage d'excédent." },
      ],
    },
  },
  en: {
    title: "Frequently Asked Questions",
    sub: "All the answers on Takaful insurance, our products, claims and our model. Can't find your answer? Message us on WhatsApp.",
    searchPh: "Search a question...",
    cats: [
      { id: "takaful", label: "Takaful", icon: "🕌" },
      { id: "produits", label: "Our Products", icon: "🛡️" },
      { id: "sinistres", label: "Claims", icon: "⚡" },
      { id: "paiement", label: "Payment & Quotes", icon: "💳" },
      { id: "compte", label: "Account & Digital", icon: "📱" },
      { id: "groupe", label: "Tamini Group", icon: "🌍" },
      { id: "marche", label: "Market & Djibouti", icon: "🔎" },
    ],
    items: {
      takaful: [
        { q: "What is Takaful?", a: "Takaful is Islamic insurance based on mutual solidarity. Your contributions feed a common fund designed to protect all participants. Unlike conventional insurance, this model excludes interest (Riba), speculation (Maysir) and excessive uncertainty (Gharar)." },
        { q: "Is insurance halal or haram?", a: "Conventional insurance raises concerns for many scholars due to Riba and Gharar. Takaful solves this by pooling contributions in a solidarity fund, interest-free, under Sharia committee supervision — which is why Tamini is certified by the Al-Azhar committee." },
        { q: "What's the difference between Takaful and conventional insurance?", a: "In conventional insurance, the fund surplus becomes company profit. In Takaful, this surplus is redistributed between participants and the operator under the Mudaraba model. You co-own the fund, not just a customer." },
        { q: "How does surplus redistribution work?", a: "Every year, if the Takaful fund generates a surplus after all claims are paid, part is returned to eligible participants." },
        { q: "Who certifies Tamini's Sharia compliance?", a: "Tamini operates under Sharia committee supervision and applies certification aligned with international standards, including Al-Azhar validation for the Wakala/Mudaraba structuring of our products." },
        { q: "What do Riba, Gharar and Maysir mean?", a: "These are the three fundamental prohibitions of Islamic finance: Riba is interest or usury, Gharar is excessive uncertainty about the contract's subject matter, and Maysir is speculation or chance. The Takaful model is structured to eliminate all three at every stage." },
        { q: "How does the Wakala/Mudaraba model work in practice?", a: "Wakala refers to the management mandate: Tamini manages the participants' fund for a fixed, transparent fee (fees known in advance). Mudaraba refers to profit-sharing: surplus generated by investments and the fund's technical surplus are shared under a defined ratio." },
      ],
      produits: [
        { q: "What insurance products do you offer?", a: "10+ products: Motor, Home, Travel, Education, Personal & Group for individuals; Business Multi-risk, Marine, General Liability, Fleet, Construction and Performance Bond for businesses." },
        { q: "Is roadside assistance included in motor insurance?", a: "24/7 roadside assistance is available as an option on our motor plans — breakdown and towing anywhere in Djibouti." },
        { q: "How long for a travel visa attestation?", a: "Typically within 24 business hours after file validation. Contact us on WhatsApp for urgent requests." },
        { q: "Do you offer insurance for SMEs?", a: "Yes — Business Multi-risk covers premises, stock and equipment, with plans adapted from small shops to large enterprises." },
        { q: "What is a Performance Bond?", a: "It's a Takaful guarantee certifying to a contracting authority (public or private) that you will execute your contract as agreed — essential for tender bids." },
        { q: "Do you insure motorcycles in Djibouti?", a: "Tamini's motor insurance covers any motor land vehicle, including motorcycles. Contact us on WhatsApp for a quote tailored to your two-wheeler." },
        { q: "What insurance do I need for a construction site?", a: "Tamini's Construction Insurance (CAR/CPM) covers work in progress, machinery and equipment, with optional site liability — designed for construction companies, developers and subcontractors in Djibouti." },
        { q: "How do I insure multiple company vehicles at once?", a: "Motor Fleet insurance groups all your professional vehicles under a single contract, with centralized management and optional roadside assistance for the whole fleet." },
      ],
      sinistres: [
        { q: "How do I file a claim?", a: "Three options: via our WhatsApp assistant (77 09 41 41), in-agency, or by phone (21 35 04 03). Photos and a description of events are enough to start the file." },
        { q: "What documents are needed for a car claim?", a: "Vehicle registration, driving license, police report if applicable, and photos of damage. Our team guides you based on your situation." },
        { q: "What is the average settlement time?", a: "Our settlement rate reaches 65%, versus ~18% market average. Most straightforward claims are processed within 2-3 weeks." },
        { q: "Can I track my claim status?", a: "Yes, via WhatsApp or by contacting your agency. An online tracking portal is being deployed." },
        { q: "What should I do right after a car accident?", a: "Secure the area, photograph the damage and license plates, exchange details with the other driver, and contact our WhatsApp assistant immediately (77 09 41 41) to be guided step by step." },
        { q: "How do I get an insurance certificate online?", a: "Currently, certificates are issued in-agency or sent via WhatsApp after file validation. A fully online certificate generation service is in preparation." },
      ],
      paiement: [
        { q: "How much does car insurance cost in Djibouti?", a: "The price depends on the vehicle, the plan chosen (TPL only or comprehensive) and the driver's profile. Contact us on WhatsApp for a free personalized quote in minutes." },
        { q: "How do I get a quote?", a: "Fastest way: WhatsApp 77 09 41 41 (individuals) or 77 23 92 92 (business). Most precise: our 60-second quote form, which sends your details straight to the right advisor." },
        { q: "What payment methods do you accept?", a: "Cash in-agency, bank transfer, and mobile money (WAAFI). Online payment is being deployed." },
        { q: "Can I pay in installments?", a: "Installment plans exist for certain products — ask your advisor when getting your quote." },
      ],
      compte: [
        { q: "Do I need an account to subscribe?", a: "No, subscription is handled directly with an advisor, in-agency or via WhatsApp. A digital client portal is in development for self-service (attestations, claims tracking)." },
        { q: "How do I get an insurance certificate?", a: "Contact your agency or our business WhatsApp. Self-service certificate generation is coming soon." },
        { q: "Is the website available in Arabic?", a: "Yes, the site is available in French, English and Arabic — click the language selector at the top of the page." },
      ],
      groupe: [
        { q: "Is Tamini present outside Djibouti?", a: "Yes — the Tamini group is present in Djibouti (HQ), Somaliland (Hargeisa), Kenya (65% of Takaful Insurance of Africa) and Uganda (country's first Takaful license, March 2026)." },
        { q: "Can I subscribe to insurance in another group country?", a: "Each subsidiary operates under local regulation. Contact the Djibouti HQ, who will direct you to the right entity." },
        { q: "What is Takaful Insurance of Africa in Kenya?", a: "It's a Kenyan insurance company in which Tamini has held a 65% stake since 2025 — a key milestone in the Horn of Africa Takaful group's expansion into East Africa." },
        { q: "When was Tamini founded?", a: "Tamini Insurance SA was founded in 2020 and became Djibouti's first licensed Takaful insurance operator." },
      ],
      marche: [
        { q: "How do I choose insurance in Djibouti in 2026?", a: "Compare the type of coverage (Takaful or conventional), included guarantees, claims settlement speed, and the insurer's digital presence. Tamini stands out with a 65% settlement rate, versus ~18% market average." },
        { q: "What's the difference between Tamini and other insurers in Djibouti?", a: "Tamini is the first and only exclusively Takaful-licensed operator in Djibouti, with surplus redistribution to policyholders and regional presence in Somaliland, Kenya and Uganda. Conventional companies do not offer this solidarity model or surplus sharing." },
      ],
    },
  },
  ar: {
    title: "الأسئلة الشائعة",
    sub: "كل الإجابات حول التأمين التكافلي ومنتجاتنا والمطالبات ونموذجنا. لم تجد إجابتك؟ راسلنا عبر واتساب.",
    searchPh: "ابحث عن سؤال...",
    cats: [
      { id: "takaful", label: "التكافل", icon: "🕌" },
      { id: "produits", label: "منتجاتنا", icon: "🛡️" },
      { id: "sinistres", label: "المطالبات", icon: "⚡" },
      { id: "paiement", label: "الدفع وعروض الأسعار", icon: "💳" },
      { id: "compte", label: "الحساب والخدمات الرقمية", icon: "📱" },
      { id: "groupe", label: "مجموعة تأميني", icon: "🌍" },
      { id: "marche", label: "السوق وجيبوتي", icon: "🔎" },
    ],
    items: {
      takaful: [
        { q: "ما هو التكافل؟", a: "التكافل هو تأمين إسلامي قائم على التضامن المتبادل. اشتراكاتكم تغذي صندوقاً مشتركاً لحماية جميع المشاركين. وخلافاً للتأمين التقليدي، يستبعد هذا النموذج الربا والميسر والغرر المفرط." },
        { q: "هل التأمين حلال أم حرام؟", a: "يثير التأمين التقليدي تساؤلات لدى كثير من العلماء بسبب الربا والغرر. يحل التكافل هذه المشكلة بتجميع الاشتراكات في صندوق تضامني بدون فوائد، تحت إشراف هيئة شرعية — لهذا فإن تأميني معتمدة من هيئة الأزهر." },
        { q: "ما الفرق بين التكافل والتأمين التقليدي؟", a: "في التأمين التقليدي، يصبح فائض الصندوق ربحاً للشركة. في التكافل، يُعاد توزيع هذا الفائض بين المشاركين والمشغل وفق نموذج المضاربة. أنتم شركاء في ملكية الصندوق، لا مجرد عملاء." },
        { q: "كيف تعمل إعادة توزيع الفائض؟", a: "كل عام، إذا حقق صندوق التكافل فائضاً بعد سداد جميع المطالبات، يُعاد جزء منه للمشاركين المؤهلين." },
        { q: "من يعتمد التزام تأميني بالشريعة؟", a: "تعمل تأميني تحت إشراف هيئة شرعية وتطبق شهادات متوافقة مع المعايير الدولية، بما في ذلك اعتماد الأزهر لهيكلة الوكالة/المضاربة في منتجاتنا." },
        { q: "ماذا تعني الربا والغرر والميسر؟", a: "هذه هي المحظورات الثلاثة الأساسية في التمويل الإسلامي: الربا هو الفائدة، والغرر هو عدم اليقين المفرط بموضوع العقد، والميسر هو المضاربة أو الحظ. نموذج التكافل مُصمَّم لإلغاء هذه العناصر الثلاثة في كل مرحلة." },
        { q: "كيف يعمل نموذج الوكالة/المضاربة عملياً؟", a: "الوكالة تعني تفويض الإدارة: تدير تأميني صندوق المشاركين مقابل رسوم ثابتة وشفافة (أجر معلوم مسبقاً). المضاربة تعني تقاسم الأرباح: يُقسَّم الفائض الناتج عن الاستثمارات والفائض الفني للصندوق وفق نسبة محددة." },
      ],
      produits: [
        { q: "ما هي منتجات التأمين التي تقدمونها؟", a: "أكثر من 10 منتجات: السيارات، المسكن، السفر، التعليم، الشخصي والجماعي للأفراد؛ متعدد المخاطر، البحري، المسؤولية المدنية العامة، الأسطول، المقاولات وضمان حسن التنفيذ للشركات." },
        { q: "هل المساعدة على الطريق مشمولة في تأمين السيارات؟", a: "مساعدة الطريق 24/7 متاحة كخيار على صيغ تأمين السيارات — إصلاح وسحب في كل أنحاء جيبوتي." },
        { q: "شهادة سفر للتأشيرة، خلال كم من الوقت؟", a: "عادة خلال 24 ساعة عمل بعد التحقق من ملفكم. تواصلوا معنا عبر واتساب للطلبات العاجلة." },
        { q: "هل تقدمون تأميناً للمؤسسات الصغيرة والمتوسطة؟", a: "نعم — يغطي التأمين متعدد المخاطر المهني المقرات والمخزون والمعدات، بصيغ تناسب من المتجر الصغير إلى الشركة الكبيرة." },
        { q: "ما هو ضمان حسن التنفيذ؟", a: "هو ضمان تكافلي يشهد لصاحب المشروع (عام أو خاص) بأنكم ستنفذون عقدكم وفق الشروط المتفق عليها — ضروري للمشاركة في المناقصات." },
        { q: "هل تؤمّنون الدراجات النارية في جيبوتي؟", a: "يغطي تأمين السيارات لدى تأميني أي مركبة برية ذات محرك، بما في ذلك الدراجات النارية. تواصلوا معنا عبر واتساب لعرض سعر مناسب لدراجتكم." },
        { q: "ما هو التأمين المناسب لموقع بناء أو مقاولات؟", a: "يغطي تأمين المقاولات (CAR/CPM) لدى تأميني الأعمال الجارية والآليات والمعدات، مع خيار مسؤولية مدنية للورشة — مصمم لشركات البناء والمطورين والمقاولين الفرعيين في جيبوتي." },
        { q: "كيف أؤمّن عدة مركبات للشركة دفعة واحدة؟", a: "يجمع تأمين أسطول المركبات جميع مركباتكم المهنية تحت عقد واحد، مع إدارة مركزية ومساعدة على الطريق متاحة كخيار لكامل الأسطول." },
      ],
      sinistres: [
        { q: "كيف أُصرّح بمطالبة؟", a: "ثلاثة خيارات: عبر مساعدنا على واتساب (77 09 41 41)، في الوكالة، أو هاتفياً (21 35 04 03). الصور ووصف الوقائع كافيان لبدء الملف." },
        { q: "ما هي الوثائق المطلوبة لمطالبة سيارة؟", a: "بطاقة الترخيص، رخصة القيادة، محضر أو تقرير شرطة إن وُجد، وصور الأضرار. يرشدكم فريقنا حسب وضعكم." },
        { q: "ما هو متوسط مدة التسوية؟", a: "يبلغ معدل التسوية لدينا 65%، مقابل ~18% لمتوسط السوق. تُعالج معظم الملفات البسيطة خلال 2 إلى 3 أسابيع." },
        { q: "هل يمكنني متابعة حالة ملف مطالبتي؟", a: "نعم، عبر واتساب أو بالتواصل مع وكالتكم. جارٍ نشر منصة متابعة إلكترونية." },
        { q: "ماذا أفعل فور وقوع حادث سيارة؟", a: "أمّنوا المكان، صوّروا الأضرار ولوحات الترخيص، تبادلوا المعلومات مع السائق الآخر، وتواصلوا فوراً مع مساعدنا على واتساب (77 09 41 41) لإرشادكم خطوة بخطوة." },
        { q: "كيف أحصل على شهادة تأمين عبر الإنترنت؟", a: "حالياً، تُصدَر الشهادات في الوكالة أو تُرسَل عبر واتساب بعد التحقق من ملفكم. جارٍ التحضير لخدمة إصدار شهادات كاملة عبر الإنترنت." },
      ],
      paiement: [
        { q: "كم تكلفة تأمين السيارات في جيبوتي؟", a: "يعتمد السعر على المركبة والصيغة المختارة (مسؤولية مدنية فقط أو شامل) وملف السائق. تواصلوا معنا عبر واتساب للحصول على عرض سعر مجاني ومخصص خلال دقائق." },
        { q: "كيف أحصل على عرض سعر؟", a: "الأسرع: واتساب 77 09 41 41 (أفراد) أو 77 23 92 92 (شركات). الأدق: نموذج عرض السعر في 60 ثانية الذي ينقل معلوماتكم مباشرة إلى المستشار المناسب." },
        { q: "ما هي وسائل الدفع المتاحة؟", a: "نقداً في الوكالة، تحويل بنكي، والدفع عبر الهاتف المحمول (WAAFI). جارٍ نشر الدفع الإلكتروني." },
        { q: "هل يمكنني الدفع على دفعات؟", a: "توجد خطط دفع بالتقسيط لبعض المنتجات — اسألوا مستشاركم عند طلب العرض." },
      ],
      compte: [
        { q: "هل أحتاج لحساب للاشتراك؟", a: "لا، يتم الاشتراك مباشرة مع مستشار، في الوكالة أو عبر واتساب. جارٍ تطوير منصة عملاء رقمية للخدمة الذاتية (الشهادات، متابعة المطالبات)." },
        { q: "كيف أحصل على شهادة تأمين؟", a: "تواصلوا مع وكالتكم أو واتساب المبيعات لدينا. ستتوفر قريباً إمكانية إصدار الشهادات ذاتياً." },
        { q: "هل الموقع متاح باللغة العربية؟", a: "نعم، الموقع متاح بالفرنسية والإنجليزية والعربية — اضغطوا على مبدّل اللغة أعلى الصفحة." },
      ],
      groupe: [
        { q: "هل تأميني حاضرة خارج جيبوتي؟", a: "نعم — مجموعة تأميني حاضرة في جيبوتي (المقر)، صوماليلاند (هرجيسا)، كينيا (65% من Takaful Insurance of Africa) وأوغندا (أول رخصة تكافل في البلاد، مارس 2026)." },
        { q: "هل يمكنني الاشتراك في تأمين ببلد آخر من المجموعة؟", a: "تعمل كل فرع وفق التنظيم المحلي. تواصلوا مع المقر في جيبوتي وسيوجهكم للجهة المناسبة." },
        { q: "ما هي Takaful Insurance of Africa في كينيا؟", a: "هي شركة تأمين كينية تمتلك تأميني 65% من أسهمها منذ 2025 — خطوة رئيسية في توسع مجموعة تكافل القرن الأفريقي نحو شرق أفريقيا." },
        { q: "متى تأسست تأميني؟", a: "تأسست شركة Tamini Insurance SA في 2020 وأصبحت أول مشغل تأمين تكافلي مرخص في جمهورية جيبوتي." },
      ],
      marche: [
        { q: "كيف أختار تأميناً في جيبوتي في 2026؟", a: "قارنوا نوع التغطية (تكافلي أو تقليدي)، الضمانات المشمولة، سرعة تسوية المطالبات، والحضور الرقمي لشركة التأمين. تتميز تأميني بمعدل تسوية 65%، مقابل ~18% لمتوسط السوق." },
        { q: "ما الفرق بين تأميني وشركات التأمين الأخرى في جيبوتي؟", a: "تأميني هي أول وحيد مشغل مرخص حصرياً بالتكافل في جيبوتي، مع إعادة توزيع الفائض على المؤمَّن عليهم وحضور إقليمي في صوماليلاند وكينيا وأوغندا. لا تقدم الشركات التقليدية نموذج التضامن هذا ولا مشاركة الفائض." },
      ],
    },
  },
};

export default function FAQ() {
  const { lang, rtl } = useLang();
  const [cat, setCat] = useState("takaful");
  const [open, setOpen] = useState(0);
  const [q, setQ] = useState("");
  const t = F[lang];

  const allItems = Object.entries(t.items).flatMap(([c, arr]) => arr.map(it => ({ ...it, cat: c })));
  const filtered = q.trim() ? allItems.filter(it => it.q.toLowerCase().includes(q.toLowerCase()) || it.a.toLowerCase().includes(q.toLowerCase())) : t.items[cat];
  const seoMeta = PAGE_META.faq[lang];

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={{ fontFamily: rtl ? "'Cairo','Inter',sans-serif" : "'Inter',system-ui,sans-serif", color: "#1E293B", background: "#fff", minHeight: "80vh" }}>
      <Seo title={seoMeta.title} description={seoMeta.description} path="/faq" schema={faqSchema(allItems)} />

      <div style={{ position: "relative", background: N, padding: "64px 24px 48px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/photo-services.webp)", backgroundSize: "cover", backgroundPosition: "center 20%", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,16,40,.92), rgba(11,31,77,.85))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: rtl ? "'Cairo',sans-serif" : "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>{t.title}</h1>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 28 }}>{t.sub}</p>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t.searchPh} style={{ width: "100%", maxWidth: 440, padding: "14px 20px", borderRadius: 50, border: "none", fontSize: 14, outline: "none" }} />
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        {!q.trim() && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
            {t.cats.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setOpen(0); }} style={{
                padding: "10px 20px", borderRadius: 50, border: "2px solid", cursor: "pointer", fontSize: 13.5, fontWeight: 700,
                background: cat === c.id ? N : "#fff", color: cat === c.id ? "#fff" : "#64748b", borderColor: cat === c.id ? N : "#e2e8f0",
                display: "flex", alignItems: "center", gap: 6,
              }}><span>{c.icon}</span>{c.label}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 && <p style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>{lang === "fr" ? "Aucun résultat. Essayez WhatsApp !" : lang === "en" ? "No results. Try WhatsApp!" : "لا نتائج. جرّب واتساب!"}</p>}
          {filtered.map((f, i) => (
            <div key={i} itemScope itemType="https://schema.org/Question" style={{ background: "#F8FAFF", borderRadius: 14, border: "1px solid #e8ecf0", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: rtl ? "right" : "left" }}>
                <span itemProp="name" style={{ fontSize: 14.5, fontWeight: 700, color: N }}>{f.q}</span>
                <span style={{ fontSize: 20, color: G, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", flexShrink: 0, marginInlineStart: 12 }}>+</span>
              </button>
              {open === i && (
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" style={{ padding: "0 22px 20px" }}>
                  <p itemProp="text" style={{ fontSize: 14, color: "#475569", lineHeight: 1.75 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", padding: "32px 24px", background: N, borderRadius: 18 }}>
          <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{lang === "fr" ? "Vous ne trouvez pas votre réponse ?" : lang === "en" ? "Can't find your answer?" : "لم تجد إجابتك؟"}</p>
          <a href={`https://wa.me/25377094141?text=${encodeURIComponent(lang === "fr" ? "Bonjour, j'ai une question" : lang === "en" ? "Hello, I have a question" : "مرحباً، لدي سؤال")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "13px 28px", background: G, color: N, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            {lang === "fr" ? "💬 Discuter sur WhatsApp" : lang === "en" ? "💬 Chat on WhatsApp" : "💬 تحدث عبر واتساب"}
          </a>
        </div>
      </div>
    </div>
  );
}

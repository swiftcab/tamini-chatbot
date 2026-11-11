// ─────────────────────────────────────────────────────────────
// QUESTIONNAIRES DE QUALIFICATION — un par produit.
// Source unique : modifier une question ou un choix ici suffit,
// le formulaire, le message WhatsApp et le tracking suivent.
//
// Principe (Brunson « micro-engagements ») : 1 question par écran,
// réponses en 1 tap, les infos qui servent à tarifer d'abord,
// les coordonnées en dernier. Aucune donnée sensible demandée
// (pas de pièce d'identité, pas de numéro de compte, pas de santé).
//
// ⚠ À VALIDER par la Direction Technique / Souscription :
// voir le tableau « Formulaires à valider » dans le document Lot 6.
// ─────────────────────────────────────────────────────────────

const L = (fr, en, ar) => ({ fr, en, ar });

// ── Choix réutilisables ─────────────────────────────────────
const CLAIMS_3Y = {
  id: "sinistres",
  label: L("Sinistres déclarés ces 3 dernières années ?", "Claims filed in the last 3 years?", "المطالبات المصرّح بها خلال السنوات الثلاث الأخيرة؟"),
  options: [L("Aucun", "None", "لا شيء"), L("1 sinistre", "1 claim", "مطالبة واحدة"), L("2 ou plus", "2 or more", "2 أو أكثر")],
};
const ROADSIDE = {
  id: "assistance",
  label: L("Ajouter l'option Assistance Routière 24h/24 7j/7 ?", "Add the 24/7 Roadside Assistance option?", "إضافة خيار مساعدة الطريق 24/7؟"),
  hint: L("Option payante : dépannage et remorquage selon les conditions de l'option.", "Paid option: breakdown and towing under the option's terms.", "خيار مدفوع: إصلاح وسحب وفق شروط الخيار."),
  options: [L("Oui, chiffrez l'option", "Yes, quote the option", "نعم، أضيفوا سعر الخيار"), L("Non merci", "No thanks", "لا شكراً"), L("Je veux plus d'infos", "I'd like more info", "أريد معلومات أكثر")],
};
const SITUATION_B2C = {
  id: "situation",
  label: L("Votre situation actuelle ?", "Your current situation?", "وضعكم الحالي؟"),
  options: [
    L("Pas encore assuré", "Not insured yet", "غير مؤمَّن بعد"),
    L("Assuré — échéance dans moins d'1 mois", "Insured — renewal in under 1 month", "مؤمَّن — التجديد خلال أقل من شهر"),
    L("Assuré — échéance plus tard", "Insured — renewal later", "مؤمَّن — التجديد لاحقاً"),
  ],
};
const SITUATION_B2B = {
  id: "echeance",
  label: L("Échéance de votre contrat actuel ?", "When does your current policy renew?", "موعد تجديد عقدكم الحالي؟"),
  options: [
    L("Moins de 3 mois", "Within 3 months", "خلال 3 أشهر"),
    L("Plus de 3 mois", "More than 3 months", "بعد أكثر من 3 أشهر"),
    L("Pas assuré actuellement", "Not currently insured", "غير مؤمَّن حالياً"),
    L("Nouveau projet / nouvelle activité", "New project / new activity", "مشروع أو نشاط جديد"),
  ],
};
const HEADCOUNT = {
  id: "effectif",
  label: L("Effectif de l'entreprise ?", "Company headcount?", "عدد موظفي الشركة؟"),
  options: [L("1 à 9", "1 to 9", "1 إلى 9"), L("10 à 49", "10 to 49", "10 إلى 49"), L("50 à 249", "50 to 249", "50 إلى 249"), L("250 et plus", "250+", "250 فأكثر")],
};
const SECTOR = {
  id: "secteur",
  label: L("Votre secteur d'activité ?", "Your industry?", "قطاع نشاطكم؟"),
  options: [
    L("Commerce / distribution", "Retail / distribution", "تجارة / توزيع"),
    L("Industrie / entrepôt / logistique", "Industry / warehouse / logistics", "صناعة / مستودعات / لوجستيك"),
    L("Bureaux / services", "Offices / services", "مكاتب / خدمات"),
    L("Hôtellerie / restauration", "Hospitality / food service", "فندقة / مطاعم"),
    L("BTP / énergie", "Construction / energy", "بناء / طاقة"),
    L("Autre", "Other", "أخرى"),
  ],
};
const AGE = {
  id: "age",
  label: L("Votre tranche d'âge ?", "Your age bracket?", "فئتكم العمرية؟"),
  options: [L("18 – 29 ans", "18 – 29", "18 – 29 سنة"), L("30 – 45 ans", "30 – 45", "30 – 45 سنة"), L("46 – 60 ans", "46 – 60", "46 – 60 سنة"), L("Plus de 60 ans", "Over 60", "أكثر من 60 سنة")],
};
const CONTRACT_VALUE = {
  id: "montant_marche",
  label: L("Montant du marché ?", "Contract value?", "قيمة الصفقة؟"),
  options: [L("Moins de 50 M FDJ", "Under 50M DJF", "أقل من 50 مليون فرنك"), L("50 – 250 M FDJ", "50 – 250M DJF", "50 – 250 مليون فرنك"), L("250 M – 1 Md FDJ", "250M – 1B DJF", "250 مليون – 1 مليار فرنك"), L("Plus de 1 Md FDJ", "Over 1B DJF", "أكثر من 1 مليار فرنك")],
};

// ── Questionnaires produits ─────────────────────────────────
export const FUNNELS = {
  auto: {
    prefix: "AUTO",
    questions: [
      { id: "usage", label: L("Quel usage pour le véhicule ?", "How is the vehicle used?", "ما استخدام المركبة؟"), options: [L("Personnel / familial", "Personal / family", "شخصي / عائلي"), L("Professionnel (société)", "Business (company)", "مهني (شركة)"), L("Taxi / transport de personnes", "Taxi / passenger transport", "تاكسي / نقل أشخاص"), L("Location", "Rental", "تأجير")] },
      { id: "vehicule", label: L("Type de véhicule ?", "Vehicle type?", "نوع المركبة؟"), options: [L("Citadine / berline", "Car / sedan", "سيارة صغيرة / سيدان"), L("SUV / 4x4", "SUV / 4x4", "رباعية الدفع"), L("Pick-up / utilitaire", "Pick-up / van", "بيك أب / نفعية"), L("Moto / scooter", "Motorbike / scooter", "دراجة نارية"), L("Camion", "Truck", "شاحنة")] },
      { id: "annee", label: L("Année de mise en circulation ?", "Year of first registration?", "سنة أول تسجيل؟"), options: [L("2022 ou plus récent", "2022 or newer", "2022 أو أحدث"), L("2017 – 2021", "2017 – 2021", "2017 – 2021"), L("2010 – 2016", "2010 – 2016", "2010 – 2016"), L("Avant 2010", "Before 2010", "قبل 2010")] },
      { id: "valeur", label: L("Valeur estimée du véhicule ?", "Estimated vehicle value?", "القيمة التقديرية للمركبة؟"), options: [L("Moins de 1 M FDJ", "Under 1M DJF", "أقل من 1 مليون فرنك"), L("1 – 3 M FDJ", "1 – 3M DJF", "1 – 3 مليون فرنك"), L("3 – 6 M FDJ", "3 – 6M DJF", "3 – 6 مليون فرنك"), L("6 – 10 M FDJ", "6 – 10M DJF", "6 – 10 مليون فرنك"), L("Plus de 10 M FDJ", "Over 10M DJF", "أكثر من 10 مليون فرنك")] },
      { id: "formule", label: L("Quelle formule vous intéresse ?", "Which cover interests you?", "أي صيغة تهمكم؟"), options: [L("Responsabilité Civile (obligatoire)", "Third-Party Liability (compulsory)", "المسؤولية المدنية (إلزامية)"), L("Tous Risques", "Comprehensive", "شامل"), L("Je veux être conseillé", "I'd like advice", "أريد نصيحة")] },
      ROADSIDE,
      SITUATION_B2C,
      CLAIMS_3Y,
    ],
  },

  habitation: {
    prefix: "HAB",
    questions: [
      { id: "statut", label: L("Vous êtes…", "You are…", "أنتم…"), options: [L("Propriétaire occupant", "Owner-occupier", "مالك ساكن"), L("Locataire", "Tenant", "مستأجر"), L("Propriétaire bailleur", "Landlord", "مالك مؤجِّر")] },
      { id: "logement", label: L("Type de logement ?", "Type of home?", "نوع المسكن؟"), options: [L("Appartement", "Apartment", "شقة"), L("Villa", "Villa", "فيلا"), L("Maison", "House", "منزل")] },
      { id: "pieces", label: L("Nombre de pièces ?", "Number of rooms?", "عدد الغرف؟"), options: [L("1 – 2", "1 – 2", "1 – 2"), L("3 – 4", "3 – 4", "3 – 4"), L("5 et plus", "5+", "5 فأكثر")] },
      { id: "contenu", label: L("Valeur de vos biens (meubles, électroménager…) ?", "Value of your belongings (furniture, appliances…)?", "قيمة ممتلكاتكم (أثاث، أجهزة…)؟"), options: [L("Moins de 1 M FDJ", "Under 1M DJF", "أقل من 1 مليون فرنك"), L("1 – 3 M FDJ", "1 – 3M DJF", "1 – 3 مليون فرنك"), L("3 – 7 M FDJ", "3 – 7M DJF", "3 – 7 مليون فرنك"), L("Plus de 7 M FDJ", "Over 7M DJF", "أكثر من 7 مليون فرنك")] },
      { id: "quartier", type: "text", optional: true, label: L("Quartier (facultatif)", "Neighbourhood (optional)", "الحي (اختياري)"), placeholder: L("Ex. Haramous, Plateau du Serpent…", "e.g. Haramous, Plateau du Serpent…", "مثال: حرموس، هضبة الثعبان…") },
      SITUATION_B2C,
    ],
  },

  voyage: {
    prefix: "VOY",
    questions: [
      { id: "destination", label: L("Destination ?", "Destination?", "الوجهة؟"), options: [L("Europe (Schengen)", "Europe (Schengen)", "أوروبا (شنغن)"), L("Moyen-Orient", "Middle East", "الشرق الأوسط"), L("Afrique", "Africa", "أفريقيا"), L("Asie", "Asia", "آسيا"), L("Amériques", "Americas", "الأمريكيتان"), L("Monde entier", "Worldwide", "العالم كله")] },
      { id: "motif", label: L("Motif du voyage ?", "Purpose of trip?", "سبب السفر؟"), options: [L("Tourisme / famille", "Leisure / family", "سياحة / عائلة"), L("Affaires", "Business", "أعمال"), L("Études", "Studies", "دراسة"), L("Omra / Hajj", "Umrah / Hajj", "عمرة / حج"), L("Soins médicaux", "Medical treatment", "علاج طبي")] },
      { id: "duree", label: L("Durée du séjour ?", "Length of stay?", "مدة الإقامة؟"), options: [L("Jusqu'à 8 jours", "Up to 8 days", "حتى 8 أيام"), L("9 – 15 jours", "9 – 15 days", "9 – 15 يوماً"), L("16 – 31 jours", "16 – 31 days", "16 – 31 يوماً"), L("1 – 3 mois", "1 – 3 months", "1 – 3 أشهر"), L("3 mois – 1 an", "3 months – 1 year", "3 أشهر – سنة")] },
      { id: "voyageurs", label: L("Nombre de voyageurs ?", "Number of travellers?", "عدد المسافرين؟"), options: [L("1", "1", "1"), L("2", "2", "2"), L("3 – 4", "3 – 4", "3 – 4"), L("5 et plus", "5+", "5 فأكثر")] },
      { id: "depart", label: L("Date de départ ?", "Departure date?", "تاريخ المغادرة؟"), options: [L("Dans moins de 7 jours", "Within 7 days", "خلال أقل من 7 أيام"), L("Dans 1 à 4 semaines", "In 1 to 4 weeks", "خلال 1 إلى 4 أسابيع"), L("Dans plus d'un mois", "In over a month", "بعد أكثر من شهر")] },
      { id: "visa", label: L("L'attestation est-elle pour un dossier de visa ?", "Is the certificate for a visa application?", "هل الشهادة لملف تأشيرة؟"), options: [L("Oui", "Yes", "نعم"), L("Non", "No", "لا")] },
    ],
  },

  education: {
    prefix: "EDU",
    questions: [
      { id: "enfants", label: L("Combien d'enfants scolarisés ?", "How many children in school?", "كم عدد الأطفال المتمدرسين؟"), options: [L("1", "1", "1"), L("2", "2", "2"), L("3", "3", "3"), L("4 et plus", "4+", "4 فأكثر")] },
      { id: "niveau", label: L("Niveau de l'aîné ?", "Eldest child's level?", "مستوى الطفل الأكبر؟"), options: [L("Maternelle", "Kindergarten", "روضة"), L("Primaire", "Primary", "ابتدائي"), L("Collège", "Middle school", "إعدادي"), L("Lycée", "High school", "ثانوي")] },
      { id: "etablissement", label: L("Type d'établissement ?", "Type of school?", "نوع المؤسسة التعليمية؟"), options: [L("Public", "Public", "حكومية"), L("Privé", "Private", "خاصة"), L("International", "International", "دولية")] },
      { id: "frais", label: L("Frais de scolarité annuels par enfant ?", "Annual school fees per child?", "الرسوم الدراسية السنوية لكل طفل؟"), options: [L("Moins de 100 000 FDJ", "Under 100,000 DJF", "أقل من 100,000 فرنك"), L("100 000 – 300 000 FDJ", "100,000 – 300,000 DJF", "100,000 – 300,000 فرنك"), L("300 000 – 600 000 FDJ", "300,000 – 600,000 DJF", "300,000 – 600,000 فرنك"), L("Plus de 600 000 FDJ", "Over 600,000 DJF", "أكثر من 600,000 فرنك")] },
      AGE,
    ],
  },

  accidents: {
    prefix: "IA",
    questions: [
      { id: "personnes", label: L("Qui souhaitez-vous protéger ?", "Who do you want to protect?", "من تريدون حمايته؟"), options: [L("Moi seul(e)", "Just me", "أنا فقط"), L("Moi et mon conjoint", "Me and my spouse", "أنا وزوجي/زوجتي"), L("Toute la famille", "The whole family", "العائلة كلها")] },
      { id: "activite", label: L("Votre activité principale ?", "Your main activity?", "نشاطكم الرئيسي؟"), options: [L("Bureau", "Office", "مكتب"), L("Commerce", "Retail", "تجارة"), L("Terrain / chantier / conduite", "Field / site / driving", "ميدان / ورشة / قيادة"), L("Étudiant / retraité / sans activité", "Student / retired / not working", "طالب / متقاعد / بدون نشاط")] },
      AGE,
      { id: "capital", label: L("Capital souhaité ?", "Desired cover amount?", "المبلغ المرغوب؟"), options: [L("1 M FDJ", "1M DJF", "1 مليون فرنك"), L("2,5 M FDJ", "2.5M DJF", "2.5 مليون فرنك"), L("5 M FDJ", "5M DJF", "5 مليون فرنك"), L("Plus de 5 M FDJ", "Over 5M DJF", "أكثر من 5 مليون فرنك"), L("Je veux être conseillé", "I'd like advice", "أريد نصيحة")] },
      { id: "employeur", label: L("Déjà couvert par votre employeur ?", "Already covered by your employer?", "هل لديكم تغطية من صاحب العمل؟"), options: [L("Oui", "Yes", "نعم"), L("Non", "No", "لا"), L("Je ne sais pas", "Not sure", "لا أعرف")] },
    ],
  },

  multirisque: {
    prefix: "MRP",
    questions: [
      SECTOR,
      { id: "locaux", label: L("Vos locaux ?", "Your premises?", "مقراتكم؟"), options: [L("Propriétaire", "Owned", "ملك"), L("Locataire", "Rented", "مستأجرة")] },
      { id: "surface", label: L("Surface totale ?", "Total floor area?", "المساحة الإجمالية؟"), options: [L("Moins de 200 m²", "Under 200 m²", "أقل من 200 م²"), L("200 – 1 000 m²", "200 – 1,000 m²", "200 – 1,000 م²"), L("1 000 – 5 000 m²", "1,000 – 5,000 m²", "1,000 – 5,000 م²"), L("Plus de 5 000 m²", "Over 5,000 m²", "أكثر من 5,000 م²")] },
      { id: "valeur_biens", label: L("Valeur bâtiment + équipements ?", "Building + equipment value?", "قيمة المبنى والمعدات؟"), options: [L("Moins de 20 M FDJ", "Under 20M DJF", "أقل من 20 مليون فرنك"), L("20 – 100 M FDJ", "20 – 100M DJF", "20 – 100 مليون فرنك"), L("100 – 500 M FDJ", "100 – 500M DJF", "100 – 500 مليون فرنك"), L("Plus de 500 M FDJ", "Over 500M DJF", "أكثر من 500 مليون فرنك")] },
      { id: "stocks", label: L("Stock moyen ?", "Average stock value?", "متوسط قيمة المخزون؟"), options: [L("Pas de stock", "No stock", "لا يوجد مخزون"), L("Moins de 10 M FDJ", "Under 10M DJF", "أقل من 10 مليون فرنك"), L("10 – 50 M FDJ", "10 – 50M DJF", "10 – 50 مليون فرنك"), L("Plus de 50 M FDJ", "Over 50M DJF", "أكثر من 50 مليون فرنك")] },
      HEADCOUNT,
      CLAIMS_3Y,
      SITUATION_B2B,
    ],
  },

  rc: {
    prefix: "RC",
    questions: [
      { id: "type_rc", label: L("Quelle responsabilité couvrir ?", "Which liability to cover?", "أي مسؤولية تريدون تغطيتها؟"), options: [L("RC Exploitation (dommages aux tiers)", "General liability (third-party damage)", "مسؤولية الاستغلال (أضرار الغير)"), L("RC Professionnelle (erreur, conseil)", "Professional liability (errors, advice)", "المسؤولية المهنية (خطأ، استشارة)"), L("RC Produits", "Product liability", "مسؤولية المنتجات"), L("Je ne sais pas", "Not sure", "لا أعرف")] },
      SECTOR,
      { id: "ca", label: L("Chiffre d'affaires annuel ?", "Annual turnover?", "رقم الأعمال السنوي؟"), options: [L("Moins de 50 M FDJ", "Under 50M DJF", "أقل من 50 مليون فرنك"), L("50 – 250 M FDJ", "50 – 250M DJF", "50 – 250 مليون فرنك"), L("250 M – 1 Md FDJ", "250M – 1B DJF", "250 مليون – 1 مليار فرنك"), L("Plus de 1 Md FDJ", "Over 1B DJF", "أكثر من 1 مليار فرنك")] },
      HEADCOUNT,
      { id: "public", label: L("Recevez-vous du public dans vos locaux ?", "Do you receive the public on your premises?", "هل تستقبلون الجمهور في مقراتكم؟"), options: [L("Oui", "Yes", "نعم"), L("Non", "No", "لا")] },
      { id: "declencheur", label: L("Pourquoi maintenant ?", "Why now?", "لماذا الآن؟"), options: [L("Exigée par un client / appel d'offres", "Required by a client / tender", "مطلوبة من عميل / مناقصة"), L("Exigence réglementaire", "Regulatory requirement", "متطلب تنظيمي"), L("Démarche volontaire", "Voluntary", "مبادرة طوعية"), L("Renouvellement", "Renewal", "تجديد")] },
    ],
  },

  maritime: {
    prefix: "MAR",
    questions: [
      { id: "type_maritime", label: L("Que faut-il assurer ?", "What needs cover?", "ماذا تريدون تأمينه؟"), options: [L("Marchandises transportées (facultés)", "Goods in transit (cargo)", "البضائع المنقولة"), L("Navire (corps)", "Vessel (hull)", "السفينة (الهيكل)"), L("Les deux", "Both", "الاثنان")] },
      { id: "flux", label: L("Sens des flux ?", "Direction of flows?", "اتجاه التدفقات؟"), options: [L("Import", "Import", "استيراد"), L("Export", "Export", "تصدير"), L("Transit (corridor Éthiopie)", "Transit (Ethiopia corridor)", "عبور (ممر إثيوبيا)"), L("Mixte", "Mixed", "مختلط")] },
      { id: "marchandises", label: L("Nature des marchandises ?", "Type of goods?", "طبيعة البضائع؟"), options: [L("Conteneurs — marchandises générales", "Containers — general goods", "حاويات — بضائع عامة"), L("Vrac (céréales, engrais…)", "Bulk (grain, fertiliser…)", "سائبة (حبوب، أسمدة…)"), L("Produits alimentaires", "Food products", "مواد غذائية"), L("Véhicules / engins", "Vehicles / machinery", "مركبات / آليات"), L("Hydrocarbures / chimie", "Oil / chemicals", "محروقات / كيماويات"), L("Autre", "Other", "أخرى")] },
      { id: "valeur_expedition", label: L("Valeur moyenne par expédition ?", "Average value per shipment?", "متوسط قيمة الشحنة؟"), options: [L("Moins de 5 M FDJ", "Under 5M DJF", "أقل من 5 مليون فرنك"), L("5 – 25 M FDJ", "5 – 25M DJF", "5 – 25 مليون فرنك"), L("25 – 100 M FDJ", "25 – 100M DJF", "25 – 100 مليون فرنك"), L("Plus de 100 M FDJ", "Over 100M DJF", "أكثر من 100 مليون فرنك")] },
      { id: "frequence", label: L("Nombre d'expéditions par an ?", "Shipments per year?", "عدد الشحنات سنوياً؟"), options: [L("Ponctuelle (1)", "One-off (1)", "شحنة واحدة"), L("2 – 12", "2 – 12", "2 – 12"), L("13 – 50", "13 – 50", "13 – 50"), L("Plus de 50", "Over 50", "أكثر من 50")] },
      { id: "incoterm", label: L("Incoterm habituel ?", "Usual Incoterm?", "شرط التسليم المعتاد (Incoterm)؟"), hint: L("En FOB, FCA ou CFR, c'est généralement à l'acheteur d'assurer.", "Under FOB, FCA or CFR, the buyer usually insures.", "في FOB أو FCA أو CFR يؤمّن المشتري عادةً."), options: [L("CIF / CIP", "CIF / CIP", "CIF / CIP"), L("FOB / FCA / CFR", "FOB / FCA / CFR", "FOB / FCA / CFR"), L("EXW / autre", "EXW / other", "EXW / أخرى"), L("Je ne sais pas", "Not sure", "لا أعرف")] },
      { id: "transport", label: L("Mode de transport ?", "Mode of transport?", "وسيلة النقل؟"), options: [L("Mer", "Sea", "بحري"), L("Mer + route", "Sea + road", "بحري + بري"), L("Route uniquement", "Road only", "بري فقط"), L("Aérien", "Air", "جوي")] },
    ],
  },

  flotte: {
    prefix: "FLT",
    questions: [
      { id: "nb_vehicules", label: L("Combien de véhicules ?", "How many vehicles?", "كم عدد المركبات؟"), options: [L("2 – 5", "2 – 5", "2 – 5"), L("6 – 20", "6 – 20", "6 – 20"), L("21 – 50", "21 – 50", "21 – 50"), L("Plus de 50", "Over 50", "أكثر من 50")] },
      { id: "types", label: L("Principalement…", "Mainly…", "في الغالب…"), options: [L("Véhicules légers", "Cars", "مركبات خفيفة"), L("Utilitaires", "Vans / light trucks", "مركبات نفعية"), L("Poids lourds", "Heavy trucks", "شاحنات ثقيلة"), L("Engins", "Machinery", "آليات"), L("Mixte", "Mixed", "مختلط")] },
      { id: "usage_flotte", label: L("Usage principal ?", "Main use?", "الاستخدام الرئيسي؟"), options: [L("Transport pour compte propre", "Own-account transport", "نقل لحساب الشركة"), L("Transport pour compte d'autrui", "Haulage for third parties", "نقل لحساب الغير"), L("Déplacements du personnel", "Staff travel", "تنقل الموظفين"), L("Location", "Rental", "تأجير"), L("Mixte", "Mixed", "مختلط")] },
      { id: "zone", label: L("Zone de circulation ?", "Operating area?", "منطقة السير؟"), options: [L("Djibouti uniquement", "Djibouti only", "جيبوتي فقط"), L("Corridor Djibouti – Éthiopie", "Djibouti – Ethiopia corridor", "ممر جيبوتي – إثيوبيا"), L("Régional", "Regional", "إقليمي")] },
      { id: "formule", label: L("Formule souhaitée ?", "Preferred cover?", "الصيغة المرغوبة؟"), options: [L("Responsabilité Civile", "Third-Party Liability", "المسؤولية المدنية"), L("Tous Risques", "Comprehensive", "شامل"), L("Mixte selon les véhicules", "Mixed by vehicle", "مختلط حسب المركبات"), L("Je veux être conseillé", "I'd like advice", "أريد نصيحة")] },
      ROADSIDE,
      CLAIMS_3Y,
      SITUATION_B2B,
    ],
  },

  chantier: {
    prefix: "TRC",
    questions: [
      { id: "ouvrage", label: L("Type d'ouvrage ?", "Type of works?", "نوع المنشأة؟"), options: [L("Bâtiment", "Building", "مبنى"), L("Génie civil / routes", "Civil works / roads", "هندسة مدنية / طرق"), L("Port / maritime", "Port / marine", "ميناء / بحري"), L("Industriel / énergie", "Industrial / energy", "صناعي / طاقة"), L("Rénovation", "Renovation", "ترميم")] },
      { id: "role", label: L("Votre rôle ?", "Your role?", "دوركم؟"), options: [L("Maître d'ouvrage", "Project owner", "صاحب المشروع"), L("Entreprise générale", "Main contractor", "مقاول رئيسي"), L("Sous-traitant", "Subcontractor", "مقاول من الباطن"), L("Bureau d'études", "Engineering firm", "مكتب دراسات")] },
      CONTRACT_VALUE,
      { id: "duree", label: L("Durée des travaux ?", "Works duration?", "مدة الأشغال؟"), options: [L("Moins de 6 mois", "Under 6 months", "أقل من 6 أشهر"), L("6 – 12 mois", "6 – 12 months", "6 – 12 شهراً"), L("12 – 24 mois", "12 – 24 months", "12 – 24 شهراً"), L("Plus de 24 mois", "Over 24 months", "أكثر من 24 شهراً")] },
      { id: "demarrage", label: L("Démarrage du chantier ?", "Site start?", "بدء الأشغال؟"), options: [L("Déjà démarré", "Already started", "بدأ بالفعل"), L("Dans moins d'1 mois", "Within 1 month", "خلال أقل من شهر"), L("Dans 1 à 3 mois", "In 1 to 3 months", "خلال 1 إلى 3 أشهر"), L("Dans plus de 3 mois", "In over 3 months", "بعد أكثر من 3 أشهر")] },
      { id: "exigence", label: L("L'assurance est-elle exigée par le contrat ?", "Is cover required by the contract?", "هل التأمين مطلوب في العقد؟"), options: [L("Oui", "Yes", "نعم"), L("Non", "No", "لا"), L("Je ne sais pas", "Not sure", "لا أعرف")] },
    ],
  },

  bond: {
    prefix: "BOND",
    questions: [
      { id: "type_garantie", label: L("Quelle garantie ?", "Which guarantee?", "أي ضمان؟"), options: [L("Soumission (bid bond)", "Bid bond", "ضمان العطاء"), L("Bonne exécution", "Performance bond", "ضمان حسن التنفيذ"), L("Restitution d'acompte", "Advance payment bond", "ضمان استرداد الدفعة المقدمة"), L("Retenue de garantie", "Retention bond", "ضمان الاحتجاز")] },
      { id: "beneficiaire", label: L("Donneur d'ordre ?", "Beneficiary?", "الجهة المستفيدة؟"), options: [L("État / établissement public", "Government / public body", "الدولة / مؤسسة عامة"), L("Entreprise privée", "Private company", "شركة خاصة"), L("Bailleur international", "International donor", "جهة مانحة دولية"), L("Autre", "Other", "أخرى")] },
      CONTRACT_VALUE,
      { id: "taux", label: L("Pourcentage exigé ?", "Required percentage?", "النسبة المطلوبة؟"), options: [L("1 – 2 %", "1 – 2%", "1 – 2%"), L("5 %", "5%", "5%"), L("10 %", "10%", "10%"), L("Autre / je ne sais pas", "Other / not sure", "أخرى / لا أعرف")] },
      { id: "delai", label: L("Date limite de dépôt ?", "Submission deadline?", "آخر أجل للإيداع؟"), options: [L("Moins d'1 semaine", "Under 1 week", "أقل من أسبوع"), L("1 – 4 semaines", "1 – 4 weeks", "1 – 4 أسابيع"), L("Plus d'1 mois", "Over 1 month", "أكثر من شهر")] },
      { id: "anciennete", label: L("Ancienneté de l'entreprise ?", "Company age?", "أقدمية الشركة؟"), options: [L("Moins de 2 ans", "Under 2 years", "أقل من سنتين"), L("2 – 5 ans", "2 – 5 years", "2 – 5 سنوات"), L("Plus de 5 ans", "Over 5 years", "أكثر من 5 سنوات")] },
      { id: "etats_financiers", label: L("États financiers des 2 derniers exercices ?", "Financial statements for the last 2 years?", "القوائم المالية لآخر سنتين؟"), options: [L("Disponibles", "Available", "متوفرة"), L("En cours de préparation", "Being prepared", "قيد الإعداد"), L("Non disponibles", "Not available", "غير متوفرة")] },
    ],
  },
};

// ── Étape finale : coordonnées (dernière, jamais en premier) ──
export const CONTACT = {
  b2c: [
    { id: "prenom", type: "text", label: L("Votre prénom", "Your first name", "اسمكم الأول"), placeholder: L("Ex. Amina", "e.g. Amina", "مثال: أمينة"), autoComplete: "given-name" },
    { id: "contact", label: L("Comment préférez-vous recevoir votre proposition ?", "How would you like to receive your proposal?", "كيف تفضلون استلام العرض؟"), options: [L("Par message WhatsApp", "By WhatsApp message", "برسالة واتساب"), L("Appel le matin", "Call in the morning", "اتصال صباحاً"), L("Appel l'après-midi", "Call in the afternoon", "اتصال بعد الظهر")] },
  ],
  b2b: [
    { id: "nom", type: "text", label: L("Nom et prénom", "Full name", "الاسم الكامل"), placeholder: L("Ex. Ahmed Ali", "e.g. Ahmed Ali", "مثال: أحمد علي"), autoComplete: "name" },
    { id: "entreprise", type: "text", label: L("Entreprise", "Company", "الشركة"), placeholder: L("Raison sociale", "Company name", "اسم الشركة"), autoComplete: "organization" },
    { id: "fonction", label: L("Votre fonction ?", "Your role?", "منصبكم؟"), options: [L("Dirigeant", "Executive / owner", "مدير / مالك"), L("Finance / DAF", "Finance / CFO", "المالية"), L("Achats / risques", "Procurement / risk", "المشتريات / المخاطر"), L("RH", "HR", "الموارد البشرية"), L("Autre", "Other", "أخرى")] },
    { id: "contact", label: L("Comment préférez-vous être recontacté ?", "How would you like to be contacted?", "كيف تفضلون التواصل معكم؟"), options: [L("WhatsApp", "WhatsApp", "واتساب"), L("Appel téléphonique", "Phone call", "اتصال هاتفي"), L("Rendez-vous dans vos locaux", "Meeting at your premises", "موعد في مقركم")] },
  ],
};

// ── Sélecteur de produit (formulaire ouvert sans produit) ───
export const PICKER = {
  label: L("Que souhaitez-vous protéger ?", "What do you want to protect?", "ماذا تريدون أن تحموا؟"),
  b2c: L("Pour moi et ma famille", "For me and my family", "لي ولعائلتي"),
  b2b: L("Pour mon entreprise", "For my business", "لشركتي"),
};

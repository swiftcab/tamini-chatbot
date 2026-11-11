// Compléments des pages produit : documents usuels, FAQ, guides liés.
// ⚠ Listes de documents « généralement demandés » : à confirmer par la
// Souscription ; la page précise que la liste exacte est confirmée par
// le conseiller. Aucune exclusion n'est inventée : la page renvoie aux
// conditions générales remises avec la proposition.
const L = (fr, en, ar) => ({ fr, en, ar });

export const EXTRAS = {
  auto: {
    docs: L(["Carte grise du véhicule", "Permis de conduire du conducteur principal", "Pièce d'identité du souscripteur", "Relevé d'informations de l'assureur précédent (si vous en aviez un)"], ["Vehicle registration certificate", "Main driver's licence", "Policyholder's ID", "Claims-history statement from your previous insurer (if any)"], ["البطاقة الرمادية للمركبة", "رخصة السائق الرئيسي", "هوية المكتتب", "كشف المعلومات من المؤمِّن السابق (إن وُجد)"]),
    faq: L([["L'assurance auto est-elle obligatoire ?", "Oui, la responsabilité civile est obligatoire pour tout véhicule qui circule à Djibouti."], ["L'assistance routière est-elle incluse ?", "Non, l'assistance routière 24h/24, 7j/7 est une option à ajouter à votre contrat."], ["Mon bonus est-il conservé si je change d'assureur ?", "Oui : présentez le relevé d'informations de votre ancien assureur, il est pris en compte pour votre prime."]], [["Is motor insurance compulsory?", "Yes, third-party liability is compulsory for every vehicle in Djibouti."], ["Is roadside assistance included?", "No, 24/7 roadside assistance is an option added to your policy."], ["Do I keep my bonus if I switch?", "Yes: bring the claims-history statement from your previous insurer."]], [["هل تأمين السيارة إلزامي؟", "نعم، المسؤولية المدنية إلزامية لكل مركبة في جيبوتي."], ["هل مساعدة الطريق مشمولة؟", "لا، مساعدة الطريق 24/7 خيار يُضاف إلى العقد."], ["هل أحتفظ بالمكافأة عند تغيير المؤمِّن؟", "نعم: قدّموا كشف المعلومات من مؤمِّنكم السابق."]]),
    guides: ["assurance-auto-djibouti-prix", "accident-voiture-djibouti-indemnisation"],
  },
  habitation: {
    docs: L(["Pièce d'identité", "Adresse et description du logement", "Estimation de la valeur de vos biens"], ["ID", "Address and description of the home", "Estimated value of your belongings"], ["الهوية", "عنوان المسكن ووصفه", "تقدير قيمة ممتلكاتكم"]),
    faq: L([["Je suis locataire, puis-je m'assurer ?", "Oui, l'assurance habitation protège vos biens et votre responsabilité, que vous soyez propriétaire ou locataire."], ["Comment estimer la valeur de mes biens ?", "Listez vos meubles, électroménager et équipements ; votre conseiller vous aide à fixer un montant réaliste."]], [["I'm a tenant, can I get cover?", "Yes, home insurance protects your belongings and liability, whether you own or rent."], ["How do I value my belongings?", "List furniture, appliances and equipment; your advisor helps you set a realistic amount."]], [["أنا مستأجر، هل يمكنني التأمين؟", "نعم، يحمي تأمين المسكن ممتلكاتكم ومسؤوليتكم سواء كنتم مالكين أو مستأجرين."], ["كيف أقدّر قيمة ممتلكاتي؟", "اعدّوا قائمة بالأثاث والأجهزة، ويساعدكم المستشار على تحديد مبلغ واقعي."]]),
    guides: ["takaful-definition-fonctionnement"],
  },
  voyage: {
    docs: L(["Passeport du ou des voyageurs", "Dates et destination du voyage", "Motif du séjour (tourisme, études, Omra…)"], ["Travellers' passports", "Travel dates and destination", "Purpose of stay (tourism, studies, Umrah…)"], ["جوازات سفر المسافرين", "تواريخ السفر والوجهة", "سبب الإقامة (سياحة، دراسة، عمرة…)"]),
    faq: L([["L'attestation convient-elle pour un visa Schengen ?", "Elle est conçue pour les dossiers de visa : couverture médicale d'au moins 30 000 € valable dans l'espace Schengen pendant tout le séjour."], ["Puis-je assurer toute ma famille ?", "Oui, indiquez le nombre de voyageurs dans le formulaire de devis."]], [["Is the certificate valid for a Schengen visa?", "It is designed for visa applications: at least €30,000 medical cover valid across Schengen for the whole stay."], ["Can I insure my whole family?", "Yes, enter the number of travellers in the quote form."]], [["هل الشهادة مناسبة لتأشيرة شنغن؟", "نعم، مصممة لملفات التأشيرة: تغطية طبية لا تقل عن 30,000 يورو في كامل منطقة شنغن طوال الإقامة."], ["هل يمكنني تأمين عائلتي؟", "نعم، حددوا عدد المسافرين في نموذج عرض السعر."]]),
    guides: ["assurance-voyage-visa-schengen-djibouti"],
  },
  education: {
    docs: L(["Pièce d'identité du parent souscripteur", "Liste des enfants scolarisés et établissements", "Montant annuel des frais de scolarité"], ["Subscribing parent's ID", "Children in school and their schools", "Annual school fees"], ["هوية الوالد المكتتب", "قائمة الأطفال المتمدرسين ومدارسهم", "المبلغ السنوي للرسوم الدراسية"]),
    faq: L([["Que garantit le Takaful Éducation ?", "La continuité des frais de scolarité de vos enfants si un événement couvert vous empêche d'y faire face."]], [["What does Education Takaful guarantee?", "Continuity of your children's school fees if a covered event prevents you from paying them."]], [["ماذا يضمن تكافل التعليم؟", "استمرار الرسوم الدراسية لأطفالكم إذا منعكم حدث مغطّى من دفعها."]]),
    guides: ["takaful-definition-fonctionnement"],
  },
  accidents: {
    docs: L(["Pièce d'identité des personnes assurées", "Activité professionnelle"], ["ID of insured persons", "Occupation"], ["هوية الأشخاص المؤمَّنين", "النشاط المهني"]),
    faq: L([["Puis-je assurer un groupe de salariés ?", "Oui, l'assurance accidents existe en contrat groupe pour les entreprises."]], [["Can I cover a group of employees?", "Yes, personal accident cover is available as a group policy for companies."]], [["هل يمكن تأمين مجموعة موظفين؟", "نعم، يتوفر تأمين الحوادث بعقد جماعي للشركات."]]),
    guides: [],
  },
  multirisque: {
    docs: L(["Description des locaux et de l'activité", "Valeurs du bâtiment, des équipements et des stocks", "Historique des sinistres sur 3 ans"], ["Description of premises and activity", "Values of building, equipment and stock", "3-year claims history"], ["وصف المقرات والنشاط", "قيم المبنى والمعدات والمخزون", "سجل المطالبات لثلاث سنوات"]),
    faq: L([["Une visite de risque est-elle nécessaire ?", "Pour les sites importants, une visite permet d'ajuster les garanties ; votre conseiller vous l'indique."]], [["Is a risk survey needed?", "For larger sites, a survey helps adjust cover; your advisor will tell you."]], [["هل زيارة المخاطر ضرورية؟", "للمواقع الكبيرة تساعد الزيارة على تعديل التغطيات، ويخبركم المستشار بذلك."]]),
    guides: [],
  },
  rc: {
    docs: L(["Description de l'activité", "Chiffre d'affaires et effectif", "Exigences contractuelles (appel d'offres, client)"], ["Description of activity", "Turnover and headcount", "Contractual requirements (tender, client)"], ["وصف النشاط", "رقم الأعمال وعدد الموظفين", "المتطلبات التعاقدية"]),
    faq: L([["Un client exige une attestation de RC : que faire ?", "Indiquez-le dans le formulaire de devis ; l'attestation est remise après souscription."]], [["A client requires a liability certificate: what now?", "Mention it in the quote form; the certificate is issued after subscription."]], [["عميل يطلب شهادة مسؤولية: ماذا أفعل؟", "اذكروا ذلك في نموذج عرض السعر، وتُسلَّم الشهادة بعد الاكتتاب."]]),
    guides: ["garantie-bonne-execution-djibouti"],
  },
  maritime: {
    docs: L(["Facture commerciale", "Connaissement ou lettre de transport", "Liste de colisage", "Incoterm du contrat de vente"], ["Commercial invoice", "Bill of lading or waybill", "Packing list", "Incoterm of the sales contract"], ["الفاتورة التجارية", "سند الشحن", "قائمة التعبئة", "شرط التسليم Incoterm"]),
    faq: L([["En FOB, qui doit assurer ?", "L'acheteur : le risque lui est transféré au chargement."], ["Qu'est-ce qu'une police d'abonnement ?", "Un contrat annuel qui couvre automatiquement toutes vos expéditions déclarées."]], [["Under FOB, who insures?", "The buyer: risk passes on loading."], ["What is an open cover?", "An annual policy that automatically covers all declared shipments."]], [["في FOB من يؤمّن؟", "المشتري، إذ ينتقل إليه الخطر عند الشحن."], ["ما وثيقة الاشتراك؟", "عقد سنوي يغطي تلقائياً جميع الشحنات المصرّح بها."]]),
    guides: ["assurance-marchandises-import-export-djibouti"],
  },
  flotte: {
    docs: L(["Liste des véhicules (cartes grises)", "Usage et zone de circulation", "Historique des sinistres sur 3 ans"], ["Vehicle list (registrations)", "Use and operating area", "3-year claims history"], ["قائمة المركبات", "الاستخدام ومنطقة السير", "سجل المطالبات لثلاث سنوات"]),
    faq: L([["Quelle réduction pour une flotte ?", "La réglementation prévoit des réductions de 10 % (3 à 5 véhicules) à 30 % (plus de 60 véhicules) sur la prime de référence."], ["L'assistance routière est-elle incluse ?", "Non, elle est disponible en option."]], [["What discount for a fleet?", "Regulations provide discounts from 10% (3–5 vehicles) to 30% (over 60) on the reference premium."], ["Is roadside assistance included?", "No, it is available as an option."]], [["ما التخفيض للأسطول؟", "تنص اللوائح على تخفيضات من 10% (3 إلى 5 مركبات) إلى 30% (أكثر من 60) على القسط المرجعي."], ["هل مساعدة الطريق مشمولة؟", "لا، متاحة كخيار."]]),
    guides: ["assurance-flotte-automobile-djibouti"],
  },
  chantier: {
    docs: L(["Contrat ou dossier d'appel d'offres", "Montant et durée des travaux", "Planning et localisation du chantier"], ["Contract or tender file", "Contract value and duration", "Schedule and site location"], ["العقد أو ملف المناقصة", "قيمة الأشغال ومدتها", "الجدول الزمني وموقع الورشة"]),
    faq: L([["Qui doit souscrire l'assurance chantier ?", "Le maître d'ouvrage ou l'entreprise générale, selon le contrat."]], [["Who takes out contractors' all risks?", "The project owner or the main contractor, depending on the contract."]], [["من يكتتب تأمين المقاولات؟", "صاحب المشروع أو المقاول الرئيسي حسب العقد."]]),
    guides: ["assurance-chantier-tous-risques-djibouti", "garantie-bonne-execution-djibouti"],
  },
  bond: {
    docs: L(["Dossier d'appel d'offres ou contrat (modèle de garantie)", "États financiers des 2 derniers exercices", "Présentation et références de l'entreprise"], ["Tender file or contract (guarantee wording)", "Last 2 years' financial statements", "Company profile and references"], ["ملف المناقصة أو العقد", "القوائم المالية لآخر سنتين", "تعريف الشركة ومراجعها"]),
    faq: L([["Le donneur d'ordre accepte-t-il une garantie d'assurance ?", "Vérifiez la forme de garantie acceptée dans le dossier d'appel d'offres ; votre conseiller vous aide à le lire."]], [["Will the employer accept an insurance guarantee?", "Check the accepted guarantee form in the tender file; your advisor will help."]], [["هل يقبل صاحب العمل ضماناً تأمينياً؟", "تحققوا من شكل الضمان المقبول في ملف المناقصة، ويساعدكم المستشار."]]),
    guides: ["garantie-bonne-execution-djibouti"],
  },
};

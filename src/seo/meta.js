// ─────────────────────────────────────────────────────────────
// Métadonnées SEO par page, en 3 langues.
// Titres : 50-60 caractères · Descriptions : 150-160 caractères
// Chaque entrée cible un mot-clé prioritaire du plan SEO.
// ─────────────────────────────────────────────────────────────

export const PAGE_META = {
  home: {
    fr: {
      title: "Assurance Djibouti : auto, habitation, voyage, entreprise | Tamini",
      description:
        "Compagnie d'assurance Takaful agréée à Djibouti depuis 2020 : auto, habitation, voyage, entreprise. Excédent redistribué. Devis gratuit en ligne ou sur WhatsApp.",
    },
    en: {
      title: "Insurance in Djibouti: motor, home, travel, business | Tamini",
      description:
        "Djibouti's first licensed Takaful insurer since 2020. Motor, home, travel, business cover. Surplus shared, Sharia-compliant. Free quote on WhatsApp.",
    },
    ar: {
      title: "التأمين التكافلي في جيبوتي | تأميني",
      description:
        "أول شركة تأمين تكافلي مرخصة في جيبوتي منذ 2020. سيارات، مسكن، سفر، شركات. فائض معاد توزيعه، متوافق مع الشريعة. عرض سعر مجاني عبر واتساب.",
    },
  },

  particuliers: {
    fr: {
      title: "Assurance Particuliers Djibouti | Auto, Habitation, Voyage",
      description:
        "Assurances Takaful pour particuliers à Djibouti : automobile, habitation, voyage, éducation, accidents. Conformes à la Charia. Devis gratuit en 2 minutes.",
    },
    en: {
      title: "Personal Insurance Djibouti | Motor, Home, Travel",
      description:
        "Takaful insurance for individuals in Djibouti: motor, home, travel, education, accidents. Sharia-compliant cover. Free quote in 2 minutes.",
    },
    ar: {
      title: "تأمين الأفراد في جيبوتي | سيارات، مسكن، سفر",
      description:
        "تأمينات تكافلية للأفراد في جيبوتي: سيارات، مسكن، سفر، تعليم، حوادث. متوافقة مع الشريعة. عرض سعر مجاني في دقيقتين.",
    },
  },

  entreprises: {
    fr: {
      title: "Assurance Entreprise Djibouti | Multirisque, Maritime, RC",
      description:
        "Assurances Takaful pour entreprises à Djibouti : multirisque pro, maritime cargo, RC générale, flotte, chantier, performance bond. Audit gratuit de vos risques.",
    },
    en: {
      title: "Business Insurance Djibouti | Multi-risk, Marine, Liability",
      description:
        "Takaful business insurance in Djibouti: professional multi-risk, marine cargo, general liability, fleet, construction, performance bond. Free risk audit.",
    },
    ar: {
      title: "تأمين الشركات في جيبوتي | متعدد المخاطر، بحري، مسؤولية",
      description:
        "تأمينات تكافلية للشركات في جيبوتي: متعدد المخاطر، شحن بحري، مسؤولية مدنية، أسطول، مقاولات، ضمان حسن التنفيذ. تدقيق مجاني للمخاطر.",
    },
  },

  faq: {
    fr: {
      title: "FAQ Assurance Takaful Djibouti | Questions Fréquentes",
      description:
        "Toutes vos questions sur l'assurance Takaful à Djibouti : halal ou haram, surplus redistribué, sinistres, prix, garanties. Réponses claires et complètes.",
    },
    en: {
      title: "Takaful Insurance FAQ Djibouti | Frequently Asked Questions",
      description:
        "All your questions on Takaful insurance in Djibouti: halal or haram, surplus sharing, claims, pricing, coverage. Clear and complete answers.",
    },
    ar: {
      title: "الأسئلة الشائعة عن التأمين التكافلي في جيبوتي",
      description:
        "كل أسئلتكم حول التأمين التكافلي في جيبوتي: حلال أم حرام، إعادة توزيع الفائض، المطالبات، الأسعار، التغطيات. إجابات واضحة وكاملة.",
    },
  },

  blog: {
    fr: {
      title: "Blog Assurance & Takaful Djibouti | Guides et Conseils",
      description:
        "Guides pratiques sur l'assurance et le Takaful à Djibouti : choisir son assurance auto, comprendre le surplus, déclarer un sinistre, finance islamique.",
    },
    en: {
      title: "Insurance & Takaful Blog Djibouti | Guides and Advice",
      description:
        "Practical guides on insurance and Takaful in Djibouti: choosing motor cover, understanding surplus sharing, filing claims, Islamic finance.",
    },
    ar: {
      title: "مدونة التأمين والتكافل في جيبوتي | أدلة ونصائح",
      description:
        "أدلة عملية حول التأمين والتكافل في جيبوتي: اختيار تأمين السيارة، فهم الفائض، التصريح بالمطالبات، التمويل الإسلامي.",
    },
  },

  privacy: {
    fr: {
      title: "Politique de Confidentialité | Tamini Insurance SA",
      description:
        "Comment Tamini Insurance SA protège vos données personnelles, conformément à la Loi n°019/AN/23 sur le Code du Numérique de la République de Djibouti.",
    },
    en: {
      title: "Privacy Policy | Tamini Insurance SA",
      description:
        "How Tamini Insurance SA protects your personal data, in accordance with Law No. 019/AN/23 on the Digital Code of the Republic of Djibouti.",
    },
    ar: {
      title: "سياسة الخصوصية | تأميني للتأمين",
      description:
        "كيف تحمي شركة تأميني بياناتكم الشخصية، وفقاً للقانون رقم 019/AN/23 المتعلق بقانون الرقمنة في جمهورية جيبوتي.",
    },
  },
};

// ── Métadonnées par produit (11 produits × 3 langues) ────────
export const PRODUCT_META = {
  auto: {
    fr: {
      title: "Assurance Auto Djibouti | Tous Risques & RC — Tamini",
      description:
        "Assurance automobile Takaful à Djibouti : responsabilité civile obligatoire, tous risques, vol, incendie. Assistance routière en option. Devis en 2 minutes.",
    },
    en: {
      title: "Car Insurance Djibouti | Comprehensive & TPL — Tamini",
      description:
        "Motor Takaful insurance in Djibouti: compulsory third-party liability, comprehensive, theft, fire. Optional roadside assistance. Quote in 2 minutes.",
    },
    ar: {
      title: "تأمين السيارات في جيبوتي | شامل ومسؤولية مدنية",
      description:
        "تأمين سيارات تكافلي في جيبوتي: مسؤولية مدنية إلزامية، تغطية شاملة، سرقة، حريق. مساعدة على الطريق كخيار. عرض سعر في دقيقتين.",
    },
  },
  habitation: {
    fr: {
      title: "Assurance Habitation Djibouti | Incendie, Vol, Dégâts des Eaux",
      description:
        "Assurance habitation Takaful à Djibouti : incendie, dégâts des eaux, vol, RC chef de famille. Formules locataire et propriétaire. Devis gratuit.",
    },
    en: {
      title: "Home Insurance Djibouti | Fire, Theft, Water Damage",
      description:
        "Home Takaful insurance in Djibouti: fire, water damage, theft, family liability. Tenant and owner plans available. Free quote on WhatsApp.",
    },
    ar: {
      title: "تأمين المسكن في جيبوتي | حريق، سرقة، أضرار المياه",
      description:
        "تأمين مسكن تكافلي في جيبوتي: حريق، أضرار مياه، سرقة، مسؤولية رب الأسرة. صيغ للمستأجر والمالك. عرض سعر مجاني.",
    },
  },
  voyage: {
    fr: {
      title: "Assurance Voyage Djibouti | Attestation Visa sous 24h",
      description:
        "Assurance voyage Takaful à Djibouti : frais médicaux à l'étranger, rapatriement, bagages. Attestation conforme visa Schengen délivrée sous 24 heures.",
    },
    en: {
      title: "Travel Insurance Djibouti | Visa Attestation within 24h",
      description:
        "Travel Takaful insurance in Djibouti: medical expenses abroad, repatriation, luggage. Schengen-compliant visa attestation issued within 24 hours.",
    },
    ar: {
      title: "تأمين السفر في جيبوتي | شهادة تأشيرة خلال 24 ساعة",
      description:
        "تأمين سفر تكافلي في جيبوتي: مصاريف طبية بالخارج، إعادة للوطن، أمتعة. شهادة متوافقة مع تأشيرة شنغن تصدر خلال 24 ساعة.",
    },
  },
  education: {
    fr: {
      title: "Takaful Éducation Djibouti | Protéger la Scolarité",
      description:
        "Assurance Takaful Éducation à Djibouti : garantit le paiement des frais de scolarité de votre enfant jusqu'au bac en cas de décès ou d'invalidité.",
    },
    en: {
      title: "Education Takaful Djibouti | Protect Your Child's Schooling",
      description:
        "Education Takaful insurance in Djibouti: guarantees your child's tuition payments through to baccalaureate in case of death or permanent disability.",
    },
    ar: {
      title: "تكافل التعليم في جيبوتي | حماية دراسة أطفالكم",
      description:
        "تأمين تكافل التعليم في جيبوتي: يضمن دفع رسوم دراسة طفلكم حتى البكالوريا في حال الوفاة أو العجز الدائم.",
    },
  },
  accidents: {
    fr: {
      title: "Assurance Accidents Personnels & Groupe Djibouti",
      description:
        "Assurance accidents personnels et groupe à Djibouti : protection des stagiaires, groupes et sorties pédagogiques. Frais médicaux et défense juridique.",
    },
    en: {
      title: "Personal & Group Accident Insurance Djibouti",
      description:
        "Personal and group accident insurance in Djibouti: protection for trainees, groups and educational outings. Medical costs and legal defense covered.",
    },
    ar: {
      title: "تأمين الحوادث الشخصية والجماعية في جيبوتي",
      description:
        "تأمين حوادث شخصية وجماعية في جيبوتي: حماية المتدربين والمجموعات والرحلات التعليمية. تغطية التكاليف الطبية والدفاع القانوني.",
    },
  },
  multirisque: {
    fr: {
      title: "Assurance Multirisque Professionnelle Djibouti | RC Pro",
      description:
        "Assurance multirisque professionnelle à Djibouti : RC pro, locaux, stocks, équipements, perte d'exploitation. Pour PME et grandes entreprises. Audit gratuit.",
    },
    en: {
      title: "Business Multi-risk Insurance Djibouti | Pro Liability",
      description:
        "Professional multi-risk insurance in Djibouti: professional liability, premises, stock, equipment, business interruption. For SMEs and large firms.",
    },
    ar: {
      title: "التأمين متعدد المخاطر المهني في جيبوتي",
      description:
        "تأمين متعدد المخاطر مهني في جيبوتي: مسؤولية مهنية، مقرات، مخزون، معدات، توقف النشاط. للمؤسسات الصغيرة والكبيرة. تدقيق مجاني.",
    },
  },
  rc: {
    fr: {
      title: "Responsabilité Civile Générale Djibouti | Commerces",
      description:
        "Assurance RC générale à Djibouti pour commerçants et artisans : dommages causés aux clients, frais médicaux, invalidité, décès. Devis rapide.",
    },
    en: {
      title: "General Liability Insurance Djibouti | Shops & Trades",
      description:
        "General liability insurance in Djibouti for shopkeepers and craftsmen: damage to customers, medical costs, disability, death. Fast quote available.",
    },
    ar: {
      title: "المسؤولية المدنية العامة في جيبوتي | المتاجر",
      description:
        "تأمين مسؤولية مدنية عامة في جيبوتي للتجار والحرفيين: أضرار للعملاء، تكاليف طبية، عجز، وفاة. عرض سعر سريع.",
    },
  },
  maritime: {
    fr: {
      title: "Assurance Maritime & Cargo Djibouti | Import Export",
      description:
        "Assurance maritime Takaful à Djibouti : marchandises en transit mer, terre et air. Vol au port, avarie, perte totale. Pour transitaires et importateurs.",
    },
    en: {
      title: "Marine & Cargo Insurance Djibouti | Import Export",
      description:
        "Marine Takaful insurance in Djibouti: goods in transit by sea, land and air. Port theft, damage, total loss. For freight forwarders and importers.",
    },
    ar: {
      title: "التأمين البحري والشحن في جيبوتي | استيراد وتصدير",
      description:
        "تأمين بحري تكافلي في جيبوتي: بضائع في العبور بحراً وبراً وجواً. سرقة في الميناء، تلف، خسارة كلية. لوكلاء الشحن والمستوردين.",
    },
  },
  flotte: {
    fr: {
      title: "Assurance Flotte Automobile Djibouti | Véhicules Entreprise",
      description:
        "Assurance flotte automobile à Djibouti : tous vos véhicules professionnels sous un contrat unique. RC et tous risques. Gestion centralisée simplifiée.",
    },
    en: {
      title: "Motor Fleet Insurance Djibouti | Company Vehicles",
      description:
        "Motor fleet insurance in Djibouti: all your professional vehicles under a single contract. TPL and comprehensive. Simplified centralized management.",
    },
    ar: {
      title: "تأمين أسطول المركبات في جيبوتي | مركبات الشركات",
      description:
        "تأمين أسطول مركبات في جيبوتي: جميع مركباتكم المهنية تحت عقد واحد. مسؤولية مدنية وشامل. إدارة مركزية مبسطة.",
    },
  },
  chantier: {
    fr: {
      title: "Assurance Chantier Djibouti | CAR/CPM BTP",
      description:
        "Assurance chantier Takaful à Djibouti (CAR/CPM) : travaux en cours, engins, matériels, catastrophes naturelles, RC chantier en option. Étude technique gratuite.",
    },
    en: {
      title: "Construction Insurance Djibouti | CAR/CPM Cover",
      description:
        "Construction Takaful insurance in Djibouti (CAR/CPM): work in progress, machinery, equipment, natural disasters, optional site liability. Free technical study.",
    },
    ar: {
      title: "تأمين المقاولات في جيبوتي | جميع أخطار المقاول",
      description:
        "تأمين مقاولات تكافلي في جيبوتي: أعمال جارية، آليات، معدات، كوارث طبيعية، مسؤولية ورشة كخيار. دراسة فنية مجانية.",
    },
  },
  bond: {
    fr: {
      title: "Garantie de Bonne Exécution Djibouti | Performance Bond",
      description:
        "Garantie de bonne exécution Takaful à Djibouti : sécurisez vos marchés publics et privés. Renforcez votre crédibilité auprès des donneurs d'ordre.",
    },
    en: {
      title: "Performance Bond Djibouti | Contract Guarantee",
      description:
        "Takaful performance bond in Djibouti: secure your public and private contracts. Strengthen your credibility with contracting authorities and funders.",
    },
    ar: {
      title: "ضمان حسن التنفيذ في جيبوتي | ضمان العقود",
      description:
        "ضمان حسن تنفيذ تكافلي في جيبوتي: أمّنوا عقودكم العامة والخاصة. عززوا مصداقيتكم لدى أصحاب المشاريع والممولين.",
    },
  },
};

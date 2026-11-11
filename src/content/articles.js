// ─────────────────────────────────────────────────────────────
// GUIDES & ARTICLES — contenu SEO (novembre 2026)
// Chaque article cible une requête réellement tapée sur Google
// (suggestions Google relevées le 10/11/2026, zone Djibouti).
// Règles appliquées : aucun taux, franchise ou nom de client
// Tamini ; seuls des textes réglementaires publics sont chiffrés ;
// aucune promesse de délai ; assistance routière = option.
// `review: "charia"` → article verrouillé (noindex, hors sitemap)
// tant que le Comité Charia n'a pas validé (src/config/compliance.js).
// ─────────────────────────────────────────────────────────────

const ARRETE_URL = "https://direction-economie.gouv.dj/2022/04/Arrete-N%C2%B02019-213-PR-MEFI-du-24-Decembre-2019-Tarification-automobile-et-reglement-des-sinistres-materiels-automobiles-1.pdf";

export const ARTICLES = [
  {
    slug: "assurance-auto-djibouti-prix",
    lang: "fr",
    category: "Automobile",
    date: "2026-11-10",
    readMin: 7,
    title: "Assurance auto à Djibouti : prix, bonus-malus et règles officielles",
    seoTitle: "Assurance auto Djibouti : prix, bonus-malus, règles 2026 | Tamini",
    description: "Combien coûte une assurance voiture à Djibouti ? Ce qui fait varier le prix, le bonus-malus officiel (arrêté 2019-213), les formules RC et tous risques, les documents à fournir.",
    excerpt: "Ce qui fait réellement varier le prix de votre assurance voiture à Djibouti, et comment le bonus-malus officiel peut le faire baisser chaque année.",
    keywords: ["assurance auto djibouti", "assurance voiture djibouti prix", "assurance voiture djibouti", "bonus malus djibouti"],
    product: "auto",
    body: `
À Djibouti, tout véhicule à moteur qui circule doit être assuré au minimum en **responsabilité civile** : c'est la garantie qui indemnise les dommages que vous causez aux autres. Au-delà de ce minimum obligatoire, le prix de votre assurance dépend de quelques critères simples, et d'un mécanisme officiel souvent méconnu : le **bonus-malus**.

## Ce qui fait varier le prix d'une assurance voiture à Djibouti

Le point de départ est la **prime de référence**. Selon l'arrêté n° 2019-213/PR/MEFI du 24 décembre 2019, la prime de référence de la responsabilité civile automobile est établie par le service de contrôle des assurances en fonction des **caractéristiques techniques du véhicule** et de son **usage socioprofessionnel**.

Concrètement, cinq éléments pèsent sur votre prix :

1. **L'usage du véhicule** : personnel, professionnel, taxi ou transport de personnes, location.
2. **Le type et la puissance du véhicule** : une citadine, un 4x4, un pick-up ou un camion n'ont pas le même tarif.
3. **La formule choisie** : responsabilité civile seule, ou garanties complémentaires (dommages, vol, incendie, bris de glace).
4. **Votre historique de sinistres**, via le coefficient bonus-malus.
5. **La durée du contrat** : une assurance de quelques semaines suit un barème spécifique.

## Responsabilité civile ou tous risques : que choisir ?

| Formule | Ce qu'elle couvre | Pour qui |
| --- | --- | --- |
| Responsabilité civile | Les dommages causés aux autres (personnes et biens) | Obligatoire pour tous ; adaptée aux véhicules anciens |
| Formules intermédiaires | RC + vol, incendie, bris de glace | Véhicules de valeur moyenne |
| Tous risques | RC + dommages à votre propre véhicule, même si vous êtes responsable | Véhicules récents ou financés |

L'**assistance routière 24h/24, 7j/7** (dépannage, remorquage) n'est pas une garantie automatique : chez Tamini, c'est une **option** que vous pouvez ajouter à votre contrat.

## Le bonus-malus officiel : comment votre prix peut baisser

L'arrêté 2019-213 a institué un système de bonus-malus pour les contrats couvrant de 1 à 3 véhicules (hors transport en commun). La prime est égale à la prime de référence multipliée par un **coefficient**, qui démarre à **1**.

- **Chaque année sans sinistre**, le coefficient baisse de **10 %**. Il ne peut pas descendre sous **0,60**, soit une réduction maximale de 40 %.
- **Chaque sinistre responsable** augmente le coefficient de **25 %**. Les majorations se multiplient entre elles, sans pouvoir dépasser **3,50**.
- Si votre responsabilité n'est que **partielle**, la majoration est réduite de moitié.
- Après **deux années consécutives sans sinistre**, un coefficient majoré redevient égal à 1.
- Après au moins trois ans au coefficient de 0,60, le **premier sinistre n'entraîne aucune majoration**.

> Bon à savoir : un vol, un incendie, un bris de glace, ou un dommage subi en stationnement du fait d'un tiers non identifié n'entraînent pas de malus.

### Exemple chiffré (illustration du mécanisme officiel)

Un conducteur sans sinistre pendant 3 ans passe d'un coefficient de 1 à 0,90, puis 0,81, puis 0,72. S'il déclare ensuite un sinistre responsable, son coefficient est multiplié par 1,25 : 0,72 × 1,25 = 0,90.

## Changer d'assureur sans perdre son bonus

Votre bonus vous appartient. L'assureur doit vous remettre un **relevé d'informations** à la résiliation ou à votre demande, à tout moment, même en cas d'impayé. Ce relevé indique notamment le coefficient appliqué et les sinistres des cinq dernières années. Présentez-le à votre nouvel assureur : il en tient compte pour calculer votre première prime.

Si vous remplacez votre véhicule ou en ajoutez un, le coefficient acquis est **transféré automatiquement**.

## Assurance de courte durée : le barème officiel

Pour une responsabilité civile souscrite moins d'un an, la prime est un pourcentage de la prime annuelle :

| Durée | % de la prime annuelle |
| --- | --- |
| Jusqu'à 15 jours | 5 % |
| 16 jours à 1 mois | 9 % |
| 1 à 2 mois | 19 % |
| 2 à 3 mois | 28 % |
| 5 à 6 mois | 53 % |
| 11 à 12 mois | 100 % |

## Les documents généralement demandés

- La carte grise du véhicule.
- Le permis de conduire du conducteur principal.
- Une pièce d'identité du souscripteur.
- Le relevé d'informations de votre précédent assureur, si vous en aviez un.

La liste exacte vous est confirmée par votre conseiller selon votre situation.

## Obtenir votre prix

Le plus rapide est de répondre aux questions de notre formulaire : usage, type et année du véhicule, valeur, formule souhaitée, situation actuelle. Un conseiller vous envoie ensuite une proposition personnalisée.

*Source réglementaire : [arrêté n° 2019-213/PR/MEFI relatif à la tarification automobile](${ARRETE_URL}). Cet article est informatif ; seules les conditions de votre contrat font foi.*
`,
    faq: [
      ["L'assurance auto est-elle obligatoire à Djibouti ?", "Oui. Tout véhicule qui circule doit être couvert au minimum en responsabilité civile, la garantie qui indemnise les dommages causés aux autres."],
      ["Combien coûte une assurance voiture à Djibouti ?", "Le prix dépend de l'usage, du type de véhicule, de la formule choisie et de votre coefficient bonus-malus. Pour un prix exact, répondez au formulaire de devis : un conseiller vous envoie une proposition personnalisée."],
      ["Comment fonctionne le bonus-malus à Djibouti ?", "Chaque année sans sinistre réduit votre coefficient de 10 % (minimum 0,60). Chaque sinistre responsable l'augmente de 25 % (maximum 3,50), selon l'arrêté 2019-213."],
      ["L'assistance routière est-elle incluse ?", "Non. Chez Tamini, l'assistance routière 24h/24, 7j/7 est une option à ajouter à votre assurance automobile."],
    ],
  },

  {
    slug: "accident-voiture-djibouti-indemnisation",
    lang: "fr",
    category: "Sinistres",
    date: "2026-11-10",
    readMin: 6,
    title: "Accident de voiture à Djibouti : déclaration, expertise et indemnisation",
    seoTitle: "Accident de voiture à Djibouti : que faire, expertise, indemnisation | Tamini",
    description: "Que faire après un accident de voiture à Djibouti ? Déclaration, rôle de l'expert, contre-expertise, véhicule irréparable, vétusté : vos droits selon l'arrêté 2019-213.",
    excerpt: "Les bons réflexes après un accident, le rôle de l'expert et les règles officielles qui protègent l'assuré lors de l'indemnisation.",
    keywords: ["sinistre auto djibouti", "accident voiture djibouti", "expertise automobile djibouti", "indemnisation assurance djibouti"],
    product: "auto",
    body: `
Un accident de la route est toujours un moment stressant. Bien réagir dans les premières heures facilite ensuite l'indemnisation. Voici les étapes, et les règles officielles qui encadrent le règlement des dommages matériels automobiles à Djibouti.

## Sur place : les bons réflexes

1. **Sécurisez les lieux** et mettez les personnes à l'abri. En cas de blessé, appelez les secours en priorité.
2. **Relevez les informations** : immatriculations, noms et coordonnées des conducteurs, compagnies d'assurance, témoins.
3. **Prenez des photos** : positions des véhicules, dégâts, plaques, panneaux, marquages au sol.
4. **Ne reconnaissez pas une responsabilité** que vous ne mesurez pas encore ; décrivez les faits.

## Déclarer le sinistre

Prévenez votre assureur dès que possible. Chez Tamini, vous pouvez déclarer par **WhatsApp**, par **téléphone** ou en **agence**. Un conseiller vous indique ensuite la liste exacte des pièces à fournir : en général la déclaration, la carte grise, le permis, les photos et, le cas échéant, le procès-verbal ou le constat.

## L'expertise : comment ça se passe

Selon l'arrêté n° 2019-213, dès qu'un sinistre est susceptible d'être garanti, l'assureur missionne un **expert agréé** : seuls les experts inscrits sur la liste du service de contrôle des assurances peuvent intervenir.

L'expert doit notamment :

- identifier le véhicule et relever les dommages ;
- définir une méthode de réparation et **chiffrer le coût** de la remise en état ;
- indiquer la **durée d'immobilisation** du véhicule, qui sert de base au calcul des frais d'immobilisation.

L'expert doit être **neutre** et ne favoriser ni l'assureur ni le propriétaire.

### Vous n'êtes pas d'accord avec l'expertise ?

Vous pouvez faire réaliser une **contre-expertise** à vos frais. En cas de désaccord persistant, les deux experts désignent un **tiers expert** dont l'avis s'impose ; ses frais sont partagés par moitié. À défaut d'accord sur ce tiers expert, il est désigné par le président du tribunal compétent.

## Réparable ou non : comment est calculée l'indemnité

- **Véhicule réparable** (réparations inférieures à sa valeur) : l'indemnité est égale au coût des réparations fixé par l'expert. **Aucun abattement pour vétusté** ne peut être appliqué sur les pièces remplacées.
- **Véhicule irréparable** (techniquement, ou parce que les réparations dépassent sa valeur) : l'indemnité est égale à la valeur avant sinistre moins la valeur de l'épave. Si l'assureur accepte de reprendre l'épave, il règle la valeur avant sinistre sans déduction.

Pour les garanties dommages (collision, tous accidents, incendie…), les limites et franchises prévues au contrat peuvent s'appliquer.

## Le barème officiel de vétusté (valeur du véhicule)

Pour estimer la valeur d'un véhicule, l'expert applique un barème réglementaire d'usure :

| Âge du véhicule | Usure cumulée |
| --- | --- |
| 0 à 1 an | 20 % |
| 1 à 2 ans | 35 % |
| 2 à 3 ans | 45 % |
| 3 à 4 ans | 53 % |
| 4 à 5 ans | 60 % |
| 5 à 6 ans | 67 % |
| 6 à 7 ans | 73 % |
| 7 à 8 ans | 78 % |
| Au-delà de 8 ans | + 0,25 % par mois |

## Et votre bonus-malus ?

Un sinistre responsable majore votre coefficient de 25 %, de 12,5 % si votre responsabilité n'est que partielle. Les sinistres vol, incendie, bris de glace, ou en stationnement du fait d'un tiers non identifié n'entraînent pas de malus.

*Source : [arrêté n° 2019-213/PR/MEFI](${ARRETE_URL}). Article informatif ; seules les conditions de votre contrat font foi.*
`,
    faq: [
      ["Qui choisit l'expert après un accident ?", "L'assureur missionne un expert inscrit sur la liste des experts autorisés par le service de contrôle des assurances."],
      ["Puis-je contester l'expertise ?", "Oui, par une contre-expertise à vos frais. En cas de désaccord, un tiers expert tranche ; ses frais sont partagés par moitié."],
      ["L'assureur peut-il déduire la vétusté des pièces ?", "Non : l'arrêté 2019-213 interdit tout abattement pour vétusté sur les pièces remplacées lorsque le véhicule est réparable."],
    ],
  },

  {
    slug: "assurance-flotte-automobile-djibouti",
    lang: "fr",
    category: "Entreprises",
    date: "2026-11-10",
    readMin: 5,
    title: "Flotte automobile à Djibouti : réductions officielles et bonus collectif",
    seoTitle: "Assurance flotte automobile Djibouti : réductions jusqu'à 30 % | Tamini",
    description: "Assurer plusieurs véhicules d'entreprise à Djibouti : réductions flotte officielles de 10 % à 30 %, bonus de non-sinistralité, véhicules exclus. Le guide pour les gestionnaires de parc.",
    excerpt: "De 3 à plus de 60 véhicules : les réductions prévues par la réglementation djiboutienne et le bonus collectif réservé aux flottes.",
    keywords: ["assurance flotte automobile djibouti", "assurance flotte entreprise", "assurance véhicules entreprise djibouti"],
    product: "flotte",
    body: `
Une entreprise qui assure plusieurs véhicules à son nom bénéficie, à Djibouti, de règles tarifaires spécifiques fixées par l'arrêté n° 2019-213/PR/MEFI. Bien les connaître permet de piloter le coût de son parc.

## Les réductions flotte prévues par la réglementation

Les primes de chaque véhicule partent du tarif de référence de sa catégorie, puis une réduction s'applique selon le nombre de véhicules :

| Nombre de véhicules | Réduction de prime |
| --- | --- |
| 3 à 5 | 10 % |
| 6 à 15 | 15 % |
| 16 à 30 | 20 % |
| 31 à 60 | 25 % |
| Plus de 60 | 30 % |

La réduction se calcule **séparément pour chaque risque** (responsabilité civile, dommages, incendie, vol, bris de glace), selon le nombre de fois où il est souscrit.

## Les véhicules concernés… et ceux qui ne le sont pas

Peuvent bénéficier de la réduction : les véhicules de promenade ou d'affaires, de transport de marchandises de l'assuré, de transport public de marchandises, de chantier, et les véhicules de location.

En sont exclus : le transport public de voyageurs, les véhicules confiés aux garagistes, et ceux d'auto-école. Les véhicules doivent être **immatriculés au nom d'une même personne** physique ou morale : une « fausse flotte » (véhicules personnels des salariés) n'y donne pas droit automatiquement.

Les remorques ne comptent pas dans le nombre de véhicules, mais profitent de la réduction obtenue par les tracteurs.

## Le bonus de non-sinistralité des flottes (plus de 3 véhicules)

Au-delà de trois véhicules, la flotte a son propre bonus :

> BNS = 20 % × P × (V − S) / V, où P est la prime de référence, V le nombre de véhicules et S le nombre de sinistres responsables.

Exemple : une flotte de 20 véhicules avec 4 sinistres responsables obtient un bonus de 20 % × (20 − 4) / 20 = **16 %** de la prime de référence. Sans aucun sinistre, le bonus atteint 20 %.

Si le nombre de sinistres dépasse le nombre de véhicules, ce bonus ne s'applique plus : les véhicules sans sinistre restent au tarif de référence, et chaque véhicule sinistré subit le malus individuel (+25 % par sinistre).

## Suspendre l'assurance d'un véhicule immobilisé

Un véhicule retiré de la circulation au moins 4 semaines consécutives (hors sinistre) donne droit à une ristourne égale aux **3/4 du prorata de prime** de la période, ou à un report d'échéance équivalent. La suspension ne peut excéder 12 mois.

## Ce que Tamini ajoute à la réglementation

- **Un seul contrat** pour tout le parc, avec un interlocuteur dédié.
- Des formules au choix par véhicule : responsabilité civile ou tous risques.
- L'**assistance routière 24h/24, 7j/7 en option**.
- Une couverture adaptée au **corridor Djibouti – Éthiopie** à étudier selon vos trajets.

Pour un devis flotte, indiquez le nombre et le type de véhicules, leur usage, leur zone de circulation et votre historique de sinistres.

*Source : [arrêté n° 2019-213/PR/MEFI](${ARRETE_URL}). Article informatif ; seules les conditions de votre contrat font foi.*
`,
    faq: [
      ["À partir de combien de véhicules parle-t-on de flotte ?", "La réduction flotte s'applique dès 3 véhicules immatriculés au nom d'une même personne ; le bonus de non-sinistralité spécifique concerne les contrats de plus de 3 véhicules."],
      ["Quelle réduction pour une flotte de 20 véhicules ?", "Selon le barème officiel, 20 % sur la prime de référence pour une flotte de 16 à 30 véhicules, risque par risque."],
    ],
  },

  {
    slug: "takaful-definition-fonctionnement",
    lang: "fr",
    category: "Takaful",
    date: "2026-11-10",
    readMin: 7,
    title: "Takaful : c'est quoi ? Définition, fonctionnement et différences avec l'assurance classique",
    seoTitle: "Takaful : définition, fonctionnement, différence avec l'assurance classique",
    description: "Le Takaful expliqué simplement : fonds des participants, modèles Wakala et Mudaraba, excédent partagé, différences avec l'assurance conventionnelle. Le guide de Tamini, à Djibouti.",
    excerpt: "Fonds solidaire, gestion pour compte, excédent partagé : comment fonctionne réellement l'assurance Takaful, sans jargon.",
    keywords: ["c'est quoi le takaful", "assurance takaful définition", "takaful djibouti", "différence assurance islamique et conventionnelle", "assurance islamique djibouti"],
    product: null,
    body: `
**Takaful** vient de l'arabe *kafala*, « garantir », et signifie « garantie mutuelle ». C'est une forme d'assurance dans laquelle les participants s'entraident : chacun verse une contribution dans un fonds commun, et ce fonds indemnise ceux qui subissent un sinistre.

## Le principe en une phrase

Dans l'assurance classique, vous achetez une protection à une compagnie qui prend le risque à son compte. Dans le Takaful, vous **rejoignez un fonds de solidarité** que l'opérateur gère pour le compte des participants.

## Comment fonctionne un contrat Takaful, étape par étape

1. **Vous versez une contribution.** Elle est affectée au **fonds des participants**, tenu séparément des fonds de l'opérateur.
2. **L'opérateur gère le fonds.** Il est rémunéré pour cette gestion de façon transparente, selon un modèle défini à l'avance.
3. **Le fonds indemnise les sinistres** des participants, selon les garanties de chaque contrat.
4. **En fin d'exercice, s'il reste un excédent**, une partie peut être redistribuée aux participants éligibles.

## Wakala, Mudaraba : les deux modèles de gestion

- **Wakala (mandat)** : l'opérateur agit comme mandataire et perçoit des frais de gestion connus à l'avance.
- **Mudaraba (partage de résultat)** : l'opérateur gère les placements du fonds et partage le rendement selon une clé convenue.

Tamini applique un **modèle hybride Wakala / Mudaraba**, combinant frais de gestion et partage du rendement des placements.

## Les trois principes que le Takaful respecte

- **Pas de Riba (intérêt)** : les fonds sont placés dans des instruments conformes à la Charia.
- **Pas de Gharar excessif (incertitude)** : les règles du fonds, des frais et du partage sont fixées à l'avance.
- **Pas de Maysir (jeu, spéculation)** : la contribution est un acte de solidarité, pas un pari sur la survenance d'un sinistre.

Un **comité Charia** veille au respect de ces principes.

## Takaful ou assurance classique : le comparatif

| Critère | Assurance classique | Takaful |
| --- | --- | --- |
| Relation | Achat d'une protection à la compagnie | Participation à un fonds solidaire |
| À qui appartient le fonds | À la compagnie | Aux participants, géré par l'opérateur |
| Résultat technique positif | Profit de la compagnie | Excédent pouvant être partagé avec les participants |
| Placements | Tous instruments, y compris à intérêt | Instruments conformes à la Charia |
| Contrôle éthique | Non | Comité Charia |
| Régulation | Autorité des assurances | Autorité des assurances + comité Charia |

## Le Takaful est-il réservé aux musulmans ?

Non. Le Takaful est ouvert à toute personne et à toute entreprise. Beaucoup le choisissent pour sa logique de **solidarité**, sa **transparence** et le **partage de l'excédent**.

## Quels produits existent en Takaful ?

Les mêmes besoins qu'en assurance classique : automobile, habitation, voyage, accidents, éducation, et pour les entreprises multirisque, responsabilité civile, marchandises, flotte, chantier ou garanties de marchés. À Djibouti, Tamini propose ces 11 solutions.

## Tamini, pionnier du Takaful à Djibouti

Tamini Insurance SA est la **première compagnie d'assurance Takaful agréée** en République de Djibouti, régulée par l'ARSD, et membre du groupe Salaam présent à Djibouti, au Somaliland, au Kenya et en Ouganda.
`,
    faq: [
      ["Que veut dire Takaful ?", "Takaful signifie « garantie mutuelle ». C'est une assurance fondée sur la solidarité entre participants, qui contribuent à un fonds commun."],
      ["Quelle différence entre Takaful et assurance classique ?", "En Takaful, le fonds appartient aux participants et l'opérateur le gère pour leur compte ; l'excédent éventuel peut être partagé avec les participants éligibles. Les placements sont conformes à la Charia."],
      ["Le Takaful est-il plus cher ?", "Non par principe : les tarifs dépendent du risque assuré, comme en assurance classique. La différence porte sur la structure du contrat et le partage de l'excédent."],
      ["Faut-il être musulman pour souscrire ?", "Non. Le Takaful est ouvert à tous, particuliers comme entreprises."],
    ],
  },

  {
    slug: "assurance-halal-ou-haram",
    lang: "fr",
    review: "charia",
    category: "Takaful",
    date: "2026-11-10",
    readMin: 6,
    title: "L'assurance est-elle halal ou haram ? Ce que disent les grandes instances",
    seoTitle: "L'assurance est-elle halal ou haram ? Avis des instances et solution Takaful",
    description: "Assurance halal ou haram : position de l'Académie internationale du Fiqh (1985) et de la norme AAOIFI n° 26, raisons invoquées (Riba, Gharar, Maysir) et alternative Takaful.",
    excerpt: "Pourquoi l'assurance conventionnelle pose question, ce qu'ont décidé les instances internationales, et pourquoi le Takaful est présenté comme l'alternative.",
    keywords: ["assurance halal ou haram", "l'assurance est-elle haram", "assurance auto halal", "assurance islamique"],
    product: null,
    body: `
La question revient souvent : « l'assurance est-elle haram ? ». Cet article ne remplace pas l'avis d'un savant : il résume les positions des grandes instances de référence et explique la solution qu'elles proposent.

## Pourquoi l'assurance conventionnelle pose question

Les juristes musulmans qui ont étudié l'assurance commerciale relèvent trois difficultés :

- **Le Gharar** : une incertitude importante sur la contrepartie, puisque l'assuré paie sans savoir s'il recevra une indemnité.
- **Le Maysir** : un caractère aléatoire assimilé par certains au jeu.
- **Le Riba** : les primes sont placées dans des instruments rémunérés par intérêt.

## Ce qu'ont décidé les instances internationales

- L'**Académie internationale du Fiqh islamique** (Organisation de la coopération islamique), réunie à Djeddah en décembre 1985, a jugé l'assurance commerciale à prime fixe non conforme, et a déclaré **licite l'assurance coopérative**, fondée sur la contribution volontaire et l'entraide (résolution n° 9).
- L'**AAOIFI**, organisme de normalisation de la finance islamique, encadre l'assurance islamique par sa **norme Charia n° 26** : contributions à titre de don (*tabarru'*), fonds des participants séparé, opérateur rémunéré en qualité de gestionnaire.

## Le Takaful : l'alternative reconnue

Le Takaful reprend précisément ce modèle coopératif :

1. les participants versent une **contribution solidaire** à un fonds commun ;
2. l'opérateur **gère le fonds pour leur compte**, contre une rémunération définie à l'avance ;
3. les placements sont **conformes à la Charia** ;
4. l'**excédent** éventuel peut être redistribué aux participants.

Un comité Charia contrôle le respect de ces règles.

## Et l'assurance obligatoire ?

Dans de nombreux pays, comme à Djibouti pour la responsabilité civile automobile, l'assurance est **imposée par la loi**. Les instances rappellent alors l'intérêt de privilégier, lorsqu'elle existe, une offre Takaful.

## En résumé

| Question | Réponse des instances |
| --- | --- |
| Assurance commerciale classique | Jugée non conforme par l'Académie du Fiqh (1985) |
| Assurance coopérative / Takaful | Déclarée licite |
| Référence technique | Norme Charia AAOIFI n° 26 |

Pour toute question personnelle, rapprochez-vous d'un savant de confiance. Pour comprendre le fonctionnement concret d'un contrat Takaful, consultez notre guide « Takaful : c'est quoi ? ».
`,
    faq: [
      ["L'assurance auto est-elle haram ?", "L'Académie du Fiqh a jugé l'assurance commerciale non conforme et l'assurance coopérative licite. Une assurance auto Takaful répond à ce modèle coopératif. Pour un avis personnel, consultez un savant."],
      ["Qu'est-ce que la norme AAOIFI n° 26 ?", "C'est la norme Charia de l'AAOIFI qui encadre l'assurance islamique : contributions solidaires, fonds des participants séparé et opérateur gestionnaire."],
    ],
  },

  {
    slug: "assurance-voyage-visa-schengen-djibouti",
    lang: "fr",
    category: "Voyage",
    date: "2026-11-10",
    readMin: 5,
    title: "Assurance voyage pour un visa Schengen depuis Djibouti : le guide",
    seoTitle: "Assurance voyage visa Schengen depuis Djibouti : exigences et attestation | Tamini",
    description: "Visa Schengen depuis Djibouti : couverture minimale de 30 000 €, durée, zone, rapatriement. Ce que doit contenir votre attestation d'assurance voyage et comment l'obtenir rapidement.",
    excerpt: "Les exigences d'assurance pour un visa Schengen, les pièges à éviter et ce que doit contenir votre attestation.",
    keywords: ["assurance voyage djibouti", "assurance visa schengen djibouti", "djibouti travel insurance", "assurance schengen"],
    product: "voyage",
    body: `
Pour obtenir un visa Schengen de court séjour (France, Belgique, Italie, Allemagne…), une **assurance médicale de voyage** fait partie des pièces obligatoires du dossier. Depuis Djibouti, les demandes de visa pour la France sont instruites par la section consulaire de l'Ambassade de France.

## Les exigences pour un visa Schengen

Le code communautaire des visas prévoit que l'assurance doit :

- couvrir les **frais médicaux d'urgence**, l'**hospitalisation** et le **rapatriement** pour raison médicale ;
- offrir une couverture minimale de **30 000 €** ;
- être valable dans **tout l'espace Schengen** ;
- couvrir **toute la durée du séjour**.

## Ce que doit contenir votre attestation

- Nom du voyageur et numéro de passeport.
- Dates de début et de fin de couverture.
- Zone couverte : espace Schengen.
- Montant de la couverture médicale (au moins 30 000 €).
- Garanties de rapatriement.
- Coordonnées de l'assureur et de l'assistance.

## Les erreurs qui retardent un dossier

1. **Des dates trop courtes** : prévoyez la totalité du séjour, aller et retour compris.
2. **Une zone trop restreinte** : une couverture limitée à un seul pays peut ne pas suffire.
3. **Un plafond insuffisant** : vérifiez qu'il atteint au moins 30 000 €.
4. **Une attestation peu lisible** : préférez un document clair, en français ou en anglais.

## Et pour l'Omra, le Hajj ou les études ?

Les exigences varient selon le pays de destination et le motif du séjour. Pour un séjour d'études ou de longue durée, la couverture doit souvent couvrir l'année entière. Indiquez votre destination et votre motif : nous adaptons la proposition.

## L'assurance voyage Tamini

- Assistance médicale à l'étranger et rapatriement.
- Attestation adaptée aux dossiers de visa.
- Formules pour une personne, un couple ou une famille.

Dans le formulaire de devis, précisez votre destination, la durée, le nombre de voyageurs et si l'attestation est destinée à un visa.

*Pour les exigences officielles à jour, consultez le site du consulat concerné, par exemple [france-visas.gouv.fr](https://france-visas.gouv.fr/djibouti).*
`,
    faq: [
      ["Quel montant minimum pour l'assurance visa Schengen ?", "30 000 € de couverture pour les frais médicaux, l'hospitalisation et le rapatriement, valable dans tout l'espace Schengen pendant tout le séjour."],
      ["Puis-je obtenir l'attestation rapidement ?", "Répondez au formulaire de devis en précisant que l'attestation est pour un visa : un conseiller vous indique les étapes et les pièces à fournir."],
    ],
  },

  {
    slug: "assurance-marchandises-import-export-djibouti",
    lang: "fr",
    category: "Entreprises",
    date: "2026-11-10",
    readMin: 6,
    title: "Assurance marchandises à Djibouti : qui doit assurer selon l'Incoterm ?",
    seoTitle: "Assurance marchandises et transport à Djibouti : Incoterms, facultés | Tamini",
    description: "Import, export ou transit vers l'Éthiopie : qui doit assurer la marchandise selon l'Incoterm (CIF, FOB, CFR, EXW) ? Police au voyage ou d'abonnement, documents, bons réflexes en cas d'avarie.",
    excerpt: "CIF, FOB, CFR : la règle simple pour savoir qui doit assurer vos marchandises, et comment choisir entre police au voyage et police d'abonnement.",
    keywords: ["assurance marchandises djibouti", "assurance transport djibouti", "assurance maritime djibouti", "incoterm qui assure", "assurance facultés"],
    product: "maritime",
    body: `
Djibouti est la porte d'entrée maritime de l'Éthiopie et un hub logistique régional. Entre le port, les zones franches et le corridor routier, une marchandise change souvent de mains. La question clé : **qui doit l'assurer, et à partir de quand ?**

## La règle simple : regardez l'Incoterm

L'Incoterm de votre contrat de vente fixe le moment où le risque passe du vendeur à l'acheteur.

| Incoterm | Qui souscrit l'assurance du transport principal | À retenir |
| --- | --- | --- |
| CIF / CIP | Le vendeur | Couverture minimale ; l'acheteur peut la compléter |
| CFR / CPT | L'acheteur | Le vendeur paie le fret mais le risque passe à l'acheteur au chargement |
| FOB / FCA | L'acheteur | Risque transféré au chargement ou à la remise au transporteur |
| EXW | L'acheteur | L'acheteur porte tout le risque dès l'enlèvement |
| DAP / DDP | Le vendeur | Le vendeur porte le risque jusqu'à destination |

> Le piège le plus fréquent : un importateur qui achète en CFR pense être couvert parce que le fret est payé. Ce n'est pas le cas : le risque est déjà à sa charge pendant le voyage.

## Police au voyage ou police d'abonnement ?

- **Police au voyage** : une expédition, une couverture. Adaptée aux envois ponctuels.
- **Police d'abonnement (ou flottante)** : un contrat annuel qui couvre automatiquement toutes vos expéditions déclarées. Adaptée aux flux réguliers : moins de formalités, pas d'oubli.

## Que couvre une assurance facultés ?

Selon les conditions retenues : perte totale, avaries particulières, vol, dommages en manutention, et le transport terrestre complémentaire jusqu'à l'entrepôt ou le long du corridor. Les exclusions et franchises figurent dans la police : lisez-les avec votre conseiller.

## En cas d'avarie : les bons réflexes

1. **Émettez des réserves** précises auprès du transporteur ou du manutentionnaire dès la livraison.
2. **Photographiez** les colis et conteneurs endommagés.
3. **Conservez** les documents : connaissement, facture commerciale, liste de colisage, bons de livraison.
4. **Prévenez votre assureur** sans attendre : une expertise peut être nécessaire.

## Ce que nous demandons pour un devis

Type de marchandises, sens des flux (import, export, transit), valeur moyenne par expédition, nombre d'expéditions par an, Incoterm habituel et mode de transport. Le formulaire Tamini vous guide question par question.
`,
    faq: [
      ["En FOB, qui assure la marchandise ?", "L'acheteur : le risque lui est transféré dès le chargement à bord. Il doit donc souscrire l'assurance du transport principal."],
      ["Qu'est-ce qu'une police d'abonnement ?", "Un contrat annuel qui couvre automatiquement toutes les expéditions déclarées, adapté aux importateurs et exportateurs réguliers."],
    ],
  },

  {
    slug: "garantie-bonne-execution-djibouti",
    lang: "fr",
    category: "Entreprises",
    date: "2026-11-10",
    readMin: 5,
    title: "Garantie de bonne exécution à Djibouti : comment l'obtenir pour un marché",
    seoTitle: "Garantie de bonne exécution et caution de soumission à Djibouti | Tamini",
    description: "Caution de soumission, garantie de bonne exécution, restitution d'acompte, retenue de garantie : à quoi servent-elles dans un marché public ou privé à Djibouti et quels documents préparer.",
    excerpt: "Les quatre garanties de marché, leur rôle à chaque étape d'un appel d'offres, et le dossier à préparer pour les obtenir.",
    keywords: ["garantie de bonne exécution", "caution bancaire djibouti", "caution de soumission", "performance bond djibouti"],
    product: "bond",
    body: `
Pour répondre à un appel d'offres ou signer un marché, une entreprise doit souvent fournir une **garantie** à son client. Elle rassure le donneur d'ordre : si l'entreprise ne respecte pas ses engagements, il est indemnisé à hauteur du montant garanti.

## Les quatre garanties de marché

| Garantie | À quel moment | Elle protège le client contre… |
| --- | --- | --- |
| Caution de soumission | Dépôt de l'offre | Le retrait de l'offre ou le refus de signer |
| Garantie de bonne exécution | Signature du marché | La non-exécution ou la mauvaise exécution des travaux |
| Garantie de restitution d'acompte | Versement d'une avance | La non-restitution de l'avance si les travaux ne sont pas réalisés |
| Retenue de garantie | Pendant et après les travaux | Les réserves non levées à la réception |

Le pourcentage exigé est fixé par le dossier d'appel d'offres ou le contrat.

## Garantie d'assurance ou caution bancaire ?

Une garantie émise par un assureur remplit la même fonction qu'une caution bancaire, lorsque le donneur d'ordre l'accepte. Pour l'entreprise, elle peut **préserver ses lignes de crédit bancaires** pour son exploitation. Vérifiez toujours dans le dossier d'appel d'offres la forme de garantie acceptée.

## Le dossier à préparer

- Le dossier d'appel d'offres ou le contrat, avec le modèle de garantie exigé.
- Les **états financiers des deux derniers exercices**.
- Une présentation de l'entreprise et de ses références.
- Le montant du marché, le pourcentage et la date limite.

Anticipez : la date limite de dépôt est la contrainte la plus fréquente. Plus le dossier est complet, plus l'étude est rapide.

## Combiner avec l'assurance chantier

Un marché de travaux s'accompagne souvent d'une exigence d'**assurance tous risques chantier** et de **responsabilité civile**. Tamini peut étudier l'ensemble dans une proposition consolidée.
`,
    faq: [
      ["Quelle différence entre caution de soumission et garantie de bonne exécution ?", "La caution de soumission accompagne l'offre ; la garantie de bonne exécution est remise à la signature du marché et couvre l'exécution des travaux."],
      ["Quels documents fournir ?", "Le dossier d'appel d'offres ou le contrat, les états financiers des deux derniers exercices, une présentation de l'entreprise, le montant et la date limite."],
    ],
  },

  {
    slug: "assurance-chantier-tous-risques-djibouti",
    lang: "fr",
    category: "Entreprises",
    date: "2026-11-10",
    readMin: 5,
    title: "Assurance tous risques chantier (TRC) à Djibouti : ce qu'elle couvre",
    seoTitle: "Assurance chantier tous risques (TRC) à Djibouti : garanties et devis | Tamini",
    description: "Assurance tous risques chantier à Djibouti : ouvrage en cours, matériaux, engins, responsabilité civile, durée de couverture, qui la souscrit. Le guide pour maîtres d'ouvrage et entreprises de BTP.",
    excerpt: "Ouvrage, matériaux, engins, tiers : ce que couvre une assurance chantier, qui doit la souscrire et comment la préparer.",
    keywords: ["assurance chantier", "assurance chantier tous risques", "assurance chantier trc", "assurance chantier djibouti", "assurance chantier entreprise"],
    product: "chantier",
    body: `
Un chantier concentre beaucoup de risques sur une période courte : incendie, effondrement, inondation, vol de matériaux, accident avec un riverain. L'**assurance tous risques chantier (TRC)** protège l'ouvrage pendant toute la durée des travaux.

## Ce que couvre une assurance TRC

- **L'ouvrage en cours de construction** : dommages matériels accidentels.
- **Les matériaux** stockés sur le site.
- **Les engins et équipements** de chantier, selon les options retenues.
- **La responsabilité civile** envers les tiers : riverains, passants, propriétés voisines.

Le volet montage-essais (TRME) couvre les installations industrielles et équipements pendant leur montage.

## Qui la souscrit ?

Selon le contrat, le **maître d'ouvrage** ou l'**entreprise générale**, pour le compte de tous les intervenants. Le dossier d'appel d'offres précise souvent qui doit la fournir : vérifiez-le avant de chiffrer votre offre.

## Combien de temps dure la couverture ?

De l'ouverture du chantier à la réception des travaux, avec souvent une **période de maintenance** après réception. Si le planning glisse, la couverture doit être prolongée : anticipez avec votre assureur.

## Les informations pour un devis

- Type d'ouvrage : bâtiment, génie civil, port, industriel.
- Votre rôle : maître d'ouvrage, entreprise générale, sous-traitant.
- Montant du marché et durée des travaux.
- Date de démarrage et exigences du contrat.

## À combiner avec

- La **garantie de bonne exécution** exigée à la signature.
- L'assurance **flotte** pour les véhicules et engins qui circulent.
- L'assurance **accidents** pour vos équipes.
`,
    faq: [
      ["Qui doit souscrire l'assurance chantier ?", "Le maître d'ouvrage ou l'entreprise générale, selon le contrat. Le dossier d'appel d'offres le précise généralement."],
      ["L'assurance chantier couvre-t-elle les tiers ?", "Oui, le volet responsabilité civile couvre les dommages causés aux tiers pendant les travaux, selon les conditions retenues."],
    ],
  },

  {
    slug: "insurance-in-djibouti-guide",
    lang: "en",
    category: "Guide",
    date: "2026-11-10",
    readMin: 6,
    title: "Insurance in Djibouti: a practical guide for residents, expats and businesses",
    seoTitle: "Insurance in Djibouti: regulator, compulsory cover, companies | Tamini",
    description: "How insurance works in Djibouti: the regulator, compulsory motor liability, the official bonus-malus, Takaful, travel and business cover. A practical guide by Tamini Insurance.",
    excerpt: "Who regulates insurance in Djibouti, what is compulsory, how motor pricing works and what Takaful means for you.",
    keywords: ["insurance in djibouti", "insurance companies in djibouti", "djibouti insurance regulator", "car insurance djibouti", "djibouti travel insurance"],
    product: null,
    body: `
Whether you are moving to Djibouti, running a business in the free zones or shipping goods through the port, here is how insurance works locally.

## Who regulates insurance in Djibouti?

Insurance companies are licensed and supervised by Djibouti's insurance regulatory authority (ARSD). Tamini Insurance SA is the country's first licensed **Takaful** insurer.

## What insurance is compulsory?

**Motor third-party liability** is compulsory for every vehicle on the road. It pays for damage you cause to other people and their property. Other covers, such as comprehensive motor, home or travel, are optional but often required by a lender, a landlord or a visa application.

## How is motor insurance priced?

Under Ministerial Order No. 2019-213, the reference premium depends on the vehicle's technical characteristics and use, and an official **bonus-malus** applies:

- each claim-free year lowers your coefficient by **10%**, down to a floor of **0.60**;
- each at-fault claim raises it by **25%**, up to a cap of **3.50**;
- fleets of 3 vehicles or more get official discounts from **10% to 30%**.

Your insurer must give you a **claims-history statement** on request, so your bonus follows you if you switch.

## What is Takaful?

Takaful is cooperative insurance compliant with Islamic principles. Participants contribute to a common fund managed by the operator; claims are paid from the fund and any surplus may be shared with eligible participants. It is open to everyone.

## Business insurance in Djibouti

Common needs include property multi-risk for warehouses and free-zone facilities, general liability, **marine cargo** for imports and Ethiopia-corridor transit, motor fleets, contractors' all risks and **performance bonds** for tenders.

## Travel insurance from Djibouti

Schengen visas require medical cover of at least **€30,000** valid across the Schengen area for the full stay. Tamini issues travel certificates suited to visa applications.

## Getting a quote

Use Tamini's online quote form (about 60 seconds) or message us on WhatsApp. An advisor sends you a personalised proposal.
`,
    faq: [
      ["Is car insurance compulsory in Djibouti?", "Yes. Third-party motor liability is compulsory for every vehicle on the road."],
      ["Who regulates insurance in Djibouti?", "Djibouti's insurance regulatory authority (ARSD) licenses and supervises insurers."],
      ["Is Takaful only for Muslims?", "No. Takaful is open to all individuals and businesses."],
    ],
  },
];

export const articleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);

export const NAV_LINKS = [
  { to: "/", label: "Accueil", memberOnly: false },
  { to: "/actualites", label: "Actualités", memberOnly: false },
  { to: "/galerie", label: "Galerie", memberOnly: false },
  { to: "/filiere", label: "La filière", memberOnly: true },
  { to: "/bibliotheque", label: "Bibliothèque", memberOnly: true },
  { to: "/club", label: "Le club", memberOnly: false },
  { to: "/contact", label: "Contact", memberOnly: false },
] as const;

export type Actualite = {
  slug: string;
  titre: string;
  categorie: string;
  date: string;
  resume: string;
};

export const ACTUALITES: Actualite[] = [
  
  {
    slug: "Forum: INFOS GTEL 2029",
    titre: "Forum Télécoms ENSPY 2029 : appel à candidatures",
    categorie: "Annonce",
    date: "Aout 2026",
    resume:
      " Nous avons créer un forums pour vous. Venez afin qu'on parle de vos préoccupations",
  },
  {
    slug: "atelier-fibre-optique",
    titre: "Atelier soudure fibre optique avec le laboratoire réseaux",
    categorie: "Formation",
    date: "Novembre 2026",
    resume:
      "Encadrées par les L4 pour manipuler soudeuse, OTDR et jarretières monomodes dans les conditions du terrain.",
  },
  {
    slug: "nouveau-bureau",
    titre: "Le nouveau Bureau du club GTEL est installé",
    categorie: "Vie du club",
    date: "Décembre 2026",
    resume:
      "Passation officielle entre les promotions : Présidence, Cellule Communication et pôle Parrainage sont désormais au complet.",
  },
  {
    slug: "Journée Internationale des télécommunications 2026",
    titre: "La Journée intenationale des télécoms vous retrouve à l'ENSPY",
    categorie: "Evenements",
    date: "Février 2026",
    resume:
      "Conférence, Presentations de projets, des Hautes personnalités et Institutions du domaines des télécommunications étaient présentes",
  },
  {
    slug: "Visite d'Entreprise",
    titre: "Une chaleureuse acceuil de L'ART",
    categorie: "Evenements",
    date: "Mai 2026",
    resume:
      " Nous avons visiter les locaux de l'ART ou nous avons été a chaque fois instruits par different encadreurs exceptionels sur les réalités du secteur des télécomunications au Cameroun",
  },
];

export type UE = {
  code: string;
  intitule: string;
  niveau: "L3" | "L4" | "L5";
  semestre: string;
  credits: number;
  heures: number;
  enseignant: string;
  grade: string;
  resume: string;
};

export const UES: UE[] = [
  {
    code: "GTEL 3005",
    intitule: "Electronique Analogique, Circuits et Dispositifs RF",
    niveau: "L3",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Dr. Bavoua Dany ",
    grade: "Maitre de Conférences",
    resume:
      "Circuits électroniques analogiques, amplificateurs et dispositifs RF pour la conception de systèmes de communication.",
  },
  {
    code: "GTEL 3006",
    intitule: "Rayonnement et Antenne",
    niveau: "L3",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Pr. Videme Olivier",
    grade: "Professeur",
    resume:
      "Principes du rayonnement électromagnétique, types d'antennes et calcul des diagrammes de rayonnement.",
  },
  {
    code: "GTEL 3015",
    intitule: "Electronique Numérique, Microprocesseur et Microcontrôleur",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Pr. ELE Pierre",
    grade: "Professeur et Directeur d'Université",
    resume:
      "Logique numérique, architecture des microprocesseurs et programmation des microcontrôleurs.",
  },
  {
    code: "GTEL 3016",
    intitule: "Radiocommunication Mobile",
    niveau: "L3",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Pr. Tonye Emmannuel",
    grade: "Professeur",
    resume:
      "Architecture GSM à 5G, dimensionnement cellulaire, budget de liaison et gestion de la mobilité.",
  },
  {
    code: "GTEL 3025",
    intitule: "Electromagnétisme",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr Kaissassou Samuel",
    grade: "Maitre de Conferences",
    resume:
      "Équations de Maxwell, propagation des ondes électromagnétiques et applications aux télécommunications.",
  },
  {
    code: "GTEL 3026",
    intitule: "Processus Stochastiques et Théorie de la File d'Attente",
    niveau: "L3",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. Lele",
    grade: "",
    resume:
      "Modélisation probabiliste des systèmes et analyse des files d'attente pour le dimensionnement des réseaux.",
  },
  {
    code: "GTEL 3035",
    intitule: "Propagation des Ondes",
    niveau: "L3",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "Dr. Siaka",
    grade: "",
    resume:
      "Mécanismes de propagation des ondes radio en espace libre et en milieu réel.",
  },
  {
    code: "GTEL 3036",
    intitule: "Programmation Python",
    niveau: "L3",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. Mbietieu Amos ",
    grade: "",
    resume:
      "Bases de la programmation Python appliquées au traitement de données et à l'automatisation.",
  },
  {
    code: "GTEL 3045",
    intitule: "Traitement Analogique et Numérique du Signal",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr. Lele",
    grade: "",
    resume:
      "Techniques de traitement des signaux analogiques et numériques, filtrage et échantillonnage.",
  },
  {
    code: "GTEL 3046",
    intitule: "Génie Logiciel",
    niveau: "L3",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. Mbietieu Amos",
    grade: "",
    resume:
      "Méthodologies de conception, développement et gestion de projets logiciels.",
  },
  {
    code: "GTEL 3055",
    intitule: "Communication Numérique",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr. Lele",
    grade: "",
    resume:
      "Modulation numérique, codage de canal et transmission de données numériques.",
  },
  {
    code: "GTEL 3056",
    intitule: "TP Télécom 1",
    niveau: "L3",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr Binele",
    grade: "Maitre de conférences",
    resume:
      "Travaux pratiques appliqués aux systèmes et technologies de télécommunication.",
  },
  {
    code: "GTEL 3065",
    intitule: "Systèmes Embarqués et Programmation",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr. EKOBO AKOA Brice",
    grade: "Maitre de conférences ",
    resume:
      "Conception et programmation de systèmes embarqués pour applications IoT et industrielles.",
  },
  {
    code: "GTEL 3066",
    intitule: "Réseaux IP 1",
    niveau: "L3",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. Mbous Jacques",
    grade: "Maitre de conférences",
    resume:
      "Fondamentaux des réseaux IP, adressage, routage et protocoles de communication.",
  },
  {
    code: "GTEL 3075",
    intitule: "Bases de Données",
    niveau: "L3",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr Mbietieu Amos",
    grade: "",
    resume:
      "Conception, modélisation et manipulation des bases de données relationnelles.",
  },
  {
    code: "GTEL 3105",
    intitule: "Anglais 1",
    niveau: "L3",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "Mr SAKWE",
    grade: "",
    resume:
      "Renforcement des compétences en anglais technique et professionnel.",
  },
  {
    code: "HUM 3076",
    intitule: "Techniques de Management",
    niveau: "L3",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Dr Mbarga Joel",
    grade: "",
    resume:
      "Principes fondamentaux du management et de la gestion des équipes.",
  },
  {
    code: "HUM 3085",
    intitule: "Gestion des projets",
    niveau: "L3",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "Mme Mvoudjio",
    grade: "",
    resume:
      "Méthodologies et outils de planification, exécution et suivi de projets.",
  },
  {
    code: "HUM 3086",
    intitule: "Droit des TIC et Cybercriminalité",
    niveau: "L3",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Dr. Simo",
    grade: "",
    resume:
      "Cadre juridique des technologies de l'information et enjeux liés à la cybercriminalité.",
  },
  {
    code: "HUM 3095",
    intitule: "Education à la Citoyenneté et au Multiculturalisme 2",
    niveau: "L3",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "",
    grade: "",
    resume:
      "Sensibilisation à la citoyenneté, à la diversité culturelle et au vivre-ensemble.",
  },
  {
    code: "HUM 3096",
    intitule: "Techniques de Communication et de Présentation des Travaux Scientifiques",
    niveau: "L3",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Dr MOT Massoussi",
    grade: "Maitre de conférences",
    resume:
      "Méthodes de rédaction et de présentation orale des travaux scientifiques.",
  },
  {
    code: "HUM 5089",
    intitule: "Ethique, Développement Personnel et Professionnel",
    niveau: "L5",
    semestre: "S1",
    credits: 2 ,
    heures: 60 ,
    enseignant: "M. NYAMEN",
    grade: "",
    resume:
      "Réflexion sur l'éthique professionnelle et le développement personnel de l'ingénieur.",
  },
  {
    code: "HUM 5099",
    intitule: "Création et Gestion d'Entreprise",
    niveau: "L5",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "M. TCHOUNDJA",
    grade: "",
    resume:
      "Démarche entrepreneuriale, création et gestion d'une entreprise technologique.",
  },
  {
    code: "GTEL 5079",
    intitule: "Data Mining",
    niveau: "L5",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Dr. EKOBO",
    grade: "Docteur",
    resume:
      "Techniques d'exploration et d'analyse de grandes quantités de données.",
  },
  {
    code: "GTEL 5049",
    intitule: "QoS et Optimisation des Systèmes de Télécommunications",
    niveau: "L5",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Dr. MBOUS",
    grade: "Docteur",
    resume:
      "Gestion de la qualité de service et optimisation des performances des réseaux de télécommunication.",
  },
  {
    code: "GTEL 5019",
    intitule: "Technologie 5G, Déploiement et Applications",
    niveau: "L5",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr. BINELE",
    grade: "Docteur",
    resume:
      "Architecture de la 5G, stratégies de déploiement et applications associées.",
  },
  {
    code: "GTEL 5009",
    intitule: "Planifications des Réseaux de Télécommunication",
    niveau: "L5",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Dr. BAVOUA",
    grade: "Docteur",
    resume:
      "Méthodes de dimensionnement et de planification des réseaux de télécommunication.",
  },
  {
    code: "GTEL 5039",
    intitule: "Réseaux de Transmission et de Signalisation",
    niveau: "L5",
    semestre: "S1",
    credits: 3,
    heures: 60,
    enseignant: "Pr. TONYE",
    grade: "Professeur",
    resume:
      "Techniques de transmission et protocoles de signalisation dans les réseaux de télécommunication.",
  },
  {
    code: "GTEL 5069",
    intitule: "Projet de Télécommunication",
    niveau: "L5",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Pr. VIDEME",
    grade: "Professeur",
    resume:
      "Réalisation d'un projet appliqué en télécommunications, de la conception à la mise en œuvre.",
  },
  {
    code: "GTEL 5029",
    intitule: "Télécommunication Spatiale",
    niveau: "L5",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Dr. SIAKA",
    grade: "Docteur",
    resume:
      "Systèmes de communication par satellite et technologies spatiales de télécommunication.",
  },
  {
    code: "HUM 5109",
    intitule: "Anglais 3",
    niveau: "L5",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "M. SAKWE STANLEY",
    grade: "",
    resume:
      "Perfectionnement en anglais technique et professionnel, niveau avancé.",
  },
  {
    code: "GTEL 5059",
    intitule: "Normes et Réglementations des Télécommunications",
    niveau: "L5",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "Dr. SIAKA",
    grade: "Docteur",
    resume:
      "Cadre normatif et réglementaire régissant les activités de télécommunication.",
  },
    {
    code: "GTEL 4048",
    intitule: "Sécurité des Réseaux et Cryptographie",
    niveau: "L4",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Pr. BELL BITJOKA",
    grade: "Professeur",
    resume:
      "Principes de la sécurité informatique et des réseaux, techniques de cryptographie appliquées aux télécommunications.",
  },
  {
    code: "GTEL 4018",
    intitule: "Objets Connectés / IoT",
    niveau: "L4",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. SIAKA",
    grade: "Docteur",
    resume:
      "Architecture, protocoles et applications de l'Internet des Objets.",
  },
  {
    code: "HUM 4098",
    intitule: "Dossier de Consultation d'Entreprise (DCE)",
    niveau: "L4",
    semestre: "S2",
    credits: 2,
    heures: 45,
    enseignant: "Pr. ELIME",
    grade: "Professeur",
    resume:
      "Élaboration d'un dossier de consultation pour la réponse aux appels d'offres en entreprise.",
  },
  {
    code: "GTEL 4038",
    intitule: "Management de l'Innovation",
    niveau: "L4",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Pr. BELL BITJOKA",
    grade: "Professeur",
    resume:
      "Stratégies et outils de gestion de l'innovation technologique en entreprise.",
  },
  {
    code: "GTEL 4058",
    intitule: "SDN/NFV : Software Defined Networks & Network Function Virtualization",
    niveau: "L4",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. BINELE",
    grade: "Docteur",
    resume:
      "Virtualisation des fonctions réseau et principes des réseaux définis par logiciel.",
  },
  {
    code: "GTEL 4068",
    intitule: "TP Télécom 2",
    niveau: "L4",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. BINELE / Dr. BAVOUA / Dr. SIAKA",
    grade: "Docteur",
    resume:
      "Travaux pratiques avancés appliqués aux systèmes de télécommunication.",
  },
  {
    code: "GTEL 4028",
    intitule: "Théorie des Graphes et Recherche Opérationnelle",
    niveau: "L4",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Dr. LELE",
    grade: "Docteur",
    resume:
      "Modélisation par la théorie des graphes et méthodes d'optimisation en recherche opérationnelle.",
  },
  {
    code: "GTEL 4078",
    intitule: "Mini Projet de Télécommunication",
    niveau: "L4",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. BINELE",
    grade: "Docteur",
    resume:
      "Projet appliqué de courte durée en télécommunications, de la conception à la réalisation.",
  },
  {
    code: "GTEL 4008",
    intitule: "Wireless Networks",
    niveau: "L4",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. MBOUS",
    grade: "Docteur",
    resume:
      "Technologies et protocoles des réseaux sans fil.",
  },
  {
    code: "HUM 4088",
    intitule: "Droit du Travail et des Affaires",
    niveau: "L4",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Pr. AMPERE SIMO",
    grade: "Professeur",
    resume:
      "Notions fondamentales du droit du travail et du droit des affaires.",
  },
  {
    code: "HUM 4108",
    intitule: "Comptabilité, Analyse Financière et Economique",
    niveau: "L4",
    semestre: "S2",
    credits: 3,
    heures: 60,
    enseignant: "Mme MOUNIRATOU ADAMA",
    grade: "",
    resume:
      "Bases de la comptabilité et méthodes d'analyse financière et économique appliquées à l'entreprise.",
  },
];

export type Doc = {
  titre: string;
  niveau: "L3" | "L4" | "L5";
  matiere: string;
  type: string;
  annee: string;
  taille: string;
};

export const DOCUMENTS: Doc[] = [
  { titre: "Théorie du signal — Examen final", niveau: "L3", matiere: "TEL 311", type: "Ancien sujet", annee: "2025", taille: "1,2 Mo" },
  { titre: "Électronique des communications — TD corrigés", niveau: "L3", matiere: "TEL 322", type: "TD corrigé", annee: "2024", taille: "3,4 Mo" },
  { titre: "Mathématiques du signal — Fiche de révision", niveau: "L3", matiere: "MAT 310", type: "Fiche", annee: "2026", taille: "740 Ko" },
  { titre: "Réseaux mobiles — Contrôle continu", niveau: "L4", matiere: "TEL 411", type: "Ancien sujet", annee: "2025", taille: "980 Ko" },
  { titre: "Transmission numérique — Support de cours", niveau: "L4", matiere: "TEL 424", type: "Support de cours", annee: "2025", taille: "6,1 Mo" },
  { titre: "Antennes & propagation — TP guidé", niveau: "L4", matiere: "TEL 418", type: "TP", annee: "2024", taille: "2,3 Mo" },
  { titre: "Réseaux à fibre optique — Examen + corrigé", niveau: "L5", matiere: "TEL 512", type: "Ancien sujet", annee: "2026", taille: "4,8 Mo" },
  { titre: "Sécurité des réseaux — Étude de cas opérateur", niveau: "L5", matiere: "TEL 526", type: "Étude de cas", annee: "2025", taille: "1,9 Mo" },
  { titre: "Projet de fin de cycle — Guide de rédaction", niveau: "L5", matiere: "PFE", type: "Guide", annee: "2026", taille: "820 Ko" },
];

export const BUREAU = [
  { nom: "Tia Tchoffo Brandon", role: "Président", promo: "GTEL 4" },
  { nom: "Kenfack Richecard Alias Richesse", role: "Cellule Communication", promo: "GTEL 4" },
  { nom: "Mbassi Effa Nicolas", role: "Pôle Parrainage", promo: "GTEL 4" },
  { nom: "Kouamen Suzel", role: "Trésorerie", promo: "GTEL 4" },
  { nom: "Vmessah Ida", role: "Adjointe a la Cellule Communication", promo: "GTEL 4" },
  { nom: "Wokam Melvine", role: "Adjoint a la Trésorerie", promo: "GTEL 4" },
  { nom: "Pokam Franc", role: "Cellule Innovation", promo: "GTEL 4" },
  { nom: "Ehon Nayang Eric", role: "Adjoint a la Cellule Innovation", promo: "GTEL 4" },
  { nom: "Mbozo'o Carmen", role: "Censeur", promo: "GTEL 4" },
  { nom: "Bomo Roland", role: "Cellule Relations extérieures", promo: "GTEL 4" },
  { nom: "Djouma Noé", role: "Ajoint a la Cellule Relations extérieures", promo: "GTEL 4" },
];

export const CHIFFRES = [
  { valeur: "3", label: "Niveaux couverts, L3 à L5" },
  { valeur: "200+", label: "Documents de parrainage" },
  { valeur: "24", label: "Unités d'enseignement" },
  { valeur: "1", label: "Vitrine unique du département" },
];

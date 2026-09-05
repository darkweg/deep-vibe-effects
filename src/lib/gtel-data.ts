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
  id: string;
  slug: string;
  titre: string;
  categorie: string;
  date: string;
  resume: string;
  corps: string[];
  linkedin: string;
};

const LINKEDIN_CLUB = "https://www.linkedin.com/company/club-gtel-enspy/";

export const ACTUALITES: Actualite[] = [
  
  {
    id: "forum-infos-gtel-2029",
    slug: "Forum: INFOS GTEL 2029",
    titre: "Forum Télécoms ENSPY 2029 : appel à candidatures",
    categorie: "Annonce",
    date: "Aout 2026",
    resume:
      " Nous avons créer un forums pour vous. Venez afin qu'on parle de vos préoccupations",
    corps: [
      "Le club GTEL ouvre les candidatures pour le Forum Télécoms ENSPY 2029, un rendez-vous pensé comme un espace d'échange direct entre les étudiants de la filière, les anciens et les professionnels du secteur.",
      "Pendant deux jours, les participants pourront présenter leurs projets, poser leurs questions sur les parcours d'insertion et rencontrer les entreprises partenaires du département de Télécommunications.",
      "Les candidatures se font auprès de la Cellule Communication. Chaque dossier doit préciser le niveau, la thématique proposée et le format souhaité : démonstration, poster ou intervention courte.",
    ],
    linkedin: LINKEDIN_CLUB,
  },
  {
    id: "atelier-fibre-optique",
    slug: "atelier-fibre-optique",
    titre: "Atelier soudure fibre optique avec le laboratoire réseaux",
    categorie: "Formation",
    date: "Novembre 2026",
    resume:
      "Encadrées par les L4 pour manipuler soudeuse, OTDR et jarretières monomodes dans les conditions du terrain.",
    corps: [
      "L'atelier fibre optique réunit chaque promotion autour du matériel du laboratoire réseaux : soudeuse à fusion, cliveuse, réflectomètre OTDR et jeux de jarretières monomodes.",
      "Les L4 encadrent les groupes par binômes. L'objectif est simple : réussir une soudure propre, mesurer l'atténuation obtenue et interpréter correctement la trace OTDR.",
      "La session se termine par un débriefing collectif sur les bonnes pratiques de terrain, du nettoyage des connecteurs à la gestion des rayons de courbure.",
    ],
    linkedin: LINKEDIN_CLUB,
  },
  {
    id: "nouveau-bureau",
    slug: "nouveau-bureau",
    titre: "Le nouveau Bureau du club GTEL est installé",
    categorie: "Vie du club",
    date: "Décembre 2026",
    resume:
      "Passation officielle entre les promotions : Présidence, Cellule Communication et pôle Parrainage sont désormais au complet.",
    corps: [
      "La passation entre les promotions s'est tenue en présence des membres du club et des délégués de la filière.",
      "Le nouveau Bureau est désormais au complet : Présidence, Vice-présidence, Cellule Communication, pôle Parrainage et trésorerie.",
      "La feuille de route annoncée met l'accent sur la documentation partagée, les ateliers pratiques et une présence renforcée du club sur les réseaux.",
    ],
    linkedin: LINKEDIN_CLUB,
  },
  {
    id: "journee-internationale-telecoms-2026",
    slug: "Journée Internationale des télécommunications 2026",
    titre: "La Journée intenationale des télécoms vous retrouve à l'ENSPY",
    categorie: "Evenements",
    date: "Février 2026",
    resume:
      "Conférence, Presentations de projets, des Hautes personnalités et Institutions du domaines des télécommunications étaient présentes",
    corps: [
      "La Journée internationale des télécommunications a rassemblé à l'ENSPY étudiants, enseignants et institutions du secteur autour d'un programme de conférences et de démonstrations.",
      "Les étudiants de la filière ont présenté leurs projets : supervision réseau, prototypes IoT, dimensionnement radio et outils de mesure développés en interne.",
      "Les échanges avec les personnalités invitées ont porté sur l'évolution du secteur au Cameroun et sur les compétences attendues des jeunes ingénieurs télécoms.",
    ],
    linkedin: LINKEDIN_CLUB,
  },
  {
    id: "visite-art",
    slug: "Visite d'Entreprise",
    titre: "Une chaleureuse acceuil de L'ART",
    categorie: "Evenements",
    date: "Mai 2026",
    resume:
      " Nous avons visiter les locaux de l'ART ou nous avons été a chaque fois instruits par different encadreurs exceptionels sur les réalités du secteur des télécomunications au Cameroun",
    corps: [
      "La délégation du club GTEL a été reçue dans les locaux de l'Agence de Régulation des Télécommunications pour une visite guidée des différents services.",
      "Les encadreurs ont détaillé les missions de contrôle du spectre, la certification des équipements et le suivi de la qualité de service des opérateurs.",
      "La visite s'est conclue par une séance de questions-réponses sur les métiers de la régulation et les opportunités de stage pour les étudiants de la filière.",
    ],
    linkedin: LINKEDIN_CLUB,
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
      "Cette unité d'enseignement explore les fondements du traitement des signaux continus à travers l'étude des composants actifs et passifs, notamment les diodes, les transistors et les amplificateurs opérationnels. Elle aborde la conception des étages de gain, des filtres analogiques, des oscillateurs et des systèmes de conditionnement de signaux, indispensables pour relier le monde physique aux architectures électroniques.",
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
      "Cette unité d'enseignement approfondit les principes fondamentaux de l'électromagnétisme appliqués à la propagation des ondes et à la conversion guidage-espace. Elle couvre l'étude des paramètres caractéristiques des antennes (diagramme de rayonnement, gain, directivité, impédance d'entrée), l'analyse des structures élémentaires (dipôles, sources à ouverture, réseaux d'antennes) et les mécanismes de propagation, essentiels pour la conception et l'optimisation des systèmes de radiocommunication.",
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
      "Cette unité d'enseignement couvre l'ensemble de la chaîne de traitement de l'information binaire, depuis la logique combinatoire et séquentielle de base (portes logiques, bascules, compteurs) jusqu'à l'architecture et la programmation des systèmes embarqués. Elle permet d'étudier le fonctionnement interne des microprocesseurs et microcontrôleurs, la gestion des interfaces d'E/S, les bus de communication et la conception de systèmes sur puce adaptés aux applications industrielles et embarquées.",
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
      "Cette unité d'enseignement étudie les principes fondamentaux et les architectures des réseaux cellulaires et des systèmes de communication sans fil. Elle couvre la modélisation du canal de propagation radioélectrique (évanouissements, trajets multiples), les techniques d'accès multiple (FDMA, TDMA, CDMA, OFDMA), la gestion de la mobilité et des handovers, ainsi que l'évolution des standards technologiques (de la 2G vers la 5G et au-delà) pour optimiser la capacité, la qualité de service et la couverture des réseaux modernes.",
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
      "Cette unité d'enseignement pose les fondements théoriques indispensables de la physique des ondes et des champs à travers l'étude approfondie des équations de Maxwell. Elle aborde l'électrostatique, la magnétostatique, l'induction, les régimes quasi-stationnaires ainsi que la propagation des ondes électromagnétiques dans le vide et dans les milieux matériels, fournissant le bagage conceptuel essentiel pour l'ingénierie des hautes fréquences, des antennes et des systèmes de télécommunication.",
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
      "Cette unité d'enseignement fournit les outils mathématiques avancés indispensables pour modéliser et analyser les systèmes aléatoires et dynamiques. Elle aborde la théorie des processus stochastiques (chaînes de Markov, processus de Poisson) et les principes fondamentaux des files d'attente (lois de Little, modèles M/M/1, M/M/c), permettant l'évaluation des performances, l'optimisation du trafic et le dimensionnement des réseaux de télécommunication et informatiques.",
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
      "Cette unité d'enseignement étudie les mécanismes fondamentaux de propagation des ondes électromagnétiques en espace libre, guidé et en milieu naturel complexes. Elle analyse en détail les lois fondamentales de la réfraction, de la réflexion, de la diffraction (modèle de Fresnel) ainsi que les évanouissements dus aux obstacles atmosphériques et au relief. Ces notions théoriques fournissent aux étudiants le bagage conceptuel nécessaire pour évaluer précisément l'atténuation du signal et dimensionner les liaisons hertziennes ou optiques.",
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
      "Cette unité d'enseignement introduit les bases algorithmiques et avancées de la programmation orientée objet avec le langage Python. Elle met un accent particulier sur la manipulation et le traitement automatisé de données complexes, la création de scripts d'automatisation réseau et la maîtrise d'outils et bibliothèques scientifiques (NumPy, SciPy, Matplotlib, Pandas). Ces compétences permettent aux étudiants de simuler des signaux, d'automatiser des tâches d'ingénierie et de développer des applications d'analyse appliquées aux télécommunications.",
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
      "Cette unité d'enseignement aborde les théories, modèles mathématiques et techniques fondamentales du traitement des signaux à temps continu et à temps discret. Elle couvre l'échantillonnage de Shannon-Nyquist, la quantification, les transformations de Fourier, de Laplace et en Z, ainsi que la réalisation d'analyses spectrales rigoureuses. Elle permet également de concevoir et de synthétiser des filtres numériques RIF et RII indispensables pour le conditionnement, le filtrage et la restauration de l'information dans les réseaux.",
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
      "Cette unité d'enseignement présente l'ensemble des méthodologies rigoureuses de conception, de modélisation (UML), d'architecture et de gestion du cycle de vie des applications logiciels. Elle aborde la spécification des besoins, le développement modulaire, la mise en œuvre des patrons de conception (Design Patterns), ainsi que les principes de tests unitaires et d'intégration. Elle transmet les bonnes pratiques de codage modernes indispensables à la réalisation de solutions informatiques fiables, évolutives et maintenables.",
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
      "Cette unité d'enseignement explore les architectures fondamentales des chaînes de transmission numérique en bande de base et sur porteuse. Elle étudie en profondeur les techniques de codage de ligne, les modulations numériques avancées (ASK, FSK, PSK, QAM), le codage de canal correcteur d'erreurs (codes bloc, convolutifs) ainsi que la gestion des interférences entre symboles. L'objectif est d'assurer l'intégrité, le débit optimal et la fiabilité du transfert de données au travers de canaux de transmission réalistes et bruités.",
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
      "Cette unité d'enseignement propose un ensemble de travaux pratiques et d'expérimentations guidées en laboratoire appliqués aux technologies de télécommunication. Les étudiants apprennent à manipuler des équipements d'analyse modernes (oscilloscopes, analyseurs de spectre, générateurs de signaux RF) pour concevoir, mesurer et valider expérimentalement des circuits radiofréquence, des chaînes de modulation et des topologies d'antennes, afin de confronter la théorie aux réalités pratiques du terrain.",
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
      "Cette unité d'enseignement couvre la conception matérielle et logicielle conjointe des systèmes électroniques embarqués et autonomes. Elle aborde l'architecture interne des microcontrôleurs avancés (ARM, AVR), la programmation bas niveau (C/C++ embarqué), la gestion temps réel des interruptions et le pilotage des périphériques de communication (UART, SPI, I2C, CAN). Elle prépare les étudiants à développer des solutions d'acquisition de données et d'automatisation adaptées aux objets connectés (IoT) et au secteur industriel.",
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
      "Cette unité d'enseignement pose les fondements théoriques et pratiques des réseaux informatiques basés sur les modèles OSI et TCP/IP. Elle détaille les mécanismes de l'adressage IPv4 et IPv6, le sous-réseau (VLSM/CIDR), la commutation de niveau 2 (VLANs, STP) ainsi que les principes de routage statique et dynamique (RIP, OSPF). Elle forme les étudiants à l'architecture, la configuration de base, au diagnostic de pannes et à la sécurisation élémentaire des réseaux d'entreprise modernes.",
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
      "Cette unité d'enseignement enseigne les concepts fondamentaux de la conception, du développement et de l'administration des systèmes de gestion de bases de données relationnelles (SGBDR). Elle guide l'étudiant à travers la modélisation conceptuelle (Entité-Association/UML), le passage au schéma relationnel et la normalisation des données. Elle offre une maîtrise pratique approfondie du langage SQL pour la définition, la manipulation, l'optimisation des requêtes complexes et l'assurance de l'intégrité des données.",
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
      "Cette unité d'enseignement vise le renforcement ciblé des compétences linguistiques, écrites et orales, en anglais technique et scientifique. Elle permet aux étudiants de maîtriser le vocabulaire spécialisé du génie électrique et des télécommunications, de lire avec aisance des documentations techniques et des articles de recherche, et de rédiger des synthèses d'ingénierie claires afin de pouvoir évoluer dans un contexte académique et professionnel international.",
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
      "Cette unité d'enseignement transmet les concepts essentiels du management des organisations, du leadership et de la gestion des ressources humaines dans les entreprises technologiques. Elle aborde la structuration des équipes, les processus de prise de décision, la gestion des conflits, la conduite du changement et la dynamique de groupe, dotant l'étudiant des compétences relationnelles et organisationnelles nécessaires pour piloter efficacement des projets et animer des équipes d'ingénieurs.",
  },
  {
    code: "HUM 3085",
    intitule: "Gestion des projets",
    niveau: "L3",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "Dr Mvoudjio",
    grade: "Docteur",
    resume:
      "Cette unité d'enseignement fournit les méthodologies, standards et outils d'ingénierie nécessaires à la conduite structurée d'un projet technologique. Elle couvre le découpage fonctionnel (WBS), la planification temporelle et le suivi de jalons (diagrammes de Gantt, PERT), l'estimation budgétaire, ainsi que l'analyse et la gestion des risques. Elle permet de garantir le respect des exigences de coût, de délai et de qualité dans des environnements d'ingénierie complexes.",
  },
  {
    code: "HUM 3086",
    intitule: "Droit des TIC et Cybercriminalité",
    niveau: "L3",
    semestre: "S2",
    credits: 2,
    heures: 60,
    enseignant: "Pr. Simo",
    grade: "Professeur",
    resume:
      "Cette unité d'enseignement analyse le cadre juridique, réglementaire et éthique régissant l'utilisation des Technologies de l'Information et de la Communication (TIC). Elle traite de la protection des données à caractère personnel, de la propriété intellectuelle, de la réglementation des réseaux et des contrats numériques. Elle étudie également la typologie des infractions informatiques, les preuves numériques et les politiques juridiques préventives pour lutter contre la cybercriminalité.",
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
      "Cette unité d'enseignement sensibilise l'étudiant aux valeurs civiques, à la déontologie citoyenne, aux droits humains et au respect des institutions nationales. Elle explore les dynamiques d'intégration, la valorisation de la diversité culturelle et la gestion des différences au sein d'une société pluraliste, dans le but de promouvoir la cohésion sociale, l'équité, le patriotisme et le vivre-ensemble harmonieux en milieu académique et professionnel.",
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
      "Cette unité d'enseignement enseigne les règles de rédaction académique rigoureuse et de communication scientifique orale efficace. Elle prépare les étudiants à la structuration de rapports d'ingénieur, de mémoires et d'articles techniques, en insistant sur la clarté, l'argumentation et la précision. Elle développe également les compétences orales, la maîtrise des supports visuels et l'expression en public pour réussir les soutenance et séminaires techniques.",
  },
  {
    code: "HUM 5089",
    intitule: "Ethique, Développement Personnel et Professionnel",
    niveau: "L5",
    semestre: "S1",
    credits: 2,
    heures: 60,
    enseignant: "M. NYAMEN",
    grade: "",
    resume:
      "Cette unité d'enseignement propose une réflexion critique approfondie sur les dilemmes éthiques, la déontologie et la responsabilité sociétale et environnementale de l'ingénieur. Elle met un accent particulier sur la gestion de carrière, le développement de l'intelligence émotionnelle, l'autorégulation, le bilan de compétences et la posture professionnelle indispensable pour assumer des fonctions de haute responsabilité au sein des organisations.",
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
      "Cette unité d'enseignement explore l'écosystème entrepreneurial de l'émergence d'une idée innovante jusqu'à la création et la gestion opérationnelle d'une startup technologique. Elle couvre les méthodologies de montage d'études de marché, de modélisation économique (Business Model Canvas), la rédaction de Business Plans, la recherche de financements et les choix des structures juridiques et fiscales adaptées à l'innovation dans le secteur numérique.",
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
      "Cette unité d'enseignement aborde l'ensemble du processus d'exploration de données, d'extraction de connaissances et d'apprentissage automatique (Machine Learning) appliqué aux volumes massifs d'informations (Big Data). Elle étudie l'imputation et le précurseurs de données, les algorithmes de classification, de régression, d'analyse discriminante, de clustering et de règles d'association, offrant une expertise concrète pour l'analyse prédictive et la décision stratégique dans les réseaux.",
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
      "Cette unité d'enseignement étudie en détail les mécanismes de garantie de la Qualité de Service (QoS) et de la Qualité d'Expérience (QoE) dans les infrastructures hétérogènes de télécommunication. Elle analyse les architectures d'ingénierie de trafic (IntServ, DiffServ, MPLS), le contrôle de la gigue, de la latence, des pertes de paquets, ainsi que les algorithmes d'ordonnancement pour optimiser l'utilisation des ressources bande passante et garantir les accords de niveau de service (SLA).",
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
      "Cette unité d'enseignement détaille l'architecture complète des réseaux mobiles 5G New Radio (5G NR) et Core Network (5GC). Elle examine les innovations clés comme le découpage de réseau (Network Slicing), le Massive MIMO, la formation de faisceaux (Beamforming) et l'Edge Computing (MEC). L'étudiant acquiert les compétences pour élaborer des stratégies de déploiement, évaluer le dimensionnement et développer des scénarios d'usage industriels (eMBB, URLLC, mMTC).",
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
      "Cette unité d'enseignement présente les méthodes rigoureuses de planification topologique, de dimensionnement et d'ingénierie de capacité des réseaux fixes et mobiles. Elle couvre la simulation de couverture radioélectrique, l'attribution des fréquences, l'évaluation du trafic de données, le choix des sites relais et l'estimation des coûts d'infrastructure (CAPEX/OPEX), permettant d'assurer la viabilité économique et la robustesse technique des réseaux déployés.",
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
      "Cette unité d'enseignement examine les architectures de transport très haut débit ainsi que les réseaux de multiplexage et de routage de signalisation. Elle approfondit les réseaux optiques WDM/DWDM, les technologies de transmission SDH/OTN, les architectures IP/MPLS, ainsi que les protocoles d'établissement, de contrôle et d'acheminement des sessions de communication (SS7, SIP, Diameter) cruciaux pour l'interconnexion globale des opérateurs.",
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
      "Cette unité d'enseignement constitue une mise en application synthétique et intégrée des connaissances d'ingénierie acquises. Les étudiants travaillent en autonomie encadrée pour mener un projet d'envergure, depuis la définition de la problématique, le cahier des charges, la modélisation et les simulations informatiques jusqu'à la réalisation du prototype, les tests de validation, la rédaction du rapport technique et la soutenance orale devant un jury.",
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
      "Cette unité d'enseignement explore l'architecture, le fonctionnement et la conception des systèmes de télécommunication par satellite. Elle aborde la mécanique orbitale (orbits LEO, MEO, GEO), la modélisation des stations terriennes, les équipements de transpondeurs à bord, ainsi que le calcul rigoureux du bilan de liaison spatiale (C/N, EIRP). Elle couvre également les normes d'accès et les applications de navigation (GNSS) et de télédétection.",
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
      "Cette unité d'enseignement assure la maîtrise avancée de l'anglais professionnel, académique et scientifique. Axée sur la fluidité d'expression, elle prépare les futurs ingénieurs aux présentations orales lors de conférences internationales, à la négociation commerciale, à la rédaction de rapports d'expertise complexes et à la publication d'articles scientifiques, garantissant une aisance linguistique parfaite dans des environnements mondialisés.",
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
      "Cette unité d'enseignement analyse le cadre institutionnel, légal et normatif régissant les activités des télécommunications aux niveaux national et international (UIT, IEEE, 3GPP, autorités de régulation). Elle examine les procédures de gestion du spectre radioélectrique, la délivrance des licences d'exploitation, l'interconnexion des réseaux, la neutralité du net ainsi que le respect des standards d'interopérabilité indispensables à la conformité sectorielle.",
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
      "Cette unité d'enseignement étudie les principes fondamentaux de la sécurité de l'information et la protection des infrastructures réseaux. Elle approfondit les algorithmes cryptographiques symétriques et dissymétriques (AES, RSA, ECC), les fonctions de hachage, la signature numérique et l'infrastructure PKI. Elle traite également des mécanismes de défense (pare-feu, IDS/IPS, VPN IPsec/TLS) et de l'analyse des vulnérabilités face aux cyberattaques.",
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
      "Cette unité d'enseignement traite de la conception et du déploiement de l'écosystème global de l'Internet des Objets (IoT). Elle couvre les architectures matérielles des nœuds capteurs, la gestion de l'énergie, les protocoles de communication basse consommation et longue portée (LoRaWAN, Sigfox, NB-IoT, Zigbee), ainsi que la collecte, la gestion de la sécurité et la remontée des données capteurs vers les plateformes cloud dédiées.",
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
      "Cette unité d'enseignement initie l'élève-ingénieur aux mécanismes réglementaires et pratiques de montage et de réponse aux appels d'offres publics et privés. Elle forme à la rédaction synthétique et rigoureuse des pièces administratives, techniques (CCTP) et financières (DPGF) constituant un Dossier de Consultation d'Entreprise (DCE), ainsi qu'à la sélection et à l'évaluation des offres dans le respect des marchés.",
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
      "Cette unité d'enseignement présente les stratégies, cadres d'analyse et outils pratiques indispensables pour piloter la recherche, le développement et l'innovation technologique au sein des entreprises. Elle explore la veille technologique, la protection intellectuelle (brevets), le design thinking, la méthode agile et les mécanismes de transfert technologique pour transformer des idées novatrices en avantages concurrentiels durables.",
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
      "Cette unité d'enseignement explore la mutation vers la programmabilité et la virtualisation des architectures réseaux. Elle traite de la séparation du plan de contrôle et du plan de données via le modèle SDN (OpenFlow), ainsi que du découplage des fonctions réseau de leur support matériel grâce à la NFV (hyperviseurs, VNF). Elle met en avant les gains d'agilité, de flexibilité et d'automatisation apportés au déploiement des infrastructures modernes.",
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
      "Cette unité d'enseignement propose une série de travaux pratiques avancés axés sur la manipulation et la configuration d'infrastructures de télécommunication complexes. Les étudiants mettent en œuvre des plateformes de simulation et des équipements physiques pour tester le routage avancé, déployer des cœurs de réseaux sans fil, configurer des canaux de transmission optiques/RF et évaluer expérimentalement la qualité de service globale des architectures télécoms.",
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
      "Cette unité d'enseignement aborde les concepts fondamentaux de la théorie des graphes et de la recherche opérationnelle pour l'aide à la décision. Elle traite des algorithmes de recherche de chemins min/max (Dijkstra, Ford-Bellman), des arbres couvrants, du problème de flot maximal, de la programmation linéaire et de l'optimisation sous contraintes, permettant de résoudre avec efficacité des problèmes d'optimisation de routage, de logistique et de dimensionnement réseau.",
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
      "Cette unité d'enseignement consiste en la réalisation pratique d'un travail d'ingénierie encadré de taille intermédiaire. Elle offre l'opportunité de mettre en œuvre la démarche méthodologique complète de conception, de modélisation, de programmation et de déploiement d'une application ou sous-système concret en télécommunications, permettant d'affermir l'autonomie et le travail en équipe des étudiants.",
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
      "Cette unité d'enseignement approfondit l'étude des technologies, des protocoles de couche physique et de liaison ainsi que des normes régissant les réseaux sans fil d'aujourd'hui. Elle étudie les réseaux locaux sans fil (Wi-Fi 802.11a/b/g/n/ac/ax), les réseaux métropolitains (WiMAX) et l'évolution des réseaux cellulaires (LTE/LTE-Advanced), en analysant la gestion du canal radio, de la sécurité, de la qualité de service et du roaming inter-réseaux.",
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
      "Cette unité d'enseignement expose les principes juridiques encadrant la relation individuelle et collective de travail ainsi que la vie commerciale des entreprises. Elle analyse le contrat de travail, la rupture conventionnelle, les obligations professionnelles, ainsi que les notions fondamentales du droit des sociétés, de la concurrence, des contrats commerciaux et de la responsabilité civile et pénale de l'ingénieur et du dirigeant.",
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
      "Cette unité d'enseignement introduit les principes fondamentaux de la comptabilité générale et de la gestion financière d'entreprise. Elle forme à la tenue des écritures comptables, à l'élaboration et la lecture des états financiers (Bilan, Compte de résultat), ainsi qu'à l'utilisation des soldes intermédiaires de gestion et de ratios d'analyse pour évaluer la rentabilité, la solvabilité et la santé financière globale d'une organisation technologique.",
  }
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

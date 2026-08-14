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
    slug: "forum-telecoms-2026",
    titre: "Forum Télécoms ENSPY 2026 : appel à candidatures",
    categorie: "Événement",
    date: "24 juillet 2026",
    resume:
      "Trois jours de conférences, démonstrations réseau et rencontres avec les opérateurs nationaux. Les inscriptions des équipes GTEL sont ouvertes jusqu'au 12 août.",
  },
  {
    slug: "atelier-fibre-optique",
    titre: "Atelier soudure fibre optique avec le laboratoire réseaux",
    categorie: "Formation",
    date: "11 juillet 2026",
    resume:
      "Douze places encadrées par les L5 pour manipuler soudeuse, OTDR et jarretières monomodes dans les conditions du terrain.",
  },
  {
    slug: "nouveau-bureau",
    titre: "Le nouveau Bureau du club GTEL est installé",
    categorie: "Vie du club",
    date: "02 juillet 2026",
    resume:
      "Passation officielle entre les promotions : Présidence, Cellule Communication et pôle Parrainage sont désormais au complet.",
  },
  {
    slug: "bibliotheque-parrainage",
    titre: "La bibliothèque de parrainage passe le cap des 200 documents",
    categorie: "Annonce",
    date: "18 juin 2026",
    resume:
      "Anciens sujets, TD corrigés et supports de cours de L3 à L5, désormais indexés par niveau et par unité d'enseignement.",
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
    code: "TEL 311",
    intitule: "Théorie du signal",
    niveau: "L3",
    semestre: "S1",
    credits: 4,
    heures: 60,
    enseignant: "Dr. A. Nkoulou",
    grade: "Maître de conférences",
    resume:
      "Représentation temps-fréquence, transformée de Fourier, échantillonnage et filtrage analogique appliqué aux systèmes de transmission.",
  },
  {
    code: "TEL 322",
    intitule: "Électronique des communications",
    niveau: "L3",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. M. Etoga",
    grade: "Chargé de cours",
    resume:
      "Amplification, oscillateurs, mélangeurs et chaînes RF de base, avec travaux pratiques sur bancs de mesure.",
  },
  {
    code: "TEL 411",
    intitule: "Réseaux mobiles et radio",
    niveau: "L4",
    semestre: "S1",
    credits: 5,
    heures: 75,
    enseignant: "Pr. S. Bikoi",
    grade: "Professeur",
    resume:
      "Architecture GSM à 5G, dimensionnement cellulaire, budget de liaison et gestion de la mobilité.",
  },
  {
    code: "TEL 424",
    intitule: "Transmission numérique",
    niveau: "L4",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. C. Ngo Bilong",
    grade: "Chargé de cours",
    resume:
      "Modulations numériques, codage canal, égalisation et évaluation des performances en présence de bruit.",
  },
  {
    code: "TEL 512",
    intitule: "Optique et réseaux à fibre",
    niveau: "L5",
    semestre: "S1",
    credits: 5,
    heures: 75,
    enseignant: "Pr. J. Owona",
    grade: "Professeur",
    resume:
      "Propagation guidée, WDM, budget optique, architectures FTTH et métrologie sur fibre monomode.",
  },
  {
    code: "TEL 526",
    intitule: "Sécurité des réseaux de télécommunications",
    niveau: "L5",
    semestre: "S2",
    credits: 4,
    heures: 60,
    enseignant: "Dr. F. Mbarga",
    grade: "Maître-assistant",
    resume:
      "Menaces sur les infrastructures opérateur, cryptographie appliquée, durcissement et supervision de sécurité.",
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
  { nom: "Pokam Franc Migwel", role: "Président", promo: "GTEL 3" },
  { nom: "Ariane N.", role: "Cellule Communication", promo: "GTEL 4" },
  { nom: "Serge T.", role: "Pôle Parrainage", promo: "GTEL 5" },
  { nom: "Laure M.", role: "Trésorerie", promo: "GTEL 4" },
];

export const CHIFFRES = [
  { valeur: "3", label: "Niveaux couverts, L3 à L5" },
  { valeur: "200+", label: "Documents de parrainage" },
  { valeur: "24", label: "Unités d'enseignement" },
  { valeur: "1", label: "Vitrine unique du département" },
];

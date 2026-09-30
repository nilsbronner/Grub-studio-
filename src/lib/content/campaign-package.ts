export type PricingRow = {
  label: string;
  values: [string, string, string];
};

export type PricingTable = {
  title: string;
  rows: PricingRow[];
};

export const campaignTierNames: [string, string, string] = [
  "Lancement",
  "Croissance",
  "Machine de contenu",
];

export const campaignRecommendedIndex = 1;

export const campaignIntro = {
  eyebrow: "Une seule production. Une campagne complète.",
  hook: "Un seul tournage suffit à alimenter votre communication et votre acquisition pendant un à trois mois.",
  description:
    "On définit vos sujets, on tourne une fois, puis on transforme chaque prise de parole en vidéos, formats courts, publicités, posts LinkedIn et articles. On lance ensuite vos campagnes Ads et on les optimise.",
  audience:
    "Pour les dirigeants et équipes marketing qui veulent être présents sur plusieurs canaux sans tourner toutes les semaines, et sans coordonner une agence vidéo d'un côté et une agence Ads de l'autre.",
  priceHeadline: "À partir de 4 950 € HT, budget publicitaire inclus.",
};

export const campaignTransformation = [
  "Une vidéo principale",
  "Plusieurs shorts verticaux (Instagram, TikTok, LinkedIn, YouTube)",
  "Une ou plusieurs créations publicitaires",
  "Un post LinkedIn",
  "Un article de blog",
  "Des citations et des visuels",
];

export const campaignMethod = [
  { step: 1, title: "Stratégie" },
  { step: 2, title: "Production", description: "Tournage en une seule fois." },
  { step: 3, title: "Déclinaisons" },
  {
    step: 4,
    title: "Campagnes Ads",
    description:
      "Test de plusieurs accroches, on coupe ce qui ne fonctionne pas, on pousse ce qui performe.",
  },
];

export const campaignOneMonth: PricingTable = {
  title: "Formules 1 mois",
  rows: [
    { label: "Prix HT", values: ["4 950 €", "7 500 €", "9 900 €"] },
    { label: "Tournage", values: ["½ journée", "1 journée", "1,5 journée ou 2 lieux"] },
    { label: "Sujets traités", values: ["3", "6", "10"] },
    { label: "Vidéos principales", values: ["1", "2", "3"] },
    { label: "Shorts verticaux", values: ["5", "10", "15 à 20"] },
    { label: "Créas Ads", values: ["3", "6", "10"] },
    { label: "Posts LinkedIn", values: ["3", "6", "10"] },
    { label: "Articles de blog", values: ["—", "2", "4"] },
    { label: "Citations / visuels", values: ["5", "10", "20"] },
    { label: "Budget Ads inclus", values: ["1 000 €", "1 000 €", "2 000 €"] },
    {
      label: "Suivi et optimisation",
      values: ["30 jours", "30 jours + bilan écrit", "60 jours + reporting mensuel"],
    },
  ],
};

export const campaignThreeMonths: PricingTable = {
  title: "Engagement 3 mois — un seul tournage, 10 % de remise",
  rows: [
    { label: "Total 3 mois HT", values: ["13 665 €", "20 550 €", "27 330 €"] },
    { label: "Soit par mois", values: ["4 555 €", "6 850 €", "9 110 €"] },
    { label: "Économie", values: ["1 185 €", "1 950 €", "2 370 €"] },
    { label: "Tournage unique", values: ["1 jour", "2 jours", "3 jours"] },
    { label: "Sujets traités", values: ["9", "18", "30"] },
    { label: "Vidéos principales", values: ["3", "6", "9"] },
    { label: "Shorts verticaux", values: ["15", "30", "45 à 60"] },
    { label: "Créas Ads", values: ["9", "18", "30"] },
    { label: "Posts LinkedIn", values: ["9", "18", "30"] },
    { label: "Articles de blog", values: ["—", "6", "12"] },
    { label: "Citations / visuels", values: ["15", "30", "60"] },
    {
      label: "Budget Ads inclus (total)",
      values: ["3 000 €", "3 000 €", "6 000 €"],
    },
    {
      label: "Suivi et optimisation",
      values: ["3 mois", "3 mois + bilan mensuel", "3 mois + reporting mensuel"],
    },
  ],
};

export const campaignThreeMonthsOption =
  "Option : mini-tournage d'une demi-journée au mois 3, en supplément, pour actualiser les contenus.";

export const campaignConditions = [
  "Budget Ads inclus et intégralement dépensé en diffusion (ligne distincte du devis).",
  "Budget inclus = minimum recommandé, possibilité d'investir plus directement auprès de la plateforme.",
  "Remise de 10 % sur la production uniquement.",
  "Budget dépensé mois par mois.",
  "Engagement 3 mois ferme.",
  "Paiement mensuel d'avance, premier mois à la signature.",
  "Prix HT.",
];

export const campaignFaq = [
  {
    question: "Faut-il déjà avoir un compte publicitaire ?",
    answer: "Non. Nous lançons et paramétrons les campagnes pour vous.",
  },
  {
    question: "Que devons-nous préparer avant le tournage ?",
    answer:
      "Rien de lourd. Nous définissons les sujets ensemble, vous parlez de ce que vous maîtrisez déjà.",
  },
  {
    question: "Et si nous voulons investir plus en publicité ?",
    answer: "Possible à tout moment, réglé directement à la plateforme.",
  },
  {
    question: "Formule 1 mois ou engagement 3 mois ?",
    answer:
      "L'engagement regroupe la production sur un seul tournage plus important, −10 % sur la production, suivi sur 3 mois.",
  },
  {
    question: "Peut-on actualiser les contenus ?",
    answer: "Oui, mini-tournage d'une demi-journée au mois 3 en option.",
  },
];

export const campaignCta = {
  line: "Un appel de 15 minutes pour cadrer vos sujets et choisir la formule adaptée.",
  tagline: "Arrêtez de produire du contenu au hasard.",
};

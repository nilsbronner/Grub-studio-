import type { Offer } from "@/lib/content/offers";

export const eventOfferIntro = {
  eyebrow: "Offre spéciale",
  hook: "Un reportage pour votre événement, sans y penser à l'avance.",
  description:
    "Soirée, inauguration, conférence, salon, temps fort d'entreprise : on capte l'instant, en photo ou en vidéo, prêt à partager dans la foulée.",
};

/** Two confirmed price points from the brief (500€ entry, 2 900€ HT top tier with photo+vidéo duo) — exact mid-range pricing is cadré au contact, not fabricated here. */
export const eventOffers: Offer[] = [
  {
    slug: "reportage-demi-journee",
    title: "Reportage — demi-journée",
    description:
      "Un format court pour capter l'essentiel : un événement, un moment de vie d'entreprise, un portrait. Livrables prêts à partager dès le lendemain.",
    includes: [
      "Un photographe ou un vidéaste",
      "Une demi-journée de captation",
      "Livrables prêts à partager",
    ],
    price: "500 €",
    priceNote: "HT",
    ctaLabel: "Réserver mon reportage",
  },
  {
    slug: "reportage-journee-complete",
    title: "Reportage — journée complète",
    description:
      "La couverture complète de votre événement : photographe et vidéaste ensemble, du début à la fin de la journée.",
    includes: [
      "Un photographe et un vidéaste",
      "Une journée complète de captation",
      "Photos et vidéo livrées",
    ],
    price: "2 900 €",
    priceNote: "HT, la journée",
    ctaLabel: "Réserver mon reportage",
  },
];

export const eventOfferNote =
  "Le tarif exact dépend de la durée, du lieu et des livrables souhaités — on cadre ça ensemble avant de chiffrer.";

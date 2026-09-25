export type Offer = {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  price: string;
  priceNote: string;
};

export const offers: Offer[] = [
  {
    slug: "tournage-5-shorts",
    title: "Pack Shorts — 5 vidéos verticales en 5 jours",
    description:
      "Vous passez 1 h dans notre studio, on s'occupe du reste : montage, rythme, formats prêts pour Reels, TikTok et Shorts. Idéal pour lancer ou relancer vos réseaux.",
    includes: [
      "1 tournage en studio",
      "5 shorts montés",
      "Formats verticaux prêts pour les réseaux",
      "1h de tournage",
      "4h de post-production",
      "Livraison sous 5 jours",
    ],
    price: "500 €",
    priceNote: "HT",
  },
];

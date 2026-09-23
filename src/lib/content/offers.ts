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
    title: "Tournage en studio — 5 shorts",
    description:
      "Une session de tournage clé en main dans notre studio, pensée pour produire rapidement une série de contenus courts prêts à diffuser.",
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

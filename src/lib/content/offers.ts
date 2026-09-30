export type Offer = {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  price: string;
  priceNote: string;
  /** Defaults to "Réserver mon tournage" if omitted. */
  ctaLabel?: string;
  /** Defaults to "/contact" if omitted. */
  ctaHref?: string;
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
    price: "500 €",
    priceNote: "HT",
  },
  {
    slug: "grub-conseil",
    title: "Grub Conseil",
    description:
      "Un audit gratuit sur le sujet de votre choix, avec les recommandations de Nils Bronner.",
    includes: [
      "Vous remplissez le formulaire",
      "Nils étudie votre situation",
      "Vous recevez vos recommandations",
    ],
    price: "Gratuit",
    priceNote: "sans engagement",
    ctaLabel: "Demander mon audit",
    ctaHref: "/conseil",
  },
  {
    slug: "sur-devis",
    title: "Sur devis",
    description:
      "Spot pub, film de marque, aftermovie, reportage, motion design, photo — un projet sur-mesure, cadré avec vous avant de chiffrer.",
    includes: [
      "Note d'intention après le cadrage",
      "Scénario validé avant tournage",
      "2 allers-retours de modifications inclus",
    ],
    price: "Sur devis",
    priceNote: "sur-mesure",
    ctaLabel: "Discuter du projet",
    ctaHref: "/contact",
  },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  /** "À partir de [x] € HT" — omit to hide the price line. */
  priceFrom?: string;
};

export const videoServices: Service[] = [
  {
    slug: "spot-pub",
    title: "Spot publicitaire",
    description:
      "Un film court et percutant pour vos campagnes TV, web ou salon.",
  },
  {
    slug: "ads",
    title: "Campagnes digitales / Ads",
    description:
      "Des créas pensées pour la performance, testées et déclinées en variantes.",
  },
  {
    slug: "shorts",
    title: "Contenu réseaux (shorts)",
    description:
      "Des vidéos verticales rythmées, pensées pour arrêter le scroll.",
    priceFrom: "500 €",
  },
  {
    slug: "aftermovie",
    title: "Aftermovie",
    description:
      "Votre événement résumé en 1 à 2 min, prêt à partager le lendemain.",
  },
  {
    slug: "reportage",
    title: "Reportage vidéo",
    description:
      "Votre savoir-faire filmé sur le terrain, sans mise en scène artificielle.",
  },
  {
    slug: "interview",
    title: "Interview",
    description:
      "Vos dirigeants, équipes ou clients face caméra, pour parler vrai.",
  },
  {
    slug: "podcast",
    title: "Podcast vidéo",
    description:
      "Plateau multicam clé en main au Grub, de la captation au montage.",
  },
  {
    slug: "motion-design",
    title: "Motion design",
    description:
      "Expliquer un produit ou un chiffre complexe en 60 secondes.",
  },
];

export const photoServices: Service[] = [
  {
    slug: "photo-portrait",
    title: "Portraits professionnels",
    description:
      "Des portraits d'équipe cohérents, pour votre site et LinkedIn.",
  },
  {
    slug: "photo-entreprise",
    title: "Reportage d'entreprise",
    description:
      "Vos locaux, vos équipes, vos coulisses, en images qui inspirent confiance.",
  },
  {
    slug: "photo-produit",
    title: "Produits & packshots",
    description:
      "Des visuels produits nets, en studio ou en situation.",
  },
  {
    slug: "photo-evenementiel",
    title: "Événementiel (photo)",
    description:
      "Les moments forts de votre événement, livrés sous [48 h].",
  },
];

export type Highlight = {
  title: string;
  description: string;
};

export const homeHighlights: Highlight[] = [
  {
    title: "Films de marque",
    description: "Une histoire, une équipe, un film qui la raconte vraiment.",
  },
  {
    title: "Contenu réseaux",
    description: "Du vertical rythmé, pensé pour le scroll — pas pour la télé.",
  },
  {
    title: "Événementiel",
    description: "L'énergie de vos temps forts, prête à être partagée.",
  },
  {
    title: "Photo d'entreprise",
    description: "Vos équipes et vos coulisses, en images qui inspirent confiance.",
  },
];

export const diffusionFormats = {
  intro:
    "Un seul tournage, plusieurs contenus : un format principal décliné en versions cibles, puis en shorts — chaque diffusion pense son propre format.",
  formats: [
    {
      ratio: "16:9",
      label: "Horizontal",
      usage: "YouTube, Facebook, site web",
    },
    {
      ratio: "1:1",
      label: "Carré",
      usage: "Instagram, LinkedIn, X",
    },
    {
      ratio: "9:16",
      label: "Vertical",
      usage: "Shorts, Reels, TikTok",
    },
  ],
};

export type Service = {
  slug: string;
  title: string;
  description: string;
};

export const videoServices: Service[] = [
  {
    slug: "spot-pub",
    title: "Spot publicitaire",
    description:
      "Un film qui porte votre message et se souvient de votre marque, du concept au montage final.",
  },
  {
    slug: "ads",
    title: "Campagnes digitales / ADS",
    description:
      "Des formats pensés pour arrêter le scroll et servir vos objectifs de campagne, plateforme par plateforme.",
  },
  {
    slug: "shorts",
    title: "Contenu réseaux (shorts)",
    description:
      "Du vertical rythmé, tourné et monté pour les réseaux — pas des extraits recadrés d'un format télé.",
  },
  {
    slug: "aftermovie",
    title: "Aftermovie",
    description:
      "L'énergie de votre événement condensée en deux minutes, prête à être partagée dès le lendemain.",
  },
  {
    slug: "reportage",
    title: "Reportage vidéo",
    description:
      "Vos équipes, vos métiers, vos coulisses — racontés avec justesse, sans mise en scène artificielle.",
  },
  {
    slug: "interview",
    title: "Interview",
    description:
      "Une prise de parole cadrée et éclairée, qui donne du poids à ce que dit votre intervenant.",
  },
  {
    slug: "podcast",
    title: "Podcast vidéo",
    description:
      "Vos échanges filmés et montés pour exister au-delà de l'antenne, sur tous les formats.",
  },
  {
    slug: "motion-design",
    title: "Motion design",
    description:
      "Des idées et des chiffres complexes rendus limpides en mouvement, en habillage ou en explainer.",
  },
];

export const photoServices: Service[] = [
  {
    slug: "photo-portrait",
    title: "Portraits professionnels",
    description:
      "Des visages qui inspirent confiance sur un site ou un profil, sans la raideur d'un studio classique.",
  },
  {
    slug: "photo-entreprise",
    title: "Reportage d'entreprise",
    description:
      "Une immersion dans votre activité pour montrer vos métiers, vos équipes et vos coulisses en images.",
  },
  {
    slug: "photo-produit",
    title: "Produits & packshots",
    description:
      "Des visuels produit nets et précis, prêts pour le site, la fiche produit ou la campagne publicitaire.",
  },
  {
    slug: "photo-evenementiel",
    title: "Événementiel",
    description:
      "Chaque instant clé capté sans jamais se faire remarquer, pour un souvenir fidèle de l'événement.",
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

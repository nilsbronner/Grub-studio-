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
      "Conception et production d'un spot vidéo pour promouvoir un produit, un service ou une marque.",
  },
  {
    slug: "ads",
    title: "Campagnes digitales / ADS",
    description:
      "Création de formats vidéo adaptés aux plateformes pour accompagner des campagnes en ligne.",
  },
  {
    slug: "shorts",
    title: "Contenu réseaux sociaux (shorts)",
    description:
      "Vidéos courtes pensées pour une diffusion sur les réseaux sociaux.",
  },
  {
    slug: "aftermovie",
    title: "Aftermovie",
    description:
      "Captation et montage des moments clés d'un événement sous forme de résumé vidéo.",
  },
  {
    slug: "reportage",
    title: "Reportage vidéo",
    description:
      "Documentation d'une activité, d'un lieu ou d'un projet à travers images et témoignages.",
  },
  {
    slug: "interview",
    title: "Interview",
    description:
      "Enregistrement et mise en forme de la prise de parole d'un intervenant face caméra.",
  },
  {
    slug: "podcast",
    title: "Podcast vidéo",
    description:
      "Tournage et montage d'un échange ou d'une discussion en format podcast vidéo.",
  },
  {
    slug: "motion-design",
    title: "Motion design",
    description:
      "Création d'animations graphiques pour illustrer ou expliquer un message.",
  },
];

export const photoServices: Service[] = [
  {
    slug: "photo-portrait",
    title: "Portraits professionnels",
    description:
      "Portraits naturels et soignés pour présenter équipes, dirigeants ou marque personnelle.",
  },
  {
    slug: "photo-entreprise",
    title: "Reportage d'entreprise",
    description:
      "Immersion dans l'activité pour mettre en lumière métiers, équipes et coulisses.",
  },
  {
    slug: "photo-produit",
    title: "Produits & packshots",
    description:
      "Photographies produit pour supports commerciaux, site internet et campagnes publicitaires.",
  },
  {
    slug: "photo-evenementiel",
    title: "Événementiel",
    description: "Couverture photographique d'événements.",
  },
];

export const diffusionFormats = {
  intro:
    "Un tournage = plusieurs contenus déclinés (spot principal → formats cibles → shorts), un format par usage.",
  formats: [
    {
      ratio: "16:9",
      label: "Horizontal",
      usage: "YouTube, Facebook, site",
    },
    {
      ratio: "1:1",
      label: "Carré",
      usage: "Instagram, LinkedIn, X",
    },
    {
      ratio: "9:16",
      label: "Vertical",
      usage: "Shorts, TikTok",
    },
  ],
};

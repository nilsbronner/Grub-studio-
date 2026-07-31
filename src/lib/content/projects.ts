export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectCredit = {
  role: string;
  name: string;
};

export type Project = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  hook: string;
  categories: string[];
  context: string;
  deliverables: string[];
  stats?: ProjectStat[];
  credits?: ProjectCredit[];
  /** Vimeo/Mux embed id — leave undefined until real footage is delivered. */
  vimeoId?: string;
  /** Still frame used as poster/tile background, from the deck until real Vimeo footage is wired in. */
  image?: string;
  /** Accent used for the placeholder tile gradient when no image/footage is set. */
  accent: string;
  featuredHome?: boolean;
};

export const projects: Project[] = [
  {
    slug: "once-upon-a-dime",
    client: "Once Upon a Dime",
    sector: "Experts-comptables",
    title: "Film de marque immersif & contenu multi-formats",
    hook:
      "Un film de marque ambitieux pour raconter l'histoire des fondateurs.",
    categories: ["spot-pub", "interview", "shorts"],
    context:
      "Film de marque avec acteur professionnel, décor sur-mesure et équipe de 15 personnes, retraçant l'histoire des fondateurs. Interviews CEO et collaborateurs déclinées en contenus courts. Production pensée multi-usage : branding, RH, RSE, offres, LinkedIn.",
    deliverables: [
      "Film principal",
      "Interviews",
      "Shorts / reels",
      "Contenus social media",
    ],
    stats: [
      { label: "Tournage", value: "2 jours" },
      { label: "Spot pub", value: "1" },
      { label: "Vidéos", value: "30" },
      { label: "Photos", value: "500" },
    ],
    accent: "#c9622f",
    image: "/images/projects/once-upon-a-dime.jpg",
    featuredHome: true,
  },
  {
    slug: "squarea",
    client: "Squarea",
    sector: "Marque e-commerce",
    title: "Stratégie contenu & ADS sur le long terme",
    hook: "Cinq ans d'accompagnement vidéo et photo continu.",
    categories: ["ads", "interview", "photo-produit"],
    context:
      "Accompagnement global depuis 5 ans. Interviews de 15 clients pour crédibilité et preuve sociale. Production de contenus pour le site, les réseaux et les campagnes ads. Shooting produit lifestyle et packshots studio.",
    deliverables: [
      "Témoignages vidéo",
      "Contenus social",
      "Créas ads",
      "Visuels produit",
    ],
    stats: [
      { label: "Durée campagne", value: "5 mois" },
      { label: "CPC", value: "0,70 €" },
      { label: "Leads", value: "51" },
      { label: "CPL", value: "89 €" },
      { label: "Panier moyen", value: "7 000 €" },
    ],
    accent: "#2f6b5e",
    image: "/images/projects/squarea.jpg",
    featuredHome: true,
  },
  {
    slug: "hollys-diner",
    client: "Holly's Diner",
    sector: "Restaurant, 260+ couverts",
    title: "Lancement & activation 360° (contenu + social + ads)",
    hook: "Une campagne d'inauguration pensée comme un lancement média.",
    categories: ["aftermovie", "ads", "shorts", "photo-evenementiel"],
    context:
      "Stratégie de lancement et campagne d'inauguration. Campagne teaser et organisation d'un événement avec relais presse (influenceurs et médias). Production de l'aftermovie et de contenus réseaux, dont TikTok. Community management et stratégie ads.",
    deliverables: [
      "Teasers",
      "Aftermovie",
      "Contenus social",
      "Photos food",
      "Campagnes ads",
    ],
    stats: [
      { label: "CPC campagne", value: "0,05 €" },
      { label: "Influenceurs", value: "20" },
      { label: "Vues", value: "350 K" },
      { label: "Avis clients (1 weekend)", value: "600+" },
      { label: "Médias relais", value: "10" },
    ],
    accent: "#b8933a",
    image: "/images/projects/hollys-diner.jpg",
    featuredHome: true,
  },
  {
    slug: "myfood",
    client: "MyFood",
    sector: "Start-up green-tech",
    title: "Contenu européen & campagne crowdfunding",
    hook: "Huit interviews à travers l'Europe pour une levée à 1 M€.",
    categories: ["interview", "ads"],
    context:
      "Huit interviews tournées à travers l'Europe, en français et en allemand. Vidéos Kickstarter conçues pour soutenir la campagne et la conversion. Création d'une base vidéo pour alimenter les creative ads dans la durée. Production pensée pour le brand, le social et l'acquisition.",
    deliverables: [
      "Interviews FR/DE",
      "Vidéo crowdfunding",
      "Base de creative ads",
    ],
    stats: [
      { label: "Levée de fonds", value: "1 M€" },
      { label: "Leads (contenu ads)", value: "7 193" },
    ],
    accent: "#3a5f8f",
    image: "/images/projects/myfood.jpg",
    featuredHome: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featuredHome);
}

export function getProjectsByCategory(category?: string): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.categories.includes(category));
}

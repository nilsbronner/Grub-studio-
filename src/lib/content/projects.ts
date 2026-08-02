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
  /** SEO keywords for this project's page metadata. */
  keywords?: string[];
  /** Indicative price shown on the project page. Omit for Bemotion showreels. */
  price?: string;
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
    vimeoId: "1173949481",
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
    vimeoId: "1214544969",
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
    vimeoId: "1214545694",
    featuredHome: true,
  },
  {
    slug: "showreel-2024",
    client: "Bemotion",
    sector: "Showreel",
    title: "Showreel 2024",
    hook: "Une sélection de plans tournés pour plusieurs clients au cours de l'année.",
    categories: ["spot-pub", "aftermovie", "reportage"],
    context:
      "Best-of 2024 : une sélection de séquences issues de tournages réalisés pour différents clients, pensée comme carte de visite du studio.",
    deliverables: ["Showreel"],
    accent: "#7a4dc9",
    vimeoId: "1214532172",
    featuredHome: true,
  },
  {
    slug: "showreel-motion",
    client: "Bemotion",
    sector: "Motion design",
    title: "Showreel Motion",
    hook: "Une sélection d'animations et d'habillages graphiques.",
    categories: ["motion-design"],
    context:
      "Sélection de créations motion design : animations graphiques, habillages et éléments d'explication produits pour différents formats de diffusion.",
    deliverables: ["Showreel"],
    accent: "#1f9e8f",
    vimeoId: "1214532210",
  },
  {
    slug: "showreel-immobilier",
    client: "Bemotion",
    sector: "Immobilier",
    title: "Showreel Immobilier",
    hook: "Production vidéo pensée pour les acteurs de l'immobilier.",
    categories: ["spot-pub", "reportage"],
    context:
      "Sélection de tournages réalisés pour des acteurs de l'immobilier : mise en valeur de biens, de programmes et de promoteurs.",
    deliverables: ["Showreel"],
    accent: "#a3762f",
    vimeoId: "1214532347",
    featuredHome: true,
  },
  {
    slug: "showreel-teambuilding",
    client: "Bemotion",
    sector: "Événementiel",
    title: "Showreel Teambuilding",
    hook: "Captation d'un événement d'entreprise et de teambuilding.",
    categories: ["aftermovie", "photo-evenementiel"],
    context:
      "Captation et montage d'un événement de teambuilding pour un partenaire entreprise : ambiance, activités et moments clés de la journée.",
    deliverables: ["Aftermovie"],
    accent: "#c94d6b",
    vimeoId: "1214532696",
  },
  {
    slug: "spot-pub-showreel",
    client: "Bemotion",
    sector: "Spot publicitaire",
    title: "Spot",
    hook: "Sélection de spots publicitaires produits pour des marques.",
    categories: ["spot-pub"],
    context:
      "Sélection de spots publicitaires conçus et produits pour promouvoir des produits, services et marques.",
    deliverables: ["Showreel"],
    accent: "#2f6ba3",
    vimeoId: "1214533714",
    featuredHome: true,
  },
  {
    slug: "once-upon-a-dime-backstage",
    client: "Once Upon a Dime",
    sector: "Coulisses de tournage",
    title: "Coulisses du tournage",
    hook: "Les coulisses du tournage du film de marque.",
    categories: ["spot-pub"],
    context:
      "Images de coulisses captées pendant la production du film de marque Once Upon a Dime.",
    deliverables: ["Backstage"],
    accent: "#c9622f",
    vimeoId: "1173948628",
  },
  {
    slug: "once-upon-a-dime-interviews-collaborateurs",
    client: "Once Upon a Dime",
    sector: "Interviews collaborateurs",
    title: "Interviews des collaborateurs",
    hook: "Les collaborateurs racontent leur quotidien chez Once Upon a Dime.",
    categories: ["interview", "shorts"],
    context:
      "Montage des interviews des collaborateurs, déclinées en contenus courts pour les réseaux et le recrutement.",
    deliverables: ["Interviews", "Shorts"],
    accent: "#c9622f",
    vimeoId: "1173949187",
  },
  {
    slug: "once-upon-a-dime-interview-fondateurs",
    client: "Once Upon a Dime",
    sector: "Interview fondateurs",
    title: "Camille & Emmanuel racontent Once Upon a Dime",
    hook: "Les fondateurs reviennent sur l'histoire de la marque.",
    categories: ["interview"],
    context:
      "Interview des fondateurs Camille et Emmanuel, au cœur du film de marque.",
    deliverables: ["Interview"],
    accent: "#c9622f",
    vimeoId: "1173949279",
  },
  {
    slug: "interview-entreprise",
    client: "Bemotion",
    sector: "Interview",
    title: "Interview entreprise",
    hook: "Prise de parole d'un intervenant face caméra.",
    categories: ["interview"],
    context:
      "Enregistrement et mise en forme de la prise de parole d'un intervenant, pour une communication interne et externe.",
    deliverables: ["Interview"],
    accent: "#6b4d9a",
    vimeoId: "1173949058",
  },
  {
    slug: "showreel-interview",
    client: "Bemotion",
    sector: "Showreel",
    title: "Showreel Interviews",
    hook: "Une sélection d'interviews tournées pour différents clients.",
    categories: ["interview"],
    context:
      "Best-of d'interviews réalisées pour différents clients : prises de parole d'intervenants et de collaborateurs.",
    deliverables: ["Showreel"],
    accent: "#4d7a9a",
    vimeoId: "1173948514",
  },
  {
    slug: "bizz-and-buzz",
    client: "Bizz & Buzz",
    sector: "Événementiel",
    title: "Aftermovie Bizz & Buzz",
    hook: "Captation et montage d'un événement Bizz & Buzz.",
    categories: ["aftermovie", "photo-evenementiel"],
    context:
      "Aftermovie réalisé pour capter l'ambiance et les temps forts de l'événement Bizz & Buzz.",
    deliverables: ["Aftermovie"],
    accent: "#9a4d6b",
    vimeoId: "1214544938",
    featuredHome: true,
  },
  {
    slug: "circuits-sport-auto",
    client: "Bemotion",
    sector: "Sport automobile",
    title: "Circuits Sport Auto",
    hook: "Immersion sur circuit pour un contenu sport automobile.",
    categories: ["reportage", "spot-pub"],
    context: "Production vidéo autour du sport automobile sur circuit.",
    deliverables: ["Vidéo"],
    accent: "#4d9a6b",
    vimeoId: "1214545638",
  },
  {
    slug: "plan-incline",
    client: "Plan incliné de Saint-Louis-Arzviller",
    sector: "Patrimoine / Institution",
    title: "50 ans du Plan incliné",
    hook: "Un film pour célébrer les 50 ans du Plan incliné.",
    categories: ["reportage"],
    context:
      "Film institutionnel réalisé pour les 50 ans du Plan incliné de Saint-Louis-Arzviller.",
    deliverables: ["Film institutionnel"],
    accent: "#2f8f9a",
    vimeoId: "1214545285",
    featuredHome: true,
  },
  {
    slug: "galeries-lafayette-histoire",
    client: "Galeries Lafayette",
    sector: "Grand magasin",
    title: "L'histoire des Galeries Lafayette",
    hook: "Un film retraçant l'histoire et le patrimoine de l'enseigne.",
    categories: ["reportage", "spot-pub"],
    context:
      "Film retraçant l'histoire et le patrimoine des Galeries Lafayette.",
    deliverables: ["Film"],
    accent: "#8f2f5a",
    vimeoId: "1173948552",
    featuredHome: true,
  },
  {
    slug: "skillcamp-interview",
    client: "Skillcamp",
    sector: "Partenaire",
    title: "Interview Skillcamp",
    hook: "Un partenaire Skillcamp prend la parole.",
    categories: ["interview"],
    context: "Interview réalisée avec un intervenant Skillcamp.",
    deliverables: ["Interview"],
    accent: "#2f5a8f",
    vimeoId: "1214546003",
  },
  {
    slug: "mercedes-job-dating",
    client: "Mercedes-Benz",
    sector: "Automobile",
    title: "Job dating Mercedes-Benz",
    hook: "Captation d'un événement de recrutement Mercedes-Benz.",
    categories: ["reportage", "photo-evenementiel"],
    context: "Captation vidéo d'un job dating organisé par Mercedes-Benz.",
    deliverables: ["Reportage vidéo"],
    accent: "#3a3a3a",
    vimeoId: "1214545269",
    featuredHome: true,
  },
  {
    slug: "luigi-pericle",
    client: "Luigi Pericle",
    sector: "Documentaire",
    title: "Luigi Pericle",
    hook: "Un film documentaire sous-titré.",
    categories: ["reportage"],
    context:
      "Production d'un film documentaire, sous-titré pour une diffusion internationale.",
    deliverables: ["Film documentaire"],
    accent: "#9a7a2f",
    vimeoId: "1173948883",
  },
  {
    slug: "once-upon-a-dime-aftermovie",
    client: "Once Upon a Dime",
    sector: "Aftermovie",
    title: "Aftermovie du tournage",
    hook: "Le film de marque, version aftermovie.",
    categories: ["aftermovie", "spot-pub"],
    context:
      "Montage aftermovie du tournage du film de marque Once Upon a Dime.",
    deliverables: ["Aftermovie"],
    accent: "#c9622f",
    vimeoId: "1173949121",
  },
  {
    slug: "libellule",
    client: "Libellule",
    sector: "Spot publicitaire",
    title: "Spot Libellule",
    hook: "Conception et production d'un spot publicitaire.",
    categories: ["spot-pub"],
    context:
      "Spot publicitaire conçu et produit pour promouvoir la marque Libellule.",
    deliverables: ["Spot publicitaire"],
    accent: "#5a8f2f",
    vimeoId: "1214545055",
    featuredHome: true,
  },
  {
    slug: "instinct-vert",
    client: "Instinct Vert",
    sector: "Lancement produit",
    title: "Vidéo de lancement Instinct Vert",
    hook: "Une vidéo pour accompagner un lancement produit.",
    categories: ["spot-pub", "ads"],
    context:
      "Vidéo de lancement produit réalisée pour accompagner la sortie d'une nouvelle offre Instinct Vert.",
    deliverables: ["Vidéo de lancement"],
    accent: "#2f9a5a",
    vimeoId: "1214545033",
    featuredHome: true,
  },
  {
    slug: "sas3b",
    client: "SAS3B",
    sector: "Événementiel",
    title: "Aftermovie SAS3B",
    hook: "Captation et montage d'un événement SAS3B.",
    categories: ["aftermovie", "photo-evenementiel"],
    context: "Aftermovie réalisé pour capter les temps forts de l'événement SAS3B.",
    deliverables: ["Aftermovie"],
    accent: "#9a5a2f",
    vimeoId: "1214544952",
    featuredHome: true,
  },
  {
    slug: "vimersio",
    client: "Vimersio",
    sector: "Technologie",
    title: "Vimersio",
    hook: "Production vidéo pour Vimersio.",
    categories: ["spot-pub", "reportage"],
    context: "Vidéo réalisée pour présenter l'activité de Vimersio.",
    deliverables: ["Vidéo"],
    accent: "#5a2f9a",
    vimeoId: "1173948800",
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

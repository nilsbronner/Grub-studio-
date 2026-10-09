export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectCredit = {
  role: string;
  name: string;
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
};

export type Project = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  hook: string;
  categories: string[];
  /** "L'enjeu" — optional, shown only when set. */
  stake?: string;
  /** "Ce qu'on a fait" — written as flowing sentences, not note-style. */
  context: string;
  deliverables: string[];
  stats?: ProjectStat[];
  credits?: ProjectCredit[];
  /** "Citation client" — optional, shown only when set. */
  testimonial?: ProjectTestimonial;
  /** Vimeo/Mux embed id — leave undefined until real footage is delivered. */
  vimeoId?: string;
  /** Still frame used as poster/tile background, from the deck until real Vimeo footage is wired in. */
  image?: string;
  /** Accent used for the placeholder tile gradient when no image/footage is set. */
  accent: string;
  featuredHome?: boolean;
  /** One of the 14 flagship client case studies — shown in the home carousel and linked from /services. */
  caseStudy?: boolean;
  /** SEO keywords for this project's page metadata. */
  keywords?: string[];
  /** Indicative price shown on the project page. Omit for Grub Studio showreels. */
  price?: string;
};

export const projects: Project[] = [
  {
    slug: "once-upon-a-dime",
    client: "Once Upon a Dime",
    sector: "Experts-comptables",
    title: "Film de marque immersif & contenu multi-formats",
    hook:
      "Un spot publicitaire majeur devenu un temps fort d'entreprise.",
    categories: ["spot-pub", "interview", "shorts"],
    context:
      "Nouvelle identité de marque, nouveaux contenus : un spot publicitaire majeur avec tous les corps de métier mobilisés — direction artistique, script, décoration, équipe complète. Le tournage est devenu un véritable événement interne, les décors sont restés en place dans l'univers de la marque. En déclinaison : petits spots en motion design, interviews marque employeur des dirigeants, backstage et aftermovie — un contenu qui continue d'être exploité dans la durée.",
    deliverables: [
      "Spot publicitaire principal",
      "Déclinaisons motion design",
      "Interviews marque employeur",
      "Backstage & aftermovie",
    ],
    accent: "#c9622f",
    image: "/images/projects/once-upon-a-dime.jpg",
    vimeoId: "1173949481",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "squarea",
    client: "Squarea",
    sector: "Marque e-commerce",
    title: "Stratégie contenu & Ads sur le long terme",
    hook: "Depuis 2019, photo, vidéo et Ads pour chaque étape du produit.",
    categories: ["ads", "interview", "photo-produit"],
    context:
      "Accompagnement continu depuis 2019 : photos et vidéos produit, tous les tutoriels d'utilisation, de maintenance, de manutention et de réparation. Puis des campagnes Meta Ads, des publicités virales et des formats institutionnels — trois ans de campagnes construites ensemble.",
    deliverables: [
      "Photos & vidéos produit",
      "Tutoriels",
      "Créas Ads",
      "Formats institutionnels",
    ],
    accent: "#2f6b5e",
    vimeoId: "1098155108",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "hollys-diner",
    client: "Holly's Diner",
    sector: "Restaurant, 260+ couverts",
    title: "Lancement & activation 360° (contenu + social + ads)",
    hook: "Faire d'une ouverture de restaurant un événement média.",
    categories: ["aftermovie", "ads", "shorts", "photo-evenementiel"],
    stake:
      "Remplir 260 couverts dès l'ouverture, sans notoriété préalable.",
    context:
      "Communication lancée en amont de l'ouverture, puis activation événementielle complète : soirée inaugurale et soirées RP, vidéo principale, teasers, gros reportage sur deux jours. Campagnes Meta Ads et TikTok Ads, avec une community manager placée en interne. Livrables pensés pour durer : vidéos publicitaires, marque employeur, institutionnelles, storytelling, reportage et photos de la carte.",
    deliverables: [
      "Teasers & vidéo principale",
      "Reportage 2 jours",
      "Campagnes Ads (Meta, TikTok)",
      "Photos food & carte",
    ],
    accent: "#b8933a",
    image: "/images/projects/hollys-diner.jpg",
    vimeoId: "1214544969",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "myfood",
    client: "MyFood",
    sector: "Start-up green-tech",
    title: "Contenu européen & campagnes crowdfunding",
    hook: "Des interviews aux quatre coins de l'Europe, chaque année depuis 3 ans.",
    categories: ["interview", "ads"],
    context:
      "Client fidèle depuis plus de 3 ans. Chaque année, au minimum 8 interviews clients en France et en Allemagne, en formats mi-longs — témoignages et anecdotes sur le produit et ses usages. Deux campagnes de crowdfunding accompagnées, avec des vidéos dédiées pour la conversion. L'équipe interne réutilise ensuite les contenus à l'infini : capsules, publicités, tutoriels.",
    deliverables: [
      "Interviews FR/DE",
      "Vidéos crowdfunding",
      "Base de contenus réutilisable",
    ],
    accent: "#3a5f8f",
    image: "/images/projects/myfood.jpg",
    vimeoId: "1214545694",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "strasbourg-esport-days",
    client: "Strasbourg Esport Days",
    sector: "Événementiel · Esport",
    title: "Tout le contenu de l'événement, depuis la première édition",
    hook: "Du Media Day aux spots sponsors, saison après saison.",
    categories: ["ads", "shorts", "reportage"],
    context:
      "Volet événementiel de l'équipe esport, accompagné depuis la première édition : photos, vidéos, identité graphique et motion design. Chaque saison, un Media Day, du contenu viral et institutionnel, des visuels pour les decks, Twitch, Wikipédia et les sponsors, ainsi que des spots et des ads dédiés aux marques partenaires. Un événement créé de toutes pièces, suivi de contenus de remerciement pour les partenaires.",
    deliverables: [
      "Media Day & contenu viral",
      "Identité graphique & motion design",
      "Spots sponsors",
      "Visuels Twitch / decks / sponsors",
    ],
    accent: "#e0483f",
    featuredHome: true,
    caseStudy: true,
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
    client: "Galeries Lafayette Strasbourg",
    sector: "Grand magasin",
    title: "Cinq ans de reportages, jusqu'au film des 100 ans",
    hook: "Une dizaine de reportages par an, puis le film des 100 ans du magasin.",
    categories: ["reportage", "spot-pub"],
    context:
      "Cinq ans d'accompagnement : une dizaine de reportages photo et vidéo événementiels chaque année, puis des courts-métrages, des films institutionnels et des reportages plus ambitieux — jusqu'à la vidéo des 100 ans du magasin, tournée avec témoignages et dispositifs sur place.",
    deliverables: [
      "Reportages événementiels annuels",
      "Films institutionnels",
      "Film des 100 ans",
    ],
    accent: "#8f2f5a",
    vimeoId: "1173948552",
    featuredHome: true,
    caseStudy: true,
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
    slug: "instant-vert",
    client: "Instant Vert",
    sector: "Start-up",
    title: "Un spot de lancement, entièrement en stock footage",
    hook: "Un lancement produit tourné sans tourner : 100 % stock footage.",
    categories: ["spot-pub", "ads"],
    context:
      "Spot de lancement conçu entièrement à partir de stock footage — la saison de tournage voulue n'était plus possible. Script, recherche d'images, découpage technique, montage et voix off produits en interne, avec des plans du produit tournés en studio.",
    deliverables: [
      "Spot de lancement",
      "Script & découpage",
      "Voix off",
      "Plans produit studio",
    ],
    accent: "#2f9a5a",
    vimeoId: "1214545033",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "sas3b",
    client: "SAS 3B",
    sector: "Immobilier / BTP",
    title: "Six ans de reportages chantiers, du lancement à la livraison",
    hook: "Des photos de chantier aux événements de livraison.",
    categories: ["aftermovie", "photo-evenementiel"],
    context:
      "Plus de 6 ans d'accompagnement : reportages photo de chantiers, du lancement à la livraison, puis reportages photo et vidéo événementiels pour chaque livraison et les temps forts de l'entreprise.",
    deliverables: [
      "Reportages chantiers",
      "Reportages de livraison",
      "Photo & vidéo événementielle",
    ],
    accent: "#9a5a2f",
    vimeoId: "1214544952",
    featuredHome: true,
    caseStudy: true,
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
  {
    slug: "showreel-immobilier",
    client: "Promotion immobilière — spot pub",
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
    slug: "showreel-interview",
    client: "Showreel interviews",
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
    slug: "showreel-2024",
    client: "Grub Showreel",
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
    client: "Grub Motion",
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
    slug: "showreel-teambuilding",
    client: "Grub Teambuilding",
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
    client: "Grub Spot Pub",
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
    slug: "interview-entreprise",
    client: "Grub Interview",
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
    slug: "circuits-sport-auto",
    client: "Grub Sport Auto",
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
    slug: "alsace-habitat",
    client: "Alsace Habitat",
    sector: "Bailleur social",
    title: "Reportages institutionnels sur plusieurs années",
    hook: "Les temps forts de l'entreprise, documentés année après année.",
    categories: ["reportage", "photo-evenementiel"],
    context:
      "Accompagnement pluriannuel : reportages de tous les événements internes, poses de première pierre, livraisons de chantier et discours officiels.",
    deliverables: [
      "Reportages événementiels",
      "Captation de discours",
      "Photo & vidéo",
    ],
    accent: "#4a7a5c",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "atelier-hammaecher-sipion",
    client: "Atelier Hammaecher Sipion",
    sector: "Bijouterie",
    title: "Catalogues et contenus produit, année après année",
    hook: "Un catalogue bijoux par an, et des contenus qui durent.",
    categories: ["photo-produit", "reportage"],
    context:
      "Un catalogue produit par an, des photos de mise en situation avec décors, des vidéos de création et de livraison, ainsi que des showreels produits — une base de contenus qui continue d'alimenter le site des années après le tournage.",
    deliverables: [
      "Catalogue produit annuel",
      "Photos de mise en situation",
      "Vidéos de création & livraison",
      "Showreel produits",
    ],
    accent: "#b8793a",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "herbapac",
    client: "Herbapac",
    sector: "Agroalimentaire",
    title: "La chaîne de production, du thé brut au sachet",
    hook: "Un motion design intégré aux locaux pour suivre la production.",
    categories: ["motion-design", "reportage"],
    context:
      "Vidéo avec motion design intégré dans les locaux, en tracking, pour montrer toute la chaîne de production : du thé brut jusqu'au sachet prêt à livrer ou à mettre en rayon.",
    deliverables: ["Vidéo avec motion design", "Tournage en tracking"],
    accent: "#2f9a7a",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "cft",
    client: "CFT",
    sector: "Comptoir Français du Thé",
    title: "Nouvelle vidéo promotionnelle du système de vente",
    hook: "Une vidéo pour présenter leur système et leurs produits.",
    categories: ["spot-pub"],
    context:
      "Nouvelle vidéo promotionnelle pour présenter le système et la façon de vendre du Comptoir Français du Thé, avec leurs différents types de produits.",
    deliverables: ["Vidéo promotionnelle"],
    accent: "#8a6b3a",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "maison-rouge",
    client: "Hôtel de la Maison Rouge",
    sector: "Hôtellerie",
    title: "Un tour operateur pour promouvoir l'hôtel dans le monde",
    hook: "Reportage événementiel et vidéo tour operateur, pour particuliers et professionnels.",
    categories: ["reportage", "photo-evenementiel"],
    context:
      "Reportage photo et vidéo événementiel, puis une vidéo tour operateur pensée pour deux publics — particuliers et professionnels — afin de promouvoir l'hôtel à l'international.",
    deliverables: ["Reportage événementiel", "Vidéo tour operateur"],
    accent: "#7a3a4a",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "sofitel-strasbourg",
    client: "Sofitel Strasbourg Grande Île",
    sector: "Hôtellerie",
    title: "Reportage photo et vidéo",
    hook: "De nouvelles photos et un reportage vidéo pour le site de l'hôtel.",
    categories: ["reportage", "photo-evenementiel"],
    context:
      "Reportage photo et vidéo, avec de nouvelles photos produites pour le site de l'hôtel.",
    deliverables: ["Reportage photo", "Reportage vidéo"],
    accent: "#3a6b9a",
    featuredHome: true,
    caseStudy: true,
  },
  {
    slug: "s-automobile",
    client: "S-Automobile",
    sector: "Automobile",
    title: "Trois spots publicitaires, tous formats et médias",
    hook: "Script, casting, tournage et montage — jusqu'à la radio.",
    categories: ["spot-pub"],
    context:
      "Trois spots publicitaires produits de A à Z : script, constitution d'équipe, tournage, montage et direction de comédiens. Déclinés sur tous les formats et tous les médias, jusqu'à l'audio pour la radio.",
    deliverables: [
      "3 spots publicitaires",
      "Direction de comédiens",
      "Déclinaison radio",
    ],
    accent: "#4a4a8a",
    featuredHome: true,
    caseStudy: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudies(): Project[] {
  return projects.filter((p) => p.caseStudy);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featuredHome);
}

export function getProjectsByCategory(category?: string): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.categories.includes(category));
}

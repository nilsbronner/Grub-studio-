export type ProductionFaq = {
  question: string;
  answer: string;
};

export type ProductionPage = {
  slug: string;
  /** Short label for nav/footer links. */
  navLabel: string;
  /** <title> tag and metadata title. */
  title: string;
  /** Page H1 — can differ slightly from `title` for a more natural heading. */
  h1: string;
  /** Meta description, ~150-155 chars. */
  description: string;
  keywords: string[];
  /** Eyebrow pill text above the H1. */
  kicker: string;
  /** Intro/body paragraphs — the page's main SEO copy. */
  intro: string[];
  /** schema.org Service.serviceType. */
  serviceType: string;
  /** 3 linked case slugs (from projects.ts) — the first one backs the hero video/photo facade. */
  cases: string[];
  faq: ProductionFaq[];
  /** Also surface a /rush link alongside /contact (reportage is Grub's fast-turnaround offer). */
  linkToRush?: boolean;
  /** ISO date of last real content change — drives sitemap lastmod. */
  updatedAt?: string;
};

export const productionPages: ProductionPage[] = [
  {
    slug: "reportage-evenementiel",
    navLabel: "Reportage événementiel",
    title: "Reportage photo & vidéo événementiel à Strasbourg",
    h1: "Reportage photo & vidéo événementiel",
    description:
      "Reportage photo et vidéo pour vos événements d'entreprise à Strasbourg et en Alsace : soirées, inaugurations, séminaires, salons. Livraison rapide, dès 500 € HT.",
    keywords: [
      "reportage événementiel Strasbourg",
      "photographe événement entreprise Alsace",
      "aftermovie Strasbourg",
      "captation vidéo événement professionnel",
    ],
    kicker: "Reportage",
    intro: [
      "Un événement d'entreprise se joue une fois : la soirée de lancement, l'inauguration, le séminaire annuel, le salon professionnel. Ce qui s'y passe — les visages, l'énergie, les discours, les réactions — ne se refait pas le lendemain. Le reportage photo et vidéo événementiel consiste à capter tout ça sur le vif, sans mise en scène artificielle, puis à en tirer des contenus que vous pourrez réellement utiliser : un aftermovie pour relancer l'intérêt dans les jours qui suivent, des photos pour la presse et les réseaux, parfois une vidéo plus longue pour les partenaires ou les investisseurs qui n'étaient pas là.",
      "Sur le terrain, on travaille en équipe légère et mobile — un ou deux opérateurs photo et vidéo selon la taille de l'événement — pour rester discret sans rien manquer : le discours d'ouverture, les échanges informels, les temps forts qui se décident en une seconde. On connaît les lieux et les formats de l'événementiel strasbourgeois, des salles de réception du centre-ville aux halls d'exposition du Parc des Expositions, et on s'adapte à la lumière et au bruit de chaque endroit plutôt que d'imposer un dispositif figé.",
      "Après le tournage, le montage suit le rythme de l'actualité de votre marque : un aftermovie d'une à deux minutes est généralement livré sous 48 heures, pour être partagé pendant que l'événement est encore dans les conversations. Les photos retouchées suivent la même logique de délai court. Pour un reportage plus large — plusieurs jours, plusieurs lieux, un livrable plus institutionnel — on construit un calendrier de livraison adapté, avec des points d'étape si besoin.",
      "C'est aussi le format qu'on recommande pour tester une collaboration avec Grub Studio : une journée de reportage, un livrable concret et rapide, un budget contenu. Beaucoup de nos accompagnements au long cours — sur plusieurs années, avec plusieurs reportages par saison — ont commencé par ce premier tournage.",
    ],
    serviceType: "Reportage événementiel vidéo et photo",
    cases: ["hollys-diner", "maison-rouge", "strasbourg-esport-days"],
    faq: [
      {
        question: "Combien coûte un reportage événementiel ?",
        answer:
          "Le reportage photo et vidéo démarre à 500 € HT pour une demi-journée avec un aftermovie court. Le tarif dépend ensuite de la durée de présence sur place, du nombre d'opérateurs et des livrables demandés (aftermovie, photos retouchées, vidéo longue) — on vous envoie un devis précis après un rapide échange sur votre événement.",
      },
      {
        question: "En combien de temps recevons-nous les contenus ?",
        answer:
          "Un aftermovie et les premières photos retouchées sont généralement livrés sous 48 heures, pour que vous puissiez communiquer pendant que l'événement est encore d'actualité. Les délais pour un reportage plus long (plusieurs jours, plusieurs livrables) sont définis ensemble en amont.",
      },
      {
        question: "Intervenez-vous seulement à Strasbourg ?",
        answer:
          "Le studio est basé à Strasbourg et la majorité de nos reportages se déroulent en Alsace et dans le Grand Est, mais on se déplace partout en France pour les projets qui le demandent — c'est notamment le cas des interviews multi-sites.",
      },
      {
        question: "Faut-il un gros événement pour justifier un reportage ?",
        answer:
          "Non. On couvre aussi bien une soirée de 30 personnes qu'un salon sur plusieurs jours. Le format reportage s'adapte au budget et à l'ampleur de l'événement — c'est souvent la première prestation qu'on réalise avec un nouveau client, avant un accompagnement plus régulier.",
      },
    ],
    linkToRush: true,
    updatedAt: "2026-10-23",
  },
  {
    slug: "interview-temoignage",
    navLabel: "Interview & témoignage",
    title: "Vidéo d'interview & témoignage client à Strasbourg",
    h1: "Interview & vidéo témoignage",
    description:
      "Interviews de dirigeants, équipes et clients, tournées à Strasbourg ou sur vos sites en France : marque employeur, témoignages clients, contenus institutionnels.",
    keywords: [
      "vidéo interview entreprise Strasbourg",
      "témoignage client vidéo Alsace",
      "interview dirigeant vidéo",
      "vidéo marque employeur",
    ],
    kicker: "Interview",
    intro: [
      "Une interview filmée réussie ne ressemble pas à un oral récité face caméra. Elle demande de mettre la personne interviewée à l'aise avant de commencer à tourner, de poser les bonnes questions dans le bon ordre, et de monter ensuite pour garder ce qui sonne vrai — les hésitations utiles, les formulations spontanées — plutôt que la version la plus lisse. C'est cette approche qu'on applique que ce soit pour un témoignage client qui doit convaincre, une interview de dirigeant pour une campagne de marque employeur, ou le portrait d'une équipe pour raconter un savoir-faire.",
      "En amont du tournage, on prépare un fil d'interview avec vous : les messages qu'on veut faire ressortir, les questions qui les amènent naturellement, le ton souhaité. Sur place, l'équipe reste réduite pour ne pas intimider la personne filmée, avec un éclairage et un son soignés même en décor naturel — vos bureaux, votre atelier, le lieu qui raconte le mieux votre activité plutôt qu'un studio neutre.",
      "On a aussi l'habitude des interviews multi-sites et multilingues : plusieurs intervenants filmés à des dates et des endroits différents, parfois dans des langues différentes, pour un même projet — une configuration fréquente sur les campagnes de crowdfunding ou les contenus de marque qui doivent parler à plusieurs pays à la fois. Chaque interview est ensuite déclinée au format qui lui correspond : une version longue pour le site ou une présentation interne, des extraits courts pour les réseaux, des sous-titres pour une diffusion sans son.",
      "Le résultat est pensé pour durer : une bonne interview continue de servir plusieurs années après son tournage, réutilisée dans des campagnes de recrutement, des pitchs commerciaux ou des présentations institutionnelles bien après sa diffusion initiale.",
    ],
    serviceType: "Vidéo d'interview et de témoignage",
    cases: ["myfood", "once-upon-a-dime", "squarea"],
    faq: [
      {
        question: "Faut-il préparer des réponses à l'avance ?",
        answer:
          "Non, et c'est même déconseillé — une réponse apprise par cœur sonne faux à l'écran. On prépare ensemble les sujets et les messages clés avant le tournage, puis on pose les questions en entretien pour obtenir des réponses naturelles, qu'on retravaille ensuite au montage.",
      },
      {
        question: "Pouvez-vous filmer plusieurs intervenants sur plusieurs sites ?",
        answer:
          "Oui, c'est un format qu'on pratique régulièrement — notamment pour des campagnes qui demandent des témoignages dans plusieurs villes ou plusieurs pays. On organise un calendrier de tournage et on harmonise le montage pour que toutes les interviews forment un ensemble cohérent.",
      },
      {
        question: "Dans quel délai la vidéo est-elle livrée ?",
        answer:
          "Pour une interview simple, comptez une à deux semaines entre le tournage et la livraison du montage. Les projets multi-sites ou multilingues demandent un délai plus long, défini ensemble selon le nombre d'intervenants.",
      },
      {
        question: "Proposez-vous un studio pour tourner l'interview ?",
        answer:
          "Oui, le plateau du Grub permet de tourner en studio (fond vert, fonds de couleur, décor neutre) quand c'est le bon choix pour le projet — mais on tourne tout aussi souvent dans vos locaux, quand le décor fait partie du message.",
      },
    ],
    updatedAt: "2026-10-23",
  },
  {
    slug: "spot-publicitaire",
    navLabel: "Spot publicitaire",
    title: "Spot publicitaire & vidéo Ads à Strasbourg",
    h1: "Spot publicitaire & campagnes Ads",
    description:
      "Spots publicitaires et créas vidéo pour vos campagnes Ads à Strasbourg et en Alsace : script, casting, tournage, montage, déclinaisons TV, web et réseaux.",
    keywords: [
      "spot publicitaire Strasbourg",
      "vidéo Ads Strasbourg",
      "film publicitaire Alsace",
      "production spot pub entreprise",
    ],
    kicker: "Spot pub",
    intro: [
      "Un spot publicitaire se construit à l'envers : on part de l'endroit où il sera vu — un flux Instagram, une page YouTube, une diffusion radio pour sa version audio — et on en déduit sa durée, son rythme et sa mise en scène, plutôt que de tourner un film et de le découper après coup pour qu'il rentre dans un format. Cette logique guide tout le projet, du script à la dernière déclinaison.",
      "La production d'un spot mobilise les mêmes corps de métier qu'un tournage de film court : un script qui tient en quelques phrases ce que le produit ou la marque doit faire ressentir, un casting de comédiens ou de figurants cohérent avec l'image recherchée, une direction artistique sur les décors et les costumes, puis un tournage où chaque plan est pensé pour le montage à venir. Pour certains clients, on va jusqu'à faire du tournage un véritable temps fort interne — décor laissé en place, équipe mobilisée sur plusieurs jours — qui devient ensuite une source de contenus réutilisés pendant des mois.",
      "Un seul tournage donne rarement un seul livrable. Le spot principal se décline presque toujours en versions plus courtes pour les réseaux, en format carré ou vertical selon la plateforme, parfois en version sans voix pour une diffusion silencieuse, et en version audio seule pour la radio. Penser ces déclinaisons dès l'écriture du script évite d'improviser un recadrage approximatif une fois le tournage terminé.",
      "Pour les campagnes qui tournent sur la performance plutôt que sur l'image de marque pure, on travaille aussi en format Ads : plusieurs variantes d'une même créa, testées et ajustées selon ce qui convertit, avec des cycles de production plus courts pour suivre le rythme des campagnes plutôt que celui d'un film publicitaire classique.",
    ],
    serviceType: "Production de spot publicitaire et de vidéo Ads",
    cases: ["once-upon-a-dime", "s-automobile", "cft"],
    faq: [
      {
        question: "Quelle est la durée idéale d'un spot publicitaire ?",
        answer:
          "Ça dépend entièrement de sa destination : 15 à 30 secondes pour les réseaux sociaux et le pré-roll, jusqu'à 60 secondes ou plus pour une diffusion web ou un spot de marque. On détermine la durée en fonction du support avant d'écrire le script, pas après le tournage.",
      },
      {
        question: "Fournissez-vous les comédiens ?",
        answer:
          "Oui, on gère le casting selon le besoin du projet — comédiens professionnels, figurants, ou vos propres équipes si le spot doit rester incarné par de vraies personnes de l'entreprise. On en discute dès le brief pour que le ton du casting colle à votre image.",
      },
      {
        question: "Un spot peut-il être décliné pour la radio ?",
        answer:
          "Oui — la piste audio d'un tournage vidéo peut être retravaillée en version radio, ou enregistrée séparément si le texte diffère. C'est une déclinaison qu'on anticipe dès l'écriture du script quand elle est prévue.",
      },
      {
        question: "Travaillez-vous aussi sur des formats Ads (A/B testing) ?",
        answer:
          "Oui, on produit des variantes pensées pour la performance — plusieurs accroches ou montages d'une même créa, à tester sur vos campagnes Meta ou Google Ads — avec des délais de production plus courts qu'un spot de marque classique.",
      },
    ],
    updatedAt: "2026-10-23",
  },
  {
    slug: "film-institutionnel",
    navLabel: "Film institutionnel",
    title: "Film institutionnel & corporate à Strasbourg",
    h1: "Film institutionnel & corporate",
    description:
      "Film institutionnel et corporate pour présenter votre entreprise, un projet ou un savoir-faire à Strasbourg et en Alsace : conception, tournage, montage.",
    keywords: [
      "film institutionnel Strasbourg",
      "vidéo corporate entreprise Alsace",
      "film d'entreprise Strasbourg",
      "vidéo présentation entreprise",
    ],
    kicker: "Institutionnel",
    intro: [
      "Le film institutionnel répond à un besoin différent du spot publicitaire : expliquer plutôt que convaincre en quelques secondes. Présenter une entreprise à de nouveaux partenaires, raconter un projet de réhabilitation urbaine à ses riverains, donner à voir un savoir-faire industriel à des clients qui n'auront jamais l'occasion de visiter le site — ce format laisse le temps de poser le contexte, de montrer le travail réel, et de construire une explication qui tient debout sur la durée plutôt qu'une accroche.",
      "La structure d'un film institutionnel se pense souvent en plusieurs voix : la voix de la direction pour le cadre et la vision, celle des équipes sur le terrain pour la réalité du quotidien, parfois celle de clients ou de partenaires pour le regard extérieur. On construit le script autour de ces différentes perspectives plutôt que sur une seule voix off descriptive, pour que le film reste crédible plutôt que promotionnel.",
      "Sur le terrain, qu'il s'agisse de filmer une chaîne de production, un chantier en cours ou les coulisses d'une organisation, on privilégie le tournage en conditions réelles plutôt que la reconstitution — avec les contraintes que ça implique (bruit, sécurité, disponibilité des équipes) et qu'on sait anticiper. Le montage final inclut souvent du motion design pour clarifier un chiffre, une étape de process ou une donnée technique qu'il serait long d'expliquer en images seules.",
      "Un film institutionnel bien construit a une durée de vie longue : présentation commerciale, site web, salons professionnels, accueil de nouveaux collaborateurs. Il continue d'être montré des années après son tournage, ce qui justifie d'y mettre le soin nécessaire dès la phase d'écriture.",
    ],
    serviceType: "Film institutionnel et vidéo corporate",
    cases: ["once-upon-a-dime", "alsace-habitat", "vinci"],
    faq: [
      {
        question: "Quelle est la différence avec un spot publicitaire ?",
        answer:
          "Le spot publicitaire vise à convaincre en quelques secondes sur un support de diffusion précis. Le film institutionnel prend le temps d'expliquer — une entreprise, un projet, un savoir-faire — pour un usage qui dure dans le temps : site web, présentation commerciale, accueil de nouveaux collaborateurs.",
      },
      {
        question: "Combien de temps dure un film institutionnel ?",
        answer:
          "La plupart font entre 2 et 5 minutes, de quoi développer un vrai propos sans perdre l'attention. On ajuste la durée au contenu réel à transmettre plutôt qu'à un format fixe.",
      },
      {
        question: "Peut-on tourner sur un site en activité (chantier, usine) ?",
        answer:
          "Oui, c'est même la majorité de nos tournages institutionnels — en tenant compte des contraintes de sécurité et de disponibilité des équipes sur place, qu'on anticipe avec vous avant le jour du tournage.",
      },
      {
        question: "Le motion design est-il inclus ?",
        answer:
          "Quand le projet le demande — pour clarifier un chiffre, une étape de process ou une donnée technique — on intègre du motion design directement dans le montage, habillé dans le même esprit visuel que le reste du film.",
      },
    ],
    updatedAt: "2026-10-23",
  },
  {
    slug: "photo-entreprise",
    navLabel: "Photo d'entreprise",
    title: "Photo d'entreprise, portraits & produits à Strasbourg",
    h1: "Photo d'entreprise, portraits & produits",
    description:
      "Photographie d'entreprise à Strasbourg : portraits d'équipe, reportage de vos locaux, catalogues et packshots produits. Des images cohérentes, année après année.",
    keywords: [
      "photographe entreprise Strasbourg",
      "portraits professionnels Strasbourg",
      "photo produit catalogue Alsace",
      "photographe packshot Strasbourg",
    ],
    kicker: "Photo",
    intro: [
      "La photo d'entreprise couvre trois besoins qui se ressemblent peu à l'usage mais qui demandent la même exigence de constance : des portraits d'équipe qui donnent un visage cohérent à l'entreprise sur le site et sur LinkedIn, un reportage dans vos locaux pour montrer les coulisses et inspirer confiance, et des photos produit nettes pour un catalogue ou une fiche e-commerce.",
      "Pour les portraits, l'enjeu principal est la cohérence : même lumière, même cadrage, même traitement pour toute une équipe, même quand les séances s'étalent sur plusieurs jours ou que de nouveaux collaborateurs arrivent après coup. On construit un gabarit de prise de vue dès la première séance pour que les portraits ajoutés plus tard s'intègrent sans rupture visuelle dans la galerie existante.",
      "Le reportage d'entreprise — vos locaux, vos équipes au travail, vos coulisses — demande l'inverse : s'effacer plutôt qu'imposer une mise en scène, pour capter une activité réelle plutôt qu'une reconstitution. C'est souvent ce registre qu'on utilise pour alimenter un site web ou des réseaux sociaux sur la durée, avec des retours réguliers plutôt qu'une seule grosse séance.",
      "Pour la photo produit, qu'il s'agisse de packshots en studio sur fond neutre ou de mises en situation en décor réel, la constance technique prime : même exposition, même retouche, pour que l'ensemble du catalogue reste homogène d'une année sur l'autre. Beaucoup de nos clients en photo produit reviennent chaque année pour le même exercice — un catalogue qui s'enrichit saison après saison plutôt que d'être refait de zéro.",
    ],
    serviceType: "Photographie d'entreprise, portraits et produits",
    cases: ["atelier-hammaecher-sipion", "porsche-strasbourg", "vinci"],
    faq: [
      {
        question: "Comment garder une cohérence si les portraits sont pris à des dates différentes ?",
        answer:
          "On documente le gabarit de prise de vue (lumière, cadrage, fond, traitement) dès la première séance, pour que les portraits ajoutés plus tard — nouveaux collaborateurs, mises à jour — s'intègrent sans rupture visuelle dans la galerie existante.",
      },
      {
        question: "Tournez-vous en studio ou dans nos locaux ?",
        answer:
          "Les deux, selon le besoin : le studio du Grub pour un fond neutre et une lumière maîtrisée (portraits, packshots), vos locaux quand le décor fait partie du message (reportage d'entreprise, mise en situation produit).",
      },
      {
        question: "Proposez-vous un suivi photo produit sur plusieurs années ?",
        answer:
          "Oui, c'est même notre format le plus courant en photo produit : un catalogue repris et enrichi chaque année, avec la même exigence technique pour que l'ensemble reste homogène d'une saison à l'autre.",
      },
      {
        question: "Quel délai pour recevoir les photos retouchées ?",
        answer:
          "Comptez généralement une à deux semaines après la séance pour un jeu de photos retouchées, selon le volume. On peut accélérer pour un besoin urgent — à préciser en amont.",
      },
    ],
    updatedAt: "2026-10-23",
  },
  {
    slug: "motion-design",
    navLabel: "Motion design",
    title: "Motion design à Strasbourg",
    h1: "Motion design",
    description:
      "Motion design à Strasbourg : expliquer un produit, un chiffre ou un process complexe en quelques dizaines de secondes, intégré à vos tournages ou en habillage.",
    keywords: [
      "motion design Strasbourg",
      "animation graphique entreprise Alsace",
      "vidéo explicative motion design",
      "habillage vidéo Strasbourg",
    ],
    kicker: "Motion design",
    intro: [
      "Certaines informations se disent mal en images filmées : un chiffre clé, une étape de process invisible à l'œil nu, un mécanisme qu'il faudrait démonter pour comprendre. Le motion design répond à ce besoin précis — traduire une idée abstraite ou technique en une animation claire, en quelques dizaines de secondes, là où une explication orale ou un texte prendrait plusieurs minutes.",
      "On distingue deux usages principaux. Le motion design intégré consiste à habiller une vidéo tournée en conditions réelles — une chaîne de production filmée en tracking, par exemple — avec des éléments graphiques animés qui viennent annoter l'image : légendes, flèches, chiffres qui s'incrustent au bon moment pour guider la compréhension sans interrompre le flux du tournage. Le motion design pur, lui, se construit entièrement en animation : pas de tournage, uniquement des éléments graphiques, utile pour expliquer un concept, un produit numérique ou un chiffre sans support filmable.",
      "La méthode reste la même dans les deux cas : partir du message à transmettre plutôt que de l'esthétique, écrire un script précis sur ce qu'il faut montrer et dans quel ordre, puis construire l'animation pour que chaque élément graphique arrive exactement au moment où il devient utile à la compréhension. Le style visuel (couleurs, typographie, rythme) s'aligne sur votre identité de marque plutôt que sur un gabarit générique.",
      "Le motion design s'intègre bien à un tournage existant — comme complément à un film institutionnel ou un spot — mais fonctionne aussi comme un format autonome, pour une explication produit, un rapport annuel animé ou un contenu pédagogique destiné aux réseaux sociaux.",
    ],
    serviceType: "Motion design et animation graphique",
    cases: ["herbapac", "hanssen", "showreel-motion"],
    faq: [
      {
        question: "Le motion design peut-il s'ajouter à une vidéo déjà tournée ?",
        answer:
          "Oui, c'est l'usage le plus fréquent : on habille une vidéo tournée en conditions réelles avec des éléments graphiques animés (légendes, chiffres, flèches) qui viennent clarifier l'image sans la remplacer.",
      },
      {
        question: "Peut-on faire du motion design sans tournage du tout ?",
        answer:
          "Oui, pour expliquer un concept, un produit numérique ou un chiffre qui n'a pas de support filmable naturel, on construit l'animation entièrement en graphisme, sans caméra.",
      },
      {
        question: "Quelle est la durée d'une vidéo en motion design ?",
        answer:
          "La plupart tiennent entre 30 secondes et 2 minutes — suffisant pour expliquer un chiffre ou un process sans perdre l'attention. On ajuste au message réel à transmettre plutôt qu'à une durée standard.",
      },
      {
        question: "Respectez-vous notre identité de marque ?",
        answer:
          "Oui, couleurs, typographie et rythme d'animation sont alignés sur votre charte graphique existante plutôt que sur un style générique — l'objectif est que l'animation s'intègre à vos autres contenus, pas qu'elle détonne.",
      },
    ],
    updatedAt: "2026-10-23",
  },
];

export function getProductionPageBySlug(
  slug: string
): ProductionPage | undefined {
  return productionPages.find((p) => p.slug === slug);
}

/** Maps a project category slug to the production page(s) it belongs to, for the "Ce service" cross-link on case pages. Categories not listed here (shorts, podcast) have no dedicated production page yet. */
const CATEGORY_TO_PRODUCTION: Record<string, string[]> = {
  aftermovie: ["reportage-evenementiel"],
  "photo-evenementiel": ["reportage-evenementiel"],
  reportage: ["reportage-evenementiel"],
  interview: ["interview-temoignage"],
  "spot-pub": ["spot-publicitaire"],
  ads: ["spot-publicitaire"],
  "photo-portrait": ["photo-entreprise"],
  "photo-produit": ["photo-entreprise"],
  "photo-entreprise": ["photo-entreprise"],
  "motion-design": ["motion-design"],
};

/** Up to 2 production pages linked from a project's categories, for the "Ce service" block on its case page. */
export function productionPagesForCategories(
  categories: string[]
): ProductionPage[] {
  const slugs: string[] = [];
  for (const category of categories) {
    for (const slug of CATEGORY_TO_PRODUCTION[category] ?? []) {
      if (!slugs.includes(slug)) slugs.push(slug);
    }
  }
  return slugs
    .slice(0, 2)
    .map((slug) => getProductionPageBySlug(slug))
    .filter((p): p is ProductionPage => Boolean(p));
}

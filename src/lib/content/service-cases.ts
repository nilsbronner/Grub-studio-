/** "Un service = un cas client" — each service is anchored to one real case study (brief Oct 9 §2). */
export type ServiceCase = {
  service: string;
  description: string;
  /** Slug of the matching entry in projects.ts */
  caseSlug: string;
};

export const serviceCases: ServiceCase[] = [
  {
    service: "Films de marque",
    description:
      "Un spot publicitaire avec tous les corps de métier mobilisés, décor sur-mesure et équipe complète — jusqu'à en faire un temps fort d'entreprise.",
    caseSlug: "once-upon-a-dime",
  },
  {
    service: "Contenu réseaux & Ads",
    description:
      "Photo et vidéo produit, tutoriels, créas Ads — une production continue qui alimente le site et les campagnes sur plusieurs années.",
    caseSlug: "squarea",
  },
  {
    service: "Lancement & activation événementielle",
    description:
      "Teasers, soirée inaugurale, reportage sur deux jours, campagnes Ads — faire d'une ouverture un véritable événement média.",
    caseSlug: "hollys-diner",
  },
  {
    service: "Interviews multilingues",
    description:
      "Des interviews tournées à travers l'Europe, en plusieurs langues, pour nourrir une campagne de crowdfunding et les contenus de marque dans la durée.",
    caseSlug: "myfood",
  },
  {
    service: "Reportage chantier & entreprise",
    description:
      "Du lancement à la livraison, un suivi photo et vidéo de chaque étape et de chaque temps fort, année après année.",
    caseSlug: "sas3b",
  },
  {
    service: "Catalogue & photo produit",
    description:
      "Un catalogue produit par an, des photos de mise en situation et des vidéos de création — une base de contenus qui continue de servir des années après le tournage.",
    caseSlug: "atelier-hammaecher-sipion",
  },
  {
    service: "Motion design intégré",
    description:
      "Une vidéo tournée en tracking dans les locaux pour suivre toute une chaîne de production, habillée en motion design.",
    caseSlug: "herbapac",
  },
  {
    service: "Couverture événementielle",
    description:
      "Media Day, identité graphique, spots sponsors : tout le contenu d'un événement, saison après saison, depuis sa création.",
    caseSlug: "strasbourg-esport-days",
  },
];

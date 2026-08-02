export type Short = {
  slug: string;
  title: string;
  vimeoId: string;
  /** Poster image; filled in from the real Vimeo thumbnail at build time when absent. */
  image?: string;
};

export const shorts: Short[] = [
  { slug: "packshot-photo-portrait", title: "Packshot & photo produit", vimeoId: "1214533702" },
  { slug: "offre-integrale-event", title: "Offre intégrale événementiel", vimeoId: "1214532977" },
  { slug: "grosse-offre-timeline", title: "Une prod, plein de contenus", vimeoId: "1214532976" },
  { slug: "grub-coworking", title: "Contenu réseaux : coworking", vimeoId: "1214533282" },
  { slug: "dom-portrait", title: "Contenu réseaux : domiciliation", vimeoId: "1214533568" },
  { slug: "camille-emmanuel-reel", title: "Camille & Emmanuel — extrait", vimeoId: "1173949167" },
  { slug: "sed-dark-dogs", title: "SED × Dark Dogs", vimeoId: "1214545009" },
  { slug: "sed-formas", title: "SED Formas", vimeoId: "1214545441" },
  { slug: "ugc", title: "Contenu UGC", vimeoId: "1214545081" },
  { slug: "trailer-longue", title: "Trailer", vimeoId: "1214545621" },
  { slug: "chess-infinity", title: "Chess Infinity", vimeoId: "1214545080" },
];

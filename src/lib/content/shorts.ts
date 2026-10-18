export type Short = {
  slug: string;
  title: string;
  vimeoId: string;
  /** Private link hash — required to view/embed an unlisted Vimeo video. */
  vimeoHash?: string;
  /** Poster image; filled in from the real Vimeo thumbnail at build time when absent. */
  image?: string;
};

export const shorts: Short[] = [
  { slug: "packshot-photo-portrait", title: "Packshot & photo produit", vimeoId: "1236981440", vimeoHash: "5fb107ccf4" },
  { slug: "offre-integrale-event", title: "Offre intégrale événementiel", vimeoId: "1236981415", vimeoHash: "e5705f69a7" },
  { slug: "grosse-offre-timeline", title: "Une prod, plein de contenus", vimeoId: "1236981307", vimeoHash: "fd9c2e550b" },
  { slug: "grub-coworking", title: "Contenu réseaux : coworking", vimeoId: "1236981232", vimeoHash: "97a0b34ee4" },
  { slug: "dom-portrait", title: "Contenu réseaux : domiciliation", vimeoId: "1236981245", vimeoHash: "a7126ae5ab" },
  { slug: "camille-emmanuel-reel", title: "Camille & Emmanuel — extrait", vimeoId: "1173949167" },
  { slug: "sed-dark-dogs", title: "SED × Dark Dogs", vimeoId: "1214545009" },
  { slug: "sed-formas", title: "SED Formas", vimeoId: "1214545441" },
  { slug: "ugc", title: "Contenu UGC", vimeoId: "1214545081" },
  { slug: "trailer-longue", title: "Trailer", vimeoId: "1214545621" },
  { slug: "chess-infinity", title: "Chess Infinity", vimeoId: "1214545080" },
];

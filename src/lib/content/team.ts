export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  /** Short one-liner shown under the role — omit to hide. */
  quote?: string;
};

export const team: TeamMember[] = [
  {
    name: "Nils Bronner",
    role: "Photographe & Chef de projet",
    image: "/images/team/nils-bronner.jpg",
  },
  {
    name: "Matteo",
    role: "Réalisateur & Directeur artistique",
    quote: "C'est lui qui transforme votre brief en image.",
  },
  { name: "Dino", role: "Monteur & Cadreur" },
  { name: "Nicolas", role: "Monteur & Cadreur" },
  { name: "Taha", role: "Monteur & Motion-designer" },
];

export const studioPositioning =
  "Un noyau de 5 personnes au Grub, à Strasbourg, et un réseau de freelances et de studios partenaires qu'on mobilise selon la taille du projet. Vous gardez un seul interlocuteur du brief à la livraison.";

export type MethodStepIcon =
  | "kickoff"
  | "conception"
  | "pre-production"
  | "production"
  | "post-production";

export type MethodStep = {
  step: number;
  title: string;
  description: string;
  icon: MethodStepIcon;
  /** Short italic note under the description — omit to hide. */
  note?: string;
};

export const methodSteps: MethodStep[] = [
  {
    step: 1,
    title: "Cadrage",
    description:
      "On définit ensemble objectifs, cibles et canaux de diffusion.",
    note: "Vous recevez une note d'intention.",
    icon: "kickoff",
  },
  {
    step: 2,
    title: "Écriture",
    description: "Scénario et découpage.",
    note: "Vous validez avant tout tournage.",
    icon: "conception",
  },
  {
    step: 3,
    title: "Préparation",
    description: "Planning, lieux, intervenants.",
    note: "Zéro surprise le jour J.",
    icon: "pre-production",
  },
  {
    step: 4,
    title: "Tournage",
    description: "En studio au Grub ou chez vous.",
    icon: "production",
  },
  {
    step: 5,
    title: "Montage & déclinaisons",
    description:
      "Film principal, versions courtes, formats réseaux.",
    note: "[2] allers-retours de modifications inclus.",
    icon: "post-production",
  },
];

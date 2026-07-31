export type TeamMember = {
  name: string;
  role: string;
  image?: string;
};

export const team: TeamMember[] = [
  {
    name: "Nils Bronner",
    role: "Photographe & Chef de projet",
    image: "/images/team/nils-bronner.jpg",
  },
  { name: "Matteo", role: "Réalisateur & Directeur artistique" },
  { name: "Dino", role: "Monteur & Cadreur" },
  { name: "Nicolas", role: "Monteur & Cadreur" },
  { name: "Taha", role: "Monteur & Motion-designer" },
];

export const studioPositioning =
  "Une équipe interne resserrée, pilotée par Nils Bronner, renforcée selon les projets par un réseau de freelances et de studios partenaires.";

export type MethodStep = {
  step: number;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    step: 1,
    title: "Kick-off",
    description: "Définition des objectifs, cibles et messages.",
  },
  {
    step: 2,
    title: "Conception",
    description: "Écriture du scénario, structuration des séquences.",
  },
  {
    step: 3,
    title: "Pré-production",
    description: "Planification du tournage, coordination des intervenants.",
  },
  {
    step: 4,
    title: "Production",
    description: "Tournage des séquences prévues.",
  },
  {
    step: 5,
    title: "Post-production",
    description: "Montage image, son et éléments graphiques.",
  },
];

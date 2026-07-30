export type CategoryGroup = "video" | "photo";

export type Category = {
  slug: string;
  label: string;
  group: CategoryGroup;
};

export const categories: Category[] = [
  { slug: "spot-pub", label: "Spot pub", group: "video" },
  { slug: "ads", label: "Campagnes digitales / ADS", group: "video" },
  { slug: "shorts", label: "Contenu réseaux (shorts)", group: "video" },
  { slug: "aftermovie", label: "Aftermovie", group: "video" },
  { slug: "reportage", label: "Reportage vidéo", group: "video" },
  { slug: "interview", label: "Interview", group: "video" },
  { slug: "podcast", label: "Podcast vidéo", group: "video" },
  { slug: "motion-design", label: "Motion design", group: "video" },
  { slug: "photo-portrait", label: "Portraits pro", group: "photo" },
  { slug: "photo-entreprise", label: "Reportage entreprise", group: "photo" },
  { slug: "photo-produit", label: "Produits & packshots", group: "photo" },
  { slug: "photo-evenementiel", label: "Événementiel", group: "photo" },
];

export function categoryLabel(slug: string): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

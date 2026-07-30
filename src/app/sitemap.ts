import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";

const siteUrl = "https://www.bemotion.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/travaux", "/studio", "/services", "/contact"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/travaux/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}

import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/travaux",
    "/studio",
    "/services",
    "/conseil",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/travaux/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}

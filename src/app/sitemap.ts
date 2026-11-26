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
    "/rush",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
    // English and German translations so far cover these 4 main pages only.
    "/en",
    "/en/services",
    "/en/travaux",
    "/en/contact",
    "/de",
    "/de/services",
    "/de/travaux",
    "/de/contact",
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

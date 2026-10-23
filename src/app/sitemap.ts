import type { MetadataRoute } from "next";
import { projects } from "@/lib/content/projects";
import { productionPages } from "@/lib/content/production";
import { siteUrl } from "@/lib/site";

// A fixed fallback instead of `new Date()` — every URL sharing the build
// timestamp as its lastmod is meaningless to a crawler (it just says "the
// site was built", not "this content changed"). Routes below carry the date
// of their own last real content change; anything without one yet falls
// back to this rather than a timestamp that moves on every deploy.
const FALLBACK_LASTMOD = new Date("2026-10-23");

// Per-route date of each static page's last meaningful content change.
const staticRouteDates: Record<string, Date> = {
  "": new Date("2026-10-23"), // Phase 2 SEO: hero copy + FAQ section
  "/travaux": FALLBACK_LASTMOD,
  "/studio": FALLBACK_LASTMOD,
  "/services": FALLBACK_LASTMOD,
  "/rush": FALLBACK_LASTMOD,
  "/contact": FALLBACK_LASTMOD,
  "/mentions-legales": FALLBACK_LASTMOD,
  "/politique-de-confidentialite": new Date("2026-10-20"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  // /conseil is intentionally excluded: its role on the site is still
  // undecided (see its own noindex,follow meta) and it's kept out of the
  // sitemap until that's settled.
  const staticRoutes = Object.entries(staticRouteDates).map(
    ([route, lastModified]) => ({
      url: `${siteUrl}${route}`,
      lastModified,
    })
  );

  const productionRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/production`,
      lastModified: new Date("2026-10-23"),
    },
    ...productionPages.map((page) => ({
      url: `${siteUrl}/production/${page.slug}`,
      lastModified: new Date(page.updatedAt ?? "2026-10-23"),
    })),
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/travaux/${project.slug}`,
    lastModified: project.updatedAt
      ? new Date(project.updatedAt)
      : FALLBACK_LASTMOD,
  }));

  return [...staticRoutes, ...productionRoutes, ...projectRoutes];
}

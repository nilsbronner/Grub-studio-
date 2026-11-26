import type { Metadata } from "next";
import Link from "next/link";
import { serviceCases } from "@/lib/content/service-cases";
import { getProjectBySlug, type Project } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { Reveal } from "@/components/reveal";
import { ServiceCaseGrid } from "@/components/service-case-grid";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

// Page chrome only — the case grid below still shows the French project
// catalogue (src/lib/content/projects.ts), not yet translated.
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/en/services",
    title: "Video & photo services for companies — Strasbourg",
    description:
      "Video and photo for brands in Alsace and beyond: ad spots, Ads content, social content, aftermovies, reports, interviews, motion design, corporate portraits, events.",
    languages: { fr: "/services", en: "/en/services", de: "/de/services" },
    ogLocale: "en_US",
  }),
  keywords: [
    "video agency Strasbourg",
    "content production Alsace",
    "advertising spot Strasbourg",
    "Ads campaign Alsace",
    "corporate motion design",
    "corporate photography Strasbourg",
  ],
};

export default async function ServicesPageEn() {
  const caseProjects = serviceCases
    .map((item) => ({ item, project: getProjectBySlug(item.caseSlug) }))
    .filter(
      (x): x is { item: typeof serviceCases[number]; project: Project } =>
        !!x.project
    );
  const projectsWithPosters = await withVimeoPosters(
    caseProjects.map((x) => x.project)
  );
  const serviceCasesWithPosters = caseProjects.map((x, i) => ({
    ...x.item,
    project: projectsWithPosters[i],
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>What we do</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Video and photo for brands who want to be seen.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          We start from where your content will run (website, LinkedIn, ads,
          trade show) to decide how to shoot it. Not the other way round.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          What we&rsquo;ve already produced
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          One service, one proof: every format we offer is illustrated by a
          project we actually delivered.
        </p>
        <div className="mt-8">
          <ServiceCaseGrid cases={serviceCasesWithPosters} />
        </div>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Got a project in mind? Let&rsquo;s see what we can make together.
        </h2>
        <Link
          href="/en/contact"
          className={cx(
            "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
            PAGE_ACCENT_CLASSES.purple.solid,
            PAGE_ACCENT_CLASSES.purple.hover
          )}
        >
          Let&rsquo;s talk about your project
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

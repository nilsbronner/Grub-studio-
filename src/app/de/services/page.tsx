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
    path: "/de/services",
    title: "Video- & Fotoleistungen für Unternehmen — Straßburg",
    description:
      "Video und Foto für Marken im Elsass und darüber hinaus: Werbespots, Ads-Content, Social-Media-Content, Aftermovies, Reportagen, Interviews, Motion Design, Unternehmensporträts, Events.",
    languages: { fr: "/services", en: "/en/services", de: "/de/services" },
    ogLocale: "de_DE",
  }),
  keywords: [
    "Videoagentur Straßburg",
    "Content-Produktion Elsass",
    "Werbespot Straßburg",
    "Ads-Kampagne Elsass",
    "Motion Design Unternehmen",
    "Unternehmensfotografie Straßburg",
  ],
};

export default async function ServicesPageDe() {
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
        <EyebrowPill>Was wir tun</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Video und Foto für Marken, die gesehen werden wollen.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          Wir gehen von dort aus, wo Ihr Content ausgespielt wird (Website,
          LinkedIn, Werbung, Messe), um zu entscheiden, wie wir drehen. Nicht
          umgekehrt.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Was wir bereits produziert haben
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Eine Leistung, ein Beweis: Jedes Format, das wir anbieten, ist mit
          einem tatsächlich gelieferten Projekt belegt.
        </p>
        <div className="mt-8">
          <ServiceCaseGrid cases={serviceCasesWithPosters} />
        </div>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Eine Projektidee? Sehen wir, was wir gemeinsam produzieren können.
        </h2>
        <Link
          href="/de/contact"
          className={cx(
            "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
            PAGE_ACCENT_CLASSES.purple.solid,
            PAGE_ACCENT_CLASSES.purple.hover
          )}
        >
          Sprechen wir über Ihr Projekt
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

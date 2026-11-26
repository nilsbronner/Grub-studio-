import type { Metadata } from "next";
import Link from "next/link";
import { ProjectFilter } from "@/components/project-filter";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { projects } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

// Page chrome only — project cards, categories and case details below
// still show the French catalogue (src/lib/content/projects.ts).
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/de/travaux",
    title: "Video- & Fotoprojekte — Straßburg",
    description:
      "Werbespots, Ads-Kampagnen, Social-Media-Content, Motion Design und B2B-Fotografie in Straßburg, im Elsass und darüber hinaus — die Produktionen von Grub Studio.",
    languages: { fr: "/travaux", en: "/en/travaux", de: "/de/travaux" },
    ogLocale: "de_DE",
  }),
  keywords: [
    "Videoproduktionsagentur Straßburg",
    "Content-Produktion Elsass",
    "Fotograf Videograf Straßburg",
    "Werbekampagnen Elsass",
    "Video- und Fotoportfolio Unternehmen",
  ],
};

export default async function TravauxPageDe() {
  const projectsWithPosters = await withVimeoPosters(projects);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionKicker kicker="Referenzen">
        Eine Auswahl aktueller Projekte
      </SectionKicker>
      <div className="mt-10">
        <ProjectFilter projects={projectsWithPosters} />
      </div>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Ihr Projekt könnte das nächste sein.
        </h2>
        <Link
          href="/de/contact"
          className={cx(
            "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
            PAGE_ACCENT_CLASSES.pink.solid,
            PAGE_ACCENT_CLASSES.pink.hover
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

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
    path: "/en/travaux",
    title: "Video & photo work — Strasbourg",
    description:
      "Ad spots, Ads campaigns, social content, motion design and B2B photography in Strasbourg, Alsace and beyond — Grub Studio's productions.",
    languages: { fr: "/travaux", en: "/en/travaux", de: "/de/travaux" },
    ogLocale: "en_US",
  }),
  keywords: [
    "video production agency Strasbourg",
    "content production Alsace",
    "photographer videographer Strasbourg",
    "advertising campaigns Alsace",
    "corporate video and photo portfolio",
  ],
};

export default async function TravauxPageEn() {
  const projectsWithPosters = await withVimeoPosters(projects);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <SectionKicker kicker="Case studies">
        A selection of recent projects
      </SectionKicker>
      <div className="mt-10">
        <ProjectFilter projects={projectsWithPosters} />
      </div>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Your project could be the next one.
        </h2>
        <Link
          href="/en/contact"
          className={cx(
            "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
            PAGE_ACCENT_CLASSES.pink.solid,
            PAGE_ACCENT_CLASSES.pink.hover
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

import type { Metadata } from "next";
import Link from "next/link";
import { ProjectFilter } from "@/components/project-filter";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { projects } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";

export const metadata: Metadata = {
  title: "Travaux",
  description:
    "Spots pub, campagnes ADS, contenu réseaux, motion design et photo B2B — les productions Bemotion.",
};

export default async function TravauxPage() {
  const projectsWithPosters = await withVimeoPosters(projects);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Portfolio</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Travaux
        </h1>
      </Reveal>
      <div className="mt-10">
        <ProjectFilter projects={projectsWithPosters} />
      </div>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Votre projet pourrait être le prochain.
        </h2>
        <Link
          href="/contact"
          data-cursor="→"
          className="group flex shrink-0 items-center gap-3 border border-border px-5 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent"
        >
          Discutons de votre projet
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { diffusionFormats } from "@/lib/content/services";
import { serviceCases } from "@/lib/content/service-cases";
import { getProjectBySlug, type Project } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { Reveal } from "@/components/reveal";
import { ServiceCaseGrid } from "@/components/service-case-grid";
import { FormatShowcase } from "@/components/format-showcase";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Vidéo & photo pour entreprises à Strasbourg — Services",
  description:
    "Vidéo et photo pour les marques : spot pub, Ads, contenu réseaux, aftermovie, reportage, interview, podcast, motion design, portraits, packshots, événementiel.",
});

export default async function ServicesPage() {
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
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Ce qu&rsquo;on fait</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Vidéo et photo pour les marques qui veulent être vues.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          On part de l&rsquo;endroit où votre contenu sera diffusé (site,
          LinkedIn, pub, salon) pour décider comment le tourner. Pas
          l&rsquo;inverse.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Ce qu&rsquo;on a déjà produit
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Un service, une preuve : chaque format qu&rsquo;on propose est illustré par un projet qu&rsquo;on a vraiment livré.
        </p>
        <div className="mt-8">
          <ServiceCaseGrid cases={serviceCasesWithPosters} />
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Formats de diffusion
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          {diffusionFormats.intro}
        </p>
        <div className="mt-8">
          <FormatShowcase formats={diffusionFormats.formats} />
        </div>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Une idée de projet ? Voyons ce qu&rsquo;on peut produire ensemble.
        </h2>
        <Link
          href="/contact"
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

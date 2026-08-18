import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoTile } from "@/components/video-tile";
import { Reveal } from "@/components/reveal";
import { StatStrip } from "@/components/stat-strip";
import { getProjectBySlug, projects } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";
import { withVimeoPosters } from "@/lib/vimeo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.client,
    description: project.hook,
    keywords: project.keywords,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawProject = getProjectBySlug(slug);
  if (!rawProject) notFound();
  const [project] = await withVimeoPosters([rawProject]);

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {project.sector}
          </p>
          {project.price && (
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-accent">
              {project.price}
            </span>
          )}
        </div>
        <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-4xl">
          {project.client}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{project.hook}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <VideoTile
          project={project}
          priority
          lightbox
          className="aspect-video w-full"
        />
      </Reveal>

      <Reveal delay={0.15} className="mt-12 grid gap-10 sm:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Contexte
          </h2>
          <p className="mt-3 leading-relaxed">{project.context}</p>

          <h2 className="mt-10 text-sm uppercase tracking-[0.15em] text-muted">
            Livrables
          </h2>
          <ul className="mt-3 space-y-1">
            {project.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          {project.credits && project.credits.length > 0 && (
            <>
              <h2 className="mt-10 text-sm uppercase tracking-[0.15em] text-muted">
                Crédits
              </h2>
              <ul className="mt-3 space-y-1">
                {project.credits.map((c) => (
                  <li key={c.role}>
                    <span className="text-muted">{c.role} — </span>
                    {c.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Catégories
          </h2>
          <p className="mt-3 text-sm">
            {project.categories.map((c) => categoryLabel(c)).join(" · ")}
          </p>
        </div>
      </Reveal>

      {project.stats && project.stats.length > 0 && (
        <Reveal delay={0.1} className="mt-10">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Chiffres clés
          </h2>
          <div className="mt-4">
            <StatStrip stats={project.stats} />
          </div>
        </Reveal>
      )}

      <Reveal
        delay={0.05}
        className="mt-20 flex flex-col items-start gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="max-w-md text-lg font-medium tracking-tight">
          Un projet dans le même esprit ?
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/travaux"
            className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            ← Tous les travaux
          </Link>
          <Link
            href="/contact"
            className="group flex shrink-0 items-center gap-3 border border-border px-5 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent"
          >
            Discutons de votre projet
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </article>
  );
}

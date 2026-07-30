import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoTile } from "@/components/video-tile";
import { getProjectBySlug, projects } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";

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
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        {project.sector}
      </p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-4xl">
        {project.client}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{project.hook}</p>

      <div className="mt-10">
        <VideoTile project={project} className="aspect-video w-full" />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-[2fr_1fr]">
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

          {project.stats && project.stats.length > 0 && (
            <>
              <h2 className="mt-10 text-sm uppercase tracking-[0.15em] text-muted">
                Chiffres clés
              </h2>
              <dl className="mt-3 space-y-3">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-muted">{s.label}</dt>
                    <dd className="tabular text-lg font-medium">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

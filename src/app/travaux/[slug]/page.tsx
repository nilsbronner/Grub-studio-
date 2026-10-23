import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoTile } from "@/components/video-tile";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectVideoGallery } from "@/components/project-video-gallery";
import { Reveal } from "@/components/reveal";
import { StatStrip } from "@/components/stat-strip";
import { getProjectBySlug, projects } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";
import { productionPagesForCategories } from "@/lib/content/production";
import { getVimeoMeta, getVimeoThumbnails, withVimeoPosters } from "@/lib/vimeo";
import { breadcrumbJsonLd, clipDescription, jsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

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
    ...pageMetadata({
      path: `/travaux/${project.slug}`,
      title: caseTitle(project.client, project.categories),
      description: clipDescription(
        `${project.hook} ${project.title} pour ${project.client} (${project.sector}), par Grub Studio, production vidéo et photo à Strasbourg.`
      ),
    }),
    keywords: project.keywords,
  };
}

/** "Client : Spot pub & Interview" — short, keyword-led, under ~60 chars with the " — Grub Studio" suffix. */
function caseTitle(client: string, categorySlugs: string[]): string {
  const labels = categorySlugs.slice(0, 2).map((c) => categoryLabel(c));
  const title = labels.length ? `${client} : ${labels.join(" & ")}` : client;
  return title.length > 46 ? `${client} : ${labels[0]}` : title;
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
  const video = project.vimeoId ? await getVimeoMeta(project.vimeoId) : null;
  const galleryThumbnails = project.videos
    ? await getVimeoThumbnails(project.videos)
    : {};
  const galleryVideos = project.videos?.map((v) => ({
    ...v,
    image: galleryThumbnails[v.vimeoId],
  }));
  const galleryMeta = project.videos
    ? await Promise.all(project.videos.map((v) => getVimeoMeta(v.vimeoId)))
    : [];
  const relatedProductionPages = productionPagesForCategories(
    project.categories
  );
  const pageUrl = `${siteUrl}/travaux/${project.slug}`;
  const structuredData: object[] = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Réalisations", path: "/travaux" },
      { name: project.client, path: `/travaux/${project.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${project.client} — ${project.title}`,
      headline: project.title,
      description: project.hook,
      url: pageUrl,
      genre: project.categories.map((c) => categoryLabel(c)),
      about: { "@type": "Organization", name: project.client },
      creator: { "@id": `${siteUrl}/#business` },
      ...(project.image ? { image: project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}` } : {}),
    },
  ];
  // Google only shows video rich results when name, thumbnail and upload date are all known.
  if (project.vimeoId && video?.thumbnailUrl && video.uploadDate) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${project.client} — ${project.title}`,
      description: project.hook,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
      ...(video.duration ? { duration: `PT${Math.round(video.duration)}S` } : {}),
      embedUrl: `https://player.vimeo.com/video/${project.vimeoId}`,
      contentUrl: `https://vimeo.com/${project.vimeoId}`,
      publisher: { "@id": `${siteUrl}/#business` },
    });
  }
  project.videos?.forEach((v, i) => {
    const meta = galleryMeta[i];
    if (!meta?.thumbnailUrl || !meta.uploadDate) return;
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${project.client} — ${v.title}`,
      description: project.hook,
      thumbnailUrl: meta.thumbnailUrl,
      uploadDate: meta.uploadDate,
      ...(meta.duration ? { duration: `PT${Math.round(meta.duration)}S` } : {}),
      embedUrl: `https://player.vimeo.com/video/${v.vimeoId}`,
      contentUrl: `https://vimeo.com/${v.vimeoId}`,
      publisher: { "@id": `${siteUrl}/#business` },
    });
  });

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
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

        {project.fiche && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                Client
              </dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                Secteur
              </dt>
              <dd className="mt-1">{project.sector}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                Livrables
              </dt>
              <dd className="mt-1">{project.deliverables.join(", ")}</dd>
            </div>
            {project.fiche.duree && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  Durée
                </dt>
                <dd className="mt-1">{project.fiche.duree}</dd>
              </div>
            )}
            {project.fiche.lieu && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  Lieu
                </dt>
                <dd className="mt-1">{project.fiche.lieu}</dd>
              </div>
            )}
          </dl>
        )}
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        {galleryVideos?.length ? (
          <ProjectVideoGallery videos={galleryVideos} />
        ) : !project.vimeoId && (project.images?.length || project.image) ? (
          <ProjectGallery
            images={project.images ?? (project.image ? [project.image] : [])}
            alt={`${project.client} — ${project.title}, photo Grub Studio`}
            className="aspect-video w-full"
          />
        ) : (
          <VideoTile
            project={project}
            priority
            lightbox
            className="aspect-video w-full"
          />
        )}
      </Reveal>

      <Reveal delay={0.15} className="mt-12 grid gap-10 sm:grid-cols-[2fr_1fr]">
        <div>
          {project.stake && (
            <>
              <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
                L&rsquo;enjeu
              </h2>
              <p className="mt-3 leading-relaxed">{project.stake}</p>
            </>
          )}

          <h2 className="mt-10 text-sm font-mono uppercase tracking-[0.15em] text-muted first:mt-0">
            Ce qu&rsquo;on a fait
          </h2>
          <p className="mt-3 leading-relaxed">{project.context}</p>
          {project.story?.map((paragraph, i) => (
            <p key={i} className="mt-3 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <h2 className="mt-10 text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Livrables
          </h2>
          <ul className="mt-3 space-y-1">
            {project.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          {project.credits && project.credits.length > 0 && (
            <>
              <h2 className="mt-10 text-sm font-mono uppercase tracking-[0.15em] text-muted">
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
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Catégories
          </h2>
          <p className="mt-3 text-sm">
            {project.categories.map((c) => categoryLabel(c)).join(" · ")}
          </p>
        </div>
      </Reveal>

      {project.stats && project.stats.length > 0 && (
        <Reveal delay={0.1} className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Résultats
          </h2>
          <div className="mt-4">
            <StatStrip stats={project.stats} />
          </div>
        </Reveal>
      )}

      {project.testimonial && (
        <Reveal delay={0.1} className="mt-10 border-t border-border pt-10">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Citation client
          </h2>
          <blockquote className="mt-4 max-w-2xl text-lg leading-relaxed">
            &laquo;&nbsp;{project.testimonial.quote}&nbsp;&raquo;
          </blockquote>
          <p className="mt-3 text-sm text-muted">
            — {project.testimonial.author}
          </p>
        </Reveal>
      )}

      {relatedProductionPages.length > 0 && (
        <Reveal delay={0.1} className="mt-10 border-t border-border pt-10">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Ce service
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {relatedProductionPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/production/${page.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors duration-300 hover:border-accent/60"
                >
                  {page.h1}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
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
            className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            ← Toutes nos réalisations
          </Link>
          <Link
            href="/contact"
            className={cx(
              "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
              PAGE_ACCENT_CLASSES.pink.solid,
              PAGE_ACCENT_CLASSES.pink.hover
            )}
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

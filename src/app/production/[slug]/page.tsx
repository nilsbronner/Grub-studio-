import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoTile } from "@/components/video-tile";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectCard } from "@/components/project-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import {
  productionPages,
  getProductionPageBySlug,
} from "@/lib/content/production";
import { getProjectBySlug, type Project } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { breadcrumbJsonLd, faqJsonLd, jsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export function generateStaticParams() {
  return productionPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProductionPageBySlug(slug);
  if (!page) return {};
  return {
    ...pageMetadata({
      path: `/production/${page.slug}`,
      title: page.title,
      description: page.description,
    }),
    keywords: page.keywords,
  };
}

export default async function ProductionServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getProductionPageBySlug(slug);
  if (!page) notFound();

  const caseProjects = page.cases
    .map((caseSlug) => getProjectBySlug(caseSlug))
    .filter((p): p is Project => Boolean(p));
  const casesWithPosters = await withVimeoPosters(caseProjects);
  const [heroCase, ...linkedCases] = casesWithPosters;

  const pageUrl = `${siteUrl}/production/${page.slug}`;
  const structuredData: object[] = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Production", path: "/production" },
      { name: page.h1, path: `/production/${page.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.description,
      serviceType: page.serviceType,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: [
        { "@type": "City", name: "Strasbourg" },
        { "@type": "AdministrativeArea", name: "Grand Est" },
      ],
      url: pageUrl,
    },
    faqJsonLd(page.faq),
  ];

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      <Reveal>
        <EyebrowPill>{page.kicker}</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-4xl">
          {page.h1}
        </h1>
      </Reveal>

      {heroCase && (
        <Reveal delay={0.1} className="mt-10">
          {heroCase.vimeoId ? (
            <VideoTile
              project={heroCase}
              priority
              lightbox
              className="aspect-video w-full"
            />
          ) : (
            <ProjectGallery
              images={
                heroCase.images ?? (heroCase.image ? [heroCase.image] : [])
              }
              alt={`${heroCase.client} — ${heroCase.title}, photo Grub Studio`}
              className="aspect-video w-full"
            />
          )}
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-12 max-w-2xl space-y-4 leading-relaxed text-foreground/80">
        {page.intro.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Reveal>

      {linkedCases.length > 0 && (
        <Reveal delay={0.1} className="mt-16">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Des projets qu&rsquo;on a produits
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {[heroCase, ...linkedCases]
              .filter((p): p is Project => Boolean(p))
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1} className="mt-16">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Questions fréquentes
        </h2>
        <div className="mt-6">
          <FaqAccordion items={page.faq} />
        </div>
      </Reveal>

      <Reveal
        delay={0.05}
        className="mt-20 flex flex-col items-start gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="max-w-md text-lg font-medium tracking-tight">
          Un projet {page.kicker.toLowerCase()} à produire ?
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          {page.linkToRush && (
            <Link
              href="/rush"
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              Voir l&rsquo;offre Rush →
            </Link>
          )}
          <Link
            href="/contact"
            className={cx(
              "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
              PAGE_ACCENT_CLASSES.purple.solid,
              PAGE_ACCENT_CLASSES.purple.hover
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { OfferList } from "@/components/offer-card";
import {
  eventOfferIntro,
  eventOffers,
  eventOfferNote,
} from "@/lib/content/event-offer";
import { getProjectBySlug } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/rush",
    title: "Rush — Reportage événementiel à Strasbourg",
    description:
      "Un reportage photo et/ou vidéo pour votre événement à Strasbourg, en Alsace et au-delà, de 500 € HT (demi-journée) à 2 900 € HT (journée complète, photo + vidéo).",
  }),
  keywords: [
    "reportage photo événementiel Strasbourg",
    "reportage vidéo événement Alsace",
    "photographe événementiel entreprise",
    "captation vidéo événement professionnel",
  ],
};

// Real photos from past event/reportage shoots — proof of the photography
// side of the studio (brief Oct 9, photo <-> vidéo). SED, Alsace Habitat,
// SAS 3B, Sofitel, HMR and Galeries Lafayette, per feedback.
const reportagePreviewSlugs = [
  "once-upon-a-dime",
  "alsace-habitat",
  "sas3b",
  "sofitel-strasbourg",
  "maison-rouge",
  "galeries-lafayette-histoire",
  "vinci",
  "grand-angle",
  "k-et-plus",
  "skillcamp",
];

export default async function RushPage() {
  const reportagePreviews = (
    await withVimeoPosters(
      reportagePreviewSlugs
        .map((slug) => getProjectBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    )
  ).filter((p) => Boolean(p.image));

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>{eventOfferIntro.eyebrow}</EyebrowPill>
        <h1 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight sm:text-4xl">
          {eventOfferIntro.hook}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {eventOfferIntro.description}
        </p>
      </Reveal>

      {reportagePreviews.length > 0 && (
        <Reveal delay={0.08} className="mt-14">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Ce qu&rsquo;on capte sur le terrain
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {reportagePreviews.map((project) => (
              <Link
                key={project.slug}
                href={`/travaux/${project.slug}`}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={project.image!}
                  alt={`Reportage photo — ${project.client}`}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-mono uppercase tracking-[0.15em] text-white/80">
                  {project.client}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={0.14} className="mt-16">
        <OfferList offers={eventOffers} />
        <p className="mt-6 max-w-2xl text-sm text-muted">{eventOfferNote}</p>
      </Reveal>

      <Reveal
        delay={0.15}
        className="mt-20 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 className="max-w-md text-lg font-medium tracking-tight">
          Un événement à couvrir ?
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/travaux"
            className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Voir nos reportages →
          </Link>
          <Link
            href="/contact"
            className={cx(
              "group flex shrink-0 items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300",
              PAGE_ACCENT_CLASSES.cyan.solid,
              PAGE_ACCENT_CLASSES.cyan.hover
            )}
          >
            Discutons de votre projet
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

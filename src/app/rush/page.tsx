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
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/rush",
  title: "Rush — Reportage événementiel",
  description:
    "Un reportage photo et/ou vidéo pour votre événement, à partir de 500 € HT.",
});

// Real photos from past shoots — proof of the photography side of the
// studio, since this page was otherwise 100% text (brief Oct 9, photo ↔ vidéo).
const reportagePreviewSlugs = [
  "hollys-diner",
  "once-upon-a-dime",
  "squarea",
  "myfood",
];

export default function RushPage() {
  const reportagePreviews = reportagePreviewSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.image));

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

      <Reveal delay={0.1} className="mt-14">
        <OfferList offers={eventOffers} />
        <p className="mt-6 max-w-2xl text-sm text-muted">{eventOfferNote}</p>
      </Reveal>

      {reportagePreviews.length > 0 && (
        <Reveal delay={0.12} className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Ce qu&rsquo;on capte sur le terrain
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.15em] text-white/80">
                  {project.client}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

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
            className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Voir nos reportages →
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
    </div>
  );
}

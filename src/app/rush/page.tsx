import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { OfferList } from "@/components/offer-card";
import {
  eventOfferIntro,
  eventOffers,
  eventOfferNote,
} from "@/lib/content/event-offer";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/rush",
  title: "Rush — Reportage événementiel",
  description:
    "Un reportage photo et/ou vidéo pour votre événement, à partir de 500 € HT.",
});

export default function RushPage() {
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

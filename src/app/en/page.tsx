import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroShowreel } from "@/components/hero-showreel";
import { ClientCarousel } from "@/components/client-carousel";
import { ShortsStrip } from "@/components/shorts-strip";
import { Reveal } from "@/components/reveal";
import { getCaseStudies } from "@/lib/content/projects";
import { shorts } from "@/lib/content/shorts";
import { pageMetadata } from "@/lib/metadata";
import { withVimeoPosters } from "@/lib/vimeo";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

// English page chrome only — case-study descriptions and the services
// catalogue still live in French (src/lib/content). Translating that is
// a separate, much larger pass; this covers the main pages first.
//
// Same order as src/lib/content/services.ts's homeHighlights, so the color
// stays in sync with the canonical service->accent mapping in
// src/lib/service-colors.ts (which is keyed on the French titles — can't
// look it up directly with the translated ones here).
const homeHighlightsEn = [
  {
    title: "Brand films",
    description: "A story, a team, a film that tells it for real.",
    accent: "var(--accent-purple-lift)",
  },
  {
    title: "Social content",
    description: "Fast-cut vertical, built for the scroll — not for TV.",
    accent: "var(--accent-pink)",
  },
  {
    title: "Events",
    description: "The energy of your key moments, ready to share.",
    accent: "var(--accent-yellow)",
  },
  {
    title: "Corporate photography",
    description: "Your teams and behind-the-scenes, in images people trust.",
    accent: "var(--accent-cyan)",
  },
];

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/en",
    description:
      "Video and photo production agency in Strasbourg, France: ad spots, social and Ads videos, reports, interviews, brand films. 200+ brands served.",
    languages: { fr: "/", en: "/en", de: "/de" },
    ogLocale: "en_US",
  }),
  title: { absolute: "Video & Photo Production Agency in Strasbourg | Grub Studio" },
};

export default async function HomeEn() {
  const caseStudies = await withVimeoPosters(getCaseStudies());
  const shortsWithPosters = await withVimeoPosters(shorts);

  return (
    <>
      <HeroShowreel
        vimeoId="1236550368"
        vimeoIdMobile="1236997460"
        vimeoHashMobile="90c566b331"
        heading="Video & photo production agency in Strasbourg"
        catchphrase="Grub Studio, the content creator behind your favourite brands."
      />

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              What we&rsquo;ve made for them
            </h2>
            <Link
              href="/en/travaux"
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              All our work →
            </Link>
          </div>
          <div className="mt-10">
            <ClientCarousel projects={caseStudies} />
          </div>
        </div>
      </Reveal>

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              What we make
            </h2>
            <Link
              href="/en/services"
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              All services →
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {homeHighlightsEn.map((highlight) => (
              <li
                key={highlight.title}
                className="transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span
                  className="block h-1 w-10 rounded-full"
                  style={{ backgroundColor: highlight.accent }}
                />
                <p className="mt-3 text-base font-medium">{highlight.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
            How we work
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70">
            2 minutes to see how Nils and the team produce your content.
          </p>
          <div className="mt-8">
            <ShortsStrip shorts={shortsWithPosters} />
          </div>
        </div>
      </Reveal>

      <Reveal className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/studio/grub-cowork-salle.jpg"
            alt="A room at Grub Cowork, Parc Gruber"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background/25 sm:bg-gradient-to-r sm:from-background sm:via-background/88 sm:to-background/15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            The place
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/80">
            Le Grub is also a place: studio, set and coworking space at Parc
            Gruber. You can create there yourself, and we step in as the
            project grows, all the way to film production.
          </p>
          <a
            href="https://le-grub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Discover Grub Cowork →
          </a>
        </div>
      </Reveal>

      <Reveal className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
          <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
            A video or photo project to produce? Let&rsquo;s talk.
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
        </div>
      </Reveal>
    </>
  );
}

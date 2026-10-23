import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { productionPages } from "@/lib/content/production";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/production",
    title: "Production vidéo & photo à Strasbourg | Grub Studio",
    description:
      "Reportage événementiel, interview, spot publicitaire, film institutionnel, photo d'entreprise, motion design : toute la production vidéo et photo Grub Studio à Strasbourg.",
  }),
  keywords: [
    "agence de production vidéo Strasbourg",
    "production vidéo et photo entreprise Alsace",
  ],
};

export default function ProductionHubPage() {
  const structuredData = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Production", path: "/production" },
    ]),
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <SectionKicker kicker="Ce qu'on produit">
        Une production, un format pensé pour sa diffusion
      </SectionKicker>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
        Six formats de production vidéo et photo, chacun illustré par des
        projets qu&rsquo;on a vraiment livrés pour des entreprises à
        Strasbourg et en Alsace.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productionPages.map((page) => (
          <Reveal key={page.slug}>
            <Link
              href={`/production/${page.slug}`}
              className="group flex h-full flex-col border border-border p-6 transition-colors duration-300 hover:border-accent/60"
            >
              <EyebrowPill>{page.kicker}</EyebrowPill>
              <p className="mt-4 text-lg font-medium tracking-tight">
                {page.h1}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                {page.description}
              </p>
              <p className="mt-4 flex items-center gap-1 text-xs font-mono uppercase tracking-[0.15em] text-accent">
                Découvrir
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Une idée de projet ? Voyons ce qu&rsquo;on peut produire ensemble.
        </h2>
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
      </Reveal>
    </div>
  );
}

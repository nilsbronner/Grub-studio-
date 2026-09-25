import type { Metadata } from "next";
import Link from "next/link";
import { HorizontalProjectGrid } from "@/components/horizontal-project-grid";
import { ClientLogosBand } from "@/components/client-logos-band";
import { PitchNarrative } from "@/components/pitch-narrative";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { OfferList } from "@/components/offer-card";
import { ConseilCapsule } from "@/components/conseil-capsule";
import { getFeaturedProjects } from "@/lib/content/projects";
import { homeHighlights } from "@/lib/content/services";
import { offers } from "@/lib/content/offers";
import { withVimeoPosters } from "@/lib/vimeo";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { contact } from "@/lib/content/contact";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Agence de production vidéo à Strasbourg",
  description:
    "Spots pub, vidéos réseaux, films de marque et photo d'entreprise à Strasbourg. Un tournage, des contenus pour tous vos canaux. +200 marques accompagnées.",
});

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Grub Studio",
  parentOrganization: {
    "@type": "Organization",
    name: "LE GRUB SAS",
  },
  url: siteUrl,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.emailPro,
  address: {
    "@type": "PostalAddress",
    streetAddress: "91 route des Romains",
    postalCode: "67200",
    addressLocality: "Strasbourg",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.5777,
    longitude: 7.7097,
  },
};

export default async function Home() {
  const featured = await withVimeoPosters(getFeaturedProjects());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="pt-10 sm:pt-16">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_640px] lg:items-start">
            <div>
              <EyebrowPill>
                Grub Studio — Production audiovisuelle, Strasbourg
              </EyebrowPill>
              <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
                Un tournage. Des contenus pour tous vos réseaux.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground sm:text-xl">
                Studio de production vidéo et photo à Strasbourg. On écrit,
                on tourne et on décline vos contenus pour chaque format :
                spots pub, vidéos courtes, films de marque, événementiel.
              </p>
              <p className="mt-4 max-w-md text-sm text-muted">
                +200 marques accompagnées, dont Mercedes-Benz, Galeries
                Lafayette et Lidl.
              </p>

              <div className="mt-8 flex items-center gap-6">
                <Link
                  href="/travaux"
                  className="border border-border px-4 py-2 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Voir nos réalisations
                </Link>
                <Link
                  href="/contact"
                  className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                >
                  Parler de votre projet →
                </Link>
              </div>
            </div>

            <div className="hidden gap-5 lg:grid lg:grid-cols-2">
              <ConseilCapsule />
              <OfferList offers={offers.slice(0, 1)} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 sm:mt-14">
          <HorizontalProjectGrid projects={featured} />
        </Reveal>
      </section>

      <PitchNarrative />

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Ce qu&rsquo;on produit
            </h2>
            <Link
              href="/services"
              className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              Tous les services →
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {homeHighlights.map((highlight, i) => (
              <li
                key={highlight.title}
                className="pt-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ borderTop: `2px solid ${palette[i % 4]}` }}
              >
                <p className="text-base font-medium">{highlight.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-4 sm:mt-8">
        <Reveal>
          <ClientLogosBand />
        </Reveal>
      </div>

      <Reveal className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
          <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
            Un projet vidéo ou photo à produire ? Parlons-en.
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
        </div>
      </Reveal>
    </>
  );
}

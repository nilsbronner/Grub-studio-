import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClientLogosBand } from "@/components/client-logos-band";
import { HeroShowreel } from "@/components/hero-showreel";
import { ClientCarousel } from "@/components/client-carousel";
import { Reveal } from "@/components/reveal";
import { getCaseStudies } from "@/lib/content/projects";
import { homeHighlights } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { contact } from "@/lib/content/contact";
import { withVimeoPosters } from "@/lib/vimeo";

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
  sameAs: ["https://linktr.ee/nils.bronner"],
};

export default async function Home() {
  const caseStudies = await withVimeoPosters(getCaseStudies());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <HeroShowreel
        vimeoId="1214532172"
        catchphrase="GRUB. Le créateur de contenu de vos marques préférées."
      />

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Ce qu&rsquo;on a produit pour eux
            </h2>
            <Link
              href="/travaux"
              className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              Toutes nos réalisations →
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

      <Reveal className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/studio/grub-cowork-salle.jpg"
            alt="Une salle du Grub Cowork, au Parc Gruber"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background/25 sm:bg-gradient-to-r sm:from-background sm:via-background/88 sm:to-background/15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Le lieu
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/80">
            Le Grub, c&rsquo;est aussi un lieu : studio, plateau et coworking
            au Parc Gruber. Vous pouvez y créer vous-même, et on vient en
            appui quand le projet grandit, jusqu&rsquo;à la production
            ciné.
          </p>
          <a
            href="https://le-grub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Découvrir le Grub Cowork →
          </a>
        </div>
      </Reveal>

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

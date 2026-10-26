import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionKicker } from "@/components/section-kicker";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { CALENDLY_URL } from "@/lib/grub-bot-prompt";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/content/contact";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/photo",
    title: "Photographe à Strasbourg | Studio, reportage, packshot — Grub Studio",
    description:
      "Nils Bronner, photographe du Grub Studio : photo studio, reportage, studio chez vous et packshot produit à Strasbourg. Réservez directement un créneau.",
  }),
  keywords: [
    "photographe Strasbourg",
    "photo studio Strasbourg",
    "reportage photo entreprise Alsace",
    "packshot produit Strasbourg",
    "photographe portrait professionnel Strasbourg",
  ],
};

type Rubrique = {
  slug: string;
  title: string;
  description: string;
  images: [string, string];
  alt: string;
};

const rubriques: Rubrique[] = [
  {
    slug: "studio",
    title: "Photo studio",
    description:
      "Portraits d'équipe, visuels de marque, images pour vos réseaux : au studio du Grub, lumière et décor sont maîtrisés du premier au dernier cliché. Même rendu, même cohérence, quel que soit le nombre de personnes photographiées — et quel que soit le jour où elles passent devant l'objectif.",
    images: ["/images/projects/skillcamp.jpg", "/images/projects/skillcamp-2.jpg"],
    alt: "Portrait studio réalisé par Nils Bronner, Grub Studio",
  },
  {
    slug: "reportage",
    title: "Reportage photo",
    description:
      "Un événement, une inauguration, une vie d'équipe au quotidien : je capte ce qui se passe réellement, sans mise en scène, pour en tirer des images qui racontent une histoire vraie plutôt qu'une pose figée.",
    images: ["/images/photo/photo-reportage-1.jpg", "/images/photo/photo-reportage-2.jpg"],
    alt: "Reportage photo d'entreprise réalisé par Nils Bronner, Grub Studio",
  },
  {
    slug: "chez-vous",
    title: "Photo studio chez vous",
    description:
      "Le studio se déplace : éclairage et matériel professionnel installés directement dans vos locaux, pour des photos à la qualité studio sans que vous ayez à vous déplacer ni à fermer boutique un après-midi.",
    images: ["/images/photo/photo-chez-vous-1.jpg", "/images/photo/photo-chez-vous-2.jpg"],
    alt: "Studio photo mobile installé sur site par Nils Bronner, Grub Studio",
  },
  {
    slug: "packshot",
    title: "Packshot produit",
    description:
      "Des visuels produit nets et cohérents, en studio sur fond neutre ou en mise en situation, pensés pour votre catalogue, votre fiche e-commerce ou votre communication — avec le même traitement d'une référence à l'autre.",
    images: ["/images/photo/photo-packshot-1.jpg", "/images/photo/photo-packshot-2.jpg"],
    alt: "Packshot produit réalisé par Nils Bronner, Grub Studio",
  },
];

export default function PhotoPage() {
  const pageUrl = `${siteUrl}/photo`;
  const structuredData: object[] = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Photo", path: "/photo" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: contact.name,
      jobTitle: "Photographe",
      worksFor: { "@id": `${siteUrl}/#business` },
      url: pageUrl,
    },
    ...rubriques.map((r) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: r.title,
      description: r.description,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: [
        { "@type": "City", name: "Strasbourg" },
        { "@type": "AdministrativeArea", name: "Grand Est" },
      ],
      url: `${pageUrl}#${r.slug}`,
    })),
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <EyebrowPill>Photographie</EyebrowPill>
              <h1 className="mt-4 max-w-2xl text-2xl font-medium tracking-tight sm:text-4xl">
                Nils Bronner, photographe du Grub Studio
              </h1>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">
                Studio, reportage, chez vous ou en packshot produit — un seul
                photographe, un seul interlocuteur, pour des images qui
                servent vraiment votre marque. Catalogue personnel depuis
                2017, au service du Grub Studio.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  "mt-6 inline-flex items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5",
                  PAGE_ACCENT_CLASSES.pink.solid,
                  PAGE_ACCENT_CLASSES.pink.hover
                )}
              >
                Réserver un créneau
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-xl border border-border sm:w-56">
              <Image
                src="/images/team/nils-bronner-profile.jpg"
                alt="Nils Bronner, photographe"
                fill
                priority
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* 4 rubriques */}
      {rubriques.map((r, i) => (
        <Reveal key={r.slug} className="border-t border-border">
          <div
            id={r.slug}
            className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14"
          >
            <div
              className={cx(
                "grid grid-cols-2 gap-3",
                i % 2 === 1 && "lg:order-2"
              )}
            >
              {r.images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden border border-border"
                >
                  <Image
                    src={src}
                    alt={r.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
                {r.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">
                {r.description}
              </p>
              <a
                href={`${CALENDLY_URL}?utm_content=${r.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-accent hover:text-foreground"
              >
                Réserver pour ce format
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      ))}

      {/* Expert */}
      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionKicker kicker="L'expert" as="h2">
            Un seul photographe, un catalogue qui couvre tous les formats
          </SectionKicker>
          <p className="mt-6 max-w-2xl leading-relaxed text-foreground/70">
            Photographe depuis 2017, Nils a construit un catalogue qui va du
            portrait studio au reportage d&rsquo;entreprise, en passant par
            le produit et l&rsquo;architecture. Il pilote aussi la partie
            vidéo du Grub Studio — ce qui veut dire un seul interlocuteur
            pour l&rsquo;ensemble de votre image de marque, photo et vidéo
            confondues, du brief à la livraison.
          </p>
        </div>
      </Reveal>

      {/* Funnel — booking */}
      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
            Réservez votre créneau
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
            Un échange de 30 minutes pour parler de votre projet photo et
            fixer une date — directement dans l&rsquo;agenda de Nils.
          </p>
          <div className="mt-8 h-[700px] w-full overflow-hidden rounded-xl border border-border">
            <iframe
              src={`${CALENDLY_URL}?embed_domain=studio.le-grub.com&embed_type=Inline&hide_gdpr_banner=1`}
              title="Réserver un créneau avec Nils Bronner"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-xs text-muted">
            Besoin de nous écrire d&rsquo;abord ?{" "}
            <Link href="/contact" className="underline hover:text-accent">
              Contactez-nous
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}

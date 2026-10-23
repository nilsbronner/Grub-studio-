import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroShowreel } from "@/components/hero-showreel";
import { ClientCarousel } from "@/components/client-carousel";
import { ShortsStrip } from "@/components/shorts-strip";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { getCaseStudies } from "@/lib/content/projects";
import { homeHighlights } from "@/lib/content/services";
import { serviceColor } from "@/lib/service-colors";
import { shorts } from "@/lib/content/shorts";
import { pageMetadata } from "@/lib/metadata";
import { withVimeoPosters, getVimeoThumbnails } from "@/lib/vimeo";
import { faqJsonLd, jsonLd } from "@/lib/seo";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

const homeFaq = [
  {
    question: "Quel est le prix d'une production vidéo ou photo ?",
    answer:
      "Ça dépend du format et du livrable : un reportage événementiel démarre à 500 € HT, les autres formats (spot publicitaire, interview, film institutionnel, motion design) sont chiffrés sur devis selon la durée de tournage, l'équipe mobilisée et les déclinaisons demandées. On vous envoie un devis précis après un premier échange sur votre projet.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Un aftermovie événementiel est généralement livré sous 48 heures. Les projets plus longs — spot publicitaire, film institutionnel, interviews multi-sites — suivent un calendrier défini ensemble selon leur ampleur, avec des points d'étape si besoin.",
  },
  {
    question: "Intervenez-vous seulement à Strasbourg ?",
    answer:
      "Le studio est basé à Strasbourg et la majorité de nos tournages se déroulent en Alsace et dans le Grand Est, mais on se déplace partout en France pour les projets qui le demandent, notamment les interviews multi-sites.",
  },
  {
    question: "Avez-vous un studio sur place ?",
    answer:
      "Oui — le Grub dispose d'un plateau multicam, d'un fond vert et de fonds de couleur, ouvert aussi bien à nos propres tournages qu'aux indépendants en location dès 249 €.",
  },
];

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    description:
      "Agence de production vidéo et photo à Strasbourg : spots pub, vidéos Ads et réseaux, reportages, interviews, films de marque. +200 marques accompagnées.",
  }),
  title: { absolute: "Agence de production vidéo & photo à Strasbourg | Grub Studio" },
};

const HERO_VIMEO_ID = "1236550368";
const HERO_VIMEO_ID_MOBILE = "1236997460";
const HERO_VIMEO_HASH_MOBILE = "90c566b331";

export default async function Home() {
  const caseStudies = await withVimeoPosters(getCaseStudies());
  const shortsWithPosters = await withVimeoPosters(shorts);
  const heroThumbnails = await getVimeoThumbnails([
    { vimeoId: HERO_VIMEO_ID },
    { vimeoId: HERO_VIMEO_ID_MOBILE, vimeoHash: HERO_VIMEO_HASH_MOBILE },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(homeFaq)) }}
      />
      <HeroShowreel
        vimeoId={HERO_VIMEO_ID}
        vimeoIdMobile={HERO_VIMEO_ID_MOBILE}
        vimeoHashMobile={HERO_VIMEO_HASH_MOBILE}
        posterUrl={heroThumbnails[HERO_VIMEO_ID]}
        posterUrlMobile={heroThumbnails[HERO_VIMEO_ID_MOBILE]}
        heading="Agence de production vidéo & photo à Strasbourg"
        catchphrase="Grub Studio, le créateur de contenu de vos marques préférées."
      />

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
            Quatre façons de produire votre contenu
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">
                <Link
                  href="/production/reportage-evenementiel"
                  className="hover:text-accent"
                >
                  Reportage photo & vidéo événementiel
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Une soirée de lancement, une inauguration, un salon
                professionnel : ce qui s&rsquo;y passe ne se refait pas le
                lendemain. On couvre vos événements d&rsquo;entreprise à
                Strasbourg et dans le Grand Est avec un reportage photo et
                vidéo pensé pour une diffusion rapide — un aftermovie
                généralement livré sous 48 heures, pendant que
                l&rsquo;événement est encore d&rsquo;actualité. Le format
                reportage démarre dès 500&nbsp;€ HT pour une demi-journée, et
                s&rsquo;adapte aussi bien à une soirée de 30 personnes
                qu&rsquo;à un salon sur plusieurs jours.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">
                <Link
                  href="/production/interview-temoignage"
                  className="hover:text-accent"
                >
                  Interview & vidéo témoignage
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Une interview filmée réussie ne ressemble pas à un oral
                récité face caméra. On prépare un fil d&rsquo;entretien avec
                vous, on tourne dans un décor qui raconte votre activité
                plutôt qu&rsquo;un studio neutre, puis on monte pour garder
                ce qui sonne vrai. Témoignages clients, interviews de
                dirigeants pour une campagne marque employeur, portraits
                d&rsquo;équipe : chaque interview est ensuite déclinée au
                format qui lui correspond, du site web aux extraits courts
                pour les réseaux.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">
                <Link
                  href="/production/spot-publicitaire"
                  className="hover:text-accent"
                >
                  Spot publicitaire & Ads
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Un spot publicitaire se construit à l&rsquo;envers : on part
                de l&rsquo;endroit où il sera vu — réseaux, web, radio —
                pour en déduire sa durée et son rythme, avant même
                d&rsquo;écrire le script. Script, casting, direction
                artistique, tournage : on produit des spots qui se déclinent
                ensuite en plusieurs formats, verticaux pour les réseaux,
                courts pour l&rsquo;Ads, longs pour le web. Le même tournage
                peut aussi nourrir des campagnes testées et ajustées en
                continu.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">
                <Link
                  href="/production/photo-entreprise"
                  className="hover:text-accent"
                >
                  Photo d&rsquo;entreprise
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Portraits d&rsquo;équipe cohérents sur plusieurs années,
                reportage dans vos locaux pour montrer vos coulisses, photos
                produit nettes pour un catalogue : la photo d&rsquo;entreprise
                couvre des besoins différents mais demande la même exigence
                de constance. On documente un gabarit de prise de vue dès la
                première séance, pour que chaque nouvelle photo s&rsquo;intègre
                sans rupture visuelle dans la galerie existante — que ce soit
                en studio ou dans vos locaux.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Questions fréquentes
            </h2>
            <div className="mt-8 max-w-2xl">
              <FaqAccordion items={homeFaq} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Ce qu&rsquo;on a produit pour eux
            </h2>
            <Link
              href="/travaux"
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
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
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              Tous les services →
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {homeHighlights.map((highlight) => (
              <li
                key={highlight.title}
                className="transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Link href={`/production/${highlight.productionSlug}`}>
                  <span
                    className="block h-1 w-10 rounded-full"
                    style={{ backgroundColor: serviceColor(highlight.title) }}
                  />
                  <p className="mt-3 text-base font-medium hover:text-accent">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {highlight.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
            Comment on travaille
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70">
            2 minutes pour comprendre comment Nils et l&rsquo;équipe
            produisent vos contenus.
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
            alt="Une salle du Grub Cowork, au Parc Gruber"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background/25 sm:bg-gradient-to-r sm:from-background sm:via-background/88 sm:to-background/15" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
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
            className="mt-5 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
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
    </>
  );
}

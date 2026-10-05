import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  videoServices,
  photoServices,
  diffusionFormats,
} from "@/lib/content/services";
import { studioOffers } from "@/lib/content/studio-offers";
import { offers } from "@/lib/content/offers";
import { shorts } from "@/lib/content/shorts";
import {
  campaignIntro,
  campaignTransformation,
  campaignMethod,
  campaignOneMonth,
  campaignThreeMonths,
  campaignThreeMonthsOption,
  campaignConditions,
  campaignFaq,
  campaignCta,
} from "@/lib/content/campaign-package";
import { withVimeoPosters } from "@/lib/vimeo";
import { ShortsStrip } from "@/components/shorts-strip";
import { Reveal } from "@/components/reveal";
import { ServiceCardList } from "@/components/service-card-list";
import { FormatShowcase } from "@/components/format-showcase";
import { OfferList } from "@/components/offer-card";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { PricingTable } from "@/components/pricing-table";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Vidéo & photo pour entreprises à Strasbourg — Services",
  description:
    "Vidéo et photo pour les marques : spot pub, Ads, contenu réseaux, aftermovie, reportage, interview, podcast, motion design, portraits, packshots, événementiel.",
});

export default async function ServicesPage() {
  const shortsWithPosters = await withVimeoPosters(shorts);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Ce qu&rsquo;on fait</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Vidéo et photo pour les marques qui veulent être vues.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          On part de l&rsquo;endroit où votre contenu sera diffusé (site,
          LinkedIn, pub, salon) pour décider comment le tourner. Pas
          l&rsquo;inverse.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Pour démarrer
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Un format clé en main à prix fixe, un audit gratuit, ou un projet
          sur-mesure.
        </p>
        <div className="mt-6">
          <OfferList offers={offers} />
        </div>
      </Reveal>

      <Reveal className="mt-20 border-t border-border pt-16">
        <EyebrowPill>{campaignIntro.eyebrow}</EyebrowPill>
        <h2 className="mt-4 max-w-2xl text-xl font-medium tracking-tight sm:text-2xl">
          {campaignIntro.hook}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          {campaignIntro.description}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {campaignIntro.audience}
        </p>
        <p className="mt-6 text-3xl font-bold tracking-tight">
          {campaignIntro.priceHeadline}
        </p>

        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            Une interview peut devenir
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {campaignTransformation.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-accent-pink">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            Méthode
          </h3>
          <ol className="mt-4 grid gap-6 sm:grid-cols-4">
            {campaignMethod.map((step) => (
              <li key={step.step}>
                <p className="font-mono text-xs text-accent-pink">
                  {String(step.step).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
                {step.description && (
                  <p className="mt-1 text-xs text-muted">
                    {step.description}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 space-y-3">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            {campaignOneMonth.title}
          </h3>
          <PricingTable table={campaignOneMonth} />
        </div>

        <div className="mt-10 space-y-3">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            {campaignThreeMonths.title}
          </h3>
          <PricingTable table={campaignThreeMonths} />
          <p className="text-xs text-muted">{campaignThreeMonthsOption}</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            Conditions
          </h3>
          <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-muted">
            {campaignConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted">
            Questions fréquentes
          </h3>
          <dl className="mt-4 space-y-5">
            {campaignFaq.map((item) => (
              <div key={item.question}>
                <dt className="text-sm font-medium">{item.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">{campaignCta.line}</p>
            <p className="mt-1 text-sm italic text-muted">
              {campaignCta.tagline}
            </p>
          </div>
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

      <Reveal className="mt-20 border-t border-border pt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Vidéo
        </h2>
        <ServiceCardList services={videoServices} />
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Photo
        </h2>
        <ServiceCardList services={photoServices} />
      </Reveal>

      <Reveal className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-10">
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Le studio
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
            Un plateau au Parc Gruber, avec ou sans accompagnement.
          </p>
          <ServiceCardList services={studioOffers} />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden lg:order-last">
          <Image
            src="/images/studio/plateau-podcast.jpg"
            alt="Le plateau podcast du Grub, Parc Gruber"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background to-transparent lg:block" />
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Nos services, expliqués par Nils
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          2 min pour savoir ce qu&rsquo;on peut faire pour vous.
        </p>
        <div className="mt-6">
          <ShortsStrip shorts={shortsWithPosters} />
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Formats de diffusion
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          {diffusionFormats.intro}
        </p>
        <div className="mt-8">
          <FormatShowcase formats={diffusionFormats.formats} />
        </div>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Une idée de projet ? Voyons ce qu&rsquo;on peut produire ensemble.
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
      </Reveal>
    </div>
  );
}

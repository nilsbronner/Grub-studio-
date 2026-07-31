import type { Metadata } from "next";
import Link from "next/link";
import {
  videoServices,
  photoServices,
  diffusionFormats,
} from "@/lib/content/services";
import { ShortsStrip } from "@/components/shorts-strip";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vidéo et photo pour les marques : spot pub, ADS, contenu réseaux, aftermovie, reportage, interview, podcast, motion design, portraits, packshots, événementiel.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Services
        </h1>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Vidéo
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {videoServices.map((service) => (
            <li
              key={service.slug}
              className="group border-t border-border pt-4 transition-colors duration-300 hover:border-accent"
            >
              <p className="text-sm font-medium">{service.title}</p>
              <p className="mt-1 text-sm text-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Photo
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {photoServices.map((service) => (
            <li
              key={service.slug}
              className="group border-t border-border pt-4 transition-colors duration-300 hover:border-accent"
            >
              <p className="text-sm font-medium">{service.title}</p>
              <p className="mt-1 text-sm text-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Nos services, expliqués par Nils
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Quelques minutes pour comprendre comment on travaille, poste par
          poste — la version courte, en vidéo.
        </p>
        <div className="mt-6">
          <ShortsStrip />
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Formats de diffusion
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {diffusionFormats.intro}
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {diffusionFormats.formats.map((format) => (
            <li
              key={format.ratio}
              className="border-t border-border pt-4 transition-colors duration-300 hover:border-accent"
            >
              <p className="font-mono text-xs text-muted">{format.ratio}</p>
              <p className="mt-2 text-sm font-medium">{format.label}</p>
              <p className="mt-1 text-sm text-muted">{format.usage}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Une idée de projet ? Voyons ce qu&rsquo;on peut produire ensemble.
        </h2>
        <Link
          href="/contact"
          data-cursor="→"
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

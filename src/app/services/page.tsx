import type { Metadata } from "next";
import Link from "next/link";
import {
  videoServices,
  photoServices,
  diffusionFormats,
} from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vidéo et photo pour les marques : spot pub, ADS, contenu réseaux, aftermovie, reportage, interview, podcast, motion design, portraits, packshots, événementiel.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
        Services
      </h1>

      <section className="mt-14">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Vidéo
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {videoServices.map((service) => (
            <li key={service.slug} className="border-t border-border pt-4">
              <p className="text-sm font-medium">{service.title}</p>
              <p className="mt-1 text-sm text-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Photo
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {photoServices.map((service) => (
            <li key={service.slug} className="border-t border-border pt-4">
              <p className="text-sm font-medium">{service.title}</p>
              <p className="mt-1 text-sm text-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Formats de diffusion
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {diffusionFormats.intro}
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {diffusionFormats.formats.map((format) => (
            <li key={format.ratio} className="border-t border-border pt-4">
              <p className="font-mono text-xs text-muted">{format.ratio}</p>
              <p className="mt-2 text-sm font-medium">{format.label}</p>
              <p className="mt-1 text-sm text-muted">{format.usage}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-border pt-8">
        <Link
          href="/studio"
          className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
        >
          Voir la méthode →
        </Link>
        <Link
          href="/contact"
          className="border border-border px-4 py-2 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

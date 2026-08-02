import type { Metadata } from "next";
import Link from "next/link";
import {
  videoServices,
  photoServices,
  diffusionFormats,
} from "@/lib/content/services";
import { shorts } from "@/lib/content/shorts";
import { withVimeoPosters } from "@/lib/vimeo";
import { ShortsStrip } from "@/components/shorts-strip";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vidéo et photo pour les marques : spot pub, ADS, contenu réseaux, aftermovie, reportage, interview, podcast, motion design, portraits, packshots, événementiel.",
};

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

export default async function ServicesPage() {
  const shortsWithPosters = await withVimeoPosters(shorts);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Ce qu&rsquo;on fait</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          Services
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70">
          Écriture, tournage, montage — vidéo et photo pour les marques,
          pensés pour leur diffusion réelle plutôt que pour le seul jour du
          tournage.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Vidéo
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {videoServices.map((service, i) => (
            <li
              key={service.slug}
              className="pt-4 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderTop: `2px solid ${palette[i % 4]}` }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-xs"
                  style={{ color: palette[i % 4] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-medium">{service.title}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
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
        <ul className="mt-6 grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {photoServices.map((service, i) => (
            <li
              key={service.slug}
              className="pt-4 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderTop: `2px solid ${palette[i % 4]}` }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-xs"
                  style={{ color: palette[i % 4] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-medium">{service.title}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
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
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Quelques minutes pour comprendre comment on travaille, poste par
          poste — la version courte, en vidéo.
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
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {diffusionFormats.formats.map((format, i) => (
            <li
              key={format.ratio}
              className="pt-4 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderTop: `2px solid ${palette[i % 4]}` }}
            >
              <p className="font-mono text-xs" style={{ color: palette[i % 4] }}>
                {format.ratio}
              </p>
              <p className="mt-2 text-base font-medium">{format.label}</p>
              <p className="mt-1 text-sm text-foreground/70">{format.usage}</p>
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

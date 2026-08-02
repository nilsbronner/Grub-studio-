import Link from "next/link";
import { HorizontalProjectGrid } from "@/components/horizontal-project-grid";
import { ClientLogosBand } from "@/components/client-logos-band";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { getFeaturedProjects } from "@/lib/content/projects";
import { homeHighlights } from "@/lib/content/services";

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="pt-10 sm:pt-16">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <EyebrowPill>Studio Bemotion</EyebrowPill>
          <div className="hero-subhead-trigger mt-4 inline-block">
            <h1 className="max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
              Bemotion. Studio de production audiovisuelle, Strasbourg.
            </h1>
            <p className="hero-subhead mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
              On écrit, on tourne et on monte des films et des photos pour des
              marques qui ont quelque chose à raconter — de la première idée
              au fichier prêt à diffuser.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <HorizontalProjectGrid projects={featured} />
        </Reveal>

        <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/travaux"
            className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Tous les travaux →
          </Link>
          <Link
            href="/contact"
            data-cursor="→"
            className="border border-border px-4 py-2 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            Contact
          </Link>
        </div>
      </section>

      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
              Ce qu&rsquo;on produit
            </h2>
            <Link
              href="/services"
              data-cursor="→"
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
            data-cursor="→"
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team, studioPositioning, methodSteps } from "@/lib/content/team";
import { Reveal } from "@/components/reveal";
import { TournageDiagram } from "@/components/tournage-diagram";
import { MethodTimeline } from "@/components/method-timeline";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "L'équipe Bemotion : Nils Bronner et une équipe interne resserrée, renforcée par un réseau de freelances et studios partenaires.",
};

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          Studio
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {studioPositioning}
        </p>
      </Reveal>

      <Reveal className="mt-14 border-t border-border pt-12">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Un tournage, plusieurs contenus
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
          À partir d&rsquo;un spot principal, nous créons une série de
          contenus déclinés pour chaque cible.
        </p>
        <TournageDiagram />
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.05}>
            <div className="group relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-[#141412]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <span className="font-mono text-2xl text-muted transition-colors duration-300 group-hover:text-foreground">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm font-medium">{member.name}</p>
            <p className="text-xs text-muted">{member.role}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Méthode — une production en 5 étapes clés
        </h2>
        <MethodTimeline steps={methodSteps} />
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-xl text-xl font-medium tracking-tight sm:text-2xl">
          Envie de travailler avec nous ?
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

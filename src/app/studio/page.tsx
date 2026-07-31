import type { Metadata } from "next";
import Image from "next/image";
import { team, studioPositioning, methodSteps } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "L'équipe Bemotion : Nils Bronner et une équipe interne resserrée, renforcée par un réseau de freelances et studios partenaires.",
};

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
        Studio
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {studioPositioning}
      </p>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {team.map((member) => (
          <div key={member.name}>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-[#141412]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <span className="font-mono text-2xl text-muted">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm font-medium">{member.name}</p>
            <p className="text-xs text-muted">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
          Méthode
        </h2>
        <ol className="mt-6 grid gap-8 sm:grid-cols-5">
          {methodSteps.map((step) => (
            <li key={step.step}>
              <p className="font-mono text-xs text-muted">
                {String(step.step).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

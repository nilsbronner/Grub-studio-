import Image from "next/image";
import Link from "next/link";
import type { ServiceCase } from "@/lib/content/service-cases";
import type { Project } from "@/lib/content/projects";

export type ResolvedServiceCase = ServiceCase & { project: Project };

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

export function ServiceCaseGrid({ cases }: { cases: ResolvedServiceCase[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
      {cases.map((item, i) => {
        const project = item.project;
        const color = palette[i % palette.length];
        return (
          <Link
            key={item.caseSlug}
            href={`/travaux/${project.slug}`}
            className="group flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60 sm:w-[400px]"
          >
            <div
              className="relative aspect-video bg-cover bg-center"
              style={
                project.image
                  ? undefined
                  : {
                      backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
                    }
              }
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 400px, 85vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.15em] text-white/70">
                {project.client}
              </p>
            </div>
            <div
              className="flex flex-1 flex-col p-6"
              style={{ borderTop: `2px solid ${color}` }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color }}
              >
                {item.service}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                {item.description}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-300 group-hover:text-accent">
                Voir le cas →
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

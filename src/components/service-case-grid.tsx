import Image from "next/image";
import Link from "next/link";
import type { ServiceCase } from "@/lib/content/service-cases";
import { coverImage, type Project } from "@/lib/content/projects";
import { serviceColor } from "@/lib/service-colors";
import { cx } from "@/lib/cx";

export type ResolvedServiceCase = ServiceCase & { project: Project };

export function ServiceCaseGrid({ cases }: { cases: ResolvedServiceCase[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((item) => {
        const project = item.project;
        const color = serviceColor(item.service);
        const image = coverImage(project);
        return (
          <Link
            key={item.caseSlug}
            href={`/travaux/${project.slug}`}
            className="group flex flex-col overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60"
          >
            <div
              className="relative aspect-video bg-cover bg-center"
              style={
                image
                  ? undefined
                  : {
                      backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
                    }
              }
            >
              {image && (
                <>
                  <Image
                    src={image}
                    alt=""
                    fill
                    aria-hidden
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="scale-110 object-cover opacity-70 blur-2xl"
                  />
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </>
              )}
              {!image && project.logo && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className={cx(
                      "flex h-12 items-center rounded-full px-4",
                      project.logoOnDark ? "bg-black/80" : "bg-white"
                    )}
                  >
                    <div className="relative h-7 w-16">
                      <Image
                        src={project.logo}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs font-mono uppercase tracking-[0.15em] text-white/70">
                {project.client}
              </p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span
                className="block h-1 w-10 rounded-full"
                style={{ backgroundColor: color }}
              />
              <p
                className="mt-3 text-xs font-semibold font-mono uppercase tracking-[0.15em]"
                style={{ color }}
              >
                {item.service}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                {item.description}
              </p>
              <p
                style={{ color }}
                className="mt-4 flex items-center gap-1 text-xs font-mono uppercase tracking-[0.15em] transition-transform duration-300"
              >
                Voir le cas
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/projects";

export function ClientCarousel({ projects }: { projects: Project[] }) {
  return (
    <div className="relative">
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/travaux/${project.slug}`}
            className="group flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60 sm:w-[360px]"
          >
            <div
              className="relative aspect-[4/3] bg-cover bg-center"
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
                  sizes="(min-width: 640px) 320px, 70vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.15em] text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Voir le projet →
              </p>
            </div>

            {/* Logo band — shows the real client logo once supplied; falls back to the name as a wordmark. Logo/name left, sector right. */}
            <div className="flex h-16 shrink-0 items-center justify-between gap-3 bg-foreground px-4 text-background">
              {project.logo ? (
                <div className="relative h-7 w-28 shrink-0">
                  <Image
                    src={project.logo}
                    alt={project.client}
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <p className="min-w-0 truncate text-base font-semibold leading-tight tracking-tight">
                  {project.client}
                </p>
              )}
              <p
                title={project.sector}
                className="w-24 shrink-0 truncate text-right text-[11px] uppercase leading-tight tracking-[0.1em] text-background/60"
              >
                {project.sector}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

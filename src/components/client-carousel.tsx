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
            className="group relative aspect-[4/5] w-[70vw] shrink-0 snap-start overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60 sm:w-[320px]"
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
            {/* Bottom scrim fading up into the full, uncropped photo. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              {project.logo && (
                <div className="relative mb-2 h-7 w-28">
                  <Image
                    src={project.logo}
                    alt={project.client}
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>
              )}
              <p className="text-lg font-semibold leading-tight tracking-tight text-white">
                {project.client}
              </p>
              <p className="mt-1 text-xs font-mono uppercase tracking-[0.15em] text-white/60">
                {project.sector}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

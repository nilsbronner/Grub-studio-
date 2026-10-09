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
            className="group relative aspect-[4/5] w-[70vw] shrink-0 snap-start overflow-hidden bg-cover bg-center sm:w-[320px]"
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                {project.sector}
              </p>
              <p className="mt-1 text-lg font-medium text-white">
                {project.client}
              </p>
              <p className="mt-2 text-xs text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Voir le projet →
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/20" />
          </Link>
        ))}
      </div>
    </div>
  );
}

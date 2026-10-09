import Image from "next/image";
import Link from "next/link";
import type { ServiceCase } from "@/lib/content/service-cases";
import { getProjectBySlug } from "@/lib/content/projects";

export function ServiceCaseGrid({ cases }: { cases: ServiceCase[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {cases.map((item) => {
        const project = getProjectBySlug(item.caseSlug);
        if (!project) return null;
        return (
          <Link
            key={item.caseSlug}
            href={`/travaux/${project.slug}`}
            className="group flex flex-col overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60"
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
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.15em] text-white/70">
                {project.client}
              </p>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-base font-medium">{item.service}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
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

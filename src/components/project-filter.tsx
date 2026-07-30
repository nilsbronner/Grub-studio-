"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories } from "@/lib/content/categories";
import type { Project } from "@/lib/content/projects";
import { cx } from "@/lib/cx";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!active) return projects;
    return projects.filter((p) => p.categories.includes(active));
  }, [projects, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cx(
            "border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors",
            active === null
              ? "border-accent text-accent"
              : "border-border text-muted hover:text-foreground"
          )}
        >
          Tout
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            className={cx(
              "border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors",
              active === cat.slug
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted">
          Projets à venir dans cette catégorie.
        </p>
      )}
    </div>
  );
}

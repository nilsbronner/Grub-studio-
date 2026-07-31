"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { HorizontalProjectGrid } from "@/components/horizontal-project-grid";
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
            "border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5",
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
              "border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5",
              active === cat.slug
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {active === null ? (
        <div className="mt-10">
          <HorizontalProjectGrid projects={projects} />
        </div>
      ) : (
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {active !== null && filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted">
          Projets à venir dans cette catégorie.
        </p>
      )}
    </div>
  );
}

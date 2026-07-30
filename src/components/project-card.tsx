import { VideoTile } from "@/components/video-tile";
import { categoryLabel } from "@/lib/content/categories";
import type { Project } from "@/lib/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <VideoTile project={project} />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{project.client}</p>
          <p className="text-xs text-muted">{project.sector}</p>
        </div>
        <p className="text-right text-xs text-muted">
          {project.categories.map((c) => categoryLabel(c)).join(" · ")}
        </p>
      </div>
    </article>
  );
}

import { VideoRow } from "@/components/video-row";
import type { Project } from "@/lib/content/projects";

function chunk<T>(arr: T[], n: number): T[][] {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * size, i * size + size)
  ).filter((c) => c.length > 0);
}

export function HorizontalProjectGrid({ projects }: { projects: Project[] }) {
  const rows = chunk(projects, 3);

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <VideoRow
          key={i}
          projects={row}
          reverse={i % 2 === 1}
          speed={0.5 + i * 0.15}
          startOffset={i * 0.18}
          priorityFirst={i === 0}
        />
      ))}
    </div>
  );
}

import { ShortTile } from "@/components/short-tile";
import { shorts } from "@/lib/content/shorts";

export function ShortsStrip() {
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
      {shorts.map((short) => (
        <ShortTile
          key={short.slug}
          short={short}
          className="w-[46vw] shrink-0 sm:w-[220px]"
        />
      ))}
    </div>
  );
}

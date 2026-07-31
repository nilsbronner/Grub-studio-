import Image from "next/image";
import { clientLogos, clientVolumetry } from "@/lib/content/clients";

export function ClientLogosBand() {
  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="relative aspect-[2400/1269] w-full">
          <Image
            src="/images/client-logos-wall.jpg"
            alt={`${clientVolumetry} : ${clientLogos.join(", ")}`}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

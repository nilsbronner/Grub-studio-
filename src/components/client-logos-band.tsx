"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clientLogos, clientVolumetry } from "@/lib/content/clients";

export function ClientLogosBand() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
      <motion.div
        className="relative aspect-[2400/1269] w-full"
        initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/client-logos-wall.webp"
          alt={`${clientVolumetry} : ${clientLogos.join(", ")}`}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-contain"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

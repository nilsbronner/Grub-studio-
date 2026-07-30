import Link from "next/link";
import { HorizontalProjectGrid } from "@/components/horizontal-project-grid";
import { ClientLogosBand } from "@/components/client-logos-band";
import { getFeaturedProjects } from "@/lib/content/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h1 className="max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
            Bemotion. Studio de production audiovisuelle, Strasbourg.
          </h1>
        </div>

        <div className="mt-8 sm:mt-10">
          <HorizontalProjectGrid projects={featured} />
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/travaux"
            className="text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Tous les travaux →
          </Link>
          <Link
            href="/contact"
            className="border border-border px-4 py-2 text-sm uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            Contact
          </Link>
        </div>
      </section>

      <div className="mt-16 sm:mt-24">
        <ClientLogosBand />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Travaux",
  description:
    "Spots pub, campagnes ADS, contenu réseaux, motion design et photo B2B — les productions Bemotion.",
};

export default function TravauxPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
        Travaux
      </h1>
      <div className="mt-10">
        <ProjectFilter projects={projects} />
      </div>
    </div>
  );
}

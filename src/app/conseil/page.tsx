import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { ConseilForm } from "@/components/conseil-form";

export const metadata: Metadata = {
  title: "Grub Conseil",
  description:
    "Un audit gratuit sur le sujet de votre choix : quelques questions, une réponse personnalisée de Nils avec des recommandations concrètes. Gratuit, sans engagement.",
};

const steps = [
  {
    step: 1,
    title: "Vous remplissez le formulaire",
    description:
      "Le sujet sur lequel vous voulez un avis, et où vous en êtes aujourd'hui.",
  },
  {
    step: 2,
    title: "Nils étudie votre situation",
    description:
      "Il prépare un retour personnalisé, sans jargon ni argumentaire commercial.",
  },
  {
    step: 3,
    title: "Vous recevez vos recommandations",
    description:
      "Ce que Grub Studio peut vous apporter, ou directement la bonne personne si ce n'est pas nous. Gratuit, sans engagement.",
  },
];

export default function ConseilPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Gratuit</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-4xl">
          Grub Conseil
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Un audit gratuit sur le sujet de votre choix. Quelques questions,
          envoyées directement à Nils, qui vous répond avec un vrai conseil
          et des recommandations sur ce que Grub Studio peut vous apporter —
          ou vous met en relation avec la bonne personne si ce n&rsquo;est
          pas nous. Sans engagement.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <ol className="grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step}>
              <p className="font-mono text-xs text-accent">
                {String(s.step).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium">{s.title}</p>
              <p className="mt-1 text-sm text-muted">{s.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal
        delay={0.15}
        className="mt-14 max-w-2xl border-t border-border pt-12"
      >
        <ConseilForm />
      </Reveal>
    </div>
  );
}

import Link from "next/link";

const steps = [
  "Vous remplissez le formulaire",
  "Nils étudie votre situation",
  "Vous recevez vos recommandations",
];

export function ConseilCapsule() {
  return (
    <Link
      href="/conseil"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border p-6 transition-colors hover:border-accent"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-accent-cyan" />

      <p className="min-h-[3.5rem] text-xl font-semibold tracking-tight">
        Grub Conseil
      </p>
      <p className="mt-3 min-h-[5.75rem] text-sm leading-relaxed text-foreground/60">
        Un audit gratuit sur le sujet de votre choix, avec les
        recommandations de Nils.
      </p>

      <ol className="mt-5 space-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-2 text-sm">
            <span className="font-mono text-xs text-accent-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-accent-cyan">
            Gratuit
          </span>
          <span className="text-sm text-muted">sans engagement</span>
        </div>

        <span className="mt-6 flex items-center justify-center gap-2 border border-border py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 group-hover:border-accent group-hover:text-accent">
          En savoir plus
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

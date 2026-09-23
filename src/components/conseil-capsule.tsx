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
      <p className="text-xs uppercase tracking-[0.15em] text-accent-cyan">
        Gratuit
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight">
        Grub Conseil
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/60">
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

      <span className="mt-auto flex items-center gap-2 pt-6 text-sm uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-accent">
        En savoir plus
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

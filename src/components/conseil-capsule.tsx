import Link from "next/link";

export function ConseilCapsule() {
  return (
    <Link
      href="/conseil"
      className="group relative block overflow-hidden rounded-xl border border-border p-6 transition-colors hover:border-accent"
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
      <span className="mt-4 flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-accent">
        En savoir plus
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

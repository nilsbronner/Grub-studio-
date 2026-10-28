import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { BookingButton } from "@/components/offer-landing";
import { contact } from "@/lib/content/contact";
import { pageMetadata } from "@/lib/metadata";

const SOURCE = "Page promoteurs — Vendu avant d'exister";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/promoteurs/vendu-avant-d-exister",
    title: "Vendu avant d'exister — contenu pour promoteurs immobiliers",
    description:
      "Grub Studio aide les promoteurs immobiliers à réussir leurs préventes en rendant leurs projets visibles bien avant la première pierre. Strasbourg et Bas-Rhin.",
  }),
  keywords: [
    "contenu promoteur immobilier Strasbourg",
    "vidéo programme immobilier neuf",
    "reportage chantier immobilier Alsace",
    "communication préventes immobilier",
  ],
};

const STATS = [
  {
    value: "-18 %",
    label: "de réservations de logements neufs en France au 1er semestre 2026",
    source: "Source : FPI",
    accent: "var(--accent-purple)",
  },
  {
    value: "10,5 mois",
    label: "pour écouler un logement neuf dans l'Eurométropole",
    source: "Source : DREAL Grand Est, 2024",
    accent: "var(--accent)",
  },
  {
    value: "1 700",
    label: "logements neufs en stock dans l'Eurométropole",
    source: "Source : DREAL Grand Est, 2024",
    accent: "var(--accent-cyan)",
  },
];

const RESPONSE = [
  {
    title: "Voir.",
    text: "Le bâtiment fini, dans son vrai quartier, avant le premier coup de pelle.",
  },
  {
    title: "Visiter.",
    text: "Le futur logement, pièce par pièce, à partir de vos plans.",
  },
  {
    title: "Suivre.",
    text: "Le chantier, mois après mois, pour que vos réservataires restent convaincus.",
  },
];

const CYCLE = [
  {
    step: "Lancement",
    text: "Donner envie dès la commercialisation.",
    accent: "var(--accent-purple)",
  },
  {
    step: "Chantier",
    text: "Faire de chaque étape une preuve.",
    accent: "var(--accent)",
  },
  {
    step: "Livraison",
    text: "Vendre les derniers lots, célébrer.",
    accent: "var(--accent-yellow)",
  },
  {
    step: "Après",
    text: "Raconter le projet pour vendre le suivant.",
    accent: "var(--accent-cyan)",
  },
];

const TRUSTED = [
  { role: "Promoteur", name: "SAS 3B", logo: "/images/logos/sas3b.png" },
  {
    role: "Bailleur",
    name: "Alsace Habitat · Opus 67",
    logo: "/images/logos/alsace-habitat.png",
  },
  { role: "Promoteur", name: "Nexity" },
  {
    role: "Constructeur",
    name: "VINCI Construction",
    logo: "/images/logos/vinci.svg",
  },
  { role: "Constructeur", name: "Rabot Dutilleul" },
  { role: "Second œuvre", name: "Métallerie Hanssen" },
];

export default function VenduAvantDExisterPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      {/* 1 — Hero */}
      <Reveal>
        <EyebrowPill>Promoteurs immobiliers · Strasbourg &amp; Bas-Rhin</EyebrowPill>
        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
          Vendu avant d&rsquo;exister.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Grub Studio aide les promoteurs à réussir leurs préventes, en
          rendant leurs projets visibles bien avant la première pierre.
        </p>
        <div className="mt-8">
          <BookingButton accent="purple" source={SOURCE}>
            En parler en 20 minutes
          </BookingButton>
        </div>
      </Reveal>

      {/* 2 — Le problème */}
      <Reveal delay={0.05} className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Le problème
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          Pas de préventes, pas de chantier.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Le financement d&rsquo;un projet dépend de ses premières
          réservations. Et vos acquéreurs doivent s&rsquo;engager sur un
          logement qu&rsquo;ils ne peuvent ni voir, ni visiter.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="border-t-[3px] border-border p-5"
              style={{ borderTopColor: s.accent }}
            >
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.label}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
                {s.source}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 3 — Notre réponse */}
      <Reveal delay={0.05} className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Notre réponse
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          Rendre visible ce qui n&rsquo;existe pas encore.
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {RESPONSE.map((r) => (
            <div key={r.title}>
              <p className="text-xl font-medium">
                {r.title.replace(".", "")}
                <span className="text-accent-yellow">.</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 4 — Un seul studio */}
      <Reveal delay={0.05} className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Un seul studio
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          Du terrain nu à la remise des clés.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CYCLE.map((c) => (
            <div
              key={c.step}
              className="border-t-[3px] border-border p-5"
              style={{ borderTopColor: c.accent }}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.15em]"
                style={{ color: c.accent }}
              >
                {c.step}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 5 — Ils nous font confiance */}
      <Reveal delay={0.05} className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Ils nous font confiance
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          6 ans de chantiers suivis pour SAS 3B.
        </h2>
        <p className="mt-2 text-base text-muted">
          Et des bailleurs et constructeurs de la région.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-xl border border-border">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/images/projects/sas3b-chantier.jpg"
              alt="Cérémonie de premiere pierre, chantier SAS 3B"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUSTED.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-4 border border-border p-5"
            >
              {t.logo ? (
                <div className="relative h-8 w-20 shrink-0">
                  <Image
                    src={t.logo}
                    alt={`Logo ${t.name}`}
                    fill
                    sizes="80px"
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <div className="h-8 w-20 shrink-0" />
              )}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-yellow">
                  {t.role}
                </p>
                <p className="mt-1 text-sm font-medium">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 6 — La suite */}
      <Reveal delay={0.05} className="mt-20 border-t border-border pt-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
          La suite
        </p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-4xl">
          Le comment, on vous le montre en 20 minutes.
        </h2>
        <div className="mt-8 flex flex-col gap-6 border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">{contact.name}</p>
            <p className="text-sm text-muted">{contact.title}</p>
            <p className="mt-3 text-sm">
              <a href={contact.phoneHref} className="select-all">
                {contact.phone}
              </a>
              <br />
              <a href={`mailto:${contact.emailPro}`} className="select-all">
                {contact.emailPro}
              </a>
            </p>
          </div>
          <BookingButton accent="purple" source={SOURCE}>
            Prendre rendez-vous
          </BookingButton>
        </div>
        <p className="mt-6 text-sm">
          <Link href="/travaux" className="text-accent underline">
            Voir nos réalisations sur studio.le-grub.com
          </Link>
        </p>
      </Reveal>
    </div>
  );
}

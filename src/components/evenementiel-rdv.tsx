"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { trackPixel } from "@/lib/meta-pixel";
import { BOOKING_URL } from "@/components/offer-landing";
import { VideoLightbox } from "@/components/video-lightbox";

export const RDV_SOURCE = "Page RDV Ads événementiel";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Poster + play button that opens the hero showreel in the shared lightbox, with sound. */
export function HeroVideo({
  vimeoId,
  poster,
  title,
  duration,
}: {
  vimeoId: string;
  poster?: string;
  title: string;
  duration: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-background sm:aspect-video">
      {poster && (
        <Image
          src={poster}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group absolute inset-0 flex items-end justify-end p-4"
        aria-label={`Regarder : ${title}`}
      >
        <span className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-background transition-transform group-hover:-translate-y-0.5">
          <PlayIcon className="h-3 w-3" />
          Regarder avec le son · {duration}
        </span>
      </button>
      <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-background/90 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground">
        Showreel événementiel
      </span>
      <VideoLightbox
        vimeoId={vimeoId}
        title={title}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

/** One tile in the "films" grid — poster, play button, duration badge, opens the lightbox. */
export function FilmTile({
  vimeoId,
  poster,
  title,
  subtitle,
  duration,
}: {
  vimeoId: string;
  poster?: string;
  title: string;
  subtitle: string;
  duration: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border bg-background"
        aria-label={`Regarder : ${title}`}
      >
        {poster && (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-110">
          <PlayIcon className="ml-0.5 h-5 w-5" />
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-background/90 px-2 py-1 text-xs tabular-nums text-foreground">
          {duration}
        </span>
      </button>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted">
          {subtitle}
        </p>
      </div>
      <VideoLightbox
        vimeoId={vimeoId}
        title={title}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

/** A big "result" card — poster, counted-up stat, caption — opens the lightbox. */
export function ProofCard({
  vimeoId,
  poster,
  stat,
  statLabel,
  client,
  cta,
}: {
  vimeoId: string;
  poster?: string;
  stat: string;
  statLabel: string;
  client: string;
  cta: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[2/1] w-full overflow-hidden bg-background"
        aria-label={`Regarder : ${client}`}
      >
        {poster && (
          <Image
            src={poster}
            alt={client}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </button>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-4xl font-semibold tracking-tight tabular-nums">
          {stat}
        </p>
        <p className="text-sm text-muted">{statLabel}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4 text-left text-xs font-mono uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
        >
          <span>{client}</span>
          <span>{cta} ▶</span>
        </button>
      </div>
      <VideoLightbox
        vimeoId={vimeoId}
        title={client}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

/** Inline "▶ watch the explainer" text link that opens the shared lightbox. */
export function VideoTextLink({
  vimeoId,
  title,
  children,
}: {
  vimeoId: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm text-foreground underline underline-offset-4"
      >
        ▶ {children}
      </button>
      <VideoLightbox
        vimeoId={vimeoId}
        title={title}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

const EVENT_TYPES = [
  "Lancement / inauguration",
  "Soirée d'entreprise",
  "Salon / conférence",
  "Autre",
];

const WHEN_OPTIONS = [
  "Dans moins d'un mois",
  "Dans 1 à 3 mois",
  "Dans plus de 3 mois",
  "Pas encore fixée",
];

type Step = "form" | "sending" | "done";

/** Two-step lead form: coordinates first, then the Calendly handoff for the slot. */
export function LeadForm() {
  const [step, setStep] = useState<Step>("form");
  const [values, setValues] = useState({
    prenom: "",
    telephone: "",
    email: "",
    type: "",
    quand: "",
  });
  const [error, setError] = useState("");

  const mailtoHref = `mailto:${contact.emailPro}?subject=${encodeURIComponent(
    "Reportage événementiel — demande de rappel"
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const prenom = values.prenom.trim();
    const telDigits = values.telephone.replace(/\D/g, "");
    const emailOk = /^\S+@\S+\.\S+$/.test(values.email.trim());
    const bad: string[] = [];
    if (!prenom) bad.push("votre prénom");
    if (telDigits.length < 9) bad.push("votre numéro");
    if (!emailOk) bad.push("votre email");
    if (bad.length) {
      setError(`Vérifiez ${bad.join(", ")}.`);
      return;
    }
    setError("");
    setStep("sending");

    const message = `[${RDV_SOURCE}]\n\nType d'événement : ${
      values.type || "non précisé"
    }\nDate prévue : ${values.quand || "non précisée"}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: prenom,
          email: values.email.trim(),
          phone: values.telephone.trim(),
          projectType: `Événementiel — ${values.type || "Autre"}`,
          message,
          consent: true,
        }),
      });
      if (!res.ok) {
        setError(
          "Un problème est survenu. Réessayez, ou écrivez-nous directement."
        );
        setStep("form");
        return;
      }
      trackPixel("Lead", {
        content_name: RDV_SOURCE,
        content_category: values.type || undefined,
      });
      setStep("done");
    } catch {
      setError(
        "Un problème est survenu. Réessayez, ou écrivez-nous directement."
      );
      setStep("form");
    }
  }

  if (step === "done") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border p-6">
        <GradientBar />
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          1 · Coordonnées ✓ — <span className="text-foreground">2 · Créneau</span>
        </p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">
          Merci {values.prenom.trim()}.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Dernière étape : choisissez vos 20 minutes avec Nils dans
          l&rsquo;agenda. Si aucun créneau ne vous convient, on vous rappelle
          sous 24 h ouvrées.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackPixel("Schedule", { content_name: RDV_SOURCE })}
          className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-accent-yellow px-5 py-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          Ouvrir l&rsquo;agenda →
        </a>
        <p className="mt-3 text-xs text-muted">
          calendly.com/grub-studio/parlons-de-votre-projet
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border p-6"
    >
      <GradientBar />
      <div>
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
          Réservez votre appel de 20 minutes.
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          On cadre votre événement ensemble, vous recevez un devis dans la
          foulée.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Prénom">
          <input
            required
            autoComplete="given-name"
            placeholder="Claire"
            value={values.prenom}
            onChange={(e) =>
              setValues((v) => ({ ...v, prenom: e.target.value }))
            }
            className="w-full rounded-lg border border-border bg-background px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label="Téléphone">
          <input
            required
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            value={values.telephone}
            onChange={(e) =>
              setValues((v) => ({ ...v, telephone: e.target.value }))
            }
            className="w-full rounded-lg border border-border bg-background px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-accent"
          />
        </Field>
      </div>

      <Field label="Email professionnel">
        <input
          required
          type="email"
          autoComplete="email"
          placeholder="claire@entreprise.fr"
          value={values.email}
          onChange={(e) =>
            setValues((v) => ({ ...v, email: e.target.value }))
          }
          className="w-full rounded-lg border border-border bg-background px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-accent"
        />
      </Field>

      <div>
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Votre événement
        </span>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((t) => (
            <label key={t} className="relative">
              <input
                type="radio"
                name="type"
                value={t}
                checked={values.type === t}
                onChange={() => setValues((v) => ({ ...v, type: t }))}
                className="sr-only peer"
              />
              <span className="block cursor-pointer rounded-full border border-border px-3.5 py-2 text-sm text-muted transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:font-semibold peer-checked:text-background">
                {t === "Lancement / inauguration"
                  ? "Lancement · inauguration"
                  : t === "Salon / conférence"
                    ? "Salon · conférence"
                    : t}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Field label="Date prévue">
        <select
          value={values.quand}
          onChange={(e) =>
            setValues((v) => ({ ...v, quand: e.target.value }))
          }
          className="w-full rounded-lg border border-border bg-background px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-accent"
        >
          <option value="">Sélectionner</option>
          {WHEN_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={step === "sending"}
        className="mt-1 w-full rounded-lg bg-accent-yellow px-5 py-4 text-[15px] font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {step === "sending" ? "Envoi…" : "Choisir mon créneau →"}
      </button>

      <div className="flex items-center gap-3 text-[13px] text-muted">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border font-semibold text-foreground">
          NB
        </span>
        <span>
          Vous échangez directement avec{" "}
          <b className="font-semibold text-foreground">Nils Bronner</b>,
          cofondateur et photographe.
        </span>
      </div>

      <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-xs text-muted">
        <span>Gratuit et sans engagement</span>
        <span>Réponse sous 24 h ouvrées</span>
      </p>

      {error && (
        <p className="text-center text-xs text-muted">
          Le formulaire ne passe pas ?{" "}
          <a href={mailtoHref} className="text-accent underline">
            Écrivez-nous directement
          </a>
          .
        </p>
      )}

      <p className="text-center text-[11px] text-muted">
        En envoyant ce formulaire, vous acceptez d&rsquo;être recontacté·e au
        sujet de votre projet.{" "}
        <Link href="/politique-de-confidentialite" className="underline">
          En savoir plus
        </Link>
        .
      </p>
    </form>
  );
}

function GradientBar() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 top-0 h-1"
      style={{
        background:
          "linear-gradient(90deg, var(--accent-purple) 0 25%, var(--accent) 25% 50%, var(--accent-yellow) 50% 75%, var(--accent-cyan) 75%)",
      }}
    />
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

/** Sticky mini-header for the funnel — brand mark + anchor nav + CTA, no main site nav. */
export function RdvHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 text-[15px] font-semibold"
        >
          <span className="flex flex-col gap-0.5" aria-hidden>
            <i className="block h-[3px] w-3.5 rounded-full bg-accent-purple" />
            <i className="block h-[3px] w-5 rounded-full bg-accent" />
            <i className="block h-[3px] w-4 rounded-full bg-accent-yellow" />
            <i className="ml-1 block h-[3px] w-2.5 rounded-full bg-accent-cyan" />
          </span>
          Grub Studio
        </a>
        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-muted lg:flex"
        >
          <a href="#terrain" className="hover:text-foreground">
            Terrain
          </a>
          <a href="#films" className="hover:text-foreground">
            Films
          </a>
          <a href="#resultats" className="hover:text-foreground">
            Résultats
          </a>
          <a href="#tarifs" className="hover:text-foreground">
            Tarifs
          </a>
          <a href="#faq" className="hover:text-foreground">
            Questions
          </a>
        </nav>
        <a
          href="#appel"
          className="hidden shrink-0 rounded-lg bg-accent-yellow px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-background lg:block"
        >
          Réserver un appel
        </a>
      </div>
    </header>
  );
}

/** Minimal footer for the funnel — address + a couple of links back to the main site. */
export function RdvFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>Grub Studio · 91 route des Romains, Strasbourg</span>
        <div className="flex flex-wrap gap-5">
          <a
            href="https://studio.le-grub.com/travaux"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Réalisations
          </a>
          <a
            href="https://studio.le-grub.com/rush"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Rush
          </a>
          <a
            href="https://studio.le-grub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            studio.le-grub.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Fixed bottom CTA bar shown only on small screens, under the hero. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <a
        href="#appel"
        className="flex w-full items-center justify-center rounded-lg bg-accent-yellow px-5 py-3.5 text-sm font-semibold text-background"
      >
        Réserver mon appel gratuit
      </a>
    </div>
  );
}

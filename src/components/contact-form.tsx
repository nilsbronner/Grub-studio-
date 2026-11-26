"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { trackPixel } from "@/lib/meta-pixel";
import type { SiteLocale } from "@/lib/content/locale-nav";

const PROJECT_TYPES: Record<SiteLocale, string[]> = {
  fr: [
    "Spot publicitaire",
    "Campagne digitale / Ads",
    "Contenu réseaux (shorts)",
    "Aftermovie / événementiel",
    "Reportage vidéo",
    "Interview / podcast",
    "Motion design",
    "Photo (portrait, produit, entreprise)",
    "Autre",
  ],
  en: [
    "TV/web commercial",
    "Digital campaign / Ads",
    "Social content (shorts)",
    "Aftermovie / event",
    "Video report",
    "Interview / podcast",
    "Motion design",
    "Photo (portrait, product, corporate)",
    "Other",
  ],
  de: [
    "Werbespot",
    "Digitale Kampagne / Ads",
    "Social-Media-Content (Shorts)",
    "Aftermovie / Event",
    "Video-Reportage",
    "Interview / Podcast",
    "Motion Design",
    "Foto (Porträt, Produkt, Unternehmen)",
    "Sonstiges",
  ],
};

const FORM_DICT: Record<
  SiteLocale,
  {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    select: string;
    message: string;
    consentPrefix: string;
    consentLink: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    unavailable: string;
    sendByEmail: string;
  }
> = {
  fr: {
    name: "Nom",
    email: "Email",
    phone: "Téléphone (optionnel)",
    company: "Société (optionnel)",
    projectType: "Type de projet",
    select: "Sélectionner —",
    message: "Message",
    consentPrefix:
      "J’accepte que ces informations soient utilisées par Grub Studio pour traiter ma demande et me recontacter.",
    consentLink: "En savoir plus",
    submit: "Envoyer",
    sending: "Envoi...",
    sentTitle: "Message envoyé.",
    sentBody: "Merci, on revient vers vous rapidement.",
    unavailable: "Le formulaire est momentanément indisponible.",
    sendByEmail: "Envoyer par email directement",
  },
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    company: "Company (optional)",
    projectType: "Project type",
    select: "Select —",
    message: "Message",
    consentPrefix:
      "I agree that this information will be used by Grub Studio to process my request and get back to me.",
    consentLink: "Learn more",
    submit: "Send",
    sending: "Sending...",
    sentTitle: "Message sent.",
    sentBody: "Thanks, we'll get back to you shortly.",
    unavailable: "The form is temporarily unavailable.",
    sendByEmail: "Send an email directly",
  },
  de: {
    name: "Name",
    email: "E-Mail",
    phone: "Telefon (optional)",
    company: "Unternehmen (optional)",
    projectType: "Projektart",
    select: "Auswählen —",
    message: "Nachricht",
    consentPrefix:
      "Ich bin damit einverstanden, dass Grub Studio diese Angaben zur Bearbeitung meiner Anfrage und zur Kontaktaufnahme verwendet.",
    consentLink: "Mehr erfahren",
    submit: "Senden",
    sending: "Wird gesendet...",
    sentTitle: "Nachricht gesendet.",
    sentBody: "Danke, wir melden uns in Kürze bei Ihnen.",
    unavailable: "Das Formular ist vorübergehend nicht verfügbar.",
    sendByEmail: "Direkt per E-Mail senden",
  },
};

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

export function ContactForm({
  defaultProjectType = "",
  source,
  messagePlaceholder,
  locale = "fr",
}: {
  /** Pre-selects the project type (offer landing pages). */
  defaultProjectType?: string;
  /** Where the lead came from, e.g. "Page offre Ads" — added to the message and sent to the Meta pixel. */
  source?: string;
  messagePlaceholder?: string;
  locale?: SiteLocale;
} = {}) {
  const dict = FORM_DICT[locale];
  const projectTypes = PROJECT_TYPES[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: defaultProjectType,
    message: "",
    consent: false,
  });

  const mailtoHref = `mailto:${contact.emailPro}?subject=${encodeURIComponent(
    `Contact site — ${values.name || "nouveau projet"}`
  )}&body=${encodeURIComponent(
    [
      `${dict.name} : ${values.name}`,
      `${dict.email} : ${values.email}`,
      values.phone ? `${dict.phone} : ${values.phone}` : "",
      values.company ? `${dict.company} : ${values.company}` : "",
      values.projectType ? `${dict.projectType} : ${values.projectType}` : "",
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n")
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          source
            ? { ...values, message: `[${source}]\n\n${values.message}` }
            : values
        ),
      });
      if (res.status === 503) {
        setStatus("unavailable");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      trackPixel("Lead", {
        content_name: source ?? "Contact",
        content_category: values.projectType || undefined,
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-border p-6">
        <p className="text-sm font-medium">{dict.sentTitle}</p>
        <p className="mt-1 text-sm text-muted">{dict.sentBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.name}>
          <input
            required
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label={dict.email}>
          <input
            required
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label={dict.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label={dict.company}>
          <input
            type="text"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
      </div>

      <Field label={dict.projectType}>
        <select
          value={values.projectType}
          onChange={(e) =>
            setValues((v) => ({ ...v, projectType: e.target.value }))
          }
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        >
          <option value="" className="bg-background">
            {dict.select}
          </option>
          {projectTypes.map((pt) => (
            <option key={pt} value={pt} className="bg-background">
              {pt}
            </option>
          ))}
        </select>
      </Field>

      <Field label={dict.message}>
        <textarea
          required
          rows={5}
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          required
          type="checkbox"
          checked={values.consent}
          onChange={(e) =>
            setValues((v) => ({ ...v, consent: e.target.checked }))
          }
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          {dict.consentPrefix}{" "}
          <Link href="/politique-de-confidentialite" className="text-accent underline">
            {dict.consentLink}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex items-center gap-3 border border-border px-5 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {status === "sending" ? dict.sending : dict.submit}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

      {(status === "unavailable" || status === "error") && (
        <p className="text-sm text-muted">
          {dict.unavailable}{" "}
          <a href={mailtoHref} className="text-accent underline">
            {dict.sendByEmail}
          </a>
          .
        </p>
      )}
    </form>
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
      <span className="text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

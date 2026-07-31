"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";

const projectTypes = [
  "Spot publicitaire",
  "Campagne digitale / ADS",
  "Contenu réseaux (shorts)",
  "Aftermovie / événementiel",
  "Reportage vidéo",
  "Interview / podcast",
  "Motion design",
  "Photo (portrait, produit, entreprise)",
  "Autre",
];

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });

  const mailtoHref = `mailto:${contact.emailPro}?subject=${encodeURIComponent(
    `Contact site — ${values.name || "nouveau projet"}`
  )}&body=${encodeURIComponent(
    [
      `Nom : ${values.name}`,
      `Email : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : "",
      values.company ? `Société : ${values.company}` : "",
      values.projectType ? `Type de projet : ${values.projectType}` : "",
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
        body: JSON.stringify(values),
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
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-border p-6">
        <p className="text-sm font-medium">Message envoyé.</p>
        <p className="mt-1 text-sm text-muted">
          Merci, on revient vers vous rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom">
          <input
            required
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label="Téléphone (optionnel)">
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
        <Field label="Société (optionnel)">
          <input
            type="text"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
          />
        </Field>
      </div>

      <Field label="Type de projet">
        <select
          value={values.projectType}
          onChange={(e) =>
            setValues((v) => ({ ...v, projectType: e.target.value }))
          }
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        >
          <option value="" className="bg-background">
            Sélectionner —
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t} className="bg-background">
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="→"
        className="group flex items-center gap-3 border border-border px-5 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {status === "sending" ? "Envoi..." : "Envoyer"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

      {(status === "unavailable" || status === "error") && (
        <p className="text-sm text-muted">
          Le formulaire est momentanément indisponible.{" "}
          <a href={mailtoHref} className="text-accent underline">
            Envoyer par email directement
          </a>{" "}
          à la place.
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

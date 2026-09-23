"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

export function ConseilForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    topic: "",
    context: "",
    goal: "",
  });

  const mailtoHref = `mailto:${contact.emailPro}?subject=${encodeURIComponent(
    `Grub Conseil — ${values.name || "audit gratuit"}`
  )}&body=${encodeURIComponent(
    [
      `Nom : ${values.name}`,
      `Email : ${values.email}`,
      values.company ? `Société : ${values.company}` : "",
      `Sujet de l'audit : ${values.topic}`,
      "",
      "Contexte actuel :",
      values.context,
      values.goal ? `\nObjectif / blocage :\n${values.goal}` : "",
    ]
      .filter(Boolean)
      .join("\n")
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/conseil", {
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
        <p className="text-sm font-medium">Demande envoyée.</p>
        <p className="mt-1 text-sm text-muted">
          Merci, Nils revient vers vous rapidement avec quelques
          recommandations.
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
      </div>

      <Field label="Société (optionnel)">
        <input
          type="text"
          value={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </Field>

      <Field label="Sujet de l'audit">
        <input
          required
          type="text"
          placeholder="Ex. : stratégie de contenu, tournage, budget, réseaux sociaux…"
          value={values.topic}
          onChange={(e) => setValues((v) => ({ ...v, topic: e.target.value }))}
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
        />
      </Field>

      <Field label="Où en êtes-vous aujourd'hui sur ce sujet ?">
        <textarea
          required
          rows={4}
          value={values.context}
          onChange={(e) => setValues((v) => ({ ...v, context: e.target.value }))}
          className="w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </Field>

      <Field label="Votre objectif, ou ce qui vous bloque (optionnel)">
        <textarea
          rows={4}
          value={values.goal}
          onChange={(e) => setValues((v) => ({ ...v, goal: e.target.value }))}
          className="w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex items-center gap-3 border border-border px-5 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {status === "sending" ? "Envoi..." : "Demander mon audit gratuit"}
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

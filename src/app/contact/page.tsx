import type { Metadata } from "next";
import { contact } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `${contact.name} — ${contact.title}. ${contact.address}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
        Contact
      </h1>

      <div className="mt-10 space-y-6">
        <div>
          <p className="text-sm font-medium">{contact.name}</p>
          <p className="text-sm text-muted">{contact.title}</p>
        </div>

        <div className="space-y-1">
          <a
            href={contact.phoneHref}
            className="block text-sm hover:text-accent"
          >
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.emailPro}`}
            className="block text-sm hover:text-accent"
          >
            {contact.emailPro}
          </a>
          <a
            href={`mailto:${contact.emailPersonal}`}
            className="block text-sm hover:text-accent"
          >
            {contact.emailPersonal}
          </a>
        </div>

        <p className="text-sm text-muted">{contact.address}</p>
      </div>

      <div className="mt-16 border-t border-border pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {contact.coordinates.latitude} / {contact.coordinates.longitude}
        </p>
        <p className="mt-1 text-sm text-muted">{contact.coordinates.city}</p>
      </div>
    </div>
  );
}

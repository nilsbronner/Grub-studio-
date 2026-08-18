import type { Metadata } from "next";
import Image from "next/image";
import { contact } from "@/lib/content/contact";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `${contact.name} — ${contact.title}. ${contact.address}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <EyebrowPill>Contact</EyebrowPill>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-4xl">
          Discutons de votre projet.
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-12 sm:grid-cols-[1fr_260px] sm:items-start">
        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="group relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-border">
              <Image
                src="/images/team/nils-bronner-profile.jpg"
                alt={contact.name}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-sm font-medium">{contact.name}</p>
            <p className="text-sm text-muted">{contact.title}</p>
          </Reveal>

          <Reveal delay={0.24} className="space-y-1">
            <a
              href={contact.phoneHref}
              className="inline-block text-sm transition-colors hover:text-accent"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.emailPro}`}
              className="block text-sm transition-colors hover:text-accent"
            >
              {contact.emailPro}
            </a>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-sm text-muted">{contact.address}</p>
          </Reveal>

          <Reveal delay={0.36} className="border-t border-border pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {contact.coordinates.latitude} / {contact.coordinates.longitude}
            </p>
            <p className="mt-1 text-sm text-muted">
              {contact.coordinates.city}
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

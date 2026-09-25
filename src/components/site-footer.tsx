import Link from "next/link";
import { contact } from "@/lib/content/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {contact.coordinates.latitude} / {contact.coordinates.longitude}
          </p>
          <p className="mt-1 text-sm text-muted">
            {contact.coordinates.city}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <a href={contact.phoneHref} className="hover:text-accent">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.emailPro}`} className="hover:text-accent">
            {contact.emailPro}
          </a>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
          <a
            href="https://le-grub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Grub Cowork
          </a>
          <a
            href="https://linktr.ee/nils.bronner"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Réseaux
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-muted">
          <Link href="/mentions-legales" className="hover:text-accent">
            Mentions légales
          </Link>
          <span aria-hidden>·</span>
          <Link href="/politique-de-confidentialite" className="hover:text-accent">
            Confidentialité
          </Link>
          <span aria-hidden>·</span>
          <span>© {year} LE GRUB SAS</span>
        </div>
      </div>
    </footer>
  );
}

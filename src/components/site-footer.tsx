import Link from "next/link";
import { contact } from "@/lib/content/contact";

export function SiteFooter() {
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
        </div>
      </div>
    </footer>
  );
}

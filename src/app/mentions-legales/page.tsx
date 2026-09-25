import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/content/contact";

export const metadata: Metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur et propriété intellectuelle du site Grub Studio, exploité par LE GRUB SAS.",
});

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tight sm:text-4xl">
          Mentions légales
        </h1>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Éditeur du site
          </h2>
          <p className="mt-3">
            Le site studio.le-grub.com est édité par LE GRUB SAS, au capital
            de [capital] €, immatriculée au RCS Strasbourg sous le numéro
            829 379 643, SIRET 829 379 643 00028, numéro de TVA
            intracommunautaire FR89829379643.
            <br />
            Siège social : {contact.address}.
            <br />
            Contact :{" "}
            <a
              href={`mailto:${contact.emailPro}`}
              className="text-accent underline"
            >
              {contact.emailPro}
            </a>{" "}
            — {contact.phone}.
            <br />
            Directeur de la publication : Luc Rohmer, Président.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Hébergement
          </h2>
          <p className="mt-3">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Propriété intellectuelle
          </h2>
          <p className="mt-3">
            L&rsquo;ensemble des vidéos, photographies et contenus présentés
            sur ce site sont la propriété de LE GRUB SAS et/ou de ses clients
            respectifs. Toute reproduction, représentation ou diffusion, en
            tout ou partie, sans autorisation préalable, est interdite.
          </p>
        </section>
      </Reveal>
    </div>
  );
}

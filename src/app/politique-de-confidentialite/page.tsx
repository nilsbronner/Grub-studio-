import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/content/contact";

export const metadata: Metadata = pageMetadata({
  path: "/politique-de-confidentialite",
  title: "Politique de confidentialité",
  description:
    "Comment Grub Studio (LE GRUB SAS) collecte, utilise et protège les données transmises via les formulaires du site.",
});

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tight sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-4 text-sm text-muted">
          Dernière mise à jour : septembre 2026
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Responsable du traitement
          </h2>
          <p className="mt-3">
            Les données collectées via ce site sont traitées par LE GRUB SAS
            (Grub Studio), {contact.address}. Contact :{" "}
            <a
              href={`mailto:${contact.emailPro}`}
              className="text-accent underline"
            >
              {contact.emailPro}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Données collectées
          </h2>
          <p className="mt-3">
            Les formulaires du site (Contact et Grub Conseil) collectent
            uniquement les informations que vous saisissez vous-même : nom,
            email, téléphone et société (facultatifs selon le formulaire),
            et le contenu de votre message ou de votre demande d&rsquo;audit.
            Aucune donnée n&rsquo;est collectée à votre insu, et le site
            n&rsquo;utilise aucun cookie de suivi ou de mesure
            d&rsquo;audience.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Finalité et base légale
          </h2>
          <p className="mt-3">
            Ces informations sont utilisées exclusivement pour répondre à
            votre demande : vous recontacter au sujet d&rsquo;un projet ou
            d&rsquo;un devis, ou réaliser l&rsquo;audit gratuit Grub Conseil.
            Le traitement repose sur votre consentement, recueilli lors de
            l&rsquo;envoi du formulaire, ainsi que sur l&rsquo;intérêt
            légitime à répondre à une demande précontractuelle.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Destinataires
          </h2>
          <p className="mt-3">
            Les données sont adressées directement à LE GRUB et ne sont ni
            vendues, ni cédées, ni utilisées à des fins commerciales autres
            que le traitement de votre demande. Elles transitent par un
            sous-traitant technique d&rsquo;envoi d&rsquo;email (Resend)
            uniquement pour l&rsquo;acheminement du message.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Durée de conservation
          </h2>
          <p className="mt-3">
            Les données sont conservées le temps nécessaire au traitement de
            votre demande, puis jusqu&rsquo;à 3 ans à compter de notre
            dernier échange si aucune relation commerciale ne se
            concrétise, conformément aux recommandations de la CNIL.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted">
            Vos droits
          </h2>
          <p className="mt-3">
            Conformément au RGPD, vous disposez d&rsquo;un droit
            d&rsquo;accès, de rectification, d&rsquo;effacement, de
            limitation, d&rsquo;opposition et de portabilité sur vos
            données. Pour l&rsquo;exercer, écrivez à{" "}
            <a
              href={`mailto:${contact.emailPro}`}
              className="text-accent underline"
            >
              {contact.emailPro}
            </a>
            . Vous pouvez également introduire une réclamation auprès de la
            CNIL (
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              www.cnil.fr
            </a>
            ).
          </p>
        </section>
      </Reveal>
    </div>
  );
}

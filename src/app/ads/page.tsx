import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { ContactForm } from "@/components/contact-form";
import { ProjectCard } from "@/components/project-card";
import { BookingButton, VerticalVideo } from "@/components/offer-landing";
import {
  campaignConditions,
  campaignFaq,
  campaignIntro,
  campaignMethod,
  campaignOneMonth,
  campaignRecommendedIndex,
  campaignThreeMonths,
  campaignTierNames,
  campaignTransformation,
  type PricingTable,
} from "@/lib/content/campaign-package";
import { getProjectBySlug } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { pageMetadata } from "@/lib/metadata";
import { cx } from "@/lib/cx";

const SOURCE = "Page offre Ads";

// Landing page for Meta Ads traffic: prices are shown here on purpose (the
// main site keeps them behind a contact), so the page stays out of search
// results and out of the sitemap.
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/ads",
    title: "Offre Ads — un tournage, trois mois de campagnes",
    description:
      "Production vidéo et campagnes Meta Ads réunies : une journée de tournage, les contenus et les publicités des trois mois suivants. Strasbourg et Grand Est.",
  }),
  robots: { index: false, follow: true },
};

const proofSlugs = ["hollys-diner", "squarea", "once-upon-a-dime"];

export default async function AdsOfferPage() {
  const proofs = await withVimeoPosters(
    proofSlugs
      .map((slug) => getProjectBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Hero */}
      <div className="grid gap-10 sm:grid-cols-[1fr_300px] sm:items-center">
        <Reveal>
          <EyebrowPill>Offre Ads · Tournage + campagne</EyebrowPill>
          <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
            Une pub zappée n&rsquo;est pas un client perdu.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            {campaignIntro.hook}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {campaignIntro.description}
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.15em]">
            {campaignIntro.priceHeadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookingButton accent="purple" source={SOURCE} />
            <a
              href="#formulaire"
              className="text-sm font-mono uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              Recevoir une proposition ↓
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <VerticalVideo
            vimeoId="1236981166"
            hash="377f246910"
            title="Grub Studio — Offre Ads : tournage et campagne"
          />
        </Reveal>
      </div>

      {/* Pour qui */}
      <Reveal className="mt-20 border-t border-border pt-12">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Pour qui
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          {campaignIntro.audience}
        </p>
      </Reveal>

      {/* Un tournage devient */}
      <Reveal className="mt-16">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Un seul tournage devient
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {campaignTransformation.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border border-border p-4 text-sm"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-purple" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Méthode */}
      <Reveal className="mt-16">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Comment ça se passe
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-4">
          {campaignMethod.map((step) => (
            <li key={step.step} className="border-t border-border pt-4">
              <p className="font-mono text-xs text-muted">0{step.step}</p>
              <p className="mt-2 font-medium">{step.title}</p>
              {step.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          Tout part d&rsquo;un brief : ce que vous vendez, votre cible, votre
          concurrence. Les scripts suivent le modèle AIDA, chaque vidéo est
          déclinée pour tester plusieurs accroches et relancer ceux qui ont
          zappé. Les contacts arrivent directement chez vous.
        </p>
      </Reveal>

      {/* Tarifs */}
      <Reveal className="mt-20">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Formules
        </h2>
        <PricingGrid table={campaignOneMonth} />
        <h3 className="mt-12 text-sm font-mono uppercase tracking-[0.15em] text-muted">
          {campaignThreeMonths.title}
        </h3>
        <PricingGrid table={campaignThreeMonths} />
        <ul className="mt-6 space-y-1.5 text-xs text-muted">
          {campaignConditions.map((c) => (
            <li key={c}>· {c}</li>
          ))}
        </ul>
      </Reveal>

      {/* Preuves */}
      {proofs.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Ils ont lancé leurs campagnes avec nous
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {proofs.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Reveal>
      )}

      {/* FAQ */}
      <Reveal className="mt-20">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Questions fréquentes
        </h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {campaignFaq.map((f) => (
            <details key={f.question} className="group py-4">
              <summary className="cursor-pointer list-none font-medium">
                {f.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </Reveal>

      {/* Formulaire */}
      <section id="formulaire" className="mt-20 scroll-mt-24 border-t border-border pt-12">
        <Reveal>
          <h2 className="max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
            Parlons de votre prochaine campagne.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Dites-nous ce que vous vendez et à qui. On vous rappelle sous
            24 h ouvrées avec une première proposition.
          </p>
          <div className="mt-5">
            <BookingButton accent="purple" source={SOURCE}>
              Ou réservez directement un appel
            </BookingButton>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="mt-10 max-w-2xl">
          <ContactForm
            defaultProjectType="Campagne digitale / Ads"
            source={SOURCE}
            messagePlaceholder="Votre activité, votre cible, ce que vous voulez vendre…"
          />
        </Reveal>
      </section>
    </div>
  );
}

function PricingGrid({ table }: { table: PricingTable }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-1/4" />
            {campaignTierNames.map((name, i) => (
              <th
                key={name}
                className={cx(
                  "border-b border-border px-3 pb-3 text-left font-medium",
                  i === campaignRecommendedIndex && "text-accent-purple"
                )}
              >
                {name}
                {i === campaignRecommendedIndex && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                    Recommandé
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className="border-b border-border">
              <th className="py-2.5 pr-3 text-left font-normal text-muted">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={cx(
                    "px-3 py-2.5",
                    i === campaignRecommendedIndex && "bg-accent-purple/10"
                  )}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

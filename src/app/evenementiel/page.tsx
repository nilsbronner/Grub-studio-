import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { EyebrowPill } from "@/components/eyebrow-pill";
import { ContactForm } from "@/components/contact-form";
import { ProjectCard } from "@/components/project-card";
import { BookingButton, VerticalVideo } from "@/components/offer-landing";
import { getProjectBySlug } from "@/lib/content/projects";
import { withVimeoPosters } from "@/lib/vimeo";
import { pageMetadata } from "@/lib/metadata";

const SOURCE = "Page offre événementielle";

// Landing page for Meta/LinkedIn Ads traffic — kept out of search results
// and the sitemap (prices and offer details live here, not on the main site).
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/evenementiel",
    title: "Offre intégrale événementielle — des mois de contenu",
    description:
      "Reportage photo, aftermovie, captation des discours, podcast, studio d'interview, photobooth et portraits corporate : votre événement transformé en contenu durable. Strasbourg et Grand Est.",
  }),
  robots: { index: false, follow: true },
};

const modules = [
  {
    title: "Reportage photo",
    text: "Les moments forts, l'ambiance, les invités. Livré dans la foulée pour vos réseaux.",
  },
  {
    title: "Aftermovie",
    text: "Le film qui donne envie d'être là l'an prochain, en 16:9 et en vertical.",
  },
  {
    title: "Captation des discours",
    text: "Keynotes et prises de parole filmées proprement, réutilisables en extraits.",
  },
  {
    title: "Podcast ou table ronde",
    text: "Un plateau installé sur place pour enregistrer vos intervenants et partenaires.",
  },
  {
    title: "Studio d'interview",
    text: "Personal branding de vos dirigeants, témoignages clients, formats décalés.",
  },
  {
    title: "Photobooth",
    text: "Un souvenir pour vos invités, du contenu partagé spontanément pour vous.",
  },
  {
    title: "Portraits corporate",
    text: "Le trombinoscope de toute l'équipe, réalisé pendant que tout le monde est là.",
  },
  {
    title: "Micro-trottoir",
    text: "La parole des participants, à chaud, pour vos réseaux et vos bilans.",
  },
];

const afterwards = [
  {
    title: "En externe",
    items: [
      "Posts et shorts pendant des mois",
      "Publicités et annonce de la prochaine édition",
      "Remerciements partenaires et sponsors",
      "Relations presse et site web",
    ],
  },
  {
    title: "En interne",
    items: [
      "Trombinoscope et intranet",
      "Onboarding et marque employeur",
      "Newsletter et bilan de l'événement",
      "Prises de parole des dirigeants",
    ],
  },
];

const proofSlugs = [
  "galeries-lafayette-histoire",
  "strasbourg-esport-days",
  "hollys-diner",
];

export default async function EventOfferPage() {
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
          <EyebrowPill>Offre intégrale événementielle</EyebrowPill>
          <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
            Votre événement dure une journée. Son contenu peut durer des mois.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Un événement coûte cher. Nous vous aidons à le transformer en
            contenu durable, pour communiquer longtemps, en externe comme en
            interne.
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.15em]">
            Reportage dès 500 € HT · Formule intégrale sur devis
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookingButton accent="cyan" source={SOURCE} />
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
            vimeoId="1236981415"
            hash="e5705f69a7"
            title="Grub Studio — L'offre intégrale événementielle"
          />
        </Reveal>
      </div>

      {/* Modules */}
      <Reveal className="mt-20 border-t border-border pt-12">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Ce qu&rsquo;on installe sur votre événement
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Vous choisissez les modules selon vos objectifs. On coordonne
          l&rsquo;équipe sur place, vous ne gérez qu&rsquo;un interlocuteur.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <li key={m.title} className="border border-border p-5">
              <span className="block h-2 w-2 rounded-full bg-accent-cyan" />
              <p className="mt-4 font-medium">{m.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {m.text}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Ensuite */}
      <Reveal className="mt-16">
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
          Ce que vous en faites ensuite
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {afterwards.map((block) => (
            <div key={block.title} className="border-t border-border pt-4">
              <p className="font-medium">{block.title}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {block.items.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Preuves */}
      {proofs.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-muted">
            Des événements qu&rsquo;on a couverts
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {proofs.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Tarifs */}
      <Reveal className="mt-20 grid gap-6 sm:grid-cols-3">
        <div className="border border-border p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Reportage demi-journée
          </p>
          <p className="mt-3 text-2xl font-medium">500 € HT</p>
          <p className="mt-2 text-sm text-muted">
            Un photographe ou un vidéaste, l&rsquo;essentiel de votre
            événement.
          </p>
        </div>
        <div className="border border-border p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Reportage journée complète
          </p>
          <p className="mt-3 text-2xl font-medium">2 900 € HT</p>
          <p className="mt-2 text-sm text-muted">
            Photographe et vidéaste, du début à la fin de la journée.
          </p>
        </div>
        <div className="border border-accent-cyan p-5">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-cyan">
            Formule intégrale
          </p>
          <p className="mt-3 text-2xl font-medium">Sur devis</p>
          <p className="mt-2 text-sm text-muted">
            Reportage + les modules de votre choix, chiffrés selon la durée,
            le lieu et les livrables.
          </p>
        </div>
      </Reveal>

      {/* Formulaire */}
      <section id="formulaire" className="mt-20 scroll-mt-24 border-t border-border pt-12">
        <Reveal>
          <h2 className="max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
            Un événement à venir ?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Donnez-nous la date, le lieu et ce que vous voulez en tirer. On
            vous rappelle sous 24 h ouvrées.
          </p>
          <div className="mt-5">
            <BookingButton accent="cyan" source={SOURCE}>
              Ou réservez directement un appel
            </BookingButton>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="mt-10 max-w-2xl">
          <ContactForm
            defaultProjectType="Aftermovie / événementiel"
            source={SOURCE}
            messagePlaceholder="Date, lieu, nombre d'invités, type d'événement, ce que vous voulez en tirer…"
          />
        </Reveal>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import { getVimeoThumbnails } from "@/lib/vimeo";
import { contact } from "@/lib/content/contact";
import {
  HeroVideo,
  FilmTile,
  ProofCard,
  LeadForm,
  VideoTextLink,
  RdvHeader,
  RdvFooter,
  MobileCta,
} from "@/components/evenementiel-rdv";

// Dedicated landing page for Meta/Google Ads traffic on the event-coverage
// offer — its own URL, its own compact header/footer (see SiteChrome),
// kept out of search results so it never competes with /evenementiel.
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/evenementiel/rdv",
    title: "Reportage événementiel à Strasbourg — réservez un appel",
    description:
      "Photo et vidéo de votre événement d'entreprise, prêtes à partager dès le lendemain. Réservez un appel de 20 minutes avec Nils Bronner, Grub Studio.",
  }),
  robots: { index: false, follow: true },
};

const HERO_VIMEO = "1237950778";

const FILMS = [
  {
    vimeoId: "1237950778",
    title: "Showreel événementiel",
    subtitle: "Grub Studio",
    duration: "0:26",
  },
  {
    vimeoId: "1237543769",
    title: "Aftermovie Rendez-Vous Porsche",
    subtitle: "Sofitel Strasbourg",
    duration: "1:00",
  },
  {
    vimeoId: "1214544938",
    title: "Aftermovie festival",
    subtitle: "CCI Bizz & Buzz",
    duration: "1:04",
  },
  {
    vimeoId: "1214544952",
    title: "Aftermovie de soirée",
    subtitle: "SAS 3B",
    duration: "2:13",
  },
  {
    vimeoId: "1237601767",
    title: "Aftermovie plage éphémère",
    subtitle: "Hôtel de la Maison Rouge · Hôtel Hannong",
    duration: "1:21",
  },
  {
    vimeoId: "1237616253",
    title: "Spot soirées & événements",
    subtitle: "Hôtel de la Maison Rouge",
    duration: "2:41",
  },
] as const;

const PROOFS = [
  {
    vimeoId: "1130859497",
    stat: "3 M",
    statLabel: "impressions pour la campagne teasing",
    client: "Strasbourg Esport Days",
    cta: "Voir le teaser",
  },
  {
    vimeoId: "1214544969",
    stat: "350 K",
    statLabel: "vues et plus de 600 avis en un week-end",
    client: "Holly's Diner",
    cta: "Voir l'aftermovie",
  },
] as const;

const OFFER_VIDEO = "1214532977";

const REFS = [
  "Porsche Strasbourg",
  "Galeries Lafayette",
  "VINCI",
  "Sofitel Strasbourg",
  "Strasbourg Esport Days",
  "SAS 3B",
  "Alsace Habitat",
  "Hôtel de la Maison Rouge",
  "Hôtel Hannong",
  "CCI Bizz & Buzz",
  "Skillcamp",
];

const TERRAIN_IMAGES = [
  { src: "/images/projects/porsche-strasbourg.jpg", alt: "Lancement Porsche Strasbourg, invités autour du véhicule", caption: "Lancement · Porsche Strasbourg" },
  { src: "/images/projects/vinci.jpg", alt: "Repas d'entreprise, client Vinci Group", caption: "Vinci Group" },
  { src: "/images/projects/strasbourg-esport-days.jpg", alt: "Ambiance sur le salon Strasbourg Esport Days", caption: "Salon · Esport Days" },
  { src: "/images/projects/vinci-2.jpg", alt: "Moment partagé lors d'un événement Vinci Group" },
  { src: "/images/projects/porsche-strasbourg-2.jpg", alt: "Détail du lancement Porsche Strasbourg" },
  { src: "/images/projects/skillcamp.jpg", alt: "Portrait d'un intervenant Skillcamp", caption: "Portrait · Skillcamp" },
  { src: "/images/projects/hollys-diner.jpg", alt: "Soirée d'inauguration Holly's Diner", caption: "Inauguration · Holly's Diner" },
  { src: "/images/projects/strasbourg-esport-days-2.jpg", alt: "Joueurs en compétition sur le salon Esport Days" },
  { src: "/images/projects/porsche-strasbourg-3.jpg", alt: "Présentation produit lors du lancement Porsche Strasbourg" },
];

const CYCLE = [
  {
    image: "/images/projects/porsche-strasbourg.jpg",
    accent: "var(--accent-purple)",
    step: "Avant",
    title: "Le teaser",
    text: "Une vidéo courte qui annonce l'événement et donne envie de venir.",
  },
  {
    image: "/images/projects/vinci.jpg",
    accent: "var(--accent)",
    step: "Pendant",
    title: "Le reportage",
    text: "Photo, vidéo et interviews, avec des contenus prêts à publier dès le lendemain.",
  },
  {
    image: "/images/projects/hollys-diner.jpg",
    accent: "var(--accent-cyan)",
    step: "Après",
    title: "L'aftermovie",
    text: "Le film de l'événement et une banque d'images pour communiquer toute l'année.",
  },
];

const OFFERS = [
  {
    name: "À l'heure",
    from: "À partir de",
    price: "150 €",
    unit: "HT / h",
    text: "Un moment précis : discours, remise de prix, cocktail.",
    items: ["Un photographe ou un vidéaste", "Livrables prêts à partager"],
    cta: "ghost" as const,
  },
  {
    name: "Demi-journée",
    from: "À partir de",
    price: "500 €",
    unit: "HT",
    text: "L'essentiel d'un événement ou d'un moment de vie d'entreprise.",
    items: [
      "Un photographe ou un vidéaste",
      "Une demi-journée de captation",
      "Prêt à partager dès le lendemain",
    ],
    cta: "ghost" as const,
  },
  {
    name: "Journée complète",
    pill: "Le plus complet",
    from: "À partir de",
    price: "2 900 €",
    unit: "HT",
    text: "Votre événement couvert de bout en bout, plus un atelier qui fait participer vos invités.",
    items: [
      "Un photographe et un vidéaste toute la journée",
      "Un atelier au choix : interviews filmées, studio photo portrait ou concept sur mesure",
      "Photos et vidéo livrées, prêtes à publier",
    ],
    cta: "solid" as const,
  },
  {
    name: "Offre intégrale",
    from: "Avant · pendant · après",
    price: "Sur devis",
    text: "Le cycle complet pour faire de votre événement un temps fort média.",
    items: [
      "Teaser avant l'événement",
      "Reportage photo et vidéo",
      "Aftermovie et banque d'images",
    ],
    cta: "ghost" as const,
    video: true,
  },
];

const FAQ = [
  {
    q: "Mon événement est dans quelques jours, c'est trop tard ?",
    a: "Non. Le reportage est pensé pour les demandes de dernière minute. Pour un teaser, mieux vaut nous appeler quelques semaines avant.",
  },
  {
    q: "Quand recevons-nous les images ?",
    a: "Les livrables du reportage sont prêts à partager dès le lendemain. Le délai de l'aftermovie est fixé ensemble dans le devis.",
  },
  {
    q: "Vous vous déplacez hors de Strasbourg ?",
    a: "Oui, partout dans le Grand Est. Les frais de déplacement éventuels sont indiqués dans le devis.",
  },
  {
    q: "Pouvons-nous utiliser les contenus librement ?",
    a: "Oui, les droits de diffusion pour votre communication sont inclus.",
  },
];

export default async function EvenementielRdvPage() {
  const vimeoIds = Array.from(
    new Set([
      HERO_VIMEO,
      ...FILMS.map((f) => f.vimeoId),
      ...PROOFS.map((p) => p.vimeoId),
    ])
  );
  const thumbnails = await getVimeoThumbnails(
    vimeoIds.map((vimeoId) => ({ vimeoId }))
  );

  return (
    <div id="top" className="bg-background pb-24 lg:pb-0">
      <RdvHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="flex flex-col gap-3">
            <HeroVideo
              vimeoId={HERO_VIMEO}
              poster={thumbnails[HERO_VIMEO]}
              title="Showreel événementiel — Grub Studio"
              duration="26 s"
            />
            <div className="grid grid-cols-3 gap-3">
              <Stat accent="var(--accent-purple)" value="+200" label="entreprises accompagnées" sub="Strasbourg & Grand Est" />
              <Stat accent="var(--accent)" value="J+1" label="des images prêtes à partager" sub="Dès le lendemain" />
              <Stat accent="var(--accent-cyan)" value="20 min" label="pour cadrer votre événement" sub="Appel gratuit" />
            </div>
          </div>

          <div id="appel" className="flex flex-col gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Reportage événementiel · Strasbourg & Grand Est
            </p>
            <h1 className="text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">
              Une soirée.
              <br />
              Un an de contenus.
            </h1>
            <p className="max-w-[34em] text-lg leading-relaxed text-muted">
              Lancement, inauguration, soirée, salon : on capte votre
              événement en{" "}
              <b className="font-semibold text-foreground">
                photo et en vidéo
              </b>
              , avec des images{" "}
              <b className="font-semibold text-foreground">
                prêtes à partager dès le lendemain
              </b>
              .
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted">
              À partir de{" "}
              <b className="font-semibold text-accent-yellow">
                150 € HT
              </b>{" "}
              de l&rsquo;heure
            </span>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* Refs marquee (static, wrapped) */}
      <div className="border-y border-border">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Ils nous confient leurs événements
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {REFS.map((r) => (
              <span key={r} className="whitespace-nowrap text-[15px] font-medium text-muted">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Le constat */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/projects/vinci.jpg"
              alt="Repas d'entreprise, client Vinci Group"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Le constat
            </p>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Des mois de préparation. Quelques heures d&rsquo;événement.
            </h2>
            <p className="text-lg text-muted">
              Le jour J, vos équipes accueillent, animent et gèrent les
              imprévus. Personne n&rsquo;a le temps de filmer. Le lendemain,
              il reste quelques photos de téléphone et un post vite oublié.
            </p>
            <p className="border-l-2 border-accent pl-4 text-xl leading-snug">
              Un événement qu&rsquo;on ne montre pas n&rsquo;existe que pour
              ceux qui étaient là.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Terrain */}
      <section id="terrain" className="border-y border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Ce qu&rsquo;on capte sur le terrain
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Les discours, l&rsquo;ambiance, les détails.
            </h2>
            <p className="mt-3 text-muted">
              Un photographe ou un vidéaste, ou les deux, discrets et
              présents du début à la fin.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TERRAIN_IMAGES.map((img, i) => (
              <div
                key={img.src + i}
                className={
                  "relative aspect-[3/2] overflow-hidden rounded-xl border border-border" +
                  (i === 0 ? " col-span-2 row-span-2 aspect-auto sm:aspect-[3/2]" : "")
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 45vw"
                  className="object-cover"
                />
                {img.caption && (
                  <span className="absolute bottom-2.5 left-2.5 rounded-md bg-background/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground">
                    {img.caption}
                  </span>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Cycle */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Avant, pendant, après
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            On couvre tout le cycle.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-3">
          {CYCLE.map((c) => (
            <article key={c.title} className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[3/2]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div
                className="border-t-[3px] p-5"
                style={{ borderTopColor: c.accent }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {c.step}
                </p>
                <h3 className="mt-1.5 text-xl font-medium">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{c.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      {/* Résultats */}
      <section id="resultats" className="border-y border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Les résultats
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Des images qui se voient.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROOFS.map((p) => (
              <ProofCard
                key={p.vimeoId}
                vimeoId={p.vimeoId}
                poster={thumbnails[p.vimeoId]}
                stat={p.stat}
                statLabel={p.statLabel}
                client={p.client}
                cta={p.cta}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Films */}
      <section id="films" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Nos films d&rsquo;événements
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Regardez plutôt.
          </h2>
          <p className="mt-3 text-muted">
            Une sélection d&rsquo;aftermovies tournés et montés par
            l&rsquo;équipe.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((f) => (
            <FilmTile
              key={f.vimeoId}
              vimeoId={f.vimeoId}
              poster={thumbnails[f.vimeoId]}
              title={f.title}
              subtitle={f.subtitle}
              duration={f.duration}
            />
          ))}
        </Reveal>
        <p className="mt-7 text-sm">
          <a
            href="https://studio.le-grub.com/rush"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Tous nos reportages sur studio.le-grub.com ↗
          </a>
        </p>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="border-y border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Tarifs
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Des prix affichés, avant même l&rsquo;appel.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFERS.map((o) => (
              <div
                key={o.name}
                className={
                  "relative flex flex-col gap-3.5 rounded-xl border p-6" +
                  (o.cta === "solid" ? " border-accent-yellow" : " border-border")
                }
              >
                {o.pill && (
                  <span className="absolute -top-3 left-5 rounded-full bg-accent-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-background">
                    {o.pill}
                  </span>
                )}
                <h3 className="text-base font-semibold">{o.name}</h3>
                <span className="-mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                  {o.from}
                </span>
                <p className="text-[32px] font-semibold leading-none tracking-tight tabular-nums">
                  {o.price}{" "}
                  {o.unit && (
                    <span className="text-[13px] font-medium text-muted">
                      {o.unit}
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted">{o.text}</p>
                <ul className="flex flex-col gap-1.5 text-sm text-muted">
                  {o.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-2 h-[2px] w-1.5 shrink-0 rounded-full bg-accent-yellow" />
                      {it}
                    </li>
                  ))}
                </ul>
                {o.video && (
                  <VideoTextLink
                    vimeoId={OFFER_VIDEO}
                    title="L'offre intégrale événementielle expliquée"
                  >
                    L&rsquo;offre expliquée en vidéo (5:22)
                  </VideoTextLink>
                )}
                <a
                  href="#appel"
                  className={
                    "mt-auto rounded-lg px-4 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5" +
                    (o.cta === "solid"
                      ? " bg-accent-yellow text-background"
                      : " border border-border text-foreground")
                  }
                >
                  {o.cta === "solid" ? "Réserver un appel" : "En parler"}
                </a>
              </div>
            ))}
          </Reveal>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            Le tarif exact dépend de la durée, du lieu et des livrables
            souhaités. On cadre tout ça ensemble pendant l&rsquo;appel, avant
            de chiffrer.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Questions fréquentes
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Avant de réserver.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-7 grid gap-x-10 sm:grid-cols-2">
          {FAQ.map((f) => (
            <details key={f.q} className="border-b border-border py-5">
              <summary className="cursor-pointer list-none text-[17px] font-medium marker:content-none">
                {f.q}
              </summary>
              <p className="mt-2.5 text-[15px] text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* Fin */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Prochaine étape
            </p>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Votre prochain événement, on en parle en 20 minutes.
            </h2>
            <p className="text-muted">
              Un appel pour comprendre votre événement, vos objectifs et
              votre budget. Vous recevez un devis gratuit dans la foulée.
            </p>
            <a
              href="#appel"
              className="w-fit rounded-lg bg-accent-yellow px-5 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Réserver mon appel →
            </a>
            <div className="flex items-center gap-3.5 border-t border-border pt-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border font-semibold">
                NB
              </span>
              <p className="text-sm leading-relaxed text-muted">
                <b className="font-semibold text-foreground">
                  {contact.name}
                </b>{" "}
                · {contact.title}
                <br />
                <a href={contact.phoneHref} className="select-all">
                  {contact.phone}
                </a>{" "}
                ·{" "}
                <a href={`mailto:${contact.emailPro}`} className="select-all">
                  {contact.emailPro}
                </a>
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/projects/porsche-strasbourg-3.jpg"
              alt="Lancement Porsche Strasbourg"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <RdvFooter />
      <MobileCta />
    </div>
  );
}

function Stat({
  accent,
  value,
  label,
  sub,
}: {
  accent: string;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-xl border border-border border-t-[3px] p-3.5"
      style={{ borderTopColor: accent }}
    >
      <p className="text-[26px] font-semibold leading-none tracking-tight tabular-nums sm:text-[30px]">
        {value}
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-muted">{label}</p>
      <p className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70 sm:block">
        {sub}
      </p>
    </div>
  );
}

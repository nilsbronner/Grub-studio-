import { siteUrl } from "@/lib/site";
import { contact } from "@/lib/content/contact";

/** Public profiles used as `sameAs` — helps Google tie the site, the Business Profile and the socials to one entity. */
export const sameAs = [
  "https://www.instagram.com/grub_studio_cie/",
  "https://www.linkedin.com/company/le-grub",
  "https://www.youtube.com/@legrub3693",
  "https://vimeo.com/user220761433",
  "https://www.le-grub.com/",
];

/**
 * Site-wide LocalBusiness entity, injected once in the root layout. Mirrors
 * the Google Business Profile (same name, address, phone) — keep the NAP
 * identical everywhere or local rankings suffer.
 */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${siteUrl}/#business`,
  name: "Grub Studio",
  alternateName: "Le Grub Studio",
  description:
    "Agence de production vidéo et photo à Strasbourg : spots publicitaires, vidéos Ads et réseaux sociaux, reportages événementiels, interviews, films de marque, motion design, photo d'entreprise et studio podcast.",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  logo: `${siteUrl}/opengraph-image.jpg`,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.emailPro,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "91 Route des Romains",
    postalCode: "67200",
    addressLocality: "Strasbourg",
    addressRegion: "Grand Est",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.5777,
    longitude: 7.7097,
  },
  areaServed: [
    { "@type": "City", name: "Strasbourg" },
    { "@type": "AdministrativeArea", name: "Bas-Rhin" },
    { "@type": "AdministrativeArea", name: "Haut-Rhin" },
    { "@type": "AdministrativeArea", name: "Grand Est" },
  ],
  knowsAbout: [
    "Production vidéo",
    "Spot publicitaire",
    "Reportage événementiel",
    "Vidéo témoignage client",
    "Film institutionnel",
    "Motion design",
    "Photographie d'entreprise",
    "Podcast vidéo",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "LE GRUB",
    url: "https://www.le-grub.com/",
  },
  founder: { "@type": "Person", name: contact.name },
  sameAs,
};

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** Trims a meta description to Google's ~155-char display budget on a word boundary. */
export function clipDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Serialises JSON-LD safely for `dangerouslySetInnerHTML` (escapes `<` so a string can't close the script tag). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

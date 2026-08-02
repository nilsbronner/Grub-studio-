import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingContactCta } from "@/components/floating-contact-cta";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.bemotion.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bemotion — Studio de production audiovisuelle, Strasbourg",
    template: "%s — Bemotion",
  },
  description:
    "Bemotion, studio de production audiovisuelle basé à Strasbourg : spot pub, motion design, contenu réseaux, photo B2B.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Bemotion",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <CustomCursor />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingContactCta />
      </body>
    </html>
  );
}

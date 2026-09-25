import type { Metadata } from "next";

/**
 * Standard per-page metadata: sets the canonical URL and og:url to the
 * page's own path (both default to the homepage otherwise, since the root
 * layout only declares a site-wide fallback). `title`/`description` are
 * merged into `openGraph` by Next's metadata resolution, so pages only
 * need to pass them once here.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
  };
}

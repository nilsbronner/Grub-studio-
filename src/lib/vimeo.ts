type OEmbedResponse = {
  thumbnail_url?: string;
};

// Runs server-side during the static build, where outbound network access is
// unrestricted — resolves a real poster frame so tiles never render blank
// while the player boots, instead of the generic accent-gradient fallback.
async function fetchVimeoThumbnail(
  vimeoId: string,
  vimeoHash?: string
): Promise<string | null> {
  try {
    // Without a `width`, Vimeo's oEmbed defaults to a small ~295px-wide
    // thumbnail — fine as a tiny preview, blurry once stretched across a
    // full-width responsive `aspect-video` tile. Ask for a size that still
    // looks sharp at typical hero/card widths.
    // Unlisted videos require the private link hash in the URL, or oEmbed
    // refuses to resolve them.
    const videoUrl = vimeoHash
      ? `https://vimeo.com/${vimeoId}/${vimeoHash}`
      : `https://vimeo.com/${vimeoId}`;
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?width=1600&url=${encodeURIComponent(videoUrl)}`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return null;
    const data: OEmbedResponse = await res.json();
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

export async function getVimeoThumbnails(
  videos: { vimeoId: string; vimeoHash?: string }[]
): Promise<Record<string, string>> {
  const unique = Array.from(
    new Map(videos.map((v) => [v.vimeoId, v.vimeoHash])).entries()
  );
  const entries = await Promise.all(
    unique.map(
      async ([id, hash]) => [id, await fetchVimeoThumbnail(id, hash)] as const
    )
  );
  return Object.fromEntries(
    entries.filter((entry): entry is [string, string] => entry[1] !== null)
  );
}

export type VimeoMeta = {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: number;
};

/** Video metadata for `VideoObject` structured data — resolved at build time, null when Vimeo doesn't answer. */
export async function getVimeoMeta(vimeoId: string): Promise<VimeoMeta | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?width=1280&url=${encodeURIComponent(
        `https://vimeo.com/${vimeoId}`
      )}`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return null;
    const data: {
      title?: string;
      description?: string;
      thumbnail_url?: string;
      upload_date?: string;
      duration?: number;
    } = await res.json();
    return {
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnail_url,
      // oEmbed returns "YYYY-MM-DD HH:MM:SS" — schema.org wants ISO 8601.
      uploadDate: data.upload_date
        ? `${data.upload_date.replace(" ", "T")}+00:00`
        : undefined,
      duration: data.duration,
    };
  } catch {
    return null;
  }
}

/** Fills in `image` from the real Vimeo thumbnail wherever a project doesn't already have a poster. */
export async function withVimeoPosters<
  T extends { vimeoId?: string; vimeoHash?: string; image?: string }
>(items: T[]): Promise<T[]> {
  const videos = items
    .filter((item) => !item.image && item.vimeoId)
    .map((item) => ({ vimeoId: item.vimeoId as string, vimeoHash: item.vimeoHash }));
  if (videos.length === 0) return items;

  const thumbnails = await getVimeoThumbnails(videos);
  return items.map((item) =>
    !item.image && item.vimeoId && thumbnails[item.vimeoId]
      ? { ...item, image: thumbnails[item.vimeoId] }
      : item
  );
}

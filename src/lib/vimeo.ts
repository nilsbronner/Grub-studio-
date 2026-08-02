type OEmbedResponse = {
  thumbnail_url?: string;
};

// Runs server-side during the static build, where outbound network access is
// unrestricted — resolves a real poster frame so tiles never render blank
// while the player boots, instead of the generic accent-gradient fallback.
async function fetchVimeoThumbnail(vimeoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
        `https://vimeo.com/${vimeoId}`
      )}`,
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
  vimeoIds: string[]
): Promise<Record<string, string>> {
  const unique = Array.from(new Set(vimeoIds));
  const entries = await Promise.all(
    unique.map(async (id) => [id, await fetchVimeoThumbnail(id)] as const)
  );
  return Object.fromEntries(
    entries.filter((entry): entry is [string, string] => entry[1] !== null)
  );
}

/** Fills in `image` from the real Vimeo thumbnail wherever a project doesn't already have a poster. */
export async function withVimeoPosters<T extends { vimeoId?: string; image?: string }>(
  items: T[]
): Promise<T[]> {
  const ids = items
    .filter((item) => !item.image && item.vimeoId)
    .map((item) => item.vimeoId as string);
  if (ids.length === 0) return items;

  const thumbnails = await getVimeoThumbnails(ids);
  return items.map((item) =>
    !item.image && item.vimeoId && thumbnails[item.vimeoId]
      ? { ...item, image: thumbnails[item.vimeoId] }
      : item
  );
}

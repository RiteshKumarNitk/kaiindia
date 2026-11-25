/**
 * Safe YouTube link handling for the Video Gallery.
 * Only the 11-character video ID is ever extracted and reused; the rest of a URL is never
 * placed in markup, so no untrusted HTML or parameters can reach the page.
 */
const ID = /^[A-Za-z0-9_-]{11}$/;
const HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be", "www.youtu.be", "youtube-nocookie.com", "www.youtube-nocookie.com"]);

/**
 * Returns the video ID for standard links (youtube.com/watch?v=…), short links (youtu.be/…),
 * Shorts (youtube.com/shorts/…), embeds (/embed/…) and live links (/live/…). Otherwise null.
 */
export function getYouTubeId(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (!HOSTS.has(url.hostname.toLowerCase())) return null;

  let candidate: string | null = null;
  if (url.hostname.toLowerCase().endsWith("youtu.be")) {
    candidate = url.pathname.split("/")[1] ?? null;
  } else if (url.pathname === "/watch") {
    candidate = url.searchParams.get("v");
  } else {
    const [, kind, id] = url.pathname.split("/");
    if (kind === "shorts" || kind === "embed" || kind === "live" || kind === "v") candidate = id ?? null;
  }
  return candidate && ID.test(candidate) ? candidate : null;
}

/** Privacy-enhanced embed URL (no cookies until the visitor plays the video). */
export const youTubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

/** Thumbnail image served by YouTube. */
export const youTubeThumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Public watch URL (used for "Watch on YouTube" links). */
export const youTubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

import type { GalleryPhoto, NewsArticle, VideoItem } from "@/lib/types";

/* News, photographs and videos. Lists start empty; add approved items with status "published". */

export const newsArticles: NewsArticle[] = [];

/** Photo Gallery — images in /public/gallery, shown uncropped; each opens full size when clicked. */
export const galleryPhotos: GalleryPhoto[] = [
  // Supplied by the client, 25 Nov 2026 (originally public/gallery.jpeg).
  {
    status: "published",
    src: "/gallery/india-open-karate-para-karate-championship-2026-27.jpeg",
    alt: "Poster: India Open Karate & Para Karate National Karate Championship 2026–27, 23–25 December 2026, Sports Complex, Tau Devi Lal Stadium, Panchkula (Haryana), organised by Haryana Sports Karate Association (HSKA)",
    caption: "India Open Karate & Para Karate National Karate Championship 2026–27 · 23–25 December 2026 · Tau Devi Lal Stadium, Panchkula",
    width: 1199,
    height: 1312,
  },
];

/**
 * Video Gallery — add approved YouTube links here; no component changes are needed. Example:
 *
 *   {
 *     status: "published",
 *     title: "National Karate Championship 2026 — Kumite finals",
 *     youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",   // or a /shorts/ link
 *     description: "Highlights from the finals.",
 *     publishedAt: "2026-11-20",
 *   },
 *
 * Invalid or non-YouTube links are ignored. Only add videos the association has supplied or approved.
 */
export const videos: VideoItem[] = [];

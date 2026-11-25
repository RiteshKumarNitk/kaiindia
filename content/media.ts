import type { GalleryPhoto, NewsArticle, VideoItem } from "@/lib/types";

/* News, photographs and videos. Lists start empty; add approved items with status "published". */

export const newsArticles: NewsArticle[] = [];

export const galleryPhotos: GalleryPhoto[] = [];

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

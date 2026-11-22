import type {
  CommitteeKey,
  CommitteeMember,
  ContentStatus,
  DocumentCollection,
  GalleryPhoto,
  NewsArticle,
  OfficialDocument,
  PresidentMessage,
  StateAssociation,
  VideoItem,
} from "./types";

/**
 * Approved KAI records.
 *
 * Every list starts empty on purpose: nothing is published until the association supplies
 * and approves it. Add records with `status: "draft"` while they are under review — drafts are
 * never rendered — and change the status to "published" once approved.
 * See README.md → "Publishing approved content" for worked examples.
 */

export const committees: Record<CommitteeKey, CommitteeMember[]> = {
  executive: [],
  "anti-doping": [],
  referee: [],
  womens: [],
  kata: [],
  kumite: [],
  media: [],
  judges: [],
};

export const presidentMessage: PresidentMessage = {
  status: "coming-soon",
  paragraphs: [],
};

export const stateAssociations: StateAssociation[] = [];

export const newsArticles: NewsArticle[] = [];

export const galleryPhotos: GalleryPhoto[] = [];

export const videos: VideoItem[] = [];

export const documents: Record<DocumentCollection, OfficialDocument[]> = {
  "association-rules": [],
  "karate-rules": [],
  governance: [],
};

/** Only approved items are ever shown publicly. */
export function published<T extends { status: ContentStatus }>(items: T[]): T[] {
  return items.filter((item) => item.status === "published");
}

export function isPublished(item: { status: ContentStatus }): boolean {
  return item.status === "published";
}

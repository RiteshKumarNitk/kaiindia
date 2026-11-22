/**
 * Shared types for the KAI website.
 *
 * Content readiness model
 * -----------------------
 * Every piece of KAI-specific content carries a `status`:
 *   - "coming-soon": nothing has been supplied yet. The page shows a Coming Soon panel.
 *   - "draft":       material has been supplied but NOT approved. It is never rendered publicly.
 *   - "published":   approved by the association. Only this status is rendered.
 */
export type ContentStatus = "coming-soon" | "draft" | "published";

/** Every route on the site. Adding a route here forces a matching entry in `lib/page-content.ts`. */
export const routePaths = [
  "/",
  "/about",
  "/about/athlete-login",
  "/about/coach-login",
  "/about/judges-profile",
  "/about/karate",
  "/organisation",
  "/organisation/chairman-message",
  "/organisation/executive-committee",
  "/organisation/anti-doping-committee",
  "/organisation/referee-committee",
  "/organisation/womens-committee",
  "/organisation/kata-committee",
  "/organisation/kumite-committee",
  "/organisation/media-committee",
  "/organisation/associate-states",
  "/media",
  "/media/news",
  "/media/photo-gallery",
  "/media/video-gallery",
  "/rules-regulations",
  "/rules-regulations/kai-association-rules",
  "/rules-regulations/karate-rules",
  "/membership",
  "/membership/club",
  "/membership/academy",
  "/privacy-policy",
  "/refund-policy",
  "/donations",
  "/rti-governance",
  "/contact",
] as const;

export type RoutePath = (typeof routePaths)[number];

export type NavLink = { label: string; href: RoutePath; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export type ComingSoonCopy = { title: string; description: string };

/** A block of explanatory text, optionally gated by approval status. */
export type InfoSection = {
  id: string;
  title: string;
  /** Paragraphs shown only when `status` is "published". */
  body?: string[];
  status: ContentStatus;
  /** Message shown while the section is not published. */
  pending?: string;
};

export type CommitteeKey =
  | "executive"
  | "anti-doping"
  | "referee"
  | "womens"
  | "kata"
  | "kumite"
  | "media"
  | "judges";

export type DocumentCollection = "association-rules" | "karate-rules" | "governance";

/** Describes which template a page uses and the data it needs. */
export type PageBody =
  | { kind: "home" }
  | {
      kind: "hub";
      /** Visual structure of the landing page. */
      layout: "editorial" | "directory" | "features" | "documents" | "pathways";
      groups: { title?: string; links: RoutePath[] }[];
      pending?: ComingSoonCopy;
    }
  | { kind: "portal"; role: "Athlete" | "Coach"; features: string[] }
  | { kind: "directory"; committee: CommitteeKey; focus: string[] }
  | { kind: "states" }
  | { kind: "message" }
  | { kind: "info"; sections: InfoSection[]; pending?: ComingSoonCopy; related?: { title: string; links: RoutePath[] } }
  | { kind: "news" }
  | { kind: "photos" }
  | { kind: "videos" }
  | { kind: "documents"; collection: DocumentCollection; intro?: InfoSection[] }
  | { kind: "membership"; sections: InfoSection[] }
  | { kind: "policy" }
  | { kind: "donations" }
  | { kind: "governance"; topics: InfoSection[] }
  | { kind: "contact" };

export type PageEntry = {
  /** Visible H1. */
  title: string;
  /** Short label for breadcrumbs and cards (defaults to title). */
  shortTitle?: string;
  /** Small label above the H1. */
  eyebrow: string;
  /** Introductory paragraph under the H1. */
  intro: string;
  /** Meta description (keep factual — no unverified claims). */
  metaDescription: string;
  /** Page-level Coming Soon message. */
  comingSoon: ComingSoonCopy;
  body: PageBody;
};

/* ---------- Records that will be supplied by the association ---------- */

export type CommitteeMember = {
  status: ContentStatus;
  name: string;
  designation: string;
  state?: string;
  biography?: string;
  /** Path under /public, e.g. "/people/executive/jane-doe.jpg". */
  photo?: string;
};

export type StateAssociation = {
  status: ContentStatus;
  state: string;
  associationName: string;
  representative?: string;
  email?: string;
  phone?: string;
  website?: string;
  /** Only set when the recognition has been verified in writing. */
  recognitionStatus?: string;
};

export type NewsArticle = {
  status: ContentStatus;
  slug: string;
  title: string;
  /** ISO date, e.g. "2027-01-15". */
  date: string;
  summary: string;
  image?: { src: string; alt: string };
  /** Full article link (internal path or external URL). */
  href?: string;
};

export type GalleryPhoto = {
  status: ContentStatus;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type VideoItem = {
  status: ContentStatus;
  title: string;
  date?: string;
  description?: string;
  thumbnail?: { src: string; alt: string };
  /** YouTube video id for an approved embed. */
  youtubeId?: string;
};

export type OfficialDocument = {
  status: ContentStatus;
  title: string;
  description: string;
  category: string;
  version?: string;
  /** ISO date. */
  publishedOn?: string;
  /** Path under /public, e.g. "/documents/kai-constitution-v1.pdf". */
  file?: string;
};

export type LeadershipMessage = {
  status: ContentStatus;
  name?: string;
  designation?: string;
  portrait?: string;
  paragraphs: string[];
};

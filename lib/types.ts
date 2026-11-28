import type { IconName } from "@/components/ui/Icon";

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

/** Every route on the site. Adding a route here forces a matching entry in `content/pages.ts`. */
export const routePaths = [
  "/",
  "/about",
  "/about/director-message",
  "/about/executive-members",
  "/about/associate-states",
  "/about/athlete-login",
  "/about/coach-login",
  "/about/judges-profile",
  "/about/karate",
  "/committee/anti-doping",
  "/committee/referee",
  "/committee/womens",
  "/committee/kata",
  "/committee/kumite",
  "/committee/media",
  "/committee/discipline",
  "/committee/organise",
  "/committee/technical",
  "/committee/sports",
  "/committee/athletes",
  "/committee/sexual-harassment",
  "/committee/medical-physio",
  "/committee/objection",
  "/committee/management",
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
  "/certificate-verification",
  "/rti-governance",
  "/contact",
] as const;

export type RoutePath = (typeof routePaths)[number];

export type NavLink = { label: string; href: RoutePath; description?: string };
/**
 * A top-level menu item. Items with `children` open a dropdown (desktop) or accordion (mobile).
 * `section` is the URL prefix used to highlight the item as active; it does not need to be a
 * page of its own (e.g. "/committee" has no landing page).
 */
export type NavItem =
  | (NavLink & { children?: undefined; section?: undefined })
  | { label: string; section: string; children: NavLink[]; href?: undefined };

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

export type MembershipCategory = "club" | "academy";
export type ApplicationType = "new" | "renewal";

export type CommitteeKey =
  | "executive"
  | "anti-doping"
  | "referee"
  | "womens"
  | "kata"
  | "kumite"
  | "media"
  | "discipline"
  | "organise"
  | "technical"
  | "sports"
  | "athletes"
  | "sexual-harassment"
  | "medical"
  | "objection"
  | "management"
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
  | {
      kind: "directory";
      committee: CommitteeKey;
      /** Typical areas of responsibility. Leave empty when the committee's role is not yet confirmed. */
      focus: string[];
      /** Icon for the "members to be announced" panel. */
      icon?: IconName;
      /** Show "each profile will include a photograph…" (default true). */
      showProfileNote?: boolean;
      /** Short note shown under the members panel (e.g. on sensitive pages). */
      notice?: string;
    }
  | { kind: "executive" }
  | { kind: "states" }
  | { kind: "message" }
  | { kind: "info"; sections: InfoSection[]; pending?: ComingSoonCopy; related?: { title: string; links: RoutePath[] } }
  | { kind: "news" }
  | { kind: "photos" }
  | { kind: "videos" }
  | { kind: "documents"; collection: DocumentCollection; intro?: InfoSection[] }
  | {
      kind: "membership";
      /** Pre-selects the category on the application form. */
      category: MembershipCategory;
      /** Information still to be published (shown beside the form). */
      sections: InfoSection[];
    }
  | { kind: "policy" }
  | { kind: "donations" }
  | { kind: "certificates" }
  | { kind: "governance"; topics: InfoSection[] }
  | { kind: "contact" };

export type PageEntry = {
  /** Visible H1. */
  title: string;
  /** Optional line shown directly under the H1. */
  subtitle?: string;
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
  /** Other public office, e.g. "MLA, Vejalpur, Gujarat" — only as supplied by the client. */
  affiliation?: string;
  biography?: string;
  /** Path under /public, e.g. "/assets/name.jpeg". */
  photo?: string;
  /** CSS object-position for cropping the photo, e.g. "50% 80%" (default "50% 18%"). */
  photoFocus?: string;
};

/**
 * A state/UT karate association. Keyed by the stable region `code` from content/states.ts
 * (never by display name), and kept separate from the map geometry.
 */
export type StateAssociation = {
  /** Region code, e.g. "hr" for Haryana. */
  code: string;
  /** "published" only for details supplied/approved by the client; everything else "pending". */
  status: "pending" | "published";
  associationName?: string;
  abbreviation?: string;
  /** Official banner in /public/associate-states (JPG, JPEG, PNG or WebP) with its pixel size. */
  banner?: { src: string; width: number; height: number };
  /** Officials exactly as titled by the association (e.g. "General Secretary" or "Secretary"). */
  officials?: { role: string; name: string; note?: string }[];
  phones?: string[];
  email?: string;
  website?: string;
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

/** A YouTube video in the Video Gallery. Add only links supplied or approved by the association. */
export type VideoItem = {
  status: ContentStatus;
  title: string;
  /** Any standard YouTube link: watch?v=…, youtu.be/…, /shorts/…, /embed/… or /live/…. */
  youtubeUrl: string;
  description?: string;
  /** ISO date, e.g. "2026-11-20". */
  publishedAt?: string;
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

export type SliderImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type LeadershipMessage = {
  status: ContentStatus;
  name?: string;
  designation?: string;
  portrait?: string;
  images?: SliderImage[];
  paragraphs: string[];
};

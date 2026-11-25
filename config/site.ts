/**
 * Site-wide settings.
 *
 * Contact details are intentionally empty. Fill them in only with information the
 * association has confirmed in writing; the Contact page and footer pick them up automatically.
 */
export type ContactDetails = {
  email: string | null;
  phone: string | null;
  address: string | null;
  /** Office hours as day/time rows — only once confirmed. */
  officeHours: { days: string; hours: string }[] | null;
  /** Link to the verified office location (e.g. a Google Maps URL). Only set with a verified address. */
  mapUrl: string | null;
};

export type ContactFormConfig = {
  /**
   * URL that receives enquiries as JSON (POST). Leave null until a secure backend exists —
   * e.g. a Next.js Route Handler at app/api/contact/route.ts that sends email using
   * credentials stored in server-side environment variables. Never put API keys here.
   * While null, the form validates input but submission is disabled.
   */
  endpoint: string | null;
};

function resolveSiteUrl(): { url: string; confirmed: boolean } {
  // Set NEXT_PUBLIC_SITE_URL once the production domain is confirmed.
  const confirmed = process.env.NEXT_PUBLIC_SITE_URL;
  if (confirmed) return { url: confirmed.replace(/\/$/, ""), confirmed: true };
  // Vercel provides the project's production hostname at build time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return { url: `https://${vercel}`, confirmed: false };
  return { url: "http://localhost:3000", confirmed: false };
}

const site = resolveSiteUrl();

export const siteConfig = {
  name: "Karate Association of India",
  shortName: "KAI",
  tagline: "National Federation for Karate in India",
  description:
    "Official website of the Karate Association of India (KAI) — national federation for the promotion and development of karate sport in India since 2013.",
  /** Absolute base URL used for the sitemap and robots.txt. */
  url: site.url,
  /** Canonical URLs are emitted only when the domain is confirmed via NEXT_PUBLIC_SITE_URL. */
  urlConfirmed: site.confirmed,
  crest: { src: "/kai-crest.jpg", width: 447, height: 447 },
  illustration: { src: "/karate.webp", width: 1254, height: 1254 },
  /** Official social channels supplied by the client (tracking parameters removed). */
  social: {
    youtube: "https://www.youtube.com/@karateassociationofindiakai", // supplied 25 Nov 2026
  },
  // Fill in ONLY with details the association has confirmed in writing.
  contact: {
    email: "kaikarateassociation@gmail.com", // supplied by the client, 24 November 2026
    phone: null,
    address: null,
    // Supplied by the client, 25 Nov 2026. No holiday schedule has been supplied.
    officeHours: [
      { days: "Monday to Saturday", hours: "10:00 AM – 5:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    mapUrl: null,
  } satisfies ContactDetails as ContactDetails,
  contactForm: {
    endpoint: null,
  } satisfies ContactFormConfig as ContactFormConfig,
  /**
   * Membership applications. Same rules as contactForm: leave null until a secure server-side
   * endpoint exists. That endpoint must re-validate every field and calculate the fee itself.
   */
  membershipForm: {
    endpoint: null,
  } satisfies ContactFormConfig as ContactFormConfig,
};

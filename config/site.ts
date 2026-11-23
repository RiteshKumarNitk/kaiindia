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
  contact: {
    email: null,
    phone: null,
    address: null,
  } satisfies ContactDetails as ContactDetails,
};

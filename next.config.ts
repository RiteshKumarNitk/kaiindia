import type { NextConfig } from "next";

/** Old URL → new URL. All are permanent (308) so bookmarks and search results keep working. */
const movedPages: Record<string, string> = {
  // Leadership message: President's → Chairman's → Director's → Chairman's Message (client, 25 Nov 2026).
  "/organisation/president-message": "/about/chairman-message",
  "/organisation/chairman-message": "/about/chairman-message",
  "/organisation/director-message": "/about/chairman-message",
  "/about/director-message": "/about/chairman-message",
  // About KAI
  "/organisation/executive-committee": "/about/executive-members",
  "/organisation/associate-states": "/about/associate-states",
  // Committee
  "/organisation/anti-doping-committee": "/committee/anti-doping",
  "/organisation/referee-committee": "/committee/referee",
  "/organisation/womens-committee": "/committee/womens",
  "/organisation/kata-committee": "/committee/kata",
  "/organisation/kumite-committee": "/committee/kumite",
  "/organisation/media-committee": "/committee/media",
  "/organisation/medical-physio-committee": "/committee/medical-physio",
  "/organisation/objection-committee": "/committee/objection",
  "/organisation/management-committee": "/committee/management",
  // Section roots without a page of their own
  "/organisation": "/about",
  "/committee": "/committee/anti-doping",
};

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: { root: process.cwd() },
  images: {
    // Serve AVIF (smallest) where supported, then WebP; originals stay in /public.
    formats: ["image/avif", "image/webp"],
    // YouTube video thumbnails for the Video Gallery.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return Object.entries(movedPages).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;

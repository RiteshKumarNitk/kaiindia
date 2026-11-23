import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: { root: process.cwd() },
  images: {
    // Serve AVIF (smallest) where supported, then WebP; originals stay in /public.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The leadership message page moved: President's Message → Chairman's Message → Director's Message.
      {
        source: "/organisation/president-message",
        destination: "/organisation/director-message",
        permanent: true,
      },
      {
        source: "/organisation/chairman-message",
        destination: "/organisation/director-message",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

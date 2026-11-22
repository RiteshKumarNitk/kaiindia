import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      // The President's Message page was replaced by the Chairman's Message.
      {
        source: "/organisation/president-message",
        destination: "/organisation/chairman-message",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

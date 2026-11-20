import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coming Soon | Karate Association of India",
  description: "The Karate Association of India website is coming soon.",
  icons: { icon: { url: "/kai-crest.jpg", type: "image/jpeg" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}

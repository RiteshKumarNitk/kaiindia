import localFont from "next/font/local";
import { ChairmanSection } from "@/components/home/ChairmanSection";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Mission } from "@/components/home/Mission";
import { OfficeBearers } from "@/components/home/OfficeBearers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/");

/*
 * Heavy weight for the hero title only, scoped to this page. Not preloaded: a preload hint
 * would also be fetched by other pages when they prefetch "/". The metric-matched fallback
 * keeps the title stable while it loads.
 */
const fontDisplayHeavy = localFont({
  src: "../assets/fonts/barlow-condensed-latin-800.woff2",
  weight: "800",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-display-heavy",
  adjustFontFallback: "Arial",
});

export default function Home() {
  return (
    <div className={fontDisplayHeavy.variable}>
      <Hero />
      <ChairmanSection />
      <OfficeBearers />
      <Introduction />
      <Mission />
    </div>
  );
}

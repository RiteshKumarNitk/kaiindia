import localFont from "next/font/local";

/*
 * Self-hosted fonts (SIL Open Font License — see assets/fonts/LICENSE-*.txt).
 * next/font preloads them and generates metric-matched fallback fonts, so text renders
 * immediately without layout shift. Only the Latin subset is shipped.
 *
 * These are used in the root layout, so they are preloaded on every route.
 * The heavy 800 weight is only used by the homepage hero and is loaded in app/page.tsx.
 */
export const fontSans = localFont({
  src: "../assets/fonts/inter-latin-wght.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
});

export const fontDisplay = localFont({
  src: "../assets/fonts/barlow-condensed-latin-700.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: "Arial",
});

import type { Metadata } from "next";
import { getPage } from "@/content/pages";
import { siteConfig } from "@/config/site";
import type { RoutePath } from "@/lib/types";

/** Builds unique per-page metadata from the page-content registry. */
export function pageMetadata(path: RoutePath): Metadata {
  const page = getPage(path);
  const title = path === "/" ? `${siteConfig.name} — Website Coming Soon` : page.title;
  return {
    title: path === "/" ? { absolute: title } : title,
    description: page.metaDescription,
    alternates: siteConfig.urlConfirmed ? { canonical: path } : undefined,
    openGraph: {
      title: path === "/" ? title : `${title} | ${siteConfig.name}`,
      description: page.metaDescription,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
  };
}

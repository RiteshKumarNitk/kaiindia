import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { routePaths } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}

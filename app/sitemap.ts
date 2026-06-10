import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/streamers", "/how-it-works", "/about", "/apply", "/privacy", "/terms"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : path === "/apply" ? 0.9 : 0.6,
    })
  );
}

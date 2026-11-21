
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vagdiagnos.se",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

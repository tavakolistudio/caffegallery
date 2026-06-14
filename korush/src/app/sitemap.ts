import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://menu.koroushmall.ir", priority: 1 },
    { url: "https://menu.koroushmall.ir/cafe", priority: 0.9 },
    { url: "https://menu.koroushmall.ir/sushi", priority: 0.9 },
    { url: "https://menu.koroushmall.ir/pasta", priority: 0.9 },
  ];
}

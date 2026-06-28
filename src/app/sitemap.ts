import type { MetadataRoute } from "next";
import { getTopics } from "@/lib/questions";

const BASE = "https://www.107license.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/study-path`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/cold-facts`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cheatsheet`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/exam`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/topics`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/flash`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/review`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/listen`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/exam-day`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
  const topicRoutes: MetadataRoute.Sitemap = getTopics().map((t) => ({
    url: `${BASE}/topic/${t.topic}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  return [...staticRoutes, ...topicRoutes];
}

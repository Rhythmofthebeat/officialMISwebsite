import type { MetadataRoute } from "next";

const siteUrl = "https://www.minoritiesinstem.org";
const lastModified = new Date("2026-06-19");

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about/mission", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/team", changeFrequency: "monthly", priority: 0.8 },
  { path: "/initiatives", changeFrequency: "monthly", priority: 0.9 },
  { path: "/initiatives/community-inclusivity", changeFrequency: "monthly", priority: 0.8 },
  { path: "/chapters", changeFrequency: "weekly", priority: 0.9 },
  { path: "/get-involved", changeFrequency: "monthly", priority: 0.9 },
  { path: "/get-involved/start-chapter", changeFrequency: "monthly", priority: 0.8 },
  { path: "/become-a-tutor", changeFrequency: "monthly", priority: 0.8 },
  { path: "/community", changeFrequency: "weekly", priority: 0.7 },
  { path: "/events", changeFrequency: "weekly", priority: 0.8 },
  { path: "/hackathon", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources/articles", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources/podcasts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources/links", changeFrequency: "monthly", priority: 0.7 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/donate", changeFrequency: "monthly", priority: 0.8 },
  { path: "/archive", changeFrequency: "monthly", priority: 0.6 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}

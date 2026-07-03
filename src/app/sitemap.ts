import type { MetadataRoute } from "next";

const BASE_URL = "https://alphatrademarkets.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/markets",
    "/forex",
    "/stocks",
    "/commodities",
    "/indices",
    "/etfs",
    "/cryptocurrency",
    "/education",
    "/pricing",
    "/about",
    "/careers",
    "/blog",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/risk-disclosure",
    "/aml-policy",
    "/kyc-policy",
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

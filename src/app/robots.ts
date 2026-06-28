import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.107license.com/sitemap.xml",
    host: "https://www.107license.com",
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "107 License — FAA Part 107 Study",
    short_name: "107 License",
    description:
      "Free, audited Part 107 study app: 653 questions, real FAA chart figures, cheat sheet with deep explanations, glossary, audio narration for accessibility.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ee",
    theme_color: "#2563eb",
    orientation: "portrait",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

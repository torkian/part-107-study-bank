import { AppIcon } from "@/components/AppIcon";
import GlossaryClient from "./GlossaryClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviation Glossary",
  description: "201 Part 107 aviation terms with plain-English definitions and FAA citations.",
  alternates: { canonical: "https://www.107license.com/glossary" },
  openGraph: {
    title: "Aviation Glossary · 107 License",
    description: "201 Part 107 aviation terms with plain-English definitions and FAA citations.",
    url: "https://www.107license.com/glossary",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aviation Glossary · 107 License",
    description: "201 Part 107 aviation terms with plain-English definitions and FAA citations.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};


export default function GlossaryPage() {
  return (
    <div className="page-shell glossary-page">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="book" />
          Glossary
        </span>
        <h1 className="page-title">Aviation acronyms, decoded</h1>
        <p className="lede">
          Plain-English definitions for the abbreviations and chart/weather codes used throughout the Part 107 study app.
        </p>
      </header>

      <GlossaryClient />
    </div>
  );
}

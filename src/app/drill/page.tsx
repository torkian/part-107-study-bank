import { AppIcon } from "@/components/AppIcon";
import DrillBuilder from "./DrillBuilder";
import { loadAllQuestions } from "@/lib/questions";
import { ACS_BUCKETS } from "@/lib/acs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weak-Area Drill",
  description:
    "Filter the 653-question bank by topic, difficulty, or your mistakes. One click drills your weakest questions.",
  alternates: { canonical: "https://www.107license.com/drill" },
  openGraph: {
    title: "Weak-Area Drill · 107 License",
    description:
      "Filter the 653-question bank by topic, difficulty, or your mistakes. One click drills your weakest questions.",
    url: "https://www.107license.com/drill",
    images: [
      {
        url: "https://www.107license.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "107 License — Free FAA Part 107 Drone Pilot Study App",
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default function DrillPage() {
  const all = loadAllQuestions();
  return (
    <div className="page-shell drill-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="target" />
          Drill mode
        </span>
        <h1 className="page-title">Drill exactly what you need</h1>
        <p className="lede">
          Pick topics, difficulty, or pull from questions you&rsquo;ve missed. The one-click
          <em> Drill my weakest</em> pulls straight from your mistake history.
        </p>
      </header>

      <DrillBuilder allQuestions={all} acsBuckets={ACS_BUCKETS.map((b) => ({ key: b.key, label: b.label }))} />
    </div>
  );
}

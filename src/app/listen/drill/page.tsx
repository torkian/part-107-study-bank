import type { Metadata } from "next";
import { AppIcon } from "@/components/AppIcon";
import { HARD_NUMBERS_SCRIPT } from "@/data/audio-week2";
import DriveModeDrill from "./DriveModeDrill";

export const metadata: Metadata = {
  title: "Drive-Mode Drill · Hard Numbers Loop",
  description:
    "6-minute rapid-fire audio drill of every Part 107 hard number. Auto-plays, loops, and keeps your commute a study session.",
  alternates: { canonical: "https://www.107license.com/listen/drill" },
  openGraph: {
    title: "Drive-Mode Drill · 107 License",
    description:
      "Loop the hard numbers — groundspeed, altitude, weather minimums, categories, waivers — while you drive.",
    url: "https://www.107license.com/listen/drill",
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

export default function DrillPage() {
  return (
    <div className="page-shell drive-mode-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="headphones" />
          Listen · Drive-mode drill
        </span>
        <h1 className="page-title">Every hard number, on repeat</h1>
        <p className="lede">
          A single 6-minute audio loop covering every memorize-cold Part 107 number: groundspeed,
          altitude, visibility, cloud clearance, civil twilight, categories, alcohol, waivers.
          Auto-plays and loops — perfect for a commute or a walk.
        </p>
      </header>

      <DriveModeDrill script={HARD_NUMBERS_SCRIPT} />
    </div>
  );
}

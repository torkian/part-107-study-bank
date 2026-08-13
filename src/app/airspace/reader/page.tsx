import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import { AIRSPACE_SCRIPTS } from "@/data/audio-week2";
import { week2ScriptText } from "@/lib/audio-text";

export const metadata: Metadata = {
  title: "Sectional Chart Audio Reader",
  description:
    "Five spoken walkthroughs that teach how to read the sectional-chart symbols the Part 107 exam tests most.",
  alternates: { canonical: "https://www.107license.com/airspace/reader" },
  openGraph: {
    title: "Sectional Chart Audio Reader · 107 License",
    description:
      "Five audio walkthroughs on Class B stacks, Class E floors, tower rings, CTAF blocks, and MEFs.",
    url: "https://www.107license.com/airspace/reader",
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

export default function AirspaceReaderPage() {
  return (
    <div className="page-shell decoder-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="map" />
          Airspace · Chart reader
        </span>
        <h1 className="page-title">Read a sectional the way a check pilot does</h1>
        <p className="lede">
          Class B stacks, Class E floors, tower rings, CTAF frequency blocks, and MEF quadrants —
          walked aloud so you build the mental voice that turns a static chart into a decision.
        </p>
        <p className="lede">
          <Link href="/topic/airspace" className="btn btn-secondary">
            <AppIcon name="target" />
            Practice airspace questions
          </Link>
        </p>
      </header>

      <ol className="decoder-list">
        {AIRSPACE_SCRIPTS.map((s, i) => (
          <li key={s.slug} id={s.slug} className="decoder-item card">
            <div className="decoder-item-head">
              <span className="decoder-index">#{i + 1}</span>
              <div>
                <h2 className="decoder-title">{s.title}</h2>
                <p className="decoder-summary">{s.summary}</p>
              </div>
            </div>

            <AudioPlayer text={week2ScriptText(s)} label={s.title} size="md" />

            {s.teachingPoints.length > 0 && (
              <div className="decoder-teaching">
                <span className="section-kicker">What to remember</span>
                <ul>
                  {s.teachingPoints.map((tp) => (
                    <li key={tp}>{tp}</li>
                  ))}
                </ul>
              </div>
            )}

            {s.faaCitations.length > 0 && (
              <div className="decoder-citations">
                {s.faaCitations.map((c) => (
                  <span key={c} className="citation-chip">
                    <AppIcon name="book" />
                    {c}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

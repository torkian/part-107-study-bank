import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import { METAR_TAF_SCRIPTS } from "@/data/audio-week2";
import { week2ScriptText } from "@/lib/audio-text";

export const metadata: Metadata = {
  title: "METAR / TAF Audio Decoder",
  description:
    "Listen to eight real METAR and TAF reports decoded character-by-character with the exact Part 107 go/no-go verdict.",
  alternates: { canonical: "https://www.107license.com/weather/decoder" },
  openGraph: {
    title: "METAR / TAF Audio Decoder · 107 License",
    description:
      "Listen to eight real weather reports decoded character-by-character with the Part 107 go/no-go verdict for each.",
    url: "https://www.107license.com/weather/decoder",
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

export default function DecoderPage() {
  return (
    <div className="page-shell decoder-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="cloud" />
          Weather · METAR / TAF decoder
        </span>
        <h1 className="page-title">Decode weather like a check pilot</h1>
        <p className="lede">
          Eight real reports walked token by token with a spoken Part 107 go/no-go. Weather is the
          number-two failure category on the exam — this is the fastest way to train the mental
          read-aloud pattern the test rewards.
        </p>
        <p className="lede">
          <Link href="/topic/weather" className="btn btn-secondary">
            <AppIcon name="target" />
            Practice weather questions
          </Link>
        </p>
      </header>

      <ol className="decoder-list">
        {METAR_TAF_SCRIPTS.map((s, i) => (
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

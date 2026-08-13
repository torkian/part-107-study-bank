import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import { TOPIC_BRIEFINGS, type AudioScript } from "@/data/audio-week2";
import { week2ScriptText } from "@/lib/audio-text";

// Maps a `/topic/[topic]` route slug to any Week 2 briefing scripts that
// belong on that page. Some topics carry multiple briefings (regulations
// gets categories, remote-ID, accident-reporting) — all render as a stack.
const TOPIC_TO_BRIEFING_SLUGS: Record<string, string[]> = {
  airspace: ["airspace", "sectional-symbology"],
  weather: ["weather"],
  regulations: ["categories-1-4", "remote-id", "accident-reporting", "alcohol-drugs-medical"],
  loading: ["loading-performance"],
  performance: ["loading-performance"],
  night: ["night-ops"],
  physiology: ["alcohol-drugs-medical"],
  adm: ["hazardous-attitudes"],
};

function briefingsForTopic(topic: string): AudioScript[] {
  const slugs = TOPIC_TO_BRIEFING_SLUGS[topic];
  if (!slugs) return [];
  return slugs
    .map((slug) => TOPIC_BRIEFINGS.find((b) => b.slug === slug))
    .filter((b): b is AudioScript => !!b);
}

export default function TopicBriefings({ topic }: { topic: string }) {
  const briefings = briefingsForTopic(topic);
  if (briefings.length === 0) return null;

  return (
    <section className="topic-briefings card" aria-labelledby={`briefing-${topic}`}>
      <div className="topic-briefings-head">
        <span className="section-kicker">
          <AppIcon name="headphones" />
          60-second briefing{briefings.length > 1 ? "s" : ""}
        </span>
        <h2 id={`briefing-${topic}`} className="section-title">
          Ear-first primer
        </h2>
        <p className="tile-copy">
          Start here — the fastest orientation to what the exam actually tests, spoken in about a
          minute. Then dive into the questions below.
        </p>
      </div>

      <div className="topic-briefings-list">
        {briefings.map((b) => (
          <div key={b.slug} className="topic-briefing-item">
            <div className="topic-briefing-head">
              <h3 className="topic-briefing-title">{b.title}</h3>
              <span className="topic-briefing-summary">{b.summary}</span>
            </div>
            <AudioPlayer text={week2ScriptText(b)} label={b.title} size="sm" />
          </div>
        ))}
      </div>

      <div className="topic-briefings-links">
        <Link href="/listen/drill" className="btn btn-ghost">
          <AppIcon name="headphones" />
          Drive-mode drill
        </Link>
        {(topic === "weather" || briefings.some((b) => b.slug === "weather")) && (
          <Link href="/weather/decoder" className="btn btn-ghost">
            <AppIcon name="cloud" />
            METAR/TAF decoder
          </Link>
        )}
        {(topic === "airspace" || briefings.some((b) => b.slug === "airspace" || b.slug === "sectional-symbology")) && (
          <Link href="/airspace/reader" className="btn btn-ghost">
            <AppIcon name="map" />
            Sectional chart reader
          </Link>
        )}
      </div>
    </section>
  );
}

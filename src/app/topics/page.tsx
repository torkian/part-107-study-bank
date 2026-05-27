import type { CSSProperties } from "react";
import Link from "next/link";
import { AppIcon, type AppIconName } from "@/components/AppIcon";
import { getTopics } from "@/lib/questions";

const TOPIC_META: Record<string, { label: string; icon: AppIconName; accent: string; copy: string }> = {
  regulations: {
    label: "Regulations",
    icon: "shield",
    accent: "#4f8cff",
    copy: "Operating rules, certificate privileges, waivers, and Part 107 limits.",
  },
  airspace: {
    label: "Airspace & Sectional Charts",
    icon: "map",
    accent: "#62d5ff",
    copy: "Classes, chart symbols, authorization, facility maps, and sectional interpretation.",
  },
  weather: {
    label: "Weather & Micrometeorology",
    icon: "cloud",
    accent: "#7dd3fc",
    copy: "METARs, TAFs, fronts, stability, visibility, turbulence, and hazards.",
  },
  loading: {
    label: "Loading & Performance",
    icon: "scale",
    accent: "#f5b042",
    copy: "Weight, balance, density altitude, batteries, turns, and aircraft performance.",
  },
  performance: {
    label: "Performance",
    icon: "gauge",
    accent: "#f5b042",
    copy: "Aircraft limits, load factor, endurance, and degraded-performance scenarios.",
  },
  adm: {
    label: "Aeronautical Decision Making",
    icon: "brain",
    accent: "#b58cff",
    copy: "Risk models, hazardous attitudes, judgment, and operational decisions.",
  },
  crm: {
    label: "Crew Resource Management",
    icon: "users",
    accent: "#a3e635",
    copy: "Communication, crew roles, observers, task sharing, and workload management.",
  },
  physiology: {
    label: "Physiology & Aeromedical",
    icon: "activity",
    accent: "#fb7185",
    copy: "Night vision, fatigue, stress, medication, alcohol, and sensory illusions.",
  },
  airport: {
    label: "Airport Operations",
    icon: "route",
    accent: "#38bdf8",
    copy: "Traffic patterns, runway markings, lighting systems, and airport data.",
  },
  radio: {
    label: "Radio Communications",
    icon: "radio",
    accent: "#34d399",
    copy: "CTAF, phonetics, traffic calls, frequencies, and towered-airport context.",
  },
  maintenance: {
    label: "Maintenance & Inspection",
    icon: "wrench",
    accent: "#f97316",
    copy: "Preflight inspection, maintenance records, airworthiness, and defects.",
  },
  night: {
    label: "Night Operations",
    icon: "moon",
    accent: "#c084fc",
    copy: "Lighting, twilight, night adaptation, illusions, and operating constraints.",
  },
  emergency: {
    label: "Emergency Procedures",
    icon: "alert",
    accent: "#ff6b5f",
    copy: "Lost link, flyaways, accidents, diversions, and hazard response.",
  },
  notams: {
    label: "NOTAMs & TFRs",
    icon: "target",
    accent: "#facc15",
    copy: "Temporary restrictions, stadiums, special notices, and preflight checks.",
  },
  scenario: {
    label: "Hard Scenarios",
    icon: "compass",
    accent: "#8ab4ff",
    copy: "Cross-domain questions that combine charts, weather, rules, and judgment.",
  },
  ops: {
    label: "Operations & Reference",
    icon: "book",
    accent: "#5eead4",
    copy: "Operational references, test traps, supplemental facts, and applied review.",
  },
};

function fallbackMeta(topic: string) {
  return {
    label: topic,
    icon: "book" as AppIconName,
    accent: "#8ab4ff",
    copy: "Focused practice with immediate explanations and references.",
  };
}

function accentStyle(accent: string): CSSProperties {
  return { "--topic-accent": accent } as CSSProperties;
}

export default function TopicsPage() {
  const topics = getTopics();

  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="grid" />
          Topic Drill
        </span>
        <h1 className="page-title">Study by topic</h1>
        <p className="lede">
          Each card opens a focused question set with the same answer explanations, figures, and
          bookmark controls used throughout the app.
        </p>
      </header>

      <section className="topic-grid" aria-label="Available study topics">
        {topics.map((topic) => {
          const meta = TOPIC_META[topic.topic] ?? fallbackMeta(topic.topic);
          return (
            <Link
              key={topic.topic}
              href={`/topic/${topic.topic}`}
              className="topic-card card card-link interactive-card"
              style={accentStyle(meta.accent)}
            >
              <div className="topic-card-head">
                <span className="topic-icon">
                  <AppIcon name={meta.icon} />
                </span>
                <span className="topic-count">{topic.count} questions</span>
              </div>
              <div>
                <h2 className="topic-title">{meta.label}</h2>
                <p className="topic-copy">{meta.copy}</p>
              </div>
              <span className="topic-footer">
                Start drill
                <AppIcon name="arrowRight" />
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

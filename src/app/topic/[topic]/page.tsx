import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon, type AppIconName } from "@/components/AppIcon";
import Quiz from "@/components/Quiz";
import { getByTopic, getTopics } from "@/lib/questions";

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
    label: "Weather",
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
    label: "Physiology",
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

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<import("next").Metadata> {
  const { topic } = await params;
  const meta = TOPIC_META[topic] ?? fallbackMeta(topic);
  const title = `${meta.label} — Part 107 Practice`;
  const description = `${meta.copy} Free FAA Part 107 practice questions with answer explanations and FAA citations.`;
  const url = `https://www.107license.com/topic/${topic}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.label} · 107 License`,
      description,
      url,
      images: [
        {
          url: "https://www.107license.com/opengraph-image",
          width: 1200,
          height: 630,
          alt: "107 License — Free FAA Part 107 Drone Pilot Study App",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.label} · 107 License`,
      description,
      images: ["https://www.107license.com/opengraph-image"],
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const questions = getByTopic(topic);
  if (questions.length === 0) notFound();

  const meta = TOPIC_META[topic] ?? fallbackMeta(topic);

  return (
    <div className="topic-entry" style={accentStyle(meta.accent)}>
      <section className="topic-entry-card card">
        <div className="topic-card-head">
          <span className="topic-icon">
            <AppIcon name={meta.icon} />
          </span>
          <Link href="/topics" className="btn btn-ghost">
            <AppIcon name="arrowLeft" />
            All topics
          </Link>
        </div>
        <div className="page-header">
          <span className="eyebrow">Topic study</span>
          <h1 className="page-title">{meta.label}</h1>
          <p className="lede">{meta.copy}</p>
        </div>
        <div className="progress-meta">
          <span>{questions.length} questions</span>
          <span>Study mode shows the explanation after each answer</span>
        </div>
      </section>

      <Quiz questions={questions} title={meta.label} mode="study" backHref="/topics" />
    </div>
  );
}

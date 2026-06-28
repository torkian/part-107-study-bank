import type { CSSProperties } from "react";
import Link from "next/link";
import { AppIcon, type AppIconName } from "@/components/AppIcon";
import HomeProgress from "@/components/HomeProgress";
import { getTopics, loadAllQuestions } from "@/lib/questions";

const TOPIC_LABELS: Record<string, string> = {
  regulations: "Regulations",
  airspace: "Airspace & charts",
  weather: "Weather",
  loading: "Loading & performance",
  performance: "Performance",
  adm: "Decision making",
  crm: "Crew resource management",
  physiology: "Physiology",
  airport: "Airport operations",
  radio: "Radio communications",
  maintenance: "Maintenance",
  night: "Night operations",
  emergency: "Emergency procedures",
  notams: "NOTAMs & TFRs",
  scenario: "Hard scenarios",
  ops: "Operations reference",
};

const QUICK_START: {
  href: string;
  title: string;
  copy: string;
  icon: AppIconName;
  accent: string;
}[] = [
  {
    href: "/study-path",
    title: "Follow the 7-day plan",
    copy: "Curated daily steps from cheat sheet through final timed exam — built around the highest-yield study order.",
    icon: "route",
    accent: "#2563eb",
  },
  {
    href: "/cold-facts",
    title: "Top 50 must-know facts",
    copy: "The distilled list of every number, threshold, and rule that shows up on the real exam.",
    icon: "star",
    accent: "#d97706",
  },
  {
    href: "/listen",
    title: "Listen Mode — audio study",
    copy: "Every section, question, and explanation read aloud. Built for dyslexia, ADHD, vision fatigue, or just learning on the go.",
    icon: "headphones",
    accent: "#15803d",
  },
  {
    href: "/exam",
    title: "Run a practice exam",
    copy: "Sixty randomized questions, optional 2-hour countdown, FAA-grade scoring with per-topic breakdown.",
    icon: "exam",
    accent: "#1e40af",
  },
  {
    href: "/topics",
    title: "Drill by ACS area",
    copy: "Choose one domain, answer quickly, then study the explanation while the context is still fresh.",
    icon: "grid",
    accent: "#62d5ff",
  },
  {
    href: "/flash",
    title: "Build recall speed",
    copy: "Flip through the full deck, mark hard cards, and rate yourself without leaving the keyboard.",
    icon: "cards",
    accent: "#b58cff",
  },
  {
    href: "/cheatsheet",
    title: "Full cheat sheet",
    copy: "Every limit, weather code, chart marking, and threshold — tap any row for the deeper explanation.",
    icon: "cheatsheet",
    accent: "#15803d",
  },
];

function accentStyle(accent: string): CSSProperties {
  return { "--topic-accent": accent } as CSSProperties;
}

export default function Home() {
  const all = loadAllQuestions();
  const topics = getTopics();
  const figures = new Set(all.map((q) => q.figure).filter(Boolean)).size;

  return (
    <div className="page-shell">
      <section className="home-hero">
        <div className="hero-copy">
          <div className="page-header">
            <span className="eyebrow">
              <AppIcon name="plane" />
              FAA Remote Pilot Study
            </span>
            <h1 className="hero-title">Study like a pilot, not a test taker.</h1>
            <p className="lede">
              A focused Part 107 workspace for practice exams, topic drills, flashcards, figure
              interpretation, and local review queues with cited answer explanations.
            </p>
          </div>

          <div className="hero-actions">
            <Link href="/study-path" className="btn">
              <AppIcon name="route" />
              Start the 7-day plan
            </Link>
            <Link href="/exam" className="btn btn-secondary">
              <AppIcon name="play" />
              Or jump to practice exam
            </Link>
            <Link href="/review" className="btn btn-ghost">
              <AppIcon name="review" />
              Review queue
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Aviation sectional chart preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figures/figure-25.webp"
            alt="FAA sectional chart figure used for Part 107 practice"
            width={920}
            height={700}
            loading="eager"
          />
          <div className="hero-instrument">
            <div className="instrument-row">
              <span className="instrument-title">Chart work</span>
              <span className="instrument-value">FIG 25</span>
            </div>
            <div className="progress-bar" aria-hidden="true">
              <div style={{ width: "72%" }} />
            </div>
            <div className="instrument-row">
              <span className="subtle">Airspace, symbols, airport data</span>
              <span className="instrument-value">ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stat-grid" aria-label="Question bank statistics">
        <div className="card stat-card">
          <span className="stat-label">Questions</span>
          <span className="stat-value">{all.length}</span>
          <span className="stat-note">Across the full bank</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Topics</span>
          <span className="stat-value">{topics.length}</span>
          <span className="stat-note">Normalized study areas</span>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Figures</span>
          <span className="stat-value">{figures}</span>
          <span className="stat-note">FAA chart and supplement images</span>
        </div>
      </section>

      <section className="coverage-section" aria-labelledby="quick-start-title">
        <div className="page-header">
          <span className="section-kicker">Quick start</span>
          <h2 id="quick-start-title" className="section-title">
            Choose the right study mode for this session
          </h2>
        </div>

        <div className="quick-grid">
          {QUICK_START.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="quick-tile card card-link interactive-card"
              style={accentStyle(item.accent)}
            >
              <div className="tile-top">
                <span className="tile-icon">
                  <AppIcon name={item.icon} />
                </span>
                <AppIcon name="arrowRight" />
              </div>
              <div>
                <h3 className="tile-title">{item.title}</h3>
                <p className="tile-copy">{item.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HomeProgress
        questions={all.map((q) => ({ id: q.id, topic: q.topic, subtopic: q.subtopic }))}
        topicLabels={TOPIC_LABELS}
      />

      <section className="coverage-section" aria-labelledby="coverage-title">
        <div className="page-header">
          <span className="section-kicker">Coverage</span>
          <h2 id="coverage-title" className="section-title">
            Every major Part 107 domain is ready to drill
          </h2>
        </div>

        <div className="topic-grid">
          {topics.slice(0, 8).map((topic) => (
            <Link
              key={topic.topic}
              href={`/topic/${topic.topic}`}
              className="topic-card card card-link interactive-card"
              style={accentStyle(topic.topic === "weather" ? "#62d5ff" : "#4f8cff")}
            >
              <div className="topic-card-head">
                <span className="topic-icon">
                  <AppIcon name={topic.topic === "weather" ? "cloud" : "compass"} />
                </span>
                <span className="topic-count">{topic.count} questions</span>
              </div>
              <div>
                <h3 className="topic-title">{TOPIC_LABELS[topic.topic] ?? topic.topic}</h3>
                <p className="topic-copy">Immediate feedback with explanations and references.</p>
              </div>
              <span className="topic-footer">
                Study topic
                <AppIcon name="arrowRight" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

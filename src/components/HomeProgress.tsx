"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import { getProgress, type ProgressMap } from "@/lib/progress";

type QuestionActivity = {
  id: string;
  topic: string;
  subtopic?: string;
};

type Props = {
  questions: QuestionActivity[];
  topicLabels: Record<string, string>;
};

export default function HomeProgress({ questions, topicLabels }: Props) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);

  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(getProgress());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const entries = Object.entries(progress)
    .filter(([, stat]) => stat.correct + stat.wrong > 0 || stat.bookmarked)
    .sort(([, a], [, b]) => b.lastSeen - a.lastSeen);

  const totalAnswers = entries.reduce((sum, [, stat]) => sum + stat.correct + stat.wrong, 0);
  const correctAnswers = entries.reduce((sum, [, stat]) => sum + stat.correct, 0);
  const bookmarked = entries.filter(([, stat]) => stat.bookmarked).length;
  const accuracy = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
  const recent = entries.slice(0, 5);

  return (
    <section className="home-progress" aria-labelledby="home-progress-title">
      <div className="page-header">
        <span className="section-kicker">Local activity</span>
        <h2 id="home-progress-title" className="section-title">
          Pick up where you left off
        </h2>
      </div>

      <div className="activity-grid">
        <div className="card card-pad">
          <div className="stat-grid">
            <div>
              <div className="stat-label">Answered</div>
              <div className="stat-value">{ready ? totalAnswers : "0"}</div>
            </div>
            <div>
              <div className="stat-label">Accuracy</div>
              <div className="stat-value">{ready ? `${accuracy}%` : "0%"}</div>
            </div>
            <div>
              <div className="stat-label">Saved</div>
              <div className="stat-value">{ready ? bookmarked : "0"}</div>
            </div>
          </div>
        </div>

        <div className="card card-pad">
          {recent.length > 0 ? (
            <div className="activity-list">
              {recent.map(([id, stat]) => {
                const q = byId.get(id);
                const topic = q ? topicLabels[q.topic] ?? q.topic : "Question";
                const date = stat.lastSeen
                  ? new Intl.DateTimeFormat(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(stat.lastSeen)
                  : "Saved";
                return (
                  <div className="activity-item" key={id}>
                    <div className="activity-title">{topic}</div>
                    <div className="activity-meta">
                      {stat.correct} correct · {stat.wrong} missed
                      {stat.bookmarked ? " · bookmarked" : ""} · {date}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state empty-state-compact">
              <span className="empty-icon">
                <AppIcon name="activity" />
              </span>
              <div>
                <h3 className="tile-title">No study history yet</h3>
                <p className="tile-copy">Answer a few questions and your recent sessions will appear here.</p>
              </div>
              <Link href="/topics" className="btn btn-secondary">
                <AppIcon name="grid" />
                Choose a topic
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

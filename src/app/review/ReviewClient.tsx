"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import Quiz from "@/components/Quiz";
import { getProgress, resetProgress } from "@/lib/progress";
import type { Question } from "@/lib/types";

type Mode = "wrong" | "bookmarked" | null;

type Counts = {
  wrong: number;
  bookmarked: number;
  attempted: number;
  totalAnswers: number;
  accuracy: number;
};

const EMPTY_COUNTS: Counts = {
  wrong: 0,
  bookmarked: 0,
  attempted: 0,
  totalAnswers: 0,
  accuracy: 0,
};

function readCounts(): Counts {
  const progress = getProgress();
  let wrong = 0;
  let bookmarked = 0;
  let totalAnswers = 0;
  let correctAnswers = 0;

  for (const stat of Object.values(progress)) {
    if (stat.wrong > 0) wrong++;
    if (stat.bookmarked) bookmarked++;
    totalAnswers += stat.correct + stat.wrong;
    correctAnswers += stat.correct;
  }

  return {
    wrong,
    bookmarked,
    attempted: Object.keys(progress).length,
    totalAnswers,
    accuracy: totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100),
  };
}

export default function ReviewClient({ all }: { all: Question[] }) {
  const [mode, setMode] = useState<Mode>(null);
  const [counts, setCounts] = useState<Counts>(EMPTY_COUNTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCounts(readCounts());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (mode === "wrong" || mode === "bookmarked") {
    const progress = getProgress();
    const ids = new Set<string>();
    for (const [id, stat] of Object.entries(progress)) {
      if (mode === "wrong" && stat.wrong > 0) ids.add(id);
      if (mode === "bookmarked" && stat.bookmarked) ids.add(id);
    }
    const set = all.filter((q) => ids.has(q.id));
    if (set.length === 0) {
      return (
        <div className="review-panel card">
          <span className="empty-icon">
            <AppIcon name={mode === "wrong" ? "target" : "star"} />
          </span>
          <div>
            <h1 className="section-title">Nothing to review here yet</h1>
            <p className="tile-copy">Build this queue by answering questions or bookmarking cards.</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => setMode(null)}>
            <AppIcon name="arrowLeft" />
            Back
          </button>
        </div>
      );
    }
    return (
      <Quiz
        questions={set}
        title={mode === "wrong" ? `Mistake Review · ${set.length}` : `Bookmarked Review · ${set.length}`}
        mode="study"
        backHref="/review"
      />
    );
  }

  const hasHistory = ready && (counts.attempted > 0 || counts.bookmarked > 0);

  function resetAll() {
    if (window.confirm("Reset all local progress?")) {
      resetProgress();
      setCounts(EMPTY_COUNTS);
    }
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="review" />
          Review
        </span>
        <h1 className="page-title">Target the questions that need another pass</h1>
        <p className="lede">
          Bookmarks and missed-question queues are stored locally in this browser. Use them to keep
          study sessions focused.
        </p>
      </header>

      <section className="review-stat-grid" aria-label="Local progress dashboard">
        <div className="review-stat card">
          <span className="stat-label">Attempted</span>
          <span className="review-stat-value">{counts.attempted}</span>
          <span className="stat-note">Unique questions</span>
        </div>
        <div className="review-stat card">
          <span className="stat-label">Answers</span>
          <span className="review-stat-value">{counts.totalAnswers}</span>
          <span className="stat-note">Total responses</span>
        </div>
        <div className="review-stat card">
          <span className="stat-label">Accuracy</span>
          <span className="review-stat-value">{counts.accuracy}%</span>
          <span className="stat-note">Across local history</span>
        </div>
        <div className="review-stat card">
          <span className="stat-label">Saved</span>
          <span className="review-stat-value">{counts.bookmarked}</span>
          <span className="stat-note">Bookmarked questions</span>
        </div>
      </section>

      {!hasHistory && (
        <section className="empty-state card">
          <span className="empty-icon">
            <AppIcon name="activity" />
          </span>
          <div>
            <h2 className="section-title">No local history yet</h2>
            <p className="tile-copy">
              Answer questions in topic study, flashcards, or exams and the review queues will appear here.
            </p>
          </div>
          <div className="action-row">
            <Link href="/topics" className="btn">
              <AppIcon name="grid" />
              Start a topic
            </Link>
            <Link href="/exam" className="btn btn-secondary">
              <AppIcon name="exam" />
              Take an exam
            </Link>
          </div>
        </section>
      )}

      <section className="review-grid" aria-label="Review queues">
        <button
          type="button"
          className="review-action-card card interactive-card"
          onClick={() => setMode("wrong")}
          disabled={counts.wrong === 0}
        >
          <span className="review-icon">
            <AppIcon name="target" />
          </span>
          <div>
            <h2 className="mode-title">Drill mistakes</h2>
            <p className="mode-copy">
              {counts.wrong} question{counts.wrong === 1 ? "" : "s"} missed at least once.
            </p>
          </div>
          <span className="topic-footer">
            Open queue
            <AppIcon name="arrowRight" />
          </span>
        </button>

        <button
          type="button"
          className="review-action-card card interactive-card"
          onClick={() => setMode("bookmarked")}
          disabled={counts.bookmarked === 0}
        >
          <span className="review-icon">
            <AppIcon name="star" />
          </span>
          <div>
            <h2 className="mode-title">Review bookmarks</h2>
            <p className="mode-copy">
              {counts.bookmarked} saved question{counts.bookmarked === 1 ? "" : "s"}.
            </p>
          </div>
          <span className="topic-footer">
            Open queue
            <AppIcon name="arrowRight" />
          </span>
        </button>
      </section>

      <section className="review-panel card">
        <div className="page-header">
          <span className="section-kicker">Local storage</span>
          <h2 className="section-title">Progress controls</h2>
          <p className="tile-copy">Reset only affects this browser and does not alter the question bank.</p>
        </div>
        <div className="action-row">
          <button type="button" className="btn btn-danger" onClick={resetAll} disabled={!hasHistory}>
            <AppIcon name="refresh" />
            Reset progress
          </button>
          <Link href="/" className="btn btn-secondary">
            <AppIcon name="arrowLeft" />
            Home
          </Link>
        </div>
      </section>
    </div>
  );
}

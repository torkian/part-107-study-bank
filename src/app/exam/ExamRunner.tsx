"use client";

import { useEffect, useMemo, useState } from "react";
import Quiz from "@/components/Quiz";
import { ACS_BUCKETS, bucketFor, quotasForTotal, sampleByAcs, quotaLabel } from "@/lib/acs";
import { summarize } from "@/lib/progress";
import type { Question } from "@/lib/types";

type Props = {
  allQuestions: Question[];
  examSize: number;
  mode: "standard" | "adaptive";
  timedSeconds?: number;
  title: string;
  backHref: string;
};

// Client-side runner: samples the exam using ACS-weighted quotas so mock
// scores reflect the real FAA test-item allocation. In adaptive mode, the
// sampler also biases toward questions the user has missed in the past.
export default function ExamRunner({
  allQuestions,
  examSize,
  mode,
  timedSeconds,
  title,
  backHref,
}: Props) {
  const [sampled, setSampled] = useState<Question[] | null>(null);
  const [progressReady, setProgressReady] = useState(false);
  const [stats, setStats] = useState<{
    wrongIds: string[];
    correctHeavyIds: string[];
    bookmarkedIds: string[];
    attempted: number;
  }>({ wrongIds: [], correctHeavyIds: [], bookmarkedIds: [], attempted: 0 });

  // Read progress on mount (localStorage is client-only).
  useEffect(() => {
    const topicById: Record<string, string> = {};
    for (const q of allQuestions) topicById[q.id] = q.topic;
    const summary = summarize(topicById);
    const correctHeavyIds: string[] = [];
    // A question is "correct-heavy" (mastered) if seen 3+ times and 80%+ correct.
    // We reconstruct this from raw progress rather than re-exposing internals.
    try {
      const raw = window.localStorage.getItem("p107.progress.v1");
      if (raw) {
        const p = JSON.parse(raw) as Record<string, { correct: number; wrong: number }>;
        for (const [id, s] of Object.entries(p)) {
          const total = s.correct + s.wrong;
          if (total >= 3 && s.correct / total >= 0.8) correctHeavyIds.push(id);
        }
      }
    } catch {
      // ignore
    }
    setStats({
      wrongIds: summary.wrongIds,
      correctHeavyIds,
      bookmarkedIds: summary.bookmarkedIds,
      attempted: summary.attempted,
    });
    setProgressReady(true);
  }, [allQuestions]);

  useEffect(() => {
    if (!progressReady) return;
    const result = sampleByAcs(allQuestions, examSize, {
      adaptive: mode === "adaptive",
      wrongIds: stats.wrongIds,
      correctHeavyIds: stats.correctHeavyIds,
      bookmarkedIds: stats.bookmarkedIds,
    });
    setSampled(result);
  }, [progressReady, allQuestions, examSize, mode, stats]);

  const bucketBreakdown = useMemo(() => {
    if (!sampled) return null;
    const counts: Record<string, number> = {};
    for (const b of ACS_BUCKETS) counts[b.key] = 0;
    // recount from the actual sampled set — quotas and reality can differ if
    // a bucket was thin.
    for (const q of sampled) counts[bucketFor(q)] = (counts[bucketFor(q)] ?? 0) + 1;
    return quotaLabel({
      regulations: counts.regulations ?? 0,
      airspace: counts.airspace ?? 0,
      weather: counts.weather ?? 0,
      "loading-performance": counts["loading-performance"] ?? 0,
      operations: counts.operations ?? 0,
    });
  }, [sampled]);

  if (!sampled) {
    const targetLabel = quotaLabel(quotasForTotal(examSize));
    return (
      <div className="quiz-shell">
        <div className="card card-pad" role="status" aria-live="polite">
          <h1 className="page-title">
            {mode === "adaptive" ? "Building your adaptive exam…" : "Preparing your exam…"}
          </h1>
          <p className="lede">
            {mode === "adaptive"
              ? "Weighting toward your weak areas from prior attempts."
              : "ACS-weighted so your mock score reflects the real Part 107 breakdown."}
          </p>
          <p className="tile-copy">
            <strong>Target mix:</strong> {targetLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="exam-mix-banner" aria-live="polite">
        <span className="eyebrow">
          {mode === "adaptive" ? "Adaptive · ACS-weighted" : "ACS-weighted"}
        </span>
        <span className="exam-mix-line">{bucketBreakdown}</span>
        {mode === "adaptive" && stats.attempted > 0 && (
          <span className="exam-mix-line">
            Personalized from {stats.attempted} question{stats.attempted === 1 ? "" : "s"} you&rsquo;ve seen ·
            {" "}{stats.wrongIds.length} missed, {stats.correctHeavyIds.length} mastered
          </span>
        )}
      </div>
      <Quiz
        questions={sampled}
        title={title}
        mode="exam"
        backHref={backHref}
        timedSeconds={timedSeconds}
      />
    </>
  );
}

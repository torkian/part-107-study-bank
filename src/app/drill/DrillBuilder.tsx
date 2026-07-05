"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import Quiz from "@/components/Quiz";
import { bucketFor, type AcsBucket } from "@/lib/acs";
import { summarize } from "@/lib/progress";
import type { Question } from "@/lib/types";

type Props = {
  allQuestions: Question[];
  acsBuckets: { key: AcsBucket; label: string }[];
};

type Difficulty = "easy" | "medium" | "hard";
type Source = "all" | "missed" | "bookmarked" | "new";

const COUNTS = [10, 25, 50] as const;

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function DrillBuilder({ allQuestions, acsBuckets }: Props) {
  const [buckets, setBuckets] = useState<Set<AcsBucket>>(new Set());
  const [difficulties, setDifficulties] = useState<Set<Difficulty>>(new Set());
  const [source, setSource] = useState<Source>("all");
  const [count, setCount] = useState<10 | 25 | 50>(10);
  const [running, setRunning] = useState(false);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [wrongOrder, setWrongOrder] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const topicById: Record<string, string> = {};
    for (const q of allQuestions) topicById[q.id] = q.topic;
    const summary = summarize(topicById);
    setBookmarkedIds(new Set(summary.bookmarkedIds));
    try {
      const raw = window.localStorage.getItem("p107.progress.v1");
      if (raw) {
        const p = JSON.parse(raw) as Record<
          string,
          { correct: number; wrong: number; lastSeen: number }
        >;
        const seen = new Set(Object.keys(p));
        setSeenIds(seen);
        // Wrongs sorted by mistake count desc so "drill my weakest" pulls the sharpest ones.
        const wrongRanked = Object.entries(p)
          .filter(([, s]) => s.wrong > 0)
          .sort(([, a], [, b]) => b.wrong - a.wrong || (b.lastSeen ?? 0) - (a.lastSeen ?? 0))
          .map(([id]) => id);
        setWrongOrder(wrongRanked);
        setWrongIds(new Set(wrongRanked));
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, [allQuestions]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      if (buckets.size > 0 && !buckets.has(bucketFor(q))) return false;
      if (difficulties.size > 0 && !difficulties.has(q.difficulty as Difficulty)) return false;
      if (source === "missed" && !wrongIds.has(q.id)) return false;
      if (source === "bookmarked" && !bookmarkedIds.has(q.id)) return false;
      if (source === "new" && seenIds.has(q.id)) return false;
      return true;
    });
  }, [allQuestions, buckets, difficulties, source, wrongIds, bookmarkedIds, seenIds]);

  function toggleBucket(k: AcsBucket) {
    setBuckets((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }
  function toggleDifficulty(d: Difficulty) {
    setDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  function reset() {
    setBuckets(new Set());
    setDifficulties(new Set());
    setSource("all");
    setCount(10);
  }

  function drillWeakest(n: number) {
    // Pull the top-N ranked wrong questions
    const top = wrongOrder.slice(0, n);
    const set = allQuestions.filter((q) => top.includes(q.id));
    if (set.length === 0) {
      // Nothing to drill — force normal filters onto missed source
      setSource("missed");
      return;
    }
    setBuckets(new Set());
    setDifficulties(new Set());
    setSource("missed");
    setCount(Math.min(n as 10 | 25 | 50, 50) as 10 | 25 | 50);
    // Kick straight into the quiz with this precise set
    setPresetSet(set);
    setRunning(true);
  }

  const [presetSet, setPresetSet] = useState<Question[] | null>(null);

  function startDrill() {
    setPresetSet(null);
    setRunning(true);
  }

  const chosen = useMemo(() => {
    if (presetSet) return shuffle(presetSet).slice(0, Math.min(count, presetSet.length));
    return shuffle(filtered).slice(0, Math.min(count, filtered.length));
  }, [filtered, count, running, presetSet]); // eslint-disable-line react-hooks/exhaustive-deps

  if (running && chosen.length > 0) {
    return (
      <Quiz
        questions={chosen}
        title={
          presetSet
            ? `Drill · your weakest ${chosen.length}`
            : `Drill · ${chosen.length} question${chosen.length === 1 ? "" : "s"}`
        }
        mode="study"
        backHref="/drill"
      />
    );
  }

  if (!ready) {
    return (
      <div className="card card-pad" role="status" aria-live="polite">
        Loading your progress…
      </div>
    );
  }

  const canStart = filtered.length > 0;
  const weakestCount = Math.min(wrongOrder.length, 20);

  return (
    <div className="drill-builder">
      {wrongOrder.length > 0 && (
        <section className="drill-quick card">
          <div className="drill-quick-head">
            <span className="section-kicker">Quick start</span>
            <h2 className="section-title">Drill your weakest {weakestCount} questions</h2>
            <p className="tile-copy">
              Ranked by how often you got them wrong. Perfect for a 10-minute daily warm-up.
            </p>
          </div>
          <div className="drill-quick-actions">
            <button
              type="button"
              className="btn"
              onClick={() => drillWeakest(weakestCount)}
              disabled={weakestCount === 0}
            >
              <AppIcon name="target" />
              Drill my weakest {weakestCount}
            </button>
            {wrongOrder.length >= 10 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => drillWeakest(10)}
              >
                Drill top 10
              </button>
            )}
          </div>
        </section>
      )}

      <section className="drill-panel card">
        <div className="drill-panel-head">
          <span className="section-kicker">Custom drill</span>
          <h2 className="section-title">Build your own set</h2>
        </div>

        <div className="drill-filter">
          <label className="drill-filter-label" id="drill-topics-label">
            Topics
          </label>
          <div className="drill-chip-row" role="group" aria-labelledby="drill-topics-label">
            {acsBuckets.map((b) => {
              const active = buckets.has(b.key);
              return (
                <button
                  key={b.key}
                  type="button"
                  className={`drill-chip ${active ? "is-active" : ""}`}
                  onClick={() => toggleBucket(b.key)}
                  aria-pressed={active}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="drill-filter">
          <label className="drill-filter-label" id="drill-diff-label">
            Difficulty
          </label>
          <div className="drill-chip-row" role="group" aria-labelledby="drill-diff-label">
            {DIFFICULTIES.map((d) => {
              const active = difficulties.has(d);
              return (
                <button
                  key={d}
                  type="button"
                  className={`drill-chip ${active ? "is-active" : ""}`}
                  onClick={() => toggleDifficulty(d)}
                  aria-pressed={active}
                >
                  {d[0].toUpperCase() + d.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="drill-filter">
          <label className="drill-filter-label" id="drill-source-label">
            Source
          </label>
          <div className="drill-chip-row" role="radiogroup" aria-labelledby="drill-source-label">
            {([
              { k: "all", l: "All questions" },
              { k: "missed", l: `Only missed (${wrongOrder.length})` },
              { k: "bookmarked", l: `Only bookmarked (${bookmarkedIds.size})` },
              { k: "new", l: `Only never-seen (${allQuestions.length - seenIds.size})` },
            ] as { k: Source; l: string }[]).map((opt) => {
              const active = source === opt.k;
              return (
                <button
                  key={opt.k}
                  type="button"
                  className={`drill-chip ${active ? "is-active" : ""}`}
                  onClick={() => setSource(opt.k)}
                  role="radio"
                  aria-checked={active}
                >
                  {opt.l}
                </button>
              );
            })}
          </div>
        </div>

        <div className="drill-filter">
          <label className="drill-filter-label" id="drill-count-label">
            Count
          </label>
          <div className="drill-chip-row" role="radiogroup" aria-labelledby="drill-count-label">
            {COUNTS.map((c) => (
              <button
                key={c}
                type="button"
                className={`drill-chip ${count === c ? "is-active" : ""}`}
                onClick={() => setCount(c)}
                role="radio"
                aria-checked={count === c}
              >
                {c} questions
              </button>
            ))}
          </div>
        </div>

        <div className="drill-summary" aria-live="polite">
          <strong>{filtered.length}</strong> matching question{filtered.length === 1 ? "" : "s"} ·
          drilling {Math.min(count, filtered.length)}
        </div>

        <div className="action-row">
          <button
            type="button"
            className="btn"
            onClick={startDrill}
            disabled={!canStart}
            aria-disabled={!canStart}
          >
            <AppIcon name="play" />
            Start drill
          </button>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            <AppIcon name="refresh" />
            Reset filters
          </button>
          <Link href="/review" className="btn btn-ghost">
            <AppIcon name="review" />
            Review queue
          </Link>
        </div>

        {!canStart && (
          <p className="drill-empty" role="status">
            No questions match those filters — try clearing a chip or two.
          </p>
        )}
      </section>
    </div>
  );
}

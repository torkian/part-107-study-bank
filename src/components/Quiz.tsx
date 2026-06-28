"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import AnnotatedText from "@/components/AnnotatedText";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import FigureViewer from "@/components/FigureViewer";
import { getStat, recordAnswer, toggleBookmark } from "@/lib/progress";
import type { Question } from "@/lib/types";

type Mode = "study" | "exam" | "flash";

type Props = {
  questions: Question[];
  title: string;
  mode?: Mode;
  backHref?: string;
  timedSeconds?: number;
};

type TopicBreakdown = {
  topic: string;
  total: number;
  correct: number;
  missed: number;
  pct: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function letterOf(choice: string): string {
  const m = choice.match(/^([A-D])[.)]\s*/);
  return m ? m[1] : choice.charAt(0);
}

function fmtTime(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function prettyTopic(topic: string) {
  return topic
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildTopicBreakdown(items: Question[], answers: Record<string, string>): TopicBreakdown[] {
  const map = new Map<string, TopicBreakdown>();

  for (const q of items) {
    const current = map.get(q.topic) ?? {
      topic: q.topic,
      total: 0,
      correct: 0,
      missed: 0,
      pct: 0,
    };
    current.total += 1;
    if (answers[q.id] === q.answer) current.correct += 1;
    else current.missed += 1;
    current.pct = Math.round((current.correct / current.total) * 100);
    map.set(q.topic, current);
  }

  return [...map.values()].sort((a, b) => a.pct - b.pct || b.total - a.total);
}

export default function Quiz({
  questions,
  title,
  mode = "study",
  backHref = "/",
  timedSeconds,
}: Props) {
  const initial = useMemo(() => shuffle(questions), [questions]);
  const [items] = useState<Question[]>(initial);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const examRecorded = useRef(false);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(timedSeconds ?? null);

  useEffect(() => {
    const next: Record<string, boolean> = {};
    for (const q of items) {
      const stat = getStat(q.id);
      if (stat?.bookmarked) next[q.id] = true;
    }
    const timer = window.setTimeout(() => setBookmarked(next), 0);
    return () => window.clearTimeout(timer);
  }, [items]);

  useEffect(() => {
    if (secondsLeft === null || finished) return;
    if (secondsLeft <= 0) {
      const timer = window.setTimeout(() => setFinished(true), 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => (s ?? 0) - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, finished]);

  useEffect(() => {
    if (!finished || mode !== "exam" || examRecorded.current) return;
    for (const q of items) {
      const selected = answers[q.id];
      if (selected) recordAnswer(q.id, selected === q.answer);
    }
    examRecorded.current = true;
  }, [answers, finished, items, mode]);

  if (items.length === 0) {
    return (
      <div className="quiz-shell">
        <div className="empty-state card">
          <span className="empty-icon">
            <AppIcon name="book" />
          </span>
          <div>
            <h1 className="section-title">No questions available</h1>
            <p className="tile-copy">This set does not have questions yet.</p>
          </div>
          <Link href={backHref} className="btn btn-secondary">
            <AppIcon name="arrowLeft" />
            Back
          </Link>
        </div>
      </div>
    );
  }

  const current = items[index] ?? items[0];
  const chosen = answers[current.id];
  const isStudyOrFlash = mode === "study" || mode === "flash";
  const isRevealed = isStudyOrFlash && revealed[current.id];
  const isBookmarked = !!bookmarked[current.id];
  const answeredCount = items.filter((q) => answers[q.id]).length;
  const correctCount = items.filter((q) => answers[q.id] === q.answer).length;
  const progressPct = (answeredCount / items.length) * 100;

  if (finished) {
    const correct = items.filter((q) => answers[q.id] === q.answer).length;
    const pct = Math.round((correct / items.length) * 100);
    const passed = pct >= 70;
    const topicBreakdown = buildTopicBreakdown(items, answers);
    const weakest = topicBreakdown[0];

    return (
      <div className="result-shell">
        <section className={`result-hero card ${passed ? "pass" : "fail"}`}>
          <span className={`badge ${passed ? "easy" : "hard"}`}>
            <AppIcon name={passed ? "trophy" : "target"} />
            {passed ? "Passed" : "Needs review"}
          </span>
          <div className="result-score">
            <strong>{pct}%</strong>
            <span>
              {correct} correct / {items.length} questions
            </span>
          </div>
          <p className="lede">
            {passed
              ? "You cleared the 70% passing threshold. Review missed items while they are still fresh."
              : weakest
                ? `${prettyTopic(weakest.topic)} is the weakest area from this run. Start there, then retake the exam.`
                : "Keep studying the missed questions, then retake the exam."}
          </p>
          <div className="action-row">
            <button className="btn" onClick={() => window.location.reload()}>
              <AppIcon name="refresh" />
              Retake
            </button>
            {!passed && weakest && (
              <Link href={`/topic/${weakest.topic}`} className="btn btn-secondary">
                <AppIcon name="target" />
                Study weakest topic
              </Link>
            )}
            <Link href="/review" className="btn btn-secondary">
              <AppIcon name="review" />
              Review queue
            </Link>
            <Link href={backHref} className="btn btn-ghost">
              <AppIcon name="arrowLeft" />
              Back
            </Link>
          </div>
        </section>

        <section className="card card-pad">
          <div className="page-header">
            <span className="section-kicker">Topic breakdown</span>
            <h2 className="section-title">Where the score came from</h2>
          </div>
          <div className="breakdown-grid">
            {topicBreakdown.map((row) => (
              <div
                key={row.topic}
                className={`breakdown-row${weakest?.topic === row.topic && !passed ? " is-weakest" : ""}`}
              >
                <div>
                  <h3 className="tile-title">{prettyTopic(row.topic)}</h3>
                  <p className="tile-copy">
                    {row.correct} correct · {row.missed} missed · {row.total} total
                  </p>
                </div>
                <span className="stat-value">{row.pct}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="review-list" aria-labelledby="exam-review-title">
          <div className="page-header">
            <span className="section-kicker">Question review</span>
            <h2 id="exam-review-title" className="section-title">
              Answers and explanations
            </h2>
          </div>
          {items.map((q, i) => {
            const selected = answers[q.id];
            const ok = selected === q.answer;
            return (
              <article key={q.id} className="review-item card">
                <div className="quiz-meta-row">
                  <div className="quiz-meta-left">
                    <span className="meta-chip">#{i + 1}</span>
                    <span className="meta-chip">{prettyTopic(q.topic)}</span>
                    {q.subtopic && <span className="meta-chip">{q.subtopic}</span>}
                  </div>
                  <span className={`badge ${q.difficulty}`}>{q.difficulty}</span>
                </div>
                <p className="review-question">
                  <AnnotatedText>{q.question}</AnnotatedText>
                </p>
                <div className={`explanation-panel ${ok ? "is-correct" : "is-wrong"}`}>
                  <div className="explanation-title">
                    <AppIcon name={ok ? "check" : "x"} />
                    Your answer: {selected ?? "No answer"} · Correct: {q.answer}
                  </div>
                  <p className="explanation-copy">
                    <AnnotatedText>{q.explanation}</AnnotatedText>
                  </p>
                  {q.reference && (
                    <span className="citation-chip">
                      <AppIcon name="book" />
                      <AnnotatedText>{q.reference}</AnnotatedText>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    );
  }

  function pick(letter: string) {
    if (isStudyOrFlash && revealed[current.id]) return;
    setAnswers((a) => ({ ...a, [current.id]: letter }));
    if (isStudyOrFlash) {
      setRevealed((r) => ({ ...r, [current.id]: true }));
      recordAnswer(current.id, letter === current.answer);
    }
  }

  function onChoiceKeyDown(e: KeyboardEvent<HTMLDivElement>, letter: string) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(letter);
    }
  }

  function next() {
    if (index + 1 >= items.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  function handleBookmark() {
    const newVal = toggleBookmark(current.id);
    setBookmarked((b) => ({ ...b, [current.id]: newVal }));
  }

  return (
    <div className="quiz-shell">
      <header className="quiz-topbar">
        <div className="quiz-title-row">
          <h2 className="quiz-title">{title}</h2>
          <div className="quiz-status">
            {secondsLeft !== null && (
              <span className={`timer${secondsLeft <= 300 ? " is-low" : ""}`}>
                <AppIcon name="timer" />
                {fmtTime(secondsLeft)}
              </span>
            )}
            <span className="meta-chip">
              {index + 1} / {items.length}
            </span>
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-meta">
            <span>
              {mode === "exam"
                ? `${answeredCount} answered / ${items.length}`
                : `${correctCount} correct / ${answeredCount} answered`}
            </span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Question progress"
            aria-valuemin={0}
            aria-valuemax={items.length}
            aria-valuenow={answeredCount}
          >
            <div style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </header>

      <article className="quiz-card card">
        <div className="quiz-meta-row">
          <div className="quiz-meta-left">
            <span className="meta-chip">
              <AppIcon name="compass" />
              {prettyTopic(current.topic)}
            </span>
            {current.subtopic && <span className="meta-chip">{current.subtopic}</span>}
          </div>
          <div className="quiz-meta-right">
            <button
              type="button"
              className={`icon-btn bookmark-btn${isBookmarked ? " is-active" : ""}`}
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
              aria-pressed={isBookmarked}
            >
              <AppIcon name="star" />
            </button>
            <span className={`badge ${current.difficulty}`}>{current.difficulty}</span>
          </div>
        </div>

        <p className="quiz-stem">
          <AnnotatedText>{current.question}</AnnotatedText>
        </p>

        <AudioPlayer
          text={`Question. ${current.question}. Choices. ${current.choices.join(". ")}`}
          label="Listen"
          size="sm"
        />

        {current.figure && <FigureViewer figure={current.figure} />}

        <div className="choice-list">
          {current.choices.map((choice) => {
            const letter = letterOf(choice);
            const isChosen = chosen === letter;
            const isCorrect = letter === current.answer;
            let cls = "choice";
            if (isRevealed) {
              if (isCorrect) cls += " correct";
              else if (isChosen) cls += " wrong";
            } else if (isChosen) {
              cls += " selected";
            }

            return (
              <div
                key={letter}
                role="button"
                tabIndex={isRevealed ? undefined : 0}
                aria-disabled={isRevealed}
                aria-pressed={isChosen}
                className={`${cls}${isRevealed ? " is-disabled" : ""}`}
                onClick={() => pick(letter)}
                onKeyDown={(e) => onChoiceKeyDown(e, letter)}
              >
                <AnnotatedText>{choice}</AnnotatedText>
              </div>
            );
          })}
        </div>

        {isRevealed && (
          <div className={`explanation-panel ${chosen === current.answer ? "is-correct" : "is-wrong"}`}>
            <div className="explanation-title">
              <AppIcon name={chosen === current.answer ? "check" : "x"} />
              {chosen === current.answer ? "Correct" : `Answer: ${current.answer}`}
            </div>
            <p className="explanation-copy">
              <AnnotatedText>{current.explanation}</AnnotatedText>
            </p>
            {current.reference && (
              <span className="citation-chip">
                <AppIcon name="book" />
                <AnnotatedText>{current.reference}</AnnotatedText>
              </span>
            )}
            {chosen !== current.answer && (
              <Link href="/review" className="saved-to-review-chip" aria-label="Question saved to your Drill Mistakes queue">
                <AppIcon name="review" />
                Saved to your Drill Mistakes queue
              </Link>
            )}
            <AudioPlayer
              text={`Answer ${current.answer}. ${current.explanation}${current.reference ? ` Reference: ${current.reference}.` : ""}`}
              label="Listen to explanation"
              size="sm"
            />
          </div>
        )}
      </article>

      <div className="quiz-nav">
        <button type="button" className="btn btn-secondary" onClick={prev} disabled={index === 0}>
          <AppIcon name="arrowLeft" />
          Previous
        </button>
        <div className="quiz-nav-actions">
          {mode === "exam" && (
            <button type="button" className="btn btn-secondary" onClick={() => setFinished(true)}>
              Finish exam
            </button>
          )}
          <button type="button" className="btn" onClick={next} disabled={!chosen}>
            {index + 1 === items.length ? "Finish" : "Next"}
            <AppIcon name="arrowRight" />
          </button>
        </div>
      </div>
    </div>
  );
}

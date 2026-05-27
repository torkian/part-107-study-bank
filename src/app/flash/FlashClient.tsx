"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AnnotatedText from "@/components/AnnotatedText";
import { AppIcon } from "@/components/AppIcon";
import FigureViewer from "@/components/FigureViewer";
import { getStat, recordAnswer, toggleBookmark } from "@/lib/progress";
import type { Question } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashClient({ all }: { all: Question[] }) {
  const deck = useMemo(() => shuffle(all), [all]);
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const q = deck[i];

  useEffect(() => {
    const stat = q ? getStat(q.id) : undefined;
    const timer = window.setTimeout(() => {
      setRevealed(false);
      setBookmarked(!!stat?.bookmarked);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [i, q]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role='dialog']")) return;

      if (e.key === " ") {
        e.preventDefault();
        setRevealed((r) => !r);
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        setI((x) => Math.min(deck.length - 1, x + 1));
      } else if (e.key === "ArrowLeft") {
        setI((x) => Math.max(0, x - 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deck.length]);

  function next() {
    setI((x) => Math.min(deck.length - 1, x + 1));
  }

  function previous() {
    setI((x) => Math.max(0, x - 1));
  }

  function rate(correct: boolean) {
    if (q) recordAnswer(q.id, correct);
    next();
  }

  function toggleStar() {
    if (!q) return;
    const newVal = toggleBookmark(q.id);
    setBookmarked(newVal);
  }

  if (!q) {
    return (
      <div className="flash-shell">
        <div className="empty-state card">
          <span className="empty-icon">
            <AppIcon name="cards" />
          </span>
          <div>
            <h1 className="section-title">Deck empty</h1>
            <p className="tile-copy">No flashcards are available yet.</p>
          </div>
          <Link href="/" className="btn btn-secondary">
            <AppIcon name="arrowLeft" />
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flash-shell">
      <header className="flash-topbar">
        <div className="page-header">
          <span className="eyebrow">
            <AppIcon name="cards" />
            Flashcards
          </span>
          <h1 className="page-title">Rapid recall deck</h1>
        </div>
        <span className="meta-chip">
          Card {i + 1} / {deck.length}
        </span>
      </header>

      <div className="progress-wrap">
        <div className="progress-meta">
          <span>{Math.round(((i + 1) / deck.length) * 100)}% through deck</span>
          <span>{revealed ? "Answer visible" : "Question side"}</span>
        </div>
        <div className="progress-bar" role="progressbar" aria-valuemin={1} aria-valuemax={deck.length} aria-valuenow={i + 1}>
          <div style={{ width: `${((i + 1) / deck.length) * 100}%` }} />
        </div>
      </div>

      <div className="flash-stage">
        <article
          className={`flash-card card${revealed ? " is-revealed" : ""}`}
          onClick={() => setRevealed((r) => !r)}
          role="button"
          tabIndex={0}
          aria-pressed={revealed}
          aria-label="Toggle flashcard answer"
        >
          <div className="quiz-meta-row">
            <div className="quiz-meta-left">
              <span className="meta-chip">
                <AppIcon name="compass" />
                {q.topic}
              </span>
              {q.subtopic && <span className="meta-chip">{q.subtopic}</span>}
            </div>
            <div className="quiz-meta-right">
              <button
                type="button"
                className={`icon-btn bookmark-btn${bookmarked ? " is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar();
                }}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark this card"}
                aria-pressed={bookmarked}
              >
                <AppIcon name="star" />
              </button>
              <span className={`badge ${q.difficulty}`}>{q.difficulty}</span>
            </div>
          </div>

          <p className="flash-question">
            <AnnotatedText>{q.question}</AnnotatedText>
          </p>

          {q.figure && (
            <div
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <FigureViewer figure={q.figure} />
            </div>
          )}

          <div className="flash-choice-list">
            {q.choices.map((choice) => (
              <div
                key={choice}
                className={`flash-choice${revealed && choice.startsWith(q.answer) ? " is-answer" : ""}`}
              >
                <AnnotatedText>{choice}</AnnotatedText>
              </div>
            ))}
          </div>

          {revealed ? (
            <div className="explanation-panel">
              <div className="explanation-title">
                <AppIcon name="check" />
                Answer: {q.answer}
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
          ) : (
            <p className="tile-copy">Tap the card or press Space to reveal the answer.</p>
          )}
        </article>
      </div>

      <div className="quiz-nav">
        <button type="button" className="btn btn-secondary" onClick={previous} disabled={i === 0}>
          <AppIcon name="arrowLeft" />
          Previous
        </button>
        {revealed ? (
          <div className="quiz-nav-actions">
            <button type="button" className="btn btn-danger" onClick={() => rate(false)}>
              <AppIcon name="x" />
              Missed it
            </button>
            <button type="button" className="btn btn-success" onClick={() => rate(true)}>
              <AppIcon name="check" />
              Got it
            </button>
          </div>
        ) : (
          <button type="button" className="btn" onClick={() => setRevealed(true)}>
            Reveal answer
            <AppIcon name="eye" />
          </button>
        )}
      </div>

      <div className="kbd-row" aria-label="Keyboard shortcuts">
        <kbd>Space</kbd>
        <span>Reveal</span>
        <kbd>Enter</kbd>
        <span>Next</span>
        <kbd>←</kbd>
        <kbd>→</kbd>
        <span>Navigate</span>
      </div>
    </div>
  );
}

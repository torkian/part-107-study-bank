"use client";

const KEY = "p107.progress.v1";

export type QuestionStat = {
  correct: number;
  wrong: number;
  lastSeen: number;
  bookmarked: boolean;
};

export type ProgressMap = Record<string, QuestionStat>;

export type ProgressSummary = {
  attempted: number;
  totalAnswers: number;
  correctAnswers: number;
  accuracyPct: number;
  bookmarked: number;
  wrongIds: string[];
  bookmarkedIds: string[];
  topicStats: Record<string, { correct: number; wrong: number; pct: number }>;
};

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function write(p: ProgressMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // quota exceeded — ignore
  }
}

export function recordAnswer(id: string, correct: boolean) {
  const p = read();
  const s = p[id] ?? { correct: 0, wrong: 0, lastSeen: 0, bookmarked: false };
  if (correct) s.correct += 1;
  else s.wrong += 1;
  s.lastSeen = Date.now();
  p[id] = s;
  write(p);
}

export function toggleBookmark(id: string): boolean {
  const p = read();
  const s = p[id] ?? { correct: 0, wrong: 0, lastSeen: 0, bookmarked: false };
  s.bookmarked = !s.bookmarked;
  p[id] = s;
  write(p);
  return s.bookmarked;
}

export function getProgress(): ProgressMap {
  return read();
}

export function getStat(id: string): QuestionStat | undefined {
  return read()[id];
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Private browsing / enterprise policy can throw SecurityError — no-op
  }
}

export function summarize(
  topicById?: Record<string, string>,
): ProgressSummary {
  const p = read();
  const ids = Object.keys(p);
  let totalAnswers = 0;
  let correctAnswers = 0;
  let bookmarked = 0;
  const wrongIds: string[] = [];
  const bookmarkedIds: string[] = [];
  const topicStats: Record<string, { correct: number; wrong: number; pct: number }> = {};

  for (const id of ids) {
    const s = p[id];
    totalAnswers += s.correct + s.wrong;
    correctAnswers += s.correct;
    if (s.bookmarked) {
      bookmarked++;
      bookmarkedIds.push(id);
    }
    if (s.wrong > s.correct) wrongIds.push(id);
    const topic = topicById?.[id];
    if (topic) {
      const t = topicStats[topic] ?? { correct: 0, wrong: 0, pct: 0 };
      t.correct += s.correct;
      t.wrong += s.wrong;
      topicStats[topic] = t;
    }
  }
  for (const t of Object.values(topicStats)) {
    const tot = t.correct + t.wrong;
    t.pct = tot === 0 ? 0 : Math.round((t.correct / tot) * 100);
  }
  return {
    attempted: ids.length,
    totalAnswers,
    correctAnswers,
    accuracyPct: totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100),
    bookmarked,
    wrongIds,
    bookmarkedIds,
    topicStats,
  };
}

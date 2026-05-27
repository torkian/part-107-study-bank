import fs from "node:fs";
import path from "node:path";
import type { Question, TopicSummary } from "./types";

const RESEARCH_DIR = path.join(process.cwd(), "research");

const TOPIC_ALIASES: Record<string, string> = {
  "sectional symbology": "airspace",
  "sectional chart figure": "airspace",
  "sua": "airspace",
  "tfr": "airspace",
  "other airspace": "airspace",
  "part 107 limits": "airspace",
  "part 107 authorization": "airspace",
};

function normalizeTopic(t: string): string {
  const key = t.trim().toLowerCase();
  return TOPIC_ALIASES[key] ?? key;
}

let cache: Question[] | null = null;

export function loadAllQuestions(): Question[] {
  if (cache) return cache;
  if (!fs.existsSync(RESEARCH_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs
    .readdirSync(RESEARCH_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const all: Question[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(RESEARCH_DIR, file), "utf8");
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const q of parsed) {
          if (isValidQuestion(q)) {
            const original = q.topic;
            const normalized = normalizeTopic(original);
            all.push({
              ...q,
              topic: normalized,
              subtopic: q.subtopic ?? (normalized !== original.toLowerCase() ? original : undefined),
            });
          }
        }
      }
    } catch {
      // skip malformed file
    }
  }
  cache = all;
  return all;
}

function isValidQuestion(q: unknown): q is Question {
  if (!q || typeof q !== "object") return false;
  const r = q as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.topic === "string" &&
    typeof r.question === "string" &&
    Array.isArray(r.choices) &&
    r.choices.length >= 2 &&
    typeof r.answer === "string" &&
    typeof r.explanation === "string"
  );
}

export function getTopics(): TopicSummary[] {
  const counts = new Map<string, number>();
  for (const q of loadAllQuestions()) {
    counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}

export function getByTopic(topic: string): Question[] {
  return loadAllQuestions().filter((q) => q.topic === topic);
}

export function totalCount(): number {
  return loadAllQuestions().length;
}

// Canonical text formatters used by BOTH the build-time TTS generator
// (scripts/generate-audio.mjs) and the client components that look up
// the generated MP3 by hash. Any drift between the two breaks the lookup.
//
// All formatters pass through narrate() so abbreviations like "lb",
// "AGL", "ft-lb", "§107.51", "CTAF" are expanded to natural narration
// for ElevenLabs — and so the manifest hash is computed on the same
// expanded string both at build time and at runtime.

import { narrate } from "./narrate.mjs";

export type CheatRow = { label: string; value: string; detail?: string };
export type CheatSection = { title: string; rows: CheatRow[] };

export function cheatSectionText(s: CheatSection): string {
  const raw =
    s.title +
    ". " +
    s.rows
      .map((r) => r.label + ": " + r.value + "." + (r.detail ? " " + r.detail : ""))
      .join(" ");
  return narrate(raw);
}

export type ColdFact = { fact: string; why?: string };
export type ColdGroup = { title: string; facts: ColdFact[] };

export function coldGroupText(g: ColdGroup): string {
  const raw =
    g.title +
    ". " +
    g.facts.map((f) => f.fact + ". " + (f.why ? "Why: " + f.why + "." : "")).join(" ");
  return narrate(raw);
}

export type StudyStep = { label: string; copy: string };
export type StudyDay = {
  day: number;
  title: string;
  focus: string;
  hours: string;
  steps: StudyStep[];
};

export function studyDayText(d: StudyDay): string {
  const raw =
    "Day " +
    d.day +
    ". " +
    d.title +
    ". " +
    d.focus +
    " Estimated " +
    d.hours +
    ". " +
    d.steps.map((s, i) => "Step " + (i + 1) + ". " + s.label + ". " + s.copy).join(" ");
  return narrate(raw);
}

export type ExamItem = { label: string; copy: string };
export type ExamSection = { title: string; items: ExamItem[] };

export function examSectionText(s: ExamSection): string {
  const raw = s.title + ". " + s.items.map((it) => it.label + ". " + it.copy).join(" ");
  return narrate(raw);
}

export type GlossaryEntryLite = { term: string; full: string; definition: string };

export function glossaryEntryText(e: GlossaryEntryLite): string {
  const head = e.full && e.full !== e.term ? e.term + ". " + e.full + ". " : e.term + ". ";
  return narrate(head + e.definition);
}

// 16-char sha1 (matches scripts/generate-audio.mjs)
export async function hashText(text: string): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) return "";
  const buf = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

#!/usr/bin/env node
// Dedupe YouTube-extracted questions against existing bank and write merged file.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const RESEARCH = path.join(ROOT, "research");
const EXTRACTED = path.join(ROOT, "youtube", "extracted");

const SIM_THRESHOLD = 0.55; // jaccard over token sets

const STOP = new Set([
  "a","an","the","is","are","was","were","of","to","in","on","at","by","for","with","and","or",
  "you","your","what","which","when","how","why","that","this","be","as","it","if","do","does",
  "did","not","no","can","may","must","should","will","would","than","then","from","over","into",
  "but","also","because","while","being","been","have","has","had","i","we","they","he","she","one",
  "two","three","up","down","out","off","about","above","below","under","more","most","less","only",
]);

function tokens(s) {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

function loadJsonArray(p) {
  try {
    const x = JSON.parse(fs.readFileSync(p, "utf8"));
    return Array.isArray(x) ? x : [];
  } catch {
    return [];
  }
}

// Load existing
const existing = [];
for (const f of fs.readdirSync(RESEARCH).filter((x) => x.endsWith(".json"))) {
  for (const q of loadJsonArray(path.join(RESEARCH, f))) existing.push(q);
}
const existingTokens = existing.map((q) => tokens(q.question));
console.log(`Existing bank: ${existing.length} questions`);

// Load extracted
const incoming = [];
if (fs.existsSync(EXTRACTED)) {
  for (const f of fs.readdirSync(EXTRACTED).filter((x) => x.endsWith(".json"))) {
    const arr = loadJsonArray(path.join(EXTRACTED, f));
    console.log(`  + ${f}: ${arr.length}`);
    for (const q of arr) incoming.push(q);
  }
}
console.log(`Incoming from YouTube: ${incoming.length}`);

// Dedupe against existing AND against earlier incoming items
const kept = [];
const droppedDup = [];
for (const q of incoming) {
  if (!q || typeof q.question !== "string" || !Array.isArray(q.choices) || !q.answer) {
    droppedDup.push({ id: q?.id ?? "?", reason: "invalid schema" });
    continue;
  }
  const t = tokens(q.question);
  let dupOf = null;
  let bestSim = 0;
  for (let i = 0; i < existingTokens.length; i++) {
    const s = jaccard(t, existingTokens[i]);
    if (s > bestSim) {
      bestSim = s;
      dupOf = existing[i].id;
    }
  }
  for (const kq of kept) {
    const s = jaccard(t, tokens(kq.question));
    if (s > bestSim) {
      bestSim = s;
      dupOf = kq.id;
    }
  }
  if (bestSim >= SIM_THRESHOLD) {
    droppedDup.push({ id: q.id, dupOf, sim: bestSim.toFixed(2), stem: q.question.slice(0, 80) });
    continue;
  }
  // Strip source attribution — questions stand on FAA citations only
  const { source, ...clean } = q;
  void source;
  kept.push(clean);
}

console.log(`---`);
console.log(`Kept (new): ${kept.length}`);
console.log(`Dropped as dupes/invalid: ${droppedDup.length}`);
if (droppedDup.length) {
  console.log(`First 10 drops:`);
  for (const d of droppedDup.slice(0, 10)) console.log(`  ${JSON.stringify(d)}`);
}

// Write the merged supplemental bank file
const out = path.join(RESEARCH, "07-supplemental.json");
fs.writeFileSync(out, JSON.stringify(kept, null, 2) + "\n");
console.log(`\nWrote ${kept.length} new questions → ${out}`);

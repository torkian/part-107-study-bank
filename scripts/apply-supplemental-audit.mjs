#!/usr/bin/env node
// Apply corrections from BOTH audit agents (general + Codex) to the supplemental bank.
// Conservative merge: drop if EITHER says drop; fix if either has a fix (prefer Codex when both).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const SRC = path.join(ROOT, "research", "07-supplemental.json");
const A_GEN = path.join(ROOT, "research", "audit", "07-supplemental-corrections.json");
const A_CDX = path.join(ROOT, "research", "audit", "07-supplemental-codex.json");

function loadJson(p) {
  if (!fs.existsSync(p)) {
    console.warn(`MISSING: ${p}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const questions = loadJson(SRC);
const general = loadJson(A_GEN) ?? [];
const codex = loadJson(A_CDX) ?? [];

if (!Array.isArray(questions)) {
  console.error("Bad source file");
  process.exit(1);
}

const genMap = new Map(general.map((c) => [c.id, c]));
const cdxMap = new Map(codex.map((c) => [c.id, c]));

let okCount = 0, fixCount = 0, dropCount = 0, noAuditCount = 0;
const kept = [];
const dropped = [];

for (const q of questions) {
  const g = genMap.get(q.id);
  const c = cdxMap.get(q.id);
  if (!g && !c) {
    noAuditCount++;
    kept.push(q);
    continue;
  }
  const gV = g?.verdict;
  const cV = c?.verdict;

  // Drop if EITHER agent says drop
  if (gV === "drop" || cV === "drop") {
    dropCount++;
    dropped.push({
      id: q.id,
      reason: (gV === "drop" ? g.issue : c?.issue) ?? "audit flagged drop",
    });
    continue;
  }

  // Fix if either has a fix
  const fixPayload = c?.fix ?? g?.fix;
  if (fixPayload && (cV === "fix" || gV === "fix")) {
    kept.push({ ...q, ...fixPayload });
    fixCount++;
    continue;
  }

  // Otherwise OK
  okCount++;
  kept.push(q);
}

fs.writeFileSync(SRC, JSON.stringify(kept, null, 2) + "\n");

console.log(`Source:  ${questions.length} questions`);
console.log(`General audit entries: ${general.length}`);
console.log(`Codex audit entries:   ${codex.length}`);
console.log(`---`);
console.log(`OK:       ${okCount}`);
console.log(`Fixed:    ${fixCount}`);
console.log(`Dropped:  ${dropCount}`);
console.log(`No audit: ${noAuditCount}`);
console.log(`Final:    ${kept.length} questions → ${SRC}`);
if (dropped.length) {
  console.log(`\nDropped IDs:`);
  for (const d of dropped.slice(0, 25)) console.log(`  ${d.id} — ${(d.reason ?? "").slice(0, 120)}`);
  if (dropped.length > 25) console.log(`  ... and ${dropped.length - 25} more`);
}

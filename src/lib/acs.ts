// FAA Part 107 Airman Certification Standards (ACS) category weightings.
// Real FAA exams enforce these percentages — our practice exam has been
// sampling raw random, distorting mock scores. This module maps every
// question topic to one of the 5 ACS areas and gives a proportional sampler.
//
// Source: FAA-S-ACS-10B "Remote Pilot – Small Unmanned Aircraft Systems
// Airman Certification Standards" (current edition). Percent ranges are
// approximate midpoints of published test-item allocation guidance.

import type { Question } from "./types";

export type AcsBucket =
  | "regulations"
  | "airspace"
  | "weather"
  | "loading-performance"
  | "operations";

export type AcsSpec = {
  key: AcsBucket;
  label: string;
  short: string;
  // Fraction of a real 60-question exam (rounded to whole questions).
  weight: number;
};

export const ACS_BUCKETS: AcsSpec[] = [
  { key: "regulations", label: "Regulations", short: "Regs", weight: 0.20 },
  { key: "airspace", label: "Airspace & Requirements", short: "Airspace", weight: 0.20 },
  { key: "weather", label: "Weather", short: "Wx", weight: 0.14 },
  { key: "loading-performance", label: "Loading & Performance", short: "Load/Perf", weight: 0.09 },
  { key: "operations", label: "Operations", short: "Ops", weight: 0.37 },
];

// Map every normalized `question.topic` (as produced by lib/questions.ts) to
// its ACS bucket. Anything not listed falls to "operations" so real content
// changes never silently drop out of exam sampling.
const TOPIC_TO_BUCKET: Record<string, AcsBucket> = {
  regulations: "regulations",
  notams: "regulations",

  airspace: "airspace",
  "sectional symbology": "airspace",
  "sectional chart figure": "airspace",
  sua: "airspace",
  tfr: "airspace",
  "other airspace": "airspace",
  "part 107 limits": "airspace",
  "part 107 authorization": "airspace",

  weather: "weather",

  loading: "loading-performance",
  performance: "loading-performance",

  scenario: "operations",
  adm: "operations",
  crm: "operations",
  airport: "operations",
  physiology: "operations",
  night: "operations",
  radio: "operations",
  maintenance: "operations",
  emergency: "operations",
};

export function bucketForTopic(topic: string): AcsBucket {
  return TOPIC_TO_BUCKET[topic.trim().toLowerCase()] ?? "operations";
}

export function bucketFor(q: Question): AcsBucket {
  return bucketForTopic(q.topic);
}

// Given a total exam size, return how many questions to pull from each bucket.
// Uses largest-remainder rounding so the sum always equals `total`.
export function quotasForTotal(total: number): Record<AcsBucket, number> {
  const raw = ACS_BUCKETS.map((s) => ({ key: s.key, value: total * s.weight }));
  const base = raw.map((r) => ({ key: r.key, whole: Math.floor(r.value), frac: r.value - Math.floor(r.value) }));
  let assigned = base.reduce((n, r) => n + r.whole, 0);
  // Distribute the remainder to the buckets with the highest fractional parts.
  const byFrac = [...base].sort((a, b) => b.frac - a.frac);
  let i = 0;
  while (assigned < total && i < byFrac.length) {
    byFrac[i].whole += 1;
    assigned += 1;
    i++;
  }
  const out: Record<AcsBucket, number> = {
    regulations: 0,
    airspace: 0,
    weather: 0,
    "loading-performance": 0,
    operations: 0,
  };
  for (const r of base) out[r.key] = r.whole;
  return out;
}

// Weighted shuffle helper — plain Fisher-Yates over a weighted pool.
function weightedShuffle<T>(items: T[], weight: (t: T) => number): T[] {
  // Efraimidis-Spirakis A-Res reservoir with random keys.
  return items
    .map((t) => ({ t, k: Math.random() ** (1 / Math.max(weight(t), 0.0001)) }))
    .sort((a, b) => b.k - a.k)
    .map((x) => x.t);
}

// Pool of questions grouped by bucket.
function groupByBucket(pool: Question[]): Record<AcsBucket, Question[]> {
  const groups: Record<AcsBucket, Question[]> = {
    regulations: [],
    airspace: [],
    weather: [],
    "loading-performance": [],
    operations: [],
  };
  for (const q of pool) groups[bucketFor(q)].push(q);
  return groups;
}

export type SampleOptions = {
  // If provided, questions the user got wrong more than right get boosted
  // to appear more often (adaptive mode). Correct-heavy questions get
  // deprioritized. Bookmarked questions get a small boost.
  wrongIds?: string[];
  correctHeavyIds?: string[];
  bookmarkedIds?: string[];
  // If true, forces adaptive weighting even if we have no history.
  adaptive?: boolean;
};

// Draw `total` questions from `pool` while honoring ACS bucket quotas.
// When a bucket is under-supplied (rare — only if content thins), the deficit
// is redistributed to the next-heaviest bucket rather than silently short.
export function sampleByAcs(pool: Question[], total: number, opts: SampleOptions = {}): Question[] {
  const groups = groupByBucket(pool);
  const quotas = quotasForTotal(total);

  const wrongSet = new Set(opts.wrongIds ?? []);
  const correctSet = new Set(opts.correctHeavyIds ?? []);
  const bookmarkSet = new Set(opts.bookmarkedIds ?? []);

  function weightFor(q: Question): number {
    if (!opts.adaptive) return 1;
    let w = 1;
    if (wrongSet.has(q.id)) w *= 3.0; // heavily boost missed
    else if (correctSet.has(q.id)) w *= 0.5; // deprioritize mastered
    if (bookmarkSet.has(q.id)) w *= 1.4;
    return w;
  }

  const picked: Question[] = [];
  const spillover: Question[] = [];

  for (const spec of ACS_BUCKETS) {
    const need = quotas[spec.key];
    const bucketPool = groups[spec.key];
    if (bucketPool.length === 0) continue;
    const shuffled = weightedShuffle(bucketPool, weightFor);
    const take = shuffled.slice(0, Math.min(need, shuffled.length));
    picked.push(...take);
    // remainder can spill over into other buckets if needed
    spillover.push(...shuffled.slice(need));
  }

  // If any bucket was short, fill from spillover (still weighted).
  if (picked.length < total) {
    const need = total - picked.length;
    const backfill = weightedShuffle(spillover, weightFor).slice(0, need);
    picked.push(...backfill);
  }

  return picked;
}

// Handy label for UI: "12 Regs · 12 Airspace · 8 Wx · 5 Load/Perf · 22 Ops"
export function quotaLabel(quotas: Record<AcsBucket, number>): string {
  return ACS_BUCKETS.map((s) => `${quotas[s.key]} ${s.short}`).join(" · ");
}

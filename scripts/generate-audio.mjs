#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { narrate } from "../src/lib/narrate.mjs";

const VOICE_ID = process.env.VOICE_ID ?? "21m00Tcm4TlvDq8ikWAM";
const MODEL = "eleven_turbo_v2_5";
const API_KEY = process.env.ELEVENLABS_API_KEY;
const BUDGET = parseInt(process.argv.find((a) => a.startsWith("--budget="))?.split("=")[1] ?? "32000", 10);
const DRY_RUN = process.argv.includes("--dry-run");

if (!API_KEY) { console.error("ELEVENLABS_API_KEY not set"); process.exit(1); }

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const AUDIO_DIR = path.join(ROOT, "public", "audio");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "audio-manifest.json");
fs.mkdirSync(AUDIO_DIR, { recursive: true });
fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) { try { manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")); } catch {} }

let spent = 0, generated = 0, cached = 0, stopped = false;

function hashOf(text) { return crypto.createHash("sha1").update(text).digest("hex").slice(0, 16); }

async function generateOne(text, label) {
  if (stopped) return;
  const id = hashOf(text);
  const file = path.join(AUDIO_DIR, id + ".mp3");
  if (fs.existsSync(file) && manifest[id]) { cached++; return; }
  if (spent + text.length > BUDGET) { console.log("  PAUSE - budget reached"); stopped = true; return; }
  if (DRY_RUN) { console.log("  [dry] " + text.length + " chars: " + label.slice(0, 60)); spent += text.length; return; }
  process.stdout.write("  " + text.length.toString().padStart(5) + " - " + label.slice(0, 55).padEnd(57) + " ");
  const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + VOICE_ID + "?output_format=mp3_44100_128", {
    method: "POST",
    headers: { "xi-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true } }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.log("FAIL " + res.status);
    console.error("    " + body.slice(0, 200));
    if (res.status === 401 || res.status === 429) stopped = true;
    if (body.includes("quota_exceeded") || body.includes("character_limit_exceeded")) stopped = true;
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(file, buf);
  manifest[id] = { file: id + ".mp3", chars: text.length, preview: label.slice(0, 80) };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  spent += text.length;
  generated++;
  console.log("OK " + (buf.length / 1024).toFixed(0) + "KB - total " + spent + "/" + BUDGET);
}

function extractArr(src, name) {
  const m = new RegExp("const\\s+" + name + "\\b[^=]*=\\s*\\[").exec(src);
  if (!m) throw new Error("Missing " + name);
  const start = m.index + m[0].length - 1;
  let depth = 0, inStr = false, strCh = "", esc = false, i = start;
  for (; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc = false; continue; }
    if (c === "\\" && inStr) { esc = true; continue; }
    if (inStr) { if (c === strCh) inStr = false; continue; }
    if (c === "\"" || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) { i++; break; } }
  }
  const lit = src.slice(start, i).replace(/as\s+AppIconName/g, "").replace(/as\s+\w+\s*\|\s*\w+/g, "");
  return new Function("return " + lit)();
}

const readSrc = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

// Identical to the formatters in src/lib/audio-text.ts (with narrate() applied)
const fmt = {
  coldGroup: (g) => narrate(g.title + ". " + g.facts.map((f) => f.fact + ". " + (f.why ? "Why: " + f.why + "." : "")).join(" ")),
  studyDay: (d) => narrate("Day " + d.day + ". " + d.title + ". " + d.focus + " Estimated " + d.hours + ". " + d.steps.map((s, i) => "Step " + (i + 1) + ". " + s.label + ". " + s.copy).join(" ")),
  examSection: (s) => narrate(s.title + ". " + s.items.map((it) => it.label + ". " + it.copy).join(" ")),
  cheatSection: (s) => narrate(s.title + ". " + s.rows.map((r) => r.label + ": " + r.value + "." + (r.detail ? " " + r.detail : "")).join(" ")),
  glossaryEntry: (e) => {
    const head = e.full && e.full !== e.term ? e.term + ". " + e.full + ". " : e.term + ". ";
    return narrate(head + e.definition);
  },
};

const tiers = [
  { name: "Cold facts", items: () => extractArr(readSrc("src/app/cold-facts/page.tsx"), "GROUPS").map((g) => ({ label: g.title, text: fmt.coldGroup(g) })) },
  { name: "Study path", items: () => extractArr(readSrc("src/app/study-path/page.tsx"), "PATH").map((d) => ({ label: "Day " + d.day + ": " + d.title, text: fmt.studyDay(d) })) },
  { name: "Exam day", items: () => extractArr(readSrc("src/app/exam-day/page.tsx"), "SECTIONS").map((s) => ({ label: s.title, text: fmt.examSection(s) })) },
  { name: "Cheat sheet (priority sections)", items: () => {
      const sections = extractArr(readSrc("src/app/cheatsheet/page.tsx"), "SECTIONS");
      const priority = [
        "Hard limits (memorize cold)",
        "Operations over people (§107.39 / §107.110–.140)",
        "Accident reporting (§107.9)",
        "Night & civil twilight (§107.29)",
        "Alcohol / drugs (§107.27, §91.17)",
        "Certification (§107.61, §107.65, §107.77)",
        "Remote ID (Part 89, effective Sept 16 2023)",
        "Airspace authorization (§107.41)",
      ];
      return priority.map((t) => sections.find((s) => s.title === t)).filter(Boolean)
        .map((s) => ({ label: s.title, text: fmt.cheatSection(s) }));
  }},
  { name: "Glossary entries (shortest first)", items: () => {
      const entries = extractArr(readSrc("src/data/glossary.ts"), "glossary");
      return entries.map((e) => ({ label: e.term, text: fmt.glossaryEntry(e) }))
        .sort((a, b) => a.text.length - b.text.length);
  }},
  { name: "Cheat sheet (remaining sections)", items: () => {
      const sections = extractArr(readSrc("src/app/cheatsheet/page.tsx"), "SECTIONS");
      const priority = new Set([
        "Hard limits (memorize cold)",
        "Operations over people (§107.39 / §107.110–.140)",
        "Accident reporting (§107.9)",
        "Night & civil twilight (§107.29)",
        "Alcohol / drugs (§107.27, §91.17)",
        "Certification (§107.61, §107.65, §107.77)",
        "Remote ID (Part 89, effective Sept 16 2023)",
        "Airspace authorization (§107.41)",
      ]);
      return sections.filter((s) => !priority.has(s.title))
        .map((s) => ({ label: s.title, text: fmt.cheatSection(s) }))
        .sort((a, b) => a.text.length - b.text.length);
  }},
];

console.log("Generating with Rachel - budget " + BUDGET);
for (const tier of tiers) {
  if (stopped) break;
  const items = tier.items();
  const tc = items.reduce((s, it) => s + it.text.length, 0);
  console.log("\nTIER: " + tier.name + " (" + items.length + " items, " + tc + " chars)");
  const before = spent;
  for (const it of items) { if (stopped) break; await generateOne(it.text, it.label); }
  console.log("  consumed " + (spent - before) + " chars");
}

console.log("\nDONE. Spent " + spent + "/" + BUDGET + " - generated " + generated + " new - cached " + cached);
if (stopped) console.log("Stopped early.");

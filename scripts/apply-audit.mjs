#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const RESEARCH = path.join(ROOT, "research");
const AUDIT = path.join(RESEARCH, "audit");

const pairs = [
  ["01-regulations.json", "01-regulations-corrections.json"],
  ["02-airspace.json", "02-airspace-corrections.json"],
  ["03-weather.json", "03-weather-corrections.json"],
  ["04-loading-adm-crm.json", "04-loading-adm-crm-corrections.json"],
  ["05-ops-airport-radio-maint-night.json", "05-ops-airport-radio-maint-night-corrections.json"],
  ["06-codex-hard-scenarios.json", "06-codex-hard-scenarios-corrections.json"],
];

let totals = { ok: 0, fix: 0, rewrite: 0, missing: 0, files: 0 };

for (const [src, corr] of pairs) {
  const srcPath = path.join(RESEARCH, src);
  const corrPath = path.join(AUDIT, corr);
  if (!fs.existsSync(srcPath)) {
    console.warn(`MISSING source: ${src}`);
    continue;
  }
  if (!fs.existsSync(corrPath)) {
    console.warn(`MISSING corrections: ${corr}`);
    continue;
  }
  const questions = JSON.parse(fs.readFileSync(srcPath, "utf8"));
  const corrections = JSON.parse(fs.readFileSync(corrPath, "utf8"));
  const byId = new Map(questions.map((q, i) => [q.id, i]));
  let fileFix = 0, fileRewrite = 0, fileOk = 0, fileMiss = 0;

  for (const c of corrections) {
    if (c.verdict === "ok") { fileOk++; totals.ok++; continue; }
    const idx = byId.get(c.id);
    if (idx === undefined) { fileMiss++; totals.missing++; continue; }
    if (c.verdict === "fix" && c.fix) {
      questions[idx] = { ...questions[idx], ...c.fix };
      fileFix++; totals.fix++;
    } else if (c.verdict === "rewrite" && c.fix) {
      questions[idx] = { ...questions[idx], ...c.fix };
      fileRewrite++; totals.rewrite++;
    }
  }

  fs.writeFileSync(srcPath, JSON.stringify(questions, null, 2) + "\n");
  totals.files++;
  console.log(`${src}: ok=${fileOk} fix=${fileFix} rewrite=${fileRewrite} missing=${fileMiss}`);
}

console.log(`---\nTOTAL: ok=${totals.ok} fix=${totals.fix} rewrite=${totals.rewrite} missing=${totals.missing} across ${totals.files} files`);

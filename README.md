# Part 107 Study Bank

A focused, free, ad-free study app for the FAA Part 107 (Remote Pilot — Small UAS) Aeronautical Knowledge Test.

## What's inside

- **653 multiple-choice questions** across every ACS knowledge area, audited 3+ times against current FAA sources.
- **34 real FAA chart figures** from FAA-CT-8080-2H (Sport / Recreational / Remote / Private Pilot Airman Knowledge Testing Supplement, public domain).
- **Practice exams** — untimed or 2-hour timed (matches the real PSI exam format).
- **Topic drills** — study one ACS domain at a time, with explanations after each answer.
- **Flashcards** — rapid recall with keyboard nav.
- **Review mode** — drill mistakes + bookmarks (localStorage, no account required).
- **Cheat sheet** — 30 sections of expandable, FAA-cited rule explanations.
- **Cold facts** — distilled top 50 must-know-cold facts.
- **7-day study plan** — curated daily steps.
- **Exam day playbook** — night-before, morning-of, in-the-room strategy.
- **Glossary** — 201 aviation terms with plain-English definitions, audited.
- **Listen Mode (accessibility)** — every question, cheat-sheet section, and explanation can be read aloud via the browser's Web Speech API. Built for dyslexia, ADHD, visual fatigue, and learners-on-the-go. No backend, no account, no cost.

## Tech

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind v4
- Deployed on Vercel
- Question bank stored as JSON in `/research/`
- Figure images stored as WebP in `/public/figures/`

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
```

## Sources

Every answer is cited to its source: 14 CFR Part 107 / 48 / 89, FAA-G-8082-22 (Remote Pilot Study Guide), FAA-H-8083-25 (Pilot's Handbook), FAA-H-8083-28 (Aviation Weather Handbook), AC 00-45H (Aviation Weather Services), AIM (Aeronautical Information Manual), FAA Aeronautical Chart Users Guide, and the official FAA-CT-8080-2H testing supplement.

This is a study aid. Always verify operating rules against current FAA regulations and the published ACS.

## License

MIT for the application code. The FAA-published figures and rule text are U.S. Government works (public domain).

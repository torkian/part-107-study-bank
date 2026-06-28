import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import { examSectionText } from "@/lib/audio-text";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Day Playbook",
  description: "Night-before, morning-of, and in-the-room strategy for the FAA Part 107 Knowledge Test.",
  alternates: { canonical: "https://www.107license.com/exam-day" },
  openGraph: {
    title: "Exam Day Playbook · 107 License",
    description: "Night-before, morning-of, and in-the-room strategy for the FAA Part 107 Knowledge Test.",
    url: "https://www.107license.com/exam-day",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam Day Playbook · 107 License",
    description: "Night-before, morning-of, and in-the-room strategy for the FAA Part 107 Knowledge Test.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};


type Section = { title: string; items: { label: string; copy: string }[] };

const SECTIONS: Section[] = [
  {
    title: "Night before",
    items: [
      {
        label: "Read the full Cheat Sheet — just the values, not the deep details",
        copy: "Goal: refresh recognition. Don't try to learn anything new the night before — sleep matters more.",
      },
      {
        label: "Re-read the 'Common test traps' section",
        copy: "These are the exact patterns the FAA uses to bait wrong answers. Knowing the trap is half the defense.",
      },
      {
        label: "Stop studying by 8pm. Get 7–8 hours of sleep.",
        copy: "Fatigue meaningfully degrades recall and judgment. Trading sleep for one more drill set is a bad trade.",
      },
      {
        label: "Confirm your test time, location, and ID requirements",
        copy: "PSI test centers vary. Check the confirmation email. Print it if your phone might die.",
      },
      {
        label: "Lay out: photo ID + confirmation email + light snack + water bottle",
        copy: "Most centers allow water in a clear container at the seat. Snacks for breaks only.",
      },
    ],
  },
  {
    title: "Morning of",
    items: [
      {
        label: "Eat a normal breakfast — protein + carbs",
        copy: "Don't skip. Don't try anything new. Caffeine if you normally use it, but not extra.",
      },
      {
        label: "Skim the Cheat Sheet one final time (15 minutes max)",
        copy: "Focus on numerical values that decay fast: kinetic-energy thresholds, civil twilight ±30, accident reporting $500/10 days, max altitude/speed/visibility.",
      },
      {
        label: "Arrive 30 minutes early",
        copy: "PSI requires check-in. Late arrival = rebook (and pay again). Use the extra minutes to sit quietly, not cram.",
      },
      {
        label: "Use the restroom before check-in",
        copy: "Some centers don't allow re-entry. Two hours is a long time.",
      },
    ],
  },
  {
    title: "What to bring (and what NOT to bring)",
    items: [
      {
        label: "Government-issued photo ID — REQUIRED",
        copy: "Driver's license or passport. Name on ID must exactly match your FAA Tracking Number (FTN) account.",
      },
      {
        label: "FAA Tracking Number (FTN)",
        copy: "Found in your IACRA account. PSI will need this to register your result with the FAA.",
      },
      {
        label: "Test confirmation email or number",
        copy: "Some centers ask for it at check-in.",
      },
      {
        label: "Leave at home: phone, smartwatch, books, notes, calculator",
        copy: "PSI provides an on-screen calculator and the official FAA testing supplement (with all chart figures). Personal electronics go in a locker.",
      },
      {
        label: "Snacks/water for the locker",
        copy: "You can step out for short breaks but the timer keeps running.",
      },
    ],
  },
  {
    title: "During the test",
    items: [
      {
        label: "Read every question stem twice",
        copy: "The FAA writes questions carefully. A single word ('greater than' vs 'at or above', 'must' vs 'may') changes the answer.",
      },
      {
        label: "Eliminate one wrong answer first",
        copy: "Three-choice multiple choice = 33% baseline. Eliminating one bad answer takes you to 50%. Usually one answer is obviously wrong — drop it first.",
      },
      {
        label: "Flag and skip if you're stuck",
        copy: "Don't spend more than ~2 minutes per question on first pass. Flag tough ones, finish the easy ones, come back with momentum.",
      },
      {
        label: "Always look at the figure FIRST, then re-read the stem",
        copy: "For figure questions, study the figure for what's there before reading the question — you'll spot the answer faster.",
      },
      {
        label: "For METAR/TAF questions, decode the whole string",
        copy: "Don't shortcut. Wind, visibility, weather, sky, temp/dew, altimeter, remarks — go in order.",
      },
      {
        label: "Trust your first instinct on ambiguous wording",
        copy: "Statistically, your first answer is more often correct than your second-guessed one. Only change if you find a clear reason.",
      },
      {
        label: "Use the on-screen calculator and plotter",
        copy: "Both are provided. They're slower than physical tools — practice using on-screen versions during your final timed exam.",
      },
    ],
  },
  {
    title: "After: getting the result",
    items: [
      {
        label: "Score is immediate at the end of the test",
        copy: "PSI prints a score report on the spot. You'll know pass/fail and your raw score percentage.",
      },
      {
        label: "Pass = 70% minimum (42/60 correct)",
        copy: "There's no partial credit, no curve. Score report shows which ACS knowledge areas you missed (for re-study if you ever take a checkride).",
      },
      {
        label: "Apply for the Remote Pilot Certificate in IACRA",
        copy: "Use the score report ID + your FTN. The certificate prints automatically (you'll get a temporary one immediately, permanent card in 6–8 weeks).",
      },
      {
        label: "If you fail: 14-day wait, then retake",
        copy: "Same exam location, new question set. The fee is the same. Most who fail pass on the second attempt — study the missed ACS areas hard.",
      },
    ],
  },
];

export default function ExamDayPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="check" />
          Exam Day Playbook
        </span>
        <h1 className="page-title">What to do the night before, the morning of, and during the test.</h1>
        <p className="lede">
          Pulled together from PSI test-center policies, FAA testing guidance, and what actually
          trips people up in the room.
        </p>
      </header>

      {SECTIONS.map((section) => (
        <section key={section.title} className="card card-pad">
          <div className="cheat-section-head">
            <h2 className="section-title">{section.title}</h2>
            <AudioPlayer text={examSectionText(section)} label="Listen" size="sm" />
          </div>
          <ul className="exam-day-list">
            {section.items.map((item) => (
              <li key={item.label} className="exam-day-item">
                <span className="exam-day-bullet">
                  <AppIcon name="check" />
                </span>
                <div>
                  <strong className="tile-title">{item.label}</strong>
                  <p className="tile-copy">{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">Final word</span>
          <h2 className="section-title">You've done the work — trust it.</h2>
          <p className="lede">
            By the time you're at the test center you've already either prepared enough or you
            haven't. Test-day strategy matters at the margins, but the result is mostly already
            decided. Sleep, eat, breathe, read carefully, and trust your first instincts.
          </p>
        </div>
        <div className="action-row">
          <Link href="/cheatsheet" className="btn">
            <AppIcon name="cheatsheet" />
            One more cheat sheet pass
          </Link>
          <Link href="/exam?timed=1" className="btn btn-secondary">
            <AppIcon name="timer" />
            Final timed exam
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { AppIcon, type AppIconName } from "@/components/AppIcon";

type Day = {
  day: number;
  title: string;
  focus: string;
  hours: string;
  icon: AppIconName;
  accent: string;
  steps: { label: string; href?: string; copy: string }[];
};

const PATH: Day[] = [
  {
    day: 1,
    title: "Foundations + cheat sheet",
    focus: "Get the must-memorize numbers in your head.",
    hours: "1.5–2 hours",
    icon: "cheatsheet",
    accent: "#2563eb",
    steps: [
      {
        label: "Read the Cheat Sheet top to bottom",
        href: "/cheatsheet",
        copy: "Every limit, threshold, and reporting requirement. Tap any row with a ▶ to see the deeper explanation.",
      },
      {
        label: "Drill Regulations (read explanation for every miss)",
        href: "/topic/regulations",
        copy: "126 questions. After each one read the explanation — that's the actual learning.",
      },
      {
        label: "End-of-day: 20-question diagnostic exam",
        href: "/exam",
        copy: "Don't worry about the score — note which topics surprise you. Tomorrow you'll attack those.",
      },
    ],
  },
  {
    day: 2,
    title: "Airspace & sectional charts",
    focus: "The single biggest test category. Look at every figure.",
    hours: "2–2.5 hours",
    icon: "map",
    accent: "#62d5ff",
    steps: [
      {
        label: "Re-read the Cheat Sheet sections on airspace + sectional symbols",
        href: "/cheatsheet",
        copy: "Class B/C/D/E colors and lines, Mode C veil, MEF interpretation, obstacle marking.",
      },
      {
        label: "Drill Airspace (137 questions)",
        href: "/topic/airspace",
        copy: "Many include real FAA figures. Tap the figure → pinch-zoom on details. Read the explanation.",
      },
      {
        label: "Download the FAA testing supplement PDF",
        copy: "Search 'FAA-CT-8080-2H' on faa.gov. Print Appendix 2 figures and keep them next to you when drilling — that's what you'll see on the real test.",
      },
    ],
  },
  {
    day: 3,
    title: "Weather decoding",
    focus: "METARs and TAFs are guaranteed test content.",
    hours: "2 hours",
    icon: "cloud",
    accent: "#7dd3fc",
    steps: [
      {
        label: "Re-read the METAR/TAF/PIREP cheat sheet sections",
        href: "/cheatsheet",
        copy: "Sky cover oktas, cloud height convention (×100 AGL), wind dddffGff, M = minus, P6SM, FM/BECMG/TEMPO/PROB.",
      },
      {
        label: "Drill Weather (102 questions)",
        href: "/topic/weather",
        copy: "Walk through each METAR/TAF string character by character. Identify visibility, ceiling, dew-point spread, hazards.",
      },
      {
        label: "Memorize: AIRMET Sierra/Tango/Zulu + Convective SIGMET thresholds",
        copy: "Sierra=mountain obscuration/IFR · Tango=turbulence · Zulu=icing. Convective SIGMET = tornado, hail ≥¾\", winds ≥50 kt, or line/embedded TS.",
      },
    ],
  },
  {
    day: 4,
    title: "Operations, performance, ADM, CRM",
    focus: "The judgment-and-systems half of the exam.",
    hours: "1.5–2 hours",
    icon: "brain",
    accent: "#b58cff",
    steps: [
      {
        label: "Drill Aeronautical Decision Making (31 questions)",
        href: "/topic/adm",
        copy: "Memorize the 5 hazardous attitudes WITH their antidotes (exact wording matters). Plus PAVE, IMSAFE, DECIDE, 3P.",
      },
      {
        label: "Drill Loading & Performance (13) and Performance (23)",
        href: "/topic/performance",
        copy: "CG effects, density altitude, load factor in turns (30°/45°/60° = 1.15/1.41/2.0 G), LiPo handling.",
      },
      {
        label: "Drill Airport Operations + Radio (74 combined)",
        href: "/topic/airport",
        copy: "Standard left pattern entry on 45° to downwind. CTAF self-announce format. Beacon colors. §107.37: sUAS yields to ALL aircraft.",
      },
      {
        label: "Drill Physiology + Night + Emergency (45 combined)",
        href: "/topic/physiology",
        copy: "30-min dark adaptation, off-center viewing, alcohol 8hr/0.04 BAC, civil twilight ±30 min, accident reporting 10-day/$500.",
      },
    ],
  },
  {
    day: 5,
    title: "Full timed exam + targeted review",
    focus: "Real test conditions. Score 80%+ before continuing.",
    hours: "2.5 hours",
    icon: "exam",
    accent: "#d97706",
    steps: [
      {
        label: "Take a Timed Practice Exam (60 questions, 2-hour countdown)",
        href: "/exam?timed=1",
        copy: "Don't pause. Don't look anything up. Use the same conditions as PSI.",
      },
      {
        label: "Review every miss — read every explanation",
        href: "/review",
        copy: "Drill Mistakes pulls only the questions you've gotten wrong locally.",
      },
      {
        label: "Re-take a 60-question exam",
        href: "/exam",
        copy: "Goal: ≥85%. If you hit that two days in a row, schedule the real test.",
      },
    ],
  },
  {
    day: 6,
    title: "Hard scenarios + figure recognition",
    focus: "Cross-domain stumpers and visual interpretation.",
    hours: "1.5 hours",
    icon: "target",
    accent: "#fb7185",
    steps: [
      {
        label: "Drill Hard Scenarios (60 questions)",
        href: "/topic/scenario",
        copy: "These combine airspace + weather + regs into one question — the same pattern as the toughest real-test items.",
      },
      {
        label: "Open Flashcards for full bank rapid recall",
        href: "/flash",
        copy: "Space = reveal · → = next · ← = previous. Rate yourself honestly so the missed-queue is accurate.",
      },
      {
        label: "Re-read the 'Common test traps' section of the Cheat Sheet",
        href: "/cheatsheet",
        copy: "These are the exact tricks the FAA uses to bait the wrong answer.",
      },
    ],
  },
  {
    day: 7,
    title: "Final timed exam + exam-day prep",
    focus: "If you score 90%+ today, you'll pass tomorrow.",
    hours: "2 hours",
    icon: "trophy",
    accent: "#15803d",
    steps: [
      {
        label: "Take a final Timed Exam",
        href: "/exam?timed=1",
        copy: "Aim for 90%+ to give yourself a safety margin against test-day nerves.",
      },
      {
        label: "Read the Exam Day Checklist",
        href: "/exam-day",
        copy: "What to bring, what to do the morning of, common test-room rules.",
      },
      {
        label: "Skim the Cheat Sheet one last time before bed",
        href: "/cheatsheet",
        copy: "Read every value column (don't expand details). Sleep well — well-rested matters more than 30 extra questions.",
      },
    ],
  },
];

function accentStyle(accent: string) {
  return { ["--topic-accent" as string]: accent } as React.CSSProperties;
}

export default function StudyPathPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="route" />
          7-Day Study Path
        </span>
        <h1 className="page-title">A focused plan to pass on your first try.</h1>
        <p className="lede">
          Built around the highest-yield study patterns: drill by topic with explanations, then run
          full timed exams. If you only have a weekend, compress Days 1–4 into Day 1 and Days 5–7
          into Day 2.
        </p>
      </header>

      <section className="study-path-list" aria-label="Daily plan">
        {PATH.map((day) => (
          <article key={day.day} className="card card-pad study-day" style={accentStyle(day.accent)}>
            <header className="study-day-head">
              <span className="tile-icon">
                <AppIcon name={day.icon} />
              </span>
              <div>
                <span className="section-kicker">Day {day.day} · {day.hours}</span>
                <h2 className="tile-title">{day.title}</h2>
                <p className="tile-copy">{day.focus}</p>
              </div>
            </header>
            <ol className="study-steps">
              {day.steps.map((step, idx) => (
                <li key={idx} className="study-step">
                  <span className="study-step-number">{idx + 1}</span>
                  <div>
                    {step.href ? (
                      <Link href={step.href} className="study-step-title">
                        {step.label}
                        <AppIcon name="arrowRight" />
                      </Link>
                    ) : (
                      <strong className="study-step-title">{step.label}</strong>
                    )}
                    <p className="tile-copy">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">After Day 7</span>
          <h2 className="section-title">Schedule the real test</h2>
          <p className="lede">
            Book the FAA Knowledge Test at a PSI testing center (search faa.psiexams.com). Cost is
            roughly $175. Bring a government-issued photo ID. The test is 60 questions, 2 hours,
            three-choice multiple-choice. Passing score 70%.
          </p>
        </div>
        <div className="action-row">
          <Link href="/exam-day" className="btn">
            <AppIcon name="check" />
            Exam day checklist
          </Link>
          <Link href="/cheatsheet" className="btn btn-secondary">
            <AppIcon name="cheatsheet" />
            Cheat sheet
          </Link>
        </div>
      </section>
    </div>
  );
}

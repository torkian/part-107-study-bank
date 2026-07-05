import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import ExamRunner from "./ExamRunner";
import { loadAllQuestions } from "@/lib/questions";
import { quotasForTotal, quotaLabel } from "@/lib/acs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Exam",
  description:
    "60-question Part 107 practice exam — ACS-weighted like the real FAA test. Adaptive mode drills your weak areas.",
  alternates: { canonical: "https://www.107license.com/exam" },
  openGraph: {
    title: "Practice Exam · 107 License",
    description:
      "60-question Part 107 practice exam — ACS-weighted like the real FAA test. Adaptive mode drills your weak areas.",
    url: "https://www.107license.com/exam",
    images: [
      {
        url: "https://www.107license.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "107 License — Free FAA Part 107 Drone Pilot Study App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Exam · 107 License",
    description:
      "60-question Part 107 practice exam — ACS-weighted like the real FAA test. Adaptive mode drills your weak areas.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};

const EXAM_SIZE = 60;
const TWO_HOURS = 2 * 60 * 60;

export const dynamic = "force-dynamic";

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ timed?: string; go?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const timed = params?.timed === "1";
  const adaptive = params?.mode === "adaptive";
  const go = params?.go === "1" || timed || adaptive;
  const all = loadAllQuestions();

  if (!go) {
    const mixLabel = quotaLabel(quotasForTotal(EXAM_SIZE));
    return (
      <div className="exam-landing">
        <header className="page-header">
          <span className="eyebrow">
            <AppIcon name="exam" />
            Practice exam
          </span>
          <h1 className="page-title">Benchmark readiness under exam conditions</h1>
          <p className="lede">
            60 questions drawn to match the real FAA ACS breakdown ({mixLabel}). Choose adaptive
            mode after a few practice runs to drill your weak areas.
          </p>
        </header>

        <section className="stat-grid" aria-label="Exam format statistics">
          <div className="card stat-card">
            <span className="stat-label">Questions</span>
            <span className="stat-value">{Math.min(EXAM_SIZE, all.length)}</span>
            <span className="stat-note">ACS-weighted per attempt</span>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Passing</span>
            <span className="stat-value">70%</span>
            <span className="stat-note">Minimum score threshold</span>
          </div>
          <div className="card stat-card">
            <span className="stat-label">Timed</span>
            <span className="stat-value">2h</span>
            <span className="stat-note">Optional countdown</span>
          </div>
        </section>

        <section className="exam-mode-grid" aria-label="Exam modes">
          <article className="exam-mode-card card interactive-card">
            <div className="tile-top">
              <span className="mode-icon">
                <AppIcon name="target" />
              </span>
              <span className="badge">Practice</span>
            </div>
            <div>
              <h2 className="mode-title">Untimed mode</h2>
              <p className="mode-copy">
                Work deliberately through the full set without a countdown. Best for diagnosis and
                first-pass review.
              </p>
            </div>
            <div className="mode-list">
              <span>ACS-weighted question mix</span>
              <span>Results shown at finish</span>
              <span>Progress saved locally</span>
            </div>
            <Link href="/exam?go=1" className="btn">
              <AppIcon name="play" />
              Start untimed
            </Link>
          </article>

          <article className="exam-mode-card card interactive-card">
            <div className="tile-top">
              <span className="mode-icon">
                <AppIcon name="timer" />
              </span>
              <span className="badge medium">Timed</span>
            </div>
            <div>
              <h2 className="mode-title">Timed mode</h2>
              <p className="mode-copy">
                Use the two-hour timer when you want a closer simulation and a cleaner pacing check.
              </p>
            </div>
            <div className="mode-list">
              <span>2:00:00 countdown</span>
              <span>ACS-weighted mix</span>
              <span>Auto-finishes at time limit</span>
            </div>
            <Link href="/exam?timed=1" className="btn">
              <AppIcon name="timer" />
              Start timed
            </Link>
          </article>

          <article className="exam-mode-card card interactive-card">
            <div className="tile-top">
              <span className="mode-icon">
                <AppIcon name="brain" />
              </span>
              <span className="badge hard">Adaptive</span>
            </div>
            <div>
              <h2 className="mode-title">Adaptive mode</h2>
              <p className="mode-copy">
                Same ACS mix, but the sampler biases toward questions you&rsquo;ve missed and away
                from ones you&rsquo;ve mastered. Best after a few practice runs.
              </p>
            </div>
            <div className="mode-list">
              <span>Weighted toward your weak areas</span>
              <span>Deprioritizes mastered items</span>
              <span>Bookmarks lightly boosted</span>
            </div>
            <Link href="/exam?mode=adaptive" className="btn">
              <AppIcon name="target" />
              Start adaptive
            </Link>
          </article>
        </section>

        <div className="exam-mode-footnote">
          <AppIcon name="book" />
          <span>
            <strong>ACS weighting:</strong> {mixLabel}. This matches the FAA Airman Certification
            Standards distribution so your mock score is a realistic pass-fail signal.
          </span>
        </div>
      </div>
    );
  }

  return (
    <ExamRunner
      allQuestions={all}
      examSize={EXAM_SIZE}
      mode={adaptive ? "adaptive" : "standard"}
      timedSeconds={timed ? TWO_HOURS : undefined}
      title={
        adaptive
          ? `Adaptive Exam · ${EXAM_SIZE} questions`
          : timed
            ? `Timed Exam · ${EXAM_SIZE} questions`
            : `Practice Exam · ${EXAM_SIZE} questions`
      }
      backHref="/exam"
    />
  );
}

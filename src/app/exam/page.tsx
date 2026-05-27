import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import Quiz from "@/components/Quiz";
import { loadAllQuestions } from "@/lib/questions";

const EXAM_SIZE = 60;
const TWO_HOURS = 2 * 60 * 60;

function sample<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}

export const dynamic = "force-dynamic";

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ timed?: string; go?: string }>;
}) {
  const params = await searchParams;
  const timed = params?.timed === "1";
  const go = params?.go === "1" || timed;
  const all = loadAllQuestions();

  if (!go) {
    return (
      <div className="exam-landing">
        <header className="page-header">
          <span className="eyebrow">
            <AppIcon name="exam" />
            Practice exam
          </span>
          <h1 className="page-title">Benchmark readiness under exam conditions</h1>
          <p className="lede">
            Build a randomized 60-question run from the full bank. Results include the passing
            threshold, per-topic breakdown, and direct routes back into review.
          </p>
        </header>

        <section className="stat-grid" aria-label="Exam format statistics">
          <div className="card stat-card">
            <span className="stat-label">Questions</span>
            <span className="stat-value">{Math.min(EXAM_SIZE, all.length)}</span>
            <span className="stat-note">Randomized per attempt</span>
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
              <span>Random question order</span>
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
              <span>Auto-finishes at time limit</span>
              <span>Same scoring breakdown</span>
            </div>
            <Link href="/exam?timed=1" className="btn">
              <AppIcon name="timer" />
              Start timed
            </Link>
          </article>
        </section>
      </div>
    );
  }

  const set = sample(all, EXAM_SIZE);
  return (
    <Quiz
      questions={set}
      title={timed ? `Timed Exam · ${set.length} questions` : `Practice Exam · ${set.length} questions`}
      mode="exam"
      backHref="/exam"
      timedSeconds={timed ? TWO_HOURS : undefined}
    />
  );
}

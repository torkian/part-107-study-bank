import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import ListenClient from "./ListenClient";

export const dynamic = "force-dynamic";

export default function ListenPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="headphones" />
          Listen Mode · Audio Study
        </span>
        <h1 className="page-title">Study Part 107 by ear.</h1>
        <p className="lede">
          Every cheat sheet, question, and explanation can be read aloud. Built for pilots who learn
          better by listening — including those with dyslexia, ADHD, or visual fatigue. Free, uses
          your device&rsquo;s built-in speech engine, works offline once loaded, plays on iOS Safari
          and Android Chrome.
        </p>
      </header>

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title">Tap any 🎧 Listen button</h2>
          <p className="lede">
            Every cheat sheet section, every cold-facts group, every quiz question, and every
            explanation has a Listen button. Tap it to hear the content read aloud. Adjust speed
            (0.75× to 2×). Pause anytime. Your speed preference is remembered.
          </p>
        </div>
        <div className="action-row">
          <Link href="/cheatsheet" className="btn">
            <AppIcon name="cheatsheet" />
            Listen to the cheat sheet
          </Link>
          <Link href="/cold-facts" className="btn btn-secondary">
            <AppIcon name="star" />
            Listen to the top 50
          </Link>
          <Link href="/exam" className="btn btn-secondary">
            <AppIcon name="exam" />
            Listen to a practice exam
          </Link>
        </div>
      </section>

      <ListenClient />

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">Tips</span>
          <h2 className="section-title">Get the most out of audio study</h2>
        </div>
        <ul className="exam-day-list">
          <li className="exam-day-item">
            <span className="exam-day-bullet"><AppIcon name="check" /></span>
            <div>
              <strong className="tile-title">Pair audio with reading</strong>
              <p className="tile-copy">
                Listening + reading at the same time activates two memory paths — recall is stronger than either alone.
              </p>
            </div>
          </li>
          <li className="exam-day-item">
            <span className="exam-day-bullet"><AppIcon name="check" /></span>
            <div>
              <strong className="tile-title">Slow it down for new material</strong>
              <p className="tile-copy">
                First pass: 0.75× or 1×. Once you know the concept, 1.5×–2× for rapid review.
              </p>
            </div>
          </li>
          <li className="exam-day-item">
            <span className="exam-day-bullet"><AppIcon name="check" /></span>
            <div>
              <strong className="tile-title">Use headphones in noisy spaces</strong>
              <p className="tile-copy">
                Listen on the way to work, walking, doing chores. Volume of practice matters as much as quality.
              </p>
            </div>
          </li>
          <li className="exam-day-item">
            <span className="exam-day-bullet"><AppIcon name="check" /></span>
            <div>
              <strong className="tile-title">For best voice quality, use iOS or Mac Safari</strong>
              <p className="tile-copy">
                Apple ships premium neural voices. On other devices, the default voice still works — change
                it in your OS speech settings.
              </p>
            </div>
          </li>
          <li className="exam-day-item">
            <span className="exam-day-bullet"><AppIcon name="check" /></span>
            <div>
              <strong className="tile-title">Stop one audio before starting another</strong>
              <p className="tile-copy">
                Tap any new Listen button — it auto-stops the previous one. The × button stops audio immediately.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import ListenClient from "./ListenClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listen Mode",
  description: "Free audio narration for the Part 107 study app — built for dyslexia, ADHD, visual fatigue, and learners on the go.",
  alternates: { canonical: "https://www.107license.com/listen" },
  openGraph: {
    title: "Listen Mode · 107 License",
    description: "Free audio narration for the Part 107 study app — built for dyslexia, ADHD, visual fatigue, and learners on the go.",
    url: "https://www.107license.com/listen",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Listen Mode · 107 License",
    description: "Free audio narration for the Part 107 study app — built for dyslexia, ADHD, visual fatigue, and learners on the go.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};


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
          HD Rachel recordings play where available. Your device voice covers the rest, with one
          saved backup voice and speed for every Listen button.
        </p>
      </header>

      <ListenClient />

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title">Tap any Listen button</h2>
          <p className="lede">
            Cheat sheet sections, review groups, questions, and explanations can play aloud. HD
            audio is used first unless you choose backup voice only.
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

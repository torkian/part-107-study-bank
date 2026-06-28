import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";

export const metadata: Metadata = {
  title: "About — Built for the drone community",
  description:
    "A free, ad-free Part 107 study tool built so anyone can get their drone license. All content from public FAA sources. Mission: keep training accessible to everyone.",
  alternates: { canonical: "https://www.107license.com/about" },
  openGraph: {
    title: "About · 107 License",
    description:
      "Free Part 107 study, built for the drone community. No paywall, no nickel-and-diming.",
    url: "https://www.107license.com/about",
    images: [
      {
        url: "https://www.107license.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "107 License",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About · 107 License",
    description:
      "Free Part 107 study, built for the drone community. No paywall, no nickel-and-diming.",
    images: ["https://www.107license.com/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">About the project</span>
        <h1 className="page-title">Built for the drone community.</h1>
        <p className="lede">
          The drone training market keeps finding new ways to charge for things the FAA already
          publishes for free. This site is the opposite of that: a complete, free, ad-free Part 107
          study tool so anyone with a phone and an afternoon can get their license and go fly.
        </p>
      </header>

      <section className="card card-pad" style={{ display: "grid", gap: "1.3rem" }}>
        <div>
          <h2 className="section-title">Why this exists</h2>
          <p className="tile-copy">
            Commercial drone work isn&rsquo;t glamorous — you&rsquo;re standing in a field in the
            heat or the cold, delivering real value to a client. The license should be the easy
            part. Yet every Part 107 study tool charges $30 to $300 for content that&rsquo;s either
            already in the FAA&rsquo;s public documents or was paid for by your taxes. That gap
            keeps people out of the industry.
          </p>
          <p className="tile-copy" style={{ marginTop: "0.6rem" }}>
            This site closes the gap. Everything you need to pass the test is here, free, with no
            ads and no account. Get certified, go fly, build your business or your hobby — and
            help the community grow.
          </p>
        </div>

        <div>
          <h2 className="section-title">What you get</h2>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.75, color: "var(--foreground)" }}>
            <li>653 multiple-choice questions across every ACS knowledge area</li>
            <li>34 real FAA chart figures from FAA-CT-8080-2H with pinch-to-zoom</li>
            <li>33-section cheat sheet with tap-to-expand FAA-cited explanations</li>
            <li>201-entry aviation glossary in plain English</li>
            <li>7-day curated study plan + exam-day playbook</li>
            <li>
              Listen Mode — audio narration of every cheat-sheet section + questions, built for
              dyslexia, ADHD, visual fatigue, and learners on the go
            </li>
            <li>Practice exam — untimed or 2-hour timed (FAA conditions)</li>
            <li>Flashcards, mistake review, bookmarks — all local to your device</li>
          </ul>
        </div>

        <div>
          <h2 className="section-title">All content from public FAA sources</h2>
          <p className="tile-copy">
            Every fact, figure, and rule is drawn from documents anyone can download from{" "}
            <strong>faa.gov</strong>: 14 CFR Parts 107, 48, 89; the FAA Remote Pilot Study Guide
            (FAA-G-8082-22); the Pilot&rsquo;s Handbook of Aeronautical Knowledge (FAA-H-8083-25);
            the Aviation Weather Handbook (FAA-H-8083-28); AC 00-45H Aviation Weather Services; the
            AIM; the Aeronautical Chart Users Guide; and the official FAA Airman Knowledge Testing
            Supplement (FAA-CT-8080-2H). Every answer cites its source. Nothing is invented.
          </p>
        </div>

        <div>
          <h2 className="section-title">The mission</h2>
          <p className="tile-copy">
            Make Part 107 training accessible to everyone, regardless of budget. Help the community
            grow. Trust that pilots who got here free will pay it forward by helping the next
            person.
          </p>
        </div>

        <div className="support-card">
          <div className="support-icon">
            <AppIcon name="trophy" />
          </div>
          <div>
            <h2 className="section-title">Support keeps it free, forever</h2>
            <p className="tile-copy">
              Hosting, audio narration, chart figures, and the constant work of keeping the content
              current with FAA rule changes all cost something. If this site helped you pass — or
              just saved you $200 on a study course — please consider supporting:
            </p>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.6rem", lineHeight: 1.7, color: "var(--foreground)" }}>
              <li>Tell another drone pilot about the site</li>
              <li>Sponsor a feature or a month of hosting (link coming soon)</li>
              <li>Buy us a coffee (donation link coming soon)</li>
              <li>
                Send a typo, content correction, or feature idea to{" "}
                <a href="mailto:support@107license.com" className="email-link">
                  support@107license.com
                </a>
              </li>
            </ul>
            <p className="tile-copy" style={{ marginTop: "0.6rem" }}>
              No subscription, no ads, no nickel-and-diming — ever. Sponsorship and one-time
              donations are what will keep this site free for everyone going forward.
            </p>
          </div>
        </div>

        <div>
          <h2 className="section-title">Get in touch</h2>
          <p className="tile-copy">
            Found a wrong answer? Want a topic added? Have an idea for a new feature? Email{" "}
            <a href="mailto:support@107license.com" className="email-link">
              support@107license.com
            </a>
            . Real human reads every message. Corrections ship fast.
          </p>
        </div>

        <div>
          <h2 className="section-title">Always verify the official source</h2>
          <p className="tile-copy">
            This is a study aid. Regulations change. Before you fly, always verify operating rules
            against the current FAA publications.
          </p>
        </div>

        <div>
          <h2 className="section-title">License</h2>
          <p className="tile-copy">
            FAA chart figures and rule text are U.S. Government works and are in the public domain.
            Application source code is open source.
          </p>
        </div>
      </section>

      <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <Link href="/study-path" className="btn">
          Start the 7-day plan
        </Link>
        <Link href="/privacy" className="btn btn-secondary">
          Privacy
        </Link>
        <Link href="/" className="btn btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Built for the drone community. No tracking, no account, no ads. All study content sourced from public FAA documents.",
  alternates: { canonical: "https://www.107license.com/privacy" },
  openGraph: {
    title: "Privacy · 107 License",
    description:
      "Built for the drone community. No tracking, no account, no ads.",
    url: "https://www.107license.com/privacy",
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
    title: "Privacy · 107 License",
    description: "No tracking. No account. Free forever.",
    images: ["https://www.107license.com/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">Privacy</span>
        <h1 className="page-title">No tracking. No account. Free forever.</h1>
        <p className="lede">
          This site exists to help people pass their FAA Part 107 exam without paying. Privacy is
          part of that promise — nothing about you is harvested, sold, or stored on our servers.
        </p>
      </header>

      <section className="card card-pad" style={{ display: "grid", gap: "1.2rem" }}>
        <div>
          <h2 className="section-title">No account, no signup</h2>
          <p className="tile-copy">
            Every feature works without an account. We never ask for your name, email, phone, or
            payment. Open the site and start studying.
          </p>
        </div>

        <div>
          <h2 className="section-title">No analytics, no tracking, no ads</h2>
          <p className="tile-copy">
            There are no analytics scripts, no advertising pixels, no fingerprinting, no
            third-party trackers — none of the surveillance the rest of the web ships with. The
            page you load contains only the assets needed to render the page.
          </p>
        </div>

        <div>
          <h2 className="section-title">Where your study progress lives</h2>
          <p className="tile-copy">
            Your answers, bookmarks, and audio preferences are saved in your browser&rsquo;s{" "}
            <strong>localStorage</strong>. That data never leaves your device. Clear your browser
            data or hit the Reset button on the Review page to wipe it.
          </p>
        </div>

        <div>
          <h2 className="section-title">All content from public FAA sources</h2>
          <p className="tile-copy">
            Every question, citation, chart figure, and rule explanation is sourced from
            public-domain FAA documents — 14 CFR Parts 107, 48, 89; the FAA Remote Pilot Study Guide
            (FAA-G-8082-22); FAA-H-8083-25/28 handbooks; AC 00-45H; the AIM; the Aeronautical
            Chart Users Guide; and the FAA Airman Knowledge Testing Supplement (FAA-CT-8080-2H,
            a U.S. Government public-domain work). Nothing here is behind a paywall because the
            FAA didn&rsquo;t put it behind one.
          </p>
        </div>

        <div>
          <h2 className="section-title">Hosting</h2>
          <p className="tile-copy">
            The site is hosted on <strong>Vercel</strong>. Vercel collects standard request logs
            (IP, user-agent, requested URL) that any web server collects, used solely for
            operational purposes such as detecting abuse and routing traffic to the right region.
            See Vercel&rsquo;s privacy policy for their handling.
          </p>
        </div>

        <div>
          <h2 className="section-title">Cookies</h2>
          <p className="tile-copy">
            We set no cookies. Vercel may set platform cookies for routing, but nothing the app
            controls or reads.
          </p>
        </div>

        <div>
          <h2 className="section-title">Audio narration</h2>
          <p className="tile-copy">
            HD audio files are pre-generated as static MP3s and served from our CDN. They contain
            no tracking. Backup voice playback uses your browser&rsquo;s built-in Web Speech API
            and stays entirely on your device.
          </p>
        </div>

        <div>
          <h2 className="section-title">Changes</h2>
          <p className="tile-copy">
            If anything ever changes about the data practices on this site, this page will be
            updated with a clear note at the top. We don&rsquo;t plan to change anything — but if
            we ever do, you&rsquo;ll see it here first.
          </p>
        </div>

        <div>
          <h2 className="section-title">Privacy questions?</h2>
          <p className="tile-copy">
            Email{" "}
            <a href="mailto:support@107license.com" className="email-link">
              support@107license.com
            </a>
            {" "}with any privacy concerns or data-related requests.
          </p>
        </div>
      </section>

      <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <Link href="/" className="btn">
          Back to home
        </Link>
        <Link href="/about" className="btn btn-secondary">
          About the project
        </Link>
      </div>
    </div>
  );
}

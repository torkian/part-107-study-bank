import type { Metadata } from "next";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";

export const metadata: Metadata = {
  title: "Lost link · Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="nf-shell">
      {/* Animated sectional-chart-style backdrop */}
      <div className="nf-grid" aria-hidden="true" />
      <div className="nf-rings" aria-hidden="true">
        <div className="nf-ring nf-ring-1" />
        <div className="nf-ring nf-ring-2" />
        <div className="nf-ring nf-ring-3" />
      </div>

      <div className="nf-card card">
        {/* NOTAM-style header chip */}
        <div className="nf-notam">
          <span className="nf-notam-tag">FDC NOTAM</span>
          <span className="nf-notam-id">4/0404</span>
          <span className="nf-notam-time">{`URL UNK ${new Date()
            .toISOString()
            .slice(0, 16)
            .replace(/[-:T]/g, "")}Z`}</span>
        </div>

        {/* Drone illustration */}
        <div className="nf-stage" aria-hidden="true">
          <svg viewBox="0 0 240 200" className="nf-drone">
            {/* Glow halo */}
            <circle cx="120" cy="110" r="84" fill="url(#nf-halo)" opacity="0.55" />

            {/* Drone body — quadcopter top-down view, isometric tilt */}
            <g className="nf-drone-body" transform="translate(120 110)">
              {/* Frame arms */}
              <line x1="-55" y1="-32" x2="-22" y2="-10" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="55" y1="-32" x2="22" y2="-10" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="-55" y1="32" x2="-22" y2="10" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="55" y1="32" x2="22" y2="10" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />

              {/* Center body */}
              <rect x="-24" y="-14" width="48" height="28" rx="8" fill="#1e40af" />
              <rect x="-24" y="-14" width="48" height="28" rx="8" fill="url(#nf-body-gloss)" />
              {/* Camera lens */}
              <circle cx="0" cy="2" r="4" fill="#0a0c10" />
              <circle cx="0" cy="2" r="2" fill="#4f8cff" />
              {/* Tiny LED — pulsing */}
              <circle cx="-16" cy="-7" r="2" fill="#dc2626" className="nf-led" />

              {/* Propellers — spinning */}
              <g transform="translate(-55 -32)">
                <circle r="14" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                <g className="nf-prop">
                  <ellipse cx="0" cy="0" rx="14" ry="2.5" fill="#2563eb" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="2.5" ry="14" fill="#2563eb" opacity="0.55" />
                </g>
                <circle r="3" fill="#1e40af" />
              </g>
              <g transform="translate(55 -32)">
                <circle r="14" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                <g className="nf-prop nf-prop-rev">
                  <ellipse cx="0" cy="0" rx="14" ry="2.5" fill="#2563eb" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="2.5" ry="14" fill="#2563eb" opacity="0.55" />
                </g>
                <circle r="3" fill="#1e40af" />
              </g>
              <g transform="translate(-55 32)">
                <circle r="14" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                <g className="nf-prop nf-prop-rev">
                  <ellipse cx="0" cy="0" rx="14" ry="2.5" fill="#2563eb" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="2.5" ry="14" fill="#2563eb" opacity="0.55" />
                </g>
                <circle r="3" fill="#1e40af" />
              </g>
              <g transform="translate(55 32)">
                <circle r="14" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
                <g className="nf-prop">
                  <ellipse cx="0" cy="0" rx="14" ry="2.5" fill="#2563eb" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="2.5" ry="14" fill="#2563eb" opacity="0.55" />
                </g>
                <circle r="3" fill="#1e40af" />
              </g>
            </g>

            {/* "Lost link" wave — broken signal */}
            <g transform="translate(178 60)" opacity="0.85">
              <path d="M0 0 q-6 -6 -14 -6" stroke="#dc2626" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M2 -10 q-10 -10 -22 -10" stroke="#dc2626" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
              <line x1="-8" y1="-2" x2="-2" y2="-12" stroke="#dc2626" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="-8" y1="-12" x2="-2" y2="-2" stroke="#dc2626" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            <defs>
              <radialGradient id="nf-halo">
                <stop offset="0%" stopColor="#4f8cff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#4f8cff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="nf-body-gloss" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="nf-copy">
          <span className="eyebrow nf-eyebrow">404 · Lost link with this page</span>
          <h1 className="page-title nf-title">Off course.</h1>
          <p className="lede nf-lede">
            That page isn&rsquo;t at these coordinates. Probably a stale link, a typo, or a route
            we retired. Pick a new heading below — your study session is one tap away.
          </p>
        </div>

        <div className="nf-actions">
          <Link href="/" className="btn">
            <AppIcon name="home" />
            Home
          </Link>
          <Link href="/study-path" className="btn btn-secondary">
            <AppIcon name="route" />
            7-day plan
          </Link>
          <Link href="/exam" className="btn btn-secondary">
            <AppIcon name="exam" />
            Practice exam
          </Link>
          <Link href="/cheatsheet" className="btn btn-secondary">
            <AppIcon name="cheatsheet" />
            Cheat sheet
          </Link>
        </div>

        <p className="nf-tip">
          <strong>Pilot trivia:</strong> when a real sUAS loses link with its controller, it
          triggers an automatic <em>return-to-home</em> or enters <em>ATTI</em> mode. This page
          just needs you to pick a new destination.
        </p>

        <p className="nf-contact">
          Followed a link from somewhere and landed here? Tell us where so we can fix it:{" "}
          <a href="mailto:support@107license.com" className="email-link">
            support@107license.com
          </a>
        </p>
      </div>
    </div>
  );
}

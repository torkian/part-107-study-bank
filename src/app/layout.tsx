import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppIcon } from "@/components/AppIcon";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.107license.com"),
  title: {
    default: "107 License — Free FAA Part 107 Drone Pilot Study App",
    template: "%s · 107 License",
  },
  description:
    "Free FAA Part 107 Remote Pilot study app. 653 audited practice questions, real FAA chart figures, cheat sheet with deep explanations, glossary, audio narration. Pass on your first try.",
  keywords: [
    "Part 107",
    "FAA Part 107",
    "drone license",
    "remote pilot",
    "Part 107 study",
    "Part 107 practice test",
    "drone test prep",
    "FAA drone exam",
    "Part 107 cheat sheet",
    "sUAS",
  ],
  authors: [{ name: "107 License" }],
  alternates: { canonical: "https://www.107license.com/" },
  openGraph: {
    type: "website",
    url: "https://www.107license.com/",
    siteName: "107 License",
    title: "107 License — Free FAA Part 107 Drone Pilot Study App",
    description:
      "653 audited practice questions, real FAA chart figures, cheat sheet, audio narration. Free.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "107 License — Free FAA Part 107 Drone Pilot Study App",
    description:
      "653 audited practice questions, real FAA chart figures, cheat sheet, audio narration. Free.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f4f3ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="site-root">
          <SiteHeader />
          <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
          <footer className="site-footer">
            <div className="site-footer-inner">
              <div className="footer-cols">
                <div className="footer-col">
                  <span className="footer-col-title">Study</span>
                  <a href="/study-path">7-day plan</a>
                  <a href="/cheatsheet">Cheat sheet</a>
                  <a href="/cold-facts">Must-know facts</a>
                  <a href="/glossary">Glossary</a>
                </div>
                <div className="footer-col">
                  <span className="footer-col-title">Practice</span>
                  <a href="/exam">Practice exam</a>
                  <a href="/topics">Topics</a>
                  <a href="/flash">Flashcards</a>
                  <a href="/review">Review</a>
                </div>
                <div className="footer-col">
                  <span className="footer-col-title">Test day</span>
                  <a href="/exam-day">Exam day playbook</a>
                  <a href="/listen">Listen mode</a>
                </div>
                <div className="footer-col">
                  <span className="footer-col-title">About</span>
                  <a href="/about">About</a>
                  <a href="/privacy">Privacy</a>
                  <a href="mailto:support@107license.com">Contact / Report issue</a>
                </div>
              </div>
              <div className="footer-disclaimer">
                <span>Study aid only. Verify operating rules against current FAA regulations.</span>
                <span className="footer-meta">
                  <span className="footer-dot" aria-hidden="true" />
                  <AppIcon name="shield" />
                  Local-only progress · No tracking
                </span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

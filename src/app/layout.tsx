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
  title: "Part 107 Test Bank | FAA Remote Pilot Study",
  description:
    "A focused FAA Part 107 remote pilot study tool with practice exams, topic drills, flashcards, review queues, figures, and cited explanations.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0c10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="site-root">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="site-footer-inner">
              <span>Study aid only. Verify operating rules against current FAA regulations.</span>
              <span className="footer-meta">
                <span className="footer-dot" aria-hidden="true" />
                <AppIcon name="shield" />
                Local-only progress
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { loadAllQuestions } from "@/lib/questions";
import ReviewClient from "./ReviewClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review",
  description: "Drill the Part 107 questions you have missed and review your bookmarked cards. Local-only progress.",
  alternates: { canonical: "https://www.107license.com/review" },
  openGraph: {
    title: "Review · 107 License",
    description: "Drill the Part 107 questions you have missed and review your bookmarked cards. Local-only progress.",
    url: "https://www.107license.com/review",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Review · 107 License",
    description: "Drill the Part 107 questions you have missed and review your bookmarked cards. Local-only progress.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};

export default function ReviewPage() {
  const all = loadAllQuestions();
  return <ReviewClient all={all} />;
}

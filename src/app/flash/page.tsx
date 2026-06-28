import type { Metadata } from "next";
import { loadAllQuestions } from "@/lib/questions";
import FlashClient from "./FlashClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flashcards",
  description: "Rapid recall flashcards for the FAA Part 107 exam. Mark cards as right or wrong as you flip through.",
  alternates: { canonical: "https://www.107license.com/flash" },
  openGraph: {
    title: "Flashcards · 107 License",
    description: "Rapid recall flashcards for the FAA Part 107 exam. Mark cards as right or wrong as you flip through.",
    url: "https://www.107license.com/flash",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flashcards · 107 License",
    description: "Rapid recall flashcards for the FAA Part 107 exam. Mark cards as right or wrong as you flip through.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};

export default function FlashPage() {
  const all = loadAllQuestions();
  return <FlashClient all={all} />;
}

import type { Metadata } from "next";
import { loadAllQuestions } from "@/lib/questions";
import ReviewClient from "./ReviewClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review | Part 107 Test Bank",
};

export default function ReviewPage() {
  const all = loadAllQuestions();
  return <ReviewClient all={all} />;
}

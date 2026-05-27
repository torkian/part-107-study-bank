import type { Metadata } from "next";
import { loadAllQuestions } from "@/lib/questions";
import FlashClient from "./FlashClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flashcards | Part 107 Test Bank",
};

export default function FlashPage() {
  const all = loadAllQuestions();
  return <FlashClient all={all} />;
}

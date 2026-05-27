import { AppIcon } from "@/components/AppIcon";
import GlossaryClient from "./GlossaryClient";

export default function GlossaryPage() {
  return (
    <div className="page-shell glossary-page">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="book" />
          Glossary
        </span>
        <h1 className="page-title">Aviation acronyms, decoded</h1>
        <p className="lede">
          Plain-English definitions for the abbreviations and chart/weather codes used throughout the Part 107 study app.
        </p>
      </header>

      <GlossaryClient />
    </div>
  );
}

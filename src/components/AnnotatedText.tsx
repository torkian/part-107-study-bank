import { Fragment, type ReactNode } from "react";
import GlossaryTerm from "@/components/GlossaryTerm";
import { getGlossaryEntry, glossary, type GlossaryEntry } from "@/data/glossary";

type Props = {
  children: string | string[];
};

const numericNeighborTerms = new Set([
  "AGL",
  "MSL",
  "FL",
  "KT",
  "KTS",
  "SM",
  "NM",
  "Z",
  "BKN",
  "OVC",
  "SCT",
  "FEW",
  "VV",
  "FM",
  "WS",
  "SLP",
]);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function caseFlexiblePattern(value: string) {
  return [...value]
    .map((char) => {
      const lower = char.toLowerCase();
      const upper = char.toUpperCase();
      if (lower !== upper) return `[${escapeRegExp(lower)}${escapeRegExp(upper)}]`;
      return escapeRegExp(char);
    })
    .join("");
}

function entryPattern(entry: GlossaryEntry) {
  return entry.caseInsensitive ? caseFlexiblePattern(entry.term) : escapeRegExp(entry.term);
}

function byLongestTerm(a: GlossaryEntry, b: GlossaryEntry) {
  return b.term.length - a.term.length || a.term.localeCompare(b.term);
}

const numericNeighborPattern = glossary
  .filter((entry) => numericNeighborTerms.has(entry.term))
  .sort(byLongestTerm)
  .map(entryPattern)
  .join("|");

const strictPattern = glossary
  .filter((entry) => !numericNeighborTerms.has(entry.term))
  .sort(byLongestTerm)
  .map(entryPattern)
  .join("|");

const glossaryRegex = new RegExp(
  [
    numericNeighborPattern ? `(^|[^A-Za-z-])(${numericNeighborPattern})(?![A-Za-z-])` : "",
    strictPattern ? `(^|[^A-Za-z0-9-])(${strictPattern})(?![A-Za-z0-9-])` : "",
  ]
    .filter(Boolean)
    .join("|"),
  "g",
);

function annotateString(text: string, keyPrefix: string): ReactNode[] {
  glossaryRegex.lastIndex = 0;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = glossaryRegex.exec(text)) !== null) {
    const prefix = match[1] ?? match[3] ?? "";
    const matchedText = match[2] ?? match[4] ?? "";
    const start = match.index + prefix.length;
    const end = start + matchedText.length;
    const entry = getGlossaryEntry(matchedText);

    if (!entry) continue;

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (prefix) {
      nodes.push(prefix);
    }

    nodes.push(
      <GlossaryTerm key={`${keyPrefix}-${start}-${matchedText}`} term={entry.term}>
        {matchedText}
      </GlossaryTerm>,
    );
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export default function AnnotatedText({ children }: Props) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>{annotateString(item, String(index))}</Fragment>
      ))}
    </>
  );
}

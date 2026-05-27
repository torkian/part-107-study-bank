"use client";

import { useMemo, useState } from "react";
import { glossary, glossaryCategories, glossarySlug, type GlossaryCategory, type GlossaryEntry } from "@/data/glossary";

const categoryLabels: Record<GlossaryCategory, string> = {
  altitude: "Altitude",
  airspace: "Airspace",
  weather: "Weather",
  regulations: "Regulations",
  operations: "Operations",
  physiology: "Physiology",
  navigation: "Navigation",
  lighting: "Lighting",
  general: "General",
};

function matchesQuery(entry: GlossaryEntry, query: string) {
  if (!query) return true;
  const haystack = `${entry.term} ${entry.full} ${entry.definition} ${entry.category}`.toLowerCase();
  return haystack.includes(query);
}

export default function GlossaryClient() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(
    () => glossary.filter((entry) => matchesQuery(entry, normalizedQuery)),
    [normalizedQuery],
  );

  const grouped = useMemo(() => {
    const next = new Map<GlossaryCategory, GlossaryEntry[]>();
    for (const category of glossaryCategories) next.set(category, []);
    for (const entry of filtered) {
      next.get(entry.category)?.push(entry);
    }
    return next;
  }, [filtered]);

  return (
    <>
      <div className="glossary-search card">
        <label className="glossary-search-label" htmlFor="glossary-search">
          Search glossary
        </label>
        <input
          id="glossary-search"
          className="glossary-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search terms, expansions, or definitions"
          autoComplete="off"
        />
        <div className="glossary-search-count" aria-live="polite">
          {filtered.length} of {glossary.length} terms
        </div>
      </div>

      <nav className="glossary-category-nav" aria-label="Glossary categories">
        {glossaryCategories.map((category) => {
          const count = grouped.get(category)?.length ?? 0;
          if (count === 0) return null;
          return (
            <a key={category} href={`#glossary-${category}`} className="glossary-category-link">
              {categoryLabels[category]}
            </a>
          );
        })}
      </nav>

      <div className="glossary-groups">
        {glossaryCategories.map((category) => {
          const entries = grouped.get(category) ?? [];
          if (entries.length === 0) return null;

          return (
            <section key={category} id={`glossary-${category}`} className="glossary-category-section">
              <h2 className="glossary-category-title">
                <span>{categoryLabels[category]}</span>
                <span>{entries.length}</span>
              </h2>
              <div className="glossary-entry-list">
                {entries.map((entry) => {
                  const slug = glossarySlug(entry.term);
                  return (
                    <article key={entry.term} id={slug} className="glossary-entry card">
                      <div className="glossary-entry-heading">
                        <h3>{entry.term}</h3>
                        <a href={`#${slug}`} className="glossary-entry-anchor" aria-label={`Link to ${entry.term}`}>
                          #
                        </a>
                      </div>
                      <div className="glossary-entry-full">{entry.full}</div>
                      <p className="glossary-entry-definition">{entry.definition}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

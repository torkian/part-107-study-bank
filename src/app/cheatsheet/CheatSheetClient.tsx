"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import AnnotatedText from "@/components/AnnotatedText";
import { AppIcon } from "@/components/AppIcon";
import CheatPlaylistBar, { type PlaylistTrack } from "@/components/CheatPlaylistBar";
import { cheatSectionText } from "@/lib/audio-text";

export type Row = { label: string; value: string; detail?: string };
export type Section = { title: string; rows: Row[] };

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CheatSheetClient({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = useMemo<PlaylistTrack[]>(
    () =>
      sections.map((s) => ({
        title: s.title,
        text: cheatSectionText(s),
        slug: slugify(s.title),
      })),
    [sections],
  );

  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handlePlaylistChange(index: number | null, playing: boolean) {
    setCurrentIndex(index);
    setIsPlaying(playing);
  }

  function handleSectionPlay(i: number) {
    if (currentIndex === i) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentIndex(i);
      setIsPlaying(true);
    }
  }

  return (
    <>
      <CheatPlaylistBar
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onChange={handlePlaylistChange}
      />

      {sections.map((section, i) => {
        const isActive = currentIndex === i;
        const isActivePlaying = isActive && isPlaying;
        return (
          <section
            id={slugify(section.title)}
            key={section.title}
            className={`cheat-section${isActive ? " is-now-playing" : ""}`}
          >
            <div className="cheat-section-head">
              <h2 className="cheat-section-title">{section.title}</h2>
              <button
                type="button"
                className={`cheat-section-play ${isActive ? "is-active" : ""}`}
                onClick={() => handleSectionPlay(i)}
                aria-label={
                  isActivePlaying
                    ? `Pause ${section.title}`
                    : isActive
                      ? `Resume ${section.title}`
                      : `Play playlist from ${section.title}`
                }
                aria-current={isActive ? "true" : undefined}
                title={isActive ? "Now in playlist" : "Play from here, then continue"}
              >
                <AppIcon
                  name={isActivePlaying ? "pause" : "play"}
                  className={isActivePlaying ? undefined : "audio-play-triangle"}
                />
                <span>{isActivePlaying ? "Playing" : isActive ? "Paused" : "Play from here"}</span>
              </button>
            </div>
            <div className="cheat-table-card card">
              <table className="cheat-table">
                <tbody>
                  {section.rows.map((row) => {
                    const key = `${section.title}::${row.label}`;
                    const isOpen = open.has(key);
                    const hasDetail = !!row.detail;
                    return (
                      <RowBlock
                        key={key}
                        row={row}
                        isOpen={isOpen}
                        hasDetail={hasDetail}
                        onToggle={() => hasDetail && toggle(key)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </>
  );
}

function RowBlock({
  row,
  isOpen,
  hasDetail,
  onToggle,
}: {
  row: Row;
  isOpen: boolean;
  hasDetail: boolean;
  onToggle: () => void;
}) {
  function onKeyDown(e: KeyboardEvent<HTMLTableRowElement>) {
    if (!hasDetail) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <>
      <tr
        className={`cheat-row${hasDetail ? " is-expandable" : ""}${isOpen ? " is-open" : ""}`}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        tabIndex={hasDetail ? 0 : undefined}
        aria-expanded={hasDetail ? isOpen : undefined}
      >
        <td className="label">
          <span>{row.label}</span>
          {hasDetail && (
            <span className="cheat-disclosure" aria-hidden="true">
              <AppIcon name="arrowRight" />
            </span>
          )}
        </td>
        <td className="value">
          <AnnotatedText>{row.value}</AnnotatedText>
        </td>
      </tr>
      {hasDetail && isOpen && (
        <tr className="cheat-detail-row">
          <td colSpan={2}>
            <div className="cheat-detail">
              <AnnotatedText>{row.detail ?? ""}</AnnotatedText>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

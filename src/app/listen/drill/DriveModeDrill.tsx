"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import manifestData from "@/data/audio-manifest.json";
import { hashText, week2ScriptText } from "@/lib/audio-text";
import {
  AUDIO_STOP_EVENT,
  broadcastStop,
  loadPrefs,
  PREFS_EVENT,
} from "@/lib/tts";
import type { AudioScript } from "@/data/audio-week2";

type ManifestEntry = { file: string; chars: number; preview?: string };
const MANIFEST = manifestData as Record<string, ManifestEntry>;

type Props = { script: AudioScript };

const SOURCE_ID = "drive-mode-drill";

function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function DriveModeDrill({ script }: Props) {
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(() =>
    typeof window === "undefined" ? 1 : loadPrefs().rate,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const narratedText = week2ScriptText(script);

  useEffect(() => {
    let cancelled = false;
    hashText(narratedText).then((h) => {
      if (cancelled) return;
      const entry = MANIFEST[h];
      setMp3Url(entry ? `/audio/${entry.file}` : null);
    });
    return () => {
      cancelled = true;
    };
  }, [narratedText]);

  // Coordinate with global stop broadcasts from other audio components.
  useEffect(() => {
    const onStop = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      if (detail?.source === SOURCE_ID) return;
      if (audioRef.current) audioRef.current.pause();
      setPlaying(false);
    };
    window.addEventListener(AUDIO_STOP_EVENT, onStop);
    return () => window.removeEventListener(AUDIO_STOP_EVENT, onStop);
  }, []);

  // React to global rate prefs (shared with the rest of the app).
  useEffect(() => {
    const onPrefs = (e: Event) => {
      const d = (e as CustomEvent<{ rate: number }>).detail;
      if (!d) return;
      setRate(d.rate);
      if (audioRef.current) audioRef.current.playbackRate = d.rate;
    };
    window.addEventListener(PREFS_EVENT, onPrefs);
    return () => window.removeEventListener(PREFS_EVENT, onPrefs);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  function ensureAudio(): HTMLAudioElement | null {
    if (!mp3Url) return null;
    if (audioRef.current) return audioRef.current;
    const a = new Audio(mp3Url);
    a.preload = "auto";
    a.playbackRate = rate;
    // loop=true → the audio restarts automatically for drive-mode.
    a.loop = true;
    a.addEventListener("loadedmetadata", () => setDuration(a.duration || 0));
    a.addEventListener("timeupdate", () => setCurrentTime(a.currentTime || 0));
    // With loop=true, "ended" doesn't fire — timeupdate wraps. Detect wrap by
    // watching for a backward jump in currentTime.
    let lastT = 0;
    a.addEventListener("timeupdate", () => {
      const t = a.currentTime;
      if (t + 0.5 < lastT) setLoopCount((n) => n + 1);
      lastT = t;
    });
    a.addEventListener("error", () => setPlaying(false));
    audioRef.current = a;
    return a;
  }

  function handleToggle() {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setPlaying(false);
      return;
    }
    broadcastStop(SOURCE_ID);
    const a = ensureAudio();
    if (!a) return;
    const p = a.play();
    if (p && typeof p.catch === "function") {
      p.then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      setPlaying(true);
    }
  }

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="drive-mode-shell-inner">
      <div className={`drive-mode-hero card ${isPlaying ? "is-playing" : ""}`}>
        <div className="drive-mode-badge">
          <AppIcon name="target" />
          Loops on end
        </div>
        <h2 className="drive-mode-title">{script.title}</h2>
        <p className="drive-mode-summary">{script.summary}</p>

        <div className="drive-mode-controls">
          <button
            type="button"
            className="drive-mode-play"
            onClick={handleToggle}
            disabled={!mp3Url}
            aria-label={isPlaying ? "Pause drill" : "Start drill"}
            aria-pressed={isPlaying}
          >
            <AppIcon
              name={isPlaying ? "pause" : "play"}
              className={isPlaying ? undefined : "audio-play-triangle"}
            />
          </button>
          <div className="drive-mode-clock">
            <span className="drive-mode-clock-time">
              {fmtTime(currentTime)} / {fmtTime(duration)}
            </span>
            <span className="drive-mode-clock-loops" aria-live="polite">
              Loops: <strong>{loopCount}</strong>
            </span>
          </div>
        </div>

        <div
          className="drive-mode-progress"
          role="progressbar"
          aria-label="Drill progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
        >
          <div className="drive-mode-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {!mp3Url && (
          <p className="drive-mode-fallback">HD audio unavailable — refreshing usually helps.</p>
        )}
      </div>

      {script.teachingPoints.length > 0 && (
        <section className="card card-pad drive-mode-points">
          <span className="section-kicker">What&rsquo;s in the loop</span>
          <ul>
            {script.teachingPoints.map((tp) => (
              <li key={tp}>{tp}</li>
            ))}
          </ul>
        </section>
      )}

      {script.faaCitations.length > 0 && (
        <div className="decoder-citations">
          {script.faaCitations.map((c) => (
            <span key={c} className="citation-chip">
              <AppIcon name="book" />
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

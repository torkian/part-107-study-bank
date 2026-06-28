"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import manifestData from "@/data/audio-manifest.json";
import { hashText } from "@/lib/audio-text";
import {
  PREFS_EVENT,
  TtsController,
  isSupported,
  loadPrefs,
  stopAll,
} from "@/lib/tts";

type ManifestEntry = { file: string; chars: number; preview?: string };
const MANIFEST = manifestData as Record<string, ManifestEntry>;

type Props = {
  text: string;
  label?: string;
};

export default function MiniAudioButton({ text, label = "Listen" }: Props) {
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const [preferHd, setPreferHd] = useState(() =>
    typeof window === "undefined" ? true : loadPrefs().preferHd,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctrlRef = useRef<TtsController | null>(null);

  useEffect(() => {
    if (!preferHd) {
      setMp3Url(null);
      return;
    }
    let cancelled = false;
    hashText(text).then((h) => {
      if (cancelled) return;
      const entry = MANIFEST[h];
      setMp3Url(entry ? `/audio/${entry.file}` : null);
    });
    return () => {
      cancelled = true;
    };
  }, [text, preferHd]);

  useEffect(() => {
    const onPrefsChanged = (e: Event) => {
      const detail = (e as CustomEvent<{ preferHd: boolean; rate: number }>).detail;
      if (!detail) return;
      setPreferHd(detail.preferHd);
      if (audioRef.current) audioRef.current.playbackRate = detail.rate;
    };
    window.addEventListener(PREFS_EVENT, onPrefsChanged);
    return () => {
      window.removeEventListener(PREFS_EVENT, onPrefsChanged);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (ctrlRef.current) ctrlRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (ctrlRef.current) {
      ctrlRef.current.stop();
      ctrlRef.current = null;
    }
    setPlaying(false);
  }, [text, mp3Url]);

  function handleToggle() {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (ctrlRef.current) ctrlRef.current.stop();
      setPlaying(false);
      return;
    }
    stopAll();
    if (mp3Url) {
      if (!audioRef.current) {
        const a = new Audio(mp3Url);
        a.preload = "auto";
        a.playbackRate = loadPrefs().rate;
        a.addEventListener("ended", () => setPlaying(false));
        a.addEventListener("pause", () => {
          if (a.currentTime > 0 && a.currentTime < a.duration) setPlaying(false);
        });
        a.addEventListener("error", () => {
          setMp3Url(null);
          setPlaying(false);
        });
        audioRef.current = a;
      }
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    if (!isSupported()) return;
    const prefs = loadPrefs();
    const c = new TtsController(text, { rate: prefs.rate, voiceURI: prefs.voiceURI ?? undefined });
    c.onUpdate((s) => setPlaying(s === "playing"));
    ctrlRef.current = c;
    c.play();
  }

  const isHd = !!mp3Url;

  return (
    <button
      type="button"
      className={`audio-mini ${isHd ? "is-hd" : "is-backup"} ${isPlaying ? "is-playing" : ""}`}
      onClick={handleToggle}
      aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`}
      aria-pressed={isPlaying}
      title={isHd ? "Play HD narration" : "Play (device voice)"}
    >
      <AppIcon name={isPlaying ? "pause" : "play"} className={isPlaying ? undefined : "audio-play-triangle"} />
    </button>
  );
}

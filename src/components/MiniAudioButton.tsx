"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import manifestData from "@/data/audio-manifest.json";
import { hashText } from "@/lib/audio-text";
import {
  AUDIO_STOP_EVENT,
  PREFS_EVENT,
  TtsController,
  broadcastStop,
  isSupported,
  loadPrefs,
} from "@/lib/tts";

type ManifestEntry = { file: string; chars: number; preview?: string };
const MANIFEST = manifestData as Record<string, ManifestEntry>;

type Props = {
  text: string;
  label?: string;
};

// Each instance is identified so we can ignore our own broadcasts.
let instanceCounter = 0;

export default function MiniAudioButton({ text, label = "Listen" }: Props) {
  const instanceId = useRef<string>(`mini-${++instanceCounter}`);
  const [resolvedUrl, setResolvedUrl] = useState<string | null | undefined>(undefined); // undefined = not yet resolved
  const [isPlaying, setPlaying] = useState(false);
  const [preferHd, setPreferHd] = useState(() =>
    typeof window === "undefined" ? true : loadPrefs().preferHd,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctrlRef = useRef<TtsController | null>(null);
  const ctrlUnsubRef = useRef<(() => void) | null>(null);

  // Lazy hash — only resolve on first interaction (don't hash 201 entries at mount).
  const resolveUrl = useCallback(async (): Promise<string | null> => {
    if (resolvedUrl !== undefined) return resolvedUrl;
    if (!preferHd) {
      setResolvedUrl(null);
      return null;
    }
    const h = await hashText(text);
    const entry = MANIFEST[h];
    const url = entry ? `/audio/${entry.file}` : null;
    setResolvedUrl(url);
    return url;
  }, [resolvedUrl, preferHd, text]);

  // Detach TTS listener BEFORE stop(), avoiding the "stop emits idle which
  // triggers a stale callback" race.
  const teardownTts = useCallback(() => {
    if (ctrlUnsubRef.current) {
      ctrlUnsubRef.current();
      ctrlUnsubRef.current = null;
    }
    if (ctrlRef.current) {
      ctrlRef.current.stop();
      ctrlRef.current = null;
    }
  }, []);

  // Listen to global stop broadcasts (other audio components asking us to halt).
  useEffect(() => {
    const myId = instanceId.current;
    const onStop = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      if (detail?.source === myId) return;
      if (audioRef.current) audioRef.current.pause();
      teardownTts();
      setPlaying(false);
    };
    window.addEventListener(AUDIO_STOP_EVENT, onStop);
    return () => window.removeEventListener(AUDIO_STOP_EVENT, onStop);
  }, [teardownTts]);

  // Listen for HD-preference flips so the button can swap modes mid-session.
  useEffect(() => {
    const onPrefs = (e: Event) => {
      const d = (e as CustomEvent<{ preferHd: boolean; rate: number }>).detail;
      if (!d) return;
      setPreferHd(d.preferHd);
      if (audioRef.current) audioRef.current.playbackRate = d.rate;
      // Force re-resolution next time
      if (d.preferHd !== preferHd) setResolvedUrl(undefined);
    };
    window.addEventListener(PREFS_EVENT, onPrefs);
    return () => window.removeEventListener(PREFS_EVENT, onPrefs);
  }, [preferHd]);

  // If the source text changes, reset.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    teardownTts();
    setPlaying(false);
    setResolvedUrl(undefined);
  }, [text, teardownTts]);

  // Clean up on unmount.
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      teardownTts();
    };
  }, [teardownTts]);

  async function handleToggle() {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      teardownTts();
      setPlaying(false);
      return;
    }

    // Tell everyone else to stop (excluding ourselves).
    broadcastStop(instanceId.current);

    const url = await resolveUrl();

    if (url) {
      if (!audioRef.current) {
        const a = new Audio(url);
        a.preload = "auto";
        a.playbackRate = loadPrefs().rate;
        a.addEventListener("ended", () => setPlaying(false));
        a.addEventListener("pause", () => {
          if (a.currentTime > 0 && a.currentTime < a.duration) setPlaying(false);
        });
        a.addEventListener("error", () => {
          setResolvedUrl(null);
          setPlaying(false);
        });
        audioRef.current = a;
      } else if (audioRef.current.src.indexOf(url) === -1) {
        audioRef.current.src = url;
      }
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise
          .then(() => setPlaying(true))
          .catch((err: unknown) => {
            const name = (err as { name?: string })?.name;
            if (name === "AbortError") return;
            setPlaying(false);
          });
      } else {
        setPlaying(true);
      }
      return;
    }

    if (!isSupported()) return;
    const prefs = loadPrefs();
    const c = new TtsController(text, { rate: prefs.rate, voiceURI: prefs.voiceURI ?? undefined });
    let started = false;
    const unsub = c.onUpdate((s) => {
      if (s === "playing") {
        started = true;
        setPlaying(true);
      } else if (s === "paused") {
        setPlaying(false);
      } else if (s === "idle") {
        // Detach before declaring done so a subsequent teardown stop() can't reschedule.
        if (ctrlUnsubRef.current === unsub) {
          ctrlUnsubRef.current = null;
          unsub();
        }
        if (started) setPlaying(false);
      }
    });
    ctrlUnsubRef.current = unsub;
    ctrlRef.current = c;
    c.play();
  }

  const isHd = resolvedUrl !== null && resolvedUrl !== undefined;
  const isUnresolved = resolvedUrl === undefined;

  return (
    <button
      type="button"
      className={`audio-mini ${isHd ? "is-hd" : isUnresolved ? "is-pending" : "is-backup"} ${isPlaying ? "is-playing" : ""}`}
      onClick={handleToggle}
      aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`}
      aria-pressed={isPlaying}
      title={
        isUnresolved
          ? `Play ${label}`
          : isHd
            ? "Play HD narration"
            : "Play (device voice)"
      }
    >
      <AppIcon name={isPlaying ? "pause" : "play"} className={isPlaying ? undefined : "audio-play-triangle"} />
    </button>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import {
  TtsController,
  type TtsState,
  isSupported,
  loadPrefs,
  savePrefs,
  stopAll,
  whenVoicesReady,
} from "@/lib/tts";

type Props = {
  text: string;
  label?: string;
  size?: "sm" | "md";
  showSpeed?: boolean;
};

export default function AudioPlayer({ text, label = "Listen", size = "md", showSpeed = true }: Props) {
  const [state, setState] = useState<TtsState>("idle");
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const ctrlRef = useRef<TtsController | null>(null);

  useEffect(() => {
    if (!isSupported()) {
      setSupported(false);
      return;
    }
    const prefs = loadPrefs();
    setRate(prefs.rate);
    whenVoicesReady().catch(() => {});
    return () => {
      if (ctrlRef.current) ctrlRef.current.stop();
    };
  }, []);

  useEffect(() => {
    // text changed → cancel old controller
    if (ctrlRef.current) ctrlRef.current.stop();
    ctrlRef.current = null;
    setState("idle");
    setProgress(0);
  }, [text]);

  function ensureController(): TtsController {
    if (!ctrlRef.current) {
      const prefs = loadPrefs();
      ctrlRef.current = new TtsController(text, {
        rate: prefs.rate,
        voiceURI: prefs.voiceURI ?? undefined,
      });
      ctrlRef.current.onUpdate((s, p) => {
        setState(s);
        setProgress(p);
      });
    }
    return ctrlRef.current;
  }

  function handlePlayPause() {
    stopAll(); // stop any other audio first
    const c = ensureController();
    if (state === "playing") c.pause();
    else c.play();
  }

  function handleStop() {
    if (ctrlRef.current) ctrlRef.current.stop();
  }

  function handleRate(newRate: number) {
    setRate(newRate);
    savePrefs({ rate: newRate });
    if (ctrlRef.current) {
      const wasPlaying = ctrlRef.current.isPlaying();
      ctrlRef.current.stop();
      ctrlRef.current = null;
      if (wasPlaying) {
        const c = ensureController();
        c.play();
      }
    }
  }

  if (!supported) {
    return (
      <div className="audio-player audio-player-unsupported" role="note">
        <AppIcon name="alert" />
        Audio not supported on this browser. Try Chrome or Safari.
      </div>
    );
  }

  return (
    <div className={`audio-player audio-player-${size}`} aria-label={`Audio: ${label}`}>
      <button
        type="button"
        className="audio-play-btn"
        onClick={handlePlayPause}
        aria-label={state === "playing" ? "Pause audio" : "Play audio"}
        aria-pressed={state === "playing"}
      >
        {state === "playing" ? <AppIcon name="pause" /> : <AppIcon name="play" />}
        <span className="audio-play-label">{state === "playing" ? "Pause" : label}</span>
      </button>
      {state !== "idle" && (
        <button
          type="button"
          className="audio-stop-btn"
          onClick={handleStop}
          aria-label="Stop audio"
        >
          <AppIcon name="x" />
        </button>
      )}
      {showSpeed && (
        <div className="audio-speed" role="group" aria-label="Playback speed">
          {[0.75, 1, 1.25, 1.5, 2].map((r) => (
            <button
              type="button"
              key={r}
              className={`audio-speed-btn${rate === r ? " is-active" : ""}`}
              onClick={() => handleRate(r)}
              aria-label={`${r}× speed`}
              aria-pressed={rate === r}
            >
              {r}×
            </button>
          ))}
        </div>
      )}
      {state !== "idle" && (
        <div className="audio-progress" aria-hidden="true">
          <div style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  );
}

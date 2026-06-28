"use client";

import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { AppIcon } from "@/components/AppIcon";
import manifestData from "@/data/audio-manifest.json";
import { hashText } from "@/lib/audio-text";
import {
  PREFS_EVENT,
  TtsController,
  type TtsState,
  isSupported,
  loadPrefs,
  savePrefs,
  stopAll,
  whenVoicesReady,
} from "@/lib/tts";

type ManifestEntry = { file: string; chars: number; preview?: string };
const MANIFEST = manifestData as Record<string, ManifestEntry>;

const SPEED_CYCLE = [1, 1.25, 1.5, 2, 0.75];

type Props = {
  text: string;
  label?: string;
  size?: "sm" | "md";
  showSpeed?: boolean;
  /**
   * Optional: bypass the manifest hash lookup and use this MP3 directly.
   * Use when the caller already knows which HD file should play (e.g. the
   * /listen page sample) — protects against text drift orphaning the
   * sample.
   */
  directMp3Url?: string;
};

type AudioProgressStyle = CSSProperties & {
  "--audio-progress": string;
};

function fmtTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function fmtRate(value: number): string {
  return Number.isInteger(value) ? value.toFixed(0) : String(value);
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export default function AudioPlayer({
  text,
  label = "Listen",
  size = "md",
  showSpeed = true,
  directMp3Url,
}: Props) {
  const [state, setState] = useState<TtsState>("idle");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(true);
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [preferHd, setPreferHd] = useState(() =>
    typeof window === "undefined" ? true : loadPrefs().preferHd,
  );
  const ctrlRef = useRef<TtsController | null>(null);
  const currentVoiceRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isHd = !!mp3Url;
  const canSeek = isHd && duration > 0;
  const isPlaying = state === "playing";
  const canStop = state !== "idle";

  // Hash text and check the manifest for a matching MP3.
  // Direct URL override (e.g. the Listen page sample) skips the lookup.
  useEffect(() => {
    if (directMp3Url) {
      setMp3Url(preferHd ? directMp3Url : null);
      return;
    }
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
  }, [text, preferHd, directMp3Url]);

  useEffect(() => {
    if (!isSupported() && !mp3Url) {
      setSupported(false);
      return;
    }
    setSupported(true);
    const prefs = loadPrefs();
    setRate(prefs.rate);
    setPreferHd(prefs.preferHd);
    currentVoiceRef.current = prefs.voiceURI;
    whenVoicesReady().catch(() => {});

    const onPrefsChanged = (e: Event) => {
      const detail = (e as CustomEvent<{ rate: number; voiceURI: string | null; preferHd: boolean }>).detail;
      if (!detail) return;
      setRate(detail.rate);
      setPreferHd(detail.preferHd);
      if (audioRef.current) audioRef.current.playbackRate = detail.rate;
      if (detail.voiceURI !== currentVoiceRef.current) {
        currentVoiceRef.current = detail.voiceURI;
        if (ctrlRef.current) {
          const wasPlaying = ctrlRef.current.isPlaying();
          ctrlRef.current.stop();
          ctrlRef.current = null;
          if (wasPlaying) buildController().play();
        }
      }
    };
    window.addEventListener(PREFS_EVENT, onPrefsChanged);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "p107.tts.v1" && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          setRate(fresh.rate);
          setPreferHd(fresh.preferHd ?? true);
          currentVoiceRef.current = fresh.voiceURI ?? null;
          if (audioRef.current) audioRef.current.playbackRate = fresh.rate;
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(PREFS_EVENT, onPrefsChanged);
      window.removeEventListener("storage", onStorage);
      if (ctrlRef.current) ctrlRef.current.stop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [mp3Url, preferHd]);

  useEffect(() => {
    if (ctrlRef.current) ctrlRef.current.stop();
    ctrlRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState("idle");
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [text, mp3Url]);

  function buildController(): TtsController {
    const prefs = loadPrefs();
    currentVoiceRef.current = prefs.voiceURI;
    const c = new TtsController(text, {
      rate: prefs.rate,
      voiceURI: prefs.voiceURI ?? undefined,
    });
    c.onUpdate((s, p) => {
      setState(s);
      setProgress(p);
    });
    ctrlRef.current = c;
    return c;
  }

  function ensureController(): TtsController {
    const prefs = loadPrefs();
    if (!ctrlRef.current || prefs.voiceURI !== currentVoiceRef.current) {
      if (ctrlRef.current) ctrlRef.current.stop();
      return buildController();
    }
    return ctrlRef.current;
  }

  function ensureAudio(): HTMLAudioElement | null {
    if (!mp3Url) return null;
    if (audioRef.current) return audioRef.current;
    const a = new Audio(mp3Url);
    a.preload = "auto";
    a.playbackRate = rate;
    a.addEventListener("loadedmetadata", () => setDuration(a.duration || 0));
    a.addEventListener("durationchange", () => setDuration(a.duration || 0));
    a.addEventListener("timeupdate", () => {
      setCurrentTime(a.currentTime || 0);
      if (a.duration > 0) setProgress(a.currentTime / a.duration);
    });
    a.addEventListener("ended", () => {
      setState("idle");
      setProgress(0);
      setCurrentTime(0);
    });
    a.addEventListener("play", () => setState("playing"));
    a.addEventListener("pause", () => {
      if (a.currentTime > 0 && a.currentTime < a.duration) setState("paused");
    });
    a.addEventListener("error", () => {
      setMp3Url(null);
      setState("idle");
    });
    audioRef.current = a;
    return a;
  }

  function handlePlayPause() {
    if (mp3Url) {
      stopAll();
      const a = ensureAudio();
      if (!a) return;
      if (state === "playing") a.pause();
      else a.play().catch(() => setState("idle"));
      return;
    }

    const c = ensureController();
    if (state === "playing") c.pause();
    else c.play();
  }

  function handleStop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState("idle");
    setProgress(0);
    setCurrentTime(0);
    if (ctrlRef.current) ctrlRef.current.stop();
  }

  function skip(deltaSeconds: number) {
    if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
      const a = audioRef.current;
      const next = Math.max(0, Math.min(a.duration, a.currentTime + deltaSeconds));
      a.currentTime = next;
      setCurrentTime(next);
      if (a.duration > 0) setProgress(next / a.duration);
    }
  }

  function seekToFraction(fraction: number) {
    if (!audioRef.current || !Number.isFinite(audioRef.current.duration)) return;
    const a = audioRef.current;
    const next = Math.max(0, Math.min(a.duration, fraction * a.duration));
    a.currentTime = next;
    setCurrentTime(next);
    setProgress(next / a.duration);
  }

  function onSeekChange(e: ChangeEvent<HTMLInputElement>) {
    if (!canSeek) return;
    seekToFraction(Number(e.currentTarget.value) / 100);
  }

  function cycleSpeed() {
    const i = SPEED_CYCLE.indexOf(rate);
    const next = SPEED_CYCLE[(i + 1) % SPEED_CYCLE.length];
    setRate(next);
    savePrefs({ rate: next });
    if (audioRef.current) audioRef.current.playbackRate = next;
    if (ctrlRef.current) {
      const wasPlaying = ctrlRef.current.isPlaying();
      ctrlRef.current.stop();
      ctrlRef.current = null;
      if (wasPlaying) buildController().play();
    }
  }

  if (!supported) {
    return (
      <div className={`audio-player audio-player-${size} audio-unsupported`} role="note">
        <AppIcon name="alert" />
        <span>Audio not supported on this browser.</span>
      </div>
    );
  }

  const progressPercent = clampPercent(progress * 100);
  const progressStyle: AudioProgressStyle = { "--audio-progress": `${progressPercent}%` };
  const totalDisplay = duration > 0 ? fmtTime(duration) : "0:00";
  const rateDisplay = fmtRate(rate);
  const playerClassName = ["audio-player", `audio-player-${size}`, isHd ? "is-hd" : "is-backup"].join(" ");

  return (
    <div className={playerClassName} aria-label={`Audio: ${label}`}>
      <div className="audio-controls-row">
        <div className="audio-control-group audio-control-group-left">
          <button
            type="button"
            className="audio-skip"
            onClick={() => skip(-15)}
            disabled={!canSeek}
            aria-label="Skip back 15 seconds"
          >
            <AppIcon name="skipBack15" />
          </button>

          <button
            type="button"
            className="audio-play"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            aria-pressed={isPlaying}
          >
            <AppIcon name={isPlaying ? "pause" : "play"} className={isPlaying ? undefined : "audio-play-triangle"} />
          </button>

          <button
            type="button"
            className="audio-skip"
            onClick={() => skip(15)}
            disabled={!canSeek}
            aria-label="Skip forward 15 seconds"
          >
            <AppIcon name="skipForward15" />
          </button>
        </div>

        <div className="audio-title">
          <span className="audio-label">{label}</span>
        </div>

        <div className="audio-control-group audio-control-group-right">
          {isHd && (
            <span
              className="audio-hd-pill"
              title="Studio-quality audio recorded by a professional voice artist"
              aria-label="HD studio narration"
            >
              HD
            </span>
          )}

          {showSpeed && (
            <button
              type="button"
              className="audio-speed-toggle"
              onClick={cycleSpeed}
              aria-label={`Playback speed ${rateDisplay}x, tap to cycle`}
              title="Tap to cycle playback speed"
            >
              {rateDisplay}×
            </button>
          )}

          <button
            type="button"
            className={`audio-stop${canStop ? "" : " is-hidden"}`}
            onClick={handleStop}
            disabled={!canStop}
            tabIndex={canStop ? undefined : -1}
            aria-hidden={!canStop}
            aria-label="Stop audio and reset"
          >
            <AppIcon name="x" />
          </button>
        </div>
      </div>

      <div className="audio-timeline-row">
        {isHd ? (
          <span className="audio-time audio-time-start">{fmtTime(currentTime)}</span>
        ) : (
          <span className="audio-backup-caption">Backup voice · your device</span>
        )}

        <input
          className="audio-seek"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent}
          onChange={onSeekChange}
          disabled={!canSeek}
          style={progressStyle}
          aria-label={isHd ? "Seek playback position" : "Backup voice progress"}
          aria-valuetext={isHd ? `${fmtTime(currentTime)} of ${totalDisplay}` : "Backup voice on your device"}
        />

        {isHd && <span className="audio-time audio-time-end">{totalDisplay}</span>}
      </div>
    </div>
  );
}

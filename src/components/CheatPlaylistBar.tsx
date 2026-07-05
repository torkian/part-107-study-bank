"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  savePrefs,
} from "@/lib/tts";

type ManifestEntry = { file: string; chars: number; preview?: string };
const MANIFEST = manifestData as Record<string, ManifestEntry>;

const SPEED_CYCLE = [1, 1.25, 1.5, 2, 0.75];
const SOURCE_ID = "cheat-playlist";

export type PlaylistTrack = { title: string; text: string; slug: string };

type Props = {
  tracks: PlaylistTrack[];
  currentIndex: number | null;
  isPlaying: boolean;
  onChange: (index: number | null, playing: boolean) => void;
};

type ProgressStyle = CSSProperties & { "--audio-progress": string };

function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CheatPlaylistBar({ tracks, currentIndex, isPlaying, onChange }: Props) {
  // Single HTMLAudioElement reused across tracks. Created on first play.
  // Reusing it across the playlist preserves iOS Safari's "unlocked" state
  // and dramatically reduces listener churn.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctrlRef = useRef<TtsController | null>(null);
  const ctrlUnsubRef = useRef<(() => void) | null>(null);

  // Refs that always hold the latest values so listeners attached once stay fresh.
  const currentIndexRef = useRef(currentIndex);
  const isPlayingRef = useRef(isPlaying);
  const tracksRef = useRef(tracks);
  const onChangeRef = useRef(onChange);
  const trackIdRef = useRef(0);
  const isScrubbingRef = useRef(false);

  const [mp3Map, setMp3Map] = useState<Record<number, string | null>>({});
  const [manifestReady, setManifestReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const [rate, setRate] = useState(() =>
    typeof window === "undefined" ? 1 : loadPrefs().rate,
  );
  const [hdCount, setHdCount] = useState(0);
  const [announce, setAnnounce] = useState("");

  // Keep refs in sync with props/state.
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { tracksRef.current = tracks; }, [tracks]);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Resolve manifest entries for every track up front.
  useEffect(() => {
    let cancelled = false;
    setManifestReady(false);
    Promise.all(tracks.map((t) => hashText(t.text))).then((hashes) => {
      if (cancelled) return;
      const map: Record<number, string | null> = {};
      let hd = 0;
      hashes.forEach((h, i) => {
        const entry = MANIFEST[h];
        map[i] = entry ? `/audio/${entry.file}` : null;
        if (entry) hd++;
      });
      setMp3Map(map);
      setHdCount(hd);
      setManifestReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [tracks]);

  // Lazy-construct the HTMLAudioElement on first need, attaching listeners ONCE.
  const ensureAudio = useCallback((): HTMLAudioElement => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio();
    a.preload = "auto";
    a.playbackRate = rate;
    a.addEventListener("loadedmetadata", () => setDuration(a.duration || 0));
    a.addEventListener("durationchange", () => setDuration(a.duration || 0));
    a.addEventListener("timeupdate", () => {
      if (!isScrubbingRef.current) setCurrentTime(a.currentTime || 0);
    });
    a.addEventListener("ended", () => {
      const i = currentIndexRef.current;
      if (i === null) return;
      const next = i + 1;
      if (next < tracksRef.current.length) onChangeRef.current(next, true);
      else onChangeRef.current(null, false);
    });
    a.addEventListener("error", () => {
      // Genuine media error: drop out of playback.
      onChangeRef.current(null, false);
    });
    audioRef.current = a;
    return a;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tear down any active TTS controller cleanly: detach the onUpdate listener
  // FIRST so the stop()-emitted "idle" never triggers auto-advance.
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

  // PREFS sync — keep rate in step with the global prefs change event.
  useEffect(() => {
    const onPrefs = (e: Event) => {
      const d = (e as CustomEvent<{ rate: number }>).detail;
      if (!d) return;
      setRate(d.rate);
      if (audioRef.current) audioRef.current.playbackRate = d.rate;
      // If the Web Speech fallback is mid-playback, restart it at the new rate.
      if (ctrlRef.current && ctrlRef.current.isPlaying()) {
        const idx = currentIndexRef.current;
        if (idx !== null) {
          const wasPlaying = isPlayingRef.current;
          teardownTts();
          const track = tracksRef.current[idx];
          if (track) {
            const prefs = loadPrefs();
            const c = new TtsController(track.text, {
              rate: prefs.rate,
              voiceURI: prefs.voiceURI ?? undefined,
            });
            attachTtsListener(c, idx);
            ctrlRef.current = c;
            if (wasPlaying) c.play();
          }
        }
      }
    };
    window.addEventListener(PREFS_EVENT, onPrefs);
    return () => window.removeEventListener(PREFS_EVENT, onPrefs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teardownTts]);

  // Listen for global stop broadcasts from other audio sources (MiniAudioButton, AudioPlayer)
  useEffect(() => {
    const onStop = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      if (detail?.source === SOURCE_ID) return; // ignore our own broadcasts
      if (audioRef.current) audioRef.current.pause();
      teardownTts();
      if (currentIndexRef.current !== null) onChangeRef.current(null, false);
    };
    window.addEventListener(AUDIO_STOP_EVENT, onStop);
    return () => window.removeEventListener(AUDIO_STOP_EVENT, onStop);
  }, [teardownTts]);

  // Attach the onUpdate listener for a TTS controller in a way that:
  //   - captures the unsubscribe so we can detach before stop()
  //   - checks trackId to ignore listeners from stale tracks
  function attachTtsListener(c: TtsController, indexForThisTrack: number) {
    const myTrackId = trackIdRef.current;
    let started = false;
    const unsub = c.onUpdate((s) => {
      if (trackIdRef.current !== myTrackId) return;
      if (s === "playing") started = true;
      if (started && s === "idle") {
        // Natural end — detach ourselves so stop() in teardown can't double-fire,
        // then advance.
        if (ctrlUnsubRef.current === unsub) ctrlUnsubRef.current = null;
        unsub();
        const next = indexForThisTrack + 1;
        if (next < tracksRef.current.length) onChangeRef.current(next, true);
        else onChangeRef.current(null, false);
      }
    });
    ctrlUnsubRef.current = unsub;
  }

  // Main playback effect: respond to currentIndex / mp3Map / isPlaying changes.
  useEffect(() => {
    // Bump trackId so any in-flight async callbacks for the previous track no-op.
    const myTrackId = ++trackIdRef.current;

    // Always tear down TTS cleanly (detach listener first).
    teardownTts();

    // Reset timeline when track changes.
    setCurrentTime(0);
    setDuration(0);

    if (currentIndex === null) {
      if (audioRef.current) audioRef.current.pause();
      setAnnounce("Playlist stopped");
      return;
    }

    const track = tracks[currentIndex];
    if (!track) return;

    // Wait for manifest lookup before deciding HD vs fallback (avoid wrong-path race).
    if (!manifestReady) return;

    const url = mp3Map[currentIndex];
    setAnnounce(`Now playing section ${currentIndex + 1} of ${tracks.length}: ${track.title}`);

    if (url) {
      // Tell other audio components to stop, but don't echo to ourselves.
      broadcastStop(SOURCE_ID);
      const a = ensureAudio();
      // Only swap src if it actually changed (avoids unnecessary loadstart).
      if (a.src.indexOf(url) === -1) a.src = url;
      a.playbackRate = rate;
      if (isPlaying) {
        const playPromise = a.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((err: unknown) => {
            // AbortError fires when src changes while play() is pending — ignore.
            const name = (err as { name?: string })?.name;
            if (name === "AbortError" || name === "NotAllowedError") return;
            // Stale track or already moved on — don't clobber state.
            if (trackIdRef.current !== myTrackId) return;
            onChangeRef.current(currentIndex, false);
          });
        }
      } else {
        a.pause();
      }
    } else if (isSupported()) {
      broadcastStop(SOURCE_ID);
      const prefs = loadPrefs();
      const c = new TtsController(track.text, {
        rate: prefs.rate,
        voiceURI: prefs.voiceURI ?? undefined,
      });
      attachTtsListener(c, currentIndex);
      ctrlRef.current = c;
      if (isPlaying) c.play();
    } else {
      onChange(null, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, mp3Map, manifestReady]);

  // Respond to play/pause toggles WITHOUT re-creating the audio element.
  useEffect(() => {
    if (currentIndex === null) return;
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        const p = audioRef.current.play();
        if (p && typeof p.catch === "function") {
          p.catch((err: unknown) => {
            const name = (err as { name?: string })?.name;
            if (name === "AbortError") return;
            onChangeRef.current(currentIndex, false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
    if (ctrlRef.current) {
      if (isPlaying) ctrlRef.current.play();
      else ctrlRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Auto-scroll to the active section — respecting prefers-reduced-motion and
  // making the "is it already visible?" check account for the sticky bar.
  useEffect(() => {
    if (currentIndex === null) return;
    const slug = tracks[currentIndex]?.slug;
    if (!slug) return;
    const el = document.getElementById(slug);
    if (!el) return;
    // Compute the actual sticky offset from CSS so the threshold survives style changes.
    const reduce = prefersReducedMotion();
    const stickyOffset = 140; // site header (~68) + playlist bar (~64) + gutter
    const rect = el.getBoundingClientRect();
    const outOfView = rect.top < stickyOffset || rect.top > window.innerHeight - 120;
    if (outOfView) {
      // scroll-margin-top on .cheat-section keeps the heading clear of the bar.
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [currentIndex, tracks]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      teardownTts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePlayAll() {
    if (currentIndex === null) onChange(0, true);
    else onChange(currentIndex, !isPlaying);
  }

  function handleStop() {
    onChange(null, false);
  }

  function handlePrev() {
    if (currentIndex === null) return;
    const prev = Math.max(0, currentIndex - 1);
    onChange(prev, true);
  }

  function handleNext() {
    if (currentIndex === null) return;
    const next = currentIndex + 1;
    if (next < tracks.length) onChange(next, true);
    else onChange(null, false);
  }

  function cycleSpeed() {
    const i = SPEED_CYCLE.indexOf(rate);
    const next = SPEED_CYCLE[(i + 1) % SPEED_CYCLE.length];
    setRate(next);
    savePrefs({ rate: next });
    if (audioRef.current) audioRef.current.playbackRate = next;
  }

  function onSeekChange(e: ChangeEvent<HTMLInputElement>) {
    const pct = Number(e.currentTarget.value);
    setScrubValue(pct);
    if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
      // Update preview while scrubbing — commit on pointer up.
      const time = (pct / 100) * audioRef.current.duration;
      setCurrentTime(time);
    }
  }

  function commitSeek() {
    if (!audioRef.current || !Number.isFinite(audioRef.current.duration)) return;
    audioRef.current.currentTime = (scrubValue / 100) * audioRef.current.duration;
  }

  function onScrubStart(_e: ReactPointerEvent<HTMLInputElement>) {
    isScrubbingRef.current = true;
    setIsScrubbing(true);
  }

  function onScrubEnd(_e: ReactPointerEvent<HTMLInputElement>) {
    commitSeek();
    isScrubbingRef.current = false;
    setIsScrubbing(false);
  }

  const active = currentIndex !== null ? tracks[currentIndex] : null;
  const total = tracks.length;
  const liveProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progress = isScrubbing ? scrubValue : liveProgress;
  const progressStyle: ProgressStyle = { "--audio-progress": `${progress}%` };
  const canSeek = !!audioRef.current && duration > 0 && !!active;
  const rateLabel = Number.isInteger(rate) ? rate.toFixed(0) : String(rate);

  const playLabel = isPlaying
    ? "Pause playlist"
    : currentIndex === null
      ? "Play all sections in order"
      : `Resume playlist at ${tracks[currentIndex].title}`;

  const seekValueText = active
    ? `${fmtTime(currentTime)} of ${fmtTime(duration)}`
    : "No track selected";

  // Show partial coverage in the HD chip when it's not 100%.
  const hdChipLabel = useMemo(() => {
    if (hdCount === 0) return null;
    if (hdCount === total) return "HD";
    return `HD ${hdCount}/${total}`;
  }, [hdCount, total]);

  return (
    <section
      role="region"
      aria-label="Cheat sheet audio playlist"
      className={`cheat-playlist ${active ? "is-active" : ""} ${isPlaying ? "is-playing" : ""}`}
    >
      {/* Visually hidden live region so screen readers hear track changes */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </span>

      <div className="cheat-playlist-main">
        <button
          type="button"
          className="cheat-playlist-play"
          onClick={handlePlayAll}
          aria-label={playLabel}
        >
          <AppIcon
            name={isPlaying ? "pause" : "play"}
            className={isPlaying ? undefined : "audio-play-triangle"}
          />
        </button>

        <div className="cheat-playlist-info">
          <div className="cheat-playlist-eyebrow">
            {active ? `Now playing · ${currentIndex! + 1} of ${total}` : "Audio playlist"}
            {hdChipLabel && (
              <span
                className="cheat-playlist-hd-tag"
                title="Studio-recorded narration. Falls back to device voice where unavailable."
                aria-label={
                  hdCount === total
                    ? "All sections are studio-recorded HD"
                    : `${hdCount} of ${total} sections are studio-recorded HD`
                }
              >
                {hdChipLabel}
              </span>
            )}
          </div>
          <div className="cheat-playlist-title">
            {active ? active.title : `Play every section back to back · ${total} sections`}
          </div>
        </div>

        <div className="cheat-playlist-controls" role="group" aria-label="Playlist controls">
          <button
            type="button"
            className="cheat-playlist-btn cheat-playlist-prev"
            onClick={handlePrev}
            disabled={currentIndex === null || currentIndex === 0}
            aria-label="Previous section"
            title="Previous section"
          >
            <AppIcon name="arrowRight" />
          </button>
          <button
            type="button"
            className="cheat-playlist-btn"
            onClick={handleNext}
            disabled={currentIndex === null || currentIndex >= total - 1}
            aria-label="Next section"
            title="Next section"
          >
            <AppIcon name="arrowRight" />
          </button>
          <button
            type="button"
            className="cheat-playlist-btn cheat-playlist-speed"
            onClick={cycleSpeed}
            aria-label={`Playback speed ${rateLabel}× — tap to cycle`}
            title="Cycle playback speed"
          >
            {rateLabel}×
          </button>
          <button
            type="button"
            className="cheat-playlist-btn"
            onClick={handleStop}
            disabled={currentIndex === null}
            aria-label="Stop playlist"
            title="Stop"
          >
            <AppIcon name="x" />
          </button>
        </div>
      </div>

      <div className="cheat-playlist-timeline" aria-hidden={!active}>
        <span className="cheat-playlist-time">{fmtTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={progress}
          onChange={onSeekChange}
          onPointerDown={onScrubStart}
          onPointerUp={onScrubEnd}
          onPointerCancel={onScrubEnd}
          disabled={!canSeek}
          className="cheat-playlist-seek"
          style={progressStyle}
          aria-label={active ? `Seek within ${active.title}` : "Seek"}
          aria-valuetext={seekValueText}
        />
        <span className="cheat-playlist-time">{fmtTime(duration)}</span>
      </div>
    </section>
  );
}

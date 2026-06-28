"use client";

// Cross-browser TTS wrapper around the Web Speech API.
// Handles iOS Safari quirks (must be triggered from a user gesture),
// long-text chunking (some browsers cut off at ~200 chars), and
// progress callbacks for highlighting.

export type TtsOptions = {
  rate?: number; // 0.5–2.0
  pitch?: number; // 0–2
  voiceURI?: string;
  lang?: string;
};

export type TtsState = "idle" | "playing" | "paused";

const PREF_KEY = "p107.tts.v1";

export type TtsPrefs = {
  rate: number;
  voiceURI: string | null;
  autoplay: boolean;
  preferHd: boolean;
};

const DEFAULT_PREFS: TtsPrefs = {
  rate: 1.0,
  voiceURI: null,
  autoplay: false,
  preferHd: true,
};

export function loadPrefs(): TtsPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export const PREFS_EVENT = "p107.tts.prefs-changed";

export function savePrefs(p: Partial<TtsPrefs>): void {
  if (typeof window === "undefined") return;
  try {
    const merged = { ...loadPrefs(), ...p };
    window.localStorage.setItem(PREF_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: merged }));
  } catch {
    // ignore quota
  }
}

export function isSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function listVoices(): SpeechSynthesisVoice[] {
  if (!isSupported()) return [];
  return window.speechSynthesis.getVoices();
}

// Some browsers return voices asynchronously. Wait once.
export function whenVoicesReady(): Promise<SpeechSynthesisVoice[]> {
  if (!isSupported()) return Promise.resolve([]);
  const synth = window.speechSynthesis;
  return new Promise((resolve) => {
    const voices = synth.getVoices();
    if (voices && voices.length) {
      resolve(voices);
      return;
    }
    const handler = () => {
      const v = synth.getVoices();
      synth.removeEventListener("voiceschanged", handler);
      resolve(v ?? []);
    };
    synth.addEventListener("voiceschanged", handler);
    // Fallback timeout
    setTimeout(() => resolve(synth.getVoices() ?? []), 1200);
  });
}

// Chunk long text on sentence boundaries to keep utterances ≤ 200 chars,
// which avoids Chromium cutting off mid-sentence.
export function chunkText(text: string, max = 200): string[] {
  // Manual sentence split — avoids regex lookbehind which Safari < 16.4 cannot parse.
  const normalized = text.replace(/\s+/g, " ").trim();
  const sentences: string[] = [];
  let start = 0;
  for (let i = 0; i < normalized.length; i++) {
    const c = normalized[i];
    if (c === "." || c === "!" || c === "?") {
      let j = i + 1;
      while (j < normalized.length && normalized[j] === " ") j++;
      if (j > i + 1 || j === normalized.length) {
        sentences.push(normalized.slice(start, i + 1).trim());
        start = j;
        i = j - 1;
      }
    }
  }
  if (start < normalized.length) sentences.push(normalized.slice(start).trim());
  const filtered = sentences.filter(Boolean);
  const out: string[] = [];
  let buf = "";
  for (const s of filtered) {
    if ((buf + " " + s).trim().length <= max) {
      buf = (buf + " " + s).trim();
    } else {
      if (buf) out.push(buf);
      if (s.length <= max) {
        buf = s;
      } else {
        // Hard split at commas/spaces
        let i = 0;
        while (i < s.length) {
          out.push(s.slice(i, i + max));
          i += max;
        }
        buf = "";
      }
    }
  }
  if (buf) out.push(buf);
  return out;
}

let activeController: TtsController | null = null;

export class TtsController {
  private chunks: string[];
  private idx = 0;
  private opts: Required<TtsOptions>;
  private listeners = new Set<(state: TtsState, progress: number) => void>();
  private state: TtsState = "idle";
  private currentUtter: SpeechSynthesisUtterance | null = null;
  private resumeTimer: number | null = null;

  constructor(text: string, opts: TtsOptions = {}) {
    this.chunks = chunkText(text);
    this.opts = {
      rate: opts.rate ?? 1.0,
      pitch: opts.pitch ?? 1.0,
      voiceURI: opts.voiceURI ?? "",
      lang: opts.lang ?? "en-US",
    };
  }

  onUpdate(cb: (state: TtsState, progress: number) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private emit(): void {
    const progress = this.chunks.length === 0 ? 0 : Math.min(1, this.idx / this.chunks.length);
    for (const cb of this.listeners) cb(this.state, progress);
  }

  play(): void {
    if (!isSupported()) return;
    if (activeController && activeController !== this) activeController.stop();
    activeController = this;
    const synth = window.speechSynthesis;
    if (this.state === "paused") {
      synth.resume();
      this.state = "playing";
      this.emit();
      this.keepAlive();
      return;
    }
    if (this.state === "playing") return;
    this.state = "playing";
    this.speakNext();
    this.keepAlive();
  }

  pause(): void {
    if (!isSupported()) return;
    if (this.state !== "playing") return;
    window.speechSynthesis.pause();
    this.state = "paused";
    this.emit();
    if (this.resumeTimer) {
      window.clearInterval(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  stop(): void {
    if (!isSupported()) return;
    window.speechSynthesis.cancel();
    this.state = "idle";
    this.idx = 0;
    this.currentUtter = null;
    if (this.resumeTimer) {
      window.clearInterval(this.resumeTimer);
      this.resumeTimer = null;
    }
    this.emit();
    if (activeController === this) activeController = null;
  }

  isPlaying(): boolean {
    return this.state === "playing";
  }

  // Chrome/Edge silently pauses speech synthesis after ~15 seconds.
  // This keeps it alive.
  private keepAlive(): void {
    if (this.resumeTimer || !isSupported()) return;
    this.resumeTimer = window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 10000);
  }

  private speakNext(): void {
    if (this.idx >= this.chunks.length) {
      this.state = "idle";
      this.idx = 0;
      this.currentUtter = null;
      this.emit();
      if (this.resumeTimer) {
        window.clearInterval(this.resumeTimer);
        this.resumeTimer = null;
      }
      if (activeController === this) activeController = null;
      return;
    }
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(this.chunks[this.idx]);
    utter.rate = this.opts.rate;
    utter.pitch = this.opts.pitch;
    utter.lang = this.opts.lang;
    if (this.opts.voiceURI) {
      const voice = synth.getVoices().find((v) => v.voiceURI === this.opts.voiceURI);
      if (voice) utter.voice = voice;
    }
    utter.onend = () => {
      this.idx += 1;
      this.currentUtter = null;
      if (this.state === "playing") this.speakNext();
    };
    utter.onerror = () => {
      this.state = "idle";
      this.currentUtter = null;
      this.emit();
    };
    this.currentUtter = utter;
    synth.speak(utter);
    this.emit();
  }
}

export function stopAll(): void {
  if (!isSupported()) return;
  window.speechSynthesis.cancel();
  if (activeController) {
    activeController.stop();
    activeController = null;
  }
}

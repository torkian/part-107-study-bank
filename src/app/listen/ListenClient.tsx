"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import manifestData from "@/data/audio-manifest.json";
import { cheatSectionText, hashText } from "@/lib/audio-text";
import {
  PREFS_EVENT,
  isSupported,
  listVoices,
  loadPrefs,
  savePrefs,
  whenVoicesReady,
  type TtsPrefs,
} from "@/lib/tts";

type ManifestEntry = { file: string; chars: number; preview?: string };
type SampleCheatSection = {
  title: string;
  rows: { label: string; value: string; detail?: string }[];
};

const AUDIO_MANIFEST = manifestData as Record<string, ManifestEntry>;
const HD_SECTION_COUNT = Object.keys(AUDIO_MANIFEST).length;
const HD_SECTION_NAMES = Object.values(AUDIO_MANIFEST).map((entry) =>
  entry.preview ?? entry.file.replace(/\.mp3$/, "")
);
const HD_NAME_SET = new Set(HD_SECTION_NAMES);

const CHEATSHEET_HD_TITLES = [
  "Hard limits (memorize cold)",
  "Operations over people (§107.39 / §107.110–.140)",
  "Accident reporting (§107.9)",
  "Night & civil twilight (§107.29)",
  "Alcohol / drugs (§107.27, §91.17)",
  "Certification (§107.61, §107.65, §107.77)",
  "Remote ID (Part 89, effective Sept 16 2023)",
  "Airspace authorization (§107.41)",
].filter((name) => HD_NAME_SET.has(name));

const EXAM_DAY_HD_TITLES = [
  "Night before",
  "Morning of",
  "What to bring (and what NOT to bring)",
  "During the test",
  "After: getting the result",
].filter((name) => HD_NAME_SET.has(name));

const STUDY_PATH_HD_TITLES = HD_SECTION_NAMES.filter((name) => name.startsWith("Day "));
const REVIEW_HD_TITLES = HD_SECTION_NAMES.filter(
  (name) =>
    !CHEATSHEET_HD_TITLES.includes(name) &&
    !EXAM_DAY_HD_TITLES.includes(name) &&
    !STUDY_PATH_HD_TITLES.includes(name)
);

const HD_COVERAGE_LINES = [
  { label: "Cheat sheet", value: CHEATSHEET_HD_TITLES.slice(0, 4).join(", ") },
  { label: "Cheat sheet", value: CHEATSHEET_HD_TITLES.slice(4).join(", ") },
  { label: "Study path", value: STUDY_PATH_HD_TITLES.join(", ") },
  { label: "Exam day", value: EXAM_DAY_HD_TITLES.join(", ") },
  { label: "Rapid review", value: REVIEW_HD_TITLES.slice(0, 9).join(", ") },
  { label: "More HD review", value: REVIEW_HD_TITLES.slice(9).join(", ") },
].filter((line) => line.value);

const BACKUP_COVERAGE_LINES = [
  "Glossary terms",
  "Practice questions",
  "Question explanations and review",
  "Remaining cheat sheet sections",
];

const BACKUP_SAMPLE =
  "The maximum altitude for Class G airspace is 1,200 feet AGL.";

const HD_SAMPLE_SECTION: SampleCheatSection = {
  title: "Hard limits (memorize cold)",
  rows: [
    {
      label: "Max groundspeed",
      value: "87 kts / 100 mph",
      detail:
        "Per 14 CFR §107.51(a). Note this is GROUNDSPEED, not airspeed — a tailwind can push you over the limit. The FAA picked 100 mph because it's the practical max where a small drone strike on a person is survivable but still gives commercial pilots useful speed for inspections, mapping, and delivery.",
    },
    {
      label: "Max altitude",
      value:
        "400 ft AGL, or up to 400 ft above a structure if flown within a 400 ft radius of it",
      detail:
        "Per §107.51(b)(2). The structure exception lets you inspect tall buildings, cell towers, and wind turbines: if a tower top is at 1,500 ft AGL, you can fly up to 1,900 ft AGL, but only within a 400-foot RADIUS of the structure (measured in any direction — the rule is a 400-ft sphere around the structure, not just a horizontal distance). A MOUNTAIN is terrain, NOT a structure — the +400 exception does not apply to ridges or hills.",
    },
    {
      label: "Min visibility from control station",
      value: "3 statute miles",
      detail:
        "§107.51(c). Measured from the REMOTE PILOT'S location, not from the aircraft. If you can't see 3 SM from where you're standing, you can't legally fly even if conditions are better at the aircraft.",
    },
    {
      label: "Cloud clearance",
      value: "500 ft below clouds · 2,000 ft horizontal",
      detail:
        "§107.51(d). Same as VFR cloud clearance for low-altitude airspace below 10,000 MSL. Why: gives manned IFR traffic descending out of clouds enough time to see and avoid you. To find min ceiling for a sUAS flight: cloud base in AGL minus 500 ft = your max altitude.",
    },
    {
      label: "Max sUAS weight",
      value: "< 55 lb (including payload)",
      detail:
        "§107.1 definition of 'small UAS'. If your aircraft + payload + fuel/battery is 55 lb or more, you cannot fly under Part 107 — you need an experimental airworthiness certificate or different rules entirely. The 55 lb is total takeoff weight, not empty weight.",
    },
    {
      label: "Min remote pilot age",
      value: "16 years old",
      detail:
        "§107.61(a). No upper age limit. Same minimum age as a Student Pilot Certificate for powered aircraft (16). Student pilot certificates for gliders/balloons are available at 14; most pilot certificates (sport, recreational, private) require 17.",
    },
  ],
};

const HD_SAMPLE_TEXT = sampleCheatSectionText(HD_SAMPLE_SECTION);

// Pick a guaranteed-existing HD MP3 from the manifest so the /listen sample
// never breaks if the source text drifts between runs. Prefers a recognizable
// section name; falls back to the first manifest entry.
function pickSampleMp3Url(): string {
  const entries = Object.entries(AUDIO_MANIFEST);
  if (entries.length === 0) return "";
  const preferred = entries.find(
    ([, e]) => e.preview && (e.preview.startsWith("Accident reporting") || e.preview.startsWith("Hard limits")),
  );
  const chosen = preferred ?? entries[0];
  return `/audio/${chosen[1].file}`;
}
const HD_SAMPLE_MP3 = pickSampleMp3Url();

// Use the canonical cheatSectionText so narrate() is applied — otherwise the
// hash diverges from what the build-time script generated and the HD sample
// silently falls back to Web Speech.
function sampleCheatSectionText(section: SampleCheatSection): string {
  return cheatSectionText(section);
}

function sortVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return [...voices].sort((a, b) => {
    if (a.localService !== b.localService) return a.localService ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function formatRate(rate: number): string {
  return `${Number.isInteger(rate) ? rate.toFixed(0) : String(rate)}×`;
}

function isEnglishVoice(voice: SpeechSynthesisVoice): boolean {
  return voice.lang.startsWith("en");
}

function formatVoiceOption(voice: SpeechSynthesisVoice): string {
  return `${voice.name}${voice.lang ? ` · ${voice.lang}` : ""}${voice.localService ? " · offline" : ""}`;
}

export default function ListenClient() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setSelectedURI] = useState(() =>
    typeof window === "undefined" ? "" : loadPrefs().voiceURI ?? ""
  );
  const [rate, setRate] = useState(() =>
    typeof window === "undefined" ? 1 : loadPrefs().rate
  );
  const [preferHd, setPreferHd] = useState(() =>
    typeof window === "undefined" ? true : loadPrefs().preferHd
  );
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const applyPrefs = (prefs: TtsPrefs) => {
      setSelectedURI(prefs.voiceURI ?? "");
      setRate(prefs.rate);
      setPreferHd(prefs.preferHd);
    };

    applyPrefs(loadPrefs());

    const onPrefsChanged = (e: Event) => {
      const detail = (e as CustomEvent<TtsPrefs>).detail;
      if (detail) applyPrefs(detail);
    };
    window.addEventListener(PREFS_EVENT, onPrefsChanged);

    if (!isSupported()) {
      setSupported(false);
      return () => window.removeEventListener(PREFS_EVENT, onPrefsChanged);
    }

    setSupported(true);
    const updateVoices = () => setVoices(sortVoices(listVoices()));
    whenVoicesReady().then((vs) => setVoices(sortVoices(vs)));
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      window.removeEventListener(PREFS_EVENT, onPrefsChanged);
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  function pickVoice(uri: string) {
    setSelectedURI(uri);
    savePrefs({ voiceURI: uri || null });
  }

  function pickAudioPreference(nextPreferHd: boolean) {
    setPreferHd(nextPreferHd);
    savePrefs({ preferHd: nextPreferHd });
  }

  const selectedVoice = voices.find((voice) => voice.voiceURI === selectedURI);
  const englishVoices = voices.filter(isEnglishVoice);
  const visibleVoices = showAllLanguages ? voices : englishVoices;
  const selectedVoiceHidden =
    !!selectedVoice && !visibleVoices.some((voice) => voice.voiceURI === selectedVoice.voiceURI);
  const displayedVoices = selectedVoiceHidden ? [selectedVoice, ...visibleVoices] : visibleVoices;
  const backupVoiceName =
    supported === false
      ? "Not available"
      : selectedVoice?.name ?? (selectedURI ? "Saved backup voice" : "System default");
  const backupVoiceMeta = selectedVoice
    ? `${selectedVoice.lang}${selectedVoice.localService ? " · offline" : ""}`
    : "Let your device choose automatically";

  return (
    <div className="listen-audio-system">
      <section className="listen-status-panel" aria-label="Audio status">
        <article className="listen-status-card">
          <span className="listen-status-icon">
            <AppIcon name="headphones" />
          </span>
          <div>
            <h2 className="listen-status-title">HD audio (Rachel)</h2>
            <p className="listen-status-value">{HD_SECTION_COUNT} sections covered</p>
          </div>
        </article>
        <article className="listen-status-card">
          <span className="listen-status-icon">
            <AppIcon name="volume" />
          </span>
          <div>
            <h2 className="listen-status-title">Backup voice (your device)</h2>
            <p className="listen-status-value">{backupVoiceName}</p>
            <p className="listen-status-note">{formatRate(rate)} speed</p>
          </div>
        </article>
      </section>

      <section className="card card-pad listen-settings-panel">
        <div className="listen-section-head">
          <div>
            <span className="section-kicker">Audio preference</span>
            <h2 className="section-title">Choose how Listen buttons play</h2>
          </div>
          <span className="meta-chip">{preferHd ? "HD first" : "Backup only"}</span>
        </div>

        <div className="listen-preference-grid" role="radiogroup" aria-label="Audio preference">
          <label className={`listen-preference-option${preferHd ? " is-active" : ""}`}>
            <input
              type="radio"
              name="audio-preference"
              checked={preferHd}
              onChange={() => pickAudioPreference(true)}
            />
            <span>
              <strong>Always use HD when available</strong>
              <small>Rachel recordings play first, backup voice fills the gaps.</small>
            </span>
          </label>
          <label className={`listen-preference-option${!preferHd ? " is-active" : ""}`}>
            <input
              type="radio"
              name="audio-preference"
              checked={!preferHd}
              onChange={() => pickAudioPreference(false)}
            />
            <span>
              <strong>Always use backup voice</strong>
              <small>Use your selected device voice for every section.</small>
            </span>
          </label>
        </div>

        <div className="voice-picker">
          <div className="voice-picker-head">
            <label className="voice-picker-label" htmlFor="backup-voice-select">
              Backup voice
            </label>
            <span className="voice-picker-subtitle">Used when HD audio isn&apos;t available</span>
          </div>
          <select
            id="backup-voice-select"
            className="voice-select"
            value={selectedURI}
            onChange={(e) => pickVoice(e.target.value)}
            disabled={supported === false}
          >
            <option value="">System default</option>
            {displayedVoices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {formatVoiceOption(voice)}
              </option>
            ))}
          </select>
          <p className="voice-helper">{backupVoiceMeta}</p>
          <label className="listen-language-toggle">
            <input
              type="checkbox"
              checked={showAllLanguages}
              onChange={(e) => setShowAllLanguages(e.target.checked)}
              disabled={supported === false}
            />
            <span>Show all languages</span>
          </label>
          <p className="voice-count">
            {supported === false
              ? "Backup voice is not supported in this browser."
              : voices.length === 0
                ? "Loading voices..."
                : showAllLanguages
                  ? `${voices.length} voices available on this device.`
                  : `${englishVoices.length} English voices shown by default.`}
          </p>
        </div>
      </section>

      <section className="listen-samples" aria-label="Audio samples">
        <article className="listen-sample-card">
          <div className="listen-sample-head">
            <span className="listen-sample-kicker">A</span>
            <h2 className="listen-sample-title">HD sample (Rachel)</h2>
          </div>
          <p className="listen-sample-copy">A real covered cheat sheet section from the HD library.</p>
          <AudioPlayer
            text={HD_SAMPLE_TEXT}
            label="Play HD sample"
            size="md"
            directMp3Url={HD_SAMPLE_MP3}
          />
        </article>
        <article className="listen-sample-card">
          <div className="listen-sample-head">
            <span className="listen-sample-kicker">B</span>
            <h2 className="listen-sample-title">Backup sample</h2>
          </div>
          <p className="listen-sample-copy">A short Web Speech sample using the selected backup voice.</p>
          <AudioPlayer text={BACKUP_SAMPLE} label="Play backup sample" size="md" />
        </article>
      </section>

      <section className="card card-pad listen-coverage-panel">
        <div className="listen-section-head">
          <div>
            <span className="section-kicker">Coverage</span>
            <h2 className="section-title">What is HD today</h2>
          </div>
          <span className="meta-chip">{HD_SECTION_COUNT} HD sections</span>
        </div>

        <div className="listen-coverage-grid">
          <div className="listen-coverage-list">
            <h3>With HD audio</h3>
            <ul>
              {HD_COVERAGE_LINES.map((line) => (
                <li key={`${line.label}-${line.value}`}>
                  <strong>{line.label}</strong>
                  <span>{line.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="listen-coverage-list">
            <h3>Uses backup voice for now</h3>
            <ul>
              {BACKUP_COVERAGE_LINES.map((line) => (
                <li key={line}>
                  <strong>{line}</strong>
                  <span>Covered by your selected backup voice</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

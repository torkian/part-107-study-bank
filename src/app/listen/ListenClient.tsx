"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";
import {
  isSupported,
  listVoices,
  loadPrefs,
  savePrefs,
  whenVoicesReady,
} from "@/lib/tts";

const SAMPLE = `This is a sample of the audio voice. Adjust the speed and pick a voice that works best for your study sessions. Part one zero seven knowledge tests cover regulations, airspace, weather, loading and performance, operations, and aeronautical decision making.`;

export default function ListenClient() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setSelectedURI] = useState<string>("");
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isSupported()) {
      setSupported(false);
      return;
    }
    setSupported(true);
    const prefs = loadPrefs();
    setSelectedURI(prefs.voiceURI ?? "");
    whenVoicesReady().then((vs) => {
      // Show English voices first, then everything else
      const sorted = [...vs].sort((a, b) => {
        const ae = a.lang.startsWith("en") ? 0 : 1;
        const be = b.lang.startsWith("en") ? 0 : 1;
        if (ae !== be) return ae - be;
        return a.name.localeCompare(b.name);
      });
      setVoices(sorted);
    });
  }, []);

  function pickVoice(uri: string) {
    setSelectedURI(uri);
    savePrefs({ voiceURI: uri || null });
  }

  if (supported === false) {
    return (
      <section className="card card-pad">
        <div className="page-header">
          <span className="eyebrow">
            <AppIcon name="alert" />
            Not supported
          </span>
          <h2 className="section-title">Your browser does not support text-to-speech</h2>
          <p className="lede">
            Try a recent version of Safari (iOS or macOS) or Chrome. The Web Speech API is supported on
            all modern browsers but requires it to be enabled in OS settings.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="card card-pad">
      <div className="page-header">
        <span className="section-kicker">Voice settings</span>
        <h2 className="section-title">Pick your voice</h2>
        <p className="lede">
          On iOS / macOS, scroll for premium neural voices (often labeled &ldquo;Enhanced&rdquo; or
          &ldquo;Premium&rdquo;). Your choice is saved on this device.
        </p>
      </div>

      <div className="voice-picker">
        <label className="voice-picker-label">
          <span>Voice</span>
          <select
            className="voice-select"
            value={selectedURI}
            onChange={(e) => pickVoice(e.target.value)}
          >
            <option value="">System default</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} {v.lang ? `· ${v.lang}` : ""} {v.localService ? "· offline" : ""}
              </option>
            ))}
          </select>
        </label>
        <p className="muted" style={{ fontSize: "0.85rem", margin: 0 }}>
          {voices.length === 0 ? "Loading voices…" : `${voices.length} voices available on this device.`}
        </p>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <strong className="tile-title">Try a sample</strong>
        <p className="tile-copy" style={{ marginBottom: "0.6rem" }}>
          Press play to hear your current settings.
        </p>
        <AudioPlayer text={SAMPLE} label="Play sample" size="md" />
      </div>
    </section>
  );
}

import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import AudioPlayer from "@/components/AudioPlayer";

type Fact = { fact: string; why: string };
type Group = { title: string; facts: Fact[] };

const GROUPS: Group[] = [
  {
    title: "Operating limits — memorize these word for word",
    facts: [
      { fact: "Max groundspeed: 87 knots / 100 mph", why: "§107.51(c) — tailwind can push you over even if airspeed is fine" },
      { fact: "Max altitude: 400 ft AGL (or +400 ft above a structure within a 400-ft radius)", why: "§107.51(b) — terrain is NOT a structure" },
      { fact: "Minimum visibility from the control station: 3 statute miles", why: "§107.51(d) — measured at the RP, not the aircraft" },
      { fact: "Cloud clearance: 500 ft below clouds, 2,000 ft horizontal", why: "§107.51(e) — gives manned IFR traffic time to see-and-avoid" },
      { fact: "sUAS weight limit: < 55 lb (everything below 55 is sUAS; at 55 you leave Part 107)", why: "§107.1 — includes payload and battery" },
    ],
  },
  {
    title: "People & vehicles — Categories 1–4",
    facts: [
      { fact: "Cat 1: ≤ 0.55 lb / 250 g + no laceration risk", why: "§107.110 — DJI Mini class. No DOC needed" },
      { fact: "Cat 2: ≤ 11 ft-lb kinetic energy + no laceration risk + Declaration of Compliance", why: "§107.115/120" },
      { fact: "Cat 3: ≤ 25 ft-lb + closed/restricted site OR transit + DOC", why: "§107.125/130" },
      { fact: "Cat 4: Airworthiness certificate + operating limitations", why: "§107.140 — for big delivery/industrial UAS" },
      { fact: "Moving vehicles: all categories may TRANSIT; sustained flight needs a closed/restricted site", why: "§107.145" },
    ],
  },
  {
    title: "Night & lighting (§107.29)",
    facts: [
      { fact: "Civil twilight: 30 min BEFORE sunrise to 30 min AFTER sunset (CONUS)", why: "Outside CONUS: see Air Almanac" },
      { fact: "Anti-collision lighting required during civil twilight AND night", why: "Visible for 3 statute miles, sufficient flash rate" },
      { fact: "Night ops allowed without waiver if: (1) RP has training covering night AND (2) aircraft has anti-collision lighting", why: "2021 amendment — pre-2021 every night flight needed a waiver" },
      { fact: "Civil twilight is NOT night — they are two distinct periods (both require anti-collision lighting)", why: "§107.29(d) — night = end of evening civil twilight to start of morning civil twilight" },
    ],
  },
  {
    title: "Alcohol, drugs, medical (§107.27 / §91.17)",
    facts: [
      { fact: "Bottle-to-throttle: 8 hours minimum", why: "Same as Part 91 — applied through §107.27" },
      { fact: "BAC limit: 0.04% (and not impaired)", why: "Half the typical driving limit" },
      { fact: "No flying under the influence of any drug (including OTC) that affects faculties", why: "Includes Benadryl, sleep aids, anything that causes drowsiness" },
    ],
  },
  {
    title: "Accident reporting (§107.9)",
    facts: [
      { fact: "Trigger (ANY one of three): serious injury OR loss of consciousness OR property damage > $500 (excluding sUAS)", why: "OR not AND — any one triggers" },
      { fact: "Deadline: 10 calendar days", why: "Submit via FAA DroneZone" },
      { fact: "NTSB Part 830 also required if anyone is killed or seriously injured — regardless of UAS weight", why: "49 CFR §830.2 — common test trap" },
    ],
  },
  {
    title: "Certification (§107.61, §107.65, §107.77)",
    facts: [
      { fact: "Minimum age: 16", why: "§107.61(a)" },
      { fact: "Pass score: 70% (42/60 correct)", why: "FAA Knowledge Test, 2 hours, 3-choice multiple choice" },
      { fact: "Recurrent training: free online ALC-677 every 24 calendar months", why: "Both Part 107-only and Part 61 pilots use ALC-677" },
      { fact: "Change of address: notify FAA within 30 days", why: "§107.77" },
      { fact: "Certificate must be available for inspection by FAA, NTSB, TSA, law enforcement", why: "Paper, PDF, or photo all acceptable" },
    ],
  },
  {
    title: "Registration (Part 48)",
    facts: [
      { fact: "Fee: $5. Term: 3 years. Number must be externally visible on the aircraft", why: "Since Feb 2019 — no longer acceptable inside battery compartment" },
      { fact: "All Part 107 aircraft must be registered regardless of weight. Recreational < 0.55 lb is exempt under §44809", why: "Common trap — 0.55 lb exemption is recreational-only" },
    ],
  },
  {
    title: "Remote ID (Part 89, effective Sept 16 2023)",
    facts: [
      { fact: "Three compliance paths: (1) Standard Remote ID, (2) Broadcast Module, (3) FRIA (FAA-Recognized Identification Area)", why: "Pick one — most modern drones have built-in Standard RID" },
      { fact: "Broadcast contents: UAS ID, lat/lon/alt, velocity, control-station lat/lon, time, emergency status", why: "Broadcast over Bluetooth/Wi-Fi; received by FAA app" },
    ],
  },
  {
    title: "Airspace authorization (§107.41)",
    facts: [
      { fact: "Class B, C, D, and Class E surface — ATC authorization required (LAANC or DroneZone)", why: "You CANNOT just call the tower for permission on the radio" },
      { fact: "Class G — no authorization needed, but all other Part 107 rules apply (400 AGL, VLOS, etc.)", why: "Most rural areas under 1,200 ft AGL" },
      { fact: "LAANC: instant authorization at/below UAS Facility Map grid altitude. Grid '0' = manual approval required", why: "Free; use Aloft, Airmap, Skyward, etc." },
    ],
  },
  {
    title: "Sectional chart — colors that win exam points",
    facts: [
      { fact: "Class B: solid BLUE lines. Class C: solid MAGENTA. Class D: dashed BLUE (ceiling in [brackets] = MSL hundreds)", why: "" },
      { fact: "Class E to surface: dashed MAGENTA line around airport (requires authorization)", why: "Found at non-towered airports with instrument approaches" },
      { fact: "Class E starting 700 AGL: faded/shaded MAGENTA. Class E starting 1,200 AGL: faded/shaded BLUE", why: "Below the floor of either = Class G (no authorization needed)" },
      { fact: "Mode C veil: thin solid MAGENTA circle 30 NM around primary Class B airport", why: "Manned aircraft in the veil need a Mode C transponder" },
      { fact: "MEF (Maximum Elevation Figure): the largest digit = thousands of feet MSL, smaller digit = hundreds", why: "Example: '15' = 1,500 ft MSL — clears all obstacles in that quadrant" },
    ],
  },
  {
    title: "Right of way (§107.37)",
    facts: [
      { fact: "sUAS YIELDS to ALL other aircraft — manned or unmanned — at all times", why: "Even if they're illegally in your area" },
      { fact: "Manned ROW order (least to most maneuverable): Balloon > Glider > Airship > Airplane/Rotorcraft", why: "Aircraft in distress always has ROW" },
    ],
  },
  {
    title: "Weather — quick decoder",
    facts: [
      { fact: "METAR sky: FEW ≤ 2 oktas · SCT 3-4 · BKN 5-7 · OVC 8. Cloud height = hundreds of feet AGL (BKN040 = 4,000 AGL)", why: "Ceiling = lowest BKN or OVC" },
      { fact: "METAR temp: M = minus (M05/M10 = -5°C / -10°C). Altimeter: A2992 = 29.92 inHg. Visibility: P6SM = > 6 statute miles", why: "" },
      { fact: "AIRMETs: Sierra = mountain obscuration/IFR · Tango = turbulence · Zulu = icing", why: "Active 6-hour windows" },
      { fact: "Convective SIGMET = tornadoes OR hail ≥ ¾\" OR winds ≥ 50 kt OR line/embedded TS", why: "Don't fly if a Convective SIGMET covers your area" },
      { fact: "Microburst: downdraft up to 6,000 fpm, outflow up to 45 kt, total duration 5–15 min", why: "Devastating to small UAS — avoid all storm cells" },
      { fact: "Density altitude: hot + high + humid = HIGH DA = degraded performance", why: "Thinner air, less thrust, less lift" },
    ],
  },
  {
    title: "Performance & loading",
    facts: [
      { fact: "Forward CG: more stable, slower, higher stall, harder flare. Aft CG: less stable, faster, lower stall, harder recovery", why: "Generally forward CG is safer" },
      { fact: "Load factor in turn = 1 / cos(bank). 30°=1.15G · 45°=1.41G · 60°=2G · 75°=3.86G", why: "Stall speed in turn = Vs × √(load factor) — at 60° bank, stall speed jumps 41%" },
      { fact: "LiPo in thermal runaway: COOL with copious WATER (Class D agents are for lithium METAL, different chemistry)", why: "Common confusion — water IS the right choice for Li-ion/LiPo" },
    ],
  },
  {
    title: "Decision-making models (memorize the acronyms)",
    facts: [
      { fact: "Hazardous attitudes (5): Anti-authority, Impulsivity, Invulnerability, Macho, Resignation — each has its own antidote", why: "Match exact wording — \"Follow the rules\", \"Not so fast\", \"It could happen to me\", \"Taking chances is foolish\", \"I'm not helpless\"" },
      { fact: "PAVE: Pilot, Aircraft, enVironment, External pressures", why: "Pre-flight risk model" },
      { fact: "IMSAFE: Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion", why: "Personal pre-flight checklist" },
      { fact: "DECIDE: Detect, Estimate, Choose, Identify, Do, Evaluate", why: "Six-step problem-solving" },
      { fact: "3P: Perceive, Process, Perform", why: "Continuous loop, not one-time" },
    ],
  },
  {
    title: "Airport & radio",
    facts: [
      { fact: "Standard traffic pattern: LEFT turns. Entry on 45° to downwind at pattern altitude", why: "Right traffic shown as 'RP' near runway in A/FD" },
      { fact: "Runway number = magnetic heading / 10. Runway 27 ≈ 270°. Opposite end = 27 ↔ 09", why: "" },
      { fact: "CTAF default at non-towered fields: 122.9 (MULTICOM) unless assigned otherwise", why: "Always check chart supplement for the actual frequency" },
      { fact: "Beacon during DAYTIME at Class B/C/D/E surface = IFR conditions (ceiling < 1,000 ft and/or vis < 3 SM)", why: "Common test trap — beacon at NIGHT is normal" },
      { fact: "VASI: 'Red over white, you're alright' (on glidepath). 'Red over red, you're dead' (too low). 'White over white, out of sight' (too high)", why: "PAPI uses 4 lights in a row, same colors" },
    ],
  },
  {
    title: "TFRs",
    facts: [
      { fact: "Stadium TFR (FDC 4/3621): 30,000+ open-air seats · 3 NM lateral / 3,000 AGL · 1 hr before to 1 hr after", why: "MLB, NFL, NCAA D1 football, NASCAR/Indy/Champ Car" },
      { fact: "Presidential TFR: 10 NM inner (no GA), 30 NM outer, surface to 17,999 MSL", why: "Felony-level enforcement" },
      { fact: "Wildfire TFR (§91.137): NEVER fly. Even small drones ground all firefighting aircraft", why: "Fines have exceeded $20,000 for single incursions" },
    ],
  },
  {
    title: "Night vision (physiology)",
    facts: [
      { fact: "Dark adaptation: 30 min. One bright light resets you back to zero", why: "Use red flashlight for chart reading at night" },
      { fact: "Rods = low-light/peripheral. Cones = color/central. Use OFF-CENTER viewing at night", why: "Center vision (cones) is useless in low light" },
    ],
  },
  {
    title: "Common test traps",
    facts: [
      { fact: "0.55 lb = 250 g — same threshold, just different units. FAA uses both", why: "Part 48 registration threshold" },
      { fact: "Property damage > $500 EXCLUDES the cost of your own sUAS", why: "If only the drone is damaged, no report needed" },
      { fact: "MTRs: 4-digit identifier = entirely at or below 1,500 AGL. 3-digit = at least one segment ABOVE 1,500 AGL", why: "AIM 3-5-2 — easy to flip the rule" },
      { fact: "Civil twilight ≠ night. Two separate periods. Both need anti-collision lighting, but only true night needs the special training", why: "" },
    ],
  },
];

export default function ColdFactsPage() {
  let counter = 0;
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="star" />
          The Top 50 — Memorize Cold
        </span>
        <h1 className="page-title">Know these and you will pass the exam.</h1>
        <p className="lede">
          Distilled from the full Part 107 ACS down to the highest-frequency, highest-value facts.
          If you can recite all 50 from memory without prompts, you are ready for the test.
        </p>
      </header>

      {GROUPS.map((group) => {
        const audioText = `${group.title}. ${group.facts.map((f) => `${f.fact}. ${f.why}`).join(" ")}`;
        return (
        <section key={group.title} className="card card-pad">
          <div className="cheat-section-head">
            <h2 className="section-title">{group.title}</h2>
            <AudioPlayer text={audioText} label="Listen" size="sm" />
          </div>
          <ol className="cold-facts-list">
            {group.facts.map((f) => {
              counter += 1;
              return (
                <li key={f.fact} className="cold-fact">
                  <span className="cold-fact-number">{counter}</span>
                  <div>
                    <strong className="cold-fact-text">{f.fact}</strong>
                    {f.why && <p className="cold-fact-why">{f.why}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
        );
      })}

      <section className="card card-pad">
        <div className="page-header">
          <span className="section-kicker">Next</span>
          <h2 className="section-title">Drill these until they're reflexive</h2>
          <p className="lede">
            Reading the list is not enough. Take the practice exam, then come back and check which
            facts you needed to look up.
          </p>
        </div>
        <div className="action-row">
          <Link href="/exam?timed=1" className="btn">
            <AppIcon name="timer" />
            Take a timed exam
          </Link>
          <Link href="/cheatsheet" className="btn btn-secondary">
            <AppIcon name="cheatsheet" />
            Full cheat sheet
          </Link>
          <Link href="/study-path" className="btn btn-secondary">
            <AppIcon name="route" />
            7-day study plan
          </Link>
        </div>
      </section>
    </div>
  );
}

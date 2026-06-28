import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import CheatSheetClient, { type Section } from "./CheatSheetClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheat Sheet",
  description: "Every Part 107 number you need to memorize cold — 30 sections with tap-to-expand FAA-cited explanations.",
  alternates: { canonical: "https://www.107license.com/cheatsheet" },
  openGraph: {
    title: "Cheat Sheet · 107 License",
    description: "Every Part 107 number you need to memorize cold — 30 sections with tap-to-expand FAA-cited explanations.",
    url: "https://www.107license.com/cheatsheet",
    images: [{ url: "https://www.107license.com/opengraph-image", width: 1200, height: 630, alt: "107 License — Free FAA Part 107 Drone Pilot Study App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheat Sheet · 107 License",
    description: "Every Part 107 number you need to memorize cold — 30 sections with tap-to-expand FAA-cited explanations.",
    images: ["https://www.107license.com/opengraph-image"],
  },
};


const SECTIONS: Section[] = [
  {
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
  },
  {
    title: "Alcohol / drugs (§107.27, §91.17)",
    rows: [
      {
        label: "Bottle-to-throttle",
        value: "8 hours minimum",
        detail:
          "Per §91.17 applied through §107.27. This is the MINIMUM — if you're still feeling the effects 9 hours later, you still can't fly. The FAA also reserves the right to require sobriety testing.",
      },
      {
        label: "BAC limit",
        value: "0.04% (and not impaired)",
        detail:
          "Half the typical 0.08% driving limit. Even at 0.03% you cannot fly if you feel impaired. Refusing an FAA-requested sobriety test can result in certificate revocation.",
      },
      {
        label: "Drugs",
        value: "No operation while any drug affects faculties (incl. OTC)",
        detail:
          "Includes over-the-counter antihistamines (Benadryl), sleep aids, cough syrups with codeine, and prescriptions like opioids/benzodiazepines. Even legal medications that cause drowsiness or affect coordination are prohibited.",
      },
    ],
  },
  {
    title: "Night & civil twilight (§107.29)",
    rows: [
      {
        label: "Civil twilight (CONUS)",
        value: "30 min before sunrise → 30 min after sunset",
        detail:
          "Outside CONUS (Alaska, Hawaii, territories), civil twilight is published in the Air Almanac. During civil twilight you're treated as 'daylight' — but you STILL need anti-collision lighting visible 3 SM during civil twilight per §107.29.",
      },
      {
        label: "Anti-collision lighting",
        value:
          "Visible for 3 statute miles, sufficient flash rate to avoid collision",
        detail:
          "Required during civil twilight AND night. The light must be on the aircraft, not the controller. Manufacturers sell strobes that meet this standard. Without a compliant light, you cannot legally fly in civil twilight or at night, period.",
      },
      {
        label: "Night ops",
        value:
          "Allowed without waiver if (a) RP completed training covering night AND (b) aircraft has anti-collision lighting",
        detail:
          "This was the BIG 2021 amendment — before April 2021 every night flight required a waiver. Now if your initial knowledge test or recurrent training included the night-ops material AND you have a compliant strobe, you're good. Most knowledge tests after April 2021 include the night material by default.",
      },
    ],
  },
  {
    title: "Operations over people (§107.39 / §107.110–.140)",
    rows: [
      {
        label: "Category 1",
        value:
          "≤ 0.55 lb (250 g) AND no exposed rotating parts capable of laceration",
        detail:
          "The smallest category — a DJI Mini-class drone with prop guards. Weight is the key gate. No declaration of compliance needed; you just need to meet the criteria. This is the easiest path to legally fly over people.",
      },
      {
        label: "Category 2 (kinetic energy)",
        value:
          "≤ 11 ft-lb on impact + no laceration risk + Declaration of Compliance",
        detail:
          "Requires the manufacturer to file a Declaration of Compliance (DOC) with the FAA. Kinetic energy is measured at terminal velocity if the aircraft fell uncontrolled. The 11 ft-lb threshold is roughly the energy of a baseball pitched at 30 mph — non-lethal but bruising.",
      },
      {
        label: "Category 3 (kinetic energy)",
        value: "≤ 25 ft-lb + restrictions (closed/restricted access OR transit) + DoC",
        detail:
          "Heavier impact allowed (~25 ft-lb is like a softball pitched hard), but you can only operate either (a) over a closed/restricted site where people have been notified, OR (b) for brief transit over moving people. Cannot loiter over a crowd.",
      },
      {
        label: "Category 4",
        value: "Airworthiness certificate + operating limitations",
        detail:
          "For larger/heavier drones — requires a full FAA-issued airworthiness certificate (not just a DOC). You also need an operating limitations document. This is the path for delivery drones, large industrial UAS, etc.",
      },
      {
        label: "Over moving vehicles",
        value: "All categories may transit; sustained flight requires a closed/restricted site",
        detail:
          "Per §107.145, ALL categories (1–4) may TRANSIT over moving vehicles. SUSTAINED flight over moving vehicles is only permitted within or over a closed- or restricted-access site where occupants have been notified. Cat 4 also needs its operating limitations to permit it. This was a 2021 addition — before then all flight over moving vehicles required a waiver.",
      },
    ],
  },
  {
    title: "Accident reporting (§107.9)",
    rows: [
      {
        label: "Trigger",
        value:
          "Serious injury OR loss of consciousness OR property damage > $500 (excluding sUAS)",
        detail:
          "ANY one of these three triggers requires a report — they are independent (OR, not AND). 'Serious injury' = Level 3 on the Abbreviated Injury Scale (broken bones, hospitalization, etc.) — not just a scratch. 'Loss of consciousness' even briefly counts. The $500 EXCLUDES the cost of your own sUAS — so if your drone falls into the ocean and only the drone is damaged, no report needed.",
      },
      {
        label: "Deadline",
        value: "10 calendar days",
        detail:
          "Counted from the date of the accident, not business days. Submit through FAA DroneZone. Late reporting can lead to certificate action.",
      },
      {
        label: "Submit to",
        value: "FAA DroneZone",
        detail:
          "https://faadronezone.faa.gov — the same portal you use for registration, waivers, and authorizations. The accident report form is online; you do NOT call the FSDO unless they request follow-up.",
      },
      {
        label: "NTSB Part 830",
        value: "Required for any UAS accident with death/serious injury — regardless of weight",
        detail:
          "Per 49 CFR §830.2 and §830.5, an 'unmanned aircraft accident' requires NTSB notification if (a) a person is killed or suffers serious injury, OR (b) the UA has a max gross takeoff weight ≥ 300 lb AND sustains substantial damage. The death/serious-injury prong applies to Part 107 aircraft of ANY weight. So a serious-injury accident under Part 107 triggers BOTH an FAA §107.9 report AND an NTSB notification (different agencies, different timelines).",
      },
    ],
  },
  {
    title: "Certification (§107.61, §107.65, §107.77)",
    rows: [
      {
        label: "Pass score",
        value: "70% on the FAA Knowledge Test",
        detail:
          "42 correct out of 60. The exam is scored as a whole — you can't fail a single subject area as long as your total is ≥ 70%. There's no partial credit.",
      },
      {
        label: "Time on test",
        value: "2 hours, 60 questions",
        detail:
          "2 minutes per question average. The test is delivered at a PSI testing center (cost ~$175). You get the FAA testing supplement (with figures) and an on-screen calculator and electronic plotter. Personal calculators are generally not permitted — call the test center ahead to confirm their policy.",
      },
      {
        label: "Recurrent training",
        value: "Free online ALC-677 every 24 calendar months",
        detail:
          "Course ALC-677 on faasafety.gov is the current free online recurrent for all Part 107 remote pilots (both Part 107-only and Part 61-current pilots — the older ALC-515 was consolidated). Takes ~2 hours, no proctor, no fee. The certificate itself does NOT expire; you simply may not exercise its privileges (fly under Part 107) once your recurrent is older than 24 calendar months.",
      },
      {
        label: "Change of address",
        value: "30 days",
        detail:
          "§107.77 requires notifying FAA within 30 days of permanent address change. Update through IACRA. You cannot exercise certificate privileges if your address is not current (after the 30-day grace).",
      },
      {
        label: "Carry certificate",
        value: "Available for inspection by FAA / NTSB / TSA / law enforcement",
        detail:
          "Must be 'available' — paper, PDF on phone, or photo are all acceptable. You don't need the physical card on your person. Refusing to show it to an FAA inspector can result in certificate action.",
      },
    ],
  },
  {
    title: "Registration (Part 48)",
    rows: [
      {
        label: "Fee",
        value: "$5",
        detail:
          "Per Part 48. One $5 fee covers all aircraft you own under recreational rules, OR per-aircraft for Part 107 commercial use.",
      },
      {
        label: "Term",
        value: "3 years",
        detail:
          "Registration expires 3 years from the date of issue. The FAA emails reminders but it's your responsibility to renew. Flying with an expired registration is a violation.",
      },
      {
        label: "Marking",
        value: "Registration number externally visible on aircraft",
        detail:
          "Since Feb 2019 the number must be visible from the OUTSIDE of the aircraft — no longer acceptable inside a battery compartment. Permanent marking required (engraved, label, paint). The number begins with FA followed by an alphanumeric string assigned by the FAA at issuance (exact character count varies).",
      },
    ],
  },
  {
    title: "Remote ID (Part 89, effective Sept 16 2023)",
    rows: [
      {
        label: "Compliance paths",
        value:
          "1) Standard Remote ID built-in · 2) Broadcast Module · 3) FRIA (FAA-Recognized Identification Area)",
        detail:
          "Three options: (1) Buy a drone with Standard Remote ID built in — most 2023+ DJI/Autel drones. (2) Add an external Broadcast Module to an older drone. (3) Fly only inside a FRIA — an FAA-approved geographic area (typically AMA flying fields) that allows non-equipped operation.",
      },
      {
        label: "Broadcast contents",
        value:
          "UAS ID, lat/lon/alt, velocity, control-station lat/lon/elev, time mark, emergency status",
        detail:
          "The broadcast is over Bluetooth and/or Wi-Fi — not cellular. Anyone with a free FAA Drone Identification app can receive it within range (a few hundred feet to a few miles). The control station location is broadcast too — a deliberate privacy tradeoff for accountability.",
      },
      {
        label: "Range",
        value: "Visible to anyone within Bluetooth/Wi-Fi reception",
        detail:
          "Typically 1-3 miles in open terrain. Receivers include FAA enforcement, law enforcement, and any member of the public with a free app. There is NO 'turn off Remote ID' option — the drone refuses to take off if RID is required and not broadcasting.",
      },
    ],
  },
  {
    title: "Airspace authorization (§107.41)",
    rows: [
      {
        label: "Class B/C/D/E surface",
        value: "ATC authorization required (typically LAANC)",
        detail:
          "§107.41 prohibits operation in controlled airspace without ATC authorization. 'ATC authorization' = LAANC (instant) or DroneZone (manual review). You CANNOT just call the tower — they don't issue authorizations on the radio.",
      },
      {
        label: "Class G",
        value: "No authorization needed (still 400 AGL / VLOS)",
        detail:
          "Class G is uncontrolled — no ATC, no authorization. But you must STILL follow every other Part 107 rule: 400 AGL, VLOS, no flying over people without a category, etc. Most rural areas under 1,200 ft AGL are Class G.",
      },
      {
        label: "LAANC",
        value:
          "Near-real-time authorization at/below UAS Facility Map grid altitudes",
        detail:
          "Free, instant. Use Aloft, Airmap, Skyward, etc. The grid altitude is the FAA-pre-approved ceiling for that 1-square-mile cell. A grid value of '0' means manual approval required regardless of altitude.",
      },
      {
        label: "Above grid altitude or non-LAANC airport",
        value: "Use FAA DroneZone — manual review, can take 30–90 days",
        detail:
          "For airspace that exceeds the LAANC grid, or airports not in the LAANC network, you must submit through DroneZone. The FAA reviews case by case. Plan well ahead — emergency or short-notice requests are rarely approved.",
      },
    ],
  },
  {
    title: "Sectional chart colors / lines",
    rows: [
      {
        label: "Class B",
        value: "Solid blue lines",
        detail:
          "Always around the busiest airports (LAX, ATL, JFK, etc.). Extends from surface up to ~10,000 MSL typically. Notation '100/40' = ceiling 10,000 MSL, floor 4,000 MSL. Different shelves at different altitudes.",
      },
      {
        label: "Class C",
        value: "Solid magenta lines",
        detail:
          "Around medium-busy airports with radar service. Typically surface to 4,000 AGL. Outer ring extends 10 NM, inner core 5 NM. Notation '40/SFC' = ceiling 4,000 MSL, floor surface.",
      },
      {
        label: "Class D",
        value:
          "Dashed blue line, ceiling in square brackets (e.g., [25] = 2,500 MSL)",
        detail:
          "Around airports with an operating control tower that are not Class B or C. The [number] is the ceiling in hundreds of feet MSL (often ~2,500 ft above field elevation). Many Class D airports have radar via an associated TRACON/approach control. When the tower closes, Class D typically reverts to Class E or G.",
      },
      {
        label: "Class E to surface",
        value: "Dashed magenta line around airport",
        detail:
          "Found at non-towered airports with instrument approaches. The Class E starts at the SURFACE inside the dashed line, providing controlled airspace for IFR approaches. Important for sUAS: this requires ATC authorization just like Class B/C/D.",
      },
      {
        label: "Class E starting 700 AGL",
        value: "Faded/shaded magenta",
        detail:
          "Most populated areas of the US. Surface to 700 AGL is Class G (uncontrolled), then Class E above. Since sUAS flies at or below 400 AGL, you're typically in Class G — no authorization needed.",
      },
      {
        label: "Class E starting 1,200 AGL",
        value: "Faded/shaded blue",
        detail:
          "Less populated areas. Surface to 1,200 AGL is Class G. Same Part 107 implications — you're below the floor of controlled airspace.",
      },
      {
        label: "Mode C veil",
        value: "Thin solid magenta 30 NM around primary Class B",
        detail:
          "Manned aircraft must have a Mode C transponder within this veil. Doesn't directly affect sUAS, but expect heavier manned traffic — keep extra vigilance for see-and-avoid.",
      },
      {
        label: "Towered airport",
        value: "Blue airport symbol",
        detail:
          "Color is the quickest visual cue: blue = towered, magenta = non-towered. Always check the chart supplement for tower hours — many small Class D towers are part-time.",
      },
      {
        label: "Non-towered airport",
        value: "Magenta airport symbol",
        detail:
          "No control tower. Pilots self-announce on CTAF. Most general aviation airports. Still may have Class E to surface (dashed magenta) if instrument approaches exist.",
      },
      {
        label: "Star above symbol",
        value: "Part-time tower or operations",
        detail:
          "Indicates tower or services are not full-time. Check chart supplement for hours. When tower is closed, airport reverts to non-towered procedures and frequency.",
      },
      {
        label: "Hard-surface runway",
        value: "Symbol shows runway lines for 1,500–8,069 ft; ≥8,070 ft shown to scale",
        detail:
          "Airport symbol with two crossing lines = hard-surface runway. If the runway is ≥ 8,070 ft, the chart shows it geographically scaled (matches actual runway orientation/length). The smaller airports use a generic symbol.",
      },
    ],
  },
  {
    title: "Special use airspace",
    rows: [
      {
        label: "Prohibited (P-)",
        value: "No flight allowed, ever",
        detail:
          "Examples: P-56 (Washington, DC — White House/Capitol/Naval Observatory) and P-40 (Camp David, MD). No exceptions for sUAS. Violations can result in criminal charges, not just FAA action.",
      },
      {
        label: "Restricted (R-)",
        value: "Hazards present; need authorization when active",
        detail:
          "Active restricted areas have hazardous activities — live fire, missile testing, etc. Check NOTAMs or the controlling agency for active status. When inactive, flight is permitted but still requires caution.",
      },
      {
        label: "Warning (W-)",
        value: "Same as Restricted but > 3 NM from coast",
        detail:
          "Beyond the US 3-mile territorial limit, the US can't formally restrict — so it's a 'warning' instead. Treat same as restricted for safety. Common around naval exercise areas offshore.",
      },
      {
        label: "MOA",
        value: "Military training; check active status",
        detail:
          "Military Operations Area — high-speed military training. Not restricted to civilian aircraft, but VFR pilots should avoid when active. Check controlling agency or Flight Service for status.",
      },
      {
        label: "Alert",
        value:
          "Unusual activity; non-participating pilots permitted but use caution",
        detail:
          "Often around military training airfields. Expect a high volume of training aircraft (touch-and-gos, formation flying). Heightened vigilance recommended.",
      },
      {
        label: "CFA",
        value:
          "Controlled Firing Area — not depicted (activity suspended when aircraft detected)",
        detail:
          "Because activity is automatically stopped if any aircraft is detected, CFAs don't need to be charted. They exist on the ground but pose no airspace hazard.",
      },
      {
        label: "NSA",
        value: "National Security Area — voluntary avoidance requested",
        detail:
          "Around sensitive sites (nuclear facilities, etc.). The FAA can convert an NSA to a temporary restricted area or TFR if the situation warrants. Avoidance is voluntary unless escalated.",
      },
    ],
  },
  {
    title: "TFRs",
    rows: [
      {
        label: "Stadium TFR (FDC 4/3621)",
        value:
          "30,000+ open-air seats · 1 hr before to 1 hr after · 3 NM / up to 3,000 AGL",
        detail:
          "Applies to MLB, NFL, NCAA Division I football, NASCAR/Indy/Champ Car (capacity 30,000+). Always check NOTAMs before flying — even at distance from a stadium on game day. Violations have been criminally prosecuted.",
      },
      {
        label: "Presidential",
        value: "Inner 10 NM (no GA), outer 30 NM, surface to 17,999 MSL",
        detail:
          "Issued when POTUS travels. Inner 10 NM is fully restricted to general aviation including all sUAS. Outer 30 NM allows VFR with ATC contact but no sUAS. Violations are prosecuted as federal crimes.",
      },
      {
        label: "Disney standing TFR",
        value: "3 NM / 3,000 AGL",
        detail:
          "Permanent TFRs around Walt Disney World (FL) and Disneyland (CA). Pre-9/11 era exception that became permanent. Strict enforcement.",
      },
      {
        label: "Wildfire (§91.137)",
        value: "Avoid the area; check NOTAMs",
        detail:
          "Issued during firefighting operations. Even small drones can ground the entire fire-suppression air operation — every drone incursion stops aerial water/retardant drops. FAA fines have exceeded $20,000 for single incursions.",
      },
      {
        label: "DC SFRA",
        value: "30 NM around DCA VOR/DME · FRZ inner 15 NM",
        detail:
          "Washington DC Special Flight Rules Area: 30 NM radius requires special procedures even for manned aircraft. Inner 15 NM Flight Restricted Zone (FRZ) prohibits virtually all general aviation and ALL sUAS without specific permission. Strict NORAD enforcement.",
      },
    ],
  },
  {
    title: "Weather essentials",
    rows: [
      {
        label: "Standard atmosphere",
        value:
          "15°C / 59°F · 29.92 inHg · lapse 2°C per 1,000 ft",
        detail:
          "ISA — International Standard Atmosphere. The reference for performance charts. Real conditions are rarely standard; the deviation is what creates density altitude effects.",
      },
      {
        label: "Density altitude",
        value: "Hot + high + humid = HIGH DA = degraded performance",
        detail:
          "Density altitude = pressure altitude corrected for non-standard temperature. High DA means the air is THINNER — your motor produces less thrust, your props bite less air. A 90°F day at a 5,000 ft airport can feel like 8,000+ ft to the aircraft. Range, endurance, climb rate all suffer.",
      },
      {
        label: "Fog formation",
        value: "Small temp-dewpoint spread (≤ 5°F or converging)",
        detail:
          "When dewpoint nearly equals temperature, the air is saturated. Watch the spread on hourly METARs — if it's closing fast at sunset, expect fog by morning. Radiation fog burns off after sunrise; advection fog (moist air moving over cold ground) can persist.",
      },
      {
        label: "Stable air",
        value: "Smooth, stratus, steady precip, poor visibility",
        detail:
          "Stable air resists vertical motion — clouds spread out into layers, precipitation falls steadily, haze/smoke accumulate (poor visibility). Pilot rides feel smooth. Good for photography missions, bad for visibility-dependent observations.",
      },
      {
        label: "Unstable air",
        value: "Turbulence, cumulus, showers, good visibility",
        detail:
          "Unstable air rises freely — heat from the surface creates updrafts, cumulus clouds build vertically, showers form, and visibility is excellent because particles get carried up and out. Bad for smooth video, hazardous for small drones.",
      },
      {
        label: "Cold front",
        value: "Fast, towering cumulus, squall lines, brief intense precip",
        detail:
          "Cold air wedges under warmer air, lifting it rapidly. Fast-moving (25-35 kt typical). Often produces a narrow line of thunderstorms ahead of the front, then clearing within an hour or two of passage. Wind shifts sharply.",
      },
      {
        label: "Warm front",
        value: "Slow, stratus, drizzle, low ceilings, long-lasting",
        detail:
          "Warm air rides up over colder air on a gentle slope. Moves slowly (10-15 kt). Brings widespread stratus, low ceilings, drizzle that lasts for hours or days. Worst case for sUAS visibility/ceiling minimums.",
      },
      {
        label: "Thunderstorm 3 ingredients",
        value: "Unstable air + moisture + lifting force",
        detail:
          "All three required. Lifting force can be a front, terrain, or convective heating. Once any one is removed, the thunderstorm dies. Cannot have a thunderstorm without all three.",
      },
      {
        label: "TS stages",
        value:
          "Cumulus → Mature (most dangerous, hail/microbursts) → Dissipating",
        detail:
          "Cumulus stage: building updrafts only. Mature stage: BOTH updrafts and downdrafts coexist — this is when hail, lightning, microbursts, and tornadoes occur. The mature stage BEGINS when precipitation reaches the surface. Dissipating: downdrafts dominate, storm weakens.",
      },
      {
        label: "Microburst",
        value:
          "Downdraft up to 6,000 fpm; outflow up to 45 kt; 5–15 min total",
        detail:
          "A small (1-3 NM) intense downdraft from a thunderstorm. Lifespan is short (5-15 min). Outflow winds at the surface can reverse direction across the burst — a sUAS would experience headwind then tailwind in seconds, often crashing. Avoid all storm cells.",
      },
      {
        label: "AIRMET Sierra/Tango/Zulu",
        value: "Mountain obscuration / Turbulence / Icing",
        detail:
          "Sierra: IFR conditions or extensive mountain obscuration. Tango: moderate turbulence or sustained surface winds ≥ 30 kt. Zulu: moderate icing and freezing levels. Active for 6-hour periods. Important for sUAS flying in mountain regions or winter conditions.",
      },
      {
        label: "Convective SIGMET",
        value: "Tornadoes, hail ≥ ¾\", winds ≥ 50 kt, OR line/embedded TS",
        detail:
          "Issued for the most dangerous convective weather. Any of these criteria triggers it. Issued for 2-hour periods. If a Convective SIGMET covers your area — do not fly, period.",
      },
    ],
  },
  {
    title: "METAR decoding cheat",
    rows: [
      {
        label: "Sky cover (oktas)",
        value:
          "FEW ≤ 2 · SCT 3–4 · BKN 5–7 · OVC 8 · CLR (auto, none ≤ 12,000) · SKC (manual)",
        detail:
          "Oktas = eighths of sky covered. The 'ceiling' for sUAS purposes is the lowest BKN or OVC layer. SCT and FEW do NOT count as a ceiling. CLR is auto-stations finding no clouds below 12,000; SKC is a human observer.",
      },
      {
        label: "Cloud height",
        value: "Hundreds of feet AGL (e.g., BKN040 = broken at 4,000 AGL)",
        detail:
          "Heights are above ground level at the reporting station, not above sea level. To convert to MSL, add the station elevation. Important for cloud clearance math: you need 500 ft below the BKN/OVC layer.",
      },
      {
        label: "Wind",
        value:
          "dddffGff — direction (true), speed, gusts. VRB = variable, 00000KT = calm",
        detail:
          "Direction is TRUE north (not magnetic). 18015G25KT = wind from 180° true at 15 knots, gusting to 25 knots. The first three digits are direction, next two are sustained speed, optional G + two digits is gust speed.",
      },
      {
        label: "Temp/dewpoint",
        value: "Celsius, M = minus (M05/M08 = -5°C / -8°C)",
        detail:
          "Format is TT/DD with M prefix for negative. Always Celsius. Small spread = wet air (fog risk). Large spread = dry air. The remarks section (RMK) may have temp in 0.1°C precision (T01230118 = +12.3°C/+11.8°C).",
      },
      {
        label: "Altimeter",
        value: "A2992 = 29.92 inHg",
        detail:
          "Drop the decimal, A + 4 digits = inches of mercury. 'Q' prefix would be hectopascals (rest of world). 29.92 is standard sea level pressure.",
      },
      {
        label: "Visibility",
        value: "Statute miles. P6SM = greater than 6 SM",
        detail:
          "Format is digits + SM (e.g., 1/2SM = half mile, 3SM = three miles). P6SM means visibility exceeds 6 statute miles. Below 7 SM the actual value is reported; above 6 it's just 'plus six.'",
      },
      {
        label: "Vertical visibility",
        value: "VV002 = obscured sky, ceiling 200 ft",
        detail:
          "Used when sky is obscured (fog, heavy precipitation) and observer cannot see cloud bases. VV002 means the observer can only see straight up 200 ft. Treat as the ceiling for cloud-clearance purposes.",
      },
    ],
  },
  {
    title: "METAR weather abbreviations",
    rows: [
      {
        label: "Intensity prefix",
        value:
          "− light · (no prefix) moderate · + heavy · VC in vicinity (5–10 SM)",
      },
      {
        label: "Descriptor",
        value:
          "MI shallow · BC patches · BL blowing · SH showers · TS thunderstorm · FZ freezing",
      },
      {
        label: "Precipitation",
        value:
          "RA rain · DZ drizzle · SN snow · GR hail · GS small hail · PL ice pellets · IC ice crystals",
      },
      {
        label: "Obscuration",
        value:
          "FG fog · BR mist (5/8 – <7 SM) · HZ haze · FU smoke · SA sand · DU dust",
      },
      {
        label: "Other",
        value:
          "SQ squall · FC funnel cloud · SS sandstorm · DS duststorm · PO dust whirl · UP unknown",
      },
    ],
  },
  {
    title: "TAF decoding cheat",
    rows: [
      {
        label: "Validity period",
        value:
          "DDhhhh — day + start hour + end hour (e.g., 1218/1318 = 18Z day 12 to 18Z day 13)",
        detail:
          "24-hour forecast typically. The first 4 digits are start (day + hour Z), second 4 are end. TAFs are issued 4×/day for major airports.",
      },
      {
        label: "FM (FroM)",
        value:
          "Rapid change — new conditions starting at specified time, supersedes previous",
        detail:
          "FM1500 = at 1500Z, conditions suddenly become whatever follows. Before FM time = previous forecast. After = new conditions. Sharp transition (within 1 hour). Used for frontal passages.",
      },
      {
        label: "BECMG (BECoMinG)",
        value:
          "Gradual change, typically over 1–2 hours within the stated window",
        detail:
          "BECMG 1416 = gradually transitioning between 14Z and 16Z. The change happens at some point in that window. Used for slower transitions like morning fog burn-off.",
      },
      {
        label: "TEMPO",
        value:
          "Temporary fluctuations expected < 1 hour, in any 30-min period within window",
        detail:
          "TEMPO 1418 = temporary changes possible between 14Z and 18Z, each lasting less than an hour. Used for scattered showers, brief lower visibility, etc. Plan for both base conditions AND tempo conditions.",
      },
      {
        label: "PROB30 / PROB40",
        value:
          "30% / 40% probability of stated conditions; PROB never appears with FM",
        detail:
          "Used when forecasters are unsure. PROB30 SHRA = 30% chance of rain showers in the stated period. PROB only goes up to 40%; if > 50% it would be stated as the base forecast or BECMG/TEMPO.",
      },
      {
        label: "Wind shear",
        value:
          "WS010/18040 = wind shear at 1,000 ft AGL, wind from 180° at 40 kt",
        detail:
          "Forecasts non-convective wind shear (the kind that doesn't show up as thunderstorms). The altitude is hundreds of feet AGL, then wind direction/speed at that altitude. Very dangerous for small UAS during climb/descent.",
      },
    ],
  },
  {
    title: "PIREP / Winds Aloft decoding",
    rows: [
      {
        label: "PIREP types",
        value:
          "UA = routine pilot report · UUA = urgent (LLWS, severe turbulence, severe icing, hail, volcanic ash)",
        detail:
          "Pilot Weather Reports give real-time conditions from manned aircraft. UUA (urgent) is reserved for genuinely hazardous conditions. Always check PIREPs before flying — they're the most current truth on actual weather.",
      },
      {
        label: "PIREP fields",
        value:
          "/OV location · /TM time Z · /FL altitude · /TP aircraft type · /SK sky · /TA temp · /WV wind · /TB turbulence · /IC icing · /RM remarks",
        detail:
          "Slash-prefixed codes. Example: 'UA /OV ABC180020 /TM 1630 /FL060 /TP C172 /SK BKN035 /TB MDT 050-070' = routine PIREP 20 NM south of ABC VOR at 1630Z, 6,000 ft, Cessna 172, broken at 3,500, moderate turbulence between 5,000-7,000.",
      },
      {
        label: "Winds Aloft (FB)",
        value:
          "ddffTT — direction tens of degrees (true), speed knots, temperature °C (negative implied ≥ 24,000)",
        detail:
          "Forecast wind direction (rounded to nearest 10°) and speed at various altitudes (3,000, 6,000, 9,000, 12,000, 18,000 etc.). At 24,000 and above temperature is always negative (sign implied). Below 3,000 ft no FB issued for that area.",
      },
      {
        label: "Winds Aloft example",
        value:
          "7030 = 200° at 130 kt (direction digits ≥ 51 signal speed ≥ 100 kt: subtract 50 from direction, add 100 to speed)",
        detail:
          "Trick for encoding wind speeds ≥ 100 kt: the direction field is only 2 digits (00–36 are valid as tens-of-degrees). If the encoded direction appears as 51–86, that's the signal that speed is ≥ 100 kt. Decode by subtracting 50 from the direction and adding 100 to the speed. Example: 7030 → direction 70 - 50 = 20 → 200° true, speed 30 + 100 = 130 kt. Another: 7345 → 230° at 145 kt.",
      },
      {
        label: "9900",
        value: "Light and variable wind (< 5 kt)",
        detail:
          "Special code meaning wind speed < 5 knots from no consistent direction. Treat as 'effectively calm' for flight planning.",
      },
    ],
  },
  {
    title: "Hazardous attitudes + antidotes",
    rows: [
      {
        label: "Anti-authority",
        value:
          "\"Don't tell me.\" → Follow the rules. They are usually right.",
        detail:
          "The pilot resents being told what to do. Manifests as ignoring NOTAMs, skipping pre-flight checklists, deciding rules don't apply to 'me' or 'this flight.' Antidote is to acknowledge that rules exist for reasons — typically because someone died proving the lesson.",
      },
      {
        label: "Impulsivity",
        value: "\"Do something — quickly.\" → Not so fast. Think first.",
        detail:
          "When something goes wrong, the impulsive pilot reacts instantly to the first thing that comes to mind. Often the wrong action. Antidote: train yourself to pause 2-3 seconds before responding to non-immediate emergencies. The aircraft will fly without input for a few seconds.",
      },
      {
        label: "Invulnerability",
        value: "\"It won't happen to me.\" → It could happen to me.",
        detail:
          "The 'accidents happen to other people' attitude. Often appears after several uneventful flights. Antidote: actively imagine your own flight in news headlines. Read NTSB reports of accidents that happened to pilots much like you.",
      },
      {
        label: "Macho",
        value: "\"I can do it.\" → Taking chances is foolish.",
        detail:
          "Demonstrating skill or ability becomes more important than safety. Pushing weather, flying when fatigued, accepting marginal conditions to prove competence. Antidote: real skill is knowing when NOT to fly.",
      },
      {
        label: "Resignation",
        value:
          "\"What's the use?\" → I'm not helpless. I can make a difference.",
        detail:
          "Pilot gives up in the face of difficulty — accepts a bad situation as inevitable instead of taking action. Often appears in long emergencies. Antidote: fly the aircraft until it stops moving. Every second of input matters.",
      },
    ],
  },
  {
    title: "ADM / CRM models",
    rows: [
      {
        label: "3P",
        value: "Perceive · Process · Perform",
        detail:
          "Cycle continuously throughout a flight. Perceive: gather information (instruments, environment, aircraft state). Process: evaluate against your plan and limits. Perform: act on the decision. Then perceive again — it's a loop, not a one-time check.",
      },
      {
        label: "PAVE",
        value: "Pilot · Aircraft · enVironment · External pressures",
        detail:
          "Pre-flight risk assessment checklist. Pilot: am I healthy, current, trained? Aircraft: is it airworthy, equipped, fueled? Environment: weather, terrain, airspace, traffic? External pressures: client deadlines, fear of cancellation? Honest assessment of all four reduces risk.",
      },
      {
        label: "DECIDE",
        value: "Detect · Estimate · Choose · Identify · Do · Evaluate",
        detail:
          "Six-step problem-solving model. Detect a change. Estimate the need to react. Choose a desired outcome. Identify actions to achieve it. Do the action. Evaluate the result and repeat if needed.",
      },
      {
        label: "IMSAFE",
        value: "Illness · Medication · Stress · Alcohol · Fatigue · Eating/Emotion",
        detail:
          "Personal pre-flight checklist. Run through each item honestly. Even one 'no' should prompt cancellation or delay. The single most-skipped item is Fatigue — pilots routinely fly tired and rationalize it.",
      },
      {
        label: "Risk",
        value: "Likelihood × Severity",
        detail:
          "Quantitative risk model. A high-severity event (death, total loss) with low likelihood may still be unacceptable risk. A low-severity event with high likelihood (battery low) is manageable. The product of the two should drive your go/no-go decision.",
      },
    ],
  },
  {
    title: "Loading & performance",
    rows: [
      {
        label: "Forward CG",
        value: "More stable · slower · higher stall speed · harder flare",
        detail:
          "Center of gravity ahead of the design point makes the aircraft 'nose-heavy.' More stable in pitch (returns to level easily), but elevator has to work harder to lift the nose — higher stall speed, harder to flare for landing. Generally safer than aft CG.",
      },
      {
        label: "Aft CG",
        value: "Less stable · faster · lower stall speed · harder to recover",
        detail:
          "Center of gravity behind the design point makes the aircraft 'tail-heavy.' Less drag (faster), lower stall speed, but unstable in pitch (small inputs amplify). Recovery from a stall becomes difficult or impossible past the aft CG limit. More dangerous than forward CG.",
      },
      {
        label: "Increased weight",
        value: "Longer takeoff · reduced climb · higher stall · shorter endurance",
        detail:
          "More weight = more lift required = higher angle of attack at any speed = closer to stall. Takeoff roll grows roughly with the square of weight increase. Climb rate decreases proportionally. Battery/fuel burn accelerates. Always check max takeoff weight before adding payload.",
      },
      {
        label: "Density altitude high (hot/high/humid)",
        value: "Degraded performance",
        detail:
          "Thinner air = less lift, less thrust. A drone that hovers easily at sea level on a cool day may struggle at 7,000 ft on a hot day even at the same battery state. Performance charts assume standard atmosphere — adjust for actual conditions.",
      },
      {
        label: "LiPo storage",
        value:
          "~3.8 V/cell (40–60% charge); do not store full or empty; swelling = damaged",
        detail:
          "LiPo cells stored at full charge for weeks lose capacity permanently. Stored at empty they may not recharge at all. Storage charge ~3.8V/cell maximizes shelf life. Swollen cells are damaged and dangerous — dispose of (do not puncture or fly).",
      },
      {
        label: "LiPo fire",
        value: "Thermal runaway — cool with copious water; do NOT use Class D (that's for lithium METAL)",
        detail:
          "LiPo / lithium-ION cells in thermal runaway are best cooled with copious water — water cools adjacent cells and prevents propagation. Class D dry chemical is intended for lithium METAL fires (a different chemistry), not LiPo. If water isn't available, smother with sand or move the pack to a non-flammable area and let it burn out. Always charge in a fire-safe bag, never puncture or fly a swollen pack.",
      },
    ],
  },
  {
    title: "Night vision",
    rows: [
      {
        label: "Dark adaptation",
        value: "30 minutes; one bright light resets",
        detail:
          "Rods (low-light receptors) take ~30 minutes to fully sensitize. A single bright light (flashlight in your eye, headlights) destroys adaptation in milliseconds. Use red flashlight for chart-reading at night to preserve adaptation.",
      },
      {
        label: "Rods",
        value: "Low light, peripheral; use OFF-CENTER viewing at night",
        detail:
          "Rods are concentrated outside the center of vision. To see a dim object at night, look slightly to one side of it — the rods will detect it. Stare directly and it disappears. Crucial for spotting aircraft lights at night.",
      },
      {
        label: "Cones",
        value: "Color, central; need good light",
        detail:
          "Cones provide color and sharp central vision but only work in bright light. They cover the fovea (very small area). Useless at night — which is why everything appears in shades of gray.",
      },
    ],
  },
  {
    title: "Right of way (§107.37)",
    rows: [
      {
        label: "sUAS rule",
        value:
          "YIELD to ALL other aircraft, manned or unmanned, at all times",
        detail:
          "§107.37(a) is unconditional. Doesn't matter if a manned aircraft entered your airspace without authorization — you yield. Doesn't matter if you got there first. sUAS NEVER has right of way.",
      },
      {
        label: "Manned right-of-way order",
        value:
          "Balloon > Glider > Airship > Airplane/Rotorcraft (most maneuverable yields)",
        detail:
          "From least to most maneuverable: balloon (no propulsion), glider (no engine), airship (slow, low maneuver), powered aircraft. The general principle: aircraft with more maneuverability/options must give way to those with fewer. Doesn't apply to sUAS — you yield to all.",
      },
      {
        label: "Aircraft in distress",
        value: "Always has right of way",
        detail:
          "Trumps every other rule including the order above. An aircraft declaring emergency or showing distress signals gets right of way over everyone. Pilots are required to assist if able and safe.",
      },
    ],
  },
  {
    title: "Airport patterns & radio",
    rows: [
      {
        label: "Standard pattern",
        value:
          "LEFT turns. Legs: upwind → crosswind → downwind → base → final",
        detail:
          "Default at all airports unless marked otherwise. Pilots scan left for traffic during turns. The standard entry is on a 45° to the downwind leg at pattern altitude.",
      },
      {
        label: "Right traffic indicator",
        value: "\"RP\" near runway in A/FD, or segmented circle",
        detail:
          "RP = Right Pattern. Indicated in the chart supplement entry next to the runway designator (e.g., 'RWY 27: RP'). On the airport surface, a segmented circle near the wind sock indicates traffic patterns visually.",
      },
      {
        label: "Runway number",
        value:
          "Magnetic heading rounded to nearest 10° (drop last digit). Runway 27 = ~270°",
        detail:
          "Runway 9 = 090°, Runway 18 = 180°, Runway 36 = 360°. The opposite end is always 18 numbers different. So Runway 27 is the reverse of Runway 9 — same strip of pavement, just landing in the opposite direction.",
      },
      {
        label: "CTAF default",
        value: "122.9 MULTICOM when no assigned freq",
        detail:
          "Common Traffic Advisory Frequency. 122.9 is the default at uncontrolled airports without an assigned frequency. Other common ones: 122.7, 122.8, 122.975. Always check chart supplement for the specific airport's CTAF.",
      },
      {
        label: "Beacons",
        value:
          "White-Green = lighted civilian land · White-White-Green = military · Green-Yellow = heliport",
        detail:
          "Rotating beacon colors identify airport type. White-green = standard civilian airport. White-white-green = military. Green-yellow = heliport. Yellow alone = water airport. Beacons normally operate sunset to sunrise. A beacon operating DURING DAYTIME at a Class B/C/D/E surface airport indicates IFR conditions (ceiling < 1,000 ft and/or visibility < 3 SM). (Note: this is common practice, not a regulatory requirement.)",
      },
      {
        label: "VASI/PAPI on glideslope",
        value:
          "2-bar VASI: Red over White = on glidepath · Red over Red = too low · White over White = too high",
        detail:
          "Visual Approach Slope Indicator (VASI, 2 bars) and Precision Approach Path Indicator (PAPI, 4 lights in a row). Standard mnemonics: \"Red over white, you're alright\" (on glidepath). \"Red over red, you're dead\" (too low). \"White over white, flying out of sight / high as a kite\" (too high). PAPI uses the same logic with 4 lights in a row.",
      },
    ],
  },
  {
    title: "Load factor in turns",
    rows: [
      {
        label: "Level turn formula",
        value: "Load factor = 1 / cos(bank angle)",
        detail:
          "Why bank costs G: in a level turn the wing must support both gravity AND the horizontal force pulling the aircraft into the turn. The vertical component of lift must equal weight; total lift must be greater. Result: load factor grows as bank steepens.",
      },
      {
        label: "30° bank",
        value: "1.15 G",
        detail:
          "Adds 15% to apparent weight. Modest performance impact. Standard rate turns at most airspeeds use this bank angle.",
      },
      {
        label: "45° bank",
        value: "1.41 G",
        detail:
          "41% more apparent weight. Stall speed increases ~19% (√1.41). Most pilots feel this turn as 'firm.'",
      },
      {
        label: "60° bank",
        value: "2.0 G (doubles weight)",
        detail:
          "Wings carry twice the load. Stall speed grows by √2 (~41% higher). For a 60° bank at low altitude, this is the angle that has killed many pilots — stall speed jumps before they realize they're slow.",
      },
      {
        label: "75° bank",
        value: "3.86 G",
        detail:
          "Stall speed nearly doubles. Aerobatic territory. Most general aviation aircraft are not stressed for sustained turns at this bank.",
      },
      {
        label: "Stall speed in turn",
        value:
          "New Vs = Vs × √(load factor) — at 60° bank, stall speed increases 41%",
        detail:
          "If Vs is 50 kt straight-and-level, at 60° bank Vs becomes 50 × √2 = 70.7 kt. So flying at 60 kt in a steep turn = stalled.",
      },
    ],
  },
  {
    title: "Military Training Routes (MTRs)",
    rows: [
      {
        label: "Three-digit (IR-123, VR-456)",
        value: "Includes one or more segments ABOVE 1,500 ft AGL",
        detail:
          "Three digits = the route has segments above 1,500 AGL somewhere along its length. Doesn't mean the whole route is high — could be entirely high, or mostly low with high transitions. Always cross-reference the chart supplement for altitude segments.",
      },
      {
        label: "Four-digit (IR-1234, VR-1207)",
        value: "Flown entirely AT or BELOW 1,500 ft AGL",
        detail:
          "Four digits = the entire route is at or below 1,500 AGL. These are the routes that most concern sUAS — military jets at 250-500 kt below your typical 400 AGL ceiling. Avoid known MTR centerlines and the 5-NM corridor on each side.",
      },
      {
        label: "IR vs VR",
        value:
          "IR = under IFR rules (no weather min). VR = under VFR (need 5 SM vis, ceilings ≥ 3,000)",
        detail:
          "IR (Instrument Routes) operate any time regardless of weather. VR (Visual Routes) only flown in VFR conditions. If weather is bad, VR traffic is grounded — but IR traffic is still active.",
      },
      {
        label: "Speed",
        value: "Often > 250 KIAS (manned military, low-level)",
        detail:
          "The 250-knot speed limit below 10,000 MSL does NOT apply to military aircraft on MTRs. F-16s and similar can be flying 400+ kt at 500 AGL. A sUAS has essentially zero time to react.",
      },
    ],
  },
  {
    title: "VASI / PAPI / runway lighting",
    rows: [
      {
        label: "VASI (2-bar)",
        value:
          "Red over red = below glidepath (low) · Red over white = on glidepath · White over white = above (high)",
        detail:
          "Two horizontal bars of lights at the runway threshold. Read top-bar/bottom-bar. The standard 3° glidepath provides obstacle clearance to the runway threshold. Critical for manned approach — relevant to sUAS pilots only for understanding traffic.",
      },
      {
        label: "PAPI (4 lights, horizontal)",
        value:
          "4 red = far below · 3 red 1 white = slightly low · 2 red 2 white = on glidepath · 1 red 3 white = slightly high · 4 white = far high",
        detail:
          "Four lights in a horizontal row. The number of reds increases as you go lower. Many modern airports have PAPI instead of VASI. Same 3° glidepath standard.",
      },
      {
        label: "REIL",
        value:
          "Runway End Identifier Lights — flashing white synchronized strobes near runway threshold",
        detail:
          "Helps pilots identify the approach end of the runway, especially in poor visibility or at airports with confusing layouts. Two synchronized strobes flashing 1-2 Hz. Different from approach lighting (sequenced flashing).",
      },
      {
        label: "Runway edge lighting (HIRL/MIRL/LIRL)",
        value:
          "High/Medium/Low Intensity Runway Lights — all white; last 2,000 ft on instrument runways = yellow ('caution zone')",
        detail:
          "Edge lights are white except for the last 2,000 ft of an instrument runway, which transitions to yellow (caution zone — runway ends soon). The threshold lights are GREEN on the approach side. Departure end is RED.",
      },
      {
        label: "Threshold lights",
        value: "Green (approach side) / Red (departure side)",
        detail:
          "From the air at night, green = where you should land. Red = where you should NOT land (other end of the runway). Helps prevent landing in the wrong direction.",
      },
    ],
  },
  {
    title: "Spatial illusions at night",
    rows: [
      {
        label: "Featureless terrain illusion",
        value:
          "Approach over dark area appears too high — tendency to fly approach too low",
        detail:
          "Without ground features for reference, the brain mis-perceives altitude. Pilots fly the approach lower than indicated, occasionally striking obstacles short of the runway. Trust the instruments and VASI, not your eyes.",
      },
      {
        label: "False horizon",
        value:
          "Sloping cloud layer / lights / coastline at night confuses true horizon",
        detail:
          "Sloping cloud tops, a line of city lights, or a curving coastline can be mistaken for the horizon. Aircraft attitude becomes confused. Trust attitude indicator over external visual cues at night.",
      },
      {
        label: "Autokinesis",
        value:
          "Stare at single light in dark too long (6–12 sec) → light appears to move",
        detail:
          "A stationary light viewed against a dark featureless background will seem to drift after about 6-12 seconds of staring. Pilots have followed 'moving lights' that were stars. Move your eyes around to break the illusion.",
      },
      {
        label: "Black hole approach",
        value: "Approach over water/unlit terrain — flat sense of altitude",
        detail:
          "When the only visible lights are at the airport itself (over water, jungle, desert), there's no altitude reference between you and the runway. Pilots can fly into terrain or water short of the runway thinking they're on glidepath.",
      },
      {
        label: "Reverse perspective",
        value: "Sloping runway alters perceived approach angle",
        detail:
          "An uphill runway makes you feel high (so you push lower); a downhill runway makes you feel low (you flare too high). Know the runway slope before approaching.",
      },
    ],
  },
  {
    title: "Compass / magnetic variation",
    rows: [
      {
        label: "Isogonic lines",
        value: "Lines of equal magnetic variation on sectional (e.g., '5°E')",
        detail:
          "Lines crossing the chart connect points with equal magnetic variation. 0° variation line (agonic line) currently runs roughly through the central Mississippi River valley. East of agonic = westerly variation; west of agonic = easterly variation.",
      },
      {
        label: "Easterly variation",
        value: "True direction MINUS variation = magnetic. (\"East is least\")",
        detail:
          "If true heading is 090° and variation is 5°E, magnetic heading = 090° - 5° = 085°. Why: the compass points to magnetic north, which is east of true north here, so the compass reads a smaller number.",
      },
      {
        label: "Westerly variation",
        value: "True direction PLUS variation = magnetic. (\"West is best\")",
        detail:
          "If true heading is 090° and variation is 5°W, magnetic heading = 090° + 5° = 095°. The compass points west of true north, so the compass reads a larger number for the same actual direction.",
      },
      {
        label: "Deviation",
        value:
          "Compass error from aircraft magnetic fields — shown on compass correction card",
        detail:
          "Iron and electronics in the aircraft create small local magnetic distortions. The compass correction card (mounted near the compass) shows specific corrections at various headings. Apply AFTER variation, not before.",
      },
      {
        label: "TVMDC + variation rule of thumb",
        value:
          "True → (apply Variation) → Magnetic → (apply Deviation) → Compass",
        detail:
          "Memorize as 'TV Makes Dull Children.' Start with True course from chart, apply variation → Magnetic, apply deviation → Compass heading to fly. Reverse for the other direction ('Can Dead Men Vote Twice' = Compass → Deviation → Magnetic → Variation → True).",
      },
    ],
  },
  {
    title: "Phonetic alphabet (ICAO)",
    rows: [
      { label: "A B C D E", value: "Alpha · Bravo · Charlie · Delta · Echo" },
      { label: "F G H I J", value: "Foxtrot · Golf · Hotel · India · Juliet" },
      { label: "K L M N O", value: "Kilo · Lima · Mike · November · Oscar" },
      { label: "P Q R S T", value: "Papa · Quebec · Romeo · Sierra · Tango" },
      {
        label: "U V W X Y Z",
        value: "Uniform · Victor · Whiskey · X-ray · Yankee · Zulu",
      },
      {
        label: "Numbers",
        value: "Zero · Wun · Too · Tree · Fower · Fife · Six · Seven · Eight · Niner",
      },
    ],
  },
  {
    title: "Sectional chart numbers to recognize",
    rows: [
      {
        label: "Maximum Elevation Figure (MEF)",
        value:
          "Largest digit = thousands · smaller digit = hundreds (e.g., '15' = 1,500 ft MSL). Tallest obstacle + buffer in quadrant",
        detail:
          "Computed as: highest terrain or obstacle in the quadrant, rounded up, plus a buffer (100 ft for obstacles, 300 ft for vegetation/terrain uncertainty, plus 100 ft for chart accuracy). MEF guarantees you'll clear everything in that quadrant at that altitude.",
      },
      {
        label: "Class B notation",
        value: "100/40 = ceiling 10,000 MSL / floor 4,000 MSL",
        detail:
          "Two numbers separated by slash, both in hundreds of feet MSL. Top number is the ceiling, bottom is the floor. Class B has multiple shelves at different altitudes — each shelf labeled with its own notation.",
      },
      {
        label: "Class C notation",
        value: "40/SFC = ceiling 4,000 MSL / floor surface",
        detail:
          "SFC means surface — the airspace starts at the ground. 40 = 4,000 MSL ceiling. Inner core typically goes to surface; outer ring typically floor at higher altitude.",
      },
      {
        label: "Class D ceiling",
        value:
          "Number in square brackets, hundreds of feet MSL (e.g., [25] = 2,500 MSL)",
        detail:
          "Square brackets always indicate Class D ceiling. Floor is always surface within the dashed blue line. Some Class D has a notation like '-15' or '[-15]' = ceiling 1,500 minus, meaning excluded airspace at top.",
      },
      {
        label: "Obstacle elevation",
        value:
          "Big number = MSL height · small number in parentheses = AGL",
        detail:
          "Tower height shown as MSL (the actual elevation at the top) with the AGL (height above ground at the base) in parentheses below. Example: '1349 (498)' = tower top is 1,349 ft MSL, the tower itself is 498 ft tall.",
      },
      {
        label: "Lighted obstacle",
        value: "Lightning-bolt rays around obstacle symbol",
        detail:
          "The little radiating lines around the tower symbol indicate the obstacle is lighted (typically flashing red beacon or steady red obstacle light) for night marking.",
      },
      {
        label: "Group obstacles",
        value: "Two triangles close together = group of obstacles",
        detail:
          "Multiple tall obstacles within a small area shown as a connected pair — typically a cluster of cell towers, antenna farms, or wind turbine fields. Elevation shown is the tallest in the group.",
      },
    ],
  },
  {
    title: "Common test traps",
    rows: [
      {
        label: "250 g vs 0.55 lb",
        value:
          "Equivalent — 0.55 lb ≈ 249.5 g. FAA uses both interchangeably. Threshold for Part 48 registration.",
        detail:
          "The test sometimes states one and not the other — they are the same threshold. A drone weighing EXACTLY 250 g is at the threshold; recreational craft 250g or less are exempt from registration under §44809 (but commercial use under Part 107 always requires registration regardless of weight).",
      },
      {
        label: "55 lb max sUAS weight",
        value:
          "If aircraft ≥ 55 lb you are NOT operating under Part 107 — different rule set",
        detail:
          "Part 107 only applies to small UAS, defined as < 55 lb total takeoff weight. At 55 lb or more you're in a different category requiring different certification (experimental airworthiness, Part 91, etc.). The test may pose a 57-lb question — the correct answer is 'Part 107 does not apply.'",
      },
      {
        label: "Part 107 vs §44809 recreational",
        value:
          "Part 107 = commercial/all purpose, certificated RP, all weights register. §44809 = recreational only, < 0.55 lb exempt from registration",
        detail:
          "Part 107 is the broader, more capable rule — requires certification but allows commercial use. §44809 (formerly Special Rule for Model Aircraft) is recreation only, requires TRUST test (free), and grants the 0.55 lb registration exemption. A Part 107 pilot CAN fly recreationally — but must follow Part 107 rules on those flights too.",
      },
      {
        label: "Yield rule (§107.37)",
        value:
          "sUAS yields to ALL aircraft, even other sUAS. Manned aircraft never yield to sUAS",
        detail:
          "There is no scenario where a sUAS has right of way over anything. Even if a manned aircraft is illegally low or off-course, you yield. Even if another sUAS arrived after you, both must avoid collision — the burden is on the maneuverable one (typically whoever sees first).",
      },
      {
        label: "Altitude reference",
        value:
          "400 ft AGL — terrain (a mountain ridge is terrain, NOT a structure for the +400 exception)",
        detail:
          "A common trap: 'You're flying near a 1,500 ft mountain — what's your max altitude?' Answer is 400 ft AGL above the local terrain you're over, NOT 1,500 + 400. The +400 exception applies only to structures (towers, buildings, antennas), not natural terrain.",
      },
      {
        label: "Civil twilight = night?",
        value:
          "No — civil twilight is a distinct period from night. Anti-collision lighting visible 3 SM is required for BOTH.",
        detail:
          "Per 14 CFR §1.1, 'night' = end of evening civil twilight to beginning of morning civil twilight. So civil twilight is NOT night — they are two separate periods. However, anti-collision lighting visible for 3 SM is required for BOTH civil twilight and night operations. The night-operations training/knowledge requirement applies only to true night (not civil twilight). Pre-2021: any night op required a waiver; current rule allows it with training + lighting.",
      },
      {
        label: "Reporting threshold",
        value:
          "Property damage EXCEEDS $500 (the cost to repair/replace), EXCLUDING the sUAS itself. So if only the drone is damaged, no report needed.",
        detail:
          "The $500 is COST to repair (not loss of value). If your drone strikes a parked car and dents the bumper: get an estimate. If estimate is $300, no report needed. If $600, you must report within 10 days. The cost of the drone itself NEVER counts toward the threshold.",
      },
    ],
  },
  {
    title: "Physiology — symptoms & responses",
    rows: [
      {
        label: "Hypoxia (oxygen starvation)",
        value:
          "Symptoms: euphoria, impaired judgment, blue lips/fingernails (cyanosis), tingling, drowsiness, headache. Remedy: descend / get oxygen.",
        detail:
          "More relevant to manned aircraft at altitude than to a sUAS pilot on the ground, but FAA tests it for general aeromedical knowledge. Early symptoms (euphoria, slow thinking) are the most dangerous because the pilot doesn't realize they're impaired. Cyanosis is a LATE sign. Onset begins above ~12,500 ft MSL without supplemental oxygen.",
      },
      {
        label: "Hyperventilation (over-breathing)",
        value:
          "Symptoms: lightheadedness, tingling in hands/face, anxiety, visual disturbance. Remedy: slow breathing, talk aloud, breathe into a bag.",
        detail:
          "Often triggered by stress or fear. Symptoms can MIMIC early hypoxia — but the cure is the OPPOSITE: hyperventilation needs SLOWER breathing (raise CO2), hypoxia needs MORE oxygen. If in doubt at altitude, treat as hypoxia first (oxygen), then if symptoms persist, slow breathing.",
      },
      {
        label: "Hypoxia vs hyperventilation — quick distinguisher",
        value: "Same early symptoms; different cures.",
        detail:
          "Test trap: a question describes tingling, lightheadedness, visual disturbance and asks for the cause/remedy. Key clues: hypoxia onset correlates with altitude/exertion; hyperventilation correlates with stress/fear. Hypoxia → oxygen. Hyperventilation → slow controlled breathing. Both demand the pilot ACT, not push through.",
      },
      {
        label: "Carbon monoxide (CO) poisoning",
        value: "Odorless, colorless gas. Symptoms: headache, drowsiness, dizziness, confusion. Source: cabin heaters / engine exhaust.",
        detail:
          "Not a Part 107 sUAS hazard directly (no cabin heater on a drone), but FAA tests it as general aeromedical content. CO binds to hemoglobin 200× more tightly than oxygen — even low concentrations cause hypoxia-like symptoms. CO detectors recommended in manned aircraft. If suspected: vent the cabin, descend, get medical attention.",
      },
      {
        label: "Visual scanning at altitude",
        value:
          "Use 10° sector scanning with 1-second pause per sector. Use OFF-CENTER (peripheral) viewing at night — rods detect dim light better than cones.",
        detail:
          "Why 10° + 1 second: the eye needs ~1 second to fully focus on each area. Sweeping continuously means nothing actually registers. Daytime: scan with central vision (cones, color). Night: scan with off-center viewing (rods, peripheral). After dark adaptation (~30 min), avoid bright lights — one bright light resets adaptation completely.",
      },
      {
        label: "Spatial disorientation",
        value:
          "Loss of correct orientation relative to earth/horizon. Most common at night, in IMC, or over featureless terrain.",
        detail:
          "Trust the instruments, not your inner ear. Common at night because visual cues are gone. The vestibular system can give false sensations of turning, climbing, descending when the aircraft is actually level. For sUAS pilots, this matters less (you stand on the ground) but is tested for general aeromedical knowledge.",
      },
    ],
  },
  {
    title: "Convective SIGMET — what to actually do",
    rows: [
      {
        label: "Criteria (any one triggers)",
        value:
          "Tornado · hail ≥ ¾\" · surface winds ≥ 50 kt · line or embedded thunderstorms · area of TS covering ≥ 40% of an area ≥ 3,000 sq mi with VIP level 4+",
        detail:
          "Issued for the most dangerous convective weather. 2-hour validity. Re-issued as conditions evolve. ANY of these criteria triggers issuance.",
      },
      {
        label: "Action if active over your area",
        value:
          "Do not fly. If airborne, land immediately at the nearest safe location.",
        detail:
          "Convective SIGMET conditions include downdrafts (microbursts to 6,000 fpm), severe turbulence, and outflow gusts up to 45+ kt — all catastrophic for a small UAS. Even if you're outside the cell, outflow winds can extend miles ahead. Do not try to skirt the edge.",
      },
      {
        label: "Microburst-specific guidance",
        value:
          "Avoid any thunderstorm by ≥ 20 NM. Microburst outflow can reach 45 kt and travel several miles from the cell.",
        detail:
          "Microbursts last 5–15 min total but the outflow surface winds can reverse direction in seconds. For sUAS that's a sudden headwind → sudden tailwind → uncontrolled descent. The only safe response is total avoidance.",
      },
    ],
  },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CheatSheet() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="eyebrow">
          <AppIcon name="cheatsheet" />
          Reference
        </span>
        <h1 className="page-title">Part 107 Cheat Sheet</h1>
        <p className="lede">
          Every number you need to memorize, on one page. Tap any row with a{" "}
          <span className="citation-chip">
            <AppIcon name="arrowRight" />
            detail
          </span>{" "}
          to see a deeper explanation, mnemonic, or worked example.
        </p>
      </header>

      <div className="cheat-layout">
        <div className="cheat-content">
          <CheatSheetClient sections={SECTIONS} />
        </div>

        <aside className="cheat-toc card" aria-label="Cheat sheet table of contents">
          <div className="cheat-toc-title">Chapters</div>
          <nav className="cheat-toc-list">
            {SECTIONS.map((s) => (
              <a key={s.title} href={`#${slugify(s.title)}`} className="cheat-toc-link">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      <div className="action-row">
        <Link href="/exam" className="btn">
          <AppIcon name="exam" />
          Take a practice exam
        </Link>
        <Link href="/" className="btn btn-secondary">
          <AppIcon name="arrowLeft" />
          Home
        </Link>
      </div>
    </div>
  );
}

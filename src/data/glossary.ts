export const glossaryCategories = [
  "altitude",
  "airspace",
  "weather",
  "regulations",
  "operations",
  "physiology",
  "navigation",
  "lighting",
  "general",
] as const;

export type GlossaryCategory = (typeof glossaryCategories)[number];

export type GlossaryEntry = {
  term: string;
  full: string;
  definition: string;
  category: GlossaryCategory;
  caseInsensitive?: boolean;
};

export const glossary = [
  {
    term: "AGL",
    full: "Above Ground Level",
    definition:
      "Altitude measured from the ground directly beneath the aircraft. Part 107 generally limits small UAS to 400 ft AGL, with the 400 ft structure exception in 14 CFR 107.51.",
    category: "altitude",
  },
  {
    term: "MSL",
    full: "Mean Sea Level",
    definition:
      "Altitude referenced to average sea level. Sectional chart elevations, airspace shelf floors, and MEF values are normally shown in MSL, not height above your launch point.",
    category: "altitude",
  },
  {
    term: "FL",
    full: "Flight Level",
    definition:
      "An altitude expressed in hundreds of feet using the standard altimeter setting of 29.92 inHg, used at and above 18,000 ft MSL in US airspace (Class A). For example, FL250 means 25,000 ft pressure altitude. In PIREPs, the /FL field reports the aircraft altitude in hundreds of feet.",
    category: "altitude",
  },
  {
    term: "DA",
    full: "Density Altitude",
    definition:
      "Pressure altitude corrected for non-standard temperature. High DA means thinner air, less propeller thrust, reduced climb, and shorter battery endurance.",
    category: "altitude",
  },
  {
    term: "OAT",
    full: "Outside Air Temperature",
    definition:
      "The temperature of the air outside the aircraft, usually in Celsius in aviation weather. OAT is used with pressure altitude to estimate density altitude.",
    category: "altitude",
  },
  {
    term: "Class A",
    full: "Class A Airspace",
    definition:
      "Controlled airspace from 18,000 ft MSL up to and including FL600. It requires IFR operation and is not where standard Part 107 small UAS flights occur.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "Class B",
    full: "Class B Airspace",
    definition:
      "Controlled airspace around the busiest airports, shown on sectionals with solid blue boundaries and shelf altitudes in MSL. Part 107 operations inside Class B require ATC authorization under 14 CFR 107.41.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "Class C",
    full: "Class C Airspace",
    definition:
      "Controlled airspace around medium-busy towered airports, shown with solid magenta boundaries. Part 107 operations inside Class C require ATC authorization.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "Class D",
    full: "Class D Airspace",
    definition:
      "Controlled airspace around towered airports that are not Class B or C, usually shown with a dashed blue boundary. Part 107 flights in Class D need ATC authorization.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "Class E",
    full: "Class E Airspace",
    definition:
      "Controlled airspace that can begin at the surface, 700 ft AGL, 1,200 ft AGL, or higher depending on the chart depiction. Under Part 107, only Class E surface areas designated for an airport require ATC authorization.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "Class G",
    full: "Class G Airspace",
    definition:
      "Uncontrolled airspace. Part 107 flights in Class G do not require ATC authorization, but all other operating limits such as 400 ft AGL, VLOS, and weather minimums still apply.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "SFC",
    full: "Surface",
    definition:
      "A chart or weather abbreviation meaning the surface (ground level). On a sectional, airspace shelf altitudes are stacked: '40' over 'SFC' (with a horizontal line between them) means the shelf extends from the surface up to and including 4,000 ft MSL.",
    category: "airspace",
  },
  {
    term: "MOA",
    full: "Military Operations Area",
    definition:
      "Special use airspace established to contain certain military training activities (such as aerobatics or air-combat maneuvering). Charted on sectionals with a magenta hashed boundary. Civil VFR traffic — including sUAS — may legally enter, but pilots should check active times via NOTAMs or the controlling agency and exercise extreme caution when an MOA is active.",
    category: "airspace",
  },
  {
    term: "CFA",
    full: "Controlled Firing Area",
    definition:
      "An area where hazardous firing activity is stopped when aircraft are detected. CFAs are not usually charted because the activity is controlled to avoid nonparticipating aircraft.",
    category: "airspace",
  },
  {
    term: "NSA",
    full: "National Security Area",
    definition:
      "Airspace over sensitive locations where pilots are requested to voluntarily avoid flight. If needed, the FAA can temporarily restrict the area by NOTAM or TFR.",
    category: "airspace",
  },
  {
    term: "TFR",
    full: "Temporary Flight Restriction",
    definition:
      "A temporary restriction published by NOTAM (usually an FDC NOTAM) for hazards or security events such as wildfires, sporting events at large stadiums, VIP movement, or disasters. Small UAS operations within an active TFR are prohibited unless the NOTAM specifically permits the operation or the FAA has granted a separate waiver/authorization. Always check TFRs during preflight planning.",
    category: "airspace",
  },
  {
    term: "FRZ",
    full: "Flight Restricted Zone",
    definition:
      "The inner, highly restricted area of the Washington, DC Special Flight Rules Area, approximately a 15 NM ring centered on the DCA VOR/DME. Small UAS operations inside the DC FRZ are generally prohibited without specific federal authorization.",
    category: "airspace",
  },
  {
    term: "SFRA",
    full: "Special Flight Rules Area",
    definition:
      "Airspace where special procedures apply in addition to normal rules. The DC SFRA extends 30 NM from the DCA VOR/DME and contains the more restrictive FRZ inside it.",
    category: "airspace",
  },
  {
    term: "MEF",
    full: "Maximum Elevation Figure",
    definition:
      "The highest terrain or obstacle elevation in a sectional chart quadrangle, shown in thousands and hundreds of feet MSL (the large digit is thousands, the smaller superscript digit is hundreds). For example, 12 superscript 5 means 12,500 ft MSL. The value includes a vertical buffer (about 100 ft over obstacles, 200+ ft over terrain) rounded up to the next 100 ft. It helps pilots avoid terrain and obstacles, but is not by itself a guarantee of clearance.",
    category: "airspace",
  },
  {
    term: "MTR",
    full: "Military Training Route",
    definition:
      "A published route used for military low-level training, labeled IR or VR. Four-digit MTRs are entirely at or below 1,500 ft AGL; three-digit routes include one or more segments above 1,500 ft AGL.",
    category: "airspace",
  },
  {
    term: "IR",
    full: "Instrument Route",
    definition:
      "An MTR flown under instrument flight rules. IR routes can operate in weather that would keep visual routes inactive, so do not assume poor weather means no military traffic.",
    category: "airspace",
  },
  {
    term: "VR",
    full: "Visual Route",
    definition:
      "An MTR flown under visual flight rules. VR routes are used when weather supports visual operations and may include very fast military aircraft at low altitude.",
    category: "airspace",
  },
  {
    term: "LAANC",
    full: "Low Altitude Authorization and Notification Capability",
    definition:
      "The FAA system that provides near-real-time authorization for many Part 107 flights in controlled airspace. LAANC authorizes airspace only; pilots must still check weather, NOTAMs, TFRs, and all Part 107 limits.",
    category: "airspace",
  },
  {
    term: "Mode C veil",
    full: "Mode C Transponder Veil",
    definition:
      "A 30 NM ring around primary Class B airports, from the surface up to 10,000 ft MSL, within which manned aircraft generally must have an operating altitude-encoding (Mode C) transponder. The Mode C veil does not by itself require Part 107 authorization, but it signals heavy manned-aircraft traffic nearby.",
    category: "airspace",
    caseInsensitive: true,
  },
  {
    term: "COA",
    full: "Certificate of Waiver or Authorization",
    definition:
      "An FAA approval that allows a specific operation, authorization, or waiver. Public aircraft operators often use COAs, while Part 107 pilots commonly use LAANC, DroneZone authorizations, or Part 107 waivers.",
    category: "airspace",
  },
  {
    term: "FRIA",
    full: "FAA-Recognized Identification Area",
    definition:
      "An FAA-approved defined geographic area where drones without Remote ID equipment may operate, provided the aircraft remains within visual line of sight of the person manipulating the flight controls and within the FRIA boundaries (14 CFR 89.115). FRIAs are sponsored by FAA-recognized community-based organizations or educational institutions and are the only standing alternative to Remote ID compliance.",
    category: "airspace",
  },
  {
    term: "NORAD",
    full: "North American Aerospace Defense Command",
    definition:
      "The U.S.-Canada command that monitors and defends North American airspace. It is relevant to DC-area restrictions and serious airspace-security violations.",
    category: "airspace",
  },
  {
    term: "METAR",
    full: "Aviation Routine Weather Report",
    definition:
      "An hourly observation of actual weather at an airport or station. METARs report wind, visibility, weather, sky cover, temperature/dewpoint, altimeter setting, and remarks.",
    category: "weather",
  },
  {
    term: "TAF",
    full: "Terminal Aerodrome Forecast",
    definition:
      "A forecast for conditions within about 5 SM of an airport, usually valid for 24 or 30 hours. Use the worst relevant FM, TEMPO, BECMG, and PROB groups for your planned flight window.",
    category: "weather",
  },
  {
    term: "PIREP",
    full: "Pilot Report",
    definition:
      "A report of actual in-flight weather from a pilot. PIREPs are valuable because they report things automated stations may miss, such as turbulence, icing, cloud tops, and visibility aloft.",
    category: "weather",
  },
  {
    term: "SPECI",
    full: "Special Weather Report",
    definition:
      "An unscheduled aviation weather observation issued when conditions change significantly between routine METARs. Treat a SPECI as current observed weather for preflight decisions.",
    category: "weather",
  },
  {
    term: "SIGMET",
    full: "Significant Meteorological Information",
    definition:
      "An advisory for non-convective weather hazardous to all aircraft, such as severe icing, severe or extreme turbulence, dust or sand storms below 3 SM visibility, or volcanic ash. A convective SIGMET covers dangerous thunderstorm-related hazards.",
    category: "weather",
  },
  {
    term: "AIRMET",
    full: "Airmen's Meteorological Information",
    definition:
      "An advisory for weather that may be hazardous, especially to small aircraft, but is generally less severe than SIGMET criteria. The common types are Sierra, Tango, and Zulu.",
    category: "weather",
  },
  {
    term: "AIRMET Sierra",
    full: "AIRMET Sierra",
    definition:
      "AIRMET type for IFR conditions and mountain obscuration. It warns of widespread low ceilings, low visibility, or obscured terrain that can make sUAS operations unsafe or illegal.",
    category: "weather",
    caseInsensitive: true,
  },
  {
    term: "AIRMET Tango",
    full: "AIRMET Tango",
    definition:
      "AIRMET type for moderate turbulence, sustained surface winds of 30 kt or more, and low-level wind shear. These conditions can exceed small UAS performance limits quickly.",
    category: "weather",
    caseInsensitive: true,
  },
  {
    term: "AIRMET Zulu",
    full: "AIRMET Zulu",
    definition:
      "AIRMET type for moderate icing and freezing levels. Icing can rapidly degrade lift and control, and most small UAS are not approved for icing conditions.",
    category: "weather",
    caseInsensitive: true,
  },
  {
    term: "ADDS",
    full: "Aviation Digital Data Service",
    definition:
      "A legacy NCAR/NWS aviation weather website that has been retired and replaced by aviationweather.gov (the National Weather Service's Aviation Weather Center). Older study material may still reference ADDS as the source of METARs, TAFs, PIREPs, AIRMETs, SIGMETs, and winds-aloft forecasts.",
    category: "weather",
  },
  {
    term: "SIGWX",
    full: "Significant Weather",
    definition:
      "A chart or product showing important weather hazards such as thunderstorms, turbulence, icing, and frontal systems. Use it for broad risk awareness, not as a substitute for local METARs and TAFs.",
    category: "weather",
  },
  {
    term: "FB",
    full: "Winds and Temperatures Aloft Forecast",
    definition:
      "A coded forecast of wind direction (true), wind speed (knots), and temperature (Celsius) at selected altitudes. Winds are not forecast for altitudes within 1,500 ft of station elevation, and temperatures are not forecast for the 3,000 ft level or within 2,500 ft of station elevation. Temperatures above 24,000 ft are assumed negative and the minus sign is omitted.",
    category: "weather",
  },
  {
    term: "ISA",
    full: "International Standard Atmosphere",
    definition:
      "A standard reference atmosphere: 15 C at sea level, 29.92 inHg, and about 2 C temperature decrease per 1,000 ft. Performance charts compare actual conditions to ISA.",
    category: "weather",
  },
  {
    term: "KIAS",
    full: "Knots Indicated Airspeed",
    definition:
      "Airspeed shown on an aircraft's airspeed indicator, measured in knots. KIAS is the speed felt by the airframe through the air — different from groundspeed. Note that Part 107's speed limit is 100 mph (about 87 kt) GROUNDSPEED per 14 CFR 107.51(a), not airspeed.",
    category: "weather",
  },
  {
    term: "KT",
    full: "Knot",
    definition:
      "One nautical mile per hour. METAR and TAF winds use KT, and 87 kt equals 100 mph for the Part 107 groundspeed limit.",
    category: "weather",
  },
  {
    term: "KTS",
    full: "Knots",
    definition:
      "Plural abbreviation for knots, often written lowercase in plain-English material. One knot equals one nautical mile per hour.",
    category: "weather",
    caseInsensitive: true,
  },
  {
    term: "UTC",
    full: "Coordinated Universal Time",
    definition:
      "The standard time reference used in aviation weather and flight planning. METARs, TAFs, and PIREPs use UTC, commonly called Zulu time.",
    category: "weather",
  },
  {
    term: "Z",
    full: "Zulu Time Suffix",
    definition:
      "The letter after a time group showing the time is in UTC, not local time. For example, 1855Z means 18:55 UTC.",
    category: "weather",
  },
  {
    term: "Zulu",
    full: "Zulu Time",
    definition:
      "Aviation shorthand for UTC. Weather reports use Zulu time so pilots in different time zones read the same valid time.",
    category: "weather",
    caseInsensitive: true,
  },
  {
    term: "RVR",
    full: "Runway Visual Range",
    definition:
      "The distance a pilot can see down a runway, reported in feet when visibility is very low. It is mainly for manned instrument operations but signals poor visibility for sUAS too.",
    category: "weather",
  },
  {
    term: "BKN",
    full: "Broken",
    definition:
      "METAR/TAF sky cover of 5/8 to 7/8 of the sky. BKN and OVC layers count as ceilings; BKN040 means a broken layer at 4,000 ft AGL.",
    category: "weather",
  },
  {
    term: "OVC",
    full: "Overcast",
    definition:
      "METAR/TAF sky cover of 8/8 of the sky. OVC is a ceiling, so Part 107 cloud clearance is measured from that layer.",
    category: "weather",
  },
  {
    term: "SCT",
    full: "Scattered",
    definition:
      "METAR/TAF sky cover of 3/8 to 4/8. SCT is not a ceiling, but it still describes cloud layers you must avoid.",
    category: "weather",
  },
  {
    term: "FEW",
    full: "Few",
    definition:
      "METAR/TAF sky cover code for more than 0/8 up to and including 2/8 of the sky covered by clouds (i.e., a trace through 2 oktas). FEW is not a ceiling, but Part 107 cloud clearance still applies to any cloud layer you approach.",
    category: "weather",
  },
  {
    term: "SKC",
    full: "Sky Clear",
    definition:
      "A manual observation reporting no clouds. It is a sky condition code, not a guarantee of unlimited visibility.",
    category: "weather",
  },
  {
    term: "CLR",
    full: "Clear Below Reporting Limit",
    definition:
      "An automated station report indicating no clouds below the station's reporting limit, commonly 12,000 ft in U.S. METARs. It does not rule out higher clouds.",
    category: "weather",
  },
  {
    term: "CB",
    full: "Cumulonimbus",
    definition:
      "Thunderstorm cloud. CB in a METAR or TAF is a major safety warning for sUAS because of lightning, turbulence, hail, heavy rain, and outflow winds.",
    category: "weather",
  },
  {
    term: "TCU",
    full: "Towering Cumulus",
    definition:
      "A vertically developing cumulus cloud that may grow into a thunderstorm. TCU signals unstable air, turbulence, and possible convective development.",
    category: "weather",
  },
  {
    term: "VV",
    full: "Vertical Visibility",
    definition:
      "Used when the sky is obscured and the observer can only see upward a certain distance. VV002 means vertical visibility is 200 ft and should be treated as a ceiling.",
    category: "weather",
  },
  {
    term: "P6SM",
    full: "Plus Six Statute Miles",
    definition:
      "METAR/TAF visibility code meaning visibility is greater than 6 statute miles. It exceeds the Part 107 minimum of 3 SM, assuming other weather limits are satisfied.",
    category: "weather",
  },
  {
    term: "VRB",
    full: "Variable Wind Direction",
    definition:
      "METAR/TAF wind code showing the wind direction is variable rather than from one steady direction. Example: VRB03KT means variable at 3 knots.",
    category: "weather",
  },
  {
    term: "FM",
    full: "From",
    definition:
      "A TAF change group meaning new forecast conditions begin at the stated time and replace the previous line. FM groups usually describe a relatively rapid change.",
    category: "weather",
  },
  {
    term: "BECMG",
    full: "Becoming",
    definition:
      "A TAF group for gradual change during the stated time window. Conditions transition over the period rather than all changing at one exact minute.",
    category: "weather",
  },
  {
    term: "TEMPO",
    full: "Temporary",
    definition:
      "A TAF group for temporary fluctuations expected during the stated period. For go/no-go planning, assume TEMPO hazards can affect your flight window.",
    category: "weather",
  },
  {
    term: "PROB30",
    full: "Probability 30 Percent",
    definition:
      "A TAF probability group indicating a 30% to less than 40% chance of the stated conditions occurring during the indicated period. PROB groups are not used in the first 9 hours of a TAF. If the forecast conditions would violate Part 107 minimums, treat the probability seriously when planning.",
    category: "weather",
  },
  {
    term: "PROB40",
    full: "Probability 40 Percent",
    definition:
      "A TAF probability group indicating a 40% to less than 50% chance of the stated conditions occurring during the indicated period. PROB groups are not used in the first 9 hours of a TAF, and probabilities of 50% or more are expressed using FM, BECMG, TEMPO, or the main forecast line.",
    category: "weather",
  },
  {
    term: "PROB30/40",
    full: "Probability 30 or 40 Percent",
    definition:
      "Shorthand for the TAF probability groups PROB30 (30 to less than 40% probability) and PROB40 (40 to less than 50% probability). PROB groups are not used in the first 9 hours of a TAF, and probabilities of 50% or higher are expressed using FM, BECMG, TEMPO, or the main forecast line.",
    category: "weather",
  },
  {
    term: "MI",
    full: "Shallow",
    definition:
      "METAR descriptor for weather close to the ground, most often shallow fog. It modifies the weather code that follows it.",
    category: "weather",
  },
  {
    term: "BC",
    full: "Patches",
    definition:
      "METAR descriptor meaning patches of a phenomenon, such as patchy fog. Conditions can vary sharply across the airport area.",
    category: "weather",
  },
  {
    term: "BL",
    full: "Blowing",
    definition:
      "METAR descriptor for particles lifted by wind, such as blowing snow, sand, or dust. Blowing conditions can reduce visibility and destabilize small UAS.",
    category: "weather",
  },
  {
    term: "SH",
    full: "Showers",
    definition:
      "METAR descriptor for showery precipitation from convective clouds. Showers can change quickly and may bring gusts or turbulence.",
    category: "weather",
  },
  {
    term: "TS",
    full: "Thunderstorm",
    definition:
      "METAR/TAF descriptor for thunderstorm activity. Do not fly near thunderstorms; they can produce lightning, hail, severe turbulence, and outflow winds.",
    category: "weather",
  },
  {
    term: "FZ",
    full: "Freezing",
    definition:
      "METAR descriptor for freezing precipitation or freezing fog. Freezing conditions can cause icing and are unsafe for most small UAS.",
    category: "weather",
  },
  {
    term: "RA",
    full: "Rain",
    definition:
      "METAR precipitation code for rain. Intensity may be shown with - for light or + for heavy, and rain can reduce visibility and affect aircraft limits.",
    category: "weather",
  },
  {
    term: "DZ",
    full: "Drizzle",
    definition:
      "METAR precipitation code for very small water droplets. Drizzle often occurs with low ceilings and poor visibility.",
    category: "weather",
  },
  {
    term: "SN",
    full: "Snow",
    definition:
      "METAR precipitation code for snow. Snow reduces visibility, can obscure obstacles, and may exceed aircraft environmental limits.",
    category: "weather",
  },
  {
    term: "GR",
    full: "Hail",
    definition:
      "METAR code for hail with stones 1/4 inch (about 5 mm) in diameter or larger. Anything smaller is reported as GS (small hail / snow pellets). GR almost always means strong convective activity and unsafe small-UAS conditions.",
    category: "weather",
  },
  {
    term: "GS",
    full: "Small Hail or Snow Pellets",
    definition:
      "METAR code for small hail or snow pellets. It indicates convective or frozen precipitation hazards.",
    category: "weather",
  },
  {
    term: "PL",
    full: "Ice Pellets",
    definition:
      "METAR code for ice pellets, sometimes called sleet. Ice pellets indicate freezing-layer weather that can be hazardous to aircraft.",
    category: "weather",
  },
  {
    term: "IC",
    full: "Ice Crystals",
    definition:
      "METAR code for ice crystals. In PIREPs, IC also marks icing information, so read the context carefully.",
    category: "weather",
  },
  {
    term: "FG",
    full: "Fog",
    definition:
      "METAR obscuration code for fog, generally visibility below 5/8 SM when no qualifier is used. Fog often makes Part 107 flight illegal because visibility is below 3 SM.",
    category: "weather",
  },
  {
    term: "BR",
    full: "Mist",
    definition:
      "METAR obscuration code for mist, used when prevailing visibility is from 5/8 SM to 6 SM (inclusive). BR signals near-saturation and possible fog development; when visibility falls below 5/8 SM, fog (FG) is reported instead.",
    category: "weather",
  },
  {
    term: "HZ",
    full: "Haze",
    definition:
      "METAR obscuration code for haze. Haze can reduce flight visibility below the Part 107 minimum even when ceilings are acceptable.",
    category: "weather",
  },
  {
    term: "FU",
    full: "Smoke",
    definition:
      "METAR obscuration code for smoke. Smoke can reduce visibility, hide aircraft and obstacles, and indicate nearby wildfire TFR risks.",
    category: "weather",
  },
  {
    term: "SA",
    full: "Sand",
    definition:
      "METAR obscuration code for sand. Blowing or suspended sand can reduce visibility and damage equipment.",
    category: "weather",
  },
  {
    term: "DU",
    full: "Dust",
    definition:
      "METAR obscuration code for widespread dust. Dust reduces visibility and can indicate gusty, unstable surface winds.",
    category: "weather",
  },
  {
    term: "SQ",
    full: "Squall",
    definition:
      "METAR code for a squall — a sudden increase in wind speed of at least 16 kt, the speed rising to 22 kt or more, and lasting for at least 1 minute. Squalls are hazardous to small UAS because control margins can disappear quickly.",
    category: "weather",
  },
  {
    term: "FC",
    full: "Funnel Cloud",
    definition:
      "METAR code for funnel cloud, tornado, or waterspout depending on context and intensity. Treat it as a severe convective hazard.",
    category: "weather",
  },
  {
    term: "SS",
    full: "Sandstorm",
    definition:
      "METAR code for sandstorm. It indicates severe visibility and wind hazards; small UAS flight should not be attempted.",
    category: "weather",
  },
  {
    term: "DS",
    full: "Duststorm",
    definition:
      "METAR code for duststorm. Duststorms can reduce visibility to near zero and create severe wind hazards.",
    category: "weather",
  },
  {
    term: "PO",
    full: "Dust or Sand Whirls",
    definition:
      "METAR code for dust or sand whirls, sometimes called dust devils. They signal localized rotating updrafts that can upset a small UAS.",
    category: "weather",
  },
  {
    term: "UP",
    full: "Unknown Precipitation",
    definition:
      "Automated METAR code when the sensor detects precipitation but cannot identify its type. Treat it conservatively and verify conditions before flight.",
    category: "weather",
  },
  {
    term: "VC",
    full: "Vicinity",
    definition:
      "METAR descriptor meaning the weather phenomenon is in the vicinity of the observation point — between 5 and 10 SM from the airport. Weather closer than 5 SM is reported without the VC prefix. Example: VCTS means thunderstorms in the vicinity but not at the airport.",
    category: "weather",
  },
  {
    term: "WS",
    full: "Wind Shear",
    definition:
      "A rapid change in wind speed or direction over a short distance. In TAFs, WS groups forecast non-convective low-level wind shear.",
    category: "weather",
  },
  {
    term: "LLWS",
    full: "Low-Level Wind Shear",
    definition:
      "Wind shear near the surface, often critical during takeoff and landing. LLWS can exceed a small UAS control authority even when surface wind seems acceptable.",
    category: "weather",
  },
  {
    term: "LGT",
    full: "Light",
    definition:
      "Weather intensity or PIREP severity code meaning light. In icing or turbulence reports, light still matters to small UAS even when manned aircraft may tolerate it.",
    category: "weather",
  },
  {
    term: "MDT",
    full: "Moderate",
    definition:
      "Weather or PIREP severity code meaning moderate. Moderate turbulence, icing, or restrictions are operationally significant for small UAS.",
    category: "weather",
  },
  {
    term: "MOD",
    full: "Moderate",
    definition:
      "Common PIREP shorthand for moderate, especially in turbulence or icing reports. Treat MOD turbulence or icing as a serious small UAS hazard.",
    category: "weather",
  },
  {
    term: "SVR",
    full: "Severe",
    definition:
      "Severity code meaning severe. Severe turbulence, icing, or convective weather is unsafe and may meet SIGMET criteria.",
    category: "weather",
  },
  {
    term: "AO1",
    full: "Automated Station Without Precipitation Discriminator",
    definition:
      "METAR remark showing the automated station cannot identify precipitation type. If precipitation is reported by an AO1 station, verify conditions from other sources when possible.",
    category: "weather",
  },
  {
    term: "AO2",
    full: "Automated Station With Precipitation Discriminator",
    definition:
      "METAR remark showing the automated station can distinguish precipitation type. AO1 stations cannot reliably tell rain from snow or other precipitation types.",
    category: "weather",
  },
  {
    term: "RMK",
    full: "Remarks",
    definition:
      "The METAR section after RMK contains extra coded details such as station type, sea-level pressure, and precise temperature. It can refine the basic report.",
    category: "weather",
  },
  {
    term: "SLP",
    full: "Sea-Level Pressure",
    definition:
      "METAR remark giving sea-level pressure in tenths of hectopascals. It is mostly used for weather analysis rather than Part 107 go/no-go minimums.",
    category: "weather",
  },
  {
    term: "CFR",
    full: "Code of Federal Regulations",
    definition:
      "The codified federal rules. Part 107 is in Title 14 CFR and contains the operating and certification rules for small UAS.",
    category: "regulations",
  },
  {
    term: "FAR",
    full: "Federal Aviation Regulations",
    definition:
      "An informal/legacy shorthand for the aviation regulations in Title 14 of the Code of Federal Regulations. The FAA now prefers '14 CFR' citations (e.g., 14 CFR 107.51) and avoids 'FAR' because that abbreviation also refers to the Federal Acquisition Regulation. Older study material may still use FAR.",
    category: "regulations",
  },
  {
    term: "AC",
    full: "Advisory Circular",
    definition:
      "FAA guidance explaining one acceptable way to comply with rules or understand procedures. ACs are helpful study references, but regulations control when there is a conflict.",
    category: "regulations",
  },
  {
    term: "NOTAM",
    full: "Notice to Air Missions",
    definition:
      "A time-sensitive notice about changes, hazards, restrictions, or services affecting flight. Remote pilots must check applicable NOTAMs during preflight under 14 CFR 107.49.",
    category: "regulations",
  },
  {
    term: "FDC",
    full: "Flight Data Center",
    definition:
      "An FAA NOTAM type often used for regulatory information such as TFRs and procedure changes. Stadium and VIP TFRs are commonly issued as FDC NOTAMs.",
    category: "regulations",
  },
  {
    term: "DOC",
    full: "Declaration of Compliance",
    definition:
      "An FAA-accepted manufacturer's declaration that a small UAS meets specific eligibility requirements — most commonly for Category 2 or Category 3 operations over people under 14 CFR Part 107 Subpart D, but also used by manufacturers to declare Remote ID compliance under Part 89. The remote pilot must verify the aircraft is listed and properly labeled for the intended operation.",
    category: "regulations",
    caseInsensitive: true,
  },
  {
    term: "RP",
    full: "Right Traffic (chart notation)",
    definition:
      "On a sectional or in the Chart Supplement, RP next to a runway number indicates that right traffic pattern is in use for that runway (the standard is left traffic). RP is not the FAA's abbreviation for 'remote pilot' — the regulations use RPIC (remote pilot in command) for that role.",
    category: "regulations",
  },
  {
    term: "RPIC",
    full: "Remote Pilot in Command",
    definition:
      "The certificated person directly responsible for and final authority over the operation of a small UAS under 14 CFR Part 107. The RPIC must ensure compliance with all of Part 107, but in an in-flight emergency requiring immediate action, may deviate from any rule of Part 107 to the extent necessary to meet that emergency (14 CFR 107.21). A written report may be required upon request.",
    category: "regulations",
  },
  {
    term: "PIC",
    full: "Pilot in Command",
    definition:
      "The pilot with final authority and responsibility for an aircraft operation. In Part 107, the specific term is remote PIC or RPIC.",
    category: "regulations",
  },
  {
    term: "VO",
    full: "Visual Observer",
    definition:
      "A person designated by the RPIC to help see and avoid other aircraft and hazards (14 CFR 107.33). A VO is not required for most Part 107 operations, but if one is used (or if the person manipulating the controls is using FPV/goggles), the VO must be able to see the aircraft sufficiently to maintain VLOS, and the RPIC, person manipulating the controls, and VO must maintain effective communication at all times.",
    category: "regulations",
  },
  {
    term: "VLOS",
    full: "Visual Line of Sight",
    definition:
      "The requirement (14 CFR 107.31) to maintain unaided visual contact with the unmanned aircraft, with vision unaided by any device other than corrective lenses (binoculars, FPV goggles, and telescopes do NOT satisfy VLOS). VLOS must be maintained by the RPIC, the person manipulating the controls, or a visual observer, and must be sufficient to know the aircraft's location, attitude, altitude, and direction, and to see and avoid other aircraft and hazards.",
    category: "regulations",
  },
  {
    term: "BVLOS",
    full: "Beyond Visual Line of Sight",
    definition:
      "Operation where the aircraft is not kept within unaided visual sight. BVLOS is not allowed under standard Part 107 without an applicable waiver or specific authorization.",
    category: "regulations",
  },
  {
    term: "UAG",
    full: "Unmanned Aircraft General - Small",
    definition:
      "The FAA knowledge test code for the initial Part 107 remote pilot exam. Passing UAG is the usual certification path for first-time non-Part 61 remote pilots.",
    category: "regulations",
  },
  {
    term: "ALC-677",
    full: "Part 107 Small UAS Recurrent Non-Part 61 Pilots",
    definition:
      "FAA Safety Team online recurrent training for Part 107 remote pilots who are not using the Part 61 pilot path. It satisfies the 24-calendar-month knowledge recency requirement.",
    category: "regulations",
  },
  {
    term: "ALC-451",
    full: "Part 107 Small Unmanned Aircraft Systems (sUAS)",
    definition:
      "The FAA Safety Team online initial training course for current Part 61 pilot certificate holders (with a current flight review) seeking a remote pilot certificate. Completing ALC-451 satisfies the initial aeronautical knowledge requirement in lieu of the UAG knowledge test for eligible Part 61 pilots.",
    category: "regulations",
  },
  {
    term: "ALC-515",
    full: "Part 107 Small UAS Recurrent - Part 61 Pilots",
    definition:
      "FAA Safety Team recurrent course for Part 107 remote pilots who also hold a current Part 61 pilot certificate and flight review. It is one way to maintain Part 107 knowledge recency.",
    category: "regulations",
  },
  {
    term: "TRUST",
    full: "The Recreational UAS Safety Test",
    definition:
      "A free, one-time FAA-mandated safety test for recreational drone flyers operating under 49 USC 44809. Recreational flyers must pass TRUST and carry proof of passage when flying. TRUST is not the Part 107 knowledge test and does not authorize commercial operations.",
    category: "regulations",
  },
  {
    term: "BAC",
    full: "Blood Alcohol Concentration",
    definition:
      "The amount of alcohol in a person's blood. Under 14 CFR 91.17 (incorporated into Part 107 by 107.27), a remote pilot may not operate a small UAS within 8 hours of consuming alcohol, while under the influence of alcohol, while using any drug that affects safety, or with a blood alcohol concentration of 0.04% or greater.",
    category: "regulations",
  },
  {
    term: "OTC",
    full: "Over the Counter",
    definition:
      "Medication sold without a prescription. OTC drugs can still impair alertness or coordination, and Part 107 prohibits operation when a drug affects safe performance.",
    category: "regulations",
  },
  {
    term: "NTSB",
    full: "National Transportation Safety Board",
    definition:
      "The independent federal accident-investigation agency. Remote pilots must make their certificates and required records available to the NTSB upon request. NTSB Part 830 reporting applies only to UAS accidents involving aircraft weighing 300 lb or more, or those causing serious injury or death — separate from the routine Part 107 accident reports that go to the FAA within 10 calendar days under 14 CFR 107.9.",
    category: "regulations",
  },
  {
    term: "TSA",
    full: "Transportation Security Administration",
    definition:
      "The federal agency that performs security vetting for airman certification and may inspect remote pilot certificates. It is separate from the FAA.",
    category: "regulations",
  },
  {
    term: "FAA",
    full: "Federal Aviation Administration",
    definition:
      "The U.S. agency that regulates civil aviation, including Part 107 small UAS operations, pilot certification, airspace authorization, and Remote ID.",
    category: "regulations",
  },
  {
    term: "FSS",
    full: "Flight Service Station",
    definition:
      "A pilot briefing and flight information service. Flight Service can provide weather, NOTAM, and special use airspace information useful to remote pilots.",
    category: "regulations",
  },
  {
    term: "FSDO",
    full: "Flight Standards District Office",
    definition:
      "A local FAA office that handles aviation safety oversight and some certification functions. Part 107 certificate processing and inspections can involve an FSDO.",
    category: "regulations",
  },
  {
    term: "IACRA",
    full: "Integrated Airman Certification and Rating Application",
    definition:
      "The FAA online system for airman certificate applications. Remote pilot certificate applications and address updates are commonly handled through IACRA or FAA portals.",
    category: "regulations",
  },
  {
    term: "sUAS",
    full: "Small Unmanned Aircraft System",
    definition:
      "A small unmanned aircraft plus the control station, communication links, and other components required for safe operation. Under Part 107, the aircraft must weigh less than 55 lb on takeoff.",
    category: "regulations",
  },
  {
    term: "UAS",
    full: "Unmanned Aircraft System",
    definition:
      "An unmanned aircraft and its associated control and communication components. UAS is the broad term; sUAS is the Part 107 small category.",
    category: "regulations",
  },
  {
    term: "UA",
    full: "Unmanned Aircraft; routine PIREP code",
    definition:
      "In UAS regulations, UA means unmanned aircraft. In PIREPs, UA marks a routine pilot report, while UUA marks an urgent pilot report.",
    category: "regulations",
  },
  {
    term: "UUA",
    full: "Urgent Pilot Report",
    definition:
      "A PIREP type for urgent hazardous weather such as severe turbulence, severe icing, hail, volcanic ash, or low-level wind shear. Treat UUA reports near your area as immediate safety information.",
    category: "weather",
  },
  {
    term: "USC",
    full: "United States Code",
    definition:
      "The codified federal statutes passed by Congress. Recreational drone operations are addressed in 49 USC 44809, while Part 107 rules are in 14 CFR.",
    category: "regulations",
  },
  {
    term: "CBO",
    full: "Community-Based Organization",
    definition:
      "An FAA-recognized organization that provides safety guidelines for recreational flyers and may apply to establish FRIAs. CBO rules are not a substitute for Part 107 when the flight is non-recreational.",
    category: "regulations",
  },
  {
    term: "AMA",
    full: "Academy of Model Aeronautics",
    definition:
      "A long-standing model aviation organization and FAA-recognized CBO. AMA fields are common FRIA locations.",
    category: "regulations",
  },
  {
    term: "NPS",
    full: "National Park Service",
    definition:
      "The federal agency managing national parks. NPS generally prohibits launching, landing, or operating UAS from lands and waters it administers unless specifically approved.",
    category: "regulations",
  },
  {
    term: "USFWS",
    full: "United States Fish and Wildlife Service",
    definition:
      "The federal agency managing national wildlife refuges and related lands. UAS operations from USFWS-managed lands may be prohibited or require separate permission.",
    category: "regulations",
  },
  {
    term: "ADM",
    full: "Aeronautical Decision-Making",
    definition:
      "A structured mental process for identifying hazards, assessing risk, and making safe choices. Good ADM means changing or canceling a flight when conditions exceed limits.",
    category: "operations",
  },
  {
    term: "CRM",
    full: "Crew Resource Management",
    definition:
      "The effective use of all available people, equipment, and information to conduct a safe operation. In sUAS work, CRM includes clear RPIC-VO communication and challenge-response habits.",
    category: "operations",
  },
  {
    term: "SRM",
    full: "Single-Pilot Resource Management",
    definition:
      "Managing all available resources when operating without a crew. For remote pilots, SRM includes checklists, automation, weather data, ATC resources, and personal limits.",
    category: "operations",
  },
  {
    term: "IMSAFE",
    full: "Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion",
    definition:
      "A personal preflight checklist for pilot fitness. Any weak item should trigger delay, cancellation, or risk mitigation before flight.",
    category: "operations",
  },
  {
    term: "PAVE",
    full: "Pilot, Aircraft, enVironment, External Pressures",
    definition:
      "A preflight risk model that groups hazards into four areas. It helps remote pilots catch risks from personal condition, aircraft limits, weather/airspace, and client or schedule pressure.",
    category: "operations",
  },
  {
    term: "DECIDE",
    full: "Detect, Estimate, Choose, Identify, Do, Evaluate",
    definition:
      "A six-step decision model for abnormal or changing situations. It encourages pilots to choose a desired outcome, act, and then evaluate whether the action worked.",
    category: "operations",
  },
  {
    term: "3P",
    full: "Perceive, Process, Perform",
    definition:
      "A risk-management cycle: perceive hazards, process the risk level, and perform by mitigating or changing the plan. It repeats throughout the flight.",
    category: "operations",
  },
  {
    term: "ACS",
    full: "Airman Certification Standards",
    definition:
      "FAA standards that define knowledge, risk management, and skill areas for certification tests. The Remote Pilot ACS guides what the Part 107 test can cover.",
    category: "operations",
  },
  {
    term: "RTH",
    full: "Return to Home",
    definition:
      "An autopilot function that commands the aircraft to return to a stored home point. Remote pilots must verify RTH altitude, route, obstacles, battery, and GPS status before relying on it.",
    category: "operations",
  },
  {
    term: "ATTI",
    full: "Attitude Mode",
    definition:
      "A flight mode that stabilizes attitude but may not hold GPS position. In ATTI mode, the aircraft can drift with wind and requires more manual control.",
    category: "operations",
  },
  {
    term: "GPS",
    full: "Global Positioning System",
    definition:
      "Satellite navigation used for position hold, navigation, geofencing, and return-to-home features. GPS loss can cause drift or mode changes, so pilots must be ready to fly manually.",
    category: "operations",
  },
  {
    term: "EFB",
    full: "Electronic Flight Bag",
    definition:
      "An electronic app or device used for charts, weather, briefings, and flight planning. Remote pilots may use EFB apps, but must verify the data source and currency.",
    category: "operations",
  },
  {
    term: "RID",
    full: "Remote Identification",
    definition:
      "A system that broadcasts identification and location information for drones during flight (14 CFR Part 89). All drones required to be registered with the FAA must comply with Remote ID through one of three methods: (1) Standard Remote ID built into the aircraft, (2) a Remote ID broadcast module attached to the aircraft, or (3) operation entirely within an FAA-Recognized Identification Area (FRIA) while maintaining visual line of sight.",
    category: "operations",
  },
  {
    term: "FPV",
    full: "First-Person View",
    definition:
      "Flying using a camera view from the aircraft. FPV does not replace Part 107 VLOS; the RPIC or required crew must still be able to see the aircraft as required.",
    category: "operations",
  },
  {
    term: "LED",
    full: "Light-Emitting Diode",
    definition:
      "A common lighting technology used for drone position lights and strobes. For Part 107 night or civil twilight operations, anti-collision lighting must meet the visibility and flash-rate requirements.",
    category: "operations",
  },
  {
    term: "ADS-B",
    full: "Automatic Dependent Surveillance-Broadcast",
    definition:
      "A surveillance system used by manned aircraft to broadcast position and velocity. Part 107 generally prohibits small UAS from transmitting ADS-B Out unless otherwise authorized.",
    category: "operations",
  },
  {
    term: "ID",
    full: "Identification",
    definition:
      "In UAS material, ID usually means identification, especially Remote ID or UAS ID. It helps authorities associate an aircraft with its operator and control station information.",
    category: "operations",
  },
  {
    term: "NASA",
    full: "National Aeronautics and Space Administration",
    definition:
      "In aviation safety discussions, NASA often refers to the Aviation Safety Reporting System it administers. Filing a NASA ASRS report is not a substitute for required FAA accident reporting.",
    category: "operations",
  },
  {
    term: "AIM",
    full: "Aeronautical Information Manual",
    definition:
      "An FAA manual explaining airspace, charting, communications, weather services, and operating practices. It is guidance, but it is a core reference for the Part 107 test.",
    category: "operations",
  },
  {
    term: "POH",
    full: "Pilot's Operating Handbook",
    definition:
      "A manufacturer manual for an aircraft. For UAS, the equivalent flight manual or manufacturer instructions are the key source for limits, loading, maintenance, and emergency procedures.",
    category: "operations",
  },
  {
    term: "AFM",
    full: "Aircraft Flight Manual",
    definition:
      "An FAA-approved or manufacturer-provided manual containing operating limits and procedures. Category 4 and certificated-aircraft operations rely heavily on approved limitations.",
    category: "operations",
  },
  {
    term: "KE",
    full: "Kinetic Energy",
    definition:
      "Energy of motion. Operations-over-people Category 2 and 3 eligibility uses impact injury thresholds related to kinetic energy transfer.",
    category: "operations",
  },
  {
    term: "RPM",
    full: "Revolutions Per Minute",
    definition:
      "How many times a propeller or motor rotates in one minute. RPM affects thrust, noise, battery draw, and mechanical stress.",
    category: "operations",
  },
  {
    term: "CG",
    full: "Center of Gravity",
    definition:
      "The point where the aircraft's weight is considered concentrated. A CG outside limits can make the aircraft unstable, hard to control, or unrecoverable after a stall.",
    category: "operations",
  },
  {
    term: "FPM",
    full: "Feet Per Minute",
    definition:
      "A rate of climb or descent. Microbursts can produce downdrafts of thousands of fpm, far beyond what a small UAS can overcome.",
    category: "operations",
    caseInsensitive: true,
  },
  {
    term: "ATL",
    full: "Hartsfield-Jackson Atlanta International Airport Identifier",
    definition:
      "ATL is the IATA (three-letter) code for Hartsfield-Jackson Atlanta International Airport, one of the world's busiest Class B airports. In aviation weather and FAA documents the ICAO four-letter identifier KATL is used (e.g., in METARs/TAFs). In study examples, ATL/KATL usually signals very busy controlled airspace.",
    category: "operations",
  },
  {
    term: "HSI",
    full: "Horizontal Situation Indicator",
    definition:
      "A cockpit instrument that combines heading and navigation course information. Remote pilot study material may mention it in manned-aircraft navigation context.",
    category: "operations",
  },
  {
    term: "DJI",
    full: "Da-Jiang Innovations",
    definition:
      "A major drone manufacturer. A DJI model name does not by itself prove Part 107 compliance; weight, Remote ID, category eligibility, and operating limits still matter.",
    category: "operations",
  },
  {
    term: "TVMDC",
    full: "True, Variation, Magnetic, Deviation, Compass",
    definition:
      "A mnemonic for converting headings: True to Magnetic uses variation, then Magnetic to Compass uses deviation. Work the sequence in reverse when converting compass back to true.",
    category: "operations",
  },
  {
    term: "PSI",
    full: "PSI Testing Center",
    definition:
      "The FAA knowledge test vendor used for many airman tests, including the initial Part 107 UAG exam. It is not a unit of pressure in this study context.",
    category: "operations",
  },
  {
    term: "CONUS",
    full: "Continental United States",
    definition:
      "The 48 contiguous states and DC. For Part 107 civil-twilight purposes (14 CFR 107.29), CONUS uses the simple 30-minutes-before-sunrise / 30-minutes-after-sunset definition. Alaska uses a different definition based on the sun being no more than 6 degrees below the horizon (per the Air Almanac).",
    category: "operations",
  },
  {
    term: "hypoxia",
    full: "Hypoxia",
    definition:
      "A shortage of oxygen reaching body tissues. Early symptoms can include euphoria, impaired judgment, headache, dizziness, and tingling.",
    category: "physiology",
    caseInsensitive: true,
  },
  {
    term: "CO",
    full: "Carbon Monoxide",
    definition:
      "A colorless, odorless gas that prevents blood from carrying oxygen effectively. It is a manned-aircraft physiology hazard and can mimic or worsen hypoxia symptoms.",
    category: "physiology",
  },
  {
    term: "G",
    full: "G-Force or Load Factor",
    definition:
      "A measure of acceleration relative to gravity; 1 G is normal straight-and-level loading. In airspace text, the letter may also appear as part of Class G, so read context.",
    category: "physiology",
  },
  {
    term: "CTAF",
    full: "Common Traffic Advisory Frequency",
    definition:
      "The radio frequency used by pilots to self-announce and coordinate near non-towered airports. Remote pilots are not required to transmit, but monitoring CTAF can improve traffic awareness.",
    category: "navigation",
  },
  {
    term: "UNICOM",
    full: "Universal Communications",
    definition:
      "A non-government radio service at some non-towered airports, often used for advisory information. It may share the CTAF frequency.",
    category: "navigation",
  },
  {
    term: "MULTICOM",
    full: "Multicommunications Frequency",
    definition:
      "A common self-announce frequency used where no tower, FSS, or UNICOM frequency is assigned. 122.9 MHz is a common MULTICOM frequency.",
    category: "navigation",
  },
  {
    term: "ATC",
    full: "Air Traffic Control",
    definition:
      "The FAA service that manages controlled airspace traffic. Part 107 flights in Class B, C, D, or airport surface Class E require ATC authorization, usually through LAANC or DroneZone.",
    category: "navigation",
  },
  {
    term: "ATIS",
    full: "Automatic Terminal Information Service",
    definition:
      "A recorded broadcast of airport weather, runway, and operational information at towered airports. It helps pilots reduce radio congestion and understand current conditions.",
    category: "navigation",
  },
  {
    term: "AWOS",
    full: "Automated Weather Observing System",
    definition:
      "An automated airport weather system broadcasting current conditions such as wind, visibility, ceiling, temperature, and altimeter. It is useful for preflight weather checks.",
    category: "navigation",
  },
  {
    term: "ASOS",
    full: "Automated Surface Observing System",
    definition:
      "A primary automated weather observing system used at many airports. ASOS reports feed aviation weather products such as METARs.",
    category: "navigation",
  },
  {
    term: "VOR",
    full: "Very High Frequency Omnidirectional Range",
    definition:
      "A ground-based radio navigation aid used by manned aircraft. A VOR symbol on a sectional does not by itself create controlled airspace or a Part 107 authorization requirement.",
    category: "navigation",
  },
  {
    term: "DME",
    full: "Distance Measuring Equipment",
    definition:
      "Radio navigation equipment that provides slant-range distance from a station, usually in nautical miles. DCA VOR/DME is the reference point for DC SFRA and FRZ distances.",
    category: "navigation",
  },
  {
    term: "ILS",
    full: "Instrument Landing System",
    definition:
      "A precision approach system that guides manned aircraft to a runway using lateral and vertical signals. Airports with instrument approaches may have controlled surface airspace.",
    category: "navigation",
  },
  {
    term: "VASI",
    full: "Visual Approach Slope Indicator",
    definition:
      "Runway lights that show whether an aircraft is above, on, or below the visual glidepath. Remote pilots use this mainly to understand where manned traffic will be on approach.",
    category: "lighting",
  },
  {
    term: "PAPI",
    full: "Precision Approach Path Indicator",
    definition:
      "A row of runway lights showing glidepath position; two white and two red usually means on path. It helps manned aircraft maintain obstacle clearance on approach.",
    category: "lighting",
  },
  {
    term: "REIL",
    full: "Runway End Identifier Lights",
    definition:
      "Flashing lights near a runway threshold that help pilots identify the approach end of the runway. They are part of runway lighting, not drone anti-collision lighting.",
    category: "lighting",
  },
  {
    term: "HIRL",
    full: "High Intensity Runway Lights",
    definition:
      "High-intensity runway edge lights for night or low-visibility operations. Expect manned aircraft activity near lit runways at night.",
    category: "lighting",
  },
  {
    term: "MIRL",
    full: "Medium Intensity Runway Lights",
    definition:
      "Medium-intensity runway edge lights. They mark runway edges and help pilots maintain alignment at night.",
    category: "lighting",
  },
  {
    term: "LIRL",
    full: "Low Intensity Runway Lights",
    definition:
      "Low-intensity runway edge lights used at some airports. They still indicate a runway environment where remote pilots should expect aircraft.",
    category: "lighting",
  },
  {
    term: "RWY",
    full: "Runway",
    definition:
      "A prepared surface for aircraft takeoff and landing. Runway numbers are based on magnetic heading rounded to the nearest 10 degrees.",
    category: "navigation",
  },
  {
    term: "ICAO",
    full: "International Civil Aviation Organization",
    definition:
      "The United Nations aviation body that standardizes many international aviation practices. U.S. airport identifiers in METARs often use ICAO-style four-letter codes beginning with K.",
    category: "navigation",
  },
  {
    term: "A/FD",
    full: "Airport/Facility Directory",
    definition:
      "The older name for the FAA Chart Supplement. It lists airport details such as runway data, traffic patterns, frequencies, services, and remarks.",
    category: "navigation",
  },
  {
    term: "VFR",
    full: "Visual Flight Rules",
    definition:
      "Rules for flying primarily by outside visual reference in weather good enough to see and avoid. Remote pilots often share low-altitude airspace with VFR traffic.",
    category: "navigation",
  },
  {
    term: "IFR",
    full: "Instrument Flight Rules",
    definition:
      "Rules for flying by instruments and ATC clearance, including in clouds. Part 107 drones do not fly IFR, but IFR traffic may descend through clouds near your operating area.",
    category: "navigation",
  },
  {
    term: "NM",
    full: "Nautical Mile",
    definition:
      "A distance unit used in aviation, equal to about 1.15 statute miles. Airspace rings, TFRs, and DME distances are usually in NM.",
    category: "navigation",
  },
  {
    term: "SM",
    full: "Statute Mile",
    definition:
      "A standard land mile. Part 107 flight visibility minimums and METAR visibility in the U.S. use statute miles.",
    category: "navigation",
  },
  {
    term: "NAS",
    full: "National Airspace System",
    definition:
      "The U.S. network of airspace, airports, navigation, ATC, procedures, and rules. Part 107 integrates small UAS operations into the NAS.",
    category: "navigation",
  },
  {
    term: "DCA",
    full: "Ronald Reagan Washington National Airport / DCA VOR/DME",
    definition:
      "The airport and navigation reference used for the Washington, DC SFRA and FRZ distances. The DC SFRA is measured from the DCA VOR/DME.",
    category: "navigation",
  },
  {
    term: "POTUS",
    full: "President of the United States",
    definition:
      "Presidential movement typically triggers a VIP TFR with two zones: an inner core (commonly 10 NM radius from the protected location, surface up to 17,999 ft MSL) where essentially no flights are permitted, and an outer ring (commonly 30 NM radius) with significant restrictions. Small UAS operations are prohibited inside either ring unless specifically authorized by the FAA.",
    category: "general",
  },
  {
    term: "GA",
    full: "General Aviation",
    definition:
      "Civil aviation other than scheduled airline and military operations. In VIP TFR discussions, GA often includes private aircraft and small UAS unless the NOTAM says otherwise.",
    category: "general",
  },
  {
    term: "MLB",
    full: "Major League Baseball",
    definition:
      "Major League Baseball events at qualifying open-air stadiums (seating capacity of 30,000 or more) are covered by the standing stadium TFR (FDC 4/3621). The restriction is a 3 NM radius from the stadium up to and including 3,000 ft AGL, in effect from 1 hour before the scheduled event time until 1 hour after the event ends. Small UAS are not exempt.",
    category: "general",
  },
  {
    term: "NCAA",
    full: "National Collegiate Athletic Association",
    definition:
      "NCAA Division I football games at qualifying open-air stadiums (seating capacity of 30,000 or more) are covered by the standing stadium TFR (FDC 4/3621): 3 NM radius up to and including 3,000 ft AGL, from 1 hour before scheduled start to 1 hour after the event ends. Always check NOTAMs before operating near large sports venues.",
    category: "general",
  },
  {
    term: "NFL",
    full: "National Football League",
    definition:
      "NFL games at qualifying open-air stadiums (seating capacity of 30,000 or more) are covered by the standing stadium TFR (FDC 4/3621): 3 NM radius up to and including 3,000 ft AGL, from 1 hour before scheduled start to 1 hour after the event ends. Small UAS are not exempt.",
    category: "general",
  },
  {
    term: "NASCAR",
    full: "National Association for Stock Car Auto Racing",
    definition:
      "Major motor speedway events (such as NASCAR, IndyCar, and Champ Series races) at qualifying venues are covered by the standing stadium TFR (FDC 4/3621): 3 NM radius up to and including 3,000 ft AGL, from 1 hour before the scheduled start to 1 hour after the event ends. The restriction applies to all aircraft, including small UAS.",
    category: "general",
  },
  {
    term: "NH",
    full: "Northern Hemisphere",
    definition:
      "Weather and wind-circulation discussions often reference NH for Northern Hemisphere. Surface friction and Coriolis effects are described differently by hemisphere.",
    category: "general",
  },
  {
    term: "PDF",
    full: "Portable Document Format",
    definition:
      "A common document format used for FAA certificates, manuals, supplements, and references. Having a PDF copy does not remove the need to meet inspection and availability requirements.",
    category: "general",
  },
] satisfies GlossaryEntry[];

export const glossaryByTerm = new Map(glossary.map((entry) => [entry.term, entry]));

const caseInsensitiveGlossaryByTerm = new Map(
  glossary
    .filter((entry) => entry.caseInsensitive)
    .map((entry) => [entry.term.toLowerCase(), entry]),
);

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return glossaryByTerm.get(term) ?? caseInsensitiveGlossaryByTerm.get(term.toLowerCase());
}

export function glossarySlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

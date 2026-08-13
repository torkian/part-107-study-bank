// Auto-generated Week 2 audio scripts (drafted + FAA-verified via workflow wvgxz8r44).
// Every text is narrated by ElevenLabs Rachel via generate-audio.mjs.
// Reference material — do not edit numbers without checking CFR/AIM.

export type AudioScript = {
  pack: "metar-taf" | "airspace-parsing" | "hard-numbers" | "topic-briefings";
  slug: string;
  title: string;
  summary: string;
  text: string;
  teachingPoints: string[];
  faaCitations: string[];
};

export const WEEK2_SCRIPTS: AudioScript[] = [
  {
    "pack": "metar-taf",
    "slug": "metar-standard-variable-winds",
    "title": "Standard METAR with Variable Winds",
    "summary": "Decode KOKC METAR with gusty variable winds and clear ceiling for a Part 107 go decision.",
    "text": "Let's decode a real METAR. Here it is: KOKC 011955Z 22015G25KT 180V250 10SM FEW250 28/17 A2992. Now walk it token by token. K-O-K-C is Oklahoma City Will Rogers Airport. 011955Z means the first day of the month at nineteen fifty-five zulu. That's the observation time. Next, 22015G25KT. The wind is from two hundred twenty degrees at fifteen knots, gusting to twenty-five knots. Then 180V250 tells you the wind direction is variable between one hundred eighty and two hundred fifty degrees. That variable group appears when direction swings sixty degrees or more, so brief it before launch. Next, 10SM is visibility ten statute miles, the maximum reported. FEW250 means few clouds at twenty-five thousand feet above ground level. There is no ceiling reported here. Only broken or overcast layers count as a ceiling. Temperature is twenty-eight Celsius, dewpoint seventeen Celsius, altimeter twenty-nine point nine two inches of mercury. Now the Part 107 verdict. Section 107.51 requires at least three statute miles visibility and five hundred feet below the clouds. Visibility is ten statute miles. Ceiling is unlimited. This is a clear go. Watch those gusts against your aircraft's wind limit. Reference: FAA AIM section 7-1-28 for METAR format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "Few and scattered layers never constitute a ceiling",
      "Variable wind group appears when direction varies 60 degrees or more",
      "Gusts must stay inside your aircraft operating limits",
      "Zulu time uses the Z suffix and matches UTC",
      "Section 107.51 requires 3 statute miles visibility and 500 feet below clouds"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "metar-br-fg-low-visibility",
    "title": "METAR with Mist and Fog: No-Go",
    "summary": "Decode a low-visibility METAR with BR and FG that fails the Part 107 three-mile rule.",
    "text": "Here is a fog METAR: KMEM 121253Z 00000KT 1/2SM R36L/2000FT FG VV002 17/17 A3005. Walk it token by token. K-M-E-M is Memphis. 121253Z is the twelfth of the month at twelve fifty-three zulu. Next, 00000KT means calm winds, no direction, zero knots. Then 1/2SM. Visibility is one-half statute mile. That is critical. R36L/2000FT is runway visual range for runway three-six left, two thousand feet. That's a manned aviation figure, not something you use for Part 107, but it confirms poor conditions. Next, FG. F-G means fog, which is water droplets reducing visibility below five-eighths of a mile. If visibility were higher, you might see B-R for mist instead. VV002 is vertical visibility two hundred feet. We'll cover that in another script. Temperature seventeen Celsius equals dewpoint seventeen Celsius. When temperature meets dewpoint, air is saturated and fog forms. Now the Part 107 verdict. Section 107.51 requires three statute miles minimum visibility. You have one-half. This is a hard no-go. Do not launch. Wait for the fog to lift and the spread to widen. Reference: FAA AIM 7-1-28 for METAR format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "FG means fog, BR means mist",
      "Temperature equal to dewpoint signals saturation and fog risk",
      "Visibility below three statute miles is an automatic no-go",
      "Runway visual range applies to manned operations, not Part 107 minimums",
      "Calm winds are coded as 00000KT"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "metar-vv-indefinite-ceiling",
    "title": "METAR with Vertical Visibility Indefinite Ceiling",
    "summary": "Decode a VV002 METAR where the sky is obscured and no cloud layer can be measured.",
    "text": "Here is an obscured-sky METAR: KSEA 041755Z 09003KT 3/4SM -RA BR VV002 12/12 A2988. Walk it. K-S-E-A is Seattle-Tacoma. 041755Z is the fourth of the month at seventeen fifty-five zulu. Wind 09003KT is from zero nine zero degrees at three knots. Visibility three-quarters of a statute mile. Next, dash R-A means light rain. A minus sign in front of a weather code means light. No sign means moderate. A plus sign means heavy. Then B-R means mist. Now the key token: V-V-zero-zero-two. V-V stands for vertical visibility. The observer or automated sensor cannot see any distinct cloud layer through the obscuration. Vertical visibility is two hundred feet. Under FAA rules that vertical figure counts as an indefinite ceiling of two hundred feet above ground level. Temperature twelve Celsius, dewpoint twelve Celsius, saturated. Now the Part 107 verdict. Section 107.51 requires three statute miles visibility and five hundred feet clearance below clouds. Visibility fails at three-quarters. Ceiling fails at two hundred feet. This is a firm no-go. Reference: FAA AIM 7-1-14 for METAR format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "VV followed by three digits is an indefinite ceiling in hundreds of feet",
      "Minus is light, plus is heavy, no sign is moderate intensity",
      "BR is mist with visibility five-eighths of a mile or greater",
      "Obscuration counts as a ceiling for weather minimum decisions",
      "A single failed criterion is enough to no-go"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "speci-rapid-change",
    "title": "SPECI Report Triggered by Rapid Change",
    "summary": "Decode a SPECI issued when conditions worsen suddenly and evaluate the Part 107 impact.",
    "text": "Here is a special observation: SPECI KDEN 151847Z 27025G40KT 1SM +TSRA BKN008 OVC020CB 22/20 A2975. Walk it token by token. SPECI, pronounced spesh-ee, is a special report issued off-schedule because weather changed rapidly. METARs come hourly. SPECIs come whenever reporting thresholds are crossed. K-D-E-N is Denver International. 151847Z is the fifteenth at eighteen forty-seven zulu. Wind 27025G40KT is from two hundred seventy degrees at twenty-five knots, gusting forty. Visibility one statute mile. Next, plus T-S-R-A. Plus is heavy. T-S is thunderstorm. R-A is rain. So heavy thunderstorm rain. BKN008 is broken clouds at eight hundred feet above ground level. Broken is a ceiling. OVC020CB is overcast at two thousand feet with cumulonimbus, the thunderstorm cloud. Temperature twenty-two Celsius, dewpoint twenty. Altimeter twenty-nine point seven five. Now the Part 107 verdict. Section 107.51 requires three statute miles visibility, five hundred feet below the clouds, and two thousand feet horizontal from the clouds. Visibility is one mile. Ceiling is eight hundred feet with a thunderstorm on top. Hard no-go. Thunderstorms are also a launch stopper by any reasonable safety standard. Reference: FAA AIM 7-1-14 for METAR format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "SPECI is issued when weather crosses reporting thresholds between hourly METARs",
      "CB in a cloud group means cumulonimbus, a thunderstorm cloud",
      "Broken and overcast layers both constitute ceilings",
      "Plus prefix on a weather code means heavy intensity",
      "Thunderstorms rule out Part 107 operations even if visibility scraped by"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "taf-tempo-change",
    "title": "TAF with TEMPO Condition Change",
    "summary": "Decode a TAF including a TEMPO group forecasting brief worsening within the period.",
    "text": "Here is a Terminal Aerodrome Forecast. T-A-F, K-A-T-L, zero-five-one-seven-two-zero Z, zero-five-one-eight slash zero-six-two-four, two-four-zero-one-two K-T, P-six-S-M, S-C-T zero-four-zero, TEMPO zero-five-two-two slash zero-six-zero-two, three-S-M T-S-R-A, B-K-N zero-two-five C-B. Walk it. T-A-F is a Terminal Aerodrome Forecast, valid within a five statute mile radius of the airport. K-A-T-L is Atlanta Hartsfield. The issue time is the fifth at seventeen twenty zulu. The valid period, zero-five-one-eight slash zero-six-two-four, runs from the fifth at eighteen hundred zulu through the end of the sixth at twenty-four hundred zulu, which is midnight ending the sixth. Base conditions: wind from two hundred forty at twelve knots. P-six-S-M means visibility greater than six statute miles. S-C-T zero-four-zero is scattered clouds at four thousand feet, which is not a ceiling. Now the key token, TEMPO, meaning temporary. Within the block zero-five-two-two to zero-six-zero-two, that is the fifth at twenty-two hundred zulu to the sixth at zero-two hundred zulu, expect brief periods of three statute miles visibility in thunderstorm rain, broken clouds at two thousand five hundred feet with cumulonimbus. TEMPO conditions last less than one hour per occurrence. Now the Part 107 verdict. Base conditions pass Section 107.51. During the TEMPO window, visibility drops to exactly three statute miles, the legal floor, leaving no margin. Cloud clearance is easily met since Part 107 caps you at four hundred feet above ground level, well below the two thousand five hundred foot ceiling. The real disqualifier is the thunderstorm activity, which creates hazardous conditions and would violate Section 107.23. Plan launch outside the TEMPO window. Reference: F-A-A AIM section seven dash one dash twenty-eight for METAR and TAF format, and fourteen C-F-R section 107.51 for weather minimums.",
    "teachingPoints": [
      "TAF valid period uses day-hour slash day-hour format",
      "P6SM means visibility greater than six statute miles",
      "TEMPO groups last less than one hour per occurrence",
      "Plan operations outside forecast TEMPO windows containing thunderstorms",
      "Base TAF conditions apply outside of change groups"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "taf-becmg-becoming",
    "title": "TAF with BECMG Becoming Forecast",
    "summary": "Decode a TAF using BECMG to signal a gradual, lasting shift in conditions for planning.",
    "text": "Here is a planning TAF: TAF KPHX 061130Z 0612/0712 09006KT P6SM FEW250 BECMG 0618/0620 18015G22KT SCT070 BKN200. Walk it. TAF is the Terminal Aerodrome Forecast. K-P-H-X is Phoenix Sky Harbor. 061130Z is issued the sixth at eleven thirty zulu. Valid 0612 through 0712. That is the sixth at twelve hundred zulu through the seventh at twelve hundred zulu. Base conditions: wind 09006KT is from zero nine zero degrees at six knots. P6SM is visibility greater than six statute miles. FEW250 is few clouds at twenty-five thousand feet, no ceiling. Now the key token: B-E-C-M-G. Becmg means becoming. Between 0618 and 0620, the sixth at eighteen hundred zulu and the sixth at twenty hundred zulu, conditions transition permanently to wind from one hundred eighty at fifteen gusting twenty-two knots, scattered at seven thousand feet, and broken at twenty thousand feet. Broken at twenty thousand is a ceiling but well above operational altitude. Now the Part 107 verdict. Both the base and the becoming forecast pass Section 107.51 for visibility and cloud clearance. Plan around the wind shift. If your aircraft limit is fifteen knots steady, the twenty-two knot gust after eighteen zulu is your no-go. Reference: FAA AIM 7-1-28 for METAR and TAF format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "BECMG means conditions transition gradually and then persist",
      "BECMG windows are typically two hours long",
      "Ceilings well above four hundred feet do not affect Part 107 clearance",
      "Use TAF change groups to time your launch window",
      "Aircraft wind and gust limits are separate from Part 107 minimums"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "metar-wind-shear",
    "title": "METAR with Wind Shear",
    "summary": "Decode a METAR with WS group reporting low-level wind shear near the surface.",
    "text": "Here is a wind shear METAR: KDFW 221953Z 18018G28KT 5SM SCT030 BKN050 WS020/22045KT 24/18 A2984. Walk it token by token. K-D-F-W is Dallas Fort Worth. 221953Z is the twenty-second at nineteen fifty-three zulu. Wind 18018G28KT is from one hundred eighty at eighteen knots, gusting twenty-eight. Visibility five statute miles. SCT030 scattered at three thousand feet. BKN050 broken at five thousand feet, which is a ceiling at five thousand. Now the key token: W-S-zero-two-zero slash 22045KT. W-S means wind shear. The zero two zero after WS is the altitude in hundreds of feet above ground level. So wind shear reported at two thousand feet. The wind up there is from two hundred twenty degrees at forty-five knots. Compare that to surface wind one hundred eighty at eighteen. That is a forty-degree direction change and twenty-seven knot speed change in two thousand feet. Serious shear. Temperature twenty-four Celsius, dewpoint eighteen. Now the Part 107 verdict. Section 107.51 requires three miles visibility and five hundred feet below the clouds. Visibility passes at five miles. Ceiling at five thousand feet passes. But wind shear at two thousand and surface gusts to twenty-eight knots is a practical no-go for most small unmanned aircraft. Reference: FAA AIM 7-1-14 for METAR format, 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "WS group reports low-level wind shear below two thousand feet above ground level",
      "Altitude in the WS group is in hundreds of feet",
      "Compare shear wind to surface wind to gauge severity",
      "Section 107.51 minimums may pass while operational safety fails",
      "Gusts and shear together degrade small unmanned aircraft controllability"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14"
    ]
  },
  {
    "pack": "metar-taf",
    "slug": "metar-vcts-distant-thunderstorm",
    "title": "METAR with Distant Thunderstorm VCTS",
    "summary": "Decode a METAR with VCTS and apply the Part 107 rule for thunderstorm proximity.",
    "text": "Here is a proximity METAR: KMCO 271656Z 25008KT 8SM VCTS FEW035CB SCT100 BKN250 30/23 A2996. Walk it token by token. K-M-C-O is Orlando International. 271656Z is the twenty-seventh at sixteen fifty-six zulu. Wind 25008KT is from two hundred fifty degrees at eight knots. Visibility eight statute miles. Now the key token: V-C-T-S. Vicinity thunderstorm. VC means in the vicinity, which is between five and ten statute miles from the observation point. TS is thunderstorm. So a thunderstorm is between five and ten miles from the field. FEW035CB is few cumulonimbus at three thousand five hundred feet. Cumulonimbus is the thunderstorm cloud. SCT100 is scattered at ten thousand feet. BKN250 is broken at twenty-five thousand feet, technically a ceiling but well above your ops. Temperature thirty Celsius, dewpoint twenty-three. Altimeter twenty-nine point nine six. Now the Part 107 verdict. Section 107.51 covers visibility and cloud clearance, which pass here at eight miles and no low ceiling. But FAA guidance treats thunderstorms as a firm stay-away out to twenty statute miles because of gust fronts, downbursts, and hail thrown well outside the cell. VCTS at five to ten miles is a no-go. Reference: Advisory Circular 00-45 Aviation Weather Services for METAR decoding, and 14 CFR section 107.51 for weather minimums.",
    "teachingPoints": [
      "VC prefix means in the vicinity, five to ten statute miles from the station",
      "CB in a cloud group means cumulonimbus, a thunderstorm cloud",
      "FAA guidance recommends staying twenty statute miles from thunderstorms",
      "Section 107.51 minimums can be met while thunderstorm proximity still says no-go",
      "Gust fronts and downbursts extend well outside the visible storm cell"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "AIM 7-1-14",
      "AC 107-2"
    ]
  },
  {
    "pack": "airspace-parsing",
    "slug": "class-b-vertical-stack",
    "title": "Class B - Reading the Vertical Stack",
    "summary": "How to decode Class B floor and ceiling numbers like 70 over SFC or 100 over 30.",
    "text": "Picture a solid blue ring wrapped around a major airport. Now zoom in on the edge of that ring. Every Class B shelf has a stack of two numbers separated by a horizontal line. Top number is the ceiling. Bottom number is the floor. Both are in hundreds of feet above mean sea level. So when you see one hundred over three zero, read it as ceiling ten thousand MSL, floor three thousand MSL. When you see seventy over SFC, that means ceiling seven thousand MSL, and the floor sits right on the surface. SFC always means surface. Here is the mental model. Class B looks like an upside down wedding cake. The center layer touches the ground. The outer layers stack higher and higher, each ring a shelf sitting on top of the terrain. As a remote pilot you cannot enter any layer of Class B without prior authorization through LAANC or the FAA DroneZone portal. The number on top tells you how tall the wall is above you. The number on bottom tells you if you are already inside just by lifting off. If the bottom says SFC, you need authorization to fly at all in that ring. Memory hook. Top is ceiling, bottom is floor, both times one hundred equals feet MSL. Reference: AIM section 3-2-3.",
    "teachingPoints": [
      "Class B is a solid blue line around major airports",
      "Vertical stack reads top over bottom as ceiling over floor",
      "Both numbers are hundreds of feet MSL",
      "SFC means the floor is at the surface",
      "Part 107 requires prior authorization for any Class B layer"
    ],
    "faaCitations": [
      "AIM 3-2-3",
      "14 CFR 107.41"
    ]
  },
  {
    "pack": "airspace-parsing",
    "slug": "class-e-floors-magenta",
    "title": "Class E Floors - Magenta and the Zipper",
    "summary": "Dashed magenta, shaded magenta, and zipper lines each mark a different Class E floor.",
    "text": "Class E is the everywhere airspace, but the floor changes depending on what marking you see on the chart. Picture four different symbols and learn what each means. First, a dashed magenta line around an airport. That is a Class E surface area. The floor is at the surface. Weather minimums apply from the ground up. Second, a shaded magenta band, sometimes called a magenta fuzzy ring. That drops the Class E floor to seven hundred feet above ground level. If you see the soft magenta shading, remember magenta means seven. Third, a shaded blue band, the blue fuzzy ring. That means the Class E floor is one thousand two hundred feet above ground level. Blue means twelve. Fourth, no marking at all over open terrain. Default Class E floor is one thousand two hundred feet AGL, or in the western mountains, fourteen thousand five hundred MSL. Finally, the zipper line, a magenta line with little teeth. That marks the boundary where the Class E floor changes from one value to another. On one side you might have seven hundred AGL, on the other side twelve hundred AGL. For a Part 107 pilot flying at or below four hundred feet AGL, you are almost always in Class G until you cross under one of these shaded rings. Memory hook. Magenta seven, blue twelve, zipper is a boundary. Reference: AIM section 3-2-6.",
    "teachingPoints": [
      "Dashed magenta means Class E to the surface",
      "Shaded magenta drops the Class E floor to 700 AGL",
      "Shaded blue drops the Class E floor to 1200 AGL",
      "Zipper line marks a change between two Class E floors",
      "Default Class E floor is 1200 AGL over open terrain"
    ],
    "faaCitations": [
      "AIM 3-2-6",
      "14 CFR 71"
    ]
  },
  {
    "pack": "airspace-parsing",
    "slug": "class-c-and-d-rings",
    "title": "Class C and D - Blue Solid, Magenta Dashed, Tower Numbers",
    "summary": "How to distinguish Class C from Class D and read the ceiling in hundreds of feet.",
    "text": "Two rings, two colors, two shapes. Class C is a solid magenta line. Class D is a dashed blue line. Say that twice. Solid magenta for Charlie. Dashed blue for Delta. Now find the boxed number inside the ring. Class D shows a single number inside a dashed blue box. That number is the ceiling in hundreds of feet MSL. So a box that reads two five means the Class D goes from the surface up to two thousand five hundred MSL. Sometimes there is a minus sign in front, like minus two five, which means the ceiling is not included in the Delta and belongs to the airspace above. Class C shows a stack of two numbers, top over bottom, both in hundreds of feet MSL. Forty one over one two means ceiling four thousand one hundred, floor one thousand two hundred MSL. Charlie has two rings, an inner five nautical mile core and an outer ten nautical mile shelf. Near the airport symbol you will see a small box with the tower frequency, often prefixed with CT for control tower, and a star if the tower is part time. Under Part 107 you need prior authorization for both Class C and Class D. Memory hook. Charlie is solid magenta with a stacked ceiling and floor. Delta is dashed blue with just a single boxed ceiling. Reference: AIM section 3-2-4 and 3-2-5.",
    "teachingPoints": [
      "Class C is solid magenta, Class D is dashed blue",
      "Class D box shows a single ceiling in hundreds of feet MSL",
      "A minus sign before the number means the ceiling is excluded",
      "Class C shows ceiling over floor, both in hundreds of feet MSL",
      "Part 107 requires prior authorization to enter either class"
    ],
    "faaCitations": [
      "AIM 3-2-4",
      "AIM 3-2-5",
      "14 CFR 107.41"
    ]
  },
  {
    "pack": "airspace-parsing",
    "slug": "ctaf-unicom-multicom-block",
    "title": "CTAF, UNICOM, and MULTICOM Frequency Blocks",
    "summary": "How to read the airport data block and spot the bold C star for CTAF.",
    "text": "Find any airport on the sectional and look at the small text block beside its symbol. That block gives you the airport name and identifier, the field elevation, the length of the longest runway in hundreds of feet, a lighting code, and the radio frequencies pilots use to talk to each other and to the ground. Now hunt for a bold capital letter C inside a solid circle, or a small filled star. That symbol marks the CTAF, the Common Traffic Advisory Frequency. That is the frequency every pilot monitors when arriving or departing an airport without a control tower, or when a tower is closed. Right next to the CTAF you will often see the word UNICOM followed by a frequency, usually one two two point seven or one two two point eight. UNICOM is a private ground station that also serves as CTAF at many small fields. If no ground station exists at all, pilots use MULTICOM, which is one two two point nine. That is the default self announce frequency for uncontrolled airports without UNICOM. Reading the block, expect the airport name and identifier first, then the CTAF line marked with the bold C in a circle or a star, then elevation and runway data, and finally UNICOM if one is published. As a remote pilot you are not required to broadcast, but monitoring CTAF gives you situational awareness of nearby manned traffic. Memory hook. Bold C in a circle means Call this frequency. Reference: AIM section 4-1-9 and the FAA Chart Users Guide.",
    "teachingPoints": [
      "The bold C inside a solid circle marks the CTAF frequency",
      "UNICOM is a private ground station, often also serving as CTAF",
      "MULTICOM 122.9 is the default when no UNICOM exists",
      "The airport data block lists name, elevation, lighting, and frequencies",
      "Monitoring CTAF gives situational awareness of manned traffic"
    ],
    "faaCitations": [
      "AIM 4-1-9",
      "AIM 3-1-4"
    ]
  },
  {
    "pack": "airspace-parsing",
    "slug": "mef-obstruction-terrain",
    "title": "MEF, Obstructions, and the Tallest Thing in the Quadrant",
    "summary": "Reading the big yellow MEF number and telling MSL from AGL on obstruction symbols.",
    "text": "Open any sectional and look at the big bold blue number sitting in the middle of a grid square. Two digits above a smaller two digits, like a stacked fraction. That is the Maximum Elevation Figure, or MEF. Read it as thousands and hundreds of feet MSL. So thirty two over five means three thousand two hundred fifty feet mean sea level. The MEF represents the highest known terrain or obstacle in that quadrant, plus a buffer for vertical error and small uncharted obstacles. Stay above it and you will clear everything charted in that quadrant. Now look for individual obstructions. A single tower is a thin arrow shape. A group of towers looks like two arrows joined at the base. Next to the symbol you will see two numbers. The top number, without parentheses, is the height of the top of the obstacle in feet MSL. The number in parentheses below is the height above ground level, AGL. So one thousand two hundred fifty MSL with two hundred fifty in parentheses means the tower is two hundred fifty feet tall standing on ground that is one thousand feet MSL. Obstacles one thousand feet AGL or taller get a lightning bolt symbol showing high intensity lighting. For a Part 107 pilot the AGL number matters most because your four hundred foot ceiling is measured above ground. Memory hook. Big number equals MEF MSL. Parentheses equal AGL. Reference: FAA Aeronautical Chart User's Guide.",
    "teachingPoints": [
      "The bold MEF number is the maximum elevation figure in feet MSL",
      "Single arrows are single obstructions, joined arrows are groups",
      "Top number is MSL, parenthetical number is AGL height",
      "Obstructions 1000 AGL or taller show lightning bolts for high intensity lighting",
      "As a Part 107 pilot the AGL height governs your 400 foot ceiling"
    ],
    "faaCitations": [
      "AIM 3-1-4",
      "14 CFR 107.51"
    ]
  },
  {
    "pack": "hard-numbers",
    "slug": "rapid-fire-hard-numbers",
    "title": "Rapid Fire: Hard Numbers",
    "summary": "Six to eight minute memorization loop covering every hard number the Part 107 exam tests.",
    "text": "Rapid fire hard numbers. Listen once, then loop back. These are the digits the exam tests over and over. Say them out loud with me.\n\nCluster one. Operating limits under section 107.51.\n\nGroundspeed. Maximum 87 knots ground speed. That is 100 miles per hour. This is a hard ceiling. It is waiverable, but do not count on that. For the exam, 87 knots equals 100 miles per hour equals the limit.\n\nAltitude. Maximum 400 feet above ground level. There is one exception. You may fly 400 feet above a structure, as long as you stay within 400 feet horizontally of that structure. Four hundred, four hundred, four hundred. Remember the three fours.\n\nVisibility. Minimum 3 statute miles of flight visibility from the control station. Less than three, do not fly.\n\nCloud clearance. 500 feet below the cloud. 2000 feet horizontal from the cloud. Five hundred below, two thousand sideways. Say it again. Five hundred below, two thousand sideways.\n\nReference. 14 CFR section 107.51.\n\nNext cluster. Time and reporting.\n\nNight operations. You may fly at night as long as the aircraft has anti-collision lighting visible for 3 statute miles. The civil twilight window, 30 minutes before official sunrise to 30 minutes after official sunset, is a defined period the exam may reference. The lighting requirement is what makes night flight legal. Anti-collision light visible three statute miles.\n\nReference. 14 CFR section 107.29.\n\nAccident reporting. You must report an accident to the Federal Aviation Administration within 10 calendar days. Report is triggered by either serious injury, or loss of consciousness to any person, or property damage of 500 dollars or more, not counting the drone itself. Ten calendar days. Serious injury or 500 dollars.\n\nReference. 14 CFR section 107.9.\n\nAlcohol. No flying within 8 hours of consuming alcohol. Blood alcohol content maximum 0.04 percent. And you may not fly while under the influence regardless of the numbers. Eight hours bottle to throttle. Point zero four blood alcohol.\n\nReference. 14 CFR section 107.27 and 14 CFR section 91.17.\n\nNext cluster. Certification and registration.\n\nRemote pilot certificate. To keep it current you must complete recurrent training every 24 calendar months. That training is a free online course through the Federal Aviation Administration. Twenty four calendar months. No test fee after the first one.\n\nReference. 14 CFR section 107.65.\n\nAircraft registration. Required for any drone weighing between 0.55 pounds and 55 pounds at takeoff. Zero point five five on the low end. Fifty five on the high end. Below 0.55 pounds, no registration required for recreational, but Part 107 commercial flyers register every aircraft regardless. Above 55 pounds, you are outside Part 107 entirely.\n\nRemote Identification. Every drone that requires registration must meet Remote ID. Three ways to comply. One, fly a standard Remote ID drone that broadcasts built in. Two, attach a Remote ID broadcast module to a legacy drone. Three, fly inside an FAA Recognized Identification Area, a FRIA. Standard drone, broadcast module, or FRIA. Compliance date was September 16, 2023.\n\nReference. 14 CFR Part 89.\n\nNext cluster. Operations over people. Categories one through four.\n\nCategory 1. Aircraft weighs less than 0.25 pounds. No exposed rotating parts that would lacerate skin. Under a quarter pound, no sharp spinning bits.\n\nCategory 2. Kinetic energy on impact must not exceed 11 foot-pounds. No exposed rotating parts that would lacerate skin. Manufacturer declares compliance. Eleven foot-pounds is the number.\n\nCategory 3. Kinetic energy on impact must not exceed 25 foot-pounds. Same no laceration rule. And operating restrictions apply. You may not sustain flight over open air assemblies. You may only fly over people inside a closed or restricted access site, or transit briefly. Twenty five foot-pounds. Restricted operating conditions.\n\nCategory 4. The aircraft has an airworthiness certificate issued under Part 21, and you operate per the flight manual limitations. This is the airline style category. Full certificate, follow the limits.\n\nReference. 14 CFR section 107.110 through section 107.140.\n\nNext cluster. Waiverable versus not waiverable.\n\nWaiverable operations. The Federal Aviation Administration can grant a Certificate of Waiver for many operating rules. Night flight can be waived, though most operators just add lighting under section 107.29. Operations over people can be waived if you cannot meet a category. Operations over moving vehicles can be waived. Beyond visual line of sight can be waived. Operations from a moving vehicle in populated areas can be waived. And operations in controlled airspace, normally requiring air traffic control authorization such as LAANC, can be waived. Ground speed can be waived. Altitude in certain cases can be waived. These are performance based waivers.\n\nNot waiverable. Pilot certification. You cannot waive the requirement to hold a remote pilot certificate. Aircraft registration. You cannot waive registration. Alcohol and drug rules. You cannot waive sobriety. Carriage of hazardous materials is not waiverable. And the requirement to yield right of way to manned aircraft is not waiverable. Certification, registration, sobriety, hazmat, yielding to manned aircraft. Hard rules. No waiver, ever.\n\nReference. 14 CFR section 107.205 lists waiverable rules.\n\nQuick recall lightning round.\n\nEighty seven knots. One hundred miles per hour. Same number.\n\nFour hundred feet above ground. Four hundred above a structure within four hundred horizontal.\n\nThree statute miles visibility. Five hundred below clouds. Two thousand horizontal from clouds.\n\nNight flight legal with anti-collision light visible three statute miles. Civil twilight is thirty minutes before sunrise to thirty minutes after sunset.\n\nTen calendar days for accident reports. Serious injury or five hundred dollars property damage.\n\nEight hours bottle to throttle. Point zero four blood alcohol.\n\nTwenty four calendar months for recurrent training.\n\nZero point five five pounds to fifty five pounds. Registration window.\n\nEleven foot-pounds Category 2. Twenty five foot-pounds Category 3.\n\nRemote Identification. Standard drone, broadcast module, or FRIA.\n\nNot waiverable. Certification, registration, sobriety, hazmat, yielding to manned aircraft.\n\nRapid fire complete. Loop back to the top for another pass.",
    "teachingPoints": [
      "Operating limits under section 107.51 are hard numbers: 87 knots, 400 feet, 3 statute miles, 500 below and 2000 horizontal from clouds",
      "Civil twilight window is 30 minutes before sunrise to 30 minutes after sunset; accident reports within 10 calendar days for serious injury or 500 dollar property damage",
      "Recurrent training every 24 calendar months; aircraft registration required 0.55 to 55 pounds",
      "Category 2 threshold is 11 foot-pounds kinetic energy; Category 3 is 25 foot-pounds",
      "Certification, registration, and alcohol rules are NOT waiverable"
    ],
    "faaCitations": [
      "14 CFR 107.51",
      "14 CFR 107.29",
      "14 CFR 107.9",
      "14 CFR 107.27",
      "14 CFR 91.17",
      "14 CFR 107.65",
      "14 CFR 89",
      "14 CFR 107.110",
      "14 CFR 107.115",
      "14 CFR 107.120",
      "14 CFR 107.125",
      "14 CFR 107.130",
      "14 CFR 107.140",
      "14 CFR 107.205"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "airspace",
    "title": "Airspace at a Glance",
    "summary": "Class B, C, D, E, G and when you need LAANC or a waiver.",
    "text": "Airspace basics. The one big rule: you need ATC authorization to fly in controlled airspace, Class B, C, D, or surface Class E. Uncontrolled Class G needs no permission. Get authorization through LAANC for near-instant approval up to the posted UAS facility map altitude. If you need higher, or if LAANC is not available, file a Part 107 waiver through FAA DroneZone. Class G ends where controlled airspace begins, often 700 or 1200 feet AGL. Always check a current sectional. Reference: 14 CFR Section 107.41 and Section 107.200.",
    "teachingPoints": [
      "Class B, C, D, surface E all require ATC authorization",
      "LAANC is the fastest path for controlled airspace",
      "Waivers go through FAA DroneZone",
      "Class G is uncontrolled but limited in altitude",
      "UAS facility maps show pre-approved ceilings"
    ],
    "faaCitations": [
      "14 CFR 107.41",
      "14 CFR 107.200"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "weather",
    "title": "Weather Minimums",
    "summary": "The 3-500-2000 rule and visibility from the control station.",
    "text": "Weather minimums under Section 107.51. The one big rule: three, five hundred, two thousand. You need at least three statute miles of flight visibility from the control station. You must stay five hundred feet below clouds and two thousand feet horizontal from clouds. Trap one: visibility is measured from where you stand, not from the drone. Trap two: these numbers are minimums, not targets. Trap three: maximum groundspeed is one hundred miles per hour, maximum altitude four hundred feet AGL. Reference: 14 CFR Section 107.51.",
    "teachingPoints": [
      "3 statute miles visibility minimum",
      "500 feet below and 2000 feet horizontal from clouds",
      "Visibility measured from control station location",
      "100 mph groundspeed max",
      "400 feet AGL altitude max"
    ],
    "faaCitations": [
      "14 CFR 107.51"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "sectional-symbology",
    "title": "Sectional Chart Symbology",
    "summary": "Colors, lines, and numbers you must read in sixty seconds.",
    "text": "Sectional chart symbology. The one big rule: color equals airspace class. Solid blue lines outline Class Bravo. Solid magenta outlines Class Charlie. Dashed blue outlines Class Delta. Dashed magenta is surface Class Echo. A magenta shaded ring means Class Echo begins at seven hundred feet above ground level. A blue shaded ring means Class Echo begins at one thousand two hundred feet above ground level. Numbers stacked like a fraction show the airspace ceiling over floor in hundreds of feet M S L; a floor shown as S F C means surface. Reference: F A A Aeronautical Chart Users Guide.",
    "teachingPoints": [
      "Solid blue = Class B, solid magenta = Class C",
      "Dashed blue = Class D, dashed magenta = surface Class E",
      "Magenta shaded ring = Class E from 700 AGL",
      "Blue shaded ring = Class E from 1200 AGL",
      "Stacked numbers = ceiling over floor"
    ],
    "faaCitations": [
      "FAA Aeronautical Chart Users Guide",
      "AIM 3-2"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "categories-1-4",
    "title": "Operations Over People, Categories 1 to 4",
    "summary": "Which category fits your aircraft and what it lets you do.",
    "text": "Operations over people, Categories one through four, under Section 107.110 and following. The core rule: your category depends on aircraft weight, injury risk, and exposed parts. Category one: under point five five pounds, with no exposed rotating parts that could lacerate skin. Categories two and three: injury severity thresholds apply, and the manufacturer must show compliance through an FAA-accepted declaration of compliance. Categories one, two, and three all prohibit sustained flight over open-air assemblies of human beings. Category four requires an airworthiness certificate issued under Part 21, and is the only category that may operate over open-air assemblies, subject to the additional conditions in Section 107.145. Reference: 14 CFR Section 107.110 through 107.140.",
    "teachingPoints": [
      "Category 1 = under 0.55 lbs, no lacerating parts",
      "Category 2 and 3 tied to injury severity thresholds",
      "Category 3 forbids sustained flight over open-air assemblies",
      "Category 4 requires an airworthiness certificate",
      "Manufacturer declaration of compliance required for 2 and 3"
    ],
    "faaCitations": [
      "14 CFR 107.110",
      "14 CFR 107.115",
      "14 CFR 107.120",
      "14 CFR 107.125",
      "14 CFR 107.140"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "remote-id",
    "title": "Remote ID",
    "summary": "Standard Remote ID, broadcast modules, and FRIA options.",
    "text": "Remote ID under Part 89. The one big rule: nearly every drone requiring registration must broadcast Remote ID. You have three ways to comply. One, fly a standard Remote ID drone with the transmitter built in. Two, attach an FAA-approved broadcast module to an older aircraft. Three, fly inside an FAA-Recognized Identification Area, a FRIA, where broadcast is not required. Remote ID broadcasts your drone location, control station location, altitude, velocity, and a session or serial identifier. Reference: 14 CFR Part 89.",
    "teachingPoints": [
      "Three compliance paths: standard, broadcast module, FRIA",
      "Broadcasts drone position, control station position, altitude, velocity",
      "Required for any drone that must be registered",
      "FRIAs are FAA-approved fixed sites",
      "Broadcast module lets you retrofit older aircraft"
    ],
    "faaCitations": [
      "14 CFR Part 89",
      "14 CFR 89.110",
      "14 CFR 89.115"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "night-ops",
    "title": "Night Operations",
    "summary": "Anti-collision lighting, civil twilight, and current Section 107.29 rules.",
    "text": "Night operations under Section 107.29. The one big rule: you may fly at night without a waiver if your aircraft has anti-collision lighting visible for at least three statute miles, and the flash rate is enough to avoid collision. You must have completed the updated recurrent training that covers night. Civil twilight is thirty minutes before sunrise and thirty minutes after sunset. Standard daytime rules still apply during civil twilight. Trap: white strobes or nav lights alone are not enough unless they meet the three mile visibility standard. Reference: 14 CFR Section 107.29.",
    "teachingPoints": [
      "Anti-collision lights visible for 3 statute miles required",
      "Night training required as part of recurrent or initial",
      "Civil twilight = 30 minutes before sunrise or after sunset",
      "No waiver needed if aircraft is properly lit",
      "Flash rate must be sufficient to avoid collision"
    ],
    "faaCitations": [
      "14 CFR 107.29"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "alcohol-drugs-medical",
    "title": "Alcohol, Drugs, and Medical Fitness",
    "summary": "The eight-hour rule, the point-oh-four limit, and self-assessment.",
    "text": "Alcohol, drugs, and medical fitness. The one big rule: no flying within eight hours of consuming alcohol, no flying with a blood alcohol content of point zero four percent or higher, and no flying while impaired by any drug. This comes from Section 107.27 which points to Section 91.17. Section 107.17 says you may not operate if you have a physical or mental condition that would interfere with safe flight. There is no medical certificate required for Part 107, but self-assessment is mandatory. Reference: 14 CFR Section 107.17 and Section 107.27.",
    "teachingPoints": [
      "8 hours from bottle to throttle",
      "0.04% BAC hard limit",
      "No flying while impaired by any drug",
      "No FAA medical required, but self-assessment mandatory",
      "Section 107.27 incorporates Section 91.17 rules"
    ],
    "faaCitations": [
      "14 CFR 107.17",
      "14 CFR 107.27",
      "14 CFR 91.17"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "accident-reporting",
    "title": "Accident Reporting",
    "summary": "The ten-day rule for serious injury or five hundred dollar damage.",
    "text": "Accident reporting under Section 107.9. The one big rule: you must report to the FAA within ten calendar days if your operation results in serious injury to any person, loss of consciousness of any person, or damage to any property, other than your own small unmanned aircraft, with a repair cost of at least five hundred dollars, or a fair market value of at least five hundred dollars if it is not repairable. Report through the FAA DroneZone portal or contact your local Flight Standards District Office. Reference: 14 CFR Section 107.9.",
    "teachingPoints": [
      "Report within 10 calendar days",
      "Trigger: serious injury, loss of consciousness, or $500+ property damage",
      "Damage to your own aircraft does not count",
      "Use FAA DroneZone or local FSDO",
      "$500 threshold is repair cost or fair market value"
    ],
    "faaCitations": [
      "14 CFR 107.9"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "hazardous-attitudes",
    "title": "Hazardous Attitudes and Antidotes",
    "summary": "The five attitudes and the exact antidote for each.",
    "text": "Hazardous attitudes and aeronautical decision making. The one big rule: recognize the attitude, then apply its antidote. There are five. Anti-authority, don't tell me. Antidote: follow the rules, they are usually right. Impulsivity, do something quickly. Antidote: not so fast, think first. Invulnerability, it won't happen to me. Antidote: it could happen to me. Macho, I can do it. Antidote: taking chances is foolish. Resignation, what's the use. Antidote: I am not helpless, I can make a difference. Reference: FAA Pilot's Handbook of Aeronautical Knowledge, Chapter two.",
    "teachingPoints": [
      "Five attitudes: anti-authority, impulsivity, invulnerability, macho, resignation",
      "Each has one specific memorized antidote",
      "Antidote for anti-authority: follow the rules",
      "Antidote for macho: taking chances is foolish",
      "Recognition is the first step in ADM"
    ],
    "faaCitations": [
      "FAA-H-8083-25 PHAK Chapter 2",
      "AC 107-2"
    ]
  },
  {
    "pack": "topic-briefings",
    "slug": "loading-performance",
    "title": "Loading and Density Altitude",
    "summary": "How weight and hot-high-humid conditions cut drone performance.",
    "text": "Loading and density altitude. The one big rule: high, hot, and humid means thinner air, which means less lift, less thrust, and shorter flight time. Density altitude is pressure altitude corrected for temperature. Higher density altitude degrades small drone performance the same way it degrades any aircraft. Loading matters too. Adding a payload shifts your center of gravity, reduces climb rate, and drains the battery faster. Improper loading can also push the aircraft outside its balance limits, making it harder to control. Always check the manufacturer's payload and center of gravity limits before flight. Reference: the F A A Pilot's Handbook of Aeronautical Knowledge, chapter four, and Advisory Circular one oh seven dash two.",
    "teachingPoints": [
      "High, hot, humid = high density altitude = worse performance",
      "Density altitude = pressure altitude corrected for temperature",
      "Heavier payload = shorter flight time and slower climb",
      "Improper loading shifts center of gravity",
      "Always respect manufacturer weight and CG limits"
    ],
    "faaCitations": [
      "FAA-H-8083-25 PHAK Chapter 4",
      "AC 107-2 Chapter 8"
    ]
  }
];

export const METAR_TAF_SCRIPTS = WEEK2_SCRIPTS.filter(s => s.pack === "metar-taf");
export const AIRSPACE_SCRIPTS = WEEK2_SCRIPTS.filter(s => s.pack === "airspace-parsing");
export const HARD_NUMBERS_SCRIPT = WEEK2_SCRIPTS.find(s => s.pack === "hard-numbers")!;
export const TOPIC_BRIEFINGS = WEEK2_SCRIPTS.filter(s => s.pack === "topic-briefings");

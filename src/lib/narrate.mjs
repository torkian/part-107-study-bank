// Pronunciation rules — applied identically by:
//   - scripts/generate-audio.mjs (BEFORE sending to ElevenLabs)
//   - src/lib/audio-text.ts (BEFORE computing the manifest lookup hash)
// Keep these two callers consistent or the audio lookup will silently break.

const RULES = [
  // ----- units WITH preceding number (most-specific first) -----
  [/\b(\d+(?:[.,]\d+)?)\s*ft-?lbs?\b/gi, "$1 foot pounds"],
  [/\b(\d+(?:[.,]\d+)?)\s*lbs?\b/gi, "$1 pounds"],
  [/\b(\d+(?:[.,]\d+)?)\s*ft\b/gi, "$1 feet"],
  [/\b(\d+(?:[.,]\d+)?)\s*NM\b/g, "$1 nautical miles"],
  [/\b(\d+(?:[.,]\d+)?)\s*SM\b/g, "$1 statute miles"],
  [/\b(\d+(?:[.,]\d+)?)\s*kts?\b/gi, "$1 knots"],
  [/\b(\d+(?:[.,]\d+)?)\s*kt\b/gi, "$1 knots"],
  [/\b(\d+(?:[.,]\d+)?)\s*mph\b/gi, "$1 miles per hour"],
  [/\b(\d+(?:[.,]\d+)?)\s*hrs?\b/gi, "$1 hours"],
  [/\b(\d+(?:[.,]\d+)?)\s*min\b/gi, "$1 minutes"],
  [/\b(\d+(?:[.,]\d+)?)\s*fpm\b/gi, "$1 feet per minute"],
  [/\b(\d+(?:[.,]\d+)?)\s*inHg\b/g, "$1 inches of mercury"],
  [/\b(\d+(?:[.,]\d+)?)\s*g\b(?=[\s.,;:!?)])/gi, "$1 grams"],
  // °F / °C
  [/(\d+(?:[.,]\d+)?)\s*°\s*F\b/g, "$1 degrees Fahrenheit"],
  [/(\d+(?:[.,]\d+)?)\s*°\s*C\b/g, "$1 degrees Celsius"],

  // ----- CFR section formatting -----
  [/§\s*(\d+)\.(\d+)/g, "section $1.$2"],
  [/§/g, "section "],

  // ----- aviation acronyms (most-specific FIRST: longer before shorter) -----
  // Multi-letter and pronounced-as-letters
  [/\bRPIC\b/g, "remote pilot in command"],
  [/\bsUAS\b/g, "small unmanned aircraft system"],
  [/\bUAS\b/g, "unmanned aircraft system"],
  [/\bBVLOS\b/g, "beyond visual line of sight"],
  [/\bVLOS\b/g, "visual line of sight"],

  // Altitude / units / atmosphere
  [/\bAGL\b/g, "above ground level"],
  [/\bMSL\b/g, "mean sea level"],
  [/\bDA\b/g, "density altitude"],
  [/\bOAT\b/g, "outside air temperature"],
  [/\bISA\b/g, "International Standard Atmosphere"],
  [/\bCG\b/g, "center of gravity"],
  [/\bKE\b/g, "kinetic energy"],

  // Weather product names (pronounced as words by ElevenLabs but spell them clearly)
  [/\bMETARs?\b/g, "metar"],
  [/\bTAFs?\b/g, "taff"],
  [/\bPIREPs?\b/g, "pie rep"],
  [/\bSIGMETs?\b/g, "sig met"],
  [/\bAIRMETs?\b/g, "air met"],
  [/\bSPECI\b/g, "spessy"],
  [/\bLLWS\b/g, "low level wind shear"],

  // Airspace / charting
  [/\bMEF\b/g, "maximum elevation figure"],
  [/\bMOA\b/g, "M O A"],
  [/\bMTRs?\b/g, "military training route"],
  [/\bSFRA\b/g, "S F R A"],
  [/\bFRZ\b/g, "flight restricted zone"],
  [/\bNSA\b/g, "national security area"],
  [/\bCFA\b/g, "controlled firing area"],

  // ATC / radio / orgs (longer before shorter)
  [/\bCTAF\b/g, "see taff"],
  [/\bMULTICOM\b/g, "multicom"],
  [/\bUNICOM\b/g, "unicom"],
  [/\bAWOS-3\b/g, "A WOSS three"],
  [/\bAWOS\b/g, "A WOSS"],
  [/\bASOS\b/g, "A SOSS"],
  [/\bATIS\b/g, "A T I S"],
  [/\bATC\b/g, "air traffic control"],
  [/\bICAO\b/g, "I C A O"],
  [/\bUTC\b/g, "U T C"],
  [/\bGMT\b/g, "G M T"],

  // Visual aids
  [/\bVASI\b/g, "vaa zee"],
  [/\bPAPI\b/g, "pappy"],
  [/\bREIL\b/g, "reel"],
  [/\bHIRL\b/g, "high intensity runway lights"],
  [/\bMIRL\b/g, "medium intensity runway lights"],
  [/\bLIRL\b/g, "low intensity runway lights"],
  [/\bILS\b/g, "I L S"],
  [/\bVOR\b/g, "V O R"],
  [/\bDME\b/g, "D M E"],

  // Operating modes / hardware
  [/\bRTH\b/g, "return to home"],
  [/\bGPS\b/g, "G P S"],
  [/\bATTI\b/g, "atti"],
  [/\bFPV\b/g, "first person view"],
  [/\bADS-B\b/g, "A D S B"],

  // Authorities / programs
  [/\bFAA\b/g, "F A A"],
  [/\bNTSB\b/g, "N T S B"],
  [/\bTSA\b/g, "T S A"],
  [/\bNORAD\b/g, "norad"],
  [/\bUSFWS\b/g, "U S Fish and Wildlife Service"],
  [/\bNPS\b/g, "National Park Service"],
  [/\bIACRA\b/g, "I-A-C-R-A"],
  [/\bTRUST\b/g, "T R U S T"],
  [/\bFSDO\b/g, "F S D O"],
  [/\bFSS\b/g, "F S S"],
  [/\bCBO\b/g, "community based organization"],
  [/\bAMA\b/g, "A M A"],

  // Regulatory artifacts
  [/\bCFR\b/g, "Code of Federal Regulations"],
  [/\bFAR\b/g, "Federal Aviation Regulations"],
  [/\bAIM\b/g, "Aeronautical Information Manual"],
  [/\bAC\b/g, "advisory circular"],
  [/\bNOTAMs?\b/g, "notam"],
  [/\bTFRs?\b/g, "temporary flight restriction"],
  [/\bFDC\b/g, "F D C"],
  [/\bACS\b/g, "Airman Certification Standards"],
  [/\bPOH\b/g, "pilot operating handbook"],
  [/\bAFM\b/g, "airplane flight manual"],
  [/\bDOC\b/g, "declaration of compliance"],
  [/\bCOA\b/g, "certificate of authorization"],
  [/\bFRIA\b/g, "free uh"], // FAA Recognized Identification Area → "FRIA" sounds like "free uh"
  [/\bLAANC\b/g, "lance"],
  [/\bRID\b/g, "remote I D"],
  [/\bBOTH\b/g, "both"],
  [/\bEFB\b/g, "electronic flight bag"],

  // Decision-making models — leave as letters
  [/\bIMSAFE\b/g, "I M S A F E"],
  [/\bPAVE\b/g, "P A V E"],
  [/\bDECIDE\b/g, "DECIDE"],
  [/\bCRM\b/g, "crew resource management"],
  [/\bADM\b/g, "aeronautical decision making"],
  [/\bSRM\b/g, "single pilot resource management"],

  // Medical
  [/\bBAC\b/g, "blood alcohol concentration"],
  [/\bOTC\b/g, "over the counter"],

  // RP / VO short tokens
  [/\bRP\b/g, "remote pilot"],
  [/\bVO\b/g, "visual observer"],

  // Standalone NM/SM (no preceding number, e.g., "within 3 NM")
  [/\bNM\b/g, "nautical miles"],
  [/\bSM\b/g, "statute miles"],

  // Cardinal directions when alone
  [/\bN\.E\.\b/g, "northeast"],
  [/\bN\.W\.\b/g, "northwest"],
  [/\bS\.E\.\b/g, "southeast"],
  [/\bS\.W\.\b/g, "southwest"],

  // Decimal-leading numbers ("0.55" → "zero point five five" might be over-doing it; leave decimals alone)
  // Just clean up "0.55 lb" pattern already handled above.

  // Cleanup: collapse multiple spaces, no leading/trailing whitespace per sentence
  [/\s{2,}/g, " "],
];

/**
 * Expand aviation jargon for natural narration. Idempotent — running twice
 * shouldn't double-expand (the regexes match the original abbreviations).
 */
export function narrate(text) {
  let out = String(text);
  for (const [re, replacement] of RULES) out = out.replace(re, replacement);
  return out.trim();
}

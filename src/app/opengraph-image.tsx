import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "107 License — Free FAA Part 107 Drone Pilot Study App";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #4f8cff 0%, #2563eb 50%, #1e40af 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "-apple-system, system-ui, sans-serif",
          fontWeight: 800,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.78,
            marginBottom: 18,
          }}
        >
          FAA Remote Pilot Study
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: 22,
          }}
        >
          Pass Part 107.
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            opacity: 0.92,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          653 audited questions · real FAA chart figures · cheat sheet · audio
          narration · free
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 70,
            fontSize: 30,
            fontWeight: 700,
            opacity: 0.85,
            letterSpacing: "-0.01em",
          }}
        >
          107license.com
        </div>
      </div>
    ),
    { ...size },
  );
}

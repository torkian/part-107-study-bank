import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const revalidate = false;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #4f8cff 0%, #2563eb 50%, #1e40af 100%)",
          color: "white",
          fontFamily: "-apple-system, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          107
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          License
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}

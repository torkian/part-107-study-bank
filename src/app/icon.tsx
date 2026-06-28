import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// Cache forever — icon content never changes
export const revalidate = false;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #4f8cff 0%, #2563eb 50%, #1e40af 100%)",
          color: "white",
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontFamily: "-apple-system, system-ui, sans-serif",
          borderRadius: 14,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        107
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

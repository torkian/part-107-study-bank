import type { SVGProps } from "react";

export type AppIconName =
  | "activity"
  | "alert"
  | "arrowLeft"
  | "arrowRight"
  | "book"
  | "brain"
  | "cards"
  | "chart"
  | "check"
  | "cheatsheet"
  | "close"
  | "cloud"
  | "compass"
  | "exam"
  | "eye"
  | "gauge"
  | "grid"
  | "home"
  | "map"
  | "moon"
  | "pause"
  | "plane"
  | "play"
  | "radio"
  | "headphones"
  | "volume"
  | "skipBack15"
  | "skipForward15"
  | "refresh"
  | "review"
  | "route"
  | "scale"
  | "shield"
  | "spark"
  | "star"
  | "target"
  | "timer"
  | "trophy"
  | "users"
  | "wrench"
  | "x"
  | "zoomIn"
  | "zoomOut";

type Props = SVGProps<SVGSVGElement> & {
  name: AppIconName;
};

export function AppIcon({ name, className, ...props }: Props) {
  const classes = ["app-icon", className].filter(Boolean).join(" ");

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classes}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: AppIconName) {
  switch (name) {
    case "activity":
      return <path d="M3 12h4l2.4-6 5.2 12 2.4-6h4" />;
    case "alert":
      return (
        <>
          <path d="M12 3 2.8 19a1.8 1.8 0 0 0 1.6 2.7h15.2a1.8 1.8 0 0 0 1.6-2.7L12 3Z" />
          <path d="M12 8v5" />
          <path d="M12 17h.01" />
        </>
      );
    case "arrowLeft":
      return (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      );
    case "arrowRight":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      );
    case "book":
      return (
        <>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
        </>
      );
    case "brain":
      return (
        <>
          <path d="M9 4.5a3 3 0 0 0-4 2.8A3.2 3.2 0 0 0 3.5 13a3.4 3.4 0 0 0 3.7 4.8A3 3 0 0 0 12 20V6.2A3.2 3.2 0 0 0 9 4.5Z" />
          <path d="M15 4.5a3 3 0 0 1 4 2.8 3.2 3.2 0 0 1 1.5 5.7 3.4 3.4 0 0 1-3.7 4.8A3 3 0 0 1 12 20" />
          <path d="M8 11h4" />
          <path d="M12 9h4" />
          <path d="M12 15h4" />
        </>
      );
    case "cards":
      return (
        <>
          <path d="m8 5 9-2 3 13-9 2L8 5Z" />
          <path d="M4 8h10v13H4z" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 4-4 3 3 5-7" />
        </>
      );
    case "check":
      return (
        <>
          <path d="M21 12a9 9 0 1 1-5.3-8.2" />
          <path d="m9 12 2 2 7-8" />
        </>
      );
    case "cheatsheet":
      return (
        <>
          <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M15 3v5h5" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </>
      );
    case "close":
      return (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      );
    case "cloud":
      return <path d="M17.5 18H7a4 4 0 1 1 .9-7.9A5.7 5.7 0 0 1 19 12.5h.5a2.8 2.8 0 0 1 0 5.5h-2Z" />;
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
        </>
      );
    case "exam":
      return (
        <>
          <path d="M8 3h8l3 3v15H5V3h3Z" />
          <path d="M16 3v4h4" />
          <path d="m8.5 14 2 2 5-5" />
          <path d="M8 8h5" />
        </>
      );
    case "eye":
      return (
        <>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      );
    case "gauge":
      return (
        <>
          <path d="M4 15a8 8 0 1 1 16 0" />
          <path d="M12 15l4-5" />
          <path d="M8 20h8" />
        </>
      );
    case "grid":
      return (
        <>
          <path d="M4 4h6v6H4z" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6H4z" />
          <path d="M14 14h6v6h-6z" />
        </>
      );
    case "home":
      return (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </>
      );
    case "map":
      return (
        <>
          <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
          <path d="M9 3v15" />
          <path d="M15 6v15" />
        </>
      );
    case "moon":
      return <path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a7 7 0 1 0 10.8 10.8Z" />;
    case "plane":
      return (
        <>
          <path d="M10.5 14.5 3 21l2.8-8.4L3 9l8.4 1.4L17 3l2 2-4.4 7.6L21 14l-8.4 2.8L10.5 22v-7.5Z" />
        </>
      );
    case "play":
      return <path d="M8 5v14l11-7L8 5Z" />;
    case "pause":
      return (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      );
    case "skipBack15":
      return (
        <>
          <path d="M3 4v6h6" />
          <path d="M3 10a9 9 0 1 0 3-6.7" />
        </>
      );
    case "skipForward15":
      return (
        <>
          <path d="M21 4v6h-6" />
          <path d="M21 10a9 9 0 1 1-3-6.7" />
        </>
      );
    case "headphones":
      return (
        <>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
        </>
      );
    case "volume":
      return (
        <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      );
    case "radio":
      return (
        <>
          <path d="M5 11h14v9H5z" />
          <path d="m8 11 8-7" />
          <path d="M8 16h.01" />
          <path d="M12 16h4" />
        </>
      );
    case "refresh":
      return (
        <>
          <path d="M20 12a8 8 0 0 1-13.7 5.6" />
          <path d="M4 12A8 8 0 0 1 17.7 6.4" />
          <path d="M17 3v4h4" />
          <path d="M7 21v-4H3" />
        </>
      );
    case "review":
      return (
        <>
          <path d="M4 5h16v14H4z" />
          <path d="m8 12 2.2 2.2L16 8.5" />
        </>
      );
    case "route":
      return (
        <>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6h4a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h7" />
        </>
      );
    case "scale":
      return (
        <>
          <path d="M12 3v18" />
          <path d="M5 6h14" />
          <path d="m6 6-3 7h6L6 6Z" />
          <path d="m18 6-3 7h6l-3-7Z" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3 20 6v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-5" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3Z" />
          <path d="M5 4v3" />
          <path d="M4 5h3" />
        </>
      );
    case "star":
      return <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />;
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </>
      );
    case "timer":
      return (
        <>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 13V8" />
          <path d="M12 13h4" />
          <path d="M9 2h6" />
        </>
      );
    case "trophy":
      return (
        <>
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4a3 3 0 0 0 3 3" />
          <path d="M17 6h3a3 3 0 0 1-3 3" />
        </>
      );
    case "users":
      return (
        <>
          <path d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20" />
          <circle cx="10" cy="8" r="3" />
          <path d="M20 20v-1a3 3 0 0 0-2.4-2.9" />
          <path d="M16 5.2a3 3 0 0 1 0 5.6" />
        </>
      );
    case "wrench":
      return (
        <>
          <path d="M14.7 6.3a4 4 0 0 0 4.9 5l-8.8 8.8a2.2 2.2 0 0 1-3.1-3.1l8.8-8.8a4 4 0 0 0-1.8-1.9Z" />
          <path d="M7 17l-2 2" />
        </>
      );
    case "x":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </>
      );
    case "zoomIn":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21 16 16" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </>
      );
    case "zoomOut":
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21 16 16" />
          <path d="M8 11h6" />
        </>
      );
  }
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/AppIcon";

type Props = {
  figure: string;
  alt?: string;
};

export default function FigureViewer({ figure, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const pinchRef = useRef<{ startDist: number; baseScale: number } | null>(null);
  const src = `/figures/${figure}.webp`;
  const label = `FAA-CT-8080-2 ${figure.replace("figure-", "Figure ")}`;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(8, s * 1.25));
      if (e.key === "-") setScale((s) => Math.max(0.5, s / 1.25));
      if (e.key === "0") {
        setScale(1);
        setPan({ x: 0, y: 0 });
      }
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function resetView() {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = -e.deltaY * 0.002;
    setScale((s) => Math.max(0.5, Math.min(8, s + s * delta)));
  }

  function dist(a: React.Touch, b: React.Touch) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      setIsInteracting(true);
      pinchRef.current = {
        startDist: dist(e.touches[0], e.touches[1]),
        baseScale: scale,
      };
    } else if (e.touches.length === 1 && scale > 1) {
      setIsInteracting(true);
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        baseX: pan.x,
        baseY: pan.y,
      };
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const newDist = dist(e.touches[0], e.touches[1]);
      const ratio = newDist / pinchRef.current.startDist;
      setScale(Math.max(0.5, Math.min(8, pinchRef.current.baseScale * ratio)));
    } else if (e.touches.length === 1 && dragRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPan({ x: dragRef.current.baseX + dx, y: dragRef.current.baseY + dy });
    }
  }

  function onTouchEnd() {
    pinchRef.current = null;
    dragRef.current = null;
    setIsInteracting(false);
  }

  function onMouseDown(e: React.MouseEvent) {
    if (scale <= 1) return;
    setIsInteracting(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pan.x,
      baseY: pan.y,
    };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.baseX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.baseY + (e.clientY - dragRef.current.startY),
    });
  }

  function onMouseUp() {
    dragRef.current = null;
    setIsInteracting(false);
  }

  return (
    <>
      <figure className="figure-shell">
        <button
          type="button"
          className="figure-button"
          onClick={() => {
            resetView();
            setOpen(true);
          }}
          aria-label={`Open ${label} fullscreen`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt ?? label} loading="lazy" />
          <span className="figure-zoom-chip meta-chip">
            <AppIcon name="zoomIn" />
            Zoom
          </span>
        </button>
        <figcaption className="figure-caption citation-chip">
          <AppIcon name="map" />
          {label}
        </figcaption>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} viewer`}
          className="figure-dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="figure-dialog-bar top">
            <div className="figure-dialog-title">{label}</div>
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close viewer">
              <AppIcon name="close" />
            </button>
          </div>

          <div
            className={`figure-stage${scale > 1 ? " is-draggable" : ""}`}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt ?? label}
              draggable={false}
              onDoubleClick={() => {
                if (scale === 1) setScale(2.5);
                else resetView();
              }}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isInteracting ? "none" : "transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
          </div>

          <div className="figure-controls">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setScale((s) => Math.max(0.5, s / 1.4))}
              aria-label="Zoom out"
            >
              <AppIcon name="zoomOut" />
            </button>
            <button type="button" className="btn btn-secondary figure-scale" onClick={resetView}>
              {Math.round(scale * 100)}%
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setScale((s) => Math.min(8, s * 1.4))}
              aria-label="Zoom in"
            >
              <AppIcon name="zoomIn" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

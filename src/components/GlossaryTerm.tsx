"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AppIcon } from "@/components/AppIcon";
import { getGlossaryEntry } from "@/data/glossary";

type Props = {
  term: string;
  children?: ReactNode;
};

type PopoverPosition = {
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
};

const mobileMediaQuery = "(max-width: 640px)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function subscribeToMobileViewport(callback: () => void) {
  const query = window.matchMedia(mobileMediaQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMobileViewportSnapshot() {
  return typeof window !== "undefined" && window.matchMedia(mobileMediaQuery).matches;
}

export default function GlossaryTerm({ term, children }: Props) {
  const entry = getGlossaryEntry(term);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const isMobile = useSyncExternalStore(subscribeToMobileViewport, getMobileViewportSnapshot, () => false);
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    width: 320,
    placement: "bottom",
  });
  const panelId = useId();

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportPadding = 12;
    const width = Math.min(340, window.innerWidth - viewportPadding * 2);
    const left = clamp(rect.left + rect.width / 2 - width / 2, viewportPadding, window.innerWidth - width - viewportPadding);
    const panelHeight = panelRef.current?.offsetHeight ?? 220;
    const roomBelow = window.innerHeight - rect.bottom - 8;
    const roomAbove = rect.top - 8;
    const placement = roomBelow < Math.min(panelHeight, 260) && roomAbove > roomBelow ? "top" : "bottom";
    const top = placement === "top" ? rect.top - 8 : rect.bottom + 8;

    setPosition({ top, left, width, placement });
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }
  }, []);

  useLayoutEffect(() => {
    if (!open || isMobile) return;
    updatePosition();
  }, [isMobile, open, updatePosition]);

  useEffect(() => {
    if (!open || isMobile) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isMobile, open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open || !isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, open]);

  if (!entry) {
    return <>{children ?? term}</>;
  }

  const label = children ?? term;

  const popover = (
    <div
      className={isMobile ? "glossary-modal-backdrop" : "glossary-popover-layer"}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) close(false);
      }}
    >
      <section
        ref={panelRef}
        id={panelId}
        className={isMobile ? "glossary-modal" : `glossary-popover is-${position.placement}`}
        style={
          isMobile
            ? undefined
            : {
                top: position.top,
                left: position.left,
                width: position.width,
              }
        }
        role="dialog"
        aria-modal={isMobile ? true : undefined}
        aria-labelledby={`${panelId}-term`}
      >
        <div className="glossary-popover-header">
          <div>
            <strong id={`${panelId}-term`} className="glossary-popover-term">
              {entry.term}
            </strong>
            <div className="glossary-popover-full">{entry.full}</div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="glossary-popover-close"
            onClick={(event) => {
              event.stopPropagation();
              close();
            }}
            aria-label="Close glossary definition"
          >
            <AppIcon name="close" />
          </button>
        </div>
        <p className="glossary-popover-definition">{entry.definition}</p>
      </section>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="glossary-trigger"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-haspopup="dialog"
      >
        {label}
      </button>
      {open && typeof document !== "undefined" ? createPortal(popover, document.body) : null}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import "./saoCursor.css";

export default function SaoCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, .sao-btn, .sao-panel, .slide-wrapper")) {
        setHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const t = e.relatedTarget as HTMLElement | null;
      if (!t || !t.closest("a, button, [role='button'], input, textarea, .sao-btn, .sao-panel, .slide-wrapper")) {
        setHovering(false);
      }
    };

    const onHide = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseleave", onHide);

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onHide);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className={`sao-cursor-root ${visible ? "visible" : ""}`} aria-hidden>
      <div ref={dotRef} className="sao-cursor-dot" />
      <div
        ref={ringRef}
        className={`sao-cursor-ring ${hovering ? "hovering" : ""}`}
      >
        <svg viewBox="0 0 50 50" className="sao-cursor-svg">
          {/* Outer arc — slow spin */}
          <circle className="sao-cursor-arc-outer" cx="25" cy="25" r="22" />
          {/* Inner arc — reverse spin */}
          <circle className="sao-cursor-arc-inner" cx="25" cy="25" r="17" />
          {/* 4 dot markers on outer ring */}
          <circle className="sao-cursor-marker" cx="25" cy="3" r="1.5" />
          <circle className="sao-cursor-marker" cx="47" cy="25" r="1.5" />
          <circle className="sao-cursor-marker" cx="25" cy="47" r="1.5" />
          <circle className="sao-cursor-marker" cx="3" cy="25" r="1.5" />
        </svg>
      </div>
    </div>
  );
}

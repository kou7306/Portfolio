"use client";

import { useEffect, useRef, useState } from "react";

interface Wave {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

let waveId = 0;

export default function SaoClickDistortion() {
  const [waves, setWaves] = useState<Wave[]>([]);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = waveId++;
      setWaves((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY, startTime: performance.now() }]);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const DURATION = 1500;
    const SPEED = 0.4; // px/ms

    const tick = () => {
      const now = performance.now();
      let hasActive = false;

      setWaves((prev) => {
        const next = prev.filter((w) => now - w.startTime < DURATION);
        if (next.length > 0) hasActive = true;
        return next.length !== prev.length ? next : prev;
      });

      // Update CSS custom properties on each wave element
      const container = containerRef.current;
      if (container) {
        const children = container.querySelectorAll<HTMLDivElement>(".wave-ring");
        children.forEach((el) => {
          const startTime = Number(el.dataset.start);
          const age = now - startTime;
          const t = age / DURATION;
          const radius = age * SPEED;
          const fade = Math.max(0, 1 - t);

          el.style.setProperty("--radius", `${radius}px`);
          el.style.setProperty("--fade", `${fade}`);
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* SVG filter that creates water-like displacement */}
      <svg style={{ position: "fixed", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="water-ripple" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015 0.015"
              numOctaves="3"
              seed="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div ref={containerRef} style={{ position: "fixed", inset: 0, zIndex: 9996, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
        {waves.map((w) => (
          <div
            key={w.id}
            className="wave-ring"
            data-start={w.startTime}
            style={{
              position: "absolute",
              left: w.x,
              top: w.y,
              width: "calc(var(--radius, 0px) * 2)",
              height: "calc(var(--radius, 0px) * 2)",
              marginLeft: "calc(var(--radius, 0px) * -1)",
              marginTop: "calc(var(--radius, 0px) * -1)",
              borderRadius: "50%",
              border: "2px solid rgba(92, 225, 255, calc(var(--fade, 0) * 0.4))",
              boxShadow: `
                0 0 calc(var(--fade, 0) * 30px) rgba(92, 225, 255, calc(var(--fade, 0) * 0.2)),
                inset 0 0 calc(var(--fade, 0) * 20px) rgba(92, 225, 255, calc(var(--fade, 0) * 0.05))
              `,
              backdropFilter: `blur(calc(var(--fade, 0) * 3px))`,
              WebkitBackdropFilter: `blur(calc(var(--fade, 0) * 3px))`,
              filter: "url(#water-ripple)",
              opacity: "var(--fade, 0)",
              willChange: "width, height, margin, opacity, backdrop-filter",
            }}
          />
        ))}
      </div>
    </>
  );
}

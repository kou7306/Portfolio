"use client";

import { useEffect, useState, useRef } from "react";

export default function SaoHudChrome() {
  const [time, setTime] = useState("");
  const [ping, setPing] = useState<number | null>(null);
  const measuringRef = useRef(false);

  useEffect(() => {
    // Clock
    const tickTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tickTime();
    const timeId = setInterval(tickTime, 1000);

    // Measure real ping by fetching a tiny resource
    const measurePing = async () => {
      if (measuringRef.current) return;
      measuringRef.current = true;
      try {
        const start = performance.now();
        await fetch("/images/logo2.png", {
          method: "HEAD",
          cache: "no-store",
        });
        const ms = Math.round(performance.now() - start);
        setPing(ms);
      } catch {
        // offline or error
      } finally {
        measuringRef.current = false;
      }
    };

    measurePing();
    const pingId = setInterval(measurePing, 5000);

    return () => {
      clearInterval(timeId);
      clearInterval(pingId);
    };
  }, []);

  return (
    <div className="sao-hud-root">
      <div className="sao-corners">
        <span className="sao-br sao-br-tl" />
        <span className="sao-br sao-br-tr" />
        <span className="sao-br sao-br-bl" />
        <span className="sao-br sao-br-br" />
      </div>
      <div className="sao-side-rail" />

      <div className="sao-hud-top">
        <span className="sao-ping" aria-hidden />
        {ping != null ? (
          <span className="sao-hud-stat">{ping}ms</span>
        ) : (
          <span className="sao-hud-stat">Online</span>
        )}
      </div>

      <div className="sao-hud-tr">{time}</div>
      <div className="sao-ring-glyph" />
    </div>
  );
}

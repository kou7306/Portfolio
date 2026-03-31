"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, type ReactNode, type MouseEvent } from "react";
import Tilt from "react-parallax-tilt";
import "./saoPanel.css";

interface SaoPanelProps {
  children: ReactNode;
  title?: string;
  delay?: number;
  className?: string;
}

export default function SaoPanel({
  children,
  title,
  delay = 0,
  className = "",
}: SaoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Tilt
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      glareEnable={true}
      glareMaxOpacity={0.06}
      glareColor="#5ce1ff"
      glarePosition="all"
      glareBorderRadius="4px"
      perspective={1200}
      scale={1.01}
      transitionSpeed={800}
      className="sao-panel-tilt"
    >
      <motion.div
        ref={panelRef}
        className={`sao-panel ${className}`}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, x: -20, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <span className="sao-panel-corner sao-panel-corner-tl" />
        <span className="sao-panel-corner sao-panel-corner-tr" />
        <span className="sao-panel-corner sao-panel-corner-bl" />
        <span className="sao-panel-corner sao-panel-corner-br" />

        <div className="sao-panel-scanline" />
        <div className="sao-panel-glow" />

        {title && (
          <div className="sao-panel-header">
            <span className="sao-panel-diamond" />
            <span className="sao-panel-title">{title}</span>
            <span className="sao-panel-line" />
          </div>
        )}

        <div className="sao-panel-body">{children}</div>
      </motion.div>
    </Tilt>
  );
}

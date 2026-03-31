"use client";

import { useEffect, useRef } from "react";
import "./fluidTypoBackground.css";

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/=.:;\'|"`~^[]{}';

const BG = "#0a1526";
const NEON = { r: 110, g: 215, b: 255 };
const MAX_CELLS = 14_000;
const FLOW_DOWN_PX_PER_SEC = 62;

function smokeField(px: number, py: number, t: number) {
  const pyFlow = py - t * FLOW_DOWN_PX_PER_SEC;
  const nx = px * 0.011;
  const ny = pyFlow * 0.0095;
  let v =
    Math.sin(nx * 1.35 + t * 0.55) * Math.cos(ny * 1.12 - t * 0.42) * 0.46 +
    Math.sin(nx * 2.35 - ny * 1.75 + t * 0.33) * 0.27 +
    Math.sin((nx + ny) * 1.85 + t * 0.72) * 0.21 +
    Math.sin(nx * 4.8 + Math.sin(ny * 2.8 + t * 0.9) * 1.8) * 0.16;
  const n = (v + 1.15) * 0.46;
  return n * n;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function FluidTypoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const fontFamily =
      'ui-monospace, "Cascadia Code", "SFMono-Regular", Menlo, monospace';
    let fontSize = 12;
    let lw = window.innerWidth;
    let lh = window.innerHeight;
    let cols = 1;
    let rows = 1;
    let cellW = 8;
    let cellH = 14;
    let dpr = 1;
    let reducedMotion = false;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    function layout() {
      ctx.font = `${fontSize}px ${fontFamily}`;
      const m = ctx.measureText("W");
      cellW = Math.max(m.width, 7);
      cellH = fontSize * 1.22;
      cols = Math.ceil(lw / cellW);
      rows = Math.ceil(lh / cellH);
      let cells = cols * rows;
      while (cells > MAX_CELLS && fontSize < 22) {
        fontSize += 1;
        ctx.font = `${fontSize}px ${fontFamily}`;
        const mw = ctx.measureText("W").width;
        cellW = Math.max(mw, 7);
        cellH = fontSize * 1.22;
        cols = Math.ceil(lw / cellW);
        rows = Math.ceil(lh / cellH);
        cells = cols * rows;
      }
    }

    const t0 = performance.now();
    let raf = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      lw = window.innerWidth;
      lh = window.innerHeight;
      canvas.style.width = `${lw}px`;
      canvas.style.height = `${lh}px`;
      canvas.width = Math.floor(lw * dpr);
      canvas.height = Math.floor(lh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = 12;
      layout();
      if (reducedMotion) {
        cancelAnimationFrame(raf);
        drawFrame(0.3);
      }
    }

    function drawFrame(tSec: number) {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, lw, lh);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "alphabetic";

      for (let row = 0; row < rows; row++) {
        const py = row * cellH + cellH * 0.72;
        for (let col = 0; col < cols; col++) {
          const px = col * cellW + cellW * 0.08;
          const raw = clamp01(smokeField(px, row * cellH, tSec));
          const v = Math.pow(raw, 1.55);
          const idx = Math.min(
            CHARSET.length - 1,
            Math.floor(v * CHARSET.length)
          );
          const ch = CHARSET[idx];
          const alpha = 0.018 + v * 0.48;
          const pulse = 0.88 + 0.12 * Math.sin(tSec * 2.1 + col * 0.08 + row * 0.06);
          ctx.fillStyle = `rgba(${NEON.r},${NEON.g},${NEON.b},${alpha * pulse})`;
          ctx.fillText(ch, px, py);
        }
      }
    }

    function tick(now: number) {
      const tSec = (now - t0) * 0.001;
      drawFrame(tSec);
      raf = requestAnimationFrame(tick);
    }

    reducedMotion = mq.matches;
    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      drawFrame(0.3);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onMotionChange = () => {
      reducedMotion = mq.matches;
      cancelAnimationFrame(raf);
      if (reducedMotion) {
        drawFrame(0.3);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    mq.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="fluid-typo-stack" aria-hidden>
      <canvas ref={canvasRef} className="fluid-typo-bg" />
      <div className="fluid-typo-overlay" />
    </div>
  );
}

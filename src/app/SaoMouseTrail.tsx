"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  vy: number;
}

const MAX_PARTICLES = 80;
const SPEED_THRESHOLD = 8;
const NEON = { r: 92, g: 225, b: 255 };

export default function SaoMouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let prevX = 0;
    let prevY = 0;
    let hasPrev = false;
    let dpr = 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (hasPrev) {
        const speed = Math.hypot(x - prevX, y - prevY);
        if (speed > SPEED_THRESHOLD && particles.length < MAX_PARTICLES) {
          const count = Math.min(3, Math.floor(speed / 12));
          for (let i = 0; i < count; i++) {
            particles.push({
              x: x + (Math.random() - 0.5) * 6,
              y: y + (Math.random() - 0.5) * 6,
              alpha: 0.6 + Math.random() * 0.4,
              size: 1 + Math.random() * 2,
              vy: -0.2 - Math.random() * 0.5,
            });
          }
        }
      }

      prevX = x;
      prevY = y;
      hasPrev = true;
    };

    document.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha *= 0.96;
        p.y += p.vy;
        p.size *= 0.995;

        if (p.alpha < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NEON.r},${NEON.g},${NEON.b},${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${NEON.r},${NEON.g},${NEON.b},${p.alpha * 0.6})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        pointerEvents: "none",
      }}
    />
  );
}

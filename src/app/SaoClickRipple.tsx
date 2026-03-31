"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "flash" | "beam" | "spark";
  angle: number;
  opacity: number;
  width: number;
}

export default function SaoClickRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const particles = particlesRef.current;

      // Central flash
      particles.push({
        x: cx, y: cy, vx: 0, vy: 0,
        life: 0, maxLife: 12, size: 30, type: "flash",
        angle: 0, opacity: 1, width: 0,
      });

      // Sharp energy beams — fast, thin, long
      const beamCount = 6;
      for (let i = 0; i < beamCount; i++) {
        const angle = (Math.PI * 2 * i) / beamCount + (Math.random() - 0.5) * 0.3;
        const speed = 14 + Math.random() * 8;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0, maxLife: 18 + Math.random() * 8,
          size: 100 + Math.random() * 60,
          type: "beam", angle,
          opacity: 1,
          width: 1 + Math.random() * 1.5,
        });
      }

      // Tiny hot sparks with trails
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 10;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0, maxLife: 12 + Math.random() * 16,
          size: 1 + Math.random() * 2,
          type: "spark", angle: 0, opacity: 1, width: 0,
        });
      }
    };

    document.addEventListener("mousedown", onClick);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const t = p.life / p.maxLife;
        if (t >= 1) { particles.splice(i, 1); continue; }

        if (p.type === "flash") {
          const r = p.size * (1 + t * 5);
          const alpha = Math.pow(1 - t, 3);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(0.4, `rgba(92,225,255,${alpha * 0.5})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);

        } else if (p.type === "beam") {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.88;
          p.vy *= 0.88;
          const alpha = Math.pow(1 - t, 2);
          const len = p.size * (0.3 + 0.7 * (1 - t));

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          // Core beam
          const grad = ctx.createLinearGradient(-len, 0, 4, 0);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, `rgba(92,225,255,${alpha * 0.6})`);
          grad.addColorStop(0.85, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, `rgba(92,225,255,${alpha * 0.3})`);

          ctx.beginPath();
          ctx.moveTo(-len, 0);
          ctx.lineTo(4, 0);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.width;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(92,225,255,${alpha * 0.5})`;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.restore();

        } else if (p.type === "spark") {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.vy += 0.15;
          const alpha = Math.pow(1 - t, 2);
          const s = p.size * (1 - t * 0.4);

          // Trail
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
          ctx.strokeStyle = `rgba(92,225,255,${alpha * 0.4})`;
          ctx.lineWidth = s * 0.6;
          ctx.stroke();

          // Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    />
  );
}

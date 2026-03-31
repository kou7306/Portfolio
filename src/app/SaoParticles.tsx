"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: {
      value: 45,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: ["#5ce1ff", "#3db8d9", "#88eeff", "#ffffff"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.6 },
      animation: {
        enable: true,
        speed: 0.8,
        startValue: "random",
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 3 },
      animation: {
        enable: true,
        speed: 1.5,
        startValue: "random",
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 1.2 },
      direction: "top",
      outModes: { default: "out" },
      straight: false,
      random: true,
    },
    links: {
      enable: true,
      distance: 120,
      color: "#5ce1ff",
      opacity: 0.08,
      width: 0.5,
    },
    twinkle: {
      particles: {
        enable: true,
        frequency: 0.03,
        opacity: 1,
        color: { value: "#ffffff" },
      },
    },
  },
  detectRetina: true,
};

export default function SaoParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <Particles
        id="sao-particles"
        options={particleConfig}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

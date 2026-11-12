"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/paths";

type Particle = {
  gx: number; // destination, 0..1 of portrait box
  gy: number;
  sx: number; // scattered start, as a fraction of the whole screen (0..1)
  sy: number;
  color: string;
  delay: number; // 0..0.4 stagger
  phase: number;
  speed: number;
  drift: number;
  bend: number; // sideways curve amount
  glow: boolean;
};

const SRC = "/images/portrait.png";
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * Scroll-driven pixel assembly. Must be rendered inside a tall wrapper (`wrapperRef`)
 * whose sticky child contains this component; progress = how far the wrapper has scrolled.
 */
export function PixelPortrait({ wrapperRef }: { wrapperRef: React.RefObject<HTMLElement | null> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!box || !canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let alive = true;
    let particles: Particle[] = [];
    let size = 0; // portrait box side in CSS px
    let dpr = 1;
    let target = 0;
    let current = 0;
    let vw = 0; // canvas covers the whole screen so pixels can scatter anywhere
    let vh = 0;
    let ox = 0; // portrait box position inside the canvas
    let oy = 0;

    const readProgress = () => {
      const rect = wrapper.getBoundingClientRect();
      const dist = Math.max(1, rect.height - window.innerHeight);
      target = reduced ? 1 : clamp(-rect.top / dist); // reduced motion: show the finished portrait, no animation
    };

    const resize = () => {
      size = box.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      const rect = box.getBoundingClientRect();
      ox = rect.left;
      oy = rect.top;
      // Canvas is pinned to the screen's top-left (the hero is sticky at the top while animating).
      canvas.style.left = `${-ox}px`;
      canvas.style.top = `${-oy}px`;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
    };

    const build = (image: HTMLImageElement) => {
      // Coarser grid on small screens keeps the particle count (and cost) down.
      const G = window.innerWidth < 640 ? 64 : 88;
      const off = document.createElement("canvas");
      off.width = off.height = G;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(image, 0, 0, G, G);
      const data = octx.getImageData(0, 0, G, G).data;
      const out: Particle[] = [];
      for (let y = 0; y < G; y++) {
        for (let x = 0; x < G; x++) {
          const i = (y * G + x) * 4;
          if (data[i + 3] < 140) continue; // skip transparent / mostly-transparent cells
          out.push({
            gx: (x + 0.5) / G,
            gy: (y + 0.5) / G,
            sx: Math.random(),
            sy: Math.random(),
            color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
            delay: Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.9,
            drift: 0.01 + Math.random() * 0.025,
            bend: (Math.random() - 0.5) * 0.35,
            glow: Math.random() < 0.08,
          });
        }
      }
      particles = out;
      cellFrac = 1 / G;
    };
    let cellFrac = 1 / 88;

    const draw = (time: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(draw);
      readProgress();
      current += (target - current) * 0.12; // smooth the scroll input
      if (Math.abs(target - current) < 0.0005) current = target;

      const t = current;
      const sec = time / 1000;


      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      const cell = size * cellFrac;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const local = clamp((t - p.delay) / 0.6);
        const e = easeOutCubic(local);
        const startX = p.sx * vw;
        const startY = p.sy * vh;
        const homeX = ox + p.gx * size;
        const homeY = oy + p.gy * size;
        const floatX = Math.sin(sec * p.speed + p.phase) * p.drift * size * (1 - e);
        const floatY = Math.cos(sec * p.speed * 0.8 + p.phase) * p.drift * size * (1 - e);
        const arc = Math.sin(e * Math.PI) * p.bend;
        const px = startX + (homeX - startX) * e + floatX + arc * (homeY - startY);
        const py = startY + (homeY - startY) * e + floatY - arc * (homeX - startX);
        const s = cell * (0.55 + 0.5 * e) + 0.4; // tiny while floating, full cell when landed

        if (p.glow && e < 0.98) {
          ctx.globalAlpha = 0.16 * (1 - e) + 0.04;
          ctx.fillStyle = p.color;
          ctx.fillRect(px - s * 1.2, py - s * 1.2, s * 3.4, s * 3.4);
        }
        ctx.globalAlpha = 0.55 + 0.45 * e;
        ctx.fillStyle = p.color;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const start = () => {
      resize();
      readProgress();
      current = target;
      raf = requestAnimationFrame(draw);
    };

    const image = new Image();
    image.onload = () => {
      if (!alive) return;
      build(image);
      start();
    };
    image.src = asset(SRC);

    const ro = new ResizeObserver(() => resize());
    ro.observe(box);
    window.addEventListener("resize", resize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [wrapperRef]);

  return (
    <div ref={boxRef} className="relative aspect-square w-full" aria-label="Pixel-art portrait of Airene" role="img">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
      />
    </div>
  );
}

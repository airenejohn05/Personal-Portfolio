"use client";

import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={cn("glow-card rounded-3xl", className)}>
      {children}
    </div>
  );
}

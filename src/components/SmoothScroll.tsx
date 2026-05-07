"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Prevent hydration errors by returning ReactLenis directly (it's safe on client)
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

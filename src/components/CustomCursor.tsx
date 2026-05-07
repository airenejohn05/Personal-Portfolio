"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ArcReactor = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="45" stroke="#00FFFF" strokeWidth="6" fill="none" />
    <circle cx="50" cy="50" r="32" stroke="#00FFFF" strokeWidth="8" strokeDasharray="12 8" fill="none" />
    <circle cx="50" cy="50" r="15" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="20" stroke="#00FFFF" strokeWidth="2" fill="none" />
  </svg>
);

const Donut = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="30" stroke="#E8B273" strokeWidth="30" fill="none" />
    <circle cx="50" cy="50" r="30" stroke="#FF69B4" strokeWidth="24" fill="none" strokeDasharray="180 10" />
    <line x1="30" y1="25" x2="40" y2="30" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
    <line x1="70" y1="30" x2="75" y2="40" stroke="#00FFFF" strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="50" x2="30" y2="60" stroke="#FF0" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="70" x2="55" y2="75" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
    <line x1="80" y1="55" x2="75" y2="50" stroke="#0F0" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const angle = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorAngle = useSpring(angle, { damping: 20, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      mouseX.set(x - 16);
      mouseY.set(y - 16);
      
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 2) {
        // Leaf tip points UP initially.
        // atan2 is 0 at right, 90 at down, 180 at left, -90 at up.
        // If moving up (-90), we want angle 0. So targetAngle = atan2 + 90.
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        
        const currentAngle = angle.get();
        // Normalize rotation to take the shortest path
        let diff = targetAngle - currentAngle;
        // Adjust diff to be between -180 and 180
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        
        angle.set(currentAngle + diff);
      }
      
      lastX = x;
      lastY = y;
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isText = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"].includes(target.tagName);
      const isInteractive = target.closest("a") || target.closest("button") || target.closest("[role='button']");

      if (isInteractive) {
        setCursorVariant("interactive");
      } else if (isText) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, angle]);

  const variants = {
    default: {
      scale: 1,
      filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))",
    },
    interactive: {
      scale: 1.5,
      filter: "drop-shadow(0 0 12px rgba(255, 105, 180, 0.8))",
    },
    text: {
      scale: 0.6,
      filter: "drop-shadow(0 0 4px rgba(0, 255, 255, 0.6))",
    },
  };

  const isDonut = cursorVariant === "interactive";

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] w-8 h-8 items-center justify-center"
      style={{ x: cursorX, y: cursorY, rotate: cursorAngle }}
      variants={variants}
      animate={cursorVariant}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      {isDonut ? (
        <Donut className="w-full h-full transform -translate-y-1" />
      ) : (
        <ArcReactor className="w-full h-full transform -translate-y-1" />
      )}
    </motion.div>
  );
}

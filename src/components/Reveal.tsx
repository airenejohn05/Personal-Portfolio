"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {index} — {label}
      </p>
      <h2 className="fluid-h2">{title}</h2>
    </Reveal>
  );
}

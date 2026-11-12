"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PixelPortrait } from "./PixelPortrait";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  return (
    // Tall wrapper: the sticky inner screen stays put while scroll progress drives the assembly.
    <section id="top" ref={wrapperRef} className="relative h-[190svh] motion-reduce:h-auto">
    <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-6 pt-32 motion-reduce:static motion-reduce:min-h-svh motion-reduce:overflow-visible md:px-12 md:pt-44">
      <div className="pointer-events-none absolute bottom-16 right-2 z-0 w-[min(62vw,36svh)] md:bottom-auto md:right-12 md:top-1/2 md:w-[min(40vw,66svh)] md:-translate-y-[46%]">
        <PixelPortrait wrapperRef={wrapperRef} />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease }}
          className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-accent"
        >
          Hello, I&apos;m
        </motion.p>

        <h1 className="fluid-h1 mb-10">
          {["Airene", "V John"].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 1.9 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3, ease }}
          className="max-w-2xl text-lg text-white/60 md:text-xl"
        >
          AI &amp; Machine Learning enthusiast, full-stack developer and predictive analytics researcher.
        </motion.p>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition-colors hover:text-white"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="block">
          <ArrowDown size={22} />
        </motion.span>
      </motion.a>
    </div>
    </section>
  );
}

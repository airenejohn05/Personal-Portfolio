"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { InteractiveBackground } from "./InteractiveBackground";

const phrases = ["I'm Airene V John"];

// Simple scramble text effect component
const ScrambleText = ({ text }: { text: string }) => {
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      {/* Interactive Canvas Background */}
      <InteractiveBackground />

      <div className="z-10 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase italic leading-[0.9] tracking-tighter mb-8 text-white drop-shadow-[4px_4px_0_#ED1D24]">

          <div className="overflow-hidden h-[1.2em]">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
              key={phraseIndex} // forces re-render for scramble effect
            >
              <ScrambleText text={phrases[phraseIndex]} />
            </motion.div>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-sm md:text-xl text-[var(--color-accent-light)] font-bold uppercase tracking-widest mt-8 md:mt-4 max-w-4xl"
        >
          AI & Machine Learning Enthusiast &middot; Full Stack Developer &middot; Predictive Analytics Researcher
        </motion.p>
      </div>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute -bottom-4 md:bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-xs uppercase tracking-widest text-white/40 mb-2">
          Scroll
        </span>

        <div className="relative w-[1px] h-12 bg-white/20 overflow-hidden flex justify-center">
          <motion.div
            className="absolute w-full h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

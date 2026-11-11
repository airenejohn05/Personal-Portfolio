"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "Hola", "こんにちは", "Bonjour"];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index === greetings.length - 1) {
      const done = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setIndex((i) => i + 1), 280);
    return () => clearTimeout(next);
  }, [index]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className="font-serif text-5xl md:text-7xl"
            >
              {greetings[index]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

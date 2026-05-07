"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  "Hello", "Hola", "Bonjour", "Ciao", "नमस्ते",
  "こんにちは", "안녕하세요", "Merhaba", "Olá", "Hei", "Xin chào"
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index === languages.length - 1) {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // hold the last word a bit
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 1000 : 250); // first word holds longer

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-white text-5xl md:text-7xl font-black uppercase italic tracking-tight drop-shadow-[4px_4px_0_#ED1D24]"
            >
              {languages[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

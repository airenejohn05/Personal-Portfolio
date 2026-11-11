"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/paths";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
];

const RESUME = asset("/Resume-%20Airene%20V%20John.pdf");
const EMAIL = "mailto:airenejohn05@gmail.com";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b border-transparent px-6 py-5 transition-[padding,background-color,border-color] duration-500 md:px-12",
          scrolled && !open && "border-line bg-background/70 py-3 backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="relative z-[110] font-mono text-sm tracking-widest" aria-label="Back to top">
            AVJ<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === l.id ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.name}</span>
              </a>
            ))}
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-full border border-white/15 px-5 py-2 text-sm transition-colors hover:bg-white/10"
            >
              Resume
            </a>
            <a
              href={EMAIL}
              className="ml-1 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
            >
              Contact
            </a>
          </nav>

          <button
            className="relative z-[110] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-background/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-5 font-serif text-5xl">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, type: "spring", stiffness: 100, damping: 18 }}
                >
                  <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                    {l.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 font-sans text-base">
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 py-3.5 text-center">
                Resume
              </a>
              <a href={EMAIL} className="rounded-full bg-white py-3.5 text-center font-medium text-black">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

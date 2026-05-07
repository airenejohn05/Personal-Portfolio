"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-transparent px-6 md:px-12 py-6",
          scrolled && "bg-[#0a0b14]/70 backdrop-blur-md border-white/5 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-mono tracking-tighter z-50 relative mix-blend-difference">
            [ KS ]
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative text-sm text-white/70 hover:text-white transition-colors group py-2 block"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 ml-4">
              <a
                href="/Resume-%20Airene%20V%20John.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm border border-white/20 rounded-full hover:bg-white/5 transition-colors"
              >
                Resume
              </a>

              <a
                href="mailto:airenejohn05@gmail.com"
                className="px-5 py-2 text-sm bg-accent text-white rounded-full hover:bg-accent-light transition-colors"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 relative text-white mix-blend-difference"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0b14] flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-6 text-4xl font-serif">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col gap-4 mt-8"
              >
                <a
                  href="/Resume-%20Airene%20V%20John.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-4 text-center border border-white/20 rounded-full font-sans text-lg"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  className="inline-block px-6 py-4 text-center bg-accent text-white rounded-full font-sans text-lg"
                >
                  Contact
                </a>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

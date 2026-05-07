"use client";

import { motion } from "framer-motion";
import { Code, Globe, MessageCircle, Mail, FileText } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-40 bg-transparent overflow-hidden flex flex-col items-center justify-center min-h-[80vh] z-10">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none flex items-center justify-center mix-blend-screen">
        <div className="w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[600px] h-[600px] bg-[#F0E14A]/20 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-8 font-mono">
            [ 06 — What's Next? ]
          </h2>

          <h3 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic leading-[0.9] tracking-tighter mb-12 text-white drop-shadow-[4px_4px_0_#ED1D24]">
            Let's build<br />
            <span>something.</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">

            {/* Gmail Button */}
            <a
              href="mailto:youremail@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Mail size={20} />
              Say Hello
            </a>

            {/* Resume Button */}
            <a
              href="/Resume-%20Airene%20V%20John.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              <FileText size={20} />
              Resume
            </a>

          </div>

          <div className="flex items-center justify-center gap-8">

            {/* GitHub */}
            <a
              href="https://github.com/airenejohn05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-all hover:-translate-y-1 transform duration-300"
            >
              <Code size={24} />
              <span className="sr-only">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/airene-john"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-all hover:-translate-y-1 transform duration-300"
            >
              <Globe size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>

            {/* Gmail */}
            <a
              href="mailto:airenejohn05@gmail.com"
              className="text-white/50 hover:text-white transition-all hover:-translate-y-1 transform duration-300"
            >
              <MessageCircle size={24} />
              <span className="sr-only">Gmail</span>
            </a>

          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-white/30 text-sm font-mono flex items-center justify-center w-full">
        <p>&copy; {new Date().getFullYear()} AIRENE V JOHN — Built with passion for AI, innovation, and technology.</p>
      </div>
    </section>
  );
}

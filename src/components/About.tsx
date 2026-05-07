"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 bg-transparent relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/2 relative rounded-2xl shadow-2xl shadow-black/50 border border-white/5 overflow-hidden">
          <Image
            src="/images/abstract.jpg"
            alt="Airene V John"
            width={1200}
            height={1600}
            className="w-full h-auto max-h-[500px] object-cover md:object-contain rounded-2xl"
            priority
          />
        </div>

        {/* Right Column - Philosophy */}
        <div className="w-full md:w-1/2 flex flex-col gap-12">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-accent mb-6 font-mono">
              [ 01 — About Me ]
            </h2>

            <p className="text-xl md:text-1xl leading-relaxed text-white/90 font-small font-calibri">
              AI enthusiast by day, Marvel fan 24/7. I’m someone who enjoys building
              intelligent systems, exploring new technologies.
              <br /><br />
              I work on projects involving Machine Learning, AI, predictive analytics,
              and full-stack development - basically teaching computers to think while
              mine survives on coffee and movie dialogues.
              <br /><br />
              <strong className="text-white">Current Research Focus:</strong> Working on predictive analytics and dataset development for agricultural and sericulture-related applications using machine learning and computer vision techniques.
              <br /><br />
              Outside coding, you’ll probably find me watching movies, rewatching
              Spider-Man scenes for the hundredth time, travelling, or hunting for the
              next best food spot like it’s a side quest in an open-world game.
            </p>
          </div>

          <blockquote className="border-l-4 border-accent pl-8 py-2">
            <p className="font-black text-4xl md:text-5xl uppercase italic text-white drop-shadow-[3px_3px_0_#ED1D24] tracking-tight leading-tight">
              "Sometimes you gotta run before you can walk."
            </p>
            <span className="text-accent text-sm mt-4 font-mono font-bold tracking-widest block uppercase">
              — Tony Stark
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

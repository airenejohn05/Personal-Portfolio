"use client";

import {
  Code2, Database, Layout, Server, Cpu, Globe,
  Layers, MonitorSmartphone, Terminal, Boxes,
  Cloud, Lock
} from "lucide-react";

const row1 = [
  { name: "Python", icon: Terminal },
  { name: "Java", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "SQL", icon: Database },
  { name: "React.js", icon: Layout },
  { name: "Node.js", icon: Server },
  { name: "Tailwind CSS", icon: Layers },
];

const row2 = [
  { name: "TensorFlow & Keras", icon: Cpu },
  { name: "Scikit-learn", icon: Cpu },
  { name: "Prophet & ARIMA", icon: Cloud },
  { name: "OpenCV & MediaPipe", icon: MonitorSmartphone },
  { name: "MongoDB", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Unity", icon: Boxes },
  { name: "Git & GitHub", icon: Globe },
];

const capabilities = [
  {
    num: "01",
    title: "Machine Learning & AI",
    desc: "Building predictive analytics pipelines, time-series forecasting models, and deep learning architectures like CNNs.",
  },
  {
    num: "02",
    title: "Full Stack Development",
    desc: "Developing scalable web applications with secure backend APIs, React interfaces, and robust database management.",
  },
  {
    num: "03",
    title: "Computer Vision",
    desc: "Creating real-time gesture detection and image classification systems using MediaPipe, OpenCV, and MobileNet.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 bg-transparent overflow-hidden relative z-10">
      <div className="px-6 md:px-12 mb-16 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-accent mb-4 font-mono">
          [ 03 — Toolkit ]
        </h2>
        <h3 className="text-5xl md:text-7xl font-black uppercase italic drop-shadow-[3px_3px_0_#ED1D24]">Arsenal.</h3>
      </div>

      {/* Infinite Marquees */}
      <div className="flex flex-col gap-8 mb-32 rotate-[-2deg] scale-105">
        {/* Row 1 */}
        <div className="flex overflow-hidden relative w-[110vw] -ml-[5vw]">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            <div className="flex gap-8 px-4">
              {[...row1, ...row1, ...row1, ...row1].map((tech, i) => (
                <div key={`a-${i}`} className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-panel border border-white/10 shrink-0">
                  <tech.icon className="w-8 h-8 text-accent" />
                  <span className="text-2xl font-black uppercase italic">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 px-4">
              {[...row1, ...row1, ...row1, ...row1].map((tech, i) => (
                <div key={`b-${i}`} className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-panel border border-white/10 shrink-0">
                  <tech.icon className="w-8 h-8 text-accent" />
                  <span className="text-2xl font-black uppercase italic">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex overflow-hidden relative w-[110vw] -ml-[5vw]">
          <div className="flex whitespace-nowrap animate-marquee-reverse w-max">
            <div className="flex gap-8 px-4">
              {[...row2, ...row2, ...row2, ...row2].map((tech, i) => (
                <div key={`c-${i}`} className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-panel border border-white/10 shrink-0">
                  <tech.icon className="w-8 h-8 text-white/50" />
                  <span className="text-2xl font-black uppercase italic text-white/80">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 px-4">
              {[...row2, ...row2, ...row2, ...row2].map((tech, i) => (
                <div key={`d-${i}`} className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-panel border border-white/10 shrink-0">
                  <tech.icon className="w-8 h-8 text-white/50" />
                  <span className="text-2xl font-black uppercase italic text-white/80">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Capability Pillars */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {capabilities.map((cap, i) => (
            <div key={i} className="flex flex-col border-t border-white/10 pt-8">
              <span className="text-accent font-mono text-xl mb-6">[{cap.num}]</span>
              <h4 className="text-3xl font-serif mb-4">{cap.title}</h4>
              <p className="text-white/60 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

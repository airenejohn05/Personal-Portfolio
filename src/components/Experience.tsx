"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { GlowCard } from "./GlowCard";

const experiences = [
  {
    company: "HealthEdge",
    title: "Technical Services Engineer Intern",
    dates: "June 2026 – December 2026",
    bullets: [
      "Participated in L1 support ticket grooming, troubleshooting, and issue resolution.",
      "Assisted in investigating technical issues and providing timely solutions to support smooth operations.",
    ],
    tags: ["Internship", "L1 Support", "Troubleshooting","SQL","Java","Linux"],
  },
  {
    company: "GRD Research Institute",
    title: "Machine Learning Research Intern",
    dates: "April 2026 – May 2026",
    bullets: [
      "Developed a multimodal cocoon dataset for research and experimentation.",
      "Conducted research on deep learning models and explored various approaches for cocoon classification and prediction.",
    ],
    tags: ["Internship", "Deep Learning", "Research","Machine Learning","Python"],
  },
  {
    company: "Demetrix Infotech",
    title: "Machine Learning & Application Developer Intern",
    dates: "April 2025 – May 2025",
    bullets: [
      "Worked on predictive modeling, forecasting systems, and data preprocessing pipelines for agricultural datasets.",
      "Implemented forecasting models and created data visualization dashboards.",
      "Conducted model evaluation, optimization, research, and dataset analysis.",
    ],
    tags: ["Machine Learning", "Data Preprocessing", "Predictive Modeling", "Application Testing"],
  },
  {
    company: "Bachelor of Technology",
    title: "Computer Science & Engineering",
    dates: "2023 – 2027",
    bullets: [
      "Focusing on Artificial Intelligence, Machine Learning, and Data Analytics.",
      "Studying Software Development and advanced computing methodologies.",
      "Developing multiple AI and full-stack projects during the academic tenure.",
    ],
    tags: ["AI", "Software Development", "Data Science"],
  },
  {
    company: "Notable Achievements",
    title: "Project Milestones",
    dates: "Highlights",
    bullets: [
      "Developed real-world forecasting systems using Prophet, ARIMA, and SARIMA models.",
      "Built full-stack web applications with secure authentication systems.",
      "Explored deep learning architectures such as CNNs and MobileNet.",
      "Gained experience in Unity simulation development and interactive environments.",
    ],
    tags: ["Deep Learning", "Full Stack", "Unity"],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="02" label="Experience" title="The journey." />

        <div ref={ref} className="relative pl-8 md:pl-14">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <Reveal key={exp.company}>
                <div className="relative">
                  <span className="absolute -left-[2.2rem] top-9 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background md:-left-[3.7rem]" />
                  <GlowCard className="p-5 sm:p-7 md:p-10">
                    <div className="mb-6 flex flex-col justify-between gap-2 border-b border-line pb-6 md:flex-row md:items-end">
                      <div>
                        <h3 className="mb-2 text-3xl sm:text-4xl md:text-5xl">{exp.company}</h3>
                        <p className="text-white/60">{exp.title}</p>
                      </div>
                      <span className="font-mono text-sm text-accent">{exp.dates}</span>
                    </div>
                    <ul className="mb-8 space-y-3">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-white/60">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-xs text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

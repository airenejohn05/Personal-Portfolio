"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Demetrix Infotech",
    title: "Machine Learning & Application Developer Intern",
    dates: "Internship",
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
    dates: "2023-2027",
    bullets: [
      "Focusing heavily on Artificial Intelligence, Machine Learning, and Data Analytics.",
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
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
    const container = containerRef.current;

    // Force a refresh after a tiny delay to ensure layout is settled
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Horizontal Scroll
      const totalWidth = container.scrollWidth - window.innerWidth;

      let scrollTween: gsap.core.Tween | undefined;

      // We only pin and scroll if there is enough content to scroll horizontally
      if (totalWidth > 0) {
        scrollTween = gsap.to(cards, {
          x: () => -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + totalWidth,
            invalidateOnRefresh: true,
          },
        });
      }

      // Individual card animations
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left center+=200",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className="py-12 md:py-20 bg-transparent overflow-hidden min-h-screen flex flex-col justify-center relative z-10">
      <div className="px-6 md:px-12 mb-8 md:mb-12">
        <h2 className="text-sm uppercase tracking-widest text-accent mb-4 font-mono">
          [ 02 — Experience ]
        </h2>
        <h3 className="text-5xl md:text-7xl font-black uppercase italic drop-shadow-[3px_3px_0_#ED1D24]">Journey.</h3>
      </div>

      <div className="px-6 md:px-12 flex flex-col md:flex-row items-stretch gap-8 md:gap-16 w-full md:w-max" ref={containerRef}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-card w-full md:w-[600px] h-auto max-h-[65vh] overflow-y-auto overscroll-contain flex-shrink-0 bg-panel p-8 md:p-10 rounded-2xl border border-white/10 flex flex-col"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-8 border-b border-white/10">
              <div>
                <h4 className="text-3xl font-serif mb-2">{exp.company}</h4>
                <p className="text-xl text-white/70">{exp.title}</p>
              </div>
              <span className="text-accent font-mono mt-4 md:mt-0">{exp.dates}</span>
            </div>

            <ul className="space-y-4 mb-12">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="text-white/60 text-lg flex items-start">
                  <span className="text-accent mr-4 mt-1">▹</span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mt-auto">
              {exp.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/80 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

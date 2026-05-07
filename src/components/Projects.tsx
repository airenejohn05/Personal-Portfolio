"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Paddy Price Prediction",
    desc: "Intelligent forecasting system to predict paddy prices using time-series models.",
    tags: ["Python", "Prophet", "ARIMA", "Scikit-learn"],
    link: "#",
    gradient: "from-red-600/20 to-orange-600/20",
  },
  {
    num: "02",
    title: "Movie Booking System",
    desc: "Full-stack movie ticket booking platform with secure authentication.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "#",
    gradient: "from-yellow-600/20 to-red-600/20",
  },
  {
    num: "03",
    title: "Watch Classification",
    desc: "AI-powered classification model identifying watch attributes using deep learning.",
    tags: ["TensorFlow", "Keras", "MobileNet", "Python"],
    link: "#",
    gradient: "from-red-600/20 to-purple-600/20",
  },
  {
    num: "04",
    title: "Virtual Music Concert",
    desc: "Interactive virtual concert environment with physics-based systems.",
    tags: ["Unity", "Physics Engine", "C#"],
    link: "#",
    gradient: "from-orange-600/20 to-yellow-600/20",
  },
  {
    num: "05",
    title: "AI Air Drawing",
    desc: "Real-time AI system allowing users to draw in air with CNN shape prediction.",
    tags: ["OpenCV", "MediaPipe", "TensorFlow"],
    link: "#",
    gradient: "from-red-600/20 to-pink-600/20",
  },
  {
    num: "06",
    title: "Shopping Platform",
    desc: "Desktop-based online shopping platform using Java GUI concepts.",
    tags: ["Java", "GUI", "OOP"],
    link: "#",
    gradient: "from-amber-600/20 to-red-600/20",
  },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      className={`group relative flex flex-col p-8 md:p-12 min-h-[400px] border border-white/10 bg-background overflow-hidden ${
        index % 2 !== 0 ? "md:mt-32" : ""
      }`}
    >
      {/* Background slide-in on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0`}
      />

      {/* Tracing border effect lines */}
      <span className="absolute top-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full z-10" />
      <span className="absolute top-0 right-0 w-[1px] h-0 bg-accent transition-all duration-300 delay-100 group-hover:h-full z-10" />
      <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-accent transition-all duration-300 delay-200 group-hover:w-full z-10" />
      <span className="absolute bottom-0 left-0 w-[1px] h-0 bg-accent transition-all duration-300 delay-300 group-hover:h-full z-10" />

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="font-mono text-white/50 text-xl">[{project.num}]</span>
          <a
            href={project.link}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300"
          >
            <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>

        <div>
          <h4 className="text-4xl md:text-5xl font-serif mb-4 group-hover:translate-x-4 transition-transform duration-500 ease-out">
            {project.title}
          </h4>
          <p className="text-white/60 text-lg mb-8 max-w-sm group-hover:translate-x-4 transition-transform duration-500 delay-75 ease-out">
            {project.desc}
          </p>
          
          <div className="flex flex-wrap gap-3 group-hover:translate-x-4 transition-transform duration-500 delay-100 ease-out">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs uppercase tracking-wider font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-24">
          <h2 className="text-sm uppercase tracking-widest text-accent mb-4 font-mono">
            [ 04 — Selected Work ]
          </h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase italic drop-shadow-[3px_3px_0_#ED1D24]">Proof of Work.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

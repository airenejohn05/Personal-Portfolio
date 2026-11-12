import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { GlowCard } from "./GlowCard";

type Project = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  /** Add a URL here and an arrow link appears on the card. */
  link?: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Paddy Price Prediction",
    desc: "Intelligent forecasting system to predict paddy prices using time-series models.",
    tags: ["Python", "Prophet", "ARIMA", "Scikit-learn"],
  },
  {
    num: "02",
    title: "Movie Booking System",
    desc: "Full-stack movie ticket booking platform with secure authentication.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    num: "03",
    title: "Watch Classification",
    desc: "AI-powered classification model identifying watch attributes using deep learning.",
    tags: ["TensorFlow", "Keras", "MobileNet", "Python"],
  },
  {
    num: "04",
    title: "Virtual Music Concert",
    desc: "Interactive virtual concert environment with physics-based systems.",
    tags: ["Unity", "Physics Engine", "C#"],
  },
  {
    num: "05",
    title: "Serene Homes",
    desc: "A secure full-stack digital archive that helps elderly care homes preserve and share residents' life stories, photos and videos through a cloud-based experience.",
    tags: ["React.js", "Node.js", "MongoDB", "Netlify Functions", "Cloudinary", "Tailwind CSS"],
  },
  {
    num: "06",
    title: "Shopping Platform",
    desc: "Desktop-based online shopping platform using Java GUI concepts.",
    tags: ["Java", "GUI", "OOP"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" label="Selected work" title="Projects." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.num} delay={(i % 2) * 0.1}>
              <GlowCard className="group flex h-full min-h-[280px] md:min-h-[320px] flex-col justify-between p-6 transition-transform sm:p-8 duration-500 hover:-translate-y-1.5 md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-white/40">{p.num}</span>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-white hover:text-black"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="mb-3 text-3xl sm:text-4xl md:text-6xl">{p.title}</h3>
                  <p className="mb-6 max-w-md leading-relaxed text-white/60">{p.desc}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/50">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

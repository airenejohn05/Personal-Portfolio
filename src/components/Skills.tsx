import {
  Code2, Database, Layout, Server, Cpu, Globe,
  Layers, MonitorSmartphone, Terminal, Boxes, LineChart,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

type Skill = { name: string; icon: LucideIcon };

const row1: Skill[] = [
  { name: "Python", icon: Terminal },
  { name: "Java", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "SQL", icon: Database },
  { name: "React.js", icon: Layout },
  { name: "Node.js", icon: Server },
  { name: "Tailwind CSS", icon: Layers },
];

const row2: Skill[] = [
  { name: "TensorFlow & Keras", icon: Cpu },
  { name: "Scikit-learn", icon: Cpu },
  { name: "Prophet & ARIMA", icon: LineChart },
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

function Marquee({ items, className }: { items: Skill[]; className: string }) {
  // Two identical halves so the -50% translate loops seamlessly.
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max ${className}`}>
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 gap-4 pr-4" aria-hidden={half === 1}>
            {[...items, ...items].map((s, i) => (
              <li
                key={i}
                className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-panel px-6 py-3.5"
              >
                <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="whitespace-nowrap text-lg text-white/80">{s.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading index="03" label="Toolkit" title="Skills & tools." />
      </div>

      <div className="mb-24 flex flex-col gap-4">
        <Marquee items={row1} className="animate-marquee" />
        <Marquee items={row2} className="animate-marquee-reverse" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.num} delay={i * 0.1}>
              <div className="border-t border-line pt-8">
                <span className="mb-5 block font-mono text-sm text-accent">{cap.num}</span>
                <h3 className="mb-3 text-4xl">{cap.title}</h3>
                <p className="leading-relaxed text-white/60">{cap.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

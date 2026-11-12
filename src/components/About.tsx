import Image from "next/image";
import { asset } from "@/lib/paths";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" label="About" title="A bit about me." />

        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line">
              <Image
                src={asset("/images/pixel-full.png")}
                alt="Airene V John"
                width={1024}
                height={1536}
                style={{ imageRendering: "pixelated" }}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto max-h-[560px] w-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-lg leading-relaxed text-white/70">
                <p>
                  AI enthusiast by day, Marvel fan 24/7. I enjoy building intelligent systems and exploring new technologies.
                </p>
                <p>
                  I work on Machine Learning, AI, predictive analytics and full-stack development: basically teaching
                  computers to think while mine survives on coffee and movie dialogues.
                </p>
                <p>
                  <strong className="font-medium text-white">Current research focus:</strong> predictive analytics and
                  dataset development for agricultural and sericulture-related applications, using machine learning and
                  computer vision.
                </p>
                <p>
                  Outside coding you&apos;ll find me watching movies, rewatching Spider-Man scenes for the hundredth time,
                  travelling, or hunting for the next best food spot like it&apos;s a side quest.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="border-l-2 border-accent pl-6">
                <p className="font-serif text-4xl leading-tight md:text-6xl">
                  &ldquo;Sometimes you gotta run before you can walk.&rdquo;
                </p>
                <footer className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Tony Stark</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

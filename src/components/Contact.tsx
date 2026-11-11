import { Mail, FileText } from "lucide-react";
import { Reveal } from "./Reveal";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/airenejohn05",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/airene-john",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 pb-10 pt-28 md:px-12 md:pt-40">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent">05 — What&apos;s next?</p>
          <h2 className="fluid-h1 mb-12">
            Let&apos;s build
            <br />
            something.
          </h2>

          <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:airenejohn05@gmail.com"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition-transform hover:scale-105 active:scale-95"
            >
              <Mail size={18} aria-hidden="true" /> Say hello
            </a>
            <a
              href="/Resume-%20Airene%20V%20John.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-medium transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
            >
              <FileText size={18} aria-hidden="true" /> Resume
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-white/50 transition-all duration-300 hover:-translate-y-1 hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-28 max-w-7xl border-t border-line pt-6 text-center font-mono text-xs text-white/30">
        &copy; {new Date().getFullYear()} Airene V John
      </footer>
    </section>
  );
}

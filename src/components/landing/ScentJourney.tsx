"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const notes = [
  {
    id: 1,
    num: "01",
    title: "Top Notes",
    desc: "The first impression. Fresh, light, and fleeting — lasting 15–30 minutes on the skin.",
    examples: ["Bergamot", "Lemon", "Pink Pepper"],
    accent: "hsl(45,80%,60%)",
    accentMuted: "hsl(45,60%,95%)",
    accentDark: "hsl(45,50%,12%)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <line
            key={i}
            x1="20"
            y1="20"
            x2={20 + 15 * Math.cos((deg * Math.PI) / 180)}
            y2={20 + 15 * Math.sin((deg * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </svg>
    ),
  },
  {
    id: 2,
    num: "02",
    title: "Heart Notes",
    desc: "The soul of the fragrance. Rich, floral, and full-bodied — the scent you fall in love with.",
    examples: ["Rose", "Jasmine", "Ylang Ylang"],
    accent: "hsl(340,65%,60%)",
    accentMuted: "hsl(340,50%,96%)",
    accentDark: "hsl(340,40%,12%)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path
          d="M20 34 C20 34 6 24 6 15 C6 10 10 7 14 7 C17 7 19 9 20 11 C21 9 23 7 26 7 C30 7 34 10 34 15 C34 24 20 34 20 34Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
          fill="currentColor"
          fillOpacity="0.1"
        />
      </svg>
    ),
  },
  {
    id: 3,
    num: "03",
    title: "Base Notes",
    desc: "The lasting memory. Deep, woody, and profound — staying with you all day long.",
    examples: ["Oud", "Musk", "Sandalwood"],
    accent: "hsl(27,55%,45%)",
    accentMuted: "hsl(27,40%,95%)",
    accentDark: "hsl(27,35%,11%)",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="13" y="13" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <rect x="17" y="17" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
];

export default function ScentJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const panels = panelsRef.current;

    // Save the tween reference to use it in containerAnimation
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.2,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (containerRef.current?.offsetWidth ?? 0) * 1.5,
      },
    });

    // Animate content within each panel as they come into view
    panels.forEach((panel) => {
      const title = panel.querySelector(".panel-title");
      const desc = panel.querySelector(".panel-desc");
      const tags = panel.querySelectorAll(".panel-tag");
      const icon = panel.querySelector(".panel-icon");

      // Filter out null values and convert NodeList to Array for TS safety
      const elementsToAnimate = [icon, title, desc, ...Array.from(tags)].filter(Boolean);

      gsap.fromTo(
        elementsToAnimate,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween, // Fixed type error here
            start: "left 80%",
          },
        }
      );
    });
  }, { scope: containerRef });

  const addToPanels = (el: HTMLDivElement | null) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="overflow-hidden w-full h-screen relative">
      <div className="flex w-[300vw] h-full">
        {notes.map((note, idx) => (
          <div
            key={note.id}
            ref={addToPanels}
            className="w-screen h-full relative flex items-center overflow-hidden"
            style={{
              background: `var(--journey-bg-${idx})`,
            }}
          >
            {/* Dynamic background — light/dark aware via inline style + CSS vars defined below */}
            <style>{`
              :root {
                --journey-bg-0: ${note.accentMuted};
                --journey-bg-1: ${notes[1].accentMuted};
                --journey-bg-2: ${notes[2].accentMuted};
              }
              .dark {
                --journey-bg-0: ${note.accentDark};
                --journey-bg-1: ${notes[1].accentDark};
                --journey-bg-2: ${notes[2].accentDark};
              }
            `}</style>

            {/* Giant number watermark */}
            <div
              className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[30vw] font-black leading-none select-none pointer-events-none"
              style={{
                color: note.accent,
                opacity: 0.07,
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
              aria-hidden="true"
            >
              {note.num}
            </div>

            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-border/40">
              <div
                className="h-full transition-all"
                style={{ width: `${(idx + 1) * 33.33}%`, backgroundColor: note.accent }}
              />
            </div>

            {/* Content: split layout */}
            <div className="container mx-auto px-8 sm:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Icon + number */}
              <div className="flex flex-col items-start lg:items-center justify-center">
                <div className="panel-icon relative">
                  {/* Large decorative icon */}
                  <div
                    className="w-32 h-32 lg:w-48 lg:h-48 opacity-80"
                    style={{ color: note.accent }}
                  >
                    {note.icon}
                  </div>
                  {/* Step number */}
                  <div
                    className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                    style={{ backgroundColor: note.accent }}
                  >
                    {note.num}
                  </div>
                </div>
              </div>

              {/* Right: Text */}
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
                  style={{ color: note.accent }}
                >
                  Fragrance Anatomy · {note.num}
                </p>

                <h2
                  className="panel-title text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {note.title}
                </h2>

                <p className="panel-desc text-base lg:text-lg text-muted-foreground max-w-sm leading-relaxed mb-8">
                  {note.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {note.examples.map((ex) => (
                    <span
                      key={ex}
                      className="panel-tag inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border"
                      style={{
                        backgroundColor: note.accent + "15",
                        borderColor: note.accent + "40",
                        color: note.accent,
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                {/* Scroll hint on first panel */}
                {note.id === 1 && (
                  <p className="mt-10 text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="inline-block w-6 h-px bg-muted-foreground/30" />
                    Scroll to discover more
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
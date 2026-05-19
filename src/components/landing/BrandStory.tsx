"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const targets = [
      { el: countRefs.current[0], endValue: 500 },
      { el: countRefs.current[1], endValue: 10 },
      { el: countRefs.current[2], endValue: 50 },
    ];

    targets.forEach((target) => {
      if (target.el) {
        gsap.to(target.el, {
          innerHTML: target.endValue,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }
    });

    // Content animations
    gsap.from(".bs-left > *", {
      x: -60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".bs-right", {
      x: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden relative">
      {/* Large decorative quote mark */}
      <div
        className="absolute top-8 left-4 text-[200px] font-black text-foreground/[0.025] leading-none select-none pointer-events-none"
        aria-hidden="true"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        &ldquo;
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="bs-left lg:col-span-6 flex flex-col">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-primary" />
              Our Heritage
            </p>

            <h2
              className="text-4xl md:text-6xl font-black tracking-[-0.02em] text-foreground leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              The Art of<br />
              <em className="text-primary not-italic">Fine Perfumery</em>
            </h2>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-primary pl-6 mb-8">
              <p className="text-lg text-foreground/80 italic leading-relaxed" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                &ldquo;A fragrance is more than a scent — it is a memory, an emotion,
                a profound expression of who you are.&rdquo;
              </p>
            </blockquote>

            <p className="text-muted-foreground leading-relaxed mb-6">
              At AromaCart, we curate only the finest fragrances from the world&apos;s
              most renowned houses. Each bottle is a testament to craft,
              authenticity, and the timeless pursuit of olfactory perfection.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Sourced directly from master perfumers in Grasse, Dubai, and
              Tokyo — we bring global luxury directly to you.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { ref: 0, suffix: "+", label: "Unique Scents" },
                { ref: 1, suffix: "k+", label: "Happy Clients" },
                { ref: 2, suffix: "+", label: "Global Brands" },
              ].map((stat, i) => (
                <div key={stat.label} className="group">
                  <h4
                    className="text-4xl font-black text-primary flex items-end gap-0.5 mb-1"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    <span ref={(el) => { countRefs.current[i] = el; }}>0</span>
                    <span className="text-2xl">{stat.suffix}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image Stack ── */}
          <div className="bs-right lg:col-span-6 relative h-[500px] lg:h-[600px]">
            {/* Main image */}
            <div className="absolute top-0 left-4 right-0 bottom-12 rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=800&auto=format&fit=crop"
                alt="Luxury perfume craftsmanship"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Secondary image — offset */}
            <div className="absolute bottom-0 left-0 w-48 h-60 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop"
                alt="Perfume bottle detail"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* Floating info chip */}
            <div className="absolute top-6 -left-4 bg-card border border-border rounded-2xl p-4 shadow-xl">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Certified Authentic</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-foreground">100% Original</p>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-2 border-primary/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
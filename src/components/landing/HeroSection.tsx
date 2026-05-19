"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // Reveal the vertical divider line
    tl.fromTo(
      dividerRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 1.2, ease: "power3.inOut" }
    );

    // Left side — stagger lines in
    tl.fromTo(
      ".hero-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" },
      "-=0.6"
    );

    // Right side
    tl.fromTo(
      rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    // Badge float in
    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Continuous floating on the badge
    gsap.to(badgeRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(37,45%,97%) 0%, hsl(30,40%,94%) 50%, hsl(27,35%,91%) 100%)",
      }}
    >
      {/* Dark mode override */}
      <div className="absolute inset-0 hidden dark:block"
        style={{ background: "linear-gradient(135deg, hsl(20,30%,7%) 0%, hsl(25,25%,9%) 50%, hsl(30,20%,11%) 100%)" }}
      />

      {/* Large decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(80px,18vw,220px)] font-black tracking-tighter text-foreground/[0.025] dark:text-foreground/[0.04] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          AROMA
        </span>
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-[-5%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/8 blur-[100px] pointer-events-none" />

      {/* Grid layout */}
      <div className="container mx-auto relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT: Typography Column ── */}
        <div
          ref={leftRef}
          className="flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <div className="overflow-hidden mb-6">
            <p className="hero-line text-[10px] font-bold tracking-[0.4em] uppercase text-primary flex items-center gap-2">
              <span className="inline-block w-8 h-px bg-primary" />
              Eau de Parfum Collection 2026
            </p>
          </div>

          {/* Main headline — split into individual lines for animation */}
          <div className="overflow-hidden mb-2">
            <h1
              className="hero-line text-[clamp(42px,7vw,90px)] font-black tracking-[-0.03em] leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Discover
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <h1
              className="hero-line text-[clamp(42px,7vw,90px)] font-black tracking-[-0.03em] leading-[0.9] italic text-primary"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Your Scent
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <h1
              className="hero-line text-[clamp(42px,7vw,90px)] font-black tracking-[-0.03em] leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Identity.
            </h1>
          </div>

          {/* Description */}
          <div className="overflow-hidden mb-10">
            <p className="hero-line text-base text-muted-foreground max-w-sm leading-relaxed">
              Curated luxury perfumes sourced from the world&apos;s finest fragrance
              houses. Every bottle tells a story — yours awaits.
            </p>
          </div>

          {/* CTAs */}
          <div className="overflow-hidden">
            <div className="hero-line flex flex-wrap gap-4 items-center">
              <Link href="/shop">
                <button className="group flex items-center gap-3 bg-foreground dark:bg-foreground text-background px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg">
                  Shop Collection
                  <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary"
              >
                Our Heritage →
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="overflow-hidden mt-16 pt-8 border-t border-border/60">
            <div className="hero-line flex gap-8">
              {[
                { num: "500+", label: "Fragrances" },
                { num: "10k+", label: "Happy Clients" },
                { num: "50+", label: "Global Brands" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          ref={dividerRef}
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        />

        {/* ── RIGHT: Visual Column ── */}
        <div
          ref={rightRef}
          className="relative hidden lg:flex items-center justify-center p-12 xl:p-20"
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Central perfume bottle visual */}
          <div className="relative w-full max-w-md aspect-[3/4]">
            {/* Main bottle image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b from-secondary/60 to-secondary/20 border border-border/40 backdrop-blur-sm shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
                alt="Luxury perfume bottle"
                className="w-full h-full object-cover opacity-90"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>

            {/* Floating tag: New Arrival */}
            <div
              ref={badgeRef}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span className="text-xs font-bold tracking-wider uppercase">New Arrival</span>
              </div>
              <p className="text-[10px] mt-0.5 opacity-80">Oud Wood Intense</p>
            </div>

            {/* Floating info card: bottom left */}
            <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Top Rating</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-semibold text-foreground mt-1">4.9 / 5.0</p>
            </div>

            {/* Scent note tags floating around */}
            {[
              { label: "Oud", pos: "top-[20%] -left-10" },
              { label: "Rose", pos: "top-[50%] -right-10" },
              { label: "Amber", pos: "bottom-[25%] -left-8" },
            ].map((tag) => (
              <div
                key={tag.label}
                className={`absolute ${tag.pos} bg-background/80 dark:bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-foreground/70 px-3 py-1.5 rounded-full shadow-md`}
              >
                {tag.label}
              </div>
            ))}
          </div>

          {/* Decorative ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-primary/5 pointer-events-none" />
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-5 h-8 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
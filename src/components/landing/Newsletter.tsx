"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight, CheckCircle } from "lucide-react";

const perks = [
  { icon: "✦", text: "Exclusive early access to new arrivals" },
  { icon: "✦", text: "Members-only discount codes" },
  { icon: "✦", text: "Weekly fragrance guides & tips" },
];

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.from(".nl-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".nl-visual", {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-secondary/20"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] text-foreground"
        style={{
          backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text + form */}
          <div className="nl-content flex flex-col">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Exclusive Membership
            </p>

            <h2
              className="text-4xl md:text-6xl font-black tracking-[-0.02em] leading-tight mb-6 text-foreground"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Join the<br />
              <em className="not-italic text-primary">
                Aroma Club
              </em>
            </h2>

            <p className="text-sm leading-relaxed mb-8 text-muted-foreground">
              Become part of an exclusive community of fragrance lovers. Get
              curated recommendations, launch access, and member-only benefits.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-10">
              {perks.map((perk) => (
                <li key={perk.text} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="text-primary text-xs">{perk.icon}</span>
                  {perk.text}
                </li>
              ))}
            </ul>

            {/* Form */}
            {submitted ? (
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 border border-primary/20">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Welcome to the Aroma Club!
                  </p>
                  <p className="text-xs mt-0.5 text-muted-foreground">
                    Check your inbox for a welcome gift 🎁
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-5 rounded-full text-sm outline-none transition-all bg-background border border-input text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-[52px]"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-7 rounded-full text-sm font-bold transition-all duration-300 flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-[52px]"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <p className="text-[11px] mt-4 text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          {/* Right: Visual */}
          <div className="nl-visual hidden lg:flex items-center justify-center relative h-80">
            {/* Concentric rings */}
            {[340, 260, 180, 100].map((size, i) => (
              <div
                key={size}
                className="absolute rounded-full border border-primary"
                style={{
                  width: size,
                  height: size,
                  opacity: 0.1 + i * 0.1,
                  animation: `spin ${20 + i * 5}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                }}
              />
            ))}

            {/* Center orb */}
            <div className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-br from-primary/80 to-primary">
              <span
                className="text-2xl font-black tracking-tighter text-primary-foreground"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                AC
              </span>
            </div>

            {/* Floating text labels */}
            {[
              { text: "500+ Scents", angle: -45, radius: 140 },
              { text: "10k Members", angle: 15, radius: 140 },
              { text: "Free Delivery", angle: 100, radius: 130 },
            ].map((item) => {
              const x = Math.cos((item.angle * Math.PI) / 180) * item.radius;
              const y = Math.sin((item.angle * Math.PI) / 180) * item.radius;
              return (
                <div
                  key={item.text}
                  className="absolute text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap bg-background border border-border text-muted-foreground shadow-sm"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
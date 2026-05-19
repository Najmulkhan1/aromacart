"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Floral",
    desc: "Soft, sweet & romantic",
    count: "127 scents",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Woody",
    desc: "Earthy, warm & dry",
    count: "94 scents",
    image: "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Oriental",
    desc: "Spicy, exotic & rich",
    count: "76 scents",
    image: "https://images.unsplash.com/photo-1687200877070-143b149c2315?q=80&w=690&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Fresh",
    desc: "Clean, citrusy & aquatic",
    count: "83 scents",
    image: "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1174&auto=format&fit=crop",
  },
];

export default function CategoryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // সহজ এবং বাগ-ফ্রি স্ক্রল অ্যানিমেশন
    gsap.from(".category-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // ভিউপোর্টের 80% এ আসলে অ্যানিমেশন শুরু হবে
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Centered for a Luxury feel) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-primary/60" />
            Browse by Category
            <span className="w-8 h-px bg-primary/60" />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Scent Families
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every fragrance belongs to a family. Find yours and explore scents
            that resonate with your soul.
          </p>
        </div>

        {/* Elegant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              href={`/shop?category=${cat.title.toLowerCase()}`}
              key={cat.id}
              className="category-card group relative overflow-hidden rounded-2xl block aspect-[4/5] bg-secondary/30 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  
                  {/* Text Content */}
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary-foreground/80 mb-2">
                      {cat.count}
                    </span>
                    <h3
                      className="text-3xl font-bold text-white mb-2 leading-none"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium tracking-wide">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Elegant Hover Arrow */}
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const reviews = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Perfume Enthusiast",
    city: "Dhaka",
    text: "The Oud Wood Intense is absolutely mesmerizing. It lasts all day and I get compliments everywhere I go. Nothing else compares.",
    rating: 5,
    avatar: "AR",
    color: "bg-rose-500",
    product: "Oud Wood Intense",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Verified Buyer",
    city: "Chittagong",
    text: "AromaCart's packaging is sheer luxury. Buying perfumes online in Bangladesh has never felt this premium. The unboxing experience alone is worth it.",
    rating: 5,
    avatar: "TA",
    color: "bg-amber-600",
    product: "Rose Noir",
  },
  {
    id: 3,
    name: "Sarah Khan",
    role: "Beauty Writer",
    city: "Sylhet",
    text: "I love the detailed scent notes provided for each fragrance. It helped me pick the perfect floral fragrance that matches my personality.",
    rating: 4,
    avatar: "SK",
    color: "bg-violet-600",
    product: "Citrus Grove",
  },
  {
    id: 4,
    name: "Imran Hossain",
    role: "Verified Buyer",
    city: "Rajshahi",
    text: "Prompt delivery, 100% authentic products, and an incredible selection. Highly recommended for any fragrance lover.",
    rating: 5,
    avatar: "IH",
    color: "bg-teal-600",
    product: "Midnight Amber",
  },
  {
    id: 5,
    name: "Nadia Islam",
    role: "Fashion Blogger",
    city: "Dhaka",
    text: "Rose Noir is my new signature scent. The longevity is incredible — still going strong after 10 hours! I've already ordered a second bottle.",
    rating: 5,
    avatar: "NI",
    color: "bg-pink-600",
    product: "Rose Noir",
  },
];

const infiniteReviews = [...reviews, ...reviews];

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Heading reveal
    gsap.from(".testi-heading", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Scroll animation
    if (scrollerRef.current) {
      animRef.current = gsap.to(scrollerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--secondary)/0.15)" }}>
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(60px,12vw,160px)] font-black tracking-tighter text-foreground/[0.02] whitespace-nowrap"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          REVIEWS
        </span>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="testi-heading text-[10px] font-bold tracking-[0.35em] uppercase text-primary mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Social Proof
            </p>
            <h2
              className="testi-heading text-4xl md:text-6xl font-black tracking-[-0.02em] text-foreground leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Loved by<br />
              <em className="text-primary not-italic">Thousands</em>
            </h2>
          </div>

          {/* Overall rating */}
          <div className="testi-heading flex items-center gap-4 bg-card border border-border rounded-2xl p-5 self-start shadow-sm">
            <div className="text-center">
              <p className="text-4xl font-black text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>4.9</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-sm font-semibold text-foreground">4,200+</p>
              <p className="text-xs text-muted-foreground">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling ticker — fade masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[hsl(var(--secondary)/0.15)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[hsl(var(--secondary)/0.15)] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollerRef}
          className="flex gap-5 pl-5 cursor-pointer"
          onMouseEnter={() => animRef.current?.pause()}
          onMouseLeave={() => animRef.current?.resume()}
        >
          {infiniteReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex-none w-[320px] md:w-[400px] bg-card border border-border rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-primary fill-current" : "text-border fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1 italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-border pt-5 flex items-center justify-between">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-[11px] text-muted-foreground">{review.role} · {review.city}</p>
                  </div>
                </div>

                {/* Product tag */}
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

const demoProducts = [
  {
    id: 1,
    title: "Oud Wood Intense",
    subtitle: "A deep, smoky journey",
    price: "৳ 12,500",
    originalPrice: "৳ 15,000",
    category: "Woody",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    large: true, // Featured card — larger
  },
  {
    id: 2,
    title: "Rose Noir",
    subtitle: "Dark romantic floral",
    price: "৳ 8,900",
    category: "Floral",
    badge: "New",
    image: "https://images.unsplash.com/photo-1615486171448-424d673bc2a3?q=80&w=800&auto=format&fit=crop",
    large: false,
  },
  {
    id: 3,
    title: "Citrus Grove",
    subtitle: "Fresh Mediterranean air",
    price: "৳ 6,500",
    category: "Citrus",
    badge: null,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop",
    large: false,
  },
  {
    id: 4,
    title: "Midnight Amber",
    subtitle: "Warm, spicy, mysterious",
    price: "৳ 10,200",
    category: "Oriental",
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=800&auto=format&fit=crop",
    large: false,
  },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Woody: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  Floral: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400" },
  Citrus: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400" },
  Oriental: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" },
};

function ProductCardLarge({ product }: { product: typeof demoProducts[0] }) {
  const colors = categoryColors[product.category] ?? { bg: "bg-secondary", text: "text-foreground" };
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
      {/* Image */}
      <div className="relative flex-1 min-h-[380px] overflow-hidden bg-secondary/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          style={{ transformOrigin: "center" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow">
              {product.badge}
            </span>
          )}
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full ${colors.bg} ${colors.text}`}>
            {product.category}
          </span>
        </div>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:text-rose-500 transition-colors shadow">
          <Heart className="h-4 w-4" />
        </button>

        {/* Bottom text overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/70 text-xs mb-1 font-medium">{product.subtitle}</p>
          <h3 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {product.title}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-foreground">{product.price}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through mt-0.5">{product.originalPrice}</p>
          )}
        </div>
        <button className="flex items-center gap-2 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors rounded-full px-5 py-2.5 text-sm font-semibold">
          <ShoppingBag className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}

function ProductCardSmall({ product }: { product: typeof demoProducts[0] }) {
  const colors = categoryColors[product.category] ?? { bg: "bg-secondary", text: "text-foreground" };
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex gap-0">
      {/* Left: image */}
      <div className="relative w-28 flex-shrink-0 overflow-hidden bg-secondary/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Right: info */}
      <div className="flex flex-col flex-1 p-4">
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full self-start mb-2 ${colors.bg} ${colors.text}`}>
          {product.category}
        </span>
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm font-bold text-foreground hover:text-primary transition-colors leading-snug mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {product.title}
          </h3>
        </Link>
        <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed flex-1">{product.subtitle}</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-foreground text-sm">{product.price}</p>
          <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors">
            <ShoppingBag className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".fp-item", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
    gsap.from(headingRef.current, {
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  const [featured, ...rest] = demoProducts;

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-primary" />
            Handpicked Collection
          </p>
          <h2
            className="text-4xl md:text-6xl font-black tracking-[-0.02em] text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Featured<br />
            <em className="text-primary not-italic">Scents</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover our most sought-after fragrances — handpicked for their unique
            character and lasting impression.
          </p>
        </div>

        {/* Asymmetric grid: 1 large + 3 horizontal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Large featured card */}
          <div className="fp-item lg:col-span-2 lg:row-span-3">
            <ProductCardLarge product={featured} />
          </div>

          {/* Smaller cards */}
          {rest.map((product) => (
            <div key={product.id} className="fp-item lg:col-span-3">
              <ProductCardSmall product={product} />
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="fp-item mt-10 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            View Full Collection
            <span className="w-10 h-10 rounded-full border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
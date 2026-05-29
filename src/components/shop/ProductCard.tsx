"use client"

import Link from "next/link";
import { Heart, ShoppingBag, Sparkles, Eye, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
  href?: string;
  image?: string;
  compareAtPrice?: string;
  isFeatured?: boolean;
}

export function ProductCard({ title, price, category, href = "#", image, compareAtPrice, isFeatured }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-3xl bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-1.5 border border-border/50 hover:border-primary/20">
      
      {/* Ambient glow on hover */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/3 transition-all duration-500 -z-10 blur-xl opacity-0 group-hover:opacity-100" />

      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-secondary/40 to-secondary/20 overflow-hidden">
        <Link href={href} className="absolute inset-0 z-0">
          {image ? (
            <>
              {/* Skeleton pulse while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-secondary/50 animate-pulse" />
              )}
              <img 
                src={image} 
                alt={title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground/30">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary/30" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase">
                Coming Soon
              </span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </Link>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Compare At Price Badge */}
        {compareAtPrice && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center text-[10px] font-bold bg-emerald-500 text-white px-2.5 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">
              Save {Math.round(((parseInt(compareAtPrice.replace(/[^\d]/g, '')) - parseInt(price.replace(/[^\d]/g, ''))) / parseInt(compareAtPrice.replace(/[^\d]/g, ''))) * 100)}%
            </span>
          </div>
        )}

        {/* Wishlist Button (always visible on mobile, hover on desktop) */}
        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
            compareAtPrice ? 'top-12' : 'top-3'
          } ${
            isWishlisted 
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110' 
              : 'bg-white/15 text-white hover:bg-white/30 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Action Buttons on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex-1 h-10 bg-white/95 dark:bg-white/90 backdrop-blur-md text-black rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white transition-colors shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category pill */}
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary/60 mb-2.5 w-fit">
          <span className="w-1 h-1 rounded-full bg-primary/50 inline-block" />
          {category}
        </span>
        
        <Link href={href} className="group/title">
          <h3 
            className="font-bold text-base leading-snug text-foreground line-clamp-2 mb-3 group-hover/title:text-primary transition-colors duration-300" 
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-foreground tracking-tight">{price}</span>
            {compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">{compareAtPrice}</span>
            )}
          </div>
          {/* Mini rating */}
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-semibold text-muted-foreground">4.9</span>
          </div>
        </div>
      </div>
    </div>
  );
}

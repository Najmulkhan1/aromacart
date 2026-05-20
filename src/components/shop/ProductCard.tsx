"use client"

import Link from "next/link";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
  href?: string;
  image?: string;
}

export function ProductCard({ title, price, category, href = "#", image }: ProductCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      
      {/* Image Container (Linked) */}
      <Link href={href} className="relative aspect-[4/5] bg-secondary/30 overflow-hidden flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
            <Sparkles className="w-10 h-10" />
            <span className="text-xs font-medium tracking-widest uppercase">
              No Image
            </span>
          </div>
        )}
        
        {/* Quick Add Buttons (Hover Effect) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors" onClick={(e) => e.preventDefault()}>
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors" onClick={(e) => e.preventDefault()}>
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
          {category}
        </div>
        
        <Link href={href} className="hover:text-primary transition-colors">
          <h3 
            className="font-bold text-lg mb-1 line-clamp-1" 
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {title}
          </h3>
        </Link>
        
        <p className="font-medium text-primary mt-auto pt-2">
          {price}
        </p>
      </div>
      
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductGallery({ images, isFeatured }: { images: string[], isFeatured?: boolean }) {
  const [mainImage, setMainImage] = useState(images?.[0] || "");

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] max-w-sm mx-auto bg-secondary/30 rounded-3xl flex flex-col items-center justify-center border border-border/80 p-8 text-center min-h-[350px]">
        <ImageIcon className="w-10 h-10 text-muted-foreground opacity-50 mb-4 animate-pulse" />
        <span className="text-muted-foreground font-semibold uppercase tracking-widest text-xs">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-6">
      
      {/* মেইন ছবি (optimized shape and smaller aspect size) */}
      <div className="relative w-full aspect-[4/5] max-h-[480px] bg-secondary/5 dark:bg-secondary/10 rounded-[2rem] overflow-hidden border border-border/80 shadow-xl shadow-primary/5 transition-all duration-300 hover:shadow-2xl">
        <Image 
          src={mainImage} 
          alt="Product Image" 
          fill 
          className="object-cover transition-transform duration-700 hover:scale-105" 
          priority 
        />
        {isFeatured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold tracking-wide shadow-md uppercase text-[10px] px-3 py-1 rounded-full border border-primary/20">
            Best Seller
          </Badge>
        )}
      </div>

      {/* নিচের ছোট থাম্বনেইলগুলো */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 w-full px-2">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setMainImage(img)}
              className={`relative w-16 h-16 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-sm ${
                mainImage === img 
                  ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md' 
                  : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
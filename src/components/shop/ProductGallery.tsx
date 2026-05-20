"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductGallery({ images, isFeatured }: { images: string[], isFeatured?: boolean }) {
  const [mainImage, setMainImage] = useState(images?.[0] || "");

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-secondary/30 rounded-3xl flex flex-col items-center justify-center border border-border">
        <ImageIcon className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
        <span className="text-muted-foreground font-medium uppercase tracking-widest text-sm">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* মেইন বড় ছবি */}
      <div className="aspect-[4/5] bg-secondary/10 rounded-3xl overflow-hidden relative border border-border">
        <Image src={mainImage} alt="Main Product Image" fill className="object-cover" priority />
        {isFeatured && <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-md">Best Seller</Badge>}
      </div>

      {/* নিচের ছোট থাম্বনেইলগুলো */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setMainImage(img)}
              className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${mainImage === img ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'}`}
            >
              <div className="relative w-full h-full">
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
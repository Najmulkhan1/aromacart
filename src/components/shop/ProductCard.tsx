import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
}

export function ProductCard({ title, price, category }: ProductCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-card border hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/50">
        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 rounded-full hover:bg-white/80 dark:hover:bg-black/50 transition-colors"
        >
          <Heart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
        
        {/* Placeholder image (পরবর্তীতে next/image দিয়ে আসল ছবি বসানো হবে) */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          [Product Image]
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{category}</p>
        <Link href="/shop/1">
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="font-bold text-foreground">{price}</p>
      </div>
    </div>
  );
}
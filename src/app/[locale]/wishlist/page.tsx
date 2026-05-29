"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, HeartCrack, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন এরর এড়ানোর জন্য
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // কার্টে অ্যাড করার ফাংশন
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "Default",
      image: product.image
    });
    // চাইলে এখানে টোস্ট মেসেজ দিতে পারেন
    alert(`${product.name} added to cart!`);
  };

  // যদি উইশলিস্ট খালি থাকে
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <HeartCrack className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Found something you like? Tap on the heart icon next to the item to add it to your wishlist.
        </p>
        <Button asChild className="h-12 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
          <Link href="/en/shop">Explore Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* ── Page Header ── */}
      <div className="bg-secondary/30 py-12 px-4 md:px-8 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-primary fill-primary/20" /> My Wishlist
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          You have {items.length} {items.length === 1 ? 'item' : 'items'} saved in your wishlist.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
              
              {/* Image Area */}
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Remove Button overlay */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeItem(product.id)}
                    className="w-10 h-10 bg-background/90 backdrop-blur text-destructive rounded-full flex items-center justify-center shadow-md hover:bg-destructive hover:text-white transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1">
                {product.category && (
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    {product.category}
                  </span>
                )}
                <h3 className="font-bold text-lg mb-2 truncate group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="text-lg font-black mb-4">
                  ৳ {product.price.toLocaleString()}
                </div>
                
                {/* Action Button */}
                <div className="mt-auto">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full h-11 border-2 border-primary text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
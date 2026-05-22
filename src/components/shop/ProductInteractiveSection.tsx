"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

interface SizeVariant {
  size: string;
  price: number;
}

interface ProductInteractiveSectionProps {
  sizes: SizeVariant[];
  basePrice: number;
  compareAtPrice?: number;
  locale: string;
  scentNotes: { top?: string; heart?: string; base?: string };
  productInfo: { id: string; name: string; image: string };
}

export function ProductInteractiveSection({
  sizes,
  basePrice,
  compareAtPrice,
  locale,
  productInfo,
}: ProductInteractiveSectionProps) {
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(
    sizes[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem, closeCart } = useCartStore();
  const router = useRouter();

  const handleBuyNow = () => {
    addItem({
      id: productInfo.id,
      name: productInfo.name,
      price: currentPrice,
      quantity,
      image: productInfo.image,
      size: selectedSize?.size || "50ml",
    });
    closeCart();
    router.push(`/${locale}/checkout`);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const currentPrice = selectedSize ? selectedSize.price : basePrice;
  const discount =
    compareAtPrice && compareAtPrice > currentPrice
      ? Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)
      : null;

  const handleAddToCart = () => {
    console.log("Adding to cart with image:", productInfo.image)
    addItem({
      id: productInfo.id,
      name: productInfo.name,
      price: currentPrice,
      quantity,
      image: productInfo.image,
      size: selectedSize?.size || "50ml",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-7">
      {/* ── Price ── */}
      <div className="flex items-end gap-4">
        <span
          className="text-4xl font-bold text-foreground leading-none"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          ৳ {currentPrice.toLocaleString()}
        </span>
        {compareAtPrice && compareAtPrice > currentPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through leading-none mb-0.5">
              ৳ {compareAtPrice.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full leading-none mb-0.5">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* ── Size Selector ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            {locale === "bn" ? "সাইজ নির্বাচন" : "Select Size"}
          </h3>
          {selectedSize && (
            <span className="text-xs text-muted-foreground">
              {locale === "bn" ? "নির্বাচিত:" : "Selected:"}{" "}
              <strong className="text-foreground">{selectedSize.size}</strong>
            </span>
          )}
        </div>
        <RadioGroup
          value={selectedSize?.size || ""}
          onValueChange={(val) => {
            const sizeObj = sizes.find((s) => s.size === val);
            if (sizeObj) setSelectedSize(sizeObj);
          }}
          className="flex flex-wrap gap-3"
        >
          {sizes.map((s) => {
            const isSelected = selectedSize?.size === s.size;
            return (
              <div key={s.size} className="relative">
                <RadioGroupItem value={s.size} id={s.size} className="sr-only" />
                <label
                  htmlFor={s.size}
                  className={`flex flex-col items-center justify-center min-w-[80px] px-5 py-3 border-2 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                    isSelected
                      ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                      : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground bg-transparent"
                  }`}
                >
                  <span className="text-sm font-bold">{s.size}</span>
                  <span
                    className={`text-[10px] mt-0.5 font-medium ${
                      isSelected ? "text-background/70" : "text-muted-foreground/70"
                    }`}
                  >
                    ৳{s.price.toLocaleString()}
                  </span>
                </label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* ── Quantity + Actions ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Quantity */}
          <div className="flex items-center border-2 border-border/60 rounded-2xl overflow-hidden h-14 shrink-0">
            <button
              onClick={decrement}
              className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-foreground text-base">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className={`h-14 flex-1 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
              added
                ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                : "shadow-lg shadow-foreground/10"
            }`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                {locale === "bn" ? "যোগ হয়েছে!" : "Added!"}
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5 mr-2" />
                {locale === "bn" ? "কার্টে যোগ করুন" : "Add to Cart"}
              </>
            )}
          </Button>

          {/* Wishlist */}
          <button
            onClick={() => setWishlist((w) => !w)}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
              wishlist
                ? "border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-500"
                : "border-border/60 text-muted-foreground hover:border-rose-300 hover:text-rose-400"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Buy Now */}
        <Button
          size="lg"
          variant="outline"
          className="w-full h-14 rounded-2xl text-sm font-bold tracking-wide border-2"
          onClick={handleBuyNow}
        >
          <Zap className="w-4 h-4 mr-2" />
          {locale === "bn" ? "এখনই কিনুন" : "Buy Now"}
        </Button>
      </div>

      {/* ── Stock & Delivery Info ── */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="text-muted-foreground">
            {locale === "bn"
              ? "স্টকে আছে — আজই অর্ডার করুন"
              : "In stock — order today"}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <span className="w-2 h-2 rounded-full bg-primary/60 shrink-0" />
          <span className="text-muted-foreground">
            {locale === "bn"
              ? "দুপুর ২টার আগে অর্ডার করলে আজই পাঠানো হবে"
              : "Order before 2 PM for same-day dispatch"}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Star, Heart, ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore"; // Zustand স্টোর ইম্পোর্ট করা হলো

export default function ProductDetailPage() {
  // রিয়েল স্টেট ম্যানেজমেন্ট
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50ml"); // সাইজের জন্য স্টেট
  
  // Zustand থেকে ফাংশন আনা হচ্ছে
  const { addItem } = useCartStore();

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // রিয়েল Add to Cart ফাংশন
  const handleAddToCart = () => {
    addItem({
      id: "oud-wood-intense", // ভবিষ্যতে API থেকে ডায়নামিক ID আসবে
      name: "Oud Wood Intense",
      price: 12500, // ভবিষ্যতে API থেকে ডায়নামিক প্রাইস আসবে
      quantity: quantity,
      image: "placeholder-image-url", 
      size: selectedSize, // ইউজারের সিলেক্ট করা রিয়েল সাইজ
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-secondary/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <span className="text-muted-foreground text-lg">[Main Product Image]</span>
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Best Seller</Badge>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className="aspect-square bg-secondary/50 rounded-xl cursor-pointer hover:ring-2 ring-primary transition-all flex items-center justify-center text-xs text-muted-foreground">
                [Thumb]
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm text-primary uppercase tracking-widest font-semibold mb-2">Woody Floral</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Oud Wood Intense</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(124 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-foreground">৳ 12,500</span>
              <span className="text-xl text-muted-foreground line-through">৳ 14,000</span>
            </div>
          </div>

          <Separator className="mb-6" />

          
         {/* Size Selector */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-foreground tracking-wide">Select Size</h3>
            <RadioGroup 
              value={selectedSize} 
              onValueChange={setSelectedSize} 
              className="flex flex-wrap gap-4"
            >
              {["30ml", "50ml", "100ml"].map((size) => {
                // চেক করছি বর্তমান সাইজটি সিলেক্ট করা আছে কি না
                const isSelected = selectedSize === size; 

                return (
                  <div key={size} className="relative group">
                    <RadioGroupItem value={size} id={size} className="sr-only" />
                    <label
                      htmlFor={size}
                      className={`flex items-center justify-center min-w-[90px] px-6 py-3 border-2 rounded-full cursor-pointer transition-all duration-300 font-medium ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(201,149,106,0.5)] dark:shadow-[0_0_15px_rgba(212,168,83,0.5)] scale-105"
                          : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {size}
                    </label>
                    
                    {/* Elegant Dot Indicator below the selected size */}
                    <span 
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 transform ${
                        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`} 
                    />
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Scent Notes */}
          <div className="mb-8 p-6 bg-secondary/30 rounded-2xl">
            <h3 className="font-semibold mb-4">Scent Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Top:</strong> Rosewood, Cardamom, Chinese Pepper</li>
              <li><strong className="text-foreground">Heart:</strong> Oud Wood, Sandalwood, Vetiver</li>
              <li><strong className="text-foreground">Base:</strong> Tonka Bean, Vanilla, Amber</li>
            </ul>
          </div>

          {/* Actions: Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center justify-between border rounded-full px-4 h-14 w-full sm:w-32 shrink-0">
              <Button variant="ghost" size="icon" onClick={decrement} className="rounded-full"><Minus className="w-4 h-4" /></Button>
              <span className="font-semibold">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={increment} className="rounded-full"><Plus className="w-4 h-4" /></Button>
            </div>
            
            {/* Real Add to Cart Button */}
            <Button 
              size="lg" 
              className="h-14 flex-1 rounded-full text-base"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full shrink-0">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Check className="w-4 h-4 text-green-500" /> In stock and ready to ship
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8 overflow-x-auto flex-nowrap">
            <TabsTrigger value="description" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-8 py-4 text-base whitespace-nowrap">Description</TabsTrigger>
            <TabsTrigger value="ingredients" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-8 py-4 text-base whitespace-nowrap">Ingredients</TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-8 py-4 text-base whitespace-nowrap">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-muted-foreground leading-relaxed max-w-3xl">
            <p>Oud Wood Intense introduces new dimensions of oud at its richest, most luxurious saturation. Often imitated, never duplicated, the classic Oud Wood reveals its full force through a bold intensification, ignited by the smoldering grip of angelica roots and cypress.</p>
          </TabsContent>
          <TabsContent value="ingredients" className="text-muted-foreground leading-relaxed max-w-3xl">
            <p>Alcohol Denat., Fragrance (Parfum), Water\Aqua\Eau, Linalool, Bht, Limonene, Coumarin, Cinnamyl Alcohol, Farnesol, Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde.</p>
          </TabsContent>
          <TabsContent value="shipping" className="text-muted-foreground leading-relaxed max-w-3xl">
            <p>We offer express shipping across Bangladesh. Orders placed before 2 PM are dispatched the same day. Standard delivery takes 2-3 business days within Dhaka, and 3-5 business days outside Dhaka.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
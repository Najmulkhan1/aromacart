"use client";

import { X, ShoppingBag, Minus, Plus, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useRouter, usePathname } from "next/navigation";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
      {/* ব্যাকড্রপ ব্লার */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeCart} />

      {/* কার্ট স্লাইড-ওভার */}
      <div className={`absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-background shadow-2xl transition-transform duration-300 transform flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-border">
          <h2 className="text-xl font-bold">Your Cart ({items.length})</h2>
          <Button variant="ghost" size="icon" onClick={closeCart} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <Button variant="link" onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4">
                {/* ইমেজ রেন্ডার অংশ */}
                <div className="w-20 h-20 bg-secondary/30 rounded-lg overflow-hidden relative border border-border shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.png"; // ইমেজ না পেলে প্লেসহোল্ডার
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-2 py-1"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-medium px-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-2 py-1"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">৳ {(item.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeItem(item.id, item.size)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-secondary/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Subtotal</span>
              <span className="text-xl font-bold text-primary">৳ {total.toLocaleString()}</span>
            </div>
            <Button
              size="lg"
              className="w-full h-14 rounded-full text-lg shadow-xl"
              onClick={() => {
                closeCart();
                router.push(`/${currentLocale}/checkout`);
              }}
            >
              Checkout Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
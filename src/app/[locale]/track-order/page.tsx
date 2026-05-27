"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, XCircle, Loader2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the order data type
type OrderData = {
  _id: string;
  customerDetails: { name: string; phone: string; district: string; address: string };
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/track-order?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found.");
      }
    } catch (err) {
      setError("Failed to fetch order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Determine progress steps based on order status
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStepIndex = order ? steps.indexOf(order.status) : -1;
  const isCancelled = order?.status === "Cancelled";

  return (
    <div className="min-h-screen bg-secondary/10 py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* ── Header ── */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Track Your Order
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Enter your Order ID or the Phone Number you used during checkout to get real-time delivery updates.
          </p>
        </div>

        {/* ── Search Form ── */}
        <div className="bg-background p-6 rounded-3xl border border-border shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Order ID or Phone Number..." 
                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border bg-secondary/20 text-base font-medium focus:border-primary focus:bg-background outline-none transition-all"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all shrink-0">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track Order"}
            </Button>
          </form>
          {error && (
            <p className="text-destructive text-sm font-semibold mt-4 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> {error}
            </p>
          )}
        </div>

        {/* ── Tracking Result ── */}
        {order && (
          <div className="bg-background rounded-3xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Order Info Header */}
            <div className="p-6 md:p-8 border-b border-border bg-secondary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Order Reference</p>
                <h2 className="text-2xl font-black font-mono text-primary uppercase">
                  #{order._id.slice(-8)}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Amount</p>
                <h2 className="text-2xl font-black">৳ {order.totalAmount.toLocaleString()}</h2>
              </div>
            </div>

            {/* Tracking Progress Section */}
            <div className="p-6 md:p-10">
              {isCancelled ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-destructive mb-2">Order Cancelled</h3>
                  <p className="text-muted-foreground">Unfortunately, this order has been cancelled. Please contact support if you think this is a mistake.</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-secondary md:-translate-x-1/2 rounded-full hidden md:block"></div>
                  
                  <div className="space-y-8 relative z-10">
                    {steps.map((step, index) => {
                      const isCompleted = currentStepIndex >= index;
                      const isCurrent = currentStepIndex === index;
                      
                      return (
                        <div key={step} className={`flex items-center md:justify-between gap-6 md:gap-0 ${isCompleted ? "opacity-100" : "opacity-40"}`}>
                          
                          {/* Desktop Left Side (Date - optional) */}
                          <div className="hidden md:block w-1/2 pr-12 text-right">
                            {isCompleted && <p className="text-sm font-bold text-muted-foreground">Status Updated</p>}
                          </div>

                          {/* Icon Circle */}
                          <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background z-10 shadow-sm transition-colors ${
                            isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                            {index === 0 && <Package className="w-5 h-5" />}
                            {index === 1 && <Loader2 className={`w-5 h-5 ${isCurrent ? "animate-spin" : ""}`} />}
                            {index === 2 && <Truck className="w-5 h-5" />}
                            {index === 3 && <CheckCircle2 className="w-5 h-5" />}
                          </div>

                          {/* Right Side (Content) */}
                          <div className="md:w-1/2 md:pl-12">
                            <h4 className={`text-lg font-black ${isCurrent ? "text-primary" : "text-foreground"}`}>
                              {step}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {index === 0 && "We have received your order."}
                              {index === 1 && "Your order is being packed."}
                              {index === 2 && "Package is handed over to courier."}
                              {index === 3 && "Order delivered successfully!"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Details Footer */}
            <div className="bg-secondary/10 p-6 border-t border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Delivery Address</h4>
                <p className="font-semibold text-foreground">{order.customerDetails.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  {order.customerDetails.address}, {order.customerDetails.district}
                </p>
                <p className="text-sm text-muted-foreground font-mono mt-1">{order.customerDetails.phone}</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation"; // useRouter ইমপোর্ট করা হলো
import Link from "next/link";
import { 
  CheckCircle2, Copy, ArrowRight, Package, Home, Check, 
  Truck, Clock, Sparkles, Gift, MapPinned, Bike, 
  Box, Loader2, ShoppingBag, MoveRight, Warehouse,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করা হলো
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";
  const orderId = searchParams.get("orderId");
  
  const [copied, setCopied] = useState(false);
  const [animationStage, setAnimationStage] = useState(0); 
  const [bikePosition, setBikePosition] = useState(0);
  const [packingProgress, setPackingProgress] = useState(0);
  const [particles, setParticles] = useState<{ left: string; top: string; duration: string; delay: string }[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 5}s`,
        delay: `${Math.random() * 5}s`,
      }))
    );
  }, []);

  // === সিকিউরিটি চেক: যদি orderId না থাকে, তবে হোম পেজে রিডাইরেক্ট করবে ===
  useEffect(() => {
    if (!orderId) {
      router.push("/"); // orderId না পেলে সাথে সাথে হোমে পাঠিয়ে দেবে
    }
  }, [orderId, router]);

  // যদি orderId না থাকে, তবে পেজটি রেন্ডার হওয়া বন্ধ রাখবে (রিডাইরেক্ট হওয়ার আগ পর্যন্ত ব্ল্যাংক দেখাবে)
  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // --- আপনার বাকি অ্যানিমেশন লজিক (অপরিবর্তিত) ---
  useEffect(() => {
    if (animationStage === 0) {
      const interval = setInterval(() => {
        setPackingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAnimationStage(1), 500);
            return 100;
          }
          return prev + 4;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [animationStage]);

  useEffect(() => {
    if (animationStage === 2) {
      const animateBike = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = (timestamp - startTimeRef.current) / 1000;
        let newPosition = (elapsed * 12) % 100;
        setBikePosition(newPosition);
        animationRef.current = requestAnimationFrame(animateBike);
      };
      animationRef.current = requestAnimationFrame(animateBike);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [animationStage]);

  useEffect(() => {
    if (animationStage === 1) {
      const timer = setTimeout(() => setAnimationStage(2), 1800);
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- আপনার সম্পূর্ণ UI রিটার্ন (অপরিবর্তিত) ---
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট - মডার্ন ডার্ক থিম */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-emerald-500/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-emerald-400/10 rounded-full blur-3xl -z-10" />

      {/* স্নো/পার্টিকল ইফেক্ট */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl p-6 md:p-10 text-center relative z-10 transition-all duration-500">
        
        {/* সাকসেস আইকন ও স্ট্যাটাস */}
        <div className="mb-6">
          {animationStage === 0 && (
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto relative">
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-ping" />
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
            </div>
          )}
          {animationStage === 1 && (
            <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto relative">
              <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full animate-ping" style={{ animationDuration: '1s' }} />
              <Package className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>
          )}
          {animationStage === 2 && (
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto relative">
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
          )}
        </div>

        {/* টেক্সট সেকশন */}
        <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          {animationStage === 0 && "Packing Your Order..."}
          {animationStage === 1 && "Loading on Bike 🚴"}
          {animationStage === 2 && "Order Confirmed! 🎉"}
        </h1>
        <p className="text-white/60 mb-6 text-sm md:text-base leading-relaxed max-w-md mx-auto">
          {animationStage === 0 && "Carefully packing your premium fragrances with love & care."}
          {animationStage === 1 && "Your order is being loaded onto the delivery bike."}
          {animationStage === 2 && "Thank you for shopping with AromaCart. Your order is on the way!"}
        </p>

        {/* অর্ডার আইডি বক্স */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 flex flex-col items-center gap-3 transition-all hover:border-emerald-500/30 shadow-sm backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <Package className="w-4 h-4" /> Order Reference
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-xl md:text-2xl bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              {orderId || "Processing..."}
            </span>
            {orderId && animationStage === 2 && (
              <button
                onClick={copyToClipboard}
                className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-emerald-400 hover:border-emerald-500/50 transition-all active:scale-95 shadow-sm"
                title="Copy Order ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          {copied && <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest animate-pulse">Copied to clipboard ✨</span>}
        </div>

        {/* ========== ইউনিক অ্যানিমেশন সেকশন ========== */}
        <div className="mb-8 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-6 border border-white/10 shadow-inner overflow-hidden backdrop-blur-sm">
          
          {/* স্টেজ 0: প্যাকিং অ্যানিমেশন - বক্সে অর্ডার ভর্তি */}
          {animationStage === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                {/* অর্ডার আইটেমগুলো বক্সে যাচ্ছে */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-800/40 to-amber-900/40 rounded-2xl border-2 border-amber-500/50 shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <Box className="w-16 h-16 text-amber-400/70" />
                    {/* প্যাকিং প্রগ্রেস ইফেক্ট */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-100"
                      style={{ width: `${packingProgress}%` }}
                    />
                  </div>
                  {/* ফ্লোটিং আইটেম */}
                  {packingProgress < 80 && (
                    <>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '0.8s' }}>
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.3s' }}>
                        <Gift className="w-3 h-3 text-white" />
                      </div>
                    </>
                  )}
                </div>
                
                {/* অ্যারো ইন্ডিকেটর */}
                <MoveRight className="w-6 h-6 text-white/40 animate-pulse" />
                
                {/* প্যাকিং স্ট্যাটাস */}
                <div className="text-left">
                  <p className="text-white/80 text-sm font-medium">Packing Progress</p>
                  <div className="w-48 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-100"
                      style={{ width: `${packingProgress}%` }}
                    />
                  </div>
                  <p className="text-emerald-400 text-xs mt-2 font-mono">{packingProgress}% completed</p>
                </div>
              </div>
              <p className="text-white/50 text-xs">✨ Adding extra fragrance samples & gift wrapping...</p>
            </div>
          )}

          {/* স্টেজ 1: বাইকে লোডিং অ্যানিমেশন */}
          {animationStage === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* প্যাক করা বক্স */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-800/40 to-emerald-900/40 rounded-xl border-2 border-emerald-500/50 shadow-2xl flex items-center justify-center animate-pulse">
                    <Package className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
                
                {/* লোডিং অ্যানিমেশন */}
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                  <p className="text-white/60 text-xs mt-2">Loading...</p>
                </div>
                
                {/* বাইক */}
                <div className="relative">
                  <div className="w-28 h-20 bg-gradient-to-br from-emerald-700/40 to-emerald-800/40 rounded-xl border border-emerald-500/30 flex items-center justify-center">
                    <Bike className="w-12 h-12 text-emerald-400" />
                  </div>
                  {/* চাকা স্পিন */}
                  <div className="absolute -bottom-1 left-2 w-3 h-3 bg-white/40 rounded-full animate-spin" style={{ animationDuration: '0.4s' }} />
                  <div className="absolute -bottom-1 right-2 w-3 h-3 bg-white/40 rounded-full animate-spin" style={{ animationDuration: '0.4s' }} />
                </div>
              </div>
              <p className="text-amber-400/80 text-xs animate-pulse">📦 Package is being secured on the delivery bike...</p>
            </div>
          )}

          {/* স্টেজ 2: বাইক রাইডিং অ্যানিমেশন - ইনফিনিট */}
          {animationStage === 2 && (
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-5">
                <Bike className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold uppercase tracking-wide text-emerald-400">Live Delivery Tracking</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>

              {/* রাস্তা ও বাইক অ্যানিমেশন কন্টেইনার */}
              <div className="relative mb-8 mt-4 px-2">
                {/* রাস্তার ব্যাকগ্রাউন্ড */}
                <div className="absolute top-1/2 left-0 w-full h-3 bg-white/10 rounded-full -translate-y-1/2" />
                
                {/* ড্যাশড লাইন */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2">
                  <div className="w-full h-full bg-emerald-400/40" style={{ 
                    backgroundImage: 'repeating-linear-gradient(90deg, #10b981, #10b981 15px, transparent 15px, transparent 30px)',
                    backgroundSize: '30px 100%'
                  }} />
                </div>

                {/* ট্র্যাক লাইট ইফেক্ট */}
                <div className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 pointer-events-none">
                  <div 
                    className="absolute top-1/2 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl -translate-y-1/2 transition-all duration-100"
                    style={{ left: `calc(${bikePosition}% - 32px)` }}
                  />
                </div>

                {/* বাইক (ইনফিনিট রাইডিং) */}
                <div 
                  className="absolute -top-5 transition-all duration-[30ms] ease-linear z-20"
                  style={{ left: `calc(${bikePosition}% - 35px)` }}
                >
                  <div className="relative group">
                    <div className="flex items-end gap-1">
                      {/* বাইক */}
                      <div className="relative">
                        <div className="w-14 h-11 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                          <Bike className="w-8 h-8 text-white" />
                        </div>
                        {/* স্পিনিং চাকা */}
                        <div className="absolute -bottom-1 left-1.5 w-3 h-3 bg-gray-800 rounded-full animate-spin" style={{ animationDuration: '0.3s' }} />
                        <div className="absolute -bottom-1 right-1.5 w-3 h-3 bg-gray-800 rounded-full animate-spin" style={{ animationDuration: '0.3s' }} />
                      </div>
                      {/* ডেলিভারি বক্স */}
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-md flex items-center justify-center -ml-1 mt-2 animate-bounce" style={{ animationDuration: '0.8s' }}>
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {/* স্পিড ইফেক্ট */}
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: '0.4s' }} />
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: '0.4s', animationDelay: '0.15s' }} />
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{ animationDuration: '0.4s', animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>

                {/* লোকেশন মার্কার */}
                <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 px-1">
                  <div className="relative flex flex-col items-center" style={{ left: '0%', transform: 'translateX(-50%)' }}>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white/20 shadow-md z-10" />
                    <span className="absolute -bottom-6 text-[10px] font-semibold whitespace-nowrap text-emerald-400">AromaCart Hub</span>
                  </div>
                  <div className="relative flex flex-col items-center" style={{ left: '33%', transform: 'translateX(-50%)' }}>
                    <div className="w-4 h-4 rounded-full bg-amber-500/80 border border-white/20 z-10" />
                    <span className="absolute -bottom-6 text-[9px] font-medium whitespace-nowrap text-white/50">City Sort</span>
                  </div>
                  <div className="relative flex flex-col items-center" style={{ left: '66%', transform: 'translateX(-50%)' }}>
                    <div className="w-4 h-4 rounded-full bg-amber-500/80 border border-white/20 z-10" />
                    <span className="absolute -bottom-6 text-[9px] font-medium whitespace-nowrap text-white/50">Local Hub</span>
                  </div>
                  <div className="relative flex flex-col items-center" style={{ left: '100%', transform: 'translateX(-50%)' }}>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white/20 shadow-md z-10 animate-pulse" />
                    <span className="absolute -bottom-6 text-[10px] font-semibold whitespace-nowrap text-emerald-400">Your Home 🏠</span>
                  </div>
                </div>
              </div>

              {/* ডেলিভারি মেসেজ */}
              <div className="mt-8 pt-2 text-center">
                <p className="text-sm font-medium text-emerald-400 bg-emerald-500/10 inline-block px-5 py-2 rounded-full backdrop-blur-sm">
                  🚴‍♂️ Delivery rider is speeding! Your package will arrive soon...
                </p>
                <div className="mt-3 text-xs text-white/40 flex items-center justify-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>Estimated delivery: 10-20 minutes</span>
                  <MapPinned className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* অ্যাকশন বাটন - শুধুমাত্র অ্যানিমেশন শেষ হলে দেখাবে */}
        {animationStage === 2 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn">
            <Button asChild variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 font-semibold group transition-all duration-300">
              <Link href={`/${currentLocale}`} className="flex items-center">
                <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Back to Home
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:scale-[1.02] active:scale-95">
              <Link href={`/${currentLocale}/shop`} className="flex items-center">
                Continue Shopping <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}

        {/* লোডিং ইন্ডিকেটর */}
        {(animationStage === 0 || animationStage === 1) && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        {/* হেল্প টেক্সট */}
        <p className="text-[11px] text-white/30 mt-8 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Need help? Contact support@aromcart.com
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-emerald-900/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-white/60 animate-pulse">Loading your order details...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
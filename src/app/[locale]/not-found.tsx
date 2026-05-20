"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 via-rose-50/30 to-slate-50 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl -z-10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full bg-card/50 backdrop-blur-xl rounded-3xl border border-border shadow-2xl p-8 md:p-12 text-center relative z-10">
        
        {/* 404 Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-rose-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <span 
              className="text-6xl font-black bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              404
            </span>
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Page Not Found
        </h1>
        
        {/* Description */}
        <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Suggestions */}
        <div className="bg-secondary/30 border border-border/50 rounded-2xl p-6 mb-8">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Here's what you can do:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Check the URL for typos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Go back to the previous page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Visit our homepage or shop</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild 
            variant="outline" 
            className="w-full sm:w-auto h-12 px-6 rounded-2xl font-semibold group"
          >
            <Link href="javascript:history.back()" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>
          </Button>
          
          <Button 
            asChild 
            className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <Link href="/" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground mt-8 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Need help? Contact us at support@aromacart.com
        </p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

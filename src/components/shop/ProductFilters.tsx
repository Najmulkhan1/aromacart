"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Flame, Wind, Flower2, Sun, Citrus, Sparkles, Users, ChevronDown } from "lucide-react";

const scentFamilies = [
  { name: "Woody", icon: Flame, color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-500/10" },
  { name: "Floral", icon: Flower2, color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-500/10" },
  { name: "Oriental", icon: Sparkles, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
  { name: "Fresh", icon: Wind, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10" },
  { name: "Citrus", icon: Citrus, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
  { name: "Spicy", icon: Sun, color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10" },
];
const genders = [
  { name: "Men", emoji: "👨" },
  { name: "Women", emoji: "👩" },
  { name: "Unisex", emoji: "✨" },
];

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([2000, 15000]);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    scent: true,
    gender: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full space-y-1">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-black tracking-tight uppercase">Filters</h2>
      </div>

      {/* Price Range Filter */}
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Price Range</h3>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.price && (
          <div className="px-4 pb-4 pt-1 space-y-4">
            <Slider 
              value={priceRange} 
              onValueChange={(val) => setPriceRange(val as number[])}
              max={20000} 
              min={500}
              step={500} 
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-secondary/60 px-2.5 py-1 rounded-lg text-foreground">৳{priceRange[0].toLocaleString()}</span>
              <div className="flex-1 h-px bg-border/50 mx-3" />
              <span className="text-xs font-bold bg-secondary/60 px-2.5 py-1 rounded-lg text-foreground">৳{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Scent Family Filter */}
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <button 
          onClick={() => toggleSection('scent')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Scent Family</h3>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedSections.scent ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.scent && (
          <div className="px-4 pb-4 pt-1 space-y-2">
            {scentFamilies.map(({ name, icon: Icon, color, bg }) => (
              <label
                key={name}
                htmlFor={`scent-${name}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer group"
              >
                <Checkbox id={`scent-${name}`} className="border-border/80" />
                <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <button 
          onClick={() => toggleSection('gender')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            Gender
          </h3>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedSections.gender ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.gender && (
          <div className="px-4 pb-4 pt-1 grid grid-cols-3 gap-2">
            {genders.map(({ name, emoji }) => (
              <label
                key={name}
                htmlFor={`gender-${name}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-center group"
              >
                <Checkbox id={`gender-${name}`} className="hidden" />
                <span className="text-lg">{emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  {name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button className="w-full mt-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-border/40 transition-all">
        Reset All
      </button>
    </div>
  );
}
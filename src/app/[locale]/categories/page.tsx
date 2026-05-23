import Link from "next/link";
import { ArrowRight, Grid2X2 } from "lucide-react";

// ডেমো ক্যাটাগরি ডাটা
const CATEGORIES = [
  { id: "perfume", name: "Premium Perfumes", desc: "Luxury imported fragrances", image: "https://via.placeholder.com/600x800?text=Perfumes", count: "120+ Items" },
  { id: "attar", name: "Authentic Attars", desc: "Pure non-alcoholic concentrated oils", image: "https://via.placeholder.com/600x800?text=Attars", count: "85+ Items" },
  { id: "combo", name: "Gift & Combos", desc: "Perfect premium gift packages", image: "https://via.placeholder.com/600x800?text=Combos", count: "24 Packages" },
  { id: "traditional", name: "Traditional Items", desc: "Heritage and cultural products", image: "https://via.placeholder.com/600x800?text=Traditional", count: "45+ Items" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ── Header ── */}
      <div className="bg-secondary/30 py-16 px-4 md:px-8 border-b border-border text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center justify-center gap-3">
          <Grid2X2 className="w-10 h-10 text-primary" /> All Collections
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore our wide range of categories curated specially for your premium taste.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              href={`/en/shop?category=${category.id}`} // Shop পেজে ফিল্টার করার লিংক
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-border shadow-sm block"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-secondary">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/90 px-3 py-1 rounded-full mb-3 inline-block">
                  {category.count}
                </span>
                <h2 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">
                  {category.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-2 transition-transform">
                  Explore Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
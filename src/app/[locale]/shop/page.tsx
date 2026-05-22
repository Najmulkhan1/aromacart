import { Suspense } from "react";
import ShopLoading from "./loading";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { SlidersHorizontal, Sparkles, ArrowUpDown, LayoutGrid, List } from "lucide-react";

// ডাটাবেস কানেকশনের জন্য ইম্পোর্ট
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductCard } from "@/components/shop/ProductCard";

// ১. মূল ডাটা ফেচিং কম্পোনেন্ট (এটি সরাসরি ডাটাবেস থেকে রিয়েল-টাইম ডাটা আনবে)
async function ShopContent({ locale }: { locale: string }) {
  // ডাটাবেস কানেক্ট করা হচ্ছে
  await connectDB();

  // ড্রাফট (Draft) অবস্থায় নেই এমন সব প্রোডাক্ট ডাটাবেস থেকে আনা হচ্ছে
  const products = await Product.find({ status: { $ne: "Draft" } }).sort({ createdAt: -1 });

  // Count scent families for stats
  const scentCounts: Record<string, number> = {};
  products.forEach(p => {
    scentCounts[p.scentFamily] = (scentCounts[p.scentFamily] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-background">
      
      {/* ═══ Hero Banner ═══ */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl" style={{ background: "radial-gradient(circle, #c9956a 0%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl" style={{ background: "radial-gradient(circle, #d4a853 0%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.03] blur-3xl" style={{ background: "radial-gradient(circle, #e8b4b8 0%, transparent 70%)" }} />

        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                {locale === "bn" ? "প্রিমিয়াম কালেকশন" : "Premium Collection"}
              </span>
            </div>

            {/* Title */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {locale === "bn" ? (
                <>আপনার স্বপ্নের <span className="bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">সুগন্ধি</span> খুঁজুন</>
              ) : (
                <>Discover Your <span className="bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">Signature</span> Scent</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
              {locale === "bn"
                ? `আমাদের ${products.length}টি এক্সক্লুসিভ ফ্র্যাগ্রেন্স থেকে আপনার পছন্দের সুগন্ধি বেছে নিন`
                : `Explore ${products.length} handcrafted luxury fragrances, each telling a unique olfactory story`}
            </p>

            {/* Scent family quick pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Object.entries(scentCounts).map(([family, count]) => (
                <span
                  key={family}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary/80 hover:text-foreground px-3 py-1.5 rounded-full border border-border/40 transition-all cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {family}
                  <span className="text-[10px] text-muted-foreground/60 font-bold">({count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Toolbar ═══ */}
      <section className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Left: Product count */}
            <p className="text-xs font-semibold text-muted-foreground hidden sm:block">
              {locale === "bn" 
                ? `মোট ${products.length}টি পারফিউম দেখাচ্ছে`
                : `Showing ${products.length} fragrances`}
            </p>

            {/* Center/Right: Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Mobile filter toggle */}
              <button className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/60 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {locale === "bn" ? "ফিল্টার" : "Filters"}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  defaultValue="newest"
                  className="appearance-none pl-8 pr-8 py-2 rounded-xl border border-border/60 bg-transparent text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all outline-none cursor-pointer"
                >
                  <option value="newest">{locale === "bn" ? "নতুন আগে" : "Newest First"}</option>
                  <option value="price-low">{locale === "bn" ? "কম দাম" : "Price: Low → High"}</option>
                  <option value="price-high">{locale === "bn" ? "বেশি দাম" : "Price: High → Low"}</option>
                  <option value="popular">{locale === "bn" ? "জনপ্রিয়" : "Most Popular"}</option>
                </select>
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-border/60 rounded-xl overflow-hidden">
                <button className="p-2 bg-primary/10 text-primary">
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Main Content ═══ */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex gap-8 lg:gap-10">
          
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-[260px] shrink-0">
            <div className="sticky top-20">
              <ProductFilters />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="h-80 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-8 h-8 text-primary/40 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {locale === "bn" ? "কোনো পণ্য পাওয়া যায়নি" : "No Fragrances Found"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {locale === "bn"
                    ? "আমাদের নতুন কালেকশন শীঘ্রই আসছে। ফিল্টার পরিবর্তন করে দেখুন।"
                    : "Our new collection is coming soon. Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product._id.toString()} 
                    title={locale === "bn" ? product.nameBn : product.nameEn} 
                    price={`৳${product.regularPrice.toLocaleString()}`} 
                    compareAtPrice={product.compareAtPrice ? `৳${product.compareAtPrice.toLocaleString()}` : undefined}
                    category={product.scentFamily} 
                    href={`/${locale}/shop/${product.slug}`} 
                    image={product.images?.[0]}
                    isFeatured={product.isFeatured}
                  />
                ))}
              </div>
            )}

            {/* Bottom CTA / Load more */}
            {products.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {locale === "bn"
                    ? `${products.length}টি পারফিউমের মধ্যে সব দেখানো হচ্ছে`
                    : `Showing all ${products.length} fragrances`}
                </p>
                <div className="w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto" />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ২. মেইন পেজ কম্পোনেন্ট
interface ShopPageProps {
  params: { locale: string };
}

export default async function ShopPage({ params }: ShopPageProps) {
  // Next.js 14-এর নতুন নিয়ম অনুযায়ী params কে await করে নেওয়া হলো
  const { locale } = await params;

  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent locale={locale} />
    </Suspense>
  );
}
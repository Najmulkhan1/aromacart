import { notFound } from "next/navigation";
import { Shield, Truck, RotateCcw, Sparkles, Droplets, Award, PackageCheck, Flame, Compass } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInteractiveSection } from "@/components/shop/ProductInteractiveSection";
import { ProductGallery } from "@/components/shop/ProductGallery";
import ProductReviews from "@/components/shop/ProductReviews";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function ProductDetailsPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = await params;

  await connectDB();
  const rawProduct = await Product.findOne({ slug, status: { $ne: "Draft" } });

  if (!rawProduct) notFound();

  // Convert Mongoose Document to clean plain JSON object
  const product = JSON.parse(JSON.stringify(rawProduct));

  const title = locale === "bn" ? product.nameBn : product.nameEn;
  const description =
    locale === "bn" ? product.descriptionBn : product.descriptionEn;

  const sizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes.map((s: any) => ({
          size: String(s.size || s.label || `${s.ml}ml` || "50ml"),
          price: Number(s.price || product.regularPrice),
        }))
      : [
          { size: "30ml", price: product.regularPrice },
          { size: "50ml", price: product.regularPrice + 2500 },
          { size: "100ml", price: product.regularPrice + 5000 },
        ];

  const galleryImages = product.images ? product.images.map((img: any) => String(img)) : [];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Premium Ambient Background Light */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[30%] left-[10%] w-[60vw] h-[60vw] rounded-full opacity-[0.08] dark:opacity-[0.12] blur-[140px]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-[0.05] dark:opacity-[0.08] blur-[120px]"
          style={{ background: "radial-gradient(circle, #d4a853 0%, transparent 60%)" }}
        />
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── Left: Image Gallery (Span 6) ── */}
            <div className="lg:col-span-6 w-full">
              <div className="relative group">
                <ProductGallery images={galleryImages} isFeatured={product.isFeatured} />
              </div>
            </div>

            {/* ── Right: Product Info (Span 6) ── */}
            <div className="lg:col-span-6 flex flex-col gap-0">
              
              {/* Category & Badge Row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  {product.scentFamily || "Fragrance"} Family
                </span>
                
                {product.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    <Flame className="w-3 h-3" />
                    Best Seller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-foreground mb-4 leading-[1.15]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {title}
              </h1>

              {/* Rating Summary (Premium styling) */}
              <div className="flex items-center gap-3 mb-6 bg-secondary/30 w-fit px-4 py-2 rounded-2xl border border-border/40 backdrop-blur-sm">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground/40">|</span>
                <span className="text-xs font-bold text-foreground/70 uppercase tracking-widest">
                  {locale === "bn" ? "প্রিমিয়াম কালেকশন" : "Premium Collection"}
                </span>
              </div>

              {/* Short description */}
              {description && (
                <div className="relative">
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-xl italic font-serif">
                    " {description.length > 200
                      ? description.slice(0, 200) + "…"
                      : description} "
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Interactive Section */}
              <div className="relative bg-gradient-to-b from-card to-card/50 border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary/5 backdrop-blur-md">
                <ProductInteractiveSection
                  sizes={sizes}
                  basePrice={product.regularPrice}
                  compareAtPrice={product.compareAtPrice}
                  locale={locale}
                  scentNotes={{
                    top: product.scentNotes?.top || "",
                    heart: product.scentNotes?.heart || "",
                    base: product.scentNotes?.base || ""
                  }}
                  productInfo={{
                    id: product._id.toString(),
                    name: title,
                    image: product.images?.[0] || "/placeholder-perfume.jpg",
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Scent Journey Banner (Premium Luxury Redesign) ── */}
      <section className="relative border-y border-border/50 bg-secondary/10 dark:bg-secondary/5 py-12 overflow-hidden z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-16">
            
            <div className="text-center xl:text-left shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                {locale === "bn" ? "সুগন্ধির অভিযাত্রা" : "The Scent Journey"}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {locale === "bn"
                  ? "তিনটি অনন্য স্তরে অনুভব করুন"
                  : "Experience in Three Elegant Layers"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                {locale === "bn" 
                  ? "আমাদের পারফিউমের ধীর সুগন্ধি বিচ্ছুরণ প্রতিটি মুহূর্তকে করে তোলে অনন্য।" 
                  : "Our masterfully blended layers slowly unveil over time to craft a signature sensory signature."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
              {[
                {
                  layer: locale === "bn" ? "টপ নোট" : "Top Note",
                  note: product.scentNotes?.top || "Citrus",
                  time: "0–30 min",
                  color: "from-amber-500/10 to-amber-500/0 border-amber-500/20",
                  dot: "bg-amber-400 shadow-amber-400/40",
                  desc: locale === "bn" ? "প্রথম ইম্প্রেশন" : "First Impression",
                },
                {
                  layer: locale === "bn" ? "হার্ট নোট" : "Heart Note",
                  note: product.scentNotes?.heart || "Floral",
                  time: "30 min–4 hr",
                  color: "from-rose-500/10 to-rose-500/0 border-rose-500/20",
                  dot: "bg-rose-400 shadow-rose-400/40",
                  desc: locale === "bn" ? "মূল সুবাসের সুউচ্চ ব্যক্তিত্ব" : "The Soul of Fragrance",
                },
                {
                  layer: locale === "bn" ? "বেস নোট" : "Base Note",
                  note: product.scentNotes?.base || "Woody",
                  time: "4–8+ hr",
                  color: "from-primary/10 to-primary/0 border-primary/20",
                  dot: "bg-primary shadow-primary/40",
                  desc: locale === "bn" ? "দীর্ঘস্থায়ী আভিজাত্য" : "Timeless Memory",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden group flex flex-col p-6 rounded-3xl bg-gradient-to-b ${item.color} border border-border/80 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/5`}
                >
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-foreground/[0.03] text-[10px] font-black flex items-center justify-center border border-border/30 text-foreground/40">
                    {i + 1}
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full ${item.dot} shadow-[0_0_10px_2px_currentColor] mx-auto mb-4 animate-pulse`} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    {item.layer}
                  </p>
                  <h4 className="text-lg font-bold text-foreground mb-0.5 tracking-tight group-hover:text-primary transition-colors">
                    {item.note}
                  </h4>
                  <p className="text-[10px] text-muted-foreground/60 mb-3 uppercase tracking-wider font-semibold">
                    {item.desc}
                  </p>
                  <div className="mt-auto inline-block mx-auto px-3 py-1 rounded-full bg-secondary/80 text-[10px] font-bold text-foreground/75 tracking-wider border border-border/50">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Info Tabs & Features ── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Tabs Details (Span 8) */}
          <div className="lg:col-span-8 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-border/40 rounded-none h-auto p-0 bg-transparent mb-8 overflow-x-auto flex-nowrap gap-4">
                {[
                  {
                    value: "description",
                    label: locale === "bn" ? "বিবরণ" : "Description",
                  },
                  {
                    value: "ingredients",
                    label: locale === "bn" ? "উপাদান" : "Ingredients",
                  },
                  {
                    value: "howto",
                    label: locale === "bn" ? "ব্যবহারবিধি" : "How to Use",
                  },
                  {
                    value: "shipping",
                    label: locale === "bn" ? "ডেলিভারি ও রিটার্ন" : "Shipping & Returns",
                  },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-2 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap text-muted-foreground transition-all hover:text-foreground"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <TabsContent value="description" className="animate-in fade-in duration-300">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {description ||
                        (locale === "bn"
                          ? "এই পারফিউমটির বিস্তারিত বিবরণ খুব শীঘ্রই যুক্ত করা হবে।"
                          : "A captivating fragrance that blends timeless elegance with modern sophistication. Each bottle is crafted to deliver a unique olfactory experience that lingers beautifully throughout the day.")}
                    </p>
                    {product.storyEn && (
                      <div className="mt-6 border-l-2 border-primary/50 pl-4 py-1 italic text-muted-foreground">
                        {locale === "bn" ? product.storyBn : product.storyEn}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="ingredients" className="animate-in fade-in duration-300">
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50">
                      <p className="text-sm font-semibold tracking-wider text-foreground mb-3 uppercase">
                        {locale === "bn" ? "মূল উপাদানসমূহ" : "Active Formula"}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                        Alcohol Denat., Fragrance (Parfum), Water (Aqua/Eau), Linalool,
                        BHT, Limonene, Coumarin, Cinnamyl Alcohol, Farnesol,
                        Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
                        ⚠️
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-1">
                          {locale === "bn" ? "সংবেদনশীল ত্বকের জন্য সতর্কতা" : "Patch Test Recommended"}
                        </p>
                        <p className="text-xs text-muted-foreground/90">
                          {locale === "bn"
                            ? "ত্বকের কোনো অ্যালার্জি এড়াতে পূর্ণ ব্যবহারের পূর্বে ত্বকের একটি ছোট্ট অংশে পরীক্ষা করুন।"
                            : "Apply a small amount to your inner wrist or elbow and wait 24 hours to ensure skin compatibility."}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="howto" className="animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(locale === "bn"
                      ? [
                          "পালস পয়েন্টে (কব্জি, গলা, কানের পেছনে) স্প্রে করুন।",
                          "ত্বক থেকে ১৫-২০ সেমি দূরে রেখে স্প্রে করুন।",
                          "স্প্রে করার পর ঘষবেন না — সুগন্ধি স্বাভাবিকভাবে মিশতে দিন।",
                          "দীর্ঘস্থায়ী সুগন্ধির জন্য আনসেন্টেড ময়েশ্চারাইজার লাগান আগে।",
                        ]
                      : [
                          "Apply to pulse points — wrists, neck, and behind the ears.",
                          "Hold the bottle 15–20 cm away from skin when spraying.",
                          "Do not rub after application; let the fragrance blend naturally.",
                          "For longer-lasting scent, apply unscented moisturizer beforehand.",
                        ]
                    ).map((tip, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/40 hover:border-primary/20 transition-all duration-300">
                        <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="animate-in fade-in duration-300">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: Truck,
                          title: locale === "bn" ? "ঢাকার ভেতরে ডেলিভারি" : "Inside Dhaka Delivery",
                          desc: locale === "bn" ? "২-৩ কার্যদিবস • মাত্র ৳৬০" : "2–3 business days • ৳60 flat",
                        },
                        {
                          icon: Truck,
                          title: locale === "bn" ? "ঢাকার বাইরে ডেলিভারি" : "Outside Dhaka Delivery",
                          desc: locale === "bn" ? "৩-৫ কার্যদিবস • মাত্র ৳১২০" : "3–5 business days • ৳120 flat",
                        },
                        {
                          icon: Shield,
                          title: locale === "bn" ? "নিরাপদ প্যাকেজিং" : "Premium Packaging",
                          desc: locale === "bn" ? "ইনসুল্যাটেড বাবল র‍্যাপ ও প্রিমিয়াম বক্স" : "Bubble-wrapped & secured custom boxes",
                        },
                        {
                          icon: RotateCcw,
                          title: locale === "bn" ? "৭ দিনের রিটার্ন পলিসি" : "7 Days Return Policy",
                          desc: locale === "bn" ? "ডেলিভারির পর অক্ষত অবস্থায় রিটার্ন সম্ভব" : "Hassle-free returns on unopened items",
                        },
                      ].map(({ icon: Icon, title, desc }) => (
                        <div
                          key={title}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/40 hover:border-border transition-colors duration-200"
                        >
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground mb-0.5">
                              {title}
                            </p>
                            <p className="text-xs text-muted-foreground/90 font-medium">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Quick Perks Sidebar (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                <Award className="w-5 h-5 text-primary animate-pulse" />
                {locale === "bn" ? "আমাদের প্রতিশ্রুতি" : "AromaCart Promise"}
              </h3>
              
              <ul className="space-y-5">
                {[
                  {
                    icon: Award,
                    title: locale === "bn" ? "১০০% অরিজিনাল প্রোডাক্ট" : "100% Authentic Products",
                    desc: locale === "bn" ? "সরাসরি ব্রান্ড ও অনুমোদিত ডিস্ট্রিবিউটর থেকে আমদানিকৃত।" : "Sourced directly from global luxury fragrance houses.",
                  },
                  {
                    icon: Droplets,
                    title: locale === "bn" ? "দীর্ঘস্থায়ী সুবাস সুনিশ্চিত" : "Superior Longevity Guaranteed",
                    desc: locale === "bn" ? "উচ্চমানের এসেনশিয়াল অয়েল মিশ্রিত পারফিউম।" : "Enriched with high oil concentrations for unmatched sillage.",
                  },
                  {
                    icon: PackageCheck,
                    title: locale === "bn" ? "নিরাপদ ও দ্রুত ডেলিভারি" : "Safe & Fast Express Delivery",
                    desc: locale === "bn" ? "প্রতিটি প্রোডাক্ট যত্ন সহকারে প্যাকেজ করা হয়।" : "Delivered safely in custom boxes to preserve bottle integrity.",
                  },
                ].map((perk, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <perk.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">{perk.title}</h4>
                      <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">{perk.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── Real Reviews Section ── */}
      <section className="border-t border-border/40 relative z-10">
        <ProductReviews productId={product._id.toString()} locale={locale} />
      </section>
      
    </div>
  );
}

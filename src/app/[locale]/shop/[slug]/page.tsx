import { notFound } from "next/navigation";
import { Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInteractiveSection } from "@/components/shop/ProductInteractiveSection";
import { ProductGallery } from "@/components/shop/ProductGallery";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function ProductDetailsPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = await params;

  await connectDB();
  const product = await Product.findOne({ slug, status: { $ne: "Draft" } });

  if (!product) notFound();

  const title = locale === "bn" ? product.nameBn : product.nameEn;
  const description =
    locale === "bn" ? product.descriptionBn : product.descriptionEn;

  const sizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes.map((s) => ({ size: s.size, price: s.price }))
      : [
          { size: "30ml", price: product.regularPrice },
          { size: "50ml", price: product.regularPrice + 2500 },
          { size: "100ml", price: product.regularPrice + 5000 },
        ];

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Decorative background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #c9956a 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #d4a853 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ── Left: Image Gallery ── */}
            <ProductGallery images={product.images || []} isFeatured={product.isFeatured} />

            {/* ── Right: Product Info ── */}
            <div className="flex flex-col gap-0">
              {/* Category pill */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary/80 bg-primary/8 border border-primary/20 px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {product.scentFamily || "Fragrance"} Family
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {title}
              </h1>

              {/* Stars + Review count */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">
                  (124 {locale === "bn" ? "রিভিউ" : "reviews"})
                </span>
                <span className="text-sm text-primary font-medium cursor-pointer hover:underline">
                  {locale === "bn" ? "সব দেখুন" : "See all"}
                </span>
              </div>

              {/* Short description */}
              {description && (
                <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-lg">
                  {description.length > 180
                    ? description.slice(0, 180) + "…"
                    : description}
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Interactive Section */}
              <ProductInteractiveSection
                sizes={sizes}
                basePrice={product.regularPrice}
                compareAtPrice={product.compareAtPrice}
                locale={locale}
                scentNotes={product.scentNotes || {}}
                productInfo={{
                  id: product._id.toString(),
                  name: title,
                  image: product.images?.[0] || "/placeholder-perfume.jpg",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Scent Journey Banner ── */}
      <section className="border-y border-border/50 bg-secondary/20">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 mb-1">
                {locale === "bn" ? "সুগন্ধির যাত্রা" : "The Scent Journey"}
              </p>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {locale === "bn"
                  ? "তিনটি স্তরে অনুভব করুন"
                  : "Experience in Three Layers"}
              </h2>
            </div>
            <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto">
              {[
                {
                  layer: locale === "bn" ? "টপ নোট" : "Top Note",
                  note: product.scentNotes?.top || "Citrus",
                  time: "0–30 min",
                  color: "from-amber-400/20 to-amber-300/5",
                  dot: "bg-amber-400",
                },
                {
                  layer: locale === "bn" ? "হার্ট নোট" : "Heart Note",
                  note: product.scentNotes?.heart || "Floral",
                  time: "30 min–4 hr",
                  color: "from-rose-400/20 to-rose-300/5",
                  dot: "bg-rose-400",
                },
                {
                  layer: locale === "bn" ? "বেস নোট" : "Base Note",
                  note: product.scentNotes?.base || "Woody",
                  time: "4–8+ hr",
                  color: "from-primary/20 to-primary/5",
                  dot: "bg-primary",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex-1 md:flex-none p-4 rounded-2xl bg-gradient-to-b ${item.color} border border-border/40 text-center min-w-[100px]`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${item.dot} mx-auto mb-2`}
                  />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    {item.layer}
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {item.note}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Tabs ── */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-10 overflow-x-auto flex-nowrap gap-2">
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
                label: locale === "bn" ? "ডেলিভারি" : "Shipping",
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-6 py-4 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="max-w-3xl">
            <TabsContent value="description">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {description ||
                    (locale === "bn"
                      ? "এই পারফিউমটির বিস্তারিত বিবরণ খুব শীঘ্রই যুক্ত করা হবে।"
                      : "A captivating fragrance that blends timeless elegance with modern sophistication. Each bottle is crafted to deliver a unique olfactory experience that lingers beautifully throughout the day.")}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ingredients">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Alcohol Denat., Fragrance (Parfum), Water (Aqua/Eau), Linalool,
                  BHT, Limonene, Coumarin, Cinnamyl Alcohol, Farnesol,
                  Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde.
                </p>
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    ⚠{" "}
                    {locale === "bn"
                      ? "সংবেদনশীল ত্বকে ব্যবহারের আগে প্যাচ টেস্ট করুন।"
                      : "Patch test recommended for sensitive skin before full application."}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="howto">
              <div className="space-y-4">
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
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Truck,
                      title: locale === "bn" ? "ঢাকার ভেতরে" : "Inside Dhaka",
                      desc:
                        locale === "bn"
                          ? "২-৩ কার্যদিবস • ৳৬০"
                          : "2–3 business days • ৳60",
                    },
                    {
                      icon: Truck,
                      title: locale === "bn" ? "ঢাকার বাইরে" : "Outside Dhaka",
                      desc:
                        locale === "bn"
                          ? "৩-৫ কার্যদিবস • ৳১২০"
                          : "3–5 business days • ৳120",
                    },
                    {
                      icon: Shield,
                      title: locale === "bn" ? "নিরাপদ প্যাকেজিং" : "Secure Packaging",
                      desc:
                        locale === "bn"
                          ? "বাবল র‍্যাপ ও বক্সে প্যাক করা হয়"
                          : "Bubble-wrapped & boxed for safety",
                    },
                    {
                      icon: RotateCcw,
                      title: locale === "bn" ? "রিটার্ন পলিসি" : "Return Policy",
                      desc:
                        locale === "bn"
                          ? "ডেলিভারির ৭ দিনের মধ্যে রিটার্ন"
                          : "Returns accepted within 7 days",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/40"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-0.5">
                          {title}
                        </p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* ── Reviews Snapshot ── */}
      <section className="border-t border-border/50 bg-secondary/10">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Rating summary */}
            <div className="shrink-0 text-center md:text-left">
              <p
                className="text-7xl font-bold text-foreground leading-none mb-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                4.9
              </p>
              <div className="flex items-center justify-center md:justify-start gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {locale === "bn" ? "১২৪টি রিভিউ" : "Based on 124 reviews"}
              </p>
            </div>

            {/* Rating bars */}
            <div className="flex-1 space-y-3 w-full">
              {[
                { stars: 5, pct: 82 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 },
              ].map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4 text-right shrink-0">
                    {stars}
                  </span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-2 rounded-full bg-border/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 shrink-0">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>

            {/* Sample review cards */}
            <div className="flex-1 space-y-4 w-full">
              {[
                {
                  name: "Rafiq A.",
                  rating: 5,
                  text:
                    locale === "bn"
                      ? "অসাধারণ সুগন্ধি! সারাদিন টিকে থাকে। প্যাকেজিংও খুব সুন্দর।"
                      : "Absolutely stunning fragrance. Lasts all day and the packaging is gorgeous.",
                },
                {
                  name: "Nadia K.",
                  rating: 5,
                  text:
                    locale === "bn"
                      ? "এটা আমার এখন পর্যন্ত কেনা সেরা পারফিউম। সবাই জিজ্ঞেস করে কোনটা!"
                      : "Best perfume I've ever bought. Everyone keeps asking what I'm wearing!",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

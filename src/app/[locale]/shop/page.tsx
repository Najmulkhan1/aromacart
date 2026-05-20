import { Suspense } from "react";
import ShopLoading from "./loading";
import { ProductFilters } from "@/components/shop/ProductFilters";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// ডাটাবেস কানেকশনের জন্য ইম্পোর্ট
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ProductCard } from "@/components/shop/ProductCard";

// ১. মূল ডাটা ফেচিং কম্পোনেন্ট (এটি সরাসরি ডাটাবেস থেকে রিয়েল-টাইম ডাটা আনবে)
async function ShopContent({ locale }: { locale: string }) {
  // ডাটাবেস কানেক্ট করা হচ্ছে
  await connectDB();

  // ড্রাফট (Draft) অবস্থায় নেই এমন সব প্রোডাক্ট ডাটাবেস থেকে আনা হচ্ছে
  const products = await Product.find({ status: { $ne: "Draft" } }).sort({ createdAt: -1 });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {locale === "bn" ? "সব পারফিউম" : "All Perfumes"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {locale === "bn"
              ? `আমাদের এক্সক্লুসিভ কালেকশন থেকে আপনার পছন্দের সুগন্ধি বেছে নিন। (মোট ${products.length}টি)`
              : `Explore our exclusive collection of ${products.length} luxury fragrances.`}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="md:hidden flex-1 rounded-xl">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {locale === "bn" ? "ফিল্টার" : "Filters"}
          </Button>

          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-[200px] rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <ProductFilters />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-2xl">
              <p className="text-lg">No products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
    <ProductCard 
      key={product._id.toString()} 
      title={locale === "bn" ? product.nameBn : product.nameEn} 
      price={`৳ ${product.regularPrice.toLocaleString()}`} 
      category={product.scentFamily} 
      href={`/${locale}/shop/${product.slug}`} 
      image={product.images?.[0]} // ডাটাবেসের প্রথম ইমেজটি পাঠানো হচ্ছে
    />
  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ২. মেইন পেজ কম্পোনেন্ট
interface ShopPageProps {
  params: { locale: string };
}

export default async function ShopPage({ params }: ShopPageProps) {
  // Next.js 14-এর নতুন নিয়ম অনুযায়ী params কে await করে নেওয়া হলো
  const { locale } = await params;

  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent locale={locale} />
    </Suspense>
  );
}
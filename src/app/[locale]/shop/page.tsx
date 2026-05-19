import { Suspense } from "react";
import ShopLoading from "./loading"; // আপনার তৈরি করা স্কেলিটন ফাইলটি ইম্পোর্ট করা হলো
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const shopProducts = [
  { id: 1, title: "Oud Wood Intense", price: "৳ 12,500", category: "Woody" },
  { id: 2, title: "Rose Noir", price: "৳ 8,900", category: "Floral" },
  { id: 3, title: "Citrus Grove", price: "৳ 6,500", category: "Citrus" },
  { id: 4, title: "Midnight Amber", price: "৳ 10,200", category: "Oriental" },
  { id: 5, title: "Ocean Breeze", price: "৳ 5,500", category: "Fresh" },
  { id: 6, title: "Spiced Vanilla", price: "৳ 7,800", category: "Spicy" },
];

// ১. মূল ডাটা ফেচিং কম্পোনেন্ট (এটি সার্ভারে রেন্ডার হবে এবং ২ সেকেন্ড সময় নেবে)
async function ShopContent() {
  // ডাটাবেস থেকে ডাটা আসার ফিল দেওয়ার জন্য ২ সেকেন্ডের ফেক ডিলে
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">All Perfumes</h1>
          <p className="text-muted-foreground mt-2">
            Explore our exclusive collection of {shopProducts.length} luxury fragrances.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="md:hidden flex-1">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="best-seller">Best Sellers</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="top-rated">Top Rated</SelectItem>
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
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              title={product.title} 
              price={product.price} 
              category={product.category} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ২. মেইন পেজ: এখানে Suspense ব্যবহার করে স্কেলিটন দেখানো হচ্ছে
export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}
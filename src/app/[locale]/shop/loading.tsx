import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-[200px] rounded-lg" />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters Skeleton */}
        <aside className="hidden md:block w-64 shrink-0 space-y-8">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          
          {[1, 2].map((section) => (
            <div key={section}>
              <Skeleton className="h-[1px] w-full mb-8" />
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Product Grid Skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div key={card} className="rounded-xl overflow-hidden bg-card border">
              {/* Product Image Skeleton */}
              <Skeleton className="aspect-[3/4] w-full rounded-none" />
              
              {/* Product Info Skeleton */}
              <div className="p-5">
                <Skeleton className="h-3 w-16 mb-3" />
                <Skeleton className="h-5 w-4/5 mb-3" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
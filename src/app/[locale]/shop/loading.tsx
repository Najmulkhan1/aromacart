import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="border-b border-border/50">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <Skeleton className="h-7 w-44 mx-auto rounded-full" />
            <Skeleton className="h-14 w-full max-w-md mx-auto rounded-2xl" />
            <Skeleton className="h-5 w-80 mx-auto" />
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar Skeleton */}
      <section className="border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Skeleton className="h-4 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-28 rounded-xl" />
              <Skeleton className="h-8 w-16 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex gap-8 lg:gap-10">
          {/* Sidebar Skeleton */}
          <aside className="hidden md:block w-[260px] shrink-0 space-y-2">
            <div className="flex items-center gap-2 mb-5">
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="h-4 w-16" />
            </div>
            {[1, 2, 3].map(section => (
              <div key={section} className="rounded-2xl border border-border/50 p-4 space-y-3">
                <Skeleton className="h-4 w-24" />
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-7 w-7 rounded-lg" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ))}
          </aside>

          {/* Product Grid Skeleton */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map(card => (
              <div key={card} className="rounded-3xl overflow-hidden bg-card border border-border/50">
                <Skeleton className="aspect-[3/4] w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-4/5" />
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
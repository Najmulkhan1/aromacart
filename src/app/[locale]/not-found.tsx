import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative Elements */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full w-64 h-64 -z-10" />
        <h1 
          className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary to-background opacity-80"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          404
        </h1>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
        Scent Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
        The fragrance you are looking for seems to have evaporated. Let's get you back to our curated collection.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button size="lg" className="rounded-full px-8 h-12 text-base" asChild>
          <Link href="/shop">
            Explore All Perfumes
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base group" asChild>
          <Link href="/">
            <Search className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
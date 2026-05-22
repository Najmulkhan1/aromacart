import Link from 'next/link';
import { Home, SearchX, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-200 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-green-200 dark:bg-green-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-10 sm:p-16 rounded-3xl shadow-2xl border border-white/40 dark:border-gray-800/50">
        
        {/* Icon & 404 text */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100/50 dark:border-emerald-900/30">
              <SearchX className="w-16 h-16 text-emerald-600 dark:text-emerald-400 drop-shadow-md" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-4 py-1 rounded-full shadow-lg border border-emerald-100 dark:border-gray-700 font-mono text-emerald-700 dark:text-emerald-400 font-bold tracking-widest text-sm">
              ERROR 404
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-6 transition-colors">
              Page Not Found
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto transition-colors">
              Oops! The page or product you're looking for doesn't exist, has been removed, or is temporarily unavailable.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-900/20 transition-all hover:-translate-y-0.5 rounded-xl h-14 px-8 text-base font-semibold border-0">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-800 dark:hover:text-white transition-all rounded-xl h-14 px-8 text-base font-semibold">
              <ShoppingBag className="mr-2 w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Think this is a mistake?{' '}
            <Link href="/contact" className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 hover:underline transition-colors">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ['en', 'bn'];

// ১. Next-Intl এর অরিজিনাল মিডলওয়্যার কনফিগারেশন (আপনার আগের কোড)
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

// ২. NextAuth এর সিকিউরিটি কনফিগারেশন (অ্যাডমিন প্যানেল প্রটেক্ট করার জন্য)
const authMiddleware = withAuth(
  function onSuccess(req) {
    // লগইন সাকসেস হলে বা অ্যাডমিন হলে intl মিডলওয়্যারটি রান করবে
    return intlMiddleware(req);
  },
  {
    callbacks: {
      // ইউজারের টোকেন আছে কি না এবং তার রোল 'admin' কি না তা চেক করবে
      authorized: ({ token }) => token?.role === "admin"
    },
    pages: {
      // যদি কেউ লগইন ছাড়া অ্যাডমিনে ঢুকতে চায়, তবে তাকে লগইন পেজে পাঠিয়ে দিবে
      signIn: '/en/login' 
    }
  }
);

// ৩. মেইন মিডলওয়্যার ফাংশন
export default function middleware(req: NextRequest) {
  // চেক করা হচ্ছে URL টি অ্যাডমিন রাউট কি না (যেমন: /en/admin বা /bn/admin/products)
  const isAdminRoute = req.nextUrl.pathname.match(/^\/(en|bn)\/admin(\/.*)?$/);

  if (isAdminRoute) {
    // অ্যাডমিন রাউট হলে প্রথমে Auth চেক করবে
    return (authMiddleware as any)(req);
  } else {
    // পাবলিক রাউট (Home, Shop, Cart ইত্যাদি) হলে সরাসরি Language মিডলওয়্যার রান করবে
    return intlMiddleware(req);
  }
}

export const config = {
  // এটি api, _next এবং স্ট্যাটিক ফাইল বাদে ওয়েবসাইটের যেকোনো রিকোয়েস্টকে ক্যাচ করবে
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
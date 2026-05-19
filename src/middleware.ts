import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // আমাদের সাইটের সাপোর্টেড ভাষা
  locales: ['en', 'bn'],
 
  // ডিফল্ট ভাষা
  defaultLocale: 'en',
  
  // URL এ 'en' হাইড করতে চাইলে (অপশনাল, তবে আপাতত false রাখছি বোঝার সুবিধার জন্য)
  localePrefix: 'always' 
});
 
export const config = {
  // Middleware কোথায় কোথায় কাজ করবে তা বলে দেওয়া হলো (API এবং স্ট্যাটিক ফাইল বাদে)
  matcher: ['/', '/(bn|en)/:path*']
};
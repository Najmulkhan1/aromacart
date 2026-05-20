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
  // এটি api, _next এবং স্ট্যাটিক ফাইল বাদে ওয়েবসাইটের যেকোনো রিকোয়েস্টকে ক্যাচ করবে
  // ফলে ভুল লিংকে গেলেও সেটি 404 পেজে রিডাইরেক্ট হবে
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
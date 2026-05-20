import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
 
const locales = ['en', 'bn'];
 
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as string)) {
    notFound();
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default // <--- এখানে মেসেজ ফোল্ডারের পাথ এখন ../../ হবে যেহেতু ফাইলটি এখন আরেকটা ফোল্ডারের ভেতরে
  };
});
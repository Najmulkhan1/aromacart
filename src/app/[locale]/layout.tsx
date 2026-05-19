import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // পাথ চেক করে নিন (যদি globals.css বাইরে থাকে তবে দুটি ডট ../ হবে)
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AromaCart | Luxury Perfume E-Commerce",
  description: "Discover Your Signature Scent with AromaCart.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // বর্তমান locale-এর জন্য সব মেসেজ সার্ভার থেকে আনা হচ্ছে
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <CartDrawer />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
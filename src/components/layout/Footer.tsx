"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {


  const pathname = usePathname();
  const pathSegments = pathname?.split("/") || [];
  const isAdminPage = pathSegments[1] === "admin" || pathSegments[2] === "admin";

  // যদি অ্যাডমিন পেজ হয়, তবে ফুটার হাইড করে দিবে
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-bold text-2xl tracking-tighter text-primary block mb-4 no-underline"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              AromaCart
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium luxury perfumes and fragrances tailored for connoisseurs in South Asia.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors no-underline"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors no-underline text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors no-underline text-xs font-bold"
                aria-label="Twitter / X"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { href: "/shop", label: "All Perfumes" },
                { href: "/shop?category=best-sellers", label: "Best Sellers" },
                { href: "/shop?gender=men", label: "For Him" },
                { href: "/shop?gender=women", label: "For Her" },
                { href: "/shop?type=gift-sets", label: "Gift Sets" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "FAQs" },
                { href: "/shipping", label: "Shipping Policy" },
                { href: "/returns", label: "Returns & Refunds" },
                { href: "/track", label: "Track Order" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Contact Info</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-3">
              <p>📍 Dhaka, Bangladesh</p>
              <p>
                <a href="mailto:support@aromacart.com" className="hover:text-primary transition-colors no-underline">
                  ✉ support@aromacart.com
                </a>
              </p>
              <p>
                <a href="tel:+8801234567890" className="hover:text-primary transition-colors no-underline">
                  📞 +880 1234 567890
                </a>
              </p>
            </address>

            {/* Payment badges */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-3">We Accept</p>
              <div className="flex gap-2">
                {["Visa", "MC", "bKash", "Nagad"].map((method) => (
                  <span
                    key={method}
                    className="text-[10px] font-semibold px-2 py-1 rounded border border-border text-muted-foreground/70"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AromaCart. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors no-underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors no-underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // রাউটিংয়ের জন্য
import { useTranslations } from "next-intl"; // ট্রান্সলেশনের হুক
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Settings, ListOrdered, ShieldAlert } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCartStore } from "@/store/cartStore";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { openCart, items } = useCartStore();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // JSON ফাইল থেকে ডাটা পড়ার জন্য হুক ব্যবহার করছি
  const t = useTranslations("Navbar");

  // 404 পেজে pathname null হতে পারে, তাই '?' যুক্ত করা হয়েছে
  const currentLocale = pathname?.split("/")[1] || "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ভাষা পরিবর্তনের মূল ফাংশন
  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    // pathname null হলে ডিফল্ট অ্যারে ব্যবহার করবে
    const segments = pathname?.split("/") || ["", currentLocale];
    segments[1] = newLocale; // URL-এর প্রথমাংশ (en/bn) পরিবর্তন করা হচ্ছে
    
    router.push(segments.join("/"));
  };

  // অ্যাডমিন প্যানেলে ন্যাভবার হাইড করা, '?' যুক্ত করা হয়েছে ক্র্যাশ এড়াতে
  // URL-এর অংশগুলো ভাগ করে চেক করা হচ্ছে এটি অ্যাডমিন পেজ কি না
  const pathSegments = pathname?.split("/") || [];
  const isAdminPage = pathSegments[1] === "admin" || pathSegments[2] === "admin";

  if (isAdminPage) {
    return null;
  }
  // ডাইনামিক ন্যাভ লিংকস
  const navLinks = [
    { href: `/${currentLocale}/shop`, label: t("shop") },
    { href: `/${currentLocale}/categories`, label: t("collections") },
    { href: `/${currentLocale}/about`, label: t("story") },
    { href: `/${currentLocale}/contact`, label: t("contact") },
    { href: `/${currentLocale}/track-order`, label: t("trackOrder") },
  ];

  // গেট ইউজার ইনিশিয়ালস
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
              href={`/${currentLocale}`}
              className="flex-shrink-0 font-black text-xl tracking-[-0.04em] text-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Aroma<span className="text-primary">Cart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Real Language Switcher Button (Luxury Vibe) */}
              <div className="flex items-center text-xs font-semibold px-2 gap-1 text-muted-foreground">
                <button 
                  onClick={() => handleLanguageChange("en")}
                  className={`hover:text-primary transition-colors ${currentLocale === "en" ? "text-primary font-bold underline underline-offset-4" : ""}`}
                >
                  EN
                </button>
                <span className="text-border">|</span>
                <button 
                  onClick={() => handleLanguageChange("bn")}
                  className={`hover:text-primary transition-colors ${currentLocale === "bn" ? "text-primary font-bold underline underline-offset-4" : ""}`}
                >
                  বাং
                </button>
              </div>

              <ThemeToggle />

              {/* Wishlist */}
              <button className="relative h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[9px] font-bold flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown or Login Button */}
              {status === "loading" ? (
                <div className="h-9 w-9 rounded-full bg-secondary/40 animate-pulse ml-1" />
              ) : status === "authenticated" && session?.user ? (
                <div className="relative ml-1" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-9 w-9 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold text-xs tracking-wider transition-all duration-300 shadow-sm"
                  >
                    {getInitials(session.user.name || "")}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-background/95 backdrop-blur-md p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="px-3 py-2 border-b border-border/50 text-left">
                        <p className="text-xs font-semibold text-foreground/80 truncate">
                          {session.user.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        {session.user.role === "admin" && (
                          <Link
                            href={`/${currentLocale}/admin`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"
                          >
                            <ShieldAlert className="h-3.5 w-3.5" />
                            {t("adminDashboard")}
                          </Link>
                        )}
                        <Link
                          href={`/${currentLocale}/track-order`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-secondary hover:text-foreground rounded-xl transition-all"
                        >
                          <ListOrdered className="h-3.5 w-3.5" />
                          {t("myOrders")}
                        </Link>
                      </div>
                      <div className="pt-1 border-t border-border/50">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            signOut({ callbackUrl: `/${currentLocale}` });
                          }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          {t("logout")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={`/${currentLocale}/user-auth`}
                  className="hidden sm:flex h-9 px-4 rounded-full items-center justify-center bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold tracking-wide transition-all ml-1 shadow-sm"
                >
                  {t("login")}
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-1"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-20 border-b border-border" : "max-h-0"} bg-background/95 backdrop-blur-md`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={t("search")} // ডাইনামিক সার্চ প্লেসহোল্ডার
                autoFocus={searchOpen}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-secondary/50 border border-border text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-72 bg-background shadow-2xl transition-transform duration-300 flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <span className="font-black text-lg text-foreground" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Aroma<span className="text-primary">Cart</span>
            </span>
            <button onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Menu */}
            <div className="pt-4 mt-4 border-t border-border">
              {status === "loading" ? (
                <div className="h-10 w-full bg-secondary/40 animate-pulse rounded-xl" />
              ) : status === "authenticated" && session?.user ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 mb-2 bg-secondary/30 rounded-xl">
                    <p className="text-xs font-semibold text-foreground/80 truncate">{session.user.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                  {session.user.role === "admin" && (
                    <Link
                      href={`/${currentLocale}/admin`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      {t("adminDashboard")}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: `/${currentLocale}` });
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <Link
                  href={`/${currentLocale}/user-auth`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-center"
                >
                  {t("login")}
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader2, Lock, Mail, User, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";

function UserAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const mode = searchParams.get("mode") || "login"; // "login" | "register"

  const currentLocale = pathname?.split("/")[1] || "en";
  const isBn = currentLocale === "bn";

  const [isLogin, setIsLogin] = useState(mode !== "register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (isBn ? "রেজিস্ট্রেশন ব্যর্থ হয়েছে" : "Registration failed"));
        setLoading(false);
        return;
      }

      // Auto login after registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setSuccess(isBn ? "অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন।" : "Account created! Please log in.");
        setIsLogin(true);
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(isBn ? "কিছু ভুল হয়েছে" : "Something went wrong");
      setLoading(false);
    }
  };

  const inputCls = "w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-secondary/30 focus:bg-background text-sm focus:border-primary outline-none transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${currentLocale}`} className="inline-flex items-center gap-2 text-2xl font-black tracking-tighter" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Aroma<span className="text-primary">Cart</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            {isLogin 
              ? (isBn ? "আপনার অ্যাকাউন্টে লগইন করুন" : "Login to your account") 
              : (isBn ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "Create a new account")
            }
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-border">
            <button
              onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
              className={`py-4 text-sm font-bold transition-colors ${isLogin ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isBn ? "লগইন" : "Login"}
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
              className={`py-4 text-sm font-bold transition-colors ${!isLogin ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}
            >
              {isBn ? "রেজিস্টার" : "Register"}
            </button>
          </div>

          <div className="p-8">
            {/* Error / Success */}
            {error && (
              <div className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold p-3 rounded-2xl mb-5 border border-rose-500/20 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold p-3 rounded-2xl mb-5 border border-emerald-500/20 text-center">
                {success}
              </div>
            )}

            {/* ── Login Form ── */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isBn ? "ইমেইল" : "Email"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={inputCls} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isBn ? "পাসওয়ার্ড" : "Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className={`${inputCls} pr-11`} />
                    <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-2 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> 
                      {isBn ? "লগইন হচ্ছে..." : "Logging in..."}
                    </>
                  ) : (
                    isBn ? "লগইন করুন" : "Log In"
                  )}
                </button>
              </form>
            ) : (
              /* ── Register Form ── */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isBn ? "আপনার নাম" : "Your Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder={isBn ? "আপনার পুরো নাম" : "Your Full Name"} className={inputCls} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isBn ? "ইমেইল" : "Email"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={inputCls} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isBn ? "পাসওয়ার্ড" : "Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder={isBn ? "কমপক্ষে ৬ অক্ষর" : "Min 6 characters"} className={`${inputCls} pr-11`} />
                    <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-2 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> 
                      {isBn ? "তৈরি হচ্ছে..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> 
                      {isBn ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
            {isBn ? "← দোকানে ফিরে যান" : "← Back to Shop"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function UserAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <UserAuthContent />
    </Suspense>
  );
}

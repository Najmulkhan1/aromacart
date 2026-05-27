"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

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
      router.push("/en/admin");
      router.refresh(); // সেশন আপডেট করার জন্য
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-background rounded-3xl border border-border shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary/5 p-8 text-center border-b border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight mb-1">Admin Portal</h1>
          <p className="text-sm text-muted-foreground">Authorized personnel only</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm font-bold p-3 rounded-xl mb-6 text-center border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-secondary/20 focus:bg-background text-sm focus:border-primary outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-secondary/20 focus:bg-background text-sm focus:border-primary outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 mt-2 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
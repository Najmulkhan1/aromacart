"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Star, Loader2, Send, LogIn, CheckCircle2 } from "lucide-react";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  productId: string;
  locale: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              star <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-border fill-transparent"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId, locale }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isBn = locale === "bn";

  // Fetch reviews
  useEffect(() => {
    const fetch_ = async () => {
      setLoadingReviews(true);
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        if (data.success) setReviews(data.reviews);
      } catch {
        // silent
      } finally {
        setLoadingReviews(false);
      }
    };
    fetch_();
  }, [productId]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  // Rating breakdown
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Not logged in → redirect to user-auth with callbackUrl
    if (status !== "authenticated") {
      router.push(`/${locale}/user-auth?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!comment.trim()) {
      setSubmitError(isBn ? "রিভিউ লিখুন" : "Please write a review");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });
      const data = await res.json();

      if (res.status === 401) {
        router.push(`/${locale}/user-auth?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }
      if (res.status === 409) {
        setSubmitError(isBn ? "আপনি আগেই রিভিউ দিয়েছেন!" : "You have already reviewed this product!");
        return;
      }
      if (!res.ok) {
        setSubmitError(data.error || "Failed");
        return;
      }

      setReviews(prev => [data.review, ...prev]);
      setComment("");
      setRating(5);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch {
      setSubmitError(isBn ? "কিছু একটা ভুল হয়েছে" : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    title: isBn ? "ক্রেতাদের রিভিউ" : "Customer Reviews",
    writeReview: isBn ? "রিভিউ লিখুন" : "Write a Review",
    loginPrompt: isBn ? "রিভিউ দিতে লগইন করুন" : "Login to write a review",
    loginBtn: isBn ? "লগইন / রেজিস্টার" : "Login / Register",
    placeholder: isBn ? "আপনার অভিজ্ঞতা শেয়ার করুন..." : "Share your experience with this fragrance...",
    submit: isBn ? "রিভিউ জমা দিন" : "Submit Review",
    submitting: isBn ? "জমা হচ্ছে..." : "Submitting...",
    successMsg: isBn ? "আপনার রিভিউ সফলভাবে জমা হয়েছে!" : "Your review has been submitted!",
    noReviews: isBn ? "এখনো কোনো রিভিউ নেই। প্রথম রিভিউটি দিন!" : "No reviews yet. Be the first to review!",
    basedOn: (n: number) => isBn ? `${n}টি রিভিউ` : `${n} review${n !== 1 ? "s" : ""}`,
    loggedInAs: isBn ? "লগইন আছেন" : "Logged in as",
  };

  return (
    <section className="border-t border-border/50 bg-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <h2
          className="text-3xl font-bold mb-10"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {t.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: Summary ── */}
          <div className="space-y-6">
            {/* Average */}
            {avgRating ? (
              <div className="bg-card border border-border rounded-3xl p-6 text-center">
                <p className="text-6xl font-black text-foreground mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {avgRating}
                </p>
                <StarRating value={Math.round(Number(avgRating))} />
                <p className="text-sm text-muted-foreground mt-2">{t.basedOn(reviews.length)}</p>

                {/* Breakdown bars */}
                <div className="mt-5 space-y-2 text-left">
                  {breakdown.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-3 shrink-0">{star}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                      <div className="flex-1 h-1.5 rounded-full bg-border/50 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-5 shrink-0">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* ── Write Review Box ── */}
            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="text-base font-black mb-4">{t.writeReview}</h3>

              {/* Success */}
              {submitSuccess && (
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold px-4 py-3 rounded-2xl mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {t.successMsg}
                </div>
              )}

              {/* Not logged in prompt */}
              {status === "unauthenticated" && !submitSuccess && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                    <LogIn className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t.loginPrompt}</p>
                  <button
                    onClick={() => router.push(`/${locale}/user-auth?callbackUrl=${encodeURIComponent(pathname)}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
                  >
                    <LogIn className="w-4 h-4" />
                    {t.loginBtn}
                  </button>
                </div>
              )}

              {/* Loading session */}
              {status === "loading" && (
                <div className="flex justify-center py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              )}

              {/* Logged in → show form */}
              {status === "authenticated" && !submitSuccess && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-muted-foreground">
                    {t.loggedInAs}: <span className="font-semibold text-foreground">{session.user?.name || session.user?.email}</span>
                  </p>

                  {/* Star rating picker */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      {isBn ? "রেটিং দিন" : "Your Rating"}
                    </p>
                    <StarRating value={rating} onChange={setRating} />
                  </div>

                  {/* Comment */}
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder={t.placeholder}
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors resize-none"
                  />

                  {submitError && (
                    <p className="text-xs text-rose-500 font-medium">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> {t.submitting}</>
                    ) : (
                      <><Send className="w-4 h-4" /> {t.submit}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Right: Review List ── */}
          <div className="lg:col-span-2 space-y-4">
            {loadingReviews ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border border-dashed border-border/50 rounded-3xl gap-3">
                <Star className="w-10 h-10 text-muted-foreground/20" />
                <p className="text-sm">{t.noReviews}</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review._id} className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">
                        {review.userName?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{review.userName}</p>
                        <StarRating value={review.rating} />
                      </div>
                    </div>
                    <time className="text-xs text-muted-foreground shrink-0 mt-1">
                      {new Date(review.createdAt).toLocaleDateString(isBn ? "bn-BD" : "en-GB")}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

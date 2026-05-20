"use client";

import { useEffect } from "react";

/**
 * এই component localStorage থেকে পুরনো cart data clear করবে
 * শুধুমাত্র development-এ একবার চালান, তারপর remove করে দিন
 */
export function ClearCartStorage() {
  useEffect(() => {
    // localStorage থেকে cart data clear করা
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart-storage");
      console.log("✅ Cart storage cleared! Please refresh the page.");
    }
  }, []);

  return null;
}

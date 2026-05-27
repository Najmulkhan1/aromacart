"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/en/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
      ) : (
        <LogOut className="w-5 h-5 mr-3" />
      )}
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

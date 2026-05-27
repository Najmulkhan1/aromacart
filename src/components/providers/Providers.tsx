"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="aromacart-theme"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

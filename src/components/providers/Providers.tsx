"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="aromacart-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

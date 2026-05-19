"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Ekhane '/dist/types' bad diye direct main package theke import kora hoyeche
import { type ThemeProviderProps } from "next-themes" 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
'use client';

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DataProvider } from "@/contexts/DataContext";
import { BrandProvider } from "@/contexts/BrandContext";

// Lazy load non-critical UI to preserve 100% main-thread performance
const Sonner = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/providers/SmoothScroll"), {
  ssr: false,
});

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrandProvider>
          <DataProvider>
            {children}
            <SmoothScroll />
            <Sonner />
          </DataProvider>
        </BrandProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DataProvider } from "@/contexts/DataContext";
import { BrandProvider } from "@/contexts/BrandContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrandProvider>
                    <DataProvider>
                        <TooltipProvider>
                            {children}
                            <Toaster />
                            <Sonner />
                        </TooltipProvider>
                    </DataProvider>
                </BrandProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

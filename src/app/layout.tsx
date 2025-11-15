
"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Poppins } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { LoadingAnimation } from '@/components/loading-animation';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Optional: Prevent scrolling on the body while loading
      document.body.style.overflow = 'auto';
    }, 2000); // Adjust time to match your animation needs

    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body className={`${poppins.variable} ${montserrat.variable} font-body antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence>
            {isLoading && <LoadingAnimation />}
          </AnimatePresence>

          <FirebaseClientProvider>
            {!isLoading && children}
            <Toaster />
            <ThemeToggle />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

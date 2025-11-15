
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
    // Set a timer to hide the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // This duration should be slightly longer than the logo animation delay

    // Prevent scrolling while the loading animation is active
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to clear the timer and restore scrolling
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
          defaultTheme="dark"
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

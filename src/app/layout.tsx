import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from '@/components/page-transition';

export const metadata: Metadata = {
  title: 'Studio Ascent',
  description: 'Portfolio of Dev Kumar Das',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <PageTransition>
          {children}
        </PageTransition>
        <Toaster />
      </body>
    </html>
  );
}

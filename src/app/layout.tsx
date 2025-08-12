import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from '@/components/page-transition';
import { Roboto, Poppins } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['600', '700', '800'],
});


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
      <body className={`${roboto.variable} ${poppins.variable} font-body antialiased`}>
        <PageTransition>
          {children}
        </PageTransition>
        <Toaster />
      </body>
    </html>
  );
}

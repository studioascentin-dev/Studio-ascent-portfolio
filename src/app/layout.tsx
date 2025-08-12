import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Roboto, Oswald } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['600', '700'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Dev Kumar Das | Portfolio',
  description: 'Portfolio of Dev Kumar Das, a full-stack developer and creative designer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body className={`${roboto.variable} ${oswald.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

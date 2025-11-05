import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Poppins } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Studio Ascent | Full-Stack Developer & Creative Designer',
    template: '%s | Studio Ascent',
  },
  description: 'Portfolio of Studio Ascent, a talented Full-Stack Developer, Video Editor, and Creative Designer specializing in Next.js, AI chatbots, and visual content creation.',
  keywords: ['Studio Ascent', 'Full-Stack Developer', 'Video Editor', 'Creative Designer', 'Next.js Developer', 'AI Chatbot', 'Portfolio', 'Assam', 'India'],
  authors: [{ name: 'Studio Ascent' }],
  creator: 'Studio Ascent',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Studio Ascent | Full-Stack Developer & Creative Designer',
    description: 'Explore the portfolio of a multi-talented creative specializing in web development, video editing, and AI solutions.',
    siteName: 'Studio Ascent Portfolio',
    images: [
      {
        url: '/og-image.png', // Update with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Studio Ascent Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Ascent | Full-Stack Developer & Creative Designer',
    description: 'A passionate creator building beautiful websites, engaging videos, and smart AI chatbots.',
    creator: '@Dev69910032', // Your Twitter handle
    images: ['/twitter-image.png'], // Update with your actual Twitter image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body className={`${poppins.variable} ${montserrat.variable} font-body antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
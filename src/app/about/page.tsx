import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Studio Ascent, a passionate and multi-talented creative specializing in Web & AI Development, Video/Photo Editing, and more.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

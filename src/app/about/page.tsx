import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';

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

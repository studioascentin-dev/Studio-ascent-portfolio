import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

export function AboutSection() {
  return (
    <AnimatedSection id="about-me" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold font-headline tracking-tighter text-primary sm:text-4xl">About Me</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I am a passionate and results-oriented creative professional with a knack for turning complex problems into beautiful, intuitive, and effective solutions. I specialize in both design and development, allowing me to build seamless user experiences from start to finish.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <Button variant="link" className="text-lg uppercase tracking-widest px-0 text-foreground hover:text-primary">
                Contact Me
            </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

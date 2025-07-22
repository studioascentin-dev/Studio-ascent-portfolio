import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedSection } from './animated-section';
import { cn } from '@/lib/utils';

const projects = [
  { name: 'Corporate Brand Film', category: 'Video Editing', image: 'https://placehold.co/600x400.png', dataAiHint: 'corporate video' },
  { name: 'E-commerce Product Showcase', category: 'Photo Editing', image: 'https://placehold.co/600x400.png', dataAiHint: 'product photography' },
  { name: 'Startup Pitch Deck', category: 'PPT', image: 'https://placehold.co/600x400.png', dataAiHint: 'business presentation' },
  { name: 'Artist Portfolio Website', category: 'Web Design', image: 'https://placehold.co/600x400.png', dataAiHint: 'art portfolio' },
  { name: 'SaaS Platform Development', category: 'Web Development', image: 'https://placehold.co/600x400.png', dataAiHint: 'dashboard interface' },
  { name: 'Social Media Ad Campaign', category: 'Video Editing', image: 'https://placehold.co/600x400.png', dataAiHint: 'social media' },
];

interface ProjectsSectionProps {
  suggestedProjects: string[];
}

export function ProjectsSection({ suggestedProjects }: ProjectsSectionProps) {
  const hasSuggestions = suggestedProjects.length > 0;

  return (
    <AnimatedSection id="projects" className="bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {hasSuggestions
                ? "Here are some projects we think you'll love, based on your interests."
                : "Have a look at some of our selected projects."}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const isSuggested = hasSuggestions && suggestedProjects.some(suggestion => project.name.toLowerCase().includes(suggestion.toLowerCase()) || project.category.toLowerCase().includes(suggestion.toLowerCase()));
            return (
              <Card key={project.name} className={cn("overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2", isSuggested && "ring-2 ring-accent ring-offset-4 ring-offset-background")}>
                <CardHeader className="p-0 relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={project.dataAiHint}
                  />
                  {isSuggested && <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Suggested for you</Badge>}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
                </CardContent>
                <CardFooter>
                  <Badge variant="secondary">{project.category}</Badge>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

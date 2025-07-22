import { Video, Camera, Presentation, Globe, Code, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';

const services = [
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'Professional video editing to make your content shine.',
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'High-quality photo retouching and manipulation services.',
  },
  {
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'Creating stunning and effective presentations for any occasion.',
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Web Design',
    description: 'Designing beautiful, intuitive, and user-friendly web interfaces.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Building robust, scalable, and high-performance websites and apps.',
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'And More',
    description: 'Explore a variety of other creative and technical services.',
  },
];

export function ServicesSection() {
  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">My Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a wide range of digital services to bring your vision to life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="group flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-card/90">
              <CardHeader className="transition-all duration-300 group-hover:scale-110">
                {service.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline mt-2 text-xl">{service.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

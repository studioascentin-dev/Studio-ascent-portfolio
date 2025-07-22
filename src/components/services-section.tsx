import { Video, Camera, Presentation, Globe, Code, PenTool } from 'lucide-react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/animated-section';

const services = [
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that captivates and engages your audience.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'video editing software'
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'camera photography'
  },
  {
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'I create stunning and effective presentations that not only look great but also communicate your message clearly, making sure you stand out in any setting.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'presentation slide'
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Web Design',
    description: 'I design beautiful, intuitive, and user-friendly web interfaces that provide an exceptional user experience and make a lasting impression on your visitors.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'website design'
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'coding programming'
  },
];

export function ServicesSection() {
  return (
    <AnimatedSection id="services" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">My Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a wide range of digital services to bring your vision to life.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          {services.map((service, index) => (
            <div key={service.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`flex justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                  data-ai-hint={service.dataAiHint}
                />
              </div>
              <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="inline-block p-3 bg-primary/10 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline">{service.title}</h3>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

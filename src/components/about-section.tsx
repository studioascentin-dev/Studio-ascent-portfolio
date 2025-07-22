import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { Interactive3DModel } from './interactive-3d-model';
import { User, MapPin, BookOpen, Brush, Code, Target, Heart } from 'lucide-react';

const aboutDetails = [
    { icon: <User className="h-6 w-6 text-primary" />, title: "Full Name", value: "Dev Kumar Das" },
    { icon: <MapPin className="h-6 w-6 text-primary" />, title: "From", value: "[Your City, Your Country]" },
    { icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Studies", value: "[Your Degree or Field of Study]" },
    { icon: <Code className="h-6 w-6 text-primary" />, title: "Websites I've Built", value: "[List a few projects or types of sites]" },
    { icon: <Heart className="h-6 w-6 text-primary" />, title: "Hobbies", value: "[Your Hobbies]" },
    { icon: <Target className="h-6 w-6 text-primary" />, title: "Ambition", value: "[Your professional ambition or goal]" },
];

export function AboutSection() {
    return (
        <AnimatedSection id="about-me" className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative w-full h-[400px] md:h-full rounded-lg overflow-hidden border-2 border-primary/20 shadow-2xl">
                        <Interactive3DModel />
                    </div>
                    <div className="space-y-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                            <p className="mt-4 text-muted-foreground md:text-xl">A little bit about my journey and passions.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {aboutDetails.map(detail => (
                                <Card key={detail.title} className="bg-card/50">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        {detail.icon}
                                        <CardTitle className="text-lg font-headline">{detail.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{detail.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

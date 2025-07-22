"use client";

import { useState } from 'react';
import { ThreeWelcome } from './three-welcome';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { getProjectSuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

const interests = [
  { id: 'video-editing', label: 'Video Editing' },
  { id: 'photo-editing', label: 'Photo Editing' },
  { id: 'ppt', label: 'PPT' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'web-development', label: 'Web Development' },
];

interface HeroSectionProps {
  onSuggestions: (suggestions: string[]) => void;
}

export function HeroSection({ onSuggestions }: HeroSectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      toast({
        title: "No interests selected",
        description: "Please select at least one interest to get suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const result = await getProjectSuggestions({ selections: selectedInterests });
    setIsLoading(false);

    if (result.success && result.data) {
      onSuggestions(result.data.suggestedProjects);
      toast({
        title: "Suggestions Loaded!",
        description: "Check out the highlighted projects below.",
      });
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <ThreeWelcome />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="container px-4 md:px-6 text-center text-primary-foreground">
          <div className="bg-background/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter text-shadow-lg">
              Dev Kumar Das
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
              Creative Developer & Designer specializing in turning ideas into digital reality.
            </p>
            <div className="mt-8">
              <h2 className="text-lg font-semibold font-headline mb-4">What are you interested in?</h2>
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {interests.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2">
                       <Checkbox
                        id={interest.id}
                        onCheckedChange={() => handleInterestChange(interest.label)}
                        className="border-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <Label htmlFor={interest.id} className="cursor-pointer text-base">{interest.label}</Label>
                    </div>
                  ))}
                </div>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? <LoaderCircle className="animate-spin" /> : 'Get Project Suggestions'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

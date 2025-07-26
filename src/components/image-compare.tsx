
"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCompareProps {
    before: string;
    after: string;
    alt: string;
}

export function ImageCompare({ before, after, alt }: ImageCompareProps) {
    const CustomHandle = () => (
        <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md flex items-center justify-center absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize">
            <div className="flex text-foreground">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
            </div>
        </div>
    );
    
    return (
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={before} alt={`Before - ${alt}`} />}
            itemTwo={<ReactCompareSliderImage src={after} alt={`After - ${alt}`} />}
            className="w-full h-full object-cover"
            handle={<CustomHandle />}
        />
    );
}

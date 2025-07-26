
"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageCompareProps {
    before: string;
    after: string;
    alt: string;
}

export function ImageCompare({ before, after, alt }: ImageCompareProps) {
    return (
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={before} alt={`Before - ${alt}`} />}
            itemTwo={<ReactCompareSliderImage src={after} alt={`After - ${alt}`} />}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
    );
}

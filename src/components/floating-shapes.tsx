
"use client";

import { useState, useEffect } from 'react';

const NUM_SHAPES = 15;

export function FloatingShapes() {
    const [shapes, setShapes] = useState<any[]>([]);

    useEffect(() => {
        const newShapes = Array.from({ length: NUM_SHAPES }).map((_, i) => {
            const size = Math.random() * 100 + 50; // 50px to 150px
            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${Math.random() * 10 + 15}s`, // 15s to 25s
                }
            };
        });
        setShapes(newShapes);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            {shapes.map(shape => (
                <div key={shape.id} className="shape" style={shape.style} />
            ))}
        </div>
    );
}

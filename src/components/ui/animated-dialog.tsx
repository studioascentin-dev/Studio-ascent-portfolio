
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const AnimatedDialog = ({ children, origin, onOpenChange }: { children: React.ReactNode, origin: DOMRect, onOpenChange: (open: boolean) => void }) => {
    
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onOpenChange]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const contentVariants = (originRect: DOMRect) => ({
        hidden: {
            x: originRect.left,
            y: originRect.top,
            width: originRect.width,
            height: originRect.height,
            opacity: 0,
            scale: 0.5,
        },
        visible: {
            x: 0,
            y: 0,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            width: "clamp(300px, 90vw, 600px)",
            height: "auto",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
            },
        },
        exit: {
            x: originRect.left,
            y: originRect.top,
            width: originRect.width,
            height: originRect.height,
            opacity: 0,
            scale: 0.5,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            },
        }
    });

    return (
        <DialogPrimitive.Root open={true} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal forceMount>
                    <motion.div
                        className="fixed inset-0 z-50"
                    >
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => onOpenChange(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                         />

                        <motion.div
                            ref={contentRef}
                            variants={contentVariants(origin)}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg rounded-lg"
                        >
                            {children}
                            <DialogPrimitive.Close 
                                onClick={() => onOpenChange(false)}
                                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogPrimitive.Close>
                        </motion.div>
                    </motion.div>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};


export { AnimatedDialog };


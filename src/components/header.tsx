
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import * as React from 'react';

const navItems = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
];

const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

export function Header() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = React.useState('');

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            e.preventDefault();
            const targetId = href.substring(2);
            setActiveSection(targetId);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    React.useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        const sections = ['about', 'services', 'work', 'contact'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const isLinkActive = (item: {name: string, href: string}) => {
        if (item.href.startsWith("/#")) {
             return activeSection === item.href.substring(2);
        }
        return pathname === item.href;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 bg-background/80 backdrop-blur-sm">
            <motion.div
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto flex items-center justify-between"
            >
                <Link href="/" className="text-2xl font-bold font-headline text-primary">
                    Dev.
                </Link>
                <nav className="hidden md:flex items-center justify-end gap-6 md:gap-8">
                    {navItems.map((item) => (
                         <motion.div key={item.name} variants={itemVariants}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className={cn(
                                    "text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group",
                                    isLinkActive(item) && "text-foreground font-semibold"
                                )}
                            >
                                {item.name}
                                {isLinkActive(item) && (
                                    <motion.span 
                                        layoutId="active-dot"
                                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1.5 w-1.5 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        </header>
    );
}

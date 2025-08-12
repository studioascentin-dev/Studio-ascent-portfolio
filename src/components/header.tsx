
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Blog", href: "/blog" },
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
    
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-end gap-6 md:gap-8"
            >
                {navItems.map((item) => (
                     <motion.div key={item.name} variants={itemVariants}>
                        <Link
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className={cn(
                                "text-lg font-medium text-foreground/60 hover:text-primary transition-colors relative group",
                                (item.href === "#services" || pathname === item.href) && "text-foreground"
                            )}
                        >
                            {item.name}
                            {(item.href === "#services" || pathname === item.href) && (
                                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1.5 w-1.5 bg-primary rounded-full"></span>
                            )}
                        </Link>
                    </motion.div>
                ))}
            </motion.nav>
        </header>
    );
}

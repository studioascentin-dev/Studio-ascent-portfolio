
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
        <header className="fixed top-0 right-0 z-50 p-4 md:p-8">
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-6 md:gap-8 bg-background/80 backdrop-blur-sm p-4 rounded-full"
            >
                {navItems.map((item) => (
                    <motion.div key={item.name} variants={itemVariants}>
                        <Link
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                        </Link>
                    </motion.div>
                ))}
            </motion.nav>
        </header>
    );
}


"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="h-10 w-10 rounded-full bg-secondary"></div>
        </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleTheme} 
                    className="rounded-full shadow-lg bg-background/50 backdrop-blur-lg"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
                    )}
                </Button>
            </motion.div>
        </AnimatePresence>
    </div>
  )
}

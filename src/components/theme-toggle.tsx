"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder to prevent layout shift and hydration errors
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="h-10 w-20 rounded-full bg-secondary"></div>
        </div>
    )
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        onClick={toggleTheme}
        className={`flex h-10 w-20 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
          isDark ? 'bg-primary/20' : 'bg-secondary'
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-md"
        >
          {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
        </motion.div>
      </div>
    </div>
  )
}

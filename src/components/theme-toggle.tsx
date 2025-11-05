
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

const TABS = ["Light", "Dark"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = React.useState(theme);
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setActiveTab(theme)
  }, [theme])

  const handleTabClick = (tab: string) => {
    setTheme(tab.toLowerCase())
  }
  
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <div className="flex space-x-1 rounded-full bg-secondary/80 backdrop-blur-sm p-1">
        {TABS.map((tab) => (
            <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`${
                activeTab === tab.toLowerCase() ? "" : "hover:text-foreground/60"
            } relative rounded-full px-4 py-1.5 text-sm font-medium text-foreground transition focus-visible:outline-2`}
            style={{
                WebkitTapHighlightColor: "transparent",
            }}
            >
            {activeTab === tab.toLowerCase() && (
                <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-background shadow-md"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-20">{tab}</span>
            </button>
        ))}
        </div>
    </div>
  )
}

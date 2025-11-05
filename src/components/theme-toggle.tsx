
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-2 rounded-full bg-background/50 p-2 backdrop-blur-lg border shadow-lg">
        <Sun className={`h-5 w-5 transition-colors ${isDark ? 'text-muted-foreground' : 'text-primary'}`} />
        <Switch
          id="theme-toggle"
          checked={isDark}
          onCheckedChange={handleCheckedChange}
          aria-label="Toggle theme"
        />
        <Moon className={`h-5 w-5 transition-colors ${isDark ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
    </div>
  )
}

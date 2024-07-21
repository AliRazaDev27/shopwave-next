'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    null
  )

  if (resolvedTheme === 'dark') {
    return <FiSun className="size-8 cursor-pointer " onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <FiMoon className="size-8 cursor-pointer text-white" onClick={() => setTheme('dark')} />
  }

}

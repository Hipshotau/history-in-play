'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const dark = localStorage.getItem('theme') === 'dark'
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  function toggleDarkMode() {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-4 text-sm border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

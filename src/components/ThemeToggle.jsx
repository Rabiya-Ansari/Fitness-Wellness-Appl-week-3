import React from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button onClick={() => setDarkMode(prev => !prev)} className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`} aria-label="Toggle theme">
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
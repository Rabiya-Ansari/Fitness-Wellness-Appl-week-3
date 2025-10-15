import React from 'react'
import { Activity, Dumbbell, Apple, TrendingUp, Play, Menu, X, Sun, Moon } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'workout', label: 'Workout Builder', icon: Dumbbell },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'stats', label: 'Statistics', icon: TrendingUp },
  { id: 'exercises', label: 'Exercise Guide', icon: Play }
]

const Header = ({ darkMode, setDarkMode, activeSection, setActiveSection }) => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <header className={`sticky  top-0 z-40 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-[var(--mintGreen)] border-gray-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Activity className="text-blue-500 " size={32} />
            <h1 className="text-2xl text-white font-bold">FitTracker</h1>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map(item => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => setActiveSection(item.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all ${activeSection === item.id ? 'bg-[var(--buttons)] text-white shadow-lg' : darkMode ? 'hover:bg-gray-700' : '0'}`}>
                  <Icon size={18} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <nav className="px-4 py-4 space-y-2">
            {nav.map(item => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => { setActiveSection(item.id); setMenuOpen(false) }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeSection === item.id ? 'bg-blue-500 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Icon size={18} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
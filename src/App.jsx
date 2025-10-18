import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import WorkoutBuilder from './components/WorkoutBuilder'
import NutritionTracker from './components/NutritionTracker'
import ActivityStats from './components/ActivityStats'
import ExerciseGuide from './components/ExerciseGuide'
import Footer from './components/Footer'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('ft:theme') === 'dark'
    } catch (e) { return false }
  })
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('ft:theme', darkMode ? 'dark' : 'light') } catch(e){}
  }, [darkMode])

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard userName="Welcome To Wellnes App" darkMode={darkMode} />
      case 'workout': return <WorkoutBuilder darkMode={darkMode} />
      case 'nutrition': return <NutritionTracker darkMode={darkMode} />
      case 'stats': return <ActivityStats darkMode={darkMode} />
      case 'exercises': return <ExerciseGuide darkMode={darkMode} />
      default: return <Dashboard userName="Alex" darkMode={darkMode} />
    }
  }

  useEffect(() => {
    let startX = 0
    const onTouchStart = (e) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX
      const dx = endX - startX
      if (Math.abs(dx) > 80) {
        const order = ['dashboard','workout','nutrition','stats','exercises']
        const idx = order.indexOf(activeSection)
        if (dx < 0 && idx < order.length-1) setActiveSection(order[idx+1])
        if (dx > 0 && idx > 0) setActiveSection(order[idx-1])
      }
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => { window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchend', onTouchEnd) }
  }, [activeSection])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderSection()}</main>

      <div className="fixed bottom-4 right-4 bg-[var(--mintGreen)] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
        📱 Offline mode available for workout plans
      </div>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
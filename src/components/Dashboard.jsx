import React, { useState, useEffect } from 'react'

const ProgressRing = ({ current, target, label, color, darkMode }) => {
  const percentage = Math.round((current / target) * 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle cx="64" cy="64" r={radius} stroke={darkMode ? '#374151' : '#e5e7eb'} strokeWidth="8" fill="none" />
          <circle cx="64" cy="64" r={radius} stroke={color} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
          <span className="text-xs text-gray-500">{current}/{target}</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium">{label}</p>
    </div>
  )
}

const Dashboard = ({ userName = 'User', darkMode }) => {
  const [dailyGoals, setDailyGoals] = useState({ steps: { current: 7543, target: 10000 }, calories: { current: 1850, target: 2500 }, activeMinutes: { current: 45, target: 60 } })
  const [weeklyData, setWeeklyData] = useState([])

  useEffect(() => {
    fetch('/data/activities.json').then(r => r.json()).then(data => { setWeeklyData(data.weekly || []) }).catch(() => { })
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[var(--cGreen)] to-[var(--mintGreen)] rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold">Hello, {userName}! 👋</h2>
        <p className="mt-2 text-blue-100">Ready to crush your fitness goals today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressRing {...dailyGoals.steps} label="Steps" color="#3b82f6" darkMode={darkMode} />
        <ProgressRing {...dailyGoals.calories} label="Calories" color="#10b981" darkMode={darkMode} />
        <ProgressRing {...dailyGoals.activeMinutes} label="Active Minutes" color="#f59e0b" darkMode={darkMode} />
      </div>

      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
        <div className="flex items-end justify-between h-48 gap-2">
          {weeklyData.length === 0 ? (
            <div className="w-full text-center text-gray-400">No weekly data</div>
          ) : (
            weeklyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-1000 rounded-t-lg" style={{ height: `${day.value}%` }} />
                </div>
                <span className="text-xs font-medium">{day.day}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
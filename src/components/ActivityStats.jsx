import React, { useState, useEffect } from 'react'

const ActivityStats = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('week')
  const [statsData, setStatsData] = useState({ day: [], week: [], month: [], achievements: [] })

  useEffect(() => {
    fetch('/data/activity.json').then(r=>r.json()).then(data => {
      setStatsData({ day: data.stats.day || [], week: data.weekly || [], month: data.stats.month || [], achievements: data.achievements || [] })
    }).catch(()=>{})
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Activity Statistics</h2>

      <div className="flex gap-2 border-b border-gray-300 dark:border-gray-700">
        {['day','week','month'].map(tab => (
          <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}>{tab}</button>
        ))}
      </div>

      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6">Workout Intensity</h3>
        <div className="h-64 flex items-end justify-between gap-4">
          {statsData[activeTab].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: '200px' }}>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-[var(--mintGreen)] to-[var(--cGreen)] rounded-t-lg transition-all duration-700 hover:from-blue-600 hover:to-purple-600" style={{ height: `${item.value}%`, animationDelay: `${index * 100}ms` }}>
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold">{item.value}%</span>
                </div>
              </div>
              <span className="text-sm font-medium mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.achievements.map(ach => (
          <div key={ach.id} className={`p-6 rounded-xl transition-all duration-300 ${ach.unlocked ? (darkMode ? 'bg-gradient-to-br from-yellow-600 to-orange-600' : 'bg-gradient-to-br from-yellow-400 to-orange-500') : (darkMode ? 'bg-gray-800 opacity-50' : 'bg-gray-200 opacity-60')} ${ach.unlocked ? 'transform hover:scale-105 shadow-lg' : ''}`}>
            <div className="text-4xl mb-3">{ach.icon}</div>
            <h4 className={`font-bold mb-1 ${ach.unlocked ? 'text-white' : ''}`}>{ach.name}</h4>
            <p className={`text-sm ${ach.unlocked ? 'text-white/90' : 'text-gray-500'}`}>{ach.description}</p>
            {ach.unlocked && <div className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">Unlocked ✓</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityStats
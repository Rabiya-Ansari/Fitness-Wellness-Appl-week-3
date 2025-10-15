import React, { useState, useEffect } from 'react'
import { Maximize2, X } from 'lucide-react'

const ExerciseGuide = ({ darkMode }) => {
  const [guides, setGuides] = useState({})
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => { fetch('/data/exercise.json').then(r => r.json()).then(d => { setGuides(d); const keys = Object.keys(d); if (keys.length) setSelectedExercise(Number(keys[0])) }).catch(() => { }) }, [])

  const guide = guides[selectedExercise]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Exercise Demonstrations</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(guides).map(([id, exercise]) => (
          <button key={id} onClick={() => setSelectedExercise(Number(id))} className={`p-4 rounded-lg font-medium transition-all ${selectedExercise === Number(id) ? 'bg-gradient-to-r from-[var(--cGreen)] to-[var(--mintGreen)] text-white shadow-lg scale-105' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
            {exercise.name}
          </button>
        ))}
      </div>

      {guide && (
        <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="relative h-64 bg-black flex items-center justify-center">
            {guide.video ? (
              <video
                src={guide.video}
                controls
                className="w-full h-full object-cover rounded-none"
              ></video>
            ) : (
              <div className="text-white text-center">
                <h3 className="text-4xl font-bold mb-2">{guide.name}</h3>
                <p className="text-blue-100">Video Demonstration</p>
              </div>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Maximize2 className="text-white" size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4">Step-by-Step Guide</h4>
              <ol className="space-y-3">
                {guide.steps.map((step, index) => (
                  <li key={index} className="flex gap-3"><span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[var(--cGreen)] to-[var(--mintGreen)] text-white rounded-full flex items-center justify-center font-bold">{index + 1}</span><span className="pt-1">{step}</span></li>
                ))}
              </ol>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[var(--cGreen)]'}`}>
              <p className="font-semibold text-blue-500 mb-1">💡 Pro Tip</p>
              <p>{guide.tips}</p>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && guide && (
        <div className="fixed inset-0 bg-[var(--mintGreen)] bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-r from-[var(--cGreen)] to-[var(--mintGreen) rounded-2xl p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">{guide.name}</h3>
                <button onClick={() => setIsFullscreen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X size={32} /></button>
              </div>
              <div className="space-y-4">
                {guide.steps.map((step, index) => (
                  <div key={index} className="text-xl flex gap-4"><span className="font-bold">{index + 1}.</span><span>{step}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseGuide
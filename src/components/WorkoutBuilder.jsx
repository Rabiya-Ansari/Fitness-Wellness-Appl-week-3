import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, X } from 'lucide-react'

const WorkoutBuilder = ({ darkMode }) => {
  const [exercisesData, setExercisesData] = useState({ cardio: [], strength: [], yoga: [] })
  const [selectedCategory, setSelectedCategory] = useState('cardio')
  const [workoutPlan, setWorkoutPlan] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [restTimer, setRestTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(60)

  useEffect(() => {
    fetch('/data/workOuts.json').then(r => r.json()).then(data => setExercisesData(data)).catch(()=>{})
  }, [])

  useEffect(() => {
    let interval
    if (isTimerRunning && currentTime > 0) interval = setInterval(() => setCurrentTime(prev => prev - 1), 1000)
    else if (currentTime === 0) setIsTimerRunning(false)
    return () => clearInterval(interval)
  }, [isTimerRunning, currentTime])

  const handleDragStart = (e, exercise) => { setDraggedItem(exercise) }
  const handleDragOver = (e) => { e.preventDefault() }
  const handleDrop = (e) => {
    e.preventDefault()
    if (draggedItem && !workoutPlan.find(ex => ex.id === draggedItem.id)) setWorkoutPlan([...workoutPlan, draggedItem])
    setDraggedItem(null)
  }

  const removeExercise = (id) => setWorkoutPlan(workoutPlan.filter(ex => ex.id !== id))
  const startTimer = () => { setCurrentTime(restTimer); setIsTimerRunning(true) }
  const resetTimer = () => { setIsTimerRunning(false); setCurrentTime(restTimer) }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Workout Plan Builder</h2>
      <div className="flex gap-2 flex-wrap">
        {Object.keys(exercisesData).map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${selectedCategory === category ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Exercise Library</h3>
          <div className="space-y-2">
            {exercisesData[selectedCategory].map(exercise => (
              <div key={exercise.id} draggable onDragStart={(e) => handleDragStart(e, exercise)} className={`p-4 rounded-lg cursor-move transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-gray-500">{exercise.duration} min • {exercise.calories} cal</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' : exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{exercise.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Your Workout Plan</h3>
          <div onDragOver={handleDragOver} onDrop={handleDrop} className={`min-h-64 p-4 rounded-lg border-2 border-dashed ${workoutPlan.length === 0 ? 'flex items-center justify-center' : ''} ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
            {workoutPlan.length === 0 ? (
              <p className="text-gray-500">Drag exercises here to build your workout</p>
            ) : (
              <div className="space-y-2">
                {workoutPlan.map((exercise, index) => (
                  <div key={exercise.id} className={`p-4 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
                    <div>
                      <span className="font-medium mr-2">{index + 1}.</span>
                      <span className="font-semibold">{exercise.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{exercise.duration} min</span>
                    </div>
                    <button onClick={() => removeExercise(exercise.id)} className="text-red-500 hover:text-red-700"><X size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`mt-6 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h4 className="font-semibold mb-4">Rest Timer</h4>
            <div className="flex items-center gap-4 mb-4">
              <input type="number" value={restTimer} onChange={(e) => setRestTimer(Number(e.target.value))} className={`w-20 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} disabled={isTimerRunning} />
              <span>seconds</span>
            </div>
            <div className="text-4xl font-bold text-center mb-4">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</div>
            <div className="flex gap-2">
              <button onClick={isTimerRunning ? () => setIsTimerRunning(false) : startTimer} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">{isTimerRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}</button>
              <button onClick={resetTimer} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}><RotateCcw size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutBuilder
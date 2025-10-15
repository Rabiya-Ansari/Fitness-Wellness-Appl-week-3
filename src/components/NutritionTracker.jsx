import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const ProgressBar = ({ label, current, target, darkMode }) => {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500">{current}g / {target}g</span>
      </div>
      <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className={`h-3 rounded-full transition-all duration-500 ${darkMode ? 'bg-[var(--mintGreen)]' : 'bg-[var(--cGreen)]'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

const NutritionTracker = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [meals, setMeals] = useState([])
  const [foods, setFoods] = useState([])

  const dailyGoals = { calories: 2000, protein: 150, carbs: 250, fat: 65 }

  useEffect(() => { fetch('/data/nutrition.json').then(r=>r.json()).then(d=>setFoods(d)).catch(()=>{}) }, [])

  const filteredFoods = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totals = meals.reduce((acc, meal) => ({ calories: acc.calories + meal.calories, protein: acc.protein + meal.protein, carbs: acc.carbs + meal.carbs, fat: acc.fat + meal.fat }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const addMeal = (food) => setMeals([...meals, { ...food, mealId: Date.now() }])
  const removeMeal = (mealId) => setMeals(meals.filter(m => m.mealId !== mealId))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nutrition Tracker</h2>

      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4">Daily Progress</h3>
        <div className="text-3xl font-bold mb-6">{totals.calories} / {dailyGoals.calories} <span className="text-lg text-gray-500">calories</span></div>
        <ProgressBar label="Protein" current={totals.protein} target={dailyGoals.protein} darkMode={darkMode} />
        <ProgressBar label="Carbs" current={totals.carbs} target={dailyGoals.carbs} darkMode={darkMode} />
        <ProgressBar label="Fat" current={totals.fat} target={dailyGoals.fat} darkMode={darkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Food Search</h3>
          <input type="text" placeholder="Search foods..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className={`w-full px-4 py-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-[var(--cGreen)] outline-none`} />
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredFoods.map(food => (
              <div key={food.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{food.name}</h4>
                    <p className="text-sm text-gray-500">{food.serving}</p>
                    <div className="flex gap-4 mt-2 text-sm"><span>{food.calories} cal</span><span>P: {food.protein}g</span><span>C: {food.carbs}g</span><span>F: {food.fat}g</span></div>
                  </div>
                  <button onClick={()=>addMeal(food)} className="px-4 py-2 bg-gradient-to-r from-[var(--cGreen)] to-[var(--mintGreen)] text-white rounded-lg hover:bg-blue-600 text-sm">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Today's Meals</h3>
          {meals.length === 0 ? (
            <div className={`p-8 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}><p className="text-gray-500">No meals logged yet</p></div>
          ) : (
            <div className="space-y-2">
              {meals.map(meal => (
                <div key={meal.mealId} className={`p-4 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                  <div>
                    <h4 className="font-semibold">{meal.name}</h4>
                    <p className="text-sm text-gray-500">{meal.calories} cal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g</p>
                  </div>
                  <button onClick={()=>removeMeal(meal.mealId)} className="text-red-500 hover:text-red-700"><X size={18} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NutritionTracker
import { useState } from "react"

const defaultGoals = {
  calories: 3000,
  protein: 180,
  carbs: 400,
  fats: 90,
}

export default function MacroTracker() {
  const [consumed, setConsumed] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  })

  const [input, setInput] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    setConsumed((prev) => ({
      calories: prev.calories + parseInt(input.calories || 0),
      protein: prev.protein + parseInt(input.protein || 0),
      carbs: prev.carbs + parseInt(input.carbs || 0),
      fats: prev.fats + parseInt(input.fats || 0),
    }))
    setInput({ calories: "", protein: "", carbs: "", fats: "" })
  }

  const remaining = {
    calories: defaultGoals.calories - consumed.calories,
    protein: defaultGoals.protein - consumed.protein,
    carbs: defaultGoals.carbs - consumed.carbs,
    fats: defaultGoals.fats - consumed.fats,
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Daily Macro Tracker</h1>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(input).map((key) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key}</label>
            <input
              type="number"
              name={key}
              value={input[key]}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              placeholder={`Add ${key}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Meal
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Remaining Macros</h2>
        <ul className="space-y-1">
          {Object.entries(remaining).map(([key, value]) => (
            <li key={key}>
              <strong className="capitalize">{key}</strong>: {value > 0 ? value : 0}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Consumed Today</h2>
        <ul className="space-y-1">
          {Object.entries(consumed).map(([key, value]) => (
            <li key={key}>
              <strong className="capitalize">{key}</strong>: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

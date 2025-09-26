import React, { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface CounterProps {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export default function Counter({
  min = 1,
  max = 10,
  defaultValue = 1,
  onChange,
}: CounterProps) {
  const [value, setValue] = useState(defaultValue)

  const updateValue = (newValue: number) => {
    if (newValue < min || newValue > max) return
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => updateValue(value - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus size={18} />
      </button>

      <span className="text-lg font-medium">{value}</span>

      <button
        onClick={() => updateValue(value + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus size={18} />
      </button>
    </div>
  )
}

/*
<Counter min={1} max={20} defaultValue={1} onChange={(v) => console.log("Nuevo valor:", v)} />

*/
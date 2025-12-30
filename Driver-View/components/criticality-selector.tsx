'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import type { Priority } from '@/app/page'

type Props = {
  onNext: (priority: Priority) => void
  onBack: () => void
}

export default function CriticalitySelector({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<Priority>(null)

  const priorities = [
    {
      value: 'high' as const,
      label: 'HIGH PRIORITY',
      icon: '🚨',
      color: 'red',
      description: 'Life-threatening, immediate care',
    },
    {
      value: 'medium' as const,
      label: 'MEDIUM PRIORITY',
      icon: '⚠️',
      color: 'amber',
      description: 'Serious but stable',
    },
    {
      value: 'low' as const,
      label: 'LOW PRIORITY',
      icon: '✅',
      color: 'green',
      description: 'Non-emergency transport',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg">
          <ArrowLeft className="h-6 w-6 text-slate-700" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">Patient Assessment</h1>
        <span className="text-sm text-slate-600">1 of 2</span>
      </header>

      {/* Main Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">How Critical is the Patient?</h2>
        <p className="text-slate-600">Select the urgency level</p>
      </div>

      {/* Priority Buttons */}
      <div className="space-y-4 mb-8">
        {priorities.map((priority) => (
          <Card
            key={priority.value}
            onClick={() => setSelected(priority.value)}
            className={`p-6 cursor-pointer transition-all ${
              selected === priority.value
                ? priority.color === 'red'
                  ? 'bg-red-600 border-red-700 text-white'
                  : priority.color === 'amber'
                    ? 'bg-amber-500 border-amber-600 text-white'
                    : 'bg-green-600 border-green-700 text-white'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{priority.icon}</span>
              <div className="flex-1">
                <h3
                  className={`text-lg font-bold ${selected === priority.value ? 'text-white' : 'text-slate-900'}`}
                >
                  {priority.label}
                </h3>
                <p
                  className={`text-sm ${selected === priority.value ? 'text-white/90' : 'text-slate-600'}`}
                >
                  {priority.description}
                </p>
              </div>
              <div
                className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  selected === priority.value
                    ? 'bg-white border-white'
                    : 'border-slate-300'
                }`}
              >
                {selected === priority.value && (
                  <div className={`h-3 w-3 rounded-full bg-${priority.color}-600`} />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-lg font-semibold"
      >
        Next: Select Hospital Type
      </Button>
    </div>
  )
}

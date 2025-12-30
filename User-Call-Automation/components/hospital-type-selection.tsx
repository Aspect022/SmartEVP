'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

type Props = {
  onConfirm: (types: string[]) => void
  onBack: () => void
}

export default function HospitalTypeSelection({ onConfirm, onBack }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const hospitalTypes = [
    { id: 'multi-specialty', name: 'Multi-Specialty Hospital', icon: '🏥' },
    { id: 'cardiac', name: 'Cardiac Care Center', icon: '❤️' },
    { id: 'trauma', name: 'Trauma Center', icon: '🚑' },
    { id: 'maternity', name: 'Maternity/Gynecology', icon: '👶' },
    { id: 'pediatric', name: 'Pediatric Hospital', icon: '🧸' },
    { id: 'neurology', name: 'Neurology Center', icon: '🧠' },
    { id: 'orthopedic', name: 'Orthopedic Center', icon: '🦴' },
    { id: 'general', name: 'General Hospital', icon: '🏨' },
  ]

  const toggleType = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg">
          <ArrowLeft className="h-6 w-6 text-slate-700" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">Hospital Requirements</h1>
        {selected.length > 0 && (
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {selected.length} selected
          </span>
        )}
      </header>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Hospital Type(s) Needed</h2>
        <p className="text-slate-600">Multiple selections allowed</p>
      </div>

      {/* Hospital Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {hospitalTypes.map((type) => (
          <Card
            key={type.id}
            onClick={() => toggleType(type.id)}
            className={`p-4 cursor-pointer transition-all ${
              selected.includes(type.id)
                ? 'bg-blue-50 border-blue-600 border-2'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{type.icon}</div>
              <p
                className={`text-sm font-semibold ${
                  selected.includes(type.id) ? 'text-blue-900' : 'text-slate-900'
                }`}
              >
                {type.name}
              </p>
              <div className="mt-2 flex justify-center">
                <div
                  className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                    selected.includes(type.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  {selected.includes(type.id) && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirm Button */}
      <Button
        onClick={() => onConfirm(selected)}
        disabled={selected.length === 0}
        className="w-full h-14 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white text-lg font-semibold"
      >
        {selected.length > 0
          ? `Navigate with ${selected.length} hospital type${selected.length > 1 ? 's' : ''}`
          : 'Select at least one type'}
      </Button>
    </div>
  )
}

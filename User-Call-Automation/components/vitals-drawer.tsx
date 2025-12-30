'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import type { VitalsRecord } from '@/app/page'

type Props = {
  onSave: (vitals: VitalsRecord) => void
  onClose: () => void
}

export default function VitalsDrawer({ onSave, onClose }: Props) {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [heartRate, setHeartRate] = useState('')
  const [spo2, setSpo2] = useState('')
  const [temperature, setTemperature] = useState('')
  const [respiratoryRate, setRespiratoryRate] = useState('')
  const [consciousness, setConsciousness] = useState('alert')
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    const vitals: VitalsRecord = {
      id: Date.now().toString(),
      timestamp: new Date(),
      bloodPressure:
        systolic && diastolic
          ? { systolic: parseInt(systolic), diastolic: parseInt(diastolic) }
          : null,
      heartRate: heartRate ? parseInt(heartRate) : null,
      spo2: spo2 ? parseInt(spo2) : null,
      temperature: temperature ? parseFloat(temperature) : null,
      respiratoryRate: respiratoryRate ? parseInt(respiratoryRate) : null,
      consciousness,
      notes,
    }

    onSave(vitals)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50">
      <Card className="w-full max-h-[85vh] bg-white rounded-t-2xl p-6 overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Record Vitals</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Blood Pressure */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blood Pressure (mmHg)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Systolic"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="flex-1"
              />
              <span className="self-center text-slate-600">/</span>
              <Input
                type="number"
                placeholder="Diastolic"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Heart Rate */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Heart Rate (BPM)
            </label>
            <Input
              type="number"
              placeholder="e.g., 85"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
            />
          </div>

          {/* SpO2 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              SpO2 (%)
            </label>
            <Input
              type="number"
              placeholder="e.g., 97"
              value={spo2}
              onChange={(e) => setSpo2(e.target.value)}
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Temperature (°F)
            </label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 98.6"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>

          {/* Respiratory Rate */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Respiratory Rate (breaths/min)
            </label>
            <Input
              type="number"
              placeholder="e.g., 16"
              value={respiratoryRate}
              onChange={(e) => setRespiratoryRate(e.target.value)}
            />
          </div>

          {/* Consciousness */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Consciousness Level
            </label>
            <select
              value={consciousness}
              onChange={(e) => setConsciousness(e.target.value)}
              className="w-full h-10 px-3 border border-slate-300 rounded-lg bg-white text-slate-900"
            >
              <option value="alert">Alert</option>
              <option value="verbal">Responds to Verbal</option>
              <option value="pain">Responds to Pain</option>
              <option value="unresponsive">Unresponsive</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Additional Notes
            </label>
            <Textarea
              placeholder="Any other observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-12 mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Save Vitals
        </Button>
      </Card>
    </div>
  )
}

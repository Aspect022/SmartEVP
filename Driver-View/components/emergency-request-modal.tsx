'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

type Props = {
  onAccept: () => void
  onDecline: () => void
}

export default function EmergencyRequestModal({ onAccept, onDecline }: Props) {
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onDecline()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onDecline])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md bg-white p-6 relative animate-scale-in">
        {/* Top Section */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🚨</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">EMERGENCY REQUEST</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-slate-700">2.3 km away</span>
            <span className="text-slate-500">📍</span>
          </div>
          <div
            className={`mt-3 text-4xl font-bold ${
              countdown <= 10 ? 'text-red-600 animate-pulse' : 'text-slate-900'
            }`}
          >
            00:{countdown.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <span className="text-lg">📍</span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Address</p>
              <p className="text-sm text-slate-600">Indiranagar, Bengaluru, Karnataka 560038</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">📞</span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Contact</p>
              <a href="tel:+919876543210" className="text-sm text-blue-600 hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">🏥</span>
            <div>
              <p className="text-sm font-semibold text-slate-700">Condition</p>
              <p className="text-sm text-slate-600">Chest pain, difficulty breathing</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">⏱️</span>
            <div>
              <p className="text-sm font-semibold text-slate-700">ETA</p>
              <p className="text-sm text-slate-600">8 minutes</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onAccept}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
          >
            Accept Request
          </Button>
          <button
            onClick={onDecline}
            className="w-full text-slate-600 hover:text-slate-900 text-sm font-medium"
          >
            Decline
          </button>
        </div>
      </Card>
    </div>
  )
}

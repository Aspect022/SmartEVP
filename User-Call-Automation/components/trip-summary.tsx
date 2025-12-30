'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Trip } from '@/app/page'
import { useState } from 'react'

type Props = {
  trip: Trip
  onReturnHome: () => void
}

export default function TripSummary({ trip, onReturnHome }: Props) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  const duration = trip.startTime
    ? Math.floor((new Date().getTime() - trip.startTime.getTime()) / 1000 / 60)
    : 18

  const handleShare = () => {
    setIsSharing(true)
    setTimeout(() => {
      setIsSharing(false)
      setShareComplete(true)
    }, 3000) // 3 second animation
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24">
      {isSharing && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
          <div className="relative">
            {/* Animated circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-blue-200 animate-ping opacity-75"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animation-delay-150">
              <div className="h-24 w-24 rounded-full bg-blue-300 animate-ping opacity-75"></div>
            </div>
            
            {/* Hospital icon */}
            <div className="relative z-10 h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg 
                className="w-12 h-12 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
              </svg>
            </div>
          </div>
          
          {/* Sharing text */}
          <p className="mt-8 text-xl font-bold text-slate-900 animate-pulse">
            Sharing with Hospital...
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Sending trip data securely
          </p>
        </div>
      )}

      {shareComplete && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
            <svg 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Details Shared!</h2>
          <p className="text-slate-600 text-center px-8 mb-8">
            Trip data has been successfully sent to {trip.destination.name}
          </p>
          
          <Button 
            onClick={onReturnHome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Return to Dashboard
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Trip Completed Successfully</h1>
        <p className="text-slate-600">All data has been recorded</p>
      </div>

      {/* Trip Statistics */}
      <Card className="p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Trip Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Duration</p>
            <p className="text-xl font-bold text-slate-900">{duration} minutes</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Distance</p>
            <p className="text-xl font-bold text-slate-900">5.2 km</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Average Speed</p>
            <p className="text-xl font-bold text-slate-900">17.3 km/h</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Criticality</p>
            <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
              {trip.priority?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Hospital</p>
          <p className="font-semibold text-slate-900">{trip.destination.name}</p>
        </div>
      </Card>

      {/* Voice Notes */}
      {trip.voiceNotes.length > 0 && (
        <Card className="p-6 mb-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Voice Notes</h2>
          <div className="space-y-3">
            {trip.voiceNotes.map((note) => (
              <div key={note.id} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    🎙️ Voice Recording - {note.duration} seconds
                  </span>
                  <span className="text-xs text-slate-600">
                    {note.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3">{note.transcription}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Vitals */}
      {trip.vitals.length > 0 && (
        <Card className="p-6 mb-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Vitals Recorded</h2>
          <p className="text-sm text-slate-600 mb-4">
            {trip.vitals.length} vital sign record{trip.vitals.length > 1 ? 's' : ''}
          </p>
          <div className="space-y-3">
            {trip.vitals.map((vital) => (
              <div key={vital.id} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Vital Signs</span>
                  <span className="text-xs text-slate-600">
                    {vital.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {vital.bloodPressure && (
                    <div>
                      <span className="text-slate-600">BP: </span>
                      <span className="font-semibold text-slate-900">
                        {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                      </span>
                    </div>
                  )}
                  {vital.heartRate && (
                    <div>
                      <span className="text-slate-600">HR: </span>
                      <span className="font-semibold text-slate-900">{vital.heartRate} BPM</span>
                    </div>
                  )}
                  {vital.spo2 && (
                    <div>
                      <span className="text-slate-600">SpO2: </span>
                      <span className="font-semibold text-slate-900">{vital.spo2}%</span>
                    </div>
                  )}
                  {vital.temperature && (
                    <div>
                      <span className="text-slate-600">Temp: </span>
                      <span className="font-semibold text-slate-900">{vital.temperature}°F</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-slate-600">Level: </span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {vital.consciousness}
                  </span>
                </div>
                {vital.notes && (
                  <p className="mt-2 text-sm text-slate-600 italic">{vital.notes}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 space-y-3 z-[1000]">
        <Button 
          onClick={handleShare}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Share with Hospital
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 border-slate-300"
        >
          Download Report
        </Button>
        <button
          onClick={onReturnHome}
          className="w-full text-slate-600 hover:text-slate-900 text-sm font-medium py-2"
        >
          Return Home
        </button>
      </div>
    </div>
  )
}

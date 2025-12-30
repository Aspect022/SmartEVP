'use client'

import { useState } from 'react'
import HomeDashboard from '@/components/home-dashboard'
import EmergencyRequestModal from '@/components/emergency-request-modal'
import CriticalitySelector from '@/components/criticality-selector'
import HospitalTypeSelection from '@/components/hospital-type-selection'
import ActiveNavigation from '@/components/active-navigation'
import TripSummary from '@/components/trip-summary'

export type Screen = 'home' | 'emergency' | 'criticality' | 'hospital' | 'navigation' | 'summary'
export type Priority = 'high' | 'medium' | 'low' | null
export type Trip = {
  emergencyLocation: { lat: number; lng: number }
  address: string
  contact: string
  condition: string
  priority: Priority
  hospitalTypes: string[]
  destination: { name: string; lat: number; lng: number }
  startTime: Date
  voiceNotes: VoiceNote[]
  vitals: VitalsRecord[]
}

export type VoiceNote = {
  id: string
  timestamp: Date
  duration: number
  transcription: string
}

export type VitalsRecord = {
  id: string
  timestamp: Date
  bloodPressure: { systolic: number; diastolic: number } | null
  heartRate: number | null
  spo2: number | null
  temperature: number | null
  respiratoryRate: number | null
  consciousness: string
  notes: string
}

export default function AmbulanceDashboard() {
  const [screen, setScreen] = useState<Screen>('home')
  const [isOnline, setIsOnline] = useState(false)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)
  const [activeTrip, setActiveTrip] = useState<Partial<Trip> | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      {screen === 'home' && (
        <HomeDashboard
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          showEmergencyAlert={showEmergencyAlert}
          setShowEmergencyAlert={setShowEmergencyAlert}
          onAcceptEmergency={() => setScreen('emergency')}
        />
      )}
      
      {screen === 'emergency' && showEmergencyAlert && (
        <EmergencyRequestModal
          onAccept={() => {
            setScreen('criticality')
            setActiveTrip({
              emergencyLocation: { lat: 12.975, lng: 77.6 },
              address: 'Indiranagar, Bengaluru, Karnataka 560038',
              contact: '+91 98765 43210',
              condition: 'Chest pain, difficulty breathing',
              startTime: new Date(),
              voiceNotes: [],
              vitals: [],
            })
          }}
          onDecline={() => {
            setScreen('home')
            setShowEmergencyAlert(false)
          }}
        />
      )}
      
      {screen === 'criticality' && (
        <CriticalitySelector
          onNext={(priority) => {
            setActiveTrip((prev) => ({ ...prev, priority }))
            setScreen('hospital')
          }}
          onBack={() => setScreen('emergency')}
        />
      )}
      
      {screen === 'hospital' && (
        <HospitalTypeSelection
          onConfirm={(hospitalTypes) => {
            setActiveTrip((prev) => ({
              ...prev,
              hospitalTypes,
              destination: {
                name: 'Apollo Hospital',
                lat: 12.98,
                lng: 77.61,
              },
            }))
            setScreen('navigation')
          }}
          onBack={() => setScreen('criticality')}
        />
      )}
      
      {screen === 'navigation' && activeTrip && (
        <ActiveNavigation
          trip={activeTrip as Trip}
          onUpdateTrip={setActiveTrip}
          onComplete={() => setScreen('summary')}
        />
      )}
      
      {screen === 'summary' && activeTrip && (
        <TripSummary
          trip={activeTrip as Trip}
          onReturnHome={() => {
            setScreen('home')
            setActiveTrip(null)
            setShowEmergencyAlert(false)
          }}
        />
      )}
    </div>
  )
}

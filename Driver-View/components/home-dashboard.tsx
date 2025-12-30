'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

type Props = {
  isOnline: boolean
  setIsOnline: (value: boolean) => void
  showEmergencyAlert: boolean
  setShowEmergencyAlert: (value: boolean) => void
  onAcceptEmergency: () => void
}

export default function HomeDashboard({
  isOnline,
  setIsOnline,
  showEmergencyAlert,
  setShowEmergencyAlert,
  onAcceptEmergency,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [currentLocation] = useState({ lat: 12.9716, lng: 77.5946 })
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const loadLeaflet = async () => {
      // Dynamically import Leaflet
      const L = (await import('leaflet')).default

      // Initialize map
      const map = L.map(mapRef.current!, {
        center: [currentLocation.lat, currentLocation.lng],
        zoom: 14,
        zoomControl: true,
      })

      // Add OpenStreetMap tiles (free, no API key needed)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Custom ambulance icon
      const ambulanceIcon = L.divIcon({
        html: `<div style="font-size: 32px; filter: ${isOnline ? 'none' : 'grayscale(100%)'};">${isOnline ? '🚑' : '🚐'}</div>`,
        className: 'custom-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      // Add ambulance marker
      L.marker([currentLocation.lat, currentLocation.lng], {
        icon: ambulanceIcon,
      }).addTo(map)

      // Add 5km radius circle
      L.circle([currentLocation.lat, currentLocation.lng], {
        color: isOnline ? '#DC2626' : '#9CA3AF',
        fillColor: isOnline ? '#DC2626' : '#9CA3AF',
        fillOpacity: 0.1,
        radius: 5000,
        weight: 2,
      }).addTo(map)

      mapInstanceRef.current = map
      setIsMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [currentLocation.lat, currentLocation.lng, isOnline])

  // Simulate emergency request after going online
  useEffect(() => {
    if (isOnline && !showEmergencyAlert) {
      const timeout = setTimeout(() => {
        setShowEmergencyAlert(true)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isOnline, showEmergencyAlert, setShowEmergencyAlert])

  return (
    <div className="relative h-screen w-full flex flex-col">
      <header className="relative z-[1000] bg-white shadow-md flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🚑</div>
            <h1 className="text-lg font-bold text-red-600">SmartEVP</h1>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">Rajesh Kumar</p>
            <p className="text-xs text-slate-600">Driver</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isOnline ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isOnline ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {showEmergencyAlert && (
        <div
          className="absolute top-[60px] left-0 right-0 z-[1001] animate-slide-down cursor-pointer"
          onClick={onAcceptEmergency}
        >
          <div className="mx-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse">
            <p className="text-center font-semibold">
              🚨 New Emergency Request - 2.3 km away
            </p>
            <p className="text-center text-sm mt-1">Tap to view details</p>
          </div>
        </div>
      )}

      <div className="relative flex-1">
        <div ref={mapRef} className="absolute inset-0 w-full h-full" />

        {/* Loading overlay */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-[500]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto" />
              <p className="mt-2 text-sm text-slate-600">Loading map...</p>
            </div>
          </div>
        )}

        {/* Bottom Stats Card */}
        <Card className="absolute bottom-4 left-4 right-4 z-[600] p-4 bg-white shadow-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">7</p>
              <p className="text-xs text-slate-600">Today's Trips</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">8.2</p>
              <p className="text-xs text-slate-600">Avg Response (min)</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-600' : 'bg-gray-400'}`} />
                <p className="text-sm font-semibold text-slate-900">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <p className="text-xs text-slate-600">Status</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

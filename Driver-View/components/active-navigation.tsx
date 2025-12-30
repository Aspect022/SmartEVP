"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Activity, CheckCircle2 } from "lucide-react"
import type { Trip, VoiceNote, VitalsRecord } from "@/app/page"
import VoiceRecordingModal from "@/components/voice-recording-modal"
import VitalsDrawer from "@/components/vitals-drawer"

type Props = {
  trip: Trip
  onUpdateTrip: (trip: Partial<Trip>) => void
  onComplete: () => void
}

type TrafficSignal = {
  position: [number, number]
  status: "red" | "yellow" | "green"
  distance: number
}

export default function ActiveNavigation({ trip, onUpdateTrip, onComplete }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [eta, setEta] = useState("12 min")
  const [distance, setDistance] = useState("4.2 km")
  const [speed, setSpeed] = useState("45 km/h")
  const [preemptionActive, setPreemptionActive] = useState(true)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [showVitalsDrawer, setShowVitalsDrawer] = useState(false)
  const [trafficSignals, setTrafficSignals] = useState<TrafficSignal[]>([])
  const signalMarkersRef = useRef<any[]>([])
  const currentLocation = { lat: 12.9716, lng: 77.5946 }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const loadLeaflet = async () => {
      // Dynamically import Leaflet
      const L = (await import("leaflet")).default

      // Initialize map
      const map = L.map(mapRef.current!, {
        center: [currentLocation.lat, currentLocation.lng],
        zoom: 13,
        zoomControl: true,
      })

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map)

      // Ambulance marker
      const ambulanceIcon = L.divIcon({
        html: '<div style="font-size: 32px;">🚑</div>',
        className: "custom-icon",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      L.marker([currentLocation.lat, currentLocation.lng], {
        icon: ambulanceIcon,
      }).addTo(map)

      // Hospital marker
      const hospitalIcon = L.divIcon({
        html: '<div style="font-size: 32px;">🏥</div>',
        className: "custom-icon",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      L.marker([trip.destination.lat, trip.destination.lng], {
        icon: hospitalIcon,
      }).addTo(map)

      // Draw route line
      const routeLine = L.polyline(
        [
          [currentLocation.lat, currentLocation.lng],
          [trip.destination.lat, trip.destination.lng],
        ],
        {
          color: "#2563EB",
          weight: 4,
          opacity: 0.7,
        },
      ).addTo(map)

      const generateTrafficSignals = () => {
        const signals: TrafficSignal[] = []
        const latDiff = trip.destination.lat - currentLocation.lat
        const lngDiff = trip.destination.lng - currentLocation.lng
        const numSignals = 5 // 5 signals along the route

        for (let i = 1; i <= numSignals; i++) {
          const fraction = i / (numSignals + 1)
          const signalLat = currentLocation.lat + latDiff * fraction
          const signalLng = currentLocation.lng + lngDiff * fraction

          signals.push({
            position: [signalLat, signalLng],
            status: "red",
            distance: 4.2 * (1 - fraction), // Distance in km
          })
        }

        return signals
      }

      const initialSignals = generateTrafficSignals()
      setTrafficSignals(initialSignals)

      initialSignals.forEach((signal) => {
        const signalIcon = L.divIcon({
          html: `
            <div style="
              width: 12px;
              height: 12px;
              background-color: #ef4444;
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          className: "traffic-signal-icon",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        })

        const marker = L.marker(signal.position, { icon: signalIcon }).addTo(map)
        signalMarkersRef.current.push(marker)
      })

      // Fit map to show both markers
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] })

      mapInstanceRef.current = map
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [trip.destination, currentLocation.lat, currentLocation.lng])

  useEffect(() => {
    if (trafficSignals.length === 0) return

    const interval = setInterval(async () => {
      const L = (await import("leaflet")).default

      setTrafficSignals((prevSignals) => {
        const updatedSignals = prevSignals.map((signal, index) => {
          // Signals turn yellow then green progressively
          if (signal.distance > 2.5) {
            return { ...signal, status: "red" as const }
          } else if (signal.distance > 1.5) {
            return { ...signal, status: "yellow" as const }
          } else {
            return { ...signal, status: "green" as const }
          }
        })

        // Update marker colors
        updatedSignals.forEach((signal, index) => {
          if (signalMarkersRef.current[index]) {
            const color = signal.status === "green" ? "#22c55e" : signal.status === "yellow" ? "#eab308" : "#ef4444"

            const newIcon = L.divIcon({
              html: `
                <div style="
                  width: 12px;
                  height: 12px;
                  background-color: ${color};
                  border: 2px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  ${signal.status === "green" ? "animation: pulse 1s infinite;" : ""}
                "></div>
              `,
              className: "traffic-signal-icon",
              iconSize: [12, 12],
              iconAnchor: [6, 6],
            })

            signalMarkersRef.current[index].setIcon(newIcon)
          }
        })

        // Decrease distance for all signals (simulating movement)
        return updatedSignals.map((signal) => ({
          ...signal,
          distance: Math.max(0, signal.distance - 0.2),
        }))
      })
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [trafficSignals.length])

  const handleVoiceNoteSave = (note: VoiceNote) => {
    onUpdateTrip({ ...trip, voiceNotes: [...trip.voiceNotes, note] })
  }

  const handleVitalsSave = (vitals: VitalsRecord) => {
    onUpdateTrip({ ...trip, vitals: [...trip.vitals, vitals] })
  }

  return (
    <div className="relative h-screen w-full">
      {/* Map */}
      <div ref={mapRef} className="h-full w-full" />

      {/* Top Info Bar */}
      <Card className="absolute top-4 left-4 right-4 z-[1000] bg-white/95 backdrop-blur p-4">
        <h3 className="font-semibold text-slate-900 mb-1">{trip.destination.name}</h3>
        <div className="flex items-baseline gap-4">
          <div>
            <span className="text-3xl font-bold text-blue-600">{eta}</span>
            <span className="text-sm text-slate-600 ml-2">ETA</span>
          </div>
          <div className="text-sm text-slate-600">
            <div>{distance} remaining</div>
            <div>Current speed: {speed}</div>
          </div>
        </div>
      </Card>

      {/* SmartEVP Preemption Status */}
      <Card
        className={`absolute top-32 right-4 z-[1000] p-3 ${
          preemptionActive ? "bg-green-50 border-green-600" : "bg-slate-100 border-slate-300"
        }`}
      >
        <div className="flex items-center gap-2">
          {preemptionActive && <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />}
          <div>
            <p className={`text-xs font-semibold ${preemptionActive ? "text-green-900" : "text-slate-700"}`}>
              {preemptionActive ? "Preemption Active" : "Preemption Inactive"}
            </p>
            {preemptionActive && <p className="text-xs text-green-700">Green Lights Ahead</p>}
            <p className="text-xs text-slate-600 mt-1">Next signal: 200m</p>
          </div>
        </div>
      </Card>

      {/* Bottom Control Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          {/* Record Vitals */}
          <Button onClick={() => setShowVitalsDrawer(true)} variant="outline" className="flex-1 h-12 border-slate-300">
            <Activity className="h-5 w-5 mr-2" />
            <span className="text-sm">
              Vitals
              {trip.vitals.length > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {trip.vitals.length}
                </span>
              )}
            </span>
          </Button>

          {/* Voice Recording */}
          <Button onClick={() => setShowVoiceModal(true)} className="flex-1 h-12 bg-red-600 hover:bg-red-700">
            <Mic className="h-5 w-5 mr-2" />
            <span className="text-sm">Record</span>
          </Button>

          {/* Complete Trip */}
          <Button onClick={onComplete} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="text-sm">Complete</span>
          </Button>
        </div>
      </div>

      {/* Voice Recording Modal */}
      {showVoiceModal && <VoiceRecordingModal onSave={handleVoiceNoteSave} onClose={() => setShowVoiceModal(false)} />}

      {/* Vitals Drawer */}
      {showVitalsDrawer && <VitalsDrawer onSave={handleVitalsSave} onClose={() => setShowVitalsDrawer(false)} />}
    </div>
  )
}

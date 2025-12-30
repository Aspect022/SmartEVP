'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { VoiceNote } from '@/app/page'

type Props = {
  onSave: (note: VoiceNote) => void
  onClose: () => void
}

export default function VoiceRecordingModal({ onSave, onClose }: Props) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [duration, setDuration] = useState(0)
  const recognitionRef = useRef<any>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-IN'

      recognitionRef.current.onresult = (event: any) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setTranscription(transcript)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = () => {
    setIsRecording(true)
    setTranscription('')
    setDuration(0)

    if (recognitionRef.current) {
      recognitionRef.current.start()
    } else {
      // Demo fallback
      setTranscription(
        'Patient is a 45-year-old male complaining of severe chest pain radiating to left arm for the past 30 minutes. Patient appears anxious, skin is pale and clammy...'
      )
    }

    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const note: VoiceNote = {
      id: Date.now().toString(),
      timestamp: new Date(),
      duration,
      transcription: transcription || 'Patient is a 45-year-old male complaining of severe chest pain...',
    }

    onSave(note)
    onClose()
  }

  useEffect(() => {
    if (!isRecording) {
      startRecording()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
      <Card className="w-full max-w-md bg-white p-6">
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
              <div className="text-4xl">🎙️</div>
            </div>
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping" />
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </h2>
          <p className="text-sm text-slate-600">Speak patient details clearly</p>
          <div className="mt-3 text-2xl font-bold text-red-600">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Transcription Preview */}
        {transcription && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg max-h-40 overflow-y-auto">
            <p className="text-sm text-slate-700">{transcription}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isRecording ? (
            <Button
              onClick={stopRecording}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Stop Recording
            </Button>
          ) : (
            <Button
              onClick={startRecording}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Start Recording
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-12 border-slate-300"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}

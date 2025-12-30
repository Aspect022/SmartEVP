'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Play, Square, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Sample emergency call transcriptions for simulation with varied criticality
const SAMPLE_CALLS = [
  // HIGH CRITICALITY
  {
    phone_number: '+91 98765 43210',
    transcription: 'URGENT! My father is having severe chest pain and difficulty breathing! He is 65 years old, looks very pale and is sweating. We are at 123 MG Road, near the Metro station, Bangalore. He cannot breathe properly. Please send ambulance immediately! This is life-threatening!',
  },
  {
    phone_number: '+91 98765 43211',
    transcription: 'EMERGENCY! Road accident on Outer Ring Road, near Marathahalli bridge. Multiple people injured, one person is unconscious and not responding. There is heavy bleeding. Please send ambulance quickly! This is critical!',
  },
  {
    phone_number: '+91 98765 43214',
    transcription: 'HELP! My child is having a severe allergic reaction! She is 8 years old, having extreme trouble breathing, her face is swollen and she is turning blue. We are at 789 Koramangala, near Forum Mall, Bangalore. Please hurry! This is an emergency!',
  },
  {
    phone_number: '+91 98765 43215',
    transcription: 'CRITICAL! My mother collapsed and is unconscious! She is not responding to anything. She is 70 years old. We are at 321 Whitefield Main Road, Bangalore. Please send help immediately! She has a history of heart problems!',
  },
  // MEDIUM CRITICALITY
  {
    phone_number: '+91 98765 43212',
    transcription: 'I need medical help. My wife is having severe abdominal pain and vomiting. We live at 456 Indiranagar, 2nd main road, Bangalore. She is 35 years old. The pain started about an hour ago and is getting worse. She is conscious but in a lot of pain.',
  },
  {
    phone_number: '+91 98765 43213',
    transcription: 'Ambulance needed! My neighbor fell down the stairs and cannot move his leg. He is 50 years old, male. We are at apartment complex Green Valley, Whitefield, Bangalore. He hit his head and there is some bleeding but he is conscious and talking.',
  },
  {
    phone_number: '+91 98765 43216',
    transcription: 'Hello, I need an ambulance. My husband has severe back pain after lifting something heavy. He is 45 years old. We are at 567 HSR Layout, Bangalore. He is in pain but can still move. Please send help when possible.',
  },
  // LOW CRITICALITY
  {
    phone_number: '+91 98765 43217',
    transcription: 'Hi, I need medical assistance. My daughter has a high fever and headache. She is 12 years old. We are at 890 Jayanagar, Bangalore. She is alert and responsive but feeling unwell. Can you send an ambulance?',
  },
  {
    phone_number: '+91 98765 43218',
    transcription: 'Good morning, I need help transporting my elderly father to the hospital. He is 80 years old and has difficulty walking. We are at 234 Basavanagudi, Bangalore. He is stable but needs medical transport. This is not urgent.',
  },
]

export default function CallSimulator() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalCalls, setTotalCalls] = useState(100)
  const [processedCalls, setProcessedCalls] = useState(0)
  const { toast } = useToast()

  const generateRandomCall = () => {
    const baseCall = SAMPLE_CALLS[Math.floor(Math.random() * SAMPLE_CALLS.length)]
    const randomPhone = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`
    
    return {
      phone_number: randomPhone,
      transcription: baseCall.transcription,
    }
  }

  const simulateCalls = async () => {
    setIsSimulating(true)
    setProcessedCalls(0)
    setProgress(0)

    const calls = Array.from({ length: totalCalls }, () => generateRandomCall())
    
    // Process in batches of 10 to avoid overwhelming the API
    const batchSize = 10
    const batches = []
    
    for (let i = 0; i < calls.length; i += batchSize) {
      batches.push(calls.slice(i, i + batchSize))
    }

    try {
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        
        // Process batch
        const response = await fetch('/api/calls/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batch),
        })

        if (!response.ok) {
          throw new Error('Failed to process batch')
        }

        const result = await response.json()
        setProcessedCalls((prev) => prev + result.processed)
        setProgress(((i + 1) / batches.length) * 100)

        // Small delay between batches
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      toast({
        title: 'Simulation Complete',
        description: `Successfully processed ${totalCalls} calls.`,
      })
    } catch (error: any) {
      toast({
        title: 'Simulation Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsSimulating(false)
    }
  }

  const stopSimulation = () => {
    setIsSimulating(false)
    toast({
      title: 'Simulation Stopped',
      description: `Processed ${processedCalls} calls before stopping.`,
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Call Simulator</h2>
      <p className="text-slate-600 mb-6">
        Simulate multiple emergency calls to test the automated processing system.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="totalCalls">Number of Calls to Simulate</Label>
          <Input
            id="totalCalls"
            type="number"
            value={totalCalls}
            onChange={(e) => setTotalCalls(parseInt(e.target.value) || 100)}
            disabled={isSimulating}
            className="mt-1"
            min={1}
            max={1000}
          />
        </div>

        {isSimulating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="font-semibold">
                {processedCalls} / {totalCalls} calls
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="flex gap-3">
          {!isSimulating ? (
            <Button
              onClick={simulateCalls}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Simulation
            </Button>
          ) : (
            <Button
              onClick={stopSimulation}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Simulation
            </Button>
          )}
          <Button
            onClick={() => {
              setProcessedCalls(0)
              setProgress(0)
            }}
            variant="outline"
            disabled={isSimulating}
            size="lg"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}


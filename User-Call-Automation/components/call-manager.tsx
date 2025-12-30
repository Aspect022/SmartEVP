'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CallQueue from '@/components/call-queue'
import CallForm from '@/components/call-form'
import DispatchModal from '@/components/dispatch-modal'
import type { CallData, CallFormData } from '@/types/call'
import { Phone } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CallManager() {
  const [selectedCall, setSelectedCall] = useState<CallData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const { toast } = useToast()

  const handleCallSelect = (call: CallData) => {
    setSelectedCall(call)
  }

  const handleSave = (formData: CallFormData) => {
    toast({
      title: 'Call details saved',
      description: `Call ${formData.callId} has been saved successfully.`,
    })
  }

  const handleAccept = () => {
    if (selectedCall) {
      setShowDispatchModal(true)
    }
  }

  const handleDispatchConfirm = () => {
    if (selectedCall) {
      toast({
        title: 'Ambulance Dispatched',
        description: `Ambulance has been successfully dispatched for call ${selectedCall.call_id}`,
      })
      // Navigate to navigation screen or update call status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-red-600 flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Emergency Call Management
              </h1>
              <p className="text-sm text-slate-600">
                AI-powered automated call processing
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Call Queue - Left Sidebar */}
          <div className="lg:col-span-1">
            <CallQueue
              onCallSelect={handleCallSelect}
              selectedCallId={selectedCall?.call_id}
            />
          </div>

          {/* Call Details - Right Side */}
          <div className="lg:col-span-2">
            {selectedCall ? (
              <CallForm
                callData={selectedCall}
                onSave={handleSave}
                onAccept={handleAccept}
              />
            ) : (
              <Card className="p-12 text-center">
                <Phone className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  No Call Selected
                </h3>
                <p className="text-slate-500">
                  Select a call from the queue to view and manage details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && selectedCall && (
        <DispatchModal
          callData={selectedCall}
          onConfirm={handleDispatchConfirm}
          onClose={() => setShowDispatchModal(false)}
        />
      )}
    </div>
  )
}


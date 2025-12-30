'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, CheckCircle2, Loader2 } from 'lucide-react'
import type { CallData } from '@/types/call'

type Props = {
  callData: CallData
  onConfirm: () => void
  onClose: () => void
}

export default function DispatchModal({ callData, onConfirm, onClose }: Props) {
  const [isDispatching, setIsDispatching] = useState(false)

  const handleDispatch = async () => {
    setIsDispatching(true)
    // Simulate dispatch process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsDispatching(false)
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50">
      <Card className="w-full max-w-md bg-white rounded-t-2xl p-6 overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Dispatch Ambulance</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-100 rounded"
            disabled={isDispatching}
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Call Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-semibold text-slate-700">Call ID:</span>
                <span className="text-sm text-slate-600 ml-2">{callData.call_id}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700">Location:</span>
                <span className="text-sm text-slate-600 ml-2">
                  {callData.address || callData.location?.address || 'Address not specified'}
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700">Condition:</span>
                <span className="text-sm text-slate-600 ml-2">
                  {callData.condition || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-700">Criticality:</span>
                <span className={`text-sm ml-2 px-2 py-1 rounded ${
                  callData.criticality === 'high' ? 'bg-red-100 text-red-700' :
                  callData.criticality === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {callData.criticality?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
            </div>
          </div>

          {isDispatching && (
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Dispatching ambulance...</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleDispatch}
            disabled={isDispatching}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            {isDispatching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Dispatching...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Dispatch
              </>
            )}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isDispatching}
            className="w-full h-12 border-slate-300"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}


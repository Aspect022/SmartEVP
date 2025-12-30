'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CallData, CallFormData } from '@/types/call'
import { MapPin, Phone, Calendar, User, AlertTriangle, FileText } from 'lucide-react'

type Props = {
  callData: CallData
  onSave?: (formData: CallFormData) => void
  onAccept?: () => void
  readOnly?: boolean
}

export default function CallForm({ callData, onSave, onAccept, readOnly = false }: Props) {
  const formData: CallFormData = {
    callId: callData.call_id,
    phoneNumber: callData.phone_number,
    timestamp: callData.timestamp,
    location: {
      address: callData.address || callData.location?.address || '',
      landmark: callData.location?.landmark || '',
      city: callData.location?.city || '',
    },
    criticality: callData.criticality || 'medium',
    condition: callData.condition || '',
    patientAge: callData.patient_age || null,
    patientGender: callData.patient_gender || '',
    symptoms: callData.symptoms || [],
    additionalNotes: callData.additional_notes || '',
    transcription: callData.transcription,
  }

  const handleSave = () => {
    if (onSave) {
      onSave(formData)
    }
  }

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'high':
        return 'bg-red-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-white'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <Card className="p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Call Details</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Auto-filled from transcription</p>
          </div>
          <Badge className={`${getCriticalityColor(formData.criticality)} text-sm md:text-lg px-3 md:px-4 py-1.5 md:py-2 w-fit`}>
            {formData.criticality.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span className="font-semibold">Call ID:</span>
            <span>{formData.callId}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span className="font-semibold">Time:</span>
            <span>{new Date(formData.timestamp).toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Phone className="h-4 w-4 md:h-5 md:w-5" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phoneNumber}
              readOnly
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Location Information */}
      <Card className="p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 md:h-5 md:w-5" />
          Location Details
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.location.address}
              readOnly
              className="mt-1"
              placeholder="Address will be auto-filled"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                value={formData.location.landmark}
                readOnly
                className="mt-1"
                placeholder="Nearby landmark"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.location.city}
                readOnly
                className="mt-1"
                placeholder="City name"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Medical Information */}
      <Card className="p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
          Medical Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="criticality">Criticality Level</Label>
            <Select
              value={formData.criticality}
              disabled
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={formData.condition}
              readOnly
              className="mt-1"
              placeholder="Medical condition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Patient Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.patientAge || ''}
                readOnly
                className="mt-1"
                placeholder="Age"
              />
            </div>
            <div>
              <Label htmlFor="gender">Patient Gender</Label>
              <Input
                id="gender"
                value={formData.patientGender}
                readOnly
                className="mt-1"
                placeholder="Gender"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms">Symptoms</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.symptoms.length > 0 ? (
                formData.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {symptom}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-500">No symptoms extracted</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Information */}
      <Card className="p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 md:h-5 md:w-5" />
          Additional Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.additionalNotes}
              readOnly
              className="mt-1"
              rows={3}
              placeholder="Additional notes from the call"
            />
          </div>
          <div>
            <Label htmlFor="transcription">Full Transcription</Label>
            <Textarea
              id="transcription"
              value={formData.transcription}
              readOnly
              className="mt-1"
              rows={6}
              placeholder="Complete call transcription"
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {!readOnly && (
        <div className="flex gap-4">
          {onAccept && (
            <Button
              onClick={onAccept}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Accept & Dispatch Ambulance
            </Button>
          )}
          {onSave && (
            <Button
              onClick={handleSave}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Save Details
            </Button>
          )}
        </div>
      )}
    </div>
  )
}


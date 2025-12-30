'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  MapPin,
  Phone,
  User,
  AlertCircle,
  FileText,
  CheckCircle2,
  X,
  Loader2,
} from 'lucide-react'
import type { Call } from './call-queue'

type Props = {
  call: Call | null
  onClose?: () => void
  onSave?: (callId: string, formData: any) => void
}

export default function CallDetailForm({ call, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (call?.extracted_data) {
      setFormData(call.extracted_data)
    } else {
      setFormData({})
    }
  }, [call])

  if (!call) {
    return (
      <Card className="p-6">
        <div className="text-center py-12 text-slate-500">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a call to view details</p>
        </div>
      </Card>
    )
  }

  const handleSave = async () => {
    if (!onSave) return
    setSaving(true)
    try {
      await onSave(call.call_id, formData)
    } finally {
      setSaving(false)
    }
  }

  const getCriticalityColor = (criticality?: string) => {
    switch (criticality?.toLowerCase()) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'low':
        return 'bg-green-50 border-green-200 text-green-900'
      default:
        return 'bg-slate-50 border-slate-200'
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Call Details</h2>
          <p className="text-sm text-slate-500 mt-1">Auto-filled from AI extraction</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {/* Call Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500">Phone Number</Label>
                <Input value={call.phone_number} disabled className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Call ID</Label>
                <Input value={call.call_id} disabled className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Status</Label>
                <div className="mt-1">
                  <Badge>{call.status}</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Criticality & Urgency */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Criticality & Urgency
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-slate-500">Criticality</Label>
                <div className="mt-1">
                  {formData.criticality ? (
                    <Badge
                      className={`${getCriticalityColor(
                        formData.criticality
                      )} border`}
                    >
                      {formData.criticality.toUpperCase()}
                    </Badge>
                  ) : (
                    <Input
                      placeholder="Not extracted"
                      value={formData.criticality || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, criticality: e.target.value })
                      }
                    />
                  )}
                </div>
              </div>
              <div>
                <Label className="text-xs text-slate-500">Urgency Level</Label>
                <Input
                  value={formData.urgency_level || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, urgency_level: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500">Location</Label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Full Address</Label>
                <Textarea
                  value={formData.address || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                  rows={2}
                />
              </div>
              {formData.coordinates && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-slate-500">Latitude</Label>
                    <Input
                      value={formData.coordinates.lat || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: {
                            ...formData.coordinates,
                            lat: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      type="number"
                      step="any"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Longitude</Label>
                    <Input
                      value={formData.coordinates.lng || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: {
                            ...formData.coordinates,
                            lng: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      type="number"
                      step="any"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Patient Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-slate-500">Age</Label>
                <Input
                  value={formData.patient_age || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patient_age: parseInt(e.target.value) || null,
                    })
                  }
                  type="number"
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Gender</Label>
                <Input
                  value={formData.patient_gender || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, patient_gender: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Medical Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500">Condition</Label>
                <Input
                  value={formData.condition || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Symptoms</Label>
                <Textarea
                  value={
                    Array.isArray(formData.symptoms)
                      ? formData.symptoms.join(', ')
                      : formData.symptoms || ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      symptoms: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Medical History</Label>
                <Textarea
                  value={formData.medical_history || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, medical_history: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Current Medications</Label>
                <Textarea
                  value={
                    Array.isArray(formData.current_medications)
                      ? formData.current_medications.join(', ')
                      : formData.current_medications || ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      current_medications: e.target.value
                        .split(',')
                        .map((m) => m.trim()),
                    })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-slate-500">Contact Person</Label>
                <Input
                  value={formData.contact_person || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_person: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-500">Contact Number</Label>
                <Input
                  value={formData.contact_number || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_number: e.target.value })
                  }
                  placeholder="Not extracted"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Notes */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Additional Information
            </h3>
            <div>
              <Label className="text-xs text-slate-500">Additional Notes</Label>
              <Textarea
                value={formData.additional_notes || ''}
                onChange={(e) =>
                  setFormData({ ...formData, additional_notes: e.target.value })
                }
                placeholder="Not extracted"
                className="mt-1"
                rows={4}
              />
            </div>
            {call.transcription && (
              <div className="mt-3">
                <Label className="text-xs text-slate-500">Full Transcription</Label>
                <Textarea
                  value={call.transcription}
                  disabled
                  className="mt-1 bg-slate-50"
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {onSave && (
        <div className="mt-6 flex gap-3 pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Save Form Data
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}


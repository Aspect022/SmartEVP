export interface CallData {
  call_id: string
  timestamp: string
  phone_number: string
  transcription: string
  location?: {
    address?: string
    landmark?: string
    city?: string
    coordinates?: { lat: number; lng: number } | null
  }
  address?: string
  criticality?: 'high' | 'medium' | 'low'
  condition?: string
  patient_age?: number | null
  patient_gender?: string | null
  symptoms?: string[]
  additional_notes?: string
  extracted_data?: Record<string, any>
}

export interface CallFormData {
  callId: string
  phoneNumber: string
  timestamp: string
  location: {
    address: string
    landmark: string
    city: string
  }
  criticality: 'high' | 'medium' | 'low'
  condition: string
  patientAge: number | null
  patientGender: string
  symptoms: string[]
  additionalNotes: string
  transcription: string
}


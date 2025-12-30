import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    if (!API_BASE_URL || API_BASE_URL === 'http://localhost:8000') {
      return NextResponse.json(
        { 
          error: 'Backend API URL not configured. Please set AGENT_API_URL environment variable in Vercel.'
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { phone_number, transcription } = body
    
    // Use /api/calls/process instead of /api/calls/simulate
    const response = await fetch(`${API_BASE_URL}/api/calls/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number, transcription }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend error:', response.status, errorText)
      throw new Error(`Backend returned ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error simulating call:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to simulate call',
        backendUrl: API_BASE_URL
      },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone_number, transcription } = body
    
    const response = await fetch(`${API_BASE_URL}/api/calls/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number, transcription }),
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error simulating call:', error)
    return NextResponse.json(
      { error: 'Failed to simulate call' },
      { status: 500 }
    )
  }
}


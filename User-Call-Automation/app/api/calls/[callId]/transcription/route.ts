import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function POST(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const { callId } = params
    const body = await request.json()
    const { transcription } = body
    
    const response = await fetch(`${API_BASE_URL}/api/calls/${callId}/transcription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcription }),
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing transcription:', error)
    return NextResponse.json(
      { error: 'Failed to process transcription' },
      { status: 500 }
    )
  }
}


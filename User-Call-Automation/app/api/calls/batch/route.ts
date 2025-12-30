import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    if (!AGENT_API_URL || AGENT_API_URL === 'http://localhost:8000') {
      return NextResponse.json(
        { 
          error: 'Backend API URL not configured. Please set AGENT_API_URL environment variable in Vercel.'
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    console.log('Sending batch request to:', `${AGENT_API_URL}/api/calls/batch`)
    
    const response = await fetch(`${AGENT_API_URL}/api/calls/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend error:', response.status, errorText)
      throw new Error(`Backend returned ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process batch calls',
        backendUrl: AGENT_API_URL
      },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function DELETE(request: NextRequest) {
  try {
    if (!AGENT_API_URL || AGENT_API_URL === 'http://localhost:8000') {
      return NextResponse.json(
        { 
          error: 'Backend API URL not configured. Please set AGENT_API_URL environment variable in Vercel.'
        },
        { status: 500 }
      )
    }

    const response = await fetch(`${AGENT_API_URL}/api/calls/clear`, {
      method: 'DELETE',
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
        error: error.message || 'Failed to clear calls',
        backendUrl: AGENT_API_URL
      },
      { status: 500 }
    )
  }
}


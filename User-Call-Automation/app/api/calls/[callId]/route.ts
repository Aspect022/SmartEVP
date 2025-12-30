import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const response = await fetch(`${AGENT_API_URL}/api/calls/${params.callId}`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Call not found' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch call')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    if (!AGENT_API_URL || AGENT_API_URL === 'http://localhost:8000') {
      console.error('AGENT_API_URL is not set or is using localhost')
      return NextResponse.json(
        { 
          error: 'Backend API URL not configured. Please set AGENT_API_URL environment variable in Vercel.',
          details: 'The backend API URL must be set in Vercel project settings → Environment Variables'
        },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'all' or 'active'
    
    const endpoint = type === 'active' 
      ? `${AGENT_API_URL}/api/calls/active`
      : `${AGENT_API_URL}/api/calls`
    
    console.log('Fetching from:', endpoint)
    
    const response = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
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
        error: error.message || 'Failed to fetch calls',
        backendUrl: AGENT_API_URL
      },
      { status: 500 }
    )
  }
}

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
    
    const response = await fetch(`${AGENT_API_URL}/api/calls/process`, {
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
        error: error.message || 'Failed to process call',
        backendUrl: AGENT_API_URL
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'all' or 'active'
    
    const endpoint = type === 'active' 
      ? `${AGENT_API_URL}/api/calls/active`
      : `${AGENT_API_URL}/api/calls`
    
    const response = await fetch(endpoint, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch calls')
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${AGENT_API_URL}/api/calls/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      throw new Error('Failed to process call')
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

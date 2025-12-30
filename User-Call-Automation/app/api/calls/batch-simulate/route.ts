import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '100')
    
    const response = await fetch(`${API_BASE_URL}/api/calls/batch-simulate?count=${count}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error batch simulating calls:', error)
    return NextResponse.json(
      { error: 'Failed to batch simulate calls' },
      { status: 500 }
    )
  }
}


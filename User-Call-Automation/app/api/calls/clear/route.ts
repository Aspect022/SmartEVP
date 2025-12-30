import { NextRequest, NextResponse } from 'next/server'

const AGENT_API_URL = process.env.AGENT_API_URL || 'http://localhost:8000'

export async function DELETE(request: NextRequest) {
  try {
    const response = await fetch(`${AGENT_API_URL}/api/calls/clear`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to clear calls')
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


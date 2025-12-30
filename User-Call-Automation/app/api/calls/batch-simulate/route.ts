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

    // Note: The backend doesn't have a batch-simulate endpoint
    // This route should generate test data and send to /api/calls/batch
    // For now, return an error indicating this endpoint needs implementation
    return NextResponse.json(
      { 
        error: 'Batch simulate endpoint not implemented. Use the batch endpoint with test data instead.',
        suggestion: 'Generate test calls on the frontend and send them to /api/calls/batch'
      },
      { status: 501 }
    )
  } catch (error: any) {
    console.error('Error batch simulating calls:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to batch simulate calls',
        backendUrl: API_BASE_URL
      },
      { status: 500 }
    )
  }
}


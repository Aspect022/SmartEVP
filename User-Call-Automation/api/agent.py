"""
Vercel serverless function for FastAPI Agent
This file serves as the entry point for Vercel's Python runtime
"""
import sys
import os
from pathlib import Path

# Add the Agent-voice-call directory to Python path
base_dir = Path(__file__).parent.parent
agent_dir = base_dir / "Agent-voice-call"
sys.path.insert(0, str(agent_dir))

# Import FastAPI app
from api_server import app

# Use Mangum to convert FastAPI (ASGI) to AWS Lambda handler for Vercel
try:
    from mangum import Mangum
    handler = Mangum(app, lifespan="off")
except ImportError:
    # Fallback if mangum is not available - this shouldn't happen in production
    def handler(event, context):
        return {
            "statusCode": 500,
            "body": "Mangum is required for FastAPI on Vercel. Please install it."
        }


"""
Vercel serverless function entry point for FastAPI
This file is in the api/ directory and will be automatically detected by Vercel
"""
import sys
import os
from pathlib import Path

# Add parent directory to Python path to import api_server
parent_dir = Path(__file__).parent.parent
sys.path.insert(0, str(parent_dir))

# Import the FastAPI app
from api_server import app

# Use Mangum to convert FastAPI (ASGI) to AWS Lambda handler for Vercel
from mangum import Mangum

# Export handler for Vercel
handler = Mangum(app, lifespan="off")



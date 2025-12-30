"""
FastAPI server for Ambulance Call Agent
Provides REST API endpoints for call processing
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
from agent_service import agent, CallData
import asyncio

app = FastAPI(title="Ambulance Call Agent API")

# CORS middleware
# Allow all origins for Vercel deployment (can be restricted in production)
import os
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",") if os.getenv("ALLOWED_ORIGINS") else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if "*" not in allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CallRequest(BaseModel):
    transcription: str
    phone_number: str

class CallResponse(BaseModel):
    call_id: str
    timestamp: str
    phone_number: str
    transcription: str
    location: Optional[Dict[str, Any]] = None
    address: Optional[str] = None
    criticality: Optional[str] = None
    condition: Optional[str] = None
    patient_age: Optional[int] = None
    patient_gender: Optional[str] = None
    symptoms: Optional[List[str]] = None
    additional_notes: Optional[str] = None
    extracted_data: Optional[Dict[str, Any]] = None

@app.get("/")
async def root():
    return {"message": "Ambulance Call Agent API", "status": "running"}

@app.post("/api/calls/process", response_model=CallResponse)
async def process_call(request: CallRequest):
    """
    Process an incoming emergency call
    Transcribes and extracts structured data
    """
    try:
        call_data = await agent.process_call(
            transcription=request.transcription,
            phone_number=request.phone_number
        )
        return CallResponse(**call_data.__dict__)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/calls", response_model=List[CallResponse])
async def get_all_calls():
    """Get all processed calls"""
    calls = agent.get_all_calls()
    return [CallResponse(**call.__dict__) for call in calls]

@app.get("/api/calls/active", response_model=List[CallResponse])
async def get_active_calls():
    """Get currently active calls"""
    calls = agent.get_active_calls()
    return [CallResponse(**call.__dict__) for call in calls]

@app.get("/api/calls/{call_id}", response_model=CallResponse)
async def get_call(call_id: str):
    """Get specific call by ID"""
    call = agent.get_call(call_id)
    if not call:
        raise HTTPException(status_code=404, detail="Call not found")
    return CallResponse(**call.__dict__)

@app.post("/api/calls/batch")
async def process_batch_calls(requests: List[CallRequest]):
    """
    Process multiple calls in batch
    Useful for simulating 100 calls
    """
    results = []
    for request in requests:
        try:
            call_data = await agent.process_call(
                transcription=request.transcription,
                phone_number=request.phone_number
            )
            results.append(CallResponse(**call_data.__dict__))
        except Exception as e:
            results.append({"error": str(e), "phone_number": request.phone_number})
    
    return {"processed": len(results), "calls": results}

@app.delete("/api/calls/clear")
async def clear_all_calls():
    """Clear all call records"""
    try:
        import os
        storage_file = 'call_records.json'
        if os.path.exists(storage_file):
            with open(storage_file, 'w') as f:
                f.write('[]')
        # Clear in-memory data
        agent.call_history = []
        agent.active_calls = {}
        return {"success": True, "message": "All calls cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

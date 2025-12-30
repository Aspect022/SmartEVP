"""
Simple file-based storage for call records
In production, replace with a proper database (PostgreSQL, MongoDB, etc.)
"""

import json
import os
from datetime import datetime
from typing import List, Optional, Dict, Any

# Use /tmp for serverless environments (Vercel, AWS Lambda)
# This directory is writable in serverless functions
if os.path.exists('/tmp'):
    STORAGE_FILE = '/tmp/call_records.json'
else:
    STORAGE_FILE = 'call_records.json'

def load_calls() -> List[dict]:
    """Load all call records from file"""
    if not os.path.exists(STORAGE_FILE):
        return []
    
    try:
        with open(STORAGE_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading calls: {e}")
        return []

def save_call_dict(call_dict: Dict[str, Any]) -> None:
    """Save a call record (as dict) to file"""
    calls = load_calls()
    
    # Check if call already exists
    existing_index = next(
        (i for i, c in enumerate(calls) if c.get('call_id') == call_dict.get('call_id')),
        None
    )
    
    if existing_index is not None:
        calls[existing_index] = call_dict
    else:
        calls.append(call_dict)
    
    # Save to file
    try:
        with open(STORAGE_FILE, 'w') as f:
            json.dump(calls, f, indent=2)
    except Exception as e:
        print(f"Error saving call: {e}")

def get_call(call_id: str) -> Optional[dict]:
    """Get a specific call by ID"""
    calls = load_calls()
    return next((c for c in calls if c['call_id'] == call_id), None)

def get_all_calls() -> List[dict]:
    """Get all call records"""
    return load_calls()


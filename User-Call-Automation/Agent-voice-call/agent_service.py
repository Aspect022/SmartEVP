"""
Ambulance Call Agent Service
Handles incoming calls, transcription, and data extraction using Gemini API
"""

import os
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from dotenv import load_dotenv
from storage import save_call_dict, load_calls

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment variables")
genai.configure(api_key=GEMINI_API_KEY)

@dataclass
class CallData:
    """Structured data extracted from emergency call"""
    call_id: str
    timestamp: str
    phone_number: str
    transcription: str
    location: Optional[Dict[str, Any]] = None
    address: Optional[str] = None
    criticality: Optional[str] = None  # 'high', 'medium', 'low'
    condition: Optional[str] = None
    patient_age: Optional[int] = None
    patient_gender: Optional[str] = None
    symptoms: Optional[List[str]] = None
    additional_notes: Optional[str] = None
    extracted_data: Optional[Dict[str, Any]] = None

class AmbulanceCallAgent:
    """Agent that processes emergency calls and extracts structured data"""
    
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.active_calls: Dict[str, CallData] = {}
        # Load existing calls from storage
        stored_calls = load_calls()
        self.call_history = [
            CallData(**call_dict) for call_dict in stored_calls
        ]
        
        # Configure safety settings
        self.safety_settings = {
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }
    
    def generate_call_id(self) -> str:
        """Generate unique call ID"""
        return f"CALL_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{len(self.call_history)}"
    
    async def transcribe_audio(self, audio_data: bytes) -> str:
        """
        Transcribe audio to text using Gemini API
        Note: For production, you might want to use Google Speech-to-Text API
        For now, we'll use Gemini with text input (simulated audio transcription)
        """
        # In production, convert audio to text first using Speech-to-Text API
        # For now, assuming audio is already transcribed or we receive text
        return ""
    
    async def extract_call_data(self, transcription: str, phone_number: str) -> CallData:
        """
        Extract structured data from call transcription using Gemini API
        """
        call_id = self.generate_call_id()
        
        # Create prompt for Gemini to extract structured data
        extraction_prompt = f"""
You are an emergency call dispatcher AI. Extract structured information from the following emergency call transcription.

Call Transcription:
"{transcription}"

Extract the following information and return ONLY a valid JSON object with no additional text:
{{
    "location": {{
        "address": "full address if mentioned",
        "landmark": "nearby landmarks if mentioned",
        "city": "city name if mentioned",
        "coordinates": null
    }},
    "criticality": "high/medium/low based on symptoms and urgency",
    "condition": "brief description of medical condition",
    "patient_age": number or null,
    "patient_gender": "male/female/other/null",
    "symptoms": ["list of symptoms mentioned"],
    "additional_notes": "any other relevant information"
}}

Criticality Assessment Rules (IMPORTANT):
- HIGH: Use for life-threatening situations such as:
  * Unconscious or unresponsive patients
  * Severe chest pain with difficulty breathing
  * Severe allergic reactions with breathing problems
  * Major trauma with heavy bleeding
  * Cardiac arrest or stroke symptoms
  * Words like "urgent", "critical", "emergency", "life-threatening", "immediately"
  * Multiple victims or mass casualty incidents
  
- MEDIUM: Use for serious but not immediately life-threatening:
  * Severe pain but patient is conscious
  * Injuries that need medical attention but patient is stable
  * Moderate bleeding
  * Patient can still communicate
  
- LOW: Use for non-urgent situations:
  * Minor injuries
  * Stable patients needing transport
  * Routine medical assistance
  * Non-life-threatening conditions

Extract location details as accurately as possible.
List all symptoms mentioned.
Return valid JSON only, no markdown formatting.
"""
        
        try:
            response = self.model.generate_content(
                extraction_prompt,
                safety_settings=self.safety_settings
            )
            
            # Parse JSON from response
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            if response_text.startswith('```'):
                response_text = response_text.split('```')[1]
                if response_text.startswith('json'):
                    response_text = response_text[4:]
                response_text = response_text.strip()
            
            extracted_data = json.loads(response_text)
            
            # Create CallData object
            call_data = CallData(
                call_id=call_id,
                timestamp=datetime.now().isoformat(),
                phone_number=phone_number,
                transcription=transcription,
                location=extracted_data.get('location'),
                address=extracted_data.get('location', {}).get('address'),
                criticality=extracted_data.get('criticality', 'medium'),
                condition=extracted_data.get('condition'),
                patient_age=extracted_data.get('patient_age'),
                patient_gender=extracted_data.get('patient_gender'),
                symptoms=extracted_data.get('symptoms', []),
                additional_notes=extracted_data.get('additional_notes'),
                extracted_data=extracted_data
            )
            
            return call_data
            
        except Exception as e:
            print(f"Error extracting data: {e}")
            # Return basic call data if extraction fails
            return CallData(
                call_id=call_id,
                timestamp=datetime.now().isoformat(),
                phone_number=phone_number,
                transcription=transcription,
                criticality='medium'
            )
    
    async def process_call(self, transcription: str, phone_number: str) -> CallData:
        """
        Main method to process an incoming call
        """
        call_data = await self.extract_call_data(transcription, phone_number)
        self.active_calls[call_data.call_id] = call_data
        self.call_history.append(call_data)
        # Save to persistent storage (convert to dict to avoid circular import)
        call_dict = {
            'call_id': call_data.call_id,
            'timestamp': call_data.timestamp,
            'phone_number': call_data.phone_number,
            'transcription': call_data.transcription,
            'location': call_data.location,
            'address': call_data.address,
            'criticality': call_data.criticality,
            'condition': call_data.condition,
            'patient_age': call_data.patient_age,
            'patient_gender': call_data.patient_gender,
            'symptoms': call_data.symptoms,
            'additional_notes': call_data.additional_notes,
            'extracted_data': call_data.extracted_data,
        }
        save_call_dict(call_dict)
        return call_data
    
    def get_call(self, call_id: str) -> Optional[CallData]:
        """Get call data by ID"""
        return self.active_calls.get(call_id)
    
    def get_all_calls(self) -> List[CallData]:
        """Get all processed calls"""
        return self.call_history
    
    def get_active_calls(self) -> List[CallData]:
        """Get currently active calls"""
        return list(self.active_calls.values())

# Global agent instance
agent = AmbulanceCallAgent()

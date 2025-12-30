# Ambulance Call Agent Service

Automated agent service for processing emergency ambulance calls using Gemini API.

## Features

- Real-time call transcription
- Automatic data extraction (location, criticality, condition, symptoms)
- Structured form generation
- Batch processing for multiple calls

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Add your c to .env
```

3. Run the server:
```bash
python api_server.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /api/calls/process` - Process a single call
- `GET /api/calls` - Get all processed calls
- `GET /api/calls/active` - Get active calls
- `GET /api/calls/{call_id}` - Get specific call
- `POST /api/calls/batch` - Process multiple calls

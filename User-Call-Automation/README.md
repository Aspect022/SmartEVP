# Ambulance Call Automation System

A complete automated system for processing emergency ambulance calls with AI-powered data extraction using Google's Gemini API.

## Features

- 🤖 **AI-Powered Call Processing**: Automatically extracts structured data from emergency call transcriptions
- 📝 **Auto-Filled Forms**: Automatically populates forms with extracted information (location, criticality, condition, symptoms, etc.)
- 📊 **Call Queue Management**: Real-time dashboard for managing incoming calls
- 🎯 **Batch Processing**: Simulate and process up to 100 calls at once
- 🔄 **Real-time Updates**: Live call status updates and queue management

## System Architecture

### Backend (Python/FastAPI)
- **Agent Service** (`Agent-voice-call/agent_service.py`): Core AI agent using Gemini API for data extraction
- **API Server** (`Agent-voice-call/api_server.py`): REST API endpoints for call processing
- **Storage** (`Agent-voice-call/storage.py`): File-based storage for call records

### Frontend (Next.js/React)
- **Call Manager** (`app/calls/page.tsx`): Main interface for managing calls
- **Call Queue** (`components/call-queue.tsx`): Displays all processed calls
- **Call Form** (`components/call-form.tsx`): Auto-filled form with extracted data
- **Call Simulator** (`components/call-simulator.tsx`): Tool for simulating multiple calls

## Setup Instructions

### 1. Backend Setup

```bash
cd Agent-voice-call

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file with:
GEMINI_API_KEY=your_gemini_api_key_here

# Run the API server
python api_server.py
```

The backend API will run on `http://localhost:8000`

### 2. Frontend Setup

```bash
# Install dependencies (if not already installed)
pnpm install

# Set up environment variables
# Create .env.local file with:
AGENT_API_URL=http://localhost:8000

# Run the development server
pnpm dev
```

The frontend will run on `http://localhost:3000`

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file in the `Agent-voice-call` directory

## Usage

### Processing a Single Call

1. Navigate to `/calls` in your browser
2. Use the "Call Simulator" tab to simulate calls
3. Or send a POST request to `/api/calls/process` with:
```json
{
  "transcription": "Emergency! I need an ambulance at 123 Main Street. My father is having chest pain.",
  "phone_number": "+91 98765 43210"
}
```

### Simulating 100 Calls

1. Go to `/calls` page
2. Click on "Call Simulator" tab
3. Set the number of calls (default: 100)
4. Click "Start Simulation"
5. Watch as calls are processed and forms are auto-filled

### Viewing Processed Calls

1. Go to `/calls` page
2. View the call queue on the left
3. Click on any call to see the auto-filled form with extracted data

## Data Extraction

The system automatically extracts:
- **Location**: Address, landmarks, city
- **Criticality**: High, Medium, or Low
- **Condition**: Medical condition description
- **Patient Info**: Age, gender
- **Symptoms**: List of symptoms mentioned
- **Additional Notes**: Other relevant information

## API Endpoints

### Backend (Python/FastAPI)
- `POST /api/calls/process` - Process a single call
- `GET /api/calls` - Get all processed calls
- `GET /api/calls/active` - Get active calls
- `GET /api/calls/{call_id}` - Get specific call
- `POST /api/calls/batch` - Process multiple calls

### Frontend (Next.js)
- `GET /api/calls` - Proxy to backend
- `POST /api/calls` - Proxy to backend
- `POST /api/calls/batch` - Proxy to backend
- `GET /api/calls/[callId]` - Proxy to backend

## Project Structure

```
V3/
├── Agent-voice-call/          # Backend Python service
│   ├── agent_service.py       # Core AI agent
│   ├── api_server.py          # FastAPI server
│   ├── storage.py             # Data storage
│   └── requirements.txt       # Python dependencies
├── app/                       # Next.js app
│   ├── api/                   # API routes
│   ├── calls/                 # Call management page
│   └── page.tsx               # Main dashboard
├── components/                # React components
│   ├── call-manager.tsx       # Main call management UI
│   ├── call-queue.tsx         # Call list component
│   ├── call-form.tsx          # Auto-filled form
│   └── call-simulator.tsx     # Call simulation tool
└── types/                     # TypeScript types
    └── call.ts                # Call data types
```

## Technologies Used

- **Backend**: Python, FastAPI, Google Gemini API
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Storage**: JSON file-based (can be upgraded to database)

## Future Enhancements

- [ ] Real-time WebSocket integration for live updates
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Speech-to-text integration for audio calls
- [ ] Integration with actual phone systems
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

## License

MIT


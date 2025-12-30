# Quick Setup Guide

## Prerequisites

- Python 3.8+ installed
- Node.js 18+ and pnpm installed
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd Agent-voice-call

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start the backend server
python api_server.py
```

The backend will start on `http://localhost:8000`

### 2. Frontend Setup

```bash
# In the root directory (V3/)
# Install dependencies
pnpm install

# Create .env.local file
echo "AGENT_API_URL=http://localhost:8000" > .env.local

# Start the frontend
pnpm dev
```

The frontend will start on `http://localhost:3000`

### 3. Access the Application

1. **Ambulance Dashboard**: `http://localhost:3000` - Main driver dashboard
2. **Call Manager**: `http://localhost:3000/calls` - Call processing interface

### 4. Test the System

1. Go to `http://localhost:3000/calls`
2. Click on the "Call Simulator" tab
3. Set number of calls (default: 100)
4. Click "Start Simulation"
5. Watch as calls are processed and forms are auto-filled!

## Troubleshooting

### Backend Issues

- **"GEMINI_API_KEY not found"**: Make sure you've created the `.env` file in `Agent-voice-call/` directory
- **Port 8000 already in use**: Change the port in `api_server.py` or stop the process using port 8000

### Frontend Issues

- **Cannot connect to backend**: Check that the backend is running and `AGENT_API_URL` in `.env.local` is correct
- **API errors**: Check browser console and backend logs for detailed error messages

### Gemini API Issues

- **Rate limiting**: The free tier has rate limits. For 100 calls, you may need to process in smaller batches
- **API key invalid**: Verify your API key at [Google AI Studio](https://makersuite.google.com/app/apikey)

## Next Steps

- Review the extracted data in the call forms
- Customize the extraction prompts in `agent_service.py` for better accuracy
- Add more sample calls to the simulator
- Integrate with real phone systems for production use


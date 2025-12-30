# SmartEVP - Smart Emergency Vehicle Platform

<div align="center">

![SmartEVP Logo](https://img.shields.io/badge/SmartEVP-Emergency%20Vehicle%20Platform-red?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)

**An intelligent emergency vehicle management system combining AI-powered call processing with real-time driver assistance**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**SmartEVP** is a comprehensive emergency vehicle platform designed to streamline emergency response operations. The system consists of two main components:

### 1. **User Call Automation System**
An AI-powered emergency call processing system that automatically extracts and structures critical information from emergency call transcriptions using Google's Gemini API.

### 2. **Driver View Dashboard**
A real-time ambulance driver dashboard providing navigation, patient vitals monitoring, hospital selection, and trip management capabilities.

Together, these components create an end-to-end solution for modern emergency medical services (EMS), reducing response times and improving the quality of emergency care.

---

## ✨ Features

### User Call Automation System
- 🤖 **AI-Powered Data Extraction**: Automatically processes emergency call transcriptions using Google Gemini API
- 📝 **Auto-Filled Forms**: Extracts and populates structured data (location, criticality, symptoms, patient info)
- 📊 **Call Queue Management**: Real-time dashboard for managing incoming emergency calls
- 🎯 **Batch Processing**: Simulate and process up to 100 calls simultaneously for stress testing
- 🔄 **Real-time Updates**: Live call status updates and queue management
- 📍 **Location Extraction**: Intelligent parsing of addresses and landmarks from natural language
- ⚡ **Criticality Assessment**: Automatic severity classification (High/Medium/Low)
- 👤 **Patient Data Capture**: Extracts age, gender, symptoms, and medical conditions

### Driver View Dashboard
- 🚑 **Emergency Request Management**: Accept and manage incoming emergency requests
- 🗺️ **Real-time Navigation**: Interactive maps with turn-by-turn directions to emergency sites
- 🏥 **Smart Hospital Selection**: Filter hospitals by type (General, Trauma, Cardiac, Pediatric, etc.)
- 💓 **Vitals Monitoring**: Track and record patient vitals during transport
  - Blood Pressure, Heart Rate, SpO2
  - Temperature, Respiratory Rate
  - Consciousness Level
- 🎤 **Voice Notes**: Record audio notes during emergency response
- 📈 **Trip Summary**: Comprehensive trip reports with timeline and patient data
- 🔔 **Real-time Alerts**: Emergency notification system
- 📱 **Responsive Design**: Works seamlessly on tablets and mobile devices

---

## 🏗️ System Architecture

```
SmartEVP/
│
├── User-Call-Automation/        # AI-powered call processing system
│   ├── Agent-voice-call/        # Python backend (FastAPI)
│   │   ├── agent_service.py     # Core AI agent with Gemini API
│   │   ├── api_server.py        # REST API endpoints
│   │   └── storage.py           # Data persistence layer
│   │
│   └── Frontend/                # Next.js frontend
│       ├── app/                 # Application pages
│       ├── components/          # React components
│       └── types/               # TypeScript type definitions
│
└── Driver-View/                 # Ambulance driver dashboard
    ├── app/                     # Next.js application
    ├── components/              # Dashboard UI components
    └── public/                  # Static assets
```

### Data Flow

```
Emergency Call → Transcription → AI Processing (Gemini) → Structured Data → Call Queue
                                                                              ↓
Driver Dashboard ← Emergency Assignment ← Call Routing ← Data Validation ← Auto-filled Form
```

---

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**: Core backend language
- **FastAPI**: Modern, high-performance web framework
- **Google Gemini API**: AI-powered natural language processing
- **Uvicorn**: ASGI server for production deployment
- **Pydantic**: Data validation and settings management
- **python-dotenv**: Environment variable management

### Frontend
- **Next.js 16.0**: React framework with SSR and routing
- **React 19.2**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Re-usable component library
- **Leaflet**: Interactive maps for navigation
- **Recharts**: Data visualization
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Vercel**: Deployment platform

---

## 📦 Prerequisites

Before installing SmartEVP, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** 8+ (Install: `npm install -g pnpm`)
- **Python** 3.8+ ([Download](https://www.python.org/))
- **pip** (Python package manager)
- **Google Gemini API Key** ([Get Free API Key](https://makersuite.google.com/app/apikey))

### System Requirements
- **OS**: macOS, Linux, or Windows 10+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for dependencies

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aspect022/SmartEVP.git
cd SmartEVP
```

### 2. Install User Call Automation System

#### Backend Setup

```bash
cd User-Call-Automation/Agent-voice-call

# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key_here
EOF
```

#### Frontend Setup

```bash
cd User-Call-Automation

# Install dependencies
pnpm install

# Create environment file
cat > .env.local << EOF
AGENT_API_URL=http://localhost:8000
EOF
```

### 3. Install Driver View Dashboard

```bash
cd Driver-View

# Install dependencies
pnpm install
```

---

## ⚡ Quick Start

### Start the User Call Automation System

**Terminal 1 - Backend:**
```bash
cd User-Call-Automation/Agent-voice-call
python api_server.py
```
Backend runs on: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd User-Call-Automation
pnpm dev
```
Frontend runs on: `http://localhost:3000`

### Start the Driver View Dashboard

**Terminal 3:**
```bash
cd Driver-View
pnpm dev
```
Dashboard runs on: `http://localhost:3001`

### Access the Applications

1. **Call Management System**: http://localhost:3000/calls
2. **Driver Dashboard**: http://localhost:3001

---

## 📖 Usage Guide

### Processing Emergency Calls

#### Simulating Multiple Calls
1. Navigate to http://localhost:3000/calls
2. Click on the **"Call Simulator"** tab
3. Set the number of calls (1-100)
4. Click **"Start Simulation"**
5. Watch as calls are automatically processed and data is extracted

#### Manual Call Processing
Send a POST request to the API:

```bash
curl -X POST http://localhost:8000/api/calls/process \
  -H "Content-Type: application/json" \
  -d '{
    "transcription": "Emergency! I need an ambulance at 123 Main Street. My father is having severe chest pain and difficulty breathing.",
    "phone_number": "+91 98765 43210"
  }'
```

#### Viewing Processed Calls
1. Go to http://localhost:3000/calls
2. View the call queue on the left panel
3. Click any call to see auto-filled details:
   - Location and address
   - Criticality level
   - Patient information
   - Symptoms and condition
   - Additional notes

### Using the Driver Dashboard

#### Accepting Emergency Requests
1. Go online in the dashboard
2. Wait for incoming emergency alert
3. Review emergency details
4. Accept the request

#### During Emergency Transport
1. **Navigation**: Follow turn-by-turn directions to emergency location
2. **Record Vitals**: Input patient vitals during assessment and transport
3. **Voice Notes**: Record important observations via audio
4. **Hospital Selection**: Choose appropriate hospital based on patient needs
5. **Trip Summary**: Review complete trip data and patient timeline

---

## 🔌 API Documentation

### User Call Automation Backend API

Base URL: `http://localhost:8000`

#### Process Single Call
```http
POST /api/calls/process
Content-Type: application/json

{
  "transcription": "string",
  "phone_number": "string"
}

Response: 200 OK
{
  "call_id": "string",
  "timestamp": "string",
  "phone_number": "string",
  "transcription": "string",
  "location": {...},
  "address": "string",
  "criticality": "high|medium|low",
  "condition": "string",
  "patient_age": number,
  "patient_gender": "string",
  "symptoms": ["string"],
  "additional_notes": "string",
  "extracted_data": {...}
}
```

#### Get All Calls
```http
GET /api/calls

Response: 200 OK
[{...call_data...}]
```

#### Get Active Calls
```http
GET /api/calls/active

Response: 200 OK
[{...call_data...}]
```

#### Get Specific Call
```http
GET /api/calls/{call_id}

Response: 200 OK
{...call_data...}
```

#### Batch Process Calls
```http
POST /api/calls/batch
Content-Type: application/json

{
  "calls": [
    {
      "transcription": "string",
      "phone_number": "string"
    }
  ]
}

Response: 200 OK
{
  "total": number,
  "successful": number,
  "failed": number,
  "results": [...]
}
```

### API Testing

Interactive API documentation available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📁 Project Structure

```
SmartEVP/
│
├── User-Call-Automation/
│   ├── Agent-voice-call/              # Python Backend
│   │   ├── agent_service.py           # Core AI agent service
│   │   ├── api_server.py              # FastAPI REST API
│   │   ├── storage.py                 # File-based storage
│   │   ├── requirements.txt           # Python dependencies
│   │   ├── call_records.json          # Stored call data
│   │   └── .env                       # Environment variables (create this)
│   │
│   ├── app/                           # Next.js Application
│   │   ├── api/                       # API route handlers
│   │   ├── calls/                     # Call management pages
│   │   ├── page.tsx                   # Main dashboard
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── components/                    # React Components
│   │   ├── call-manager.tsx           # Main call UI
│   │   ├── call-queue.tsx             # Call list component
│   │   ├── call-form.tsx              # Auto-filled form
│   │   ├── call-simulator.tsx         # Simulation tool
│   │   ├── call-detail-form.tsx       # Detailed call view
│   │   └── ui/                        # UI primitives
│   │
│   ├── types/                         # TypeScript Types
│   │   └── call.ts                    # Call data types
│   │
│   ├── lib/                           # Utilities
│   │   └── utils.ts                   # Helper functions
│   │
│   ├── public/                        # Static Assets
│   ├── styles/                        # Global Styles
│   ├── package.json                   # Node dependencies
│   ├── tsconfig.json                  # TypeScript config
│   ├── next.config.mjs                # Next.js config
│   ├── tailwind.config.ts             # Tailwind config
│   └── README.md                      # Component documentation
│
├── Driver-View/
│   ├── app/                           # Next.js Application
│   │   └── page.tsx                   # Main dashboard page
│   │
│   ├── components/                    # React Components
│   │   ├── home-dashboard.tsx         # Home screen
│   │   ├── emergency-request-modal.tsx # Emergency alert
│   │   ├── criticality-selector.tsx   # Priority selection
│   │   ├── hospital-type-selection.tsx # Hospital filter
│   │   ├── active-navigation.tsx      # Map navigation
│   │   ├── trip-summary.tsx           # Trip report
│   │   └── ui/                        # UI primitives
│   │
│   ├── public/                        # Static Assets
│   ├── styles/                        # Global Styles
│   ├── package.json                   # Node dependencies
│   ├── tsconfig.json                  # TypeScript config
│   └── README.md                      # Component documentation
│
├── .gitignore                         # Git ignore rules
├── README.md                          # This file
├── LICENSE                            # MIT License
├── CONTRIBUTING.md                    # Contribution guidelines
├── CODE_OF_CONDUCT.md                 # Code of conduct
├── SECURITY.md                        # Security policy
└── CHANGELOG.md                       # Version history
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`User-Call-Automation/Agent-voice-call/.env`)
```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_api_key_here

# Optional: Server Configuration
HOST=0.0.0.0
PORT=8000
```

#### Frontend (`User-Call-Automation/.env.local`)
```env
# Backend API URL
AGENT_API_URL=http://localhost:8000

# Optional: Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Getting API Keys

1. **Google Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Create new API key
   - Copy and paste into `.env` file

⚠️ **Important**: Never commit `.env` files to version control. They are already included in `.gitignore`.

---

## 🔧 Development

### Running in Development Mode

```bash
# Backend (with auto-reload)
cd User-Call-Automation/Agent-voice-call
uvicorn api_server:app --reload --host 0.0.0.0 --port 8000

# Frontend (with hot reload)
cd User-Call-Automation
pnpm dev

# Driver View (with hot reload)
cd Driver-View
pnpm dev
```

### Building for Production

```bash
# Frontend builds
cd User-Call-Automation
pnpm build
pnpm start

cd Driver-View
pnpm build
pnpm start
```

### Code Quality

```bash
# Lint frontend code
pnpm lint

# Type checking
pnpm type-check  # If script is available
```

### Testing

Currently, the project focuses on integration testing through the call simulator. To test the system:

1. Start all services (backend + frontends)
2. Use the Call Simulator to process 10-100 calls
3. Verify data extraction accuracy
4. Check call queue updates
5. Test driver dashboard workflows

---

## 🚀 Deployment

### Backend Deployment

#### Docker (Recommended)
```dockerfile
# Create Dockerfile in Agent-voice-call/
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t smartevp-backend .
docker run -p 8000:8000 --env-file .env smartevp-backend
```

#### Traditional Server
```bash
# Install dependencies
pip install -r requirements.txt

# Run with production server
gunicorn -w 4 -k uvicorn.workers.UvicornWorker api_server:app
```

### Frontend Deployment

#### Vercel (Recommended)
1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically

#### Self-Hosted
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables in Production

Remember to set all required environment variables in your production environment:
- `GEMINI_API_KEY` (Backend)
- `AGENT_API_URL` (Frontend)

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**"GEMINI_API_KEY not found"**
```bash
# Verify .env file exists in Agent-voice-call/
cd User-Call-Automation/Agent-voice-call
cat .env

# Should show: GEMINI_API_KEY=your_key_here
```

**Port 8000 already in use**
```bash
# Find and kill process using port 8000
lsof -ti:8000 | xargs kill -9

# Or change port in api_server.py
```

**Import errors**
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

#### Frontend Issues

**Cannot connect to backend**
- Verify backend is running on port 8000
- Check `AGENT_API_URL` in `.env.local`
- Check CORS settings in `api_server.py`

**Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

**Build failures**
```bash
# Check Node.js version
node --version  # Should be 18+

# Update dependencies
pnpm update
```

#### API Issues

**Rate limiting from Gemini API**
- Free tier has rate limits (60 requests/minute)
- Process calls in smaller batches
- Consider upgrading to paid tier
- Add delay between batch requests

**Invalid API responses**
- Check Gemini API status
- Verify API key is valid
- Review transcription format

### Getting Help

- **Documentation**: Check this README and component READMEs
- **Issues**: [GitHub Issues](https://github.com/Aspect022/SmartEVP/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Aspect022/SmartEVP/discussions)

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Quick Contribution Guide

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Update documentation for new features
- Test your changes thoroughly
- Ensure all linters pass

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SmartEVP Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### Technologies
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI-powered natural language processing
- [Next.js](https://nextjs.org/) - React framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Leaflet](https://leafletjs.com/) - Open-source mapping library

### Inspiration
Built to improve emergency medical services response times and data accuracy through AI automation.

### Contributors
Thank you to all the contributors who have helped build SmartEVP!

---

## 📞 Contact & Support

- **Project Repository**: [github.com/Aspect022/SmartEVP](https://github.com/Aspect022/SmartEVP)
- **Issue Tracker**: [GitHub Issues](https://github.com/Aspect022/SmartEVP/issues)
- **Security Issues**: See [SECURITY.md](SECURITY.md)

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real-time WebSocket integration for live updates
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Speech-to-text integration for live audio calls
- [ ] Integration with phone systems (Twilio, Vonage)
- [ ] Advanced analytics and reporting dashboard
- [ ] Multi-language support (Spanish, French, Hindi)
- [ ] Mobile apps (iOS/Android)
- [ ] Offline mode for driver dashboard
- [ ] Integration with hospital systems
- [ ] Advanced routing algorithms
- [ ] Patient history integration
- [ ] Automated dispatch system
- [ ] Performance metrics and KPIs

### Version History
See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

---

<div align="center">

**Made with ❤️ for Emergency Medical Services**

⭐ Star us on GitHub — it helps!

[Report Bug](https://github.com/Aspect022/SmartEVP/issues) • [Request Feature](https://github.com/Aspect022/SmartEVP/issues) • [Documentation](https://github.com/Aspect022/SmartEVP/wiki)

</div>

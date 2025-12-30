# Vercel Deployment Configuration

This document explains the Vercel deployment setup for User-Call-Automation.

## Project Structure

- **Frontend**: Next.js application (root directory)
- **Backend**: FastAPI serverless function in `api/agent.py`

## Configuration Files

### vercel.json
Located in `User-Call-Automation/vercel.json`
- Configures Next.js build
- Auto-detects Python serverless functions in `api/` directory

### Python Requirements
- `api/requirements.txt` - Dependencies for Vercel serverless function
- `Agent-voice-call/requirements.txt` - Original requirements (for local dev)

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

1. **GEMINI_API_KEY** - Your Google Gemini API key
2. **ALLOWED_ORIGINS** (optional) - Comma-separated list of allowed CORS origins

## Deployment

1. Ensure `User-Call-Automation` is set as the **Root Directory** in Vercel project settings
2. Push to GitHub - Vercel will auto-deploy
3. The Next.js frontend will be deployed automatically
4. The FastAPI backend will be available at `/api/agent/*`

## API Endpoints

After deployment, the FastAPI backend will be accessible at:
- `https://your-domain.vercel.app/api/agent/`
- `https://your-domain.vercel.app/api/agent/api/calls/process`
- etc.

## Troubleshooting

### pnpm-lock.yaml parsing error
If you see this error, ensure:
1. The `pnpm-lock.yaml` is in the `User-Call-Automation` directory
2. The Root Directory in Vercel is set to `User-Call-Automation`
3. The lockfile is valid (run `pnpm install` locally to regenerate if needed)

### FastAPI not working
1. Check that `api/agent.py` exists
2. Verify `api/requirements.txt` includes `mangum>=0.17.0`
3. Check Vercel function logs for Python errors


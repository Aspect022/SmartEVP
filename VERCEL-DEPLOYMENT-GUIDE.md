# Vercel Deployment Guide - Three Separate Projects

This guide explains how to deploy the three separate projects on Vercel.

## 📦 Project Structure

1. **User-Call-Automation Frontend** (Next.js)
   - Root Directory: `User-Call-Automation`
   - Config: `User-Call-Automation/vercel.json`

2. **User-Call-Automation Backend** (FastAPI)
   - Root Directory: `User-Call-Automation/Agent-voice-call`
   - Config: `User-Call-Automation/Agent-voice-call/vercel.json`

3. **Driver-View Frontend** (Next.js)
   - Root Directory: `Driver-View`
   - Config: None needed (auto-detected)

---

## 🚀 Deployment Steps

### 1. User-Call-Automation Frontend (Next.js)

**Vercel Project Settings:**
- **Root Directory**: `User-Call-Automation`
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `pnpm install && pnpm run build` (auto)
- **Output Directory**: `.next` (auto)

**Environment Variables:**
- `AGENT_API_URL` - Your backend API URL (e.g., `https://your-backend.vercel.app`)

**Files:**
- ✅ `User-Call-Automation/vercel.json` - Already configured
- ✅ `User-Call-Automation/package.json` - Next.js 16.1.1
- ✅ `User-Call-Automation/pnpm-lock.yaml` - Fixed and valid

---

### 2. User-Call-Automation Backend (FastAPI)

**Vercel Project Settings:**
- **Root Directory**: `User-Call-Automation/Agent-voice-call`
- **Framework Preset**: Other
- **Build Command**: (leave empty or `echo "No build needed"`)
- **Output Directory**: (leave empty)

**Environment Variables:**
- `GEMINI_API_KEY` - Your Google Gemini API key (REQUIRED)
- `ALLOWED_ORIGINS` (optional) - Comma-separated CORS origins, or leave for "*"

**Files:**
- ✅ `User-Call-Automation/Agent-voice-call/vercel.json` - Configured
- ✅ `User-Call-Automation/Agent-voice-call/api/index.py` - Serverless function entry point
- ✅ `User-Call-Automation/Agent-voice-call/requirements.txt` - Includes mangum

**How it works:**
- Vercel automatically detects Python files in the `api/` directory
- `api/index.py` is the serverless function that wraps your FastAPI app
- All routes from `api_server.py` will be available at `https://your-backend.vercel.app/api/*`

---

### 3. Driver-View Frontend (Next.js)

**Vercel Project Settings:**
- **Root Directory**: `Driver-View`
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `pnpm install && pnpm run build` (auto)
- **Output Directory**: `.next` (auto)

**Environment Variables:**
- None required (unless you have API endpoints)

**Files:**
- ✅ `Driver-View/package.json` - Next.js 16.1.1
- ✅ `Driver-View/pnpm-lock.yaml` - Valid

---

## 🔧 Important Configuration Notes

### For User-Call-Automation Frontend:
- ✅ **DO NOT** use `cd` commands in vercel.json (Vercel is already in the root directory)
- ✅ The `vercel.json` is correct and doesn't need changes

### For User-Call-Automation Backend:
- ✅ Vercel will automatically detect `api/index.py` as a serverless function
- ✅ The `vercel.json` rewrites all routes to `/api/index.py`
- ✅ Make sure `mangum>=0.17.0` is in `requirements.txt` (already added)

### For Driver-View:
- ✅ No special configuration needed - Vercel auto-detects Next.js

---

## 🐛 Troubleshooting

### Issue: "cd: User-Call-Automation: No such file or directory"
**Solution:** Make sure the Root Directory in Vercel project settings is set correctly:
- Frontend: `User-Call-Automation`
- Backend: `User-Call-Automation/Agent-voice-call`
- Driver-View: `Driver-View`

### Issue: "Error while parsing config file: pnpm-lock.yaml"
**Solution:** 
- ✅ Fixed! The lockfile syntax error has been corrected
- If you still see this, ensure Root Directory is set correctly

### Issue: FastAPI backend not working
**Solution:**
1. Check that `api/index.py` exists in `Agent-voice-call/api/`
2. Verify `requirements.txt` includes `mangum>=0.17.0`
3. Check Vercel function logs for Python errors
4. Ensure `GEMINI_API_KEY` environment variable is set

### Issue: CORS errors
**Solution:**
- The backend CORS is configured to allow all origins by default
- You can restrict it by setting `ALLOWED_ORIGINS` environment variable

---

## ✅ Verification Checklist

Before deploying, ensure:

- [ ] Root Directory is set correctly for each project in Vercel
- [ ] `GEMINI_API_KEY` is set in backend project environment variables
- [ ] `AGENT_API_URL` is set in frontend project environment variables
- [ ] All `vercel.json` files are in the correct locations
- [ ] `pnpm-lock.yaml` files are valid (run `pnpm install` locally to verify)
- [ ] No `cd` commands in vercel.json files (Vercel handles root directory)

---

## 📝 Quick Deploy Commands

After pushing to GitHub, Vercel will auto-deploy. To manually trigger:

1. Go to each project in Vercel dashboard
2. Click "Redeploy" → "Use existing Build Cache" (or clear cache if needed)

---

## 🎯 Expected URLs After Deployment

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app/api/`
- **Driver-View**: `https://your-driver-view.vercel.app`

Backend API endpoints will be available at:
- `https://your-backend.vercel.app/api/` (root)
- `https://your-backend.vercel.app/api/api/calls/process` (process call)
- `https://your-backend.vercel.app/api/api/calls` (get all calls)
- etc.



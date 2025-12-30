# 🚨 QUICK FIX for 500 Errors

## The Problem
Your frontend is getting 500 errors because the `AGENT_API_URL` environment variable is **NOT SET** in your Vercel frontend project.

## ✅ Solution (Takes 2 Minutes)

### Step 1: Find Your Backend URL
1. Go to Vercel Dashboard
2. Open your **User-Call-Automation Backend** project
3. Go to **Deployments** tab
4. Copy the deployment URL (e.g., `https://smart-evp-backend-xyz.vercel.app`)

### Step 2: Set Environment Variable in Frontend
1. Go to your **User-Call-Automation Frontend** project in Vercel
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key:** `AGENT_API_URL`
   - **Value:** Your backend URL (from Step 1) - **NO trailing slash**
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy Frontend
1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test
1. Open your frontend URL
2. Try to simulate a call
3. Check browser console - errors should be gone!

## 🔍 Verify Backend is Working

Test your backend directly:
1. Visit: `https://your-backend-url.vercel.app/api/calls`
2. Should return JSON (empty array `[]` if no calls, or array of calls)

If you get an error, check:
- Backend has `GEMINI_API_KEY` environment variable set
- Backend deployment is successful (green checkmark)

## 📝 Example

**Frontend Environment Variable:**
```
AGENT_API_URL=https://smart-evp-backend-abc123.vercel.app
```

**NOT:**
```
AGENT_API_URL=https://smart-evp-backend-abc123.vercel.app/  ❌ (no trailing slash)
AGENT_API_URL=http://localhost:8000  ❌ (won't work in production)
```

---

## 🎯 That's It!

After setting `AGENT_API_URL` and redeploying, your frontend should be able to communicate with the backend and the 500 errors will be resolved.


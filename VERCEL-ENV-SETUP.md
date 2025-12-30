# Vercel Environment Variables Setup

## 🔴 CRITICAL: Fix the 500 Errors

The frontend is getting 500 errors because the `AGENT_API_URL` environment variable is **not set** in your Vercel frontend project.

## ✅ Solution: Set Environment Variables

### For User-Call-Automation Frontend Project:

1. Go to your **User-Call-Automation Frontend** project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   **Variable Name:** `AGENT_API_URL`

   **Value:** Your backend deployment URL (e.g., `https://your-backend-project.vercel.app`)

   **Environment:** Select all (Production, Preview, Development)

4. **Redeploy** the frontend project after adding the variable

### For User-Call-Automation Backend Project:

1. Go to your **User-Call-Automation Backend** project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   **Variable Name:** `GEMINI_API_KEY`

   **Value:** Your Google Gemini API key

   **Environment:** Select all (Production, Preview, Development)

4. **Redeploy** the backend project after adding the variable

## 🔍 How to Find Your Backend URL

1. Go to your **backend project** in Vercel Dashboard
2. Click on the **Deployments** tab
3. Find the latest successful deployment
4. Copy the deployment URL (e.g., `https://smart-evp-backend.vercel.app`)
5. Use this URL as the `AGENT_API_URL` value in your frontend project

## 📝 Example Configuration

**Frontend Environment Variables:**

```
AGENT_API_URL=https://smart-evp-backend.vercel.app
```

**Backend Environment Variables:**

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
ALLOWED_ORIGINS=https://smart-evp.vercel.app (optional)
```

## ⚠️ Important Notes

1. **No trailing slash** in `AGENT_API_URL` - use `https://your-backend.vercel.app` not `https://your-backend.vercel.app/`

2. **Backend Routes**: The backend routes are available at:

   - `https://your-backend.vercel.app/api/calls`
   - `https://your-backend.vercel.app/api/calls/process`
   - `https://your-backend.vercel.app/api/calls/batch`
   - etc.

3. **After adding environment variables**, you **must redeploy** for changes to take effect:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## 🧪 Testing

After setting the environment variables and redeploying:

1. Open your frontend URL (e.g., `https://smart-evp.vercel.app`)
2. Open browser DevTools → Console
3. Try to simulate a call
4. Check the console for any errors
5. The error messages should now be more descriptive if something is still wrong

## 🐛 If Still Getting Errors

1. Check Vercel Function Logs:

   - Go to your backend project → Deployments → Click on latest deployment
   - Click "Functions" tab to see serverless function logs
   - Look for Python errors

2. Check Frontend Logs:

   - Go to your frontend project → Deployments → Click on latest deployment
   - Check the build logs and function logs

3. Verify Backend is Working:

   - Visit `https://your-backend.vercel.app/api/calls` directly in browser
   - Should return JSON with call data or empty array

4. Check Network Tab:
   - Open browser DevTools → Network tab
   - Try to simulate a call
   - Check the failed request to see the actual error response

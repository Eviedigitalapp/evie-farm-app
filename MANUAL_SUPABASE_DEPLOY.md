# Manual Supabase Edge Function Deployment

If you can't find the Figma Make settings, you can deploy the Supabase Edge Function manually:

## Option A: Via Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Log in with your account
   - Find your project: `scykjqlxmntepotaogyy`

2. **Navigate to Edge Functions:**
   - In the left sidebar, click **"Edge Functions"**
   - Click **"Create a new function"** or **"Deploy function"**

3. **Upload Your Server Code:**
   - Function name: `make-server-5be95cf0`
   - Copy the code from: `/workspaces/default/code/supabase/functions/server/index.tsx`
   - Paste it into the editor
   - Click **"Deploy"**

4. **Wait for Deployment:**
   - Should take ~30 seconds
   - You'll see a success message

---

## Option B: Deploy via Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref scykjqlxmntepotaogyy

# Deploy the edge function
supabase functions deploy make-server-5be95cf0
```

---

## How to Verify It's Deployed

After deployment, test the health endpoint:

Visit this URL in your browser:
```
https://scykjqlxmntepotaogyy.supabase.co/functions/v1/make-server-5be95cf0/health
```

You should see: `{"status":"ok"}`

If you see this, the server is deployed correctly!

---

## What This Server Does

The Supabase Edge Function handles:
- User signup (`/signup` endpoint)
- Session verification (`/verify-session` endpoint)
- Health checks (`/health` endpoint)

Without it, new users cannot register on your app.

---

## Troubleshooting

**"Function not found"**
→ Make sure function name is exactly: `make-server-5be95cf0`

**"Deployment failed"**
→ Check that your code doesn't have syntax errors
→ Make sure all imports are correct

**"401 Unauthorized"**
→ Make sure you're logged into the correct Supabase account

---

Once deployed, test your app at: https://code-drab-nu.vercel.app

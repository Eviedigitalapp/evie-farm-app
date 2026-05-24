# Evie Farm App - Deployment Guide

## 🎉 Authentication is Ready!

Your app now has full Supabase authentication integrated. Here's how to deploy it:

---

## Step 1: Deploy to Netlify

### Option A: Drag & Drop (Easiest)
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Find your site **eviefarm**
3. Go to the **Deploys** tab
4. Drag the entire `/workspaces/default/code/dist` folder onto the deployment area
5. Wait for deployment to complete (~1 minute)

### Option B: Netlify CLI (if available)
```bash
cd /workspaces/default/code
netlify deploy --prod --dir=dist
```

---

## Step 2: Deploy Supabase Edge Function ⚠️ CRITICAL!

**This step is REQUIRED for authentication to work!**

1. Go to **Figma Make Settings Page**
2. Look for a button that says:
   - "Deploy Edge Functions" OR
   - "Deploy Server" OR
   - "Deploy to Supabase"
3. Click it to deploy the authentication server
4. Wait for confirmation

**Without this step:**
- ❌ User signup will NOT work
- ❌ You'll see errors when trying to create accounts
- ✅ Login might work for existing users, but no new users can register

---

## Step 3: Test Your App

1. Visit: **https://eviefarm.netlify.app**

2. You should see:
   - ✅ Landing page with "Get Started" button
   - ✅ Sign up / Login page
   - ✅ After login → Dashboard

3. Test the flow:
   - Click "Get Started"
   - Switch to "Sign Up" tab
   - Enter your details:
     - Full Name
     - Email
     - Phone (for Mobile Money)
     - Password
     - Farm Name
     - Farm Location
   - Click "Start Free Trial"
   - You should be logged in automatically!

4. Test persistence:
   - Refresh the page → you should stay logged in
   - Close and reopen → you should stay logged in

---

## What's New

✅ **Landing page** - Professional first impression for visitors  
✅ **Authentication** - Secure signup/login with Supabase  
✅ **Session persistence** - Users stay logged in  
✅ **Free trial** - 7-day trial for all new signups  
✅ **Multi-tenant ready** - Each farmer has isolated data  
✅ **Mobile-first** - Works great on phones  

---

## Troubleshooting

### "Failed to create account"
- **Cause**: Supabase Edge Function not deployed
- **Fix**: Complete Step 2 above

### "Invalid email or password"
- **Cause**: User doesn't exist yet or wrong credentials
- **Fix**: Try signing up first, or check your password

### Page is blank
- **Cause**: Old cached version
- **Fix**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Still on old app without landing page
- **Cause**: Deployment didn't complete
- **Fix**: Verify deployment succeeded on Netlify dashboard

---

## Next Steps

After authentication works:

1. **PWA Setup** - Make app installable on phones
2. **Testing** - Verify all 80+ components work
3. **PesaPal Integration** - Add payment processing
4. **Custom Domain** - Optional, add later when ready

---

## Need Help?

If you run into issues:
1. Check Netlify deploy logs
2. Check browser console (F12) for errors
3. Verify Supabase Edge Function is deployed
4. Try signing out and back in

**Current Status:**
- ✅ Code ready
- ✅ Build successful
- ⏳ Waiting for Netlify deploy
- ⏳ Waiting for Supabase Edge Function deploy

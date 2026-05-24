# 🚀 Quick Deployment Guide - New Netlify Site

## Your app is ready! Follow these steps:

### Step 1: Deploy to New Netlify Site (2 minutes)

**Option A: Drag & Drop (Easiest)**

1. Open this link: **https://app.netlify.com/drop**
   - Or go to https://app.netlify.com/ → "Add new site" → "Deploy manually"

2. **Drag the `dist` folder** onto the page
   - The `dist` folder is at: `/workspaces/default/code/dist`
   - Just drag the whole folder from your file explorer

3. Wait for deployment (~30 seconds)

4. Netlify will give you a random URL like: `random-name-12345.netlify.app`

5. ✅ Your site is live!

---

### Step 2: Deploy Supabase Edge Function ⚠️ CRITICAL

**This step is REQUIRED or signup won't work!**

1. Go to **Figma Make Settings Page**
2. Find and click: **"Deploy Edge Functions"** or **"Deploy Server"**
3. Wait for confirmation
4. Done!

---

### Step 3: Rename Your Site (Optional)

1. In Netlify dashboard, go to your new site
2. Click "Site settings"
3. Click "Change site name"
4. Enter a new name like: `evie-farm-app` or `evie-agribusiness`
5. Your new URL will be: `your-name.netlify.app`

---

## 🎉 That's it!

Visit your new site and you'll see:
- Landing page
- Sign up / Login
- Full farm management app

---

## What's Included

✅ Landing page with "Get Started"
✅ Sign up / Login with Supabase auth
✅ Session persistence (stay logged in)
✅ 7-day free trial for new users
✅ All 80+ components (Dashboard, Crops, Livestock, Money, People, Settings)
✅ Subscription management
✅ Payment page ready (PesaPal integration can be added next)
✅ PWA-ready (can be installed on phones)
✅ Offline support
✅ Mobile-first design

---

## Troubleshooting

**"Failed to create account"**
→ Deploy Supabase Edge Function (Step 2 above)

**Can't find dist folder**
→ It's at `/workspaces/default/code/dist` in your project

**Want to use tar.gz file instead?**
→ Use `evie-farm-deploy.tar.gz` - extract it first, then drag the contents

---

**Next Steps After Deployment:**
1. Test signup/login
2. PWA setup (make it installable)
3. Add PesaPal payment integration
4. Optional: Custom domain

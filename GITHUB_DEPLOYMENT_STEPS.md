# 🚀 Deploy Evie Farm via GitHub + Netlify

Your code is ready and committed! Here's what we'll do next:

---

## Step 1: Create GitHub Repository

### If you HAVE a GitHub account:

1. Go to: **https://github.com/new**
2. Repository name: `evie-farm-app` (or any name you like)
3. Description: "Evie Digital Agribusiness - Farm Management App"
4. Choose: **Public** (so Netlify can access it for free)
5. **DO NOT** check "Initialize with README" (we already have code)
6. Click **"Create repository"**

### If you DON'T have a GitHub account:

1. Go to: **https://github.com/signup**
2. Enter your email, create a password, choose a username
3. Verify your email
4. Then follow the steps above to create a repository

---

## Step 2: Push Code to GitHub

Once you have the repository URL (looks like: `https://github.com/your-username/evie-farm-app`), tell me and I'll help you push the code!

I'll run these commands:
```bash
git remote add origin https://github.com/YOUR-USERNAME/evie-farm-app.git
git branch -M main
git push -u origin main
```

---

## Step 3: Connect Netlify to GitHub

1. Go to: **https://app.netlify.com/**
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your repository: `evie-farm-app`
6. Build settings (Netlify should auto-detect):
   - Build command: `pnpm run build`
   - Publish directory: `dist`
7. Click **"Deploy site"**

---

## Step 4: Wait for Deployment (2-3 minutes)

Netlify will:
- Clone your code from GitHub
- Install dependencies
- Run the build
- Deploy to a URL like: `random-name-123.netlify.app`

---

## Step 5: Deploy Supabase Edge Function ⚠️

**DON'T FORGET THIS!**

1. Go to **Figma Make Settings Page**
2. Click **"Deploy Edge Functions"** or **"Deploy Server"**
3. This enables user signup

---

## ✅ Done!

Your app will be live with:
- Auto-deployment (every git push = new deployment)
- Free SSL certificate
- Global CDN
- All features working!

---

## Rename Your Site (Optional)

1. In Netlify dashboard → Site settings
2. Change site name from `random-name-123` to something like `evie-farm-app`
3. New URL: `evie-farm-app.netlify.app`

---

## Future Updates

To deploy changes:
```bash
git add .
git commit -m "Your update message"
git push
```

Netlify automatically deploys your changes!

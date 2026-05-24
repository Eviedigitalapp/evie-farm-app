# 🌐 Custom Domain Setup Guide

Replace `code-drab-nu.vercel.app` with your own custom domain like `eviefarm.com` or `app.eviefarm.ug`

## 🎯 Why Use a Custom Domain?

✅ **Professional branding** - eviefarm.com vs code-drab-nu.vercel.app  
✅ **Better trust** - Users trust custom domains more  
✅ **SEO benefits** - Better search engine ranking  
✅ **Memorable** - Easier for farmers to remember  
✅ **Brand consistency** - Matches your business name  

---

## 📋 What You Need

1. **A domain name** - Buy from registrars like:
   - Namecheap: https://www.namecheap.com/
   - GoDaddy: https://www.godaddy.com/
   - Hover: https://www.hover.com/
   - Uganda registrars: https://nic.ug/ (.ug domains)

2. **Cost**: $10-15 per year for .com, varies for .ug

---

## 🛒 Step 1: Buy a Domain

### Recommended Domains for Your App:

- `eviefarm.com` ⭐ Best choice
- `eviefarm.ug` (Uganda-specific)
- `eviedigital.com`
- `evieagribusiness.com`
- `eviefarmapp.com`

### Purchase Process:

1. Go to a domain registrar (e.g., Namecheap)
2. Search for your desired domain
3. Add to cart
4. Complete purchase ($10-15/year)
5. Save your login credentials

---

## ⚙️ Step 2: Configure Domain on Vercel

### Add Domain to Vercel:

1. Go to: https://vercel.com/kasangaki-everlyn-s-projects/code/settings/domains

2. Click **"Add Domain"**

3. Enter your domain:
   - For main domain: `eviefarm.com`
   - For subdomain: `app.eviefarm.com` (recommended for web app)

4. Click **"Add"**

5. Vercel will show DNS configuration instructions

---

## 🔧 Step 3: Update DNS Settings

Vercel will give you DNS records to add. Here's what to do:

### If Using Root Domain (eviefarm.com):

Add these DNS records in your registrar's dashboard:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**If you want www to work too:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### If Using Subdomain (app.eviefarm.com):

**CNAME Record:**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 📝 Step 4: Add Records in Your Registrar

### For Namecheap:

1. Log into Namecheap
2. Go to **"Domain List"**
3. Click **"Manage"** next to your domain
4. Go to **"Advanced DNS"** tab
5. Click **"Add New Record"**
6. Add the A or CNAME record (from Step 3)
7. Click **"Save"**

### For GoDaddy:

1. Log into GoDaddy
2. Go to **"My Products"** → **"Domains"**
3. Click **"DNS"** next to your domain
4. Scroll to **"Records"** section
5. Click **"Add"**
6. Add the record (from Step 3)
7. Click **"Save"**

### For Other Registrars:

Similar process - look for:
- "DNS Settings"
- "DNS Management"
- "Advanced DNS"
- "Name Servers"

---

## ⏱️ Step 5: Wait for DNS Propagation

**DNS takes time to update globally:**

- Minimum: 15-30 minutes
- Average: 2-4 hours
- Maximum: 24-48 hours

**Check propagation status:**
- Tool: https://www.whatsmydns.net/
- Enter your domain
- Check if it points to Vercel's IP

---

## ✅ Step 6: Verify & Configure SSL

Vercel automatically provides free SSL certificates!

### After DNS propagates:

1. Go back to Vercel dashboard
2. Your domain should show **"Valid Configuration"** ✅
3. Vercel auto-generates SSL certificate
4. Your site is now live at: `https://yourdomain.com` 🎉

### Force HTTPS:

Vercel automatically redirects HTTP → HTTPS

---

## 🎨 Step 7: Update Your App (Optional)

If you want to update branding with your new domain:

### Update Manifest:

Edit `/public/manifest.json`:
```json
{
  "name": "Evie Farm",
  "start_url": "https://eviefarm.com/"
}
```

### Update Meta Tags:

Edit `/index.html`:
```html
<meta property="og:url" content="https://eviefarm.com" />
<link rel="canonical" href="https://eviefarm.com" />
```

Redeploy after changes.

---

## 🌟 Domain Best Practices

### Multiple Domains:

You can have multiple domains pointing to your app:
- Main: `eviefarm.com`
- App: `app.eviefarm.com`
- Dashboard: `dashboard.eviefarm.com`

### Redirects:

Vercel handles these automatically:
- `www.eviefarm.com` → `eviefarm.com`
- `http://eviefarm.com` → `https://eviefarm.com`

### Email:

Your domain can also be used for email:
- Setup with Google Workspace ($6/user/month)
- Or use Zoho Mail (free for 5 users)
- Example: `support@eviefarm.com`

---

## 📊 Recommended Setup

**For Your App:**

1. **Main domain**: `eviefarm.com`
   - Use for marketing website (if you build one later)
   
2. **App subdomain**: `app.eviefarm.com` ⭐
   - Use for the farm management app
   - Keeps app separate from marketing site
   
3. **Email**: `support@eviefarm.com`
   - Professional support email
   - Easy for farmers to contact you

---

## 🐛 Troubleshooting

**"Domain not found":**
- DNS hasn't propagated yet (wait longer)
- Check DNS records are correct
- Use https://www.whatsmydns.net/ to check

**"SSL certificate error":**
- Wait 30 minutes after DNS propagation
- Vercel auto-generates certificates
- Check Vercel dashboard for errors

**"Too many redirects":**
- Check you only have one DNS record per name
- Remove any conflicting CNAME/A records

**"Domain already in use":**
- Domain is connected to another Vercel project
- Remove it from the other project first

---

## 💰 Cost Summary

**Domain Registration:**
- .com domain: ~$10-15/year
- .ug domain: ~$30-50/year (varies)
- Renewal: Same price annually

**Hosting (Vercel):**
- FREE for your current usage ✅
- Only pay if you exceed free tier

**SSL Certificate:**
- FREE (Vercel provides automatically) ✅

**Total Annual Cost:**
- Just the domain: $10-50/year
- Everything else: FREE!

---

## 🎯 Quick Start for Uganda (.ug domain)

### Register .ug Domain:

1. Go to: https://nic.ug/
2. Find a registrar (e.g., NIRA Uganda)
3. Search for `eviefarm.ug`
4. Complete registration
5. Follow DNS steps above

**.ug Benefits:**
- Shows you're Uganda-based
- Good for local SEO
- Supports local internet infrastructure

---

## ✅ Verification Checklist

- [ ] Domain purchased
- [ ] DNS records added (A or CNAME)
- [ ] Domain added in Vercel dashboard
- [ ] DNS propagation complete (check whatsmydns.net)
- [ ] SSL certificate active (https:// works)
- [ ] Domain redirects correctly
- [ ] PWA still works on new domain
- [ ] Update app branding (optional)

---

## 🚀 After Domain Setup

**Tell your users:**

> **"Evie Farm has a new address!"**
> 
> Visit: **https://eviefarm.com** (or your chosen domain)
> 
> Same great app, better web address!

**Update everywhere:**
- Social media profiles
- Business cards
- Marketing materials
- Email signatures
- App store listings (if you make mobile apps later)

---

**Your custom domain is ready!** 🌐

**Current:** https://code-drab-nu.vercel.app  
**Future:** https://yourdomain.com  

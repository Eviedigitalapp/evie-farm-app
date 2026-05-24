# 💰 PesaPal Payment Integration Guide

Integrate Mobile Money payments (MTN/Airtel) for your UGX 40,000/month subscription.

## 📋 What You Need

1. **PesaPal Account**
   - Sign up at: https://www.pesapal.com/
   - Verify your business
   - Get API credentials

2. **API Credentials**
   - Consumer Key
   - Consumer Secret
   - IPN (Instant Payment Notification) URL

---

## 🔧 Step 1: Get PesaPal Credentials

### Create PesaPal Account:

1. Go to: https://www.pesapal.com/
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Business Account"**
4. Fill in your details:
   - Business name: Evie Digital Agribusiness
   - Email, phone, location
5. Verify your email
6. Complete KYC (Know Your Customer) process

### Get API Keys:

1. Log into PesaPal dashboard
2. Go to **"Settings"** → **"API Keys"**
3. Generate new API keys:
   - **Consumer Key**: `xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - **Consumer Secret**: `yyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy`
4. **IMPORTANT**: Save these securely!

### Set IPN URL:

Your IPN URL: `https://code-drab-nu.vercel.app/api/pesapal/callback`

In PesaPal dashboard:
1. Go to **"Settings"** → **"IPN Settings"**
2. Add IPN URL: `https://code-drab-nu.vercel.app/api/pesapal/callback`
3. Save

---

## 🚀 Step 2: Add PesaPal to Your App

The payment page already exists in your app! We just need to connect it.

### Update Payment Component:

Your app already has `/src/app/components/PaymentPage.tsx` with PesaPal UI.

**What needs to happen:**

1. **Add API keys as environment variables** (in Vercel)
2. **Create server endpoint** for payment processing
3. **Test the payment flow**

---

## 🔐 Step 3: Add Environment Variables to Vercel

1. Go to: https://vercel.com/kasangaki-everlyn-s-projects/code/settings/environment-variables

2. Add these variables:
   ```
   PESAPAL_CONSUMER_KEY=your-consumer-key-here
   PESAPAL_CONSUMER_SECRET=your-consumer-secret-here
   PESAPAL_IPN_URL=https://code-drab-nu.vercel.app/api/pesapal/callback
   PESAPAL_API_URL=https://pay.pesapal.com/v3  (or sandbox URL for testing)
   ```

3. Click **"Save"**

4. **Redeploy** the app for variables to take effect

---

## 💻 Step 4: Create Payment Server Endpoint

You'll need to add a server endpoint to handle payments. Here's what to do:

### Option A: Use Supabase Edge Function

Add a new route to your existing `hyper-handler` function:

```typescript
// Add to supabase/functions/server/index.tsx

app.post("/pesapal/initiate", async (c) => {
  try {
    const { amount, email, phone, subscriptionId } = await c.req.json();
    
    // Get PesaPal OAuth token
    const tokenResponse = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: Deno.env.get('PESAPAL_CONSUMER_KEY'),
        consumer_secret: Deno.env.get('PESAPAL_CONSUMER_SECRET')
      })
    });
    
    const { token } = await tokenResponse.json();
    
    // Submit order to PesaPal
    const orderResponse = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: subscriptionId,
        currency: 'UGX',
        amount: amount,
        description: 'Evie Farm Monthly Subscription',
        callback_url: `https://code-drab-nu.vercel.app/payment-success`,
        notification_id: Deno.env.get('PESAPAL_IPN_URL'),
        billing_address: {
          email_address: email,
          phone_number: phone
        }
      })
    });
    
    const orderData = await orderResponse.json();
    
    return c.json({
      success: true,
      redirect_url: orderData.redirect_url,
      order_tracking_id: orderData.order_tracking_id
    });
    
  } catch (error) {
    console.error('PesaPal initiation error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Payment callback/IPN handler
app.post("/pesapal/callback", async (c) => {
  try {
    const { OrderTrackingId, OrderMerchantReference } = await c.req.json();
    
    // Get transaction status from PesaPal
    // Update subscription status in your database
    // Send confirmation email to user
    
    return c.json({ success: true });
  } catch (error) {
    console.error('PesaPal callback error:', error);
    return c.json({ error: error.message }, 500);
  }
});
```

### Deploy the updated function to Supabase.

---

## 🧪 Step 5: Test Payment Flow

### Testing Environment:

PesaPal provides a **sandbox** for testing:
- Sandbox URL: `https://cybqa.pesapal.com/pesapalv3`
- Use test credentials from PesaPal dashboard

### Test the Flow:

1. Log into your app: https://code-drab-nu.vercel.app
2. Go to subscription/payment page
3. Click "Subscribe" or "Pay Now"
4. Select payment method:
   - MTN Mobile Money
   - Airtel Money
   - Card payment
5. Complete payment
6. Verify callback works
7. Check subscription status updated

---

## 📊 Payment Flow Diagram

```
User clicks "Pay" 
  → Frontend calls /pesapal/initiate
  → Server gets OAuth token from PesaPal
  → Server submits order to PesaPal
  → PesaPal returns redirect URL
  → User redirected to PesaPal payment page
  → User completes payment (Mobile Money/Card)
  → PesaPal calls your IPN callback
  → Server updates subscription status
  → User redirected back to app
  → Success message shown
```

---

## ✅ Verification Checklist

- [ ] PesaPal account created and verified
- [ ] API keys obtained
- [ ] Environment variables added to Vercel
- [ ] Server endpoint created
- [ ] IPN URL configured in PesaPal
- [ ] Test payment completed successfully
- [ ] Callback/IPN working
- [ ] Subscription status updates correctly
- [ ] User receives confirmation

---

## 💡 Important Notes

**Security:**
- Never expose API keys in frontend code
- Always use environment variables
- Validate all payments on server-side
- Never trust client-side payment status

**Mobile Money:**
- MTN Mobile Money requires user to authorize payment
- Airtel Money sends PIN to phone
- Users need sufficient balance
- Transaction fees may apply

**Testing:**
- Always test in sandbox first
- Use test phone numbers provided by PesaPal
- Verify all edge cases (failed payments, timeouts, etc.)

**Production:**
- Switch to production API URL
- Use production API keys
- Test with small real payments first
- Monitor transactions closely

---

## 🐛 Troubleshooting

**"Invalid credentials":**
- Check API keys are correct
- Verify keys are for correct environment (sandbox vs production)
- Make sure environment variables are deployed

**"Payment not processing":**
- Check IPN URL is accessible publicly
- Verify callback endpoint is working
- Check PesaPal dashboard for transaction status

**"Callback not received":**
- Ensure IPN URL is HTTPS
- Check server logs for errors
- Verify PesaPal can reach your server

---

## 📞 Support

**PesaPal Support:**
- Email: support@pesapal.com
- Phone: +254 709 691 000
- Docs: https://developer.pesapal.com/

**Need Help?**
- Check PesaPal docs for detailed API reference
- Test thoroughly in sandbox before going live
- Keep transaction logs for debugging

---

**Ready to accept payments!** 💰

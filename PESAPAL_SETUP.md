# PesaPal Integration Setup Guide

This app uses **PesaPal** for Mobile Money payments (MTN & Airtel) in Uganda.

## Step 1: Create PesaPal Account

1. Go to [https://www.pesapal.com](https://www.pesapal.com)
2. Click "Sign Up" and create a business account
3. Complete the registration with your business details
4. Verify your email and phone number

## Step 2: Get API Credentials

### For Testing (Sandbox):
1. Login to PesaPal Dashboard
2. Go to **Settings** → **API Keys**
3. Switch to **Demo/Sandbox** environment
4. You'll see:
   - **Consumer Key** (starts with `qkio...`)
   - **Consumer Secret** (starts with `r...`)
   
### For Production (Live):
1. Complete business verification (upload documents)
2. Wait for approval (1-3 business days)
3. Switch to **Live** environment
4. Get your **Live Consumer Key** and **Consumer Secret**

## Step 3: Configure IPN (Instant Payment Notification)

1. In PesaPal Dashboard, go to **Settings** → **IPN Settings**
2. Click "Register IPN"
3. Set the URL to: `https://your-domain.com/api/pesapal-callback`
4. Copy the **IPN ID** that's generated

## Step 4: Add Keys to Your App

Open `/src/app/components/PaymentPage.tsx` and replace these lines:

```typescript
const PESAPAL_CONSUMER_KEY = 'PASTE_YOUR_CONSUMER_KEY_HERE';
const PESAPAL_CONSUMER_SECRET = 'PASTE_YOUR_CONSUMER_SECRET_HERE';
const PESAPAL_IPN_ID = 'PASTE_YOUR_IPN_ID_HERE';
```

With your actual keys from PesaPal Dashboard.

## Step 5: Uncomment Real Integration Code

In the same file (`PaymentPage.tsx`), find the commented section starting with:
```typescript
// TODO: Real PesaPal integration
```

Uncomment the entire `try/catch` block below it (remove `/*` and `*/`).

## Step 6: Test the Integration

### Sandbox Testing:
1. Use these test phone numbers:
   - MTN: `+256700000001`
   - Airtel: `+256750000001`
2. Any amount will work in sandbox mode
3. Payment will be auto-approved in test mode

### Live Testing:
1. Use a real MTN or Airtel number
2. You'll receive an actual Mobile Money prompt on your phone
3. Enter your PIN to complete payment

## PesaPal Fees

- **Transaction Fee**: 3.5% per transaction
- **Setup Fee**: Free
- **Monthly Fee**: Free
- **Payout Time**: Instant to your bank account

## Support

If you have issues:
- Email: [support@pesapal.com](mailto:support@pesapal.com)
- Phone: +254 709 313 000
- Documentation: [https://developer.pesapal.com](https://developer.pesapal.com)

## API Documentation

PesaPal API v3 Docs: [https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference](https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference)

Key endpoints:
- Auth: `POST https://pay.pesapal.com/v3/api/Auth/RequestToken`
- Submit Order: `POST https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest`
- Check Status: `GET https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus`

## Demo Mode

Currently, the app runs in **DEMO MODE**. Payments are simulated successfully after 3 seconds. Once you add your PesaPal keys and uncomment the integration code, real payments will work automatically.

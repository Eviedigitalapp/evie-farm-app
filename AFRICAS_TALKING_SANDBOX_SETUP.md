# Africa's Talking Sandbox Setup Guide

## Current Status
- ✅ Edge Function updated with detailed logging
- ✅ Route prefix fixed: `/hyper-handler/sms/send`
- ✅ API credentials configured in Supabase
- ⚠️ SMS still failing - likely sandbox phone number registration issue

## Next Steps

### 1. Deploy Updated Edge Function

The Edge Function code in `/workspaces/default/code/supabase/functions/server/index.tsx` has been updated with:
- Correct route prefix: `/hyper-handler/sms/send`
- Extensive debugging logs to see exact API responses

**To Deploy:**
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/scykjqlxmntepotaogyy
2. Navigate to Edge Functions → `hyper-handler`
3. Copy the entire content of `/workspaces/default/code/supabase/functions/server/index.tsx`
4. Paste into the editor
5. Click "Deploy"

### 2. Register Test Phone Number in Sandbox

**CRITICAL:** Africa's Talking sandbox mode **only** sends SMS to registered test phone numbers.

**How to Register Phone Number:**

1. Go to Africa's Talking Dashboard: https://account.africastalking.com/apps/sandbox
2. Click on "Launch Simulator" (you already did this)
3. Look for "SMS" section in the simulator
4. Find "Add Phone Number" or "Register Test Number" button
5. Add your phone number in format: `+256XXXXXXXXX` (must include country code)
6. You may need to verify the number via a confirmation SMS

**Alternative Path if Button Not Found:**
1. In the simulator, look for a "Settings" or "Configuration" tab
2. Check for "Test Numbers" or "Registered Numbers" section
3. Some sandboxes require you to add numbers through the main dashboard under "Sandbox Settings" rather than in the simulator

### 3. Verify Your Current Credentials

**Current Configuration:**
- Username: `sandbox`
- API Key: `atsk_7fd5e0ac0f3de072c567811f815c546017cb1c9bf16b70f8184e24ace784e20af1b6e1ba`

**To Verify These Are Correct:**
1. Go to: https://account.africastalking.com/apps/sandbox/settings
2. Check that the API Key matches exactly
3. Confirm the username is `sandbox`
4. **IMPORTANT:** Don't regenerate the API key - use the existing one

### 4. Test SMS Again

After deploying the updated Edge Function and registering your phone number:

1. Go to your app: https://code-drab-nu.vercel.app
2. Navigate to Settings → SMS Notifications
3. Enter your phone number (the one you registered in sandbox)
4. Click "Test SMS"
5. Check the result

### 5. Check Logs for Detailed Error

After testing, check Supabase logs:

1. Go to: https://supabase.com/dashboard/project/scykjqlxmntepotaogyy/logs/edge-functions
2. Look for logs from `hyper-handler` function
3. The logs will now show:
   - Phone number being sent
   - Username and API key status
   - Full request body
   - Complete response from Africa's Talking
   - Exact error message

## Common Sandbox Errors

### "Invalid credentials"
- API key is wrong or has been regenerated
- Username doesn't match (should be `sandbox` for sandbox mode)

### "The supplied authentication is invalid"
- API key format is incorrect
- Key was regenerated after being set in Supabase
- **Solution:** Don't regenerate key, use existing one

### "Invalid phone number" or "No recipients"
- Phone number not registered in sandbox
- Phone number format is wrong (must be E.164: `+256...`)
- **Solution:** Register phone in sandbox settings

### Empty response or network error
- API endpoint URL is wrong
- CORS issue (already handled in our code)
- Network connectivity issue

## Phone Number Format

Your phone number must be in E.164 format:
- ✅ Correct: `+256712345678`
- ❌ Wrong: `0712345678` (missing country code)
- ❌ Wrong: `256712345678` (missing +)

The app automatically formats it for you, but make sure you register it in the sandbox with the `+256` prefix.

## What the Updated Edge Function Will Tell Us

With the new logging, when you test SMS, we'll see:
1. Exact phone number being sent
2. Whether API key and username are present
3. Full request body sent to Africa's Talking
4. Complete API response
5. Specific error code/message

This will help us identify exactly why the SMS is failing.

## Expected Successful Response

When SMS works, the Africa's Talking API returns:
```json
{
  "SMSMessageData": {
    "Message": "Sent to 1/1 Total Cost: UGX 0.00",
    "Recipients": [
      {
        "statusCode": 101,
        "number": "+256712345678",
        "status": "Success",
        "cost": "UGX 0.00",
        "messageId": "ATXid_..."
      }
    ]
  }
}
```

Status code `101` means success. Other codes indicate failure.

## Moving to Production

Once sandbox works, to use production:
1. Purchase credits in your Africa's Talking account
2. Get production API key
3. Change `AFRICAS_TALKING_USERNAME` from `sandbox` to your production username
4. Update `AFRICAS_TALKING_API_KEY` to production key
5. Production doesn't require phone number registration - works with any number
